import { type Language } from './translations';
import { mockSchemes, mockGenericMedicines } from './mockData';

export interface AgentResponse {
  agentId: 'dispatcher' | 'symptom' | 'emergency' | 'facility' | 'scheme';
  thoughts: string;
  answer: string;
  suggestedTab?: 'chat' | 'facilities' | 'schemes' | 'emergency' | 'vitals' | 'asha';
  actionData?: any;
}

// Key lists for simple keyword-based NLP router
const EMERGENCY_KEYWORDS = [
  'chest pain', 'unconscious', 'snake', 'bite', 'bleeding', 'breathing', 'stroke', 'heart', 
  'choking', 'fracture', 'poison', 'cpr', 'severe pain', 'severe head', 'accident', 'injury',
  'दर्द', 'बेहोश', 'साँप', 'काट', 'खून', 'सांस', 'हार्ट', 'हादसा', 'चोट'
];

const SCHEME_KEYWORDS = [
  'scheme', 'money', 'free', 'cost', 'ayushman', 'pm-jay', 'card', 'golden card', 'insurance', 
  'government', 'benefit', 'eligibility', 'eligible', 'jsy', 'indradhanush', 'rbsk', 'help',
  'योजना', 'पैसा', 'मुफ़्त', 'कार्ड', 'बीमा', 'पात्रता', 'सहायता'
];

const FACILITY_KEYWORDS = [
  'clinic', 'hospital', 'pharmacy', 'doctor', 'nurse', 'phc', 'chc', 'find', 'locate', 'near',
  'delivery', 'vaccine', 'injection', 'mobile van', 'medicine', 'drug', 'paracetamol', 'calpol',
  'अस्पताल', 'दवा', 'डॉक्टर', 'इलाज', 'केंद्र', 'दुकान', 'दवाई'
];

