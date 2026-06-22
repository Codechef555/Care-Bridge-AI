export interface Facility {
  id: string;
  name: string;
  type: 'phc' | 'chc' | 'hospital' | 'pharmacy' | 'mobile_van';
  distanceKm: number;
  phone: string;
  address: string;
  services: string[];
  ayushmanCardAccepted: boolean;
  coords: { x: number; y: number }; // percentage positions on the mock 2D map
  openHours: string;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string;
  eligibility: {
    maxIncomeLevel: number; // yearly income in Rupees, 0 means no limit
    allowedCategories: string[]; // SC, ST, OBC, General, BPL
    states: string[]; // ['All'] or specific states
    minAge?: number;
    maxAge?: number;
    genderRequired?: 'Female' | 'Male' | 'Any';
  };
  requiredDocuments: string[];
  applicationSteps: string[];
}

export interface FirstAidTopic {
  id: string;
  title: string;
  description: string;
  dos: string[];
  donts: string[];
  steps: string[];
}

export interface GenericMedicine {
  id: string;
  genericName: string;
  localBrands: string[];
  category: string;
  purpose: string;
  dosageExample: string;
  warnings: string;
}

export interface AshaPatient {
  id: string;
  name: string;
  age: number;
  houseNumber: string;
  type: 'pregnancy' | 'immunization' | 'chronic_care';
  lastVisit: string;
  nextScheduledTask: string;
  status: 'due' | 'scheduled' | 'none';
  vitalsLog?: {
    bp: string;
    bloodSugar: number;
    date: string;
  };
}

export const mockFacilities: Facility[] = [
  {
    id: 'f1',
    name: 'Rampur Primary Health Centre (PHC)',
    type: 'phc',
    distanceKm: 2.4,
    phone: '+91 98765 01001',
    address: 'Near Rampur Gram Panchayat, Block Rampur',
    services: ['General OPD', 'Basic Immunization', 'Maternal Checkups', 'Cold Storage for Vaccines'],
    ayushmanCardAccepted: true,
    coords: { x: 35, y: 40 },
    openHours: '9:00 AM - 4:00 PM (Mon-Sat)'
  },
  {
    id: 'f2',
    name: 'Tehsil Community Health Centre (CHC)',
    type: 'chc',
    distanceKm: 8.5,
    phone: '+91 98765 01002',
    address: 'Main Highway Road, Tehsil Headquarter',
    services: ['24/7 Emergency Triage', 'Minor Surgeries', 'X-Ray & Basic Lab', 'Pediatrics', 'Dental Care'],
    ayushmanCardAccepted: true,
    coords: { x: 65, y: 25 },
    openHours: '24 Hours Open (Emergency)'
  },
  {
    id: 'f3',
    name: 'District Civil Hospital',
    type: 'hospital',
    distanceKm: 22.0,
    phone: '+91 98765 01003',
    address: 'Hospital Road, District Headquarters',
    services: ['ICU & Advanced Trauma Care', 'Specialist Surgeries', 'Dialysis', 'OB/GYN Specialist Unit', 'Maternity Ward'],
    ayushmanCardAccepted: true,
    coords: { x: 85, y: 70 },
    openHours: '24 Hours Open'
  },
  {
    id: 'f4',
    name: 'Jan Aushadhi Kendra (Generic Pharmacy)',
    type: 'pharmacy',
    distanceKm: 1.8,
    phone: '+91 98765 01004',
    address: 'Bus Stand Market, Rampur Village',
    services: ['Generic Medicines', 'Blood Pressure Check', 'Basic First Aid Supplies'],
    ayushmanCardAccepted: false,
    coords: { x: 20, y: 55 },
    openHours: '8:00 AM - 8:00 PM Daily'
  },
  {
    id: 'f5',
    name: 'CareBridge Mobile Health Van',
    type: 'mobile_van',
    distanceKm: 0.5,
    phone: '+91 98765 01005',
    address: 'Stationed at Rampur Village Square (Every Monday & Thursday)',
    services: ['Free Diagnostic Tests', 'Telemedicine Consultations', 'Nutrition Supplements distribution'],
    ayushmanCardAccepted: true,
    coords: { x: 45, y: 60 },
    openHours: '10:00 AM - 3:00 PM (Mon & Thu)'
  }
];

