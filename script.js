  // Écran de chargement : affiché un court instant fixe pour l'effet de marque,
  // indépendamment du chargement de la vidéo de présentation (2 Mo, chargée en
  // tâche de fond) qui ne doit pas retarder l'ouverture du site.
  (function(){
    var loader = document.getElementById('pageLoader');
    if (!loader) return;
    var MIN_DISPLAY_MS = 2000;
    setTimeout(function(){
      loader.classList.add('hide');
      setTimeout(function(){ loader.remove(); }, 550); // laisse la transition CSS se terminer
    }, MIN_DISPLAY_MS);
  })();

  var WHATSAPP_NUMBER = '21653117158';

  var animatedSections = [
    document.querySelector('.hero'),
    document.querySelector('.service-grid'),
    document.querySelector('.consultation'),
    document.querySelector('.reason-grid'),
    document.querySelector('.stamps')
  ].filter(Boolean);

  if (animatedSections.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    animatedSections.forEach(function(section){
      observer.observe(section);
    });
  } else {
    animatedSections.forEach(function(section){
      section.classList.add('in-view');
    });
  }

  /* ==================================================================
     Bilingue FR / AR
     Le français reste la langue d'origine, écrite en dur dans le HTML.
     On la "capture" une fois au chargement (captureFrenchStrings) pour
     pouvoir y revenir ; seul l'arabe est à traduire dans AR_DICT.
     ================================================================== */
  var currentLang = 'fr';
  var I18N_FR = {};
  var I18N_FR_ATTR = {};

  var AR_DICT = {
    'nav.services': 'الخدمات',
    'nav.process': 'كيف يعمل الأمر',
    'nav.tarifs': 'الأسعار',
    'nav.consultation': 'المحاكاة',
    'nav.faq': 'الأسئلة',
    'theme.dark': 'الوضع الداكن',
    'header.whatsapp': 'واتساب',
    'hero.eyebrow': 'مساعدة في ملفات التأشيرة — تونس',
    'hero.headline': 'ملف تأشيرة <em>مُعدّ جيدًا</em> نادرًا ما يُرفض.',
    'hero.sub': 'نُجهّز ملفكم من الألف إلى الياء لفرنسا وإيطاليا وإسبانيا ومالطا وكندا — سياحة، عمل، دراسة أو لمّ شمل عائلي. أنتم ترسلون مستنداتكم، ونحن نتكفّل بالباقي.',
    'hero.cta1': 'شاهد السعر والمستندات المطلوبة ←',
    'hero.cta2': 'راسلنا على واتساب',
    'hero.reassure1': 'مجاني وبدون التزام',
    'hero.reassure2': 'الرد في أقل من ساعة، من 8 صباحًا إلى 8 مساءً',
    'hero.reassure3': 'السعر مُعلن قبل البدء',
    'hero.badge1': 'فرنسا · إيطاليا · إسبانيا · مالطا · كندا',
    'hero.badge2': '100% من الملفات مُدقّقة',
    'hero.badge3': 'الرد خلال ساعة · من 8 إلى 20',
    'hero.videoChip': 'شاهد فيديو التعريف',
    'video.unsupported': 'متصفحكم لا يدعم تشغيل الفيديو.',
    'destinations.label': 'الوجهات المتاحة',
    'destinations.title': 'خمس دول، جميع فئات التأشيرات',
    'destinations.hint': '👆 اضغطوا على دولة لبدء المحاكاة بهذه الوجهة.',
    'stamp.france': 'فرنسا',
    'stamp.cat': 'جميع الفئات',
    'stamp.italie': 'إيطاليا',
    'stamp.espagne': 'إسبانيا',
    'stamp.malte': 'مالطا',
    'stamp.canada': 'كندا',
    'services.label': 'ما نُجهّزه لكم',
    'services.title': 'خدمة كاملة، دولة بدولة',
    'service.france.title': 'تأشيرة فرنسا',
    'service.france.desc': 'إقامة قصيرة شنغن، سياحة، دراسة، لمّ شمل عائلي. تجهيز الملف، الاستمارة، وحجز الموعد.',
    'service.italie.title': 'تأشيرة إيطاليا',
    'service.italie.desc': 'سياحة، عمل موسمي، دراسة. التحقق من المستندات وتنسيقها وفق متطلبات القنصلية.',
    'service.espagne.title': 'تأشيرة إسبانيا',
    'service.espagne.desc': 'سياحة، طالب، عمل. تجهيز الملف والتحقق من المستندات وفق متطلبات القنصلية.',
    'service.malte.title': 'تأشيرة مالطا',
    'service.malte.desc': 'إقامة قصيرة، دراسة، عمل. ملف كامل ومتابعة حتى الإيداع.',
    'service.canada.title': 'تأشيرة كندا',
    'service.canada.desc': 'زيارة، دراسة (تصريح دراسة)، عمل مؤقت. استمارات IRCC والمستندات المطلوبة.',
    'service.timbres.title': 'الطوابع والمدفوعات',
    'service.timbres.desc': 'الطوابع الجبائية، مصاريف الملف، والمدفوعات الإلكترونية المرتبطة بطلبكم، نتكفّل بها نيابة عنكم.',
    'service.lettres.title': 'الرسائل والشهادات',
    'service.lettres.desc': 'رسالة الدوافع، شهادة الكفالة، شهادة الإيواء — مُحررة ومنسّقة وفق المعايير القنصلية.',
    'engagements.label': 'التزاماتنا',
    'engagements.title': 'ما يمكنكم توقّعه منّا، دون استثناء',
    'engage.relecture.title': 'مراجعة قبل الإيداع',
    'engage.relecture.desc': 'تتم إعادة مراجعة كل ملف مرة ثانية قبل تسليمه، لرصد أي مستند ناقص أو تعارض.',
    'engage.confidentialite.title': 'سرّية تامة',
    'engage.confidentialite.desc': 'مستنداتكم الشخصية لا تُشارَك مع أي جهة، وتُحذف نسخها بمجرد إيداع الملف.',
    'engage.transparence.title': 'شفافية في الأسعار',
    'engage.transparence.desc': 'لا مصاريف خفية: يُعلن سعر الخدمة قبل البدء، بمعزل عن مصاريف القنصلية.',
    'engage.interlocuteur.title': 'محاور واحد فقط',
    'engage.interlocuteur.desc': 'من أول رسالة على واتساب إلى غاية إنجاز الملف، تتحدثون دائمًا مع نفس الشخص.',
    'info.where.label': 'أين نجدنا',
    'info.where.title': 'أريانة، تونس',
    'info.where.desc': 'خدمة مقرّها بوبليكنات أريانة. تواصل عن بُعد عبر واتساب، مع إمكانية الحضور شخصيًا للمستندات الأصلية أو التوقيعات.',
    'info.hours.label': 'التوفر',
    'info.hours.title': 'من 8 صباحًا إلى 8 مساءً، كل أيام العمل',
    'info.hours.desc': 'رد سريع على واتساب من 8 صباحًا إلى 8 مساءً. خارج هذا التوقيت، تتم معالجة رسالتكم فور استئناف العمل.',
    'process.label': 'كيف يعمل الأمر',
    'process.title': 'ثلاث خطوات، ملف نظيف',
    'process.step1.title': 'تراسلوننا على واتساب',
    'process.step1.desc': 'أخبرونا بالدولة ونوع التأشيرة. نرد عليكم بقائمة دقيقة بالمستندات المطلوبة.',
    'process.step2.title': 'ترسلون مستنداتكم',
    'process.step2.desc': 'عبر واتساب أو حضوريًا. نتحقق من كل مستند ونُكمله وننسّقه.',
    'process.step3.title': 'الملف جاهز للإيداع',
    'process.step3.desc': 'الاستمارات مُعبأة، المدفوعات منجزة، الموعد محجوز عند الحاجة. لم يبقَ سوى الحضور.',
    'about.label': 'من يُجهّز ملفكم',
    'about.title': 'دقة مهندس، مُطبّقة على مستنداتكم.',
    'about.h3': 'مقرّي بالبوبليكنات، على تماس يومي مع الملفات',
    'about.p1': 'أتعامل يوميًا مع المدفوعات الإلكترونية والطوابع والتقارير الإدارية. تجهيز ملفات التأشيرة يتطلب نفس الدقة: كل مستند مُدقق، وكل استمارة مُراجعة قبل الإرسال.',
    'about.p2': 'تكوين في الهندسة الإعلامية — معتاد على اتباع إجراءات صارمة وعدم ترك أي شيء للصدفة، وهو أمر مهم بشكل خاص في ملف قنصلي.',
    'about.point1': 'تحقق منهجي من قائمة المستندات قبل أي إيداع، لتفادي الرفض بسبب ملف ناقص.',
    'about.point2': 'محاور واحد فقط من أول رسالة إلى غاية إنجاز الملف — دون تحويل بين عدة أشخاص.',
    'about.point3': 'سرّية مستنداتكم الشخصية وحذف النسخ بمجرد إيداع الملف.',
    'reasons.label': 'ما يجب معرفته قبل الإيداع',
    'reasons.title': 'خمسة أسباب للرفض يمكن تفاديها معًا',
    'reasons.hint': 'معظم حالات الرفض لا تعود إلى وضعيتكم، بل إلى طريقة إعداد الملف. إليكم ما نتحقق منه بشكل منهجي.',
    'reason1.title': 'مستند ناقص أو منتهي الصلاحية',
    'reason1.desc': 'مقتطف CNSS يتجاوز 3 أشهر، تأمين لا يغطي كامل مدة الإقامة، جواز سفر تبقى صلاحيته أقل من 6 أشهر. القنصلية لا تتصل بكم لتذكيركم: إنها تكتفي بالرفض.',
    'reason2.title': 'تعارض بين المستندات',
    'reason2.desc': 'تواريخ عطلة لا تتطابق مع الحجوزات، راتب مصرّح به يختلف عن كشف الحساب البنكي. هذا أول إشارة تنبيه لدى الموظف القنصلي.',
    'reason3.title': 'موارد تُعتبر غير كافية',
    'reason3.desc': 'حساب يُموَّل دفعة واحدة قبيل الإيداع مباشرة يُنظر إليه بريبة. نراجع كشوفاتكم البنكية مسبقًا ونوضح لكم كيفية عرض وضعيتكم الحقيقية.',
    'reason4.title': 'دافع الإقامة غير موضّح جيدًا',
    'reason4.desc': 'رسالة غامضة أو منسوخة من الإنترنت تضرّ بالملف. نُحرّر دافعًا دقيقًا ومؤرخًا ومتماسكًا مع مستنداتكم.',
    'reason5.title': 'شك في العودة إلى تونس',
    'reason5.desc': 'هذا هو السبب الأكثر شيوعًا للرفض في الإقامات القصيرة. عمل، عائلة، ممتلكات، دراسة جارية: نُبرز كل ما يربطكم بالبلاد.',
    'reasonCta.title': 'وضعيتكم خاصة؟',
    'reasonCta.desc': 'رفض سابق، وضعية بدون نشاط، أول سفرة: أخبرونا، فهذه بالضبط الملفات التي تتطلب أكبر قدر من التحضير.',
    'reasonCta.link': 'صف وضعيتك ←',
    'pricing.label': 'أسعار شفافة',
    'pricing.title': 'السعر الكامل، مُعلن قبل البدء',
    'pricing.hint': 'تُغطي هذه الأسعار عملنا في التجهيز فقط. وهي <strong>لا تشمل</strong> مصاريف القنصلية أو مركز الإيداع (TLS، VFS، Capago…) ولا الطوابع — فهذه تُحددها السلطات وتُبلَّغ لكم بشكل منفصل، دون أي هامش من جهتنا.',
    'price.tourisme.tag': 'سياحة / إقامة قصيرة',
    'price.tourisme.amount': '80 د.ت',
    'price.tourisme.note': '100 د.ت لكندا (الإيداع عبر بوابة IRCC)',
    'price.tourisme.li1': 'قائمة مستندات مُلائمة لوضعيتكم',
    'price.tourisme.li2': 'استمارة رسمية مُعبأة ومُراجعة',
    'price.tourisme.li3': 'تنسيق كامل للملف',
    'price.etudes.tag': 'دراسة / عمل',
    'price.etudes.amount': '120 د.ت',
    'price.etudes.note': '150 د.ت لكندا (تصريح دراسة أو عمل)',
    'price.etudes.li1': 'كل ما هو مشمول في عرض السياحة',
    'price.etudes.li2': 'مستندات خاصة بالدولة والمؤسسة',
    'price.etudes.li3': 'تحرير الرسائل والشهادات',
    'price.regroupement.tag': 'لمّ شمل عائلي',
    'price.regroupement.amount': '180 د.ت',
    'price.regroupement.note': 'نفس السعر لجميع الوجهات',
    'price.regroupement.li1': 'التحقق من وثائق الحالة المدنية',
    'price.regroupement.li2': 'التنسيق مع الشخص المُستقبِل',
    'price.regroupement.li3': 'ملف الموارد والسكن',
    'pricing.foot1': '<strong>وضعية خاصة؟</strong> رفض سابق، ملف مستعجل، عدة أشخاص في نفس الطلب: يُتفق على السعر حالة بحالة ويُعلن قبل بدء أي عمل.',
    'pricing.legal': 'DocVisa Tunisie هي خدمة خاصة للمساعدة في الملفات الإدارية. لسنا قنصلية ولا سفارة ولا وسيطًا معتمدًا لديهما، وليس لنا أي تأثير على القرار النهائي.',
    'consultation.label': 'المحاكاة والطلب',
    'consultation.title': 'حاكِوا ملفكم في 3 نقرات',
    'consultation.intro': 'أجيبوا عن ثلاثة أسئلة وستشاهدون فورًا السعر وقائمة المستندات المطلوب تجميعها. بدون تسجيل وبدون أي دفع في هذه المرحلة.',
    'form.step1.label': '1. الوجهة',
    'form.destination.placeholder': 'اختاروا الوجهة',
    'form.destination.france': 'فرنسا 🇫🇷',
    'form.destination.italie': 'إيطاليا 🇮🇹',
    'form.destination.espagne': 'إسبانيا 🇪🇸',
    'form.destination.malte': 'مالطا 🇲🇹',
    'form.destination.canada': 'كندا 🇨🇦',
    'form.step2.label': '2. نوع التأشيرة',
    'form.visaType.placeholder': 'اختاروا نوع التأشيرة',
    'form.visaType.tourisme': 'سياحة / إقامة قصيرة شنغن',
    'form.visaType.etudes': 'دراسة / تصريح دراسة',
    'form.visaType.travail': 'عمل / أعمال',
    'form.visaType.regroupement': 'لمّ شمل عائلي',
    'form.step3.label': '3. وضعيتكم المهنية',
    'form.profile.placeholder': 'اختاروا وضعيتكم',
    'form.profile.salarie': 'أجير / موظف (مصرّح به لدى CNSS)',
    'form.profile.gerant': 'مسيّر / رب مؤسسة / حرفي',
    'form.profile.liberale': 'مهنة حرة (طبيب، محامٍ...)',
    'form.profile.etudiant': 'طالب / تلميذ',
    'form.profile.autre': 'أخرى (بدون نشاط، متقاعد...)',
    'form.refusal.label': 'هل سبق ورُفض طلبكم؟ <em class="opt">اختياري</em>',
    'form.refusal.placeholder': 'أفضّل عدم الإجابة',
    'form.refusal.non': 'لا، هذا أول طلب لي',
    'form.refusal.nonDejaObtenu': 'لا، سبق أن حصلت على تأشيرة',
    'form.refusal.ouiMemePays': 'نعم، لنفس الدولة',
    'form.refusal.ouiAutrePays': 'نعم، لدولة أخرى',
    'result.title': '📋 خطة التحضير المقدّرة',
    'result.priceLabel': 'أجرة المرافقة',
    'result.countLabel': 'المستندات المطلوبة',
    'doc.head': 'أشّروا على ما لديكم بالفعل:',
    'doc.copy': '📋 نسخ القائمة',
    'doc.print': '🖨️ طباعة / PDF',
    'doc.disclaimer': '⚠️ هذه القائمة إرشادية وتمثل المستندات الأكثر طلبًا. القنصلية وحدها من يحدد القائمة النهائية — سنؤكدها معكم أثناء تواصلنا.',
    'contact.name.label': 'اسمكم، حتى نعرف مع من نتحدث',
    'contact.message.label': 'أي توضيح تريدون إضافته؟ <em class="opt">اختياري</em>',
    'submit.button': 'أرسل ملفي على واتساب ←',
    'form.foot.default': 'ملخصكم يُفتح جاهزًا في واتساب — تراجعونه قبل الإرسال. لا شيء يُسجَّل على هذا الموقع.',
    'faq.label': 'الأسئلة الشائعة',
    'faq.title': 'ما يُسأل أكثر',
    'faq1.q': 'هل تضمنون الحصول على التأشيرة؟',
    'faq1.a': 'لا. القرار النهائي يعود حصريًا للقنصلية أو السفارة. ما أضمنه هو ملف كامل، مُعبأ بشكل صحيح ومطابق للمتطلبات — وهو ما يُقلّل بشكل كبير من خطر الرفض المرتبط بمشكلة في الملف.',
    'faq2.q': 'كم من الوقت يستغرق تجهيز الملف؟',
    'faq2.a': 'يعتمد ذلك على الدولة ونوع التأشيرة، وخاصة على سرعتكم في تزويدنا بمستنداتكم. نُعطيكم مدة دقيقة منذ أول تواصل على واتساب.',
    'faq3.q': 'ما المستندات التي يجب أن أقدّمها؟',
    'faq3.a': 'تختلف القائمة حسب الدولة (فرنسا، إيطاليا، إسبانيا، مالطا، كندا) وفئة التأشيرة (سياحة، عمل، دراسة، لمّ شمل عائلي). راسلونا بوضعيتكم على واتساب، ونرسل لكم القائمة الدقيقة.',
    'faq4.q': 'كيف يتم دفع مقابل خدماتكم؟',
    'faq4.a': 'يُعلَن السعر قبل البدء، حسب الدولة وتعقيد الملف. مصاريف الطوابع والقنصلية منفصلة وتُبلَّغ لكم بوضوح.',
    'faq5.q': 'هل يجب الحضور شخصيًا أم يمكن إنجاز كل شيء عن بُعد؟',
    'faq5.a': 'غالبية التواصل يتم عبر واتساب. قد يكون الحضور الشخصي ضروريًا لبعض المستندات الأصلية أو التوقيعات.',
    'faq6.q': 'سبق أن رُفض طلبي. هل ما زال الأمر يستحق المحاولة؟',
    'faq6.a': 'نعم، الرفض ليس نهائيًا — لكن إعادة إيداع نفس الملف كما هو يؤدي غالبًا إلى نفس النتيجة. أرسلوا لنا رسالة الرفض: السبب مذكور فيها، وانطلاقًا منه نُعيد بناء الملف مع تصحيح ما تسبب في الرفض بدقة. أخبرونا بذلك منذ أول رسالة، فهذا يُغيّر طريقة إعداد الملف.',
    'faq7.q': 'وإذا رُفضت تأشيرتي رغم تحضيركم؟ هل أُسترجع المبلغ؟',
    'faq7.a': 'أجرتنا تُقابل تجهيز الملف، وليس النتيجة — لذا تبقى مستحقة حتى في حالة الرفض، لأن العمل قد أُنجز فعلاً. في المقابل، إذا كان الرفض ناتجًا عن خطأ أو سهو من جانبنا في مستند كان من واجبنا تجهيزه، نُعيد تجهيز الملف مجانًا للطلب الجديد. أما مصاريف القنصلية، فهي غير قابلة للاسترجاع من أي جهة، مهما كانت النتيجة.',
    'faq8.q': 'ماذا يحدث لمستنداتي الشخصية؟',
    'faq8.a': 'تُستخدم فقط لتجهيز ملفكم. لا تُنقل لأي طرف ثالث، ولا تُباع ولا تُستخدم لأي غرض آخر، وتُحذف النسخ من أجهزتنا بمجرد إيداع الملف. هذا الموقع لا يجمع أي بيانات: الاستمارة أعلاه تكتفي بفتح رسالة واتساب تُراجعونها قبل إرسالها.',
    'faq9.q': 'هل تشمل أسعاركم مصاريف القنصلية والطوابع؟',
    'faq9.a': 'لا، وهذا مهم: السعر المعروض (من 80 إلى 180 د.ت) يُغطي فقط عملنا في التجهيز. مصاريف التأشيرة ومصاريف مركز الإيداع والطوابع الجبائية تُحددها السلطات، وتختلف حسب الدولة، وتُبلَّغ لكم بالمبلغ الدقيق — دون أي هامش من جهتنا.',
    'faq10.q': 'هل تحجزون موعد القنصلية نيابة عني؟',
    'faq10.a': 'نعم، عندما تسمح الدولة بذلك، نتكفّل بحجز الموعد إلكترونيًا. تجدر الإشارة إلى أن مدة الحصول على موعد تعتمد كليًا على مركز الإيداع ويمكن أن تتراوح بين بضعة أيام وعدة أسابيع في المواسم المزدحمة — وهذا أمر مستقل عن عملنا، لكننا نُعلمكم به منذ البداية.',
    'faq11.q': 'هل أنتم جهة رسمية أو معتمدة من القنصليات؟',
    'faq11.a': 'لا. DocVisa Tunisie هي خدمة خاصة للمساعدة في الملفات الإدارية، مستقلة عن القنصليات والسفارات. ليس لدينا أي تواصل مميز أو تأثير على القرارات، وننصحكم بالحذر من أي شخص يدّعي عكس ذلك. قيمتنا تكمن في مكان آخر: ملف كامل، متماسك ومطابق.',
    'trust.label': 'لماذا نحن',
    'trust.title': 'جدية الملف هي ما يصنع الفرق',
    'trust1': 'خمس وجهات مغطاة: فرنسا، إيطاليا، إسبانيا، مالطا، كندا',
    'trust2': '100% من الملفات مُدقّقة قبل الإيداع، بدون أي مستند ناقص',
    'trust3': 'محاور واحد من البداية إلى النهاية، عبر واتساب',
    'finalcta.label': 'مستعدون للبدء',
    'finalcta.title': 'أرسلوا لنا رسالة، ونحن نُجهّز ملفكم.',
    'finalcta.button': 'راسلنا على واتساب ←',
    'finalcta.contact': '+216 53 117 158 · أريانة، تونس',
    'footer.brand': 'DocVisa Tunisie',
    'footer.disclaimer': 'مساعدة إدارية — ليست جهة قنصلية رسمية',
    'whatsapp.float': 'تواصل مباشر'
  };

  var AR_ATTR = {
    'hero.videoAria': 'شاهد فيديو التعريف',
    'video.close': 'إغلاق',
    'contact.name.placeholder': 'الاسم واللقب',
    'contact.message.placeholder': "مثال: السفر مبرمج يوم 15 مارس، أحتاج ترجمة محلّفة..."
  };

  function t(key) {
    var dict = (currentLang === 'ar') ? AR_DICT : I18N_FR;
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    return Object.prototype.hasOwnProperty.call(I18N_FR, key) ? I18N_FR[key] : key;
  }
  function tAttr(key) {
    var dict = (currentLang === 'ar') ? AR_ATTR : I18N_FR_ATTR;
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    return Object.prototype.hasOwnProperty.call(I18N_FR_ATTR, key) ? I18N_FR_ATTR[key] : key;
  }

  function captureFrenchStrings() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function(el){
      var key = el.getAttribute('data-i18n');
      I18N_FR[key] = (el.tagName === 'OPTION') ? el.textContent : el.innerHTML;
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-placeholder]'), function(el){
      I18N_FR_ATTR[el.getAttribute('data-i18n-placeholder')] = el.getAttribute('placeholder') || '';
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-aria-label]'), function(el){
      I18N_FR_ATTR[el.getAttribute('data-i18n-aria-label')] = el.getAttribute('aria-label') || '';
    });
  }

  function translateDom() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function(el){
      var val = t(el.getAttribute('data-i18n'));
      if (el.tagName === 'OPTION') el.textContent = val; else el.innerHTML = val;
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-placeholder]'), function(el){
      el.setAttribute('placeholder', tAttr(el.getAttribute('data-i18n-placeholder')));
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-aria-label]'), function(el){
      el.setAttribute('aria-label', tAttr(el.getAttribute('data-i18n-aria-label')));
    });
  }

  var TITLE_BY_LANG = {
    fr: 'DocVisa Tunisie — Vos dossiers de visa, sans erreur',
    ar: 'DocVisa Tunisie — ملفات التأشيرة الخاصة بكم، بدون خطأ'
  };
  var LANG_TOGGLE_LABEL = { fr: 'العربية', ar: 'Français' };
  var LANG_BUTTON_ARIA = {
    fr: 'Passer en arabe / التبديل إلى العربية',
    ar: 'التبديل إلى الفرنسية / Switch to French'
  };

  // ---- Thème (clair/sombre) : le libellé dépend à la fois du thème ET de la langue ----
  var THEME_LABELS = {
    fr: { dark: 'Mode sombre', light: 'Mode clair' },
    ar: { dark: 'الوضع الداكن', light: 'الوضع الفاتح' }
  };
  var THEME_ARIA = {
    fr: { toDark: 'Basculer vers le thème sombre', toLight: 'Basculer vers le thème clair' },
    ar: { toDark: 'التبديل إلى الوضع الداكن', toLight: 'التبديل إلى الوضع الفاتح' }
  };

  var themeToggle = document.getElementById('themeToggle');
  var langToggle = document.getElementById('langToggle');
  var langToggleLabel = document.getElementById('langToggleLabel');

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    var icon = themeToggle.querySelector('.theme-toggle-icon');
    var label = themeToggle.querySelector('.theme-toggle-label');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (label) label.textContent = theme === 'dark' ? THEME_LABELS[currentLang].light : THEME_LABELS[currentLang].dark;
    themeToggle.setAttribute('aria-label', theme === 'dark' ? THEME_ARIA[currentLang].toLight : THEME_ARIA[currentLang].toDark);
  }

  var savedTheme = localStorage.getItem('docvisa-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      var current = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('docvisa-theme', next);
    });
  }

  if (langToggle) {
    langToggle.addEventListener('click', function(){
      setLanguage(currentLang === 'ar' ? 'fr' : 'ar');
    });
  }

  // Navigation: burger menu + lien actif au défilement
  var siteNav = document.getElementById('siteNav');
  var navBurger = document.getElementById('navBurger');

  function closeNav() {
    if (!siteNav || !navBurger) return;
    siteNav.classList.remove('open');
    navBurger.setAttribute('aria-expanded', 'false');
    navBurger.setAttribute('aria-label', 'Ouvrir le menu');
  }

  if (navBurger && siteNav) {
    navBurger.addEventListener('click', function(){
      var isOpen = siteNav.classList.toggle('open');
      navBurger.setAttribute('aria-expanded', String(isOpen));
      navBurger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    // Le menu mobile se referme dès qu'on choisit une destination
    siteNav.addEventListener('click', function(e){
      if (e.target.tagName === 'A') closeNav();
    });
    document.addEventListener('click', function(e){
      if (!siteNav.contains(e.target) && !navBurger.contains(e.target)) closeNav();
    });
  }

  var navLinks = siteNav ? Array.prototype.slice.call(siteNav.querySelectorAll('a[href^="#"]')) : [];
  var navTargets = navLinks.map(function(link){
    return { link: link, section: document.querySelector(link.getAttribute('href')) };
  }).filter(function(item){ return item.section; });

  if (navTargets.length) {
    var navTicking = false;
    var syncActiveLink = function(){
      navTicking = false;
      // On considère « courante » la dernière section dont le haut est passé sous l'entête
      var probe = window.scrollY + 140;
      var current = null;
      navTargets.forEach(function(item){
        if (item.section.offsetTop <= probe) current = item;
      });
      // En bas de page, la dernière section reste active même si son haut est plus haut
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        current = navTargets[navTargets.length - 1];
      }
      navTargets.forEach(function(item){
        item.link.classList.toggle('active', item === current);
        if (item === current) {
          item.link.setAttribute('aria-current', 'true');
        } else {
          item.link.removeAttribute('aria-current');
        }
      });
    };
    window.addEventListener('scroll', function(){
      if (!navTicking) {
        navTicking = true;
        window.requestAnimationFrame(syncActiveLink);
      }
    }, { passive: true });
    window.addEventListener('resize', syncActiveLink, { passive: true });
    syncActiveLink();
  }

  // Video popup modal
  var modal = document.getElementById('videoModal');
  var modalVideo = document.getElementById('modalVideo');
  var openBtn = document.getElementById('openVideoModal');
  var closeBtn = document.getElementById('closeVideoModal');
  var lastFocusedBeforeModal = null;

  function openModal(){
    if (!modal || !modalVideo) return;
    lastFocusedBeforeModal = document.activeElement;
    modal.classList.add('open');
    modalVideo.muted = false;
    modalVideo.volume = 1;
    try { modalVideo.currentTime = 0; } catch(e){}
    var p = modalVideo.play();
    if (p && p.catch) {
      p.catch(function(){
        // Browser blocked unmuted autoplay: retry muted, then let the person unmute via controls
        modalVideo.muted = true;
        modalVideo.play().catch(function(){});
      });
    }
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }
  function closeModal(){
    if (!modal || !modalVideo) return;
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modalVideo.pause();
    document.body.style.overflow = '';
    // On rend le clavier au bouton qui a ouvert la vidéo
    if (lastFocusedBeforeModal && lastFocusedBeforeModal.focus) lastFocusedBeforeModal.focus();
    lastFocusedBeforeModal = null;
  }
  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function(e){
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      closeModal();
      closeNav();
    }
    // Tant que la vidéo est ouverte, la tabulation reste dans la fenêtre
    if (e.key === 'Tab' && modal && modal.classList.contains('open')) {
      var focusables = modal.querySelectorAll('button, video[controls], [href], [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Consultation form simulator & WhatsApp submit
  var consultationForm = document.getElementById('consultationForm');
  var simDestination = document.getElementById('simDestination');
  var simVisaType = document.getElementById('simVisaType');
  var simProfile = document.getElementById('simProfile');
  var simRefusal = document.getElementById('simRefusal');
  var simulatorResult = document.getElementById('simulatorResult');
  var resultPrice = document.getElementById('resultPrice');
  var resultCount = document.getElementById('resultCount');
  var resultNote = document.getElementById('resultNote');
  var resultDocs = document.getElementById('resultDocs');
  var docProgress = document.getElementById('docProgress');
  var copyDocsBtn = document.getElementById('copyDocsBtn');
  var printDocsBtn = document.getElementById('printDocsBtn');
  var simProgressFill = document.getElementById('simProgressFill');
  var simProgressText = document.getElementById('simProgressText');
  var simProgress = document.getElementById('simProgress');
  var formFoot = document.getElementById('formFoot');

  // ---- Contenu dynamique du simulateur, dans les deux langues ----
  var BASE_DOCS = {
    fr: [
      "Passeport en cours de validité (minimum 6 mois) + copies",
      "Formulaire de demande officiel complété et signé",
      "Photos d'identité récentes aux normes consulaires",
      "Assurance voyage couvrant toute la durée du séjour"
    ],
    ar: [
      "جواز سفر ساري المفعول (6 أشهر على الأقل) + نسخ",
      "استمارة الطلب الرسمية مُعبأة وموقعة",
      "صور شخصية حديثة مطابقة للمعايير القنصلية",
      "تأمين سفر يغطي كامل مدة الإقامة"
    ]
  };

  var DOC_DATABASE = {
    fr: {
      profiles: {
        salarie: [
          "Attestation de travail récente (originale signée)",
          "3 dernières fiches de paie originales",
          "Historique de carrière CNSS récent (Extrait de situation)"
        ],
        gerant: [
          "Copie conforme du Registre National des Entreprises (RNE)",
          "Statuts originaux de la société",
          "Déclaration d'impôts récente de la société (Patente)",
          "Relevés bancaires de la société des 3 derniers mois",
          "Attestation d'affiliation à la CNSS en tant qu'employeur (preuve d'activité réelle)"
        ],
        liberale: [
          "Attestation d'inscription récente à l'Ordre professionnel",
          "Copie de la carte professionnelle",
          "Déclaration unique des revenus (Patente personnelle)",
          "3 derniers relevés de compte bancaire professionnel"
        ],
        etudiant: [
          "Certificat d'inscription récent ou carte d'étudiant",
          "Derniers relevés de notes et diplômes obtenus",
          "Engagement de prise en charge financière légalisé par le garant",
          "Justificatifs professionnels et relevés bancaires du garant (3 mois)"
        ],
        autre: [
          "Justificatifs de ressources personnelles (retraite, titres de propriété...)",
          "Engagement financier légalisé rédigé par un garant de votre famille",
          "Justificatifs professionnels et relevés bancaires du garant (3 mois)"
        ]
      },
      types: {
        tourisme: [
          "Réservation d'hôtel confirmée ou Attestation d'hébergement officielle",
          "Réservation de billet d'avion aller-retour temporaire"
        ],
        etudes: [
          "Attestation d'admission officielle de l'établissement d'accueil",
          "Justificatif d'hébergement pour les 3 premiers mois (bail, résidence...)",
          "Justificatif de ressources financières suffisantes (compte bloqué, bourse...)"
        ],
        travail: [
          "Lettre d'invitation officielle de l'entreprise partenaire",
          "Ordre de mission signé par l'employeur en Tunisie",
          "Contrat de travail visé par les autorités compétentes (si applicable)"
        ],
        regroupement: [
          "Documents d'état civil prouvant le lien (Livret de famille, Acte de mariage)",
          "Justificatif de logement du conjoint accueillant dans le pays d'accueil",
          "Preuves de ressources stables et régulières du conjoint accueillant",
          "Copie du titre de séjour ou de la nationalité du conjoint accueillant",
          "Certificat de non-polygamie / extrait de casier judiciaire (selon le pays)"
        ]
      }
    },
    ar: {
      profiles: {
        salarie: [
          "شهادة عمل حديثة (أصلية وموقعة)",
          "آخر 3 كشوف راتب أصلية",
          "مقتطف سجل CNSS الحديث (بيان الوضعية)"
        ],
        gerant: [
          "نسخة مطابقة للأصل من السجل الوطني للمؤسسات (RNE)",
          "القانون الأساسي الأصلي للشركة",
          "التصريح الضريبي الحديث للشركة (الباتيندة)",
          "كشوفات الحساب البنكي للشركة لآخر 3 أشهر",
          "شهادة انخراط في CNSS بصفة مُشغّل (إثبات نشاط حقيقي)"
        ],
        liberale: [
          "شهادة انخراط حديثة في الهيئة المهنية",
          "نسخة من البطاقة المهنية",
          "التصريح الوحيد بالدخل (الباتيندة الشخصية)",
          "آخر 3 كشوفات حساب بنكي مهني"
        ],
        etudiant: [
          "شهادة تسجيل حديثة أو بطاقة طالب",
          "آخر كشوف نقاط والشهادات المُحصّل عليها",
          "تعهد بالتكفل المالي مُصادَق عليه من الكفيل",
          "مستندات مهنية وكشوفات بنكية للكفيل (3 أشهر)"
        ],
        autre: [
          "مستندات تثبت الموارد الشخصية (تقاعد، عقود ملكية...)",
          "تعهد مالي مُصادَق عليه من كفيل من العائلة",
          "مستندات مهنية وكشوفات بنكية للكفيل (3 أشهر)"
        ]
      },
      types: {
        tourisme: [
          "حجز فندق مؤكد أو شهادة إيواء رسمية",
          "حجز تذكرة طيران ذهاب وإياب مؤقت"
        ],
        etudes: [
          "شهادة قبول رسمية من المؤسسة المُستقبِلة",
          "إثبات سكن للثلاثة أشهر الأولى (عقد كراء، إقامة جامعية...)",
          "إثبات موارد مالية كافية (حساب مجمّد، منحة دراسية...)"
        ],
        travail: [
          "رسالة دعوة رسمية من المؤسسة الشريكة",
          "أمر بمهمة موقّع من المُشغّل في تونس",
          "عقد عمل مُؤشَّر عليه من الجهات المختصة (إن وُجد)"
        ],
        regroupement: [
          "وثائق الحالة المدنية تُثبت صلة القرابة (دفتر عائلي، عقد زواج)",
          "إثبات سكن الطرف المُستقبِل في بلد الإقامة",
          "إثبات موارد مستقرة ومنتظمة للطرف المُستقبِل",
          "نسخة من بطاقة الإقامة أو الجنسية للطرف المُستقبِل",
          "شهادة عدم تعدد الزوجات / مستخرج من السجل العدلي (حسب الدولة)"
        ]
      }
    }
  };

  // Précisions propres à chaque destination, affichées au-dessus de la liste
  var DESTINATION_NOTES = {
    fr: {
      France: "Dépôt via un centre agréé (TLScontact / VFS). Prévoyez que tous les documents en arabe soient traduits en français par un traducteur assermenté.",
      Italie: "Le consulat italien est particulièrement attentif à l'itinéraire et aux réservations : elles doivent être cohérentes entre elles, dates comprises.",
      Espagne: "Les justificatifs de ressources sont examinés de près. Comptez un montant disponible correspondant à la durée complète du séjour.",
      Malte: "Le nombre de rendez-vous disponibles est limité ; mieux vaut préparer le dossier avant même d'avoir votre créneau.",
      Canada: "La demande se dépose en ligne sur le portail IRCC : tout est numérisé, et les données biométriques sont à fournir séparément après le dépôt."
    },
    ar: {
      France: "الإيداع عبر مركز معتمد (TLScontact / VFS). تأكدوا من ترجمة كل المستندات باللغة العربية إلى الفرنسية من طرف مترجم محلّف.",
      Italie: "القنصلية الإيطالية دقيقة جدًا بخصوص برنامج السفر والحجوزات: يجب أن تكون متطابقة فيما بينها، بما في ذلك التواريخ.",
      Espagne: "تُفحص إثباتات الموارد المالية عن قرب. يجب توفر مبلغ متاح يتناسب مع كامل مدة الإقامة.",
      Malte: "عدد المواعيد المتاحة محدود؛ من الأفضل تجهيز الملف حتى قبل الحصول على الموعد.",
      Canada: "يتم تقديم الطلب إلكترونيًا عبر بوابة IRCC: كل شيء رقمي، وتُقدَّم البيانات البيومترية بشكل منفصل بعد الإيداع."
    }
  };

  var REFUSAL_NOTE = {
    fr: "Vous nous avez signalé un refus antérieur : apportez la lettre de refus lors de notre échange. Son motif exact détermine la façon de reconstruire le dossier.",
    ar: "لقد أخبرتمونا برفض سابق: أحضروا رسالة الرفض عند تواصلنا. سببها الدقيق هو ما يحدد طريقة إعادة بناء الملف."
  };

  var SIM_PROGRESS_MESSAGES = {
    fr: [
      '0 réponse sur 3 — commencez par la destination',
      '1 réponse sur 3 — plus que deux questions',
      '2 réponses sur 3 — dernière question',
      '✓ Votre estimation est prête, elle s\'affiche ci-dessous'
    ],
    ar: [
      '0 من 3 إجابات — ابدأوا بتحديد الوجهة',
      '1 من 3 إجابات — بقي سؤالان فقط',
      '2 من 3 إجابات — السؤال الأخير',
      '✓ تقديركم جاهز، يظهر أدناه'
    ]
  };

  var COPY_HEADER = { fr: 'Documents à préparer — DocVisa Tunisie', ar: 'المستندات المطلوب تحضيرها — DocVisa Tunisie' };
  var COPY_SUCCESS = { fr: '✓ Liste copiée', ar: '✓ تم نسخ القائمة' };
  var COPY_FAIL = { fr: '✕ Copie impossible', ar: '✕ تعذر النسخ' };

  var WA_LABELS = {
    fr: {
      greeting: 'Bonjour DocVisa Tunisie, je souhaite un accompagnement pour mon dossier visa.\n\n',
      name: '👤 Nom : ',
      destination: '🌍 Destination : ',
      type: '📄 Type de visa : ',
      profile: '💼 Profil : ',
      refusal: '🔁 Refus antérieur : ',
      price: '💰 Tarif estimé : ',
      docsHeader: '\n📋 Documents : ',
      docsOf: ' sur ',
      docsOwned: ' déjà en ma possession\n',
      missingHeader: 'Il me manque encore :\n',
      precisions: '\n💬 Précisions : ',
      notSpecified: 'Non renseigné'
    },
    ar: {
      greeting: 'مرحبًا DocVisa Tunisie، أرغب في مرافقة لتجهيز ملف تأشيرتي.\n\n',
      name: '👤 الاسم: ',
      destination: '🌍 الوجهة: ',
      type: '📄 نوع التأشيرة: ',
      profile: '💼 الوضعية: ',
      refusal: '🔁 رفض سابق: ',
      price: '💰 السعر التقديري: ',
      docsHeader: '\n📋 المستندات: ',
      docsOf: ' من ',
      docsOwned: ' متوفرة لدي بالفعل\n',
      missingHeader: 'ما زال ينقصني:\n',
      precisions: '\n💬 توضيحات: ',
      notSpecified: 'غير محدد'
    }
  };

  var FORM_FOOT_SUCCESS = {
    fr: '✓ WhatsApp s\'ouvre dans un nouvel onglet avec votre récapitulatif. Relisez-le, puis envoyez.',
    ar: '✓ يُفتح واتساب في نافذة جديدة مع ملخصكم. راجعوه ثم أرسلوه.'
  };
  var FORM_FOOT_ERROR_PREFIX = {
    fr: 'Votre navigateur a bloqué l\'ouverture de WhatsApp. ',
    ar: 'قام متصفحكم بحظر فتح واتساب. '
  };
  var FORM_FOOT_ERROR_LINK = {
    fr: 'Cliquez ici pour ouvrir la conversation',
    ar: 'اضغطوا هنا لفتح المحادثة'
  };

  function formatPrice(amount) {
    return currentLang === 'ar' ? (amount + ' د.ت') : (amount + ' TND');
  }
  function docCountLabel(n) {
    return currentLang === 'ar' ? (n + ' وثيقة') : (n + ' pièces');
  }
  function docProgressLabel(checked, total) {
    return currentLang === 'ar' ? (checked + ' من ' + total) : (checked + ' / ' + total);
  }

  var currentDocs = [];

  function updateProgressBar() {
    if (!simProgressFill || !simProgressText) return;
    var answered = 0;
    if (simDestination && simDestination.value) answered++;
    if (simVisaType && simVisaType.value) answered++;
    if (simProfile && simProfile.value) answered++;

    simProgressFill.style.width = (answered / 3 * 100) + '%';
    simProgressText.textContent = SIM_PROGRESS_MESSAGES[currentLang][answered];
    if (simProgress) simProgress.classList.toggle('complete', answered === 3);
  }

  function updateDocProgress() {
    if (!docProgress || !resultDocs) return;
    var boxes = resultDocs.querySelectorAll('input[type="checkbox"]');
    var checked = resultDocs.querySelectorAll('input[type="checkbox"]:checked');
    docProgress.textContent = docProgressLabel(checked.length, boxes.length);
  }

  function renderDocs(docs, preserveChecked) {
    if (!resultDocs) return;
    resultDocs.innerHTML = '';
    docs.forEach(function(doc, i) {
      var li = document.createElement('li');
      var label = document.createElement('label');
      label.className = 'doc-check';

      var box = document.createElement('input');
      box.type = 'checkbox';
      box.id = 'doc-' + i;
      if (preserveChecked && preserveChecked[i]) {
        box.checked = true;
        label.classList.add('done');
      }
      box.addEventListener('change', function(){
        label.classList.toggle('done', box.checked);
        updateDocProgress();
      });

      var text = document.createElement('span');
      text.textContent = doc;

      label.appendChild(box);
      label.appendChild(text);
      li.appendChild(label);
      resultDocs.appendChild(li);
    });
    updateDocProgress();
  }

  // preserveDocState: à true uniquement lors d'un changement de LANGUE (mêmes
  // choix, donc mêmes documents dans le même ordre) — jamais lors d'un vrai
  // changement de destination/type/profil, où les cases cochées n'auraient
  // plus de sens sur une liste de documents différente.
  function updateSimulator(preserveDocState) {
    updateProgressBar();

    var dest = simDestination ? simDestination.value : '';
    var type = simVisaType ? simVisaType.value : '';
    var prof = simProfile ? simProfile.value : '';
    var refusal = simRefusal ? simRefusal.value : '';

    if (dest && type && prof) {
      var amount;
      if (type === 'etudes' || type === 'travail') {
        amount = (dest === 'Canada') ? 150 : 120;
      } else if (type === 'regroupement') {
        amount = 180;
      } else { // tourisme
        amount = (dest === 'Canada') ? 100 : 80;
      }

      var price = formatPrice(amount);

      if (resultPrice) resultPrice.textContent = price;

      // Note contextuelle : spécificités du pays, puis rappel si refus antérieur
      if (resultNote) {
        var notes = [];
        var destNote = DESTINATION_NOTES[currentLang][dest];
        if (destNote) notes.push('ℹ️ ' + destNote);
        if (refusal === 'oui-meme-pays' || refusal === 'oui-autre-pays') notes.push('⚠️ ' + REFUSAL_NOTE[currentLang]);
        if (notes.length) {
          resultNote.innerHTML = notes.map(function(n){ return '<div>' + n + '</div>'; }).join('');
          resultNote.hidden = false;
        } else {
          resultNote.hidden = true;
        }
      }

      // On garde en mémoire les cases déjà cochées avant de régénérer la liste
      var previousChecked = null;
      if (preserveDocState && resultDocs) {
        var oldBoxes = resultDocs.querySelectorAll('input[type="checkbox"]');
        previousChecked = Array.prototype.map.call(oldBoxes, function(b){ return b.checked; });
      }

      var profileDocs = DOC_DATABASE[currentLang].profiles[prof] || [];
      var typeDocs = DOC_DATABASE[currentLang].types[type] || [];

      currentDocs = [].concat(BASE_DOCS[currentLang], profileDocs, typeDocs);
      renderDocs(currentDocs, previousChecked);

      if (resultCount) resultCount.textContent = docCountLabel(currentDocs.length);

      // Show simulator block with animation
      if (simulatorResult) {
        var wasHidden = !simulatorResult.classList.contains('show');
        simulatorResult.style.display = 'block';
        // Trigger reflow to let CSS transition work
        simulatorResult.offsetHeight;
        simulatorResult.classList.add('show');
        // À la première apparition, on amène le résultat dans le champ de vision
        if (wasHidden) {
          setTimeout(function(){
            simulatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 120);
        }
      }
    } else {
      currentDocs = [];
      if (simulatorResult) {
        simulatorResult.classList.remove('show');
        // Delay display none to let transition finish
        setTimeout(function() {
          if (!simulatorResult.classList.contains('show')) {
            simulatorResult.style.display = 'none';
          }
        }, 400);
      }
    }
  }

  if (simDestination) simDestination.addEventListener('change', function(){ updateSimulator(); });
  if (simVisaType) simVisaType.addEventListener('change', function(){ updateSimulator(); });
  if (simProfile) simProfile.addEventListener('change', function(){ updateSimulator(); });
  if (simRefusal) simRefusal.addEventListener('change', function(){ updateSimulator(); });
  updateProgressBar();

  // Copier la liste des documents
  function flashButton(btn, message) {
    var original = btn.textContent;
    btn.textContent = message;
    btn.classList.add('done');
    setTimeout(function(){
      btn.textContent = original;
      btn.classList.remove('done');
    }, 2200);
  }

  if (copyDocsBtn) {
    copyDocsBtn.addEventListener('click', function(){
      if (!currentDocs.length) return;
      var header = COPY_HEADER[currentLang];
      if (simDestination && simDestination.selectedIndex > 0) {
        header += ' (' + simDestination.options[simDestination.selectedIndex].text + ')';
      }
      var text = header + '\n\n' + currentDocs.map(function(d, i){
        return (i + 1) + '. ' + d;
      }).join('\n');

      var done = function(){ flashButton(copyDocsBtn, COPY_SUCCESS[currentLang]); };
      var failed = function(){ flashButton(copyDocsBtn, COPY_FAIL[currentLang]); };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function(){ legacyCopy(text, done, failed); });
      } else {
        legacyCopy(text, done, failed);
      }
    });
  }

  // Repli pour les navigateurs sans presse-papier asynchrone (ou hors HTTPS)
  function legacyCopy(text, onSuccess, onFailure) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    if (ok) { onSuccess(); } else { onFailure(); }
  }

  if (printDocsBtn) {
    printDocsBtn.addEventListener('click', function(){
      window.print();
    });
  }

  // Connect stamps to simulator
  var stamps = document.querySelectorAll('.stamps .stamp');
  var STAMP_ARIA_LABELS = {
    France:  { fr: 'Simuler un dossier pour France',  ar: 'محاكاة ملف لفرنسا' },
    Italie:  { fr: 'Simuler un dossier pour Italie',  ar: 'محاكاة ملف لإيطاليا' },
    Espagne: { fr: 'Simuler un dossier pour Espagne', ar: 'محاكاة ملف لإسبانيا' },
    Malte:   { fr: 'Simuler un dossier pour Malte',   ar: 'محاكاة ملف لمالطا' },
    Canada:  { fr: 'Simuler un dossier pour Canada',  ar: 'محاكاة ملف لكندا' }
  };

  function updateStampLabels() {
    stamps.forEach(function(stamp){
      var country = stamp.getAttribute('data-country');
      var labels = STAMP_ARIA_LABELS[country];
      if (labels) stamp.setAttribute('aria-label', labels[currentLang] || labels.fr);
    });
  }

  stamps.forEach(function(stamp) {
    stamp.setAttribute('role', 'button');
    stamp.setAttribute('tabindex', '0');
    var country = stamp.getAttribute('data-country') || '';

    function selectCountry() {
      if (!country || !simDestination) return;
      simDestination.value = country;
      stamps.forEach(function(s){ s.classList.toggle('is-selected', s === stamp); });
      updateSimulator();
      var consultationSection = document.getElementById('consultation');
      if (consultationSection) {
        consultationSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(function() {
          // On place le curseur sur la question suivante, pas sur celle déjà remplie
          var next = (simVisaType && !simVisaType.value) ? simVisaType : simDestination;
          next.focus();
        }, 800);
      }
    }

    stamp.addEventListener('click', selectCountry);
    stamp.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCountry();
      }
    });
  });

  if (consultationForm) {
    consultationForm.addEventListener('submit', function(e){
      e.preventDefault();
      var wa = WA_LABELS[currentLang];
      var nameInput = consultationForm.querySelector('input[name="name"]');
      var name = nameInput ? nameInput.value.trim() : '';
      var dest = simDestination ? simDestination.value : '';
      var typeText = simVisaType ? simVisaType.options[simVisaType.selectedIndex].text : '';
      var profileText = simProfile ? simProfile.options[simProfile.selectedIndex].text : '';
      var refusalValue = simRefusal ? simRefusal.value : '';
      var refusalText = refusalValue && simRefusal ? simRefusal.options[simRefusal.selectedIndex].text : '';
      var messageInput = document.getElementById('simMessage');
      var message = messageInput ? messageInput.value.trim() : '';

      var priceText = resultPrice ? resultPrice.textContent : '';

      var text = wa.greeting;
      text += wa.name + (name || wa.notSpecified) + '\n';
      text += wa.destination + dest + '\n';
      text += wa.type + typeText + '\n';
      text += wa.profile + profileText + '\n';

      if (refusalText) {
        text += wa.refusal + refusalText + '\n';
      }

      if (priceText && priceText !== '—') {
        text += wa.price + priceText + '\n';
      }

      // On transmet ce qui reste à réunir : c'est le point de départ de l'échange
      if (currentDocs.length && resultDocs) {
        var boxes = Array.prototype.slice.call(resultDocs.querySelectorAll('input[type="checkbox"]'));
        var missing = currentDocs.filter(function(doc, i){
          return boxes[i] && !boxes[i].checked;
        });
        var ready = currentDocs.length - missing.length;
        text += wa.docsHeader + ready + wa.docsOf + currentDocs.length + wa.docsOwned;
        if (missing.length) {
          text += wa.missingHeader;
          missing.forEach(function(doc){
            text += '• ' + doc + '\n';
          });
        }
      }

      if (message) {
        text += wa.precisions + message + '\n';
      }

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      var opened = window.open(url, '_blank', 'noopener');

      if (formFoot) {
        if (!opened || opened.closed || typeof opened.closed === 'undefined') {
          // Fenêtre bloquée par le navigateur : on donne un lien à cliquer soi-même
          formFoot.classList.add('error');
          formFoot.innerHTML = FORM_FOOT_ERROR_PREFIX[currentLang] +
            '<a href="' + url + '" target="_blank" rel="noopener">' + FORM_FOOT_ERROR_LINK[currentLang] + '</a>.';
        } else {
          formFoot.classList.remove('error');
          formFoot.innerHTML = FORM_FOOT_SUCCESS[currentLang];
          setTimeout(function(){
            formFoot.innerHTML = t('form.foot.default');
          }, 8000);
        }
      }
    });
  }

  // ---- Bascule de langue : orchestre la traduction du DOM + tout le contenu dynamique ----
  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    if (TITLE_BY_LANG[lang]) document.title = TITLE_BY_LANG[lang];

    translateDom();

    if (langToggleLabel) langToggleLabel.textContent = LANG_TOGGLE_LABEL[lang];
    if (langToggle) langToggle.setAttribute('aria-label', LANG_BUTTON_ARIA[lang]);

    // Le libellé du thème dépend de la langue : on le rafraîchit
    applyTheme(document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    updateStampLabels();

    if (dest_type_profile_complete()) {
      updateSimulator(true); // true = on préserve les cases déjà cochées
    } else {
      updateProgressBar();
    }

    localStorage.setItem('docvisa-lang', lang);
  }

  function dest_type_profile_complete() {
    return !!(simDestination && simDestination.value && simVisaType && simVisaType.value && simProfile && simProfile.value);
  }

  // ---- Initialisation de la langue ----
  captureFrenchStrings();
  var savedLang = localStorage.getItem('docvisa-lang');
  var browserPrefersArabic = navigator.language && navigator.language.toLowerCase().indexOf('ar') === 0;
  var initialLang = savedLang || (browserPrefersArabic ? 'ar' : 'fr');
  setLanguage(initialLang);