export function processUserQuery(query: string, lang: Language): AgentResponse {
  const q = query.toLowerCase();
  
  // 1. Dispatcher: Check Emergency First
  const hasEmergency = EMERGENCY_KEYWORDS.some(k => q.includes(k));
  if (hasEmergency) {
    let thoughtTrace = '';
    let responseText = '';
    
    if (lang === 'en') {
      thoughtTrace = "Critical warning signs detected in query. Danger terms matched. Bypassing normal symptom queues. Routing directly to EMERGENCY TRIAGE AGENT.";
      responseText = "🚨 EMERGENCY TRIAGE PROTOCOL ACTIVATED:\n\nIf someone is experiencing severe chest pain, unconsciousness, heavy bleeding, or a snake bite, this is a medical emergency.\n\nImmediate instructions:\n1. Call the Block Ambulance immediately at 102 or General Emergency at 108.\n2. Keep the patient still and warm.\n3. Refer to the 'First Aid & Emergency' tab on the right panel for detailed, step-by-step guidance on Snake Bites, CPR, or Bleeding control.";
    } else if (lang === 'hi') {
      thoughtTrace = "प्रश्न में गंभीर चेतावनी संकेत मिले हैं। आपातकालीन शब्दों का मिलान हुआ। सामान्य क्रम को बाईपास कर सीधे आपातकालीन प्रतिक्रिया एजेंट को भेजा जा रहा है।";
      responseText = "🚨 आपातकालीन सेवा सक्रिय:\n\nयदि मरीज को गंभीर छाती में दर्द, बेहोशी, तेज रक्तस्राव या सांप का काटना हुआ है, तो यह एक चिकित्सा आपातकाल है।\n\nतत्काल निर्देश:\n1. तुरंत ब्लॉक एम्बुलेंस (102) या सामान्य आपातकालीन नंबर (108) पर कॉल करें।\n2. मरीज को शांत रखें और हिलने-डुलने न दें।\n3. सांप के काटने, सीपीआर या रक्तस्राव नियंत्रण पर चरण-दर-चरण मार्गदर्शन के लिए दाईं ओर 'प्राथमिक उपचार' टैब देखें।";
    } else if (lang === 'ta') {
      thoughtTrace = "வினவலில் அவசர எச்சரிக்கை கண்டறியப்பட்டது. அவசர மருத்துவ முகவருக்கு நேரடியாக மாற்றப்படுகிறது.";
      responseText = "🚨 அவசரநிலை நெறிமுறை செயல்படுத்தப்பட்டது:\n\nயாருக்கேனும் கடுமையான நெஞ்சுவலி, மயக்கம், அதிக ரத்தக்கசிவு அல்லது பாம்பு கடி ஏற்பட்டால், இது அவசர நிலையாகும்.\n\nஉடனடி வழிமுறைகள்:\n1. உடனடியாக 102 அல்லது 108 என்ற அவசர எண்களுக்கு அழையுங்கள்.\n2. நோயாளி அசையாமல் பார்த்துக் கொள்ளுங்கள்.\n3. பாம்பு கடி, முதலுதவி பற்றிய விவரங்களை அறிய வலது பக்கத்தில் உள்ள 'முதலுதவி' தாவலைப் பார்க்கவும்.";
    } else if (lang === 'te') {
      thoughtTrace = "ప్రశ్నలో అత్యవసర పరిస్థితులు గుర్తించబడ్డాయి. నేరుగా అత్యవసర చికిత్స ఏజెంట్ కు బదిలీ చేయబడుతోంది.";
      responseText = "🚨 అత్యవసర చికిత్స ప్రోటోకాల్ యాక్టివేట్ చేయబడింది:\n\nతీవ్రమైన గుండె నొప్పి, స్పృహ కోల్పోవడం, అధిక రక్తస్రావం లేదా పాము కాటు సంభవిస్తే అది అత్యవసర పరిస్థితి.\n\nఉండాల్సిన చర్యలు:\n1. వెంటనే 102 లేదా 108 నంబర్లకు ఫోన్ చేసి అంబులెన్స్ ని పిలవండి.\n2. రోగిని కదలకుండా ఉంచండి.\n3. మరిన్ని వివరాల కోసం కుడి వైపున ఉన్న 'ప్రథమ చికిత్స' ట్యాబ్‌ను చూడండి.";
    } else {
      thoughtTrace = "Se detectaron signos de advertencia críticos. Desviando al AGENTE DE TRIAGE DE EMERGENCIA.";
      responseText = "🚨 PROTOCOLO DE TRIAGE DE EMERGENCIA ACTIVADO:\n\nSi alguien experimenta dolor en el pecho, pérdida del conocimiento, hemorragia o mordedura de serpiente, llame a la ambulancia al 102 o al 108 de inmediato. Mantenga al paciente inmóvil y consulte la pestaña de 'Primeros Auxilios'.";
    }
    
    return {
      agentId: 'emergency',
      thoughts: thoughtTrace,
      answer: responseText,
      suggestedTab: 'emergency'
    };
  }

  // 2. Dispatcher: Check Health Schemes
  const hasSchemes = SCHEME_KEYWORDS.some(k => q.includes(k));
  if (hasSchemes) {
    let thoughtTrace = '';
    let responseText = '';
    
    // Find if user mentioned a specific scheme
    const matchedScheme = mockSchemes.find(s => q.includes(s.name.toLowerCase()) || q.includes(s.id));
    
    if (lang === 'en') {
      thoughtTrace = "Query contains financial/scheme keywords. Routing to SCHEME ELIGIBILITY SUPPORT AGENT.";
      if (matchedScheme) {
        responseText = `I found details for **${matchedScheme.name}**:\n\n* **About**: ${matchedScheme.description}\n* **Benefits**: ${matchedScheme.benefits}\n* **Documents required**: ${matchedScheme.requiredDocuments.join(', ')}.\n\nI have loaded the Scheme Eligibility Wizard on the right side. You can fill out the form to instantly check if you qualify!`;
      } else {
        responseText = "I can help you check eligibility for major government schemes like **Ayushman Bharat PM-JAY** (₹5 Lakh health card) or **Janani Suraksha Yojana** (JSY for pregnant mothers).\n\nI have opened the **Health Schemes** tab on the right side. Please input your income and category details there to calculate your eligibility rating.";
      }
    } else if (lang === 'hi') {
      thoughtTrace = "प्रश्न में वित्तीय/योजना संबंधित कीवर्ड मिले हैं। योजना पात्रता सहायक एजेंट को भेजा जा रहा है।";
      if (matchedScheme) {
        responseText = `मुझे **${matchedScheme.name}** के बारे में जानकारी मिली है:\n\n* **विवरण**: ${matchedScheme.description}\n* **लाभ**: ${matchedScheme.benefits}\n* **आवश्यक दस्तावेज**: ${matchedScheme.requiredDocuments.join(', ')}.\n\nमैंने दाईं ओर सरकारी योजना कैलकुलेटर लोड कर दिया है। आप अपनी पात्रता जांचने के लिए फॉर्म भर सकते हैं!`;
      } else {
        responseText = "मैं आपको **आयुष्मान भारत पीएम-जय** (₹5 लाख का स्वास्थ्य कार्ड) या **जननी सुरक्षा योजना** (गर्भवती माताओं के लिए JSY) जैसी सरकारी योजनाओं की पात्रता जांचने में मदद कर सकता हूँ।\n\nमैंने दाईं ओर **सरकारी योजनाएं** टैब खोल दिया है। कृपया वहां अपनी आय और वर्ग का विवरण दर्ज करें।";
      }
    } else if (lang === 'ta') {
      thoughtTrace = "வினவலில் அரசு திட்டம் குறித்த சொற்கள் உள்ளன. திட்ட தகுதி உதவி முகவருக்கு மாற்றப்படுகிறது.";
      responseText = "நான் உங்களுக்கு **ஆயுஷ்மான் பாரத் PM-JAY** அல்லது **ஜனனி சுரக்ஷா யோஜனா** போன்ற அரசு சுகாதார திட்டங்களின் தகுதியைச் சரிபார்க்க உதவ முடியும். வலது பக்கத்தில் உள்ள **அரசு திட்டங்கள்** தாவலைத் திறந்து உங்கள் வருமான விவரங்களை உள்ளிட்டு தகுதியைச் சரிபார்க்கவும்.";
    } else if (lang === 'te') {
      thoughtTrace = "ప్రశ్నలో ప్రభుత్వ పథకాలకు సంబంధించిన పదాలు ఉన్నాయి. అర్హత సహాయక ఏజెంట్ కు బదిలీ చేయబడుతోంది.";
      responseText = "నేను మీకు **ఆయుష్మాన్ భారత్ PM-JAY** లేదా **జనని సురక్ష యోజన** వంటి ప్రభుత్వ ఆరోగ్య పథకాల అర్హతలను తనిఖీ చేయడంలో సహాయపడగలను. కుడి వైపున ఉన్న **ప్రభుత్వ పథకాలు** ట్యాబ్‌ను ఓపెన్ చేసి మీ ఆదాయ వివరాలను నమోదు చేయండి.";
    } else {
      thoughtTrace = "Consulta sobre subsidios/seguros gubernamentales. Enrutando al AGENTE DE PLANES DE SALUD.";
      responseText = "Puedo ayudarle a verificar la elegibilidad para programas gubernamentales como **Ayushman Bharat PM-JAY** o **Janani Suraksha Yojana**. He abierto la pestaña de Planes de Salud para que calcule su elegibilidad.";
    }
    
    return {
      agentId: 'scheme',
      thoughts: thoughtTrace,
      answer: responseText,
      suggestedTab: 'schemes'
    };
  }

  // 3. Dispatcher: Check Clinic/Facility locator
  const hasFacility = FACILITY_KEYWORDS.some(k => q.includes(k));
  if (hasFacility) {
    let thoughtTrace = '';
    let responseText = '';
    
    // Check if user named a drug
    const matchedDrug = mockGenericMedicines.find(m => q.includes(m.genericName.toLowerCase()) || m.localBrands.some(b => q.includes(b.toLowerCase())));
    
    if (lang === 'en') {
      thoughtTrace = "Clinic finder or pharmacy request detected. Routing to HEALTHCARE NAVIGATION AGENT.";
      if (matchedDrug) {
        responseText = `💊 **Generic Drug Directory Match**:\n\n* **Generic Name**: ${matchedDrug.genericName}\n* **Common Brand Names**: ${matchedDrug.localBrands.join(', ')}\n* **Use**: ${matchedDrug.purpose}\n* **Dosage Guidance**: ${matchedDrug.dosageExample}\n* **Warnings**: ${matchedDrug.warnings}\n\nYou can find these generic medicines at 50-90% lower cost at the local **Jan Aushadhi Kendra** located 1.8km away. I have opened the clinic directory search for you.`;
      } else {
        responseText = "I found several clinics nearby including **Rampur Primary Health Centre (PHC)** (2.4 km) and the **Tehsil CHC** (8.5 km) which is open 24/7. \n\nI have loaded the **Find Clinic** panel on the right side where you can search, filter by services (e.g. delivery, vaccines), and see their contact phone numbers.";
      }
    } else if (lang === 'hi') {
      thoughtTrace = "अस्पताल खोजक या दवा से संबंधित अनुरोध मिला। स्वास्थ्य सेवा नेविगेशन एजेंट को भेजा जा रहा है।";
      if (matchedDrug) {
        responseText = `💊 **जेनेरिक दवा विवरण मिलान**:\n\n* **जेनेरिक नाम**: ${matchedDrug.genericName}\n* **आम ब्रांड नाम**: ${matchedDrug.localBrands.join(', ')}\n* **उपयोग**: ${matchedDrug.purpose}\n* **खुराक मार्गदर्शन**: ${matchedDrug.dosageExample}\n* **चेतावनी**: ${matchedDrug.warnings}\n\nआप ये जेनेरिक दवाएं 1.8 किमी दूर स्थित **जन औषधि केंद्र** से 50-90% कम कीमत पर प्राप्त कर सकते हैं। मैंने आपके लिए अस्पताल खोज सूची खोल दी है।`;
      } else {
        responseText = "मुझे आपके पास कई अस्पताल मिले हैं, जिनमें **रामपुर प्राथमिक स्वास्थ्य केंद्र (PHC)** (2.4 किमी) और **तहसील CHC** (8.5 किमी) शामिल हैं जो 24 घंटे खुला रहता है।\n\nमैंने दाईं ओर **अस्पताल खोजें** पैनल खोल दिया है जहां आप सेवाओं (जैसे प्रसव, टीकाकरण) के आधार पर खोज और फ़िल्टर कर सकते हैं।";
      }
    } else if (lang === 'ta') {
      thoughtTrace = "மருத்துவமனை அல்லது மருந்தகம் தேடல் கண்டறியப்பட்டது. சுகாதார வழிகாட்டி முகவருக்கு மாற்றப்படுகிறது.";
      responseText = "உங்களுக்கு அருகில் **ராம்பூர் ஆரம்ப சுகாதார நிலையம் (PHC)** (2.4 கி.மீ) மற்றும் 24 மணி நேரமும் செயல்படும் **தாலுகா CHC** (8.5 கி.மீ) உள்ளன. வலது பக்கத்தில் உள்ள **மருத்துவமனை தேடல்** தாவலில் தொலைபேசி எண்கள் மற்றும் சேவைகளைச் சரிபார்க்கவும்.";
    } else if (lang === 'te') {
      thoughtTrace = "ఆసుపత్రి లేదా మందుల దుకాణం అభ్యర్థన గుర్తించబడింది. ఆరోగ్య నావిగేషన్ ఏజెంట్ కు బదిలీ చేయబడుతోంది.";
      responseText = "మీకు దగ్గరలో **రాంపూర్ ప్రాథమిక ఆరోగ్య కేంద్రం (PHC)** (2.4 కి.మీ) మరియు 24 గంటలు పనిచేసే **తహసీల్ CHC** (8.5 కి.మీ) ఉన్నాయి. కుడి వైపున ఉన్న **ఆసుపత్రిని కనుగొనండి** ట్యాబ్‌లో ఫోన్ నంబర్లు మరియు సేవలను చూడండి.";
    } else {
      thoughtTrace = "Solicitud de localización de clínicas o medicamentos. Enrutando al AGENTE DE NAVEGACIÓN.";
      responseText = "He encontrado clínicas cercanas como el **Centro de Salud Rampur** (2.4 km). He abierto la pestaña de Buscar Clínica con los detalles y contactos.";
    }
    
    return {
      agentId: 'facility',
      thoughts: thoughtTrace,
      answer: responseText,
      suggestedTab: 'facilities'
    };
  }

  // 4. Default: Symptom Assessment Agent
  let thoughtTrace = '';
  let responseText = '';
  
  if (lang === 'en') {
    thoughtTrace = "General health query or symptom description. Routing to SYMPTOM ASSESSMENT AGENT.";
    if (q.includes('fever') || q.includes('bukhar') || q.includes('temp')) {
      responseText = "🤒 **Symptom Assessment: Fever / Elevated Temperature**\n\nCommon causes in rural areas include viral flu, malaria, heat exhaustion, or infection. \n\n* **Questions to consider**: How many days have you had fever? Do you have chills, body aches, or a cough?\n* **Recommended Home Care**: Drink plenty of clean water and ORS. Rest in a shaded place. You can take Paracetamol (500mg) for relief.\n* **When to see a doctor**: If the fever exceeds 103°F, lasts more than 3 days, or is accompanied by confusion or vomiting.\n\n*Disclaimer: I am an AI assistant, not a doctor. Please visit Rampur PHC (2.4 km) if symptoms persist.*";
    } else if (q.includes('cough') || q.includes('khansi') || q.includes('cold') || q.includes('breath')) {
      responseText = "cough/cold matched. Recommendation: rest, warm fluids, check up at Rampur PHC if coughing lasts > 2 weeks to rule out tuberculosis.";
    } else {
      responseText = "I can guide you through symptom checks. What symptoms are you experiencing? (e.g. fever, headache, stomach ache, body pain).\n\nPlease provide their duration and severity. You can also view the Vital Tracker on the right panel to log your blood pressure or blood sugar.";
    }
  } else if (lang === 'hi') {
    thoughtTrace = "सामान्य स्वास्थ्य प्रश्न या लक्षण वर्णन। लक्षण मूल्यांकन एजेंट को भेजा जा रहा है।";
    if (q.includes('fever') || q.includes('bukhar') || q.includes('बुखार') || q.includes('तापमान')) {
      responseText = "🤒 **लक्षण मूल्यांकन: बुखार / बढ़ा हुआ तापमान**\n\nग्रामीण क्षेत्रों में सामान्य कारण वायरल फ्लू, मलेरिया, लू लगना या संक्रमण हो सकते हैं।\n\n* **विचार करने योग्य प्रश्न**: आपको कितने दिनों से बुखार है? क्या आपको ठंड लगना, बदन दर्द या खांसी है?\n* **घरेलू देखभाल**: पर्याप्त साफ पानी या ओआरएस (ORS) पिएं। ठंडी छांव में आराम करें। दर्द/बुखार कम करने के लिए पैरासिटामोल (500mg) ले सकते हैं।\n* **डॉक्टर से कब मिलें**: यदि बुखार 103°F से अधिक हो जाए, 3 दिनों से अधिक रहे, या उल्टी/भ्रम की स्थिति हो।\n\n*अस्वीकरण: मैं एक एआई सहायक हूँ, डॉक्टर नहीं। लक्षण बने रहने पर रामपुर पीएचसी (2.4 किमी) जाएं।*";
    } else {
      responseText = "मैं आपके लक्षणों का आकलन करने में मदद कर सकता हूँ। आपको क्या परेशानी हो रही है? (जैसे: बुखार, सिरदर्द, पेट दर्द, बदन दर्द)।\n\nकृपया बताएं कि यह परेशानी कब से है। आप अपने रक्तचाप या शुगर को रिकॉर्ड करने के लिए दाईं ओर 'वाइटल ट्रैकर' का भी उपयोग कर सकते हैं।";
    }
  } else if (lang === 'ta') {
    thoughtTrace = "பொது சுகாதார வினவல். அறிகுறிகள் மதிப்பீட்டு முகவருக்கு மாற்றப்படுகிறது.";
    responseText = "உங்கள் அறிகுறிகளை மதிப்பிட நான் உங்களுக்கு உதவ முடியும். உங்களுக்கு காய்ச்சல், தலைவலி, அல்லது உடல்வலி ஏதேனும் உள்ளதா? அது எவ்வளவு நாட்களாக உள்ளது என்று கூறுங்கள். தேவைப்பட்டால் வலது பக்கத்தில் உள்ள 'உடல்நல கண்காணிப்பு' தாவலைப் பயன்படுத்தவும்.";
  } else if (lang === 'te') {
    thoughtTrace = "సాధారణ ఆరోగ్య ప్రశ్న. లక్షణాల అంచనా ఏజెంట్ కు బదిలీ చేయబడుతోంది.";
    responseText = "నేను మీ ఆరోగ్య లక్షణాలను అంచనా వేయడంలో సహాయపడగలను. మీకు జ్వరం, తలనొప్పి, కడుపునొప్పి వంటి లక్షణాలు ఏమైనా ఉన్నాయా? అవి ఎంతకాలంగా ఉన్నాయో చెప్పండి. అవసరమైతే కుడి వైపున ఉన్న 'ట్రాకర్' లో మీ వివరాలు నమోదు చేయండి.";
  } else {
    thoughtTrace = "Consulta general. Enrutando al AGENTE DE EVALUACIÓN DE SÍNTOMAS.";
    responseText = "Puedo ayudarle a evaluar sus síntomas. ¿Qué molestias tiene? (fiebre, dolor de cabeza, dolor de estómago). Describa la duración e intente registrar sus vitales.";
  }
  
  return {
    agentId: 'symptom',
    thoughts: thoughtTrace,
    answer: responseText
  };
}
