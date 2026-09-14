#!/usr/bin/env node
/* Smoke-test the BUILT single-file artifact (dist/verda-demo.html) — the file
   that actually gets published — rather than the app/ folder a dev server
   serves. These are different artefacts: the bundle inlines the scripts,
   drops the service worker and stubs the map, so a change can pass against
   app/ and still ship a blank page.

   Run:  node tools/build-single-file.js && node tools/check-build.js
   Exits non-zero on any page error, blank render, or missing control.
   Requires Playwright:  NODE_PATH=/opt/node22/lib/node_modules node tools/check-build.js */
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await b.newPage({ viewport: { width: 1280, height: 1000 } });
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/ERR_TUNNEL|404|ERR_BLOCKED|ERR_NAME|ERR_CERT|fonts\.googleapis/.test(m.text())) errs.push('CONSOLE: ' + m.text()); });
  page.on('dialog', d => { errs.push('DIALOG: ' + d.message()); d.dismiss(); });

  const target = 'file://' + require('path').resolve(__dirname, '..', 'dist', 'verda-demo.html');
  await page.goto(target);
  await page.waitForTimeout(1200);

  // THE test that was missing: does anything render at all?
  const shell = await page.evaluate(() => ({
    nav: document.querySelectorAll('.nav-item').length,
    mainLen: (document.querySelector('#main')?.innerText || '').trim().length,
    hasCountry: !!document.getElementById('country-select'),
    hasLang: !!document.getElementById('lang-select'),
    hasTheme: !!document.getElementById('theme-select'),
    title: document.title
  }));
  console.log('shell:', JSON.stringify(shell));
  if (!shell.nav) errs.push('BLANK PAGE — no nav items rendered');
  if (shell.mainLen < 50) errs.push('BLANK PAGE — main is empty');
  if (!shell.hasCountry) errs.push('country-select missing from built shell');

  // every section, in the built file
  const ids = await page.$$eval('.nav-item', a => a.map(x => x.getAttribute('href')));
  for (const id of ids) {
    await page.evaluate(h => { location.hash = h; }, id);
    await page.waitForTimeout(110);
    const len = await page.evaluate(() => document.querySelector('#main').innerText.trim().length);
    if (len < 5) errs.push('EMPTY SECTION ' + id);
  }
  console.log('sections rendered in built file: ' + ids.length);

  // jurisdiction switching works in the built file
  for (const cc of ['ug','ke','tz','cd','zm']) {
    await page.selectOption('#country-select', cc);
    await page.evaluate(() => { location.hash = '#/checklists'; });
    await page.waitForTimeout(250);
    const name = await page.$eval('#chk-country-name', e => e.innerText);
    const sectors = await page.$$eval('#chk-industry option', o => o.length);
    console.log(`  ${cc} -> ${name} (${sectors} sectors)`);
  }

  // seeded example data present
  await page.evaluate(() => { location.hash = '#/analytics'; });
  await page.waitForTimeout(400);
  const charts = await page.$$eval('svg.chart', e => e.length);
  console.log('analytics charts in built file: ' + charts);

  // reporting still works end-to-end in the built file
  await page.evaluate(() => { location.hash = '#/reporting'; });
  await page.waitForTimeout(400);
  await page.selectOption('#rep-standard', 'essr');
  await page.waitForTimeout(500);
  const tables = await page.$$eval('.report-table', e => e.length);
  const drops = await page.$$eval('.dropzone', e => e.length);
  console.log(`reporting in built file: ${tables} tables, ${drops} dropzones`);
  if (!tables) errs.push('reporting tables missing in built file');

  // theme + language in the built file
  for (const t of ['ocean','amber','slate','forest']) { await page.selectOption('#theme-select', t); await page.waitForTimeout(80); }
  for (const l of ['sw','fr','pt','zh','en']) { await page.selectOption('#lang-select', l); await page.waitForTimeout(100); }

  await page.screenshot({ path: process.env.VERDA_SHOT || '/tmp/verda-build-check.png' });
  console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'NO ERRORS');
  await b.close();
  process.exit(errs.length ? 1 : 0);
})();