export const mockSchemes: Scheme[] = [
  {
    id: 's1',
    name: 'Ayushman Bharat PM-JAY',
    description: 'Provides free health cover up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization to poor and vulnerable families.',
    benefits: 'Cashless treatment at all empaneled public and private hospitals, covering surgery, daycare treatments, medicines, diagnostics, and pre-hospitalization.',
    eligibility: {
      maxIncomeLevel: 120000, // ₹1.2 Lakh annual limit (in practice SECC survey based)
      allowedCategories: ['BPL', 'SC', 'ST', 'Landless Household', 'Manual Scavenger'],
      states: ['All'],
      genderRequired: 'Any'
    },
    requiredDocuments: ['Aadhaar Card', 'Ration Card (PM-JAY letter)', 'Income Certificate', 'Caste Certificate (if applicable)'],
    applicationSteps: [
      'Check your name in the SECC-2011 beneficiary list (online or through ASHA worker).',
      'Visit nearest Ayushman Mitra kiosk at any empaneled hospital or Common Service Centre (CSC).',
      'Submit Aadhaar Card and Ration Card to complete e-KYC validation.',
      'Receive your Ayushman Golden Card for free cashless treatments.'
    ]
  },
  {
    id: 's2',
    name: 'Janani Suraksha Yojana (JSY)',
    description: 'A safe motherhood intervention scheme promoting institutional delivery among pregnant women in rural and low-income families.',
    benefits: 'Direct cash assistance of ₹1,400 to rural mothers giving birth in public health facilities, plus free transport and ASHA helper escort incentives.',
    eligibility: {
      maxIncomeLevel: 0, // No income cap for rural institutional delivery
      allowedCategories: ['All', 'SC', 'ST', 'BPL'],
      states: ['All'],
      genderRequired: 'Female'
    },
    requiredDocuments: ['Mother-Child Protection (MCP) Card / Immunization Card', 'Aadhaar Card', 'Bank Account details (Passbook copy)', 'Institutional delivery receipt'],
    applicationSteps: [
      'Register the pregnancy at nearest PHC/Sub-centre within the first 12 weeks.',
      'Obtain the Mother-Child Protection (MCP) Card from the local ANM/ASHA worker.',
      'Undergo minimum of 4 prenatal checkups (ANC) at the local clinic.',
      'Opt for delivery at public hospital/CHC/PHC.',
      'Submit bank details to ASHA worker post-delivery for direct benefit transfer (DBT).'
    ]
  },
  {
    id: 's3',
    name: 'Mission Indradhanush (Immunization)',
    description: 'Ensures full immunization coverage for children up to 2 years of age and pregnant women against vaccine-preventable diseases.',
    benefits: 'Free vaccines against 12 critical diseases including Tuberculosis, Diphtheria, Pertussis, Tetanus, Polio, Measles, Rubella, Hepatitis B, and Rotavirus.',
    eligibility: {
      maxIncomeLevel: 0, // Free for all
      allowedCategories: ['All'],
      states: ['All'],
      maxAge: 2,
      genderRequired: 'Any'
    },
    requiredDocuments: ['Child birth certificate (preferred)', 'MCP / Immunization record card'],
    applicationSteps: [
      'Visit local PHC or immunization booth on Village Health & Nutrition Day (VHND).',
      'Get a new MCP Card registered for your newborn child.',
      'Follow the scheduled dates marked on the card by the auxiliary nurse midwife (ANM).',
      'Ensure all booster shots are completed before the child reaches 2 years of age.'
    ]
  },
  {
    id: 's4',
    name: 'Rashtriya Bal Swasthya Karyakram (RBSK)',
    description: 'Early intervention and screening program for children from birth to 18 years, focusing on defects at birth, deficiencies, diseases, and developmental delays.',
    benefits: 'Free surgical interventions and treatments at specialized referral hospitals for 30 identified health conditions including Congenital Heart Defect, Cleft Lip, and Club Foot.',
    eligibility: {
      maxIncomeLevel: 0, // Free for school children and Anganwadi children
      allowedCategories: ['All'],
      states: ['All'],
      maxAge: 18,
      genderRequired: 'Any'
    },
    requiredDocuments: ['Aadhaar Card of Child/Parent', 'Anganwadi enrollment proof or Government school ID card', 'Referral letter from RBSK mobile screening team'],
    applicationSteps: [
      'RBSK Mobile Health Team screens children at local Anganwadi centres and government schools annually.',
      'If a health condition or birth defect is detected, the child is issued an RBSK Referral Card.',
      'Parents visit District Early Intervention Centre (DEIC) or District Civil Hospital.',
      'Treatments or corrective surgeries are scheduled and performed entirely free of charge.'
    ]
  }
];

