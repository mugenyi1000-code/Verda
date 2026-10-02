/* Verda — seed data & reference content.
   Editable in the browser (persisted to localStorage) — this file only supplies
   the first-run defaults so the app isn't empty on first load. */

const VERDA_SEED = {

  // ---- Clients ------------------------------------------------------------
  // Deliberately empty. Verda ships with no client on the books: the sites you
  // monitor are yours, and a named example company in someone else's register
  // is at best noise and at worst a real business appearing in a demo that was
  // never asked. Add the first client on the Clients screen — every other
  // screen that files a record against a site waits for that and says so.
  clients: [],

  // ---- Country / jurisdiction register ------------------------------------
  // The regulators, principal instruments and permits that apply in each
  // country Verda covers. This is a STARTING REGISTER compiled from publicly
  // known regulatory structure — it is not legal advice and it goes stale.
  // Every entry must be verified against the current consolidated text and
  // the regulator's own guidance before it is relied on; `contentReview`
  // below records when this register was last written and who should check
  // it. Amendments, statutory instruments and fee schedules change often.
  contentReview: { compiled: "2026-09", verifyBy: "2027-03", owner: "EHS content lead", linksChecked: "2026-09",
    note: "Regulator sites and e-permitting portals were checked in September 2026. Government portals are rebuilt and renamed often — if a link fails, start from the regulator's own home page. Verify every instrument, permit and authority against the current law of the jurisdiction before relying on it. Where a client operates across borders, the stricter requirement governs unless a local legal opinion says otherwise. Rwanda was added in September 2026 and carries the same warning twice over: two of its instruments are cited by year rather than by number (the 2016 air quality law and the 2024 mining law) because the number could not be confirmed from an official source — get the citation from the Official Gazette or RwandaLII before quoting either in a report." },

  countries: [
    {
      "id": "ug",
      "name": "Uganda",
      "languages": [
        "English",
        "Swahili"
      ],
      "currency": "UGX",
      "reportingLanguage": "English",
      "regulators": [
        {
          "name": "National Environment Management Authority",
          "abbr": "NEMA",
          "url": "https://www.nema.go.ug/",
          "remit": "ESIA approval, environmental audits, waste, noise, air"
        },
        {
          "name": "Directorate of Water Resources Management (Ministry of Water & Environment)",
          "abbr": "DWRM",
          "url": "https://www.mwe.go.ug/",
          "remit": "Water abstraction and wastewater discharge permits"
        },
        {
          "name": "Department of Occupational Safety and Health (Ministry of Gender, Labour & Social Development)",
          "abbr": "OSH",
          "url": "https://mglsd.go.ug/",
          "remit": "Workplace registration, statutory inspections, plant examination"
        },
        {
          "name": "Directorate of Geological Survey and Mines (Ministry of Energy & Mineral Development)",
          "abbr": "DGSM",
          "url": "https://www.minerals.go.ug/",
          "remit": "Mineral rights, mine inspection"
        },
        {
          "name": "Uganda Wildlife Authority",
          "abbr": "UWA",
          "url": "https://ugandawildlife.org/",
          "remit": "Operations in or near protected areas"
        },
        {
          "name": "National Forestry Authority",
          "abbr": "NFA",
          "url": "https://www.nfa.go.ug/",
          "remit": "Forest reserves, timber movement"
        },
        {
          "name": "Uganda Police Fire Brigade",
          "abbr": "—",
          "remit": "Fire safety certification"
        },
        {
          "name": "Atomic Energy Council",
          "abbr": "AEC",
          "url": "https://aec.go.ug/",
          "remit": "Radiation sources and gauges"
        },
        {
          "name": "Uganda National Bureau of Standards",
          "abbr": "UNBS",
          "url": "https://www.unbs.go.ug/",
          "remit": "Product and effluent standards"
        }
      ],
      "laws": [
        {
          "title": "National Environment Act",
          "instrument": "No. 5 of 2019",
          "covers": "Framework environmental law, ESIA, audits, penalties"
        },
        {
          "title": "National Environment (Environmental and Social Assessment) Regulations",
          "instrument": "2020",
          "covers": "Screening, scoping, ESIA and project brief procedure"
        },
        {
          "title": "National Environment (Waste Management) Regulations",
          "instrument": "2020",
          "covers": "Segregation, licensed transporters, transfer records"
        },
        {
          "title": "National Environment (Noise Standards and Control) Regulations",
          "instrument": "2003",
          "covers": "Day/night noise limits by receptor"
        },
        {
          "title": "Occupational Safety and Health Act",
          "instrument": "2006",
          "covers": "Duties of employers, workplace registration, reporting"
        },
        {
          "title": "Water Act and subsidiary Water (Waste Discharge) / (Abstraction) Regulations",
          "instrument": "Cap 152",
          "covers": "Abstraction and discharge permitting"
        },
        {
          "title": "Mining and Minerals Act",
          "instrument": "2022",
          "covers": "Mineral rights, ASM formalisation, closure obligations"
        },
        {
          "title": "Employment Act",
          "instrument": "2006 (as amended)",
          "covers": "Contracts, hours, child labour, termination"
        },
        {
          "title": "Workers' Compensation Act",
          "instrument": "Cap 225",
          "covers": "Compensation for occupational injury"
        }
      ],
      "portals": [
          {
            "name": "NEMA ELMIS — e-services portal",
            "what": "Project briefs, ToR and ESIA submission, certificate status",
            "url": "https://eservices.nema.go.ug/",
            "verified": true
          },
          {
            "name": "NEMA — ESIA guidance",
            "what": "Process, forms and requirements before you apply",
            "url": "https://www.nema.go.ug/en/esia/",
            "verified": true
          },
          {
            "name": "NEMA Mobile (ELMIS app)",
            "what": "Submit project briefs and ESIA applications from a phone",
            "url": "https://play.google.com/store/apps/details?id=com.nema_mobile",
            "verified": true
          },
          {
            "name": "Ministry of Water & Environment",
            "what": "Water abstraction, discharge and construction permits",
            "url": "https://www.mwe.go.ug/about/services",
            "verified": true
          },
          {
            "name": "Uganda Mining Cadastre eGov Portal",
            "what": "Mineral rights: apply, renew, pay statutory dues",
            "url": "https://dgsmportal.minerals.go.ug/",
            "verified": true
          },
          {
            "name": "URSB eRegistry",
            "what": "Company and business name registration",
            "url": "https://eregistry.ursb.go.ug/",
            "verified": true
          },
          {
            "name": "Doing Business Portal — licensing authorities",
            "what": "Which authority licenses what, with requirements and fees",
            "url": "https://doingbusiness.finance.go.ug/regulatory-licensing-authorities/national-environment-management-authority-nema",
            "verified": true
          }
        ],
        "permits": [
        {
          "permit": "ESIA Certificate of Approval",
          "authority": "NEMA",
          "when": "Before project implementation"
        },
        {
          "permit": "Project Brief approval (smaller projects)",
          "authority": "NEMA",
          "when": "Before implementation where full ESIA not required"
        },
        {
          "permit": "Annual environmental audit submission",
          "authority": "NEMA",
          "when": "Annually once operational"
        },
        {
          "permit": "Water abstraction permit",
          "authority": "DWRM",
          "when": "Before abstracting surface or ground water"
        },
        {
          "permit": "Wastewater discharge permit",
          "authority": "DWRM / NEMA",
          "when": "Before discharging effluent"
        },
        {
          "permit": "Waste transporter / handler licence (your contractor's)",
          "authority": "NEMA",
          "when": "Verify before every transfer"
        },
        {
          "permit": "Workplace registration certificate",
          "authority": "OSH Department",
          "when": "Before operating a workplace"
        },
        {
          "permit": "Fire safety certificate",
          "authority": "Police Fire Brigade",
          "when": "Annually"
        },
        {
          "permit": "Mineral right (exploration / retention / mining / location licence)",
          "authority": "DGSM",
          "when": "Before any mineral operation"
        },
        {
          "permit": "Radiation source licence",
          "authority": "Atomic Energy Council",
          "when": "Where gauges or sources are used"
        }
      ]
    },
    {
      "id": "ke",
      "name": "Kenya",
      "languages": [
        "English",
        "Swahili"
      ],
      "currency": "KES",
      "reportingLanguage": "English",
      "regulators": [
        {
          "name": "National Environment Management Authority",
          "abbr": "NEMA",
          "url": "https://www.nema.go.ke/",
          "remit": "EIA licensing, annual environmental audits, effluent licensing"
        },
        {
          "name": "Directorate of Occupational Safety and Health Services",
          "abbr": "DOSHS",
          "url": "https://www.doshmis.go.ke/",
          "remit": "Workplace registration, statutory examinations, OSH audits"
        },
        {
          "name": "Water Resources Authority",
          "abbr": "WRA",
          "url": "https://wra.go.ke/",
          "remit": "Water abstraction permits, catchment protection"
        },
        {
          "name": "State Department for Mining / Mining Licensing Committee",
          "url": "https://portal.miningcadastre.go.ke/",
          "abbr": "—",
          "remit": "Mineral rights under the Mining Act"
        },
        {
          "name": "National Construction Authority",
          "abbr": "NCA",
          "url": "https://nca.go.ke/",
          "remit": "Contractor registration, site compliance"
        },
        {
          "name": "Kenya Bureau of Standards",
          "abbr": "KEBS",
          "url": "https://www.kebs.org/",
          "remit": "Product and discharge standards"
        },
        {
          "name": "Kenya Nuclear Regulatory Authority",
          "abbr": "KNRA",
          "url": "https://knra.go.ke/",
          "remit": "Radiation sources"
        },
        {
          "name": "County governments",
          "abbr": "—",
          "remit": "Single business permits, local waste and nuisance control"
        }
      ],
      "laws": [
        {
          "title": "Environmental Management and Co-ordination Act (EMCA)",
          "instrument": "No. 8 of 1999 (amended 2015)",
          "covers": "Framework environmental law"
        },
        {
          "title": "Environmental (Impact Assessment and Audit) Regulations",
          "instrument": "2003 (amended 2019)",
          "covers": "EIA licensing and annual audit duty"
        },
        {
          "title": "Water Quality Regulations",
          "instrument": "2006",
          "covers": "Effluent standards and discharge licensing"
        },
        {
          "title": "Waste Management Regulations 2006 / Sustainable Waste Management Act 2022",
          "instrument": "—",
          "covers": "Segregation, licensed handlers, extended producer responsibility"
        },
        {
          "title": "Noise and Excessive Vibration Pollution (Control) Regulations",
          "instrument": "2009",
          "covers": "Noise and vibration limits, permits for noisy works"
        },
        {
          "title": "Air Quality Regulations",
          "instrument": "2014",
          "covers": "Emission standards and stack monitoring"
        },
        {
          "title": "Occupational Safety and Health Act",
          "instrument": "No. 15 of 2007",
          "covers": "Employer duties, safety committees, OSH audits"
        },
        {
          "title": "Work Injury Benefits Act",
          "instrument": "No. 13 of 2007",
          "covers": "Injury compensation and insurance"
        },
        {
          "title": "Mining Act",
          "instrument": "No. 12 of 2016",
          "covers": "Mineral rights, local content, community development agreements"
        },
        {
          "title": "Climate Change Act",
          "instrument": "2016 (amended 2023)",
          "covers": "Carbon reporting and carbon market participation"
        }
      ],
      "portals": [
          {
            "name": "NEMA on eCitizen",
            "what": "EIA licence, effluent discharge licence, waste licences — apply, pay and track",
            "url": "https://nema.ecitizen.go.ke/",
            "verified": true
          },
          {
            "name": "eCitizen",
            "what": "The single sign-on for most Kenyan government services",
            "url": "https://accounts.ecitizen.go.ke/",
            "verified": true
          },
          {
            "name": "DOSHS — workplace registration and renewal",
            "what": "Registration forms DOSHS 21A/21B/23, OSH levy, statutory audits",
            "url": "https://www.doshmis.go.ke/services/registration-and-renewal-of-workplaces",
            "verified": true
          },
          {
            "name": "Water Resources Authority — permitting",
            "what": "Water abstraction and use permits",
            "url": "https://wra.go.ke/water-use-allocation/",
            "verified": true
          },
          {
            "name": "Kenya Mining Cadastre Portal",
            "what": "Mineral rights: register, apply, pay, monitor licence status",
            "url": "https://portal.miningcadastre.go.ke/",
            "verified": true
          }
        ],
        "permits": [
        {
          "permit": "EIA Licence",
          "authority": "NEMA",
          "when": "Before project implementation"
        },
        {
          "permit": "Annual environmental audit report",
          "authority": "NEMA",
          "when": "Within 12 months of commencement, then annually"
        },
        {
          "permit": "Effluent discharge licence",
          "authority": "NEMA",
          "when": "Before discharging to environment or sewer"
        },
        {
          "permit": "Water abstraction permit",
          "authority": "WRA",
          "when": "Before abstraction"
        },
        {
          "permit": "Waste handler / transporter licence (your contractor's)",
          "authority": "NEMA",
          "when": "Verify before every transfer"
        },
        {
          "permit": "Workplace registration certificate",
          "authority": "DOSHS",
          "when": "Before occupation of premises"
        },
        {
          "permit": "Statutory OSH audit (annual) and fire safety audit",
          "authority": "DOSHS-approved auditor",
          "when": "Annually"
        },
        {
          "permit": "Noise permit for works outside permitted hours",
          "authority": "NEMA",
          "when": "Before the works"
        },
        {
          "permit": "Mineral right / mining licence",
          "authority": "Mining Licensing Committee",
          "when": "Before any mineral operation"
        },
        {
          "permit": "Single business permit",
          "authority": "County government",
          "when": "Annually"
        }
      ]
    },
    {
      "id": "tz",
      "name": "Tanzania",
      "languages": [
        "Swahili",
        "English"
      ],
      "currency": "TZS",
      "reportingLanguage": "English / Swahili",
      "regulators": [
        {
          "name": "National Environment Management Council",
          "abbr": "NEMC",
          "url": "https://www.nemc.or.tz/",
          "remit": "EIA certification, environmental audit, inspections"
        },
        {
          "name": "Vice President's Office – Division of Environment",
          "url": "https://www.vpo.go.tz/",
          "abbr": "VPO-DoE",
          "remit": "Policy, appeals, approvals"
        },
        {
          "name": "Occupational Safety and Health Authority",
          "abbr": "OSHA Tanzania",
          "url": "https://www.osha.go.tz/",
          "remit": "Workplace registration, compliance licence, statutory examinations"
        },
        {
          "name": "Mining Commission (Tume ya Madini)",
          "url": "https://www.tumemadini.go.tz/",
          "abbr": "—",
          "remit": "Mineral rights, mine inspection, ASM licensing"
        },
        {
          "name": "Basin Water Boards (Ministry of Water)",
          "abbr": "—",
          "remit": "Water use and discharge permits"
        },
        {
          "name": "Fire and Rescue Force",
          "abbr": "—",
          "remit": "Fire safety certification"
        },
        {
          "name": "Tanzania Atomic Energy Commission",
          "abbr": "TAEC",
          "url": "https://www.taec.go.tz/",
          "remit": "Radiation sources"
        },
        {
          "name": "Tanzania Bureau of Standards",
          "abbr": "TBS",
          "url": "https://www.tbs.go.tz/",
          "remit": "Standards and product certification"
        }
      ],
      "laws": [
        {
          "title": "Environmental Management Act",
          "instrument": "Cap 191 (No. 20 of 2004)",
          "covers": "Framework environmental law"
        },
        {
          "title": "Environmental Impact Assessment and Audit Regulations",
          "instrument": "2005 (as amended)",
          "covers": "EIA certificate procedure and audit duty"
        },
        {
          "title": "EM (Air Quality Standards) Regulations 2007 / (Water Quality Standards) Regulations 2007",
          "instrument": "—",
          "covers": "Ambient and emission standards"
        },
        {
          "title": "EM (Solid Waste Management) Regulations 2009 / (Hazardous Waste Control) Regulations",
          "instrument": "—",
          "covers": "Waste handling and transboundary movement"
        },
        {
          "title": "Occupational Health and Safety Act",
          "instrument": "No. 5 of 2003",
          "covers": "Employer duties, registration, notification of accidents"
        },
        {
          "title": "Workers Compensation Act",
          "instrument": "No. 20 of 2008",
          "covers": "Injury compensation via WCF"
        },
        {
          "title": "Employment and Labour Relations Act",
          "instrument": "No. 6 of 2004",
          "covers": "Employment standards"
        },
        {
          "title": "Mining Act",
          "instrument": "No. 14 of 2010 (as amended 2017)",
          "covers": "Mineral rights, local content, integrity of ASM licensing"
        },
        {
          "title": "Water Resources Management Act",
          "instrument": "No. 11 of 2009",
          "covers": "Abstraction and discharge control"
        }
      ],
      "portals": [
          {
            "name": "NEMC Projects Management System (PMS)",
            "what": "EIA and environmental audit submission for developers and registered experts",
            "url": "https://eia.nemc.or.tz/",
            "verified": true
          },
          {
            "name": "NEMC — EIA procedure",
            "what": "The steps, forms and fees before you apply",
            "url": "https://www.nemc.or.tz/",
            "verified": true
          },
          {
            "name": "OSHA Tanzania — services",
            "what": "Workplace registration, compliance licence, statutory examinations",
            "url": "https://www.osha.go.tz/services?language=eng",
            "verified": true
          },
          {
            "name": "Tume ya Madini — licence applications",
            "what": "Mineral licence application forms and services",
            "url": "http://tumemadini.eganet.go.tz/licensing/licence-application/",
            "verified": true
          },
          {
            "name": "Madini Portal — mining cadastre map",
            "what": "Licence map and cadastre search",
            "url": "http://portal.madini.go.tz/map/",
            "verified": true
          }
        ],
        "permits": [
        {
          "permit": "EIA Certificate",
          "authority": "NEMC / VPO",
          "when": "Before project implementation"
        },
        {
          "permit": "Environmental audit (annual / as directed)",
          "authority": "NEMC",
          "when": "Once operational"
        },
        {
          "permit": "Water use permit",
          "authority": "Basin Water Board",
          "when": "Before abstraction"
        },
        {
          "permit": "Discharge permit",
          "authority": "Basin Water Board / NEMC",
          "when": "Before discharging effluent"
        },
        {
          "permit": "OSHA compliance licence and workplace registration",
          "authority": "OSHA Tanzania",
          "when": "Before operating; renewed annually"
        },
        {
          "permit": "Fire safety certificate",
          "authority": "Fire and Rescue Force",
          "when": "Annually"
        },
        {
          "permit": "Mineral right (PL / ML / SML / PML)",
          "authority": "Mining Commission",
          "when": "Before any mineral operation"
        },
        {
          "permit": "Hazardous waste permit",
          "authority": "NEMC",
          "when": "Where hazardous waste is generated or moved"
        },
        {
          "permit": "Radiation licence",
          "authority": "TAEC",
          "when": "Where sources are used"
        }
      ]
    },
    {
      "id": "cd",
      "name": "DR Congo",
      "languages": [
        "French",
        "Lingala",
        "Swahili"
      ],
      "currency": "CDF",
      "reportingLanguage": "French — submissions to authorities are made in French",
      "regulators": [
        {
          "name": "Agence Congolaise de l'Environnement",
          "abbr": "ACE",
          "url": "https://www.ace.gouv.cd/",
          "remit": "Approval of EIES and PGES outside the mining sector"
        },
        {
          "name": "Ministère de l'Environnement et Développement Durable",
          "abbr": "MEDD",
          "url": "https://environnement.gouv.cd/",
          "remit": "Environmental policy and enforcement"
        },
        {
          "name": "Direction de Protection de l'Environnement Minier",
          "url": "https://www.mines-rdc.cd/",
          "abbr": "DPEM",
          "remit": "Environmental approval and inspection for mining projects"
        },
        {
          "name": "Cadastre Minier",
          "abbr": "CAMI",
          "url": "https://cami.cd/",
          "remit": "Mining titles and perimeters"
        },
        {
          "name": "Service d'Assistance et d'Encadrement de l'Exploitation Minière Artisanale et à Petite Échelle",
          "abbr": "SAEMAPE",
          "url": "https://saemape.cd/",
          "remit": "Artisanal and small-scale mining oversight"
        },
        {
          "name": "Inspection Générale du Travail",
          "abbr": "IGT",
          "remit": "Labour inspection and workplace conditions"
        },
        {
          "name": "Caisse Nationale de Sécurité Sociale",
          "url": "https://www.cnss.cd/",
          "abbr": "CNSS",
          "remit": "Social security and occupational injury"
        }
      ],
      "laws": [
        {
          "title": "Loi portant principes fondamentaux relatifs à la protection de l'environnement",
          "instrument": "Loi n° 11/009 du 9 juillet 2011",
          "covers": "Framework environmental law"
        },
        {
          "title": "Décret fixant les règles de fonctionnement des mécanismes procéduraux de la protection de l'environnement",
          "instrument": "Décret n° 14/019 de 2014",
          "covers": "EIES, PGES, audit and public consultation procedure"
        },
        {
          "title": "Code Minier",
          "instrument": "Loi n° 007/2002, révisée par la Loi n° 18/001 du 9 mars 2018",
          "covers": "Mining rights, environmental obligations, community development (dotation 0.3%)"
        },
        {
          "title": "Règlement Minier",
          "instrument": "Décret n° 038/2003, révisé par Décret n° 18/024",
          "covers": "Detailed mining environmental procedure: EIES, PGES, PAR, closure"
        },
        {
          "title": "Code du Travail",
          "instrument": "Loi n° 015/2002 (modifiée par la Loi n° 16/010 de 2016)",
          "covers": "Employment, child labour prohibition, workplace safety"
        },
        {
          "title": "OECD Due Diligence Guidance for Responsible Supply Chains of Minerals",
          "instrument": "OECD, 3rd edition",
          "covers": "Applies to 3TG and cobalt from conflict-affected and high-risk areas"
        }
      ],
      "portals": [
          {
            "name": "Cadastre Minier (CAMI)",
            "what": "Titres miniers et de carrières — demande, renouvellement, cadastre",
            "url": "https://cami.cd/",
            "verified": true
          },
          {
            "name": "CAMI — conditions de demande",
            "what": "Ce qu'il faut fournir avant de déposer une demande",
            "url": "https://cami.cd/conditions-de-demande/",
            "verified": true
          },
          {
            "name": "ITIE RDC — octroi des droits miniers",
            "what": "Explication de la procédure d'octroi, y compris l'instruction environnementale",
            "url": "https://www.itierdc.net/octroi-des-droits-miniers/",
            "verified": true
          }
        ],
        "permits": [
        {
          "permit": "Étude d'Impact Environnemental et Social (EIES) approval",
          "authority": "ACE (or DPEM for mining)",
          "when": "Before project implementation"
        },
        {
          "permit": "Plan de Gestion Environnementale du Projet (PGEP/PGES) approval",
          "authority": "ACE / DPEM",
          "when": "With the EIES"
        },
        {
          "permit": "Plan d'Atténuation et de Réhabilitation (PAR)",
          "authority": "DPEM",
          "when": "For small-scale mining operations"
        },
        {
          "permit": "Sûreté financière de réhabilitation (rehabilitation financial guarantee)",
          "authority": "DPEM",
          "when": "Before mining operations begin"
        },
        {
          "permit": "Titre minier (permis de recherche / permis d'exploitation)",
          "authority": "CAMI",
          "when": "Before any mineral operation"
        },
        {
          "permit": "Carte d'exploitant artisanal / ZEA registration",
          "authority": "SAEMAPE",
          "when": "For artisanal operators and zones"
        },
        {
          "permit": "Autorisation de rejet d'effluents",
          "authority": "ACE",
          "when": "Before discharging effluent"
        },
        {
          "permit": "Déclaration d'établissement to labour inspectorate",
          "authority": "IGT",
          "when": "On establishing a workplace"
        }
      ]
    },
    {
      "id": "zm",
      "name": "Zambia",
      "languages": [
        "English"
      ],
      "currency": "ZMW",
      "reportingLanguage": "English",
      "regulators": [
        {
          "name": "Zambia Environmental Management Agency",
          "abbr": "ZEMA",
          "url": "https://www.zema.org.zm/",
          "remit": "EIA/EPB decisions, licensing of emissions, effluent and waste"
        },
        {
          "name": "Mine Safety Department (Ministry of Mines and Minerals Development)",
          "url": "https://www.mmmd.gov.zm/",
          "abbr": "MSD",
          "remit": "Mine safety inspection, statutory mine regulations"
        },
        {
          "name": "Mining Cadastre Department",
          "url": "https://eservices.gov.zm/",
          "abbr": "—",
          "remit": "Mining rights and licences"
        },
        {
          "name": "Water Resources Management Authority",
          "abbr": "WARMA",
          "url": "https://warma.org.zm/",
          "remit": "Water abstraction and use permits"
        },
        {
          "name": "Occupational Health and Safety Institute / Ministry of Labour",
          "abbr": "OHSI",
          "remit": "Workplace health surveillance and OSH enforcement"
        },
        {
          "name": "Workers' Compensation Fund Control Board",
          "abbr": "WCFCB",
          "url": "https://www.wcfcb.org.zm/",
          "remit": "Occupational injury compensation"
        },
        {
          "name": "Zambia Bureau of Standards",
          "abbr": "ZABS",
          "url": "https://www.zabs.org.zm/",
          "remit": "Standards"
        },
        {
          "name": "Radiation Protection Authority",
          "abbr": "RPA",
          "remit": "Radiation sources"
        }
      ],
      "laws": [
        {
          "title": "Environmental Management Act",
          "instrument": "No. 12 of 2011",
          "covers": "Framework environmental law, polluter-pays, licensing"
        },
        {
          "title": "Environmental Impact Assessment Regulations",
          "instrument": "SI No. 28 of 1997",
          "covers": "EPB and EIS procedure"
        },
        {
          "title": "EMA (Licensing) Regulations",
          "instrument": "SI No. 112 of 2013",
          "covers": "Emission, effluent, waste and pesticide licences"
        },
        {
          "title": "Hazardous Waste Management Regulations",
          "instrument": "SI No. 125 of 2001",
          "covers": "Hazardous waste handling and movement"
        },
        {
          "title": "Mines and Minerals Development Act",
          "instrument": "No. 11 of 2015",
          "covers": "Mineral rights, environmental protection fund, closure"
        },
        {
          "title": "Occupational Health and Safety Act",
          "instrument": "No. 36 of 2010",
          "covers": "Employer duties, health and safety committees"
        },
        {
          "title": "Factories Act",
          "instrument": "Cap 441",
          "covers": "Registration of factories, plant examination, welfare"
        },
        {
          "title": "Workers' Compensation Act",
          "instrument": "No. 10 of 1999",
          "covers": "Injury compensation"
        },
        {
          "title": "Water Resources Management Act",
          "instrument": "No. 21 of 2011",
          "covers": "Abstraction, discharge and catchment protection"
        }
      ],
      "portals": [
          {
            "name": "ZEMA e-services (via ZamPass)",
            "what": "EPB/EIS decisions, emission, effluent and waste licences",
            "url": "https://eservices.gov.zm/",
            "verified": true
          },
          {
            "name": "ZamPass registration",
            "what": "The government single sign-on you need before any ZEMA application",
            "url": "https://zampass.gsb.gov.zm/register",
            "verified": true
          },
          {
            "name": "ZEMA — licensing services",
            "what": "Which licence you need and what it covers",
            "url": "https://www.zema.org.zm/our-services/licensing/",
            "verified": true
          },
          {
            "name": "My-WARMA portal",
            "what": "Water abstraction and use permits",
            "url": "http://water-permits.warma.org.zm/home",
            "verified": true
          },
          {
            "name": "WARMA — permitting and licensing",
            "what": "Requirements, including the ZEMA approval needed for civil works",
            "url": "https://warma.org.zm/?page_id=1733",
            "verified": true
          },
          {
            "name": "Zambia Mining Cadastre (Government Service Bus)",
            "what": "Mining rights applications and licence administration",
            "url": "https://eservices.gov.zm/",
            "verified": true
          },
          {
            "name": "Geological data portal",
            "what": "Public spatial mining and geological data",
            "url": "https://ngdr.gsb.gov.zm/",
            "verified": true
          }
        ],
        "permits": [
        {
          "permit": "Environmental Project Brief (EPB) or Environmental Impact Statement (EIS) decision letter",
          "authority": "ZEMA",
          "when": "Before project implementation"
        },
        {
          "permit": "Emission licence (air)",
          "authority": "ZEMA",
          "when": "Where emissions to air occur"
        },
        {
          "permit": "Effluent / water pollution control licence",
          "authority": "ZEMA",
          "when": "Before discharging effluent"
        },
        {
          "permit": "Waste management licence (generator / transporter / disposer)",
          "authority": "ZEMA",
          "when": "Verify your contractor's before every transfer"
        },
        {
          "permit": "Hazardous waste licence",
          "authority": "ZEMA",
          "when": "Where hazardous waste is generated or moved"
        },
        {
          "permit": "Water abstraction / use permit",
          "authority": "WARMA",
          "when": "Before abstraction"
        },
        {
          "permit": "Factory registration certificate",
          "authority": "Factories Inspectorate",
          "when": "Before operating a factory"
        },
        {
          "permit": "Mining right / licence",
          "authority": "Mining Cadastre Department",
          "when": "Before any mineral operation"
        },
        {
          "permit": "Environmental Protection Fund (EPF) contribution and approved rehabilitation plan",
          "authority": "EPF / MSD",
          "when": "Before mining operations; reviewed periodically"
        },
        {
          "permit": "Radiation licence",
          "authority": "Radiation Protection Authority",
          "when": "Where sources are used"
        }
      ]
    },
    {
      "id": "rw",
      "name": "Rwanda",
      "languages": [
        "Kinyarwanda",
        "English",
        "French",
        "Swahili"
      ],
      "currency": "RWF",
      "reportingLanguage": "English",
      "regulators": [
        {
          "name": "Rwanda Environment Management Authority",
          "abbr": "REMA",
          "url": "https://www.rema.gov.rw/",
          "remit": "EIA certificates, environmental audit certification, pollution and air quality control"
        },
        {
          "name": "Rwanda Development Board",
          "abbr": "RDB",
          "url": "https://rdb.rw/",
          "remit": "Reviews EIA reports, runs site visits and public hearings; investment registration; national parks"
        },
        {
          "name": "Rwanda Water Resources Board",
          "abbr": "RWB",
          "url": "https://www.rwb.rw/",
          "remit": "Water use permits — abstraction, discharge, catchment management"
        },
        {
          "name": "Rwanda Mines, Petroleum and Gas Board",
          "abbr": "RMB",
          "url": "https://www.rmb.gov.rw/",
          "remit": "Mineral and quarry licensing, mine inspection, blasting recommendations"
        },
        {
          "name": "Ministry of Public Service and Labour",
          "abbr": "MIFOTRA",
          "url": "https://mifotra.gov.rw/",
          "remit": "Labour inspection, occupational safety and health, workplace safety committees"
        },
        {
          "name": "Rwanda Forestry Authority",
          "abbr": "RFA",
          "url": "https://www.rfa.rw/",
          "remit": "Forest reserves, tree cutting authorisation, forest management"
        },
        {
          "name": "Rwanda Standards Board",
          "abbr": "RSB",
          "remit": "National standards, product and service certification, metrology"
        },
        {
          "name": "Rwanda National Police — Fire and Rescue",
          "abbr": "—",
          "remit": "Fire safety inspection and certification"
        }
      ],
      "laws": [
        {
          "title": "Law on Environment",
          "instrument": "N° 48/2018 of 13/08/2018",
          "covers": "Framework environmental law; environmental assessment under Article 32"
        },
        {
          "title": "Ministerial Order establishing the list of projects that must undergo environmental impact assessment",
          "instrument": "N° 001/2019 of 15/04/2019",
          "covers": "Which projects require a full EIA before authorisation"
        },
        {
          "title": "Ministerial Order establishing the list of projects that must undergo environmental audit",
          "instrument": "N° 001/2021 of 08/02/2021",
          "covers": "Audit obligation for listed ongoing projects, instructions and procedure"
        },
        {
          "title": "Law regulating labour in Rwanda",
          "instrument": "N° 66/2018 of 30/08/2018",
          "covers": "Employment, working conditions, employer health and safety duties"
        },
        {
          "title": "Ministerial Order on occupational safety and health",
          "instrument": "N° 02/MIFOTRA/22 of 30/08/2022",
          "covers": "Workplace OSH requirements and safety committees"
        },
        {
          "title": "Law establishing Rwanda Forestry Authority",
          "instrument": "N° 72/2019 of 29/01/2020",
          "covers": "Forest resource management, protection and authorisations"
        },
        {
          "title": "Air quality and prevention of air pollution law",
          "instrument": "2016",
          "covers": "Air pollution control; mandates REMA to regulate air quality"
        },
        {
          "title": "Mining and quarry law",
          "instrument": "2024",
          "covers": "Exploration, mining, processing, trade and export of minerals; licence conditions"
        }
      ],
      "portals": [
        {
          "name": "REMA online application portal",
          "what": "Environmental assessment and audit applications, ToR and report submission",
          "url": "https://applications.rema.gov.rw/",
          "verified": true
        },
        {
          "name": "REMA — services",
          "what": "What each certificate covers and what the application requires",
          "url": "https://www.rema.gov.rw/services",
          "verified": true
        },
        {
          "name": "RDB Business Procedures — EIA certificate",
          "what": "The EIA certificate procedure step by step, with fees and timelines",
          "url": "https://businessprocedures.rdb.rw/procedure/212?l=en",
          "verified": true
        },
        {
          "name": "RWater Permit — water concession portal",
          "what": "Apply for, track and manage a water use permit",
          "url": "https://waterpermit.rwb.rw/",
          "verified": true
        },
        {
          "name": "Rwanda Water Portal",
          "what": "Catchment and water resource data",
          "url": "https://waterportal.rwb.rw/",
          "verified": true
        },
        {
          "name": "RMB — licensing",
          "what": "Mining, quarry and mineral trading licence requirements",
          "url": "https://www.rmb.gov.rw/1/licensing",
          "verified": true
        },
        {
          "name": "IremboGov",
          "what": "The national e-service portal many permits are applied for through",
          "url": "https://irembo.gov.rw/",
          "verified": true
        }
      ],
      "permits": [
        {
          "permit": "EIA Certificate",
          "authority": "REMA (RDB reviews and runs the public hearing)",
          "when": "Before implementing a project on the MO N° 001/2019 list"
        },
        {
          "permit": "Environmental audit certificate",
          "authority": "REMA",
          "when": "For ongoing projects on the MO N° 001/2021 list"
        },
        {
          "permit": "Water use permit",
          "authority": "RWB",
          "when": "Before abstracting from any natural source, or discharging — includes mineral washing and industrial use"
        },
        {
          "permit": "Mining or quarry licence",
          "authority": "RMB",
          "when": "Before exploration or extraction; renewed and maintained on fee"
        },
        {
          "permit": "Blasting materials recommendation",
          "authority": "RMB",
          "when": "Before using explosives"
        },
        {
          "permit": "Investment certificate / project registration",
          "authority": "RDB",
          "when": "At project set-up, through the One Stop Centre"
        },
        {
          "permit": "Tree cutting / forest use authorisation",
          "authority": "RFA",
          "when": "Before clearing trees or working in a forest reserve"
        },
        {
          "permit": "Protected area consent",
          "authority": "RDB",
          "when": "For work in or near Volcanoes, Akagera or Nyungwe national parks"
        },
        {
          "permit": "Fire safety inspection",
          "authority": "Rwanda National Police — Fire and Rescue",
          "when": "Before occupation and periodically thereafter"
        },
        {
          "permit": "Product / service certification",
          "authority": "RSB",
          "when": "Where a national standard applies to what is produced"
        }
      ]
    }
  ],

  // ---- Industries + baseline compliance checklists --------------------------
  // ---- Industries + baseline compliance checklists --------------------------
  // Checklists are a starting position for a competent practitioner, not a
  // statement of law. `countryNotes` flag where a jurisdiction diverges.
  industries: [
    {
      "id": "manufacturing",
      "group": "Industrial & Manufacturing",
      "name": "Manufacturing / Factories",
      "checklist": [
        "Environmental approval (ESIA certificate, EIA licence or project brief decision) current and displayed",
        "Annual environmental audit submitted to the regulator where the jurisdiction requires it",
        "Workplace / factory registration certificate current",
        "Effluent discharge permit current, with sampling at the permitted frequency",
        "Effluent treatment plant operating to design; results trended against limits",
        "Air emission points inventoried; stack testing current and within limits",
        "Chemical inventory complete, with a current SDS available at point of use",
        "Chemical storage: segregation by compatibility, bunding, ventilation, spill kits",
        "Waste segregated at source; licensed transporter verified and transfer notes retained",
        "Hazardous waste stored under cover on impermeable bunded hardstanding",
        "Machine guarding in place on all nip, shear and rotating points",
        "Lockout/tagout procedure in place, with personal locks issued and training records",
        "Pressure vessels, boilers, compressors and lifting equipment statutorily examined",
        "Electrical installation inspection and portable appliance testing current",
        "Fire detection and suppression serviced; extinguishers tagged and in date",
        "Fire exits unobstructed; evacuation drill held at the required frequency with a record",
        "Noise survey completed; hearing protection zones signed and enforced",
        "Local exhaust ventilation tested at the statutory interval where fume or dust is generated",
        "Occupational health surveillance matched to the exposures actually present",
        "PPE issued against a task-based hazard assessment, with issue records",
        "First aid provision and trained first aiders on every shift",
        "Contractor control: induction, permit to work, and EHS pre-qualification on file",
        "Incident and near-miss register maintained and reviewed by management monthly",
        "Energy and water consumption metered and tracked against a baseline"
      ]
    },
    {
      "id": "foodbev",
      "group": "Industrial & Manufacturing",
      "name": "Food & Beverage Processing",
      "checklist": [
        "Food safety / public health licence current and displayed",
        "Environmental approval and effluent discharge permit current",
        "HACCP or equivalent food safety plan documented, with verification records",
        "Cold chain temperature monitoring with alarms and corrective action records",
        "Potable water quality tested at the required frequency",
        "Cleaning and sanitation chemicals: SDS available, segregated from product",
        "CIP system validated; rinse verification records retained",
        "High-strength effluent (BOD/COD/FOG) pre-treated before discharge; results trended",
        "Grease traps and interceptors serviced on schedule",
        "Ammonia or CO₂ refrigeration: leak detection, alarms, emergency procedure, competent operators",
        "Confined space entry procedure for tanks, silos and vessels",
        "Pest control programme with a current map, bait station records and trend review",
        "Worker health screening, exclusion policy for illness, and hygiene training records",
        "Allergen control and label verification where applicable",
        "Machine guarding and lockout/tagout on fillers, conveyors and mixers",
        "Slip and fall control on wet floors — drainage, footwear, matting",
        "Packaging and organic waste segregation; food waste diversion route",
        "Boiler and steam system statutory examination current",
        "Fire detection, suppression and evacuation drills recorded",
        "Incident and near-miss register maintained and reviewed"
      ]
    },
    {
      "id": "textiles",
      "group": "Industrial & Manufacturing",
      "name": "Textiles & Apparel",
      "checklist": [
        "Environmental approval current for dyeing, printing and finishing operations",
        "Effluent discharge permit current; colour, pH, COD and heavy metals monitored",
        "Effluent treatment plant operating to design, with sludge disposal under licence",
        "Chemical inventory with current SDS; restricted substances list applied to inputs",
        "Chemical storage segregated, bunded and ventilated; decanting controlled",
        "Boiler and steam distribution statutorily examined; condensate return maintained",
        "Machine guarding on cutting, spinning, knitting and pressing equipment",
        "Needle guards and finger guards on sewing machines; needle control procedure",
        "Lockout/tagout during threading, cleaning and maintenance",
        "Cotton dust and fibre exposure assessed; extraction and respiratory protection provided",
        "Noise survey in weaving and spinning halls; hearing protection enforced",
        "Heat stress assessment in pressing and dyeing areas with rest and hydration measures",
        "Fire detection, sprinklers and hydrants serviced in a high fuel-load environment",
        "Fire exits unobstructed and unlocked during working hours; drills recorded",
        "Building structural integrity assessment where multi-storey production is used",
        "Working hours, overtime and wage records compliant with the labour code",
        "Freedom of association respected; functioning worker grievance mechanism",
        "Child labour and age verification controls at recruitment",
        "Ergonomic assessment for repetitive sewing and cutting tasks",
        "Incident and near-miss register maintained and reviewed"
      ]
    },
    {
      "id": "timber",
      "group": "Industrial & Manufacturing",
      "name": "Timber & Wood Processing",
      "checklist": [
        "Forestry / timber processing licence and environmental approval current",
        "Chain-of-custody documentation for every timber input; legality of source verifiable",
        "Timber movement permits held for transported product where required",
        "Reforestation or offset commitments tracked against the licence condition",
        "Wood dust: extraction at source, exposure assessment, and respiratory protection",
        "Wood dust explosion risk assessed — ductwork, collectors, ignition control",
        "Fire risk assessment current for a high fuel-load environment; hot work permit system in use",
        "Fire detection, hydrants and extinguishers serviced and accessible",
        "Machine guarding on saws, planers, moulders and chippers; push sticks and jigs provided",
        "Circular and band saw blade condition, tensioning and change procedure",
        "Lockout/tagout applied during blade changes and jam clearing",
        "Noise survey completed; hearing protection enforced in mill areas",
        "Hand-arm vibration exposure assessed for chainsaw and sander operators",
        "Timber treatment chemicals (e.g. CCA, boron): storage, SDS, drip trays, effluent control",
        "Treatment effluent permitted and monitored where discharged",
        "Sawdust and offcut handling, storage and disposal or beneficial use",
        "Manual handling and lifting aids for heavy sections",
        "Mobile plant and forklift operator certification and pre-use checks",
        "First aid provision matched to amputation and laceration risk; trauma kit available",
        "Incident and near-miss register maintained; community and worker grievance route in place"
      ]
    },
    {
      "id": "mining-lsm",
      "group": "Mining & Minerals",
      "name": "Mining — Large Scale (Open Pit & Underground)",
      "checklist": [
        "Mineral right / mining licence current, and operations within the licensed perimeter",
        "ESIA / EIS approval and the environmental management plan current for the mine plan in force",
        "Mine closure and rehabilitation plan approved, costed, and reviewed at the required interval",
        "Rehabilitation financial assurance in place and at the current required value (e.g. Zambia's Environmental Protection Fund; a bond or guarantee elsewhere)",
        "Progressive rehabilitation carried out as areas come out of use, not deferred to closure",
        "Tailings storage facility: Engineer of Record appointed in writing and currently engaged",
        "TSF dam safety review at the required frequency, with actions tracked to closure",
        "TSF deposition plan, water balance and freeboard monitored against design limits",
        "TSF instrumentation (piezometers, survey monuments) read on schedule and trending reviewed",
        "TSF emergency preparedness and response plan tested, with downstream communities informed",
        "Conformance position against the Global Industry Standard on Tailings Management documented",
        "Acid rock drainage / metal leaching characterisation completed and management measures in place",
        "Waste rock dump design, stability monitoring and encapsulation of reactive material",
        "Pit slope geotechnical review current; slope monitoring system operating with trigger levels",
        "Underground: ventilation survey current, airflow at each working face verified against plan",
        "Underground: gas monitoring, ground support standard, refuge chambers and escape routes verified",
        "Shaft, hoisting and winding plant statutory examinations current",
        "Mine rescue team trained, equipped and available at the required strength",
        "Blasting: licensed blaster, explosives magazine licence, and blast design records",
        "Blast vibration and airblast monitored at nearest receptors against limits; community notified before each blast",
        "Haul road design, speed control, berms, and traffic management plan enforced",
        "Occupational hygiene monitoring: respirable crystalline silica, DPM, noise, whole-body vibration, heat",
        "Medical surveillance programme matched to exposures, with exit medicals on separation",
        "Cyanide management aligned to the International Cyanide Management Code (gold operations)",
        "Reagent storage and handling: acids, bunding, secondary containment, emergency showers",
        "NORM (naturally occurring radioactive material) assessed where the orebody warrants it",
        "Water: dewatering authorised, discharge quality monitored, site-wide water balance maintained",
        "Resettlement and compensation obligations tracked per household where displacement occurred",
        "Community development agreement / local content obligations tracked against commitments",
        "Security personnel trained on the Voluntary Principles on Security and Human Rights",
        "Artisanal mining interface: encroachment policy, engagement record, no forced eviction",
        "Grievance mechanism operating, with time-bound closure and no retaliation",
        "Emergency response: TSF breach, underground fire, chemical release, mass casualty — drilled",
        "Incident and near-miss register maintained; high-potential incidents investigated to root cause"
      ],
      "countryNotes": {
        "zm": "Environmental Protection Fund contribution and Mine Safety Department inspections are the two Zambian requirements most often missed.",
        "cd": "Mining projects are approved through DPEM rather than ACE, and all submissions are made in French.",
        "tz": "Mining Commission licensing plus NEMC environmental certification are separate obligations — holding one does not satisfy the other.",
        "rw": "RMB holds the licence and REMA holds the EIA certificate — and the water use permit for mineral washing is a third, separate application to RWB."
      }
    },
    {
      "id": "mining-asm",
      "group": "Mining & Minerals",
      "name": "Artisanal & Small-Scale Mining (ASM)",
      "checklist": [
        "Formalisation status recorded: licence, permit, cooperative membership or designated zone",
        "Site boundaries known and not encroaching on a large-scale concession or protected area",
        "Child labour prohibited: age verification at site entry and a documented remediation route if found",
        "Forced labour and debt bondage checks, including for transported and migrant workers",
        "Pit and shaft safety: depth limits, shoring, ladder condition, no undercutting",
        "Ventilation and gas checks before entry to any shaft or adit",
        "Dewatering arrangements and control of inrush risk",
        "PPE available, fitted and actually worn — helmet, boots, eye, respiratory, gloves",
        "Mercury: use recorded, retorts or alternatives promoted, Minamata Convention obligations understood",
        "Cyanide or acid use (where present) controlled, stored and disposed of safely",
        "Dust and silica exposure controls — wet drilling, wetting of ore, respiratory protection",
        "Potable water, sanitation and washing facilities at the site",
        "Occupational health: silicosis awareness, malaria and HIV programmes, first aid provision",
        "Gender-based violence prevention; safe participation of women in mining",
        "Traceability and due diligence: OECD Due Diligence Guidance applied; CAHRA assessment documented",
        "Chain-of-custody scheme participation recorded where applicable (e.g. ITSCI, RMI) for 3TG and cobalt",
        "Buyer and exporter records retained, with production volumes reconciled",
        "Riverbank, siltation and land degradation controls; rehabilitation of worked-out pits",
        "Community engagement record and a route for complaints to be raised safely",
        "Revenue sharing and local benefit arrangements documented where they exist"
      ],
      "countryNotes": {
        "cd": "OECD due diligence and cobalt/3TG chain-of-custody are the defining compliance issues for Congolese ASM; SAEMAPE registration and ZEA status are the formalisation anchors.",
        "tz": "Primary Mining Licence (PML) holders fall under the Mining Commission with specific ASM environmental regulations.",
        "ug": "ASM is formalised under the Mining and Minerals Act 2022 — check location licence status."
      }
    },
    {
      "id": "mineral-processing",
      "group": "Mining & Minerals",
      "name": "Mineral Processing, Smelting & Refining",
      "checklist": [
        "Operating and environmental licences current for the processing route in use",
        "Stack emission monitoring (SO₂, particulates, metals) against licence limits, with calibration records",
        "Ambient air monitoring at the fence line and nearest community receptor",
        "Acid plant operation, conversion efficiency and emergency shutdown procedures",
        "Slag, residue and process waste characterised, stored and disposed of under licence",
        "Tailings and process effluent quality monitored; closed-circuit water use maximised",
        "Solvent extraction / electrowinning: solvent inventory, fire risk, vapour control",
        "Reagent handling: sulphuric acid, caustic, flocculants — bunding, PPE, emergency showers",
        "Molten metal and hot work: PPE to standard, splash protection, exclusion zones",
        "Process safety: HAZOP or equivalent completed, recommendations closed, management of change applied",
        "Pressure vessels, boilers and lifting equipment statutorily examined and certified",
        "Occupational hygiene: metal fume, acid mist, noise, heat stress — monitored and controlled",
        "Biological monitoring where lead, cadmium, arsenic or manganese exposure is credible",
        "Energy intensity and GHG emissions tracked per tonne of product",
        "Product stewardship: safety data sheets issued, concentrate transport classified and placarded",
        "Emergency response for chemical release, acid spill and fire — drilled with the local authority",
        "Community complaints on dust, odour and emissions logged and closed out",
        "Incident and near-miss register maintained and reviewed by management monthly"
      ]
    },
    {
      "id": "quarrying",
      "group": "Mining & Minerals",
      "name": "Quarrying & Aggregates",
      "checklist": [
        "Quarry licence / mineral right and environmental approval current and on site",
        "Approved quarry development plan followed; extraction within the permitted boundary and depth",
        "Blast management plan; licensed blaster and explosives magazine licence current",
        "Blast vibration and airblast monitored at nearest structures against limits",
        "Pre-blast condition surveys of nearby structures held on file",
        "Community pre-blast notification procedure operating and evidenced",
        "Face and bench geometry inspected; no overhangs or undercut faces",
        "Edge protection, bunding and exclusion zones at pit edges and tips",
        "Dust suppression on haul roads, crushers and stockpiles, operating and logged",
        "Respirable crystalline silica exposure assessed with controls and health surveillance",
        "Noise monitoring against limits at the nearest receptor",
        "Crusher and screen guarding, isolation and lockout/tagout procedure",
        "Conveyor guarding, emergency stop pull-cords tested",
        "Mobile plant: operator certification, daily pre-use inspection, seatbelt and proximity controls",
        "Haul road design, speed limits, signage and traffic management enforced",
        "Water abstraction permit and settlement/silt control before any discharge",
        "Fuel and oil storage bunded, with a spill kit and trained responders",
        "Progressive rehabilitation and the restoration plan tracked with photographic evidence",
        "Rehabilitation financial assurance in place where the licence requires it",
        "Community grievance log maintained and reviewed"
      ]
    },
    {
      "id": "construction",
      "group": "Energy, Resources & Construction",
      "name": "Construction & Contracting",
      "checklist": [
        "Project environmental approval or screening decision on file for the works as built",
        "Site-specific ESMP available, briefed to the workforce and updated as works change",
        "Construction permit and approved drawings held on site",
        "Contractor registration current where the jurisdiction requires it",
        "Site induction for every worker and visitor, with records",
        "Fall protection: edge protection, harness inspection, anchor point certification",
        "Scaffolding erected by a competent person, tagged, and inspected weekly",
        "Excavation: support design, inspection before each shift, access ladders, spoil setback",
        "Underground and overhead services located and controlled before breaking ground",
        "Lifting operations: appointed person, lift plan, crane and tackle certification",
        "Mobile plant: operator certification, banksman, pedestrian segregation",
        "Temporary electrical installation inspected; RCD protection and cable management",
        "Hot work permit system in operation with fire watch",
        "Confined space entry procedure with rescue arrangements",
        "Dust, noise and vibration controls at the site boundary, monitored against limits",
        "Stormwater runoff, silt traps and watercourse protection in place",
        "Waste and debris segregated; licensed disposal with transfer records",
        "Fuel and chemical storage bunded with spill response equipment",
        "Sanitation, drinking water and welfare facilities for the workforce",
        "Worker accommodation inspected against the accommodation standard where provided",
        "Sub-contractor EHS pre-qualification and monthly performance review on file",
        "Community liaison, advance notice of disruptive works, and a grievance log",
        "Traffic management plan for site and public road interfaces",
        "Emergency response plan with assembly points, drills and a nominated hospital",
        "Incident and near-miss register maintained and reviewed monthly"
      ]
    },
    {
      "id": "oilgas",
      "group": "Energy, Resources & Construction",
      "name": "Oil & Gas",
      "checklist": [
        "Environmental approval and operating licences current for the facility in use",
        "Process safety management system documented, with HAZOP recommendations closed",
        "Safety case or major accident hazard assessment current where required",
        "Tank and pipeline integrity inspection programme current, with anomalies tracked",
        "Cathodic protection and corrosion monitoring records",
        "Pressure safety valve testing and certification current",
        "Flaring and venting recorded; emissions monitored and reported",
        "Fugitive emission / LDAR programme operating with a repair backlog under control",
        "Produced water and drilling fluid handling permitted and monitored",
        "Spill prevention and response plan current, with equipment staged and drilled",
        "Hazardous area classification current; electrical equipment certified for zone",
        "Hot work, confined space and isolation permit systems with cross-references",
        "Gas detection and fire & gas system functional testing on schedule",
        "Emergency shutdown system tested at the required interval",
        "H₂S risk assessed where present, with detection, escape sets and drills",
        "Journey management and defensive driving programme for all road movements",
        "Contractor management: bridging document with each major contractor",
        "Naturally occurring radioactive material (NORM) assessed and managed",
        "Waste streams characterised; hazardous waste licensed end-to-end",
        "Decommissioning and abandonment liability assessed and funded",
        "Community and stakeholder engagement log maintained; grievance mechanism operating",
        "Security personnel trained on the Voluntary Principles on Security and Human Rights",
        "Emergency drills — spill, fire, medevac, well control — conducted and reviewed",
        "Incident and near-miss register maintained; high-potential events investigated to root cause"
      ]
    },
    {
      "id": "energy",
      "group": "Energy, Resources & Construction",
      "name": "Energy & Utilities",
      "checklist": [
        "Generation, transmission or distribution licence and environmental approvals current",
        "High-voltage work: permit to work, isolation, earthing and competent person register",
        "Arc-flash study completed; PPE matched to incident energy and labelling in place",
        "Approach boundaries and live working policy defined and enforced",
        "Substation access control, interlocking and anti-climb protection",
        "Transformer oil: PCB status confirmed, containment bunding, spill response",
        "SF₆ inventory and leak accounting where gas-insulated switchgear is used",
        "Thermal plant: emissions monitoring, ash handling and water discharge under permit",
        "Hydropower: environmental flow releases, fish passage and reservoir management per licence",
        "Solar/wind: panel and blade waste route, avian and bat monitoring where required",
        "Working at height on towers and poles: rescue plan and competent climbers",
        "Vegetation management and right-of-way clearance logged",
        "Public safety: line clearances, warning signage, response to reported hazards",
        "Outage and emergency response plan tested with the system operator",
        "Community notification process for planned outages and construction",
        "Wayleave, easement and resettlement obligations tracked",
        "Grid-connection and metering compliance records",
        "Incident and near-miss register maintained; electrical contact incidents investigated fully"
      ]
    },
    {
      "id": "water",
      "group": "Energy, Resources & Construction",
      "name": "Water, Sanitation & Waste",
      "checklist": [
        "Abstraction, discharge and waste-handling licences current for every site",
        "Treatment process monitoring with accredited laboratory results on file",
        "Drinking water quality compliance reported at the required frequency",
        "Chlorine or ozone handling: storage, detection, emergency procedure, escape sets",
        "Confined space entry: permit, gas testing, tripod rescue and trained attendants",
        "Biological hazard controls, vaccination programme and hand hygiene facilities",
        "Sludge characterisation, storage, and disposal or reuse under licence",
        "Landfill or disposal site: cell design, leachate collection, gas management, cover",
        "Leachate quality monitored against the permit; groundwater boreholes sampled",
        "Waste acceptance procedure with rejection criteria and records",
        "Weighbridge and waste transfer note reconciliation",
        "Odour and vector control measures implemented and complaint-tracked",
        "Vehicle and plant movements segregated from pedestrians at tipping areas",
        "Scavenging and unauthorised access controlled humanely and lawfully",
        "Fire prevention and response for waste stockpiles and landfill gas",
        "Community grievance log maintained and reviewed",
        "Worker health surveillance matched to biological and chemical exposures",
        "Incident and near-miss register maintained and reviewed"
      ]
    },
    {
      "id": "transport",
      "group": "Services & Commerce",
      "name": "Transport & Logistics",
      "checklist": [
        "Operating licences and vehicle roadworthiness certificates current for the whole fleet",
        "Driver licences, medical fitness and endorsements verified and diarised",
        "Hours-of-service and fatigue management policy with monitoring evidence",
        "Journey management plan for long-distance and high-risk routes",
        "Defensive driving training completed and refreshed at the set interval",
        "In-vehicle monitoring or telematics reviewed, with over-speed follow-up",
        "Pre-use vehicle inspection records completed daily",
        "Planned preventive maintenance schedule adhered to, with records",
        "Dangerous goods: classification, packaging, placarding, documentation and driver training",
        "Emergency response information carried for every dangerous load",
        "Load securing procedure and axle-load compliance",
        "Manual handling assessment and mechanical aids at loading points",
        "Warehouse racking inspection, forklift certification and pedestrian segregation",
        "Fuel storage bunded with spill kits at every depot",
        "Vehicle emissions and fuel consumption tracked per vehicle",
        "Third-party and sub-contracted hauliers held to the same standard, with audits",
        "Road traffic incident investigation to root cause, not just driver blame",
        "Incident and near-miss register maintained and reviewed"
      ]
    },
    {
      "id": "hospitality",
      "group": "Services & Commerce",
      "name": "Hospitality & Tourism",
      "checklist": [
        "Operating, food service and liquor licences current",
        "Fire detection, alarm, emergency lighting and extinguisher servicing current",
        "Evacuation plan posted, drills held, and guest-facing procedures in place",
        "Kitchen hygiene, temperature control and pest control records maintained",
        "Food handler health screening and training certificates",
        "Gas installation (LPG) inspection, leak detection and emergency shut-off",
        "Deep fat fryer and kitchen extraction cleaning schedule",
        "Pool and spa water quality tested and logged; chemical storage controlled",
        "Legionella risk assessment and water system management",
        "Laundry and cleaning chemical SDS available; dosing systems controlled",
        "Housekeeping ergonomics, sharps procedure and lone-working arrangements",
        "Guest safety: balcony, window restrictor, hot water scald and slip controls",
        "Security and guest privacy arrangements, including CCTV governance",
        "Safeguarding policy covering child protection and prevention of exploitation",
        "Waste segregation, food waste diversion and single-use plastic reduction",
        "Water and energy consumption tracked per guest-night",
        "Wildlife and protected-area rules observed where tourism operations touch them",
        "Incident register covering guests, staff and contractors"
      ]
    },
    {
      "id": "retail",
      "group": "Services & Commerce",
      "name": "Retail & Wholesale",
      "checklist": [
        "Trading licence and fire safety certificate current",
        "Emergency exits clear, unlocked during trading hours, and evacuation plan posted",
        "Fire equipment serviced; staff trained in first response and evacuation",
        "Racking inspected by a competent person; load notices displayed",
        "Forklift and pallet truck operator certification and pedestrian segregation",
        "Manual handling assessment and mechanical aids for heavy or awkward stock",
        "Slip, trip and fall prevention programme with spill response and cleaning records",
        "Hazardous consumer products stored and displayed per SDS requirements",
        "Cold chain monitoring for chilled and frozen goods",
        "Food handling and hygiene standards where fresh food is sold",
        "Cash handling and robbery prevention procedure; staff support after incidents",
        "Lone working and late-trading risk assessment",
        "Customer safety in car parks and delivery yards; vehicle-pedestrian controls",
        "Waste segregation, packaging take-back and e-waste route through licensed handlers",
        "Refrigerant management and leak checks",
        "First aid provision and trained first aiders on every shift",
        "Incident register covering customers and staff"
      ]
    },
    {
      "id": "telecom",
      "group": "Services & Commerce",
      "name": "Telecom & ICT",
      "checklist": [
        "Site and tower construction approvals and wayleaves on file",
        "Structural integrity assessment of towers and masts at the set interval",
        "Working at height: rescue plan, competent climbers, harness inspection records",
        "Rooftop and tower access control, with permit to climb",
        "RF exposure assessment completed; exclusion zones signed and enforced",
        "Isolation procedure for transmitters before climbing work",
        "Generator fuel storage bunded with spill kit; refuelling procedure",
        "Battery rooms: ventilation, acid handling, eyewash, fire detection",
        "Battery, panel and e-waste disposal through licensed handlers with records",
        "Data centre fire suppression serviced; gas release safety procedure",
        "Standby power and UPS testing on schedule",
        "Lone-worker and remote-site check-in procedure with escalation",
        "Journey management for remote site visits",
        "Security arrangements at unmanned sites, including community relations",
        "Land access agreements and community grievance route for tower sites",
        "Energy consumption per site tracked; diesel displacement projects recorded",
        "Incident and near-miss register maintained"
      ]
    },
    {
      "id": "finance",
      "group": "Services & Commerce",
      "name": "Financial & Professional Services",
      "checklist": [
        "Workplace occupational health & safety registration current",
        "Fire safety certificate, alarm testing, drills and trained fire marshals",
        "Emergency evacuation plan including provision for visitors and disabled occupants",
        "First aid provision and trained first aiders per floor or headcount",
        "Ergonomic / display screen equipment assessments completed and acted on",
        "Electrical installation inspection and portable appliance testing current",
        "Air conditioning servicing and indoor air quality complaints tracked",
        "Business continuity and emergency response plan tested at least annually",
        "Lone working, late working and travel security procedures",
        "Staff wellbeing and mental health support arrangements",
        "Contractor and cleaner management, including out-of-hours access control",
        "Confidential waste and e-waste disposal through licensed handlers",
        "Energy, water and paper consumption tracked for ESG reporting",
        "Scope 3 and financed-emissions data collection where the institution reports them",
        "Supplier ESG screening applied to material vendors",
        "Incident register maintained, including near-misses and security events"
      ]
    },
    {
      "id": "agriculture",
      "group": "Public, Health & Agriculture",
      "name": "Agriculture & Agro-processing",
      "checklist": [
        "Environmental approval on file where the scale or activity requires it",
        "Water abstraction permit current for irrigation and processing",
        "Agrochemical store: locked, ventilated, bunded, with a current inventory and SDS",
        "Only registered pesticides in use; banned and restricted products absent from stock",
        "Spray operator training and certification; re-entry intervals posted and observed",
        "Spray PPE issued, decontaminated and stored separately from other clothing",
        "Cholinesterase or equivalent health monitoring for organophosphate applicators",
        "Empty container triple-rinsing and licensed disposal route",
        "Buffer zones to watercourses, homes and schools observed during application",
        "Processing effluent permitted and monitored; wash-water managed",
        "Organic waste, husk and pomace management or beneficial use",
        "Farm machinery guarding (PTO shafts, augers, balers) and operator training",
        "Tractor rollover protection and seatbelt use",
        "Grain silo and confined space entry procedure with rescue arrangements",
        "Child labour policy and age verification, including on outgrower and seasonal labour",
        "Seasonal and migrant worker contracts, wages, housing and transport standards",
        "Drinking water, sanitation and shade for field workers",
        "Heat stress and snake/insect bite first aid arrangements",
        "Land tenure and community access rights respected; grievance mechanism operating",
        "Traceability records for chemical application and harvest lots",
        "Incident and near-miss register maintained"
      ]
    },
    {
      "id": "healthcare",
      "group": "Public, Health & Agriculture",
      "name": "Healthcare & Medical",
      "checklist": [
        "Facility operating licence and health authority approvals current",
        "Professional registration of clinical staff verified and diarised",
        "Healthcare waste segregated at source into the correct colour-coded streams",
        "Sharps containers compliant, not over-filled, and collected on schedule",
        "Healthcare waste storage, transport and treatment through a licensed route with records",
        "Sharps injury prevention programme and post-exposure prophylaxis available 24/7",
        "Infection prevention and control programme with audit and surveillance data",
        "Hand hygiene compliance monitored",
        "Isolation and outbreak response procedure, with PPE stock verified",
        "Sterilisation and autoclave validation records",
        "Radiation: source licence, shielding survey, dosimetry and pregnancy declaration policy",
        "Medical gases: storage, segregation, valve condition and pipeline testing",
        "Chemical and cytotoxic drug handling with dedicated PPE and spill kits",
        "Mercury-free thermometry and disposal of legacy devices",
        "Staff immunisation and occupational health surveillance current",
        "Violence and aggression prevention for clinical and reception staff",
        "Manual handling of patients: equipment provided and training current",
        "Backup power and water for critical care areas tested",
        "Fire strategy accounting for dependent and non-ambulant patients; drills recorded",
        "Wastewater from the facility monitored where the discharge permit requires it",
        "Incident and near-miss register including clinical and non-clinical events"
      ]
    },
    {
      "id": "education",
      "group": "Public, Health & Agriculture",
      "name": "Education",
      "checklist": [
        "Institution registration and building occupancy approvals current",
        "Fire detection, extinguishers, exits and evacuation drills logged each term",
        "Evacuation plan accounting for young children and disabled students",
        "Laboratory chemical inventory with SDS, segregated storage and spill provision",
        "Fume cupboard testing and laboratory ventilation adequacy",
        "Workshop machine guarding, supervision ratios and PPE for practical subjects",
        "Playground and sports equipment inspection records",
        "Safeguarding and child protection policy with vetted staff and a reporting route",
        "Student incident reporting and parental notification procedure",
        "Drinking water quality and adequate sanitation facilities by headcount and sex",
        "Menstrual hygiene facilities available and maintained",
        "Food service hygiene records where catering is on site",
        "Transport safety: bus roadworthiness, driver vetting, seatbelts and supervision",
        "Boarding accommodation: fire safety, supervision, and night-time evacuation plan",
        "First aid provision, trained staff and a sick bay",
        "Asbestos and lead paint status known for older buildings",
        "Waste and e-waste disposal through licensed handlers",
        "Emergency plan for medical, security and severe weather events"
      ]
    },
    {
      "id": "publicsector",
      "group": "Public, Health & Agriculture",
      "name": "Public Sector & NGOs",
      "checklist": [
        "Programme or project environmental and social screening completed where required",
        "Donor safeguarding, environmental and social standards mapped to the programme",
        "Workplace OSH registration and fire safety provisions current at every office",
        "Field staff travel, security and lone-worker procedures with check-in protocol",
        "Security risk assessment per operating area, refreshed on a schedule",
        "Duty of care arrangements including medevac cover for field staff",
        "Safeguarding policy covering beneficiaries, with a confidential reporting channel",
        "Prevention of sexual exploitation and abuse training completed by all staff",
        "Community engagement and grievance mechanism operating and publicised",
        "Beneficiary data protection and consent procedures",
        "Partner and sub-grantee due diligence, including EHS and safeguarding capacity",
        "Asset, fuel and generator management records",
        "Vehicle fleet safety: roadworthiness, driver training, journey management",
        "Waste and e-waste disposal through licensed handlers",
        "Programme carbon footprint tracked where the donor requires reporting",
        "Incident register covering staff, beneficiaries and partners"
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

  // ---- IFC Performance Standards reporting --------------------------------
  // The eight IFC Performance Standards on Environmental and Social
  // Sustainability — the framework lenders and international clients most
  // often require alongside national (e.g. NEMA) reporting.
  ifcStandards: [
    { id: "ps1", label: "PS1 — Assessment & Management of E&S Risks and Impacts", hint: "ESMS, risk identification, management programmes, monitoring and review" },
    { id: "ps2", label: "PS2 — Labor and Working Conditions", hint: "Working conditions, worker grievance mechanism, OHS, contracted and supply-chain workers" },
    { id: "ps3", label: "PS3 — Resource Efficiency and Pollution Prevention", hint: "Resource use, GHG emissions, effluent, air emissions, waste and hazardous materials" },
    { id: "ps4", label: "PS4 — Community Health, Safety and Security", hint: "Community exposure to risk, emergency preparedness, conduct of security personnel" },
    { id: "ps5", label: "PS5 — Land Acquisition and Involuntary Resettlement", hint: "Physical/economic displacement, compensation, livelihood restoration" },
    { id: "ps6", label: "PS6 — Biodiversity Conservation & Living Natural Resources", hint: "Habitat and species impacts, ecosystem services, sustainable resource management" },
    { id: "ps7", label: "PS7 — Indigenous Peoples", hint: "Consultation, free prior and informed consent where applicable, impacts on lands and culture" },
    { id: "ps8", label: "PS8 — Cultural Heritage", hint: "Chance-finds procedure, tangible and intangible cultural heritage" }
  ],

  // ---- ESSR — Environmental & Social Self-Monitoring Report ---------------
  // The monthly self-monitoring report a construction contractor submits to
  // the lender, the independent E&S consultant (IESC), the Employer and the
  // Engineer. Structure follows the SBC/ESAP/ESSR format used on large
  // donor- and lender-financed infrastructure contracts: every section
  // carries the month's updates, cumulative KPI reporting, and a management
  // comment, plus the numeric returns the reviewers check first.
  //
  // `fields` are the figures the section's KPI tables actually ask for.
  // `blocks` (on the standard, below) are the narrative boxes.
  essrSections: [
    { id: "intro", label: "1.0 Introduction", hint: "Purpose, distribution list, reporting basis; \"no change\" where monitoring is less frequent than monthly",
      fields: [
        { key: "reportTo", label: "Submitted to", type: "text", placeholder: "Lender, IESC, Employer, Engineer" },
        { key: "monitoringPlan", label: "Monitoring plan / ESMP ref", type: "text" }
      ] },
    { id: "activities", label: "2.0 Main Activities during the Month", hint: "Work fronts active this month and percentage completion by element",
      fields: [
        { key: "workFronts", label: "Active work fronts", type: "number" },
        { key: "overallProgress", label: "Overall progress", type: "number", unit: "%" }
      ] },
    { id: "labour-stats", label: "3.0 Labour Statistics", hint: "Direct and indirect employment split by sex, local/non-local and expatriate",
      fields: [
        { key: "directTotal", label: "Direct employment — total", type: "number" },
        { key: "directMale", label: "Direct — male", type: "number" },
        { key: "directFemale", label: "Direct — female", type: "number" },
        { key: "directLocal", label: "Direct — from host district", type: "number" },
        { key: "directOutside", label: "Direct — from outside district", type: "number" },
        { key: "directExpat", label: "Direct — expatriates", type: "number" },
        { key: "indirectTotal", label: "Indirect (sub-contractors) — total", type: "number" },
        { key: "indirectMale", label: "Indirect — male", type: "number" },
        { key: "indirectFemale", label: "Indirect — female", type: "number" },
        { key: "indirectLocal", label: "Indirect — from host district", type: "number" }
      ] },
    { id: "ehs-org", label: "4.0 EHS Organisation at End of Month", hint: "EHS staffing establishment and any changes during the month",
      fields: [
        { key: "ehsStaff", label: "EHS staff in post", type: "number" },
        { key: "ehsVacancies", label: "Vacant EHS positions", type: "number" },
        { key: "ehsChanges", label: "Changes this month", type: "text", placeholder: "Joiners / leavers / role changes" }
      ] },
    { id: "hs-stats", label: "5.0 Health & Safety Statistics", hint: "Accidents, H&S interactions, PPE penetration, specific trainings, sub-contractor statistics",
      fields: [
        { key: "manhours", label: "Man-hours worked (month)", type: "number" },
        { key: "lti", label: "Lost time injuries", type: "number" },
        { key: "daysLost", label: "Work days lost", type: "number" },
        { key: "firstAidCases", label: "First aid cases", type: "number" },
        { key: "nearMiss", label: "Near-miss cards received", type: "number" },
        { key: "inductions", label: "H&S inductions conducted", type: "number" },
        { key: "toolbox", label: "Toolbox talks", type: "number" },
        { key: "mso", label: "Management safety observations", type: "number" },
        { key: "observationForms", label: "H&S observation forms received", type: "number" },
        { key: "ppeIssued", label: "PPE issued", type: "number" },
        { key: "ppeLost", label: "PPE lost", type: "number" },
        { key: "ppeViolations", label: "Staff observed without proper PPE", type: "number" },
        { key: "firstAidKits", label: "First aid kits checked / refilled", type: "text" },
        { key: "fireEquipment", label: "Fire equipment checked / serviced", type: "text" }
      ] },
    { id: "clinic", label: "5.2 Site Clinic Activities", hint: "Consultations, notifiable conditions, referrals, campaigns and outbreak response",
      fields: [
        { key: "consultations", label: "Consultations", type: "number" },
        { key: "malaria", label: "Malaria cases", type: "number" },
        { key: "referrals", label: "Referrals to health facility", type: "number" },
        { key: "campaigns", label: "Health campaigns / sensitisations", type: "number" },
        { key: "clinicLicence", label: "Clinic licence status", type: "text", placeholder: "Licensed / renewal due" }
      ] },
    { id: "security", label: "6.0 Security, Emergency Response & Incident Management", hint: "Security incidents and severity, drills and exercises, VPSHR training, emergency contacts",
      fields: [
        { key: "securityIncidents", label: "Security incidents", type: "number" },
        { key: "drills", label: "Drills / exercises conducted", type: "number" },
        { key: "drillAttendees", label: "Drill attendees", type: "number" },
        { key: "guards", label: "Security personnel deployed", type: "number" },
        { key: "vpshr", label: "VPSHR / human rights training (attendees)", type: "number" }
      ] },
    { id: "labour-mgmt", label: "7.0 Labour Force Management", hint: "Recruitment, contracts, workers' representatives, worker grievance mechanism",
      fields: [
        { key: "recruited", label: "Workers recruited", type: "number" },
        { key: "separations", label: "Separations / terminations", type: "number" },
        { key: "workerMeetings", label: "Workers' representative meetings", type: "number" },
        { key: "workerGrievances", label: "Worker grievances received", type: "number" },
        { key: "workerGrievancesClosed", label: "Worker grievances closed", type: "number" }
      ] },
    { id: "accommodation", label: "8.0 Workers' Accommodation Management", hint: "Camp inspections against IFC/EBRD accommodation standards, findings and close-out",
      fields: [
        { key: "camps", label: "Camps in use", type: "number" },
        { key: "occupancy", label: "Total occupancy", type: "number" },
        { key: "inspections", label: "Inspections conducted", type: "number" },
        { key: "findingsOpen", label: "Findings open at month end", type: "number" }
      ] },
    { id: "traffic", label: "9.0 Traffic Management", hint: "Road safety on project and community roads, driver training, signage, flag personnel",
      fields: [
        { key: "trafficIncidents", label: "Traffic incidents", type: "number" },
        { key: "kmDriven", label: "Distance driven", type: "number", unit: "km" },
        { key: "driversTrained", label: "Drivers / operators trained", type: "number" },
        { key: "vehicleInspections", label: "Vehicle inspections", type: "number" },
        { key: "speedViolations", label: "Speed violations recorded", type: "number" }
      ] },
    { id: "water-energy", label: "10.0 Water & Energy Consumption", hint: "Abstraction by source and activity, drinking water, energy use and emission rate",
      fields: [
        { key: "waterMonth", label: "Water abstracted (month)", type: "number", unit: "m³" },
        { key: "waterAccum", label: "Water abstracted (cumulative)", type: "number", unit: "m³" },
        { key: "drinkingWater", label: "Drinking water consumed", type: "number", unit: "litres" },
        { key: "abstractionPermit", label: "Abstraction permit no. / daily limit", type: "text" },
        { key: "energyKwh", label: "Energy consumption (month)", type: "number", unit: "kWh" },
        { key: "co2PerDay", label: "Average CO₂ emission", type: "number", unit: "kg/day" },
        { key: "dieselLitres", label: "Diesel consumed", type: "number", unit: "litres" }
      ] },
    { id: "community-hs", label: "11.0 Community Health & Safety", hint: "Noise and vibration against limits, dust/air quality, community sensitisation",
      fields: [
        { key: "noiseReadings", label: "Noise measurements taken", type: "number" },
        { key: "noiseExceed", label: "Noise readings above limit", type: "number" },
        { key: "vibrationReadings", label: "Vibration measurements taken", type: "number" },
        { key: "vibrationExceed", label: "Vibration readings above limit", type: "number" },
        { key: "pm25", label: "PM2.5 (average)", type: "number", unit: "µg/m³" },
        { key: "communitySensitisations", label: "Community sensitisations held", type: "number" }
      ] },
    { id: "waste", label: "12.0 Waste Management", hint: "Quantities generated by stream, handling route and waste transfer notes",
      fields: [
        { key: "recyclable", label: "Recyclable waste", type: "number", unit: "m³" },
        { key: "biodegradable", label: "Biodegradable waste", type: "number", unit: "m³" },
        { key: "hazardous", label: "Hazardous waste & contaminated soil", type: "number", unit: "m³" },
        { key: "medical", label: "Medical waste", type: "number", unit: "m³" },
        { key: "sewage", label: "Sewage removed", type: "number", unit: "m³" },
        { key: "usedOil", label: "Used oil", type: "number", unit: "drums" },
        { key: "wtn", label: "Waste transfer notes issued", type: "number" },
        { key: "wasteHandler", label: "Licensed waste handler", type: "text" }
      ] },
    { id: "wastewater", label: "13.0 Wastewater & Storm Water Management", hint: "Effluent quality against standards, drainage, erosion and sediment control",
      fields: [
        { key: "effluentTests", label: "Effluent samples tested", type: "number" },
        { key: "effluentExceed", label: "Results outside standard", type: "number" },
        { key: "drainageMaintained", label: "Drainage maintained", type: "number", unit: "m" },
        { key: "erosionControls", label: "Erosion control measures installed", type: "number" },
        { key: "oilWaterSeparators", label: "Oil-water separators serviced", type: "number" }
      ] },
    { id: "biodiversity", label: "14.0 Biodiversity Management", hint: "Habitat and species encounters, clearance control, invasive species, offsets",
      fields: [
        { key: "speciesEncounters", label: "Protected species encounters", type: "number" },
        { key: "areaCleared", label: "New area cleared", type: "number", unit: "ha" },
        { key: "treesPlanted", label: "Trees planted", type: "number" },
        { key: "invasiveControl", label: "Invasive species control (area)", type: "number", unit: "ha" }
      ] },
    { id: "restoration", label: "15.0 Restoration & Re-instatement", hint: "Borrow areas, quarry and camp restoration progress against the restoration programme",
      fields: [
        { key: "areasUnderRestoration", label: "Areas under restoration", type: "number" },
        { key: "areaRestored", label: "Area restored to date", type: "number", unit: "ha" },
        { key: "topsoilReinstated", label: "Topsoil re-instated", type: "number", unit: "m³" },
        { key: "restorationProgress", label: "Restoration programme progress", type: "number", unit: "%" }
      ] },
    { id: "community-dev", label: "16.0 Community Development & Engagement", hint: "CCC meetings, local authority interaction, CSR delivery, grievance monitoring",
      fields: [
        { key: "meetings", label: "Community meetings held", type: "number" },
        { key: "participants", label: "Participants", type: "number" },
        { key: "authorityVisits", label: "Local authority interactions / visits", type: "number" },
        { key: "csrActivities", label: "CSR activities delivered", type: "number" },
        { key: "grievancesReceived", label: "Community grievances received", type: "number" },
        { key: "grievancesClosed", label: "Community grievances closed", type: "number" },
        { key: "grievancesOpen", label: "Grievances open at month end", type: "number" }
      ] },
    { id: "cultural", label: "17.0 Cultural Heritage Management", hint: "Chance finds procedure, mapping of sites, graves and relocation, authority interaction",
      fields: [
        { key: "chanceFinds", label: "Chance finds this month", type: "number" },
        { key: "sitesMapped", label: "Sites mapped / demarcated", type: "number" },
        { key: "gravesRelocated", label: "Graves relocated (cumulative)", type: "number" },
        { key: "authorityInteractions", label: "Interactions with cultural authorities / museums", type: "number" }
      ] },
    { id: "stakeholder", label: "18.0 Contractor's Stakeholder Engagement", hint: "Engagement activities against the stakeholder engagement plan, disclosure and feedback",
      fields: [
        { key: "engagements", label: "Engagement activities", type: "number" },
        { key: "stakeholders", label: "Stakeholders engaged", type: "number" },
        { key: "disclosures", label: "Disclosures / notices issued", type: "number" },
        { key: "radioSpots", label: "Radio / notice board announcements", type: "number" }
      ] },
    { id: "influx", label: "19.0 Influx Management", hint: "Access control, local recruitment and procurement, accommodation, skills transfer, legacy",
      fields: [
        { key: "localRecruitment", label: "Local recruitment share", type: "number", unit: "%" },
        { key: "localProcurement", label: "Local goods & services procured", type: "number", unit: "value" },
        { key: "skillsTransfer", label: "Workers in skills transfer / training", type: "number" },
        { key: "influxIndicators", label: "Influx indicators monitored", type: "text" }
      ] },
    { id: "demob", label: "20.0 Project Demobilisation", hint: "Demobilisation planning, asset disposal, workforce release and site handover",
      fields: [
        { key: "demobProgress", label: "Demobilisation progress", type: "number", unit: "%" },
        { key: "workersDemobilised", label: "Workers demobilised", type: "number" },
        { key: "assetsDisposed", label: "Assets disposed / transferred", type: "number" },
        { key: "areasHandedOver", label: "Areas handed over", type: "number" }
      ] },
    { id: "permits", label: "21.0 Status of Statutory Requirements & Permits", hint: "Permit register: issuing authority, status, compliance, programme impact, remedy",
      fields: [
        { key: "permitsRequired", label: "Permits / approvals required", type: "number" },
        { key: "permitsAcquired", label: "Acquired and valid", type: "number" },
        { key: "permitsPending", label: "Applied for / pending", type: "number" },
        { key: "permitsExpiring", label: "Expiring within 90 days", type: "number" },
        { key: "nonCompliances", label: "Open non-compliances", type: "number" }
      ] },
    { id: "appendices", label: "Appendices", hint: "Workers' representative minutes, health workshops, air/noise/water monitoring, SOPs, camp management, CCC meeting, internal audit, non-compliances, restoration map",
      fields: [
        { key: "appendixList", label: "Appendices attached", type: "text", placeholder: "A – Workers' representative minutes; B – Health awareness workshop; C – Air, noise & water monitoring; …" },
        { key: "appendixCount", label: "Number of appendices", type: "number" }
      ] }
  ],

  // Which frameworks a periodic report can be built against.
  reportStandards: [
    { id: "verda", name: "Verda Reporting — modular segments", shortName: "Verda", title: "VERDA REPORTING", segmentsKey: "reportSegments" },
    { id: "ifc", name: "IFC Performance Standards — PS1 to PS8", shortName: "IFC PS", title: "IFC PERFORMANCE STANDARDS REPORT", segmentsKey: "ifcStandards" },
    { id: "essr", name: "ESSR — Environmental & Social Self-Monitoring Report (monthly)", shortName: "ESSR", title: "ENVIRONMENTAL & SOCIAL SELF-MONITORING REPORT", segmentsKey: "essrSections",
      blocks: [
        { key: "updates", label: "Monthly updates" },
        { key: "kpi", label: "KPI reporting — cumulative information" },
        { key: "comment", label: "Management comment" }
      ],
      headerFields: [
        { key: "docNo", label: "Document no.", placeholder: "e.g. ABC/707/ESAP/ESSR/080" },
        { key: "version", label: "Version", placeholder: "e.g. 1.3" },
        { key: "project", label: "Project / contract", placeholder: "e.g. Hoima International Airport" },
        { key: "distribution", label: "Distribution", placeholder: "Lender; IESC; Employer; Engineer" }
      ] }
  ],

  // ---- Terms of Reference --------------------------------------------------
  // The ToR is a different document from the ESIA and is written first: it
  // scopes what the ESIA must do, who does it, by when and to what standard.
  // Merging the two hides that the ToR is what the regulator approves before
  // any study starts.
  torSections: [
    {
      "id": "tor-intro",
      "title": "1. Introduction & Background",
      "hint": "Who the developer is, why the project exists, and why an ESIA is being commissioned"
    },
    {
      "id": "tor-objectives",
      "title": "2. Objectives of the Assignment",
      "hint": "What the ESIA must achieve — stated so completion can be judged against it"
    },
    {
      "id": "tor-project",
      "title": "3. Project Description (as known at scoping)",
      "hint": "Components, capacity, footprint, phases and alternatives still open"
    },
    {
      "id": "tor-area",
      "title": "4. Study Area & Area of Influence",
      "hint": "Direct and indirect area of influence, with boundary coordinates"
    },
    {
      "id": "tor-legal",
      "title": "5. Policy, Legal & Institutional Framework to be Addressed",
      "hint": "National law, permits, lender standards and conventions the study must cover"
    },
    {
      "id": "tor-scope",
      "title": "6. Scope of Work & Tasks",
      "hint": "Task by task, what the consultant will do"
    },
    {
      "id": "tor-method",
      "title": "7. Methodology & Baseline Studies Required",
      "hint": "Surveys, sampling, modelling and their seasons, frequencies and standards"
    },
    {
      "id": "tor-stakeholder",
      "title": "8. Stakeholder Engagement Requirements",
      "hint": "Who must be consulted, how, when, and how it will be evidenced"
    },
    {
      "id": "tor-deliverables",
      "title": "9. Deliverables & Reporting Schedule",
      "hint": "Each report, its due date, format and number of copies"
    },
    {
      "id": "tor-team",
      "title": "10. Expertise & Team Composition",
      "hint": "Disciplines required, registration of experts, minimum experience"
    },
    {
      "id": "tor-duration",
      "title": "11. Duration, Programme & Budget",
      "hint": "Timeline by task, and how the assignment is priced and paid"
    },
    {
      "id": "tor-qa",
      "title": "12. Quality Assurance, Supervision & Approval",
      "hint": "Who reviews, who approves, and against what criteria"
    }
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
      nav_monitor: "Monitor", nav_manage: "Manage", nav_grow: "Grow", nav_free: "Free tools",
      screening: "Project Screening", monitors: "Find a Monitor", toolbox: "Calculators & Converters",
      dashboard: "Dashboard", reporting: "Verda Reporting", esia: "ESIA Reporting", tor: "Terms of Reference",
      revenue: "Revenue Planner",
      plans: "Plans & Pricing",
      analytics: "Analytics", incidents: "Incidents", risk: "Risk Register", actions: "Actions (CAPA)", training: "Training & Competency",
      audits: "Audits", inspections: "Inspections & Calculations", records: "Records", maps: "Maps & Site Visits", workflows: "Workflows",
      clients: "Clients & Compliance Care Plans", documents: "Documents Library", checklists: "Checklists",
      credits: "Credits & Billing", skills: "Skills Advisor",
      resources: "Resources Hub", supplies: "Supplies & Hire", iec: "IEC Materials", solutions: "Solutions",
      login: "Log in", signup: "Free Sign Up", logout: "Log out" },
    sw: { app_name: "Verda", tagline: "Uzingatiaji wa Mazingira, Afya na Usalama — Kwa Urahisi.",
      nav_monitor: "Fuatilia", nav_manage: "Simamia", nav_grow: "Kua", nav_free: "Zana za bure",
      screening: "Uchunguzi wa Mradi", monitors: "Tafuta Mkaguzi", toolbox: "Vikokotoo na Vibadilishaji",
      dashboard: "Dashibodi", reporting: "Ripoti ya Verda", esia: "Ripoti ya ESIA", tor: "Hadidu za Rejea",
      revenue: "Mpango wa Mapato",
      plans: "Mipango na Bei",
      analytics: "Uchambuzi", incidents: "Matukio", risk: "Rejista ya Hatari", actions: "Hatua (CAPA)", training: "Mafunzo na Umahiri",
      audits: "Ukaguzi", inspections: "Ukaguzi na Hesabu", records: "Kumbukumbu", maps: "Ramani na Ziara za Tovuti", workflows: "Mtiririko wa Kazi",
      clients: "Wateja na Mipango ya Uzingatiaji", documents: "Maktaba ya Hati", checklists: "Orodha za Ukaguzi",
      credits: "Mikopo na Malipo", skills: "Mshauri wa Ujuzi",
      resources: "Kituo cha Rasilimali", supplies: "Vifaa na Ukodishaji", iec: "Nyenzo za IEC", solutions: "Suluhisho",
      login: "Ingia", signup: "Jisajili Bure", logout: "Toka" },
    fr: { app_name: "Verda", tagline: "Conformité Environnementale, Santé & Sécurité — Simplifiée.",
      nav_monitor: "Surveiller", nav_manage: "Gérer", nav_grow: "Développer", nav_free: "Outils gratuits",
      screening: "Présélection de projet", monitors: "Trouver un expert", toolbox: "Calculateurs et convertisseurs",
      dashboard: "Tableau de bord", reporting: "Rapport Verda", esia: "Rapport EIES", tor: "Termes de Référence",
      revenue: "Planificateur de Revenus",
      plans: "Offres et Tarifs",
      analytics: "Analytique", incidents: "Incidents", risk: "Registre des Risques", actions: "Actions (CAPA)", training: "Formation et Compétences",
      audits: "Audits", inspections: "Inspections et Calculs", records: "Registres", maps: "Cartes et Visites de Site", workflows: "Flux de Travail",
      clients: "Clients et Plans de Conformité", documents: "Bibliothèque de Documents", checklists: "Listes de Contrôle",
      credits: "Crédits et Facturation", skills: "Conseiller en Compétences",
      resources: "Centre de Ressources", supplies: "Fournitures et Location", iec: "Matériel IEC", solutions: "Solutions",
      login: "Connexion", signup: "Inscription Gratuite", logout: "Déconnexion" },
    pt: { app_name: "Verda", tagline: "Conformidade Ambiental, Saúde e Segurança — Simplificada.",
      nav_monitor: "Monitorar", nav_manage: "Gerir", nav_grow: "Crescer", nav_free: "Ferramentas gratuitas",
      screening: "Triagem de Projeto", monitors: "Encontrar um Monitor", toolbox: "Calculadoras e Conversores",
      dashboard: "Painel", reporting: "Relatório Verda", esia: "Relatório AIAS", tor: "Termos de Referência",
      revenue: "Planeador de Receitas",
      plans: "Planos e Preços",
      analytics: "Análises", incidents: "Incidentes", risk: "Registo de Riscos", actions: "Ações (CAPA)", training: "Formação e Competências",
      audits: "Auditorias", inspections: "Inspeções e Cálculos", records: "Registos", maps: "Mapas e Visitas ao Local", workflows: "Fluxos de Trabalho",
      clients: "Clientes e Planos de Conformidade", documents: "Biblioteca de Documentos", checklists: "Listas de Verificação",
      credits: "Créditos e Faturação", skills: "Conselheiro de Competências",
      resources: "Centro de Recursos", supplies: "Suprimentos e Aluguer", iec: "Materiais IEC", solutions: "Soluções",
      login: "Entrar", signup: "Inscrição Gratuita", logout: "Sair" },
    zh: { app_name: "Verda", tagline: "环境、健康与安全合规 — 化繁为简。",
      nav_monitor: "监控", nav_manage: "管理", nav_grow: "拓展", nav_free: "免费工具",
      screening: "项目筛查", monitors: "查找监测机构", toolbox: "计算器与换算器",
      dashboard: "仪表板", reporting: "Verda 报告", esia: "环境社会影响评价报告", tor: "职责范围 (ToR)",
      revenue: "收入测算",
      plans: "方案与定价",
      analytics: "数据分析", incidents: "事件", risk: "风险登记册", actions: "整改措施 (CAPA)", training: "培训与能力",
      audits: "审核", inspections: "检查与计算", records: "记录", maps: "地图与现场巡查", workflows: "工作流程",
      clients: "客户与合规服务计划", documents: "文档库", checklists: "检查表",
      credits: "积分与账单", skills: "技能顾问",
      resources: "资源中心", supplies: "用品与租赁", iec: "IEC 宣传材料", solutions: "解决方案",
      login: "登录", signup: "免费注册", logout: "退出" }
  },

  // ---- Incidents ----------------------------------------------------------
  incidentTypes: [
    "Near-miss", "First aid case", "Medical treatment case", "Lost-time injury",
    "Property damage", "Environmental spill / release", "Security incident",
    "Occupational illness", "Fire", "Vehicle incident"
  ],
  incidentSeverities: ["Low", "Medium", "High", "Critical"],
  incidentStatuses: ["Open", "Under investigation", "Closed"],

  // ---- Risk register (5x5 matrix) -----------------------------------------
  riskLikelihood: ["Rare", "Unlikely", "Possible", "Likely", "Almost certain"],
  riskSeverity: ["Negligible", "Minor", "Moderate", "Major", "Catastrophic"],
  // score = likelihood (1-5) x severity (1-5); bands below are inclusive upper bounds
  riskBands: [
    { max: 4, label: "Low", status: "good" },
    { max: 9, label: "Medium", status: "warning" },
    { max: 15, label: "High", status: "serious" },
    { max: 25, label: "Critical", status: "critical" }
  ],

  // ---- Actions (CAPA) ------------------------------------------------------
  actionSources: ["Incident", "Audit finding", "Inspection", "Risk assessment", "Permit condition", "Community grievance", "Other"],
  actionPriorities: ["Low", "Medium", "High"],
  actionStatuses: ["Open", "In progress", "Closed"],

  // ---- Training & competency ----------------------------------------------
  // validityMonths: how long the certificate stays valid before refresher is due
  // Superseded by trainingCatalogue above, which carries the same validity
  // periods plus a category and the roles each course is normally required for.
  // Kept as an alias so any saved state or integration referring to the old
  // name still resolves.
  get trainingCourses() { return this.trainingCatalogue; },


  // ---- Revenue planner defaults --------------------------------------------
  // PLACEHOLDER FIGURES — they exist so the planner opens with something to
  // look at, not because they are EEIS's rates. Replace every one of them
  // with the real rate card before quoting anything (see docs/pricing-tiers.md,
  // which deliberately ships without prices for the same reason).
  revenueDefaults: {
    currency: "USD",
    dayRate: 180,          // loaded cost of one consultant-day
    overhead: 2500,        // fixed monthly overhead the plans must cover
    tiers: [
      { id: "t1", name: "Tier 1 — Essential", billing: "Quarterly", visitsPerYear: 4,
        fee: 450, clients: 2, labCost: 0, daysPerVisit: 0.5, travel: 40 },
      { id: "t2", name: "Tier 2 — Standard", billing: "Quarterly", visitsPerYear: 4,
        fee: 900, clients: 2, labCost: 260, daysPerVisit: 1, travel: 60 },
      { id: "t3", name: "Tier 3 — Priority", billing: "Monthly", visitsPerYear: 12,
        fee: 700, clients: 1, labCost: 180, daysPerVisit: 1, travel: 60 }
    ]
  },

  // ---- Verda as a product: subscription packaging --------------------------
  // How Verda is sold to other organisations (distinct from the compliance
  // care plans EEIS sells as a service). Prices are a starting proposal, not
  // a committed rate card — and nothing here can be charged until the
  // backend, real auth and a payment gateway exist. See docs/monetisation.md.
  platformPlans: [
    { id: "free", name: "Starter", price: 0, per: "month", seats: "1 site, 1 user",
      pitch: "Prove the value on one site before paying anything.",
      features: ["All 18 sector checklists", "Incidents, risk register and actions", "Verda Reporting (1 report/month)", "Free IEC materials", "Community access"],
      cta: "Free forever" },
    { id: "team", name: "Team", price: 49, per: "month", seats: "up to 5 sites, 10 users",
      pitch: "For a single operator running their own compliance in-house.",
      features: ["Everything in Starter", "Unlimited reports — Verda, IFC PS and SBC", "Audits with AI-assisted findings", "Training & competency register", "Analytics dashboard", "Email support"],
      cta: "Most popular" },
    { id: "business", name: "Business", price: 149, per: "month", seats: "up to 25 sites, 50 users",
      pitch: "For consultancies and groups managing compliance across clients.",
      features: ["Everything in Team", "Multi-client compliance care plans", "ToR & ESIA drafting", "ArcGIS site mapping and Matterport walkthroughs", "Document control and audit trail", "Priority support"],
      cta: "Best for consultancies" },
    { id: "enterprise", name: "Enterprise", price: null, per: "quote", seats: "unlimited sites and users",
      pitch: "For multi-site operators and lender-reporting obligations.",
      features: ["Everything in Business", "Single sign-on and role-based permissions", "Custom checklists and report templates", "API access and data export", "Onboarding and training", "Named account manager"],
      cta: "Talk to us" }
  ],

  // Credit packs — usage revenue on top of subscription, for AI drafting and
  // ESIA processing (see creditCosts).
  creditPacks: [
    { credits: 500, price: 25, label: "Starter pack" },
    { credits: 1500, price: 60, label: "Growth pack" },
    { credits: 5000, price: 175, label: "Scale pack" }
  ],

  // Defaults for the platform (SaaS) side of the revenue planner.
  platformRevenueDefaults: {
    subscribers: { team: 12, business: 4, enterprise: 1 },
    enterprisePrice: 600,
    monthlyChurnPct: 3,
    creditRevenuePerPayingAccount: 8,
    infraCostPerAccount: 3,
    monthlyBuildCost: 4000
  },

  // ---- Capability pillars (dashboard) --------------------------------------
  // Cross-sector pillars — what Verda covers, independent of industry.
  pillars: [
    { id: "safety", illus: "safety", name: "Safety", blurb: "Incidents, risk register, audits and corrective actions.", link: "incidents" },
    { id: "health", illus: "health", name: "Health & Wellbeing", blurb: "Occupational health, first aid and awareness materials.", link: "training" },
    { id: "environment", illus: "environment", name: "Environment", blurb: "Effluent, air, waste, water and GHG monitoring.", link: "reporting" },
    { id: "people", illus: "people", name: "People & Community", blurb: "Training, competency, grievances and CSR records.", link: "records" },
    { id: "esg", illus: "wildlife", name: "Biodiversity & ESG", blurb: "Impact assessment, biodiversity and sustainability reporting.", link: "esia" },
    { id: "governance", illus: "governance", name: "Governance & Compliance", blurb: "Permits, licences, document control and audit trails.", link: "checklists" }
  ],

  // ---- Solutions matrix ---------------------------------------------------
  // Each entry names the platform sections that actually solve it — the
  // Solutions page links straight into them rather than just describing them.
  solutionsByNeed: [
    { name: "Compliance Monitoring", blurb: "Recurring site visits, permit tracking and status reporting for clients already holding a NEMA-type certificate.", sections: ["clients", "reporting", "checklists"] },
    { name: "ESIA & Permitting", blurb: "Structured ToR/ESIA drafting, AI-assisted writing, and a credits-based submission queue to EEIS for review.", sections: ["esia", "checklists", "documents"] },
    { name: "Safety Management", blurb: "Auto EHS audits against industry checklists, PPE records, and safety administration workflows.", sections: ["audits", "records", "workflows"] },
    { name: "GHG & Carbon Reporting", blurb: "A GHG segment in every EEIS report, plus certification pathways for building an emissions inventory.", sections: ["reporting", "skills"] },
    { name: "Community & CSR", blurb: "Grievance and engagement records, a Community segment in reporting, and a public community board.", sections: ["records", "reporting", "resources"] },
    { name: "Training & Certification", blurb: "A skills advisor that reads what you're working on and suggests the right course, plus a free materials library.", sections: ["skills", "iec", "resources"] },
    { name: "Site Inspections & Virtual Audits", blurb: "ArcGIS site mapping and Matterport virtual walkthroughs so a remote reviewer can inspect without travelling.", sections: ["maps", "audits"] },
    { name: "PPE & Supplies Procurement", blurb: "A standing catalogue of PPE and safety equipment organised by category, ready to hire or requisition.", sections: ["supplies", "records"] }
  ],
  solutionsByIndustry: [
    { name: "Manufacturing", blurb: "Effluent, air emissions and waste-handling checklists built for factory floors, plus recurring compliance visits.", sections: ["checklists", "reporting", "audits"] },
    { name: "Mining — Large Scale", blurb: "Tailings governance, blast and slope monitoring, occupational hygiene and closure liability — with the running totals lenders ask for carried forward each month.", sections: ["reporting", "checklists", "risk", "maps"] },
    { name: "Artisanal & Small-Scale Mining (ASM)", blurb: "Formalisation status, child-labour and mercury controls, and OECD due-diligence evidence for 3TG and cobalt supply chains.", sections: ["checklists", "records", "iec"] },
    { name: "Mineral Processing & Smelting", blurb: "Stack and fence-line emissions against licence limits, reagent and molten-metal safety, process-safety actions tracked to closure.", sections: ["reporting", "audits", "actions"] },
    { name: "Quarrying & Aggregates", blurb: "Blast management, vibration and dust monitoring, face inspection and progressive rehabilitation with photographic evidence.", sections: ["checklists", "maps", "audits"] },
    { name: "Timber & Wood Processing", blurb: "Chain-of-custody and fire-risk checklists alongside document templates for licensing and sourcing records.", sections: ["checklists", "documents"] },
    { name: "Construction & Contracting", blurb: "Site-specific ESMP drafting, sub-contractor pre-qualification workflows, and per-project checklists.", sections: ["esia", "workflows", "checklists"] },
    { name: "Oil & Gas", blurb: "Spill-response and emissions checklists, auto EHS audits, and gas-detection equipment in the supplies catalogue.", sections: ["checklists", "audits", "supplies"] },
    { name: "Agriculture & Agro-processing", blurb: "Agrochemical handling checklists plus free IEC materials for worker and community health awareness.", sections: ["checklists", "iec"] },
    { name: "Food & Beverage Processing", blurb: "Hygiene, cold-chain and effluent checklists with incident tracking for processing lines.", sections: ["checklists", "incidents", "reporting"] },
    { name: "Textiles & Apparel", blurb: "Dyeing and finishing effluent controls, chemical registers, and machine-guarding audits.", sections: ["checklists", "audits", "risk"] },
    { name: "Energy & Utilities", blurb: "High-voltage permit-to-work risk assessment, emissions reporting and outage response actions.", sections: ["risk", "reporting", "actions"] },
    { name: "Water, Sanitation & Waste", blurb: "Confined-space risk assessment, discharge monitoring and licensed-disposal record keeping.", sections: ["risk", "reporting", "records"] },
    { name: "Transport & Logistics", blurb: "Driver competency records, vehicle incident reporting and dangerous-goods checklists.", sections: ["training", "incidents", "checklists"] },
    { name: "Hospitality & Tourism", blurb: "Fire safety and kitchen hygiene checklists with guest and staff incident registers.", sections: ["checklists", "incidents", "training"] },
    { name: "Retail & Wholesale", blurb: "Slip/trip prevention, manual handling training and store-level inspection checklists.", sections: ["checklists", "training", "incidents"] },
    { name: "Telecom & ICT", blurb: "Working-at-height risk assessment for tower crews, plus site mapping and lone-worker checks.", sections: ["risk", "maps", "training"] },
    { name: "Financial & Professional Services", blurb: "Office-scale fire, ergonomics and continuity checklists with ESG reporting for disclosures.", sections: ["checklists", "reporting", "actions"] },
    { name: "Healthcare & Medical", blurb: "Healthcare waste, sharps and infection-control checklists with staff competency records.", sections: ["checklists", "incidents", "training"] },
    { name: "Education", blurb: "Lab chemical safety, drill logging and student/staff incident reporting for institutions.", sections: ["checklists", "incidents", "training"] },
    { name: "Public Sector & NGOs", blurb: "Programme screening, field-staff safety procedures and community grievance tracking.", sections: ["esia", "records", "actions"] }
  ],
  solutionsByRole: [
    { name: "Frontline Worker / Site Technician", blurb: "Offline-capable checklists and free IEC materials on the exact task at hand — usable with patchy site connectivity.", sections: ["checklists", "iec"] },
    { name: "Supervisor / Foreman", blurb: "Daily safety administration workflows and PPE/records logging for the crew you're responsible for.", sections: ["workflows", "records"] },
    { name: "Safety Officer", blurb: "Auto EHS audits with AI-assisted findings, PPE records, and the safety administration workflow template.", sections: ["audits", "records", "workflows"] },
    { name: "Environmental / EHS Manager", blurb: "The full Verda Reporting builder, audit history, and industry checklists in one place, client by client.", sections: ["reporting", "audits", "checklists"] },
    { name: "Site / Operations Manager", blurb: "Client and compliance-care-plan tracking, site mapping, and cross-team workflow oversight.", sections: ["clients", "maps", "workflows"] },
    { name: "HR Manager", blurb: "The HR compliance workflow (induction, PPE sign-off, training records) plus the skills advisor for staff development.", sections: ["workflows", "skills"] },
    { name: "Compliance / Sustainability Director", blurb: "Portfolio-level EEIS reports, the documents library for audit trails, and credit-based billing oversight.", sections: ["reporting", "documents", "credits"] },
    { name: "Executive / C-Suite", blurb: "A single dashboard view of active compliance care plans, permits at risk, and reports generated across all clients.", sections: ["dashboard", "credits"] },
    { name: "Contractor / Field Technician", blurb: "Task checklists, the PPE/tools supplies catalogue, and offline access for sites without reliable signal.", sections: ["checklists", "supplies", "iec"] }
  ],

  // ---- Workflow templates ---------------------------------------------------
  // ---- Workflows -----------------------------------------------------------
  // Each template is a real procedure: what starts it, what "done" means, and
  // step by step who does it, within how many days, and what evidence closes
  // the step. A run computes each step's due date from the start date and the
  // step's own SLA, so a stalled procedure is visible rather than assumed.
  workflowTemplates: [
    {
      "id": "hr-onboard",
      "name": "New worker onboarding",
      "area": "People & HR",
      "trigger": "A worker is offered a role, before first shift",
      "outcome": "The worker is cleared to start and every record exists to prove it",
      "steps": [
        {
          "task": "Right to work and age verification completed",
          "role": "HR officer",
          "days": 2,
          "evidence": "Copy of ID; age verification record"
        },
        {
          "task": "Contract issued in a language the worker reads",
          "role": "HR officer",
          "days": 2,
          "evidence": "Signed contract"
        },
        {
          "task": "Pre-placement medical / fitness to work",
          "role": "Occupational health",
          "days": 5,
          "evidence": "Fitness certificate"
        },
        {
          "task": "General EHS induction delivered",
          "role": "EHS officer",
          "days": 1,
          "evidence": "Signed induction register"
        },
        {
          "task": "Site-specific induction and area walk",
          "role": "Supervisor",
          "days": 1,
          "evidence": "Induction record"
        },
        {
          "task": "Task risk assessment briefed to the worker",
          "role": "Supervisor",
          "days": 1,
          "evidence": "Signed briefing record"
        },
        {
          "task": "PPE issued against the task hazard assessment",
          "role": "Stores",
          "days": 1,
          "evidence": "PPE issue record with signature"
        },
        {
          "task": "Competence verified for the tasks assigned",
          "role": "Supervisor",
          "days": 5,
          "evidence": "Competence assessment"
        },
        {
          "task": "Added to the training matrix and emergency roll",
          "role": "EHS officer",
          "days": 2,
          "evidence": "Training matrix entry"
        },
        {
          "task": "Grievance mechanism and code of conduct explained",
          "role": "HR officer",
          "days": 1,
          "evidence": "Acknowledgement signed"
        }
      ]
    },
    {
      "id": "hr-exit",
      "name": "Worker separation",
      "area": "People & HR",
      "trigger": "A worker resigns, is released or the contract ends",
      "outcome": "Nothing is outstanding to the worker and nothing of the company's leaves with them",
      "steps": [
        {
          "task": "Exit interview conducted",
          "role": "HR officer",
          "days": 3,
          "evidence": "Exit interview record"
        },
        {
          "task": "Exit medical where exposure warrants it",
          "role": "Occupational health",
          "days": 5,
          "evidence": "Exit medical record"
        },
        {
          "task": "PPE, tools and access cards returned",
          "role": "Stores",
          "days": 1,
          "evidence": "Return record"
        },
        {
          "task": "Final dues, leave and benefits settled",
          "role": "Finance",
          "days": 7,
          "evidence": "Payment record"
        },
        {
          "task": "Removed from access control, roll call and training matrix",
          "role": "EHS officer",
          "days": 1,
          "evidence": "System record"
        },
        {
          "task": "Health surveillance record archived for the retention period",
          "role": "Occupational health",
          "days": 5,
          "evidence": "Archive reference"
        }
      ]
    },
    {
      "id": "hr-grievance",
      "name": "Worker grievance",
      "area": "People & HR",
      "trigger": "A worker raises a grievance through any channel",
      "outcome": "The grievance is resolved or escalated, and the worker knows the outcome",
      "steps": [
        {
          "task": "Grievance logged and acknowledged to the worker",
          "role": "HR officer",
          "days": 2,
          "evidence": "Grievance register entry"
        },
        {
          "task": "Confidentiality and no-retaliation confirmed in writing",
          "role": "HR officer",
          "days": 2,
          "evidence": "Written confirmation"
        },
        {
          "task": "Investigation assigned to someone not involved",
          "role": "HR manager",
          "days": 3,
          "evidence": "Assignment record"
        },
        {
          "task": "Investigation completed and findings recorded",
          "role": "Investigator",
          "days": 14,
          "evidence": "Investigation report"
        },
        {
          "task": "Outcome communicated to the worker",
          "role": "HR manager",
          "days": 3,
          "evidence": "Communication record"
        },
        {
          "task": "Corrective action raised where a system failure is found",
          "role": "EHS manager",
          "days": 5,
          "evidence": "CAPA reference"
        },
        {
          "task": "Closure recorded with the worker's acknowledgement",
          "role": "HR officer",
          "days": 5,
          "evidence": "Signed closure"
        }
      ]
    },
    {
      "id": "env-monitoring",
      "name": "Periodic environmental monitoring",
      "area": "Environment",
      "trigger": "The monitoring plan falls due for the period",
      "outcome": "Results are in, compared against limits, and any exceedance has an action",
      "steps": [
        {
          "task": "Confirm parameters, points and frequency against the permit",
          "role": "Environmental officer",
          "days": 2,
          "evidence": "Monitoring plan extract"
        },
        {
          "task": "Book the accredited laboratory and confirm the method",
          "role": "Environmental officer",
          "days": 5,
          "evidence": "Laboratory booking"
        },
        {
          "task": "Verify sampling equipment calibration is in date",
          "role": "Environmental officer",
          "days": 2,
          "evidence": "Calibration certificate"
        },
        {
          "task": "Collect samples with chain of custody",
          "role": "Environmental officer",
          "days": 1,
          "evidence": "Chain of custody form"
        },
        {
          "task": "Receive and check results against the permit limit",
          "role": "Environmental officer",
          "days": 10,
          "evidence": "Laboratory report"
        },
        {
          "task": "Investigate any exceedance to root cause",
          "role": "Environmental officer",
          "days": 5,
          "evidence": "Investigation note"
        },
        {
          "task": "Raise corrective action for each exceedance",
          "role": "Environmental officer",
          "days": 3,
          "evidence": "CAPA reference"
        },
        {
          "task": "Report results in the periodic report and to the regulator if required",
          "role": "Environmental officer",
          "days": 10,
          "evidence": "Submitted report"
        }
      ]
    },
    {
      "id": "env-waste",
      "name": "Waste transfer",
      "area": "Environment",
      "trigger": "Waste is ready to leave site",
      "outcome": "The waste has left legally and the paper trail proves it",
      "steps": [
        {
          "task": "Waste characterised and classified",
          "role": "Environmental officer",
          "days": 2,
          "evidence": "Classification record"
        },
        {
          "task": "Verify the carrier's licence is current and covers this waste",
          "role": "Environmental officer",
          "days": 1,
          "evidence": "Copy of licence"
        },
        {
          "task": "Verify the receiving facility is licensed for this stream",
          "role": "Environmental officer",
          "days": 2,
          "evidence": "Copy of facility licence"
        },
        {
          "task": "Weigh or measure and record the quantity",
          "role": "Stores",
          "days": 1,
          "evidence": "Weighbridge ticket"
        },
        {
          "task": "Waste transfer note issued and signed by both parties",
          "role": "Environmental officer",
          "days": 1,
          "evidence": "Signed transfer note"
        },
        {
          "task": "Confirm receipt at the disposal facility",
          "role": "Environmental officer",
          "days": 7,
          "evidence": "Receipt confirmation"
        },
        {
          "task": "Register updated with quantity and running total",
          "role": "Environmental officer",
          "days": 2,
          "evidence": "Waste register entry"
        }
      ]
    },
    {
      "id": "env-spill",
      "name": "Spill or release response",
      "area": "Environment",
      "trigger": "A spill or uncontrolled release occurs",
      "outcome": "The release is contained, cleaned, reported and prevented from recurring",
      "steps": [
        {
          "task": "Stop the source and make the area safe",
          "role": "Site supervisor",
          "days": 1,
          "evidence": "Initial report"
        },
        {
          "task": "Contain with spill kit or bunding",
          "role": "Emergency responder",
          "days": 1,
          "evidence": "Photographs"
        },
        {
          "task": "Estimate quantity and affected area",
          "role": "Environmental officer",
          "days": 1,
          "evidence": "Estimate record"
        },
        {
          "task": "Notify the regulator where the threshold requires it",
          "role": "EHS manager",
          "days": 1,
          "evidence": "Notification copy"
        },
        {
          "task": "Recover and dispose of contaminated material through a licensed route",
          "role": "Environmental officer",
          "days": 5,
          "evidence": "Waste transfer note"
        },
        {
          "task": "Sample soil or water where contamination is credible",
          "role": "Environmental officer",
          "days": 5,
          "evidence": "Laboratory report"
        },
        {
          "task": "Investigate to root cause",
          "role": "EHS manager",
          "days": 7,
          "evidence": "Investigation report"
        },
        {
          "task": "Corrective action raised and tracked to closure",
          "role": "EHS manager",
          "days": 30,
          "evidence": "CAPA reference"
        }
      ]
    },
    {
      "id": "env-clearance",
      "name": "Vegetation clearance approval",
      "area": "Environment",
      "trigger": "An area is proposed for clearance",
      "outcome": "Clearance is approved, supervised and within the permitted footprint",
      "steps": [
        {
          "task": "Confirm the area sits inside the approved project footprint",
          "role": "Environmental officer",
          "days": 2,
          "evidence": "Footprint drawing with coordinates"
        },
        {
          "task": "Screen against wetland, protected area and riparian layers",
          "role": "Environmental officer",
          "days": 3,
          "evidence": "Screening record"
        },
        {
          "task": "Pre-clearance biodiversity and chance-finds survey",
          "role": "Ecologist",
          "days": 10,
          "evidence": "Survey report"
        },
        {
          "task": "Mark exclusion zones and no-go areas on the ground",
          "role": "Survey team",
          "days": 2,
          "evidence": "Photographs and coordinates"
        },
        {
          "task": "Brief the clearance crew on limits and chance-finds procedure",
          "role": "EHS officer",
          "days": 1,
          "evidence": "Signed briefing"
        },
        {
          "task": "Supervise clearance and record area cleared",
          "role": "Environmental officer",
          "days": 1,
          "evidence": "Daily record"
        },
        {
          "task": "Salvage topsoil for reinstatement",
          "role": "Earthworks supervisor",
          "days": 2,
          "evidence": "Stockpile record"
        }
      ]
    },
    {
      "id": "saf-incident",
      "name": "Incident investigation",
      "area": "Safety",
      "trigger": "An incident or high-potential near-miss is reported",
      "outcome": "Root cause is understood and the actions that prevent recurrence are closed",
      "steps": [
        {
          "task": "Make the area safe and preserve the scene",
          "role": "Site supervisor",
          "days": 1,
          "evidence": "Initial notification"
        },
        {
          "task": "Notify management and, where required, the regulator",
          "role": "EHS manager",
          "days": 1,
          "evidence": "Notification copy"
        },
        {
          "task": "Classify the injury and record days lost",
          "role": "EHS officer",
          "days": 2,
          "evidence": "Incident register entry"
        },
        {
          "task": "Collect evidence: photographs, statements, records",
          "role": "Investigator",
          "days": 3,
          "evidence": "Evidence pack"
        },
        {
          "task": "Investigate to immediate and underlying cause",
          "role": "Investigator",
          "days": 14,
          "evidence": "Investigation report"
        },
        {
          "task": "Agree corrective actions with owners and dates",
          "role": "EHS manager",
          "days": 5,
          "evidence": "CAPA entries"
        },
        {
          "task": "Share the lesson learned across the site",
          "role": "EHS officer",
          "days": 7,
          "evidence": "Toolbox talk record"
        },
        {
          "task": "Verify actions are effective, not just closed",
          "role": "EHS manager",
          "days": 60,
          "evidence": "Verification note"
        }
      ]
    },
    {
      "id": "saf-ptw",
      "name": "Permit to work",
      "area": "Safety",
      "trigger": "High-risk work is planned",
      "outcome": "The work is done under the controls the permit exists to guarantee",
      "steps": [
        {
          "task": "Identify the permit types the task needs",
          "role": "Supervisor",
          "days": 1,
          "evidence": "Permit application"
        },
        {
          "task": "Task risk assessment and method statement approved",
          "role": "EHS officer",
          "days": 2,
          "evidence": "Approved RAMS"
        },
        {
          "task": "Isolations applied, locked and proved dead or zero-energy",
          "role": "Authorised person",
          "days": 1,
          "evidence": "Isolation certificate"
        },
        {
          "task": "Gas test or atmosphere check where required",
          "role": "Competent tester",
          "days": 1,
          "evidence": "Gas test record"
        },
        {
          "task": "Standby, rescue and emergency arrangements in place",
          "role": "Supervisor",
          "days": 1,
          "evidence": "Rescue plan"
        },
        {
          "task": "Permit issued and briefed to every worker on the job",
          "role": "Permit issuer",
          "days": 1,
          "evidence": "Signed permit"
        },
        {
          "task": "Work supervised and conditions re-checked at each break",
          "role": "Supervisor",
          "days": 1,
          "evidence": "Permit continuation"
        },
        {
          "task": "Permit closed, isolations removed, area handed back",
          "role": "Permit issuer",
          "days": 1,
          "evidence": "Signed close-out"
        }
      ]
    },
    {
      "id": "saf-inspection",
      "name": "Planned inspection round",
      "area": "Safety",
      "trigger": "The inspection schedule falls due",
      "outcome": "Findings are raised, owned and closed before the next round",
      "steps": [
        {
          "task": "Confirm scope and the checklist for this round",
          "role": "EHS officer",
          "days": 1,
          "evidence": "Inspection checklist"
        },
        {
          "task": "Conduct the inspection with the area supervisor present",
          "role": "EHS officer",
          "days": 1,
          "evidence": "Completed checklist"
        },
        {
          "task": "Photograph each finding",
          "role": "EHS officer",
          "days": 1,
          "evidence": "Photographs"
        },
        {
          "task": "Grade findings and set closure targets",
          "role": "EHS officer",
          "days": 2,
          "evidence": "Graded finding list"
        },
        {
          "task": "Assign owners and agree dates",
          "role": "EHS manager",
          "days": 3,
          "evidence": "CAPA entries"
        },
        {
          "task": "Verify closure at the next round",
          "role": "EHS officer",
          "days": 30,
          "evidence": "Verification record"
        }
      ]
    },
    {
      "id": "saf-moc",
      "name": "Management of change",
      "area": "Safety",
      "trigger": "Plant, process, people or method is to change",
      "outcome": "The change is assessed and controlled before it happens, not after",
      "steps": [
        {
          "task": "Change described and initiator recorded",
          "role": "Originator",
          "days": 1,
          "evidence": "Change request"
        },
        {
          "task": "Screen whether the change is minor or significant",
          "role": "EHS manager",
          "days": 3,
          "evidence": "Screening record"
        },
        {
          "task": "Risk assessment of the change",
          "role": "EHS officer",
          "days": 7,
          "evidence": "Risk assessment"
        },
        {
          "task": "Technical authority review and approval",
          "role": "Engineering",
          "days": 10,
          "evidence": "Approval signature"
        },
        {
          "task": "Update drawings, procedures and training material",
          "role": "Document controller",
          "days": 14,
          "evidence": "Updated documents"
        },
        {
          "task": "Brief affected workers before the change takes effect",
          "role": "Supervisor",
          "days": 3,
          "evidence": "Briefing record"
        },
        {
          "task": "Post-implementation review",
          "role": "EHS manager",
          "days": 30,
          "evidence": "Review note"
        }
      ]
    },
    {
      "id": "saf-emergency",
      "name": "Emergency drill",
      "area": "Safety",
      "trigger": "The drill programme falls due, or a new scenario is identified",
      "outcome": "The plan is tested, the gaps are known, and the gaps are closed",
      "steps": [
        {
          "task": "Select the scenario and set objectives",
          "role": "EHS manager",
          "days": 5,
          "evidence": "Drill plan"
        },
        {
          "task": "Notify or deliberately do not notify participants",
          "role": "EHS manager",
          "days": 2,
          "evidence": "Drill plan"
        },
        {
          "task": "Involve external responders where the scenario needs them",
          "role": "EHS manager",
          "days": 10,
          "evidence": "Correspondence"
        },
        {
          "task": "Run the drill with observers at each station",
          "role": "EHS officer",
          "days": 1,
          "evidence": "Observer notes"
        },
        {
          "task": "Record times: alarm, assembly, roll call complete",
          "role": "EHS officer",
          "days": 1,
          "evidence": "Timing record"
        },
        {
          "task": "Debrief with participants the same day",
          "role": "EHS manager",
          "days": 1,
          "evidence": "Debrief notes"
        },
        {
          "task": "Raise actions for each gap found",
          "role": "EHS manager",
          "days": 5,
          "evidence": "CAPA entries"
        },
        {
          "task": "Update the emergency plan where the drill showed it was wrong",
          "role": "EHS manager",
          "days": 30,
          "evidence": "Revised plan"
        }
      ]
    },
    {
      "id": "per-renewal",
      "name": "Permit renewal",
      "area": "Permitting & legal",
      "trigger": "A permit reaches 120 days from expiry",
      "outcome": "The renewed permit is in hand before the current one lapses",
      "steps": [
        {
          "task": "Confirm the renewal window and documents required",
          "role": "EHS officer",
          "days": 5,
          "evidence": "Authority guidance"
        },
        {
          "task": "Compile supporting documents and monitoring records",
          "role": "EHS officer",
          "days": 20,
          "evidence": "Document pack"
        },
        {
          "task": "Settle any outstanding compliance conditions first",
          "role": "EHS manager",
          "days": 30,
          "evidence": "Evidence of closure"
        },
        {
          "task": "Submit the application and pay the fee",
          "role": "EHS officer",
          "days": 5,
          "evidence": "Submission receipt"
        },
        {
          "task": "Track the application and respond to queries",
          "role": "EHS officer",
          "days": 30,
          "evidence": "Correspondence"
        },
        {
          "task": "Receive the permit and update the register and expiry date",
          "role": "EHS officer",
          "days": 5,
          "evidence": "Permit copy"
        },
        {
          "task": "Brief the site on any changed conditions",
          "role": "EHS manager",
          "days": 7,
          "evidence": "Briefing record"
        }
      ]
    },
    {
      "id": "per-legal-update",
      "name": "Legal register review",
      "area": "Permitting & legal",
      "trigger": "The review cycle falls due, or an amendment is published",
      "outcome": "The register reflects the law as it now stands, and any new duty has an owner",
      "steps": [
        {
          "task": "Check each instrument against the current consolidated text",
          "role": "EHS manager",
          "days": 10,
          "evidence": "Updated register"
        },
        {
          "task": "Identify new or amended duties",
          "role": "EHS manager",
          "days": 5,
          "evidence": "Gap list"
        },
        {
          "task": "Assess what each new duty requires of this site",
          "role": "EHS manager",
          "days": 10,
          "evidence": "Impact note"
        },
        {
          "task": "Assign actions for anything not already in place",
          "role": "EHS manager",
          "days": 5,
          "evidence": "CAPA entries"
        },
        {
          "task": "Brief management on material changes",
          "role": "EHS manager",
          "days": 10,
          "evidence": "Management review minute"
        },
        {
          "task": "Record the review date and the next due date",
          "role": "EHS officer",
          "days": 2,
          "evidence": "Register header"
        }
      ]
    },
    {
      "id": "con-prequal",
      "name": "Sub-contractor pre-qualification",
      "area": "Contractor management",
      "trigger": "A sub-contractor is proposed for award",
      "outcome": "The contractor is approved, or approved with conditions that are tracked",
      "steps": [
        {
          "task": "Issue the pre-qualification questionnaire",
          "role": "Procurement",
          "days": 3,
          "evidence": "Issued questionnaire"
        },
        {
          "task": "Verify licences, registration and insurance currency",
          "role": "Procurement",
          "days": 7,
          "evidence": "Certificate copies"
        },
        {
          "task": "Review three-year injury and enforcement history",
          "role": "EHS manager",
          "days": 5,
          "evidence": "Disclosed history"
        },
        {
          "task": "Review method statements and risk assessments for the scope",
          "role": "EHS officer",
          "days": 10,
          "evidence": "Reviewed RAMS"
        },
        {
          "task": "Verify worker competence and plant certification",
          "role": "EHS officer",
          "days": 10,
          "evidence": "Certificates"
        },
        {
          "task": "Agree the bridging document where both have systems",
          "role": "EHS manager",
          "days": 10,
          "evidence": "Signed bridging document"
        },
        {
          "task": "Approval decision recorded with any conditions",
          "role": "EHS manager",
          "days": 5,
          "evidence": "Approval record"
        },
        {
          "task": "Mobilisation induction before any work starts",
          "role": "EHS officer",
          "days": 3,
          "evidence": "Induction register"
        }
      ]
    },
    {
      "id": "con-review",
      "name": "Sub-contractor performance review",
      "area": "Contractor management",
      "trigger": "The review interval falls due",
      "outcome": "Performance is judged on evidence, and poor performance has consequences",
      "steps": [
        {
          "task": "Compile the contractor's incident, hours and training data",
          "role": "EHS officer",
          "days": 5,
          "evidence": "Data pack"
        },
        {
          "task": "Calculate their frequency rates separately from yours",
          "role": "EHS officer",
          "days": 3,
          "evidence": "Rate calculation"
        },
        {
          "task": "Review open findings from inspections and audits",
          "role": "EHS officer",
          "days": 3,
          "evidence": "Finding list"
        },
        {
          "task": "Hold the review meeting with their management present",
          "role": "EHS manager",
          "days": 10,
          "evidence": "Minutes"
        },
        {
          "task": "Agree improvement actions with dates",
          "role": "EHS manager",
          "days": 5,
          "evidence": "CAPA entries"
        },
        {
          "task": "Record the outcome against their pre-qualification status",
          "role": "Procurement",
          "days": 5,
          "evidence": "Updated status"
        }
      ]
    },
    {
      "id": "com-grievance",
      "name": "Community grievance",
      "area": "Community & social",
      "trigger": "A community member raises a concern through any channel",
      "outcome": "The concern is resolved or explained, and the complainant knows the outcome",
      "steps": [
        {
          "task": "Log and acknowledge within the committed period",
          "role": "Community liaison officer",
          "days": 3,
          "evidence": "Grievance register entry"
        },
        {
          "task": "Assess whether it is project-related and how serious",
          "role": "Community liaison officer",
          "days": 5,
          "evidence": "Assessment note"
        },
        {
          "task": "Investigate on the ground with the complainant present",
          "role": "Community liaison officer",
          "days": 10,
          "evidence": "Site visit record"
        },
        {
          "task": "Agree a remedy or explain why none applies",
          "role": "EHS manager",
          "days": 14,
          "evidence": "Agreed remedy"
        },
        {
          "task": "Implement the remedy",
          "role": "Responsible department",
          "days": 30,
          "evidence": "Evidence of completion"
        },
        {
          "task": "Confirm the outcome with the complainant",
          "role": "Community liaison officer",
          "days": 7,
          "evidence": "Signed acknowledgement"
        },
        {
          "task": "Close out and report in the periodic report",
          "role": "Community liaison officer",
          "days": 10,
          "evidence": "Report entry"
        }
      ]
    },
    {
      "id": "com-engagement",
      "name": "Planned community engagement",
      "area": "Community & social",
      "trigger": "The engagement plan falls due or a disruptive activity is scheduled",
      "outcome": "The community was told in advance, heard, and what they said was acted on",
      "steps": [
        {
          "task": "Identify who is affected and who must be present",
          "role": "Community liaison officer",
          "days": 10,
          "evidence": "Stakeholder list"
        },
        {
          "task": "Notify in the local language and through local channels",
          "role": "Community liaison officer",
          "days": 7,
          "evidence": "Notice copies"
        },
        {
          "task": "Hold the meeting at a time and place people can reach",
          "role": "Community liaison officer",
          "days": 1,
          "evidence": "Attendance register"
        },
        {
          "task": "Record issues raised verbatim, not summarised",
          "role": "Community liaison officer",
          "days": 2,
          "evidence": "Minutes"
        },
        {
          "task": "Assign an owner to each commitment made",
          "role": "EHS manager",
          "days": 5,
          "evidence": "Commitment register"
        },
        {
          "task": "Report back on the previous meeting's commitments",
          "role": "Community liaison officer",
          "days": 1,
          "evidence": "Report-back record"
        }
      ]
    },
    {
      "id": "min-blast",
      "name": "Blast execution",
      "area": "Mining & heavy industry",
      "trigger": "A blast is scheduled",
      "outcome": "The blast is fired safely, within limits, with the community notified",
      "steps": [
        {
          "task": "Blast design approved by the licensed shotfirer",
          "role": "Shotfirer",
          "days": 2,
          "evidence": "Blast design"
        },
        {
          "task": "Explosives drawn and reconciled against the magazine register",
          "role": "Magazine keeper",
          "days": 1,
          "evidence": "Issue record"
        },
        {
          "task": "Community and neighbours notified in advance",
          "role": "Community liaison officer",
          "days": 2,
          "evidence": "Notification record"
        },
        {
          "task": "Exclusion zone established and sentries posted",
          "role": "Shotfirer",
          "days": 1,
          "evidence": "Sentry log"
        },
        {
          "task": "Vibration and airblast monitors deployed at receptors",
          "role": "Environmental officer",
          "days": 1,
          "evidence": "Monitor placement record"
        },
        {
          "task": "Blast fired and all-clear given after inspection",
          "role": "Shotfirer",
          "days": 1,
          "evidence": "Blast record"
        },
        {
          "task": "Misfire procedure applied if any charge failed",
          "role": "Shotfirer",
          "days": 1,
          "evidence": "Misfire record"
        },
        {
          "task": "Results compared against limits and reported",
          "role": "Environmental officer",
          "days": 5,
          "evidence": "Monitoring result"
        }
      ]
    },
    {
      "id": "min-tsf",
      "name": "Tailings facility surveillance",
      "area": "Mining & heavy industry",
      "trigger": "The surveillance interval falls due",
      "outcome": "The facility's condition is known and any trigger exceedance is acted on",
      "steps": [
        {
          "task": "Read all instrumentation: piezometers, monuments, flows",
          "role": "TSF operator",
          "days": 1,
          "evidence": "Instrument readings"
        },
        {
          "task": "Measure freeboard and beach width against design",
          "role": "TSF operator",
          "days": 1,
          "evidence": "Survey record"
        },
        {
          "task": "Walk the embankment and record any seepage or cracking",
          "role": "TSF operator",
          "days": 1,
          "evidence": "Inspection record with photographs"
        },
        {
          "task": "Compare readings against trigger levels",
          "role": "TSF engineer",
          "days": 3,
          "evidence": "Trend review"
        },
        {
          "task": "Escalate to the Engineer of Record on any trigger exceedance",
          "role": "TSF engineer",
          "days": 1,
          "evidence": "Escalation record"
        },
        {
          "task": "Update the water balance",
          "role": "TSF engineer",
          "days": 5,
          "evidence": "Water balance"
        },
        {
          "task": "Report to management and record in the monthly return",
          "role": "TSF engineer",
          "days": 10,
          "evidence": "Monthly return"
        }
      ]
    },
    {
      "id": "ms-review",
      "name": "Management review",
      "area": "Management system",
      "trigger": "The management review interval falls due",
      "outcome": "Top management has seen the performance and decided what changes",
      "steps": [
        {
          "task": "Compile performance data: rates, actions, audits, objectives",
          "role": "EHS manager",
          "days": 10,
          "evidence": "Data pack"
        },
        {
          "task": "Review progress against last review's actions",
          "role": "EHS manager",
          "days": 5,
          "evidence": "Action status"
        },
        {
          "task": "Review legal compliance status and any enforcement",
          "role": "EHS manager",
          "days": 5,
          "evidence": "Compliance report"
        },
        {
          "task": "Review stakeholder and worker feedback",
          "role": "EHS manager",
          "days": 5,
          "evidence": "Feedback summary"
        },
        {
          "task": "Hold the review with top management present",
          "role": "Site manager",
          "days": 1,
          "evidence": "Minutes with attendance"
        },
        {
          "task": "Record decisions on resources, objectives and changes",
          "role": "Site manager",
          "days": 5,
          "evidence": "Signed minutes"
        },
        {
          "task": "Assign and track the actions arising",
          "role": "EHS manager",
          "days": 10,
          "evidence": "CAPA entries"
        }
      ]
    },
    {
      "id": "ms-doc",
      "name": "Document control",
      "area": "Management system",
      "trigger": "A controlled document is created or revised",
      "outcome": "The current version is the only one in use",
      "steps": [
        {
          "task": "Draft or revise with the change clearly marked",
          "role": "Author",
          "days": 10,
          "evidence": "Draft with change log"
        },
        {
          "task": "Technical review by a competent reviewer",
          "role": "Reviewer",
          "days": 7,
          "evidence": "Review comments"
        },
        {
          "task": "Approval by the document owner",
          "role": "Owner",
          "days": 5,
          "evidence": "Approval signature"
        },
        {
          "task": "Version and date applied, register updated",
          "role": "Document controller",
          "days": 2,
          "evidence": "Register entry"
        },
        {
          "task": "Superseded copies withdrawn from the point of use",
          "role": "Document controller",
          "days": 3,
          "evidence": "Withdrawal record"
        },
        {
          "task": "Affected people briefed on what changed",
          "role": "Supervisor",
          "days": 7,
          "evidence": "Briefing record"
        }
      ]
    }
  ],


  // ---- Credit costs for AI/paid actions --------------------------------
  // ---- Report tables --------------------------------------------------------
  // Table structures per report section, keyed by section id (ids are unique
  // across all three frameworks). A column with chart:true can be plotted; a
  // table's `chart` block says how. `starterRows` pre-fill the label column so
  // a first-time user sees the expected rows rather than an empty grid.
  sectionTables: {
  "tor-intro": [
    {
      "id": "tor-proponent",
      "title": "Project proponent and parties",
      "hint": "Everyone with a role in commissioning or approving the study.",
      "columns": [
        {
          "key": "party",
          "label": "Party",
          "type": "text"
        },
        {
          "key": "role",
          "label": "Role",
          "type": "select",
          "options": [
            "Developer / proponent",
            "Financier / lender",
            "Regulator",
            "Consultant",
            "Implementing agency",
            "Landowner"
          ]
        },
        {
          "key": "contact",
          "label": "Contact",
          "type": "text"
        },
        {
          "key": "notes",
          "label": "Notes",
          "type": "text"
        }
      ]
    }
  ],
  "tor-objectives": [
    {
      "id": "tor-obj",
      "title": "Objectives and how completion is judged",
      "hint": "An objective nobody can test is not an objective.",
      "columns": [
        {
          "key": "objective",
          "label": "Objective",
          "type": "text"
        },
        {
          "key": "evidence",
          "label": "Evidence of completion",
          "type": "text"
        },
        {
          "key": "priority",
          "label": "Priority",
          "type": "select",
          "options": [
            "Essential",
            "Important",
            "Desirable"
          ]
        }
      ]
    }
  ],
  "tor-project": [
    {
      "id": "tor-components",
      "title": "Project components",
      "hint": "Each physical component with its size and phase.",
      "columns": [
        {
          "key": "component",
          "label": "Component",
          "type": "text"
        },
        {
          "key": "capacity",
          "label": "Capacity / size",
          "type": "text"
        },
        {
          "key": "unit",
          "label": "Unit",
          "type": "text"
        },
        {
          "key": "area",
          "label": "Footprint (ha)",
          "type": "number",
          "chart": true
        },
        {
          "key": "phase",
          "label": "Phase",
          "type": "select",
          "options": [
            "Construction",
            "Operation",
            "Decommissioning",
            "All phases"
          ]
        }
      ],
      "chart": {
        "labelKey": "component",
        "valueKeys": [
          "area"
        ],
        "title": "Footprint by component",
        "valueLabel": "Hectares"
      }
    },
    {
      "id": "tor-alternatives",
      "title": "Alternatives to be assessed",
      "hint": "Including the no-project alternative — its absence is a standard finding.",
      "columns": [
        {
          "key": "alternative",
          "label": "Alternative",
          "type": "text"
        },
        {
          "key": "description",
          "label": "Description",
          "type": "text"
        },
        {
          "key": "assess",
          "label": "To be assessed",
          "type": "select",
          "options": [
            "Yes",
            "No — justify in the report"
          ]
        }
      ]
    }
  ],
  "tor-area": [
    {
      "id": "tor-boundary",
      "title": "Study area boundary coordinates",
      "hint": "Corner or vertex points defining the area of influence. Capture them on the map or enter them directly.",
      "columns": [
        {
          "key": "point",
          "label": "Point ref",
          "type": "text"
        },
        {
          "key": "lat",
          "label": "Latitude",
          "type": "coord"
        },
        {
          "key": "lng",
          "label": "Longitude",
          "type": "coord"
        },
        {
          "key": "type",
          "label": "Boundary",
          "type": "select",
          "options": [
            "Project footprint",
            "Direct area of influence",
            "Indirect area of influence",
            "Buffer zone"
          ]
        },
        {
          "key": "notes",
          "label": "Notes",
          "type": "text"
        }
      ],
      "map": true
    }
  ],
  "tor-legal": [
    {
      "id": "tor-legal-reg",
      "title": "Instruments and approvals the study must address",
      "hint": "Pulled from the jurisdiction register — add anything project-specific.",
      "columns": [
        {
          "key": "instrument",
          "label": "Instrument / standard",
          "type": "text"
        },
        {
          "key": "authority",
          "label": "Authority",
          "type": "text"
        },
        {
          "key": "relevance",
          "label": "Why it applies",
          "type": "text"
        },
        {
          "key": "addressed",
          "label": "To be addressed",
          "type": "select",
          "options": [
            "Yes",
            "Screening only",
            "Not applicable"
          ]
        }
      ]
    }
  ],
  "tor-scope": [
    {
      "id": "tor-tasks",
      "title": "Tasks",
      "hint": "Numbered tasks the consultant is contracted to perform.",
      "columns": [
        {
          "key": "no",
          "label": "Task no.",
          "type": "text"
        },
        {
          "key": "task",
          "label": "Task",
          "type": "text"
        },
        {
          "key": "output",
          "label": "Output",
          "type": "text"
        },
        {
          "key": "weeks",
          "label": "Duration (weeks)",
          "type": "number",
          "chart": true
        }
      ],
      "chart": {
        "labelKey": "no",
        "valueKeys": [
          "weeks"
        ],
        "title": "Duration by task",
        "valueLabel": "Weeks"
      }
    }
  ],
  "tor-method": [
    {
      "id": "tor-baseline",
      "title": "Baseline studies required",
      "hint": "Each discipline, its method, season and standard.",
      "columns": [
        {
          "key": "discipline",
          "label": "Discipline",
          "type": "select",
          "options": [
            "Air quality",
            "Noise & vibration",
            "Surface water",
            "Groundwater",
            "Soils & geology",
            "Biodiversity — flora",
            "Biodiversity — fauna",
            "Aquatic ecology",
            "Socio-economic",
            "Health",
            "Cultural heritage",
            "Traffic",
            "Landscape & visual",
            "Climate & GHG"
          ]
        },
        {
          "key": "method",
          "label": "Method / standard",
          "type": "text"
        },
        {
          "key": "season",
          "label": "Season / timing",
          "type": "text"
        },
        {
          "key": "duration",
          "label": "Survey duration",
          "type": "text"
        },
        {
          "key": "samples",
          "label": "Sampling points",
          "type": "number",
          "chart": true
        }
      ],
      "chart": {
        "labelKey": "discipline",
        "valueKeys": [
          "samples"
        ],
        "title": "Sampling points by discipline",
        "valueLabel": "Points"
      }
    },
    {
      "id": "tor-sampling",
      "title": "Proposed sampling and monitoring locations",
      "hint": "Coordinates for each proposed point — capture on the map.",
      "columns": [
        {
          "key": "ref",
          "label": "Point ref",
          "type": "text"
        },
        {
          "key": "medium",
          "label": "Medium",
          "type": "select",
          "options": [
            "Air",
            "Noise",
            "Surface water",
            "Groundwater",
            "Soil",
            "Ecology transect",
            "Social — settlement",
            "Traffic count"
          ]
        },
        {
          "key": "lat",
          "label": "Latitude",
          "type": "coord"
        },
        {
          "key": "lng",
          "label": "Longitude",
          "type": "coord"
        },
        {
          "key": "rationale",
          "label": "Why here",
          "type": "text"
        }
      ],
      "map": true
    }
  ],
  "tor-stakeholder": [
    {
      "id": "tor-stakeholders",
      "title": "Stakeholders to be consulted",
      "hint": "Who, at what stage, and by what method.",
      "columns": [
        {
          "key": "stakeholder",
          "label": "Stakeholder / group",
          "type": "text"
        },
        {
          "key": "category",
          "label": "Category",
          "type": "select",
          "options": [
            "Affected community",
            "Local authority",
            "National regulator",
            "NGO / civil society",
            "Traditional / cultural authority",
            "Business / worker",
            "Vulnerable group"
          ]
        },
        {
          "key": "method",
          "label": "Method",
          "type": "select",
          "options": [
            "Public meeting",
            "Focus group",
            "Key informant interview",
            "Household survey",
            "Written submission",
            "Disclosure only"
          ]
        },
        {
          "key": "stage",
          "label": "Stage",
          "type": "select",
          "options": [
            "Scoping",
            "Baseline",
            "Draft disclosure",
            "Final disclosure"
          ]
        },
        {
          "key": "language",
          "label": "Language",
          "type": "text"
        }
      ]
    }
  ],
  "tor-deliverables": [
    {
      "id": "tor-deliv",
      "title": "Deliverables",
      "hint": "Every report, when it is due, and in what form.",
      "columns": [
        {
          "key": "deliverable",
          "label": "Deliverable",
          "type": "text"
        },
        {
          "key": "due",
          "label": "Due (weeks from start)",
          "type": "number",
          "chart": true
        },
        {
          "key": "format",
          "label": "Format",
          "type": "text"
        },
        {
          "key": "copies",
          "label": "Copies",
          "type": "text"
        },
        {
          "key": "recipient",
          "label": "Submitted to",
          "type": "text"
        }
      ],
      "chart": {
        "labelKey": "deliverable",
        "valueKeys": [
          "due"
        ],
        "title": "Delivery schedule",
        "valueLabel": "Weeks from start"
      }
    }
  ],
  "tor-team": [
    {
      "id": "tor-experts",
      "title": "Team and expertise required",
      "hint": "Registration of experts is a legal requirement in most jurisdictions.",
      "columns": [
        {
          "key": "role",
          "label": "Role / discipline",
          "type": "text"
        },
        {
          "key": "qualification",
          "label": "Minimum qualification",
          "type": "text"
        },
        {
          "key": "experience",
          "label": "Minimum experience (years)",
          "type": "number"
        },
        {
          "key": "registration",
          "label": "Registration required",
          "type": "text"
        },
        {
          "key": "days",
          "label": "Input (days)",
          "type": "number",
          "chart": true
        }
      ],
      "chart": {
        "labelKey": "role",
        "valueKeys": [
          "days"
        ],
        "title": "Input by role",
        "valueLabel": "Days"
      }
    }
  ],
  "tor-duration": [
    {
      "id": "tor-programme",
      "title": "Programme and payment schedule",
      "hint": "Milestones tied to payment keep an assignment on track.",
      "columns": [
        {
          "key": "milestone",
          "label": "Milestone",
          "type": "text"
        },
        {
          "key": "week",
          "label": "Week",
          "type": "number"
        },
        {
          "key": "payment",
          "label": "Payment (%)",
          "type": "number",
          "chart": true
        },
        {
          "key": "condition",
          "label": "Payment condition",
          "type": "text"
        }
      ],
      "chart": {
        "labelKey": "milestone",
        "valueKeys": [
          "payment"
        ],
        "title": "Payment by milestone",
        "valueLabel": "% of fee"
      }
    }
  ],
  "tor-qa": [
    {
      "id": "tor-review",
      "title": "Review and approval steps",
      "hint": "Who signs off what, and how long they have.",
      "columns": [
        {
          "key": "step",
          "label": "Review step",
          "type": "text"
        },
        {
          "key": "reviewer",
          "label": "Reviewer",
          "type": "text"
        },
        {
          "key": "days",
          "label": "Turnaround (days)",
          "type": "number"
        },
        {
          "key": "criteria",
          "label": "Approval criteria",
          "type": "text"
        }
      ]
    }
  ],
  "background": [
    {
      "id": "esia-components",
      "title": "Project components and footprint",
      "hint": "What is being built or operated, at what scale.",
      "columns": [
        {
          "key": "component",
          "label": "Component",
          "type": "text"
        },
        {
          "key": "description",
          "label": "Description",
          "type": "text"
        },
        {
          "key": "capacity",
          "label": "Capacity",
          "type": "text"
        },
        {
          "key": "area",
          "label": "Area (ha)",
          "type": "number",
          "chart": true
        },
        {
          "key": "phase",
          "label": "Phase",
          "type": "select",
          "options": [
            "Construction",
            "Operation",
            "Decommissioning"
          ]
        }
      ],
      "chart": {
        "labelKey": "component",
        "valueKeys": [
          "area"
        ],
        "title": "Footprint by component",
        "valueLabel": "Hectares"
      }
    }
  ],
  "legal": [
    {
      "id": "esia-legal",
      "title": "Legal and institutional framework applied",
      "hint": "Each instrument, what it requires, and how the project complies.",
      "columns": [
        {
          "key": "instrument",
          "label": "Instrument / standard",
          "type": "text"
        },
        {
          "key": "authority",
          "label": "Authority",
          "type": "text"
        },
        {
          "key": "requirement",
          "label": "Requirement",
          "type": "text"
        },
        {
          "key": "compliance",
          "label": "Project position",
          "type": "select",
          "options": [
            "Complies",
            "Complies with conditions",
            "Gap — action required",
            "Not applicable"
          ]
        }
      ],
      "chart": {
        "labelKey": "compliance",
        "valueKeys": [
          "count"
        ],
        "title": "Compliance position",
        "valueLabel": "Instruments",
        "count": true,
        "status": true
      }
    }
  ],
  "baseline": [
    {
      "id": "esia-sampling",
      "title": "Baseline sampling locations",
      "hint": "Every point where baseline data was collected, with its coordinates.",
      "columns": [
        {
          "key": "ref",
          "label": "Point ref",
          "type": "text"
        },
        {
          "key": "medium",
          "label": "Medium",
          "type": "select",
          "options": [
            "Air",
            "Noise",
            "Surface water",
            "Groundwater",
            "Soil",
            "Ecology",
            "Social",
            "Traffic",
            "Cultural heritage"
          ]
        },
        {
          "key": "lat",
          "label": "Latitude",
          "type": "coord"
        },
        {
          "key": "lng",
          "label": "Longitude",
          "type": "coord"
        },
        {
          "key": "date",
          "label": "Date sampled",
          "type": "date"
        },
        {
          "key": "notes",
          "label": "Notes",
          "type": "text"
        }
      ],
      "map": true
    },
    {
      "id": "esia-results",
      "title": "Baseline results against standards",
      "hint": "The measured condition before the project, judged against the applicable standard.",
      "columns": [
        {
          "key": "parameter",
          "label": "Parameter",
          "type": "text"
        },
        {
          "key": "location",
          "label": "Location",
          "type": "text"
        },
        {
          "key": "result",
          "label": "Result",
          "type": "number",
          "chart": true
        },
        {
          "key": "standard",
          "label": "Standard",
          "type": "number",
          "chart": true
        },
        {
          "key": "unit",
          "label": "Unit",
          "type": "text"
        },
        {
          "key": "status",
          "label": "Status",
          "type": "select",
          "options": [
            "Within standard",
            "Above standard",
            "No standard set"
          ]
        }
      ],
      "chart": {
        "labelKey": "parameter",
        "valueKeys": [
          "result",
          "standard"
        ],
        "title": "Baseline against standard",
        "valueLabel": "Value"
      }
    },
    {
      "id": "esia-receptors",
      "title": "Sensitive receptors",
      "hint": "Homes, schools, clinics, water sources and habitats near the project.",
      "columns": [
        {
          "key": "receptor",
          "label": "Receptor",
          "type": "text"
        },
        {
          "key": "type",
          "label": "Type",
          "type": "select",
          "options": [
            "Settlement",
            "School",
            "Health facility",
            "Place of worship",
            "Water source",
            "Protected area",
            "Habitat",
            "Cultural site",
            "Business"
          ]
        },
        {
          "key": "lat",
          "label": "Latitude",
          "type": "coord"
        },
        {
          "key": "lng",
          "label": "Longitude",
          "type": "coord"
        },
        {
          "key": "distance",
          "label": "Distance from works (m)",
          "type": "number",
          "chart": true
        },
        {
          "key": "sensitivity",
          "label": "Sensitivity",
          "type": "select",
          "options": [
            "Low",
            "Medium",
            "High"
          ]
        }
      ],
      "map": true,
      "chart": {
        "labelKey": "receptor",
        "valueKeys": [
          "distance"
        ],
        "title": "Distance from works",
        "valueLabel": "Metres"
      }
    }
  ],
  "scope": [
    {
      "id": "esia-scope",
      "title": "Scope and assessment boundaries",
      "hint": "What is in and out of the assessment, and why.",
      "columns": [
        {
          "key": "aspect",
          "label": "Aspect",
          "type": "text"
        },
        {
          "key": "included",
          "label": "In scope",
          "type": "select",
          "options": [
            "Yes",
            "No"
          ]
        },
        {
          "key": "justification",
          "label": "Justification",
          "type": "text"
        },
        {
          "key": "method",
          "label": "Assessment method",
          "type": "text"
        }
      ]
    }
  ],
  "impacts": [
    {
      "id": "esia-impacts",
      "title": "Impact assessment",
      "hint": "Each impact rated before and after mitigation — the difference is what mitigation buys.",
      "columns": [
        {
          "key": "impact",
          "label": "Impact",
          "type": "text"
        },
        {
          "key": "receptor",
          "label": "Receptor affected",
          "type": "text"
        },
        {
          "key": "phase",
          "label": "Phase",
          "type": "select",
          "options": [
            "Construction",
            "Operation",
            "Decommissioning",
            "Cumulative"
          ]
        },
        {
          "key": "nature",
          "label": "Nature",
          "type": "select",
          "options": [
            "Adverse",
            "Beneficial"
          ]
        },
        {
          "key": "preScore",
          "label": "Significance before mitigation",
          "type": "number",
          "chart": true
        },
        {
          "key": "postScore",
          "label": "Residual significance",
          "type": "number",
          "chart": true
        },
        {
          "key": "rating",
          "label": "Residual rating",
          "type": "select",
          "options": [
            "Negligible",
            "Minor",
            "Moderate",
            "Major",
            "Critical"
          ]
        }
      ],
      "chart": {
        "labelKey": "impact",
        "valueKeys": [
          "preScore",
          "postScore"
        ],
        "title": "Significance before and after mitigation",
        "valueLabel": "Score"
      }
    }
  ],
  "alternatives": [
    {
      "id": "esia-alts",
      "title": "Analysis of alternatives",
      "hint": "Including the no-project option, compared on the same criteria.",
      "columns": [
        {
          "key": "alternative",
          "label": "Alternative",
          "type": "text"
        },
        {
          "key": "envScore",
          "label": "Environmental score",
          "type": "number",
          "chart": true
        },
        {
          "key": "socScore",
          "label": "Social score",
          "type": "number",
          "chart": true
        },
        {
          "key": "costScore",
          "label": "Cost / feasibility score",
          "type": "number",
          "chart": true
        },
        {
          "key": "selected",
          "label": "Selected",
          "type": "select",
          "options": [
            "Yes",
            "No"
          ]
        },
        {
          "key": "reason",
          "label": "Reason",
          "type": "text"
        }
      ],
      "chart": {
        "labelKey": "alternative",
        "valueKeys": [
          "envScore",
          "socScore",
          "costScore"
        ],
        "title": "Alternatives compared",
        "valueLabel": "Score"
      }
    }
  ],
  "mitigation": [
    {
      "id": "esia-esmp",
      "title": "ESMP — mitigation measures",
      "hint": "The management plan itself: measure, owner, timing, cost and how it is verified.",
      "columns": [
        {
          "key": "impact",
          "label": "Impact addressed",
          "type": "text"
        },
        {
          "key": "measure",
          "label": "Mitigation measure",
          "type": "text"
        },
        {
          "key": "phase",
          "label": "Phase",
          "type": "select",
          "options": [
            "Pre-construction",
            "Construction",
            "Operation",
            "Decommissioning"
          ]
        },
        {
          "key": "owner",
          "label": "Responsible party",
          "type": "text"
        },
        {
          "key": "cost",
          "label": "Cost estimate",
          "type": "number",
          "chart": true
        },
        {
          "key": "indicator",
          "label": "Verification indicator",
          "type": "text"
        }
      ],
      "chart": {
        "labelKey": "impact",
        "valueKeys": [
          "cost"
        ],
        "title": "Mitigation cost by impact",
        "valueLabel": "Cost"
      }
    }
  ],
  "engagement": [
    {
      "id": "esia-consult",
      "title": "Consultation undertaken",
      "hint": "Date, place, who attended and what they said. Attendance registers belong in the appendices.",
      "columns": [
        {
          "key": "date",
          "label": "Date",
          "type": "date"
        },
        {
          "key": "activity",
          "label": "Activity",
          "type": "select",
          "options": [
            "Public meeting",
            "Focus group",
            "Key informant interview",
            "Household survey",
            "Disclosure",
            "Written submission"
          ]
        },
        {
          "key": "location",
          "label": "Location",
          "type": "text"
        },
        {
          "key": "lat",
          "label": "Latitude",
          "type": "coord"
        },
        {
          "key": "lng",
          "label": "Longitude",
          "type": "coord"
        },
        {
          "key": "attendees",
          "label": "Attendees",
          "type": "number",
          "chart": true
        },
        {
          "key": "female",
          "label": "Of which female",
          "type": "number"
        }
      ],
      "map": true,
      "chart": {
        "labelKey": "activity",
        "valueKeys": [
          "attendees",
          "female"
        ],
        "title": "Attendance by activity",
        "valueLabel": "People"
      }
    },
    {
      "id": "esia-issues",
      "title": "Issues raised and how they were addressed",
      "hint": "An issue recorded without a response is a finding waiting to happen.",
      "columns": [
        {
          "key": "issue",
          "label": "Issue raised",
          "type": "text"
        },
        {
          "key": "raisedBy",
          "label": "Raised by",
          "type": "text"
        },
        {
          "key": "response",
          "label": "How it was addressed",
          "type": "text"
        },
        {
          "key": "where",
          "label": "Where addressed in the report",
          "type": "text"
        },
        {
          "key": "status",
          "label": "Status",
          "type": "select",
          "options": [
            "Addressed",
            "Partly addressed",
            "Outside project scope",
            "Open"
          ]
        }
      ]
    }
  ],
  "monitoring": [
    {
      "id": "esia-monitoring",
      "title": "Monitoring plan",
      "hint": "Parameter, location, frequency, limit and who does it.",
      "columns": [
        {
          "key": "parameter",
          "label": "Parameter",
          "type": "text"
        },
        {
          "key": "location",
          "label": "Location",
          "type": "text"
        },
        {
          "key": "lat",
          "label": "Latitude",
          "type": "coord"
        },
        {
          "key": "lng",
          "label": "Longitude",
          "type": "coord"
        },
        {
          "key": "frequency",
          "label": "Frequency",
          "type": "select",
          "options": [
            "Continuous",
            "Daily",
            "Weekly",
            "Monthly",
            "Quarterly",
            "Bi-annual",
            "Annual"
          ]
        },
        {
          "key": "limit",
          "label": "Limit / standard",
          "type": "text"
        },
        {
          "key": "responsible",
          "label": "Responsible",
          "type": "text"
        }
      ],
      "map": true
    }
  ],
  "institutional": [
    {
      "id": "esia-budget",
      "title": "Institutional arrangements and budget",
      "hint": "Who implements each part of the ESMP, and what it costs.",
      "columns": [
        {
          "key": "item",
          "label": "Item",
          "type": "text"
        },
        {
          "key": "responsible",
          "label": "Responsible party",
          "type": "text"
        },
        {
          "key": "year1",
          "label": "Year 1 cost",
          "type": "number",
          "chart": true
        },
        {
          "key": "annual",
          "label": "Annual recurring cost",
          "type": "number",
          "chart": true
        },
        {
          "key": "source",
          "label": "Funding source",
          "type": "text"
        }
      ],
      "chart": {
        "labelKey": "item",
        "valueKeys": [
          "year1",
          "annual"
        ],
        "title": "ESMP budget",
        "valueLabel": "Cost"
      }
    }
  ],
  "conclusion": [
    {
      "id": "esia-conditions",
      "title": "Recommended conditions of approval",
      "hint": "What the regulator should attach to the certificate.",
      "columns": [
        {
          "key": "condition",
          "label": "Recommended condition",
          "type": "text"
        },
        {
          "key": "rationale",
          "label": "Rationale",
          "type": "text"
        },
        {
          "key": "timing",
          "label": "Timing",
          "type": "select",
          "options": [
            "Before construction",
            "During construction",
            "Before operation",
            "Ongoing"
          ]
        }
      ]
    }
  ],

    "safety": [
      {
        "id": "incidents",
        "title": "Incident & near-miss log",
        "hint": "One row per event this period. Leave empty if there were none — an empty table reports zero.",
        "columns": [
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "type",
            "label": "Type",
            "type": "select",
            "options": [
              "Near-miss",
              "First aid case",
              "Medical treatment",
              "Lost time injury",
              "Property damage",
              "Vehicle incident"
            ]
          },
          {
            "key": "desc",
            "label": "What happened",
            "type": "text"
          },
          {
            "key": "daysLost",
            "label": "Days lost",
            "type": "number"
          },
          {
            "key": "action",
            "label": "Corrective action",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Open",
              "In progress",
              "Closed"
            ]
          }
        ],
        "chart": {
          "labelKey": "type",
          "valueKeys": [
            "count"
          ],
          "title": "Events by type",
          "valueLabel": "Events",
          "count": true
        }
      },
      {
        "id": "training",
        "title": "Safety training delivered",
        "hint": "Courses, toolbox talks and briefings run this period.",
        "columns": [
          {
            "key": "course",
            "label": "Course / topic",
            "type": "text"
          },
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "attendees",
            "label": "Attendees",
            "type": "number",
            "chart": true
          },
          {
            "key": "trainer",
            "label": "Delivered by",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "course",
          "valueKeys": [
            "attendees"
          ],
          "title": "Attendees by course",
          "valueLabel": "People"
        }
      }
    ],
    "security": [
      {
        "id": "sec-incidents",
        "title": "Security incident log",
        "hint": "Date, incident, location, how it was managed, outcome, lessons learnt and action required.",
        "columns": [
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "incident",
            "label": "Security incident",
            "type": "text"
          },
          {
            "key": "location",
            "label": "Location",
            "type": "text"
          },
          {
            "key": "management",
            "label": "Management of the incident",
            "type": "text"
          },
          {
            "key": "outcome",
            "label": "Outcome",
            "type": "text"
          },
          {
            "key": "lessons",
            "label": "Lessons learnt",
            "type": "text"
          },
          {
            "key": "action",
            "label": "Action required",
            "type": "text"
          }
        ]
      },
      {
        "id": "drills",
        "title": "Drills & exercises conducted",
        "hint": "Emergency drills, access-control and VPSHR training.",
        "columns": [
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "subject",
            "label": "Subject",
            "type": "text"
          },
          {
            "key": "group",
            "label": "Targeted group",
            "type": "text"
          },
          {
            "key": "attendees",
            "label": "Attendees",
            "type": "number",
            "chart": true
          }
        ],
        "chart": {
          "labelKey": "subject",
          "valueKeys": [
            "attendees"
          ],
          "title": "Attendance by drill / training",
          "valueLabel": "People"
        }
      }
    ],
    "environment": [
      {
        "id": "monitoring",
        "title": "Monitoring results vs limit",
        "hint": "Each sample: what you measured, the result, and the permit or national standard it is judged against.",
        "columns": [
          {
            "key": "point",
            "label": "Sample point",
            "type": "text"
          },
          {
            "key": "parameter",
            "label": "Parameter",
            "type": "text"
          },
          {
            "key": "result",
            "label": "Result",
            "type": "number",
            "chart": true
          },
          {
            "key": "limit",
            "label": "Limit",
            "type": "number",
            "chart": true
          },
          {
            "key": "unit",
            "label": "Unit",
            "type": "text"
          },
          {
            "key": "date",
            "label": "Sampled",
            "type": "date"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Within limit",
              "Above limit",
              "Awaiting lab"
            ]
          }
        ],
        "chart": {
          "labelKey": "parameter",
          "valueKeys": [
            "result",
            "limit"
          ],
          "title": "Result against limit",
          "valueLabel": "Value"
        }
      },
      {
        "id": "waste",
        "title": "Waste removed",
        "hint": "Quantity by stream, who took it, and the transfer note reference.",
        "columns": [
          {
            "key": "stream",
            "label": "Waste stream",
            "type": "select",
            "options": [
              "General",
              "Recyclable",
              "Biodegradable",
              "Hazardous",
              "Medical",
              "Used oil",
              "Sewage",
              "Contaminated soil"
            ]
          },
          {
            "key": "qty",
            "label": "Quantity",
            "type": "number",
            "chart": true
          },
          {
            "key": "unit",
            "label": "Unit",
            "type": "select",
            "options": [
              "m³",
              "kg",
              "tonnes",
              "drums",
              "litres"
            ]
          },
          {
            "key": "handler",
            "label": "Licensed handler",
            "type": "text"
          },
          {
            "key": "wtn",
            "label": "Transfer note ref",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "stream",
          "valueKeys": [
            "qty"
          ],
          "title": "Quantity by waste stream",
          "valueLabel": "Quantity"
        }
      }
    ],
    "ghg": [
      {
        "id": "energy",
        "carryForward": {
          "labelKey": "source",
          "periodKey": "month",
          "cumulativeKey": "accumulated"
        },
        "title": "Energy & fuel use",
        "hint": "Every source you paid for this period. The emission factor converts it to CO₂e — leave blank if you don't have one yet.",
        "columns": [
          {
            "key": "source",
            "label": "Source",
            "type": "select",
            "options": [
              "Grid electricity",
              "Diesel — generators",
              "Diesel — vehicles",
              "Petrol",
              "LPG",
              "Fuel oil",
              "Charcoal / biomass",
              "Solar (generated)"
            ]
          },
          {
            "key": "qty",
            "label": "Quantity",
            "type": "number",
            "chart": true
          },
          {
            "key": "unit",
            "label": "Unit",
            "type": "select",
            "options": [
              "kWh",
              "litres",
              "kg",
              "tonnes",
              "m³"
            ]
          },
          {
            "key": "factor",
            "label": "Emission factor (kg CO₂e/unit)",
            "type": "number"
          },
          {
            "key": "co2e",
            "label": "CO₂e",
            "type": "number",
            "chart": true
          }
        ],
        "chart": {
          "labelKey": "source",
          "valueKeys": [
            "co2e"
          ],
          "title": "CO₂e by source",
          "valueLabel": "kg CO₂e"
        }
      },
      {
        "id": "reduction",
        "title": "Reduction actions",
        "hint": "What you did to cut consumption, and the saving if you measured it.",
        "columns": [
          {
            "key": "action",
            "label": "Action",
            "type": "text"
          },
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "saving",
            "label": "Estimated saving",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Planned",
              "In progress",
              "Complete"
            ]
          }
        ]
      }
    ],
    "community": [
      {
        "id": "grievances",
        "title": "Grievance register",
        "hint": "Every complaint received, whether or not you agreed with it. Open grievances are what reviewers count.",
        "columns": [
          {
            "key": "ref",
            "label": "Ref",
            "type": "text"
          },
          {
            "key": "date",
            "label": "Date received",
            "type": "date"
          },
          {
            "key": "source",
            "label": "From",
            "type": "text"
          },
          {
            "key": "issue",
            "label": "Issue raised",
            "type": "text"
          },
          {
            "key": "action",
            "label": "Action taken",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Open",
              "Under investigation",
              "Resolved",
              "Closed"
            ]
          },
          {
            "key": "closed",
            "label": "Date closed",
            "type": "date"
          }
        ],
        "chart": {
          "labelKey": "status",
          "valueKeys": [
            "count"
          ],
          "title": "Grievances by status",
          "valueLabel": "Grievances",
          "count": true,
          "status": true
        }
      },
      {
        "id": "engagement",
        "title": "Engagement & CSR activities",
        "hint": "Meetings, sensitisations and community support delivered.",
        "columns": [
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "activity",
            "label": "Activity",
            "type": "text"
          },
          {
            "key": "location",
            "label": "Village / location",
            "type": "text"
          },
          {
            "key": "participants",
            "label": "Participants",
            "type": "number",
            "chart": true
          },
          {
            "key": "outcome",
            "label": "Outcome / commitments made",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "activity",
          "valueKeys": [
            "participants"
          ],
          "title": "Participants by activity",
          "valueLabel": "People"
        }
      }
    ],
    "permitting": [
      {
        "id": "permit-register",
        "title": "Permit & licence register",
        "hint": "Every permit the site relies on. Anything expiring inside 90 days belongs in your management comment.",
        "columns": [
          {
            "key": "permit",
            "label": "Permit / licence",
            "type": "text"
          },
          {
            "key": "authority",
            "label": "Issuing authority",
            "type": "text"
          },
          {
            "key": "ref",
            "label": "Certificate no.",
            "type": "text"
          },
          {
            "key": "issued",
            "label": "Issued",
            "type": "date"
          },
          {
            "key": "expiry",
            "label": "Expiry",
            "type": "date"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Valid",
              "Renewal applied",
              "Expired",
              "Not yet applied",
              "Not applicable"
            ]
          }
        ],
        "chart": {
          "labelKey": "status",
          "valueKeys": [
            "count"
          ],
          "title": "Permits by status",
          "valueLabel": "Permits",
          "count": true,
          "status": true
        }
      }
    ],
    "ps1": [
      {
        "id": "ps1-risks",
        "title": "Risk & impact register with management measures",
        "hint": "Each identified E&S risk, the measure managing it, who owns it and whether it is working.",
        "columns": [
          {
            "key": "risk",
            "label": "Risk / impact",
            "type": "text"
          },
          {
            "key": "measure",
            "label": "Management measure",
            "type": "text"
          },
          {
            "key": "owner",
            "label": "Owner",
            "type": "text"
          },
          {
            "key": "due",
            "label": "Due",
            "type": "date"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Effective",
              "Partially effective",
              "Not implemented",
              "Under review"
            ]
          }
        ],
        "chart": {
          "labelKey": "status",
          "valueKeys": [
            "count"
          ],
          "title": "Management measures by status",
          "valueLabel": "Measures",
          "count": true,
          "status": true
        }
      }
    ],
    "ps2": [
      {
        "id": "ps2-labour",
        "title": "Workforce & working conditions",
        "hint": "Split by category so contracted and supply-chain workers are visible, as PS2 requires.",
        "columns": [
          {
            "key": "category",
            "label": "Worker category",
            "type": "select",
            "options": [
              "Direct employees",
              "Contracted workers",
              "Supply-chain workers",
              "Migrant workers"
            ]
          },
          {
            "key": "total",
            "label": "Total",
            "type": "number",
            "chart": true
          },
          {
            "key": "male",
            "label": "Male",
            "type": "number"
          },
          {
            "key": "female",
            "label": "Female",
            "type": "number"
          },
          {
            "key": "grievances",
            "label": "Grievances received",
            "type": "number",
            "chart": true
          },
          {
            "key": "closed",
            "label": "Grievances closed",
            "type": "number"
          }
        ],
        "chart": {
          "labelKey": "category",
          "valueKeys": [
            "total",
            "grievances"
          ],
          "title": "Workforce and grievances by category",
          "valueLabel": "Count"
        }
      }
    ],
    "ps3": [
      {
        "id": "ps3-resource",
        "title": "Resource use, emissions and waste",
        "hint": "Quantities for the period with the prior period alongside, so the trend is visible.",
        "columns": [
          {
            "key": "stream",
            "label": "Resource / stream",
            "type": "select",
            "options": [
              "Electricity",
              "Fuel",
              "Water abstracted",
              "Effluent discharged",
              "Air emissions",
              "Hazardous waste",
              "Non-hazardous waste",
              "GHG (CO₂e)"
            ]
          },
          {
            "key": "qty",
            "label": "This period",
            "type": "number",
            "chart": true
          },
          {
            "key": "prior",
            "label": "Prior period",
            "type": "number",
            "chart": true
          },
          {
            "key": "unit",
            "label": "Unit",
            "type": "text"
          },
          {
            "key": "notes",
            "label": "Notes",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "stream",
          "valueKeys": [
            "qty",
            "prior"
          ],
          "title": "This period against prior period",
          "valueLabel": "Quantity"
        }
      }
    ],
    "ps4": [
      {
        "id": "ps4-community",
        "title": "Community exposure, emergency preparedness and security conduct",
        "hint": "Hazards reaching people outside the fence, plus drills and any security-personnel conduct issue.",
        "columns": [
          {
            "key": "item",
            "label": "Hazard / activity",
            "type": "text"
          },
          {
            "key": "exposure",
            "label": "Who is exposed",
            "type": "text"
          },
          {
            "key": "control",
            "label": "Control in place",
            "type": "text"
          },
          {
            "key": "drills",
            "label": "Drills held",
            "type": "number",
            "chart": true
          },
          {
            "key": "incidents",
            "label": "Incidents",
            "type": "number",
            "chart": true
          }
        ],
        "chart": {
          "labelKey": "item",
          "valueKeys": [
            "drills",
            "incidents"
          ],
          "title": "Drills and incidents",
          "valueLabel": "Count"
        }
      }
    ],
    "ps5": [
      {
        "id": "ps5-land",
        "title": "Land acquisition, compensation and livelihood restoration",
        "hint": "Household-level status. Outstanding compensation is the first thing a lender checks.",
        "columns": [
          {
            "key": "ref",
            "label": "Household / plot ref",
            "type": "text"
          },
          {
            "key": "type",
            "label": "Displacement",
            "type": "select",
            "options": [
              "Physical",
              "Economic",
              "Both",
              "None"
            ]
          },
          {
            "key": "entitlement",
            "label": "Entitlement",
            "type": "text"
          },
          {
            "key": "paid",
            "label": "Compensation paid",
            "type": "select",
            "options": [
              "Paid in full",
              "Part paid",
              "Not paid",
              "Disputed"
            ]
          },
          {
            "key": "livelihood",
            "label": "Livelihood restoration status",
            "type": "text"
          },
          {
            "key": "grievance",
            "label": "Grievance open",
            "type": "select",
            "options": [
              "No",
              "Yes"
            ]
          }
        ],
        "chart": {
          "labelKey": "paid",
          "valueKeys": [
            "count"
          ],
          "title": "Households by compensation status",
          "valueLabel": "Households",
          "count": true,
          "status": true
        }
      }
    ],
    "ps6": [
      {
        "id": "ps6-bio",
        "title": "Biodiversity values, impacts and actions",
        "hint": "Habitats and species affected, and what is being done. Include ecosystem services communities depend on.",
        "columns": [
          {
            "key": "feature",
            "label": "Habitat / species / service",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Conservation status",
            "type": "text"
          },
          {
            "key": "impact",
            "label": "Impact",
            "type": "text"
          },
          {
            "key": "area",
            "label": "Area affected (ha)",
            "type": "number",
            "chart": true
          },
          {
            "key": "action",
            "label": "Mitigation / offset action",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "feature",
          "valueKeys": [
            "area"
          ],
          "title": "Area affected by feature",
          "valueLabel": "Hectares"
        }
      }
    ],
    "ps7": [
      {
        "id": "ps7-ip",
        "title": "Indigenous Peoples — consultation and consent",
        "hint": "Only applicable where Indigenous Peoples are present. Record consultation and, where required, FPIC status.",
        "columns": [
          {
            "key": "group",
            "label": "Group / community",
            "type": "text"
          },
          {
            "key": "impact",
            "label": "Impact on lands, resources or culture",
            "type": "text"
          },
          {
            "key": "consultation",
            "label": "Consultation undertaken",
            "type": "text"
          },
          {
            "key": "fpic",
            "label": "FPIC required / status",
            "type": "select",
            "options": [
              "Not required",
              "Required — in process",
              "Required — obtained",
              "Required — not obtained"
            ]
          },
          {
            "key": "agreement",
            "label": "Agreement / benefit-sharing",
            "type": "text"
          }
        ]
      }
    ],
    "ps8": [
      {
        "id": "ps8-heritage",
        "title": "Cultural heritage register & chance finds",
        "hint": "Tangible and intangible heritage, plus every chance find and how the procedure was applied.",
        "columns": [
          {
            "key": "site",
            "label": "Site / feature",
            "type": "text"
          },
          {
            "key": "type",
            "label": "Type",
            "type": "select",
            "options": [
              "Archaeological",
              "Burial / grave",
              "Sacred site",
              "Built heritage",
              "Intangible heritage",
              "Chance find"
            ]
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Protected in situ",
              "Demarcated",
              "Relocated",
              "Under assessment",
              "Destroyed"
            ]
          },
          {
            "key": "action",
            "label": "Action taken",
            "type": "text"
          },
          {
            "key": "authority",
            "label": "Authority notified",
            "type": "text"
          }
        ]
      }
    ],
    "intro": [
      {
        "id": "distribution",
        "title": "Distribution list",
        "hint": "Everyone this report is submitted to, and in what capacity.",
        "columns": [
          {
            "key": "recipient",
            "label": "Recipient",
            "type": "text"
          },
          {
            "key": "role",
            "label": "Role",
            "type": "select",
            "options": [
              "Lender",
              "Independent E&S Consultant (IESC)",
              "Employer",
              "Engineer",
              "Regulator",
              "Internal"
            ]
          },
          {
            "key": "submitted",
            "label": "Date submitted",
            "type": "date"
          }
        ]
      }
    ],
    "activities": [
      {
        "id": "progress",
        "title": "Work elements and percentage complete",
        "hint": "Every active work front with its completion figure — the same list the Engineer tracks.",
        "columns": [
          {
            "key": "element",
            "label": "Work element",
            "type": "text"
          },
          {
            "key": "percent",
            "label": "Complete",
            "type": "number",
            "unit": "%",
            "chart": true
          },
          {
            "key": "remarks",
            "label": "Remarks",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "element",
          "valueKeys": [
            "percent"
          ],
          "title": "Completion by work element",
          "valueLabel": "% complete"
        }
      }
    ],
    "labour-stats": [
      {
        "id": "direct",
        "title": "Direct employment",
        "hint": "Your own payroll, split as the format requires.",
        "columns": [
          {
            "key": "category",
            "label": "Category / trade",
            "type": "text"
          },
          {
            "key": "total",
            "label": "Total",
            "type": "number",
            "chart": true
          },
          {
            "key": "male",
            "label": "Male",
            "type": "number",
            "chart": true
          },
          {
            "key": "female",
            "label": "Female",
            "type": "number",
            "chart": true
          },
          {
            "key": "local",
            "label": "Host district",
            "type": "number"
          },
          {
            "key": "outside",
            "label": "Outside district",
            "type": "number"
          },
          {
            "key": "expat",
            "label": "Expatriate",
            "type": "number"
          }
        ],
        "chart": {
          "labelKey": "category",
          "valueKeys": [
            "male",
            "female"
          ],
          "title": "Direct employment by sex",
          "valueLabel": "Workers"
        }
      },
      {
        "id": "indirect",
        "title": "Indirect employment (sub-contractors)",
        "hint": "One row per sub-contractor, including those currently at zero.",
        "columns": [
          {
            "key": "subcontractor",
            "label": "Sub-contractor",
            "type": "text"
          },
          {
            "key": "total",
            "label": "Total",
            "type": "number",
            "chart": true
          },
          {
            "key": "male",
            "label": "Male",
            "type": "number"
          },
          {
            "key": "female",
            "label": "Female",
            "type": "number"
          },
          {
            "key": "local",
            "label": "Host district",
            "type": "number"
          },
          {
            "key": "expat",
            "label": "Expatriate",
            "type": "number"
          }
        ],
        "chart": {
          "labelKey": "subcontractor",
          "valueKeys": [
            "total"
          ],
          "title": "Workforce by sub-contractor",
          "valueLabel": "Workers"
        }
      }
    ],
    "ehs-org": [
      {
        "id": "org",
        "title": "EHS establishment",
        "hint": "Each EHS role, who holds it, and whether it is filled.",
        "columns": [
          {
            "key": "role",
            "label": "Role",
            "type": "text"
          },
          {
            "key": "name",
            "label": "Name",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Filled",
              "Vacant",
              "Joined this month",
              "Left this month"
            ]
          },
          {
            "key": "reportsTo",
            "label": "Reports to",
            "type": "text"
          }
        ]
      }
    ],
    "hs-stats": [
      {
        "id": "accidents",
        "title": "Accidents & incidents",
        "hint": "One row per event. If there were none, write \"None\" in the first row — that is how the format reports zero.",
        "columns": [
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "name",
            "label": "Name",
            "type": "text"
          },
          {
            "key": "function",
            "label": "Function & section",
            "type": "text"
          },
          {
            "key": "injury",
            "label": "Injury & body part",
            "type": "text"
          },
          {
            "key": "daysLost",
            "label": "Days lost",
            "type": "number",
            "chart": true
          },
          {
            "key": "prevention",
            "label": "Preventive action",
            "type": "text"
          },
          {
            "key": "implemented",
            "label": "Implemented",
            "type": "select",
            "options": [
              "Yes",
              "No",
              "In progress"
            ]
          }
        ]
      },
      {
        "id": "interactions",
        "carryForward": {
          "labelKey": "item",
          "periodKey": "month",
          "cumulativeKey": "accumulated"
        },
        "title": "Health & safety interactions",
        "hint": "Month figure and the running total — reviewers read the two together.",
        "columns": [
          {
            "key": "item",
            "label": "Interaction",
            "type": "text"
          },
          {
            "key": "month",
            "label": "During month",
            "type": "number",
            "chart": true
          },
          {
            "key": "accumulated",
            "label": "Accumulated",
            "type": "number"
          },
          {
            "key": "comments",
            "label": "Comments",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "item",
          "valueKeys": [
            "month"
          ],
          "title": "H&S interactions this month",
          "valueLabel": "Count"
        },
        "starterRows": [
          {
            "item": "H&S inductions conducted"
          },
          {
            "item": "Toolbox talks"
          },
          {
            "item": "First-aid training (staff)"
          },
          {
            "item": "Fire-fighting training (staff)"
          },
          {
            "item": "Management safety observations"
          },
          {
            "item": "Near-miss cards received"
          },
          {
            "item": "H&S observation forms received"
          }
        ]
      },
      {
        "id": "ppe",
        "carryForward": {
          "labelKey": "item",
          "periodKey": "month",
          "cumulativeKey": "accumulated"
        },
        "title": "PPE penetration",
        "hint": "Issued, lost, and people seen without the right PPE.",
        "columns": [
          {
            "key": "item",
            "label": "Item",
            "type": "text"
          },
          {
            "key": "month",
            "label": "During month",
            "type": "number",
            "chart": true
          },
          {
            "key": "accumulated",
            "label": "Accumulated",
            "type": "number"
          },
          {
            "key": "comments",
            "label": "Comments",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "item",
          "valueKeys": [
            "month"
          ],
          "title": "PPE activity this month",
          "valueLabel": "Count"
        },
        "starterRows": [
          {
            "item": "PPE issued"
          },
          {
            "item": "PPE lost"
          },
          {
            "item": "Staff observed without proper PPE"
          },
          {
            "item": "First-aid kits checked / refilled"
          },
          {
            "item": "Fire equipment checked / serviced"
          }
        ]
      },
      {
        "id": "trainings",
        "title": "Specific trainings",
        "hint": "Each course run this month, with attendance.",
        "columns": [
          {
            "key": "training",
            "label": "Training",
            "type": "text"
          },
          {
            "key": "participants",
            "label": "Participants",
            "type": "number",
            "chart": true
          },
          {
            "key": "conductedBy",
            "label": "Conducted by",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "training",
          "valueKeys": [
            "participants"
          ],
          "title": "Participants by training",
          "valueLabel": "People"
        }
      },
      {
        "id": "subcontractor-hs",
        "title": "Sub-contractor safety statistics",
        "hint": "The same few measures for every sub-contractor on site.",
        "columns": [
          {
            "key": "subcontractor",
            "label": "Sub-contractor",
            "type": "text"
          },
          {
            "key": "toolbox",
            "label": "Toolbox talks",
            "type": "number",
            "chart": true
          },
          {
            "key": "incidents",
            "label": "Incidents",
            "type": "number",
            "chart": true
          },
          {
            "key": "nearMiss",
            "label": "Near misses",
            "type": "number"
          },
          {
            "key": "ppe",
            "label": "PPE issued",
            "type": "number"
          }
        ],
        "chart": {
          "labelKey": "subcontractor",
          "valueKeys": [
            "toolbox",
            "incidents"
          ],
          "title": "Toolbox talks and incidents by sub-contractor",
          "valueLabel": "Count"
        }
      }
    ],
    "clinic": [
      {
        "id": "clinic-cases",
        "carryForward": {
          "labelKey": "condition",
          "periodKey": "month",
          "cumulativeKey": "accumulated"
        },
        "title": "Clinic attendance by condition",
        "hint": "Cases seen this month and the running total; flag anything notifiable.",
        "columns": [
          {
            "key": "condition",
            "label": "Condition",
            "type": "text"
          },
          {
            "key": "month",
            "label": "Cases this month",
            "type": "number",
            "chart": true
          },
          {
            "key": "accumulated",
            "label": "Accumulated",
            "type": "number"
          },
          {
            "key": "referrals",
            "label": "Referrals",
            "type": "number"
          },
          {
            "key": "notes",
            "label": "Notes",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "condition",
          "valueKeys": [
            "month"
          ],
          "title": "Cases by condition",
          "valueLabel": "Cases"
        },
        "starterRows": [
          {
            "condition": "Malaria"
          },
          {
            "condition": "Respiratory infection"
          },
          {
            "condition": "Gastro-intestinal"
          },
          {
            "condition": "Minor injury / first aid"
          },
          {
            "condition": "Other"
          }
        ]
      }
    ],
    "labour-mgmt": [
      {
        "id": "worker-grievances",
        "title": "Worker grievance register",
        "hint": "Worker complaints are tracked separately from community ones.",
        "columns": [
          {
            "key": "ref",
            "label": "Ref",
            "type": "text"
          },
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "issue",
            "label": "Issue",
            "type": "text"
          },
          {
            "key": "action",
            "label": "Action taken",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Open",
              "Under investigation",
              "Resolved",
              "Closed"
            ]
          },
          {
            "key": "closed",
            "label": "Date closed",
            "type": "date"
          }
        ],
        "chart": {
          "labelKey": "status",
          "valueKeys": [
            "count"
          ],
          "title": "Worker grievances by status",
          "valueLabel": "Grievances",
          "count": true,
          "status": true
        }
      },
      {
        "id": "worker-meetings",
        "title": "Workers' representative meetings",
        "hint": "Meeting number, date and attendance — minutes go in the appendices.",
        "columns": [
          {
            "key": "meetingNo",
            "label": "Meeting no.",
            "type": "text"
          },
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "attendees",
            "label": "Attendees",
            "type": "number",
            "chart": true
          },
          {
            "key": "topics",
            "label": "Main topics",
            "type": "text"
          },
          {
            "key": "actions",
            "label": "Actions agreed",
            "type": "text"
          }
        ]
      }
    ],
    "accommodation": [
      {
        "id": "camp-inspections",
        "title": "Camp inspections",
        "hint": "Each camp inspected, findings raised and whether they are closed.",
        "columns": [
          {
            "key": "camp",
            "label": "Camp",
            "type": "text"
          },
          {
            "key": "date",
            "label": "Inspection date",
            "type": "date"
          },
          {
            "key": "occupancy",
            "label": "Occupancy",
            "type": "number",
            "chart": true
          },
          {
            "key": "findings",
            "label": "Findings raised",
            "type": "number",
            "chart": true
          },
          {
            "key": "closed",
            "label": "Findings closed",
            "type": "number"
          },
          {
            "key": "status",
            "label": "Overall",
            "type": "select",
            "options": [
              "Compliant",
              "Minor findings",
              "Major findings"
            ]
          }
        ],
        "chart": {
          "labelKey": "camp",
          "valueKeys": [
            "occupancy",
            "findings"
          ],
          "title": "Occupancy and findings by camp",
          "valueLabel": "Count"
        }
      }
    ],
    "traffic": [
      {
        "id": "traffic-hazards",
        "title": "Road and junction risk register",
        "hint": "Each road or junction, the hazard, and the control in place.",
        "columns": [
          {
            "key": "location",
            "label": "Road / junction",
            "type": "text"
          },
          {
            "key": "hazard",
            "label": "Hazard",
            "type": "text"
          },
          {
            "key": "control",
            "label": "Control measure",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "In place",
              "Partially in place",
              "Planned"
            ]
          }
        ]
      },
      {
        "id": "traffic-incidents",
        "carryForward": {
          "labelKey": "item",
          "periodKey": "month",
          "cumulativeKey": "accumulated"
        },
        "title": "Traffic incidents & driver training",
        "hint": "Incidents this month and the training response.",
        "columns": [
          {
            "key": "item",
            "label": "Item",
            "type": "text"
          },
          {
            "key": "month",
            "label": "This month",
            "type": "number",
            "chart": true
          },
          {
            "key": "accumulated",
            "label": "Accumulated",
            "type": "number"
          },
          {
            "key": "notes",
            "label": "Notes",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "item",
          "valueKeys": [
            "month"
          ],
          "title": "Traffic measures this month",
          "valueLabel": "Count"
        },
        "starterRows": [
          {
            "item": "Traffic incidents"
          },
          {
            "item": "Drivers / operators trained"
          },
          {
            "item": "Vehicle inspections"
          },
          {
            "item": "Speed violations recorded"
          }
        ]
      }
    ],
    "water-energy": [
      {
        "id": "water",
        "carryForward": {
          "labelKey": "source",
          "periodKey": "month",
          "cumulativeKey": "accumulated"
        },
        "title": "Water abstraction by source and activity",
        "hint": "Month and cumulative for every source, as the permit conditions require.",
        "columns": [
          {
            "key": "source",
            "label": "Water source",
            "type": "text"
          },
          {
            "key": "activity",
            "label": "Section / activity",
            "type": "text"
          },
          {
            "key": "month",
            "label": "Month",
            "type": "number",
            "unit": "m³",
            "chart": true
          },
          {
            "key": "accumulated",
            "label": "Accumulated",
            "type": "number",
            "unit": "m³"
          },
          {
            "key": "permit",
            "label": "Permit ref / daily limit",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "source",
          "valueKeys": [
            "month"
          ],
          "title": "Abstraction this month by source",
          "valueLabel": "m³"
        }
      },
      {
        "id": "energy",
        "title": "Energy consumption and emission rate",
        "hint": "Each energy source converted to kWh equivalent, with the CO₂ it implies.",
        "columns": [
          {
            "key": "source",
            "label": "Energy source",
            "type": "text"
          },
          {
            "key": "unit",
            "label": "Unit",
            "type": "text"
          },
          {
            "key": "month",
            "label": "Month",
            "type": "number",
            "chart": true
          },
          {
            "key": "accumulated",
            "label": "Accumulated (eq kWh)",
            "type": "number"
          },
          {
            "key": "co2",
            "label": "CO₂",
            "type": "number",
            "unit": "kg/day"
          }
        ],
        "chart": {
          "labelKey": "source",
          "valueKeys": [
            "month"
          ],
          "title": "Consumption this month by source",
          "valueLabel": "Quantity"
        }
      }
    ],
    "community-hs": [
      {
        "id": "monitoring",
        "title": "Noise, vibration and air quality against limits",
        "hint": "Every reading with the limit beside it — a reading without its limit cannot be assessed.",
        "columns": [
          {
            "key": "location",
            "label": "Location",
            "type": "text"
          },
          {
            "key": "parameter",
            "label": "Parameter",
            "type": "select",
            "options": [
              "Noise — day",
              "Noise — night",
              "Vibration (PPV)",
              "PM2.5",
              "PM10",
              "Dust deposition"
            ]
          },
          {
            "key": "result",
            "label": "Result",
            "type": "number",
            "chart": true
          },
          {
            "key": "limit",
            "label": "Limit",
            "type": "number",
            "chart": true
          },
          {
            "key": "unit",
            "label": "Unit",
            "type": "text"
          },
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Within limit",
              "Above limit",
              "Awaiting result"
            ]
          }
        ],
        "chart": {
          "labelKey": "location",
          "valueKeys": [
            "result",
            "limit"
          ],
          "title": "Reading against limit by location",
          "valueLabel": "Value"
        }
      }
    ],
    "waste": [
      {
        "id": "waste-streams",
        "carryForward": {
          "labelKey": "stream",
          "periodKey": "month",
          "cumulativeKey": "accumulated"
        },
        "title": "Waste generated, handled and transferred",
        "hint": "Month and cumulative by stream, with the waste transfer note reference.",
        "columns": [
          {
            "key": "stream",
            "label": "Waste stream",
            "type": "text"
          },
          {
            "key": "month",
            "label": "Month",
            "type": "number",
            "unit": "m³",
            "chart": true
          },
          {
            "key": "accumulated",
            "label": "Accumulated",
            "type": "number",
            "unit": "m³"
          },
          {
            "key": "handling",
            "label": "Handling / disposal route",
            "type": "text"
          },
          {
            "key": "handler",
            "label": "Licensed handler",
            "type": "text"
          },
          {
            "key": "wtn",
            "label": "WTN ref",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "stream",
          "valueKeys": [
            "month"
          ],
          "title": "Quantity this month by stream",
          "valueLabel": "m³"
        },
        "starterRows": [
          {
            "stream": "Recyclable (paper, plastic, glass, wood, scrap metal)"
          },
          {
            "stream": "Biodegradable"
          },
          {
            "stream": "Hazardous & contaminated soil"
          },
          {
            "stream": "Medical"
          },
          {
            "stream": "Sewage"
          },
          {
            "stream": "Used oil"
          },
          {
            "stream": "Used batteries"
          },
          {
            "stream": "Used tyres"
          }
        ]
      }
    ],
    "wastewater": [
      {
        "id": "effluent",
        "title": "Effluent and storm water results",
        "hint": "Sample point, parameter, result and the standard it is judged against.",
        "columns": [
          {
            "key": "point",
            "label": "Sample point",
            "type": "text"
          },
          {
            "key": "parameter",
            "label": "Parameter",
            "type": "text"
          },
          {
            "key": "result",
            "label": "Result",
            "type": "number",
            "chart": true
          },
          {
            "key": "standard",
            "label": "Standard",
            "type": "number",
            "chart": true
          },
          {
            "key": "unit",
            "label": "Unit",
            "type": "text"
          },
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Compliant",
              "Non-compliant",
              "Awaiting lab"
            ]
          }
        ],
        "chart": {
          "labelKey": "point",
          "valueKeys": [
            "result",
            "standard"
          ],
          "title": "Result against standard by sample point",
          "valueLabel": "Value"
        }
      }
    ],
    "biodiversity": [
      {
        "id": "bio",
        "title": "Species, habitat and clearance record",
        "hint": "Encounters, clearance and the action taken — including anything protected.",
        "columns": [
          {
            "key": "feature",
            "label": "Species / habitat",
            "type": "text"
          },
          {
            "key": "observation",
            "label": "Observation",
            "type": "text"
          },
          {
            "key": "area",
            "label": "Area affected (ha)",
            "type": "number",
            "chart": true
          },
          {
            "key": "action",
            "label": "Action taken",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "No further action",
              "Under monitoring",
              "Relocated",
              "Escalated to authority"
            ]
          }
        ],
        "chart": {
          "labelKey": "feature",
          "valueKeys": [
            "area"
          ],
          "title": "Area affected by feature",
          "valueLabel": "Hectares"
        }
      }
    ],
    "restoration": [
      {
        "id": "restoration-areas",
        "title": "Restoration progress by area",
        "hint": "Borrow areas, quarry and camps against the restoration programme.",
        "columns": [
          {
            "key": "area",
            "label": "Area",
            "type": "text"
          },
          {
            "key": "activity",
            "label": "Restoration activity",
            "type": "text"
          },
          {
            "key": "percent",
            "label": "Complete",
            "type": "number",
            "unit": "%",
            "chart": true
          },
          {
            "key": "target",
            "label": "Target date",
            "type": "date"
          },
          {
            "key": "remarks",
            "label": "Remarks",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "area",
          "valueKeys": [
            "percent"
          ],
          "title": "Restoration progress by area",
          "valueLabel": "% complete"
        }
      }
    ],
    "community-dev": [
      {
        "id": "engagements",
        "title": "Community meetings & CSR delivered",
        "hint": "Date, village, participants and what was agreed.",
        "columns": [
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "activity",
            "label": "Activity",
            "type": "text"
          },
          {
            "key": "village",
            "label": "Village / location",
            "type": "text"
          },
          {
            "key": "participants",
            "label": "Participants",
            "type": "number",
            "chart": true
          },
          {
            "key": "outcome",
            "label": "Outcome / commitment",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "activity",
          "valueKeys": [
            "participants"
          ],
          "title": "Participants by activity",
          "valueLabel": "People"
        }
      },
      {
        "id": "grievances",
        "title": "Community grievance register",
        "hint": "Every grievance, its status, and the date it closed. Open items carry forward.",
        "columns": [
          {
            "key": "ref",
            "label": "Ref",
            "type": "text"
          },
          {
            "key": "date",
            "label": "Date received",
            "type": "date"
          },
          {
            "key": "village",
            "label": "Village",
            "type": "text"
          },
          {
            "key": "issue",
            "label": "Issue",
            "type": "text"
          },
          {
            "key": "action",
            "label": "Action taken",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Open",
              "Under investigation",
              "Resolved",
              "Closed",
              "Referred"
            ]
          },
          {
            "key": "closed",
            "label": "Date closed",
            "type": "date"
          }
        ],
        "chart": {
          "labelKey": "status",
          "valueKeys": [
            "count"
          ],
          "title": "Grievances by status",
          "valueLabel": "Grievances",
          "count": true,
          "status": true
        }
      },
      {
        "id": "authorities",
        "title": "Local authority interaction",
        "hint": "Visits and meetings with district and sub-county officials.",
        "columns": [
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "authority",
            "label": "Authority / office",
            "type": "text"
          },
          {
            "key": "purpose",
            "label": "Purpose",
            "type": "text"
          },
          {
            "key": "outcome",
            "label": "Outcome",
            "type": "text"
          }
        ]
      }
    ],
    "cultural": [
      {
        "id": "heritage",
        "title": "Cultural heritage sites and chance finds",
        "hint": "Mapped sites, graves, and every chance find with the authority notified.",
        "columns": [
          {
            "key": "site",
            "label": "Site / find",
            "type": "text"
          },
          {
            "key": "type",
            "label": "Type",
            "type": "select",
            "options": [
              "Chance find",
              "Grave",
              "Archaeological site",
              "Sacred site",
              "Intangible heritage"
            ]
          },
          {
            "key": "coordinates",
            "label": "Coordinates",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Marked & protected",
              "Under assessment",
              "Relocated",
              "Exhumed",
              "Awaiting authority guidance"
            ]
          },
          {
            "key": "authority",
            "label": "Authority notified",
            "type": "text"
          },
          {
            "key": "action",
            "label": "Action taken",
            "type": "text"
          }
        ]
      }
    ],
    "stakeholder": [
      {
        "id": "engagement-log",
        "title": "Stakeholder engagement log",
        "hint": "Against the stakeholder engagement plan: who, what, and what you committed to.",
        "columns": [
          {
            "key": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "key": "stakeholder",
            "label": "Stakeholder",
            "type": "text"
          },
          {
            "key": "method",
            "label": "Method",
            "type": "select",
            "options": [
              "Meeting",
              "Site visit",
              "Radio announcement",
              "Notice board",
              "Written correspondence",
              "Focus group"
            ]
          },
          {
            "key": "topic",
            "label": "Topic",
            "type": "text"
          },
          {
            "key": "feedback",
            "label": "Feedback received",
            "type": "text"
          },
          {
            "key": "commitment",
            "label": "Commitment made",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Commitment status",
            "type": "select",
            "options": [
              "Open",
              "In progress",
              "Delivered"
            ]
          }
        ]
      }
    ],
    "influx": [
      {
        "id": "influx-indicators",
        "title": "Influx indicators",
        "hint": "What you monitor to detect in-migration pressure, with the baseline beside it.",
        "columns": [
          {
            "key": "indicator",
            "label": "Indicator",
            "type": "text"
          },
          {
            "key": "baseline",
            "label": "Baseline",
            "type": "number",
            "chart": true
          },
          {
            "key": "current",
            "label": "Current",
            "type": "number",
            "chart": true
          },
          {
            "key": "trend",
            "label": "Trend",
            "type": "select",
            "options": [
              "Stable",
              "Increasing",
              "Decreasing"
            ]
          },
          {
            "key": "action",
            "label": "Action / mitigation",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "indicator",
          "valueKeys": [
            "baseline",
            "current"
          ],
          "title": "Current against baseline",
          "valueLabel": "Value"
        }
      }
    ],
    "demob": [
      {
        "id": "demob-items",
        "title": "Demobilisation register",
        "hint": "Each camp, plant item and area, with its disposal or handover route.",
        "columns": [
          {
            "key": "item",
            "label": "Asset / area",
            "type": "text"
          },
          {
            "key": "plan",
            "label": "Plan",
            "type": "text"
          },
          {
            "key": "percent",
            "label": "Complete",
            "type": "number",
            "unit": "%",
            "chart": true
          },
          {
            "key": "handover",
            "label": "Handover to",
            "type": "text"
          },
          {
            "key": "status",
            "label": "Status",
            "type": "select",
            "options": [
              "Not started",
              "In progress",
              "Complete"
            ]
          }
        ],
        "chart": {
          "labelKey": "item",
          "valueKeys": [
            "percent"
          ],
          "title": "Demobilisation progress",
          "valueLabel": "% complete"
        }
      }
    ],
    "permits": [
      {
        "id": "permit-register",
        "title": "Statutory requirements & permit register",
        "hint": "The format's own columns: authority, priority, status, compliance, programme impact and remedy.",
        "columns": [
          {
            "key": "permit",
            "label": "Statutory requirement (permit, licence, approval)",
            "type": "text"
          },
          {
            "key": "authority",
            "label": "Issuing authority",
            "type": "text"
          },
          {
            "key": "priority",
            "label": "Priority",
            "type": "select",
            "options": [
              "Before construction",
              "During construction",
              "Before handover"
            ]
          },
          {
            "key": "status",
            "label": "Status as at month end",
            "type": "text"
          },
          {
            "key": "compliant",
            "label": "Compliant",
            "type": "select",
            "options": [
              "Yes",
              "No",
              "Partial",
              "Not applicable"
            ]
          },
          {
            "key": "impact",
            "label": "Potential impact on programme",
            "type": "text"
          },
          {
            "key": "remedy",
            "label": "Mitigation / remedy implemented",
            "type": "text"
          }
        ],
        "chart": {
          "labelKey": "compliant",
          "valueKeys": [
            "count"
          ],
          "title": "Permits by compliance status",
          "valueLabel": "Permits",
          "count": true,
          "status": true
        }
      }
    ],
    "appendices": [
      {
        "id": "appendix-list",
        "title": "Appendices attached",
        "hint": "Each appendix with its letter, title and whether it is attached this month.",
        "columns": [
          {
            "key": "letter",
            "label": "Appendix",
            "type": "text"
          },
          {
            "key": "title",
            "label": "Title",
            "type": "text"
          },
          {
            "key": "attached",
            "label": "Attached",
            "type": "select",
            "options": [
              "Yes",
              "No — not applicable this month"
            ]
          }
        ],
        "starterRows": [
          {
            "letter": "A",
            "title": "Workers' representative meeting minutes"
          },
          {
            "letter": "B",
            "title": "Community health awareness workshop"
          },
          {
            "letter": "C",
            "title": "Air, noise & water monitoring report"
          },
          {
            "letter": "D",
            "title": "Outbreak SOP implementation at site"
          },
          {
            "letter": "E",
            "title": "Workers' camp management"
          },
          {
            "letter": "F",
            "title": "Community consultative committee meeting"
          },
          {
            "letter": "G",
            "title": "Sub-contractors' monthly internal audit"
          },
          {
            "letter": "H",
            "title": "Non-compliances during internal audit"
          },
          {
            "letter": "I",
            "title": "Restoration programme map"
          }
        ]
      }
    ]
  },

  // ---- Plain-English section guidance ---------------------------------------
  // Shown in Guided mode: what a section is for, how to fill it, and example
  // wording. The example is guidance to read, never text the app inserts —
  // a compliance report must say what actually happened on the user's site.
  sectionGuide: {
  "tor-intro": {
    "what": "Sets up who wants the study and why it is needed.",
    "how": "Name the developer, the financier and the regulator, and say what triggered the ESIA requirement.",
    "example": "XYZ Ltd proposes a 40 MW solar plant at Kabaale. An ESIA is required under the National Environment Act before a certificate of approval can issue, and by the lender under its E&S policy."
  },
  "tor-objectives": {
    "what": "What the consultant is being paid to achieve.",
    "how": "Write each objective so a reviewer can tell whether it was met. Avoid 'assess impacts' — say which impacts, to what standard.",
    "example": "To characterise baseline air, noise, water and biodiversity conditions across two seasons; to assess impacts against national standards and IFC PS1–PS8; and to produce an ESMP costed to line-item level."
  },
  "tor-project": {
    "what": "The project as understood at scoping — it will change.",
    "how": "Give sizes and footprints even if provisional, and list which alternatives are still genuinely open.",
    "example": "Solar array 62 ha, 33/132 kV substation 1.4 ha, 9 km access road. Layout alternatives A and B remain open; the no-project alternative is to be assessed."
  },
  "tor-area": {
    "what": "Defines how far the study must look.",
    "how": "Direct area of influence is where works happen; indirect covers downstream, downwind and access routes. Put the boundary coordinates in the table so the area is unambiguous.",
    "example": "Direct area of influence is the 62 ha footprint plus a 500 m buffer. Indirect extends to the Wambabya river 4 km downstream and the Kabaale–Buseruka access road."
  },
  "tor-legal": {
    "what": "What law and which standards the study must apply.",
    "how": "List national instruments, lender standards and any conventions. Verda's jurisdiction register is the starting point.",
    "example": "National Environment Act 2019 and the ESA Regulations 2020; Water Act Cap 152; IFC Performance Standards 1–8; and the Equator Principles as applied by the lender."
  },
  "tor-scope": {
    "what": "The task list the consultant is contracted to deliver.",
    "how": "Number the tasks and give each one an output. A task without an output cannot be invoiced or checked.",
    "example": "Task 3: conduct two-season biodiversity surveys. Output: baseline biodiversity report with species lists, habitat mapping and a critical habitat screening."
  },
  "tor-method": {
    "what": "How the work will actually be done.",
    "how": "Name the method, the standard, the season and the number of sampling points. Seasonality is the most common gap — one dry-season survey is rarely enough.",
    "example": "Air quality: 24-hour PM2.5 and PM10 at four receptors, wet and dry season, to the national ambient standard. Noise: day and night LAeq at the same receptors."
  },
  "tor-stakeholder": {
    "what": "Who must be consulted and how it will be evidenced.",
    "how": "Name the groups, the method for each, and the stage. Include vulnerable groups explicitly — 'the community' is not a stakeholder list.",
    "example": "Two public meetings in Runyoro and English at Kabaale and Nyamasoga; focus groups with women and with youth; key informant interviews with the sub-county and the health centre."
  },
  "tor-deliverables": {
    "what": "What gets handed over and when.",
    "how": "Tie each deliverable to a week number and say how many copies and in what format the regulator requires.",
    "example": "Inception report week 3; baseline report week 12; draft ESIA week 20; final ESIA week 26 — ten hard copies and one electronic copy to the regulator."
  },
  "tor-team": {
    "what": "The expertise the assignment requires.",
    "how": "Most jurisdictions require registered or certified practitioners — state the registration, not just the discipline.",
    "example": "Team leader: registered environmental practitioner, 10 years. Plus an ecologist, a hydrologist, a social scientist and an air-quality specialist."
  },
  "tor-duration": {
    "what": "Time and money.",
    "how": "Tie payments to milestones, not to elapsed time. A schedule with no payment condition slips.",
    "example": "26 weeks from contract signature. Payments: 20% on inception, 30% on baseline, 30% on draft, 20% on regulator acceptance."
  },
  "tor-qa": {
    "what": "Who checks the work before it goes to the regulator.",
    "how": "Name the reviewer and the turnaround. A review step with no deadline becomes the critical path.",
    "example": "Developer review 10 working days; lender's independent consultant 15 working days; regulator statutory review per the ESA Regulations."
  },
  "background": {
    "what": "Describes the project and why it is proposed.",
    "how": "Give the components, capacity and footprint as they are now, not as at scoping. Note any change since the ToR.",
    "example": "The project comprises a 62 ha solar array, a 1.4 ha substation and a 9 km access road, constructed over 18 months and operating for 25 years."
  },
  "legal": {
    "what": "The law and standards the assessment is made against.",
    "how": "Set out each instrument and state the project's position against it plainly — a gap disclosed is manageable, a gap found by the regulator is not.",
    "example": "Fourteen instruments apply. Twelve are complied with, one complies with conditions (waste transporter licensing), and one gap remains on the water abstraction permit, which is applied for."
  },
  "baseline": {
    "what": "The condition of the environment before the project.",
    "how": "Sampling locations with coordinates, results against standards, and the sensitive receptors nearby. A baseline without coordinates cannot be re-measured later — which is the whole point of a baseline.",
    "example": "Baseline PM2.5 averaged 22 µg/m³ across four receptors, within the national standard. The nearest settlement is 340 m from the works and the Wambabya river 4 km downstream."
  },
  "scope": {
    "what": "What the assessment covers and what it leaves out.",
    "how": "Justify every exclusion. An aspect scoped out without reasoning is the first thing a reviewer challenges.",
    "example": "Marine ecology is scoped out — the project has no coastal or marine interface. Transboundary impacts are scoped out; the nearest border is 180 km away."
  },
  "impacts": {
    "what": "What the project will do, and how bad it is after mitigation.",
    "how": "Score before and after mitigation so the value of each measure is visible. Residual impacts are what the decision is actually made on.",
    "example": "Dust during construction scores Major before mitigation and Minor after, with suppression and sealed haul roads. Habitat loss remains Moderate residual across 62 ha."
  },
  "alternatives": {
    "what": "Whether a better option was available.",
    "how": "Compare on the same criteria, and include the no-project alternative. An alternatives chapter with one option is not an analysis.",
    "example": "Layout B was selected: it avoids the seasonal wetland entirely at a 4% cost increase. The no-project alternative forgoes 40 MW of generation."
  },
  "mitigation": {
    "what": "The ESMP — what will actually be done about the impacts.",
    "how": "Each measure needs an owner, a timing, a cost and an indicator. A measure with no owner does not happen.",
    "example": "Dust suppression: water bowsers twice daily on unsealed roads during construction, contractor responsible, verified by weekly boundary dust monitoring against the standard."
  },
  "engagement": {
    "what": "Who was consulted, what they said, and what changed as a result.",
    "how": "Record issues and your response to each. Consultation that changes nothing reads as a formality, and reviewers say so.",
    "example": "Six consultation events reached 412 people, 38% women. The main issues were access road dust and local employment; the layout was amended to move the haul route 200 m from Kabaale village."
  },
  "monitoring": {
    "what": "How compliance will be checked once the project is running.",
    "how": "Parameter, location with coordinates, frequency, limit and who does it. This table becomes the client's monthly reporting obligation.",
    "example": "Quarterly effluent sampling at the outfall against the national discharge standard, continuous noise at two receptors during construction, annual biodiversity monitoring."
  },
  "institutional": {
    "what": "Who implements the ESMP and what it costs.",
    "how": "Budget it properly. An ESMP without a budget is a statement of intent, and lenders treat it as one.",
    "example": "ESMP implementation is budgeted at USD 340,000 in year one and USD 85,000 annually, funded from the project operating budget, with a full-time E&S officer appointed before construction."
  },
  "conclusion": {
    "what": "Your recommendation to the regulator.",
    "how": "State the conditions you think should attach to the approval. Being specific here is what makes the report useful rather than descriptive.",
    "example": "The project is recommended for approval subject to eight conditions, including a pre-construction biodiversity survey, a grievance mechanism operating before mobilisation, and quarterly reporting."
  },

    "safety": {
      "what": "Shows whether people are getting hurt and what you did about it.",
      "how": "Log every incident and near-miss, even ones with no injury. Fill the training table from your attendance sheets. If nothing happened, leave the log empty — that reports zero, it doesn't look like you forgot.",
      "example": "Two near-misses were recorded and both investigated within 48 hours. PPE spot-checks found 3 non-compliances, each closed the same day. 42 workers attended the revised lockout/tagout briefing."
    },
    "security": {
      "what": "Security incidents, drills and the conduct of security personnel.",
      "how": "Use the format's own columns — management of the incident, outcome, lessons learnt, action required. Drills and VPSHR training belong in the second table.",
      "example": "One incident of vandalism to site sanitation was reported to police and remains under investigation. Patrol frequency was increased and an access-control briefing was delivered to five guards."
    },
    "environment": {
      "what": "Your monitoring results against the limits in your permit.",
      "how": "A result without its limit can't be assessed, so fill both. Use the status column honestly — 'Above limit' with an action beside it reads far better than a missing row.",
      "example": "Effluent BOD measured 28 mg/l against a 50 mg/l permit limit. Dust deposition at the northern boundary exceeded the limit once; water bowser frequency was doubled and the repeat reading was compliant."
    },
    "ghg": {
      "what": "Your energy and fuel use, converted to carbon.",
      "how": "Take quantities from invoices and fuel logs — not estimates. If you don't have an emission factor yet, leave CO₂e blank; the quantity alone is still useful and shows a baseline.",
      "example": "Grid electricity 25,656 kWh and 14,200 litres of diesel. Generator hours fell 18% after the grid connection at the main camp. No reduction target is set yet; a baseline year is being established."
    },
    "community": {
      "what": "What the people around your site said, and what you did about it.",
      "how": "Log every grievance, including ones you disagree with — unlogged complaints are the single most common audit finding. Record the closure date, not just the status.",
      "example": "Four grievances were received: three about dust on the access road and one about water scarcity. Three closed within the 14-day commitment; the water grievance was referred to the district and remains open."
    },
    "permitting": {
      "what": "Proof that you are legally allowed to operate.",
      "how": "List every permit the site depends on, with its certificate number and expiry. Anything expiring within 90 days belongs in your management comment with a named owner.",
      "example": "All seven permits are valid. The effluent discharge permit expires in 74 days; the renewal application was lodged on the 8th and acknowledgement received."
    },
    "ps1": {
      "what": "PS1 is the umbrella: can you identify your E&S risks and manage them?",
      "how": "List risks and the measure managing each one, with an owner. Reviewers check whether measures are actually effective, so use 'Partially effective' where that is the truth.",
      "example": "The ESMS was reviewed in month. Of 14 management measures, 11 are effective, 2 partially effective (dust suppression at the crusher, sub-contractor induction tracking) and 1 not yet implemented."
    },
    "ps2": {
      "what": "Working conditions for everyone on site, including people you don't employ directly.",
      "how": "Contracted and supply-chain workers must appear separately — that is the part most reports miss. Include the worker grievance mechanism numbers.",
      "example": "498 workers: 134 direct, 364 contracted. Nine worker grievances received, seven closed. Two sub-contractors were found paying below the agreed rate and have rectified with back-pay verified."
    },
    "ps3": {
      "what": "Resource efficiency and pollution prevention — what you consume and what you release.",
      "how": "Put the prior period beside this one so the trend is visible. That comparison is what makes the section useful rather than a list.",
      "example": "Water abstraction fell from 1,820 to 1,353 m³ after the access road was sealed. Hazardous waste rose to 4.2 m³ following a workshop clean-out; all transferred to a licensed handler with transfer notes retained."
    },
    "ps4": {
      "what": "Risks your operations create for people outside the fence.",
      "how": "Think traffic, dust, noise, blasting, water, and the conduct of your security personnel. Record drills — emergency preparedness is half of PS4.",
      "example": "Two community drills were held with the sub-county. No community injuries occurred. Security personnel completed VPSHR refresher training; no conduct complaints were received."
    },
    "ps5": {
      "what": "Land taken for the project, and whether people are economically whole again.",
      "how": "Track it per household. Outstanding compensation and open disputes are what a lender looks for first, so do not summarise them away.",
      "example": "Of 46 affected households, 44 are paid in full, 1 part-paid pending a boundary survey and 1 disputed and under mediation. Livelihood restoration training reached 38 households."
    },
    "ps6": {
      "what": "Habitats and species, and the ecosystem services communities rely on.",
      "how": "Record encounters with protected species and every hectare cleared. If a survey is outstanding, say so rather than leaving the section empty.",
      "example": "No protected species were encountered. 2.4 ha was cleared within the approved footprint. 1,200 indigenous seedlings were planted in the riparian buffer; survival monitoring begins next quarter."
    },
    "ps7": {
      "what": "Only applies where Indigenous Peoples are present — consultation, and consent where required.",
      "how": "If PS7 does not apply to your project, say that explicitly in the management comment rather than leaving it blank.",
      "example": "PS7 is not triggered for this project; no Indigenous Peoples as defined by PS7 are present in the area of influence. This was confirmed in the ESIA and re-verified with the district."
    },
    "ps8": {
      "what": "Archaeology, graves, sacred sites, and what you do when something is found.",
      "how": "The chance-finds procedure is the heart of this section. Record every find, the authority notified, and the date work resumed.",
      "example": "One chance find (iron-smelting debris) was reported. Work stopped within the 20 m exclusion zone, the Department of Museums was notified in writing, and the site was marked pending guidance."
    },
    "intro": {
      "what": "Sets out who receives this report and on what basis.",
      "how": "This is boilerplate you write once and reuse each month. Note the convention: where monitoring is less frequent than monthly, report 'no change' rather than leaving the section blank.",
      "example": "This ESSR is submitted monthly to the lender's environmental monitoring unit, the Independent E&S Consultant, the Employer and the Engineer, and presents results of monitoring described in the Monitoring Plan and the ESMP portfolio."
    },
    "activities": {
      "what": "What construction actually did this month — the context for every other section.",
      "how": "Take percentages from the Engineer's progress figures so your report and theirs agree. Photos of each active front belong here.",
      "example": "Runway grooving progressed to 100%. Cargo building reached 96.4% and the ARFF building 92.6%. Cabling chambers and ducts remain the critical path at 33%."
    },
    "labour-stats": {
      "what": "How many people are on site, and who they are.",
      "how": "Split direct from sub-contractor labour, and local from non-local — local employment is usually a contract commitment someone is checking. The sexes must sum to the total.",
      "example": "Direct employment stands at 134 (117 male, 18 female), of whom 21 are from the host district and 5 are expatriates. Sub-contractors account for a further 89 workers."
    },
    "ehs-org": {
      "what": "Who is responsible for EHS, and whether those posts are actually filled.",
      "how": "A vacant EHS post is worth stating plainly with the recruitment date — hiding it reads worse than reporting it.",
      "example": "The EHS establishment is 9 posts, 8 filled. The Environment Officer post became vacant on the 14th; recruitment is in progress with a start date expected next month."
    },
    "hs-stats": {
      "what": "The numbers that show whether your safety system works.",
      "how": "Fill the month column from your own registers and keep the accumulated column running from the previous report. Zero is a valid and good answer — enter 0, don't leave it blank.",
      "example": "No lost-time injuries were recorded; 186,400 man-hours were worked. Eight toolbox talks and 76 visitor inductions were delivered. Two workers were observed without correct PPE and were re-briefed."
    },
    "clinic": {
      "what": "What the site clinic treated, and anything with public-health significance.",
      "how": "Record conditions, not names — this report goes to external parties. Flag notifiable conditions and outbreak response in the narrative.",
      "example": "The clinic recorded 118 consultations, of which 31 were malaria. Four cases were referred to the health centre. Mosquito net distribution continued and the clinic licence was renewed for one year."
    },
    "labour-mgmt": {
      "what": "Recruitment, contracts, and whether workers can raise problems safely.",
      "how": "The workers' grievance register and representative meetings are the evidence that a mechanism exists. Minutes go in the appendices.",
      "example": "Twelve workers were recruited and four separated. Workers' representative meeting no. 78 was held with 14 attendees. Three grievances were raised on transport timing; two were closed in month."
    },
    "accommodation": {
      "what": "Living conditions in camps — inspected against the accommodation standard.",
      "how": "Inspect every camp and record findings honestly with closure status. Photographs of sanitation and kitchen areas are expected.",
      "example": "All three camps were inspected. Camp B raised four minor findings on ablution maintenance, three closed in month. Occupancy across camps is 412 against a capacity of 480."
    },
    "traffic": {
      "what": "Vehicle and road risk, on your roads and on community ones.",
      "how": "Record the hazard and the control, not just the incident count. Community road safety is usually where the real risk sits.",
      "example": "No traffic incidents occurred over 84,300 km driven. 38 drivers completed defensive driving refresher training. Two additional speed humps were installed at the quarry junction after community feedback."
    },
    "water-energy": {
      "what": "What you abstract and what you burn — with permit compliance.",
      "how": "Month and cumulative for each source, and the permit reference with its daily limit. Exceeding a permitted abstraction rate is a serious finding.",
      "example": "1,353 m³ was abstracted this month, all from borehole 2, within the 200 m³/day permitted limit. Energy consumption was 25,656 kWh with an average emission rate of 1,034 kg CO₂/day."
    },
    "community-hs": {
      "what": "Noise, vibration and dust as experienced by people outside the site.",
      "how": "Every reading needs its limit beside it. Measure at the receptor — a reading at your fence line does not answer the question.",
      "example": "Twelve noise readings were taken at four receptors; one night-time reading at Nyamasoga exceeded the limit and night haulage was rescheduled. PM2.5 averaged 31 µg/m³."
    },
    "waste": {
      "what": "Everything leaving site as waste, and where it legally went.",
      "how": "Quantity by stream, the licensed handler, and the waste transfer note reference. A quantity without a transfer note is an unverifiable claim.",
      "example": "1.44 m³ of biodegradable waste and 0.014 m³ of medical waste were generated. All hazardous waste was transferred to a licensed handler under four transfer notes, retained on file."
    },
    "wastewater": {
      "what": "Effluent and storm water quality, plus drainage and erosion control.",
      "how": "Results against the discharge standard, per sample point. Record drainage maintenance — erosion is the impact reviewers see on site.",
      "example": "All six effluent samples were compliant with national discharge standards. 420 m of drainage was desilted ahead of the rains and two silt traps were installed at the borrow area outfall."
    },
    "biodiversity": {
      "what": "Habitats, species and clearance — and what you did when you found something.",
      "how": "Record protected-species encounters and every hectare cleared against the approved footprint. Clearing outside the footprint is a major finding.",
      "example": "No protected species were encountered. Clearance remained within the approved footprint. Invasive Lantana camara was controlled over 0.8 ha along the access road."
    },
    "restoration": {
      "what": "Putting back what construction disturbed.",
      "how": "Progress per area against the restoration programme. Include borrow areas, quarry and camps, and photograph each.",
      "example": "Borrow area 7 reached 85% restoration with topsoil re-instated and grass established. Quarry benching is complete; planting is scheduled for the next rains."
    },
    "community-dev": {
      "what": "What you gave back, and whether people think it helped.",
      "how": "Separate engagement from CSR delivery, and keep the grievance register current. Commitments made in meetings must appear somewhere you can track them.",
      "example": "Two community consultative committee meetings were held with 64 participants. A borehole was handed over at Kijumba. Four grievances were received and three closed within the commitment period."
    },
    "cultural": {
      "what": "Graves, archaeology and sacred sites — and the chance-finds procedure.",
      "how": "No finds is a perfectly good answer, but say so explicitly and confirm the procedure is still briefed to earthworks crews.",
      "example": "No chance finds were identified. A follow-up visit confirmed the previously reported iron-smelting site remains marked and undisturbed. The earthworks team was re-briefed on the procedure."
    },
    "stakeholder": {
      "what": "Who you talked to, what they said, and what you promised.",
      "how": "Record the commitment and its status — an engagement log without commitments tracked is where trust is lost.",
      "example": "Eleven engagements were held, including the district joint stakeholder meeting. Two commitments were made on access road dust control, both delivered in month. Radio announcements ran weekly."
    },
    "influx": {
      "what": "Whether the project is pulling people into the area faster than services can cope.",
      "how": "Pick a few indicators you can actually measure and keep the baseline beside them. Local recruitment and procurement are the levers you control.",
      "example": "Local recruitment stands at 78% of unskilled posts. Trading centre stall counts at Nyamasoga rose from 34 at baseline to 61, and sanitation pressure was raised with the sub-county."
    },
    "demob": {
      "what": "Handing the site back without leaving problems behind.",
      "how": "Only relevant as the contract closes. Record what happens to each camp, plant item and borrow area, and who receives it.",
      "example": "Demobilisation planning is 40% complete. Camp C ablutions will be handed to the sub-county; plant disposal will follow the approved inventory. No demobilisation activity occurred this month."
    },
    "permits": {
      "what": "The permit register — the section reviewers turn to first.",
      "how": "Use the format's columns: authority, status, compliance, programme impact, remedy. Anything non-compliant needs a remedy with a date, not an explanation.",
      "example": "Of 14 statutory requirements, 12 are acquired and valid, 1 renewal is applied for and 1 is pending an Employer action. The EIA certificate held in the Employer's name expired and the Employer has been formally alerted."
    },
    "appendices": {
      "what": "The evidence behind the report.",
      "how": "Attach what you reference. An appendix listed but not attached is worse than one marked 'not applicable this month'.",
      "example": "Appendices A–C and G–I are attached. Appendix D is not applicable this month as no outbreak SOP activity was required."
    }
  },

  /* ===================== REFERENCE LIBRARIES =====================
     Pick-lists a practitioner would otherwise retype into every new
     register. They are starting positions, not an exhaustive statement
     of what applies to any particular site. */

  // Hazards by energy/exposure category, each with the controls normally
  // expected. Selecting one in the Risk Register pre-fills its controls.
  hazardLibrary: [
    {
      "category": "Mechanical",
      "hazard": "Unguarded rotating shaft, drive or coupling",
      "controls": "Fixed guarding; interlocked access; LOTO before maintenance; pre-use guard inspection",
      "sectors": "all"
    },
    {
      "category": "Mechanical",
      "hazard": "In-running nip point on conveyor or roller",
      "controls": "Nip guards; pull-cord emergency stop tested; no cleaning while running",
      "sectors": "all"
    },
    {
      "category": "Mechanical",
      "hazard": "Entanglement in auger, mixer or agitator",
      "controls": "Interlocked lid; LOTO; permit for internal entry; no loose clothing policy",
      "sectors": "all"
    },
    {
      "category": "Mechanical",
      "hazard": "Crush injury from press, baler or compactor",
      "controls": "Two-hand control; light curtain; trapped-key interlock; stored-energy release",
      "sectors": "all"
    },
    {
      "category": "Mechanical",
      "hazard": "Cut or amputation from blade, saw or shear",
      "controls": "Blade guard; push stick; anti-kickback; blade change procedure under LOTO",
      "sectors": "all"
    },
    {
      "category": "Mechanical",
      "hazard": "Ejected material or workpiece",
      "controls": "Chip screen; face shield; correct clamping; exclusion zone",
      "sectors": "all"
    },
    {
      "category": "Mechanical",
      "hazard": "Stored energy release on maintenance (spring, hydraulic, pneumatic)",
      "controls": "Energy isolation procedure; bleed and verify zero energy; try-out step",
      "sectors": "all"
    },
    {
      "category": "Mechanical",
      "hazard": "Hand tool injury — wrong tool, defective tool",
      "controls": "Tool register and inspection; colour-coded quarterly checks; task-based tool selection",
      "sectors": "all"
    },
    {
      "category": "Electrical",
      "hazard": "Contact with live low-voltage conductor",
      "controls": "Isolation and lock-off; test before touch; competent person only; RCD protection",
      "sectors": "all"
    },
    {
      "category": "Electrical",
      "hazard": "Arc flash during switching or racking",
      "controls": "Arc flash study; PPE matched to incident energy; remote racking; approach boundaries",
      "sectors": "all"
    },
    {
      "category": "Electrical",
      "hazard": "Contact with overhead power line by plant or tipper",
      "controls": "Route survey; goal posts and bunting; height limiter; spotter; permit to work",
      "sectors": "all"
    },
    {
      "category": "Electrical",
      "hazard": "Buried cable strike during excavation",
      "controls": "Service drawings; CAT and genny scan; hand-dig trial holes; permit to dig",
      "sectors": "all"
    },
    {
      "category": "Electrical",
      "hazard": "Defective portable appliance or damaged flex",
      "controls": "Portable appliance testing register; pre-use visual check; remove from service tagging",
      "sectors": "all"
    },
    {
      "category": "Electrical",
      "hazard": "Static discharge igniting flammable atmosphere",
      "controls": "Bonding and earthing; conductive footwear; humidity control; flow-rate limits",
      "sectors": "all"
    },
    {
      "category": "Electrical",
      "hazard": "Backfeed from generator onto isolated network",
      "controls": "Changeover interlock; permit to work; proving dead at point of work",
      "sectors": "all"
    },
    {
      "category": "Electrical",
      "hazard": "Battery room hydrogen accumulation",
      "controls": "Forced ventilation; gas detection; no ignition sources; acid handling PPE",
      "sectors": "all"
    },
    {
      "category": "Gravity / work at height",
      "hazard": "Fall from unprotected edge, roof or opening",
      "controls": "Edge protection; covers secured and labelled; permit to work at height; harness as last resort",
      "sectors": "all"
    },
    {
      "category": "Gravity / work at height",
      "hazard": "Fall from ladder",
      "controls": "Ladder register and inspection; three points of contact; alternative access preferred",
      "sectors": "all"
    },
    {
      "category": "Gravity / work at height",
      "hazard": "Scaffold collapse or incomplete scaffold use",
      "controls": "Erection by competent person; scafftag system; weekly inspection; no unauthorised alteration",
      "sectors": "all"
    },
    {
      "category": "Gravity / work at height",
      "hazard": "Fall through fragile roof or skylight",
      "controls": "Fragile surface survey; crawling boards; netting below; signage",
      "sectors": "all"
    },
    {
      "category": "Gravity / work at height",
      "hazard": "Falling object striking person below",
      "controls": "Toe boards and brick guards; exclusion zone below; tool tethering; hard hat",
      "sectors": "all"
    },
    {
      "category": "Gravity / work at height",
      "hazard": "Failure of harness, lanyard or anchor point",
      "controls": "Certified anchor points; harness pre-use and 6-monthly inspection; rescue plan before access",
      "sectors": "all"
    },
    {
      "category": "Gravity / work at height",
      "hazard": "No rescue plan for a suspended worker",
      "controls": "Written rescue plan; trauma straps; rescue equipment on site; drilled team",
      "sectors": "all"
    },
    {
      "category": "Gravity / work at height",
      "hazard": "Fall into open excavation or pit",
      "controls": "Barriers and signage; covers; lighting; backfill promptly",
      "sectors": "all"
    },
    {
      "category": "Vehicles & mobile plant",
      "hazard": "Pedestrian struck by reversing vehicle",
      "controls": "Traffic management plan; one-way systems; banksman; reversing alarms and cameras",
      "sectors": "all"
    },
    {
      "category": "Vehicles & mobile plant",
      "hazard": "Forklift overturn or load fall",
      "controls": "Operator certification; load chart adherence; speed limit; seatbelt; rack inspection",
      "sectors": "all"
    },
    {
      "category": "Vehicles & mobile plant",
      "hazard": "Vehicle rollover on haul road or incline",
      "controls": "Haul road design standard; berms; speed limits; ROPS and seatbelt; operator training",
      "sectors": "all"
    },
    {
      "category": "Vehicles & mobile plant",
      "hazard": "Loss of control due to brake or steering failure",
      "controls": "Planned preventive maintenance; daily pre-use inspection; defect reporting and stand-down",
      "sectors": "all"
    },
    {
      "category": "Vehicles & mobile plant",
      "hazard": "Road traffic collision on public roads",
      "controls": "Journey management; fatigue policy; defensive driving; telematics review",
      "sectors": "all"
    },
    {
      "category": "Vehicles & mobile plant",
      "hazard": "Driver fatigue on long haul",
      "controls": "Hours-of-service limits; rest schedule; journey planning; fatigue reporting without penalty",
      "sectors": "all"
    },
    {
      "category": "Vehicles & mobile plant",
      "hazard": "Unsecured load shifting or falling",
      "controls": "Load securing standard; pre-departure check; axle-load compliance",
      "sectors": "all"
    },
    {
      "category": "Vehicles & mobile plant",
      "hazard": "Collision between plant and plant in a congested area",
      "controls": "Segregation; proximity detection; radio protocol; site speed limit",
      "sectors": "all"
    },
    {
      "category": "Chemical",
      "hazard": "Inhalation of solvent, fume or vapour",
      "controls": "Substitution; local exhaust ventilation with statutory testing; RPE with face-fit; exposure monitoring",
      "sectors": "all"
    },
    {
      "category": "Chemical",
      "hazard": "Skin contact causing burn or dermatitis",
      "controls": "Glove selection by breakthrough time; skin checks; barrier and after-work creams",
      "sectors": "all"
    },
    {
      "category": "Chemical",
      "hazard": "Splash to eyes during decanting or sampling",
      "controls": "Closed transfer; face shield and goggles; emergency eyewash within 10 seconds' reach",
      "sectors": "all"
    },
    {
      "category": "Chemical",
      "hazard": "Incompatible chemical storage causing reaction",
      "controls": "Segregation matrix; bunded separate stores; SDS-driven storage plan",
      "sectors": "all"
    },
    {
      "category": "Chemical",
      "hazard": "Acid or caustic burn during maintenance",
      "controls": "Flush and neutralise before breaking containment; chemical suit; standby person",
      "sectors": "all"
    },
    {
      "category": "Chemical",
      "hazard": "Cyanide exposure in gold processing",
      "controls": "International Cyanide Management Code conformance; antidote kit and trained responders; area gas monitoring",
      "sectors": "all"
    },
    {
      "category": "Chemical",
      "hazard": "Mercury exposure in artisanal gold processing",
      "controls": "Retorts and closed systems; substitution; ventilation; no amalgam burning in living areas; health screening",
      "sectors": "all"
    },
    {
      "category": "Chemical",
      "hazard": "Asbestos disturbance in older buildings",
      "controls": "Asbestos survey and register; licensed removal; no drilling before check; air clearance",
      "sectors": "all"
    },
    {
      "category": "Chemical",
      "hazard": "Lead, cadmium or arsenic exposure in smelting",
      "controls": "Enclosure and extraction; biological monitoring; no eating in work areas; laundering of workwear",
      "sectors": "all"
    },
    {
      "category": "Chemical",
      "hazard": "Pesticide exposure during mixing and spraying",
      "controls": "Registered products only; closed transfer; spray PPE; re-entry intervals; cholinesterase monitoring",
      "sectors": "all"
    },
    {
      "category": "Chemical",
      "hazard": "Fuel or oil spill contaminating soil or water",
      "controls": "Bunded storage to 110%; drip trays; spill kits and trained responders; interceptor maintenance",
      "sectors": "all"
    },
    {
      "category": "Fire & explosion",
      "hazard": "Hot work igniting nearby combustibles",
      "controls": "Hot work permit; 10 m clearance or screens; fire watch during and after; extinguisher at hand",
      "sectors": "all"
    },
    {
      "category": "Fire & explosion",
      "hazard": "Flammable liquid vapour ignition",
      "controls": "Hazardous area classification; ATEX-rated equipment; bonding and earthing; no ignition sources",
      "sectors": "all"
    },
    {
      "category": "Fire & explosion",
      "hazard": "Combustible dust explosion (wood, grain, sugar, metal)",
      "controls": "Dust control and housekeeping; explosion relief; ignition source control; ducting design",
      "sectors": "all"
    },
    {
      "category": "Fire & explosion",
      "hazard": "LPG cylinder failure or leak",
      "controls": "Outdoor ventilated storage; upright securing; leak testing; flashback arrestors",
      "sectors": "all"
    },
    {
      "category": "Fire & explosion",
      "hazard": "Blocked or locked fire exit",
      "controls": "Daily exit check; anti-panic hardware; no storage in escape routes",
      "sectors": "all"
    },
    {
      "category": "Fire & explosion",
      "hazard": "Electrical fire from overloaded circuit",
      "controls": "Load assessment; thermographic survey; no daisy-chained adaptors",
      "sectors": "all"
    },
    {
      "category": "Fire & explosion",
      "hazard": "Bush or grass fire reaching the site",
      "controls": "Firebreaks maintained; vegetation management; water tender availability; community liaison",
      "sectors": "all"
    },
    {
      "category": "Fire & explosion",
      "hazard": "Explosives mishandling or unauthorised access",
      "controls": "Licensed blaster; magazine licence and security; issue and return reconciliation; misfire procedure",
      "sectors": "all"
    },
    {
      "category": "Pressure & thermal",
      "hazard": "Pressure vessel or boiler failure",
      "controls": "Statutory examination; pressure relief testing; competent operator; water treatment regime",
      "sectors": "all"
    },
    {
      "category": "Pressure & thermal",
      "hazard": "Steam release or burn from line breaking",
      "controls": "Isolation and depressurisation; drain and vent; permit; thermal PPE",
      "sectors": "all"
    },
    {
      "category": "Pressure & thermal",
      "hazard": "Compressed air injection injury",
      "controls": "No air-blast cleaning of clothing; pressure-reducing nozzles; hose whip checks",
      "sectors": "all"
    },
    {
      "category": "Pressure & thermal",
      "hazard": "Molten metal splash",
      "controls": "Dry tools and moulds; no water near launders; aluminised PPE; exclusion zones",
      "sectors": "all"
    },
    {
      "category": "Pressure & thermal",
      "hazard": "Contact with hot surface or process line",
      "controls": "Insulation and guarding; warning signage; thermal gloves",
      "sectors": "all"
    },
    {
      "category": "Pressure & thermal",
      "hazard": "Cryogenic burn from liquid nitrogen or CO₂",
      "controls": "Face shield and cryo gloves; oxygen depletion monitoring; ventilation",
      "sectors": "all"
    },
    {
      "category": "Confined space & atmosphere",
      "hazard": "Oxygen deficiency in a tank, silo or vessel",
      "controls": "Confined space permit; gas testing before and during; forced ventilation; standby person",
      "sectors": "all"
    },
    {
      "category": "Confined space & atmosphere",
      "hazard": "Toxic gas accumulation (H₂S, CO, methane)",
      "controls": "Continuous personal monitoring; escape sets; ventilation; no lone entry",
      "sectors": "all"
    },
    {
      "category": "Confined space & atmosphere",
      "hazard": "Engulfment in grain, sand or slurry",
      "controls": "No walk-down on stored product; lifeline and harness; bottom-emptying stopped and isolated",
      "sectors": "all"
    },
    {
      "category": "Confined space & atmosphere",
      "hazard": "Inability to rescue an unconscious entrant",
      "controls": "Rescue plan and equipment at entry; tripod and winch; trained rescue team on standby",
      "sectors": "all"
    },
    {
      "category": "Confined space & atmosphere",
      "hazard": "Hot work inside a confined space",
      "controls": "Combined permits; continuous gas monitoring; fume extraction; fire watch outside",
      "sectors": "all"
    },
    {
      "category": "Noise & vibration",
      "hazard": "Noise-induced hearing loss",
      "controls": "Noise survey and mapping; engineering control first; hearing protection zones; audiometry",
      "sectors": "all"
    },
    {
      "category": "Noise & vibration",
      "hazard": "Hand-arm vibration syndrome",
      "controls": "Tool selection by vibration magnitude; exposure time limits; health surveillance; anti-vibration gloves",
      "sectors": "all"
    },
    {
      "category": "Noise & vibration",
      "hazard": "Whole-body vibration from mobile plant",
      "controls": "Seat maintenance; haul road condition; job rotation; exposure assessment",
      "sectors": "all"
    },
    {
      "category": "Noise & vibration",
      "hazard": "Blast vibration damaging community structures",
      "controls": "Blast design and delay timing; monitoring at nearest structure; pre-blast condition surveys",
      "sectors": "all"
    },
    {
      "category": "Radiation",
      "hazard": "Ionising radiation from density or level gauges",
      "controls": "Source register; licence; shielding and interlocks; dosimetry; leak testing",
      "sectors": "all"
    },
    {
      "category": "Radiation",
      "hazard": "Industrial radiography exposure to bystanders",
      "controls": "Cordoned area and warning; competent radiographer; dose-rate survey; out-of-hours scheduling",
      "sectors": "all"
    },
    {
      "category": "Radiation",
      "hazard": "Naturally occurring radioactive material in scale or ore",
      "controls": "NORM assessment; controlled descaling; waste route; dose monitoring",
      "sectors": "all"
    },
    {
      "category": "Radiation",
      "hazard": "Ultraviolet exposure from welding arc",
      "controls": "Welding screens; auto-darkening helmet; skin coverage; bystander protection",
      "sectors": "all"
    },
    {
      "category": "Radiation",
      "hazard": "Solar UV exposure for outdoor workers",
      "controls": "Shade provision; scheduling; long sleeves and brim; sunscreen",
      "sectors": "all"
    },
    {
      "category": "Biological",
      "hazard": "Needlestick or sharps injury",
      "controls": "Sharps containers at point of use; safety-engineered devices; PEP available 24/7; no recapping",
      "sectors": "all"
    },
    {
      "category": "Biological",
      "hazard": "Exposure to sewage or contaminated water",
      "controls": "Vaccination; hand hygiene; waterproof dressings on cuts; washing facilities",
      "sectors": "all"
    },
    {
      "category": "Biological",
      "hazard": "Airborne infection in a healthcare or crowded setting",
      "controls": "Ventilation; respiratory protection with fit-testing; isolation procedure; screening",
      "sectors": "all"
    },
    {
      "category": "Biological",
      "hazard": "Legionella in cooling towers or water systems",
      "controls": "Water safety plan; temperature and biocide regime; sampling; tower cleaning",
      "sectors": "all"
    },
    {
      "category": "Biological",
      "hazard": "Zoonotic disease from livestock or wildlife contact",
      "controls": "Vaccination and prophylaxis; PPE; hand hygiene; carcass handling procedure",
      "sectors": "all"
    },
    {
      "category": "Biological",
      "hazard": "Snake, scorpion or insect bite on remote sites",
      "controls": "Site clearance; boots and gaiters; antivenom access plan; first aid training; medevac route",
      "sectors": "all"
    },
    {
      "category": "Biological",
      "hazard": "Malaria in endemic areas",
      "controls": "Vector control; treated nets; prophylaxis policy; rapid testing and treatment at site clinic",
      "sectors": "all"
    },
    {
      "category": "Ergonomic & manual handling",
      "hazard": "Manual handling injury from heavy or awkward loads",
      "controls": "Mechanical aids; team lift limits; load design; manual handling training",
      "sectors": "all"
    },
    {
      "category": "Ergonomic & manual handling",
      "hazard": "Repetitive strain from production-line tasks",
      "controls": "Job rotation; workstation redesign; rest breaks; early symptom reporting",
      "sectors": "all"
    },
    {
      "category": "Ergonomic & manual handling",
      "hazard": "Poor workstation posture for display screen users",
      "controls": "DSE assessment; adjustable chair and screen height; breaks",
      "sectors": "all"
    },
    {
      "category": "Ergonomic & manual handling",
      "hazard": "Patient handling injury in healthcare",
      "controls": "Hoists and slide sheets; handling assessment per patient; training and supervision",
      "sectors": "all"
    },
    {
      "category": "Ergonomic & manual handling",
      "hazard": "Prolonged awkward posture in confined maintenance work",
      "controls": "Task planning; job rotation; kneeling pads and supports; time limits",
      "sectors": "all"
    },
    {
      "category": "Psychosocial",
      "hazard": "Work-related stress and excessive workload",
      "controls": "Workload monitoring; realistic scheduling; manager training; access to support",
      "sectors": "all"
    },
    {
      "category": "Psychosocial",
      "hazard": "Fatigue from shift pattern or overtime",
      "controls": "Shift design; maximum hours; rest facilities; fatigue reporting without penalty",
      "sectors": "all"
    },
    {
      "category": "Psychosocial",
      "hazard": "Violence or aggression from the public or patients",
      "controls": "Risk assessment; de-escalation training; alarm systems; post-incident support",
      "sectors": "all"
    },
    {
      "category": "Psychosocial",
      "hazard": "Harassment, bullying or discrimination",
      "controls": "Policy and reporting channel; investigation procedure; no retaliation; leadership accountability",
      "sectors": "all"
    },
    {
      "category": "Psychosocial",
      "hazard": "Sexual harassment and gender-based violence",
      "controls": "Prevention policy and training; confidential reporting; survivor-centred response; supplier flow-down",
      "sectors": "all"
    },
    {
      "category": "Psychosocial",
      "hazard": "Isolation of lone or remote workers",
      "controls": "Check-in protocol; satellite communication; escalation if contact missed; buddy system",
      "sectors": "all"
    },
    {
      "category": "Geotechnical & ground",
      "hazard": "Excavation or trench collapse",
      "controls": "Support system designed by competent person; inspection before each shift; spoil setback; safe access",
      "sectors": "all"
    },
    {
      "category": "Geotechnical & ground",
      "hazard": "Pit slope or highwall failure",
      "controls": "Geotechnical review; slope monitoring with trigger action response plan; standoff distances",
      "sectors": "all"
    },
    {
      "category": "Geotechnical & ground",
      "hazard": "Underground ground fall or rockburst",
      "controls": "Ground support standard; scaling procedure; seismic monitoring; exclusion after blasting",
      "sectors": "all"
    },
    {
      "category": "Geotechnical & ground",
      "hazard": "Tailings storage facility breach",
      "controls": "Engineer of Record; dam safety review; instrumentation and trigger levels; EPRP with downstream communities",
      "sectors": "all"
    },
    {
      "category": "Geotechnical & ground",
      "hazard": "Waste rock dump instability",
      "controls": "Dump design and lift heights; tipping control; monitoring; no tipping in wet conditions",
      "sectors": "all"
    },
    {
      "category": "Geotechnical & ground",
      "hazard": "Inrush of water or slurry underground",
      "controls": "Hydrogeological model; probe drilling ahead; barriers and pumping capacity; escape routes",
      "sectors": "all"
    },
    {
      "category": "Geotechnical & ground",
      "hazard": "Subsidence affecting surface structures",
      "controls": "Subsidence monitoring; exclusion zones; community notification; structure surveys",
      "sectors": "all"
    },
    {
      "category": "Geotechnical & ground",
      "hazard": "Abandoned shaft or working collapse",
      "controls": "Legacy workings survey; capping and fencing; access control; community awareness",
      "sectors": "all"
    },
    {
      "category": "Environmental",
      "hazard": "Uncontrolled effluent discharge to a watercourse",
      "controls": "Treatment to permit limits; flow and quality monitoring; interlocked shutdown; incident reporting",
      "sectors": "all"
    },
    {
      "category": "Environmental",
      "hazard": "Dust nuisance to neighbouring communities",
      "controls": "Water suppression; sealed haul roads; enclosure of transfer points; boundary monitoring",
      "sectors": "all"
    },
    {
      "category": "Environmental",
      "hazard": "Acid rock drainage from waste rock or tailings",
      "controls": "Geochemical characterisation; encapsulation; water treatment; long-term monitoring",
      "sectors": "all"
    },
    {
      "category": "Environmental",
      "hazard": "Hydrocarbon spill to ground or water",
      "controls": "Bunding; drip trays; spill kits; interceptors; trained spill responders",
      "sectors": "all"
    },
    {
      "category": "Environmental",
      "hazard": "Illegal or unlicensed waste disposal by a contractor",
      "controls": "Handler licence verification; waste transfer notes; site audit of the disposal route",
      "sectors": "all"
    },
    {
      "category": "Environmental",
      "hazard": "Loss of protected habitat or species during clearance",
      "controls": "Pre-clearance survey; exclusion zones; supervised clearance; species relocation protocol",
      "sectors": "all"
    },
    {
      "category": "Environmental",
      "hazard": "Invasive species spread by vehicles and equipment",
      "controls": "Wash-down at entry and exit; monitoring; control programme",
      "sectors": "all"
    },
    {
      "category": "Environmental",
      "hazard": "Over-abstraction depleting a community water source",
      "controls": "Permit limits and metering; catchment monitoring; alternative supply where impact is proven",
      "sectors": "all"
    },
    {
      "category": "Environmental",
      "hazard": "Greenhouse gas emissions above the permitted or committed level",
      "controls": "Metering by source; reduction plan; efficiency projects; verified reporting",
      "sectors": "all"
    },
    {
      "category": "Community & security",
      "hazard": "Community grievance escalating to blockade or unrest",
      "controls": "Functioning grievance mechanism; engagement plan; visible closure of commitments",
      "sectors": "all"
    },
    {
      "category": "Community & security",
      "hazard": "Excessive force by security personnel",
      "controls": "Voluntary Principles training; rules on use of force; vetting; incident reporting and investigation",
      "sectors": "all"
    },
    {
      "category": "Community & security",
      "hazard": "Influx of job seekers overwhelming local services",
      "controls": "Influx management plan; local recruitment through community structures; service impact monitoring",
      "sectors": "all"
    },
    {
      "category": "Community & security",
      "hazard": "Land acquisition leaving households worse off",
      "controls": "PS5-aligned compensation; livelihood restoration; independent monitoring; grievance route",
      "sectors": "all"
    },
    {
      "category": "Community & security",
      "hazard": "Damage to cultural heritage or graves",
      "controls": "Chance finds procedure; pre-clearance survey; authority notification; work stoppage protocol",
      "sectors": "all"
    },
    {
      "category": "Community & security",
      "hazard": "Child labour in the workforce or supply chain",
      "controls": "Age verification at recruitment; supplier audits; remediation procedure, not dismissal alone",
      "sectors": "all"
    },
    {
      "category": "Community & security",
      "hazard": "Theft, vandalism or armed intrusion",
      "controls": "Access control; patrols; lighting; community relations; response protocol with police",
      "sectors": "all"
    },
    {
      "category": "Community & security",
      "hazard": "Community road safety impact from project traffic",
      "controls": "Route planning away from schools; speed control; flag personnel; community sensitisation",
      "sectors": "all"
    },
    {
      "category": "Process & asset integrity",
      "hazard": "Loss of containment from a tank or pipeline",
      "controls": "Integrity inspection programme; corrosion monitoring; secondary containment; leak detection",
      "sectors": "all"
    },
    {
      "category": "Process & asset integrity",
      "hazard": "Overfilling a storage tank",
      "controls": "High-level alarm and independent trip; filling procedure; operator presence during transfer",
      "sectors": "all"
    },
    {
      "category": "Process & asset integrity",
      "hazard": "Failure of a safety-critical instrument or trip",
      "controls": "Safety-critical element register; proof testing at defined interval; override control",
      "sectors": "all"
    },
    {
      "category": "Process & asset integrity",
      "hazard": "Uncontrolled change to plant or process",
      "controls": "Management of change procedure; technical authority sign-off; update of drawings and procedures",
      "sectors": "all"
    },
    {
      "category": "Process & asset integrity",
      "hazard": "Lifting equipment failure",
      "controls": "Statutory thorough examination; pre-use inspection; SWL marking; lift plan for complex lifts",
      "sectors": "all"
    },
    {
      "category": "Emergency & external",
      "hazard": "Delay in medical evacuation from a remote site",
      "controls": "Medevac plan with named facility; communications tested; trained first responders; helipad or route",
      "sectors": "all"
    },
    {
      "category": "Emergency & external",
      "hazard": "Flooding of the site or access road",
      "controls": "Drainage design; flood warning; seasonal planning; alternative access",
      "sectors": "all"
    },
    {
      "category": "Emergency & external",
      "hazard": "Epidemic or outbreak affecting the workforce",
      "controls": "Outbreak SOP; screening; isolation facility; liaison with district health authority",
      "sectors": "all"
    },
    {
      "category": "Emergency & external",
      "hazard": "Civil unrest or conflict affecting operations",
      "controls": "Security risk assessment per area; evacuation plan; communication tree; travel restrictions",
      "sectors": "all"
    },
    {
      "category": "Emergency & external",
      "hazard": "Loss of power or water to critical operations",
      "controls": "Standby supply tested; critical load prioritisation; storage capacity",
      "sectors": "all"
    }
  ],

  // Training courses with the validity period Verda uses to calculate the
  // refresher date, and who typically needs each one.
  trainingCatalogue: [
    {
      "name": "General EHS Induction",
      "category": "Induction",
      "validityMonths": 12,
      "roles": "Everyone on site"
    },
    {
      "name": "Site-Specific Induction",
      "category": "Induction",
      "validityMonths": 12,
      "roles": "Everyone on site"
    },
    {
      "name": "Visitor and Contractor Induction",
      "category": "Induction",
      "validityMonths": 12,
      "roles": "Visitors, contractors"
    },
    {
      "name": "Toolbox Talk Delivery",
      "category": "Induction",
      "validityMonths": 24,
      "roles": "Supervisors"
    },
    {
      "name": "Fire Safety & Evacuation",
      "category": "Emergency",
      "validityMonths": 12,
      "roles": "Everyone on site"
    },
    {
      "name": "Fire Warden / Marshal",
      "category": "Emergency",
      "validityMonths": 24,
      "roles": "Nominated wardens"
    },
    {
      "name": "Fire Extinguisher Practical Use",
      "category": "Emergency",
      "validityMonths": 12,
      "roles": "Wardens, plant operators"
    },
    {
      "name": "First Aid at Work",
      "category": "Emergency",
      "validityMonths": 24,
      "roles": "Nominated first aiders"
    },
    {
      "name": "Advanced / Remote First Aid",
      "category": "Emergency",
      "validityMonths": 24,
      "roles": "Remote site responders"
    },
    {
      "name": "CPR and AED",
      "category": "Emergency",
      "validityMonths": 12,
      "roles": "First aiders, clinic staff"
    },
    {
      "name": "Emergency Response Team Member",
      "category": "Emergency",
      "validityMonths": 12,
      "roles": "ERT members"
    },
    {
      "name": "Mine Rescue Brigade",
      "category": "Emergency",
      "validityMonths": 12,
      "roles": "Underground rescue teams"
    },
    {
      "name": "Spill Response",
      "category": "Emergency",
      "validityMonths": 24,
      "roles": "Operators, drivers, store staff"
    },
    {
      "name": "Medevac and Casualty Handling",
      "category": "Emergency",
      "validityMonths": 24,
      "roles": "Remote site supervisors"
    },
    {
      "name": "Working at Height",
      "category": "High-risk work",
      "validityMonths": 24,
      "roles": "Anyone working above 1.8 m"
    },
    {
      "name": "Harness Inspection and Fitting",
      "category": "High-risk work",
      "validityMonths": 12,
      "roles": "Height workers"
    },
    {
      "name": "Height Rescue",
      "category": "High-risk work",
      "validityMonths": 12,
      "roles": "Rescue teams"
    },
    {
      "name": "Scaffold Erection (competent person)",
      "category": "High-risk work",
      "validityMonths": 36,
      "roles": "Scaffolders"
    },
    {
      "name": "Scaffold Inspection",
      "category": "High-risk work",
      "validityMonths": 24,
      "roles": "Scaffold inspectors"
    },
    {
      "name": "Ladder Safety",
      "category": "High-risk work",
      "validityMonths": 24,
      "roles": "Everyone using ladders"
    },
    {
      "name": "Confined Space Entry",
      "category": "High-risk work",
      "validityMonths": 24,
      "roles": "Entrants and attendants"
    },
    {
      "name": "Confined Space Standby / Rescue",
      "category": "High-risk work",
      "validityMonths": 12,
      "roles": "Standby persons"
    },
    {
      "name": "Permit to Work — Issuer",
      "category": "High-risk work",
      "validityMonths": 24,
      "roles": "Permit issuers"
    },
    {
      "name": "Permit to Work — Receiver",
      "category": "High-risk work",
      "validityMonths": 24,
      "roles": "Permit receivers"
    },
    {
      "name": "Lockout / Tagout (LOTO)",
      "category": "High-risk work",
      "validityMonths": 24,
      "roles": "Maintenance, operators"
    },
    {
      "name": "Hot Work and Fire Watch",
      "category": "High-risk work",
      "validityMonths": 24,
      "roles": "Welders, fire watch"
    },
    {
      "name": "Excavation and Trenching Safety",
      "category": "High-risk work",
      "validityMonths": 24,
      "roles": "Excavation supervisors"
    },
    {
      "name": "Lifting Operations — Appointed Person",
      "category": "High-risk work",
      "validityMonths": 36,
      "roles": "Lift planners"
    },
    {
      "name": "Slinger / Banksman",
      "category": "High-risk work",
      "validityMonths": 24,
      "roles": "Riggers, banksmen"
    },
    {
      "name": "Crane Operator",
      "category": "Plant & equipment",
      "validityMonths": 24,
      "roles": "Crane operators"
    },
    {
      "name": "Forklift Operator",
      "category": "Plant & equipment",
      "validityMonths": 36,
      "roles": "Forklift operators"
    },
    {
      "name": "Excavator / Loader Operator",
      "category": "Plant & equipment",
      "validityMonths": 36,
      "roles": "Plant operators"
    },
    {
      "name": "Haul Truck Operator",
      "category": "Plant & equipment",
      "validityMonths": 24,
      "roles": "Haul truck operators"
    },
    {
      "name": "Underground Mobile Equipment Operator",
      "category": "Plant & equipment",
      "validityMonths": 24,
      "roles": "Underground operators"
    },
    {
      "name": "Elevated Work Platform Operator",
      "category": "Plant & equipment",
      "validityMonths": 36,
      "roles": "MEWP operators"
    },
    {
      "name": "Defensive Driving",
      "category": "Plant & equipment",
      "validityMonths": 24,
      "roles": "All drivers"
    },
    {
      "name": "Journey Management",
      "category": "Plant & equipment",
      "validityMonths": 24,
      "roles": "Drivers, supervisors"
    },
    {
      "name": "Fatigue Management",
      "category": "Plant & equipment",
      "validityMonths": 24,
      "roles": "Drivers, shift workers"
    },
    {
      "name": "Machine Guarding and Safe Operation",
      "category": "Plant & equipment",
      "validityMonths": 24,
      "roles": "Machine operators"
    },
    {
      "name": "Pressure Vessel and Boiler Operation",
      "category": "Plant & equipment",
      "validityMonths": 24,
      "roles": "Boiler operators"
    },
    {
      "name": "Hazardous Chemicals / SDS Awareness",
      "category": "Chemical & health",
      "validityMonths": 24,
      "roles": "Anyone handling chemicals"
    },
    {
      "name": "Chemical Spill and Decontamination",
      "category": "Chemical & health",
      "validityMonths": 24,
      "roles": "Chemical handlers"
    },
    {
      "name": "Cyanide Management (ICMC)",
      "category": "Chemical & health",
      "validityMonths": 12,
      "roles": "Gold plant personnel"
    },
    {
      "name": "Mercury Handling and Alternatives",
      "category": "Chemical & health",
      "validityMonths": 12,
      "roles": "ASM gold processors"
    },
    {
      "name": "Asbestos Awareness",
      "category": "Chemical & health",
      "validityMonths": 12,
      "roles": "Maintenance, demolition"
    },
    {
      "name": "Respiratory Protection and Face-Fit Testing",
      "category": "Chemical & health",
      "validityMonths": 24,
      "roles": "RPE users"
    },
    {
      "name": "Silica and Dust Exposure Awareness",
      "category": "Chemical & health",
      "validityMonths": 24,
      "roles": "Mining, quarry, construction"
    },
    {
      "name": "Noise Awareness and Hearing Conservation",
      "category": "Chemical & health",
      "validityMonths": 24,
      "roles": "Workers in noise zones"
    },
    {
      "name": "Heat Stress Prevention",
      "category": "Chemical & health",
      "validityMonths": 12,
      "roles": "Outdoor and hot-process workers"
    },
    {
      "name": "Occupational Health Surveillance Awareness",
      "category": "Chemical & health",
      "validityMonths": 24,
      "roles": "Supervisors, HR"
    },
    {
      "name": "Blasting — Licensed Shotfirer",
      "category": "Mining",
      "validityMonths": 12,
      "roles": "Shotfirers"
    },
    {
      "name": "Explosives Handling and Storage",
      "category": "Mining",
      "validityMonths": 12,
      "roles": "Magazine keepers"
    },
    {
      "name": "Underground Ventilation Awareness",
      "category": "Mining",
      "validityMonths": 12,
      "roles": "Underground workers"
    },
    {
      "name": "Ground Control and Scaling",
      "category": "Mining",
      "validityMonths": 12,
      "roles": "Underground workers"
    },
    {
      "name": "Tailings Facility Operation and Surveillance",
      "category": "Mining",
      "validityMonths": 12,
      "roles": "TSF operators"
    },
    {
      "name": "Gas Detection and Self-Rescuer Use",
      "category": "Mining",
      "validityMonths": 12,
      "roles": "Underground workers"
    },
    {
      "name": "Mine Closure and Rehabilitation Planning",
      "category": "Mining",
      "validityMonths": 36,
      "roles": "Environmental teams"
    },
    {
      "name": "Artisanal Mining Formalisation and Due Diligence",
      "category": "Mining",
      "validityMonths": 24,
      "roles": "ASM liaison officers"
    },
    {
      "name": "Environmental Awareness",
      "category": "Environment",
      "validityMonths": 24,
      "roles": "Everyone on site"
    },
    {
      "name": "Waste Management and Segregation",
      "category": "Environment",
      "validityMonths": 24,
      "roles": "Everyone on site"
    },
    {
      "name": "Water and Effluent Monitoring",
      "category": "Environment",
      "validityMonths": 24,
      "roles": "Environmental officers"
    },
    {
      "name": "Air Quality and Emissions Monitoring",
      "category": "Environment",
      "validityMonths": 24,
      "roles": "Environmental officers"
    },
    {
      "name": "Biodiversity and Species Handling",
      "category": "Environment",
      "validityMonths": 24,
      "roles": "Clearance teams"
    },
    {
      "name": "GHG Accounting (GHG Protocol)",
      "category": "Environment",
      "validityMonths": 36,
      "roles": "Sustainability staff"
    },
    {
      "name": "Environmental Incident Investigation",
      "category": "Environment",
      "validityMonths": 24,
      "roles": "Environmental officers"
    },
    {
      "name": "Incident Investigation and Root Cause Analysis",
      "category": "Management systems",
      "validityMonths": 24,
      "roles": "Supervisors, EHS staff"
    },
    {
      "name": "Risk Assessment and JSA/JHA",
      "category": "Management systems",
      "validityMonths": 24,
      "roles": "Supervisors"
    },
    {
      "name": "Behaviour-Based Safety Observation",
      "category": "Management systems",
      "validityMonths": 24,
      "roles": "Supervisors, observers"
    },
    {
      "name": "Internal Auditor — ISO 45001",
      "category": "Management systems",
      "validityMonths": 36,
      "roles": "EHS auditors"
    },
    {
      "name": "Internal Auditor — ISO 14001",
      "category": "Management systems",
      "validityMonths": 36,
      "roles": "EHS auditors"
    },
    {
      "name": "Lead Auditor (ISO 19011)",
      "category": "Management systems",
      "validityMonths": 36,
      "roles": "Lead auditors"
    },
    {
      "name": "Contractor EHS Management",
      "category": "Management systems",
      "validityMonths": 24,
      "roles": "Contract holders"
    },
    {
      "name": "Legal Register and Compliance Obligations",
      "category": "Management systems",
      "validityMonths": 12,
      "roles": "EHS managers"
    },
    {
      "name": "ESIA and ESMP Implementation",
      "category": "Management systems",
      "validityMonths": 36,
      "roles": "Project E&S staff"
    },
    {
      "name": "IFC Performance Standards Awareness",
      "category": "Management systems",
      "validityMonths": 36,
      "roles": "Project E&S staff"
    },
    {
      "name": "Emergency Preparedness Planning",
      "category": "Management systems",
      "validityMonths": 24,
      "roles": "Site management"
    },
    {
      "name": "Community Engagement and Grievance Handling",
      "category": "Social & community",
      "validityMonths": 24,
      "roles": "Community liaison officers"
    },
    {
      "name": "Voluntary Principles on Security & Human Rights",
      "category": "Social & community",
      "validityMonths": 12,
      "roles": "Security personnel"
    },
    {
      "name": "Prevention of Sexual Exploitation, Abuse and Harassment",
      "category": "Social & community",
      "validityMonths": 12,
      "roles": "Everyone on site"
    },
    {
      "name": "Gender-Based Violence Prevention",
      "category": "Social & community",
      "validityMonths": 12,
      "roles": "Supervisors, community teams"
    },
    {
      "name": "Child Labour Identification and Remediation",
      "category": "Social & community",
      "validityMonths": 24,
      "roles": "HR, supply chain"
    },
    {
      "name": "Resettlement and Livelihood Restoration",
      "category": "Social & community",
      "validityMonths": 36,
      "roles": "Land teams"
    },
    {
      "name": "Cultural Heritage and Chance Finds",
      "category": "Social & community",
      "validityMonths": 24,
      "roles": "Earthworks teams"
    },
    {
      "name": "Stakeholder Engagement Planning",
      "category": "Social & community",
      "validityMonths": 36,
      "roles": "Community teams"
    },
    {
      "name": "HIV/AIDS, TB and Malaria Awareness",
      "category": "Social & community",
      "validityMonths": 12,
      "roles": "Everyone on site"
    },
    {
      "name": "Food Hygiene and Safe Handling",
      "category": "Sector-specific",
      "validityMonths": 12,
      "roles": "Catering staff"
    },
    {
      "name": "Infection Prevention and Control",
      "category": "Sector-specific",
      "validityMonths": 12,
      "roles": "Healthcare staff"
    },
    {
      "name": "Sharps and Healthcare Waste Handling",
      "category": "Sector-specific",
      "validityMonths": 12,
      "roles": "Healthcare staff"
    },
    {
      "name": "Radiation Protection Supervisor",
      "category": "Sector-specific",
      "validityMonths": 24,
      "roles": "Radiation supervisors"
    },
    {
      "name": "Electrical Safety — Authorised Person",
      "category": "Sector-specific",
      "validityMonths": 24,
      "roles": "Authorised electrical persons"
    },
    {
      "name": "Arc Flash Awareness",
      "category": "Sector-specific",
      "validityMonths": 24,
      "roles": "Electrical workers"
    },
    {
      "name": "Pesticide Application and Safe Use",
      "category": "Sector-specific",
      "validityMonths": 24,
      "roles": "Spray operators"
    },
    {
      "name": "Dangerous Goods Transport (ADR-equivalent)",
      "category": "Sector-specific",
      "validityMonths": 24,
      "roles": "DG drivers"
    },
    {
      "name": "Manual Handling",
      "category": "Sector-specific",
      "validityMonths": 24,
      "roles": "Everyone"
    },
    {
      "name": "Display Screen Equipment Assessment",
      "category": "Sector-specific",
      "validityMonths": 36,
      "roles": "Office staff, assessors"
    }
  ],

  // Injury classification drives every safety frequency rate. `counts` says
  // which rates an incident of that class feeds.
  injuryClassifications: [
    {
      "code": "FAT",
      "label": "Fatality",
      "counts": [
        "trifr",
        "aifr"
      ],
      "desc": "Death resulting from a work-related incident."
    },
    {
      "code": "LTI",
      "label": "Lost Time Injury",
      "counts": [
        "ltifr",
        "trifr",
        "aifr"
      ],
      "desc": "Injury where the person cannot attend the next scheduled shift."
    },
    {
      "code": "RWC",
      "label": "Restricted Work Case",
      "counts": [
        "trifr",
        "aifr"
      ],
      "desc": "Person returns but cannot perform their full normal duties."
    },
    {
      "code": "MTC",
      "label": "Medical Treatment Case",
      "counts": [
        "trifr",
        "aifr"
      ],
      "desc": "Treatment beyond first aid by a medical professional; no lost time."
    },
    {
      "code": "FAC",
      "label": "First Aid Case",
      "counts": [
        "aifr"
      ],
      "desc": "Minor injury treated on site; no further treatment required."
    },
    {
      "code": "OI",
      "label": "Occupational Illness",
      "counts": [
        "trifr",
        "aifr"
      ],
      "desc": "Work-related illness or disease, including noise-induced hearing loss."
    },
    {
      "code": "NM",
      "label": "Near Miss",
      "counts": [
        "nearmiss"
      ],
      "desc": "No injury or damage, but the potential was there."
    },
    {
      "code": "NI",
      "label": "No Injury (damage / environmental / security)",
      "counts": [],
      "desc": "Property damage, spill, or security event with no personal injury."
    }
  ],

  // Who the injured or trained person works for. Every safety rate can be
  // split on this, because a contractor-heavy site that reports only its own
  // employees' injuries is reporting a fiction.
  employerTypes: [
    "Direct employee",
    "Sub-contractor",
    "Agency / casual labour",
    "Visitor",
    "Community member"
  ],

  // Investigation causes: what happened at the sharp end, and why the system
  // allowed it. Underlying causes are where corrective actions belong.
  causeTaxonomy: {
    "immediate": [
      "Inadequate or missing guard / barrier",
      "Defective tool or equipment",
      "Failure to isolate energy",
      "Failure to use PPE provided",
      "Working without a permit",
      "Operating at unsafe speed",
      "Bypassing a safety device",
      "Poor housekeeping",
      "Inadequate lighting or visibility",
      "Unsafe position for the task",
      "Servicing equipment in motion",
      "Inadequate warning or signage",
      "Improper loading or placement",
      "Horseplay or distraction",
      "Adverse weather or ground conditions"
    ],
    "underlying": [
      "Inadequate risk assessment for the task",
      "Procedure absent, unclear or impractical",
      "Inadequate training or competence verification",
      "Supervision not present or not effective",
      "Equipment design or selection inadequate",
      "Planned maintenance not performed",
      "Time or production pressure",
      "Change not managed (new plant, people or method)",
      "Communication or handover failure",
      "Contractor management inadequate",
      "Fatigue or shift design",
      "Safety culture — reporting discouraged or hazards normalised",
      "Resourcing — insufficient people or budget",
      "Standard exists but is not enforced"
    ]
  },

  // Permit-to-work types and the control each one exists to guarantee.
  permitToWorkTypes: [
    {
      "type": "Hot work",
      "validity": "Shift",
      "key": "Fire watch during and 30 minutes after; combustibles cleared or screened"
    },
    {
      "type": "Confined space entry",
      "validity": "Shift",
      "key": "Gas test before and during; standby person; rescue equipment on site"
    },
    {
      "type": "Work at height",
      "validity": "Shift",
      "key": "Access method agreed; rescue plan; edge protection or fall arrest"
    },
    {
      "type": "Excavation / ground disturbance",
      "validity": "Task",
      "key": "Services located and proved; support design; inspection before each shift"
    },
    {
      "type": "Electrical isolation / live work",
      "validity": "Task",
      "key": "Isolation, lock-off, prove dead; authorised person only"
    },
    {
      "type": "Lifting operations",
      "validity": "Task",
      "key": "Lift plan; appointed person; certified equipment; exclusion zone"
    },
    {
      "type": "Line breaking / loss of containment",
      "validity": "Task",
      "key": "Drained, depressurised, purged; spill containment ready"
    },
    {
      "type": "Radiography / radiation source use",
      "validity": "Task",
      "key": "Cordon and dose survey; competent radiographer; out-of-hours scheduling"
    },
    {
      "type": "Blasting",
      "validity": "Event",
      "key": "Licensed shotfirer; exclusion and sentries; community notification; post-blast clearance"
    },
    {
      "type": "Vehicle / plant movement in restricted area",
      "validity": "Shift",
      "key": "Route agreed; banksman; overhead and underground services checked"
    },
    {
      "type": "Diving / work over water",
      "validity": "Task",
      "key": "Dive plan; standby diver; rescue craft; communications"
    },
    {
      "type": "Road or access closure",
      "validity": "Event",
      "key": "Traffic management plan; signage; community and authority notification"
    }
  ],

  // Scenarios an emergency plan and drill programme should cover.
  emergencyScenarios: [
    "Fire in a building or plant area",
    "Explosion or blast incident",
    "Major chemical spill or release",
    "Fuel or oil spill to water",
    "Medical emergency and casualty evacuation",
    "Fatality on site",
    "Confined space rescue",
    "Working at height rescue",
    "Underground fire or entrapment",
    "Tailings facility breach",
    "Pit wall or excavation collapse",
    "Inrush of water or slurry",
    "Vehicle accident on site or public road",
    "Loss of power to critical systems",
    "Flooding of site or access",
    "Disease outbreak among the workforce",
    "Civil unrest, blockade or security incident",
    "Armed intrusion or hostage situation",
    "Bush or grass fire approaching site",
    "Structural collapse",
    "Gas leak or asphyxiation event",
    "Missing person on site",
    "Severe weather / lightning",
    "Bomb threat or suspicious package"
  ],

  // Environmental and occupational monitoring parameters with usual units.
  monitoringParameters: [
    {
      "medium": "Air — ambient",
      "parameter": "PM2.5",
      "unit": "µg/m³"
    },
    {
      "medium": "Air — ambient",
      "parameter": "PM10",
      "unit": "µg/m³"
    },
    {
      "medium": "Air — ambient",
      "parameter": "Dust deposition",
      "unit": "mg/m²/day"
    },
    {
      "medium": "Air — ambient",
      "parameter": "SO₂",
      "unit": "µg/m³"
    },
    {
      "medium": "Air — ambient",
      "parameter": "NO₂",
      "unit": "µg/m³"
    },
    {
      "medium": "Air — stack",
      "parameter": "Particulate matter",
      "unit": "mg/Nm³"
    },
    {
      "medium": "Air — stack",
      "parameter": "SO₂",
      "unit": "mg/Nm³"
    },
    {
      "medium": "Air — stack",
      "parameter": "Metals (Pb, Cd, As)",
      "unit": "mg/Nm³"
    },
    {
      "medium": "Noise",
      "parameter": "Daytime LAeq",
      "unit": "dB(A)"
    },
    {
      "medium": "Noise",
      "parameter": "Night-time LAeq",
      "unit": "dB(A)"
    },
    {
      "medium": "Vibration",
      "parameter": "Peak particle velocity",
      "unit": "mm/s"
    },
    {
      "medium": "Vibration",
      "parameter": "Airblast overpressure",
      "unit": "dB(L)"
    },
    {
      "medium": "Water — effluent",
      "parameter": "pH",
      "unit": "pH units"
    },
    {
      "medium": "Water — effluent",
      "parameter": "BOD₅",
      "unit": "mg/l"
    },
    {
      "medium": "Water — effluent",
      "parameter": "COD",
      "unit": "mg/l"
    },
    {
      "medium": "Water — effluent",
      "parameter": "Total suspended solids",
      "unit": "mg/l"
    },
    {
      "medium": "Water — effluent",
      "parameter": "Oil and grease",
      "unit": "mg/l"
    },
    {
      "medium": "Water — effluent",
      "parameter": "Total dissolved solids",
      "unit": "mg/l"
    },
    {
      "medium": "Water — effluent",
      "parameter": "Heavy metals (Cu, Pb, Zn, Cd, As)",
      "unit": "mg/l"
    },
    {
      "medium": "Water — effluent",
      "parameter": "Cyanide (WAD)",
      "unit": "mg/l"
    },
    {
      "medium": "Water — surface/ground",
      "parameter": "Electrical conductivity",
      "unit": "µS/cm"
    },
    {
      "medium": "Water — surface/ground",
      "parameter": "Turbidity",
      "unit": "NTU"
    },
    {
      "medium": "Water — surface/ground",
      "parameter": "Sulphate",
      "unit": "mg/l"
    },
    {
      "medium": "Water — drinking",
      "parameter": "E. coli / faecal coliforms",
      "unit": "CFU/100ml"
    },
    {
      "medium": "Water — drinking",
      "parameter": "Residual chlorine",
      "unit": "mg/l"
    },
    {
      "medium": "Soil",
      "parameter": "Total petroleum hydrocarbons",
      "unit": "mg/kg"
    },
    {
      "medium": "Soil",
      "parameter": "Heavy metals",
      "unit": "mg/kg"
    },
    {
      "medium": "Occupational",
      "parameter": "Respirable crystalline silica",
      "unit": "mg/m³ (8h TWA)"
    },
    {
      "medium": "Occupational",
      "parameter": "Respirable dust",
      "unit": "mg/m³ (8h TWA)"
    },
    {
      "medium": "Occupational",
      "parameter": "Diesel particulate matter",
      "unit": "µg/m³ EC"
    },
    {
      "medium": "Occupational",
      "parameter": "Personal noise exposure",
      "unit": "dB(A) LEX,8h"
    },
    {
      "medium": "Occupational",
      "parameter": "Hand-arm vibration",
      "unit": "m/s² A(8)"
    },
    {
      "medium": "Occupational",
      "parameter": "Welding fume",
      "unit": "mg/m³"
    },
    {
      "medium": "Occupational",
      "parameter": "Heat stress (WBGT)",
      "unit": "°C"
    }
  ],

  // Waste streams with hazard classification and the normal disposal route.
  wasteStreamLibrary: [
    {
      "stream": "Mixed general waste",
      "class": "Non-hazardous",
      "route": "Licensed landfill"
    },
    {
      "stream": "Paper and cardboard",
      "class": "Recyclable",
      "route": "Licensed recycler"
    },
    {
      "stream": "Plastics",
      "class": "Recyclable",
      "route": "Licensed recycler"
    },
    {
      "stream": "Scrap metal",
      "class": "Recyclable",
      "route": "Licensed recycler"
    },
    {
      "stream": "Glass",
      "class": "Recyclable",
      "route": "Licensed recycler"
    },
    {
      "stream": "Wood and timber offcuts",
      "class": "Recyclable",
      "route": "Reuse or licensed recycler"
    },
    {
      "stream": "Food and biodegradable waste",
      "class": "Non-hazardous",
      "route": "Composting or licensed landfill"
    },
    {
      "stream": "Construction and demolition rubble",
      "class": "Non-hazardous",
      "route": "Reuse as fill or licensed disposal"
    },
    {
      "stream": "Used oil",
      "class": "Hazardous",
      "route": "Licensed hazardous waste handler"
    },
    {
      "stream": "Oily rags and absorbents",
      "class": "Hazardous",
      "route": "Licensed hazardous waste handler"
    },
    {
      "stream": "Oil filters",
      "class": "Hazardous",
      "route": "Licensed hazardous waste handler"
    },
    {
      "stream": "Contaminated soil",
      "class": "Hazardous",
      "route": "Treatment or licensed hazardous disposal"
    },
    {
      "stream": "Used batteries (lead-acid)",
      "class": "Hazardous",
      "route": "Licensed recycler"
    },
    {
      "stream": "Used batteries (lithium)",
      "class": "Hazardous",
      "route": "Licensed recycler"
    },
    {
      "stream": "Used tyres",
      "class": "Special",
      "route": "Licensed recycler or authorised reuse"
    },
    {
      "stream": "Chemical containers (empty)",
      "class": "Hazardous",
      "route": "Triple-rinse then licensed handler"
    },
    {
      "stream": "Solvent and paint waste",
      "class": "Hazardous",
      "route": "Licensed hazardous waste handler"
    },
    {
      "stream": "Fluorescent tubes and lamps",
      "class": "Hazardous",
      "route": "Licensed hazardous waste handler"
    },
    {
      "stream": "E-waste (IT and electrical)",
      "class": "Hazardous",
      "route": "Licensed e-waste handler"
    },
    {
      "stream": "Medical / healthcare waste",
      "class": "Hazardous",
      "route": "Licensed medical waste treatment"
    },
    {
      "stream": "Sharps",
      "class": "Hazardous",
      "route": "Licensed medical waste treatment"
    },
    {
      "stream": "Sewage and septic sludge",
      "class": "Special",
      "route": "Licensed treatment works"
    },
    {
      "stream": "Water treatment sludge",
      "class": "Special",
      "route": "Licensed disposal or beneficial use"
    },
    {
      "stream": "Tailings",
      "class": "Mining",
      "route": "Engineered tailings storage facility"
    },
    {
      "stream": "Waste rock / overburden",
      "class": "Mining",
      "route": "Engineered dump with ARD control"
    },
    {
      "stream": "Slag and smelter residue",
      "class": "Mining",
      "route": "Characterise then licensed disposal or reuse"
    },
    {
      "stream": "Asbestos-containing material",
      "class": "Hazardous",
      "route": "Licensed asbestos removal and disposal"
    },
    {
      "stream": "Explosives and packaging",
      "class": "Hazardous",
      "route": "Licensed destruction by the supplier"
    }
  ],

  // Job roles, for competence matrices and training assignment.
  jobRoles: [
    "Site worker / operative",
    "Machine operator",
    "Mobile plant operator",
    "Driver",
    "Electrician",
    "Mechanic / fitter",
    "Welder / fabricator",
    "Storeman",
    "Laboratory technician",
    "Nurse / clinic officer",
    "Security officer",
    "Supervisor / foreman",
    "Shift superintendent",
    "Site manager",
    "Project manager",
    "EHS officer",
    "EHS manager",
    "Environmental officer",
    "Community liaison officer",
    "Occupational hygienist",
    "Sustainability / ESG manager",
    "HR officer",
    "Contracts / procurement officer",
    "Engineer",
    "Geologist",
    "Surveyor",
    "Blaster / shotfirer",
    "Mine captain",
    "Executive / director"
  ],

  // Audit finding grading, with the closure target each grade implies.
  auditFindingCategories: [
    {
      "category": "Major non-conformity",
      "meaning": "A legal breach, an absent control for a fatal risk, or a systemic failure. Stop-work may be warranted.",
      "target": "Immediate"
    },
    {
      "category": "Minor non-conformity",
      "meaning": "A single lapse against a requirement that does not on its own defeat the system.",
      "target": "30 days"
    },
    {
      "category": "Observation",
      "meaning": "Not yet a breach, but it will become one if left.",
      "target": "90 days"
    },
    {
      "category": "Opportunity for improvement",
      "meaning": "Compliant, but better practice exists.",
      "target": "Next review"
    },
    {
      "category": "Positive practice",
      "meaning": "Worth recording and replicating at other sites.",
      "target": "—"
    }
  ],

  // Sub-contractor pre-qualification. A principal is answerable for the
  // people its contractors bring on site, so this is checked before award.
  subcontractorPrequal: [
    "Company registration and tax compliance certificate current",
    "Relevant operating licences held for the scope of work",
    "Workers' compensation insurance current, with cover verified against headcount",
    "Public liability insurance current and adequate for the scope",
    "EHS policy signed by their senior management",
    "Named EHS representative with defined competence and site presence",
    "Three-year injury and fatality history disclosed",
    "Enforcement or prosecution history disclosed",
    "Method statements and risk assessments submitted for the scope",
    "Evidence of worker training and competence for the tasks awarded",
    "Plant and equipment inspection and certification records",
    "PPE provision confirmed as the sub-contractor's responsibility",
    "Emergency and incident reporting protocol agreed with the principal",
    "Sub-sub-contracting rules agreed in writing",
    "Labour standards: contracts, wages, hours, and no child or forced labour",
    "Worker grievance mechanism available to their workforce",
    "Accommodation and transport arrangements inspected where provided",
    "Waste and environmental obligations flowed down in the contract",
    "Bridging document agreed where both parties have EHS management systems",
    "Performance review frequency and KPI reporting obligation agreed"
  ],

  // Document types an EHS document register normally holds.
  documentTypes: [
    "EHS policy",
    "Environmental and social management plan (ESMP)",
    "ESIA / EIS report",
    "Project brief",
    "Permit or licence certificate",
    "Legal register",
    "Risk assessment / JSA",
    "Method statement",
    "Standard operating procedure",
    "Emergency response plan",
    "Traffic management plan",
    "Waste management plan",
    "Tailings management plan",
    "Mine closure and rehabilitation plan",
    "Stakeholder engagement plan",
    "Grievance procedure",
    "Resettlement action plan",
    "Training matrix",
    "Competence certificate",
    "Statutory inspection certificate",
    "Calibration certificate",
    "Monitoring / laboratory report",
    "Waste transfer note",
    "Audit report",
    "Incident investigation report",
    "Management review minutes",
    "Insurance certificate",
    "Contract / bridging document",
    "Toolbox talk record",
    "Inspection checklist"
  ],

  // What Verda computes automatically, from which register, and which
  // direction is good. Shown to the user next to every figure so no KPI is
  // a number of unexplained origin.
  kpiDefinitions: [
    {
      "id": "ltifr",
      "name": "LTIFR — Lost Time Injury Frequency Rate",
      "group": "Safety",
      "formula": "(Fatalities + Lost Time Injuries) × 1,000,000 ÷ hours worked",
      "source": "Incident register (classification) and exposure hours",
      "goodWhen": "lower"
    },
    {
      "id": "trifr",
      "name": "TRIFR — Total Recordable Injury Frequency Rate",
      "group": "Safety",
      "formula": "(Fatalities + LTI + RWC + MTC + occupational illness) × 1,000,000 ÷ hours worked",
      "source": "Incident register and exposure hours",
      "goodWhen": "lower"
    },
    {
      "id": "aifr",
      "name": "AIFR — All Injury Frequency Rate",
      "group": "Safety",
      "formula": "All injuries including first aid cases × 1,000,000 ÷ hours worked",
      "source": "Incident register and exposure hours",
      "goodWhen": "lower"
    },
    {
      "id": "severity",
      "name": "Severity rate",
      "group": "Safety",
      "formula": "Days lost × 1,000,000 ÷ hours worked",
      "source": "Incident register (days lost) and exposure hours",
      "goodWhen": "lower"
    },
    {
      "id": "fatalities",
      "name": "Fatalities",
      "group": "Safety",
      "formula": "Count of work-related deaths in the period",
      "source": "Incident register",
      "goodWhen": "lower"
    },
    {
      "id": "nearmissrate",
      "name": "Near-miss reporting rate",
      "group": "Leading",
      "formula": "Near misses × 1,000,000 ÷ hours worked",
      "source": "Incident register and exposure hours",
      "goodWhen": "higher"
    },
    {
      "id": "nmratio",
      "name": "Near-miss to injury ratio",
      "group": "Leading",
      "formula": "Near misses ÷ recordable injuries",
      "source": "Incident register",
      "goodWhen": "higher"
    },
    {
      "id": "trainingvalid",
      "name": "Training currency",
      "group": "Leading",
      "formula": "Training records in date ÷ all training records",
      "source": "Training register",
      "goodWhen": "higher"
    },
    {
      "id": "actionclosure",
      "name": "Action closure rate",
      "group": "Leading",
      "formula": "Closed actions ÷ all actions raised",
      "source": "Actions (CAPA) register",
      "goodWhen": "higher"
    },
    {
      "id": "overdueactions",
      "name": "Overdue actions",
      "group": "Leading",
      "formula": "Open actions past their due date",
      "source": "Actions (CAPA) register",
      "goodWhen": "lower"
    },
    {
      "id": "highrisks",
      "name": "High and critical risks open",
      "group": "Leading",
      "formula": "Risks scoring above 9 on the 5×5 matrix",
      "source": "Risk register",
      "goodWhen": "lower"
    },
    {
      "id": "contractorshare",
      "name": "Sub-contractor share of hours",
      "group": "Workforce",
      "formula": "Sub-contractor hours ÷ total hours worked",
      "source": "Workforce and hours register",
      "goodWhen": "context"
    },
    {
      "id": "headcount",
      "name": "Workforce on site",
      "group": "Workforce",
      "formula": "Sum of headcount across all employers in the period",
      "source": "Workforce and hours register",
      "goodWhen": "context"
    },
    {
      "id": "femaleshare",
      "name": "Female share of workforce",
      "group": "Workforce",
      "formula": "Female headcount ÷ total headcount",
      "source": "Workforce and hours register",
      "goodWhen": "context"
    }
  ],

  // Frequency rates are per million hours worked (the ILO/international
  // convention). US OSHA practice uses 200,000 hours; the multiplier is
  // shown with every rate so the two are never silently confused.
  kpiExposureBase: 1000000,

  // ---- Equipment & machine inspection register ----------------------------
  // Statutory and planned inspection requirements by equipment type. The
  // interval is what Verda uses to calculate the next due date; `basis`
  // says where the requirement comes from. Intervals are MAXIMUMS under
  // most regimes and several jurisdictions are stricter — check the
  // regulation that applies to your site before relying on any of them.
  inspectionRegimes: [
    {
      "category": "Lifting equipment",
      "item": "Mobile crane",
      "inspection": "Thorough examination",
      "every": 12,
      "unit": "months",
      "who": "Competent person (independent)",
      "basis": "Lifting equipment regulations — 12 months for goods, 6 months where persons are lifted"
    },
    {
      "category": "Lifting equipment",
      "item": "Crane used to lift persons",
      "inspection": "Thorough examination",
      "every": 6,
      "unit": "months",
      "who": "Competent person (independent)",
      "basis": "Shortened interval because a failure is immediately life-threatening"
    },
    {
      "category": "Lifting equipment",
      "item": "Overhead / gantry crane",
      "inspection": "Thorough examination",
      "every": 12,
      "unit": "months",
      "who": "Competent person",
      "basis": "Lifting equipment regulations"
    },
    {
      "category": "Lifting equipment",
      "item": "Chain block / lever hoist",
      "inspection": "Thorough examination",
      "every": 6,
      "unit": "months",
      "who": "Competent person",
      "basis": "Lifting accessory"
    },
    {
      "category": "Lifting equipment",
      "item": "Slings, shackles, eyebolts",
      "inspection": "Thorough examination",
      "every": 6,
      "unit": "months",
      "who": "Competent person",
      "basis": "Lifting accessory — plus pre-use visual check"
    },
    {
      "category": "Lifting equipment",
      "item": "Forklift truck",
      "inspection": "Thorough examination",
      "every": 12,
      "unit": "months",
      "who": "Competent person",
      "basis": "Lifting equipment; 6 months if fitted with a work platform"
    },
    {
      "category": "Lifting equipment",
      "item": "Mobile elevating work platform (MEWP)",
      "inspection": "Thorough examination",
      "every": 6,
      "unit": "months",
      "who": "Competent person",
      "basis": "Lifts persons"
    },
    {
      "category": "Lifting equipment",
      "item": "Passenger / goods hoist",
      "inspection": "Thorough examination",
      "every": 6,
      "unit": "months",
      "who": "Competent person",
      "basis": "Lifts persons"
    },
    {
      "category": "Lifting equipment",
      "item": "Vehicle lifting jack and axle stands",
      "inspection": "Inspection",
      "every": 12,
      "unit": "months",
      "who": "Competent person",
      "basis": "Lifting equipment"
    },
    {
      "category": "Lifting equipment",
      "item": "Winch and wire rope",
      "inspection": "Thorough examination",
      "every": 6,
      "unit": "months",
      "who": "Competent person",
      "basis": "Rope condition and termination"
    },
    {
      "category": "Pressure systems",
      "item": "Steam boiler",
      "inspection": "Statutory external and internal examination",
      "every": 12,
      "unit": "months",
      "who": "Competent person / insurer",
      "basis": "Pressure systems written scheme of examination"
    },
    {
      "category": "Pressure systems",
      "item": "Air receiver",
      "inspection": "Statutory examination",
      "every": 26,
      "unit": "months",
      "who": "Competent person",
      "basis": "Written scheme of examination; interval set by the scheme"
    },
    {
      "category": "Pressure systems",
      "item": "Pressure vessel (process)",
      "inspection": "Statutory examination",
      "every": 24,
      "unit": "months",
      "who": "Competent person",
      "basis": "Written scheme of examination"
    },
    {
      "category": "Pressure systems",
      "item": "Safety / pressure relief valve",
      "inspection": "Test and certification",
      "every": 12,
      "unit": "months",
      "who": "Competent person",
      "basis": "Set-pressure verification"
    },
    {
      "category": "Pressure systems",
      "item": "Autoclave / steriliser",
      "inspection": "Statutory examination",
      "every": 12,
      "unit": "months",
      "who": "Competent person",
      "basis": "Pressure system; healthcare and laboratory use"
    },
    {
      "category": "Pressure systems",
      "item": "Compressed gas cylinder",
      "inspection": "Periodic inspection and test",
      "every": 60,
      "unit": "months",
      "who": "Approved test house",
      "basis": "Cylinder test interval varies by gas and standard"
    },
    {
      "category": "Pressure systems",
      "item": "LPG installation and pipework",
      "inspection": "Inspection and tightness test",
      "every": 12,
      "unit": "months",
      "who": "Registered gas technician",
      "basis": "Gas safety"
    },
    {
      "category": "Electrical",
      "item": "Fixed electrical installation",
      "inspection": "Periodic inspection and testing",
      "every": 36,
      "unit": "months",
      "who": "Licensed electrician",
      "basis": "Interval shortens to 12 months for construction, quarry and wet or corrosive environments"
    },
    {
      "category": "Electrical",
      "item": "Fixed installation — construction / quarry / wet area",
      "inspection": "Periodic inspection and testing",
      "every": 12,
      "unit": "months",
      "who": "Licensed electrician",
      "basis": "Harsh environment interval"
    },
    {
      "category": "Electrical",
      "item": "Portable appliance (office)",
      "inspection": "Portable appliance testing",
      "every": 12,
      "unit": "months",
      "who": "Competent person",
      "basis": "Risk-based interval"
    },
    {
      "category": "Electrical",
      "item": "Portable appliance (site / handheld tools)",
      "inspection": "Portable appliance testing",
      "every": 3,
      "unit": "months",
      "who": "Competent person",
      "basis": "Harsh use — quarterly"
    },
    {
      "category": "Electrical",
      "item": "Residual current device (RCD)",
      "inspection": "Trip test",
      "every": 6,
      "unit": "months",
      "who": "Competent person",
      "basis": "Plus user push-button test monthly"
    },
    {
      "category": "Electrical",
      "item": "Earthing and bonding system",
      "inspection": "Continuity and resistance test",
      "every": 12,
      "unit": "months",
      "who": "Licensed electrician",
      "basis": "Earth electrode resistance"
    },
    {
      "category": "Electrical",
      "item": "Lightning protection system",
      "inspection": "Inspection and test",
      "every": 12,
      "unit": "months",
      "who": "Specialist contractor",
      "basis": "Standard practice for exposed structures"
    },
    {
      "category": "Electrical",
      "item": "Standby generator",
      "inspection": "Load test and service",
      "every": 1,
      "unit": "months",
      "who": "Competent technician",
      "basis": "Monthly run under load; annual full service"
    },
    {
      "category": "Electrical",
      "item": "UPS and battery bank",
      "inspection": "Inspection and discharge test",
      "every": 12,
      "unit": "months",
      "who": "Specialist contractor",
      "basis": "Battery condition and runtime"
    },
    {
      "category": "Electrical",
      "item": "High-voltage switchgear",
      "inspection": "Inspection, thermography and maintenance",
      "every": 12,
      "unit": "months",
      "who": "Authorised person",
      "basis": "Plus thermographic survey"
    },
    {
      "category": "Fire safety",
      "item": "Portable fire extinguisher",
      "inspection": "Visual check",
      "every": 1,
      "unit": "months",
      "who": "Site fire warden",
      "basis": "Monthly visual; annual service by a competent person"
    },
    {
      "category": "Fire safety",
      "item": "Portable fire extinguisher",
      "inspection": "Service and certification",
      "every": 12,
      "unit": "months",
      "who": "Certified service provider",
      "basis": "Annual maintenance"
    },
    {
      "category": "Fire safety",
      "item": "Fire hose reel and hydrant",
      "inspection": "Inspection and flow test",
      "every": 12,
      "unit": "months",
      "who": "Certified service provider",
      "basis": "Pressure and flow verification"
    },
    {
      "category": "Fire safety",
      "item": "Fire detection and alarm system",
      "inspection": "Functional test",
      "every": 1,
      "unit": "months",
      "who": "Site fire warden",
      "basis": "Weekly call-point test; six-monthly service"
    },
    {
      "category": "Fire safety",
      "item": "Fire detection and alarm system",
      "inspection": "Service",
      "every": 6,
      "unit": "months",
      "who": "Certified service provider",
      "basis": "System service and certification"
    },
    {
      "category": "Fire safety",
      "item": "Sprinkler system",
      "inspection": "Inspection and test",
      "every": 12,
      "unit": "months",
      "who": "Certified service provider",
      "basis": "Plus weekly valve and gauge check"
    },
    {
      "category": "Fire safety",
      "item": "Emergency lighting",
      "inspection": "Function test",
      "every": 1,
      "unit": "months",
      "who": "Competent person",
      "basis": "Monthly short-duration; annual full-duration test"
    },
    {
      "category": "Fire safety",
      "item": "Emergency lighting",
      "inspection": "Full-duration test",
      "every": 12,
      "unit": "months",
      "who": "Competent person",
      "basis": "Full rated duration"
    },
    {
      "category": "Fire safety",
      "item": "Fire door",
      "inspection": "Inspection",
      "every": 6,
      "unit": "months",
      "who": "Competent person",
      "basis": "Closure, seals and hardware"
    },
    {
      "category": "Fire safety",
      "item": "Fire pump",
      "inspection": "Run test",
      "every": 1,
      "unit": "months",
      "who": "Competent person",
      "basis": "Monthly run; annual performance test"
    },
    {
      "category": "Access & fall protection",
      "item": "Scaffold",
      "inspection": "Inspection",
      "every": 7,
      "unit": "days",
      "who": "Competent scaffold inspector",
      "basis": "After erection, alteration, adverse weather and at least every 7 days"
    },
    {
      "category": "Access & fall protection",
      "item": "Ladder / stepladder",
      "inspection": "Formal inspection",
      "every": 3,
      "unit": "months",
      "who": "Competent person",
      "basis": "Plus pre-use check"
    },
    {
      "category": "Access & fall protection",
      "item": "Full-body harness and lanyard",
      "inspection": "Detailed inspection",
      "every": 6,
      "unit": "months",
      "who": "Competent person",
      "basis": "Plus pre-use check by the wearer"
    },
    {
      "category": "Access & fall protection",
      "item": "Fall-arrest anchor point",
      "inspection": "Load test / inspection",
      "every": 12,
      "unit": "months",
      "who": "Competent person",
      "basis": "Certification of anchor"
    },
    {
      "category": "Access & fall protection",
      "item": "Safety net",
      "inspection": "Inspection",
      "every": 12,
      "unit": "months",
      "who": "Competent person",
      "basis": "Plus after any arrest event"
    },
    {
      "category": "Access & fall protection",
      "item": "Edge protection and guardrail",
      "inspection": "Inspection",
      "every": 1,
      "unit": "months",
      "who": "Site supervisor",
      "basis": "Plus after modification"
    },
    {
      "category": "Vehicles & mobile plant",
      "item": "Light vehicle",
      "inspection": "Roadworthiness inspection",
      "every": 12,
      "unit": "months",
      "who": "Licensed inspection centre",
      "basis": "Statutory roadworthiness certificate"
    },
    {
      "category": "Vehicles & mobile plant",
      "item": "Heavy goods vehicle / tipper",
      "inspection": "Roadworthiness inspection",
      "every": 6,
      "unit": "months",
      "who": "Licensed inspection centre",
      "basis": "Shorter interval for heavy commercial vehicles in most jurisdictions"
    },
    {
      "category": "Vehicles & mobile plant",
      "item": "Passenger bus / staff transport",
      "inspection": "Roadworthiness inspection",
      "every": 6,
      "unit": "months",
      "who": "Licensed inspection centre",
      "basis": "Passenger-carrying vehicle"
    },
    {
      "category": "Vehicles & mobile plant",
      "item": "Excavator / loader / dozer",
      "inspection": "Planned maintenance inspection",
      "every": 3,
      "unit": "months",
      "who": "Competent mechanic",
      "basis": "Manufacturer schedule; plus daily pre-use check"
    },
    {
      "category": "Vehicles & mobile plant",
      "item": "Haul truck",
      "inspection": "Planned maintenance inspection",
      "every": 1,
      "unit": "months",
      "who": "Competent mechanic",
      "basis": "Plus daily pre-use check"
    },
    {
      "category": "Vehicles & mobile plant",
      "item": "Any mobile plant",
      "inspection": "Daily pre-use inspection",
      "every": 1,
      "unit": "days",
      "who": "Operator",
      "basis": "Recorded on a pre-use checklist"
    },
    {
      "category": "Vehicles & mobile plant",
      "item": "Roll-over protective structure (ROPS/FOPS)",
      "inspection": "Inspection and certification",
      "every": 12,
      "unit": "months",
      "who": "Competent person",
      "basis": "Structure integrity; no unauthorised modification"
    },
    {
      "category": "Vehicles & mobile plant",
      "item": "Seat belt and restraint",
      "inspection": "Inspection",
      "every": 3,
      "unit": "months",
      "who": "Competent person",
      "basis": "Webbing, anchorage and buckle"
    },
    {
      "category": "Vehicles & mobile plant",
      "item": "Reversing camera / proximity system",
      "inspection": "Function test",
      "every": 1,
      "unit": "months",
      "who": "Operator / workshop",
      "basis": "Function verified"
    },
    {
      "category": "Vehicles & mobile plant",
      "item": "Fuel bowser and dispensing equipment",
      "inspection": "Inspection",
      "every": 6,
      "unit": "months",
      "who": "Competent person",
      "basis": "Hose, nozzle, bund and earth continuity"
    },
    {
      "category": "Machinery",
      "item": "Machine guard and interlock",
      "inspection": "Function test",
      "every": 1,
      "unit": "months",
      "who": "Competent person",
      "basis": "Interlock proven to stop hazardous motion"
    },
    {
      "category": "Machinery",
      "item": "Emergency stop and pull-cord",
      "inspection": "Function test",
      "every": 1,
      "unit": "months",
      "who": "Competent person",
      "basis": "Every device operated and verified"
    },
    {
      "category": "Machinery",
      "item": "Conveyor system",
      "inspection": "Inspection",
      "every": 3,
      "unit": "months",
      "who": "Competent person",
      "basis": "Guards, pull-cords, rollers, alignment"
    },
    {
      "category": "Machinery",
      "item": "Crusher and screen",
      "inspection": "Inspection",
      "every": 3,
      "unit": "months",
      "who": "Competent person",
      "basis": "Guards, structure, isolation points"
    },
    {
      "category": "Machinery",
      "item": "Lockout/tagout devices and locks",
      "inspection": "Inspection and audit",
      "every": 6,
      "unit": "months",
      "who": "EHS / maintenance",
      "basis": "Device condition and procedure audit"
    },
    {
      "category": "Machinery",
      "item": "Abrasive wheel / bench grinder",
      "inspection": "Inspection",
      "every": 3,
      "unit": "months",
      "who": "Competent person",
      "basis": "Rest gap, guard, wheel condition"
    },
    {
      "category": "Machinery",
      "item": "Welding set and cables",
      "inspection": "Inspection",
      "every": 3,
      "unit": "months",
      "who": "Competent person",
      "basis": "Insulation, return path, flashback arrestors"
    },
    {
      "category": "Machinery",
      "item": "Local exhaust ventilation (LEV)",
      "inspection": "Thorough examination and test",
      "every": 14,
      "unit": "months",
      "who": "LEV competent examiner",
      "basis": "Statutory in most jurisdictions where fume or dust is controlled"
    },
    {
      "category": "Monitoring & detection",
      "item": "Fixed gas detection system",
      "inspection": "Calibration",
      "every": 6,
      "unit": "months",
      "who": "Competent technician",
      "basis": "Plus functional bump test at the set frequency"
    },
    {
      "category": "Monitoring & detection",
      "item": "Portable gas detector",
      "inspection": "Calibration",
      "every": 6,
      "unit": "months",
      "who": "Competent technician",
      "basis": "Bump test before each use"
    },
    {
      "category": "Monitoring & detection",
      "item": "Self-contained self-rescuer",
      "inspection": "Inspection",
      "every": 1,
      "unit": "months",
      "who": "Competent person",
      "basis": "Seal integrity and indicator"
    },
    {
      "category": "Monitoring & detection",
      "item": "Breathing apparatus (SCBA)",
      "inspection": "Inspection and test",
      "every": 1,
      "unit": "months",
      "who": "Competent person",
      "basis": "Plus annual full service"
    },
    {
      "category": "Monitoring & detection",
      "item": "Noise dosimeter / sound level meter",
      "inspection": "Calibration",
      "every": 12,
      "unit": "months",
      "who": "Accredited laboratory",
      "basis": "Traceable calibration certificate"
    },
    {
      "category": "Monitoring & detection",
      "item": "Air sampling pump",
      "inspection": "Calibration",
      "every": 12,
      "unit": "months",
      "who": "Accredited laboratory",
      "basis": "Flow-rate calibration"
    },
    {
      "category": "Monitoring & detection",
      "item": "Effluent flow meter",
      "inspection": "Calibration",
      "every": 12,
      "unit": "months",
      "who": "Accredited laboratory",
      "basis": "Permit condition in most jurisdictions"
    },
    {
      "category": "Monitoring & detection",
      "item": "Continuous emission monitoring system (CEMS)",
      "inspection": "Calibration and QA",
      "every": 12,
      "unit": "months",
      "who": "Accredited provider",
      "basis": "Plus periodic zero and span checks"
    },
    {
      "category": "Monitoring & detection",
      "item": "Weighbridge",
      "inspection": "Calibration and verification",
      "every": 12,
      "unit": "months",
      "who": "Legal metrology authority",
      "basis": "Waste and product reconciliation depends on it"
    },
    {
      "category": "Monitoring & detection",
      "item": "Laboratory balance and instruments",
      "inspection": "Calibration",
      "every": 12,
      "unit": "months",
      "who": "Accredited laboratory",
      "basis": "Traceable calibration"
    },
    {
      "category": "Monitoring & detection",
      "item": "Thermometer / data logger (cold chain)",
      "inspection": "Calibration",
      "every": 12,
      "unit": "months",
      "who": "Accredited laboratory",
      "basis": "Food and medical cold chain"
    },
    {
      "category": "Welfare & emergency",
      "item": "First aid kit",
      "inspection": "Contents check and restock",
      "every": 1,
      "unit": "months",
      "who": "Trained first aider",
      "basis": "Expiry dates and completeness"
    },
    {
      "category": "Welfare & emergency",
      "item": "Emergency eyewash station",
      "inspection": "Flush and function test",
      "every": 7,
      "unit": "days",
      "who": "Site supervisor",
      "basis": "Weekly activation to clear the line"
    },
    {
      "category": "Welfare & emergency",
      "item": "Emergency safety shower",
      "inspection": "Function test",
      "every": 7,
      "unit": "days",
      "who": "Site supervisor",
      "basis": "Weekly activation; annual flow and temperature test"
    },
    {
      "category": "Welfare & emergency",
      "item": "Automated external defibrillator (AED)",
      "inspection": "Status check",
      "every": 1,
      "unit": "months",
      "who": "Trained first aider",
      "basis": "Battery and pad expiry"
    },
    {
      "category": "Welfare & emergency",
      "item": "Spill response kit",
      "inspection": "Contents check",
      "every": 1,
      "unit": "months",
      "who": "Site supervisor",
      "basis": "Completeness after any use"
    },
    {
      "category": "Welfare & emergency",
      "item": "Stretcher and rescue equipment",
      "inspection": "Inspection",
      "every": 3,
      "unit": "months",
      "who": "Competent person",
      "basis": "Condition and availability"
    },
    {
      "category": "Welfare & emergency",
      "item": "Potable water supply",
      "inspection": "Quality test",
      "every": 3,
      "unit": "months",
      "who": "Accredited laboratory",
      "basis": "Microbiological and chemical"
    },
    {
      "category": "Welfare & emergency",
      "item": "Sanitary facilities",
      "inspection": "Inspection",
      "every": 1,
      "unit": "months",
      "who": "Site supervisor",
      "basis": "Provision against headcount and cleanliness"
    },
    {
      "category": "Mining & heavy industry",
      "item": "Winding engine / mine hoist",
      "inspection": "Statutory examination",
      "every": 1,
      "unit": "months",
      "who": "Competent engineer",
      "basis": "Daily rope inspection; statutory periodic examination"
    },
    {
      "category": "Mining & heavy industry",
      "item": "Winding rope",
      "inspection": "Non-destructive testing",
      "every": 6,
      "unit": "months",
      "who": "Specialist",
      "basis": "Rope condition; discard criteria"
    },
    {
      "category": "Mining & heavy industry",
      "item": "Main ventilation fan",
      "inspection": "Inspection and performance test",
      "every": 3,
      "unit": "months",
      "who": "Ventilation engineer",
      "basis": "Airflow against the ventilation plan"
    },
    {
      "category": "Mining & heavy industry",
      "item": "Ventilation survey (underground)",
      "inspection": "Survey",
      "every": 3,
      "unit": "months",
      "who": "Ventilation officer",
      "basis": "Airflow at each working face"
    },
    {
      "category": "Mining & heavy industry",
      "item": "Tailings facility instrumentation",
      "inspection": "Reading and review",
      "every": 1,
      "unit": "months",
      "who": "TSF engineer",
      "basis": "Piezometers, survey monuments, freeboard"
    },
    {
      "category": "Mining & heavy industry",
      "item": "Tailings storage facility",
      "inspection": "Dam safety inspection",
      "every": 12,
      "unit": "months",
      "who": "Engineer of Record",
      "basis": "Plus independent dam safety review at the set interval"
    },
    {
      "category": "Mining & heavy industry",
      "item": "Pit slope monitoring system",
      "inspection": "Verification",
      "every": 1,
      "unit": "months",
      "who": "Geotechnical engineer",
      "basis": "Instrument function and trigger levels"
    },
    {
      "category": "Mining & heavy industry",
      "item": "Explosives magazine",
      "inspection": "Inspection",
      "every": 1,
      "unit": "months",
      "who": "Magazine keeper",
      "basis": "Stock reconciliation, security and condition"
    },
    {
      "category": "Mining & heavy industry",
      "item": "Underground refuge chamber",
      "inspection": "Inspection and function test",
      "every": 1,
      "unit": "months",
      "who": "Competent person",
      "basis": "Air, water, seal and communications"
    },
    {
      "category": "Mining & heavy industry",
      "item": "Conveyor fire protection",
      "inspection": "Inspection and test",
      "every": 3,
      "unit": "months",
      "who": "Competent person",
      "basis": "Detection and suppression"
    },
    {
      "category": "Mining & heavy industry",
      "item": "Settling pond and silt trap",
      "inspection": "Inspection and desilting check",
      "every": 1,
      "unit": "months",
      "who": "Environmental officer",
      "basis": "Capacity before the rains"
    }
  ],

  // ---- Auto-calculations --------------------------------------------------
  // Quantity in, derived figure out. Every factor is visible and editable,
  // and every calculator states its basis — a compliance number whose
  // origin nobody can explain is worse than no number.
  calculators: [
    {
      "id": "ghg-fuel",
      "name": "Fuel burned → CO₂e",
      "group": "Emissions",
      "basis": "Combustion emission factors are approximately constant per litre or kg of fuel — they come from the fuel's carbon content, not from where it is burned. Figures here are widely used defaults; replace them with your national or supplier factor where you have one.",
      "inputs": [
        {
          "key": "qty",
          "label": "Quantity used",
          "unit": "unit of the fuel"
        },
        {
          "key": "factor",
          "label": "Emission factor",
          "unit": "kg CO₂e per unit",
          "default": 2.68,
          "factorTable": [
            {
              "name": "Diesel (gas oil)",
              "unit": "litres",
              "factor": 2.68
            },
            {
              "name": "Petrol / gasoline",
              "unit": "litres",
              "factor": 2.31
            },
            {
              "name": "Kerosene / jet fuel",
              "unit": "litres",
              "factor": 2.54
            },
            {
              "name": "Heavy fuel oil",
              "unit": "litres",
              "factor": 3.11
            },
            {
              "name": "LPG",
              "unit": "litres",
              "factor": 1.56
            },
            {
              "name": "LPG",
              "unit": "kg",
              "factor": 2.98
            },
            {
              "name": "Natural gas",
              "unit": "m³",
              "factor": 2.02
            },
            {
              "name": "Coal (bituminous)",
              "unit": "kg",
              "factor": 2.42
            },
            {
              "name": "Charcoal",
              "unit": "kg",
              "factor": 3.3
            }
          ]
        }
      ],
      "outputs": [
        {
          "key": "co2",
          "label": "CO₂e emitted",
          "unit": "kg",
          "expr": "qty * factor"
        },
        {
          "key": "t",
          "label": "CO₂e emitted",
          "unit": "tonnes",
          "expr": "qty * factor / 1000"
        }
      ],
      "note": "Scope 1 (direct) emissions. Fuel used by a contractor's plant on your site is usually yours to report as Scope 1 or 3 depending on operational control — decide once and be consistent."
    },
    {
      "id": "ghg-power",
      "name": "Grid electricity → CO₂e",
      "group": "Emissions",
      "basis": "Grid emission factors vary enormously by country and year — a hydro-dominated grid can be a tenth of a coal-dominated one. There is no safe default, so Verda will not supply one: enter the published factor for your grid and year.",
      "inputs": [
        {
          "key": "kwh",
          "label": "Electricity consumed",
          "unit": "kWh"
        },
        {
          "key": "factor",
          "label": "Grid emission factor",
          "unit": "kg CO₂e per kWh"
        }
      ],
      "outputs": [
        {
          "key": "co2",
          "label": "CO₂e emitted",
          "unit": "kg",
          "expr": "kwh * factor"
        },
        {
          "key": "t",
          "label": "CO₂e emitted",
          "unit": "tonnes",
          "expr": "kwh * factor / 1000"
        }
      ],
      "note": "Scope 2 (purchased energy). Use your utility's or national regulator's published factor and record which year it is from."
    },
    {
      "id": "ghg-intensity",
      "name": "Emissions intensity",
      "group": "Emissions",
      "basis": "Intensity makes periods comparable when production changes. Choose one denominator and keep it.",
      "inputs": [
        {
          "key": "co2",
          "label": "Total CO₂e",
          "unit": "tonnes"
        },
        {
          "key": "output",
          "label": "Production in the period",
          "unit": "unit of production"
        }
      ],
      "outputs": [
        {
          "key": "intensity",
          "label": "Emissions intensity",
          "unit": "t CO₂e per unit of production",
          "expr": "co2 / output"
        }
      ],
      "note": "State the denominator every time — tonnes of ore, m³ of concrete, units produced. An intensity figure without its denominator is meaningless."
    },
    {
      "id": "waste-mass",
      "name": "Waste volume → mass",
      "group": "Waste",
      "basis": "Waste is measured in skips and containers but reported and charged in tonnes. Densities vary with compaction and moisture — these are working defaults, and a weighbridge ticket beats any of them.",
      "inputs": [
        {
          "key": "vol",
          "label": "Volume",
          "unit": "m³"
        },
        {
          "key": "density",
          "label": "Bulk density",
          "unit": "t/m³",
          "default": 0.2,
          "factorTable": [
            {
              "name": "Mixed general waste (loose)",
              "unit": "t/m³",
              "factor": 0.2
            },
            {
              "name": "Mixed general waste (compacted)",
              "unit": "t/m³",
              "factor": 0.45
            },
            {
              "name": "Paper and cardboard (loose)",
              "unit": "t/m³",
              "factor": 0.1
            },
            {
              "name": "Plastics (loose)",
              "unit": "t/m³",
              "factor": 0.06
            },
            {
              "name": "Glass",
              "unit": "t/m³",
              "factor": 0.3
            },
            {
              "name": "Scrap metal",
              "unit": "t/m³",
              "factor": 0.6
            },
            {
              "name": "Timber / wood waste",
              "unit": "t/m³",
              "factor": 0.25
            },
            {
              "name": "Food / biodegradable",
              "unit": "t/m³",
              "factor": 0.5
            },
            {
              "name": "Construction rubble",
              "unit": "t/m³",
              "factor": 1.5
            },
            {
              "name": "Soil (contaminated, in situ)",
              "unit": "t/m³",
              "factor": 1.8
            },
            {
              "name": "Used oil",
              "unit": "t/m³",
              "factor": 0.88
            },
            {
              "name": "Sewage sludge (dewatered)",
              "unit": "t/m³",
              "factor": 1.0
            }
          ]
        }
      ],
      "outputs": [
        {
          "key": "mass",
          "label": "Mass",
          "unit": "tonnes",
          "expr": "vol * density"
        },
        {
          "key": "kg",
          "label": "Mass",
          "unit": "kg",
          "expr": "vol * density * 1000"
        }
      ],
      "note": "Where a weighbridge ticket exists, use it and record the ticket number — a calculated mass is an estimate and should be labelled as one."
    },
    {
      "id": "waste-diversion",
      "name": "Waste diversion rate",
      "group": "Waste",
      "basis": "The share of waste kept out of landfill. A headline sustainability figure, so define it the same way every period.",
      "inputs": [
        {
          "key": "recycled",
          "label": "Recycled, reused or recovered",
          "unit": "tonnes"
        },
        {
          "key": "total",
          "label": "Total waste generated",
          "unit": "tonnes"
        }
      ],
      "outputs": [
        {
          "key": "rate",
          "label": "Diversion from landfill",
          "unit": "%",
          "expr": "recycled / total * 100",
          "compare": {
            "good": "higher"
          }
        }
      ],
      "note": "State whether hazardous waste and tailings are in or out of the denominator — including mine waste makes the figure look very different."
    },
    {
      "id": "water-permit",
      "name": "Abstraction against permit limit",
      "group": "Water",
      "basis": "A permit sets a maximum abstraction, usually per day. Exceeding it is a licence breach, so the comparison should be automatic rather than noticed at audit.",
      "inputs": [
        {
          "key": "abstracted",
          "label": "Abstracted in the period",
          "unit": "m³"
        },
        {
          "key": "days",
          "label": "Days in the period",
          "unit": "days",
          "default": 30
        },
        {
          "key": "limit",
          "label": "Permitted daily limit",
          "unit": "m³/day"
        }
      ],
      "outputs": [
        {
          "key": "perday",
          "label": "Average daily abstraction",
          "unit": "m³/day",
          "expr": "abstracted / days"
        },
        {
          "key": "pct",
          "label": "Of permitted limit",
          "unit": "%",
          "expr": "(abstracted / days) / limit * 100",
          "compare": {
            "limit": 100,
            "good": "lower"
          }
        }
      ],
      "note": "An average within the limit can still hide a day that exceeded it. Where the permit is a daily cap, check the peak day too."
    },
    {
      "id": "water-percapita",
      "name": "Water use per person",
      "group": "Water",
      "basis": "Used to size supply and to sanity-check consumption against a camp's headcount.",
      "inputs": [
        {
          "key": "volume",
          "label": "Water supplied",
          "unit": "m³"
        },
        {
          "key": "people",
          "label": "People accommodated",
          "unit": "persons"
        },
        {
          "key": "days",
          "label": "Days",
          "unit": "days",
          "default": 30
        }
      ],
      "outputs": [
        {
          "key": "lpd",
          "label": "Consumption",
          "unit": "litres per person per day",
          "expr": "volume * 1000 / people / days"
        }
      ],
      "note": "Worker accommodation standards commonly expect a minimum supply per person per day — check the figure applicable in your jurisdiction and compare."
    },
    {
      "id": "limit-check",
      "name": "Monitoring result against a limit",
      "group": "Compliance",
      "basis": "Any measured parameter against its permitted or standard value. Works for effluent, stack emissions, noise, dust or occupational exposure.",
      "inputs": [
        {
          "key": "result",
          "label": "Measured result",
          "unit": "as measured"
        },
        {
          "key": "limit",
          "label": "Permit or standard limit",
          "unit": "same unit"
        }
      ],
      "outputs": [
        {
          "key": "pct",
          "label": "Of the limit",
          "unit": "%",
          "expr": "result / limit * 100",
          "compare": {
            "limit": 100,
            "good": "lower"
          }
        },
        {
          "key": "margin",
          "label": "Headroom to the limit",
          "unit": "in the unit you entered",
          "expr": "limit - result"
        }
      ],
      "note": "Verda compares two numbers you supply. It does not know your permit — enter the limit from the licence or the applicable standard, and record which."
    },
    {
      "id": "noise-exposure",
      "name": "Daily noise exposure (LEX,8h)",
      "group": "Occupational",
      "basis": "Noise dose depends on level and duration together: 3 dB more is twice the energy, so half the time gives the same dose (the 3 dB exchange rate used by ISO and most national standards).",
      "inputs": [
        {
          "key": "level",
          "label": "Measured level",
          "unit": "dB(A)"
        },
        {
          "key": "hours",
          "label": "Exposure duration",
          "unit": "hours",
          "default": 8
        }
      ],
      "outputs": [
        {
          "key": "lex",
          "label": "Daily exposure LEX,8h",
          "unit": "dB(A)",
          "expr": "level + 10 * log10(hours / 8)",
          "compare": {
            "limit": 85,
            "good": "lower"
          }
        }
      ],
      "note": "Compare against your national exposure limit — commonly 85 dB(A) for action and 87 dB(A) as a hard limit, but confirm locally. Above the action level, hearing protection and audiometry are usually mandatory."
    },
    {
      "id": "welfare",
      "name": "Welfare provision from headcount",
      "group": "Welfare",
      "basis": "Sanitation, water and first aid provision scale with headcount. Ratios differ by jurisdiction — these are common working ratios to be checked against your own regulations.",
      "inputs": [
        {
          "key": "people",
          "label": "People on site",
          "unit": "persons"
        },
        {
          "key": "perToilet",
          "label": "Persons per toilet",
          "unit": "persons",
          "default": 15
        },
        {
          "key": "litres",
          "label": "Drinking water per person per day",
          "unit": "litres",
          "default": 5
        },
        {
          "key": "perKit",
          "label": "Persons per first aid kit",
          "unit": "persons",
          "default": 50
        }
      ],
      "outputs": [
        {
          "key": "toilets",
          "label": "Toilets required",
          "unit": "units",
          "expr": "ceil(people / perToilet)"
        },
        {
          "key": "water",
          "label": "Drinking water per day",
          "unit": "litres",
          "expr": "people * litres"
        },
        {
          "key": "kits",
          "label": "First aid kits",
          "unit": "units",
          "expr": "ceil(people / perKit)"
        }
      ],
      "note": "Verify every ratio against the occupational safety regulations of the jurisdiction — the defaults here are typical, not authoritative, and several countries also set separate provision by sex."
    },
    {
      "id": "ppe-stock",
      "name": "PPE stock from headcount",
      "group": "Welfare",
      "basis": "Working out how much to hold and reorder, from headcount and replacement frequency.",
      "inputs": [
        {
          "key": "people",
          "label": "People needing the item",
          "unit": "persons"
        },
        {
          "key": "perYear",
          "label": "Replacements per person per year",
          "unit": "issues",
          "default": 4
        },
        {
          "key": "weeks",
          "label": "Reorder lead time",
          "unit": "weeks",
          "default": 6
        }
      ],
      "outputs": [
        {
          "key": "annual",
          "label": "Annual requirement",
          "unit": "units",
          "expr": "people * perYear"
        },
        {
          "key": "buffer",
          "label": "Minimum stock to hold",
          "unit": "units",
          "expr": "ceil(people * perYear * weeks / 52)"
        }
      ],
      "note": "Add a margin for new starters, visitors and damage; a stock-out is a stopped job or, worse, a job done without the PPE."
    },
    {
      "id": "first-aiders",
      "name": "First aiders and fire wardens",
      "group": "Welfare",
      "basis": "Trained-person provision scales with headcount and shift pattern.",
      "inputs": [
        {
          "key": "people",
          "label": "People per shift",
          "unit": "persons"
        },
        {
          "key": "perFirstAider",
          "label": "Persons per first aider",
          "unit": "persons",
          "default": 25
        },
        {
          "key": "perWarden",
          "label": "Persons per fire warden",
          "unit": "persons",
          "default": 50
        },
        {
          "key": "shifts",
          "label": "Shifts per day",
          "unit": "shifts",
          "default": 1
        }
      ],
      "outputs": [
        {
          "key": "firstAiders",
          "label": "First aiders needed",
          "unit": "persons",
          "expr": "ceil(people / perFirstAider) * shifts"
        },
        {
          "key": "wardens",
          "label": "Fire wardens needed",
          "unit": "persons",
          "expr": "ceil(people / perWarden) * shifts"
        }
      ],
      "note": "Cover every shift, not just days — and allow for leave and turnover, or the requirement quietly fails."
    },
    {
      "id": "ventilation",
      "name": "Underground airflow from diesel fleet",
      "group": "Mining",
      "basis": "Underground ventilation requirement is commonly set from the rated power of diesel equipment working in the area.",
      "inputs": [
        {
          "key": "kw",
          "label": "Diesel equipment rated power in the district",
          "unit": "kW"
        },
        {
          "key": "rate",
          "label": "Airflow required per kW",
          "unit": "m³/s per kW",
          "default": 0.06
        }
      ],
      "outputs": [
        {
          "key": "flow",
          "label": "Minimum airflow",
          "unit": "m³/s",
          "expr": "kw * rate"
        },
        {
          "key": "cfm",
          "label": "Minimum airflow",
          "unit": "m³/min",
          "expr": "kw * rate * 60"
        }
      ],
      "note": "The per-kW figure is set by national mining regulations and varies (commonly 0.05–0.08 m³/s per kW). Enter the rate your jurisdiction requires — and remember it is a minimum before heat, dust, gas and blasting fumes are considered."
    },
    {
      "id": "stockpile",
      "name": "Stockpile volume → tonnes",
      "group": "Mining",
      "basis": "Converting a surveyed or estimated stockpile into tonnage for reporting and reconciliation.",
      "inputs": [
        {
          "key": "vol",
          "label": "Stockpile volume",
          "unit": "m³"
        },
        {
          "key": "sg",
          "label": "Bulk density",
          "unit": "t/m³",
          "default": 1.6
        },
        {
          "key": "moisture",
          "label": "Moisture content",
          "unit": "%",
          "default": 5
        }
      ],
      "outputs": [
        {
          "key": "wet",
          "label": "Wet tonnes",
          "unit": "t",
          "expr": "vol * sg"
        },
        {
          "key": "dry",
          "label": "Dry tonnes",
          "unit": "t",
          "expr": "vol * sg * (1 - moisture / 100)"
        }
      ],
      "note": "Bulk density differs from in-situ density because of voids — use a measured bulk density where reporting matters."
    },
    {
      "id": "frequency-rate",
      "name": "Injury frequency rate",
      "group": "Safety",
      "basis": "Events per million hours worked — the ILO/international convention. Verda calculates these automatically in Analytics from the incident register; this calculator is for checking a figure by hand or converting someone else's.",
      "inputs": [
        {
          "key": "events",
          "label": "Events in the period",
          "unit": "count"
        },
        {
          "key": "hours",
          "label": "Hours worked",
          "unit": "hours"
        },
        {
          "key": "base",
          "label": "Exposure base",
          "unit": "hours",
          "default": 1000000
        }
      ],
      "outputs": [
        {
          "key": "rate",
          "label": "Frequency rate",
          "unit": "per exposure base",
          "expr": "events / hours * base"
        }
      ],
      "note": "Set the base to 1,000,000 for the ILO convention or 200,000 for US OSHA practice. The same performance gives a number five times smaller on the OSHA base — never compare the two without converting."
    }
  ],

  // ---- Wetland & sensitive-area spatial data ------------------------------
  // Verda does NOT ship wetland boundaries. It cannot: national wetland
  // boundaries are held by the agencies below, they are large, they are
  // licensed, and they change. Shipping a plausible-looking polygon would be
  // worse than shipping none — someone would screen a site against invented
  // geometry and conclude "no wetland here" when there is one.
  //
  // What Verda does instead: names where the authoritative layer comes from,
  // and lets you load the layer you obtained and screen your coordinates
  // against it (Maps → Sensitive areas).
  wetlandSourcesGlobal: [
    {
      "name": "Ramsar Sites Information Service (RSIS)",
      "what": "Designated Ramsar wetland sites — boundaries where digitised, otherwise centroids. The definitive source for internationally important wetlands.",
      "url": "https://rsis.ramsar.org/",
      "format": "Shapefile, KML/KMZ",
      "licence": "Open access from the Ramsar Secretariat; check the terms on the download page",
      "note": "Only some sites have boundary polygons; the rest are point centroids. A centroid is not a boundary and must not be screened against as if it were."
    },
    {
      "name": "Global Mangrove Watch",
      "what": "Mangrove extent and change, globally, by year",
      "url": "https://www.globalmangrovewatch.org/",
      "format": "Shapefile, GeoTIFF",
      "licence": "Open, attribution required",
      "note": "Relevant to coastal Tanzania and Kenya; not to landlocked Uganda, Zambia or inland DRC."
    },
    {
      "name": "Global Lakes and Wetlands Database (GLWD)",
      "what": "Global wetland and lake extent, coarse resolution",
      "url": "https://www.worldwildlife.org/pages/global-lakes-and-wetlands-database",
      "format": "Shapefile, raster",
      "licence": "Free for non-commercial use — check before using in a paid assignment",
      "note": "Coarse. Useful for orientation and desk screening, never for a boundary determination."
    },
    {
      "name": "Copernicus / ESA WorldCover",
      "what": "Global land cover at 10 m including herbaceous wetland and mangrove classes",
      "url": "https://esa-worldcover.org/",
      "format": "GeoTIFF",
      "licence": "CC BY 4.0",
      "note": "Land cover class, not a legal wetland boundary — the two are different things and regulators treat them differently."
    },
    {
      "name": "Protected Planet (WDPA)",
      "what": "World Database on Protected Areas — many wetlands sit inside protected areas",
      "url": "https://www.protectedplanet.net/",
      "format": "Shapefile, geodatabase",
      "licence": "Free with attribution; commercial use has conditions",
      "note": "Screen against protected areas as well as wetlands — the overlap is often what triggers a permit."
    }
  ],

  wetlandSourcesByCountry: {
    "ug": [
      {
        "name": "Wetlands Management Department, Ministry of Water & Environment",
        "what": "The national wetlands inventory and wetland boundary data for Uganda. The authoritative source for a wetland determination.",
        "url": "https://www.mwe.go.ug/",
        "format": "Request from the Department",
        "licence": "Government data — request in writing; conditions apply",
        "note": "Uganda's wetland boundaries are held by the Wetlands Management Department. The 1996 national land-cover wetland layer circulates widely and is badly out of date — do not screen against it."
      },
      {
        "name": "NEMA Uganda",
        "what": "Environmental sensitivity and ESIA-related spatial data",
        "url": "https://www.nema.go.ug/",
        "format": "Request",
        "licence": "Government data",
        "note": "NEMA is the approving authority for a wetland-affecting project, so their determination is the one that counts."
      },
      {
        "name": "Uganda Wetlands Atlas (UNEP/UNDP with Government of Uganda)",
        "what": "Published mapping of wetland location and condition, Volumes I and II",
        "url": "https://www.unep.org/resources/report/uganda-wetlands-atlas-volume-i",
        "format": "PDF atlas",
        "licence": "Open publication",
        "note": "An atlas, not a GIS layer. Good for context and for citing in an ESIA; not a substitute for surveyed boundaries."
      }
    ],
    "ke": [
      {
        "name": "NEMA Kenya",
        "what": "Environmental spatial data and the wetland regulations regime",
        "url": "https://www.nema.go.ke/",
        "format": "Request",
        "licence": "Government data",
        "note": "The Environmental Management and Co-ordination (Wetlands, River Banks, Lake Shores and Sea Shore Management) Regulations govern wetland works — the setback distances matter as much as the boundary."
      },
      {
        "name": "Kenya Wildlife Service / Kenya Forest Service",
        "what": "Protected area and forest reserve boundaries, which frequently contain wetlands",
        "url": "https://www.kws.go.ke/",
        "format": "Request",
        "licence": "Government data",
        "note": "Check both — a wetland inside a protected area attracts two consent regimes."
      },
      {
        "name": "Water Resources Authority",
        "what": "Catchment, riparian and water resource spatial data",
        "url": "https://wra.go.ke/",
        "format": "Request",
        "licence": "Government data",
        "note": "Riparian reserve widths are set in law and are the most commonly breached setback on construction sites."
      }
    ],
    "tz": [
      {
        "name": "NEMC Tanzania",
        "what": "Environmental spatial data and EIA determinations",
        "url": "https://www.nemc.or.tz/",
        "format": "Request",
        "licence": "Government data",
        "note": "Tanzania's Environmental Management Act sets a 60 m protected zone from the highest water mark of rivers, dams and lakes — screen against that, not only against the wetland polygon."
      },
      {
        "name": "Ministry of Water / Basin Water Boards",
        "what": "Basin, wetland and water resource data by basin",
        "url": "https://www.maji.go.tz/",
        "format": "Request from the relevant Basin Water Board",
        "licence": "Government data",
        "note": "Data is held by basin, not nationally — identify which Basin Water Board covers your site first."
      },
      {
        "name": "Global Mangrove Watch — Tanzania coast",
        "what": "Mangrove extent along the Tanzanian coastline",
        "url": "https://www.globalmangrovewatch.org/",
        "format": "Shapefile",
        "licence": "Open, attribution",
        "note": "Mangrove clearance is separately prohibited and prosecuted; treat it as a red flag, not a constraint to be mitigated."
      }
    ],
    "cd": [
      {
        "name": "Agence Congolaise de l'Environnement (ACE)",
        "what": "Données environnementales et instruction des EIES",
        "url": "https://www.ace.gouv.cd/",
        "format": "Sur demande",
        "licence": "Données publiques",
        "note": "La RDC abrite les tourbières de la Cuvette Centrale — parmi les plus vastes zones humides tropicales du monde et un stock de carbone majeur. Toute activité y touchant appelle une vigilance particulière."
      },
      {
        "name": "Ramsar — RDC",
        "what": "Sites Ramsar désignés en RDC, dont la Cuvette Centrale",
        "url": "https://rsis.ramsar.org/",
        "format": "Shapefile, KML",
        "licence": "Accès libre",
        "note": "Le site Ramsar de la Cuvette Centrale est l'un des plus étendus au monde — vérifier systématiquement le chevauchement."
      },
      {
        "name": "CongoPeat / peatland research datasets",
        "what": "Peatland extent mapping for the Cuvette Centrale",
        "url": "https://congopeat.net/",
        "format": "Research datasets",
        "licence": "Research use — check terms",
        "note": "Research data, not a regulatory boundary. Cite it as evidence, do not present it as a legal determination."
      }
    ],
    "zm": [
      {
        "name": "ZEMA",
        "what": "Environmental spatial data and EIA/EPB determinations",
        "url": "https://www.zema.org.zm/",
        "format": "Request",
        "licence": "Government data",
        "note": "Zambia's major wetlands — the Kafue Flats, Bangweulu, Barotse floodplain, Lukanga and Busanga swamps — are Ramsar designated. Check RSIS as well as ZEMA."
      },
      {
        "name": "Water Resources Management Authority (WARMA)",
        "what": "Catchment and water resource spatial data",
        "url": "https://warma.org.zm/",
        "format": "Request",
        "licence": "Government data",
        "note": "Abstraction from or discharge to a wetland system needs a WARMA permit independently of any ZEMA decision."
      },
      {
        "name": "Department of National Parks and Wildlife / Forestry",
        "what": "Protected area and forest reserve boundaries",
        "url": "https://www.mtn.gov.zm/",
        "format": "Request",
        "licence": "Government data",
        "note": "Several Zambian wetlands are Game Management Areas — a separate consent regime again."
      }
    ],
    "rw": [
        {
          "name": "REMA",
          "what": "Wetland, environmental and assessment spatial data",
          "url": "https://www.rema.gov.rw/",
          "format": "Request",
          "licence": "Government data",
          "note": "Rwanda's wetlands are regulated tightly and some are designated Ramsar sites — the Rugezi Marsh among them. Check the Ramsar Sites Information Service for the current designated list as well as REMA."
        },
        {
          "name": "Rwanda Water Resources Board (RWB)",
          "what": "Catchment boundaries and water resource data",
          "url": "https://waterportal.rwb.rw/",
          "format": "Portal / request",
          "licence": "Government data",
          "note": "Abstraction from or discharge to a wetland needs an RWB water use permit independently of any REMA decision."
        },
        {
          "name": "Rwanda Development Board (RDB)",
          "what": "National park boundaries — Volcanoes, Akagera, Nyungwe",
          "url": "https://rdb.rw/",
          "format": "Request",
          "licence": "Government data",
          "note": "RDB manages the national parks, so proximity to one is a separate consent question from the EIA itself."
        }
      ]
  },

  // ---- Statutory officer roles --------------------------------------------
  // The posts that exist, what each is responsible for, and where the current
  // holder sits. Verda deliberately ships NO names, numbers or email
  // addresses: these are individual public servants who transfer constantly,
  // a fabricated or stale contact in a submitted report is worse than a blank,
  // and publishing officials' personal details is not ours to do. Record the
  // people you actually deal with in the contacts register, which tracks when
  // each was last verified.
  officerRoles: {
    "ug": [
      {
        "role": "District Environment Officer (DEO)",
        "level": "District",
        "remit": "Environmental compliance, ESIA input, inspection and enforcement within the district; NEMA's local counterpart.",
        "find": "District local government headquarters — Natural Resources Department"
      },
      {
        "role": "District Natural Resources Officer (DNRO)",
        "level": "District",
        "remit": "Heads the Natural Resources Department; wetlands, forestry, environment and lands coordination.",
        "find": "District local government headquarters"
      },
      {
        "role": "District Physical Planner",
        "level": "District",
        "remit": "Physical development plans and development control under the Physical Planning Act; sits on the District Physical Planning Committee.",
        "find": "District local government — Physical Planning Department"
      },
      {
        "role": "District Forestry Officer",
        "level": "District",
        "remit": "Forest reserves, tree cover, timber movement permits.",
        "find": "District local government / National Forestry Authority range office"
      },
      {
        "role": "District Water Officer",
        "level": "District",
        "remit": "Water supply and abstraction at district level; liaison with DWRM.",
        "find": "District local government"
      },
      {
        "role": "Sub-county Environment Focal Person",
        "level": "Sub-county",
        "remit": "First point of contact for site-level environmental issues and community complaints.",
        "find": "Sub-county headquarters"
      },
      {
        "role": "Community Development Officer (CDO)",
        "level": "District / Sub-county",
        "remit": "Community engagement, grievance handling, vulnerable groups.",
        "find": "District or sub-county local government"
      }
    ],
    "ke": [
      {
        "role": "County Director of Environment (NEMA)",
        "level": "County",
        "remit": "NEMA's county office; EIA processing, compliance inspection, enforcement notices.",
        "find": "NEMA county office"
      },
      {
        "role": "County Environment Officer",
        "level": "County",
        "remit": "County government environment function; waste, county-level environmental management.",
        "find": "County government — Department of Environment"
      },
      {
        "role": "County Director of Physical Planning",
        "level": "County",
        "remit": "Physical and land use planning, development applications and change of user under the Physical and Land Use Planning Act.",
        "find": "County government — Lands and Physical Planning"
      },
      {
        "role": "County Director of Natural Resources",
        "level": "County",
        "remit": "Natural resource management, forests and water at county level.",
        "find": "County government"
      },
      {
        "role": "Sub-County Environment Officer",
        "level": "Sub-county",
        "remit": "Local inspection and complaints.",
        "find": "Sub-county administration office"
      },
      {
        "role": "County Environment Committee",
        "level": "County",
        "remit": "Statutory committee under EMCA advising on county environmental matters.",
        "find": "County government secretariat"
      }
    ],
    "tz": [
      {
        "role": "District / Town Environment Management Officer",
        "level": "District / Town Council",
        "remit": "Statutory post under the Environmental Management Act 2004 — coordinates environmental protection across the council area; must hold a relevant degree or diploma.",
        "find": "District or Town Council headquarters"
      },
      {
        "role": "Ward Environment Management Officer",
        "level": "Ward",
        "remit": "Designated officer coordinating environmental protection in the ward.",
        "find": "Ward executive office"
      },
      {
        "role": "Village / Mtaa Environment Management Officer",
        "level": "Village / Mtaa",
        "remit": "Village-level environmental coordination; works with the Village Environment Committee.",
        "find": "Village executive office"
      },
      {
        "role": "District Natural Resources Officer",
        "level": "District",
        "remit": "Forestry, wildlife, beekeeping and natural resource management.",
        "find": "District Council — Natural Resources Department"
      },
      {
        "role": "Town / District Planner",
        "level": "District / Town Council",
        "remit": "Urban planning and development control under the Urban Planning Act.",
        "find": "Council — Urban Planning Department"
      },
      {
        "role": "District Land Officer",
        "level": "District",
        "remit": "Land allocation, titles and land use conflicts.",
        "find": "District Council — Lands Department"
      }
    ],
    "cd": [
      {
        "role": "Coordonnateur Provincial de l'Environnement",
        "level": "Province",
        "remit": "Coordination de l'application de la réglementation environnementale dans la province.",
        "find": "Coordination Provinciale de l'Environnement"
      },
      {
        "role": "Chef de Division Provinciale de l'Environnement",
        "level": "Province",
        "remit": "Division provinciale du MEDD — inspection et suivi environnemental.",
        "find": "Division Provinciale de l'Environnement"
      },
      {
        "role": "Superviseur / Inspecteur environnemental",
        "level": "Territoire",
        "remit": "Inspection de terrain et constats.",
        "find": "Bureau du Territoire"
      },
      {
        "role": "Chef de Division de l'Urbanisme et Habitat",
        "level": "Province",
        "remit": "Urbanisme, permis de bâtir et contrôle du développement.",
        "find": "Division Provinciale de l'Urbanisme et Habitat"
      },
      {
        "role": "Administrateur de Territoire",
        "level": "Territoire",
        "remit": "Autorité administrative territoriale — interlocuteur pour l'accès et les relations communautaires.",
        "find": "Bureau du Territoire"
      },
      {
        "role": "Agent DPEM (projets miniers)",
        "level": "Province",
        "remit": "Suivi environnemental spécifique au secteur minier.",
        "find": "Direction de Protection de l'Environnement Minier"
      }
    ],
    "zm": [
      {
        "role": "ZEMA Regional Inspector",
        "level": "Region / Province",
        "remit": "ZEMA regional office; licensing support, inspection and enforcement.",
        "find": "ZEMA regional office"
      },
      {
        "role": "District Environmental Officer / Council Environmental Health Officer",
        "level": "District Council",
        "remit": "District-level environmental health, waste and nuisance control.",
        "find": "District Council"
      },
      {
        "role": "District Planning Officer / Physical Planner",
        "level": "District Council",
        "remit": "Development control and planning permission under the Urban and Regional Planning Act.",
        "find": "District Council — Planning Department"
      },
      {
        "role": "District Forestry Officer",
        "level": "District",
        "remit": "Forest reserves, tree licences, charcoal control.",
        "find": "Forestry Department district office"
      },
      {
        "role": "WARMA Catchment Officer",
        "level": "Catchment",
        "remit": "Water abstraction and discharge permitting in the catchment.",
        "find": "WARMA catchment or regional office"
      },
      {
        "role": "Mine Safety Inspector",
        "level": "National / regional",
        "remit": "Mine safety inspection under the Mines and Minerals Development Act.",
        "find": "Mine Safety Department, Ministry of Mines"
      }
    ],
    "rw": [
        {
          "role": "District Environmental Officer",
          "level": "District",
          "remit": "District-level environmental compliance, inspection and nuisance control.",
          "find": "District office"
        },
        {
          "role": "REMA Environmental Inspector",
          "level": "National",
          "remit": "REMA inspection and enforcement; assessment and audit compliance.",
          "find": "REMA head office"
        },
        {
          "role": "District Urban Planner / One Stop Centre officer",
          "level": "District",
          "remit": "Development control, building and construction permits through the district One Stop Centre.",
          "find": "District One Stop Centre"
        },
        {
          "role": "District Forest and Natural Resources Officer",
          "level": "District",
          "remit": "Forest reserves, tree cutting authorisation, natural resource use.",
          "find": "District office / RFA"
        },
        {
          "role": "RWB Catchment Officer",
          "level": "Catchment",
          "remit": "Water use permitting and catchment management.",
          "find": "RWB catchment office"
        },
        {
          "role": "Labour Inspector",
          "level": "District / national",
          "remit": "Labour inspection, occupational safety and health, workplace safety committees.",
          "find": "MIFOTRA / district labour inspectorate"
        },
        {
          "role": "Mine Inspector",
          "level": "National",
          "remit": "Mine and quarry inspection, licence conditions, blasting.",
          "find": "RMB"
        }
      ]
  },

  // ---- Audit protocols -----------------------------------------------------
  // Audit types beyond the per-sector EHS checklist: management system audits
  // against the Annex SL clause structure the standards share, compliance and
  // readiness audits, and the subject-specific protocols (tailings,
  // accommodation, contractor) where the consequence of missing something is
  // highest. `basis` says why the protocol is shaped the way it is.
  auditProtocols: [
    {
      "id": "iso45001",
      "name": "Management system audit — ISO 45001",
      "group": "Management system",
      "scope": "The OH&S management system against the standard's clauses",
      "basis": "ISO 45001 follows the Annex SL structure: clauses 4 to 10. Auditing clause by clause is how a certification body will do it.",
      "sections": [
        {
          "title": "4. Context of the organisation",
          "items": [
            "Internal and external issues affecting the OH&S system are identified and reviewed",
            "Interested parties and their relevant requirements are determined",
            "Scope of the management system is documented and defensible",
            "Processes and their interactions are defined"
          ]
        },
        {
          "title": "5. Leadership and worker participation",
          "items": [
            "Top management demonstrates leadership, not just sign-off",
            "OH&S policy is current, communicated and available to interested parties",
            "Roles, responsibilities and authorities are assigned and understood",
            "Workers are consulted on hazard identification and controls",
            "Workers participate through a functioning committee with minutes",
            "Barriers to participation (language, literacy, fear of reprisal) are removed"
          ]
        },
        {
          "title": "6. Planning",
          "items": [
            "Hazard identification is ongoing, not a one-off exercise",
            "Risks and opportunities are assessed and recorded",
            "Legal and other requirements are identified and kept current",
            "OH&S objectives are measurable and have plans to achieve them"
          ]
        },
        {
          "title": "7. Support",
          "items": [
            "Resources for the system are determined and provided",
            "Competence requirements are defined and evidenced per role",
            "Workers are aware of the policy, hazards and their right to remove themselves from danger",
            "Communication is planned: what, when, to whom, how",
            "Documented information is controlled, versioned and available where used"
          ]
        },
        {
          "title": "8. Operation",
          "items": [
            "Operational controls follow the hierarchy: elimination before PPE",
            "Management of change is applied before changes take effect",
            "Procurement controls extend OH&S requirements to what is bought",
            "Contractors are coordinated and their workers covered",
            "Outsourced functions are controlled",
            "Emergency preparedness is planned, tested and revised after tests"
          ]
        },
        {
          "title": "9. Performance evaluation",
          "items": [
            "Monitoring and measurement is defined, with calibrated equipment",
            "Compliance with legal requirements is evaluated and recorded",
            "Internal audits cover the whole system on a programme",
            "Management review is held at planned intervals with the required inputs"
          ]
        },
        {
          "title": "10. Improvement",
          "items": [
            "Incidents and nonconformities are investigated to root cause",
            "Corrective actions address the cause, not the symptom",
            "Effectiveness of corrective action is verified",
            "Continual improvement is demonstrable in the data"
          ]
        }
      ]
    },
    {
      "id": "iso14001",
      "name": "Management system audit — ISO 14001",
      "group": "Management system",
      "scope": "The environmental management system against the standard's clauses",
      "basis": "ISO 14001 shares the Annex SL clause structure with ISO 45001, so a combined audit is normal — the evidence differs, the structure does not.",
      "sections": [
        {
          "title": "4. Context",
          "items": [
            "Environmental conditions affected by, and affecting, the organisation are understood",
            "Interested parties' environmental requirements are determined",
            "Scope includes the activities, products and services with environmental aspects"
          ]
        },
        {
          "title": "5. Leadership",
          "items": [
            "Environmental policy includes commitment to protection and to compliance",
            "Policy is available to interested parties, not just internally",
            "Responsibilities for the EMS are assigned"
          ]
        },
        {
          "title": "6. Planning",
          "items": [
            "Environmental aspects are identified across the life cycle",
            "Significance criteria are defined and applied consistently",
            "Compliance obligations are identified and accessible",
            "Environmental objectives are set with plans, resources and timeframes"
          ]
        },
        {
          "title": "7. Support",
          "items": [
            "Competence for those whose work affects environmental performance is evidenced",
            "Awareness extends to the consequences of not conforming",
            "Internal and external communication on environmental matters is planned"
          ]
        },
        {
          "title": "8. Operation",
          "items": [
            "Operational controls are established for significant aspects",
            "Life-cycle perspective is applied to design, procurement and end of life",
            "Requirements are communicated to external providers and contractors",
            "Emergency preparedness covers environmental release scenarios"
          ]
        },
        {
          "title": "9. Performance evaluation",
          "items": [
            "Monitoring covers the parameters the obligations require",
            "Compliance evaluation is documented with its frequency defined",
            "Internal audit programme covers the EMS"
          ]
        },
        {
          "title": "10. Improvement",
          "items": [
            "Nonconformities including releases are corrected and investigated",
            "Improvement in environmental performance is demonstrable"
          ]
        }
      ]
    },
    {
      "id": "legal",
      "name": "Legal compliance audit",
      "group": "Compliance",
      "scope": "Every permit, licence and statutory duty applicable to the site",
      "basis": "Built around the jurisdiction register in Checklists. Compliance evaluation at a defined frequency is itself a requirement of both ISO standards.",
      "sections": [
        {
          "title": "Permits and approvals",
          "items": [
            "Every required permit is identified for the activities actually carried out",
            "Each permit is current and held on site",
            "Permit conditions are extracted into a trackable register",
            "Each condition has an owner and evidence of compliance",
            "Renewals are diarised with enough lead time to complete them",
            "Variations and changes of scope have been notified where required"
          ]
        },
        {
          "title": "Reporting obligations",
          "items": [
            "Periodic returns to the regulator are submitted on time",
            "Monitoring results are reported at the required frequency",
            "Incident notification thresholds are known and have been met",
            "Annual environmental audit or equivalent has been submitted"
          ]
        },
        {
          "title": "Statutory registrations",
          "items": [
            "Workplace or factory registration is current",
            "Statutory examinations of plant are in date",
            "Professional registrations of practitioners are current",
            "Workers' compensation insurance covers the actual headcount"
          ]
        },
        {
          "title": "Enforcement history",
          "items": [
            "Improvement or prohibition notices are closed out",
            "Prosecutions or penalties are disclosed and their conditions met",
            "Regulator correspondence is filed and actioned"
          ]
        }
      ]
    },
    {
      "id": "contractor",
      "name": "Sub-contractor audit",
      "group": "Contractor management",
      "scope": "A sub-contractor's own arrangements, on their work, on your site",
      "basis": "A principal is answerable for the people its contractors bring on site, so this is audited on evidence, not on assurances.",
      "sections": [
        {
          "title": "Documentation and status",
          "items": [
            "Pre-qualification is current and any conditions are being met",
            "Insurance covers the scope and the actual headcount",
            "Bridging document is signed and understood by both parties",
            "Sub-sub-contracting is within what was agreed"
          ]
        },
        {
          "title": "Workers",
          "items": [
            "Every worker on site appears on their register",
            "Contracts, wages and hours comply with the labour code",
            "No worker is under the legal minimum age",
            "Induction and task training records exist for each worker",
            "Competence certificates verified for licensed tasks",
            "Their workers can raise a grievance without going through their supervisor"
          ]
        },
        {
          "title": "On the job",
          "items": [
            "Risk assessments and method statements match the work being done",
            "Permits are obtained and followed",
            "PPE is supplied by them, correct and worn",
            "Plant and equipment certification is current and on site",
            "Housekeeping and waste segregation in their areas"
          ]
        },
        {
          "title": "Performance",
          "items": [
            "Their incidents are reported to you, including near-misses",
            "Their hours are reported so their rates can be calculated separately",
            "Previous audit findings are closed",
            "Their own supervision is present during work"
          ]
        }
      ]
    },
    {
      "id": "accommodation",
      "name": "Workers' accommodation audit",
      "group": "Welfare",
      "scope": "Camps, guest houses and any accommodation provided to workers",
      "basis": "Assessed against the IFC/EBRD workers' accommodation guidance, which lenders apply directly.",
      "sections": [
        {
          "title": "Space and sleeping",
          "items": [
            "Floor area per person meets the standard",
            "Beds are not shared or hot-bedded",
            "Rooms have natural light and ventilation",
            "Lockable personal storage per worker",
            "Separate accommodation for women with lockable access"
          ]
        },
        {
          "title": "Sanitation and water",
          "items": [
            "Toilets and showers meet the ratio per person, separated by sex",
            "Water supply is potable and tested at the required frequency",
            "Adequate water quantity per person per day",
            "Laundry facilities are provided",
            "Waste water is disposed of without creating a nuisance"
          ]
        },
        {
          "title": "Food and kitchens",
          "items": [
            "Kitchens are separated from sleeping areas",
            "Food handlers have current health certificates",
            "Cold chain and temperature records are kept",
            "Pest control programme operates with records",
            "Dining space is adequate for the shift pattern"
          ]
        },
        {
          "title": "Safety and welfare",
          "items": [
            "Fire detection, extinguishers and marked escape routes",
            "Evacuation drill has been held in the accommodation itself",
            "Electrical installation inspected and safe",
            "First aid provision and access to medical care",
            "Rest and recreation space provided",
            "Workers are free to leave the accommodation outside working hours",
            "Accommodation is not a condition of employment in a way that traps workers"
          ]
        }
      ]
    },
    {
      "id": "tsf",
      "name": "Tailings facility audit",
      "group": "Mining & heavy industry",
      "scope": "The tailings storage facility, its governance and its surveillance",
      "basis": "Structured around the Global Industry Standard on Tailings Management. A TSF failure is the highest-consequence event most mines carry.",
      "sections": [
        {
          "title": "Governance and accountability",
          "items": [
            "Engineer of Record is appointed in writing and currently engaged",
            "Accountable Executive is named and understands the role",
            "Responsible Tailings Facility Engineer is appointed on site",
            "Independent review has been carried out at the required interval",
            "Review findings are tracked to closure with dates"
          ]
        },
        {
          "title": "Design and knowledge base",
          "items": [
            "Design basis report is current for the facility as it now stands",
            "Site characterisation covers geotechnical, hydrological and seismic conditions",
            "Consequence classification is current and justified",
            "Deposition plan matches what is actually being deposited"
          ]
        },
        {
          "title": "Operation and surveillance",
          "items": [
            "Freeboard and beach width are within design at all times",
            "Instrumentation is installed, read on schedule and trending reviewed",
            "Trigger action response plan exists with defined trigger levels",
            "Water balance is maintained and reconciled",
            "Surveillance inspections are recorded with photographs",
            "Seepage and drainage performance are monitored"
          ]
        },
        {
          "title": "Emergency and closure",
          "items": [
            "Emergency preparedness and response plan covers a breach scenario",
            "Downstream communities are identified, informed and involved in planning",
            "Inundation mapping has been carried out",
            "Closure plan exists and is costed",
            "Financial assurance for closure is in place at current value"
          ]
        }
      ]
    },
    {
      "id": "emergency",
      "name": "Emergency preparedness audit",
      "group": "Safety",
      "scope": "The emergency plan as it would actually perform, not as written",
      "basis": "Audited against the scenarios the site genuinely faces, drawn from the risk register.",
      "sections": [
        {
          "title": "Planning",
          "items": [
            "Emergency plan covers every credible scenario for this site",
            "Roles are assigned by post, not by name, and cover every shift",
            "Contact lists are current and have been called to test",
            "External responders know the site and its hazards",
            "Plan is available where an emergency would start, not only in the office"
          ]
        },
        {
          "title": "Equipment and provision",
          "items": [
            "Alarm is audible everywhere including high-noise areas",
            "Assembly points are suitable, signed and reachable",
            "Firefighting equipment is in place, serviced and accessible",
            "First aid and medical equipment is stocked and in date",
            "Emergency vehicles are available and maintained",
            "Rescue equipment matches the rescue scenarios identified"
          ]
        },
        {
          "title": "Competence",
          "items": [
            "Emergency team members are trained and their training is current",
            "First aiders cover every shift and location",
            "Wardens know their sweep areas",
            "Workers know what to do on hearing the alarm"
          ]
        },
        {
          "title": "Testing and learning",
          "items": [
            "Drills cover the full range of scenarios over the cycle",
            "Drills include night shift and contractors",
            "Times are recorded: alarm, assembly, roll call complete",
            "Debriefs are held and gaps recorded",
            "The plan has actually been revised as a result of a drill"
          ]
        }
      ]
    },
    {
      "id": "waste",
      "name": "Waste management audit",
      "group": "Environment",
      "scope": "The waste stream end to end: generation, storage, transfer, disposal",
      "basis": "The audit follows the waste, not the paperwork — the paperwork is checked against where the waste actually went.",
      "sections": [
        {
          "title": "Segregation and storage",
          "items": [
            "Segregation happens at the point of generation",
            "Containers are labelled, correct and not overfilled",
            "Hazardous waste is stored on impermeable bunded hardstanding, under cover",
            "Incompatible wastes are stored apart",
            "Storage time limits are observed",
            "Areas are secure from scavenging and from weather"
          ]
        },
        {
          "title": "Transfer and disposal",
          "items": [
            "Carrier licences are verified and current for each stream",
            "Receiving facility licences are verified",
            "Waste transfer notes are complete, signed and retained",
            "Quantities reconcile between generation, transfer and receipt",
            "The disposal route has been physically verified at least once"
          ]
        },
        {
          "title": "Minimisation and reporting",
          "items": [
            "Waste quantities are recorded by stream with a running total",
            "Diversion from landfill is measured and defined consistently",
            "Reduction opportunities have been identified and acted on",
            "Waste data is reported to the regulator where required"
          ]
        }
      ]
    },
    {
      "id": "ptw-audit",
      "name": "Permit to work system audit",
      "group": "Safety",
      "scope": "Whether the permit system works in practice, not whether forms exist",
      "basis": "Audited by following live permits into the field — a permit file that looks perfect and a job site that does not is the finding.",
      "sections": [
        {
          "title": "System design",
          "items": [
            "Permit types cover every high-risk activity on site",
            "Issuers and receivers are authorised and trained",
            "Authorisation limits are defined and respected",
            "Cross-referencing between simultaneous permits is required"
          ]
        },
        {
          "title": "Live permits in the field",
          "items": [
            "The work being done matches the work described on the permit",
            "Isolations described on the permit are physically in place",
            "Gas tests were done and recorded at the stated intervals",
            "Every worker on the job has been briefed and signed on",
            "Standby and rescue arrangements are physically present",
            "The permit is at the worksite, not in the office"
          ]
        },
        {
          "title": "Close-out",
          "items": [
            "Permits are closed properly, not abandoned",
            "Isolations are removed under control",
            "Area is handed back in a safe state",
            "Expired permits are not still being worked to"
          ]
        }
      ]
    },
    {
      "id": "hygiene",
      "name": "Camp hygiene and food safety audit",
      "group": "Welfare",
      "scope": "Kitchens, canteens, water supply and sanitation",
      "basis": "Foodborne illness on a remote site takes out a shift, and there is nowhere to send people.",
      "sections": [
        {
          "title": "Food handling",
          "items": [
            "Food handlers hold current health certificates",
            "Hand washing facilities with soap at the point of need",
            "Raw and cooked food separated at every stage",
            "Cooking and holding temperatures recorded",
            "Cold chain maintained with alarms on the fridges",
            "Leftovers policy is defined and followed"
          ]
        },
        {
          "title": "Premises",
          "items": [
            "Kitchen surfaces are cleanable and in good repair",
            "Extraction is cleaned on schedule",
            "Pest control with a current map and bait records",
            "Waste is removed frequently and stored away from food",
            "Cleaning schedule is signed off, not just posted"
          ]
        },
        {
          "title": "Water and sanitation",
          "items": [
            "Drinking water is tested at the required frequency",
            "Water storage tanks are cleaned and covered",
            "Toilets are clean, stocked and maintained",
            "Sewage disposal does not contaminate water sources"
          ]
        }
      ]
    },
    {
      "id": "premob",
      "name": "Pre-mobilisation readiness audit",
      "group": "Compliance",
      "scope": "Whether the site is ready for work to start at all",
      "basis": "Run before first mobilisation. Every line here is something that is expensive to fix once work has started.",
      "sections": [
        {
          "title": "Approvals in place",
          "items": [
            "Environmental approval issued and conditions extracted",
            "Construction or operating permit in hand",
            "Land access and wayleaves settled",
            "Workplace registration completed"
          ]
        },
        {
          "title": "Site establishment",
          "items": [
            "Site boundary defined and marked against the approved footprint",
            "Access road and traffic arrangements agreed",
            "Welfare, sanitation and water provision in place before workers arrive",
            "Waste storage and removal arrangements contracted",
            "Fuel and chemical storage bunded before delivery"
          ]
        },
        {
          "title": "People and systems",
          "items": [
            "EHS resource appointed and on site",
            "Emergency plan written and responders identified",
            "Induction programme ready to run",
            "First aid provision and medevac route confirmed",
            "Grievance mechanism publicised to the community before works begin"
          ]
        },
        {
          "title": "Baseline",
          "items": [
            "Pre-works condition survey of nearby structures completed",
            "Environmental baseline monitoring completed before disturbance",
            "Photographic record of pre-existing site condition taken"
          ]
        }
      ]
    },
    {
      "id": "closure",
      "name": "Closure and demobilisation readiness audit",
      "group": "Compliance",
      "scope": "Whether the site can be handed back without leaving liabilities",
      "basis": "Run before demobilisation. What is not closed out before the team leaves usually never is.",
      "sections": [
        {
          "title": "Physical closure",
          "items": [
            "Structures removed or formally handed over",
            "Contaminated ground identified and remediated",
            "Fuel and chemical storage decommissioned and areas tested",
            "Waste removed with transfer notes retained",
            "Borrow areas and stockpiles reinstated",
            "Erosion control in place on reinstated ground"
          ]
        },
        {
          "title": "Ecological and land",
          "items": [
            "Reinstatement matches the approved restoration plan",
            "Planting established and survival monitored",
            "Land returned in the condition agreed with the owner",
            "Post-closure monitoring plan agreed and funded"
          ]
        },
        {
          "title": "Administrative",
          "items": [
            "Permits surrendered or transferred",
            "Final reports submitted to the regulator",
            "Community commitments discharged and evidenced",
            "Outstanding grievances closed",
            "Workers' final dues settled and exit medicals completed",
            "Records archived for the statutory retention period"
          ]
        }
      ]
    },
    {
      "id": "bbs",
      "name": "Behavioural safety observation",
      "group": "Safety",
      "scope": "What people actually do, observed and discussed at the time",
      "basis": "An observation is a conversation, not an inspection. Recording who was at fault defeats the purpose and stops the reporting.",
      "sections": [
        {
          "title": "Position of people",
          "items": [
            "Line of fire: nobody between a load and a hard place",
            "Working at the correct height and reach, not overstretching",
            "Clear of moving plant and pinch points",
            "Escape route from the work position is clear"
          ]
        },
        {
          "title": "Tools and equipment",
          "items": [
            "Correct tool for the task, in good condition",
            "Guards in place and used",
            "Equipment inspected before use"
          ]
        },
        {
          "title": "Procedures",
          "items": [
            "The procedure being followed is the current one",
            "Permit conditions observed in practice",
            "Shortcuts identified and the reason for them understood"
          ]
        },
        {
          "title": "PPE and housekeeping",
          "items": [
            "PPE correct for the task and correctly worn",
            "Work area tidy, access clear",
            "Waste and materials stored, not left where people walk"
          ]
        },
        {
          "title": "The conversation",
          "items": [
            "Observation discussed with the worker at the time",
            "Worker's own view of the barriers was asked for and recorded",
            "Anything the worker cannot fix themselves was escalated"
          ]
        }
      ]
    }
  ],


  /* ==================================================================
     FREE SCREENING TOOL

     The screening tool answers one question — does this project need an
     environmental study, and which one — and it answers it the way a
     practitioner does: by reading the project against the schedule that
     governs it in that country.

     It is a published decision tree, not a model. Every outcome names the
     answers that produced it and the instrument to confirm it against, so
     the reasoning can be checked and argued with. A screening opinion that
     nobody can reproduce is worth nothing to a regulator.

     It is NOT a determination. Only the regulator screens a project. The
     thresholds below are bands a practitioner would recognise, not
     quotations from the schedules — the schedules use different units and
     tests in each country, and they are amended often.
     ================================================================== */

  screeningFramework: {
  "ug": {
    "authority": "NEMA Uganda",
    "lower": {
      "name": "Project Brief",
      "basis": "National Environment Act No. 5 of 2019, Schedule 4 — Part I projects go to NEMA, Part II to the lead agency"
    },
    "upper": {
      "name": "Environmental and Social Impact Assessment (ESIA)",
      "basis": "National Environment Act No. 5 of 2019, Schedule 5 — the categories for which an ESIA is mandatory"
    },
    "practitioner": "The study must be led by a practitioner registered with NEMA; the developer cannot self-certify.",
    "checkAt": "Schedule 4 and Schedule 5 of the National Environment Act No. 5 of 2019 (Cap 181)"
  },
  "ke": {
    "authority": "NEMA Kenya",
    "lower": {
      "name": "Project Report (summary)",
      "basis": "EMCA Second Schedule as amended by Legal Notice No. 31 of 2019 — low and medium risk projects submit a summary project report"
    },
    "upper": {
      "name": "ESIA Study Report",
      "basis": "EMCA Second Schedule as amended by Legal Notice No. 31 of 2019 — high risk projects submit a full ESIA study report"
    },
    "practitioner": "The report must be prepared by an EIA/EA expert registered with NEMA Kenya.",
    "checkAt": "The Second Schedule to EMCA, as amended by Legal Notice No. 31 of 2019 (low / medium / high risk)"
  },
  "tz": {
    "authority": "NEMC Tanzania",
    "lower": {
      "name": "Project Brief",
      "basis": "EIA and Audit Regulations 2005 — projects screened under the Second Schedule; category B2 submits a project brief"
    },
    "upper": {
      "name": "Full Environmental Impact Assessment",
      "basis": "EIA and Audit Regulations 2005, First Schedule — the mandatory list, which includes extractive industry"
    },
    "practitioner": "The study must be carried out by an expert registered under the Environmental Management (Registration and Practice of Environmental Experts) Regulations 2021.",
    "checkAt": "The First and Second Schedules to the EIA and Audit Regulations 2005 (GN 349)"
  },
  "rw": {
    "authority": "REMA (RDB reviews the report and runs the public hearing)",
    "lower": {
      "name": "Partial / simplified environmental impact assessment",
      "basis": "Ministerial Order N° 001/2019 of 15/04/2019 — the list of projects that must undergo an EIA sets the level of study"
    },
    "upper": {
      "name": "Full Environmental Impact Assessment → EIA Certificate",
      "basis": "Law N° 48/2018 on environment, Article 32, with Ministerial Order N° 001/2019"
    },
    "practitioner": "The study must be done by an environmental practitioner approved to work in Rwanda; REMA issues the certificate.",
    "checkAt": "Ministerial Order N° 001/2019 of 15/04/2019 and Law N° 48/2018"
  },
  "zm": {
    "authority": "ZEMA",
    "lower": {
      "name": "Environmental Project Brief (EPB)",
      "basis": "Environmental Impact Assessment Regulations, SI No. 28 of 1997, First Schedule"
    },
    "upper": {
      "name": "Environmental Impact Statement (EIS)",
      "basis": "Environmental Impact Assessment Regulations, SI No. 28 of 1997, Second Schedule — ZEMA may also require an EIS after reviewing an EPB"
    },
    "practitioner": "The study must be prepared by a consultant acceptable to ZEMA.",
    "checkAt": "The First and Second Schedules to SI No. 28 of 1997"
  },
  "cd": {
    "authority": "ACE — or DPEM where the project is a mining project",
    "lower": {
      "name": "Étude d'Impact Environnemental et Social (EIES) simplifiée + PGES",
      "basis": "Décret n° 14/019 du 2 août 2014 fixant les règles de fonctionnement des mécanismes procéduraux de la protection de l'environnement"
    },
    "upper": {
      "name": "EIES complète + Plan de Gestion Environnementale et Sociale (PGES)",
      "basis": "Décret n° 14/019 de 2014; for mining, the Règlement Minier (Décret n° 038/2003 révisé par Décret n° 18/024)"
    },
    "practitioner": "The study must be carried out by a bureau d'études agréé; submissions are made in French.",
    "checkAt": "Décret n° 14/019 de 2014 — and the Règlement Minier if the project is a mining project"
  }
},

  screeningSectors: [
  {
    "id": "housing",
    "label": "Housing, apartments or an estate",
    "group": "Buildings & settlement",
    "floor": "none",
    "scale": "units",
    "note": "Housing crosses into the upper tier on unit count in several of these schedules — Kenya's amended Second Schedule names estates above one hundred units as high risk."
  },
  {
    "id": "commercial",
    "label": "Offices, shops, a hotel or a warehouse",
    "group": "Buildings & settlement",
    "floor": "none",
    "scale": "area"
  },
  {
    "id": "institution",
    "label": "School, clinic or hospital",
    "group": "Buildings & settlement",
    "floor": "brief",
    "scale": "beds",
    "note": "Health facilities are treated as higher risk than their size suggests, because of clinical and hazardous waste. Kenya's 2019 amendment classes hospitals as high risk."
  },
  {
    "id": "roads",
    "label": "Road, bridge or other transport infrastructure",
    "group": "Infrastructure",
    "floor": "brief",
    "scale": "length"
  },
  {
    "id": "power",
    "label": "Power generation, transmission or a substation",
    "group": "Infrastructure",
    "floor": "brief",
    "scale": "mw"
  },
  {
    "id": "dam",
    "label": "Dam, reservoir or major water abstraction scheme",
    "group": "Infrastructure",
    "mandatory": true,
    "scale": "volume"
  },
  {
    "id": "water-supply",
    "label": "Water supply, sewerage or a treatment works",
    "group": "Infrastructure",
    "floor": "brief",
    "scale": "volume"
  },
  {
    "id": "waste",
    "label": "Waste facility — landfill, transfer, treatment or incineration",
    "group": "Waste & hazardous",
    "mandatory": true,
    "scale": "tonnes"
  },
  {
    "id": "mining-lsm",
    "label": "Mining — open pit or underground",
    "group": "Extractive",
    "mandatory": true,
    "scale": "area"
  },
  {
    "id": "mining-asm",
    "label": "Artisanal or small-scale mining",
    "group": "Extractive",
    "floor": "brief",
    "scale": "area",
    "note": "Formalisation status matters as much as scale here: a licence or cooperative membership, and whether the site sits inside a large-scale concession or a protected area."
  },
  {
    "id": "quarry",
    "label": "Quarry, sand or aggregate extraction",
    "group": "Extractive",
    "mandatory": true,
    "scale": "area"
  },
  {
    "id": "oilgas",
    "label": "Oil, gas or petroleum storage and handling",
    "group": "Extractive",
    "mandatory": true,
    "scale": "volume"
  },
  {
    "id": "manufacturing",
    "label": "Factory or manufacturing plant",
    "group": "Industry",
    "floor": "brief",
    "scale": "area"
  },
  {
    "id": "agroprocessing",
    "label": "Agro-processing — milling, coffee, tea, abattoir, tannery",
    "group": "Industry",
    "floor": "brief",
    "scale": "area",
    "note": "Tanneries, abattoirs and coffee washing carry high-strength effluent, which is usually what moves them up a tier rather than their footprint."
  },
  {
    "id": "agriculture",
    "label": "Farming, plantation or irrigation scheme",
    "group": "Land use",
    "floor": "none",
    "scale": "area"
  },
  {
    "id": "forestry",
    "label": "Forestry, logging or a timber plantation",
    "group": "Land use",
    "floor": "brief",
    "scale": "area"
  },
  {
    "id": "aquaculture",
    "label": "Fish farming or aquaculture",
    "group": "Land use",
    "floor": "brief",
    "scale": "area"
  },
  {
    "id": "tourism",
    "label": "Lodge, camp or tourism development",
    "group": "Land use",
    "floor": "brief",
    "scale": "beds",
    "note": "Tourism developments are usually screened on where they are rather than how big they are — most sit in or beside a protected area."
  },
  {
    "id": "telecom",
    "label": "Telecom mast, tower or data centre",
    "group": "Infrastructure",
    "floor": "none",
    "scale": "none"
  },
  {
    "id": "other",
    "label": "Something else",
    "group": "Other",
    "floor": "none",
    "scale": "none"
  }
],

  screeningScaleBands: {
  "units": {
    "label": "How many dwelling units?",
    "unit": "units",
    "bands": [
      {
        "max": 20,
        "tier": "none"
      },
      {
        "max": 100,
        "tier": "brief"
      },
      {
        "max": null,
        "tier": "esia"
      }
    ]
  },
  "area": {
    "label": "Roughly how large is the site?",
    "unit": "hectares",
    "bands": [
      {
        "max": 1,
        "tier": "none"
      },
      {
        "max": 20,
        "tier": "brief"
      },
      {
        "max": null,
        "tier": "esia"
      }
    ]
  },
  "beds": {
    "label": "How many beds or rooms?",
    "unit": "beds / rooms",
    "bands": [
      {
        "max": 20,
        "tier": "brief"
      },
      {
        "max": null,
        "tier": "esia"
      }
    ]
  },
  "length": {
    "label": "How long is the route?",
    "unit": "kilometres",
    "bands": [
      {
        "max": 1,
        "tier": "brief"
      },
      {
        "max": 10,
        "tier": "brief"
      },
      {
        "max": null,
        "tier": "esia"
      }
    ]
  },
  "mw": {
    "label": "What is the installed capacity?",
    "unit": "MW",
    "bands": [
      {
        "max": 1,
        "tier": "brief"
      },
      {
        "max": 10,
        "tier": "esia"
      },
      {
        "max": null,
        "tier": "esia"
      }
    ]
  },
  "volume": {
    "label": "What volume or throughput is involved?",
    "unit": "m³ per day (or m³ stored)",
    "bands": [
      {
        "max": 50,
        "tier": "brief"
      },
      {
        "max": 1000,
        "tier": "esia"
      },
      {
        "max": null,
        "tier": "esia"
      }
    ]
  },
  "tonnes": {
    "label": "How much material will the facility handle?",
    "unit": "tonnes per day",
    "bands": [
      {
        "max": 1,
        "tier": "brief"
      },
      {
        "max": null,
        "tier": "esia"
      }
    ]
  },
  "none": null
},

  screeningTriggers: [
  {
    "id": "wetland",
    "label": "In, or draining directly into, a wetland, swamp or marsh",
    "tier": "esia",
    "why": "Wetlands are protected in their own right in all six jurisdictions, and a wetland location moves almost any project into the upper tier regardless of its size.",
    "flags": [
      "Wetland use or alteration permission is usually a separate consent from the environmental approval."
    ]
  },
  {
    "id": "protected",
    "label": "Inside or bordering a national park, forest reserve or other protected area",
    "tier": "esia",
    "why": "Work in or beside a protected area brings the protected-area authority in as a second decision-maker alongside the environmental regulator.",
    "flags": [
      "Expect a separate consent from the protected-area authority, and possibly a biodiversity assessment."
    ]
  },
  {
    "id": "water",
    "label": "Within about 100 m of a river, lake or shoreline",
    "tier": "esia",
    "why": "Riparian and lakeshore setbacks are set by law in these jurisdictions, and encroachment is one of the most common reasons an approval is refused.",
    "flags": [
      "Confirm the statutory riparian setback for the watercourse before fixing the layout."
    ]
  },
  {
    "id": "groundwater",
    "label": "Will abstract groundwater or surface water",
    "tier": "brief",
    "why": "Abstraction needs its own permit from the water authority, which is a separate application from the environmental approval.",
    "flags": [
      "A water abstraction or water use permit is required in addition to the environmental decision."
    ]
  },
  {
    "id": "effluent",
    "label": "Will discharge effluent or wastewater",
    "tier": "brief",
    "why": "A discharge consent is a separate permit, and effluent quality is one of the first things a monitoring programme has to evidence.",
    "flags": [
      "A discharge or effluent permit is required, with monitoring at the permitted frequency."
    ]
  },
  {
    "id": "air",
    "label": "Will have a stack, kiln, furnace or significant dust",
    "tier": "brief",
    "why": "Point-source emissions bring air quality standards and, in most of these jurisdictions, an emission licence.",
    "flags": [
      "Expect emission limits and a stack testing obligation."
    ]
  },
  {
    "id": "hazardous",
    "label": "Will store, use or generate hazardous materials or waste",
    "tier": "esia",
    "why": "Hazardous materials attract a separate licensing regime and are a standing reason to require the full study.",
    "flags": [
      "Hazardous waste generation, storage and transport are separately licensed end to end."
    ]
  },
  {
    "id": "explosives",
    "label": "Will use explosives or blasting",
    "tier": "esia",
    "why": "Blasting brings an explosives licence, a licensed blaster, and vibration and airblast limits at the nearest receptor.",
    "flags": [
      "An explosives licence, magazine licence and blast monitoring programme will be needed."
    ]
  },
  {
    "id": "resettlement",
    "label": "People will have to move, or land will be acquired",
    "tier": "esia",
    "why": "Physical or economic displacement is the single clearest trigger for a full study, and it brings a resettlement instrument with it.",
    "flags": [
      "A Resettlement Action Plan (or Livelihood Restoration Plan) will normally be required alongside the study.",
      "Lender-financed projects are also held to IFC Performance Standard 5."
    ]
  },
  {
    "id": "clearing",
    "label": "Vegetation or trees will be cleared",
    "tier": "brief",
    "why": "Clearance is assessed on what is being cleared, not just how much — indigenous or reserve trees need a separate authorisation.",
    "flags": [
      "A tree cutting or forest use authorisation may be needed from the forestry authority."
    ]
  },
  {
    "id": "settlement",
    "label": "Homes, schools or a market are within about 500 m",
    "tier": "brief",
    "why": "Nearby receptors turn noise, dust and traffic from a design detail into a consent condition, and bring community consultation forward.",
    "flags": [
      "Expect noise and dust limits measured at the nearest receptor, and a grievance mechanism as a condition."
    ]
  },
  {
    "id": "heritage",
    "label": "A cultural, burial or archaeological site is present or suspected",
    "tier": "esia",
    "why": "Cultural heritage is assessed separately from environmental impact and carries its own consent and chance-find obligations.",
    "flags": [
      "A chance-finds procedure is normally a condition; an assessment by the antiquities authority may be required."
    ]
  },
  {
    "id": "transboundary",
    "label": "Effects could cross a national border",
    "tier": "esia",
    "why": "Transboundary effects bring obligations to neighbouring states and, for lender-financed work, to the lender.",
    "flags": [
      "Notification to the affected state may be required before approval."
    ]
  }
],

  // ---- Monitor capacities -------------------------------------------
  // The vocabulary a monitor registers against. No practitioner or firm is
  // ever seeded here: the register is the operator's to fill.
  monitorCapacities: {
  "services": [
    {
      "id": "screening",
      "label": "Screening and scoping opinions"
    },
    {
      "id": "projectbrief",
      "label": "Project briefs / project reports"
    },
    {
      "id": "esia",
      "label": "Full ESIA / EIS studies"
    },
    {
      "id": "esmp",
      "label": "ESMP and management plan preparation"
    },
    {
      "id": "audit",
      "label": "Environmental audits (statutory and due diligence)"
    },
    {
      "id": "monitoring",
      "label": "Periodic compliance monitoring and reporting"
    },
    {
      "id": "essr",
      "label": "Lender-format monthly E&S reporting (ESSR)"
    },
    {
      "id": "sampling",
      "label": "Effluent, air, noise and soil sampling"
    },
    {
      "id": "occhygiene",
      "label": "Occupational hygiene surveys"
    },
    {
      "id": "hse",
      "label": "HSE management systems and training"
    },
    {
      "id": "social",
      "label": "Social assessment, resettlement and livelihood restoration"
    },
    {
      "id": "biodiversity",
      "label": "Biodiversity and ecological assessment"
    },
    {
      "id": "forestry",
      "label": "Forestry inventory, management and restoration"
    },
    {
      "id": "tailings",
      "label": "Tailings and mine waste review"
    },
    {
      "id": "closure",
      "label": "Mine closure and rehabilitation planning"
    },
    {
      "id": "gis",
      "label": "GIS, mapping and remote sensing"
    }
  ],
  "grades": [
    {
      "id": "lead",
      "label": "Lead expert / registered practitioner",
      "note": "Registered with the national regulator and able to sign off a study."
    },
    {
      "id": "associate",
      "label": "Associate expert",
      "note": "Registered, working under a lead expert."
    },
    {
      "id": "technician",
      "label": "Technician / field officer",
      "note": "Sampling, monitoring and field data collection."
    },
    {
      "id": "firm",
      "label": "Registered firm",
      "note": "A practice holding a firm-level registration."
    }
  ]
},

  monitors: [],

  // ---- Unit converters ----------------------------------------------
  // Factors are exact or standard definitions, not estimates.
  converters: [
  {
    "group": "Area & length",
    "id": "area",
    "label": "Area",
    "units": [
      {
        "id": "ha",
        "label": "hectares",
        "f": 1
      },
      {
        "id": "m2",
        "label": "square metres",
        "f": 10000
      },
      {
        "id": "km2",
        "label": "square kilometres",
        "f": 0.01
      },
      {
        "id": "ac",
        "label": "acres",
        "f": 2.47105
      }
    ]
  },
  {
    "group": "Area & length",
    "id": "length",
    "label": "Length",
    "units": [
      {
        "id": "m",
        "label": "metres",
        "f": 1
      },
      {
        "id": "km",
        "label": "kilometres",
        "f": 0.001
      },
      {
        "id": "ft",
        "label": "feet",
        "f": 3.28084
      },
      {
        "id": "mi",
        "label": "miles",
        "f": 0.000621371
      }
    ]
  },
  {
    "group": "Volume & flow",
    "id": "volume",
    "label": "Volume",
    "units": [
      {
        "id": "m3",
        "label": "cubic metres",
        "f": 1
      },
      {
        "id": "l",
        "label": "litres",
        "f": 1000
      },
      {
        "id": "gal",
        "label": "US gallons",
        "f": 264.172
      },
      {
        "id": "impgal",
        "label": "imperial gallons",
        "f": 219.969
      }
    ]
  },
  {
    "group": "Volume & flow",
    "id": "flow",
    "label": "Flow rate",
    "units": [
      {
        "id": "m3d",
        "label": "m³ per day",
        "f": 1
      },
      {
        "id": "m3h",
        "label": "m³ per hour",
        "f": 0.041666666666666664
      },
      {
        "id": "ls",
        "label": "litres per second",
        "f": 0.011574074074074073
      },
      {
        "id": "m3s",
        "label": "m³ per second",
        "f": 1.1574074074074073e-05
      }
    ]
  },
  {
    "group": "Mass",
    "id": "mass",
    "label": "Mass",
    "units": [
      {
        "id": "t",
        "label": "tonnes",
        "f": 1
      },
      {
        "id": "kg",
        "label": "kilograms",
        "f": 1000
      },
      {
        "id": "lb",
        "label": "pounds",
        "f": 2204.62
      },
      {
        "id": "ton_us",
        "label": "US short tons",
        "f": 1.10231
      }
    ]
  },
  {
    "group": "Concentration",
    "id": "conc",
    "label": "Concentration in water",
    "units": [
      {
        "id": "mgl",
        "label": "mg/l",
        "f": 1
      },
      {
        "id": "ppm",
        "label": "ppm (dilute aqueous)",
        "f": 1
      },
      {
        "id": "ugl",
        "label": "µg/l",
        "f": 1000
      },
      {
        "id": "gl",
        "label": "g/l",
        "f": 0.001
      }
    ],
    "note": "mg/l and ppm are interchangeable only for dilute aqueous solutions, where 1 litre weighs about 1 kg. They are not interchangeable in air."
  },
  {
    "group": "Energy",
    "id": "energy",
    "label": "Energy",
    "units": [
      {
        "id": "kwh",
        "label": "kWh",
        "f": 1
      },
      {
        "id": "mj",
        "label": "megajoules",
        "f": 3.6
      },
      {
        "id": "gj",
        "label": "gigajoules",
        "f": 0.0036
      },
      {
        "id": "mwh",
        "label": "MWh",
        "f": 0.001
      }
    ]
  },
  {
    "group": "Pressure",
    "id": "pressure",
    "label": "Pressure",
    "units": [
      {
        "id": "bar",
        "label": "bar",
        "f": 1
      },
      {
        "id": "kpa",
        "label": "kPa",
        "f": 100
      },
      {
        "id": "psi",
        "label": "psi",
        "f": 14.5038
      },
      {
        "id": "atm",
        "label": "atmospheres",
        "f": 0.986923
      }
    ]
  }
],

  creditCosts: { aiDraft: 20, esiaSubmit: 50, auditAiSummary: 15 },
  freeSignupCredits: 100
};
