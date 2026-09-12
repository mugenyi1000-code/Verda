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
  creditCosts: { aiDraft: 20, esiaSubmit: 50, auditAiSummary: 15 },
  freeSignupCredits: 100
};
