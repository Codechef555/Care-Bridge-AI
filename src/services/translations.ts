export type Language = 'en' | 'hi' | 'ta' | 'te' | 'es';

export interface TranslationSet {
  title: string;
  subtitle: string;
  assistantTab: string;
  facilitiesTab: string;
  schemesTab: string;
  emergencyTab: string;
  vitalsTab: string;
  ashaTab: string;
  
  // Accessibility
  textNormal: string;
  textLarge: string;
  textHuge: string;
  highContrast: string;
  normalContrast: string;
  lowBandwidthOn: string;
  lowBandwidthOff: string;
  speechOn: string;
  speechOff: string;
  micSpeak: string;
  micListening: string;
  
  // Chat
  chatPlaceholder: string;
  sendBtn: string;
  initialMessage: string;
  routingTo: string;
  thinking: string;
  activeAgent: string;
  
  // Facilities
  facilityHeader: string;
  facilitySearchPlaceholder: string;
  filterTypeAll: string;
  filterTypePHC: string;
  filterTypeCHC: string;
  filterTypeHospital: string;
  filterTypePharmacy: string;
  filterTypeVan: string;
  filterDistance: string;
  ayushmanSupported: string;
  callCenter: string;
  getRoute: string;
  hours: string;
  services: string;
  
  // Schemes
  schemeHeader: string;
  schemeState: string;
  schemeIncome: string;
  schemeCategory: string;
  schemeAge: string;
  schemeGender: string;
  schemeHouseholdSize: string;
  calculateBtn: string;
  eligibleSchemes: string;
  highEligibility: string;
  medEligibility: string;
  lowEligibility: string;
  documentsChecklist: string;
  applicationProcess: string;
  genderFemale: string;
  genderMale: string;
  genderAny: string;
  
  // Emergency
  emergencyHeader: string;
  emergencyPhoneBook: string;
  emergencyWarningText: string;
  firstAidTitle: string;
  dos: string;
  donts: string;
  steps: string;
  
  // Vitals Tracker
  vitalsHeader: string;
  bpLabel: string;
  bloodSugarLabel: string;
  tempLabel: string;
  pulseLabel: string;
  addLogBtn: string;
  logHistory: string;
  normalStatus: string;
  warningStatus: string;
  dangerStatus: string;
  
  // ASHA
  ashaHeader: string;
  totalPregnant: string;
  immunizationDue: string;
  chronicPatients: string;
  patientName: string;
  houseNum: string;
  nextTask: string;
  statusDue: string;
  statusScheduled: string;
  statusDone: string;
  markDone: string;
}

