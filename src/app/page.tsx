"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Volume2, Share2, Copy, Check } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useSacredSound } from "@/lib/sacred-audio";
import { useLanguageStore } from "@/store/useLanguageStore";


interface Shloka {
  id: number;
  sanskrit: string;
  transliteration: string;
  hindi: string;
  english: string;
  source: string;
  sourceHindi: string;
}

const DAILY_SHLOKAS: Shloka[] = [
  {
    id: 1,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana\nmā karmaphalaheturbhūr mā te saṅgo'stvakarmaṇi",
    hindi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्म फल की इच्छा न करो और अकर्म में भी मत लगो।",
    english: "You have the right to perform your duty, but never to its fruits. Let not the fruits of action be your motive, nor let your attachment be to inaction.",
    source: "Bhagavad Gita 2.47",
    sourceHindi: "भगवद्गीता २.४७",
  },
  {
    id: 2,
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham",
    hindi: "हे अर्जुन! जब-जब धर्म की हानि और अधर्म का उत्थान होता है, तब-तब मैं स्वयं को साकार रूप में प्रकट करता हूँ।",
    english: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest Myself.",
    source: "Bhagavad Gita 4.7",
    sourceHindi: "भगवद्गीता ४.७",
  },
  {
    id: 3,
    sanskrit: "ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्॥",
    transliteration: "īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasyasvid dhanam",
    hindi: "इस ब्रह्माण्ड में जो कुछ भी जड़-चेतन है, वह सब ईश्वर द्वारा व्याप्त है। इसलिए इसे त्याग भाव से उपभोग करो, किसी और के धन का लोभ न करो।",
    english: "Everything animate or inanimate within the universe is controlled and owned by the Lord. One should therefore accept only those things necessary for oneself, and not covet other's wealth.",
    source: "Isha Upanishad 1",
    sourceHindi: "ईशोपनिषद् १",
  },
  {
    id: 4,
    sanskrit: "आ नो भद्राः क्रतवो यन्तु विश्वतोऽदब्धासो अपरीतास उद्भिदः।",
    transliteration: "ā no bhadrāḥ kratavo yantu viśvato'dabdhāso aparītāsa udbhidaḥ",
    hindi: "कल्याणकारी विचार सभी दिशाओं से हमारे पास आएं, जो किसी से दबे नहीं, बिना बाधा के आएं और विकास करने वाले हों।",
    english: "Let noble thoughts come to us from every side, unbiased, unhindered, and offering cosmic growth.",
    source: "Rigveda 1.89.1",
    sourceHindi: "ऋग्वेद १.८९.१",
  },
  {
    id: 5,
    sanskrit: "असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्माऽमृतं गमय॥",
    transliteration: "asato mā sadgamaya, tamaso mā jyotirgamaya, mṛtyormā'mṛtaṁ gamaya",
    hindi: "मुझे असत्य से सत्य की ओर ले चलो। मुझे अंधकार से प्रकाश की ओर ले चलो। मुझे मृत्यु से अमरता की ओर ले चलो।",
    english: "Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality.",
    source: "Brihadaranyaka Upanishad 1.3.28",
    sourceHindi: "बृहदारण्यकोपनिषद् १.३.२८",
  },
  {
    id: 6,
    sanskrit: "न जायते म्रियते वा कदाचि-न्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥",
    transliteration: "na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ\najo nityaḥ śāśvato'yaṁ purāṇo na hanyate hanyamāne śarīre",
    hindi: "यह आत्मा न कभी जन्म लेती है और न कभी मरती है; और न ही यह बार-बार उत्पन्न होती है। यह अजन्मा, नित्य, शाश्वत और पुरातन है, जो शरीर के मारे जाने पर भी नहीं मारी जाती।",
    english: "The soul is never born nor does it die at any time; and having once been, it never ceases to be. It is unborn, eternal, permanent, and primeval, not slain when the body is slain.",
    source: "Bhagavad Gita 2.20",
    sourceHindi: "भगवद्गीता २.२०",
  },
  {
    id: 7,
    sanskrit: "अयं निजः परो वेति गणना लघुचेतसाम्।\nउदारचरितानां तु वसुधैव कुटुम्बकम्॥",
    transliteration: "ayaṁ nijaḥ paro veti gaṇanā laghucetasām\nudāracaritānāṁ tu vasudhaiva kuṭumbakam",
    hindi: "यह मेरा है, यह पराया है, ऐसी सोच संकुचित मन वालों की होती है। उदार हृदय वाले लोगों के लिए तो संपूर्ण पृथ्वी ही एक परिवार है।",
    english: "This is mine and that is another's is the calculation of narrow-minded people. For the magnanimous, the entire Earth is indeed one family.",
    source: "Maha Upanishad 6.71",
    sourceHindi: "महोपनिषद् ६.७१",
  },
  {
    id: 8,
    sanskrit: "सङ्गच्छध्वं संवदध्वं सं वो मनांसि जानताम्।",
    transliteration: "saṅgacchadhvaṁ saṁvadadhvaṁ saṁ vo manāṁsi jānatām",
    hindi: "साथ चलो, प्रेम से मिलकर बात करो और अपने मनों को समान रूप से जानने वाले और एक संगठित शक्ति बनाओ।",
    english: "Walk together, speak in harmony, and let your minds be in complete alignment to understand the truth.",
    source: "Rigveda 10.191.2",
    sourceHindi: "ऋग्वेद १०.१९१.२",
  },
  {
    id: 9,
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामी मा शुचः॥",
    transliteration: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
    hindi: "सभी प्रकार के धर्मों का परित्याग कर केवल मेरी शरण में आओ। मैं तुम्हें समस्त पापों से मुक्त कर दूँगा, तुम शोक मत करो।",
    english: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    source: "Bhagavad Gita 18.66",
    sourceHindi: "भगवद्गीता १८.६६",
  },
  {
    id: 10,
    sanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥",
    transliteration: "tasmād asaktaḥ satataṁ kāryaṁ karma samācara\nasakto hy ācaran karma param āpnoti pūruṣaḥ",
    hindi: "इसलिए अनासक्त होकर हमेशा अपने कर्तव्य कर्मों का अच्छी तरह आचरण करो। अनासक्त भाव से कर्म करता हुआ मनुष्य परमात्मा को प्राप्त कर लेता है।",
    english: "Therefore, without attachment, constantly perform the action that is duty. By performing action without attachment, man reaches the Supreme.",
    source: "Bhagavad Gita 3.19",
    sourceHindi: "भगवद्गीता ३.१९",
  },
  {
    id: 11,
    sanskrit: "मातृदेवो भव। पितृदेवो भव। आचार्यदेवो भव। अतिथिदेवो भव॥",
    transliteration: "mātṛdevo bhava, pitṛdevo bhava, ācāryadevo bhava, atithidevo bhava",
    hindi: "अपनी माता को देवता के समान मानो। अपने पिता को देवता मानो। अपने गुरु को देवता मानो। अपने अतिथि को देवता मानो।",
    english: "Treat your mother as God, treat your father as God, treat your teacher as God, and treat your guest as God.",
    source: "Taittiriya Upanishad 1.11.1",
    sourceHindi: "तैत्तिरीयोपनिषद् १.११.१",
  },
  {
    id: 12,
    sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
    transliteration: "ananyāś cintayanto māṁ ye janāḥ paryupāsate\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham",
    hindi: "जो लोग अनन्य भाव से मेरा चिंतन करते हुए मेरी उपासना करते हैं, उन नित्य युक्त पुरुषों की आवश्यकताएं मैं स्वयं पूरी करता हूँ।",
    english: "But those who worship Me with undivided devotion, meditating on My transcendental form—to them I carry what they lack and preserve what they have.",
    source: "Bhagavad Gita 9.22",
    sourceHindi: "भगवद्गीता ९.२२",
  },
  {
    id: 13,
    sanskrit: "विद्या ददाति विनयं विनयाद् याति पात्रताम्।\nपात्रत्वात् धनमाप्नोति धनात् धर्मं ततः सुखम्॥",
    transliteration: "vidyā dadāti vinayaṁ vinayād yāti pātratām\npātratvāt dhanamāpnoti dhanāt dharmaṁ tataḥ sukham",
    hindi: "विद्या नम्रता प्रदान करती है, नम्रता से योग्यता आती है, योग्यता से धन प्राप्त होता है, धन से धर्म होता है और धर्म से सुख मिलता है।",
    english: "Knowledge gives humility, humility gives worthiness, worthiness brings wealth, wealth supports righteousness, and righteousness leads to ultimate happiness.",
    source: "Chanakya Niti",
    sourceHindi: "चाणक्य नीति",
  },
  {
    id: 14,
    sanskrit: "ममैवांशो जीवलोके जीवभूतः सनातनः।\nमनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति॥",
    transliteration: "mamaivāṁśo jīva-loke jīva-bhūtaḥ sanātanaḥ\nmanaḥ-ṣaṣṭhānīndriyāṇi prakṛti-sthāni karṣati",
    hindi: "इस संसार में जीवात्मा मेरा ही सनातन अंश है। वह प्रकृति में स्थित मन और पाँचों इन्द्रियों को आकर्षित करती है।",
    english: "The living entities in this conditioned world are My eternal fragmental parts. Due to conditioned life, they are struggling very hard with the six senses, which include the mind.",
    source: "Bhagavad Gita 15.7",
    sourceHindi: "भगवद्गीता १५.७",
  },
  {
    id: 15,
    sanskrit: "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः।",
    transliteration: "satyameva jayate nānṛtaṁ satyena panthā vitato devayānaḥ",
    hindi: "सत्य की ही जीत होती है, असत्य की नहीं। सत्य के द्वारा ही देवों की यात्रा का मार्ग प्रशस्त होता है।",
    english: "Truth alone triumphs, not untruth. By truth is laid out the divine path of the gods.",
    source: "Mundaka Upanishad 3.1.6",
    sourceHindi: "मुण्डकोपनिषद् ३.१.६",
  },
  {
    id: 16,
    sanskrit: "नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत्।",
    transliteration: "nāsadāsīn no sadāsīt tadānīṁ nāsīd rajo no vyomā paro yat",
    hindi: "सृष्टि से पहले न असत था और न सत, न वायु थी और न उसके पार आकाश था।",
    english: "Before the creation, there was neither non-existence nor existence. There was no realm of air, nor sky beyond it.",
    source: "Rigveda 10.129.1 (Nasadiya Sukta)",
    sourceHindi: "ऋग्वेद १०.१२९.१ (नासदीय सूक्त)",
  },
  {
    id: 17,
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
    hindi: "मनुष्य को अपने मन के द्वारा स्वयं का उद्धार करना चाहिए, स्वयं को अधोगति में नहीं डालना चाहिए। मन ही स्वयं का मित्र है और मन ही शत्रु है।",
    english: "One must deliver oneself with the help of one's own mind, and not degrade oneself. The mind is the friend of the conditioned soul, and the enemy as well.",
    source: "Bhagavad Gita 6.5",
    sourceHindi: "भगवद्गीता ६.५",
  },
  {
    id: 18,
    sanskrit: "यज्जाग्रतो दूरमुदैति दैवं तदु suptasya तथैवैति।\nदूरङ्गमं ज्योतिषां ज्योतिरेकं तन्मे मनः शिवसङ्कल्पमस्तु॥",
    transliteration: "yajjāgrato dūramudaiti daivaṁ tadu suptasya tathaivaiti\ndūraṅgamaṁ jyotiṣāṁ jyotirekaṁ tanme manaḥ śivasankalpamastu",
    hindi: "जागते हुए जो मन दूर-दूर तक चला जाता है और सोते हुए भी वापस लौट आता है, वह दिव्य प्रकाशों का प्रकाश मन कल्याणकारी संकल्पों वाला हो।",
    english: "May my mind, which travels far when awake and returns similarly in sleep, the light of lights, be filled with beautiful and auspicious resolves.",
    source: "Yajurveda (Shiva Sankalpa Sukta)",
    sourceHindi: "यजुर्वेद (शिवसंकल्प सूक्त)",
  },
  {
    id: 19,
    sanskrit: "यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा।\nतत्तदेवावगच्छ त्वं मम तेजोंऽशसम्भवम्॥",
    transliteration: "yad yad vibhūtimat sattvaṁ śrīmad ūrjitam eva vā\ntat tad evāvagaccha tvaṁ mama tejo-'ṁśa-sambhavam",
    hindi: "तुम जो भी ऐश्वर्यशाली, सौंदर्ययुक्त और बलशाली सृष्टि देखते हो, उसे मेरे ही तेज के एक अंश से उत्पन्न जानो।",
    english: "Know that all opulent, beautiful, and glorious creations spring from but a spark of My splendor.",
    source: "Bhagavad Gita 10.41",
    sourceHindi: "भगवद्गीता १०.४१",
  },
  {
    id: 20,
    sanskrit: "देहिणोऽस्मिन्यथा देहे कौमारं यौवनं जरा।\nतथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥",
    transliteration: "dehino 'smin yathā dehe kaumāraṁ yauvanaṁ jarā\ntathā dehāntara-prāptir dhīras tatra na muhyati",
    hindi: "जैसे देहधारी आत्मा के इस शरीर में बचपन, युवावस्था और वृद्धावस्था आती है, वैसे ही मृत्यु के बाद दूसरा शरीर प्राप्त होता है। ज्ञानी पुरुष इससे विचलित नहीं होते।",
    english: "As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change.",
    source: "Bhagavad Gita 2.13",
    sourceHindi: "भगवद्गीता २.१३",
  },
  {
    id: 21,
    sanskrit: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।\nन हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः॥",
    transliteration: "udyamena hi sidhyanti kāryāṇi na manorathaiḥ\nna hi suptasya siṁhasya praviśanti mukhe mṛgāḥ",
    hindi: "कार्य परिश्रम करने से ही सिद्ध होते हैं, केवल सोचने से नहीं। जैसे सोए हुए सिंह के मुंह में हिरण खुद प्रवेश नहीं करता।",
    english: "Tasks are accomplished through effort and action, not by mere desires. Deer do not enter the mouth of a sleeping lion on their own accord.",
    source: "Subhashita",
    sourceHindi: "सुभाषित",
  },
  {
    id: 22,
    sanskrit: "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत्।\nयत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम्॥",
    transliteration: "yat karoṣi yad aśnāsi yaj juhoṣi dadāsi yat\nyat tapasyasi kaunteya tat kuruṣva mad-arpaṇam",
    hindi: "हे कुंतीपुत्र! तुम जो कुछ भी करते हो, जो खाते हो, जो यज्ञ करते हो, दान देते हो और जो तपस्या करते हो, वह सब मुझे अर्पित कर दो।",
    english: "Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform, do that, O son of Kunti, as an offering unto Me.",
    source: "Bhagavad Gita 9.27",
    sourceHindi: "भगवद्गीता ९.२७",
  },
  {
    id: 23,
    sanskrit: "आलस्यस्य कुतो विद्या अविद्यस्य कुतो धनम्।\nअधनस्य कुतो मित्रममित्रस्य कुतः सुखम्॥",
    transliteration: "ālasyasya kuto vidyā avidyasya kuto dhanam\nadhanस्य kuto mitram amitrasya kutaḥ sukham",
    hindi: "आलसी को विद्या कहाँ, विद्याहीन को धन कहाँ, धनहीन को मित्र कहाँ और मित्रहीन को सुख कहाँ?",
    english: "Where is knowledge for the lazy, where is wealth for the ignorant, where are friends for the poor, and where is happiness for the friendless?",
    source: "Subhashita",
    sourceHindi: "सुभाषित",
  },
  {
    id: 24,
    sanskrit: "ईश्वरः सर्वभूतानां हृद्देशेऽर्जुन तिष्ठति।\nभ्रामयन्सर्वभूतानि यन्त्रारूढानि मायया॥",
    transliteration: "īśvaraḥ sarva-bhūtānāṁ hṛd-deśe 'rjuna tiṣṭhati\nbhrāmayan sarva-bhūtāni yantrārūḍhāni māyayā",
    hindi: "हे अर्जुन! ईश्वर सभी प्राणियों के हृदय में स्थित है और अपनी माया से सभी को शरीर रूपी यंत्र पर आरूढ़ करके घुमाता रहता है।",
    english: "The Supreme Lord dwells in the hearts of all living beings, O Arjuna. According to their karma, he directs their wanderings as if they were seated on a machine.",
    source: "Bhagavad Gita 18.61",
    sourceHindi: "भगवद्गीता १८.६१",
  },
  {
    id: 25,
    sanskrit: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत।",
    transliteration: "uttiṣṭhata jāgrata prāpya varānnibodhata",
    hindi: "उठो, जागो, और श्रेष्ठ महापुरुषों के पास जाकर ज्ञान को प्राप्त करो।",
    english: "Arise, awake, and stop not until you approach the wise and realize the ultimate goal of consciousness.",
    source: "Katha Upanishad 1.3.14",
    sourceHindi: "कठोपनिषद् १.३.१४",
  },
  {
    id: 26,
    sanskrit: "बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते।\nतस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥",
    transliteration: "buddhi-yukto jahātīha ubhe sukṛta-duṣkṛte\ntasmād yogāya yujyasva yogaḥ karmasu kauśalam",
    hindi: "समता बुद्धि युक्त पुरुष इसी जन्म में पाप और पुण्य दोनों को त्याग देता है। इसलिए योग में लग जाओ; कर्मों में कुशलता ही योग है।",
    english: "One who is engaged in devotional service rids oneself of both good and bad actions in this life. Therefore, strive for yoga, which is the art of all work.",
    source: "Bhagavad Gita 2.50",
    sourceHindi: "भगवद्गीता २.५०",
  },
  {
    id: 27,
    sanskrit: "अज्येष्ठासो अकनिष्ठासो एते सं भ्रातरो वावृधुः सौभगाय।",
    transliteration: "ajyeṣṭhāso akaniṣṭhāso ete saṁ bhrātaro vāvṛdhuḥ saubhagāya",
    hindi: "हममें से कोई भी न बड़ा है और न छोटा। हम सभी परस्पर भाई-भाई हैं जो समृद्धि के लिए मिलकर आगे बढ़ते हैं।",
    english: "None of us is superior, none is inferior. All are brothers who march together towards spiritual and material prosperity.",
    source: "Rigveda 5.60.5",
    sourceHindi: "ऋग्वेद ५.६०.५",
  },
  {
    id: 28,
    sanskrit: "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥",
    transliteration: "duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ\nvīta-rāga-bhaya-krodhaḥ sthita-dhīr munir ucyate",
    hindi: "जिसका मन दुखों में विचलित नहीं होता, सुखों की लालसा नहीं करता और जो राग, भय तथा क्रोध से सर्वथा मुक्त है, वह स्थिर बुद्धि वाला मुनि कहलाता है।",
    english: "One whose mind is undisturbed in adversity, who has no craving for pleasure, and who is free from attachment, fear, and anger, is called a sage of steady wisdom.",
    source: "Bhagavad Gita 2.56",
    sourceHindi: "भगवद्गीता २.५६",
  },
  {
    id: 29,
    sanskrit: "केयूराणि न भूषयन्ति पुरुषं हारा न चन्द्रोज्ज्वलाः\nन स्नानं न विलेपनं न कुसुमं नालङ्कृता मूर्धजाः।\nवाण्येका समलङ्करोति पुरुषं या संस्कृता धार्यते\nक्षीयन्ते खलु भूषणानि सततं वाग्भूषणं भूषणम्॥",
    transliteration: "keyūrāṇi na bhūṣayanti puruṣaṁ hārā na candrojjvalāḥ\nna snānaṁ na vilepanaṁ na kusumaṁ nālaṅkṛtā mūrdhajāḥ\nvāṇyekā samalaṅkaroti puruṣaṁ yā saṁskṛtā dhāryate\nkṣīyante khalu bhūṣaṇāni satataṁ vāgbhūṣaṇaṁ bhūṣaṇam",
    hindi: "मनुष्य को न बाजूबंद, न चन्द्रमा के समान चमकीले हार, न स्नान, न चन्दन का लेप, न फूल और न सजे हुए बाल सुशोभित करते हैं। केवल परिष्कृत संस्कारमयी वाणी ही मनुष्य को अलंकृत करती है। सभी आभूषण नष्ट हो जाते हैं, लेकिन वाणी रूपी आभूषण सदैव शाश्वत रहता है।",
    english: "Neither bracelets, nor moon-bright necklaces, nor baths, nor sandalwood pastes, nor flowers, nor styled hair adorn a person. Only refined speech adorns a human. All ornaments perish, but the ornament of pure speech remains forever.",
    source: "Bhartrihari Niti Shatakam",
    sourceHindi: "नीतिशतकम्",
  },
  {
    id: 30,
    sanskrit: "सम्राज्ञी श्वशुरे भव सम्राज्ञी श्वश्रवां भव।\nननान्दरि सम्राज्ञी भव सम्राज्ञी अधि देवृषु॥",
    transliteration: "samrājñī śvaśure bhava samrājñī śvaśruvāṁ bhava\nnanāndari samrājñī bhava samrājñī adhi devृṣu",
    hindi: "हे वधू! तुम ससुराल में श्वसुर की, सास की, ननद की और देवरों की सम्राज्ञी (आदरणीय गृहलक्ष्मी) बनो।",
    english: "O bride! Be a ruling queen (respected guide) to your father-in-law, mother-in-law, sister-in-law, and brothers-in-law in your new home.",
    source: "Rigveda 10.85.46",
    sourceHindi: "ऋग्वेद १०.८५.४६",
  }
];