export const mockFirstAidHandbook: Record<string, FirstAidTopic> = {
  snake_bite: {
    id: 'fa_snake',
    title: 'Snake Bite Emergency Care',
    description: 'Immediate actions to take after a venomous snake bite in rural areas.',
    dos: [
      'Keep the patient calm and reassure them (fear increases heart rate, spreading venom faster).',
      'Immobilize the bitten limb using a splint or bandage (keep it at or slightly below the level of the heart).',
      'Remove rings, bracelets, or tight clothing immediately as swelling will occur.',
      'Note the appearance of the snake if possible, or remember its color/patterns.',
      'Transport the patient immediately to the nearest PHC or CHC with Anti-Snake Venom (ASV).'
    ],
    donts: [
      'Do NOT tie a tight tourniquet (stopping blood completely can cause gangrene and limb loss).',
      'Do NOT cut the wound or try to suck out the venom with your mouth.',
      'Do NOT apply ice, heat, or chemicals to the bite wound.',
      'Do NOT give the patient aspirin, pain killers, alcohol, or herbal medicines.'
    ],
    steps: [
      'Step 1: Move the person out of the snake’s striking range.',
      'Step 2: Have the person lie down. Restrict movement completely.',
      'Step 3: Wash the bite wound gently with clean soap and water. Cover with a clean, dry dressing.',
      'Step 4: Immobilize the limb using a soft, loose cloth wrap starting from the bite towards the body.',
      'Step 5: Call for local transport or ambulance and go to the nearest CHC.'
    ]
  },
  heat_stroke: {
    id: 'fa_heat',
    title: 'Heatstroke / Severe Dehydration',
    description: 'Life-saving treatment for people working in hot fields who collapse or stop sweating.',
    dos: [
      'Move the person to a cool, shaded area or an air-conditioned room immediately.',
      'Cool the person rapidly using wet sheets, cool water sprays, or fans.',
      'If the person is conscious, offer cool water or Oral Rehydration Salts (ORS) slowly.',
      'Apply ice packs or cold wet cloths to the armpits, groin, neck, and back.'
    ],
    donts: [
      'Do NOT give fluids if the person is unconscious, confused, or vomiting.',
      'Do NOT apply extremely cold ice water baths directly for elderly patients (can trigger cardiac arrest).',
      'Do NOT use alcohol rubs to cool down the skin.'
    ],
    steps: [
      'Step 1: Relocate the individual to shade. Remove heavy clothing.',
      'Step 2: Wet their entire body with cool water and fan them vigorously.',
      'Step 3: Elevate their feet slightly to improve blood circulation to the brain.',
      'Step 4: If they are fully awake, give them ORS or water with a pinch of salt and sugar.',
      'Step 5: Monitor breathing. If temperature does not drop, seek professional medical care.'
    ]
  },
  cpr: {
    id: 'fa_cpr',
    title: 'CPR (Cardiopulmonary Resuscitation)',
    description: 'Standard procedure for a person who is unconscious and not breathing.',
    dos: [
      'Check responsiveness: tap the shoulder and shout "Are you okay?".',
      'Check if the chest is rising and falling (no longer than 10 seconds).',
      'Push hard and fast in the center of the chest (100 to 120 compressions per minute).',
      'Allow the chest to rise completely after each push.'
    ],
    donts: [
      'Do NOT perform chest compressions if the person is responsive or breathing normally.',
      'Do NOT push on the stomach or the ribs. Push only on the breastbone.'
    ],
    steps: [
      'Step 1: Place the heel of one hand in the center of the patient’s chest, place your other hand on top, interlocking fingers.',
      'Step 2: Keep elbows locked. Use your body weight to compress the chest down by at least 2 inches.',
      'Step 3: Push rapidly to the beat of "Staying Alive" (100-120 beats/min).',
      'Step 4: Provide 30 compressions followed by 2 quick rescue breaths (if trained), or perform hands-only CPR.',
      'Step 5: Continue without stopping until professional help arrives or the patient wakes up.'
    ]
  },
  bleeding: {
    id: 'fa_bleed',
    title: 'Severe Bleeding Control',
    description: 'Stopping rapid blood loss from cuts, farm accidents, or injuries.',
    dos: [
      'Apply direct, firm pressure on the wound using a clean cloth, bandage, or your hand.',
      'Elevate the injured limb above the level of the heart if possible.',
      'Keep pressure applied constantly for at least 5-10 minutes without checking.',
      'Add more bandages on top of the original one if blood leaks through.'
    ],
    donts: [
      'Do NOT remove the original cloth/bandage if it gets soaked (this tears away forming blood clots). Just wrap more over it.',
      'Do NOT try to wash deep wounds that are bleeding severely.',
      'Do NOT remove embedded objects (like a nail or glass). Apply pressure around the object instead.'
    ],
    steps: [
      'Step 1: Lay the victim down and elevate the bleeding site.',
      'Step 2: Place a clean cloth over the wound and apply firm, direct pressure with both hands.',
      'Step 3: Wrap a bandage tightly over the cloth to hold pressure in place (not so tight that it stops pulse).',
      'Step 4: If bleeding continues, apply pressure to the nearest pressure point (brachial artery in arm, femoral artery in groin).',
      'Step 5: Keep the patient warm and seek emergency transport.'
    ]
  }
};

