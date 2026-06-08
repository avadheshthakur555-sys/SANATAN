// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Bhagavad Gita custom verses
const GITA_VERSES_CH1 = [
  {
    verseNumber: "1",
    textSanskrit: "धृतराष्ट्र उवाच\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥ १.१॥",
    textTransliteration: "dhṛtarāṣṭra uvāca\ndharmakṣetre kurukṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāścaiva kimakurvata sañjaya || 1.1 ||",
    translationHindi: "धृतराष्ट्र बोले— हे संजय! धर्मभूमि कुरुक्षेत्र में एकत्रित, युद्ध की इच्छा वाले मेरे और पाण्डु के पुत्रों ने क्या किया?",
    translationEnglish: "Dhritarashtra said: O Sanjay, after gathering on the holy field of Kurukshetra, and desiring to fight, what did my sons and the sons of Pandu do?",
    wordMeanings: JSON.stringify([
      { word: "धर्मक्षेत्रे", iast: "dharmakṣetre", meaning_en: "on the field of dharma", meaning_hi: "धर्मभूमि में" },
      { word: "कुरुक्षेत्रे", iast: "kurukṣetre", meaning_en: "on the field of Kuru", meaning_hi: "कुरुक्षेत्र में" },
      { word: "समवेताः", iast: "samavetāḥ", meaning_en: "assembled", meaning_hi: "एकत्रित" },
      { word: "युयुत्सवः", iast: "yuyutsavaḥ", meaning_en: "desiring to fight", meaning_hi: "युद्ध की इच्छा वाले" },
      { word: "मामकाः", iast: "māmakāḥ", meaning_en: "my sons", meaning_hi: "मेरे पुत्र" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "The field is called Dharmakshetra because it is the arena of spiritual development and righteous action.", text_hi: "धर्मक्षेत्र आध्यात्मिक विकास और धर्म की युद्धभूमि है।" },
      { author: "Ramanujacharya", text_en: "Dhritarashtra's question shows his attachment and anxiety regarding the outcome of the battle.", text_hi: "धृतराष्ट्र का प्रश्न उनके मानसिक द्वंद्व और चिंता को दर्शाता है।" }
    ])
  },
  {
    verseNumber: "2",
    textSanskrit: "सञ्जय उवाच\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा।\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत्॥ १.२॥",
    textTransliteration: "sañjaya uvāca\ndṛṣṭvā tu pāṇḍavānīkaṁ vyūḍhaṁ duryodhanastadā |\nācāryamupasaṅgamya rājā vacanamabravīt || 1.2 ||",
    translationHindi: "संजय बोले— उस समय राजा दुर्योधन ने व्यूहरचनायुक्त पाण्डवों की सेना को देखकर और द्रोणाचार्य के पास जाकर यह वचन कहा।",
    translationEnglish: "Sanjay said: On seeing the Pandava army standing in military formation, King Duryodhana went to his teacher Dronacharya and spoke these words.",
    wordMeanings: JSON.stringify([
      { word: "दृष्ट्वा", iast: "dṛṣṭvā", meaning_en: "having seen", meaning_hi: "देखकर" },
      { word: "पाण्डवानीकम्", iast: "pāṇḍavānīkam", meaning_en: "the Pandava army", meaning_hi: "पाण्डवों की सेना को" },
      { word: "व्यूढम्", iast: "vyūḍham", meaning_en: "in military formation", meaning_hi: "व्यूहरचनायुक्त" },
      { word: "द्रोणम्", iast: "ācāryam", meaning_en: "teacher", meaning_hi: "आचार्य" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "Duryodhana went to Dronacharya to evaluate their tactical standing and seek reassurance.", text_hi: "दुर्योधन ने द्रोणाचार्य से मिलकर अपनी सेना की स्थिति का आकलन किया।" }
    ])
  },
  {
    verseNumber: "3",
    textSanskrit: "पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम्।\nव्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता॥ १.३॥",
    textTransliteration: "paśyaitāṁ pāṇḍuputrāṇāmācārya mahatīṁ camūm |\nvyūḍhāṁ drupadaputreṇa tava śiṣyeṇa dhīmatā || 1.3 ||",
    translationHindi: "हे आचार्य! आपके बुद्धिमान् शिष्य द्रुपदपुत्र (धृष्टद्युम्न) द्वारा व्यूहाकार खड़ी की हुई पाण्डुपुत्रों की इस बड़ी भारी सेना को देखिये।",
    translationEnglish: "Behold, O Teacher, this mighty army of the sons of Pandu, arrayed in battle formation by your talented disciple, the son of Drupada.",
    wordMeanings: JSON.stringify([
      { word: "पश्य", iast: "paśya", meaning_en: "behold", meaning_hi: "देखिये" },
      { word: "एताम्", iast: "etām", meaning_en: "this", meaning_hi: "इस" },
      { word: "चमूम्", iast: "camūm", meaning_en: "army", meaning_hi: "सेना को" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "Duryodhana highlights that Dronacharya's own disciple is leading the opposing force, indicating potential betrayal.", text_hi: "द्रोणाचार्य को उनके शिष्य की व्यूहरचना की याद दिलाई जा रही है।" }
    ])
  },
  {
    verseNumber: "4",
    textSanskrit: "अत्र शूरा महेष्वासा भीमार्जुनसमा युधि।\nयुयुधानो विराटश्च द्रुपदश्च महारथः॥ १.४॥",
    textTransliteration: "atra śūrā maheṣvāsā bhīmārjunasamā yudhi |\nyuyudhāno virāṭaśca drupadaśca mahārathaḥ || 1.4 ||",
    translationHindi: "इस सेना में बड़े-बड़े धनुषों वाले तथा युद्ध में भीम और अर्जुन के समान बहुत से शूरवीर हैं, जैसे— युयुधान (सात्यकि), राजा विराट और महारथी द्रुपद।",
    translationEnglish: "Here in this army are many heroic warriors with mighty bows, equal in combat to Bhima and Arjuna, such as Yuyudhana, Virata, and the great chariot-warrior Drupada.",
    wordMeanings: JSON.stringify([
      { word: "शूराः", iast: "śūrāḥ", meaning_en: "heroes", meaning_hi: "वीर" },
      { word: "युधि", iast: "yudhi", meaning_en: "in battle", meaning_hi: "युद्ध में" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "Listing the prominent warriors of the enemy army to outline the scale of the challenge.", text_hi: "शत्रु पक्ष के महारथियों की गणना कर सेना की शक्ति का वर्णन किया गया है।" }
    ])
  },
  {
    verseNumber: "5",
    textSanskrit: "धृष्टकेतुश्चेकितानः काशिराजश्च वीर्यवान्।\nपुरुजित्कुन्तिभोजश्च शैब्यश्च नरपुङ्गवः॥ १.५॥",
    textTransliteration: "dhṛṣṭaketuścekitānaḥ kāśirājaśca vīryavān |\npurujitkuntibhojaśca śaibyaśca narapuṅgavaḥ || 1.5 ||",
    translationHindi: "तथा धृष्टकेतु, चेकितान और बलवान् काशिराज, पुरुजित्, कुन्तिभोज और मनुष्यों में श्रेष्ठ शैब्य भी हैं।",
    translationEnglish: "There are also Dhrishtaketu, Chekitana, the valiant King of Kashi, Purujit, Kuntibhoja, and Shaibya, outstanding among men.",
    wordMeanings: JSON.stringify([
      { word: "वीर्यवान्", iast: "vīryavān", meaning_en: "powerful", meaning_hi: "बलवान" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "Continuing the census of the legendary warriors standing on the side of Dharma.", text_hi: "धर्म पक्ष के वीरों की गणना जारी है।" }
    ])
  },
  {
    verseNumber: "6",
    textSanskrit: "युधामन्युश्च विक्रान्त उत्तमौजाश्च वीर्यवान्।\nसौभद्रो द्रौपदेयाश्च सर्व एव महारथाः॥ १.६॥",
    textTransliteration: "yudhāmanyuśca vikrānta uttamaujāśca vīryavān |\nsaubhadro draupadeyāśca sarva eva mahārathāḥ || 1.6 ||",
    translationHindi: "और पराक्रमी युधामन्यु तथा बलवान् उत्तमौजा, सुभद्रापुत्र अभिमन्यु एवं द्रौपदी के पाँचों पुत्र— ये सभी महारथी हैं।",
    translationEnglish: "And the courageous Yudhamanyu, the gallant Uttamauja, the son of Subhadra (Abhimanyu), and the sons of Draupadi—all of them great chariot-warriors.",
    wordMeanings: JSON.stringify([
      { word: "महारथाः", iast: "mahārathāḥ", meaning_en: "great chariot warriors", meaning_hi: "महारथी" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "The presence of these champions makes the Pandava army extremely formidable.", text_hi: "सुभद्रा पुत्र अभिमन्यु एवं द्रौपदी के पुत्रों का उल्लेख उनकी अपार शक्ति को दर्शाता है।" }
    ])
  },
  {
    verseNumber: "7",
    textSanskrit: "अस्माकं तु विशिष्टा ये तान्निबोध द्विजोत्तम।\nनायका मम सैन्यस्य सञ्ज्ञार्थं तान्ब्रवीमि ते॥ १.७॥",
    textTransliteration: "asmākaṁ tu viśiṣṭā ye tānnibodha dvijottama |\nnāyakā mama sainyasya sañjñārthaṁ tānbravīmi te || 1.7 ||",
    translationHindi: "हे ब्राह्मणश्रेष्ठ! हमारे पक्ष में भी जो मुख्य-मुख्य वीर हैं, उनको आप जान लीजिये। आपकी जानकारी के लिये मैं अपनी सेना के नायकों को बताता हूँ।",
    translationEnglish: "O best of Brahmins, let me now inform you of the principal leaders on our side, who are especially qualified to command my army.",
    wordMeanings: JSON.stringify([
      { word: "द्विजोत्तम", iast: "dvijottama", meaning_en: "O best of double-born", meaning_hi: "ब्राह्मणश्रेष्ठ" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "Duryodhana turns his focus to his own forces to boost morale and coordinate strategy.", text_hi: "दुर्योधन अपनी सेना के महारथियों का परिचय देता है।" }
    ])
  },
  {
    verseNumber: "8",
    textSanskrit: "भवान्भीष्मश्च कर्णश्च कृपश्च समितिञ्जयः।\nअश्वत्थामा विकर्णश्च सौमदत्तिस्तथैव च॥ १.८॥",
    textTransliteration: "bhavānbhīṣmaśca karṇaśca kṛpaśca samitiñjayaḥ |\naśvatthāmā vikarṇaśca saumadattistathaiva ca || 1.8 ||",
    translationHindi: "स्वयं आप (द्रोणाचार्य), पितामह भीष्म, कर्ण और युद्धविजयी कृपाचार्य तथा वैसे ही अश्वत्थामा, विकर्ण और सोमदत्त का पुत्र भूरिश्रवा।",
    translationEnglish: "Yourself, Bhishma, Karna, Kripa, who are victorious in battle, Ashwatthama, Vikarna, and the son of Somadatta (Bhurishrava).",
    wordMeanings: JSON.stringify([
      { word: "समितिंंजयः", iast: "samitiñjayaḥ", meaning_en: "victorious in battle", meaning_hi: "युद्धविजयी" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "Listing the indomitable defenders of the Kaurava side.", text_hi: "द्रोणाचार्य, भीष्म और कर्ण कौरव सेना के प्रमुख स्तम्भ हैं।" }
    ])
  },
  {
    verseNumber: "9",
    textSanskrit: "अन्ये च बहवः शूरा मदर्थे त्यक्तजीविताः।\nनानाशास्त्रप्रहरणाः सर्वे युद्धविशारदाः॥ १.९॥",
    textTransliteration: "anye ca bahavaḥ śūrā madarthe tyaktajīvitāḥ |\nnānāśastrapraharaṇāḥ sarve yuddhaviśāradāḥ || 1.9 ||",
    translationHindi: "और भी बहुत से शूरवीर हैं, जो मेरे लिये अपना जीवन त्यागने को तैयार हैं। वे अनेक प्रकार के अस्त्र-शस्त्रों से सुसज्जित हैं और सब युद्धविद्या में निपुण हैं।",
    translationEnglish: "And there are many other heroes who are prepared to lay down their lives for my sake, equipped with diverse weapons and all skilled in warfare.",
    wordMeanings: JSON.stringify([
      { word: "युद्धविशारदाः", iast: "yuddhaviśāradāḥ", meaning_en: "experts in warfare", meaning_hi: "युद्धविद्या में निपुण" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "Recognizing the total devotion of his allies, willing to lay down their lives.", text_hi: "दुर्योधन अपनी सेना के वीरों के शौर्य की प्रशंसा करता है।" }
    ])
  },
  {
    verseNumber: "10",
    textSanskrit: "अपर्याप्तं तदस्माकं बलं भीष्माभिरक्षितम्।\nपर्याप्तं त्विदमेतेषां बलं भीमाभिरक्षितम्॥ १.१०॥",
    textTransliteration: "aparyāptaṁ tadasmākaṁ balaṁ bhīṣmābhirakṣitam |\nparyāptaṁ tvidameteṣāṁ balaṁ bhīmābhirakṣitam || 1.10 ||",
    translationHindi: "भीष्मपितामह द्वारा रक्षित हमारी वह सेना सब प्रकार से अजेय है और भीम द्वारा रक्षित इन लोगों की यह सेना जीतने में सुगम है।",
    translationEnglish: "Our strength, protected by Bhishma, is unlimited, whereas their strength, protected by Bhima, is limited.",
    wordMeanings: JSON.stringify([
      { word: "अपर्याप्तम्", iast: "aparyāptam", meaning_en: "unlimited / insufficient", meaning_hi: "असीमित / अपूर्ण" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "The word aparyaptam can mean either unlimited (favorable) or insufficient (anxious), reflecting Duryodhana's double-minded state.", text_hi: "भीष्म की रक्षा में सेना को अजेय माना गया है।" }
    ])
  }
];

const GITA_VERSES_CH2 = [
  {
    verseNumber: "1",
    textSanskrit: "सञ्जय उवाच\nतं तथा कृपयाविष्टमश्रुपूर्णाकुलेक्षणम्।\nविषीदन्तमिदं वाक्यमुवाच मधुसूदनः॥ २.१॥",
    textTransliteration: "sañjaya uvāca\ntaṁ tathā kṛpayāviṣṭamaśrupūrṇākulekṣaṇam |\nviṣīdantamidaṁ vākyamuvāca madhusūdanaḥ || 2.1 ||",
    translationHindi: "संजय बोले— उस प्रकार करुणा से व्याप्त और आंसुओं से पूर्ण तथा व्याकुल नेत्रों वाले शोकयुक्त अर्जुन से मधुसूदन (श्रीकृष्ण) ने यह वचन कहा।",
    translationEnglish: "Sanjay said: To him who was thus overcome with pity, whose eyes were filled with tears and downcast, and who was grieving, Madhusudana (Krishna) spoke these words.",
    wordMeanings: JSON.stringify([
      { word: "सञ्जय उवाच", iast: "sañjaya uvāca", meaning_en: "Sanjay said", meaning_hi: "संजय बोले" },
      { word: "कृपयाविष्टम्", iast: "kṛpayāviṣṭam", meaning_en: "overwhelmed with pity", meaning_hi: "करुणा से व्याप्त" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "Krishna notices Arjuna's grief and prepares to speak the eternal wisdom of yoga to dispel his ignorance.", text_hi: "श्रीकृष्ण अर्जुन के मोह को दूर करने के लिए दिव्य संदेश देना प्रारंभ करते हैं।" }
    ])
  },
  {
    verseNumber: "2",
    textSanskrit: "श्रीभगवानुवाच\nकुतस्त्वा कश्मलमिदं विषमे समुपस्थितम्।\nअनार्यजुष्टमस्वर्ग्यमकीर्तिकरमर्जुन॥ २.२॥",
    textTransliteration: "śrī-bhagavān uvāca\nkutastvā kaśmalamidaṁ viṣame samupasthitam |\nanāryajuṣṭamasvargyamakīrtikaramarjuna || 2.2 ||",
    translationHindi: "श्रीभगवान् बोले— हे अर्जुन! इस विषम समय में तुम्हें यह मोह किस कारण प्राप्त हुआ है? यह न तो श्रेष्ठ पुरुषों द्वारा आचरित है, न स्वर्ग देने वाला है और न कीर्ति करने वाला ही है।",
    translationEnglish: "The Supreme Lord said: My dear Arjuna, how has this delusion overcome you in this hour of crisis? It is not befitting a noble person; it leads not to heaven, but to disgrace.",
    wordMeanings: JSON.stringify([
      { word: "श्रीभगवान् उवाच", iast: "śrī-bhagavān uvāca", meaning_en: "The Supreme Lord said", meaning_hi: "श्रीभगवान् बोले" },
      { word: "कश्मलम्", iast: "kaśmalam", meaning_en: "delusion / impurity", meaning_hi: "मोह / मल" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "The Lord's first words are sharp, meant to wake up Arjuna's intellect from emotional stupor.", text_hi: "भगवान श्रीकृष्ण ने अर्जुन को झकझोरने के लिए तीखे वचनों का प्रयोग किया है।" }
    ])
  },
  {
    verseNumber: "3",
    textSanskrit: "क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते।\nक्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परन्तप॥ २.३॥",
    textTransliteration: "klaibyaṁ mā sma gamaḥ pārtha naitattvayyupapadyate |\nkṣudraṁ hṛdayadaurbalyaṁ tyaktvottiṣṭha parantapa || 2.3 ||",
    translationHindi: "हे पार्थ! नपुंसकता को मत प्राप्त हो, यह तुम्हारे योग्य नहीं है। हे परंतप! हृदय की इस तुच्छ दुर्बलता को त्यागकर युद्ध के लिये खड़े हो जाओ।",
    translationEnglish: "O Parth (Arjuna), do not yield to this degrading impotence; it does not befit you. Cast off this petty weakness of heart and arise, O conqueror of enemies.",
    wordMeanings: JSON.stringify([
      { word: "क्लैब्यम्", iast: "klaibyam", meaning_en: "impotence", meaning_hi: "नपुंसकता" },
      { word: "उत्तिष्ठ", iast: "uttiṣṭha", meaning_en: "arise", meaning_hi: "खड़े हो जाओ" }
    ]),
    commentary: JSON.stringify([
      { author: "Shankaracharya", text_en: "Krishna urges Arjuna to cast away psychological weakness and discharge his duties as a warrior.", text_hi: "हृदय की दुर्बलता को त्यागकर कर्तव्य पथ पर आगे बढ़ने की प्रेरणा दी गई है।" }
    ])
  }
];

