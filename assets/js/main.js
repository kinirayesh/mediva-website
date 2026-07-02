/* ===========================================================
   MEDIva Healthcare Solutions — main.js
   Shared data, injected chrome (header/footer/chat/booking),
   body-map builder, body-part page renderer, forms, counters.
   =========================================================== */
(function () {
  "use strict";

  /* ---------------- CONFIG / DATA ---------------- */
  var CONTACT = {
    email: "csant2612@gmail.com",
    whatsapp: "919008445189",
    whatsappDisplay: "+91 90084 45189",
    phone: "+91 90084 45189"
  };

  var NAV = [
    { label: "Home", href: "index.html" },
    { label: "Medical Tourism", href: "medical-tourism.html", children: [
      { label: "Overview", href: "medical-tourism.html" },
      { label: "All Services", href: "services.html" },
      { label: "Cardiac Surgery", href: "body-part.html?part=heart" },
      { label: "Knee & Hip Replacement", href: "body-part.html?part=knee" },
      { label: "Cancer Treatment", href: "body-part.html?part=lungs" },
      { label: "Interactive Body Map", href: "index.html#bodymap" }
    ]},
    { label: "NRI Care", href: "nri-care.html" },
    { label: "Wellness & Ayurveda", href: "wellness.html" },
    { label: "Patient Journey", href: "patient-journey.html" },
    { label: "For Professionals", href: "professionals.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" }
  ];

  var IMG = "https://images.unsplash.com/";
  function img(id, w, q) { return IMG + id + "?auto=format&fit=crop&w=" + (w || 1200) + "&q=" + (q || 70); }

  var PARTS = {
    brain: { name: "Brain & Neurology", group: "Head",
      blurb: "The body's command centre — where every thought, movement and memory begins.",
      ailments: ["Stroke & brain haemorrhage", "Brain tumours", "Epilepsy & seizures", "Parkinson's & movement disorders", "Aneurysm", "Hydrocephalus"],
      neglect: ["Untreated stroke can cause permanent paralysis or speech loss within hours", "A growing tumour raises intracranial pressure, risking vision loss and coma", "Repeated seizures can progressively damage memory and cognition"],
      services: ["Advanced neurosurgery at accredited neuro-centres", "Gamma Knife & CyberKnife radiosurgery", "Awake craniotomy for tumours", "Comprehensive stroke-unit care", "Tele-neurology second opinions before you travel"],
      treatments: ["Neurosurgery", "Neuro-oncology", "Interventional neurology"] },
    eyes: { name: "Eyes & Vision", group: "Head",
      blurb: "Your window to the world — and one of the most treatable organs when problems are caught early.",
      ailments: ["Cataracts", "Glaucoma", "Diabetic retinopathy", "Retinal detachment", "Corneal disorders", "Refractive errors"],
      neglect: ["Untreated glaucoma silently destroys the optic nerve — vision lost cannot be recovered", "Advanced cataract leads to complete, though reversible, blindness", "Diabetic retinopathy left unchecked can cause sudden, permanent sight loss"],
      services: ["Bladeless LASIK & SMILE vision correction", "Phaco & robotic cataract surgery", "Retinal & vitreo-retinal surgery", "Corneal transplant", "Glaucoma management programmes"],
      treatments: ["Ophthalmology", "Vision care", "Retina services"] },
    ear: { name: "Ear, Nose & Throat", group: "Head",
      blurb: "Hearing, balance and breathing — the ENT system keeps you connected to the world.",
      ailments: ["Chronic ear infections", "Hearing loss & deafness", "Sinusitis", "Nasal obstruction & deviated septum", "Tonsil & adenoid disease", "Vertigo & balance disorders"],
      neglect: ["Chronic infections can spread to the inner ear and brain", "Untreated hearing loss in children delays speech and learning", "Long-term sinusitis can erode bone and affect the eye socket"],
      services: ["Cochlear implants for hearing restoration", "Endoscopic sinus surgery (FESS)", "Microscopic ear surgery", "Septoplasty & rhinoplasty", "Balance & vertigo clinics"],
      treatments: ["ENT surgery", "Audiology", "Rhinology"] },
    oral: { name: "Mouth, Teeth & Tongue", group: "Head",
      blurb: "Dental and oral health shapes nutrition, speech, confidence — and warns of wider disease.",
      ailments: ["Tooth decay & gum disease", "Oral & tongue cancer", "Missing teeth", "Jaw misalignment", "Cleft lip & palate", "TMJ disorders"],
      neglect: ["Gum disease is linked to heart disease, diabetes and stroke", "Early oral cancers are highly treatable — late ones are not", "Missing teeth cause bone loss and facial collapse over time"],
      services: ["Dental implants & full-mouth rehabilitation", "Head & neck oncology surgery", "Orthognathic (jaw) surgery", "Cleft & craniofacial reconstruction", "Cosmetic dentistry & veneers"],
      treatments: ["Dental & maxillofacial", "Head-neck oncology"] },
    thyroid: { name: "Thyroid & Throat", group: "Neck",
      blurb: "A small gland with body-wide influence — controlling metabolism, weight, mood and energy.",
      ailments: ["Hypo- & hyperthyroidism", "Goitre", "Thyroid nodules", "Thyroid cancer", "Parathyroid disorders"],
      neglect: ["Untreated thyroid imbalance affects heart rhythm, fertility and mental health", "A large goitre can compress the windpipe and make breathing difficult", "Thyroid cancers spread if nodules are ignored"],
      services: ["Scarless endoscopic thyroidectomy", "Radioactive iodine therapy", "Thyroid cancer surgery & follow-up", "Endocrine evaluation & hormone management"],
      treatments: ["Endocrine surgery", "Endocrinology"] },
    shoulder: { name: "Shoulder & Upper Limb", group: "Upper Body",
      blurb: "The body's most mobile joint — and one of the most prone to wear, tears and injury.",
      ailments: ["Rotator cuff tears", "Frozen shoulder", "Shoulder dislocation", "Arthritis", "Sports injuries"],
      neglect: ["An untreated rotator cuff tear can become irreparable, needing joint replacement", "Frozen shoulder can permanently limit arm movement", "Repeated dislocations damage cartilage and bone"],
      services: ["Arthroscopic (keyhole) shoulder surgery", "Rotator cuff repair", "Shoulder replacement", "Sports-medicine rehabilitation"],
      treatments: ["Orthopaedics", "Sports medicine"] },
    heart: { name: "Heart & Cardiac Care", group: "Chest",
      blurb: "India is a world leader in cardiac care — accredited heart centres, experienced surgeons, a fraction of Western cost.",
      ailments: ["Coronary artery (blocked artery) disease", "Heart valve disease", "Heart failure", "Arrhythmia (irregular rhythm)", "Congenital heart defects", "Aortic aneurysm"],
      neglect: ["A neglected blockage can cause a sudden, fatal heart attack", "Untreated valve disease leads to heart failure and fluid in the lungs", "Irregular rhythms raise the risk of stroke and cardiac arrest"],
      services: ["Coronary bypass (CABG) & beating-heart surgery", "Angioplasty & stenting", "Valve repair & replacement (incl. TAVR)", "Pacemaker & defibrillator implants", "Paediatric & congenital heart surgery", "Robotic & minimally-invasive cardiac surgery"],
      treatments: ["Cardiology", "Cardiac surgery", "Interventional cardiology"] },
    lungs: { name: "Lungs & Oncology", group: "Chest",
      blurb: "Breathing, oxygen, life — and a frequent site for cancers that respond well to early, expert care.",
      ailments: ["Lung cancer", "COPD & emphysema", "Tuberculosis", "Pulmonary fibrosis", "Severe asthma", "Pleural disease"],
      neglect: ["Lung cancers caught late spread to bone, brain and liver", "Untreated COPD steadily reduces the lung capacity you can never regain", "Advanced fibrosis can require a lung transplant"],
      services: ["Comprehensive cancer (oncology) programmes", "VATS & robotic thoracic surgery", "Targeted therapy & immunotherapy", "Lung transplant evaluation", "Advanced TB & respiratory care"],
      treatments: ["Medical & surgical oncology", "Pulmonology", "Thoracic surgery"] },
    liver: { name: "Liver & Digestive Care", group: "Abdomen",
      blurb: "The body's chemical factory — quietly resilient, but serious once it begins to fail.",
      ailments: ["Cirrhosis", "Liver cancer", "Hepatitis B & C", "Fatty liver disease", "Liver failure", "Bile-duct disorders"],
      neglect: ["Fatty liver can silently progress to cirrhosis and cancer", "End-stage liver failure can only be treated with a transplant", "Untreated hepatitis raises lifelong cancer risk"],
      services: ["Living-donor & cadaveric liver transplant", "Liver cancer surgery & ablation", "Hepatobiliary & pancreatic surgery", "Advanced hepatology & hepatitis care"],
      treatments: ["Liver transplant", "Hepatology", "GI surgery"] },
    stomach: { name: "Stomach & Gastro", group: "Abdomen",
      blurb: "Digestion, nutrition and immunity all begin here — and so do many treatable conditions.",
      ailments: ["Acid reflux & ulcers", "Stomach & colon cancer", "Gallstones", "Hernia", "Inflammatory bowel disease", "Obesity & metabolic disease"],
      neglect: ["Chronic ulcers can perforate or turn cancerous", "Untreated gallstones can trigger life-threatening infection", "Severe obesity drives diabetes, heart disease and joint failure"],
      services: ["Laparoscopic & robotic GI surgery", "Bariatric (weight-loss) surgery", "GI cancer surgery & oncology", "Hernia & gallbladder surgery", "Advanced endoscopy"],
      treatments: ["Gastroenterology", "Bariatric surgery", "GI oncology"] },
    pancreas: { name: "Pancreas & Endocrine", group: "Abdomen",
      blurb: "Master of digestion and blood sugar — small, hidden, and demanding of expert care.",
      ailments: ["Pancreatic cancer", "Pancreatitis", "Diabetes complications", "Pancreatic cysts", "Endocrine tumours"],
      neglect: ["Pancreatic cancer is often silent until advanced — early evaluation saves lives", "Repeated pancreatitis destroys the organ and causes diabetes", "Poorly-controlled diabetes damages kidneys, eyes, nerves and heart"],
      services: ["Whipple & complex pancreatic surgery", "Pancreatic cancer oncology", "Diabetes & metabolic management", "Islet & endocrine treatment programmes"],
      treatments: ["GI & HPB surgery", "Endocrinology", "Oncology"] },
    kidney: { name: "Kidney & Urology", group: "Abdomen",
      blurb: "Twin filters that clean your blood around the clock — and one of India's strongest transplant specialities.",
      ailments: ["Chronic kidney disease", "Kidney stones", "Kidney cancer", "Kidney failure", "Prostate disease", "Urinary tract disorders"],
      neglect: ["Untreated kidney disease leads to dialysis or transplant", "Large stones can block and permanently damage a kidney", "Ignored prostate disease can hide a treatable cancer"],
      services: ["Living-donor & deceased-donor kidney transplant", "Dialysis & nephrology programmes", "Laser & keyhole stone surgery", "Robotic urological & prostate surgery"],
      treatments: ["Kidney transplant", "Nephrology", "Urology"] },
    spine: { name: "Spine & Back", group: "Back",
      blurb: "The pillar that holds you upright and protects the nerves to your whole body.",
      ailments: ["Slipped (herniated) disc", "Sciatica", "Spinal stenosis", "Scoliosis", "Spinal injury", "Spinal tumours"],
      neglect: ["A neglected disc can compress nerves, causing permanent weakness", "Spinal cord compression risks paralysis if not relieved in time", "Untreated scoliosis worsens and can affect the lungs and heart"],
      services: ["Minimally-invasive & endoscopic spine surgery", "Disc replacement & spinal fusion", "Scoliosis correction", "Robotic & navigation-guided spine surgery"],
      treatments: ["Spine surgery", "Neurosurgery", "Orthopaedics"] },
    hip: { name: "Hip & Pelvis", group: "Lower Body",
      blurb: "A weight-bearing powerhouse — and a joint India replaces for patients from across the world.",
      ailments: ["Hip arthritis", "Avascular necrosis", "Hip fractures", "Hip dysplasia", "Labral tears"],
      neglect: ["Avascular necrosis collapses the joint if treatment is delayed", "An untreated fracture in older adults sharply raises mortality", "Worsening arthritis can leave you unable to walk"],
      services: ["Total & partial hip replacement", "Hip resurfacing", "Revision joint surgery", "Computer-navigated joint replacement"],
      treatments: ["Joint replacement", "Orthopaedics"] },
    knee: { name: "Knee & Joint Replacement", group: "Lower Body",
      blurb: "One of the most successful, life-changing surgeries in the world — and a flagship of Indian orthopaedics.",
      ailments: ["Knee arthritis", "Ligament (ACL/PCL) tears", "Meniscus injury", "Cartilage damage", "Sports injuries"],
      neglect: ["Advanced arthritis erodes the joint until walking becomes impossible", "An untreated ligament tear leads to instability and early arthritis", "Delaying surgery often means a more complex operation later"],
      services: ["Total & partial knee replacement", "Robotic-assisted joint replacement", "Arthroscopic ligament reconstruction", "Sports-injury surgery & rehabilitation"],
      treatments: ["Joint replacement", "Sports medicine", "Orthopaedics"] },
    hand: { name: "Hands & Fingers", group: "Upper Body",
      blurb: "Precision, work and independence live in your hands — where micro-surgery achieves remarkable results.",
      ailments: ["Carpal tunnel syndrome", "Arthritis of the hand", "Tendon & nerve injuries", "Trigger finger", "Fractures & crush injuries", "Congenital hand differences"],
      neglect: ["Untreated nerve compression causes permanent weakness and wasting", "Tendon injuries left too long may never regain full movement", "Crush injuries risk infection and loss of function"],
      services: ["Microsurgical nerve & tendon repair", "Hand & wrist arthroscopy", "Joint replacement of the hand", "Reconstructive & replantation surgery"],
      treatments: ["Hand surgery", "Plastic & reconstructive surgery"] },
    leg: { name: "Legs, Feet & Vascular", group: "Lower Body",
      blurb: "Circulation, mobility and the foundations you stand on — kept healthy by vascular and ortho care.",
      ailments: ["Varicose veins", "Deep vein thrombosis", "Peripheral artery disease", "Diabetic foot", "Leg fractures", "Foot & ankle deformities"],
      neglect: ["Untreated diabetic foot can lead to amputation", "A clot (DVT) can travel to the lungs and become fatal", "Poor leg circulation causes non-healing ulcers and gangrene"],
      services: ["Vascular & endovascular surgery", "Varicose vein laser treatment", "Diabetic foot salvage programmes", "Foot & ankle reconstruction"],
      treatments: ["Vascular surgery", "Orthopaedics", "Podiatry"] },
    fertility: { name: "Fertility & IVF", group: "Wellbeing",
      blurb: "Helping families begin — with world-class, affordable assisted-reproduction expertise.",
      ailments: ["Infertility (male & female)", "PCOS", "Recurrent miscarriage", "Blocked fallopian tubes", "Low sperm count"],
      neglect: ["Fertility declines with time — earlier evaluation widens your options", "Untreated PCOS raises long-term diabetes and heart risk"],
      services: ["IVF, ICSI & IUI programmes", "Egg & embryo freezing", "Fertility preservation", "Reproductive endocrinology"],
      treatments: ["Reproductive medicine", "Gynaecology"] }
  };

  var JOURNEY = [
    { t: "Enquiry", d: "Share your needs and medical reports — by form, email or WhatsApp." },
    { t: "Records Review", d: "Our partner specialists assess your case and confirm options." },
    { t: "Plan & Quote", d: "You receive a treatment plan and a transparent, no-obligation estimate." },
    { t: "Travel & Visa", d: "We guide your medical visa, flights and airport pickup." },
    { t: "Treatment", d: "Care at an accredited partner hospital, with you supported throughout." },
    { t: "Recovery & Follow-up", d: "Recuperation support and remote follow-up after you return home." }
  ];

  var DISCLAIMER = "MEDIva Healthcare Solutions is a healthcare facilitation and coordination service, not a medical provider. All treatment is delivered by independent, internationally accredited hospitals and licensed doctors. Information here is general and not medical advice. We never publish fixed prices — every patient receives a personalised, no-obligation quote.";

  /* expose for inline use if needed */
  window.MEDIVA = { CONTACT: CONTACT, NAV: NAV, PARTS: PARTS, JOURNEY: JOURNEY, img: img };

  /* ---------------- helpers ---------------- */
  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
  function waLink(text) { return "https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent(text || "Hello MEDIva! I'd like to know more about your services."); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var WA_SVG = '<svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z"/></svg>';
  var MARK_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M2 12.5h4.2l1.7-4.6 2.9 8.8 2.5-7 1.6 2.8H22" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------------- HEADER ---------------- */
  function buildHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var active = document.body.getAttribute("data-active") || "";
    var transparent = document.body.hasAttribute("data-hero-transparent");

    var menu = NAV.map(function (it) {
      var isActive = it.label === active;
      var drop = "";
      if (it.children) {
        drop = '<div class="nav-drop"><div class="nav-drop-inner">' +
          it.children.map(function (c) { return '<a href="' + c.href + '">' + esc(c.label) + '</a>'; }).join("") +
          '</div></div>';
      }
      return '<div class="nav-item">' +
        '<a class="nav-link' + (isActive ? ' active' : '') + '" href="' + it.href + '">' + esc(it.label) +
        (it.children ? '<span class="caret">▾</span>' : '') + '</a>' + drop + '</div>';
    }).join("");

    host.className = "site-header" + (transparent ? " transparent" : "");
    host.innerHTML =
      '<div class="nav">' +
        '<a class="brand" href="index.html">' +
          '<span class="brand-mark">' + MARK_SVG + '</span>' +
          '<span class="brand-text"><span class="brand-name">MED<span class="accent">Iva</span></span>' +
          '<span class="brand-sub">Healthcare Solutions</span></span>' +
        '</a>' +
        '<nav class="nav-menu">' + menu + '</nav>' +
        '<div class="nav-actions">' +
          '<a class="nav-wa" href="' + waLink() + '" target="_blank" rel="noopener" style="color:#1faa4f" title="WhatsApp">' + WA_SVG + '</a>' +
          '<button class="btn btn-primary btn-book" data-book>Book Free Consultation</button>' +
          '<button class="burger" aria-label="Menu" data-burger><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>' +
      '<div class="mobile-menu" data-mobile>' +
        NAV.map(function (it) { return '<a href="' + it.href + '">' + esc(it.label) + '</a>'; }).join("") +
        '<button class="btn btn-primary btn-block" data-book>Book Free Consultation</button>' +
      '</div>';

    // scroll behaviour
    function onScroll() {
      if (window.scrollY > 24) host.classList.add("scrolled"); else host.classList.remove("scrolled");
      if (transparent) {
        if (window.scrollY > 24) host.classList.remove("transparent"); else host.classList.add("transparent");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var mobile = host.querySelector("[data-mobile]");
    host.querySelector("[data-burger]").addEventListener("click", function () {
      mobile.classList.toggle("open");
      if (transparent) host.classList.remove("transparent");
    });
  }

  /* ---------------- FOOTER ---------------- */
  function buildFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    host.className = "site-footer";
    host.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-about">' +
            '<a class="brand" href="index.html"><span class="brand-mark">' + MARK_SVG + '</span>' +
            '<span class="brand-name" style="color:#fff">MED<span class="accent">Iva</span></span></a>' +
            '<p>World-class care beyond borders. We guide international patients, NRIs and wellness seekers through treatment, elder care and Ayurveda across India — personally, every step.</p>' +
            '<div class="footer-social">' +
              '<a href="' + waLink() + '" target="_blank" rel="noopener" style="color:#7fe0a0" title="WhatsApp">' + WA_SVG + '</a>' +
              '<a href="mailto:' + CONTACT.email + '" style="color:#cdd9e0" title="Email"><svg width="19" height="19" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col"><h5>Services</h5>' +
            '<a href="medical-tourism.html">Medical Tourism</a><a href="nri-care.html">NRI Care</a>' +
            '<a href="wellness.html">Wellness & Ayurveda</a><a href="patient-journey.html">Patient Journey</a>' +
            '<a href="cost.html">Free Quote</a></div>' +
          '<div class="footer-col"><h5>Treatments</h5>' +
            '<a href="body-part.html?part=heart">Cardiac Care</a><a href="body-part.html?part=knee">Joint Replacement</a>' +
            '<a href="body-part.html?part=lungs">Cancer Care</a><a href="body-part.html?part=kidney">Transplants</a>' +
            '<a href="index.html#bodymap">Body Map →</a></div>' +
          '<div class="footer-col"><h5>Get in Touch</h5>' +
            '<a href="' + waLink() + '" target="_blank" rel="noopener" style="color:#fff;font-weight:600">' + CONTACT.whatsappDisplay + '</a>' +
            '<a href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a>' +
            '<p style="font-size:13.5px;color:#8195a1;line-height:1.6;margin:10px 0 16px">We respond within 2 hours during working hours.</p>' +
            '<button class="btn btn-primary" data-book>Book Free Consultation</button></div>' +
        '</div>' +
        '<div class="footer-disclaimer"><p>' + DISCLAIMER + '</p></div>' +
        '<div class="footer-bottom"><div class="copy">© 2026 MEDIva Healthcare Solutions. All rights reserved.</div>' +
          '<nav><a href="about.html">About</a><a href="professionals.html">For Professionals</a><a href="contact.html">Contact</a></nav>' +
        '</div>' +
      '</div>';
  }

  /* ---------------- CHAT WIDGET ---------------- */
  var chatState = { open: false, started: false };
  function buildChat() {
    var host = document.getElementById("site-chrome");
    if (!host) return;
    var launch = el('<button class="chat-launch" data-chat-toggle><span class="ic">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z"/></svg></span>' +
      '<span class="lbl">Chat with us</span></button>');
    host.appendChild(launch);
    var panel = el('<div class="chat-panel hidden" data-chat-panel>' +
      '<div class="chat-head"><span class="av">' + MARK_SVG + '</span>' +
        '<div><div class="nm">MEDIva Care Team</div><div class="st"><span class="dot"></span>Typically replies in minutes</div></div>' +
        '<button class="x" data-chat-toggle>✕</button></div>' +
      '<div class="chat-body" data-chat-body></div>' +
      '<div class="chat-foot"><div class="quick" data-quick></div>' +
        '<div class="chat-input"><input data-chat-input placeholder="Type your message…"/>' +
        '<button data-chat-send><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 11l18-8-8 18-2-7-8-3z" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg></button></div>' +
      '</div></div>');
    host.appendChild(panel);

    var body = panel.querySelector("[data-chat-body]");
    var quick = panel.querySelector("[data-quick]");
    var input = panel.querySelector("[data-chat-input]");

    var replies = {
      medical: "India offers world-class treatment at internationally accredited hospitals — often 70–80% less than Western costs. Share your condition or reports and we'll arrange a free, no-obligation quote within 2 hours.",
      nri: "We become your family's health companion in India — booking appointments, accompanying your parents, managing medication, and keeping you updated abroad. Tell us where they live and how we can help.",
      wellness: "Authentic Ayurveda awaits across Kerala and Karnataka — Panchakarma, detox, yoga and rejuvenation, tailored to your dates and goals. Shall we plan a programme for you?",
      def: "Thank you! The best next step is a quick free consultation or a WhatsApp chat with our coordinator — we'll take it from there."
    };

    function scrollDown() { body.scrollTop = body.scrollHeight; }
    function addBot(text, withCtas) {
      var ctas = "";
      if (withCtas) {
        ctas = '<div class="msg-ctas">' +
          '<button class="cta-wa" data-wa>💬 Continue on WhatsApp</button>' +
          '<button class="cta-book" data-bookcta>📅 Book a free consultation</button></div>';
      }
      var m = el('<div class="msg bot"><div class="bubble">' + esc(text) + '</div>' + ctas + '</div>');
      body.appendChild(m); scrollDown();
      var wa = m.querySelector("[data-wa]"); if (wa) wa.addEventListener("click", function () { window.open(waLink(), "_blank"); });
      var bk = m.querySelector("[data-bookcta]"); if (bk) bk.addEventListener("click", function () { toggleChat(); openBooking(); });
    }
    function addUser(text) { body.appendChild(el('<div class="msg user"><div class="bubble">' + esc(text) + '</div></div>')); scrollDown(); }

    function start() {
      if (chatState.started) return; chatState.started = true;
      addBot("Hello! 👋 I'm here to help you with treatment, NRI elder care, or a wellness retreat in India. What brings you to MEDIva today?", false);
      [["medical", "🏥 Medical Treatment"], ["nri", "👵 Care for my parents"], ["wellness", "🌿 Wellness & Ayurveda"], ["book", "📅 Book consultation"]].forEach(function (q) {
        var b = el('<button>' + q[1] + '</button>');
        b.addEventListener("click", function () {
          if (q[0] === "book") { toggleChat(); openBooking(); return; }
          addUser(q[1]); setTimeout(function () { addBot(replies[q[0]], true); }, 350);
        });
        quick.appendChild(b);
      });
    }
    function send() { var v = input.value.trim(); if (!v) return; addUser(v); input.value = ""; setTimeout(function () { addBot(replies.def, true); }, 350); }
    panel.querySelector("[data-chat-send]").addEventListener("click", send);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });

    function toggleChat() {
      chatState.open = !chatState.open;
      panel.classList.toggle("hidden", !chatState.open);
      launch.classList.toggle("hidden", chatState.open);
      if (chatState.open) start();
    }
    window.medivaOpenChat = function () { if (!chatState.open) toggleChat(); };
    [].forEach.call(host.querySelectorAll("[data-chat-toggle]"), function (b) { b.addEventListener("click", toggleChat); });
  }

  /* ---------------- BOOKING MODAL ---------------- */
  function gen7days() {
    var out = [], now = new Date(), added = 0, i = 1;
    var dows = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var mons = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    while (added < 7) {
      var d = new Date(now.getTime()); d.setDate(now.getDate() + i); i++;
      if (d.getDay() === 0) continue;
      out.push({ key: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), dow: dows[d.getDay()], day: d.getDate(), mon: mons[d.getMonth()] });
      added++;
    }
    return out;
  }
  function loadBooked() { try { return JSON.parse(localStorage.getItem("mediva_booked") || "[]"); } catch (e) { return []; } }

  var bookSel = { date: null, slot: null };
  function openBooking(service) {
    var m = document.getElementById("booking-modal");
    if (!m) return;
    m.classList.remove("hidden");
    if (service) { var s = m.querySelector("#bk-service"); if (s) s.value = service; }
  }
  window.medivaOpenBooking = openBooking;

  function buildBooking() {
    var host = document.getElementById("site-chrome");
    if (!host) return;
    var slots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];
    var modal = el('<div id="booking-modal" class="modal-backdrop hidden"></div>');
    modal.innerHTML =
      '<div class="modal" data-modal-card>' +
        '<div class="modal-aside"><div class="eyebrow on-dark">Free Consultation</div>' +
          '<h3>Let\'s plan your care, together.</h3>' +
          '<p>Pick a slot that suits you. A dedicated coordinator will call to understand your needs — no cost, no obligation.</p>' +
          '<ul class="checklist on-dark">' +
            '<li><span class="tick">✓</span><span>Response within 2 hours, working hours</span></li>' +
            '<li><span class="tick">✓</span><span>Transparent, no-obligation quote</span></li>' +
            '<li><span class="tick">✓</span><span>Your data stays private &amp; secure</span></li></ul></div>' +
        '<div class="modal-main"><div class="modal-head"><h3>Book your free consultation</h3><button class="x" data-close>✕</button></div>' +
          '<div data-book-form>' +
            '<div class="form-row"><input class="field" id="bk-name" placeholder="Full name *"/><input class="field" id="bk-phone" placeholder="Phone / WhatsApp *"/></div>' +
            '<div class="form-row"><input class="field" id="bk-email" placeholder="Email *"/>' +
              '<select class="field" id="bk-country"><option value="">Country of residence</option><option>UAE</option><option>UK</option><option>Nigeria</option><option>Kenya</option><option>USA</option><option>Canada</option><option>Germany</option><option>Australia</option><option>India</option><option>Other</option></select></div>' +
            '<select class="field" id="bk-service" style="margin-bottom:16px"><option value="">Service interested in</option><option>Medical Treatment</option><option>NRI Care</option><option>Wellness & Ayurveda</option><option>Professional Partnership</option></select>' +
            '<div class="slot-label">Pick a date</div><div class="date-row" data-dates></div>' +
            '<div class="slot-label">Pick a time <span style="font-weight:500;color:#8093a0">(IST)</span></div><div class="slot-grid" data-slots></div>' +
            '<textarea class="field" id="bk-msg" rows="2" placeholder="Tell us briefly what you need (optional)" style="margin-bottom:8px"></textarea>' +
            '<div class="form-error hidden" data-err></div>' +
            '<button class="btn btn-primary btn-block btn-lg" data-submit>Confirm & Request Consultation</button>' +
            '<p class="form-note">This opens your email to send the request to our team. Prefer chat? <a href="' + waLink("Hello MEDIva! I\'d like to book a free consultation.") + '" target="_blank" rel="noopener">Message on WhatsApp</a></p>' +
          '</div>' +
          '<div class="form-success hidden" data-book-success></div>' +
        '</div>' +
      '</div>';
    host.appendChild(modal);

    var datesWrap = modal.querySelector("[data-dates]");
    var slotsWrap = modal.querySelector("[data-slots]");
    var errBox = modal.querySelector("[data-err]");

    function renderDates() {
      datesWrap.innerHTML = "";
      gen7days().forEach(function (d) {
        var b = el('<button class="date-btn' + (bookSel.date === d.key ? ' sel' : '') + '"><div class="dow">' + d.dow + '</div><div class="day">' + d.day + '</div><div class="mon">' + d.mon + '</div></button>');
        b.addEventListener("click", function () { bookSel.date = d.key; bookSel.slot = null; renderDates(); renderSlots(); });
        datesWrap.appendChild(b);
      });
    }
    function renderSlots() {
      slotsWrap.innerHTML = "";
      var booked = loadBooked();
      slots.forEach(function (t) {
        var key = bookSel.date + "|" + t;
        var taken = booked.indexOf(key) !== -1;
        var noDate = !bookSel.date;
        var b = el('<button class="slot' + (bookSel.slot === t ? ' sel' : '') + '"' + ((taken || noDate) ? ' disabled' : '') + '>' + (taken ? 'Booked' : t) + '</button>');
        b.addEventListener("click", function () { if (!taken && !noDate) { bookSel.slot = t; errBox.classList.add("hidden"); renderSlots(); } });
        slotsWrap.appendChild(b);
      });
    }
    renderDates(); renderSlots();

    function close() { modal.classList.add("hidden"); }
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    modal.querySelector("[data-close]").addEventListener("click", close);

    modal.querySelector("[data-submit]").addEventListener("click", function () {
      var g = function (id) { var x = document.getElementById(id); return x ? x.value.trim() : ""; };
      var name = g("bk-name"), phone = g("bk-phone"), email = g("bk-email");
      if (!name || !phone || !email) { errBox.textContent = "Please fill in your name, phone and email."; errBox.classList.remove("hidden"); return; }
      if (!bookSel.date || !bookSel.slot) { errBox.textContent = "Please pick a date and a time slot."; errBox.classList.remove("hidden"); return; }
      var dd = gen7days().filter(function (x) { return x.key === bookSel.date; })[0];
      var dateLabel = dd ? (dd.dow + " " + dd.day + " " + dd.mon) : bookSel.date;
      var booked = loadBooked(); booked.push(bookSel.date + "|" + bookSel.slot);
      try { localStorage.setItem("mediva_booked", JSON.stringify(booked)); } catch (e) {}
      var bodyTxt = "New consultation booking via medivahealthcaresolutions.com\n\n" +
        "Name: " + name + "\nPhone / WhatsApp: " + phone + "\nEmail: " + email + "\n" +
        "Country: " + (g("bk-country") || "—") + "\nService: " + (g("bk-service") || "—") + "\n" +
        "Preferred slot: " + dateLabel + " at " + bookSel.slot + " IST\nMessage: " + (g("bk-msg") || "—") + "\n";
      var mailto = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent("Free Consultation Request — " + name) + "&body=" + encodeURIComponent(bodyTxt);
      try { window.location.href = mailto; } catch (e) {}
      var succ = modal.querySelector("[data-book-success]");
      modal.querySelector("[data-book-form]").classList.add("hidden");
      succ.classList.remove("hidden");
      succ.innerHTML = '<div class="ok"><svg width="38" height="38" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-11" stroke="#1faa4f" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
        '<h3 class="display">Your slot is reserved</h3>' +
        '<p class="lead" style="font-size:15px;margin:12px auto 22px;max-width:380px">Your consultation is reserved for ' + dateLabel + ' at ' + bookSel.slot + ' IST. We\'ll confirm and respond within 2 hours during working hours.</p>' +
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
        '<a class="btn" style="background:#25d366;color:#fff" href="' + waLink(bodyTxt) + '" target="_blank" rel="noopener">Also message on WhatsApp</a>' +
        '<button class="btn" style="border:1.5px solid rgba(23,48,66,.16);background:#fff;color:#173042" data-close>Done</button></div>';
      succ.querySelector("[data-close]").addEventListener("click", close);
    });
  }

  /* ---------------- ENQUIRY FORMS ---------------- */
  function wireForms() {
    [].forEach.call(document.querySelectorAll("[data-enquiry]"), function (form) {
      var btn = form.querySelector("[data-submit]");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var g = function (n) { var x = form.querySelector('[name="' + n + '"]'); return x ? x.value.trim() : ""; };
        var name = g("name"), email = g("email"), phone = g("phone");
        var err = form.querySelector("[data-err]");
        if (!name || !email || !phone) { if (err) { err.textContent = "Please add your name, email and phone so we can reach you."; err.classList.remove("hidden"); } return; }
        var service = g("service") || form.getAttribute("data-service") || "—";
        var bodyTxt = "New enquiry via medivahealthcaresolutions.com\n\n" +
          "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\n" +
          "Country: " + (g("country") || "—") + "\nService: " + service + "\n" +
          "Preferred contact: " + (g("contact") || "—") + "\nMessage: " + (g("message") || "—") + "\n";
        var mailto = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent("Website Enquiry — " + name) + "&body=" + encodeURIComponent(bodyTxt);
        try { window.location.href = mailto; } catch (e) {}
        var wrap = form.closest("[data-enquiry-wrap]") || form;
        form.classList.add("hidden");
        var succ = wrap.querySelector("[data-enquiry-success]");
        if (succ) {
          succ.classList.remove("hidden");
          succ.querySelector("[data-wa-final]") && succ.querySelector("[data-wa-final]").setAttribute("href", waLink(bodyTxt));
        }
      });
    });
  }

  /* ---------------- BODY MAP ---------------- */
  var FIGURE_SVG =
    '<svg viewBox="0 0 400 900" width="300" height="660">' +
    '<defs><linearGradient id="mvSkin" x1="0.2" y1="0" x2="0.85" y2="1"><stop offset="0" stop-color="#f6d7bd"/><stop offset="0.5" stop-color="#eec1a0"/><stop offset="1" stop-color="#e0aa84"/></linearGradient>' +
    '<radialGradient id="mvSkinHi" cx="0.4" cy="0.32" r="0.75"><stop offset="0" stop-color="#ffe9d6" stop-opacity="0.7"/><stop offset="1" stop-color="#ffe9d6" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="mvHair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3527"/><stop offset="1" stop-color="#6b4c37"/></linearGradient></defs>' +
    '<g fill="url(#mvSkin)" stroke="#cf9468" stroke-width="1.4" stroke-opacity="0.5">' +
    '<path d="M186,96 L185,128 Q200,138 215,128 L214,96 Q200,108 186,96 Z"/>' +
    '<ellipse cx="200" cy="60" rx="40" ry="47"/><ellipse cx="160" cy="60" rx="7" ry="12"/><ellipse cx="240" cy="60" rx="7" ry="12"/>' +
    '<path d="M180,126 C166,132 150,150 140,176 C150,198 150,214 153,236 C156,286 158,304 160,322 C161,348 152,366 154,388 C156,410 160,424 176,433 L224,433 C240,424 244,410 246,388 C248,366 239,348 240,322 C242,304 244,286 247,236 C250,214 250,198 260,176 C250,150 234,132 220,126 Z"/>' +
    '<path d="M138,176 C120,186 110,210 110,250 C108,300 110,360 113,410 C113,430 114,442 117,452 L133,450 C132,420 134,380 136,340 C137,300 140,250 150,214 C146,200 142,188 138,176 Z"/>' +
    '<path d="M262,176 C280,186 290,210 290,250 C292,300 290,360 287,410 C287,430 286,442 283,452 L267,450 C268,420 266,380 264,340 C263,300 260,250 250,214 C254,200 258,188 262,176 Z"/>' +
    '<ellipse cx="114" cy="464" rx="16" ry="21"/><ellipse cx="286" cy="464" rx="16" ry="21"/>' +
    '<path d="M160,432 C150,480 152,545 159,602 C162,664 169,742 173,794 L196,794 C196,740 195,662 194,600 C193,545 193,486 193,440 Z"/>' +
    '<path d="M240,432 C250,480 248,545 241,602 C238,664 231,742 227,794 L204,794 C204,740 205,662 206,600 C207,545 207,486 207,440 Z"/>' +
    '<ellipse cx="178" cy="812" rx="23" ry="13"/><ellipse cx="222" cy="812" rx="23" ry="13"/></g>' +
    '<path d="M160,58 C160,28 178,14 200,14 C222,14 240,28 240,58 C240,44 230,30 200,30 C172,30 170,46 160,58 Z" fill="url(#mvHair)"/>' +
    '<g fill="url(#mvSkinHi)"><path d="M180,126 C166,132 150,150 140,176 C150,198 150,214 153,236 C156,286 158,304 160,322 L200,322 L200,126 Z"/><ellipse cx="190" cy="52" rx="34" ry="40"/></g>' +
    '<g fill="none" stroke="#c2895c" stroke-opacity="0.55" stroke-width="1.8" stroke-linecap="round">' +
    '<path d="M168,162 Q185,156 199,162"/><path d="M232,162 Q215,156 201,162"/>' +
    '<path d="M160,196 C172,224 190,230 199,220"/><path d="M240,196 C228,224 210,230 201,220"/>' +
    '<path d="M200,176 L200,322" stroke-opacity="0.4"/><path d="M176,258 L224,258" stroke-opacity="0.35"/><path d="M178,286 L222,286" stroke-opacity="0.35"/><path d="M181,312 L219,312" stroke-opacity="0.35"/>' +
    '<path d="M141,178 C150,196 152,206 152,212"/><path d="M259,178 C250,196 248,206 248,212"/>' +
    '<path d="M124,224 C121,256 124,288 130,318" stroke-opacity="0.4"/><path d="M276,224 C279,256 276,288 270,318" stroke-opacity="0.4"/>' +
    '<path d="M176,452 C173,520 174,565 178,592" stroke-opacity="0.45"/><path d="M224,452 C227,520 226,565 222,592" stroke-opacity="0.45"/>' +
    '<path d="M168,600 Q179,612 190,600"/><path d="M232,600 Q221,612 210,600"/>' +
    '<path d="M180,634 L178,756" stroke-opacity="0.3"/><path d="M220,634 L222,756" stroke-opacity="0.3"/></g>' +
    '<g opacity="0.5"><path d="M168,200 Q200,214 232,200 M165,216 Q200,232 235,216 M166,232 Q200,248 234,232" fill="none" stroke="#fff" stroke-width="1.6" stroke-opacity="0.45"/>' +
    '<path d="M196,236 c-7,-10 -22,-7 -22,6 c0,11 16,19 22,25 c6,-6 22,-14 22,-25 c0,-13 -15,-16 -22,-6 z" fill="#e35b83" fill-opacity="0.34"/></g></svg>';

  var HOTSPOTS = [
    ["brain", "Brain & Neuro", 50, 5.5, 58], ["eyes", "Eyes & Vision", 43, 9, 40], ["ear", "Ear · Nose · Throat", 58, 9, 40],
    ["oral", "Mouth & Teeth", 50, 12.3, 38], ["thyroid", "Thyroid", 50, 14.4, 34], ["shoulder", "Shoulder", 33, 20.5, 50],
    ["heart", "Heart & Cardiac", 45.5, 27.8, 58], ["lungs", "Lungs & Oncology", 56.5, 26.5, 54], ["liver", "Liver & Digestive", 57.5, 35.5, 48],
    ["stomach", "Stomach & Gastro", 44, 36.7, 50], ["pancreas", "Pancreas", 51, 39.2, 38], ["kidney", "Kidney & Urology", 40, 39.5, 42],
    ["spine", "Spine & Back", 65, 32, 44], ["hip", "Hip & Pelvis", 42, 44.5, 50], ["fertility", "Fertility & IVF", 60, 46.5, 44],
    ["hand", "Hands & Fingers", 28, 50, 48], ["knee", "Knee & Joint", 43.5, 72, 50], ["leg", "Legs & Vascular", 57, 81, 54]
  ];

  function buildBodyMap() {
    var fig = document.getElementById("bodymap-figure");
    if (fig) {
      fig.innerHTML = '<div class="figure-glow"></div>' + FIGURE_SVG +
        HOTSPOTS.map(function (h) {
          return '<a class="hot" href="body-part.html?part=' + h[0] + '" style="left:' + h[2] + '%;top:' + h[3] + '%">' +
            '<span class="tip">' + h[1] + '</span><span class="blob" style="width:' + h[4] + 'px;height:' + h[4] + 'px"><span class="node"></span></span></a>';
        }).join("") +
        '<div class="figure-hint">👆 Hover a region · click to explore</div>';
    }
    var list = document.getElementById("bodymap-list");
    if (list) {
      var order = ["Head", "Neck", "Chest", "Abdomen", "Back", "Upper Body", "Lower Body", "Wellbeing"];
      var byGroup = {};
      Object.keys(PARTS).forEach(function (id) { var g = PARTS[id].group; (byGroup[g] = byGroup[g] || []).push({ id: id, name: PARTS[id].name }); });
      list.innerHTML = order.filter(function (g) { return byGroup[g]; }).map(function (g) {
        return '<div class="sys-group"><h4>' + g + '</h4><div class="sys-list">' +
          byGroup[g].map(function (it) {
            return '<a class="syschip" href="body-part.html?part=' + it.id + '"><span class="dot"></span><span class="t">' + esc(it.name) + '</span><span class="go">→</span></a>';
          }).join("") + '</div></div>';
      }).join("");
    }
  }

  /* ---------------- BODY-PART PAGE RENDERER ---------------- */
  function renderBodyPart() {
    var root = document.getElementById("bodypart-root");
    if (!root) return;
    var id = "heart";
    try { id = new URLSearchParams(location.search).get("part") || "heart"; } catch (e) {}
    var p = PARTS[id] || PARTS.heart;
    var shortName = (p.name || "").split(/[&,]/)[0].trim().toLowerCase() || "this area";
    document.title = p.name + " in India | MEDIva";
    var heroImg = img("photo-1530026405186-ed1f139313f8", 1600, 70);
    var wa = waLink("Hello MEDIva! I would like information about " + p.name + " in India.");

    function list(items, cls, builder) { return items.map(builder).join(""); }

    root.innerHTML =
      '<section class="hero hero-page" style="background:linear-gradient(120deg,rgba(20,49,62,.94),rgba(28,74,93,.88)),url(' + heroImg + ') center/cover">' +
        '<div class="container-narrow">' +
          '<a href="index.html#bodymap" style="display:inline-flex;gap:8px;color:#ffc2d4;font-weight:700;font-size:14px;text-decoration:none;margin-bottom:22px">← Back to body map</a>' +
          '<div class="badge">' + esc(p.group) + '</div>' +
          '<h1 class="display on-dark" style="max-width:760px;margin-bottom:18px">' + esc(p.name) + '</h1>' +
          '<p class="lead on-dark" style="max-width:660px;margin-bottom:30px">' + esc(p.blurb) + '</p>' +
          '<div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn btn-primary" data-book>Get a Free Quote</button>' +
          '<a class="btn btn-ghost" href="' + wa + '" target="_blank" rel="noopener">Ask on WhatsApp</a></div>' +
        '</div></section>' +

      '<section class="section"><div class="container-narrow">' +
        '<span class="eyebrow">Conditions We Help With</span>' +
        '<h2 class="display" style="margin-bottom:8px">What can be treated</h2>' +
        '<p class="lead" style="max-width:620px;margin-bottom:32px">MEDIva connects you to accredited specialists across India for the full range of ' + esc(shortName) + ' conditions, including:</p>' +
        '<div class="grid cols-3 gap-md">' + list(p.ailments, "", function (a) {
          return '<div class="ail-card"><span class="plus">+</span><span class="t">' + esc(a) + '</span></div>';
        }) + '</div></div></section>' +

      '<section class="section neglect"><div class="container-narrow">' +
        '<span class="eyebrow" style="color:#ff9ab6">Why Timing Matters</span>' +
        '<h2 class="display on-dark" style="margin-bottom:8px">The risk of waiting too long</h2>' +
        '<p class="lead" style="color:#e3c6d1;max-width:640px;margin-bottom:32px">Many conditions are highly treatable early — but far harder once neglected. Acting sooner protects your options, your recovery, and your outcome.</p>' +
        '<div class="grid cols-3 gap-md">' + list(p.neglect, "", function (n) {
          return '<div class="neg-card"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 8v5M12 16.5v.5" stroke="#ff9ab6" stroke-width="2.2" stroke-linecap="round"/><path d="M10.3 3.8 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" stroke="#ff9ab6" stroke-width="1.8" stroke-linejoin="round"/></svg></div><p>' + esc(n) + '</p></div>';
        }) + '</div>' +
        '<p style="font-size:13px;color:#b98a9a;margin-top:24px;font-style:italic">General information only, not medical advice. Always consult a qualified doctor about your condition.</p>' +
        '</div></section>' +

      '<section class="section bg-tint"><div class="container-narrow">' +
        '<span class="eyebrow">Global Treatment Options</span>' +
        '<h2 class="display" style="margin-bottom:8px">World-class care, arranged for you in India</h2>' +
        '<p class="lead" style="max-width:640px;margin-bottom:32px">Through our network of internationally accredited partner hospitals, MEDIva coordinates the most advanced ' + esc(shortName) + ' treatments — at a fraction of Western costs, with full support.</p>' +
        '<div class="grid cols-2 gap-md">' + list(p.services, "", function (s) {
          return '<div class="svc2-card"><span class="tick"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-11" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="t">' + esc(s) + '</span></div>';
        }) + '</div>' +
        '<div style="margin-top:28px;display:flex;align-items:center;gap:12px;flex-wrap:wrap"><span style="font-size:14px;font-weight:700;color:#173042">Related specialities:</span>' +
        list(p.treatments, "", function (t) { return '<span class="tagchip">' + esc(t) + '</span>'; }) + '</div>' +
        '</div></section>' +

      '<section class="section"><div class="container-narrow">' +
        '<div class="panel-band" style="margin-bottom:50px;display:flex;justify-content:space-between;align-items:center;gap:28px;flex-wrap:wrap">' +
          '<div style="max-width:560px"><h3 class="display on-dark" style="font-size:26px;margin-bottom:10px">Significant savings, full transparency</h3>' +
          '<p style="font-size:15px;line-height:1.6;color:#b9cad2">Procedures in India can cost up to 70–80% less than in the UK, USA or Gulf — without compromising quality. Because every patient is different, we provide a personalised, no-obligation quote rather than fixed prices.</p></div>' +
          '<button class="btn btn-white" data-book>Request My Quote →</button></div>' +
        '<span class="eyebrow">The MEDIva Journey</span><h2 class="display" style="font-size:34px;margin-bottom:32px">From first message to safe return home</h2>' +
        '<div class="grid cols-3 gap-md">' + JOURNEY.map(function (j, i) {
          return '<div class="jcard"><div class="num-serif">0' + (i + 1) + '</div><h4 style="font-size:16px;font-weight:800;margin-bottom:6px">' + esc(j.t) + '</h4><p style="font-size:13.5px;line-height:1.6;color:#5b7280">' + esc(j.d) + '</p></div>';
        }).join("") + '</div></div></section>' +

      '<section class="section" style="padding-top:0"><div class="container-narrow"><div class="cta-band">' +
        '<h2 class="display on-dark" style="font-size:38px;margin-bottom:12px">Ready to take the next step?</h2>' +
        '<p style="font-size:17px;color:#ffe1ea;margin:0 auto 28px;max-width:540px;line-height:1.6">Share your reports and we\'ll arrange a free, no-obligation quote and treatment plan within 2 hours.</p>' +
        '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><button class="btn btn-white" data-book>Book Free Consultation</button>' +
        '<a class="btn btn-ghost" href="' + wa + '" target="_blank" rel="noopener">WhatsApp Us</a></div>' +
        '<p style="font-size:12.5px;color:#ffd2de;margin:26px auto 0;max-width:720px;line-height:1.6">' + DISCLAIMER + '</p>' +
        '</div></div></section>';
  }

  /* ---------------- COUNTERS ---------------- */
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var node = e.target, to = parseInt(node.getAttribute("data-count"), 10), suf = node.getAttribute("data-suffix") || "";
        var n = 0, step = Math.max(1, Math.round(to / 28));
        var t = setInterval(function () { n += step; if (n >= to) { n = to; clearInterval(t); } node.textContent = n + suf; }, 32);
        io.unobserve(node);
      });
    }, { threshold: .5 });
    els.forEach(function (n) { io.observe(n); });
  }

  /* ---------------- BOOT ---------------- */
  function boot() {
    buildHeader();
    buildFooter();
    buildChat();
    buildBooking();
    buildBodyMap();
    renderBodyPart();
    wireForms();
    initCounters();
    // global delegate for any [data-book] button added statically
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-book]");
      if (b) { e.preventDefault(); openBooking(b.getAttribute("data-book-service") || ""); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
