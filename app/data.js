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

  creditCosts: { aiDraft: 20, esiaSubmit: 50, auditAiSummary: 15 },
  freeSignupCredits: 100
};
