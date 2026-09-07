/* Verda — seed data & reference content.
   Editable in the browser (persisted to localStorage) — this file only supplies
   the first-run defaults so the app isn't empty on first load. */

const VERDA_SEED = {

  // ---- Clients (warm leads already scoped by EEIS) -------------------------
  clients: [
    { id: "c1", name: "Abubaker Technical", industry: "Manufacturing", site: "Kampala Industrial Area", plan: "Quarterly", nextVisit: "2026-10-15", permitExpiry: "2027-03-01", status: "Active" },
    { id: "c2", name: "Cosmic Investments", industry: "Quarrying & Mining", site: "Mukono Quarry Site", plan: "Quarterly", nextVisit: "2026-09-28", permitExpiry: "2026-12-20", status: "Active" },
    { id: "c3", name: "Kaletex Ventures", industry: "Manufacturing", site: "Namanve Industrial Park", plan: "Monthly", nextVisit: "2026-09-20", permitExpiry: "2027-01-10", status: "Active" },
    { id: "c4", name: "Lusango Real Uganda", industry: "Construction & Contracting", site: "Multiple project sites", plan: "Quarterly", nextVisit: "2026-11-05", permitExpiry: "2026-10-30", status: "Active" },
    { id: "c5", name: "Crested Crane Timber", industry: "Timber & Wood Processing", site: "Jinja Processing Yard", plan: "Monthly", nextVisit: "2026-09-25", permitExpiry: "2027-02-14", status: "Active" }
  ],

  // ---- Industries + baseline compliance checklists --------------------------
  industries: [
    {
      id: "manufacturing", name: "Manufacturing / Factories",
      checklist: [
        "Valid NEMA (or national regulator) EIA certificate displayed on site",
        "Effluent discharge permit current and monitoring log up to date",
        "Air emission points identified and last emissions test on file",
        "SDS/MSDS available and current for all hazardous chemicals in use",
        "Waste segregation in place; licensed waste transporter records kept",
        "Fire safety equipment inspected, tagged, and within service date",
        "PPE issued, logged, and matched to task-specific hazard assessment",
        "Machine guarding and lockout/tagout procedures in place",
        "First aid kits stocked and accessible; trained first aiders on shift",
        "Incident/near-miss register maintained and reviewed monthly"
      ]
    },
    {
      id: "quarrying", name: "Quarrying & Mining",
      checklist: [
        "Valid environmental/mining licence and EIA certificate on site",
        "Blast management plan and licensed blaster records (if applicable)",
        "Dust suppression measures in operation and logged",
        "Noise and vibration monitoring records current",
        "Rehabilitation/restoration plan on file with progress tracked",
        "Water abstraction permit (if applicable) current",
        "PPE (hearing, respiratory, eye, foot protection) issued and enforced",
        "Slope stability and pit-edge inspections logged",
        "Community grievance log maintained and reviewed",
        "Heavy equipment operator certifications on file"
      ]
    },
    {
      id: "timber", name: "Timber & Wood Processing",
      checklist: [
        "Valid forestry/timber processing licence and EIA certificate on site",
        "Chain-of-custody / sourcing documentation for timber inputs",
        "Sawdust and wood-waste management plan in place",
        "Fire risk assessment current (high fuel-load environment)",
        "Machine guarding on saws, planers, and processing equipment",
        "Hearing and respiratory PPE issued for high-dust/noise tasks",
        "Effluent from treatment chemicals (if used) permitted and monitored",
        "Reforestation/offset commitments tracked (if part of licence)",
        "Incident/near-miss register maintained",
        "Community and worker grievance mechanism in place"
      ]
    },
    {
      id: "construction", name: "Construction & Contracting",
      checklist: [
        "Project-level EIA certificate or environmental screening on file",
        "Site-specific ESMP available and briefed to workers",
        "Fall protection and scaffolding inspections current",
        "Excavation/trenching safety controls in place",
        "Dust, noise, and stormwater runoff controls on site",
        "Waste and debris management plan implemented",
        "PPE compliance enforced at site entry",
        "Sub-contractor EHS pre-qualification on file",
        "Community liaison / grievance log maintained",
        "Incident/near-miss register maintained and reviewed"
      ]
    },
    {
      id: "oilgas", name: "Oil & Gas",
      checklist: [
        "Valid environmental and operating licences on site",
        "Spill prevention and emergency response plan current",
        "Tank/pipeline integrity inspection records on file",
        "Air emissions and flaring monitoring records current",
        "Hazardous materials storage and permits compliant",
        "PPE and gas detection equipment calibrated and issued",
        "Journey management / driving safety plan in place",
        "Community and stakeholder engagement log maintained",
        "Emergency drills conducted and logged",
        "Incident/near-miss register maintained"
      ]
    },
    {
      id: "agriculture", name: "Agriculture & Agro-processing",
      checklist: [
        "Environmental approval/EIA certificate on file (where required)",
        "Agrochemical storage, handling, and SDS availability compliant",
        "Wastewater/effluent from processing permitted and monitored",
        "Worker PPE for spraying/handling agrochemicals issued",
        "Buffer zones and water source protection measures in place",
        "Waste (organic and packaging) management plan implemented",
        "Labour and community grievance mechanism in place",
        "Fire safety provisions for storage/processing areas",
        "Incident/near-miss register maintained",
        "Traceability/records for chemical application maintained"
      ]
    }
  ],

  // Commonly required EHS/environmental permits across industries — verify
  // current requirements with your national regulator (e.g. NEMA in Uganda).
  permitsChecklist: [
    "Environmental Impact Assessment (EIA) Certificate",
    "Trading / Business Operating Licence",
    "Effluent Discharge Permit",
    "Air Emission Permit",
    "Water Abstraction Permit",
    "Waste Transporter / Handler Licence",
    "Fire Safety Certificate",
    "Occupational Health & Safety Workplace Registration",
    "Boiler / Pressure Vessel Inspection Certificate",
    "Explosives / Dangerous Goods Handling Licence (if applicable)",
    "Radiation Source / X-ray Use Licence (if applicable)",
    "Forestry / Timber Movement Permit (if applicable)",
    "Mining / Quarrying Licence (if applicable)",
    "Construction Permit / Approved Building Plan"
  ],

  // ---- Report segments (add/omit per report) --------------------------------
  reportSegments: [
    { id: "safety", label: "Safety", hint: "Incidents, near-misses, PPE compliance, training" },
    { id: "security", label: "Security", hint: "Site security incidents, access control, asset protection" },
    { id: "environment", label: "Environment", hint: "Effluent, air, waste, spills, water use" },
    { id: "ghg", label: "GHG", hint: "Emissions estimate, energy use, reduction actions" },
    { id: "community", label: "Community", hint: "Grievances, engagement activities, CSR" },
    { id: "permitting", label: "Permitting", hint: "Licence status, renewal dates, submissions" }
  ],

  // ---- ToR / ESIA structure ---------------------------------------------
  esiaSections: [
    { id: "background", title: "1. Project Description & Background" },
    { id: "legal", title: "2. Policy, Legal & Institutional Framework" },
    { id: "baseline", title: "3. Description of the Project Environment (Baseline)" },
    { id: "scope", title: "4. Scope of the ESIA / ToR Objectives" },
    { id: "impacts", title: "5. Potential Environmental & Social Impacts" },
    { id: "alternatives", title: "6. Analysis of Alternatives" },
    { id: "mitigation", title: "7. Mitigation Measures & ESMP" },
    { id: "engagement", title: "8. Stakeholder Engagement & Consultation" },
    { id: "monitoring", title: "9. Environmental & Social Monitoring Plan" },
    { id: "institutional", title: "10. Institutional Arrangements & Budget" },
    { id: "conclusion", title: "11. Conclusion & Recommendations" }
  ],

  // ---- PPE / tools catalog — standard industry categories --------------
  // Categories reflect the classification scheme used industry-wide by
  // suppliers such as Honeywell, DuPont, MSA Safety and SafeSourceDirect.
  // No branded products, logos or pricing are reproduced — this is a
  // starting taxonomy for EEIS's own supplies & hire inventory.
  ppeCatalog: [
    { category: "Head Protection", items: ["Industrial Safety Helmet — Class E", "Bump Cap"] },
    { category: "Eye & Face Protection", items: ["Safety Glasses — Clear/Tinted", "Face Shield", "Welding Goggles"] },
    { category: "Hearing Protection", items: ["Foam Ear Plugs", "Ear Muffs — 25dB NRR"] },
    { category: "Respiratory Protection", items: ["N95/FFP2 Disposable Respirator", "Half-Face Respirator + Cartridges", "SCBA (hire)"] },
    { category: "Hand Protection", items: ["Cut-Resistant Gloves", "Chemical-Resistant Gloves", "General Work Gloves"] },
    { category: "Fall Protection", items: ["Full-Body Harness", "Lanyard with Shock Absorber", "Anchor Points (hire)"] },
    { category: "Protective Clothing", items: ["Coveralls — Flame Resistant", "High-Visibility Vest", "Chemical Suit"] },
    { category: "Foot Protection", items: ["Steel-Toe Safety Boots", "Rubber Boots"] },
    { category: "Gas & Environmental Detection", items: ["4-Gas Detector (hire)", "Noise Dosimeter (hire)", "Air Quality Sampler (hire)"] },
    { category: "First Aid & Emergency", items: ["First Aid Kit — Workplace", "Spill Response Kit", "Fire Extinguisher (hire/service)"] }
  ],

  // ---- IEC materials (free, Verda-authored) -----------------------------
  iecMaterials: [
    { category: "Safety", title: "PPE Awareness — Key Points", body:
`PPE AWARENESS — KEY POINTS (Verda IEC Series)

1. Wear the PPE assigned for your specific task — not "any" PPE.
2. Inspect PPE before each use; damaged PPE must be replaced, not repaired informally.
3. Store PPE clean and dry; contaminated PPE should be decontaminated or discarded per site rules.
4. Report lost or damaged PPE to your supervisor immediately.
5. PPE is the last line of defence — it does not replace safe work procedures.
6. Never remove required PPE to "work faster." Report barriers to PPE use so they can be fixed.` },
    { category: "Safety", title: "Fire Safety — Do's and Don'ts", body:
`FIRE SAFETY — DO'S AND DON'TS (Verda IEC Series)

DO
- Know the location of your nearest fire extinguisher and assembly point.
- Keep fire exits and extinguisher access clear at all times.
- Report damaged electrical wiring or overloaded sockets.
- Participate in fire drills.

DON'T
- Don't store flammable materials near ignition sources or exits.
- Don't prop open fire doors.
- Don't attempt to fight a fire beyond your training — evacuate and raise the alarm.` },
    { category: "Environment", title: "Waste Segregation Guide", body:
`WASTE SEGREGATION GUIDE (Verda IEC Series)

Separate waste at the point of generation into:
- General/non-hazardous waste (bin: black)
- Recyclables — paper, plastic, metal (bin: green)
- Hazardous waste — chemicals, oils, contaminated materials (bin: red, labelled)
- Organic/biodegradable waste (bin: brown)

Hazardous waste must be stored in a bunded, covered area and handed only to a
licensed waste transporter. Keep waste transfer records for every collection.` },
    { category: "Social", title: "Community Grievance — What to Know", body:
`COMMUNITY GRIEVANCE REDRESS — WHAT TO KNOW (Verda IEC Series)

- Community members have the right to raise concerns about site operations.
- Grievances should be logged, acknowledged, and given a reference number.
- Investigate and respond within the timeframe committed in your ESMP.
- Keep the grievance log available for audit and regulator review.
- No community member should face any form of retaliation for raising a concern.` },
    { category: "Environment", title: "GHG & Climate Awareness Basics", body:
`GHG & CLIMATE AWARENESS BASICS (Verda IEC Series)

- Greenhouse gases (GHGs) from a site typically come from fuel combustion,
  electricity use, process emissions, and vehicle fleets.
- Simple reduction actions: fix leaks, maintain equipment, switch off idle
  machinery, monitor fuel/electricity use monthly, and track against a baseline.
- Keeping basic activity data (litres of fuel, kWh of power) is the first step
  toward any future GHG inventory or reporting requirement.` },
    { category: "Health", title: "Basic First Aid — Response Priorities", body:
`BASIC FIRST AID — RESPONSE PRIORITIES (Verda IEC Series)

1. Ensure the scene is safe before approaching.
2. Check responsiveness and breathing; call for emergency help.
3. Control severe bleeding with direct pressure.
4. Do not move a person with a suspected spinal injury unless there is
   immediate danger.
5. Keep the first aid kit stocked and know who your trained first aiders are.` }
  ],

  // ---- Skills / certification advisor keyword map ------------------------
  skillKeywords: [
    { match: ["waste", "hazardous waste", "effluent", "spill"], suggest: "ISO 14001 Environmental Management Systems", why: "You referenced waste/effluent handling — ISO 14001 builds a structured EMS around exactly this." },
    { match: ["audit", "inspection", "non-compliance", "nonconformance"], suggest: "ISO 45001 / ISO 19011 Lead Auditor", why: "Auditing language detected — a Lead Auditor course formalises audit technique and reporting." },
    { match: ["incident", "injury", "near miss", "near-miss", "accident"], suggest: "NEBOSH International General Certificate (IGC)", why: "Incident/near-miss handling is core NEBOSH IGC content." },
    { match: ["ghg", "emissions", "carbon", "climate"], suggest: "GHG Protocol Corporate Accounting & Reporting Training", why: "GHG/emissions terms detected — this builds inventory and reporting skills." },
    { match: ["esia", "impact assessment", "tor", "terms of reference"], suggest: "IFC Performance Standards & ESIA Practitioner Training", why: "ESIA/ToR language detected — this aligns directly with international lender safeguard standards." },
    { match: ["community", "grievance", "stakeholder", "csr"], suggest: "Social Performance / Community Engagement Practitioner Course", why: "Community and stakeholder terms detected." },
    { match: ["permit", "licence", "license", "nema", "regulator"], suggest: "Environmental Compliance & Permitting Short Course", why: "Permitting/licensing language detected." },
    { match: ["fire", "evacuation", "emergency"], suggest: "Fire Safety & Emergency Response Training", why: "Fire/emergency response terms detected." },
    { match: ["chemical", "sds", "msds", "hazcom"], suggest: "Hazardous Chemicals Management / HAZWOPER Awareness", why: "Chemical handling/SDS terms detected." },
    { match: ["ppe", "protective equipment"], suggest: "PPE Selection & Hazard Assessment Training", why: "PPE terms detected." }
  ],

  // ---- Translations (partial coverage — nav & key UI strings) ------------
  translations: {
    en: { app_name: "Verda", tagline: "Environmental, Health & Safety Compliance — Simplified.",
      nav_monitor: "Monitor", nav_manage: "Manage", nav_grow: "Grow",
      dashboard: "Dashboard", reporting: "EEIS Reporting", esia: "ToR & ESIA Reporting",
      audits: "Audits", records: "Records", maps: "Maps & Site Visits", workflows: "Workflows",
      clients: "Clients & Compliance Care Plans", documents: "Documents Library", checklists: "Checklists",
      credits: "Credits & Billing", skills: "Skills Advisor",
      resources: "Resources Hub", supplies: "Supplies & Hire", iec: "IEC Materials", solutions: "Solutions",
      login: "Log in", signup: "Free Sign Up", logout: "Log out" },
    sw: { app_name: "Verda", tagline: "Uzingatiaji wa Mazingira, Afya na Usalama — Kwa Urahisi.",
      nav_monitor: "Fuatilia", nav_manage: "Simamia", nav_grow: "Kua",
      dashboard: "Dashibodi", reporting: "Ripoti ya EEIS", esia: "ToR na Ripoti ya ESIA",
      audits: "Ukaguzi", records: "Kumbukumbu", maps: "Ramani na Ziara za Tovuti", workflows: "Mtiririko wa Kazi",
      clients: "Wateja na Mipango ya Uzingatiaji", documents: "Maktaba ya Hati", checklists: "Orodha za Ukaguzi",
      credits: "Mikopo na Malipo", skills: "Mshauri wa Ujuzi",
      resources: "Kituo cha Rasilimali", supplies: "Vifaa na Ukodishaji", iec: "Nyenzo za IEC", solutions: "Suluhisho",
      login: "Ingia", signup: "Jisajili Bure", logout: "Toka" },
    fr: { app_name: "Verda", tagline: "Conformité Environnementale, Santé & Sécurité — Simplifiée.",
      nav_monitor: "Surveiller", nav_manage: "Gérer", nav_grow: "Développer",
      dashboard: "Tableau de bord", reporting: "Rapport EEIS", esia: "TdR et Rapport EIES",
      audits: "Audits", records: "Registres", maps: "Cartes et Visites de Site", workflows: "Flux de Travail",
      clients: "Clients et Plans de Conformité", documents: "Bibliothèque de Documents", checklists: "Listes de Contrôle",
      credits: "Crédits et Facturation", skills: "Conseiller en Compétences",
      resources: "Centre de Ressources", supplies: "Fournitures et Location", iec: "Matériel IEC", solutions: "Solutions",
      login: "Connexion", signup: "Inscription Gratuite", logout: "Déconnexion" },
    pt: { app_name: "Verda", tagline: "Conformidade Ambiental, Saúde e Segurança — Simplificada.",
      nav_monitor: "Monitorar", nav_manage: "Gerir", nav_grow: "Crescer",
      dashboard: "Painel", reporting: "Relatório EEIS", esia: "ToR e Relatório AIAS",
      audits: "Auditorias", records: "Registos", maps: "Mapas e Visitas ao Local", workflows: "Fluxos de Trabalho",
      clients: "Clientes e Planos de Conformidade", documents: "Biblioteca de Documentos", checklists: "Listas de Verificação",
      credits: "Créditos e Faturação", skills: "Conselheiro de Competências",
      resources: "Centro de Recursos", supplies: "Suprimentos e Aluguer", iec: "Materiais IEC", solutions: "Soluções",
      login: "Entrar", signup: "Inscrição Gratuita", logout: "Sair" }
  },

  // ---- Solutions matrix ---------------------------------------------------
  solutionsByNeed: ["Compliance Monitoring", "ESIA & Permitting", "Safety Management", "GHG & Carbon Reporting", "Community & CSR", "Training & Certification"],
  solutionsByIndustry: ["Manufacturing", "Quarrying & Mining", "Timber & Wood Processing", "Construction & Contracting", "Oil & Gas", "Agriculture & Agro-processing"],
  solutionsByRole: ["EHS Manager", "Safety Officer", "Site / Operations Manager", "HR Manager", "Executive / Compliance Director", "Contractor / Field Technician"],

  // ---- Workflow templates ---------------------------------------------------
  workflowTemplates: [
    { id: "hr", name: "HR Compliance Workflow", area: "HR",
      steps: ["New-hire EHS induction completed", "PPE issued and sign-off recorded", "Contractor EHS pre-qualification checked", "Training records updated in file", "Medical/fitness-to-work record on file"] },
    { id: "env", name: "Environmental Management Workflow", area: "Environment",
      steps: ["Incident/spill response steps followed", "Permit renewal tracked against expiry date", "Waste transfer manifests reconciled", "Effluent/air monitoring results logged", "Corrective actions closed out"] },
    { id: "safety", name: "Safety Administration Workflow", area: "Safety Admin",
      steps: ["Incident investigated and root cause recorded", "Near-miss logged and closed out", "Safety committee meeting held and minuted", "Corrective/preventive actions tracked to closure", "Statutory reporting obligations checked"] }
  ],

  // ---- Credit costs for AI/paid actions --------------------------------
  creditCosts: { aiDraft: 20, esiaSubmit: 50, auditAiSummary: 15 },
  freeSignupCredits: 100
};