const t = {
  EN: {
    heroTitle: "सनातन कथा",
    heroSubtitle: "The Eternal Story of the World's Oldest Civilization",
    exploreScriptures: "Explore Scriptures",
    readGita: "Read Gita",
    timeline: "Timeline",
    yearsHistory: "5000+ Years | 1 Billion+ Followers | 108+ Sacred Texts",
    searchPlaceholder: "Search scriptures, teachings, deities...",
    cosmicDawn: "Cosmic Dawn",
    creationTitle: "नासदासीन्नो सदासीत्तदानीम्",
    creationQuote: "Before existence, before non-existence — there was Brahman.",
    creationDesc: "From the cosmic sound of OM, space rippled into being. The universe, in its rawest potential, lay coiled in the eternal silence.",
    creationSource: "Source: Rigveda 10.129 — Nasadiya Sukta (The Creation Hymn)",
    vedasTitle: "ज्ञान का मूल — The Root of All Knowledge",
    vedasDesc: "The Vedas are the oldest surviving literature of humanity, representing direct revelations (Shruti) heard by ancient seers in deep states of meditation.",
    exploreVedasBtn: "Explore the 4 Vedas →",
    upanishadsTitle: "ब्रह्म सत्यम् जगत् मिथ्या",
    upanishadsDesc: "The Upanishads — 108 conversations between teacher and student. Written in forests over 3,000 years ago. An inquiry into consciousness, Atman, and Brahman.",
    exploreUpanishadsBtn: "Explore 108 Upanishads →",
    gitaTitle: "श्रीमद्भगवद्गीता",
    gitaQuote: "In the middle of Kurukshetra, in a moment of despair, the greatest philosophical dialogue in human history began.",
    readAllGitaBtn: "Read All 18 Chapters →",
    epicsTitle: "इतिहास — The Great Epics",
    epicsDesc: "Itihasa, literally meaning 'thus indeed it was,' chronicles the historical and spiritual journeys that shaped the ethos of Sanatan Dharma.",
    puranasTitle: "पुराण — Ancient Stories of Gods, Creation, and Dharma",
    puranasDesc: "The 18 Mahapuranas make the abstract truths of the Vedas accessible to all through histories, lineages of deities, and cosmic teachings.",
    deitiesTitle: "देवता — The Divine Faces of the Infinite",
    deitiesDesc: "Brahman is one, and seers name the divine expressions of the infinite reality in many forms. Discover their iconographies and mantras.",
    exploreDeitiesBtn: "Explore Full Encyclopaedia →",
    treeTitle: "धर्म वृक्ष — The Dharma Tree",
    treeDesc: "Presented as historical lineage with deep respect for all traditions. Sanatan Dharma is the root from which Eastern philosophies grew.",
    livingTitle: "सनातन जीवन — Living Dharma Today",
    livingDesc: "This is not archaeology. Sanatan Dharma is a living, breathing civilization influencing global health, science, and mindfulness.",
    downloadsTitle: "Every sacred text. Free. Forever.",
    downloadsDesc: "Readable online. Downloadable as PDF, ePub, and text formats. These scriptures belong to the whole of humanity.",
    downloadsBtn: "Download All Scriptures →",
    shlokaTitle: "आज का श्लोक — Verse of the Day",
    kaalChakraTitle: "काल चक्र — The Cosmic Wheel of Time",
    kaalChakraDesc: "Cosmic Hindu time cycles mapping the journey of consciousness through the Great Yuga cycles.",
    kaliYugaCounter: "Kali Yuga Live Counter",
    elapsedYears: "Years Elapsed",
    remainingYears: "Years Remaining",
    currentSamvat: "Vikram Samvat Era",
    cosmicAge: "Cosmic Age Status",
    completionRate: "Kali Yuga Progress",
    creationEra: "Srishti Samvat (Creation Age)",
    gregorianAnchor: "Gregorian Date",
  },
  HI: {
    heroTitle: "सनातन कथा",
    heroSubtitle: "विश्व की प्राचीनतम सभ्यता की शाश्वत कथा",
    exploreScriptures: "ग्रन्थ अन्वेषण",
    readGita: "गीता पठन",
    timeline: "इतिहास चक्र",
    yearsHistory: "५०००+ वर्ष | १ अरब+ अनुयायी | १०८+ पवित्र ग्रन्थ",
    searchPlaceholder: "ग्रन्थ, उपदेश, देवता खोजें...",
    cosmicDawn: "सृष्टि का आदि",
    creationTitle: "नासदासीन्नो सदासीत्तदानीम्",
    creationQuote: "सृष्टि से पहले न असत था और न सत — केवल परब्रह्म था।",
    creationDesc: "ॐ की ब्रह्मांडीय ध्वनि से, आकाश तरंगित हुआ और सृष्टि का उदय हुआ। संपूर्ण सृष्टि अनंत मौन में समाहित थी।",
    creationSource: "स्रोत: ऋग्वेद १०.१२९ — नासदीय सूक्त (सृष्टि सूक्त)",
    vedasTitle: "ज्ञान का मूल — समस्त ज्ञान का स्रोत",
    vedasDesc: "वेद मानवता के प्राचीनतम ग्रन्थ हैं, जो गहरे ध्यान में ऋषियों द्वारा प्राप्त प्रत्यक्ष अनुभूतियों (श्रुति) को दर्शाते हैं।",
    exploreVedasBtn: "४ वेदों का अन्वेषण करें →",
    upanishadsTitle: "ब्रह्म सत्यम् जगत् मिथ्या",
    upanishadsDesc: "उपनिषद — गुरु और शिष्य के बीच १०८ संवाद। वन के शांत वातावरण में रचे गए, आत्मा और ब्रह्म की खोज।",
    exploreUpanishadsBtn: "१०८ उपनिषदों का अन्वेषण करें →",
    gitaTitle: "श्रीमद्भगवद्गीता",
    gitaQuote: "कुरुक्षेत्र के युद्धक्षेत्र में, विषाद के क्षण में, मानव इतिहास का सबसे महान दार्शनिक संवाद आरम्भ हुआ।",
    readAllGitaBtn: "सभी १८ अध्याय पढ़ें →",
    epicsTitle: "इतिहास — महान महाकाव्य",
    epicsDesc: "इतिहास का शाब्दिक अर्थ है 'ऐसा ही हुआ था'। ये हमारे धर्म और संस्कृति को आकार देने वाली गाथाएं हैं।",
    puranasTitle: "पुराण — प्राचीन आख्यान और इतिहास",
    puranasDesc: "१८ महापुराण वेदों के गूढ़ सत्यों को कथाओं और वंशावलियों के माध्यम से सरल और सुलभ बनाते हैं।",
    deitiesTitle: "देवता — अनंत के विभिन्न स्वरूप",
    deitiesDesc: "परब्रह्म एक है, विद्वान उसे विभिन्न नामों से पुकारते हैं। प्रमुख देवों के मन्त्र और कथाएं यहाँ जानें।",
    exploreDeitiesBtn: "सम्पूर्ण ज्ञानकोष देखें →",
    treeTitle: "धर्म वृक्ष — सनातन की शाखाएं",
    treeDesc: "सभी परम्पराओं के प्रति पूर्ण आदर के साथ। सनातन धर्म वह मूल है जिससे पूर्वी दर्शन विकसित हुए।",
    livingTitle: "सनातन जीवन — आज का धर्म",
    livingDesc: "यह पुरातत्व नहीं है। सनातन धर्म एक जीवंत सभ्यता है जो वैश्विक स्वास्थ्य, विज्ञान और ध्यान को प्रेरित करती है।",
    downloadsTitle: "प्रत्येक पवित्र ग्रन्थ। सदैव निःशुल्क।",
    downloadsDesc: "ऑनलाइन पढ़ें या पीडीएफ और ईपब प्रारूप में डाउनलोड करें। यह ज्ञान पूरी मानवता की धरोहर है।",
    downloadsBtn: "सभी ग्रन्थ डाउनलोड करें →",
    shlokaTitle: "आज का श्लोक — दैनिक मन्त्र",
    kaalChakraTitle: "काल चक्र — शाश्वत ब्रह्मांडीय समय",
    kaalChakraDesc: "चेतना की यात्रा को युगांतर कालचक्र के माध्यम से दर्शाने वाला ब्रह्मांडीय हिंदू काल चक्र।",
    kaliYugaCounter: "कलियुग ब्रह्मांडीय गणना",
    elapsedYears: "व्यतीत वर्ष",
    remainingYears: "शेष वर्ष",
    currentSamvat: "विक्रम संवत काल",
    cosmicAge: "ब्रह्मांडीय युग अवस्था",
    completionRate: "कलियुग पूर्णता दर",
    creationEra: "सृष्टि संवत (सृष्टि काल)",
    gregorianAnchor: "ग्रेगोरियन दिनांक",
  },
  SA: {
    heroTitle: "सनातनकथा",
    heroSubtitle: "विश्वस्य पुरातनतमा संस्कृतिः शाश्वती कथा च",
    exploreScriptures: "ग्रन्थान्वेषणम्",
    readGita: "गीतापाठः",
    timeline: "कालचक्रम्",
    yearsHistory: "५०००+ वर्षाणि | १ कोटिः भक्ताः | १०८+ ग्रन्थाः",
    searchPlaceholder: "शास्त्रम्, मन्त्रम्, देवं अन्विष्यतु...",
    cosmicDawn: "सृष्ट्युत्पत्तिः",
    creationTitle: "नासदासीन्नो सदासीत्तदानीम्",
    creationQuote: "नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत्।",
    creationDesc: "ॐकारनादेन गगनस्य सृष्टिः अभवत्। आदौ सर्वं जगत् ब्रह्मणि लीनम् आसीत्।",
    creationSource: "मूलम्: ऋग्वेद १०.१२९ — नासदीय सूक्तम्",
    vedasTitle: "ज्ञानस्य मूलम् — वेदाः",
    vedasDesc: "वेदाः अपौरुषेयाः श्रुतिस्वरूपाः च, ये ऋषयः ध्यानावस्थायां साक्षात्कृतवन्तः।",
    exploreVedasBtn: "चतुर्वेदाः पठ्यन्ताम् →",
    upanishadsTitle: "ब्रह्म सत्यम् जगत् मिथ्या",
    upanishadsDesc: "उपनिषदः — गुरुशिष्ययोः अष्टोत्तरशतं (१०८) दिव्यसंवादाः। आत्मज्ञानस्य परमोपदेशाः।",
    exploreUpanishadsBtn: "अष्टोत्तरशतोपनिषदः →",
    gitaTitle: "श्रीमद्भगवद्गीता",
    gitaQuote: "कुरुक्षेत्रे युद्धमध्ये अर्जुनस्य विषादसमये भगवता कृष्णेन गीता उपदिष्टा।",
    readAllGitaBtn: "अष्टादशाध्यायाः पठ्यन्ताम् →",
    epicsTitle: "इतिहासः — रामायणं महाभारतं च",
    epicsDesc: "इतिहासः इत्युक्ते 'एवम् आसीत्'। रामायणं महाभारतं च सनातनधर्मस्य जीवनदर्शनम् सूचयतः।",
    puranasTitle: "पुराणानि — अष्टादश महापुराणानि",
    puranasDesc: "वेदानां गूढार्थाः पुराणकथाभिः सरलीकृताः। अष्टादशमहापुराणेषु सृष्टिविद्या वर्णिता।",
    deitiesTitle: "देवताः — ईश्वरस्य रूपाणि",
    deitiesDesc: "एकं सद्विप्रा बहुधा वदन्ति। दिव्यमन्त्राः ध्यानरूपाणि च अत्र अन्विष्यन्ताम्।",
    exploreDeitiesBtn: "ज्ञानकोषः दृश्यताम् →",
    treeTitle: "धर्मवृक्षः — सनातनपरम्परा",
    treeDesc: "सर्वमतानां आदरपूर्वकम्। सनातनधर्मः मूलस्वरूपः अस्ति यस्मात् दर्शनशाखाः उद्भूताः।",
    livingTitle: "सनातनजीवनम् — आचरणम्",
    livingDesc: "इयं न पुरातत्त्वविद्या। योगः, आयुर्वेदः, ध्यानं च अद्यापि विश्वकल्याणाय वर्तन्ते।",
    downloadsTitle: "सर्वं ज्ञानं निःशुल्कम्। सर्वकालम्।",
    downloadsDesc: "अन्तर्जालपुटे पठन्तु अथवा पीडीएफ्-ईपब्-प्रारूपे लभन्तु। इयं मानवतायाः सम्पत्तिः।",
    downloadsBtn: "ग्रन्थाः प्राप्यन्ताम् →",
    shlokaTitle: "अद्यतनः श्लोकः",
    kaalChakraTitle: "कालचक्रम् — शाश्वतः समयः",
    kaalChakraDesc: "युगचक्रमाध्यमेन चेतनायाः यात्रां प्रदर्शयन् ब्रह्माण्डीयः हिन्दू कालचक्रः।",
    kaliYugaCounter: "कलियुग ब्रह्माण्डीय गणना",
    elapsedYears: "व्यतीताः वर्षाणि",
    remainingYears: "अवाशिष्टाः वर्षाणि",
    currentSamvat: "विक्रमसंवत्सरः",
    cosmicAge: "ब्रह्माण्डीय युगस्थितिः",
    completionRate: "कलियुग पूर्णता प्रमापः",
    creationEra: "सृष्टिसंवत्सरः",
    gregorianAnchor: "ग्रेगोरियन दिनांकः",
  }
};