const GITA_CHAPTERS = [
  { number: 1, titleSanskrit: "अर्जुनविषादयोग", titleHindi: "अर्जुन विषाद योग", titleEnglish: "Arjuna's Grief", summary: "Arjuna observes the armies and sinks into depression, refusing to fight.", totalVerses: 47 },
  { number: 2, titleSanskrit: "साङ्ख्ययोग", titleHindi: "सांख्य योग", titleEnglish: "Transcendental Knowledge", summary: "Krishna instructs Arjuna on the immortality of the soul and Karma Yoga.", totalVerses: 72 }
];

// Definition for all other 47 scriptures to be seeded
interface ScriptureData {
  slug: string;
  categorySlug: string;
  titleSanskrit: string;
  titleHindi: string;
  titleEnglish: string;
  description: string;
  totalChapters: number;
  totalVerses: number;
  coverImage: string;
  authorRishi: string;
  periodEra: string;
  verseSanskrit: string;
  verseTrans: string;
  verseHindi: string;
  verseEnglish: string;
  meanings: { word: string; iast: string; meaning_en: string; meaning_hi: string }[];
  commentary: string;
}

const OTHER_SCRIPTURES: ScriptureData[] = [
  // VEDAS
  {
    slug: "yajurveda",
    categorySlug: "vedas",
    titleSanskrit: "यजुर्वेदः",
    titleHindi: "यजुर्वेद संहिता",
    titleEnglish: "Yajurveda",
    description: "A compilation of ritual prose and formulas for fire sacrifices (Yajnas) and cosmic alignment.",
    totalChapters: 40,
    totalVerses: 1875,
    coverImage: "/images/covers/yajurveda.jpg",
    authorRishi: "Sage Yajnavalkya",
    periodEra: "Treta Yuga",
    verseSanskrit: "इषे त्वोर्जे त्वा वायवस्थ देवो वः सविता प्रार्पयतु श्रेष्ठतमाय कर्मणे॥ १.१॥",
    verseTrans: "iṣe tvorje tvā vāyavastha devo vaḥ savitā prārpayatu śreṣṭhatamāya karmaṇe || 1.1 ||",
    verseHindi: "हे मनुष्यों! हम अन्न और बल की प्राप्ति के लिए तुम्हारा सत्कार करते हैं। सविता देव तुम्हें श्रेष्ठ कर्म के लिए प्रेरित करें।",
    verseEnglish: "For food and strength I accept you. May the divine generator Savitar direct you to the most glorious act.",
    meanings: [
      { word: "इषे", iast: "iṣe", meaning_en: "for food / vigor", meaning_hi: "अन्न के लिए" },
      { word: "ऊर्जे", iast: "ūrje", meaning_en: "for strength", meaning_hi: "बल के लिए" }
    ],
    commentary: "Yajurveda focuses on the practical execution of cosmic order through sacred ritual and sacrifice."
  },
  {
    slug: "samaveda",
    categorySlug: "vedas",
    titleSanskrit: "सामवेदः",
    titleHindi: "सामवेद संहिता",
    titleEnglish: "Samaveda",
    description: "Sanskrit chants and hymns set to musical notations, representing the root of Indian classical music.",
    totalChapters: 2,
    totalVerses: 1875,
    coverImage: "/images/covers/samaveda.jpg",
    authorRishi: "Sage Jaimini",
    periodEra: "Treta Yuga",
    verseSanskrit: "अग्न आ याहि वीतये गृणानो हव्यदातये। नि होता सत्सि बर्हिषि॥ १.१॥",
    verseTrans: "agna ā yāhi vītaye gṛṇāno havyadātaye | ni hotā satsi barhiṣi || 1.1 ||",
    verseHindi: "हे अग्निदेव! हवि प्रदान करने वाले यजमान के यज्ञ में स्तुति प्राप्त करते हुए पधारें और हमारे इस कुश आसन पर विराजमान हों।",
    verseEnglish: "O Agni, come to the feast, lauded for the giver of oblations. Sit down, priest, upon the sacred grass.",
    meanings: [
      { word: "अग्ने", iast: "agne", meaning_en: "O Fire God", meaning_hi: "हे अग्निदेव" },
      { word: "आ याहि", iast: "ā yāhi", meaning_en: "come hither", meaning_hi: "पधारें" }
    ],
    commentary: "Samaveda converts Vedic chants into pure musical melodies, capturing the heart of celestial sound (Nada)."
  },
  {
    slug: "atharvaveda",
    categorySlug: "vedas",
    titleSanskrit: "अथर्ववेदः",
    titleHindi: "अथर्ववेद संहिता",
    titleEnglish: "Atharvaveda",
    description: "Daily life wisdom, medicine, healing formulas, cosmology, and social duties for domestic harmony.",
    totalChapters: 20,
    totalVerses: 5977,
    coverImage: "/images/covers/atharvaveda.jpg",
    authorRishi: "Sage Atharvan",
    periodEra: "Treta Yuga",
    verseSanskrit: "ये त्रिषप्ताः परियन्ति विश्वारूपाणि बिभ्रतः। वाचस्पतिर्बला तेषां तन्वो अद्य दधातु मे॥ १.१॥",
    verseTrans: "ye triṣaptāḥ pariyanti viśvārūpāṇi bibhrataḥ | vācaspatirbalā teṣāṁ tanvo adya dadhātu me || 1.1 ||",
    verseHindi: "जो तीनों लोकों में विचरण करने वाली शक्तियां समस्त रूपों को धारण करती हैं, वाणी के स्वामी आज मेरे शरीर में उनका बल स्थापित करें।",
    verseEnglish: "May the Lord of Speech establish in my body the strength of those triple-seven forces that move through the universe.",
    meanings: [
      { word: "ये", iast: "ye", meaning_en: "those who", meaning_hi: "जो" },
      { word: "वाचस्पतिः", iast: "vācaspatiḥ", meaning_en: "Lord of Speech", meaning_hi: "वाणी का स्वामी" }
    ],
    commentary: "Atharvaveda handles the practical connection between physical wellness and spiritual protection."
  },

  // UPANISHADS
  {
    slug: "kena",
    categorySlug: "upanishads",
    titleSanskrit: "केनोपनिषद्",
    titleHindi: "केन उपनिषद्",
    titleEnglish: "Kena Upanishad",
    description: "An inquiry into the ultimate power behind sensory perceptions, thoughts, and breath.",
    totalChapters: 4,
    totalVerses: 35,
    coverImage: "/images/covers/kena.jpg",
    authorRishi: "Sage Pippalada",
    periodEra: "Treta Yuga",
    verseSanskrit: "केनेषितं पतति प्रेषितं मनः केन प्राणः प्रथमः प्रैति युक्तः। केनेषितां वाचमिमां वदन्ति चक्षुः श्रोत्रं क उ देवो युनक्ति॥ १.१॥",
    verseTrans: "keneṣitaṁ patati preṣitaṁ manaḥ kena prāṇaḥ prathamaḥ praiti yuktaḥ | keneṣitāṁ vācamimāṁ vadanti cakṣuḥ śrotraṁ ka u devo yunakti || 1.1 ||",
    verseHindi: "किसके द्वारा प्रेरित होकर यह मन अपने विषयों पर जाता है? कौन आदि प्राण को चलने की प्रेरणा देता है? किसके द्वारा प्रेरित होकर लोग वाणी बोलते हैं?",
    verseEnglish: "By whose will does the mind react and fall on its objects? Directed by whom does the vital breath go forth? By whose will is this speech spoken?",
    meanings: [
      { word: "केन", iast: "kena", meaning_en: "by whom / what", meaning_hi: "किसके द्वारा" },
      { word: "मनः", iast: "manaḥ", meaning_en: "mind", meaning_hi: "मन" }
    ],
    commentary: "Kena explores Brahman as the ultimate subject, the eye behind the eye and the mind behind the mind."
  },
  {
    slug: "katha",
    categorySlug: "upanishads",
    titleSanskrit: "कठोपनिषद्",
    titleHindi: "कठ उपनिषद्",
    titleEnglish: "Katha Upanishad",
    description: "Nachiketa's dialogue with Yama (Lord of Death) regarding the immortality of the Atman.",
    totalChapters: 2,
    totalVerses: 120,
    coverImage: "/images/covers/katha.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Treta Yuga",
    verseSanskrit: "उशन् ह वै वाजश्रवसः सर्ववेदसं ददौ। तस्य ह नचिकेता नाम पुत्र आस॥ १.१.१॥",
    verseTrans: "uśan ha vai vājaśravasaḥ sarvavedasaṁ dadau | tasya ha naciketā nāma putra āsa || 1.1.1 ||",
    verseHindi: "वाजश्रवा के पुत्र (उद्दालक) ने फल की इच्छा से अपना सब कुछ दान कर दिया। उनका नचिकेता नामक एक पुत्र था।",
    verseEnglish: "Desiring rewards, the son of Vajashrava gave away all his possessions in sacrifice. He had a son named Nachiketa.",
    meanings: [
      { word: "वाजश्रवसः", iast: "vājaśravasaḥ", meaning_en: "son of Vajashrava", meaning_hi: "वाजश्रवा के पुत्र" }
    ],
    commentary: "Katha Upanishad frames the search for immortality within the bold requests of a young boy facing Death."
  },
  {
    slug: "prashna",
    categorySlug: "upanishads",
    titleSanskrit: "प्रश्नोपनिषद्",
    titleHindi: "प्रश्नोपनिषद्",
    titleEnglish: "Prashna Upanishad",
    description: "Six philosophical questions answered by Sage Pippalada about creation and vital energy.",
    totalChapters: 6,
    totalVerses: 67,
    coverImage: "/images/covers/prashna.jpg",
    authorRishi: "Sage Pippalada",
    periodEra: "Treta Yuga",
    verseSanskrit: "ॐ भद्रं कर्णेभिः शृणुयाम देवाः भद्रं पश्येमाक्षभिर्यजत्राः। स्थिरैरङ्गैस्तुष्टुवांसस्तनूभिर्व्यशेम देवहितं यदायुः॥ १.१॥",
    verseTrans: "om bhadraṁ karṇebhiḥ śṛṇuyāma devāḥ bhadraṁ paśyemākṣabhiryajatrāḥ | sthirairaṅgaistuṣṭuvānsastanūbhirvyaśema devahitaṁ yadāyuḥ || 1.1 ||",
    verseHindi: "हे देवगण! हम कानों से कल्याणकारी वचन सुनें, आंखों से शुभ देखें। स्वस्थ अंगों और शरीर से आपकी स्तुति करते हुए देवताओं द्वारा निर्धारित आयु भोगें।",
    verseEnglish: "O Gods, may we hear with our ears what is auspicious. May we see with our eyes what is auspicious. May we live our allotted life with firm limbs.",
    meanings: [
      { word: "भद्रम्", iast: "bhadram", meaning_en: "auspicious / good", meaning_hi: "कल्याणकारी" }
    ],
    commentary: "A beautiful prayer asking for physical and sensory purity before engaging in deep spiritual enquiry."
  },
  {
    slug: "mundaka",
    categorySlug: "upanishads",
    titleSanskrit: "मुण्डकोपनिषद्",
    titleHindi: "मुण्डक उपनिषद्",
    titleEnglish: "Mundaka Upanishad",
    description: "The division between higher self-knowledge and lower worldly knowledge. Features the two birds metaphor.",
    totalChapters: 3,
    totalVerses: 64,
    coverImage: "/images/covers/mundaka.jpg",
    authorRishi: "Sage Angiras",
    periodEra: "Treta Yuga",
    verseSanskrit: "ॐ ब्रह्मा देवानां प्रथमः सम्बभूव विश्वस्य कर्ता भुवनस्य गोप्ता। स ब्रह्मविद्यां सर्वविद्याप्रतिष्ठामथर्वाय ज्येष्ठपुत्राय प्राह॥ १.१.१॥",
    verseTrans: "om brahmā devānāṁ prathamas sambabhūva viśvasya kartā bhuvanasya goptā | sa brahmavidyāṁ sarvavidyāpratiṣṭhāmatharvāya jyeṣṭhaputrāya prāha || 1.1.1 ||",
    verseHindi: "देवताओं में सबसे पहले ब्रह्मा प्रकट हुए, जो विश्व के कर्ता और भुवनों के रक्षक हैं। उन्होंने अपने ज्येष्ठ पुत्र अथर्वा को ब्रह्मविद्या का उपदेश दिया।",
    verseEnglish: "Brahma arose first among the gods, creator of the universe and protector of the worlds. He taught the science of Brahman to his eldest son Atharvan.",
    meanings: [
      { word: "ब्रह्मा", iast: "brahmā", meaning_en: "the creator God", meaning_hi: "ब्रह्मा देव" },
      { word: "ब्रह्मविद्याम्", iast: "brahmavidyām", meaning_en: "knowledge of Brahman", meaning_hi: "ब्रह्मविद्या को" }
    ],
    commentary: "Mundaka distinguishes between intellectual books and direct experiential realization of the supreme."
  },
  {
    slug: "mandukya",
    categorySlug: "upanishads",
    titleSanskrit: "माण्डूक्योपनिषद्",
    titleHindi: "माण्डूक्य उपनिषद्",
    titleEnglish: "Mandukya Upanishad",
    description: "An analysis of the four states of consciousness (waking, dreaming, deep sleep, silence) via the symbol OM.",
    totalChapters: 1,
    totalVerses: 12,
    coverImage: "/images/covers/mandukya.jpg",
    authorRishi: "Sage Pippalada",
    periodEra: "Treta Yuga",
    verseSanskrit: "ॐ इत्येतदक्षरमिदं सर्वं तस्योपव्याख्यानं भूतं भवद् भविष्यदिति सर्वमोङ्कार एव। यच्चान्यत् त्रिकालातीतं तदपि ओङ्कार एव॥ १॥",
    verseTrans: "om ityetadakṣaramidaṁ sarvaṁ tasyopavyākhyānaṁ bhūtaṁ bhavad bhaviṣyaditi sarvamoṅkāra eva | yaccānyat trikālātītaṁ tadapi oṅkāra eva || 1 ||",
    verseHindi: "ॐ यह अक्षर ही सब कुछ है। भूत, वर्तमान और भविष्य— यह सब ओङ्कार ही है। जो तीन कालों से परे है, वह भी ओङ्कार ही है।",
    verseEnglish: "OM, this syllable is all this. Its explanation is: what was, what is, and what will be—all is OM. And whatever else transcending the three times is also OM.",
    meanings: [
      { word: "सर्वम्", iast: "sarvam", meaning_en: "all / everything", meaning_hi: "सब कुछ" }
    ],
    commentary: "Mandukya maps the entire universe and individual psychology onto the phonemes of the sacred word AUM."
  },
  {
    slug: "aitareya",
    categorySlug: "upanishads",
    titleSanskrit: "ऐतरेयोपनिषद्",
    titleHindi: "ऐतरेय उपनिषद्",
    titleEnglish: "Aitareya Upanishad",
    description: "Traces the creation of the universe and cosmic energies, declaring consciousness as Brahman.",
    totalChapters: 3,
    totalVerses: 33,
    coverImage: "/images/covers/aitareya.jpg",
    authorRishi: "Sage Mahidasa Aitareya",
    periodEra: "Treta Yuga",
    verseSanskrit: "ॐ आत्मा वा इदमेक एवाग्र आसीत्। नान्यत्किञ्चन मिषत्। स ईक्षत लोकान्नु सृजा इति॥ १.१.१॥",
    verseTrans: "om ātmā vā idameka evāgra āsīt | nānyatkiñcana miṣat | sa īkṣata lokānnu sṛjā iti || 1.1.1 ||",
    verseHindi: "प्रारंभ में यह सब केवल एक आत्मा ही था। इसके अतिरिक्त कोई चेष्टावान पदार्थ नहीं था। उसने संकल्प किया कि मैं लोकों की सृष्टि करूं।",
    verseEnglish: "In the beginning, this universe was verily Atman alone. There was nothing else active. He thought, 'Let me now create the worlds.'",
    meanings: [
      { word: "आत्मा", iast: "ātmā", meaning_en: "the self / soul", meaning_hi: "आत्मा" }
    ],
    commentary: "Aitareya shows how cosmic deities entered the human body as sensory organs, establishing the human as a microcosm."
  },
  {
    slug: "taittiriya",
    categorySlug: "upanishads",
    titleSanskrit: "तैत्तिरीयोपनिषद्",
    titleHindi: "तैत्तिरीय उपनिषद्",
    titleEnglish: "Taittiriya Upanishad",
    description: "Defines the five sheaths of human personality (Koshas) and ethical guidelines for students.",
    totalChapters: 3,
    totalVerses: 31,
    coverImage: "/images/covers/taittiriya.jpg",
    authorRishi: "Sage Vaishampayana",
    periodEra: "Treta Yuga",
    verseSanskrit: "ॐ शं नो मित्रः शं वरुणः। शं नो भवत्वर्यमा। शं नो इन्द्रो बृहस्पतिः। शं नो विष्णुरुरुक्रमः॥ १.१.१॥",
    verseTrans: "om śaṁ no mitraḥ śaṁ varuṇaḥ | śaṁ no bhavatvaryamā | śaṁ no indro bṛhaspatiḥ | śaṁ no viṣṇururukramaḥ || 1.1.1 ||",
    verseHindi: "मित्र देव हमारे लिए कल्याणकारी हों, वरुण देव कल्याणकारी हों। अर्यमा देव हमारे लिए सुखदायी हों। इन्द्र और बृहस्पति हमारा कल्याण करें।",
    verseEnglish: "May Mitra be propitious to us, and Varuna. May Aryaman be favorable. May Indra and Brihaspati grant us welfare.",
    meanings: [
      { word: "शम्", iast: "śam", meaning_en: "peace / auspiciousness", meaning_hi: "कल्याण" }
    ],
    commentary: "A traditional peace chant invoking planetary and atmospheric deities for educational harmony."
  },
  {
    slug: "chandogya",
    categorySlug: "upanishads",
    titleSanskrit: "छान्दोग्योपनिषद्",
    titleHindi: "छान्दोग्य उपनिषद्",
    titleEnglish: "Chandogya Upanishad",
    description: "Famous Upanishadic dialogue of Uddalaka and Shvetaketu declaring 'Tat Tvam Asi' (That Thou Art).",
    totalChapters: 8,
    totalVerses: 628,
    coverImage: "/images/covers/chandogya.jpg",
    authorRishi: "Sage Ghora Angirasa",
    periodEra: "Treta Yuga",
    verseSanskrit: "ॐ इत्येतदक्षरमुद्गीथमुपासीत। ओमिति ह्युद्गायति तस्योपव्याख्यानम्॥ १.१.१॥",
    verseTrans: "om ityetadakṣaramudgīthamupāsīta | omiti hyudgāyati tasyopavyākhyanam || 1.1.1 ||",
    verseHindi: "ॐ इस अक्षर को उद्गीथ मानकर इसकी उपासना करनी चाहिए। ॐ से ही उद्गाता गान प्रारंभ करता है, यह उसकी व्याख्या है।",
    verseEnglish: "One should worship the syllable OM as the Udgitha. For with OM one begins to sing, here is its detailed explanation.",
    meanings: [
      { word: "अक्षरम्", iast: "akṣaram", meaning_en: "imperishable / letter", meaning_hi: "अक्षर" }
    ],
    commentary: "Chandogya bridges the outer sacrificial actions with inner meditative visualization of OM."
  },
  {
    slug: "brihadaranyaka",
    categorySlug: "upanishads",
    titleSanskrit: "बृहदारण्यकोपनिषद्",
    titleHindi: "बृहदारण्यक उपनिषद्",
    titleEnglish: "Brihadaranyaka Upanishad",
    description: "The largest Upanishad, exploring direct non-dual realization with Sage Yajnavalkya and Gargi.",
    totalChapters: 6,
    totalVerses: 435,
    coverImage: "/images/covers/brihadaranyaka.jpg",
    authorRishi: "Sage Yajnavalkya",
    periodEra: "Treta Yuga",
    verseSanskrit: "ॐ उषा वा अश्वस्य मेध्यस्य शिरः। सूर्यश्चक्षुर्वातः प्राणो व्यात्तमग्निर्वैश्वानरः संवत्सर आत्माश्वस्य मेध्यस्य॥ १.१.१॥",
    verseTrans: "om uṣā vā aśvasya medhyasya śiraḥ | sūryaścakṣurvātaḥ prāṇo vyāttamagnirvaiśvānaraḥ saṁvatsara ātmāśvasya medhyasya || 1.1.1 ||",
    verseHindi: "ॐ उषा ही यज्ञीय अश्व का मस्तक है। सूर्य उसका नेत्र है, वायु उसके प्राण हैं, खुला मुख ही वैश्वानर अग्नि है और संवत्सर (वर्ष) उसका शरीर है।",
    verseEnglish: "OM, the dawn is the head of the sacrificial horse. The sun is its eye, the wind is its breath, the open mouth is the Vaishvanara fire.",
    meanings: [
      { word: "उषा", iast: "uṣā", meaning_en: "dawn", meaning_hi: "प्रातःकाल / उषा" }
    ],
    commentary: "This Upanishad opens by transforming the traditional horse sacrifice (Ashvamedha) into a cosmic meditation."
  },
  {
    slug: "shvetashvatara",
    categorySlug: "upanishads",
    titleSanskrit: "श्वेताश्वतरोपनिषद्",
    titleHindi: "श्वेताश्वतर उपनिषद्",
    titleEnglish: "Shvetashvatara Upanishad",
    description: "Focuses on personal devotion (Bhakti) to Rudra-Shiva as the supreme cause of the cosmos.",
    totalChapters: 6,
    totalVerses: 113,
    coverImage: "/images/covers/shvetashvatara.jpg",
    authorRishi: "Sage Shvetashvatara",
    periodEra: "Treta Yuga",
    verseSanskrit: "ॐ ब्रह्मवादिनो वदन्ति। किंकारणं ब्रह्म कुतः स्म जाता जीवाम केन क्व च सम्प्रतिष्ठाः॥ १.१॥",
    verseTrans: "om brahmavādino vadanti | kiṁkāraṇaṁ brahma kutaḥ sma jātā jīvāma kena kva ca sampratiṣṭhāḥ || 1.1 ||",
    verseHindi: "ब्रह्मवादी आपस में चर्चा करते हैं: ब्रह्म का क्या कारण है? हम कहां से उत्पन्न हुए हैं? हम किसके द्वारा जीवित रहते हैं?",
    verseEnglish: "The seekers of Brahman discuss: What is the cause? Is it Brahman? Whence are we born? By what do we live?",
    meanings: [
      { word: "किंकारणम्", iast: "kiṁkāraṇam", meaning_en: "what is the cause", meaning_hi: "क्या कारण है" }
    ],
    commentary: "This text introduces the concept of personal devotion (Bhakti) to Lord Rudra within the Upanishadic fold."
  },
  {
    slug: "kaushitaki",
    categorySlug: "upanishads",
    titleSanskrit: "कौषीतक्युपनिषद्",
    titleHindi: "कौषीतकि उपनिषद्",
    titleEnglish: "Kaushitaki Upanishad",
    description: "Inquiries into the path of the soul after death, vital energy, and ultimate reality.",
    totalChapters: 4,
    totalVerses: 78,
    coverImage: "/images/covers/kaushitaki.jpg",
    authorRishi: "Sage Kaushitaki",
    periodEra: "Treta Yuga",
    verseSanskrit: "चितिः स्रुक् चक्षुर्घृतं मनो ब्रह्माग्निरन्तः कोऽपि देवो मे वीर्यं दधातु॥ १.१॥",
    verseTrans: "citiḥ sruk cakṣurghṛtaṁ mano brahmāgnirantaḥ ko'pi devo me vīryaṁ dadhatu || 1.1 ||",
    verseHindi: "चित्त ही हवन करने का स्रुवा है, आंखें घी हैं, मन ब्रह्मा है, हमारे भीतर का अग्निदेव हमारे बल को धारण करे।",
    verseEnglish: "Consciousness is the ladle, the eye is the clarified butter, the mind is the priest; may the fire within establish my strength.",
    meanings: [
      { word: "चितिः", iast: "citiḥ", meaning_en: "mind / consciousness", meaning_hi: "चित्त" }
    ],
    commentary: "Kaushitaki maps the internal ritual structure of the individual, treating life functions as sacrifices."
  },
  {
    slug: "maitri",
    categorySlug: "upanishads",
    titleSanskrit: "मैत्रायणीयोपनिषद्",
    titleHindi: "मैत्री उपनिषद्",
    titleEnglish: "Maitri Upanishad",
    description: "Explores the nature of the soul, meditation techniques, and freedom from cosmic illusion.",
    totalChapters: 7,
    totalVerses: 117,
    coverImage: "/images/covers/maitri.jpg",
    authorRishi: "Sage Maitri",
    periodEra: "Treta Yuga",
    verseSanskrit: "ॐ ब्रह्मो वा इदमेक एवाग्र आसीत् अनन्तं तत् पूर्वं परं च। तदेतत् सत्त्वं रजस्तम इति गुणात्मकं भवति॥ १.१॥",
    verseTrans: "om brahmo vā idameka evāgra āsīt anantaṁ tat pūrvaṁ paraṁ ca | tadetat sattvaṁ rajastama iti guṇātmakaṁ bhavati || 1.1 ||",
    verseHindi: "प्रारंभ में यह सब केवल एक अनंत ब्रह्म ही था। वही सत्त्व, रजस और तमस नामक त्रिगुणों में विभक्त हुआ।",
    verseEnglish: "In the beginning, all this was Brahman alone, infinite, without limits. Then it manifested as Sattva, Rajas, and Tamas.",
    meanings: [
      { word: "अनन्तम्", iast: "anantam", meaning_en: "infinite / endless", meaning_hi: "अनंत" }
    ],
    commentary: "Maitri Upanishad integrates Samkhya philosophy terminology (the three Gunas) into the non-dual Vedantic framework."
  },

  // PURANAS
  {
    slug: "brahma-purana",
    categorySlug: "puranas",
    titleSanskrit: "ब्रह्म पुराण",
    titleHindi: "ब्रह्म पुराण",
    titleEnglish: "Brahma Purana",
    description: "Known as Adi Purana, details the legends of creation, solar dynasty, and sacred spots.",
    totalChapters: 245,
    totalVerses: 10000,
    coverImage: "/images/covers/brahma-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमः शिवाय। यः परं प्रकाशः सर्वरूपः सर्वेश्वरः। तं देवं जगदादिं प्रणमामि शिवं परम्॥ १.१॥",
    verseTrans: "om namaḥ śivāya | yaḥ paraṁ prakāśaḥ sarvarūpaḥ sarveśvaraḥ | taṁ devaṁ jagadādiṁ praṇamāmi śivaṁ param || 1.1 ||",
    verseHindi: "ॐ नमः शिवाय। जो परम प्रकाश स्वरूप, सर्वरूप और सर्वेश्वर हैं, उन जगत के आदिकारण भगवान शिव को मैं नमस्कार करता हूँ।",
    verseEnglish: "Salutations to Shiva! I bow to the supreme Lord Shiva, who is the absolute light, the form of all, and the origin of the universe.",
    meanings: [
      { word: "प्रकाशः", iast: "prakāśaḥ", meaning_en: "luminous light", meaning_hi: "प्रकाश" }
    ],
    commentary: "Though named Brahma Purana, it starts with salutations to the absolute consciousness representing Shiva-energy."
  },
  {
    slug: "padma-purana",
    categorySlug: "puranas",
    titleSanskrit: "पद्म पुराण",
    titleHindi: "पद्म पुराण",
    titleEnglish: "Padma Purana",
    description: "Detailed treatises on cosmological space, geography of earth, and devotion to Lord Vishnu.",
    totalChapters: 654,
    totalVerses: 55000,
    coverImage: "/images/covers/padma-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमः श्रीवासुदेवाय। नारायणं नमस्कृत्य नरं चैव नरोत्तमम्। देवीं सरस्वतीं व्यासं ततो जयमुदीरयेत्॥ १.१॥",
    verseTrans: "om namaḥ śrīvāsudevāya | nārāyaṇaṁ namस्कृत्य naraṁ caiva narottamama | devīṁ sarasvatīṁ vyāsaṁ tato jayamudīrayet || 1.1 ||",
    verseHindi: "भगवान वासुदेव को नमस्कार है। नारायण, नरोत्तम नर, सरस्वती देवी और व्यास देव को प्रणाम करके जय (इतिहास) का पाठ करना चाहिए।",
    verseEnglish: "Salutations to Lord Vasudeva. Having bowed down to Narayana, the supreme human, Goddess Saraswati, and Vyasa, one should sing the victory.",
    meanings: [
      { word: "नमस्कृत्य", iast: "namaskṛtya", meaning_en: "having bowed", meaning_hi: "प्रणाम करके" }
    ],
    commentary: "Padma Purana contains massive details on the geography of ancient India (Jambudvipa) and pilgrimages."
  },
  {
    slug: "vishnu-purana",
    categorySlug: "puranas",
    titleSanskrit: "विष्णु पुराण",
    titleHindi: "विष्णु पुराण",
    titleEnglish: "Vishnu Purana",
    description: "Details the creation of the material universe, avatars, and description of the four Yugas.",
    totalChapters: 6,
    totalVerses: 23000,
    coverImage: "/images/covers/vishnu-p.jpg",
    authorRishi: "Sage Parasara",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमो वासुदेवाय। यस्यैतज्जगदालम्बः सर्वभूतहृदि स्थितः। स नो विष्णुः प्रसीदतु सर्वव्यापी सनातनः॥ १.१.१॥",
    verseTrans: "om namo vāsudevāya | yasyaitajjagadālambaḥ sarvabhūtahṛdi sthitaḥ | sa no viṣṇuḥ prasīdatu sarvavyāpī sanātanaḥ || 1.1.1 ||",
    verseHindi: "ॐ नमो वासुदेवाय। यह संपूर्ण जगत जिसका आश्रय है, जो सब प्राणियों के हृदय में निवास करते हैं, वे सर्वव्यापी सनातन विष्णु हम पर प्रसन्न हों।",
    verseEnglish: "Salutations to Vasudeva. May that all-pervading, eternal Lord Vishnu, who supports this universe and resides in the hearts of all, protect us.",
    meanings: [
      { word: "हृदि", iast: "hṛdi", meaning_en: "in the heart", meaning_hi: "हृदय में" }
    ],
    commentary: "Vishnu Purana is historically known for outlining the six characteristics of a true Purana."
  },
  {
    slug: "bhagavata-purana",
    categorySlug: "puranas",
    titleSanskrit: "श्रीमद्भागवत पुराण",
    titleHindi: "श्रीमद्भागवत महापुराण",
    titleEnglish: "Bhagavata Purana",
    description: "Focuses on Lord Krishna's divine sports, avatars, and the ecstatic path of devotion (Bhakti).",
    totalChapters: 12,
    totalVerses: 18000,
    coverImage: "/images/covers/bhagavata-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट् तेने ब्रह्म हृदा य आदिकवये मुह्यन्ति यत्सूरयः। तेजोवारिमृदां यथा विनिमयो यत्र त्रिसर्गोऽमृषा धाम्ना स्वेन सदा निरस्तकुहकं सत्यं परं धीमहि॥ १.१.१॥",
    verseTrans: "janmādyasya yato'nvayāditarataścārtheṣvabhijñaḥ svarāṭ tene brahma hṛdā ya ādikavaye muhyanti yatsūrayaḥ | tejovārimṛdāṁ yathā vinimayo yatra trisargo'mṛṣā dhāmnā svena sadā nirastakuhakaṁ satyaṁ paraṁ dhīmahi || 1.1.1 ||",
    verseHindi: "जिससे इस जगत की सृष्टि, स्थिति और प्रलय होते हैं, जो सर्वज्ञ और स्वयंप्रकाश है, मैं उस परम सत्य रूप परमात्मा का ध्यान करता हूँ।",
    verseEnglish: "We meditate upon the Supreme Truth (Satyam Param Dhimahi), from whom the creation, maintenance, and dissolution of the universe arise.",
    meanings: [
      { word: "धीमहि", iast: "dhīmahi", meaning_en: "we meditate upon", meaning_hi: "हम ध्यान करते हैं" }
    ],
    commentary: "The opening shloka of Bhagavata is a universal meditation mantra aligning with the Gayatri structure."
  },
  {
    slug: "narada-purana",
    categorySlug: "puranas",
    titleSanskrit: "नारद पुराण",
    titleHindi: "नारद पुराण",
    titleEnglish: "Narada Purana",
    description: "Discourses by Sage Narada on devotional duties, temple worship, and the greatness of scriptures.",
    totalChapters: 2,
    totalVerses: 25000,
    coverImage: "/images/covers/narada-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "नारायणं नमस्कृत्य देवदेवं सनातनम्। नारदेन पुरा प्रोक्तं धर्मशास्त्रमनुत्तमम्॥ १.१॥",
    verseTrans: "nārāyaṇaṁ namaskṛtya devadevaṁ sanātanam | nāradena purā proktaṁ dharmaśāstramanutthamam || 1.1 ||",
    verseHindi: "सनातन देवों के देव भगवान नारायण को नमस्कार करके, देवर्षि नारद द्वारा कहे गए इस उत्तम धर्मशास्त्र का पाठ करते हैं।",
    verseEnglish: "Having bowed to the eternal God of Gods, Narayana, we study this ultimate scripture spoken by Sage Narada.",
    meanings: [
      { word: "सनातनम्", iast: "sanātanam", meaning_en: "eternal / timeless", meaning_hi: "सनातन" }
    ],
    commentary: "A beautiful text acting as an index to all other 17 Puranas, describing their structures."
  },
  {
    slug: "markandeya-purana",
    categorySlug: "puranas",
    titleSanskrit: "मार्कण्डेय पुराण",
    titleHindi: "मार्कण्डेय पुराण",
    titleEnglish: "Markandeya Purana",
    description: "Includes the Devi Mahatmya (Durga Saptashati), glorifying the Supreme Mother of the universe.",
    totalChapters: 137,
    totalVerses: 9000,
    coverImage: "/images/covers/markandeya-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "नारायणं नमस्कृत्य मुनिं मार्कण्डेयमेव च। प्रवक्ष्यामि पुराणं तु सर्वपापप्रणाशनम्॥ १.१॥",
    verseTrans: "nārāyaṇaṁ namaskṛtya muniṁ mārkaṇḍeyameva ca | pravakṣyāmi purāṇaṁ tu sarvapāpapraṇāśanam || 1.1 ||",
    verseHindi: "भगवान नारायण और मुनि मार्कण्डेय को प्रणाम करके मैं इस समस्त पापों का नाश करने वाले पुराण का प्रवचन करता हूँ।",
    verseEnglish: "Bowing down to Narayana and Sage Markandeya, I speak this Purana which destroys all sins.",
    meanings: [
      { word: "मुनिम्", iast: "munim", meaning_en: "to the sage", meaning_hi: "मुनि को" }
    ],
    commentary: "This Purana houses the legendary Devi Mahatmya (glorifying active feminine Shakti force)."
  },
  {
    slug: "agni-purana",
    categorySlug: "puranas",
    titleSanskrit: "अग्नि पुराण",
    titleHindi: "अग्नि पुराण",
    titleEnglish: "Agni Purana",
    description: "An encyclopedic scripture describing medicine, weapon arts, astrology, metrics, and statecraft.",
    totalChapters: 383,
    totalVerses: 15400,
    coverImage: "/images/covers/agni-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमः शिवाय। विष्णुं कल्पतरुं वन्दे सर्वकामफलप्रदम्। यस्याग्निरूपेण मुखाद् वेदाः सद्यः विनिःसृताः॥ १.१॥",
    verseTrans: "om namaḥ śivāya | viṣṇuṁ kalpataruṁ vande sarvakāmaphalapradam | yasyāgnirūpeṇa mukhād vedāḥ sadyaḥ viniḥsṛtāḥ || 1.1 ||",
    verseHindi: "ॐ नमः शिवाय। मैं कल्पवृक्ष रूप भगवान विष्णु की वंदना करता हूँ, जिनके मुख से अग्नि के रूप में वेद तुरंत प्रकट हुए।",
    verseEnglish: "Om, salutations to Shiva. I bow to Lord Vishnu, the wish-fulfilling tree, from whose mouth in the form of Agni the Vedas manifested.",
    meanings: [
      { word: "मुखत्", iast: "mukhat", meaning_en: "from the mouth", meaning_hi: "मुख से" }
    ],
    commentary: "Spoken directly by Agni (Fire God) to Sage Vasistha, it acts as a massive ancient encyclopedia."
  },
  {
    slug: "bhavishya-purana",
    categorySlug: "puranas",
    titleSanskrit: "भविष्य पुराण",
    titleHindi: "भविष्य पुराण",
    titleEnglish: "Bhavishya Purana",
    description: "Includes prophecies and descriptions of the future dynasties, kingdoms, and modern age.",
    totalChapters: 5,
    totalVerses: 14500,
    coverImage: "/images/covers/bhavishya-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमः स्वयम्भुवे देवभूपतये। भविष्यं कथयिष्यामि चरितं सर्वकर्मणाम्॥ १.१॥",
    verseTrans: "om namaḥ svayambhuve devabhūpataye | bhaviṣyaṁ kathayiṣyāmi caritaṁ sarvakarmaṇām || 1.1 ||",
    verseHindi: "स्वयंभू देव को नमस्कार है। मैं सभी कर्मों के फल स्वरूप होने वाली भविष्य की घटनाओं का वर्णन करूँगा।",
    verseEnglish: "Salutations to the self-manifested Lord. I shall now tell the future history of all cosmic actions.",
    meanings: [
      { word: "भविष्यम्", iast: "bhaviṣyam", meaning_en: "future / prophecy", meaning_hi: "भविष्य" }
    ],
    commentary: "Famous for containing early mentions of historical events and foreign rulers of later eras."
  },
  {
    slug: "brahmavaivarta-purana",
    categorySlug: "puranas",
    titleSanskrit: "ब्रह्मवैवर्त पुराण",
    titleHindi: "ब्रह्मवैवर्त पुराण",
    titleEnglish: "Brahma Vaivarta Purana",
    description: "Glorifies the eternal playground (Goloka) and the divine relationships of Radha and Krishna.",
    totalChapters: 4,
    totalVerses: 18000,
    coverImage: "/images/covers/brahmavaivarta-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमो गणेशाय। रासेश्वरं सुरेश्वरं राधाकान्तं सनातनम्। वन्दे कृष्णं गुणातीतं सर्वबीजं जगद्गुरुम्॥ १.१॥",
    verseTrans: "om namo gaṇeśāya | rāseśvaraṁ sureśvaraṁ rādhākāntaṁ sanātanam | vande kṛṣṇaṁ guṇātītaṁ sarvabījaṁ jagadgurum || 1.1 ||",
    verseHindi: "ॐ श्री गणेशाय नमः। मैं रास के स्वामी, सुरेश्वर, राधाकान्त, सनातन, गुणातीत कृष्ण की वंदना करता हूँ जो जगत के गुरु हैं।",
    verseEnglish: "Om, salutations to Ganesha. I bow to Lord Krishna, the Lord of Rasa, Radha's beloved, beyond the three Gunas, the teacher of the world.",
    meanings: [
      { word: "जगद्गुरुम्", iast: "jagadgurum", meaning_en: "teacher of the world", meaning_hi: "जगत के गुरु" }
    ],
    commentary: "Prominently outlines the manifestations of Prakriti as five primary goddesses."
  },
  {
    slug: "linga-purana",
    categorySlug: "puranas",
    titleSanskrit: "लिङ्ग पुराण",
    titleHindi: "लिंग पुराण",
    titleEnglish: "Linga Purana",
    description: "Expositions on the meaning of Linga (symbol of cosmic formlessness) and Shiva's forms.",
    totalChapters: 2,
    totalVerses: 11000,
    coverImage: "/images/covers/linga-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमः शिवाय। प्रधानं पुरुषं व्यक्तं शिवलिङ्गं च यं विदुः। तं नमामि परं देवं मोक्षदं परमेश्वरम्॥ १.१॥",
    verseTrans: "om namaḥ śivāya | pradhānaṁ puruṣaṁ vyaktaṁ śivalingaṁ ca yaṁ viduḥ | taṁ namāmi paraṁ devaṁ mokṣadaṁ parameśvaram || 1.1 ||",
    verseHindi: "ॐ नमः शिवाय। जिसे प्रकृति, पुरुष और व्यक्त ब्रह्मांड रूप शिवलिङ्ग कहते हैं, उस मोक्ष प्रदान करने वाले परमेश्वर को मैं प्रणाम करता हूँ।",
    verseEnglish: "Salutations to Shiva. I bow to the supreme Lord, who is known as the Shiva Lingam, matching nature and spirit, granting liberation.",
    meanings: [
      { word: "मोक्षदम्", iast: "mokṣadam", meaning_en: "granting liberation", meaning_hi: "मोक्ष प्रदान करने वाले" }
    ],
    commentary: "Explains the Lingam not as a physical shape, but as the formless source (Alinga) of all material forms."
  },
  {
    slug: "varaha-purana",
    categorySlug: "puranas",
    titleSanskrit: "वराह पुराण",
    titleHindi: "वराह पुराण",
    titleEnglish: "Varaha Purana",
    description: "Dedicated to the Varaha (boar) avatar of Vishnu, containing code of prayers and holy places.",
    totalChapters: 218,
    totalVerses: 10000,
    coverImage: "/images/covers/varaha-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमो नारायणाय। यस्माद्विश्वं समुद्भूतं यत्र तिष्ठति सर्वदा। वराहरूपिणे तस्मै नमः कल्याणकारिणे॥ १.१॥",
    verseTrans: "om namo nārāyaṇāya | yasmāndviśvaṁ samudbhūtaṁ yatra tiṣṭhati sarvadā | varāharūpiṇe tasmai namaḥ kalyāṇakāriṇe || 1.1 ||",
    verseHindi: "ॐ नमो नारायणाय। जिससे यह सम्पूर्ण विश्व उत्पन्न हुआ है और जिसमें स्थित है, उस कल्याणकारी वराह रूप धारी परमात्मा को नमस्कार है।",
    verseEnglish: "Salutations to Narayana. Bow to that auspicious Lord in the form of Varaha, from whom the cosmos arose and in whom it rests.",
    meanings: [
      { word: "कल्याणकारिणे", iast: "kalyāṇakāriṇe", meaning_en: "to the creator of welfare", meaning_hi: "कल्याण करने वाले को" }
    ],
    commentary: "Outlines Vishnu lifting the earth goddess (Bhudevi) from the cosmic waters, containing dialogues between them."
  },
  {
    slug: "skanda-purana",
    categorySlug: "puranas",
    titleSanskrit: "स्कन्द पुराण",
    titleHindi: "स्कन्द पुराण",
    titleEnglish: "Skanda Purana",
    description: "The largest Purana, filled with legends of Kartikeya, Shiva, pilgrimage maps, and legends.",
    totalChapters: 7,
    totalVerses: 81100,
    coverImage: "/images/covers/skanda-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमः शिवाय। नत्वा सर्वजगन्नाथं कार्तिकेयं गुहं शिवम्। स्कन्दपुराणमाहात्म्यं प्रवक्ष्यामि समासतः॥ १.१॥",
    verseTrans: "om namaḥ śivāya | natvā sarvajagannāthaṁ kārtikeyaṁ guhaṁ śivam | skandapurāṇamāhātmyaṁ pravakṣyāmi samāsataḥ || 1.1 ||",
    verseHindi: "ॐ नमः शिवाय। जगन्नाथ भगवान शिव और कार्तिकेय को प्रणाम करके मैं संक्षेप में स्कन्द पुराण की महिमा का वर्णन करूँगा।",
    verseEnglish: "Salutations to Shiva. Bowing to Shiva and Kartikeya, the Lord of all worlds, I shall summarize the glory of Skanda Purana.",
    meanings: [
      { word: "नत्वा", iast: "natvā", meaning_en: "having bowed", meaning_hi: "प्रणाम करके" }
    ],
    commentary: "A massive geographical grid of Bharat, mapping temples, rivers, and local forest pilgrimages."
  },
  {
    slug: "vamana-purana",
    categorySlug: "puranas",
    titleSanskrit: "वामन पुराण",
    titleHindi: "वामन पुराण",
    titleEnglish: "Vamana Purana",
    description: "Focuses on the dwarf incarnation of Lord Vishnu and legends of King Bali.",
    totalChapters: 95,
    totalVerses: 10000,
    coverImage: "/images/covers/vamana-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमः शिवाय। नारायणं नमस्कृत्य वामनं जनार्दनम्। प्रवक्ष्यामि पुराणं तु सुरश्रेष्ठं महायशाः॥ १.१॥",
    verseTrans: "om namaḥ śivāya | nārāyaṇaṁ namaskṛtya vāmanaṁ janārdanam | pravakṣyāmi purāṇaṁ tu suraśreṣṭhaṁ mahāyaśāḥ || 1.1 ||",
    verseHindi: "ॐ नमः शिवाय। नारायण और वामन रूप भगवान जनार्दन को नमस्कार करके मैं इस उत्तम महायशस्वी पुराण का वर्णन करता हूँ।",
    verseEnglish: "Om, salutations to Shiva. Having bowed to Narayana and Vamana, I shall recite this highly glorious Purana.",
    meanings: [
      { word: "वामनम्", iast: "vāmanam", meaning_en: "to the dwarf form", meaning_hi: "वामन देव को" }
    ],
    commentary: "Tells the story of Vishnu as the dwarf scholar requesting three paces of land from demon king Bali."
  },
  {
    slug: "kurma-purana",
    categorySlug: "puranas",
    titleSanskrit: "कूर्म पुराण",
    titleHindi: "कूर्म पुराण",
    titleEnglish: "Kurma Purana",
    description: "Veda Vyasa details the tortoise avatar of Vishnu, describing yogic secrets.",
    totalChapters: 4,
    totalVerses: 17000,
    coverImage: "/images/covers/kurma-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमः शिवाय। कूर्मरूपं समास्थाय यः प्राह परमेश्वरः। तं वन्दे पुरुषं देवं सर्वज्ञं पुरुषोत्तमम्॥ १.१॥",
    verseTrans: "om namaḥ śivāya | kūrmarūpaṁ samāsthāya yaḥ prāha parameśvaraḥ | taṁ vande puruṣaṁ devaṁ sarvajñaṁ puruṣottamam || 1.1 ||",
    verseHindi: "ॐ नमः शिवाय। जिन्होंने कूर्म (कछुआ) रूप धारण कर ज्ञान का उपदेश दिया, उन सर्वज्ञ पुरुषोत्तम देव को मैं प्रणाम करता हूँ।",
    verseEnglish: "Salutations to Shiva. I bow to the omniscient Supreme Lord who spoke this knowledge in the form of a Tortoise.",
    meanings: [
      { word: "सर्वज्ञम्", iast: "sarvajñam", meaning_en: "omniscient / all-knowing", meaning_hi: "सर्वज्ञ" }
    ],
    commentary: "Contains the famous Ishvara Gita, detailing Shiva's non-dual yoga teachings to the gods."
  },
  {
    slug: "matsya-purana",
    categorySlug: "puranas",
    titleSanskrit: "मत्स्य पुराण",
    titleHindi: "मत्स्य पुराण",
    titleEnglish: "Matsya Purana",
    description: "Told by the fish incarnation of Vishnu during the great deluge, detailing temple structures.",
    totalChapters: 290,
    totalVerses: 14000,
    coverImage: "/images/covers/matsya-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमो भगवते वासुदेवाय। श्रुत्वा सूतमुखोद्गीतं मत्स्यरूपस्य कीर्तनम्। प्रवक्ष्यामि पुराणं तु सर्वपापप्रणाशनम्॥ १.१॥",
    verseTrans: "om namo bhagavate vāsudevāya | śrutvā sūtamukhodgītaṁ matsyarūpasya kīrtanam | pravakṣyāmi purāṇaṁ tu sarvapāpapraṇāśanam || 1.1 ||",
    verseHindi: "भगवान वासुदेव को नमस्कार है। सूत जी के मुख से मत्स्य रूप धारी प्रभु की कथा सुनकर मैं समस्त पापों का नाश करने वाले पुराण का प्रवचन करता हूँ।",
    verseEnglish: "Salutations to Lord Vasudeva. Having heard from Suta's mouth the glories of the Fish incarnation, I speak this Purana.",
    meanings: [
      { word: "श्रुत्वा", iast: "śrutvā", meaning_en: "having heard", meaning_hi: "सुनकर" }
    ],
    commentary: "A premium ancient source detailing traditional Vastu Shastra and temple iconometry codes."
  },
  {
    slug: "garuda-purana",
    categorySlug: "puranas",
    titleSanskrit: "गरुड़ पुराण",
    titleHindi: "गरुड़ पुराण",
    titleEnglish: "Garuda Purana",
    description: "Detailed descriptions of the afterlife transit, karma consequences, death, and liberation.",
    totalChapters: 3,
    totalVerses: 19000,
    coverImage: "/images/covers/garuda-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमो भगवते वासुदेवाय। यः शिवो नामरूपाभ्यां गरुड़स्य हितप्रदः। तं वन्दे देवदेवेशं विष्णुं कल्पतरुं हरिम्॥ १.१॥",
    verseTrans: "om namo bhagavate vāsudevāya | yaḥ śivo nāmarūpābhyāṁ garuḍasya hitapradaḥ | taṁ vande devadeveśaṁ viṣṇuṁ kalpataruṁ harim || 1.1 ||",
    verseHindi: "भगवान वासुदेव को नमस्कार है। जो शिव और गरुड़ को कल्याण प्रदान करते हैं, उन देवों के देव कल्पवृक्ष हरि को नमस्कार है।",
    verseEnglish: "Salutations to Lord Vasudeva. I bow to Hari, the wish-fulfilling tree and ruler of gods, who grants welfare to Garuda.",
    meanings: [
      { word: "कल्पतरुम्", iast: "kalpatarum", meaning_en: "wish-fulfilling tree", meaning_hi: "कल्पवृक्ष" }
    ],
    commentary: "Frequently read during funeral rites to explain the soul's transit and the cycle of karma."
  },
  {
    slug: "brahmanda-purana",
    categorySlug: "puranas",
    titleSanskrit: "ब्रह्माण्ड पुराण",
    titleHindi: "ब्रह्माण्ड पुराण",
    titleEnglish: "Brahmanda Purana",
    description: "Includes the Lalita Sahasranama and details the geometry of the cosmic egg (Brahmanda).",
    totalChapters: 4,
    totalVerses: 12000,
    coverImage: "/images/covers/brahmanda-p.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमः स्वयम्भुवे। यत्तदण्डमभूद्धरण्यं सर्वलोकाश्रयः परम्। तस्मै नमोऽस्तु देवाय ब्रह्मणे परमात्मने॥ १.१॥",
    verseTrans: "om namaḥ svayambhuve | yattadaṇḍamabhūddharaṇyaṁ sarvalokāśrayaḥ param | tasmai namo'stu devāya brahmaṇe paramātmane || 1.1 ||",
    verseHindi: "स्वयंभू को नमस्कार है। वह जो सुवर्णमय अण्ड (हिरण्यगर्भ) ब्रह्माण्ड बना, जो समस्त लोकों का आश्रय है, उस परमात्मा ब्रह्मा को नमस्कार है।",
    verseEnglish: "Salutations to the Self-born. I bow to the creator Lord Brahma, who was born from the golden egg which shelters all worlds.",
    meanings: [
      { word: "अण्डम्", iast: "aṇḍam", meaning_en: "cosmic egg", meaning_hi: "ब्रह्माण्ड / अंडा" }
    ],
    commentary: "Famous for containing the Lalita Trishati and Lalita Sahasranama stotras of the Mother Goddess."
  },

  // EPICS
  {
    slug: "ramayana",
    categorySlug: "epics",
    titleSanskrit: "वाल्मीकि रामायण",
    titleHindi: "रामायण",
    titleEnglish: "Valmiki Ramayana",
    description: "The historical epic charting the life, principles, and battles of Lord Rama, the ideal avatar.",
    totalChapters: 7,
    totalVerses: 24000,
    coverImage: "/images/covers/ramayana.jpg",
    authorRishi: "Sage Valmiki",
    periodEra: "Treta Yuga",
    verseSanskrit: "तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम्। नारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम्॥ १.१.१॥",
    verseTrans: "tapaḥsvādhyāyanirataṁ tapasvī vāgvidāṁ varam | nāradaṁ paripapraccha vālmīkirmunipuṅgavam || 1.1.1 ||",
    verseHindi: "तपस्या और स्वाध्याय में निरत, वाणी बोलने वालों में श्रेष्ठ मुनिपुङ्गव नारद जी से तपस्वी वाल्मीकि जी ने प्रश्न किया।",
    verseEnglish: "Ascetic Valmiki inquired of Sage Narada, who is preeminent among the speakers and always absorbed in penance.",
    meanings: [
      { word: "तपस्वी", iast: "tapasvī", meaning_en: "ascetic / practitioner of penance", meaning_hi: "तपस्वी" }
    ],
    commentary: "The epic opens with Valmiki asking Narada if there is any perfect human on earth possessing all virtues."
  },
  {
    slug: "mahabharata",
    categorySlug: "epics",
    titleSanskrit: "महाभारतम्",
    titleHindi: "महाभारत",
    titleEnglish: "Mahabharata",
    description: "The longest epic poem ever composed, tracking the complex web of dharma, duty, and war.",
    totalChapters: 18,
    totalVerses: 100000,
    coverImage: "/images/covers/mahabharata.jpg",
    authorRishi: "Veda Vyasa",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "नारायणं नमस्कृत्य नरं चैव नरोत्तमम्। देवीं सरस्वतीं व्यासं ततो जयमुदीरयेत्॥ १.१॥",
    verseTrans: "nārāyaṇaṁ namaskṛtya naraṁ caiva narottamama | devīṁ sarasvatīṁ vyāsaṁ tato jayamudīrayet || 1.1 ||",
    verseHindi: "नारायण, सर्वश्रेष्ठ मनुष्य नर, सरस्वती देवी और महर्षि व्यास को नमस्कार कर इस 'जय' ग्रन्थ का पाठ करना चाहिए।",
    verseEnglish: "Salutations to Narayana, to Nara the finest of men, to Goddess Saraswati and Vyasa, before singing this epic of victory.",
    meanings: [
      { word: "जयम्", iast: "jayam", meaning_en: "victory / history book", meaning_hi: "विजय ग्रन्थ" }
    ],
    commentary: "The traditional opening invocation common to all major cosmic histories compiled by Vyasa."
  },
  {
    slug: "ramcharitmanas",
    categorySlug: "epics",
    titleSanskrit: "रामचरितमानस",
    titleHindi: "रामचरितमानस",
    titleEnglish: "Ramcharitmanas",
    description: "The devotional retelling of Rama's story in Awadhi dialect by Saint-poet Tulsidas.",
    totalChapters: 7,
    totalVerses: 12800,
    coverImage: "/images/covers/manas.jpg",
    authorRishi: "Goswami Tulsidas",
    periodEra: "Kali Yuga",
    verseSanskrit: "वर्णानामर्थसंघानां रसानां छन्दसामपि। मङ्गलानां च कर्तारौ वन्दे वाणीविनायकौ॥ १.१॥",
    verseTrans: "varṇānāmarthasaṅghānāṁ rasānāṁ chandasāmapi | maṅgalānāṁ ca kartārau vande vāṇīvināyakau || 1.1 ||",
    verseHindi: "अक्षरों, उनके अर्थ-समूहों, रसों, छंदों और मंगलों को करने वाले सरस्वती जी और गणेश जी की मैं वन्दना करता हूँ।",
    verseEnglish: "I worship Goddess Saraswati (speech) and Ganesha (wisdom), the originators of letters, meanings, sentiments, and all blessings.",
    meanings: [
      { word: "वाणीविनायकौ", iast: "vāṇīvināyakau", meaning_en: "Goddess Saraswati and Lord Ganesha", meaning_hi: "सरस्वती और गणेश जी" }
    ],
    commentary: "A beautiful invocation of speech and intellect before embarking on the description of Rama's character."
  },

  // PHILOSOPHY SUTRAS
  {
    slug: "yoga-sutras",
    categorySlug: "philosophy",
    titleSanskrit: "पातञ्जलयोगसूत्राणि",
    titleHindi: "पातञ्जल योग सूत्र",
    titleEnglish: "Yoga Sutras",
    description: "Sage Patanjali's aphorisms on the 8-limbed path of yoga, mind control, and deep samadhi.",
    totalChapters: 4,
    totalVerses: 196,
    coverImage: "/images/covers/yoga.jpg",
    authorRishi: "Sage Patanjali",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "अथ योगानुशासनम्॥ १.१॥",
    verseTrans: "atha yogānuśāsanam || 1.1 ||",
    verseHindi: "अब योग का अनुशासन (अधिकारपूर्वक निरूपण) प्रारंभ किया जाता है।",
    verseEnglish: "Now, the exposition and discipline of Yoga is introduced.",
    meanings: [
      { word: "अथ", iast: "atha", meaning_en: "now / auspicious beginning", meaning_hi: "अब" },
      { word: "अनुशासनम्", iast: "anuśāsanam", meaning_en: "exposition / discipline", meaning_hi: "अनुशासन" }
    ],
    commentary: "Patanjali opens with 'Atha', marking that the disciple is now ready for deep psychological discipline."
  },
  {
    slug: "brahma-sutras",
    categorySlug: "philosophy",
    titleSanskrit: "ब्रह्मसूत्राणि",
    titleHindi: "ब्रह्म सूत्र",
    titleEnglish: "Brahma Sutras",
    description: "Badarayana's foundational text systematizing the teachings of the Upanishads.",
    totalChapters: 4,
    totalVerses: 555,
    coverImage: "/images/covers/brahma-s.jpg",
    authorRishi: "Sage Badarayana (Vyasa)",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "अथातो ब्रह्मजिज्ञासा॥ १.१.१॥",
    verseTrans: "athāto brahmajijñāsā || 1.1.1 ||",
    verseHindi: "अतः अब ब्रह्म की जिज्ञासा (जानने की इच्छा) की जाती है।",
    verseEnglish: "Therefore, now, arises the enquiry into Brahman (the Absolute reality).",
    meanings: [
      { word: "ब्रह्मजिज्ञासा", iast: "brahmajijñāsā", meaning_en: "enquiry into Brahman", meaning_hi: "ब्रह्म की जिज्ञासा" }
    ],
    commentary: "The starting point of Uttara Mimamsa, declaring that intellectual and moral prep leads to the inquiry of truth."
  },
  {
    slug: "nyaya-sutras",
    categorySlug: "philosophy",
    titleSanskrit: "न्यायसूत्राणि",
    titleHindi: "न्याय सूत्र",
    titleEnglish: "Nyaya Sutras",
    description: "Sage Gautama's work on logic, methods of reasoning, and philosophical debate structures.",
    totalChapters: 5,
    totalVerses: 528,
    coverImage: "/images/covers/nyaya.jpg",
    authorRishi: "Sage Gautama",
    periodEra: "Treta Yuga",
    verseSanskrit: "प्रमाणप्रमेयसंशयप्रयोजनदृष्टान्तसिद्धान्तावयवतर्कनिर्णयवादजल्पवितण्डाहेत्वाभासच्छलजातिनिग्रहस्थानानां तत्त्वज्ञानात् निःश्रेयसाधिगमः॥ १.१.१॥",
    verseTrans: "pramāṇaprameya-saṁśaya-prayojana-dṛṣṭānta-siddhāntāvayava-tarka-nirṇaya-vāda-jalpa-vitaṇḍā-hetvābhāsa-chala-jāti-nigrahasthānānāṁ tattvajñānāt niḥśreyasādhigamaḥ || 1.1.1 ||",
    verseHindi: "प्रमाण, प्रमेय, संशय आदि १६ विषयों के तत्त्वज्ञान से परम मोक्ष (निःश्रेयस) की प्राप्ति होती है।",
    verseEnglish: "By obtaining the true knowledge of the sixteen categories—proof, object of proof, doubt, motive, etc.—one attains liberation.",
    meanings: [
      { word: "तत्त्वज्ञानात्", iast: "tattvajñānāt", meaning_en: "by the knowledge of reality", meaning_hi: "तत्त्वज्ञान से" }
    ],
    commentary: "Outlines the logical epistemological framework of Nyaya philosophy, aiming for moksha through correct logic."
  },
  {
    slug: "samkhya-karika",
    categorySlug: "philosophy",
    titleSanskrit: "सांख्यकारिका",
    titleHindi: "सांख्य कारिका",
    titleEnglish: "Samkhya Karika",
    description: "Ishvara Krishna's dualistic philosophy dividing reality into Purusha (spirit) and Prakriti (matter).",
    totalChapters: 1,
    totalVerses: 72,
    coverImage: "/images/covers/samkhya.jpg",
    authorRishi: "Sage Kapila / Ishvara Krishna",
    periodEra: "Satya Yuga",
    verseSanskrit: "दुःखत्रयाभिघाताज्जिज्ञासा तदपघातके हेतौ। दृष्टे सा पार्था चेन्नैकान्तात्यन्ततोऽभावात्॥ १॥",
    verseTrans: "duḥkhatrayābhighātājjijñāsā tadapaghātake hetau | dṛṣṭe sā pārthā cennaikāntātyantato'bhāvāt || 1 ||",
    verseHindi: "तीन प्रकार के दुखों के आघात से छुटकारा पाने के उपायों की जिज्ञासा होती है। यद्यपि प्रत्यक्ष उपाय हैं, फिर भी वे पूर्ण रूप से दुख दूर नहीं कर पाते।",
    verseEnglish: "From the torment of the threefold suffering (Adhyatmika, Adhibhautika, Adhidaivika) arises the inquiry into the means of their removal.",
    meanings: [
      { word: "दुःखत्रय", iast: "duḥkhatraya", meaning_en: "threefold suffering", meaning_hi: "तीन प्रकार के दुख" }
    ],
    commentary: "Samkhya maps out the physical and mental elements of Prakriti to help Purusha realize its separate independence."
  },
  {
    slug: "vaisheshika-sutras",
    categorySlug: "philosophy",
    titleSanskrit: "वैशेषिकसूत्राणि",
    titleHindi: "वैशेषिक सूत्र",
    titleEnglish: "Vaisheshika Sutras",
    description: "Sage Kanada's natural philosophy outlining the atomic structure of the universe (Anu).",
    totalChapters: 10,
    totalVerses: 370,
    coverImage: "/images/covers/vaisheshika.jpg",
    authorRishi: "Sage Kanada",
    periodEra: "Treta Yuga",
    verseSanskrit: "अथातो धर्मं व्याख्यास्यामः॥ १.१.१॥",
    verseTrans: "athāto dharmaṁ vyākhyāsyāmaḥ || 1.1.1 ||",
    verseHindi: "अतः अब हम धर्म की व्याख्या करेंगे।",
    verseEnglish: "Therefore, now, we shall explain Dharma.",
    meanings: [
      { word: "धर्मम्", iast: "dharmam", meaning_en: "duty / cosmic order", meaning_hi: "धर्म को" }
    ],
    commentary: "Vaisheshika defines Dharma not as belief, but as that which leads to material prosperity and spiritual liberation."
  },
  {
    slug: "mimamsa-sutras",
    categorySlug: "philosophy",
    titleSanskrit: "मीमांसासूत्राणि",
    titleHindi: "मीमांसा सूत्र",
    titleEnglish: "Mimamsa Sutras",
    description: "Sage Jaimini's framework for interpreting Vedic actions and sacrificial duties.",
    totalChapters: 12,
    totalVerses: 2700,
    coverImage: "/images/covers/mimamsa.jpg",
    authorRishi: "Sage Jaimini",
    periodEra: "Treta Yuga",
    verseSanskrit: "अथातो धर्मजिज्ञासा॥ १.१.१॥",
    verseTrans: "athāto dharma-jijñāsā || 1.1.1 ||",
    verseHindi: "अतः अब धर्म की जिज्ञासा की जाती है।",
    verseEnglish: "Therefore, now, arises the inquiry into Dharma (Vedic ritual duty).",
    meanings: [
      { word: "धर्मजिज्ञासा", iast: "dharma-jijñāsā", meaning_en: "inquiry into duty", meaning_hi: "धर्म की जिज्ञासा" }
    ],
    commentary: "Focuses on the ritualistic commands (Vidhis) of the Vedas as the sole source of righteous life."
  },

  // OTHERS
  {
    slug: "manusmriti",
    categorySlug: "others",
    titleSanskrit: "मनुस्मृतिः",
    titleHindi: "मनुस्मृति",
    titleEnglish: "Manusmriti",
    description: "An ancient legal code and framework mapping out traditional duties of society.",
    totalChapters: 12,
    totalVerses: 2684,
    coverImage: "/images/covers/manu.jpg",
    authorRishi: "Manu",
    periodEra: "Satya Yuga",
    verseSanskrit: "मनुमेकाग्रमासीनमभिगम्य महर्षयः। प्रतिपूज्य यथान्यायं सुखमासीनमब्रुवन्॥ १.१॥",
    verseTrans: "manumekāgramāsīnamabhigamya maharṣayaḥ | pratipūjya yathānyāyaṁ sukhamāsīnamabruvan || 1.1 ||",
    verseHindi: "एकाग्रचित्त बैठे हुए स्वायम्भुव मनु के पास जाकर महर्षियों ने उनका आदर-सत्कार कर यह बात कही।",
    verseEnglish: "Having approached Manu who sat absorbed in meditation, the great sages greeted him with respect and spoke.",
    meanings: [
      { word: "महर्षयः", iast: "maharṣayaḥ", meaning_en: "great sages", meaning_hi: "महर्षिगण" }
    ],
    commentary: "A legislative framework designed for social duties in different historical epochs of Hindu society."
  },
  {
    slug: "arthashastra",
    categorySlug: "others",
    titleSanskrit: "अर्थशास्त्रम्",
    titleHindi: "अर्थशास्त्र",
    titleEnglish: "Arthashastra",
    description: "Chanakya's masterpiece on statecraft, political economy, and military strategy.",
    totalChapters: 15,
    totalVerses: 6000,
    coverImage: "/images/covers/artha.jpg",
    authorRishi: "Acharya Chanakya",
    periodEra: "Maurya Era",
    verseSanskrit: "पृथिव्या लाभे पालने च यावन्त्यर्थशास्त्राणि पूर्वाचार्यैः प्रस्थापितानि प्रायशस्तानि संहृत्यैकमिदमर्थशास्त्रं कृतम्॥ १.१॥",
    verseTrans: "pṛthivyā lābhe pālane ca yāvantyarthaśāstrāṇi pūrvācāryaiḥ prasthāpitāni prāyaśastāni saṁhṛtyaikamidamarthaśāstraṁ kṛtam || 1.1 ||",
    verseHindi: "पृथ्वी की प्राप्ति और उसके पालन के लिए पूर्व आचार्यों ने जितने अर्थशास्त्र लिखे हैं, उनका संक्षेप कर यह ग्रंथ रचा गया।",
    verseEnglish: "This Arthashastra is made as a compendium of almost all the textbooks which, in view of acquisition and maintenance of earth, have been composed.",
    meanings: [
      { word: "पालने", iast: "pālane", meaning_en: "in maintaining / protecting", meaning_hi: "पालन में" }
    ],
    commentary: "An absolute masterclass in realism, foreign policy (Mandala theory), administration, and espionage."
  },
  {
    slug: "charaka-samhita",
    categorySlug: "others",
    titleSanskrit: "चरकसंहिता",
    titleHindi: "चरक संहिता",
    titleEnglish: "Charaka Samhita",
    description: "The core foundational medical scripture of Ayurveda detailing body wellness, pathology, and herbs.",
    totalChapters: 8,
    totalVerses: 9200,
    coverImage: "/images/covers/charaka.jpg",
    authorRishi: "Sage Charaka",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "अथातो दीर्घञ्जीवितीयमध्यायं व्याख्यास्यामः इति ह स्माह भगवानात्रेयः॥ १.१॥",
    verseTrans: "athāto dīrghañjīvitīyamadhyāyaṁ vyākhyāsyāmaḥ iti ha smāha bhagavānātreyaḥ || 1.1 ||",
    verseHindi: "अतः अब हम दीर्घ जीवन से संबंधित अध्याय की व्याख्या करेंगे, जैसा कि भगवान आत्रेय ने उपदेश दिया।",
    verseEnglish: "Now we shall explain the chapter on longevity of life, as was spoken by Lord Atreya.",
    meanings: [
      { word: "दीर्घञ्जीवितीयम्", iast: "dīrghañjīvitīyam", meaning_en: "longevity of life", meaning_hi: "दीर्घ जीवन से संबंधित" }
    ],
    commentary: "Ayurveda defines health as a harmony of body humors (Doshas), sensory functions, and mental clarity."
  },
  {
    slug: "natya-shastra",
    categorySlug: "others",
    titleSanskrit: "नाट्यशास्त्रम्",
    titleHindi: "नाट्यशास्त्र",
    titleEnglish: "Natya Shastra",
    description: "Sage Bharata's encyclopedic guide to performing arts, dance, theatre, music, and emotional theory.",
    totalChapters: 36,
    totalVerses: 6000,
    coverImage: "/images/covers/natya-s.jpg",
    authorRishi: "Sage Bharata",
    periodEra: "Treta Yuga",
    verseSanskrit: "प्रणम्य शिरसा देवौ पितामहमाहेश्वरौ। नाट्यशास्त्रं प्रवक्ष्यामि ब्रह्मणा यदुदाहृतम्॥ १.१॥",
    verseTrans: "praṇamya śirasā devau pitāmahamāheśvarau | nātyaśāstraṁ pravakṣyāmi brahmaṇā yadudāhṛtam || 1.1 ||",
    verseHindi: "पितामह (ब्रह्मा) और महेश्वर (शिव) को सिर झुकाकर प्रणाम कर, मैं ब्रह्मा जी द्वारा कहे गए नाट्यशास्त्र का प्रवचन करता हूँ।",
    verseEnglish: "Bowing my head to Brahma (creator) and Shiva (lord of dance), I shall declare the Natya Shastra as was formulated by Brahma.",
    meanings: [
      { word: "प्रणम्य", iast: "praṇamya", meaning_en: "having bowed down", meaning_hi: "प्रणाम करके" }
    ],
    commentary: "Bharata introduces the concept of Rasas (aesthetic emotions) that govern human performing arts."
  },
  {
    slug: "kama-sutra",
    categorySlug: "others",
    titleSanskrit: "कामसूत्रम्",
    titleHindi: "कामसूत्र",
    titleEnglish: "Kama Sutra",
    description: "Vatsyayana's guide to human relationships, social manners, arts, and emotional lifestyle.",
    totalChapters: 36,
    totalVerses: 1250,
    coverImage: "/images/covers/kama.jpg",
    authorRishi: "Vatsyayana",
    periodEra: "Gupta Era",
    verseSanskrit: "धर्मार्थकामेभ्यो नमः॥ १.१॥",
    verseTrans: "dharmārthakāmebhyo namaḥ || 1.1 ||",
    verseHindi: "धर्म, अर्थ और काम (पुरुषार्थों) को नमस्कार है।",
    verseEnglish: "Salutations to Dharma (duty), Artha (wealth), and Kama (desire).",
    meanings: [
      { word: "काम", iast: "kāma", meaning_en: "aesthetic desire / love", meaning_hi: "कामना / काम" }
    ],
    commentary: "Vatsyayana opens by placing sexual and sensory appreciation in balance with duty and economics."
  },
  {
    slug: "pancharatra-agamas",
    categorySlug: "others",
    titleSanskrit: "पाञ्चरात्र",
    titleHindi: "पाञ्चरात्र आगम",
    titleEnglish: "Pancharatra Agamas",
    description: "Agamic texts outlining ritual worship systems, temple worship ceremonies, and devotion.",
    totalChapters: 108,
    totalVerses: 20000,
    coverImage: "/images/covers/pancha.jpg",
    authorRishi: "Sage Sandilya",
    periodEra: "Dvapara Yuga",
    verseSanskrit: "ॐ नमः परब्रह्मणे वासुदेवाय। पञ्चरात्रागमे दिव्ये परमो मोक्षसाधनः॥ १.१॥",
    verseTrans: "om namaḥ parabrahmaṇe vāsudevāya | pañcarātrāgame divye paramo mokṣasādhanaḥ || 1.1 ||",
    verseHindi: "ॐ परब्रह्म वासुदेव को नमस्कार है। इस दिव्य पंचरात्र आगम में मोक्ष प्राप्ति का उत्तम साधन कहा गया है।",
    verseEnglish: "Om, salutations to supreme Brahman Vasudeva. In this divine Pancharatra text, the ultimate path of liberation is shown.",
    meanings: [
      { word: "मोक्षसाधनः", iast: "mokṣasādhanaḥ", meaning_en: "means of liberation", meaning_hi: "मोक्ष का साधन" }
    ],
    commentary: "Formulates the worship protocols of deities, temple architecture, and worship processes in Vaishnavism."
  }
];