export const translations: Record<Language, TranslationSet> = {
  en: {
    title: "CareBridge AI",
    subtitle: "RURAL HEALTHCARE NAVIGATION",
    assistantTab: "AI Care Assistant",
    facilitiesTab: "Find Clinic",
    schemesTab: "Health Schemes",
    emergencyTab: "First Aid & Emergency",
    vitalsTab: "Vital Tracker",
    ashaTab: "ASHA Worker Hub",
    textNormal: "Normal Font Size",
    textLarge: "Large Font Size",
    textHuge: "Huge Font Size",
    highContrast: "High Contrast On",
    normalContrast: "High Contrast Off",
    lowBandwidthOn: "Ultra-low Bandwidth Mode On (No Animations/Graphics)",
    lowBandwidthOff: "Ultra-low Bandwidth Mode Off",
    speechOn: "Text-to-Speech Voice Output On",
    speechOff: "Text-to-Speech Voice Output Off",
    micSpeak: "Click to speak your symptoms",
    micListening: "Listening... speak now",
    chatPlaceholder: "Describe symptoms or ask about clinics/schemes...",
    sendBtn: "Send",
    initialMessage: "Namaste! I am CareBridge AI, your rural health companion. How can I help you today? You can describe symptoms, ask where to find a clinic, or check government schemes.",
    routingTo: "CareBridge Dispatcher: Routing query to",
    thinking: "Analyzing query & checking health database...",
    activeAgent: "Active Agent",
    facilityHeader: "Rural Healthcare Directory",
    facilitySearchPlaceholder: "Search clinics, services (e.g., vaccine, delivery)...",
    filterTypeAll: "All Facility Types",
    filterTypePHC: "Primary Health Center (PHC)",
    filterTypeCHC: "Community Health Center (CHC)",
    filterTypeHospital: "District Civil Hospital",
    filterTypePharmacy: "Generic Pharmacy",
    filterTypeVan: "Mobile Health Van",
    filterDistance: "Within",
    ayushmanSupported: "Ayushman Golden Card Accepted",
    callCenter: "Call Facility",
    getRoute: "Show Route",
    hours: "Timings",
    services: "Services Available",
    schemeHeader: "Government Schemes Eligibility",
    schemeState: "Your State",
    schemeIncome: "Annual Family Income (₹)",
    schemeCategory: "Category",
    schemeAge: "Age (Years)",
    schemeGender: "Gender",
    schemeHouseholdSize: "Family Members",
    calculateBtn: "Calculate Eligibility",
    eligibleSchemes: "Matching Government Health Schemes",
    highEligibility: "High Match (Likely Eligible)",
    medEligibility: "Medium Match (Check with ASHA)",
    lowEligibility: "Low Match / Not Eligible",
    documentsChecklist: "Documents Checklist",
    applicationProcess: "Step-by-Step Registration Process",
    genderFemale: "Female",
    genderMale: "Male",
    genderAny: "Any / Prefer not to say",
    emergencyHeader: "First Aid & Emergency Triage",
    emergencyPhoneBook: "Rural Helpline Directory",
    emergencyWarningText: "RED ALERT: In case of immediate life threat (severe chest pain, unconsciousness, snake bite, heavy bleeding), seek emergency hospital care immediately.",
    firstAidTitle: "Offline Medical First-Aid Guide",
    dos: "What You SHOULD Do",
    donts: "What You SHOULD NOT Do",
    steps: "Step-by-Step Emergency Response",
    vitalsHeader: "Chronic Care Vital Tracker",
    bpLabel: "Blood Pressure (systolic/diastolic)",
    bloodSugarLabel: "Blood Sugar (mg/dL)",
    tempLabel: "Temperature (°F)",
    pulseLabel: "Pulse Rate (bpm)",
    addLogBtn: "Record Vitals in Local Log",
    logHistory: "Past Vital Records (Saved Offline)",
    normalStatus: "Normal Health Zone",
    warningStatus: "Caution: Monitor Closely",
    dangerStatus: "Alert: Contact Clinic Soon",
    ashaHeader: "ASHA Worker Community Dashboard",
    totalPregnant: "Pregnant Mothers",
    immunizationDue: "Immunization Due",
    chronicPatients: "Chronic Cases",
    patientName: "Patient Name",
    houseNum: "House",
    nextTask: "Scheduled Task",
    statusDue: "Action Due",
    statusScheduled: "Scheduled",
    statusDone: "Completed",
    markDone: "Mark Completed"
  },
  hi: {
    title: "केयरब्रिज एआई",
    subtitle: "ग्रामीण स्वास्थ्य सेवा सहायक",
    assistantTab: "एआई स्वास्थ्य सहायक",
    facilitiesTab: "अस्पताल खोजें",
    schemesTab: "सरकारी योजनाएं",
    emergencyTab: "प्राथमिक उपचार और आपातकाल",
    vitalsTab: "वाइटल ट्रैकर",
    ashaTab: "आशा वर्कर हब",
    textNormal: "सामान्य फ़ॉन्ट आकार",
    textLarge: "बड़ा फ़ॉन्ट आकार",
    textHuge: "बहुत बड़ा फ़ॉन्ट आकार",
    highContrast: "हाई कंट्रास्ट ऑन",
    normalContrast: "हाई कंट्रास्ट ऑफ",
    lowBandwidthOn: "कम इंटरनेट मोड ऑन (एनीमेशन बंद)",
    lowBandwidthOff: "कम इंटरनेट मोड ऑफ",
    speechOn: "बोलकर सुनाने की सेवा चालू",
    speechOff: "बोलकर सुनाने की सेवा बंद",
    micSpeak: "अपने लक्षण बताने के लिए दबाएं",
    micListening: "सुन रहा हूँ... अब बोलें",
    chatPlaceholder: "लक्षण बताएं या अस्पतालों/योजनाओं के बारे में पूछें...",
    sendBtn: "भेजें",
    initialMessage: "नमस्ते! मैं केयरब्रिज एआई हूँ, आपका ग्रामीण स्वास्थ्य साथी। आज मैं आपकी कैसे मदद कर सकता हूँ? आप अपने लक्षण बता सकते हैं, पास के अस्पताल का पता लगा सकते हैं, या सरकारी स्वास्थ्य योजनाओं की जानकारी ले सकते हैं।",
    routingTo: "केयरब्रिज डिस्पैचर: प्रश्न को भेज रहा है",
    thinking: "आपके प्रश्न का विश्लेषण कर डेटाबेस जांचा जा रहा है...",
    activeAgent: "सक्रिय एजेंट",
    facilityHeader: "ग्रामीण स्वास्थ्य सेवा निर्देशिका",
    facilitySearchPlaceholder: "अस्पताल, सेवाएं खोजें (जैसे: टीका, प्रसव)...",
    filterTypeAll: "सभी प्रकार के अस्पताल",
    filterTypePHC: "प्राथमिक स्वास्थ्य केंद्र (PHC)",
    filterTypeCHC: "सामुदायिक स्वास्थ्य केंद्र (CHC)",
    filterTypeHospital: "जिला नागरिक अस्पताल",
    filterTypePharmacy: "जेनेरिक मेडिकल स्टोर",
    filterTypeVan: "मोबाइल स्वास्थ्य वैन",
    filterDistance: "के भीतर",
    ayushmanSupported: "आयुष्मान गोल्डन कार्ड स्वीकार्य",
    callCenter: "अस्पताल को कॉल करें",
    getRoute: "रास्ता दिखाएं",
    hours: "कार्य समय",
    services: "उपलब्ध सेवाएं",
    schemeHeader: "सरकारी स्वास्थ्य योजना पात्रता",
    schemeState: "आपका राज्य",
    schemeIncome: "वार्षिक पारिवारिक आय (₹)",
    schemeCategory: "वर्ग / जाति श्रेणी",
    schemeAge: "आयु (वर्ष)",
    schemeGender: "लिंग",
    schemeHouseholdSize: "परिवार के सदस्य",
    calculateBtn: "पात्रता जांचें",
    eligibleSchemes: "आपके लिए सरकारी स्वास्थ्य योजनाएं",
    highEligibility: "उच्च पात्रता (आप पात्र हो सकते हैं)",
    medEligibility: "मध्यम पात्रता (आशा वर्कर से संपर्क करें)",
    lowEligibility: "कम पात्रता / आप पात्र नहीं हैं",
    documentsChecklist: "आवश्यक दस्तावेजों की सूची",
    applicationProcess: "आवेदन करने की चरण-दर-चरण प्रक्रिया",
    genderFemale: "महिला",
    genderMale: "पुरुष",
    genderAny: "अन्य / बताना नहीं चाहते",
    emergencyHeader: "प्राथमिक उपचार और आपातकालीन निर्देश",
    emergencyPhoneBook: "ग्रामीण हेल्पलाइन डायरेक्टरी",
    emergencyWarningText: "आपातकालीन चेतावनी: यदि गंभीर स्थिति है (जैसे गंभीर छाती में दर्द, बेहोशी, सांप का काटना, तेज खून बहना), तो तुरंत नजदीकी अस्पताल जाएं।",
    firstAidTitle: "ऑफलाइन मेडिकल फर्स्ट-एड गाइड",
    dos: "आपको क्या करना चाहिए (क्या करें)",
    donts: "आपको क्या नहीं करना चाहिए (क्या न करें)",
    steps: "आपातकालीन चरण-दर-चरण प्रतिक्रिया",
    vitalsHeader: "दीर्घकालिक बीमारी वाइटल ट्रैकर",
    bpLabel: "रक्तचाप (सिस्टोलिक/डायस्टोलिक)",
    bloodSugarLabel: "ब्लड शुगर (mg/dL)",
    tempLabel: "शरीर का तापमान (°F)",
    pulseLabel: "नब्ज की दर (bpm)",
    addLogBtn: "लोकल लॉग में वाइटल्स दर्ज करें",
    logHistory: "पुराने स्वास्थ्य रिकॉर्ड (ऑफलाइन सुरक्षित)",
    normalStatus: "सामान्य स्वास्थ्य क्षेत्र",
    warningStatus: "सावधानी: निगरानी रखें",
    dangerStatus: "चेतावनी: जल्द ही क्लिनिक से संपर्क करें",
    ashaHeader: "आशा वर्कर ग्राम स्वास्थ्य डैशबोर्ड",
    totalPregnant: "गर्भवती माताएं",
    immunizationDue: "टीकाकरण देय",
    chronicPatients: "गंभीर बीमारी मरीज",
    patientName: "मरीज का नाम",
    houseNum: "घर संख्या",
    nextTask: "निर्धारित स्वास्थ्य कार्य",
    statusDue: "कार्य देय है",
    statusScheduled: "निर्धारित",
    statusDone: "पूरा किया",
    markDone: "सम्पन्न मार्क करें"
  },
  ta: {
    title: "கேர்பிரிட்ஜ் ஏஐ",
    subtitle: "கிராமப்புற சுகாதார வழிகாட்டி",
    assistantTab: "ஏஐ சுகாதார உதவியாளர்",
    facilitiesTab: "மருத்துவமனை தேடல்",
    schemesTab: "அரசு திட்டங்கள்",
    emergencyTab: "முதலுதவி & அவசரநிலை",
    vitalsTab: "உடல்நல கண்காணிப்பு",
    ashaTab: "ஆஷா பணியாளர் மையம்",
    textNormal: "சாதாரண எழுத்து அளவு",
    textLarge: "பெரிய எழுத்து அளவு",
    textHuge: "மிகப் பெரிய எழுத்து அளவு",
    highContrast: "உயர் மாறுபாடு ஆன்",
    normalContrast: "உயர் மாறுபாடு ஆஃப்",
    lowBandwidthOn: "குறைந்த இணைய வேகம் ஆன் (அசைவூட்டம் நிறுத்தம்)",
    lowBandwidthOff: "குறைந்த இணைய வேகம் ஆஃப்",
    speechOn: "ஒலி வாசிப்பு ஆன் செய்யப்பட்டுள்ளது",
    speechOff: "ஒலி வாசிப்பு ஆஃப் செய்யப்பட்டுள்ளது",
    micSpeak: "உங்கள் அறிகுறிகளைப் பேச அழுத்தவும்",
    micListening: "கேட்கிறது... இப்போது பேசவும்",
    chatPlaceholder: "அறிகுறிகளை விவரிக்கவும் அல்லது மருத்துவமனை/திட்டம் பற்றி கேட்கவும்...",
    sendBtn: "அனுப்பு",
    initialMessage: "வணக்கம்! நான் கேர்பிரிட்ஜ் ஏஐ, உங்கள் கிராமப்புற சுகாதார உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்? உங்கள் அறிகுறிகளை விவரிக்கலாம், மருத்துவமனை எங்குள்ளது என்று கேட்கலாம் அல்லது அரசு திட்டங்களைப் பற்றி அறியலாம்.",
    routingTo: "கேர்பிரிட்ஜ் டிஸ்பாட்சர்: வினவலை அனுப்புகிறது",
    thinking: "பகுப்பாய்வு செய்து சுகாதார தரவுத்தளத்தை சரிபார்க்கிறது...",
    activeAgent: "செயலில் உள்ள முகவர்",
    facilityHeader: "கிராமப்புற சுகாதார அடைவு",
    facilitySearchPlaceholder: "மருத்துவமனைகள், சேவைகளைத் தேடுங்கள் (எ.கா: தடுப்பூசி, பிரசவம்)...",
    filterTypeAll: "அனைத்து மருத்துவமனைகள்",
    filterTypePHC: "ஆரம்ப சுகாதார நிலையம் (PHC)",
    filterTypeCHC: "சமூக சுகாதார நிலையம் (CHC)",
    filterTypeHospital: "மாவட்ட அரசு மருத்துவமனை",
    filterTypePharmacy: "ஜெனரிக் மருந்தகம்",
    filterTypeVan: "நடமாடும் மருத்துவ வாகனம்",
    filterDistance: "அதற்குள்",
    ayushmanSupported: "ஆயுஷ்மான் அட்டை ஏற்கப்படும்",
    callCenter: "மருத்துவமனையை அழைக்க",
    getRoute: "வழி காட்டு",
    hours: "வேலை நேரம்",
    services: "கிடைக்கும் சேவைகள்",
    schemeHeader: "அரசு திட்டங்களுக்கான தகுதி",
    schemeState: "உங்கள் மாநிலம்",
    schemeIncome: "ஆண்டு குடும்ப வருமானம் (₹)",
    schemeCategory: "பிரிவு",
    schemeAge: "வயது (ஆண்டுகள்)",
    schemeGender: "பாலினம்",
    schemeHouseholdSize: "குடும்ப உறுப்பினர்கள்",
    calculateBtn: "தகுதியைக் கணக்கிடுங்கள்",
    eligibleSchemes: "பொருத்தமான அரசு சுகாதார திட்டங்கள்",
    highEligibility: "அதிக தகுதி (நீங்கள் தகுதியுடையவர்)",
    medEligibility: "நடுத்தர தகுதி (ஆஷா பணியாளரை அணுகவும்)",
    lowEligibility: "குறைந்த தகுதி / தகுதி இல்லை",
    documentsChecklist: "தேவையான ஆவணங்களின் பட்டியல்",
    applicationProcess: "விண்ணப்பிப்பதற்கான படிநிலை செயல்முறை",
    genderFemale: "பெண்",
    genderMale: "ஆண்",
    genderAny: "மற்றவை / கூற விரும்பவில்லை",
    emergencyHeader: "முதலுதவி மற்றும் அவசரநிலை அறிவுறுத்தல்கள்",
    emergencyPhoneBook: "கிராமப்புற அவசர எண்கள்",
    emergencyWarningText: "ஆபத்து எச்சரிக்கை: உயிருக்கு ஆபத்தான நிலையில் (நெஞ்சு வலி, மயக்கம், பாம்பு கடி, கடுமையான ரத்தக்கசிவு), உடனடியாக அருகிலுள்ள மருத்துவமனைக்குச் செல்லுங்கள்.",
    firstAidTitle: "ஆஃப்லைன் முதலுதவி வழிகாட்டி",
    dos: "செய்ய வேண்டியவை",
    donts: "செய்யக் கூடாதவை",
    steps: "அவசரகால படிநிலை செயல்முறை",
    vitalsHeader: "நாள்பட்ட நோய் கண்காணிப்பு",
    bpLabel: "இரத்த அழுத்தம் (சிஸ்டாலிக்/டயஸ்டாலிக்)",
    bloodSugarLabel: "இரத்த சர்க்கரை அளவு (mg/dL)",
    tempLabel: "உடல் வெப்பநிலை (°F)",
    pulseLabel: "நாடித் துடிப்பு (bpm)",
    addLogBtn: "உடல்நல அளவுகளைப் பதிவு செய்",
    logHistory: "முந்தைய பதிவுகள் (ஆஃப்லைனில் சேமிக்கப்பட்டது)",
    normalStatus: "சாதாரண உடல்நிலை மண்டலம்",
    warningStatus: "எச்சரிக்கை: உன்னிப்பாகக் கவனியுங்கள்",
    dangerStatus: "அபாயம்: உடனடியாக மருத்துவரை அணுகவும்",
    ashaHeader: "ஆஷா கிராம சுகாதார கட்டுப்பாட்டு பலகை",
    totalPregnant: "கர்ப்பிணித் தாய்மார்கள்",
    immunizationDue: "தடுப்பூசி பெற வேண்டியவர்கள்",
    chronicPatients: "நாள்பட்ட நோயாளிகள்",
    patientName: "நோயாளி பெயர்",
    houseNum: "வீட்டு எண்",
    nextTask: "திட்டமிடப்பட்ட பணி",
    statusDue: "செய்ய வேண்டிய பணி",
    statusScheduled: "திட்டமிடப்பட்டது",
    statusDone: "முடிக்கப்பட்டது",
    markDone: "முடிக்கப்பட்டது என குறிக்கவும்"
  },
  te: {
    title: "కేర్‌బ్రిడ్జ్ ఏఐ",
    subtitle: "గ్రామీణ ఆరోగ్య సహాయకుడు",
    assistantTab: "ఏఐ ఆరోగ్య సహాయకుడు",
    facilitiesTab: "ఆసుపత్రిని కనుగొనండి",
    schemesTab: "ప్రభుత్వ పథకాలు",
    emergencyTab: "ప్రథమ చికిత్స & అత్యవసర",
    vitalsTab: "ఆరోగ్య సూచికల ట్రాకర్",
    ashaTab: "ఆశా వర్కర్ హబ్",
    textNormal: "సాధారణ ఫాంట్ పరిమాణం",
    textLarge: "పెద్ద ఫాంట్ పరిమాణం",
    textHuge: "చాలా పెద్ద ఫాంట్ పరిమాణం",
    highContrast: "హై కాంట్రాస్ట్ ఆన్",
    normalContrast: "హై కాంట్రాస్ట్ ఆఫ్",
    lowBandwidthOn: "తక్కువ ఇంటర్నెట్ మోడ్ ఆన్ (యానిమేషన్లు ఆఫ్)",
    lowBandwidthOff: "తక్కువ ఇంటర్నెట్ మోడ్ ఆఫ్",
    speechOn: "వాయిస్ రీడర్ ఆన్",
    speechOff: "వాయిస్ రీడర్ ఆఫ్",
    micSpeak: "మీ లక్షణాలను మాట్లాడటానికి నొక్కండి",
    micListening: "వింటున్నాను... ఇప్పుడు మాట్లాడండి",
    chatPlaceholder: "లక్షణాలు చెప్పండి లేదా ఆసుపత్రులు/పథకాల గురించి అడగండి...",
    sendBtn: "పంపు",
    initialMessage: "నమస్తే! నేను కేర్‌బ్రిడ్జ్ ఏఐ, మీ గ్రామీణ ఆరోగ్య సహచరుడిని. ఈ రోజు నేను మీకు ఎలా సహాయపడగలను? మీరు మీ లక్షణాలను చెప్పవచ్చు, ఆసుపత్రి ఎక్కడుందో తెలుసుకోవచ్చు లేదా ప్రభుత్వ పథకాల గురించి అడగవచ్చు.",
    routingTo: "కేర్‌బ్రిడ్జ్ డిస్పాచర్: ప్రశ్నను బదిలీ చేస్తోంది",
    thinking: "విశ్లేషిస్తోంది మరియు ఆరోగ్య డేటాబేస్ తనిఖీ చేస్తోంది...",
    activeAgent: "యాక్టివ్ ఏజెంట్",
    facilityHeader: "గ్రామీణ ఆరోగ్య డైరెక్టరీ",
    facilitySearchPlaceholder: "ఆసుపత్రులు, సేవలను వెతకండి (ఉదా: టీకాలు, ప్రసవాలు)...",
    filterTypeAll: "అన్ని రకాల ఆసుపత్రులు",
    filterTypePHC: "ప్రాథమిక ఆరోగ్య కేంద్రం (PHC)",
    filterTypeCHC: "సామాజిక ఆరోగ్య కేంద్రం (CHC)",
    filterTypeHospital: "జిల్లా సివిల్ ఆసుపత్రి",
    filterTypePharmacy: "జెనరిక్ మందుల దుకాణం",
    filterTypeVan: "మొబైల్ హెల్త్ వ్యాన్",
    filterDistance: "పరిధిలో",
    ayushmanSupported: "ఆయుష్మాన్ గోల్డెన్ కార్డ్ అంగీకరించబడును",
    callCenter: "ఆసుపత్రికి కాల్ చేయండి",
    getRoute: "దారి చూపించు",
    hours: "పని వేళలు",
    services: "అందుబాటులో ఉన్న సేవలు",
    schemeHeader: "ప్రభుత్వ పథకాల అర్హత",
    schemeState: "మీ రాష్ట్రం",
    schemeIncome: "వార్షిక కుటుంబ ఆదాయం (₹)",
    schemeCategory: "కేటగిరీ",
    schemeAge: "వయస్సు (సంవత్సరాలు)",
    schemeGender: "లింగం",
    schemeHouseholdSize: "కుటుంబ సభ్యులు",
    calculateBtn: "అర్హతను లెక్కించండి",
    eligibleSchemes: "సరిపోయే ప్రభుత్వ ఆరోగ్య పథకాలు",
    highEligibility: "అధిక అర్హత (మీరు అర్హులు కావచ్చు)",
    medEligibility: "మధ్యస్థ అర్హత (ఆశా వర్కర్ ని సంప్రదించండి)",
    lowEligibility: "తక్కువ అర్హత / అర్హత లేదు",
    documentsChecklist: "అవసరమైన పత్రాల జాబితా",
    applicationProcess: "దరఖాస్తు చేసుకోవడానికి దశలవారీ విధానం",
    genderFemale: "స్త్రీ",
    genderMale: "పురుషుడు",
    genderAny: "ఇతర / చెప్పడానికి ఇష్టపడలేదు",
    emergencyHeader: "ప్రథమ చికిత్స & అత్యవసర మార్గదర్శకాలు",
    emergencyPhoneBook: "గ్రామీణ అత్యవసర ఫోన్ నంబర్లు",
    emergencyWarningText: "అత్యవసర హెచ్చరిక: ప్రాణాపాయ స్థితిలో (తీవ్రమైన గుండె నొప్పి, స్పృహ తప్పడం, పాము కాటు, అధిక రక్తస్రావం) వెంటనే సమీప ఆసుపత్రికి వెళ్ళండి.",
    firstAidTitle: "ఆఫ్‌లైన్ ప్రథమ చికిత్స గైడ్",
    dos: "చేయవలసిన పనులు",
    donts: "చేయకూడని పనులు",
    steps: "అత్యవసర సమయాల్లో దశలవారీ చికిత్స",
    vitalsHeader: "దీర్ఘకాలిక వ్యాధి సంరక్షణ ట్రాకర్",
    bpLabel: "రక్తపోటు (సిస్టాలిక్/డయాస్టాలిక్)",
    bloodSugarLabel: "బ్లడ్ షుగర్ (mg/dL)",
    tempLabel: "శరీర ఉష్ణోగ్రత (°F)",
    pulseLabel: "నాడి వేగం (bpm)",
    addLogBtn: "ఆరోగ్య సూచికలను నమోదు చేయండి",
    logHistory: "గత ఆరోగ్య రికార్డులు (ఆఫ్‌లైన్ లో భద్రపరచబడ్డాయి)",
    normalStatus: "సాధారణ ఆరోగ్య స్థితి",
    warningStatus: "జాగ్రత్త: పర్యవేక్షించండి",
    dangerStatus: "ప్రమాదం: త్వరలో వైద్యుడిని సంప్రదించండి",
    ashaHeader: "ఆశా వర్కర్ గ్రామ ఆరోగ్య నియంత్రణ బోర్డు",
    totalPregnant: "గర్భిణీ తల్లులు",
    immunizationDue: "టీకాలు వేయవలసిన వారు",
    chronicPatients: "దీర్ఘకాలిక రోగులు",
    patientName: "రోగి పేరు",
    houseNum: "ఇంటి నంబర్",
    nextTask: "నిర్ణీత ఆరోగ్య సేవ",
    statusDue: "పని చేయాల్సి ఉంది",
    statusScheduled: "షెడ్యూల్ చేయబడింది",
    statusDone: "పూర్తయింది",
    markDone: "పూర్తయినట్లు మార్క్ చేయి"
  },
  es: {
    title: "CareBridge AI",
    subtitle: "NAVEGACIÓN DE SALUD RURAL",
    assistantTab: "Asistente de Salud AI",
    facilitiesTab: "Buscar Clínica",
    schemesTab: "Planes de Salud",
    emergencyTab: "Primeros Auxilios",
    vitalsTab: "Registro de Vitales",
    ashaTab: "Centro de Promotores",
    textNormal: "Texto Normal",
    textLarge: "Texto Grande",
    textHuge: "Texto Gigante",
    highContrast: "Contraste Alto Activo",
    normalContrast: "Contraste Alto Inactivo",
    lowBandwidthOn: "Modo Ancho de Banda Bajo Activo",
    lowBandwidthOff: "Modo Ancho de Banda Bajo Inactivo",
    speechOn: "Lectura de Voz Activa",
    speechOff: "Lectura de Voz Inactiva",
    micSpeak: "Haga clic para hablar sus síntomas",
    micListening: "Escuchando... hable ahora",
    chatPlaceholder: "Describa síntomas o pregunte por clínicas/planes...",
    sendBtn: "Enviar",
    initialMessage: "¡Hola! Soy CareBridge AI, su asistente de salud rural. ¿Cómo puedo ayudarle hoy? Puede describir síntomas, buscar una clínica o consultar programas gubernamentales.",
    routingTo: "CareBridge Dispatcher: Enrutando consulta a",
    thinking: "Analizando consulta y verificando base de datos...",
    activeAgent: "Agente Activo",
    facilityHeader: "Directorio de Salud Rural",
    facilitySearchPlaceholder: "Buscar clínicas, servicios (ej. vacunas, partos)...",
    filterTypeAll: "Todos los tipos de instalaciones",
    filterTypePHC: "Centro de Salud Primaria (PHC)",
    filterTypeCHC: "Centro de Salud Comunitaria (CHC)",
    filterTypeHospital: "Hospital Civil del Distrito",
    filterTypePharmacy: "Farmacia Genérica",
    filterTypeVan: "Unidad Médica Móvil",
    filterDistance: "Dentro de",
    ayushmanSupported: "Tarjeta de Salud Aceptada",
    callCenter: "Llamar a Clínica",
    getRoute: "Ver Ruta",
    hours: "Horario",
    services: "Servicios Disponibles",
    schemeHeader: "Elegibilidad de Programas de Salud",
    schemeState: "Su Estado",
    schemeIncome: "Ingreso Familiar Anual (₹)",
    schemeCategory: "Categoría",
    schemeAge: "Edad (Años)",
    schemeGender: "Género",
    schemeHouseholdSize: "Miembros del Hogar",
    calculateBtn: "Calcular Elegibilidad",
    eligibleSchemes: "Programas de Salud Gubernamentales",
    highEligibility: "Coincidencia Alta (Probablemente Elegible)",
    medEligibility: "Coincidencia Media (Verificar con Promotor)",
    lowEligibility: "Coincidencia Baja / No Elegible",
    documentsChecklist: "Documentos Requeridos",
    applicationProcess: "Proceso de Registro Paso a Paso",
    genderFemale: "Femenino",
    genderMale: "Masculino",
    genderAny: "Cualquiera / Prefiero no decir",
    emergencyHeader: "Primeros Auxilios y Triage de Emergencia",
    emergencyPhoneBook: "Directorio de Helplines Rurales",
    emergencyWarningText: "ALERTA ROJA: En caso de amenaza inmediata a la vida (dolor severo de pecho, inconsciencia, mordedura de serpiente, sangrado abundante), busque atención hospitalaria de emergencia inmediatamente.",
    firstAidTitle: "Guía de Primeros Auxilios Fuera de Línea",
    dos: "Lo Que DEBE Hacer",
    donts: "Lo Que NO DEBE Hacer",
    steps: "Respuesta de Emergencia Paso a Paso",
    vitalsHeader: "Seguimiento de Enfermedades Crónicas",
    bpLabel: "Presión Arterial (sistólica/diastólica)",
    bloodSugarLabel: "Azúcar en Sangre (mg/dL)",
    tempLabel: "Temperatura (°F)",
    pulseLabel: "Frecuencia Cardíaca (bpm)",
    addLogBtn: "Registrar Vitales Localmente",
    logHistory: "Historial de Vitales (Guardado Offline)",
    normalStatus: "Zona de Salud Normal",
    warningStatus: "Precaución: Monitorear de Cerca",
    dangerStatus: "Alerta: Contactar Clínica Pronto",
    ashaHeader: "Panel de Promotores de Salud Comunitarios",
    totalPregnant: "Madres Gestantes",
    immunizationDue: "Vacunas Pendientes",
    chronicPatients: "Casos Crónicos",
    patientName: "Nombre del Paciente",
    houseNum: "Casa",
    nextTask: "Tarea Programada",
    statusDue: "Pendiente",
    statusScheduled: "Programado",
    statusDone: "Completado",
    markDone: "Marcar Completado"
  }
};