const ZODIACS: Record<string, Array<{ name: string; skt: string }>> = {
  EN: [
    { name: "Aries", skt: "मेष" },
    { name: "Taurus", skt: "वृषभ" },
    { name: "Gemini", skt: "मिथुन" },
    { name: "Cancer", skt: "कर्क" },
    { name: "Leo", skt: "सिंह" },
    { name: "Virgo", skt: "कन्या" },
    { name: "Libra", skt: "तुला" },
    { name: "Scorpio", skt: "वृश्चिक" },
    { name: "Sagittarius", skt: "धनु" },
    { name: "Capricorn", skt: "मकर" },
    { name: "Aquarius", skt: "कुंभ" },
    { name: "Pisces", skt: "मीन" }
  ],
  HI: [
    { name: "मेष", skt: "मेष" },
    { name: "वृषभ", skt: "वृषभ" },
    { name: "मिथुन", skt: "मिथुन" },
    { name: "कर्क", skt: "कर्क" },
    { name: "सिंह", skt: "सिंह" },
    { name: "कन्या", skt: "कन्या" },
    { name: "तुला", skt: "तुला" },
    { name: "वृश्चिक", skt: "वृश्चिक" },
    { name: "धनु", skt: "धनु" },
    { name: "मकर", skt: "मकर" },
    { name: "कुंभ", skt: "कुंभ" },
    { name: "मीन", skt: "मीन" }
  ],
  SA: [
    { name: "मेषः", skt: "मेषः" },
    { name: "वृषभः", skt: "वृषभः" },
    { name: "मिथुनम्", skt: "मिथुनम्" },
    { name: "कर्कः", skt: "कर्कः" },
    { name: "सिंहः", skt: "सिंहः" },
    { name: "कन्या", skt: "कन्या" },
    { name: "तुला", skt: "तुला" },
    { name: "वृश्चिकः", skt: "वृश्चिकः" },
    { name: "धनुः", skt: "धनुः" },
    { name: "मकरः", skt: "मकरः" },
    { name: "कुम्भः", skt: "कुम्भः" },
    { name: "मीनः", skt: "मीनः" }
  ]
};

const YUGAS: Record<string, string[]> = {
  EN: ["Satya Yuga", "Treta Yuga", "Dvapara Yuga", "Kali Yuga"],
  HI: ["सत्य युग", "त्रेता युग", "द्वापर युग", "कलि युग"],
  SA: ["सत्ययुगम्", "त्रेतायुगम्", "द्वापरयुगम्", "कलियुगम्"]
};

function getKaliYugaStats(date: Date) {
  const KALI_EPOCH_MS = -160070304000000;
  const MS_PER_YEAR = 31556925216;
  const msDiff = date.getTime() - KALI_EPOCH_MS;
  const elapsedYears = msDiff / MS_PER_YEAR;
  const remainingYears = 432000 - elapsedYears;
  const progressPercent = (elapsedYears / 432000) * 100;
  const GregorianYear = date.getFullYear();
  const vikramSamvat = GregorianYear + 57;
  const srishtiSamvat = 1955880000 + elapsedYears;
  return {
    elapsedYears,
    remainingYears,
    progressPercent,
    vikramSamvat,
    srishtiSamvat
  };
}

const round = (num: number) => Math.round(num * 10000) / 10000;

interface TreeNode {
  id: string;
  name: string;
  nameSanskrit: string;
  type: "root" | "branch" | "leaf";
  description: string;
  x: number;
  y: number;
  icon: string;
  image: string;
  quote?: string;
  quoteTranslation?: string;
}

const TREE_NODES: TreeNode[] = [
  {
    id: "sanatan",
    name: "Sanatan Dharma",
    nameSanskrit: "सनातन धर्म",
    type: "root",
    description: "The eternal, universal path of righteousness, truth, and cosmic duty. It forms the ultimate root system of all Vedic and dharmic paths.",
    x: 400,
    y: 60,
    icon: "🕉️",
    image: "/images/origins-dharma.png",
    quote: "सत्यं बृहदृतमुग्रं दीक्षा तपो ब्रह्म यज्ञः पृथिवीं धारयन्ति।",
    quoteTranslation: "Truth, eternal order, dedication, austerity, knowledge, and sacrifice uphold the earth."
  },
  {
    id: "shruti",
    name: "Shruti (Revelations)",
    nameSanskrit: "श्रुति",
    type: "branch",
    description: "That which is heard. Direct cosmic revelations perceived by seers in deep meditation. This includes the Vedas and Upanishads.",
    x: 200,
    y: 180,
    icon: "📕",
    image: "/images/maharishi-guru.png",
    quote: "एकं सद्विप्रा बहुधा वदन्ति।",
    quoteTranslation: "Truth is One, though the sages speak of it in many ways."
  },
  {
    id: "smriti",
    name: "Smriti (Traditions)",
    nameSanskrit: "स्मृति",
    type: "branch",
    description: "That which is remembered. Human expositions, historical epics, and traditional texts mapping codes of conduct. Includes Mahabharata, Ramayana, and Puranas.",
    x: 400,
    y: 180,
    icon: "📜",
    image: "/images/origins-dharma.png",
    quote: "धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः।",
    quoteTranslation: "Dharma destroyed destroys; Dharma protected protects."
  },
  {
    id: "darshana",
    name: "Darshana (Philosophy)",
    nameSanskrit: "दर्शन",
    type: "branch",
    description: "Philosophical insights and viewpoints. The six orthodox schools of Indian logic, metaphysics, and psychology, including Yoga and Vedanta.",
    x: 600,
    y: 180,
    icon: "🧘",
    image: "/images/upanishadic-wisdom.png",
    quote: "अथातो ब्रह्मजिज्ञासा।",
    quoteTranslation: "Now therefore, let us inquire into Brahman (the Absolute)."
  },
  {
    id: "vedas",
    name: "The 4 Vedas",
    nameSanskrit: "चत्वारो वेदाः",
    type: "leaf",
    description: "Rigveda, Samaveda, Yajurveda, and Atharvaveda. The foundational pillars of knowledge, rituals, hymns, and sciences.",
    x: 100,
    y: 320,
    icon: "🛕",
    image: "/images/vedic-revelation.png",
    quote: "सङ्गच्छध्वं संवदध्वं सं वो मनांसि जानताम्।",
    quoteTranslation: "Walk together, speak together, let your minds be in harmony."
  },
  {
    id: "upanishads",
    name: "108 Upanishads",
    nameSanskrit: "उपनिषद्",
    type: "leaf",
    description: "The spiritual and non-dual core (Vedanta) exploring the nature of Atman (self) and Brahman (absolute reality).",
    x: 230,
    y: 320,
    icon: "🌿",
    image: "/images/upanishadic-wisdom.png",
    quote: "असतो मा सद्गमय तमसो मा ज्योतिर्गमय।",
    quoteTranslation: "Lead me from the unreal to the real, lead me from darkness to light."
  },
  {
    id: "epics",
    name: "Itihasa (Epics)",
    nameSanskrit: "इतिहास",
    type: "leaf",
    description: "Ramayana and Mahabharata. Historical epics documenting the play of Dharma in family and statecraft.",
    x: 350,
    y: 320,
    icon: "🏹",
    image: "/images/ramayana-era.png",
    quote: "रामो विग्रहवान् धर्मः।",
    quoteTranslation: "Rama is the personification of righteousness."
  },
  {
    id: "puranas",
    name: "18 Mahapuranas",
    nameSanskrit: "पुराण",
    type: "leaf",
    description: "Cosmological narratives and devotional paths presenting abstract Vedic truths through simple stories.",
    x: 450,
    y: 320,
    icon: "🔱",
    image: "/images/mahabharata-era.png",
    quote: "अष्टादशपुराणेषु व्यासस्य वचनद्वयम्। परोपकारः पुण्याय पापाय परपीडनम्॥",
    quoteTranslation: "In all 18 Puranas, Vyasa says only two things: helping others brings merit, harming others brings sin."
  },
  {
    id: "yoga",
    name: "Yoga Sutras",
    nameSanskrit: "योग",
    type: "leaf",
    description: "Patanjali's eightfold path of self-realization, mind control, and union with cosmic consciousness.",
    x: 570,
    y: 320,
    icon: "🕉️",
    image: "/images/civilization-journey.png",
    quote: "योगश्चित्तवृत्तिनिरोधः।",
    quoteTranslation: "Yoga is the cessation of the fluctuations of the mind."
  },
  {
    id: "vedanta",
    name: "Vedanta",
    nameSanskrit: "वेदान्त",
    type: "leaf",
    description: "The ultimate culmination of philosophy, establishing non-duality and absolute oneness of Atman and Brahman.",
    x: 700,
    y: 320,
    icon: "🕊️",
    image: "/images/upanishadic-wisdom.png",
    quote: "अहं ब्रह्मास्मि।",
    quoteTranslation: "I am Brahman (the Supreme Reality)."
  },
  {
    id: "buddhism",
    name: "Buddhism & Jainism",
    nameSanskrit: "बौद्ध एवं जैन",
    type: "leaf",
    description: "Sramanic paths sharing common roots in Karma, rebirth, and liberation while pursuing non-violence and mindfulness.",
    x: 200,
    y: 440,
    icon: "☸️",
    image: "/images/buddhist-tradition.png",
    quote: "अहिंसा परमो धर्मः।",
    quoteTranslation: "Non-violence is the supreme virtue and path."
  },
  {
    id: "sikhism",
    name: "Sikh Tradition",
    nameSanskrit: "सिख परम्परा",
    type: "leaf",
    description: "Emerging in the 15th century, emphasizing monotheism, continuous remembrance of God, social equality, and selfless service.",
    x: 600,
    y: 440,
    icon: "🪯",
    image: "/images/sikh-gurus.png",
    quote: "मानस की जात सभै एकै पहचानबो।",
    quoteTranslation: "Recognize the entire human race as one single family."
  }
];

const TREE_LINKS = [
  { source: "sanatan", target: "shruti" },
  { source: "sanatan", target: "smriti" },
  { source: "sanatan", target: "darshana" },
  { source: "shruti", target: "vedas" },
  { source: "shruti", target: "upanishads" },
  { source: "smriti", target: "epics" },
  { source: "smriti", target: "puranas" },
  { source: "darshana", target: "yoga" },
  { source: "darshana", target: "vedanta" },
  { source: "shruti", target: "buddhism" },
  { source: "darshana", target: "sikhism" }
];

const spokesData = [
  {
    name: "Right View",
    nameSanskrit: "सम्यक् दृष्टि (Samyag-dṛṣṭi)",
    desc: "Understanding the true nature of reality, the law of cause and effect (Karma), impermanence, and the paths to end mental suffering.",
    fact: "Represents the intellectual alignment of consciousness with cosmic order (Rita) before initiating action.",
    pillar: "Prajña (Wisdom)",
    quality: "Discernment"
  },
  {
    name: "Right Intention",
    nameSanskrit: "सम्यक् संकल्प (Samyag-saṅkalpa)",
    desc: "Resolving to live in accordance with truth, cultivating harmlessness (Ahimsa), loving-kindness, and renouncing malice.",
    fact: "Directs mental volition towards pure desires and prevents internal conflicts.",
    pillar: "Prajña (Wisdom)",
    quality: "Renunciation & Goodwill"
  },
  {
    name: "Right Speech",
    nameSanskrit: "सम्यक् वाक् (Samyag-vāc)",
    desc: "Abstaining from lying, slander, harsh language, and vain talk. Speaking words that are truthful, gentle, and beneficial.",
    fact: "Ensures spoken words do not distort the flow of moral energy in social environments.",
    pillar: "Shila (Ethical Conduct)",
    quality: "Truthfulness"
  },
  {
    name: "Right Action",
    nameSanskrit: "सम्यक् कर्मान्त (Samyag-karmānta)",
    desc: "Engaging in unselfish and constructive behaviors, abstaining from taking life, stealing, and sensory misconduct.",
    fact: "The physical execution of non-violence (Ahimsa) in daily actions.",
    pillar: "Shila (Ethical Conduct)",
    quality: "Compassion in Action"
  },
  {
    name: "Right Livelihood",
    nameSanskrit: "सम्यक् आजीव (Samyag-ājīva)",
    desc: "Earning a living through ethical occupations that do not harm other living beings directly or indirectly.",
    fact: "Integrates spiritual values with material work, avoiding toxic trades.",
    pillar: "Shila (Ethical Conduct)",
    quality: "Righteous Commerce"
  },
  {
    name: "Right Effort",
    nameSanskrit: "सम्यक् व्यायाम (Samyag-vyāyāma)",
    desc: "Preventing unwholesome mental states from arising, abandoning active negative thoughts, and cultivating positive mental qualities.",
    fact: "The energetic engine driving consciousness toward self-mastery.",
    pillar: "Samadhi (Mental Discipline)",
    quality: "Vigilance & Persistence"
  },
  {
    name: "Right Mindfulness",
    nameSanskrit: "सम्यक् स्मृति (Samyag-smṛti)",
    desc: "Maintaining constant, alert awareness of the body, feelings, mind, and thoughts without attachment or aversion.",
    fact: "Grounds the observer in the eternal present, dissolving illusions of the ego.",
    pillar: "Samadhi (Mental Discipline)",
    quality: "Self-Awareness"
  },
  {
    name: "Right Concentration",
    nameSanskrit: "सम्यक् समाधि (Samyag-samādhi)",
    desc: "Developing single-pointed mental focus and tranquility, paving the way for deep meditative absorptions and pure insight.",
    fact: "The final meditative state where individual awareness merges with universal truth.",
    pillar: "Samadhi (Mental Discipline)",
    quality: "Meditative Absorption"
  }
];

