/* Verda — seed data & reference content.
   Editable in the browser (persisted to localStorage) — this file only supplies
   the first-run defaults so the app isn't empty on first load. */

const VERDA_SEED = {

  // ---- Clients (warm leads already scoped by EEIS) -------------------------
  clients: [
    { id: "c1", name: "Abubaker Technical", industry: "Manufacturing / Factories", country: "ug", site: "Kampala Industrial Area", plan: "Quarterly", nextVisit: "2026-10-15", permitExpiry: "2027-03-01", status: "Active" },
    { id: "c2", name: "Cosmic Investments", industry: "Quarrying & Aggregates", country: "ug", site: "Mukono Quarry Site", plan: "Quarterly", nextVisit: "2026-09-28", permitExpiry: "2026-12-20", status: "Active" },
    { id: "c3", name: "Kaletex Ventures", industry: "Textiles & Apparel", country: "ug", site: "Namanve Industrial Park", plan: "Monthly", nextVisit: "2026-09-20", permitExpiry: "2027-01-10", status: "Active" },
    { id: "c4", name: "Lusango Real Uganda", industry: "Construction & Contracting", country: "ug", site: "Multiple project sites", plan: "Quarterly", nextVisit: "2026-11-05", permitExpiry: "2026-10-30", status: "Active" },
    { id: "c5", name: "Crested Crane Timber", industry: "Timber & Wood Processing", country: "ug", site: "Jinja Processing Yard", plan: "Monthly", nextVisit: "2026-09-25", permitExpiry: "2027-02-14", status: "Active" },
    { id: "c6", name: "Example: Rift Valley Aggregates", industry: "Quarrying & Aggregates", country: "ke", site: "Machakos County", plan: "Quarterly", nextVisit: "2026-10-08", permitExpiry: "2027-04-30", status: "Active" },
    { id: "c7", name: "Example: Lake Zone Gold", industry: "Mining — Large Scale (Open Pit & Underground)", country: "tz", site: "Geita Region", plan: "Monthly", nextVisit: "2026-09-30", permitExpiry: "2027-06-15", status: "Active" },
    { id: "c8", name: "Example: Katanga Cobalt Cooperative", industry: "Artisanal & Small-Scale Mining (ASM)", country: "cd", site: "Kolwezi, Lualaba", plan: "Monthly", nextVisit: "2026-10-02", permitExpiry: "2026-11-28", status: "Active" },
    { id: "c9", name: "Example: Copperbelt Smelting", industry: "Mineral Processing, Smelting & Refining", country: "zm", site: "Kitwe, Copperbelt", plan: "Monthly", nextVisit: "2026-10-12", permitExpiry: "2027-02-01", status: "Active" }
  ],

  // ---- Country / jurisdiction register ------------------------------------
  // The regulators, principal instruments and permits that apply in each
  // country Verda covers. This is a STARTING REGISTER compiled from publicly
  // known regulatory structure — it is not legal advice and it goes stale.
  // Every entry must be verified against the current consolidated text and
  // the regulator's own guidance before it is relied on; `contentReview`
  // below records when this register was last written and who should check
  // it. Amendments, statutory instruments and fee schedules change often.
  contentReview: { compiled: "2026-09", verifyBy: "2027-03", owner: "EHS content lead",
    note: "Verify every instrument, permit and authority against the current law of the jurisdiction before relying on it. Where a client operates across borders, the stricter requirement governs unless a local legal opinion says otherwise." },

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
          "remit": "ESIA approval, environmental audits, waste, noise, air"
        },
        {
          "name": "Directorate of Water Resources Management (Ministry of Water & Environment)",
          "abbr": "DWRM",
          "remit": "Water abstraction and wastewater discharge permits"
        },
        {
          "name": "Department of Occupational Safety and Health (Ministry of Gender, Labour & Social Development)",
          "abbr": "OSH",
          "remit": "Workplace registration, statutory inspections, plant examination"
        },
        {
          "name": "Directorate of Geological Survey and Mines (Ministry of Energy & Mineral Development)",
          "abbr": "DGSM",
          "remit": "Mineral rights, mine inspection"
        },
        {
          "name": "Uganda Wildlife Authority",
          "abbr": "UWA",
          "remit": "Operations in or near protected areas"
        },
        {
          "name": "National Forestry Authority",
          "abbr": "NFA",
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
          "remit": "Radiation sources and gauges"
        },
        {
          "name": "Uganda National Bureau of Standards",
          "abbr": "UNBS",
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
          "remit": "EIA licensing, annual environmental audits, effluent licensing"
        },
        {
          "name": "Directorate of Occupational Safety and Health Services",
          "abbr": "DOSHS",
          "remit": "Workplace registration, statutory examinations, OSH audits"
        },
        {
          "name": "Water Resources Authority",
          "abbr": "WRA",
          "remit": "Water abstraction permits, catchment protection"
        },
        {
          "name": "State Department for Mining / Mining Licensing Committee",
          "abbr": "—",
          "remit": "Mineral rights under the Mining Act"
        },
        {
          "name": "National Construction Authority",
          "abbr": "NCA",
          "remit": "Contractor registration, site compliance"
        },
        {
          "name": "Kenya Bureau of Standards",
          "abbr": "KEBS",
          "remit": "Product and discharge standards"
        },
        {
          "name": "Kenya Nuclear Regulatory Authority",
          "abbr": "KNRA",
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
          "remit": "EIA certification, environmental audit, inspections"
        },
        {
          "name": "Vice President's Office – Division of Environment",
          "abbr": "VPO-DoE",
          "remit": "Policy, appeals, approvals"
        },
        {
          "name": "Occupational Safety and Health Authority",
          "abbr": "OSHA Tanzania",
          "remit": "Workplace registration, compliance licence, statutory examinations"
        },
        {
          "name": "Mining Commission (Tume ya Madini)",
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
          "remit": "Radiation sources"
        },
        {
          "name": "Tanzania Bureau of Standards",
          "abbr": "TBS",
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
          "remit": "Approval of EIES and PGES outside the mining sector"
        },
        {
          "name": "Ministère de l'Environnement et Développement Durable",
          "abbr": "MEDD",
          "remit": "Environmental policy and enforcement"
        },
        {
          "name": "Direction de Protection de l'Environnement Minier",
          "abbr": "DPEM",
          "remit": "Environmental approval and inspection for mining projects"
        },
        {
          "name": "Cadastre Minier",
          "abbr": "CAMI",
          "remit": "Mining titles and perimeters"
        },
        {
          "name": "Service d'Assistance et d'Encadrement de l'Exploitation Minière Artisanale et à Petite Échelle",
          "abbr": "SAEMAPE",
          "remit": "Artisanal and small-scale mining oversight"
        },
        {
          "name": "Inspection Générale du Travail",
          "abbr": "IGT",
          "remit": "Labour inspection and workplace conditions"
        },
        {
          "name": "Caisse Nationale de Sécurité Sociale",
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
          "remit": "EIA/EPB decisions, licensing of emissions, effluent and waste"
        },
        {
          "name": "Mine Safety Department (Ministry of Mines and Minerals Development)",
          "abbr": "MSD",
          "remit": "Mine safety inspection, statutory mine regulations"
        },
        {
          "name": "Mining Cadastre Department",
          "abbr": "—",
          "remit": "Mining rights and licences"
        },
        {
          "name": "Water Resources Management Authority",
          "abbr": "WARMA",
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
          "remit": "Occupational injury compensation"
        },
        {
          "name": "Zambia Bureau of Standards",
          "abbr": "ZABS",
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
        "tz": "Mining Commission licensing plus NEMC environmental certification are separate obligations — holding one does not satisfy the other."
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
      dashboard: "Dashboard", reporting: "Verda Reporting", esia: "ToR & ESIA Reporting",
      revenue: "Revenue Planner",
      plans: "Plans & Pricing",
      analytics: "Analytics", incidents: "Incidents", risk: "Risk Register", actions: "Actions (CAPA)", training: "Training & Competency",
      audits: "Audits", records: "Records", maps: "Maps & Site Visits", workflows: "Workflows",
      clients: "Clients & Compliance Care Plans", documents: "Documents Library", checklists: "Checklists",
      credits: "Credits & Billing", skills: "Skills Advisor",
      resources: "Resources Hub", supplies: "Supplies & Hire", iec: "IEC Materials", solutions: "Solutions",
      login: "Log in", signup: "Free Sign Up", logout: "Log out" },
    sw: { app_name: "Verda", tagline: "Uzingatiaji wa Mazingira, Afya na Usalama — Kwa Urahisi.",
      nav_monitor: "Fuatilia", nav_manage: "Simamia", nav_grow: "Kua",
      dashboard: "Dashibodi", reporting: "Ripoti ya Verda", esia: "ToR na Ripoti ya ESIA",
      revenue: "Mpango wa Mapato",
      plans: "Mipango na Bei",
      analytics: "Uchambuzi", incidents: "Matukio", risk: "Rejista ya Hatari", actions: "Hatua (CAPA)", training: "Mafunzo na Umahiri",
      audits: "Ukaguzi", records: "Kumbukumbu", maps: "Ramani na Ziara za Tovuti", workflows: "Mtiririko wa Kazi",
      clients: "Wateja na Mipango ya Uzingatiaji", documents: "Maktaba ya Hati", checklists: "Orodha za Ukaguzi",
      credits: "Mikopo na Malipo", skills: "Mshauri wa Ujuzi",
      resources: "Kituo cha Rasilimali", supplies: "Vifaa na Ukodishaji", iec: "Nyenzo za IEC", solutions: "Suluhisho",
      login: "Ingia", signup: "Jisajili Bure", logout: "Toka" },
    fr: { app_name: "Verda", tagline: "Conformité Environnementale, Santé & Sécurité — Simplifiée.",
      nav_monitor: "Surveiller", nav_manage: "Gérer", nav_grow: "Développer",
      dashboard: "Tableau de bord", reporting: "Rapport Verda", esia: "TdR et Rapport EIES",
      revenue: "Planificateur de Revenus",
      plans: "Offres et Tarifs",
      analytics: "Analytique", incidents: "Incidents", risk: "Registre des Risques", actions: "Actions (CAPA)", training: "Formation et Compétences",
      audits: "Audits", records: "Registres", maps: "Cartes et Visites de Site", workflows: "Flux de Travail",
      clients: "Clients et Plans de Conformité", documents: "Bibliothèque de Documents", checklists: "Listes de Contrôle",
      credits: "Crédits et Facturation", skills: "Conseiller en Compétences",
      resources: "Centre de Ressources", supplies: "Fournitures et Location", iec: "Matériel IEC", solutions: "Solutions",
      login: "Connexion", signup: "Inscription Gratuite", logout: "Déconnexion" },
    pt: { app_name: "Verda", tagline: "Conformidade Ambiental, Saúde e Segurança — Simplificada.",
      nav_monitor: "Monitorar", nav_manage: "Gerir", nav_grow: "Crescer",
      dashboard: "Painel", reporting: "Relatório Verda", esia: "ToR e Relatório AIAS",
      revenue: "Planeador de Receitas",
      plans: "Planos e Preços",
      analytics: "Análises", incidents: "Incidentes", risk: "Registo de Riscos", actions: "Ações (CAPA)", training: "Formação e Competências",
      audits: "Auditorias", records: "Registos", maps: "Mapas e Visitas ao Local", workflows: "Fluxos de Trabalho",
      clients: "Clientes e Planos de Conformidade", documents: "Biblioteca de Documentos", checklists: "Listas de Verificação",
      credits: "Créditos e Faturação", skills: "Conselheiro de Competências",
      resources: "Centro de Recursos", supplies: "Suprimentos e Aluguer", iec: "Materiais IEC", solutions: "Soluções",
      login: "Entrar", signup: "Inscrição Gratuita", logout: "Sair" },
    zh: { app_name: "Verda", tagline: "环境、健康与安全合规 — 化繁为简。",
      nav_monitor: "监控", nav_manage: "管理", nav_grow: "拓展",
      dashboard: "仪表板", reporting: "Verda 报告", esia: "职责范围与 ESIA 报告",
      revenue: "收入测算",
      plans: "方案与定价",
      analytics: "数据分析", incidents: "事件", risk: "风险登记册", actions: "整改措施 (CAPA)", training: "培训与能力",
      audits: "审核", records: "记录", maps: "地图与现场巡查", workflows: "工作流程",
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
  workflowTemplates: [
    { id: "hr", name: "HR Compliance Workflow", area: "HR",
      steps: ["New-hire EHS induction completed", "PPE issued and sign-off recorded", "Contractor EHS pre-qualification checked", "Training records updated in file", "Medical/fitness-to-work record on file"] },
    { id: "env", name: "Environmental Management Workflow", area: "Environment",
      steps: ["Incident/spill response steps followed", "Permit renewal tracked against expiry date", "Waste transfer manifests reconciled", "Effluent/air monitoring results logged", "Corrective actions closed out"] },
    { id: "safety", name: "Safety Administration Workflow", area: "Safety Admin",
      steps: ["Incident investigated and root cause recorded", "Near-miss logged and closed out", "Safety committee meeting held and minuted", "Corrective/preventive actions tracked to closure", "Statutory reporting obligations checked"] }
  ],

  // ---- Credit costs for AI/paid actions --------------------------------
  // ---- Report tables --------------------------------------------------------
  // Table structures per report section, keyed by section id (ids are unique
  // across all three frameworks). A column with chart:true can be plotted; a
  // table's `chart` block says how. `starterRows` pre-fill the label column so
  // a first-time user sees the expected rows rather than an empty grid.
  sectionTables: {
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

  creditCosts: { aiDraft: 20, esiaSubmit: 50, auditAiSummary: 15 },
  freeSignupCredits: 100
};