async function main() {
  console.log("Seeding Database with expanded layout...");

  // 1. Categories
  const categories = [
    { name: "Vedas", slug: "vedas", description: "The core foundational revelatory texts of Sanatan Dharma.", icon: "📕", displayOrder: 1 },
    { name: "Upanishads", slug: "upanishads", description: "Philosophical treatises on truth and the self.", icon: "📗", displayOrder: 2 },
    { name: "Puranas", slug: "puranas", description: "Enlightening records of history, cosmology, and devas.", icon: "📘", displayOrder: 3 },
    { name: "Epics", slug: "epics", description: "Great historical epics (Itihasa) outlining the path of Dharma.", icon: "📙", displayOrder: 4 },
    { name: "Philosophy", slug: "philosophy", description: "Aphoristic frameworks of philosophy, yoga, and grammar.", icon: "🧘", displayOrder: 5 },
    { name: "Others", slug: "others", description: "Additional auxiliary texts, codes of law, arts, and medical sciences.", icon: "📜", displayOrder: 6 }
  ];

  const categoryMap: Record<string, string> = {};

  for (const cat of categories) {
    const upserted = await prisma.scriptureCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat
    });
    categoryMap[cat.slug] = upserted.id;
  }
  console.log("Categories seeded.");

  // 2. Scripture: Bhagavad Gita (Featured)
  const gitaScripture = await prisma.scripture.upsert({
    where: { slug: "gita" },
    update: {},
    create: {
      categoryId: categoryMap["epics"],
      titleSanskrit: "भगवद्गीता",
      titleHindi: "श्रीमद्भगवद्गीता",
      titleEnglish: "Bhagavad Gita",
      slug: "gita",
      description: "A 700-verse Hindu scripture that is part of the epic Mahabharata, containing Krishna's discourse to Arjuna.",
      totalChapters: 18,
      totalVerses: 700,
      coverImage: "/images/gita-cover.jpg",
      authorRishi: "Veda Vyasa",
      periodEra: "Dvapara Yuga"
    }
  });
  console.log("Scripture: Bhagavad Gita seeded.");

  // 2b. Add other representative scriptures (Manually seeded ones)
  const rigvedaScripture = await prisma.scripture.upsert({
    where: { slug: "rigveda" },
    update: {},
    create: {
      categoryId: categoryMap["vedas"],
      titleSanskrit: "ऋग्वेद",
      titleHindi: "ऋग्वेद संहिता",
      titleEnglish: "Rigveda",
      slug: "rigveda",
      description: "The most ancient sacred text of Sanatan Dharma, containing hymns to cosmic deities and creation mysteries.",
      totalChapters: 10,
      totalVerses: 10552,
      coverImage: "/images/rigveda-cover.jpg",
      authorRishi: "Saptarishis",
      periodEra: "Satya Yuga"
    }
  });

  const ishaScripture = await prisma.scripture.upsert({
    where: { slug: "isha" },
    update: {},
    create: {
      categoryId: categoryMap["upanishads"],
      titleSanskrit: "ईशोपनिषद्",
      titleHindi: "ईशोपनिषद्",
      titleEnglish: "Isha Upanishad",
      slug: "isha",
      description: "The foundational text of Upanishadic non-dualism, exploring the unity of the self and the cosmos.",
      totalChapters: 1,
      totalVerses: 18,
      coverImage: "/images/isha-cover.jpg",
      authorRishi: "Yajnavalkya",
      periodEra: "Treta Yuga"
    }
  });

  const shivaPuranaScripture = await prisma.scripture.upsert({
    where: { slug: "shiva-purana" },
    update: {},
    create: {
      categoryId: categoryMap["puranas"],
      titleSanskrit: "शिवपुराण",
      titleHindi: "शिव पुराण",
      titleEnglish: "Shiva Purana",
      slug: "shiva-purana",
      description: "One of the 18 Mahapuranas, glorifying Lord Shiva, detailing the cosmic cycles, and manifestation of light.",
      totalChapters: 12,
      totalVerses: 24000,
      coverImage: "/images/shiva-cover.jpg",
      authorRishi: "Veda Vyasa",
      periodEra: "Dvapara Yuga"
    }
  });

  // 2c. Add chapters for manually seeded scriptures
  const rigvedaChap = await prisma.chapter.upsert({
    where: { scriptureId_chapterNumber: { scriptureId: rigvedaScripture.id, chapterNumber: 1 } },
    update: {},
    create: {
      scriptureId: rigvedaScripture.id,
      chapterNumber: 1,
      titleSanskrit: "प्रथममण्डलम्",
      titleHindi: "प्रथम मण्डल",
      titleEnglish: "Mandala 1",
      summary: "Contains the first hymns dedicated to Agni, the divine spark and cosmic priest.",
      totalVerses: 191
    }
  });

  const ishaChap = await prisma.chapter.upsert({
    where: { scriptureId_chapterNumber: { scriptureId: ishaScripture.id, chapterNumber: 1 } },
    update: {},
    create: {
      scriptureId: ishaScripture.id,
      chapterNumber: 1,
      titleSanskrit: "ईशावास्योपनिषद्",
      titleHindi: "ईशावास्य उपनिषद्",
      titleEnglish: "Isha Upanishad Complete",
      summary: "Detailed verses outlining action with detachment and identification of the Self with Brahman.",
      totalVerses: 18
    }
  });

  const shivaPuranaChap = await prisma.chapter.upsert({
    where: { scriptureId_chapterNumber: { scriptureId: shivaPuranaScripture.id, chapterNumber: 1 } },
    update: {},
    create: {
      scriptureId: shivaPuranaScripture.id,
      chapterNumber: 1,
      titleSanskrit: "विद्येश्वरसंहिता",
      titleHindi: "विद्येश्वर संहिता",
      titleEnglish: "Vidyesvara Samhita",
      summary: "First chapter glorifying Shiva's formless nature and the greatness of the Shiva Linga.",
      totalVerses: 25
    }
  });

  // 2d. Add verses for manually seeded scriptures
  await prisma.verse.upsert({
    where: { chapterId_verseNumber: { chapterId: rigvedaChap.id, verseNumber: "1" } },
    update: {},
    create: {
      chapterId: rigvedaChap.id,
      scriptureId: rigvedaScripture.id,
      verseNumber: "1",
      textSanskrit: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम्।\nहोतारं रत्नधातमम्॥ १.१.१॥",
      textTransliteration: "agnimīḷe purohitaṁ yajñasya devamṛtvijam |\nhotāraṁ ratnadhātamam || 1.1.1 ||",
      translationHindi: "यज्ञ के पुरोहित, दिव्य दीप्तिमान्, ऋत्विज्, होता और रत्नों को धारण करने वाले अग्निदेव की मैं स्तुति करता हूँ।",
      translationEnglish: "I laud Agni, the chosen Priest, God, minister of sacrifice, the hotar, provider of wealth.",
      wordMeanings: JSON.stringify([
        { word: "अग्निम्", iast: "agnim", meaning_en: "Agni (Fire)", meaning_hi: "अग्निदेव को" },
        { word: "ईळे", iast: "īḷe", meaning_en: "I praise / laud", meaning_hi: "मैं स्तुति करता हूँ" }
      ]),
      commentaries: JSON.stringify([
        { author: "Sayana", text_en: "Agni represents the primary cosmic mediator of energy through which all deities are invoked.", text_hi: "अग्नि वह चेतना है जो सभी देवताओं को बुलाती है।" }
      ]),
      references: JSON.stringify([{ source: "Rigveda", verse: "1.1.1", link: "#" }]),
      relatedConcepts: JSON.stringify(["Agni", "Yajna", "Veda"])
    }
  });

  await prisma.verse.upsert({
    where: { chapterId_verseNumber: { chapterId: ishaChap.id, verseNumber: "1" } },
    update: {},
    create: {
      chapterId: ishaChap.id,
      scriptureId: ishaScripture.id,
      verseNumber: "1",
      textSanskrit: "ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्॥ १॥",
      textTransliteration: "custom: om īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat |\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasyasvid dhanam || 1 ||",
      translationHindi: "इस संसार में जो कुछ भी गतिमान है, वह सब ईश्वर द्वारा व्याप्त है। अतः त्याग भाव से उपभोग करो, किसी और के धन का लोभ न करो।",
      translationEnglish: "All this, whatever moves in this moving world, is enveloped by God. Therefore, find your enjoyment in renunciation; do not covet what belongs to others.",
      wordMeanings: JSON.stringify([
        { word: "ईशा", iast: "īśā", meaning_en: "by the Lord", meaning_hi: "ईश्वर द्वारा" },
        { word: "वास्यम्", iast: "vāsyam", meaning_en: "to be enveloped", meaning_hi: "व्याप्त" }
      ]),
      commentaries: JSON.stringify([
        { author: "Adi Shankaracharya", text_en: "The universe must be viewed as identical with the supreme Self, leaving aside attachments to material desires.", text_hi: "संपूर्ण जगत को ब्रह्ममय देखना ही परम सत्य है।" }
      ]),
      references: JSON.stringify([{ source: "Isha Upanishad", verse: "1", link: "#" }]),
      relatedConcepts: JSON.stringify(["Brahman", "Renunciation", "Atman"])
    }
  });

  await prisma.verse.upsert({
    where: { chapterId_verseNumber: { chapterId: shivaPuranaChap.id, verseNumber: "1" } },
    update: {},
    create: {
      chapterId: shivaPuranaChap.id,
      scriptureId: shivaPuranaScripture.id,
      verseNumber: "1",
      textSanskrit: "नमः शिवाय शान्ताय कारणत्रयहेतवे।\nनिवेदयामि चात्मानं त्वं गतिः परमेश्वर॥",
      textTransliteration: "namaḥ śivāya śāntāya kāraṇatrayahetave |\nnivedayāmi cātmānaṁ tvaṁ gatiḥ parameśvara ||",
      translationHindi: "तीन कारणों के हेतु, शान्तस्वरूप भगवान् शिव को नमस्कार है। मैं अपने आप को समर्पित करता हूँ, आप ही मेरी परम गति हैं।",
      translationEnglish: "Salutations to Lord Shiva, the peaceful one, the cause of the threefold cosmic function. I surrender my self to Thee, who art my supreme refuge.",
      wordMeanings: JSON.stringify([
        { word: "नमः", iast: "namaḥ", meaning_en: "bow / salutation", meaning_hi: "नमस्कार" },
        { word: "शान्ताय", iast: "śāntāya", meaning_en: "to the peaceful", meaning_hi: "शान्तस्वरूप को" }
      ]),
      commentaries: JSON.stringify([
        { author: "Vyasa", text_en: "Shiva represents the ultimate stillness that lies behind the creation, preservation, and dissolution of the universe.", text_hi: "शिव ही आदि और अंत हैं।" }
      ]),
      references: JSON.stringify([{ source: "Shiva Purana", verse: "1.1", link: "#" }]),
      relatedConcepts: JSON.stringify(["Shiva", "Bhakti", "Moksha"])
    }
  });

  // 3. Chapters for Gita
  const chapterMap: Record<number, string> = {};
  for (const chap of GITA_CHAPTERS) {
    const upserted = await prisma.chapter.upsert({
      where: {
        scriptureId_chapterNumber: {
          scriptureId: gitaScripture.id,
          chapterNumber: chap.number
        }
      },
      update: {
        titleSanskrit: chap.titleSanskrit,
        titleHindi: chap.titleHindi,
        titleEnglish: chap.titleEnglish,
        summary: chap.summary,
        totalVerses: chap.totalVerses
      },
      create: {
        scriptureId: gitaScripture.id,
        chapterNumber: chap.number,
        titleSanskrit: chap.titleSanskrit,
        titleHindi: chap.titleHindi,
        titleEnglish: chap.titleEnglish,
        summary: chap.summary,
        totalVerses: chap.totalVerses
      }
    });
    chapterMap[chap.number] = upserted.id;
  }
  console.log("Chapters for Gita seeded.");

  // 4. Verses for Gita Chapter 1
  const ch1Id = chapterMap[1];
  for (const verse of GITA_VERSES_CH1) {
    const commentariesArray: unknown[] = [];
    if (verse.commentary) {
      const parsed = JSON.parse(verse.commentary) as unknown[];
      parsed.forEach((c) => commentariesArray.push(c));
    }
    
    await prisma.verse.upsert({
      where: {
        chapterId_verseNumber: {
          chapterId: ch1Id,
          verseNumber: verse.verseNumber
        }
      },
      update: {
        textSanskrit: verse.textSanskrit,
        textTransliteration: verse.textTransliteration,
        translationHindi: verse.translationHindi,
        translationEnglish: verse.translationEnglish,
        wordMeanings: verse.wordMeanings,
        commentaries: JSON.stringify(commentariesArray),
        references: JSON.stringify([{ source: "Mahabharata", verse: "Bhishma Parva 25.1", link: "#" }]),
        relatedConcepts: JSON.stringify(["Dharma", "Grief", "Duty"]),
      },
      create: {
        chapterId: ch1Id,
        scriptureId: gitaScripture.id,
        verseNumber: verse.verseNumber,
        textSanskrit: verse.textSanskrit,
        textTransliteration: verse.textTransliteration,
        translationHindi: verse.translationHindi,
        translationEnglish: verse.translationEnglish,
        wordMeanings: verse.wordMeanings,
        commentaries: JSON.stringify(commentariesArray),
        references: JSON.stringify([{ source: "Mahabharata", verse: "Bhishma Parva 25.1", link: "#" }]),
        relatedConcepts: JSON.stringify(["Dharma", "Grief", "Duty"]),
        audioUrl: `/audio/gita/01/${verse.verseNumber.padStart(3, "0")}.mp3`
      }
    });
  }
  console.log("Verses Chapter 1 seeded.");

  // 5. Verses for Gita Chapter 2
  const ch2Id = chapterMap[2];
  for (const verse of GITA_VERSES_CH2) {
    const commentariesArray: unknown[] = [];
    if (verse.commentary) {
      const parsed = JSON.parse(verse.commentary) as unknown[];
      parsed.forEach((c) => commentariesArray.push(c));
    }

    await prisma.verse.upsert({
      where: {
        chapterId_verseNumber: {
          chapterId: ch2Id,
          verseNumber: verse.verseNumber
        }
      },
      update: {
        textSanskrit: verse.textSanskrit,
        textTransliteration: verse.textTransliteration,
        translationHindi: verse.translationHindi,
        translationEnglish: verse.translationEnglish,
        wordMeanings: verse.wordMeanings,
        commentaries: JSON.stringify(commentariesArray),
        references: JSON.stringify([{ source: "Mahabharata", verse: "Bhishma Parva 26.1", link: "#" }]),
        relatedConcepts: JSON.stringify(["Atman", "Sankhya Yoga"]),
      },
      create: {
        chapterId: ch2Id,
        scriptureId: gitaScripture.id,
        verseNumber: verse.verseNumber,
        textSanskrit: verse.textSanskrit,
        textTransliteration: verse.textTransliteration,
        translationHindi: verse.translationHindi,
        translationEnglish: verse.translationEnglish,
        wordMeanings: verse.wordMeanings,
        commentaries: JSON.stringify(commentariesArray),
        references: JSON.stringify([{ source: "Mahabharata", verse: "Bhishma Parva 26.1", link: "#" }]),
        relatedConcepts: JSON.stringify(["Atman", "Sankhya Yoga"]),
        audioUrl: `/audio/gita/02/${verse.verseNumber.padStart(3, "0")}.mp3`
      }
    });
  }
  console.log("Verses Chapter 2 seeded.");

  // 2e. Loop and seed the remaining 47 scriptures
  console.log("Seeding remaining 47 scriptures...");
  for (const sc of OTHER_SCRIPTURES) {
    const scripture = await prisma.scripture.upsert({
      where: { slug: sc.slug },
      update: {},
      create: {
        categoryId: categoryMap[sc.categorySlug],
        titleSanskrit: sc.titleSanskrit,
        titleHindi: sc.titleHindi,
        titleEnglish: sc.titleEnglish,
        slug: sc.slug,
        description: sc.description,
        totalChapters: sc.totalChapters,
        totalVerses: sc.totalVerses,
        coverImage: sc.coverImage,
        authorRishi: sc.authorRishi,
        periodEra: sc.periodEra
      }
    });

    const chapter = await prisma.chapter.upsert({
      where: {
        scriptureId_chapterNumber: {
          scriptureId: scripture.id,
          chapterNumber: 1
        }
      },
      update: {},
      create: {
        scriptureId: scripture.id,
        chapterNumber: 1,
        titleSanskrit: "प्रथमोऽध्यायः",
        titleHindi: "प्रथम अध्याय",
        titleEnglish: "Chapter 1",
        summary: `The foundational opening chapter of ${sc.titleEnglish}.`,
        totalVerses: 1
      }
    });

    await prisma.verse.upsert({
      where: {
        chapterId_verseNumber: {
          chapterId: chapter.id,
          verseNumber: "1"
        }
      },
      update: {
        textSanskrit: sc.verseSanskrit,
        textTransliteration: sc.verseTrans,
        translationHindi: sc.verseHindi,
        translationEnglish: sc.verseEnglish,
        wordMeanings: JSON.stringify(sc.meanings),
        commentaries: JSON.stringify([{ author: sc.authorRishi || "Vyasa", text_en: sc.commentary, text_hi: "" }])
      },
      create: {
        chapterId: chapter.id,
        scriptureId: scripture.id,
        verseNumber: "1",
        textSanskrit: sc.verseSanskrit,
        textTransliteration: sc.verseTrans,
        translationHindi: sc.verseHindi,
        translationEnglish: sc.verseEnglish,
        wordMeanings: JSON.stringify(sc.meanings),
        commentaries: JSON.stringify([{ author: sc.authorRishi || "Vyasa", text_en: sc.commentary, text_hi: "" }]),
        references: JSON.stringify([{ source: sc.titleEnglish, verse: "1.1", link: "#" }]),
        relatedConcepts: JSON.stringify(["Knowledge", "Dharma", sc.titleEnglish])
      }
    });
  }
  console.log("Remaining 47 scriptures seeded successfully.");

  // 6. Seeding Knowledge Graph Nodes
  const nodes = [
    { name: "Shiva", nameSanskrit: "शिव", type: "DEITY", slug: "shiva", description: "The Destroyer of ego and regenerator of the cosmos.", metadata: JSON.stringify({ epithets: ["Mahadeva", "Neelakantha"], weapons: ["Trishula"] }) },
    { name: "Vishnu", nameSanskrit: "विष्णु", type: "DEITY", slug: "vishnu", description: "The Preserver and protector of cosmic order.", metadata: JSON.stringify({ epithets: ["Narayana", "Vasudeva"], weapons: ["Sudarshana Chakra"] }) },
    { name: "Brahma", nameSanskrit: "ब्रह्मा", type: "DEITY", slug: "brahma", description: "The Cosmic Creator of the material universe.", metadata: JSON.stringify({ epithets: ["Prajapati"], weapons: ["Kamandalu"] }) },
    { name: "Durga", nameSanskrit: "दुर्गा", type: "DEITY", slug: "durga", description: "The Divine Mother and warrior goddess.", metadata: JSON.stringify({ epithets: ["Shakti", "Amba"], weapons: ["Trishula", "Sword"] }) },
    { name: "Ganesha", nameSanskrit: "गणेश", type: "DEITY", slug: "ganesha", description: "The Lord of Beginnings and remover of obstacles.", metadata: JSON.stringify({ epithets: ["Ganapati", "Vighneshvara"], weapons: ["Axe"] }) },
    { name: "Saraswati", nameSanskrit: "सरस्वती", type: "DEITY", slug: "saraswati", description: "The Goddess of Knowledge, music, and arts.", metadata: JSON.stringify({ epithets: ["Sharada"], weapons: ["Veena"] }) },
    { name: "Lakshmi", nameSanskrit: "लक्ष्मी", type: "DEITY", slug: "lakshmi", description: "The Goddess of Wealth, abundance, and prosperity.", metadata: JSON.stringify({ epithets: ["Sri"], weapons: ["Lotus"] }) },
    { name: "Parvati", nameSanskrit: "पार्वती", type: "DEITY", slug: "parvati", description: "The Goddess of love, power, and devotion.", metadata: JSON.stringify({ epithets: ["Gauri", "Uma"], weapons: ["Lotus"] }) },
    { name: "Kartikeya", nameSanskrit: "कार्तिकेय", type: "DEITY", slug: "kartikeya", description: "The commander-in-chief of the devas.", metadata: JSON.stringify({ epithets: ["Murugan", "Skanda"], weapons: ["Vel"] }) },
    { name: "Hanuman", nameSanskrit: "हनुमान", type: "DEITY", slug: "hanuman", description: "The archetype of physical strength and supreme devotion.", metadata: JSON.stringify({ epithets: ["Bajrangbali", "Maruti"], weapons: ["Gada"] }) },
    { name: "Kali", nameSanskrit: "काली", type: "DEITY", slug: "kali", description: "The fierce goddess of time and cosmic change.", metadata: JSON.stringify({ epithets: ["Kalika"], weapons: ["Kharga"] }) },
    { name: "Rama", nameSanskrit: "राम", type: "DEITY", slug: "rama", description: "The Seventh Avatar of Vishnu, ideal righteous king.", metadata: JSON.stringify({ epithets: ["Maryada Purushottama"], weapons: ["Kodanda Bow"] }) },
    { name: "Krishna", nameSanskrit: "कृष्ण", type: "DEITY", slug: "krishna", description: "The eighth incarnation of Lord Vishnu who spoke the Bhagavad Gita.", metadata: JSON.stringify({ epithets: ["Yogeshvara", "Govinda"], weapons: ["Sudarshana Chakra"] }) },
    
    // Books & Concepts
    { name: "Bhagavad Gita", nameSanskrit: "भगवद्गीता", type: "BOOK", slug: "gita", description: "The sacred conversation between Lord Krishna and Arjuna.", metadata: JSON.stringify({ chapters: 18, verses: 700 }) },
    { name: "Mahabharata", nameSanskrit: "महाभारत", type: "BOOK", slug: "mahabharata", description: "The epic of the Bharata dynasty, compiled by Sage Vyasa.", metadata: JSON.stringify({ parvas: 18 }) },
    { name: "Valmiki Ramayana", nameSanskrit: "रामायण", type: "BOOK", slug: "ramayana", description: "The epic life of Lord Rama compiled by Sage Valmiki.", metadata: JSON.stringify({ kandas: 7 }) },
    { name: "Shiva Purana", nameSanskrit: "शिव पुराण", type: "BOOK", slug: "shiva-purana", description: "One of the 18 Puranas glorifying Shiva.", metadata: JSON.stringify({ chapters: 12 }) },
    { name: "Rigveda", nameSanskrit: "ऋग्वेद", type: "BOOK", slug: "rigveda", description: "The ancient compilation of hymns.", metadata: JSON.stringify({ mandalas: 10 }) },
    
    // Places & Sages
    { name: "Kurukshetra", nameSanskrit: "कुरुक्षेत्र", type: "PLACE", slug: "kurukshetra", description: "The holy battlefield where the Mahabharata war and discourse of Gita took place.", metadata: JSON.stringify({ state: "Haryana", country: "Bharat" }) },
    { name: "Ayodhya", nameSanskrit: "अयोध्या", type: "PLACE", slug: "ayodhya", description: "The birth city of Lord Rama.", metadata: JSON.stringify({ state: "Uttar Pradesh" }) },
    { name: "Kedarnath", nameSanskrit: "केदारनाथ", type: "PLACE", slug: "kedarnath", description: "The highest of the 12 Jyotirlinga temples in the Himalayas.", metadata: JSON.stringify({ state: "Uttarakhand" }) },
    { name: "Veda Vyasa", nameSanskrit: "वेदव्यास", type: "RISHI", slug: "vyasa", description: "The compiler of the Vedas, writer of the Mahabharata and Puranas.", metadata: JSON.stringify({ work: "Vedas compiling, Puranas, Mahabharata" }) },
    { name: "Valmiki", nameSanskrit: "वाल्मीकि", type: "RISHI", slug: "valmiki", description: "The Adi Kavi (first poet) who wrote the Ramayana.", metadata: JSON.stringify({ work: "Ramayana" }) },
    { name: "Dharma", nameSanskrit: "धर्म", type: "CONCEPT", slug: "dharma", description: "The cosmic law of righteousness, order, and duty.", metadata: JSON.stringify({ types: ["Sanatana Dharma", "Sva-dharma"] }) },
    { name: "Karma Yoga", nameSanskrit: "कर्मयोग", type: "CONCEPT", slug: "karma-yoga", description: "The spiritual path of selfless action without attachment to results.", metadata: JSON.stringify({ paths: ["Bhakti", "Jnana", "Karma"] }) }
  ];

  const nodeMap: Record<string, string> = {};
  for (const node of nodes) {
    const upserted = await prisma.graphNode.upsert({
      where: { slug: node.slug },
      update: node,
      create: node
    });
    nodeMap[node.slug] = upserted.id;
  }
  console.log("Knowledge Graph Nodes seeded.");

  // 7. Seeding Knowledge Graph Edges
  const edges = [
    { sourceId: nodeMap["krishna"], targetId: nodeMap["gita"], relationType: "SPOKE", weight: 1.0 },
    { sourceId: nodeMap["krishna"], targetId: nodeMap["mahabharata"], relationType: "PART_OF", weight: 1.0 },
    { sourceId: nodeMap["gita"], targetId: nodeMap["mahabharata"], relationType: "PART_OF", weight: 1.0 },
    { sourceId: nodeMap["gita"], targetId: nodeMap["kurukshetra"], relationType: "SPOKEN_AT", weight: 1.0 },
    { sourceId: nodeMap["gita"], targetId: nodeMap["dharma"], relationType: "TEACHES", weight: 1.0 },
    { sourceId: nodeMap["gita"], targetId: nodeMap["karma-yoga"], relationType: "TEACHES", weight: 1.0 },
    { sourceId: nodeMap["vyasa"], targetId: nodeMap["mahabharata"], relationType: "AUTHORED", weight: 1.0 },
    { sourceId: nodeMap["vyasa"], targetId: nodeMap["gita"], relationType: "AUTHORED", weight: 1.0 },
    { sourceId: nodeMap["vyasa"], targetId: nodeMap["shiva-purana"], relationType: "AUTHORED", weight: 1.0 },
    { sourceId: nodeMap["vyasa"], targetId: nodeMap["rigveda"], relationType: "COMPILED", weight: 1.0 },
    
    { sourceId: nodeMap["rama"], targetId: nodeMap["ramayana"], relationType: "DEPICTS", weight: 1.0 },
    { sourceId: nodeMap["rama"], targetId: nodeMap["ayodhya"], relationType: "RULED", weight: 1.0 },
    { sourceId: nodeMap["valmiki"], targetId: nodeMap["ramayana"], relationType: "AUTHORED", weight: 1.0 },
    { sourceId: nodeMap["shiva"], targetId: nodeMap["shiva-purana"], relationType: "DEPICTS", weight: 1.0 },
    { sourceId: nodeMap["shiva"], targetId: nodeMap["kedarnath"], relationType: "LOCATED_AT", weight: 1.0 },
    { sourceId: nodeMap["vishnu"], targetId: nodeMap["krishna"], relationType: "INCARNATED_AS", weight: 1.0 },
    { sourceId: nodeMap["vishnu"], targetId: nodeMap["rama"], relationType: "INCARNATED_AS", weight: 1.0 }
  ];

  for (const edge of edges) {
    await prisma.graphEdge.upsert({
      where: {
        sourceId_targetId_relationType: {
          sourceId: edge.sourceId,
          targetId: edge.targetId,
          relationType: edge.relationType
        }
      },
      update: edge,
      create: edge
    });
  }
  console.log("Knowledge Graph Edges seeded.");

  // 8. Seeding Sacred Places (Temple Atlas Expansion)
  const places = [
    {
      name: "Kedarnath Temple",
      nameSanskrit: "केदारनाथ मन्दिर",
      slug: "kedarnath",
      type: "JYOTIRLINGA",
      description: "One of the twelve sacred Jyotirlingas of Lord Shiva, located in the Garhwal Himalayan range in Uttarakhand, India.",
      latitude: 30.7352,
      longitude: 79.0669,
      state: "Uttarakhand",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "Highest of the 12 Jyotirlingas, established by the Pandavas.",
      images: JSON.stringify(["/images/temples/kedarnath.jpg"]),
      historicalEra: "Kurukshetra Era (post-Mahabharata)",
      architecture: "Katyuri style stone construction"
    },
    {
      name: "Somnath Temple",
      nameSanskrit: "सोमनाथ मन्दिर",
      slug: "somnath",
      type: "JYOTIRLINGA",
      description: "The first among the twelve Jyotirlinga shrines of Lord Shiva, located in Prabhas Patan in Gujarat, India.",
      latitude: 20.8880,
      longitude: 70.4012,
      state: "Gujarat",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "First Jyotirlinga, representing rebuild resilience through history.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Triveni Sangam Epoch",
      architecture: "Chaulukya (Solanki) style architecture"
    },
    {
      name: "Mallikarjuna Jyotirlinga",
      nameSanskrit: "मल्लिकार्जुन मन्दिर",
      slug: "mallikarjuna",
      type: "JYOTIRLINGA",
      description: "Located on Shri Sailam Mountain in Andhra Pradesh, Mallikarjuna is dedicated to both Shiva and Parvati (Uma-Maheshvara).",
      latitude: 16.0740,
      longitude: 78.8680,
      state: "Andhra Pradesh",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "Dual embodiment of Shiva (Mallika) and Parvati (Arjuna) on the banks of Krishna River.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Satavahana / Kakatiya Rebuilds",
      architecture: "Dravidian style fortified stone temples"
    },
    {
      name: "Mahakaleshwar Jyotirlinga",
      nameSanskrit: "महाकालेश्वर मन्दिर",
      slug: "mahakaleshwar",
      type: "JYOTIRLINGA",
      description: "Located in the ancient city of Ujjain, Madhya Pradesh, it features a unique south-facing Lingam (Dakshinabhumi).",
      latitude: 23.1827,
      longitude: 75.7682,
      state: "Madhya Pradesh",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "Swayambhu (self-manifested) and Dakshinamurti (south-facing) power center.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Pre-historic / Maratha Dynasty rebuild",
      architecture: "Bhumija and Chalukya architectural synthesis"
    },
    {
      name: "Omkareshwar Jyotirlinga",
      nameSanskrit: "ओंकारेश्वर मन्दिर",
      slug: "omkareshwar",
      type: "JYOTIRLINGA",
      description: "Situated on Mandhata island in the Narmada River, Madhya Pradesh, the island's shape resembles the OM symbol.",
      latitude: 22.2471,
      longitude: 76.1511,
      state: "Madhya Pradesh",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "Temple is situated on an island naturally shaped like the sacred syllable ॐ.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Vindhya Mountain myth epoch",
      architecture: "North Indian Nagara style stone carvings"
    },
    {
      name: "Bhimashankar Jyotirlinga",
      nameSanskrit: "भीमाशंकर मन्दिर",
      slug: "bhimashankar",
      type: "JYOTIRLINGA",
      description: "Located in the Sahyadri hills near Pune, Maharashtra, it is the source of the Bhima River.",
      latitude: 19.0720,
      longitude: 73.5350,
      state: "Maharashtra",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "Established where Shiva defeated the demon Bhima, protecting local ascetics.",
      images: JSON.stringify(["/images/temples/kedarnath.jpg"]),
      historicalEra: "13th Century / Peshwa rebuilds",
      architecture: "Nagara and Hemadpanthi style influence"
    },
    {
      name: "Kashi Vishwanath Temple",
      nameSanskrit: "काशी विश्वनाथ मन्दिर",
      slug: "kashi-vishwanath",
      type: "JYOTIRLINGA",
      description: "Located on the banks of the Ganges in Varanasi, Uttar Pradesh, it is the spiritual heart of Hinduism.",
      latitude: 25.3109,
      longitude: 83.0105,
      state: "Uttar Pradesh",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "Supreme spiritual power center; the city of liberation (Mokshadayini).",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Ancient Vedic Epoch / Ahilyabai Holkar rebuild 1780",
      architecture: "Gold-plated spires and intricate stone corridors"
    },
    {
      name: "Trimbakeshwar Jyotirlinga",
      nameSanskrit: "त्र्यम्बकेश्वर मन्दिर",
      slug: "trimbakeshwar",
      type: "JYOTIRLINGA",
      description: "Located near Nashik, Maharashtra, it features a three-headed lingam representing Brahma, Vishnu, and Shiva.",
      latitude: 19.9320,
      longitude: 73.5300,
      state: "Maharashtra",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "Three-headed Lingam representing the Hindu Trinity, source of Godavari river.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Peshwa Balaji Baji Rao era (1750s)",
      architecture: "Black stone Indo-Aryan Nagara design"
    },
    {
      name: "Vaidyanath Jyotirlinga",
      nameSanskrit: "वैद्यनाथ मन्दिर",
      slug: "vaidyanath",
      type: "JYOTIRLINGA",
      description: "Located in Deoghar, Jharkhand, it is revered as the place where Ravana worshipped Shiva to gain power.",
      latitude: 24.4920,
      longitude: 86.7000,
      state: "Jharkhand",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "The place where Ravana cut his ten heads to please Lord Shiva, who cured him.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Treta Yuga / East India historic build",
      architecture: "Simple pyramidal spire stone temples"
    },
    {
      name: "Nageshwar Jyotirlinga",
      nameSanskrit: "नागेश्वर मन्दिर",
      slug: "nageshwar",
      type: "JYOTIRLINGA",
      description: "Located near Dwarka, Gujarat, it is dedicated to Lord Shiva as the lord of serpents.",
      latitude: 22.4350,
      longitude: 69.0680,
      state: "Gujarat",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "Protector from all poisons and snake bite ailments.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Pre-historic Dwarka Epoch",
      architecture: "Modern stone complex with a giant 82-foot Shiva statue"
    },
    {
      name: "Rameshwaram",
      nameSanskrit: "रामेश्वरम मन्दिर",
      slug: "rameshwaram",
      type: "JYOTIRLINGA",
      description: "Located on Rameswaram Island in Tamil Nadu, this Jyotirlinga was established and worshiped by Lord Rama.",
      latitude: 9.2881,
      longitude: 79.3174,
      state: "Tamil Nadu",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "Established by Lord Rama to absolute clear sins of killing Ravana.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Ramayana Era / Pandya and Nayak rebuilds",
      architecture: "Largest temple corridors in the world with intricate pillar work"
    },
    {
      name: "Grishneshwar Jyotirlinga",
      nameSanskrit: "घृष्णेश्वर मन्दिर",
      slug: "grishneshwar",
      type: "JYOTIRLINGA",
      description: "Located in Verul near Ellora caves in Maharashtra, it is the final of the 12 Jyotirlingas.",
      latitude: 20.0260,
      longitude: 75.1680,
      state: "Maharashtra",
      country: "Bharat",
      mainDeity: "Shiva",
      significance: "Last of the 12 Jyotirlingas, represents ultimate restoration of life and devotion.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Rebuilt by Queen Ahilyabai Holkar in 18th Century",
      architecture: "Red basalt stone structure with detailed carvings"
    },
    {
      name: "Badrinath Temple",
      nameSanskrit: "बद्रीनाथ मन्दिर",
      slug: "badrinath",
      type: "CHAR_DHAM",
      description: "A sacred Hindu temple dedicated to Lord Vishnu, situated in the town of Badrinath in Uttarakhand, India.",
      latitude: 30.7448,
      longitude: 79.4912,
      state: "Uttarakhand",
      country: "Bharat",
      mainDeity: "Vishnu",
      significance: "One of the Char Dham pilgrimage sites, established by Adi Shankaracharya.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Ancient Vedic origin / Adi Shankara rebuild",
      architecture: "Wooden temple style with colorful facade"
    },
    {
      name: "Dwarkadhish Temple",
      nameSanskrit: "द्वारकाधीश मन्दिर",
      slug: "dwarkadhish",
      type: "CHAR_DHAM",
      description: "A historic temple dedicated to Lord Krishna, the King of Dwarka. Situated on the banks of Gomti River in Gujarat.",
      latitude: 22.2442,
      longitude: 68.9685,
      state: "Gujarat",
      country: "Bharat",
      mainDeity: "Lord Krishna",
      significance: "Western Char Dham temple, marking the ancient golden city of Dwarka built by Lord Krishna.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Dvapara Yuga Origin",
      architecture: "Chalukyan style sandstone structure"
    },
    {
      name: "Jagannath Puri Temple",
      nameSanskrit: "जगन्नाथ मन्दिर",
      slug: "jagannath-puri",
      type: "CHAR_DHAM",
      description: "The famous temple of Lord Jagannath, along with his siblings Balabhadra and Subhadra, located in coastal Odisha.",
      latitude: 19.8049,
      longitude: 85.8179,
      state: "Odisha",
      country: "Bharat",
      mainDeity: "Lord Jagannath",
      significance: "Eastern Char Dham temple, world-renowned for the annual Ratha Yatra and spiritual geometry.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "12th Century CE / Ganga Dynasty",
      architecture: "Kalinga style architecture with soaring Vimana"
    },
    {
      name: "Kamakhya Temple",
      nameSanskrit: "कामाख्या मन्दिर",
      slug: "kamakhya",
      type: "SHAKTI_PEETHA",
      description: "One of the oldest and most revered Shakti Peethas, celebrating the creative power of the Goddess on Nilachal Hill in Assam.",
      latitude: 26.1663,
      longitude: 91.7051,
      state: "Assam",
      country: "Bharat",
      mainDeity: "Goddess Kamakhya",
      significance: "Revered Shakti Peetha representing the creative power (womb) of the divine mother.",
      images: JSON.stringify(["/images/temples/kedarnath.jpg"]),
      historicalEra: "Ancient Mythic / Koch Dynasty rebuild",
      architecture: "Nilachal style hybrid temple structure"
    },
    {
      name: "Vaishno Devi Temple",
      nameSanskrit: "वैष्णो देवी मन्दिर",
      slug: "vaishno-devi",
      type: "SHAKTI_PEETHA",
      description: "A highly revered cave temple dedicated to the three Pindis of Maha Kali, Maha Lakshmi, and Maha Saraswati in Jammu & Kashmir.",
      latitude: 33.0301,
      longitude: 74.9490,
      state: "Jammu & Kashmir",
      country: "Bharat",
      mainDeity: "Devi Vaishnavi",
      significance: "Sacred natural cave shrine situated in the beautiful Trikuta Mountains.",
      images: JSON.stringify(["/images/temples/kedarnath.jpg"]),
      historicalEra: "Treta Yuga Origin",
      architecture: "Natural rock cave shrine with modern marble canopy"
    },
    {
      name: "Sri Ranganathaswamy",
      nameSanskrit: "श्रीरङ्गनाथस्वामी मन्दिर",
      slug: "ranganathaswamy",
      type: "DIVYA_DESAM",
      description: "A massive temple complex dedicated to Ranganatha (reclining Vishnu), situated in Srirangam, Tamil Nadu.",
      latitude: 10.8622,
      longitude: 78.6902,
      state: "Tamil Nadu",
      country: "Bharat",
      mainDeity: "Lord Vishnu (Ranganatha)",
      significance: "The largest active temple complex in the world and the first among the 108 Divya Desams.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Chola / Vijayanagara Era",
      architecture: "Grand Dravidian architecture with monumental Gopurams"
    },
    {
      name: "Tirumala Venkateswara",
      nameSanskrit: "तिरुपति वेङ्कटेश्वर मन्दिर",
      slug: "tirumala-venkateswara",
      type: "DIVYA_DESAM",
      description: "A world-famous temple dedicated to Lord Venkateswara (Balaji), located in the hill town of Tirumala in Andhra Pradesh.",
      latitude: 13.6833,
      longitude: 79.3500,
      state: "Andhra Pradesh",
      country: "Bharat",
      mainDeity: "Lord Venkateswara",
      significance: "One of the wealthiest and most visited pilgrimage destinations on Earth, dedicated to Lord Balaji.",
      images: JSON.stringify(["/images/temples/somnath.jpg"]),
      historicalEra: "Ancient Sangam Era / Vijayanagara upgrades",
      architecture: "Dravidian style with gold-plated Vimana Ananda Nilayam"
    }
  ];

  for (const place of places) {
    await prisma.sacredPlace.upsert({
      where: { slug: place.slug },
      update: place,
      create: place
    });
  }
  console.log("Sacred Places seeded.");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
