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
      id: "manufacturing", group: "Industrial & Manufacturing", name: "Manufacturing / Factories",
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
      id: "quarrying", group: "Energy, Resources & Construction", name: "Quarrying & Mining",
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
      id: "timber", group: "Industrial & Manufacturing", name: "Timber & Wood Processing",
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
      id: "construction", group: "Energy, Resources & Construction", name: "Construction & Contracting",
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
      id: "oilgas", group: "Energy, Resources & Construction", name: "Oil & Gas",
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
      id: "agriculture", group: "Public, Health & Agriculture", name: "Agriculture & Agro-processing",
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
    },
    {
      id: "foodbev", group: "Industrial & Manufacturing", name: "Food & Beverage Processing",
      checklist: [
        "Food safety / public health licence current and displayed",
        "Cold chain and temperature monitoring records maintained",
        "Wastewater from processing permitted and monitored",
        "Cleaning chemicals stored with SDS available",
        "Pest control programme in place and logged",
        "Worker health screening and hygiene training records on file",
        "Packaging and organic waste segregation implemented",
        "Incident/near-miss register maintained"
      ]
    },
    {
      id: "textiles", group: "Industrial & Manufacturing", name: "Textiles & Apparel",
      checklist: [
        "Environmental approval on file for dyeing/finishing operations",
        "Effluent discharge permit current with treatment records",
        "Chemical inventory and SDS available for all dyes and finishes",
        "Machine guarding on cutting, spinning and pressing equipment",
        "Dust and noise exposure controls in place",
        "Fire detection, exits and drills current (high fuel-load environment)",
        "Working hours and labour standards records maintained",
        "Incident/near-miss register maintained"
      ]
    },
    {
      id: "energy", group: "Energy, Resources & Construction", name: "Energy & Utilities",
      checklist: [
        "Generation/distribution licence and environmental approvals current",
        "High-voltage work permits and lockout/tagout procedures in place",
        "Arc-flash risk assessment completed and PPE matched to it",
        "Emissions and effluent monitoring records current (thermal plant)",
        "Vegetation and right-of-way management logged",
        "Emergency and outage response plan tested",
        "Community notification process for planned outages",
        "Incident/near-miss register maintained"
      ]
    },
    {
      id: "water", group: "Energy, Resources & Construction", name: "Water, Sanitation & Waste",
      checklist: [
        "Abstraction, discharge and waste-handling licences current",
        "Treatment process monitoring and lab results on file",
        "Confined space entry procedure and trained attendants in place",
        "Biological/chemical exposure controls and vaccinations current",
        "Sludge and residual waste disposal records maintained",
        "Odour and vector control measures implemented",
        "Community grievance log maintained",
        "Incident/near-miss register maintained"
      ]
    },
    {
      id: "transport", group: "Services & Commerce", name: "Transport & Logistics",
      checklist: [
        "Operating licences and vehicle roadworthiness certificates current",
        "Driver licences, hours-of-service and fatigue management records",
        "Journey management and defensive driving training completed",
        "Dangerous goods classification, placarding and documentation correct",
        "Fuel storage and spill response provisions on site",
        "Load securing and manual handling procedures in place",
        "Vehicle emissions and maintenance records maintained",
        "Incident/near-miss register maintained"
      ]
    },
    {
      id: "hospitality", group: "Services & Commerce", name: "Hospitality & Tourism",
      checklist: [
        "Operating and food service licences current",
        "Fire detection, extinguishers, exits and evacuation plan verified",
        "Kitchen hygiene, temperature and pest control records maintained",
        "Pool/spa water quality testing logged (where applicable)",
        "Laundry and cleaning chemical SDS available to staff",
        "Waste segregation and licensed collection in place",
        "Guest and staff incident register maintained",
        "Water and energy consumption tracked"
      ]
    },
    {
      id: "retail", group: "Services & Commerce", name: "Retail & Wholesale",
      checklist: [
        "Trading licence and fire safety certificate current",
        "Emergency exits clear and evacuation plan posted",
        "Manual handling and racking/storage safety controls in place",
        "Slip, trip and fall prevention programme active",
        "Hazardous consumer products stored per SDS requirements",
        "Packaging and e-waste take-back/recycling arrangements",
        "Staff first aid provision and trained first aiders on shift",
        "Incident/near-miss register maintained"
      ]
    },
    {
      id: "telecom", group: "Services & Commerce", name: "Telecom & ICT",
      checklist: [
        "Site and tower construction approvals on file",
        "Working at height rescue plan and competent climbers certified",
        "RF exposure assessment and exclusion zones signposted",
        "Generator fuel storage bunded with spill kit available",
        "Battery and e-waste disposal through licensed handlers",
        "Data centre fire suppression system serviced",
        "Lone-worker and remote-site check-in procedure in place",
        "Incident/near-miss register maintained"
      ]
    },
    {
      id: "finance", group: "Services & Commerce", name: "Financial & Professional Services",
      checklist: [
        "Occupational health & safety workplace registration current",
        "Fire safety certificate, drills and marshals in place",
        "Ergonomic/display screen assessments completed",
        "First aid provision and trained first aiders available",
        "Business continuity and emergency response plan tested",
        "E-waste and confidential waste disposal through licensed handlers",
        "Energy use and paper consumption tracked for ESG reporting",
        "Incident register maintained"
      ]
    },
    {
      id: "healthcare", group: "Public, Health & Agriculture", name: "Healthcare & Medical",
      checklist: [
        "Facility operating licence and health authority approvals current",
        "Healthcare waste segregation, storage and licensed disposal records",
        "Sharps injury prevention and post-exposure procedure in place",
        "Infection prevention and control programme documented",
        "Radiation/X-ray source licence and dosimetry (where applicable)",
        "Medical gas and chemical storage compliant with SDS",
        "Staff immunisation and health surveillance records maintained",
        "Incident/near-miss register maintained"
      ]
    },
    {
      id: "education", group: "Public, Health & Agriculture", name: "Education",
      checklist: [
        "Institution registration and building occupancy approvals current",
        "Fire safety equipment, exits and evacuation drills logged",
        "Laboratory chemical inventory with SDS and spill provisions",
        "Playground, sports and workshop equipment inspections recorded",
        "Safeguarding and student incident reporting procedure in place",
        "Water quality and sanitation facilities monitored",
        "Food service hygiene records maintained (where catering on site)",
        "First aid provision and trained staff available"
      ]
    },
    {
      id: "publicsector", group: "Public, Health & Agriculture", name: "Public Sector & NGOs",
      checklist: [
        "Programme/project environmental screening completed where required",
        "Workplace OSH registration and fire safety provisions current",
        "Field staff travel, security and lone-worker procedures in place",
        "Community engagement and grievance mechanism operating",
        "Donor/regulator safeguarding and reporting obligations tracked",
        "Asset, fuel and generator management records maintained",
        "Waste and e-waste disposal through licensed handlers",
        "Incident register maintained"
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
      analytics: "Analytics", incidents: "Incidents", risk: "Risk Register", actions: "Actions (CAPA)", training: "Training & Competency",
      audits: "Audits", records: "Records", maps: "Maps & Site Visits", workflows: "Workflows",
      clients: "Clients & Compliance Care Plans", documents: "Documents Library", checklists: "Checklists",
      credits: "Credits & Billing", skills: "Skills Advisor",
      resources: "Resources Hub", supplies: "Supplies & Hire", iec: "IEC Materials", solutions: "Solutions",
      login: "Log in", signup: "Free Sign Up", logout: "Log out" },
    sw: { app_name: "Verda", tagline: "Uzingatiaji wa Mazingira, Afya na Usalama — Kwa Urahisi.",
      nav_monitor: "Fuatilia", nav_manage: "Simamia", nav_grow: "Kua",
      dashboard: "Dashibodi", reporting: "Ripoti ya EEIS", esia: "ToR na Ripoti ya ESIA",
      analytics: "Uchambuzi", incidents: "Matukio", risk: "Rejista ya Hatari", actions: "Hatua (CAPA)", training: "Mafunzo na Umahiri",
      audits: "Ukaguzi", records: "Kumbukumbu", maps: "Ramani na Ziara za Tovuti", workflows: "Mtiririko wa Kazi",
      clients: "Wateja na Mipango ya Uzingatiaji", documents: "Maktaba ya Hati", checklists: "Orodha za Ukaguzi",
      credits: "Mikopo na Malipo", skills: "Mshauri wa Ujuzi",
      resources: "Kituo cha Rasilimali", supplies: "Vifaa na Ukodishaji", iec: "Nyenzo za IEC", solutions: "Suluhisho",
      login: "Ingia", signup: "Jisajili Bure", logout: "Toka" },
    fr: { app_name: "Verda", tagline: "Conformité Environnementale, Santé & Sécurité — Simplifiée.",
      nav_monitor: "Surveiller", nav_manage: "Gérer", nav_grow: "Développer",
      dashboard: "Tableau de bord", reporting: "Rapport EEIS", esia: "TdR et Rapport EIES",
      analytics: "Analytique", incidents: "Incidents", risk: "Registre des Risques", actions: "Actions (CAPA)", training: "Formation et Compétences",
      audits: "Audits", records: "Registres", maps: "Cartes et Visites de Site", workflows: "Flux de Travail",
      clients: "Clients et Plans de Conformité", documents: "Bibliothèque de Documents", checklists: "Listes de Contrôle",
      credits: "Crédits et Facturation", skills: "Conseiller en Compétences",
      resources: "Centre de Ressources", supplies: "Fournitures et Location", iec: "Matériel IEC", solutions: "Solutions",
      login: "Connexion", signup: "Inscription Gratuite", logout: "Déconnexion" },
    pt: { app_name: "Verda", tagline: "Conformidade Ambiental, Saúde e Segurança — Simplificada.",
      nav_monitor: "Monitorar", nav_manage: "Gerir", nav_grow: "Crescer",
      dashboard: "Painel", reporting: "Relatório EEIS", esia: "ToR e Relatório AIAS",
      analytics: "Análises", incidents: "Incidentes", risk: "Registo de Riscos", actions: "Ações (CAPA)", training: "Formação e Competências",
      audits: "Auditorias", records: "Registos", maps: "Mapas e Visitas ao Local", workflows: "Fluxos de Trabalho",
      clients: "Clientes e Planos de Conformidade", documents: "Biblioteca de Documentos", checklists: "Listas de Verificação",
      credits: "Créditos e Faturação", skills: "Conselheiro de Competências",
      resources: "Centro de Recursos", supplies: "Suprimentos e Aluguer", iec: "Materiais IEC", solutions: "Soluções",
      login: "Entrar", signup: "Inscrição Gratuita", logout: "Sair" },
    zh: { app_name: "Verda", tagline: "环境、健康与安全合规 — 化繁为简。",
      nav_monitor: "监控", nav_manage: "管理", nav_grow: "拓展",
      dashboard: "仪表板", reporting: "EEIS 报告", esia: "职责范围与 ESIA 报告",
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
  trainingCourses: [
    { name: "General EHS Induction", validityMonths: 12 },
    { name: "Fire Safety & Evacuation", validityMonths: 12 },
    { name: "First Aid at Work", validityMonths: 24 },
    { name: "Working at Height", validityMonths: 24 },
    { name: "Confined Space Entry", validityMonths: 12 },
    { name: "Manual Handling", validityMonths: 36 },
    { name: "Hazardous Chemicals / SDS Awareness", validityMonths: 24 },
    { name: "PPE Selection & Use", validityMonths: 24 },
    { name: "Emergency Response / Spill Response", validityMonths: 12 },
    { name: "Defensive Driving", validityMonths: 36 },
    { name: "ISO 45001 Awareness", validityMonths: 36 },
    { name: "ISO 14001 Awareness", validityMonths: 36 }
  ],

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
    { name: "Quarrying & Mining", blurb: "Blast management, dust and noise monitoring checklists, with site mapping for pit and rehabilitation tracking.", sections: ["checklists", "maps", "audits"] },
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
    { name: "Environmental / EHS Manager", blurb: "The full EEIS Reporting builder, audit history, and industry checklists in one place, client by client.", sections: ["reporting", "audits", "checklists"] },
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
  creditCosts: { aiDraft: 20, esiaSubmit: 50, auditAiSummary: 15 },
  freeSignupCredits: 100
};