export const mockGenericMedicines: GenericMedicine[] = [
  {
    id: 'm1',
    genericName: 'Paracetamol / Acetaminophen (PCM)',
    localBrands: ['Crocin', 'Calpol', 'Dolo-650', 'Pacimol'],
    category: 'Analgesic / Antipyretic',
    purpose: 'Relief from mild to moderate body pain, headache, and reducing fever.',
    dosageExample: 'Adults: 500mg-650mg every 4-6 hours. Maximum 4000mg (4 grams) per day.',
    warnings: 'Excessive use can cause severe liver damage. Avoid alcohol while taking paracetamol.'
  },
  {
    id: 'm2',
    genericName: 'Metformin',
    localBrands: ['Glycomet', 'Obimet', 'Metformin-SR', 'Zomet'],
    category: 'Antidiabetic (Oral)',
    purpose: 'Managing high blood sugar levels in Type 2 Diabetes.',
    dosageExample: 'Adults: Usually starts at 500mg once or twice daily, taken with meals.',
    warnings: 'Take exactly as prescribed. Monitor kidney functions periodically. Avoid fasting while on this medication.'
  },
  {
    id: 'm3',
    genericName: 'Amoxicillin',
    localBrands: ['Novamox', 'Amoxil', 'Mox', 'Almox'],
    category: 'Antibiotic (Penicillin type)',
    purpose: 'Treats bacterial infections of the chest, throat, ear, urinary tract, and skin.',
    dosageExample: 'Adults: 250mg-500mg every 8 hours. Complete the full course even if you feel better.',
    warnings: 'Will not work for viral infections (like common cold or flu). Do not use if allergic to penicillin.'
  },
  {
    id: 'm4',
    genericName: 'ORS (Oral Rehydration Salts)',
    localBrands: ['Electral', 'Walyte', 'ORS-L', 'Pediolyte'],
    category: 'Electrolyte Replenisher',
    purpose: 'Prevents dehydration caused by watery diarrhea, vomiting, or excessive heat sweating.',
    dosageExample: 'Dissolve 1 packet (21.8g) in 1 litre of clean drinking water. Drink small sips over 24 hours.',
    warnings: 'Do not boil the prepared ORS solution. Discard any unused solution after 24 hours.'
  }
];

export const mockAshaPatients: AshaPatient[] = [
  {
    id: 'p1',
    name: 'Sita Devi',
    age: 24,
    houseNumber: 'H-14, Ward 2',
    type: 'pregnancy',
    lastVisit: '2026-06-10',
    nextScheduledTask: '3rd ANC Checkup & Iron Supplement refill',
    status: 'due',
    vitalsLog: { bp: '110/70', bloodSugar: 92, date: '2026-06-10' }
  },
  {
    id: 'p2',
    name: 'Rahul Kumar (Child)',
    age: 1.5,
    houseNumber: 'H-03, Ward 1',
    type: 'immunization',
    lastVisit: '2026-05-15',
    nextScheduledTask: 'Measles-Rubella (MR) 2nd Dose vaccine',
    status: 'scheduled',
    vitalsLog: { bp: 'N/A', bloodSugar: 0, date: '2026-05-15' }
  },
  {
    id: 'p3',
    name: 'Ramesh Singh',
    age: 56,
    houseNumber: 'H-32, Ward 3',
    type: 'chronic_care',
    lastVisit: '2026-06-18',
    nextScheduledTask: 'Blood Pressure monitoring & Diabetes medication review',
    status: 'none',
    vitalsLog: { bp: '145/92', bloodSugar: 165, date: '2026-06-18' }
  },
  {
    id: 'p4',
    name: 'Meena Bai',
    age: 28,
    houseNumber: 'H-22, Ward 2',
    type: 'pregnancy',
    lastVisit: '2026-06-01',
    nextScheduledTask: 'Tetanus Toxoid (TT) 2nd Dose immunization',
    status: 'due',
    vitalsLog: { bp: '120/80', bloodSugar: 88, date: '2026-06-01' }
  },
  {
    id: 'p5',
    name: 'Karan Lal (Child)',
    age: 0.8,
    houseNumber: 'H-45, Ward 4',
    type: 'immunization',
    lastVisit: '2026-06-20',
    nextScheduledTask: 'OPV 3rd Dose & Pentavalent 3rd Dose vaccine check',
    status: 'none',
    vitalsLog: { bp: 'N/A', bloodSugar: 0, date: '2026-06-20' }
  }
];