const SECTIONS = [
  { id: "hero", label: "Cosmic Intro" },
  { id: "kaal-chakra", label: "Kaal Chakra" },
  { id: "creation", label: "The Creation" },
  { id: "vedas", label: "The 4 Vedas" },
  { id: "upanishads", label: "The Upanishads" },
  { id: "gita", label: "Bhagavad Gita" },
  { id: "epics", label: "The Epics" },
  { id: "puranas", label: "The Puranas" },
  { id: "deities", label: "Gods & Goddesses" },
  { id: "tree", label: "The Dharma Tree" },
  { id: "living", label: "Living Dharma" },
  { id: "downloads", label: "Free Library" },
  { id: "shloka", label: "Daily Shloka" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("kaal-chakra");
  const [counts, setCounts] = useState({ years: 0, followers: 0, texts: 0 });
  const [copied, setCopied] = useState(false);
  const [selectedTreeNode, setSelectedTreeNode] = useState<string | null>(null);
  const [selectedSpoke, setSelectedSpoke] = useState<number>(0);
  
  // 3D Parallax Tilt for Dharma Chakra
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  
  const rotateX = useTransform(tiltY, [-250, 250], [8, -8]);
  const rotateY = useTransform(tiltX, [-250, 250], [-8, 8]);
  
  const springConfig = { damping: 25, stiffness: 120 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  
  const handleWheelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    tiltX.set(mouseX);
    tiltY.set(mouseY);
  };
  
  const handleWheelMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };
  
  const { playOm, playSuccess, playClick } = useSacredSound();
  const { language } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const currentLang = mounted ? language : "EN";
  const activeT = t[currentLang] || t.EN;

  const [cosmicTime, setCosmicTime] = useState({
    elapsedYears: 5128.00000000,
    remainingYears: 426872.00000000,
    progressPercent: 1.18703704,
    vikramSamvat: 2083,
    srishtiSamvat: 1955885128,
  });
  const [currentTimeStr, setCurrentTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCosmicTime(getKaliYugaStats(now));
      const lang = useLanguageStore.getState().language;
      setCurrentTimeStr(
        now.toLocaleString(
          lang === "HI" ? "hi-IN" : lang === "SA" ? "sa-IN" : "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }
        )
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    const unsubscribe = useLanguageStore.subscribe(() => {
      updateTime();
    });
    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  const formatTickingNumber = (num: number) => {
    const integerPart = Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const decimalPart = (num % 1).toFixed(8).substring(1);
    return (
      <span className="font-mono tracking-tight font-bold text-text-main select-text">
        {integerPart}
        <span className="text-gold-light/70 text-phi-sm font-light select-text">{decimalPart}</span>
      </span>
    );
  };

  // Active section scroll indicator tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats Counters Animation
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounts({
        years: Math.floor(progress * 5000),
        followers: Number((progress * 1.2).toFixed(1)),
        texts: Math.floor(progress * 108),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts({ years: 5000, followers: 1.2, texts: 108 });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleSearchClick = () => {
    window.dispatchEvent(new CustomEvent("open-search"));
  };

  // Deterministic daily shloka selection
  const todayIndex = new Date().getDate() % DAILY_SHLOKAS.length;
  const verse = DAILY_SHLOKAS[todayIndex];

  const handleListenChant = () => {
    playOm();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(verse.english);
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }, 1200);
    }
  };

  const handleCopyShloka = async () => {
    const textToCopy = `${verse.sanskrit}\n\n${verse.transliteration}\n\nHI: ${verse.hindi}\n\nEN: ${verse.english}\n\nSource: ${verse.source}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      playSuccess();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Could not copy shloka", e);
    }
  };

  const handleShareShloka = () => {
    playSuccess();
    if (navigator.share) {
      navigator.share({
        title: "Daily Shloka of the Day",
        text: `${verse.sanskrit}\n- ${verse.source}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Desktop fallback: copy to clipboard
      const shareText = `${verse.sanskrit}\n\n${verse.transliteration}\n\nEN: ${verse.english}\n\n— ${verse.source}`;
      navigator.clipboard.writeText(shareText).catch(console.error);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full relative min-h-screen bg-bg text-text-main overflow-x-hidden selection:bg-[var(--saffron)]/20 selection:text-gold-light particles">
      
      {/* Interactive Sticky Diamond Sidebar Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4 items-end">
        {SECTIONS.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
              playClick();
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest font-mono select-none">
              {sec.label}
            </span>
            <div className="relative flex items-center justify-center">
              <div className={`w-3.5 h-3.5 rotate-45 border transition-all duration-500
                ${activeSection === sec.id
                  ? "border-gold scale-125 bg-gold shadow-[0_0_10px_var(--border-color)]"
                  : "border-[var(--border-color)] bg-card-bg group-hover:border-gold group-hover:scale-110"
                }`}
              />
              {activeSection === sec.id && (
                <div className="absolute w-1.5 h-1.5 rotate-45 bg-[#FFD700] animate-pulse" />
              )}
            </div>
          </a>
        ))}
      </div>

      {/* SECTION 1: HERO (Majestic Cinematic Entrance) */}
      <section
        id="hero"
        className="relative min-h-screen w-full flex flex-col justify-end items-center px-6 pb-16 pt-[132px] mt-[-68px] overflow-hidden select-none"
      >
        {/* Background Image Div (Clipped to crop watermark star without top black gap) */}
        <div 
          className="absolute -inset-x-2 -top-2 -bottom-10 z-0 bg-cover bg-no-repeat pointer-events-none select-none"
          style={{
            backgroundImage: "linear-gradient(to bottom, var(--hero-overlay-start) 0%, var(--hero-overlay-mid) 45%, var(--hero-overlay-end) 100%), var(--hero-temple-image)",
            backgroundPosition: "center"
          }}
        />
        {/* Cinematic Animated Starfield and Cosmic Nebulae overlays */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(245,194,66,0.03)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Floating stardust circles */}
        <div className="absolute top-[15%] left-[10%] w-2 h-2 rounded-full bg-[#FFE485] opacity-30 blur-[1px] animate-pulse star-twinkle-1" />
        <div className="absolute top-[40%] right-[15%] w-3 h-3 rounded-full bg-[#F5C242] opacity-20 blur-[2px] animate-pulse star-twinkle-2" />
        <div className="absolute bottom-[20%] left-[20%] w-1.5 h-1.5 rounded-full bg-white opacity-40 animate-pulse star-twinkle-3" />
        <div className="absolute bottom-[35%] right-[25%] w-2.5 h-2.5 rounded-full bg-[#F5C242] opacity-25 blur-[1px] animate-pulse star-twinkle-1" />

        {/* CENTERPIECE: Cinematic Embossed Sanskrit Typography with Soft Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center mt-6 md:mt-12 mb-auto z-10 px-4 py-6 relative select-text"
        >
          {/* Volumetric Radial Light Glow behind lettering */}
          <div className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,194,66,0.22)_0%,rgba(139,92,246,0.06)_40%,transparent_70%)] blur-[40px] pointer-events-none select-none -z-10" />
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[var(--hero-title-start)] via-[var(--hero-title-mid)] to-[var(--hero-title-end)] font-sanskrit select-text uppercase" style={{ filter: "var(--hero-text-glow)" }}>
            सनातन
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#F5C242] to-transparent mt-3" />
          <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.25em] text-[var(--hero-subtitle)] uppercase font-mono font-bold mt-4 max-w-lg select-text">
            {currentLang === "SA" ? "शाश्वतः धर्मः" : currentLang === "HI" ? "शाश्वत सनातन धर्म" : "The Eternal Way of Righteousness"}
          </p>
        </motion.div>

        {/* Side-by-Side Left/Right layout at the bottom of the hero screen */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-12 z-10 pb-6 mt-auto px-6 md:px-12 lg:px-20 xl:px-24 select-text"
        >
          {/* Left Column: Sanskrit Quote, Short Description & Search Bar */}
          <div className="flex flex-col gap-5 items-center md:items-start max-w-md w-full text-center md:text-left transition-transform duration-500">
            {/* Sacred Sanskrit Quote */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#F5C242]/80 uppercase tracking-widest font-mono">
                {currentLang === "SA" ? "मङ्गलाचरणम्" : currentLang === "HI" ? "मङ्गलाचरण" : "Sacred Motto"}
              </span>
              <p className="font-sanskrit text-gold-light text-lg md:text-xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                धर्मो रक्षति रक्षितः
              </p>
              <p className="text-[11px] md:text-xs text-text-muted italic">
                &ldquo;{currentLang === "SA" ? "धर्मः रक्षितः सन् रक्षकं रक्षति" : currentLang === "HI" ? "धर्म की रक्षा करने वालों की रक्षा धर्म करता है।" : "Dharma protects those who protect it."}&rdquo;
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs md:text-sm text-text-muted leading-relaxed max-w-md">
              {currentLang === "EN" 
                ? "Explore the eternal wisdom, sacred scriptures, cosmic time cycles, and profound philosophy of Sanatan Dharma under mathematical harmony and spiritual depth."
                : currentLang === "HI"
                ? "शाश्वत ज्ञान, पवित्र ग्रंथों, ब्रह्मांडीय काल चक्रों और सनातन धर्म के गहन दर्शन को गणितीय सामंजस्य और आध्यात्मिक गहराई के साथ खोजें।"
                : "सनातनधर्मस्य शाश्वतज्ञानं, पवित्रग्रन्थान्, कालचक्रं, दर्शनं च आध्यात्मिकगहनतया सह पश्यन्तु।"
              }
            </p>

            {/* Premium Search Trigger */}
            <div className="w-full">
              <div 
                onClick={handleSearchClick}
                className="flex items-center gap-3 bg-[#120a22]/70 border border-[#F5C242]/35 hover:border-[#F5C242] shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(245,194,66,0.18)] rounded-full px-5 py-3.5 cursor-pointer transition-all duration-500 group backdrop-blur-md"
              >
                <span className="text-text-muted text-xs select-none text-left flex-grow truncate">
                  {activeT.searchPlaceholder}
                </span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-[#F5C242] bg-[#F5C242]/15 border border-[#F5C242]/30 rounded font-mono font-medium">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right Column: CTA Buttons & Statistics Cards */}
          <div className="flex flex-col gap-6 items-center md:items-end max-w-sm w-full transition-transform duration-500">
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <a
                href="#vedas"
                onClick={() => playClick()}
                className="w-full text-center px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#F5C242] to-[#FFE485] hover:from-[#FFE485] hover:to-[#F5C242] text-black font-extrabold uppercase tracking-wider text-xs shadow-[0_0_25px_rgba(245,194,66,0.3)] hover:shadow-[0_0_35px_rgba(245,194,66,0.5)] transition-all duration-500 transform hover:-translate-y-0.5"
              >
                {activeT.exploreScriptures}
              </a>
              <div className="flex gap-3 w-full">
                <Link
                  href="/library/gita/chapter/1"
                  onClick={() => playClick()}
                  className="flex-1 text-center px-4 py-3 rounded-lg border border-[var(--border-gold)]/40 hover:border-[var(--accent-gold)] bg-card-bg text-gold hover:text-text-main font-bold uppercase tracking-wider text-[10px] sm:text-xs hover:bg-[var(--accent-gold)]/10 transition-all duration-500 transform hover:-translate-y-0.5 no-underline block"
                >
                  {activeT.readGita}
                </Link>
                <Link
                  href="/history"
                  onClick={() => playClick()}
                  className="flex-1 text-center px-4 py-3 rounded-lg bg-card-bg border border-[var(--border-gold)] hover:border-[var(--accent-gold)] text-text-main hover:text-gold font-bold uppercase tracking-wider text-[10px] sm:text-xs hover:bg-[var(--bg-secondary)] transition-all duration-500 transform hover:-translate-y-0.5 no-underline block"
                >
                  {activeT.timeline}
                </Link>
              </div>
            </div>

            {/* Premium Glassmorphic Stats Section */}
            <div className="flex flex-col gap-3 ag-glass-premium px-6 py-4 shadow-2xl backdrop-blur-xl w-full border border-[#F5C242]/20 transform md:translate-y-4 transition-transform duration-500">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-text-muted uppercase tracking-widest font-sans font-semibold">
                  {currentLang === "EN" ? "Years History" : currentLang === "HI" ? "वर्षों का इतिहास" : "वर्षाणि"}
                </span>
                <span className="text-base font-bold text-gold font-mono tracking-tight drop-shadow-[0_0_8px_rgba(245,194,66,0.3)]">
                  {currentLang === "EN" ? `${counts.years}+` : `${counts.years.toLocaleString()}+`}
                </span>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-[#F5C242]/10 via-[#F5C242]/30 to-[#F5C242]/10" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-text-muted uppercase tracking-widest font-sans font-semibold">
                  {currentLang === "EN" ? "Followers" : currentLang === "HI" ? "अनुयायी" : "भक्ताः"}
                </span>
                <span className="text-base font-bold text-gold font-mono tracking-tight drop-shadow-[0_0_8px_rgba(245,194,66,0.3)]">
                  {currentLang === "EN" ? `${counts.followers}B+` : `${counts.followers} अरब+`}
                </span>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-[#F5C242]/10 via-[#F5C242]/30 to-[#F5C242]/10" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-text-muted uppercase tracking-widest font-sans font-semibold">
                  {currentLang === "EN" ? "Sacred Texts" : currentLang === "HI" ? "पवित्र ग्रन्थ" : "ग्रन्थाः"}
                </span>
                <span className="text-base font-bold text-gold font-mono tracking-tight drop-shadow-[0_0_8px_rgba(245,194,66,0.3)]">
                  {currentLang === "EN" ? `${counts.texts}+` : `${counts.texts}+`}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating scroll indicator to cosmic clock */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <a
            href="#kaal-chakra"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("kaal-chakra")?.scrollIntoView({ behavior: "smooth" });
              playClick();
            }}
            className="text-[#F5C242] opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Scroll to Cosmic Clock"
          >
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>
      </section>

      {/* SECTION 0: KAAL CHAKRA (Refactored Centerpiece Cosmic Clock) */}
      <section
        id="kaal-chakra"
        className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-16 overflow-hidden select-none border-b border-[var(--border-color)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--cosmic-bg-blend)",
        }}
      >
        {/* Centered Section Header */}
        <div className="max-w-3xl w-full text-center flex flex-col items-center gap-3 mb-10 z-10 select-text">
          <span className="text-[#F5C242] text-xs uppercase tracking-widest font-extrabold bg-[#F5C242]/10 px-4 py-2 rounded-full w-fit border border-[#F5C242]/30 shadow-[0_0_15px_rgba(245,194,66,0.15)] font-mono">
            {activeT.kaalChakraTitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-main leading-normal mt-1">
            {currentLang === "SA" ? "कालचक्रम्" : currentLang === "HI" ? "काल चक्र" : "Kaal Chakra"}
          </h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed max-w-2xl px-4">
            {activeT.kaalChakraDesc}
          </p>
        </div>

        {/* Center Rotating Sacred Geometry Wheel (Kaal Chakra) */}
        <div className="w-full relative flex justify-center items-center z-10 mb-12 overflow-visible">
          {/* Ambient Cinematic Cosmic Glow behind the clock */}
          <div className="absolute w-[85%] max-w-[700px] aspect-square rounded-full bg-[radial-gradient(circle_at_center,rgba(245,194,66,0.15)_0%,rgba(139,92,246,0.06)_45%,transparent_75%)] blur-[60px] pointer-events-none select-none" />
          
          <svg viewBox="0 0 500 500" className="w-full max-w-[580px] md:max-w-[720px] lg:max-w-[800px] xl:max-w-[850px] aspect-square drop-shadow-[0_0_100px_rgba(245,194,66,0.4)] md:drop-shadow-[0_0_140px_rgba(245,194,66,0.55)] transition-all duration-700 ease-out">
            <defs>
              <radialGradient id="omGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFE485" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#F5C242" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1C0E35" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#2D1259" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE485" />
                <stop offset="50%" stopColor="#F5C242" />
                <stop offset="100%" stopColor="#FFE485" />
              </linearGradient>
            </defs>

            {/* Twinkling background stars within wheel */}
            <g className="opacity-40">
              <circle cx="100" cy="150" r="1.5" fill="white" className="star-twinkle-1" />
              <circle cx="400" cy="180" r="1" fill="white" className="star-twinkle-2" />
              <circle cx="120" cy="350" r="2" fill="white" className="star-twinkle-3" />
              <circle cx="380" cy="380" r="1.5" fill="white" className="star-twinkle-1" />
              <circle cx="250" cy="80" r="1.2" fill="white" className="star-twinkle-2" />
            </g>

            {/* Sacred Geometry: Flower of Life (Watermark background for HD detail) */}
            <g className="opacity-[0.06] pointer-events-none" stroke="#F5C242" strokeWidth="0.75" fill="none">
              <circle cx="250" cy="250" r="50" />
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * 60 * Math.PI) / 180;
                return <circle key={`fol1-${i}`} cx={round(250 + 50 * Math.cos(angle))} cy={round(250 + 50 * Math.sin(angle))} r="50" />;
              })}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const radius = i % 2 === 0 ? 86.6 : 100;
                return <circle key={`fol2-${i}`} cx={round(250 + radius * Math.cos(angle))} cy={round(250 + radius * Math.sin(angle))} r="50" />;
              })}
            </g>

            {/* Concentric outer rings */}
            <circle cx="250" cy="250" r="230" fill="none" stroke="var(--clock-text-secondary)" strokeOpacity={0.15} strokeWidth={1.5} />
            <circle cx="250" cy="250" r="225" fill="none" stroke="var(--clock-text-primary)" strokeOpacity={0.25} strokeWidth={1} strokeDasharray="3,3" />
            <circle cx="250" cy="250" r="215" fill="none" stroke="var(--clock-text-secondary)" strokeOpacity={0.35} strokeWidth={2} />
            
            {/* Outer degree ticks (High-Precision 180 Ticks for HD chronometer styling) */}
            <g className="opacity-30">
              {Array.from({ length: 180 }).map((_, idx) => {
                const angle = (idx * 360) / 180;
                const angleRad = (angle * Math.PI) / 180;
                const tickLength = idx % 15 === 0 ? 12 : idx % 5 === 0 ? 8 : 4;
                const x1 = round(250 + 215 * Math.cos(angleRad));
                const y1 = round(250 + 215 * Math.sin(angleRad));
                const x2 = round(250 + (215 - tickLength) * Math.cos(angleRad));
                const y2 = round(250 + (215 - tickLength) * Math.sin(angleRad));
                const opacity = idx % 5 === 0 ? 0.5 : 0.15;
                const strokeWidth = idx % 15 === 0 ? 1.25 : 0.75;
                return (
                  <line
                    key={idx}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#FFE485"
                    strokeOpacity={opacity}
                    strokeWidth={strokeWidth}
                  />
                );
              })}
            </g>

            {/* Clockwise Outer Ring - Zodiacs */}
            <g className="spin-cosmic-slow origin-center">
              {Array.from({ length: 12 }).map((_, idx) => {
                const angle = (idx * 360) / 12;
                const angleRad = (angle * Math.PI) / 180;
                const x1 = round(250 + 80 * Math.cos(angleRad));
                const y1 = round(250 + 80 * Math.sin(angleRad));
                const x2 = round(250 + 215 * Math.cos(angleRad));
                const y2 = round(250 + 215 * Math.sin(angleRad));
                return (
                  <g key={idx}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#FFE485"
                      strokeOpacity={0.15}
                      strokeWidth={1}
                    />
                    {idx < 11 && (
                      <line
                        x1={x2}
                        y1={y2}
                        x2={round(250 + 215 * Math.cos(((idx + 1) * 360 / 12) * Math.PI / 180))}
                        y2={round(250 + 215 * Math.sin(((idx + 1) * 360 / 12) * Math.PI / 180))}
                        stroke="#F5C242"
                        strokeOpacity={0.1}
                        strokeWidth={1}
                      />
                    )}
                    {idx === 11 && (
                      <line
                        x1={x2}
                        y1={y2}
                        x2={round(250 + 215 * Math.cos(0))}
                        y2={round(250 + 215 * Math.sin(0))}
                        stroke="#F5C242"
                        strokeOpacity={0.1}
                        strokeWidth={1}
                      />
                    )}
                  </g>
                );
              })}

              <circle cx="250" cy="250" r="170" fill="none" stroke="var(--clock-text-secondary)" strokeOpacity={0.25} strokeWidth={1} strokeDasharray="6,4" />
              <circle cx="250" cy="250" r="135" fill="none" stroke="var(--clock-text-secondary)" strokeOpacity={0.2} strokeWidth={1.5} />

              {(ZODIACS[currentLang] || ZODIACS.EN).map((zod, idx) => {
                const angle = (idx * 360) / 12;
                const angleRotated = angle - 90;
                return (
                  <g 
                    key={idx} 
                    transform={`rotate(${angleRotated} 250 250) translate(250 ${250 - 152})`}
                    className="select-none"
                  >
                    <text
                      x="0"
                      y="-4"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="var(--clock-text-primary)"
                      className="font-sanskrit text-[10px] md:text-[11.5px] font-bold tracking-wide"
                    >
                      {zod.name}
                    </text>
                    {currentLang === "EN" && (
                      <text
                        x="0"
                        y="7"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="var(--text-secondary)"
                        className="font-sanskrit text-[8px] font-medium opacity-85"
                      >
                        {zod.skt}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Counter-Clockwise Inner Ring - Yugas */}
            <g className="spin-cosmic-reverse origin-center">
              <circle cx="250" cy="250" r="85" fill="none" stroke="var(--clock-text-primary)" strokeOpacity={0.3} strokeWidth={1.5} />
              
              {(YUGAS[currentLang] || YUGAS.EN).map((yuga, idx) => {
                const angle = (idx * 360) / 4;
                const angleRotated = angle - 90;
                return (
                  <g
                    key={idx}
                    transform={`rotate(${angleRotated} 250 250) translate(250 ${250 - 110})`}
                  >
                    <text
                      x="0"
                      y="0"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="var(--clock-text-secondary)"
                      className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest font-bold select-none"
                    >
                      {yuga}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Cosmic Dial Pointer Needle */}
            <g className="pointer-events-none" style={{ filter: "drop-shadow(0 0 10px rgba(245, 194, 66, 0.6))" }}>
              <circle cx="250" cy="55" r="4" fill="#FFE485" className="animate-ping" />
              <line 
                x1="250" 
                y1="250" 
                x2="250" 
                y2="55" 
                stroke="url(#goldGrad)" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              <line 
                x1="250" 
                y1="250" 
                x2="250" 
                y2="40" 
                stroke="#FFFFFF" 
                strokeWidth="1" 
                strokeLinecap="round" 
              />
              <polygon 
                points="250,30 256,48 250,44 244,48" 
                fill="url(#goldGrad)" 
                stroke="#F5C242" 
                strokeWidth="0.5" 
              />
              <circle cx="250" cy="95" r="3" fill="var(--bg)" stroke="var(--clock-text-primary)" strokeWidth="1" />
              <circle cx="250" cy="145" r="3" fill="var(--bg)" stroke="var(--clock-text-primary)" strokeWidth="1" />
            </g>

            {/* Center Glowing Om Hub */}
            <g className="origin-center select-none cursor-pointer" onClick={playOm}>
              <circle cx="250" cy="250" r="70" fill="url(#centerGlow)" stroke="none" />
              <circle cx="250" cy="250" r="55" fill="none" stroke="var(--clock-text-secondary)" strokeOpacity={0.4} strokeWidth={1.5} />
              <circle cx="250" cy="250" r="45" fill="none" stroke="var(--clock-text-primary)" strokeOpacity={0.6} strokeWidth={1} strokeDasharray="4,2" />
              <circle cx="250" cy="250" r="35" fill="var(--bg)" stroke="var(--clock-text-primary)" strokeWidth="2" />
              <text
                x="250"
                y="251"
                textAnchor="middle"
                dominantBaseline="central"
                fill="url(#goldGrad)"
                className="font-sanskrit text-[32px] font-extrabold select-none"
              >
                ॐ
              </text>
            </g>
          </svg>
        </div>

        {/* Dashboard Telemetry Grid */}
        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 z-10 select-text text-left px-4">
          {/* Live Gregorian Anchor Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="ag-glass-premium px-6 py-4 border border-[#F5C242]/20 hover:border-[#F5C242]/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-[10px] text-gold uppercase tracking-widest font-mono font-bold">
              {activeT.gregorianAnchor}
            </div>
            <div className="text-text-main font-serif text-base md:text-lg font-bold mt-1 leading-tight">
              {currentTimeStr || "..."}
            </div>
          </motion.div>

          {/* Vikram Samvat Era */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="ag-glass-premium px-6 py-4 border border-[#F5C242]/20 hover:border-[#F5C242]/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <span className="text-[10px] text-gold uppercase tracking-widest font-mono font-bold">
              {activeT.currentSamvat}
            </span>
            <div className="text-xl font-extrabold text-gold font-mono mt-1 tracking-wide">
              {cosmicTime.vikramSamvat.toLocaleString()}
            </div>
          </motion.div>

          {/* Srishti Samvat Era */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="ag-glass-premium px-6 py-4 border border-[#F5C242]/20 hover:border-[#F5C242]/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <span className="text-[10px] text-gold uppercase tracking-widest font-mono font-bold">
              {activeT.creationEra}
            </span>
            <div className="text-xl font-extrabold text-gold font-mono mt-1 tracking-wide">
              {formatTickingNumber(cosmicTime.srishtiSamvat)}
            </div>
          </motion.div>

          {/* Live Ticking Kali Yuga Progress Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="ag-glass-premium px-6 py-4 shadow-lg flex flex-col justify-center gap-2 border border-[#F5C242]/20"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#FFE485] uppercase tracking-wider font-mono">
                {activeT.completionRate}
              </span>
              <span className="font-mono text-xs font-extrabold text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                {cosmicTime.progressPercent.toFixed(8)}%
              </span>
            </div>
            
            <div className="w-full bg-[#120a22] border border-[#F5C242]/20 rounded-full h-2 overflow-hidden relative">
              <div
                className="bg-gradient-to-r from-[#F5C242] via-[#FFE485] to-[#F5C242] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.max(1.18, cosmicTime.progressPercent)}%` }}
              />
            </div>
          </motion.div>

          {/* Elapsed Years */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="ag-glass-premium px-6 py-4 border border-[#F5C242]/20 hover:border-[#F5C242]/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <span className="text-[10px] text-gold uppercase tracking-widest font-mono font-bold">
              {activeT.elapsedYears}
            </span>
            <div className="text-xl font-extrabold text-text-main font-mono mt-1 tracking-wide">
              {formatTickingNumber(cosmicTime.elapsedYears)}
            </div>
          </motion.div>

          {/* Remaining Years */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="ag-glass-premium px-6 py-4 border border-[#F5C242]/20 hover:border-[#F5C242]/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <span className="text-[10px] text-gold uppercase tracking-widest font-mono font-bold">
              {activeT.remainingYears}
            </span>
            <div className="text-xl font-extrabold text-text-main font-mono mt-1 tracking-wide">
              {formatTickingNumber(cosmicTime.remainingYears)}
            </div>
          </motion.div>

          {/* Cosmic Status Label */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="ag-glass-premium px-6 py-4 border border-[#F5C242]/20 shadow-lg flex justify-between items-center sm:col-span-2 lg:col-span-3 xl:col-span-2"
          >
            <span className="text-[10px] text-gold uppercase tracking-widest font-mono font-bold">
              {activeT.cosmicAge}
            </span>
            <span className="text-gold font-serif text-sm font-bold italic">
              {currentLang === "SA"
                ? "कलियुगः - प्रथमचरणम्"
                : currentLang === "HI"
                ? "कलियुग - प्रथम चरण"
                : "Kali Yuga - 1st Quarter"}
            </span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 0.5: DHARMA CHAKRA (Interactive Noble Wheel of Law) */}
      <section
        id="dharma-chakra"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg border-t border-[var(--border-color)] bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: "var(--section-bg-blend)"
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-phi-xl">
          {/* Header */}
          <div className="text-center flex flex-col gap-phi-sm mb-4">
            <span className="text-gold text-xs uppercase tracking-widest font-extrabold bg-gold/10 px-4 py-2 rounded-full w-fit mx-auto border border-gold/30 shadow-[0_0_15px_rgba(184,134,11,0.1)] font-mono">
              {currentLang === "HI" ? "अष्टाङ्ग मार्ग" : currentLang === "SA" ? "अष्टाङ्गयोगः" : "The Eightfold Path"}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-main">
              {currentLang === "HI" ? "धर्म चक्र — ब्रह्मांडीय नियम" : currentLang === "SA" ? "धर्मचक्रम्" : "Dharma Chakra — The Wheel of Law"}
            </h2>
            <p className="text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
              {currentLang === "HI" 
                ? "सनातन और बौद्ध दर्शन का एक परम प्रतीक, जो सदाचार, नैतिक अनुशासन और चेतना के संतुलन का प्रतिनिधित्व करता है।"
                : "The eternal symbol of cosmic order, moral virtue, and mental discipline. Click on any spoke of the golden wheel to explore the Noble Eightfold Path."}
            </p>
          </div>

          {/* Interactive Wheel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-phi-md">
            {/* Left Column: Interactive SVG Wheel (Gilded Raja monument with 3D Parallax) */}
            <div className="lg:col-span-6 flex justify-center items-center relative py-4">
              {/* Outer soft golden halo / Solar rays */}
              <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,194,66,0.15)_0%,rgba(184,134,11,0.05)_50%,transparent_70%)] blur-[30px] pointer-events-none select-none" />

              <motion.div
                onMouseMove={handleWheelMouseMove}
                onMouseLeave={handleWheelMouseLeave}
                style={{
                  rotateX: rotateXSpring,
                  rotateY: rotateYSpring,
                  transformStyle: "preserve-3d",
                  perspective: 1200
                }}
                className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[580px] lg:h-[580px] flex items-center justify-center transition-all duration-300"
              >
                <svg 
                  viewBox="0 0 400 400" 
                  className="w-full h-full drop-shadow-[0_10px_35px_rgba(0,0,0,0.4)] select-none overflow-visible"
                  style={{ transform: "translateZ(0px)" }}
                >
                  <defs>
                    {/* Premium 3D Gold Embossing Filter */}
                    <filter id="gold-emboss" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />
                      <feSpecularLighting in="blur" surfaceScale="2" specularConstant="1.4" specularExponent="16" lightingColor="#FFE485" result="specOut">
                        <fePointLight x="180" y="80" z="90" />
                      </feSpecularLighting>
                      <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOutMapped" />
                      <feComposite in="SourceGraphic" in2="specOutMapped" operator="arithmetic" k1="0" k2="1" k3="0.85" k4="0" result="lit" />
                      <feMerge>
                        <feMergeNode in="lit" />
                      </feMerge>
                    </filter>

                    {/* Metallic Gold Gradient */}
                    <linearGradient id="gold-metallic" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#785006" />
                      <stop offset="25%" stopColor="#F5C242" />
                      <stop offset="50%" stopColor="#FFF2B2" />
                      <stop offset="75%" stopColor="#DAA520" />
                      <stop offset="100%" stopColor="#8A5A00" />
                    </linearGradient>

                    {/* Glowing Active Saffron-Gold Gradient */}
                    <linearGradient id="saffron-active-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FF8C00" />
                      <stop offset="50%" stopColor="#FF4500" />
                      <stop offset="100%" stopColor="#8B0000" />
                    </linearGradient>

                    {/* Solar Aura radial gradient */}
                    <radialGradient id="solar-aura" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F5C242" stopOpacity="0.2" />
                      <stop offset="60%" stopColor="#FF4500" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>

                    {/* Radial Hub Gradient */}
                    <radialGradient id="gold-radial" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFE485" />
                      <stop offset="70%" stopColor="#F5C242" />
                      <stop offset="95%" stopColor="#B8860B" />
                      <stop offset="100%" stopColor="#5C4003" />
                    </radialGradient>

                    {/* Saffron Glow Filter */}
                    <filter id="saffron-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Cosmic Solar Aura Backdrop */}
                  <g className="origin-center pointer-events-none">
                    <circle cx="200" cy="200" r="190" fill="url(#solar-aura)" className="animate-pulse" style={{ animationDuration: "5s" }} />
                    <circle cx="200" cy="200" r="162" fill="none" stroke="url(#gold-metallic)" strokeWidth="0.5" opacity="0.12" />
                  </g>

                  {/* ROTATING BACKGROUND: Cosmic Sun Rays & Halo */}
                  <g className="animate-spin-slow-clockwise">
                    {/* Concentric subtle rings */}
                    <circle cx="200" cy="200" r="162" fill="none" stroke="url(#gold-metallic)" strokeWidth="0.75" opacity="0.2" strokeDasharray="5,5" />
                    <circle cx="200" cy="200" r="172" fill="none" stroke="url(#gold-metallic)" strokeWidth="0.5" opacity="0.15" />
                    
                    {/* Soft Sun Ray Spokes (faint background lines) */}
                    {Array.from({ length: 24 }).map((_, i) => {
                      const rayAngle = i * 15;
                      return (
                        <line
                          key={`ray-${i}`}
                          x1="200"
                          y1="200"
                          x2="200"
                          y2="25"
                          stroke="url(#gold-metallic)"
                          strokeWidth="0.5"
                          opacity="0.1"
                          transform={`rotate(${rayAngle} 200 200)`}
                        />
                      );
                    })}
                  </g>

                  {/* ROTATING OUTER RIM: Contains Sanskrit Inscriptions & Dots */}
                  <g className="animate-spin-slow-clockwise" filter="url(#gold-emboss)">
                    {/* Outer Rim main body */}
                    <circle cx="200" cy="200" r="145" fill="none" stroke="url(#gold-metallic)" strokeWidth="7" />
                    <circle cx="200" cy="200" r="139" fill="none" stroke="var(--bg)" strokeWidth="1.5" />
                    <circle cx="200" cy="200" r="150" fill="none" stroke="url(#gold-metallic)" strokeWidth="1.2" opacity="0.5" />
                    
                    {/* Sanskrit Gayatri Mantra on Path */}
                    <path id="rim-sanskrit-path" d="M 200, 48 A 152,152 0 1,1 199.9,48" fill="none" stroke="none" />
                    <text className="font-sanskrit text-[9px] font-bold tracking-[0.25em]" fill="url(#gold-metallic)" opacity="0.95">
                      <textPath href="#rim-sanskrit-path" startOffset="0%">
                        ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ
                      </textPath>
                    </text>

                    {/* Outer rim decorative nodes (represent concentrations/moral states) */}
                    {Array.from({ length: 24 }).map((_, idx) => {
                      const dotAngle = idx * 15;
                      const dotRad = (dotAngle * Math.PI) / 180;
                      return (
                        <circle
                          key={`rim-dot-${idx}`}
                          cx={round(200 + 145 * Math.sin(dotRad))}
                          cy={round(200 - 145 * Math.cos(dotRad))}
                          r="1.8"
                          fill="url(#gold-metallic)"
                          opacity="0.9"
                        />
                      );
                    })}
                  </g>

                  {/* STATIONARY SPOKES: Ornate and Interactive */}
                  {Array.from({ length: 8 }).map((_, idx) => {
                    const angle = idx * 45;
                    const isSelected = selectedSpoke === idx;
                    return (
                      <g
                        key={idx}
                        transform={`rotate(${angle} 200 200)`}
                        className="cursor-pointer group"
                        onClick={() => { setSelectedSpoke(idx); playClick(); }}
                      >
                        {/* Glow behind the active spoke */}
                        {isSelected && (
                          <line
                            x1="200"
                            y1="165"
                            x2="200"
                            y2="60"
                            stroke="url(#saffron-active-grad)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            filter="url(#saffron-glow-filter)"
                            opacity="0.5"
                          />
                        )}

                        {/* Active Spoke Visual Enhancements (Ripples, Sparks, Beams) */}
                        {isSelected && (
                          <>
                            {/* Animated Outward Energy Wave (Laser Beam) */}
                            <motion.line
                              x1="200"
                              y1="160"
                              x2="200"
                              y2="52"
                              stroke="#FFFFFF"
                              strokeWidth="4"
                              strokeLinecap="round"
                              initial={{ pathLength: 0, opacity: 1 }}
                              animate={{ pathLength: 1, opacity: [1, 0.8, 0] }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              style={{ filter: "drop-shadow(0 0 8px #FFE485)" }}
                            />
                            {/* Spoke tip circular ripple */}
                            <motion.circle
                              cx="200"
                              cy="52"
                              initial={{ r: 0, opacity: 1, strokeWidth: 3 }}
                              animate={{ r: 75, opacity: 0, strokeWidth: 0.2 }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              fill="none"
                              stroke="url(#saffron-active-grad)"
                              style={{ filter: "drop-shadow(0 0 4px #FF4500)" }}
                            />
                            {/* Hub circular ripple */}
                            <motion.circle
                              cx="200"
                              cy="200"
                              initial={{ r: 26, opacity: 0.9, strokeWidth: 2 }}
                              animate={{ r: 145, opacity: 0, strokeWidth: 0.2 }}
                              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                              fill="none"
                              stroke="url(#gold-metallic)"
                              style={{ filter: "drop-shadow(0 0 6px #FFE485)" }}
                            />
                            {/* Floating sparks rising from hub along spoke */}
                            {mounted && Array.from({ length: 6 }).map((_, i) => {
                              const delay = i * 0.08;
                              const startX = 200 + (Math.random() - 0.5) * 8;
                              const endX = startX + (Math.random() - 0.5) * 15;
                              return (
                                <motion.circle
                                  key={`spark-${i}`}
                                  cx={startX}
                                  cy={150}
                                  r={Math.random() * 2 + 1}
                                  fill="#FFE485"
                                  initial={{ cy: 150, opacity: 1, scale: 1 }}
                                  animate={{ 
                                    cy: [150, 60], 
                                    cx: [startX, endX],
                                    opacity: [0.8, 1, 0],
                                    scale: [1, 1.4, 0.4]
                                  }}
                                  transition={{ duration: 0.7, delay, ease: "easeOut" }}
                                  style={{ filter: "drop-shadow(0 0 3px #FFA500)" }}
                                />
                              );
                            })}
                          </>
                        )}

                        {/* Ornate Spoke Main Column */}
                        <line
                          x1="200"
                          y1="165"
                          x2="200"
                          y2="60"
                          stroke={isSelected ? "url(#saffron-active-grad)" : "url(#gold-metallic)"}
                          strokeWidth={isSelected ? 6 : 4.5}
                          className="transition-all duration-300"
                        />

                        {/* Sculpted outer struts for premium volumetric look */}
                        <path
                          d="M 194,165 C 194,130 196,105 192,65 L 195,62 L 200,105 L 205,62 L 208,65 C 204,105 206,130 206,165 Z"
                          fill="url(#gold-metallic)"
                          filter="url(#gold-emboss)"
                          opacity="0.85"
                        />

                        {/* Central Medallion Jewel - Glowing Diamond Facet */}
                        <polygon
                          points="200,104 206,112 200,120 194,112"
                          fill={isSelected ? "#FFF2B2" : "url(#gold-metallic)"}
                          stroke={isSelected ? "#FF4500" : "#B8860B"}
                          strokeWidth="0.75"
                          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}
                          className="transition-all duration-300"
                        />

                        {/* Ornate collar near the hub */}
                        <path
                          d="M 191,155 Q 200,158 209,155 L 206,161 Q 200,163 194,161 Z"
                          fill="url(#gold-metallic)"
                          filter="url(#gold-emboss)"
                        />

                        {/* Ornate top bracket attaching to outer rim */}
                        <path
                          d="M 188,68 Q 200,77 212,68 L 205,58 Q 200,60 195,58 Z"
                          fill="url(#gold-metallic)"
                          filter="url(#gold-emboss)"
                        />

                        {/* Lotus Bud Handle at Spoke Tip */}
                        <path
                          d="M 195,58 C 190,52 195,44 200,44 C 205,44 210,52 205,58 Z"
                          fill={isSelected ? "url(#saffron-active-grad)" : "url(#gold-metallic)"}
                          stroke="#FFE485"
                          strokeWidth="1.2"
                          className="transition-all duration-300"
                          style={isSelected ? { filter: "drop-shadow(0 0 8px #FF4500)" } : {}}
                        />

                        {/* Large invisible click trigger spoke area */}
                        <rect
                          x="180"
                          y="42"
                          width="40"
                          height="130"
                          fill="transparent"
                          className="cursor-pointer"
                        />
                      </g>
                    );
                  })}

                  {/* Ring of 16 Golden Lotus Petals around the Hub */}
                  <g className="origin-center animate-spin-slow-clockwise">
                    {Array.from({ length: 16 }).map((_, i) => {
                      const petalAngle = (i * 360) / 16;
                      return (
                        <path
                          key={`hub-petal-${i}`}
                          d="M 196,174 C 192,162 200,152 200,152 C 200,152 208,162 204,174 Z"
                          fill="url(#gold-metallic)"
                          stroke="#FFE485"
                          strokeWidth="0.5"
                          transform={`rotate(${petalAngle} 200 200)`}
                          opacity="0.9"
                          style={{ filter: "drop-shadow(0 0 2px rgba(245, 194, 66, 0.4))" }}
                        />
                      );
                    })}
                  </g>

                  {/* ROTATING HUB ACCENTS (Counter-Clockwise Spin) */}
                  <g className="animate-spin-slow-counter">
                    <circle cx="200" cy="200" r="38" fill="url(#gold-radial)" stroke="url(#gold-metallic)" strokeWidth="2.5" />
                    <circle cx="200" cy="200" r="32" fill="none" stroke="url(#saffron-active-grad)" strokeWidth="1" strokeDasharray="3,2" />
                    {/* Notch dots for gear-like look */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const notchAngle = i * 30;
                      const notchRad = (notchAngle * Math.PI) / 180;
                      return (
                        <circle
                          key={`notch-${i}`}
                          cx={round(200 + 33 * Math.sin(notchRad))}
                          cy={round(200 - 33 * Math.cos(notchRad))}
                          r="1.5"
                          fill="url(#gold-metallic)"
                        />
                      );
                    })}
                  </g>

                  {/* STATIONARY INNER HUB CORE: Keeps OM symbol perfectly upright */}
                  <g>
                    <circle cx="200" cy="200" r="26" fill="var(--bg-card)" stroke="url(#gold-metallic)" strokeWidth="2" />
                    <circle cx="200" cy="200" r="22" fill="none" stroke="url(#gold-metallic)" strokeWidth="0.5" opacity="0.5" />
                    
                    {/* Embossed, glowing golden OM symbol */}
                    <text
                      x="200"
                      y="208"
                      textAnchor="middle"
                      className="font-sanskrit text-[24px] font-extrabold select-none pointer-events-none fill-gold"
                      style={{ filter: "drop-shadow(0 0 6px rgba(245,194,66,0.85))" }}
                    >
                      ॐ
                    </text>
                  </g>

                  {/* Royal Lotus Pedestal Base (Padmasana) grounding the Monument */}
                  <g className="origin-center pointer-events-none" opacity="0.95" style={{ filter: "drop-shadow(0 4px 10px rgba(120, 80, 10, 0.3))" }}>
                    {/* Bottom stand/base plate */}
                    <path
                      d="M 110,385 C 110,380 120,378 200,378 C 280,378 290,380 290,385 C 290,389 270,392 200,392 C 130,392 110,399 110,385 Z"
                      fill="url(#gold-metallic)"
                      stroke="#FFE485"
                      strokeWidth="1"
                    />
                    <path
                      d="M 125,378 C 125,373 135,371 200,371 C 265,371 275,373 275,378 C 275,381 255,383 200,383 C 145,383 125,381 125,378 Z"
                      fill="url(#gold-metallic)"
                      opacity="0.8"
                    />

                    {/* Lotus Petals - Row 1 (back layer) */}
                    <path d="M 140,371 C 130,355 150,345 165,355 C 150,355 145,365 140,371 Z" fill="url(#gold-metallic)" opacity="0.7" />
                    <path d="M 260,371 C 270,355 250,345 235,355 C 250,355 255,365 260,371 Z" fill="url(#gold-metallic)" opacity="0.7" />
                    <path d="M 200,371 C 185,348 215,348 200,371 Z" fill="url(#gold-metallic)" opacity="0.7" />

                    {/* Lotus Petals - Row 2 (front layer, larger petals) */}
                    <path d="M 160,375 C 145,350 175,340 185,360 C 170,362 165,370 160,375 Z" fill="url(#gold-metallic)" stroke="#FFE485" strokeWidth="0.5" />
                    <path d="M 240,375 C 255,350 225,340 215,360 C 230,362 235,370 240,375 Z" fill="url(#gold-metallic)" stroke="#FFE485" strokeWidth="0.5" />
                    <path d="M 200,376 C 180,345 220,345 200,376 Z" fill="url(#gold-metallic)" stroke="#FFE485" strokeWidth="0.75" />

                    {/* Decorative details */}
                    <line x1="135" y1="385" x2="265" y2="385" stroke="#FFF2B2" strokeWidth="0.75" opacity="0.6" />
                  </g>
                </svg>

                {/* Spoke index tags surrounding the wheel floating in 3D Parallax */}
                {Array.from({ length: 8 }).map((_, idx) => {
                  const angle = idx * 45 - 90;
                  const angleRad = (angle * Math.PI) / 180;
                  const rText = 180;
                  const x = round(200 + rText * Math.cos(angleRad));
                  const y = round(200 + rText * Math.sin(angleRad));
                  const isSelected = selectedSpoke === idx;
                  
                  // Fetch the name
                  const spokeName = currentLang === "HI" ? spokesData[idx].nameSanskrit : spokesData[idx].name;

                  return (
                    <button
                      key={`spoke-label-${idx}`}
                      style={{ 
                        position: "absolute",
                        left: `${(x / 400) * 100}%`, 
                        top: `${(y / 400) * 100}%`,
                        transform: `translate3d(-50%, -50%, 25px) scale(${isSelected ? 1.05 : 1})`,
                        transformStyle: "preserve-3d"
                      }}
                      className={`absolute px-3 py-1 rounded text-[9.5px] md:text-[11.5px] font-extrabold tracking-widest uppercase border transition-all duration-300 cursor-pointer shadow-md ${
                        isSelected
                          ? "bg-gradient-to-r from-saffron to-gold border-saffron text-black shadow-lg"
                          : "bg-card-bg border-[var(--border-color)] text-text-muted hover:border-gold hover:text-text-main"
                      }`}
                      onClick={() => { setSelectedSpoke(idx); playClick(); }}
                    >
                      {idx + 1}. {spokeName.split(' (')[0]}
                    </button>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Column: Information Display Box (Royal Gilded Scroll Plaque) */}
            <div className="lg:col-span-6 flex flex-col justify-center min-h-[300px]">
              <motion.div
                key={selectedSpoke}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative p-6 md:p-8 rounded-3xl border-2 border-gold/30 dark:border-gold/20 shadow-[0_15px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.7)] overflow-hidden bg-gradient-to-br from-white/95 via-[#FAF7F0]/98 to-[#F3ECE0]/95 dark:from-[#140b24]/90 dark:via-[#090414]/95 dark:to-[#030107]/90 backdrop-blur-md select-text"
              >
                {/* Gilded Inner Border line */}
                <div className="absolute inset-1.5 border border-gold/15 rounded-[22px] pointer-events-none" />

                {/* Royal Corner Ornaments */}
                <div className="absolute top-3.5 left-3.5 w-3 h-3 border-t border-l border-gold/50 pointer-events-none" />
                <div className="absolute top-3.5 right-3.5 w-3 h-3 border-t border-r border-gold/50 pointer-events-none" />
                <div className="absolute bottom-3.5 left-3.5 w-3 h-3 border-b border-l border-gold/50 pointer-events-none" />
                <div className="absolute bottom-3.5 right-3.5 w-3 h-3 border-b border-r border-gold/50 pointer-events-none" />

                {/* Sacred Scroll Header divider */}
                <div className="flex justify-center items-center gap-2 mb-3 text-gold/50 select-none text-[10px] tracking-widest font-mono">
                  <span>✦</span>
                  <div className="w-12 h-[0.5px] bg-gold/30" />
                  <span>{currentLang === "HI" ? "राज धर्म चक्र" : "ROYAL DECREE"}</span>
                  <div className="w-12 h-[0.5px] bg-gold/30" />
                  <span>✦</span>
                </div>

                <div className="flex items-center gap-4 mb-4 z-10 relative">
                  <span className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-[#8C6914] flex items-center justify-center text-lg font-serif font-extrabold text-black shadow-md border border-gold/50">
                    {selectedSpoke + 1}
                  </span>
                  <div>
                    <h3 className="text-text-main font-serif font-bold text-2xl leading-tight tracking-wide">
                      {spokesData[selectedSpoke].name}
                    </h3>
                    <span className="font-sanskrit text-saffron dark:text-gold text-sm font-bold tracking-wide">
                      {spokesData[selectedSpoke].nameSanskrit}
                    </span>
                  </div>
                </div>

                <div className="border-l-2 border-saffron dark:border-gold pl-4 py-2 my-4 bg-saffron/5 dark:bg-gold/5 rounded-r z-10 relative">
                  <p className="text-[10px] text-gold dark:text-gold-light uppercase tracking-widest font-mono font-bold">
                    {currentLang === "HI" ? "दार्शनिक तथ्य" : "Sacred Tenet"}
                  </p>
                  <p className="text-sm text-text-main leading-relaxed font-bold mt-1">
                    {spokesData[selectedSpoke].fact}
                  </p>
                </div>

                <p className="text-sm text-text-muted leading-relaxed mt-4 z-10 relative">
                  {spokesData[selectedSpoke].desc}
                </p>

                {/* Minimal Facts Footer */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gold/20 dark:border-gold/10 text-[10px] font-mono text-text-muted uppercase tracking-wider z-10 relative">
                  <div>
                    <span className="text-gold dark:text-gold-light font-bold block">{currentLang === "HI" ? "स्तम्भ" : "Chakra Pillar"}</span>
                    <span className="text-text-main/80">{spokesData[selectedSpoke].pillar}</span>
                  </div>
                  <div>
                    <span className="text-gold dark:text-gold-light font-bold block">{currentLang === "HI" ? "गुण" : "Mental Quality"}</span>
                    <span className="text-text-main/80">{spokesData[selectedSpoke].quality}</span>
                  </div>
                </div>
              </motion.div>

              {/* Summary Facts list (Minimalist layout) */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-[10px] font-mono text-text-muted uppercase tracking-widest bg-card-bg/30 border border-[var(--border-color)] p-3 rounded-xl">
                <div>
                  <span className="text-gold block font-bold">⭕ The Rim</span>
                  <span>Mindfulness & Focus</span>
                </div>
                <div className="border-t sm:border-t-0 sm:border-x border-[var(--border-color)] py-2 sm:py-0">
                  <span className="text-gold block font-bold">🎯 The Hub</span>
                  <span>Moral Discipline (Shila)</span>
                </div>
                <div>
                  <span className="text-gold block font-bold">🚀 The Motion</span>
                  <span>Cycle of Life & Law</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Chevron to Creation section */}
      <div className="w-full flex justify-center py-6 border-b border-[var(--border-color)] relative z-20">
        <a
          href="#creation"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("creation")?.scrollIntoView({ behavior: "smooth" });
            playClick();
          }}
          className="text-[#F5C242] opacity-60 hover:opacity-100 transition-opacity animate-bounce"
          aria-label="Scroll to Creation"
        >
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>

      {/* SECTION 2: THE CREATION */}
      <section
        id="creation"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg flex items-center justify-center border-t border-[var(--border-color)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--section-bg-blend)",
        }}
      >
        <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-phi-xl md:gap-phi-2xl select-text">
          <div className="flex-1 min-w-0 flex flex-col gap-phi-lg">
            <span className="text-phi-xs font-semibold text-gold uppercase tracking-widest bg-gold/15 px-phi-md py-phi-xs rounded-full w-fit">
              {activeT.cosmicDawn}
            </span>
            <h2 className="text-phi-xl md:text-phi-2xl font-serif font-bold text-text-main leading-tight">
              {activeT.creationTitle}
            </h2>
            <div className="w-phi-xl h-0.5 bg-[#B8860B]" />
            <p className="text-phi-base md:text-phi-lg text-gold font-serif leading-relaxed italic">
              &ldquo;{activeT.creationQuote}&rdquo;
            </p>
            <p className="text-text-muted text-phi-sm md:text-phi-base leading-relaxed">
              {activeT.creationDesc}
            </p>
            <p className="text-phi-xs text-gold font-mono uppercase tracking-widest mt-phi-sm">
              {activeT.creationSource}
            </p>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-phi-4xl h-phi-4xl md:w-[280px] md:h-[280px] flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-dashed border-[#B8860B25] rounded-full rotate-slow" />
              <div className="absolute inset-phi-lg border border-dotted border-[#FFD70020] rounded-full rotate-slow reverse" />
              <div className="w-phi-3xl h-phi-3xl rounded-full bg-bg border border-gold/50 flex items-center justify-center shadow-md">
                <span className="text-gold font-sanskrit text-phi-3xl md:text-phi-4xl select-none animate-pulse">ॐ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE 4 VEDAS */}
      <section
        id="vedas"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg border-t border-[var(--border-color)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--section-bg-blend)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-phi-xl md:gap-phi-2xl">
          <div className="text-center flex flex-col gap-phi-sm">
            <h2 className="text-phi-xl md:text-phi-2xl font-serif font-bold text-text-main">
              {activeT.vedasTitle}
            </h2>
            <p className="text-phi-sm md:text-phi-base text-text-muted max-w-2xl mx-auto leading-relaxed">
              {activeT.vedasDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-phi-lg md:gap-phi-xl">
            {/* Rigveda */}
            <div className="bg-card-bg border border-[var(--border-color)] rounded-xl p-phi-lg md:p-phi-xl hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(184,134,11,0.12)] flex flex-col justify-between h-full">
              <div>
                <span className="text-phi-xl block mb-phi-lg">📕</span>
                <span className="text-phi-xs text-[#B8860B] uppercase tracking-widest font-mono">10,552 Hymns</span>
                <h3 className="text-text-main text-phi-lg font-serif font-bold mt-1">Rigveda</h3>
                <p className="text-phi-xs text-text-muted mt-1 font-serif">Hymns of Cosmic Praise</p>
                <p className="text-text-muted text-phi-xs leading-relaxed mt-phi-lg">
                  Dedicated to cosmic powers (Agni, Indra, Varuna). Contains the oldest philosophical speculations, mantras, and creation stories.
                </p>
              </div>
              <Link
                href="/library?tab=vedas"
                onClick={() => playClick()}
                className="text-gold hover:text-saffron uppercase tracking-wider font-semibold mt-phi-lg block cursor-pointer no-underline"
              >
                Explore Rigveda →
              </Link>
            </div>

            {/* Yajurveda */}
            <div className="bg-card-bg border border-[var(--border-color)] rounded-xl p-phi-lg md:p-phi-xl hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(184,134,11,0.12)] flex flex-col justify-between h-full">
              <div>
                <span className="text-phi-xl block mb-phi-lg">📗</span>
                <span className="text-phi-xs text-[#B8860B] uppercase tracking-widest font-mono">1,875 Verses</span>
                <h3 className="text-text-main text-phi-lg font-serif font-bold mt-1">Yajurveda</h3>
                <p className="text-phi-xs text-text-muted mt-1 font-serif">Ritual & Sacrifice Formulas</p>
                <p className="text-text-muted text-phi-xs leading-relaxed mt-phi-lg">
                  Formulas and instructions for performing Vedic Yajnas. Bridging action (Karma) with devotion and spiritual understanding.
                </p>
              </div>
              <Link
                href="/library?tab=vedas"
                onClick={() => playClick()}
                className="text-gold hover:text-saffron uppercase tracking-wider font-semibold mt-phi-lg block cursor-pointer no-underline"
              >
                Explore Yajurveda →
              </Link>
            </div>

            {/* Samaveda */}
            <div className="bg-card-bg border border-[var(--border-color)] rounded-xl p-phi-lg md:p-phi-xl hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(184,134,11,0.12)] flex flex-col justify-between h-full">
              <div>
                <span className="text-phi-xl block mb-phi-lg">📘</span>
                <span className="text-phi-xs text-[#B8860B] uppercase tracking-widest font-mono">1,875 Verses</span>
                <h3 className="text-text-main text-phi-lg font-serif font-bold mt-1">Samaveda</h3>
                <p className="text-phi-xs text-text-muted mt-1 font-serif">Musical Chants of Harmony</p>
                <p className="text-text-muted text-phi-xs leading-relaxed mt-phi-lg">
                  Rigvedic verses set to musical patterns. The foundation of classical Indian music, intended to elevate the soul via sonic vibration.
                </p>
              </div>
              <Link
                href="/library?tab=vedas"
                onClick={() => playClick()}
                className="text-gold hover:text-saffron uppercase tracking-wider font-semibold mt-phi-lg block cursor-pointer no-underline"
              >
                Explore Samaveda →
              </Link>
            </div>

            {/* Atharvaveda */}
            <div className="bg-card-bg border border-[var(--border-color)] rounded-xl p-phi-lg md:p-phi-xl hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(184,134,11,0.12)] flex flex-col justify-between h-full">
              <div>
                <span className="text-phi-xl block mb-phi-lg">📙</span>
                <span className="text-phi-xs text-[#B8860B] uppercase tracking-widest font-mono">5,977 Hymns</span>
                <h3 className="text-text-main text-phi-lg font-serif font-bold mt-1">Atharvaveda</h3>
                <p className="text-phi-xs text-text-muted mt-1 font-serif">Wisdom for Daily Existence</p>
                <p className="text-text-muted text-phi-xs leading-relaxed mt-phi-lg">
                  Formulas for health, medicine, cosmology, society, and domestic sciences. Brings spiritual consciousness into practical life.
                </p>
              </div>
              <Link
                href="/library?tab=vedas"
                onClick={() => playClick()}
                className="text-gold hover:text-saffron uppercase tracking-wider font-semibold mt-phi-lg block cursor-pointer no-underline"
              >
                Explore Atharvaveda →
              </Link>
            </div>
          </div>

          <div className="text-center mt-phi-lg">
            <Link
              href="/library?tab=vedas"
              onClick={() => playClick()}
              className="inline-flex items-center gap-2 px-phi-xl py-phi-md border border-[var(--border-color)] hover:border-gold bg-card-bg text-gold rounded-lg font-semibold uppercase tracking-wider text-phi-xs hover:bg-[#B8860B10] transition-all duration-300 no-underline"
            >
              {activeT.exploreVedasBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE UPANISHADS */}
      <section
        id="upanishads"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg border-t border-[var(--border-color)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--section-bg-blend)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-phi-xl md:gap-phi-2xl">
          <div className="text-center flex flex-col gap-phi-sm">
            <h2 className="text-phi-xl md:text-phi-2xl font-serif font-bold text-text-main">
              {activeT.upanishadsTitle}
            </h2>
            <p className="text-phi-sm md:text-phi-base text-text-muted max-w-2xl mx-auto leading-relaxed select-text">
              {activeT.upanishadsDesc}
            </p>
          </div>

          {/* Horizontal Scrolling Quotes Strip */}
          <div className="w-full overflow-x-auto pb-phi-md scrollbar-thin scrollbar-thumb-[#B8860B20] flex gap-phi-lg select-text">
            <div className="flex-none bg-card-bg border border-[var(--border-color)] rounded-lg p-phi-md min-w-[280px]">
              <span className="text-gold-light text-phi-sm block font-sanskrit font-bold">तत् त्वम् असि</span>
              <span className="text-phi-xs text-text-muted italic block mt-1">&ldquo;That Thou Art&rdquo;</span>
              <span className="text-phi-xs text-[#B8860B] block mt-phi-lg font-mono">Chandogya Upanishad</span>
            </div>
            <div className="flex-none bg-card-bg border border-[var(--border-color)] rounded-lg p-phi-md min-w-[280px]">
              <span className="text-gold-light text-phi-sm block font-sanskrit font-bold">अहम् ब्रह्मास्मि</span>
              <span className="text-phi-xs text-text-muted italic block mt-1">&ldquo;I am Brahman&rdquo;</span>
              <span className="text-phi-xs text-[#B8860B] block mt-phi-lg font-mono">Brihadaranyaka Upanishad</span>
            </div>
            <div className="flex-none bg-card-bg border border-[var(--border-color)] rounded-lg p-phi-md min-w-[280px]">
              <span className="text-gold-light text-phi-sm block font-sanskrit font-bold">प्रज्ञानं ब्रह्म</span>
              <span className="text-phi-xs text-text-muted italic block mt-1">&ldquo;Consciousness is Brahman&rdquo;</span>
              <span className="text-phi-xs text-[#B8860B] block mt-phi-lg font-mono">Aitareya Upanishad</span>
            </div>
            <div className="flex-none bg-card-bg border border-[var(--border-color)] rounded-lg p-phi-md min-w-[280px]">
              <span className="text-gold-light text-phi-sm block font-sanskrit font-bold">अयम् आत्मा ब्रह्म</span>
              <span className="text-phi-xs text-text-muted italic block mt-1">&ldquo;This Self is Brahman&rdquo;</span>
              <span className="text-phi-xs text-[#B8860B] block mt-phi-lg font-mono">Mandukya Upanishad</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-phi-lg md:gap-phi-xl">
            {/* Isha */}
            <div className="bg-card-bg border border-[var(--border-color)] rounded-xl p-phi-md md:p-phi-lg hover:border-gold transition-colors">
              <span className="text-phi-xs text-[#B8860B] uppercase font-mono">Yajurveda</span>
              <h4 className="text-text-main text-phi-lg font-serif font-bold mt-1">Isha Upanishad</h4>
              <p className="text-text-muted text-phi-xs leading-relaxed mt-3">
                Focuses on the omnipresence of the Divine within all physical creation. Teaches the concept of spiritual renunciation and action.
              </p>
            </div>
            {/* Kena */}
            <div className="bg-card-bg border border-[var(--border-color)] rounded-xl p-phi-md md:p-phi-lg hover:border-gold transition-colors">
              <span className="text-phi-xs text-[#B8860B] uppercase font-mono">Samaveda</span>
              <h4 className="text-text-main text-phi-lg font-serif font-bold mt-1">Kena Upanishad</h4>
              <p className="text-text-muted text-phi-xs leading-relaxed mt-3">
                Investigates the ultimate force behind our senses. Concludes that Brahman is the true power behind the mind, eye, and breath.
              </p>
            </div>
            {/* Katha */}
            <div className="bg-card-bg border border-[var(--border-color)] rounded-xl p-phi-md md:p-phi-lg hover:border-gold transition-colors">
              <span className="text-phi-xs text-[#B8860B] uppercase font-mono">Yajurveda</span>
              <h4 className="text-text-main text-phi-lg font-serif font-bold mt-1">Katha Upanishad</h4>
              <p className="text-text-muted text-phi-xs leading-relaxed mt-3">
                The famous dialogue between young Nachiketa and Yama (the Lord of Death) concerning the soul&apos;s survival after physical death.
              </p>
            </div>
          </div>

          <div className="text-center mt-phi-lg">
            <Link
              href="/library?tab=upanishads"
              onClick={() => playClick()}
              className="text-gold hover:text-saffron uppercase tracking-wider font-semibold cursor-pointer no-underline"
            >
              {activeT.exploreUpanishadsBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE BHAGAVAD GITA — Special Highlight */}
      <section
        id="gita"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg border-t border-[var(--border-color)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--section-bg-blend)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto border-2 border-gold/30 rounded-2xl p-phi-xl md:p-phi-2xl relative overflow-hidden bg-card-bg select-text">
          <div className="absolute top-0 right-0 w-phi-3xl h-phi-3xl bg-[#B8860B10] rounded-full blur-3xl" />
          
          <div className="relative z-10 w-full flex flex-col items-center text-center gap-phi-lg">
            <span className="inline-block text-phi-xs font-semibold text-[#FFD700] uppercase tracking-widest bg-[#B8860B15] px-phi-md py-phi-xs rounded-full">
              Srimad Bhagavad Gita
            </span>
            <h2 className="text-phi-2xl md:text-phi-3xl font-sanskrit text-text-main font-bold leading-relaxed max-w-2xl">
              {activeT.gitaTitle}
            </h2>
            <div className="w-phi-xl h-0.5 bg-[#FFD700] my-phi-xs" />
            <p className="text-phi-sm md:text-phi-base text-text-muted max-w-3xl leading-relaxed">
              &ldquo;{activeT.gitaQuote}&rdquo;
            </p>

            <div className="bg-section-alt/50 border border-[var(--border-color)] rounded-xl p-phi-lg md:p-phi-xl max-w-2xl w-full my-phi-md text-center flex flex-col items-center">
              <span className="text-phi-xs text-gold uppercase font-mono block mb-phi-xs">Featured Verse: Chapter 2, Verse 47</span>
              <p className="font-sanskrit text-gold-light text-phi-lg leading-relaxed mb-phi-lg w-full">
                कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />
                मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
              </p>
              <p className="text-text-muted text-phi-xs md:text-phi-sm leading-relaxed italic border-t border-[var(--border-color)] pt-phi-lg w-full">
                &ldquo;You have the right to perform your duty, but never to its fruits. Let not the fruits of action be your motive, nor let your attachment be to inaction.&rdquo;
              </p>
            </div>

            <span className="text-phi-xs text-text-muted font-mono block">18 Chapters | 700 Verses | The Song of God</span>

            <Link
              href="/library/gita/chapter/1"
              onClick={() => playClick()}
              className="inline-block mt-phi-md px-phi-xl py-phi-md rounded-lg bg-gradient-to-r from-[#B8860B] to-[#D4A017] text-black font-extrabold uppercase tracking-wider text-phi-xs hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 no-underline"
            >
              {activeT.readAllGitaBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE EPICS */}
      <section
        id="epics"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg border-t border-[var(--border-color)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--section-bg-blend)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-phi-xl md:gap-phi-2xl">
          <div className="text-center flex flex-col gap-phi-sm">
            <h2 className="text-phi-xl md:text-phi-2xl font-serif font-bold text-text-main">
              {activeT.epicsTitle}
            </h2>
            <p className="text-phi-sm md:text-phi-base text-text-muted max-w-2xl mx-auto leading-relaxed">
              {activeT.epicsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-phi-xl select-text">
            {/* Ramayana */}
            <div className="bg-card-bg border border-[var(--border-color)] rounded-xl p-phi-xl md:p-phi-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between">
              <div>
                <span className="text-phi-xs font-semibold text-gold uppercase tracking-widest bg-gold/15 px-phi-md py-phi-xs rounded-full">
                  Valmiki Ramayana
                </span>
                <h3 className="text-text-main font-serif text-phi-lg md:text-phi-xl font-bold mt-phi-md">
                  वाल्मीकि रामायण — 24,000 Verses
                </h3>
                <p className="text-text-muted text-phi-sm leading-relaxed mt-phi-xs italic">
                  &ldquo;The story of dharma in an ideal life&rdquo;
                </p>
                <div className="w-phi-lg h-0.5 bg-[#B8860B] my-phi-md" />
                <p className="text-text-muted text-phi-xs leading-relaxed">
                  Chronicles the life of Rama, the ideal king and human, established to demonstrate Dharmic action in family, state, and personal duty.
                </p>
                <div className="mt-phi-md flex flex-wrap gap-phi-xs">
                  {["Bala", "Ayodhya", "Aranya", "Kishkindha", "Sundara", "Yuddha", "Uttara"].map(k => (
                    <span key={k} className="text-phi-xs text-text-main bg-section-alt border border-[var(--border-color)] px-phi-sm py-phi-xs rounded">{k} Kanda</span>
                  ))}
                </div>
                <div className="mt-phi-md">
                  <span className="text-phi-xs text-[#B8860B] uppercase tracking-wider block font-bold">Key Figures:</span>
                  <span className="text-phi-sm text-text-muted block mt-phi-xs">Rama, Sita, Lakshmana, Hanuman, Ravana, Valmiki</span>
                </div>
              </div>
              <Link
                href="/library?tab=epics"
                onClick={() => playClick()}
                className="mt-phi-xl px-phi-xl py-phi-md rounded-lg border border-[#B8860B50] hover:border-[#FFD700] bg-bg text-gold text-center font-bold uppercase tracking-wider text-phi-xs hover:bg-[#B8860B10] transition-all no-underline"
              >
                Read Ramayana
              </Link>
            </div>

            {/* Mahabharata */}
            <div className="bg-card-bg border border-[var(--border-color)] rounded-xl p-phi-xl md:p-phi-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between">
              <div>
                <span className="text-phi-xs font-semibold text-[#FB923C] uppercase tracking-widest bg-[#FB923C15] px-phi-md py-phi-xs rounded-full">
                  Veda Vyasa Epic
                </span>
                <h3 className="text-text-main font-serif text-phi-lg md:text-phi-xl font-bold mt-phi-md">
                  महाभारत — 1,00,000+ Verses
                </h3>
                <p className="text-text-muted text-phi-sm leading-relaxed mt-phi-xs italic">
                  &ldquo;The story of dharma in complex reality&rdquo;
                </p>
                <div className="w-phi-lg h-0.5 bg-[#FB923C] my-phi-md" />
                <p className="text-text-muted text-phi-xs leading-relaxed">
                  The world&apos;s longest epic, exploring family feud, politics, ethics, statecraft, and the ultimate victory of truth on the battlefield of Kurukshetra.
                </p>
                <div className="mt-phi-md flex flex-wrap gap-phi-xs">
                  {["Adi", "Sabha", "Vana", "Virata", "Udyoga", "Bhishma", "Drona", "Karna", "Shalya"].map(p => (
                    <span key={p} className="text-phi-xs text-text-main bg-section-alt border border-[var(--border-color)] px-phi-sm py-phi-xs rounded">{p} Parva</span>
                  ))}
                </div>
                <div className="mt-phi-md">
                  <span className="text-phi-xs text-[#FB923C] uppercase tracking-wider block font-bold">Key Figures:</span>
                  <span className="text-phi-sm text-text-muted block mt-phi-xs">Krishna, Arjuna, Yudhishthira, Bhima, Draupadi, Vyasa</span>
                </div>
              </div>
              <Link
                href="/library?tab=epics"
                onClick={() => playClick()}
                className="mt-phi-xl px-phi-xl py-phi-md rounded-lg border border-[#FB923C50] hover:border-[#FFD700] bg-bg text-gold text-center font-bold uppercase tracking-wider text-phi-xs hover:bg-[#FB923C10] transition-all no-underline"
              >
                Read Mahabharata
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: THE 18 PURANAS */}
      <section
        id="puranas"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg border-t border-[var(--border-color)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--section-bg-blend)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-phi-xl md:gap-phi-2xl">
          <div className="text-center flex flex-col gap-phi-sm">
            <h2 className="text-phi-xl md:text-phi-2xl font-serif font-bold text-text-main">
              {activeT.puranasTitle}
            </h2>
            <p className="text-phi-sm md:text-phi-base text-text-muted max-w-2xl mx-auto leading-relaxed">
              {activeT.puranasDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-phi-md">
            {[
              { name: "Brahma Purana", deity: "Brahma", verses: "10,000" },
              { name: "Padma Purana", deity: "Vishnu", verses: "55,000" },
              { name: "Vishnu Purana", deity: "Vishnu", verses: "23,000" },
              { name: "Shiva Purana", deity: "Shiva", verses: "24,000" },
              { name: "Bhagavata Purana", deity: "Vishnu", verses: "18,000" },
              { name: "Narada Purana", deity: "Vishnu", verses: "25,000" },
              { name: "Markandeya", deity: "Devi/Brahma", verses: "9,000" },
              { name: "Agni Purana", deity: "Shiva", verses: "15,400" },
              { name: "Bhavishya", deity: "Brahma", verses: "14,500" },
              { name: "Brahma Vaivarta", deity: "Krishna", verses: "18,000" },
              { name: "Linga Purana", deity: "Shiva", verses: "11,000" },
              { name: "Varaha Purana", deity: "Vishnu", verses: "10,000" },
              { name: "Skanda Purana", deity: "Shiva/Kartikeya", verses: "81,100" },
              { name: "Vamana Purana", deity: "Vishnu", verses: "10,000" },
              { name: "Kurma Purana", deity: "Vishnu", verses: "17,000" },
              { name: "Matsya Purana", deity: "Vishnu", verses: "14,000" },
              { name: "Garuda Purana", deity: "Vishnu", verses: "19,000" },
              { name: "Brahmanda", deity: "Brahma", verses: "12,000" },
            ].map(p => (
              <div key={p.name} className="bg-card-bg border border-[var(--border-color)] hover:border-[#FFD700] rounded-xl p-phi-lg transition-colors flex flex-col justify-between">
                <div>
                  <h4 className="text-text-main text-phi-sm font-serif font-bold leading-tight">{p.name}</h4>
                  <span className="text-phi-xs text-[#B8860B] block mt-phi-xs uppercase font-mono">{p.deity}</span>
                </div>
                <span className="text-phi-xs text-text-muted block mt-phi-sm font-mono border-t border-[var(--border-color)] pt-phi-sm">{p.verses} verses</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: GODS & GODDESSES */}
      <section
        id="deities"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg border-t border-[var(--border-color)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--section-bg-blend)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-phi-xl md:gap-phi-2xl">
          <div className="text-center flex flex-col gap-phi-sm">
            <h2 className="text-phi-xl md:text-phi-2xl font-serif font-bold text-text-main">
              {activeT.deitiesTitle}
            </h2>
            <p className="text-phi-sm md:text-phi-base text-text-muted max-w-2xl mx-auto leading-relaxed">
              {activeT.deitiesDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-phi-lg">
            {[
              { name: "Brahma", nameSanskrit: "ब्रह्मा", emoji: "👑", epithet: "The Creator" },
              { name: "Vishnu", nameSanskrit: "विष्णु", emoji: "🐚", epithet: "The Preserver" },
              { name: "Shiva", nameSanskrit: "शिव", emoji: "🔱", epithet: "The Destroyer" },
              { name: "Saraswati", nameSanskrit: "सरस्वती", emoji: "🪕", epithet: "Goddess of Knowledge" },
              { name: "Lakshmi", nameSanskrit: "लक्ष्मी", emoji: "🪷", epithet: "Goddess of Wealth" },
              { name: "Parvati", nameSanskrit: "पार्वती", emoji: "🏔️", epithet: "Goddess of Power" },
              { name: "Ganesha", nameSanskrit: "गणेश", emoji: "🐘", epithet: "Obstacle Remover" },
              { name: "Kartikeya", nameSanskrit: "कार्तिकेय", emoji: "🦚", epithet: "Divine Commander" },
              { name: "Hanuman", nameSanskrit: "हनुमान", emoji: "🐒", epithet: "Ultimate Devotee" },
              { name: "Durga", nameSanskrit: "दुर्गा", emoji: "🦁", epithet: "Divine Protector" },
              { name: "Kali", nameSanskrit: "काली", emoji: "🩸", epithet: "Cosmic Transformer" },
              { name: "Rama", nameSanskrit: "राम", emoji: "🏹", epithet: "Lord of Righteousness" },
              { name: "Krishna", nameSanskrit: "कृष्ण", emoji: "🪈", epithet: "Lord of Divine Love" },
            ].map(d => (
              <Link
                key={d.name}
                href={`/deities/${d.name.toLowerCase()}`}
                onClick={() => playClick()}
                className="bg-card-bg border border-[var(--border-color)] hover:border-[#FFD700] rounded-xl p-phi-lg text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(184,134,11,0.1)] flex flex-col items-center gap-phi-sm group cursor-pointer no-underline animate-fade-in"
              >
                <div className="w-phi-2xl h-phi-2xl rounded-full bg-bg border border-[var(--border-color)] flex items-center justify-center text-phi-xl group-hover:scale-110 transition-transform">
                  {d.emoji}
                </div>
                <div>
                  <h4 className="text-text-main text-phi-sm font-bold font-serif">{d.name}</h4>
                  <span className="font-sanskrit text-phi-xs text-[#B8860B] block mt-phi-xs">{d.nameSanskrit}</span>
                  <span className="text-phi-xs text-text-muted block mt-phi-sm leading-tight">{d.epithet}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-phi-lg">
            <Link
              href="/deities"
              onClick={() => playClick()}
              className="inline-flex items-center gap-2 px-phi-xl py-phi-md border border-[var(--border-color)] hover:border-gold bg-card-bg text-gold rounded-lg font-semibold uppercase tracking-wider text-phi-xs hover:bg-[#B8860B10] transition-all duration-300 no-underline"
            >
              {activeT.exploreDeitiesBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9: THE DHARMA TREE */}
      <section
        id="tree"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg border-t border-[var(--border-color)] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--section-bg-blend)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-phi-xl md:gap-phi-2xl">
          <div className="text-center flex flex-col gap-phi-sm mb-6">
            <h2 className="text-phi-xl md:text-phi-2xl font-serif font-bold text-text-main">
              {activeT.treeTitle}
            </h2>
            <p className="text-phi-sm md:text-phi-base text-text-muted max-w-2xl mx-auto leading-relaxed">
              {activeT.treeDesc}
            </p>
          </div>

          {/* Interactive SVG Dharma Tree Container */}
          <div className="w-full flex flex-col items-center gap-8 relative pt-phi-md">
            
            {/* The SVG Canvas */}
            <div className="w-full overflow-x-auto overflow-y-visible flex justify-center py-4 select-none">
              <div className="min-w-[800px] w-[800px] relative h-[520px] overflow-visible">
                <svg viewBox="0 0 800 520" className="w-full h-full overflow-visible select-none drop-shadow-[0_0_15px_rgba(245,194,66,0.15)]">
                  {/* Connecting Links */}
                  {TREE_LINKS.map((link, idx) => {
                    const sourceNode = TREE_NODES.find(n => n.id === link.source);
                    const targetNode = TREE_NODES.find(n => n.id === link.target);
                    if (!sourceNode || !targetNode) return null;
                    
                    const isSelectedPath = selectedTreeNode === sourceNode.id || selectedTreeNode === targetNode.id;
                    const dy = targetNode.y - sourceNode.y;
                    const pathD = `M ${sourceNode.x} ${sourceNode.y} C ${sourceNode.x} ${sourceNode.y + dy * 0.5}, ${targetNode.x} ${sourceNode.y + dy * 0.5}, ${targetNode.x} ${targetNode.y}`;

                    return (
                      <motion.path
                        key={`link-${idx}`}
                        d={pathD}
                        fill="none"
                        stroke={isSelectedPath ? "var(--accent-gold)" : "var(--border-gold)"}
                        strokeWidth={isSelectedPath ? 3.0 : 1.5}
                        strokeDasharray={isSelectedPath ? "none" : "5,4"}
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: idx * 0.05 }}
                      />
                    );
                  })}

                  {/* Interactive Nodes */}
                  {TREE_NODES.map((node) => {
                    const isSelected = selectedTreeNode === node.id;
                    const isRoot = node.type === "root";
                    const isBranch = node.type === "branch";
                    
                    return (
                      <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                        <motion.g
                          className="cursor-pointer group"
                          onClick={() => {
                            setSelectedTreeNode(isSelected ? null : node.id);
                            playClick();
                          }}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          {/* Custom SVG Leaf/Medallion/Lotus Render */}
                          {isRoot ? (
                            <>
                              {/* Lotus petals back glow */}
                              <g className="transition-all duration-300">
                                <path d="M 0 -35 C 10 -25, 15 -10, 0 35 C -15 -10, -10 -25, 0 -35 Z" fill="none" stroke={isSelected ? "var(--accent-gold)" : "var(--accent-saffron)"} strokeWidth={isSelected ? 2.5 : 1.5} transform="rotate(0)" opacity="0.85" />
                                <path d="M 0 -35 C 10 -25, 15 -10, 0 35 C -15 -10, -10 -25, 0 -35 Z" fill="none" stroke={isSelected ? "var(--accent-gold)" : "var(--accent-saffron)"} strokeWidth={isSelected ? 2.5 : 1.5} transform="rotate(45)" opacity="0.85" />
                                <path d="M 0 -35 C 10 -25, 15 -10, 0 35 C -15 -10, -10 -25, 0 -35 Z" fill="none" stroke={isSelected ? "var(--accent-gold)" : "var(--accent-saffron)"} strokeWidth={isSelected ? 2.5 : 1.5} transform="rotate(90)" opacity="0.85" />
                                <path d="M 0 -35 C 10 -25, 15 -10, 0 35 C -15 -10, -10 -25, 0 -35 Z" fill="none" stroke={isSelected ? "var(--accent-gold)" : "var(--accent-saffron)"} strokeWidth={isSelected ? 2.5 : 1.5} transform="rotate(135)" opacity="0.85" />
                              </g>
                              <circle
                                cx="0"
                                cy="0"
                                r="28"
                                fill="var(--bg-card)"
                                stroke={isSelected ? "var(--accent-gold)" : "var(--accent-saffron)"}
                                strokeWidth={isSelected ? 3.5 : 2}
                                style={{
                                  filter: isSelected ? "drop-shadow(0 0 15px rgba(245, 194, 66, 0.6))" : "none"
                                }}
                              />
                            </>
                          ) : isBranch ? (
                            <rect
                              x="-24"
                              y="-24"
                              width="48"
                              height="48"
                              rx="12"
                              transform="rotate(45)"
                              fill="var(--bg-card)"
                              stroke={isSelected ? "var(--accent-gold)" : "var(--border-gold)"}
                              strokeWidth={isSelected ? 3 : 2}
                              style={{
                                filter: isSelected ? "drop-shadow(0 0 12px rgba(245, 194, 66, 0.5))" : "none"
                              }}
                            />
                          ) : (
                            <path
                              d="M 0 -22 C 12 -11, 16 5, 0 22 C -16 5, -12 -11, 0 -22 Z"
                              fill="var(--bg-card)"
                              stroke={isSelected ? "var(--accent-gold)" : "var(--border-gold)"}
                              strokeWidth={isSelected ? 2.5 : 1.5}
                              style={{
                                filter: isSelected ? "drop-shadow(0 0 10px rgba(245, 194, 66, 0.4))" : "none"
                              }}
                            />
                          )}

                          {/* Animated Dash ring for selection */}
                          {isSelected && (
                            <circle
                              cx="0"
                              cy="0"
                              r={isRoot ? 44 : isBranch ? 36 : 30}
                              fill="none"
                              stroke="var(--accent-gold)"
                              strokeWidth="1.5"
                              strokeDasharray="6,4"
                              className="animate-spin"
                              style={{ animationDuration: "12s" }}
                            />
                          )}
                          {/* Emoji Symbol */}
                          <text
                            x="0"
                            y="1"
                            textAnchor="middle"
                            dominantBaseline="central"
                            style={{ fontSize: isRoot ? "20px" : isBranch ? "16px" : "12px" }}
                          >
                            {node.icon}
                          </text>
                          {/* Title label underneath node */}
                          <text
                            x="0"
                            y={isRoot ? 50 : isBranch ? 42 : 35}
                            textAnchor="middle"
                            fill="var(--text-primary)"
                            className="font-serif text-[11px] font-extrabold select-none tracking-wide group-hover:fill-gold transition-colors"
                          >
                            {currentLang === "HI" ? node.nameSanskrit : node.name}
                          </text>
                        </motion.g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Glassmorphic Info Box for Selected Node */}
            <div className="w-full max-w-4xl min-h-[160px] transition-all duration-500">
              {selectedTreeNode ? (
                (() => {
                  const node = TREE_NODES.find(n => n.id === selectedTreeNode);
                  if (!node) return null;
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="ag-glass-premium p-6 md:p-8 border border-[var(--border-gold)]/40 shadow-2xl relative select-text"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTreeNode(null);
                          playClick();
                        }}
                        className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors cursor-pointer text-sm font-semibold"
                      >
                        ✕ Close
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        {/* Left Column: Customized Illustration */}
                        <div className="md:col-span-4 flex justify-center">
                          <div className="relative w-full aspect-[4/3] max-w-[260px] rounded-xl overflow-hidden border border-[var(--border-gold)]/50 shadow-[0_8px_25px_rgba(0,0,0,0.25)] group">
                            <Image
                              src={node.image}
                              alt={node.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 260px"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </div>

                        {/* Right Column: Node Details */}
                        <div className="md:col-span-8 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="text-2xl">{node.icon}</span>
                            <div>
                              <h3 className="text-text-main font-serif font-bold text-xl leading-tight">
                                {node.name}
                              </h3>
                              <span className="font-sanskrit text-gold text-sm font-bold">
                                {node.nameSanskrit}
                              </span>
                            </div>
                            <span className="text-[10px] text-gold uppercase tracking-wider font-mono font-bold bg-gold/10 px-2 py-0.5 rounded border border-gold/30 ml-auto md:ml-0">
                              {node.type === "root" ? (currentLang === "HI" ? "मूलम्" : "Root") : node.type === "branch" ? (currentLang === "HI" ? "शाखा" : "Branch") : (currentLang === "HI" ? "पत्रम्" : "Leaf")}
                            </span>
                          </div>

                          {node.quote && (
                            <div className="border-l-2 border-gold/45 pl-4 py-1.5 my-3 bg-gold/5 rounded-r">
                              <p className="font-sanskrit text-gold text-phi-sm leading-relaxed font-bold">
                                {node.quote}
                              </p>
                              {node.quoteTranslation && (
                                <p className="text-[11px] text-text-muted italic leading-normal mt-0.5">
                                  &ldquo;{node.quoteTranslation}&rdquo;
                                </p>
                              )}
                            </div>
                          )}

                          <p className="text-phi-sm text-text-muted leading-relaxed mt-2">
                            {node.description}
                          </p>

                          {/* Quick Navigation Action Button */}
                          <div className="mt-4 flex gap-3">
                            <a
                              href={`#${node.id === "sanatan" ? "creation" : node.id === "buddhism" ? "living" : node.id === "sikhism" ? "living" : node.id}`}
                              onClick={(e) => {
                                const targetId = node.id === "sanatan" ? "creation" : node.id === "buddhism" ? "living" : node.id === "sikhism" ? "living" : node.id;
                                const element = document.getElementById(targetId);
                                if (element) {
                                  e.preventDefault();
                                  element.scrollIntoView({ behavior: "smooth" });
                                  playClick();
                                }
                              }}
                              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-gold hover:text-saffron transition-colors cursor-pointer no-underline border-b border-dashed border-gold hover:border-saffron pb-0.5"
                            >
                              Explore Section &rarr;
                            </a>
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  );
                })()
              ) : (
                <div className="border border-dashed border-[var(--border-gold)]/40 bg-transparent rounded-2xl p-6 flex items-center justify-center text-center">
                  <p className="text-phi-sm text-text-muted">
                    * Interactive cosmic mapping: Click any node of the Dharma Tree above to reveal seers&apos; lineages and sacred teachings.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10: LIVING DHARMA TODAY */}
      <section
        id="living"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg border-t border-[var(--border-color)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--section-bg-blend)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-phi-xl md:gap-phi-2xl">
          <div className="text-center flex flex-col gap-phi-sm">
            <h2 className="text-phi-xl md:text-phi-2xl font-serif font-bold text-text-main">
              {activeT.livingTitle}
            </h2>
            <p className="text-phi-sm md:text-phi-base text-text-muted max-w-2xl mx-auto leading-relaxed">
              {activeT.livingDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-phi-lg">
            <div className="bg-card-bg border border-[var(--border-color)] p-phi-lg rounded-xl flex gap-phi-lg">
              <span className="text-phi-xl">🧘‍♂️</span>
              <div>
                <h4 className="text-text-main font-serif font-bold text-phi-lg">Yoga</h4>
                <p className="text-phi-xs text-text-muted leading-relaxed mt-phi-xs">
                  Over 300 million practitioners globally. Cultivating union of breath, body, and consciousness.
                </p>
              </div>
            </div>

            <div className="bg-card-bg border border-[var(--border-color)] p-phi-lg rounded-xl flex gap-phi-lg">
              <span className="text-phi-xl">🌱</span>
              <div>
                <h4 className="text-text-main font-serif font-bold text-phi-lg">Ayurveda</h4>
                <p className="text-phi-xs text-text-muted leading-relaxed mt-phi-xs">
                  Science of longevity and natural healing. Balancing energies (Doshas) through lifestyle and herbs.
                </p>
              </div>
            </div>

            <div className="bg-card-bg border border-[var(--border-color)] p-phi-lg rounded-xl flex gap-phi-lg">
              <span className="text-phi-xl">🕯️</span>
              <div>
                <h4 className="text-text-main font-serif font-bold text-phi-lg">Meditation</h4>
                <p className="text-phi-xs text-text-muted leading-relaxed mt-phi-xs">
                  Dhyana and mindfulness derived from Upanishadic practice, cultivating tranquility and direct realization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: SCRIPTURE DOWNLOAD CTA */}
      <section
        id="downloads"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg border-t border-[var(--border-color)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--section-bg-blend)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto bg-gradient-to-r from-section-alt via-card-bg to-section-alt border border-[var(--border-color)] rounded-2xl p-phi-xl md:p-phi-2xl text-center flex flex-col items-center gap-phi-lg">
          <span className="inline-block text-phi-xs font-semibold text-[#FFD700] uppercase tracking-widest bg-[#B8860B15] px-phi-md py-phi-xs rounded-full">
            Universal Knowledge Library
          </span>
          <h2 className="text-phi-xl md:text-phi-2xl font-serif font-bold text-text-main max-w-2xl">
            {activeT.downloadsTitle}
          </h2>
          <p className="text-phi-sm md:text-phi-base text-text-muted max-w-2xl leading-relaxed">
            {activeT.downloadsDesc}
          </p>

          <div className="flex flex-wrap justify-center gap-phi-xl text-text-muted text-phi-xs font-mono my-phi-xs">
            <span>📚 50+ Sacred Texts</span>
            <span>✍️ 500,000+ Verses</span>
            <span>🌐 3 Languages (SA/HI/EN)</span>
          </div>

          <Link
            href="/downloads"
            onClick={() => playClick()}
            className="inline-block px-phi-xl py-phi-md rounded-lg bg-gradient-to-r from-[#B8860B] to-[#D4A017] text-black font-extrabold uppercase tracking-wider text-phi-xs hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 no-underline"
          >
            {activeT.downloadsBtn}
          </Link>
        </div>
      </section>

      {/* SECTION 12: DAILY SHLOKA */}
      <section
        id="shloka"
        className="w-full py-phi-3xl md:py-phi-4xl px-phi-lg border-t border-[var(--border-color)] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "var(--section-bg-blend)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-phi-lg text-center flex flex-col items-center">
          <div className="flex items-center gap-phi-md w-full mb-phi-xl">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#B8860B] opacity-40" />
            <span className="text-phi-lg text-[#B8860B]">📿</span>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#B8860B] opacity-40" />
          </div>

          <span className="font-heading text-phi-sm md:text-phi-base uppercase tracking-wider text-[#B8860B] font-bold mb-phi-lg block">
            {activeT.shlokaTitle}
          </span>

          <div className="w-full max-w-3xl mx-auto select-text flex flex-col items-center gap-phi-lg text-center">
            <p className="font-sanskrit text-phi-xl md:text-phi-2xl text-gold leading-relaxed whitespace-pre-line px-phi-lg font-bold w-full">
              {verse.sanskrit}
            </p>

            <p className="text-phi-sm md:text-phi-base text-text-muted italic leading-relaxed whitespace-pre-line px-phi-lg w-full">
              {verse.transliteration}
            </p>

            <div className="w-phi-xl h-0.5 bg-[var(--border-color)] my-phi-xs" />

            <p className="text-phi-base text-text-main leading-relaxed max-w-2xl px-phi-lg w-full">
              <span className="font-bold text-[#B8860B] mr-phi-sm">हिन्दी:</span>
              {verse.hindi}
            </p>

            <p className="text-phi-sm md:text-phi-base text-text-muted leading-relaxed max-w-2xl px-phi-lg w-full">
              <span className="font-bold text-gold mr-phi-sm">English:</span>
              {verse.english}
            </p>

            <span className="font-heading text-phi-sm md:text-phi-base font-bold text-gold mt-phi-xs block">
              {currentLang === "EN" ? verse.source : `${verse.source} (${verse.sourceHindi})`}
            </span>
          </div>

          <div className="flex items-center justify-center gap-phi-md mt-phi-xl z-10 w-full">
            <button 
              onClick={handleListenChant}
              className="flex items-center gap-phi-sm px-phi-md py-phi-sm rounded bg-gradient-to-r from-[#B8860B] to-[#D4A017] text-black font-semibold text-phi-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer border-none"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Chant</span>
            </button>

            <button 
              onClick={handleShareShloka}
              className="flex items-center gap-phi-sm px-phi-md py-phi-sm rounded border border-[var(--border-color)] text-text-muted hover:text-text-main text-phi-xs uppercase tracking-wider bg-card-bg hover:bg-section-alt transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>

            <button 
              onClick={handleCopyShloka}
              className="flex items-center gap-phi-sm px-phi-md py-phi-sm rounded border border-[var(--border-color)] text-text-muted hover:text-text-main text-phi-xs uppercase tracking-wider bg-card-bg hover:bg-section-alt transition-colors min-w-[90px] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-phi-md w-full mt-phi-xl">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#B8860B] opacity-40" />
            <span className="text-phi-lg text-[#B8860B]">📿</span>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#B8860B] opacity-40" />
          </div>
        </div>
      </section>

    </div>
  );
}
