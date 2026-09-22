document.documentElement.classList.add("js");

const pageLoader = document.getElementById("page-loader") || (() => {
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.id = "page-loader";
  loader.setAttribute("role", "status");
  loader.setAttribute("aria-live", "polite");
  loader.setAttribute("aria-label", "ARS website loading");
  loader.innerHTML = `
    <div class="loader-inner">
      <div class="loader-logo" aria-hidden="true">
        <img class="loader-logo-ghost" src="assets/ars-logo.png?v=22" alt="" width="662" height="700" />
        <span class="loader-logo-fill"><img src="assets/ars-logo.png?v=22" alt="" width="662" height="700" /></span>
      </div>
      <div class="loader-meta"><span>ARS</span><strong><span id="loader-progress">00</span>%</strong></div>
      <div class="loader-track" aria-hidden="true"><span></span></div>
      <p class="loader-tagline">PEOPLE · IDEAS · RESEARCH · IMPACT</p>
    </div>`;
  document.body.prepend(loader);
  return loader;
})();
const loaderCounter = document.getElementById("loader-progress");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let loaderValue = 0;
let loaderFrame = 0;
let loaderFinished = false;

function setLoaderProgress(value) {
  loaderValue = Math.max(0, Math.min(100, value));
  pageLoader?.style.setProperty("--loader-progress", `${loaderValue}%`);
  if (loaderCounter) loaderCounter.textContent = String(Math.round(loaderValue)).padStart(2, "0");
}

function hidePageLoader() {
  if (!pageLoader || loaderFinished) return;
  loaderFinished = true;
  setLoaderProgress(100);
  pageLoader.classList.add("is-complete");
  pageLoader.setAttribute("aria-hidden", "true");
  document.body.classList.remove("loader-active");
}

function startEntryLoader() {
  if (!pageLoader || reducedMotion) {
    hidePageLoader();
    return;
  }

  let transitionStamp = 0;
  try {
    transitionStamp = Number(sessionStorage.getItem("ars-page-transition")) || 0;
    sessionStorage.removeItem("ars-page-transition");
  } catch (error) { /* Storage may be unavailable in private browsing. */ }

  const continuedTransition = Date.now() - transitionStamp < 3000;
  const startingValue = continuedTransition ? 42 : 0;
  const minimumDuration = continuedTransition ? 280 : 720;
  const completionDuration = continuedTransition ? 180 : 220;
  const startedAt = performance.now();
  let loadReady = document.readyState === "complete";
  let completionStartedAt = 0;
  let completionFrom = 88;

  setLoaderProgress(startingValue);
  document.body.classList.add("loader-active");
  pageLoader.setAttribute("aria-hidden", "false");
  if (!loadReady) window.addEventListener("load", () => { loadReady = true; }, { once: true });

  function advance(now) {
    const elapsed = now - startedAt;
    if (!loadReady || elapsed < minimumDuration) {
      const phase = Math.min(elapsed / minimumDuration, 1);
      setLoaderProgress(startingValue + (88 - startingValue) * (1 - Math.pow(1 - phase, 2)));
      loaderFrame = requestAnimationFrame(advance);
      return;
    }

    if (!completionStartedAt) {
      completionStartedAt = now;
      completionFrom = loaderValue;
    }
    const phase = Math.min((now - completionStartedAt) / completionDuration, 1);
    setLoaderProgress(completionFrom + (100 - completionFrom) * phase);
    if (phase < 1) loaderFrame = requestAnimationFrame(advance);
    else window.setTimeout(hidePageLoader, 90);
  }

  loaderFrame = requestAnimationFrame(advance);
  window.setTimeout(hidePageLoader, 4000);
}

startEntryLoader();

document.addEventListener("click", (event) => {
  if (reducedMotion || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest("a[href]");
  if (!link || link.target || link.hasAttribute("download")) return;

  const destination = new URL(link.href, window.location.href);
  if (!/^https?:$/.test(destination.protocol) || destination.origin !== window.location.origin) return;
  const sameDocument = destination.pathname === window.location.pathname && destination.search === window.location.search;
  if (sameDocument && destination.hash) return;

  event.preventDefault();
  cancelAnimationFrame(loaderFrame);
  loaderFinished = false;
  setLoaderProgress(0);
  pageLoader?.classList.remove("is-complete");
  pageLoader?.setAttribute("aria-hidden", "false");
  document.body.classList.add("loader-active");
  try { sessionStorage.setItem("ars-page-transition", String(Date.now())); } catch (error) { /* Continue without transition memory. */ }

  const transitionStartedAt = performance.now();
  function leave(now) {
    const phase = Math.min((now - transitionStartedAt) / 260, 1);
    setLoaderProgress(42 * phase);
    if (phase < 1) loaderFrame = requestAnimationFrame(leave);
    else window.location.assign(destination.href);
  }
  loaderFrame = requestAnimationFrame(leave);
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) hidePageLoader();
});

const translations = {
  az: {
    skip: "Əsas məzmuna keç", navLabel: "Əsas naviqasiya", languageLabel: "Dil seçimi", statsLabel: "Cəmiyyət haqqında göstəricilər", valuesLabel: "Dəyərlərimiz", journeyLabel: "Uzunmüddətli inkişaf yolu", menuOpen: "Menyunu aç", menuClose: "Menyunu bağla", navAbout: "Haqqımızda", navPrograms: "Proqramlar", navWorkshop: "Emalatxana", navDepartments: "Şöbələr", navTeam: "İnsanlar", navCommunity: "İcma", navContact: "Əlaqə",
    heroEyebrow: "Elm · Tədqiqat · Əməkdaşlıq", heroTitle: "Azərbaycan elmini<br /><em>birlikdə irəli aparaq.</em>", heroText: "Dünyanın hər yerində çalışan azərbaycanlı tədqiqatçıları, tələbələri və elm həvəskarlarını bir araya gətirən açıq platforma.", joinUs: "İcmaya qoşul", explorePrograms: "Proqramları kəşf et",
    manifestoLabel: "Bizim manifestimiz", people: "İNSANLAR", ideas: "İDEYALAR", research: "TƏDQİQAT", impact: "TƏSİR", manifestoText: "Güclü elmi icma bilik paylaşımı və davamlı əməkdaşlıqla yaranır.", scroll: "Daha çox kəşf et",
    aboutLabel: "Haqqımızda", aboutLead: "Sərhədləri aşan, biliyi paylaşan və <em>Azərbaycan elminin gələcəyini</em> birlikdə quran tədqiqatçılar şəbəkəsiyik.", aboutText1: "Azərbaycan Tədqiqat Cəmiyyəti (ARS) müxtəlif elm sahələrindən olan azərbaycanlı alim və tələbələr arasında əlaqə yaradan qeyri-kommersiya təşəbbüsüdür.", aboutText2: "Məqsədimiz açıq dialoq, mentorluq və multidissiplinar əməkdaşlıq üçün əlçatan mühit formalaşdırmaqdır.", problemLabel: "Problem", problemTitle: "İmkanlara birbaşa çıxış məhduddur", problemText: "Bir çox tələbə aktiv tədqiqatçılara, laboratoriyalara və real layihələrə aparan formal kanallara çıxış tapa bilmir.", purposeLabel: "Məqsədimiz", purposeTitle: "Ortaq sualları real nəticələrə çevirmək", purposeText: "Fərqli sahələrdən insanları bir araya gətirərək əməkdaşlıq, tədqiqat və ölçülə bilən akademik nəticələr yaradırıq.", statApplicants: "İlk mərhələ müraciətçisi", statDepartments: "Elmi şöbə", statPathways: "İcma fəaliyyət istiqaməti", valueBorderless: "Sərhədsizlik", valueOpen: "Açıq icma", valueInterdisciplinary: "Fənlərarası", valueResults: "Nəticə yönümlülük", valueGrowth: "İnkişaf və töhfə",
    programsLabel: "İcma modeli", programsTitle: "İdeyadan real<br /><em>tədqiqat nəticəsinə.</em>", programsIntro: "ARS proqramları ilk elmi maraqdan başlayaraq bacarıq, əməkdaşlıq və görünən akademik nəticəyə qədər aydın inkişaf yolu yaradır.", seminarsTitle: "Tədqiqatçı görüşləri", seminarsText: "Aktiv tədqiqatçılar, onların təcrübəsi və iş istiqamətləri ilə birbaşa tanışlıq.", networkTitle: "Mentor uyğunlaşdırılması", networkText: "Tələbələri maraqlarına uyğun mentor və tədqiqat istiqaməti ilə əlaqələndirmək.", mentorshipTitle: "Aylıq masterklaslar", mentorshipText: "Elmi yazı, məlumatların təhlili, layihə təklifi, qrant və rəy prosesi üzrə praktiki bacarıqlar.", sprintsTitle: "Layihə sprintləri və ortaq laboratoriyalar", sprintsText: "İştirakçıları real tədqiqat problemləri ətrafında birləşdirən nəticə yönümlü əməkdaşlıq.", outputsTitle: "Nəticələrin təqdimatı", outputsText: "Öyrənməni məqalə, poster, məlumat dəsti və təqdimat kimi konkret akademik nəticələrə çevirmək.", learnMore: "Ətraflı", journeyTitle: "Uzunmüddətli hədəf", journeyCommunity: "Tədqiqat icması", journeySociety: "Tədqiqat cəmiyyəti", journeyNetwork: "Tədqiqat şəbəkəsi", journeyCenter: "Müstəqil tədqiqat mərkəzi", programPathLabel: "Dörd mərhələli tədqiqat yolu", programPathTitle: "Maraqdan elmi təsirə gedən aydın yol.", programPathHint: "Hər mərhələni seçərək iştirakçıların necə əlaqə qurduğunu, bacarıq qazandığını, əməkdaşlıq etdiyini və nəticəsini paylaşdığını görün.", phaseConnect: "Əlaqə qur", phaseDevelop: "Bacarıq qazan", phaseCollaborate: "Birgə tədqiq et", phasePublish: "Nəticəni paylaş", phaseConnectText: "İnsanları, ideyaları və uyğun istiqaməti bir araya gətiririk.", phaseDevelopText: "Tədqiqat aparmaq üçün praktik və ötürülə bilən bacarıqlar qururuq.", phaseCollaborateText: "Ortaq sualları strukturlaşdırılmış layihələrə çeviririk.", phasePublishText: "Görülən işi görünən və paylaşılması mümkün elmi nəticəyə çeviririk.", programIncludes: "Bu mərhələyə daxildir", programOutcome: "Gözlənilən nəticə", connectOutcome: "Daha aydın istiqamət və doğru elmi əlaqələr", developOutcome: "Müstəqil işləmək üçün əsas tədqiqat bacarıqları", collaborateOutcome: "Komanda işi, layihə təcrübəsi və yoxlanılan nəticələr", publishOutcome: "Məqalə, poster, məlumat dəsti və ya elmi təqdimat", programPathCta: "Bu mərhələ ilə maraqlanıram", programOverviewLabel: "ARS tədqiqat yolu",
    workshopLabel: "Yeni tədqiqatçılar üçün emalatxana", workshopBadge: "Pulsuz · Onlayn · 3 həftə", workshopTitle: "Tədqiqat ideyasından<br /><em>nəşrə doğru.</em>", workshopSummary: "Erkən karyera mərhələsində olan tədqiqatçılar üçün üç masterklas, praktiki tapşırıqlar və həftəlik inkişaf yolu.", weekOne: "1-ci həftə", weekTwo: "2-ci həftə", weekThree: "3-cü həftə", methodsTitle: "Tədqiqat metodları", methodsText: "Tədqiqat sualı, uyğun metodologiyanın seçilməsi və etibarlı tədqiqat planının qurulması.", ethicsTitle: "Tədqiqat etikası", ethicsText: "Akademik dürüstlük, məlumatlı razılıq, müəlliflik və məsuliyyətli tədqiqat təcrübəsi.", publishingTitle: "Məqalənin jurnala təqdim edilməsi", publishingText: "Uyğun jurnalın seçilməsi, təqdimat sənədləri və rəy prosesinə hazırlıq.", formatTitle: "Format", formatText: "Təqdimatçının imkanından asılı olaraq Azərbaycan və ya ingilis dilində", tasksTitle: "Həftəlik tapşırıqlar", tasksText: "Hər tapşırıq növbəti mövzu başlamazdan əvvəl tamamlanır", workshopCta: "Marağını bildir",
    departmentsLabel: "Elmi şöbələr", departmentsTitle: "Fərqli sahələr.<br /><em>Ortaq suallar.</em>", engineeringTitle: "Mühəndislik və tətbiqi texnologiyalar", engineeringText: "Enerji, mexanika, materiallar və sənaye texnologiyaları üzrə əməkdaşlıq.", lifeTitle: "Təbiət və həyat elmləri", lifeText: "Biologiya, kimya, neyroelm və ətraf mühit üzrə fənlərarası araşdırmalar.", dataTitle: "Data, süni intellekt və riyazi elmlər", dataText: "Məlumatların təhlili, modelləşdirmə, süni intellekt və hesablama metodları.", socialTitle: "Sosial və humanitar elmlər", socialText: "Dilçilik, təhsil, cəmiyyət və mədəniyyət üzrə tədqiqat və dialoq.", departmentNote: "Üzvlər maraq və təcrübələrinə uyğun olaraq maksimum iki şöbədə iştirak edə bilərlər.",
    teamLabel: "İcra Şurası", teamTitle: "İdeyanın arxasındakı<br /><em>insanlarla tanış olun.</em>", advisoryLabel: "Elmi Məsləhət Şurası", advisoryTitle: "Təcrübəni elmi istiqamətə<br /><em>çevirən mütəxəssislər.</em>", roleFounder: "Təsisçi", roleCofounder: "Həmtəsisçi", roleResearch: "Tədqiqat Proqramları Direktoru", roleComms: "Kommunikasiya və İctimaiyyətlə Əlaqələr Rəhbəri", roleProject: "Layihə Koordinatoru", roleAdmin: "İnzibati İşlər üzrə Mütəxəssis", roleClinical: "Klinik psixoloq", roleAdvisory: "Elmi Məsləhət Şurasının üzvü", roleAdvisoryHead: "Elmi Məsləhət Şurasının rəhbəri", leadershipLayer: "Rəhbərlik", operationsLayer: "Proqramlar və əməliyyatlar", chairLayer: "Şura rəhbəri", advisoryMembersLayer: "Şura üzvləri", boardHint: "Profilə baxmaq üçün şəxsi seçin", ibrahimProfile: "Sakarya Universiteti · PhD namizədi<br />Bərk cisim fizikası · DFT", masudProfile: "KFUPM · PhD namizədi<br />Qaz hidratları · Lay modelləşdirilməsi", humayProfile: "Imperial College London · MSc<br />Aerokosmik sahə · Maye mexanikası", jaleProfile: "VMU & JGU · Sosiolinqvistika<br />Kod-dəyişmə · Dil variasiyası", nargizProfile: "Xəzər Universiteti<br />Data analitikası · Neyroelm", zehraProfile: "Xəzər Universiteti<br />Lay modelləşdirilməsi · Maşın öyrənməsi", xeyranseProfile: "Xəzər Tibb Mərkəzi<br />Klinik psixologiya · Psixoterapiya", amilProfile: "NCBJ / NOMATEN · BEU · UCL<br />Hesablama materialşünaslığı · Süni intellekt", azizehProfile: "Sabancı Universiteti<br />Ağıllı örtüklər · Biomateriallar", sabrinProfile: "Al Ain Universiteti · Abu Dabi<br />Tibb təhsili · Rəqəmsal səhiyyə", ulkarProfile: "Fizika İnstitutu · ADDA<br />Fotokataliz · Kondensə olunmuş maddə fizikası", nijatProfile: "ECOHUB · Sakarya Universiteti<br />Analitik kimya · Davamlı materiallar", orkhanProfile: "ADNSU · Universal Energy<br />Enerji sistemləri · Bərpa olunan enerji", viewProfile: "Profilə bax", closeProfile: "Profili bağla", profileAbout: "Haqqında", profileInterests: "Elmi maraqlar", profileLinks: "Əlaqə, elmi və peşəkar profillər", profilePublications: "Seçilmiş nəşrlər", email: "E-poçt", linkedIn: "LinkedIn", googleScholar: "Google Scholar", orcid: "ORCID", scopus: "Scopus", researchGate: "ResearchGate",
    peopleEyebrow: "ARS insanları", peoplePageTitle: "Cəmiyyətimizi formalaşdıran<br /><em>insanlarla tanış olun.</em>", peoplePageText: "İcra Şurası cəmiyyətin gündəlik istiqamətini və proqramlarını idarə edir. Elmi Məsləhət Şurası isə akademik keyfiyyət, tədqiqat prioritetləri və uzunmüddətli inkişaf üzrə məsləhət verir.", executiveChoiceTitle: "İcra Şurası", executiveChoiceText: "ARS-in strategiyasını, proqramlarını, kommunikasiyasını və icma fəaliyyətini idarə edən komanda.", advisoryChoiceTitle: "Elmi Məsləhət Şurası", advisoryChoiceText: "Cəmiyyətin elmi istiqamətini gücləndirən və müxtəlif sahələr üzrə təcrübə təqdim edən tədqiqatçılar.", exploreBoard: "Şuraya bax", backToPeople: "İnsanlar bölməsinə qayıt", executivePageText: "Cəmiyyətin missiyasını gündəlik fəaliyyətə çevirən və proqramların həyata keçirilməsinə rəhbərlik edən komanda.", advisoryPageText: "ARS-in elmi keyfiyyətini, fənlərarası istiqamətini və tədqiqat əlaqələrini dəstəkləyən mütəxəssislər.",
    communityKicker: "Elmin gələcəyində sənin də yerin var", communityTitle: "Maraq göstər.<br />Əlaqə qur.<br /><em>Təsir yarat.</em>", communityText: "Tədqiqatçı, tələbə, mentor və ya elm həvəskarı olmağınızdan asılı olmayaraq, ARS icması sizin üçün açıqdır.", becomeMember: "Üzv olmaq üçün yaz",
    contactLabel: "Əlaqə", contactTitle: "Sualınız və ya ideyanız var?<br /><em>Bizə yazın.</em>", contactIntro: "Üzvlük, tədbirlər, tərəfdaşlıq və elmi əməkdaşlıq barədə müraciətlərinizi bu forma vasitəsilə göndərə bilərsiniz.", formName: "Ad və soyad", formEmail: "E-poçt ünvanı", formOrganization: "Universitet və ya təşkilat", formCountry: "Ölkə", formTopic: "Müraciətin mövzusu", formChooseTopic: "Mövzu seçin", topicMembership: "Üzvlük", topicWorkshop: "Təlim və tədbirlər", topicPartnership: "Tərəfdaşlıq", topicSpeaker: "Spiker təklifi", topicAdvisory: "Elmi Məsləhət Şurası", topicGeneral: "Ümumi müraciət", topicOther: "Digər", formMessage: "Mesaj", formConsent: "Məlumatlarımın müraciətimə cavab vermək məqsədilə emal edilməsinə razıyam.", formSubmit: "Mesajı göndər", formSending: "Göndərilir…", formSuccess: "Təşəkkür edirik. Mesajınız ARS komandasına göndərildi.", formError: "Mesaj göndərilmədi. Bir qədər sonra yenidən cəhd edin və ya bizə e-poçt göndərin.",
    footerTagline: "Azərbaycanlı tədqiqatçıları dünya miqyasında birləşdiririk.", footerExplore: "Kəşf et", footerConnect: "Əlaqə", metaDescription: "Azərbaycan Tədqiqat Cəmiyyəti — azərbaycanlı tədqiqatçıları birləşdirən qlobal elmi icma."
  },
  en: {
    skip: "Skip to main content", navLabel: "Primary navigation", languageLabel: "Language selection", statsLabel: "Society highlights", valuesLabel: "Our values", journeyLabel: "Long-term development path", menuOpen: "Open menu", menuClose: "Close menu", navAbout: "About", navPrograms: "Programs", navWorkshop: "Workshop", navDepartments: "Departments", navTeam: "People", navCommunity: "Community", navContact: "Contact",
    heroEyebrow: "Science · Research · Collaboration", heroTitle: "Advancing Azerbaijani science,<br /><em>together.</em>", heroText: "An open platform connecting Azerbaijani researchers, students, and science enthusiasts across the world.", joinUs: "Join the community", explorePrograms: "Explore our programs",
    manifestoLabel: "Our manifesto", people: "PEOPLE", ideas: "IDEAS", research: "RESEARCH", impact: "IMPACT", manifestoText: "A strong scientific community grows through knowledge-sharing and lasting collaboration.", scroll: "Discover more",
    aboutLabel: "About us", aboutLead: "We are a network of researchers crossing borders, sharing knowledge, and shaping <em>the future of Azerbaijani science</em> together.", aboutText1: "Azerbaijan Research Society (ARS) is a non-profit initiative connecting Azerbaijani scholars and students across scientific disciplines.", aboutText2: "Our mission is to create an accessible environment for open dialogue, mentorship, and multidisciplinary collaboration.", problemLabel: "The problem", problemTitle: "Direct access to opportunity is limited", problemText: "Many students cannot find formal pathways to active researchers, laboratories, and real research projects.", purposeLabel: "Our purpose", purposeTitle: "Turn shared questions into real outcomes", purposeText: "We bring people together across disciplines to create collaboration, research, and measurable academic outcomes.", statApplicants: "Applicants in our first round", statDepartments: "Research departments", statPathways: "Community pathways", valueBorderless: "Borderless", valueOpen: "Open community", valueInterdisciplinary: "Interdisciplinary", valueResults: "Result-oriented", valueGrowth: "Growth & contribution",
    programsLabel: "Community model", programsTitle: "From an idea to a real<br /><em>research outcome.</em>", programsIntro: "ARS programs create a clear progression from first scientific curiosity to skills, collaboration, and visible academic outcomes.", seminarsTitle: "Researcher meetups", seminarsText: "Direct exposure to active researchers, their experience, and areas of work.", networkTitle: "Mentor matching", networkText: "Connecting students with mentors and research directions that fit their interests.", mentorshipTitle: "Monthly masterclasses", mentorshipText: "Practical skills in academic writing, data analysis, proposals, grants, and peer review.", sprintsTitle: "Project sprints & shared labs", sprintsText: "Result-oriented collaboration bringing participants together around real research problems.", outputsTitle: "Presenting results", outputsText: "Turning learning into papers, posters, datasets, presentations, and other concrete academic outputs.", learnMore: "Learn more", journeyTitle: "Long-term goal", journeyCommunity: "Research community", journeySociety: "Research society", journeyNetwork: "Research network", journeyCenter: "Independent research center", programPathLabel: "Four-stage research pathway", programPathTitle: "A clear route from curiosity to research impact.", programPathHint: "Select each stage to see how participants connect, build capability, collaborate, and share their work.", phaseConnect: "Connect", phaseDevelop: "Develop", phaseCollaborate: "Collaborate", phasePublish: "Publish", phaseConnectText: "We bring people, ideas, and the right research direction together.", phaseDevelopText: "We build practical, transferable skills for doing rigorous research.", phaseCollaborateText: "We turn shared questions into structured research projects.", phasePublishText: "We help convert completed work into visible, shareable academic outputs.", programIncludes: "This stage includes", programOutcome: "Expected outcome", connectOutcome: "Clearer direction and the right research relationships", developOutcome: "Core research skills for more independent work", collaborateOutcome: "Team experience, project evidence, and tested results", publishOutcome: "A paper, poster, dataset, or scientific presentation", programPathCta: "I am interested in this stage", programOverviewLabel: "ARS research pathway",
    workshopLabel: "Early Researcher Workshop", workshopBadge: "Free · Online · 3 weeks", workshopTitle: "From a research idea<br /><em>to publication.</em>", workshopSummary: "Three masterclasses, practical assignments, and a structured weekly journey for early-career researchers.", weekOne: "Week 1", weekTwo: "Week 2", weekThree: "Week 3", methodsTitle: "Research Methods", methodsText: "Developing a research question, selecting an appropriate methodology, and building a sound research plan.", ethicsTitle: "Research Ethics", ethicsText: "Academic integrity, informed consent, authorship, and responsible research practice.", publishingTitle: "How to Submit a Paper", publishingText: "Choosing a suitable journal, preparing submission materials, and navigating peer review.", formatTitle: "Format", formatText: "Delivered in Azerbaijani or English depending on the presenter and material availability", tasksTitle: "Weekly assignments", tasksText: "Each assignment is completed before the following week's topic begins", workshopCta: "Register interest",
    departmentsLabel: "Research departments", departmentsTitle: "Different fields.<br /><em>Shared questions.</em>", engineeringTitle: "Engineering & applied technology", engineeringText: "Collaboration across energy, mechanics, materials, and industrial technologies.", lifeTitle: "Natural & life sciences", lifeText: "Interdisciplinary work in biology, chemistry, neuroscience, and the environment.", dataTitle: "Data, AI & mathematical sciences", dataText: "Data analysis, modelling, artificial intelligence, and computational methods.", socialTitle: "Social sciences & humanities", socialText: "Research and dialogue across linguistics, education, society, and culture.", departmentNote: "Members may participate in up to two departments based on their interests and experience.",
    teamLabel: "Executive Board", teamTitle: "Meet the people<br /><em>behind the idea.</em>", advisoryLabel: "Scientific Advisory Board", advisoryTitle: "Experts turning experience into<br /><em>scientific direction.</em>", roleFounder: "Founder", roleCofounder: "Co-founder", roleResearch: "Director of Research Programs", roleComms: "Head of Communications & Public Relations", roleProject: "Project Coordinator", roleAdmin: "Administrative Affairs Specialist", roleClinical: "Clinical Psychologist", roleAdvisory: "Scientific Advisory Board member", roleAdvisoryHead: "Head of the Scientific Advisory Board", leadershipLayer: "Leadership", operationsLayer: "Programs & operations", chairLayer: "Board head", advisoryMembersLayer: "Board members", boardHint: "Select a person to view their profile", ibrahimProfile: "Sakarya University · PhD candidate<br />Solid-state physics · DFT", masudProfile: "KFUPM · PhD candidate<br />Gas hydrates · Reservoir modelling", humayProfile: "Imperial College London · MSc<br />Aerospace · Fluid mechanics", jaleProfile: "VMU & JGU · Sociolinguistics<br />Code-switching · Language variation", nargizProfile: "Khazar University<br />Data analytics · Neuroscience", zehraProfile: "Khazar University<br />Reservoir modelling · Machine learning", xeyranseProfile: "Khazar Medical Center<br />Clinical psychology · Psychotherapy", amilProfile: "NCBJ / NOMATEN · BEU · UCL<br />Computational materials science · AI", azizehProfile: "Sabancı University<br />Smart coatings · Biomaterials", sabrinProfile: "Al Ain University · Abu Dhabi<br />Medical education · Digital health", ulkarProfile: "Institute of Physics · ASMA<br />Photocatalysis · Condensed-matter physics", nijatProfile: "ECOHUB · Sakarya University<br />Analytical chemistry · Sustainable materials", orkhanProfile: "ASOIU · Universal Energy<br />Energy systems · Renewable energy", viewProfile: "View profile", closeProfile: "Close profile", profileAbout: "About", profileInterests: "Research interests", profileLinks: "Contact, academic & professional profiles", profilePublications: "Selected publications", email: "Email", linkedIn: "LinkedIn", googleScholar: "Google Scholar", orcid: "ORCID", scopus: "Scopus", researchGate: "ResearchGate",
    peopleEyebrow: "People at ARS", peoplePageTitle: "Meet the people shaping<br /><em>our society.</em>", peoplePageText: "The Executive Board leads the society's daily direction and programs. The Scientific Advisory Board advises on academic quality, research priorities, and long-term development.", executiveChoiceTitle: "Executive Board", executiveChoiceText: "The team responsible for ARS strategy, programs, communications, and community operations.", advisoryChoiceTitle: "Scientific Advisory Board", advisoryChoiceText: "Researchers who strengthen the society's scientific direction and contribute expertise across disciplines.", exploreBoard: "Explore the board", backToPeople: "Back to People", executivePageText: "The team turning the society's mission into daily action and leading the delivery of its programs.", advisoryPageText: "Experts supporting ARS's scientific quality, interdisciplinary direction, and research connections.",
    communityKicker: "You have a place in the future of science", communityTitle: "Stay curious.<br />Make connections.<br /><em>Create impact.</em>", communityText: "Whether you are a researcher, student, mentor, or science enthusiast, the ARS community is open to you.", becomeMember: "Write to become a member",
    contactLabel: "Contact", contactTitle: "Have a question or an idea?<br /><em>Write to us.</em>", contactIntro: "Use this form for membership, events, partnerships, and scientific collaboration enquiries.", formName: "Full name", formEmail: "Email address", formOrganization: "University or organization", formCountry: "Country", formTopic: "Reason for contacting", formChooseTopic: "Choose a topic", topicMembership: "Membership", topicWorkshop: "Workshops and events", topicPartnership: "Partnership", topicSpeaker: "Speaker proposal", topicAdvisory: "Scientific Advisory Board", topicGeneral: "General enquiry", topicOther: "Other", formMessage: "Message", formConsent: "I agree that my information may be processed for the purpose of responding to my enquiry.", formSubmit: "Send message", formSending: "Sending…", formSuccess: "Thank you. Your message has been sent to the ARS team.", formError: "Your message could not be sent. Please try again later or email us directly.",
    footerTagline: "Connecting Azerbaijani researchers around the world.", footerExplore: "Explore", footerConnect: "Connect", metaDescription: "Azerbaijan Research Society connects Azerbaijani researchers, students, and science enthusiasts around the world."
  },
  amil: {
    name: "Amil Aligayev",
    roleKey: "roleAdvisoryHead",
    image: "assets/amil.webp?v=14",
    bio: {
      az: [
        "Amil Aligayev materialşünas və hesablama fizikidir. O, Polşada Milli Nüvə Tədqiqatları Mərkəzinin NOMATEN Mükəmməllik Mərkəzində assistent professor, Bakı Mühəndislik Universitetinin Elmi-Tədqiqat Mərkəzində tədqiqatçı və University College London-da elmi işçidir.",
        "Tədqiqatlarında sıxlıq funksionalı nəzəriyyəsi, molekulyar dinamika, çoxmiqyaslı modelləşdirmə və süni intellektdən istifadə edir. Elmi fəaliyyəti kataliz, hidrogen və CO₂ çevrilməsi, nüvə və konstruksiya materialları, ikiölçülü materiallar, sensor texnologiyaları və kristal strukturların proqnozlaşdırılmasını əhatə edir."
      ],
      en: [
        "Amil Aligayev is a materials scientist and computational physicist. He is an Assistant Professor at the NOMATEN Centre of Excellence, National Centre for Nuclear Research in Poland, a researcher at Baku Engineering University, and a Research Fellow at University College London.",
        "His work combines density functional theory, molecular dynamics, multiscale modelling, and artificial intelligence. His research spans catalysis, hydrogen and CO₂ conversion, nuclear and structural materials, two-dimensional materials, sensing technologies, and AI-assisted crystal-structure prediction."
      ]
    },
    interests: {
      az: ["Hesablama materialşünaslığı", "Çoxmiqyaslı modelləşdirmə", "Nanomateriallar", "Materialların kəşfində süni intellekt", "DFT və molekulyar dinamika"],
      en: ["Computational materials science", "Multiscale modelling", "Nanomaterials", "AI for materials discovery", "DFT & molecular dynamics"]
    },
    links: [
      { labelKey: "linkedIn", url: "https://www.linkedin.com/in/amilaligayev/" },
      { labelKey: "googleScholar", url: "https://scholar.google.com/citations?user=BpMftfMAAAAJ&hl=en&oi=ao" }
    ]
  },
  azizeh: {
    name: "Azizeh Hosseinjany",
    roleKey: "roleAdvisory",
    image: "assets/azizeh.webp?v=14",
    bio: {
      az: [
        "Azizeh Hosseinjany Sabancı Universitetinin Mühəndislik və Təbiət Elmləri fakültəsində postdoktoral tədqiqatçıdır. Hazırda TÜBİTAK-ın metal səthlər üçün ağıllı örtüklər layihəsində funksional örtüklər, səth mühəndisliyi, korroziyadan mühafizə və qabaqcıl metal materialları araşdırır.",
        "O, 2025-ci ildə Koç Universitetində Mexanika mühəndisliyi üzrə doktorluq dərəcəsi alıb. Doktorantura tədqiqatında biotibbi yüksək entropiyalı ərintilərin maşın öyrənməsi ilə dizaynını hesablama və eksperimental üsullarla birləşdirib; mikrostruktur, korroziya, nazik təbəqələr, ion ayrılması, səth xarakterizasiyası və biouyğunluğu öyrənib."
      ],
      en: [
        "Azizeh Hosseinjany is a postdoctoral researcher at the Faculty of Engineering and Natural Sciences at Sabancı University. Her current TÜBİTAK project on smart coatings for metal surfaces focuses on functional coatings, surface engineering, corrosion protection, and advanced metallic materials.",
        "She received her PhD in Mechanical Engineering from Koç University in 2025. Her doctoral research combined computational and experimental methods to design biomedical high-entropy alloys with machine learning, covering microstructure, corrosion, thin films, ion release, surface characterization, and biocompatibility."
      ]
    },
    interests: {
      az: ["Ağıllı və funksional örtüklər", "Səth mühəndisliyi", "Yüksək entropiyalı ərintilər", "Korroziya və elektrokimya", "Biomateriallar", "Materialşünaslıqda maşın öyrənməsi"],
      en: ["Smart & functional coatings", "Surface engineering", "High-entropy alloys", "Corrosion & electrochemistry", "Biomaterials", "Machine learning in materials science"]
    },
    links: [
      { labelKey: "email", text: "a.hosseinjany@sabanciuniv.edu", url: "mailto:a.hosseinjany@sabanciuniv.edu" },
      { labelKey: "email", text: "ahosseinjany20@ku.edu.tr", url: "mailto:ahosseinjany20@ku.edu.tr" },
      { labelKey: "linkedIn", url: "https://www.linkedin.com/in/azizeh-hosseinjany-5472a8b5/" },
      { labelKey: "googleScholar", url: "https://scholar.google.com/citations?user=ZeQXwcIAAAAJ" }
    ]
  },
  sabrin: {
    name: "Sabrin Ali Azim",
    roleKey: "roleAdvisory",
    image: "assets/sabrin.webp?v=14",
    bio: {
      az: [
        "Sabrin Ali Azim tibb üzrə fəlsəfə doktoru, dosent, ağız və üz-çənə cərrahı və tədqiqatçıdır. O, Azərbaycan Tibb Universitetində stomatologiya, ağız və üz-çənə cərrahiyyəsi ixtisası və doktorantura təhsili alıb, hazırda Abu Dabidə Al Ain Universitetində fəaliyyət göstərir.",
        "Onun işi klinik tibb və stomatologiyanı tibb təhsili, süni intellekt, rəqəmsal transformasiya, keyfiyyət təminatı, akkreditasiya, institusional idarəetmə və səhiyyə siyasəti ilə birləşdirir. BƏƏ universitetlərində tədris, kurikulum və qiymətləndirmə, tədqiqata rəhbərlik və keyfiyyət təminatı sahələrində təcrübəyə malikdir."
      ],
      en: [
        "Sabrin Ali Azim is an Associate Professor, PhD in medicine, oral and maxillofacial surgeon, and researcher. She completed her dentistry, oral and maxillofacial surgery specialization, and doctoral training at Azerbaijan Medical University and is currently based at Al Ain University in Abu Dhabi.",
        "Her interdisciplinary work connects clinical medicine and dentistry with medical education, artificial intelligence, digital transformation, quality assurance, accreditation, institutional governance, and health policy. She has experience in university teaching, curriculum and assessment, research supervision, and quality assurance in the UAE."
      ]
    },
    interests: {
      az: ["Tibb və stomatoloji təhsil", "Süni intellekt və rəqəmsal səhiyyə", "Səhiyyə sistemləri və idarəetmə", "Keyfiyyət təminatı və akkreditasiya", "Ağız və üz-çənə cərrahiyyəsi"],
      en: ["Medical & dental education", "AI & digital health", "Health systems & governance", "Quality assurance & accreditation", "Oral & maxillofacial surgery"]
    },
    links: [
      { labelKey: "orcid", url: "https://orcid.org/0000-0002-8933-2196" },
      { labelKey: "scopus", url: "https://www.scopus.com/authid/detail.uri?authorId=57189626522" },
      { labelKey: "researchGate", url: "https://www.researchgate.net/profile/Sabrin-Azim" },
      { labelKey: "googleScholar", url: "https://scholar.google.com/scholar?q=%22Sabrin+Ali+Azim%22" }
    ],
    publications: [
      { citation: "Annamma, L. M., et al. (2024). Current challenges in dental education: A scoping review. BMC Medical Education, 24, 1523.", doi: "10.1186/s12909-024-06545-1" },
      { citation: "Annamma, L. M., Al Khabuli, J., Azim, S. A., et al. (2024). Undergraduate dental curricula in Middle Eastern and Arabic-speaking African nations: A cross-sectional study. The Saudi Dental Journal, 36(12), 1681–1687.", doi: "10.1016/j.sdentj.2024.10.003" }
    ]
  }
};

const profiles = {
  amil: translations.amil,
  azizeh: translations.azizeh,
  sabrin: translations.sabrin,
  ulkar: {
    name: "Ulkar Samadova",
    roleKey: "roleAdvisory",
    image: "assets/ulkar.webp?v=15",
    bio: {
      az: [
        "Ulkar Samadova kondensə olunmuş maddə fizikası və dayanıqlı enerji materialları üzrə çalışan fizikdir. O, Azərbaycan Respublikası Elm və Təhsil Nazirliyinin Fizika İnstitutunda Elektrik mühəndisliyi və yüksək gərginlik fizikası laboratoriyasının böyük elmi işçisi, Azərbaycan Dövlət Dəniz Akademiyasında isə Tətbiqi mexanika kafedrasının müəllimidir.",
        "Tədqiqatları fotokatalitik CO₂ reduksiyası, ikiölçülü perovskit və xalkopirit heterostrukturlar, yarımkeçirici və ferrit nanokompozitlərin elektrik, maqnit, termoelektrik və fotokatalitik xassələrini əhatə edir. O, material sintezi və interfeys mühəndisliyini eksperimental xarakterizasiya və nəzəri modelləşdirmə ilə birləşdirir."
      ],
      en: [
        "Ulkar Samadova is a physicist working in condensed-matter physics and sustainable-energy materials. She is a Senior Scientist in the Laboratory of Electrical Engineering and High Voltage Physics at the Institute of Physics of Azerbaijan's Ministry of Science and Education, and a Lecturer in Applied Mechanics at the Azerbaijan State Marine Academy.",
        "Her research spans photocatalytic CO₂ reduction, two-dimensional perovskite and chalcopyrite heterostructures, and the electrical, magnetic, thermoelectric, and photocatalytic properties of semiconductor and ferrite nanocomposites. She combines material synthesis and interface engineering with experimental characterization and theoretical modelling."
      ]
    },
    interests: {
      az: ["Fotokatalitik CO₂ reduksiyası", "Kondensə olunmuş maddə fizikası", "2D heterostrukturlar", "Yarımkeçirici materiallar", "Maqnit və termoelektrik xassələr"],
      en: ["Photocatalytic CO₂ reduction", "Condensed-matter physics", "2D heterostructures", "Semiconductor materials", "Magnetic & thermoelectric properties"]
    },
    links: [
      { labelKey: "email", text: "ulkar.samadova@adda.edu.az", url: "mailto:ulkar.samadova@adda.edu.az" },
      { labelKey: "orcid", url: "https://orcid.org/0000-0002-8564-9217" },
      { labelKey: "googleScholar", url: "https://scholar.google.com/citations?user=MW93RKoAAAAJ" }
    ],
    publications: [
      { citation: "Samadova, U. F., et al. (2026). Insights of photocatalytic properties of Fe/TiO₂ bio-based particles: Experimental and modeling design toward methyl orange photodegradation. Entropy, 28(6), 632.", doi: "10.3390/e28060632" },
      { citation: "Samadova, U. F., et al. (2025). Novel single perovskite material for visible-light photocatalytic CO₂ reduction via joint experimental and DFT study. Small, 21(2), 2407206.", doi: "10.1002/smll.202407206" },
      { citation: "Samadova, U. F., et al. (2025). Dissociative mechanism from NH₃ and CH₄ on Ni-doped graphene: Tuning electronic and optical properties. Applied Surface Science, 686, 162022.", doi: "10.1016/j.apsusc.2024.162022" },
      { citation: "Samadova, U. F., et al. (2025). Computational study of water adsorption and dissociative mechanisms impacting g-C₃N₄'s optical and electronic properties. International Journal of Hydrogen Energy, 102, 284–294.", doi: "10.1016/j.ijhydene.2024.12.515" }
    ]
  },
  nijat: {
    name: "Nijat Jabrayilov",
    roleKey: "roleAdvisory",
    image: "assets/nijat.webp?v=15",
    bio: {
      az: [
        "Nijat Jabrayilov kimya mühəndisi, analitik kimyaçı və ECOHUB Kimya və Biotexnologiya A.Ş.-də elmi-tədqiqat və inkişaf rəhbəridir. O, Sumqayıt Dövlət Universitetində Kimya mühəndisliyi üzrə bakalavr, Muğla Sıtkı Koçman Universitetində Analitik kimya üzrə magistr təhsili alıb və Sakarya Universitetində Analitik kimya üzrə doktorantdır.",
        "O, kənd təsərrüfatı tullantılarının dəyərləndirilməsi, biokütlə əsaslı materiallar, bioloji parçalana bilən polimerlər, fotokataliz, çirkab suların təmizlənməsi və davamlı kimyəvi texnologiyalar üzrə tədqiqat və pilot tətbiqləri əlaqələndirir. Təcrübəsi material sintezi, UV–Vis, FTIR, HPLC, GC, elektrokimyəvi sistemlər və universitet-sənaye əməkdaşlığını əhatə edir."
      ],
      en: [
        "Nijat Jabrayilov is a chemical engineer, analytical chemist, and R&D Manager at ECOHUB Kimya ve Biyoteknoloji A.Ş. He holds a BSc in Chemical Engineering from Sumgait State University and an MSc in Analytical Chemistry from Muğla Sıtkı Koçman University, and is pursuing a PhD in Analytical Chemistry at Sakarya University.",
        "He coordinates research and pilot applications in agricultural-waste valorisation, biomass-derived materials, biodegradable polymers, photocatalysis, wastewater treatment, and sustainable chemical technologies. His experience covers material synthesis, UV–Vis, FTIR, HPLC, GC, electrochemical systems, and university–industry collaboration."
      ]
    },
    interests: {
      az: ["Analitik kimya", "Funksional və nanostrukturlu materiallar", "Fotokataliz", "Biokütlənin dəyərləndirilməsi", "Bioloji parçalana bilən polimerlər", "Ətraf mühit texnologiyaları"],
      en: ["Analytical chemistry", "Functional & nanostructured materials", "Photocatalysis", "Biomass valorisation", "Biodegradable polymers", "Environmental technologies"]
    },
    links: [
      { labelKey: "orcid", url: "https://orcid.org/0000-0003-0331-0090" },
      { labelKey: "googleScholar", url: "https://scholar.google.com/citations?user=rKFDNfEAAAAJ&hl=tr&authuser=1" },
      { labelKey: "researchGate", url: "https://www.researchgate.net/profile/Nijat-Jabrayilov?ev=hdr_xprf" }
    ],
    publications: [
      { citation: "Precipitation-induced assembly of a g-C₅N₆–Ag nanohybrid catalyst for synergistic UV and visible-light-driven photocatalytic degradation of methylene blue. (2026). Surfaces and Interfaces.", doi: "10.1016/j.surfin.2026.110604" },
      { citation: "Sn–Cu–Fe-doped graphitic g-C₃N₄ hetero photocatalyst for the removal of methylene blue. (2026). Chemical Engineering & Technology, 49, e70234.", doi: "10.1002/ceat.70234" },
      { citation: "Alterations in trace element profiles in gastric cancer tissues: Diagnostic biomarker potential and association with clinical stages. (2026). Environmental Geochemistry and Health, 48, 170.", doi: "10.1007/s10653-026-03072-4" },
      { citation: "Controlled synthesis pathways of g-C₂N₃ derivatives for tailored structure and enhanced photocatalytic activity. (2025). Surfaces and Interfaces, 76, 107928.", doi: "10.1016/j.surfin.2025.107928" }
    ]
  },
  orkhan: {
    name: "Orkhan Jafarli",
    roleKey: "roleAdvisory",
    image: "assets/orkhan.webp?v=21",
    bio: {
      az: [
        "Orkhan Jafarli enerji mühəndisi, tədqiqatçı və Azərbaycan Dövlət Neft və Sənaye Universitetində doktorantdır. O, həmin universitetdə İstilik energetikası üzrə bakalavr və Bərpa olunan enerji mənbələri üzrə magistr dərəcələri alıb. Enerji sektorunda təxminən beş illik təcrübəsi var; Səngəçal Elektrik Stansiyasında növbə rəisi və Səngəçal bp Terminalında növbə elektrik mühəndisi kimi çalışıb. Hazırda Universal Energy-nin günəş elektrik stansiyasında fəaliyyət göstərir.",
        "Onun tədqiqatları enerji sistemləri, istilik enerjisi, bərpa olunan isitmə, enerji səmərəliliyi, istilik nasosları, geotermal və günəş enerjisi, mərkəzləşdirilmiş istilik təchizatı, model proqnozlaşdırıcı idarəetmə və enerji sistemlərinin optimallaşdırılmasını əhatə edir. Enerji sistemlərinin modelləşdirilməsini texniki-iqtisadi, ekoloji və optimallaşdırma yanaşmaları ilə birləşdirir; həmçinin Energy Conversion and Management: X və Renewable Energy jurnalları üçün rəyçi kimi fəaliyyət göstərir."
      ],
      en: [
        "Orkhan Jafarli is an energy engineer, researcher, and PhD student at Azerbaijan State Oil and Industry University. He holds a bachelor's degree in Thermal Power Engineering and a master's degree in Renewable Energy Sources from ASOIU. He has approximately five years of energy-sector experience, including work as a Shift Supervisor at the Sangachal Power Plant and a Shift Electrical Engineer at the Sangachal bp Terminal. He currently works at a solar power plant operated by Universal Energy.",
        "His research spans energy systems, thermal energy, renewable heating, energy efficiency, heat pumps, geothermal and solar energy, district heating, model predictive control, and energy-system optimization. He combines energy-system modelling with techno-economic, environmental, and optimization approaches and also reviews research for Energy Conversion and Management: X and Renewable Energy."
      ]
    },
    interests: {
      az: ["Enerji sistemlərinin modelləşdirilməsi", "Bərpa olunan enerji", "Enerji səmərəliliyi", "İstilik nasosları və geotermal enerji", "Günəş enerjisi və mərkəzləşdirilmiş istilik", "Model proqnozlaşdırıcı idarəetmə"],
      en: ["Energy-system modelling", "Renewable energy", "Energy efficiency", "Heat pumps & geothermal energy", "Solar energy & district heating", "Model predictive control"]
    },
    links: [
      { labelKey: "email", text: "orkhanjafarr@gmail.com", url: "mailto:orkhanjafarr@gmail.com" },
      { labelKey: "linkedIn", url: "https://www.linkedin.com/in/orkhan-jafarli-9188b71b4/" },
      { labelKey: "googleScholar", url: "https://scholar.google.com/citations?user=LxQSDdYAAAAJ&hl=ru" }
    ]
  },
  ibrahim: {
    name: "İbrahim Məmmədov",
    roleKey: "roleFounder",
    image: "assets/ibrahim.webp?v=10",
    bio: {
      az: [
        "İbrahim Məmmədov Azərbaycan Dövlət Neft və Sənaye Universitetində Elektrik mühəndisliyi üzrə bakalavr, Sənaye komplekslərinin avtomatlaşdırılması və elektrik intiqalı üzrə magistr təhsili alıb. Magistratura dövründə müxtəlif şirkətlərdə elektrik mühəndisi kimi çalışıb və inteqrasiya olunmuş monitorinq-idarəetmə sistemi vasitəsilə mancanaq dəzgahının səmərəliliyinin artırılmasını araşdırıb.",
        "Hazırda Sakarya Universitetində Elektrik və Elektronika Mühəndisliyi üzrə doktorantdır. Tədqiqatları bərk cisim fizikası, superkeçiricilər və yarımkeçiricilər üzərində cəmlənir. DFT və ilk prinsiplər hesablamaları ilə materialların struktur, elektron və fonon xassələrini, o cümlədən RT₃X₂ birləşmələrində yüksək superkeçiricilik keçid temperaturunu araşdırır."
      ],
      en: [
        "İbrahim Məmmədov holds a bachelor's degree in Electrical Engineering and a master's degree in Automation of Industrial Complexes and Electric Drives from Azerbaijan State Oil and Industry University. Alongside his graduate studies, he worked as an electrical engineer and researched efficiency improvement in sucker-rod pumping through an integrated monitoring and control system.",
        "He is currently a PhD candidate in Electrical and Electronics Engineering at Sakarya University. His research focuses on solid-state physics, superconductors, and semiconductors. Using density functional theory and first-principles calculations, he studies structural, electronic, and phonon properties, including high superconducting transition temperatures in RT₃X₂ compounds."
      ]
    },
    interests: {
      az: ["Bərk cisim fizikası", "DFT və ilk prinsiplər", "Superkeçirici materiallar", "Elektron və fonon xassələri"],
      en: ["Solid-state physics", "DFT & first principles", "Superconducting materials", "Electronic & phonon properties"]
    },
    links: [
      { labelKey: "email", text: "ibrahim.mammadov@azresearchsociety.org", url: "mailto:ibrahim.mammadov@azresearchsociety.org" },
      { labelKey: "linkedIn", url: "https://www.linkedin.com/in/ibrahim-mammadov2024/" },
      { labelKey: "googleScholar", url: "https://scholar.google.com/citations?hl=en&user=jq8s5RAAAAAJ" }
    ]
  },
  masud: {
    name: "Məsud Babayev",
    roleKey: "roleCofounder",
    image: "assets/masud.webp?v=23",
    bio: {
      az: [
        "Məsud Babayev Azərbaycan Dövlət Neft və Sənaye Universitetində Neft-qaz mühəndisliyi üzrə bakalavr, Xəzər Universitetində Neft-qaz yataqlarının işlənilməsi üzrə magistr təhsili alıb. Magistratura dövründə SOCAR-da mühəndis kimi çalışıb.",
        "Hazırda Kral Fəhd Neft və Minerallar Universitetinin (KFUPM) Neft Mühəndisliyi və Yer Elmləri Kollecində doktorant, Mikroflüidika laboratoriyasında elmi-tədqiqat assistenti və universitetdə tədris assistentidir. Tədqiqatları qaz hidratlarının nüvələnmə kinetikası, CO₂ sekvestrasiyası üçün CH₄-CO₂ əvəzlənməsi, molekulyar dinamika, lay simulyasiyası, qeyri-müəyyənliyin qiymətləndirilməsi, SAGD və neft-mədən sistemlərinin optimallaşdırılmasını əhatə edir."
      ],
      en: [
        "Masud Babayev holds a bachelor's degree in Petroleum Engineering from Azerbaijan State Oil and Industry University and a master's degree in Oil and Gas Field Development from Khazar University. During his graduate studies, he worked as an engineer at SOCAR.",
        "He is currently a PhD student at the College of Petroleum Engineering and Geosciences at King Fahd University of Petroleum and Minerals (KFUPM), a research assistant in the Microfluidics Laboratory, and a teaching assistant. His research spans gas-hydrate nucleation kinetics, CH₄-CO₂ replacement for carbon sequestration, molecular dynamics, reservoir simulation, uncertainty assessment, SAGD, and optimization of oilfield systems."
      ]
    },
    interests: {
      az: ["Qaz hidratları", "Molekulyar dinamika", "Lay modelləşdirilməsi", "CO₂ sekvestrasiyası", "SAGD optimallaşdırılması"],
      en: ["Gas hydrates", "Molecular dynamics", "Reservoir modelling", "CO₂ sequestration", "SAGD optimization"]
    },
    links: [
      { labelKey: "email", text: "masud.babayev@azresearchsociety.org", url: "mailto:masud.babayev@azresearchsociety.org" },
      { labelKey: "linkedIn", url: "https://www.linkedin.com/in/masudbabayev" },
      { labelKey: "googleScholar", url: "https://scholar.google.com/citations?view_op=list_works&hl=en&user=AyVFs9oAAAAJ" }
    ],
    publications: [
      { citation: "Jamalbayov, M. A., Valiyev, N. A., Ibrahimov, Kh. M., Babayev, M. M., & Novruzova, S. H. (2024). Energy and efficiency optimization in sucker-rod pumping using discrete-imitation modeling concept: Application to well operations in the Bibi-Eibat field of Azerbaijan. SOCAR Proceedings, Special Issue No. 1, 95–101.", doi: "10.5510/OGP2024SI101005" },
      { citation: "Babayev, M., Penkov, G., & Asadov, S. (2024). Enhancing SAGD efficiency: A study on steam quality and injection rate optimization. Improved Oil and Gas Recovery, 8.", doi: "10.14800/IOGR.1305" },
      { citation: "Yu, W., Babayev, M., & Sultan, A. S. (2026). Minimizing dissolution effects in CO₂-water interfacial tension measurements using the rising pendant drop method. The Journal of Physical Chemistry B, 130(1), 610–617.", doi: "10.1021/acs.jpcb.5c07438" }
    ]
  },
  xeyranse: {
    name: "Xeyrənsə Rüstəmova",
    roleKey: "roleClinical",
    image: "assets/xeyranse.webp?v=24",
    bio: {
      az: [
        "Xeyrənsə Rüstəmova 2018–2022-ci illərdə Bakı Dövlət Universitetində Sosial elmlər və psixologiya ixtisası üzrə bakalavr, 2023–2025-ci illərdə Odlar Yurdu Universitetində Klinik psixologiya üzrə magistr təhsili alıb. Magistratura təhsili ilə paralel olaraq bir sıra kurs və beynəlxalq təlimlərdə iştirak edib.",
        "2025-ci ildən Xəzər Tibb Mərkəzinin Poliklinika şöbəsində psixoloq kimi fəaliyyət göstərir, yeniyetmə və böyüklərlə onlayn və üz-üzə seanslar keçirir. Klinik psixologiya, psixoterapiya və klinik qiymətləndirmə ilə maraqlanır; praktik biliklərini hal müzakirələri, klinik yanaşmalar və praktik yönümlü təlimlər vasitəsilə tələbələrlə bölüşməyi hədəfləyir."
      ],
      en: [
        "Xeyrənsə Rüstəmova earned a bachelor's degree in Social Sciences and Psychology from Baku State University in 2018–2022 and a master's degree in Clinical Psychology from Odlar Yurdu University in 2023–2025. Alongside her graduate studies, she completed a range of courses and international training programs.",
        "Since 2025, she has worked as a psychologist in the outpatient department of Khazar Medical Center, providing online and in-person sessions for adolescents and adults. Her interests include clinical psychology, psychotherapy, and clinical assessment; she aims to share practical knowledge through case discussions, clinical approaches, and practice-oriented training that strengthens students' clinical thinking and practical skills."
      ]
    },
    interests: {
      az: ["Klinik psixologiya", "Psixoterapiya", "Klinik qiymətləndirmə"],
      en: ["Clinical psychology", "Psychotherapy", "Clinical assessment"]
    },
    links: []
  },
  humay: {
    name: "Humay Zeynalova",
    roleKey: "roleResearch",
    image: "assets/humay.webp?v=10",
    bio: {
      az: [
        "Humay Zeynalova Koç Universitetində Mexanika mühəndisliyi üzrə bakalavr təhsili alıb və Imperial College London-da Mexanika mühəndisliyi üzrə magistr təhsilini davam etdirir. O, Azərbaycan Respublikasının Dövlət Proqramı təqaüdçüsüdür.",
        "Təhsil müddətində istehsalat təcrübələri keçib, mexanika mühəndisliyi klubunda rəhbərlik edib və tələbələrin peşəkar inkişafına yönələn layihələr təşkil edib. Universitetin dron komandasında fəaliyyəti onun aerodinamika, hesablama maye mexanikası və multidissiplinar dizayna marağını gücləndirib."
      ],
      en: [
        "Humay Zeynalova holds a bachelor's degree in Mechanical Engineering from Koç University and is pursuing a master's degree in Mechanical Engineering at Imperial College London. She is a recipient of Azerbaijan's State Program scholarship.",
        "Her experience includes industrial placements, leadership in a mechanical engineering club, and organizing student professional-development initiatives. Work with her university's drone team deepened her interests in aerodynamics, computational fluid dynamics, and multidisciplinary design."
      ]
    },
    interests: {
      az: ["Maye mexanikası", "Hesablama maye mexanikası", "Turbulent axınlar", "Maşın dizaynı"],
      en: ["Fluid mechanics", "Computational fluid dynamics", "Turbulent flows", "Machine design"]
    },
    links: [
      { labelKey: "email", text: "humay.zeynalova@azresearchsociety.org", url: "mailto:humay.zeynalova@azresearchsociety.org" },
      { labelKey: "linkedIn", url: "https://www.linkedin.com/in/humayzeynalova/" }
    ]
  },
  jale: {
    name: "Jalə Əhmədova",
    roleKey: "roleComms",
    image: "assets/jale.webp?v=10",
    bio: {
      az: [
        "Jalə Əhmədova Azərbaycan Dillər Universitetində İngilis dili müəllimliyi üzrə bakalavr, Vytautas Magnus Universiteti və Johannes Gutenberg Universitetində Sosiolinqvistika və Multilinqvizm üzrə birgə magistr təhsili alıb. Magistratura çərçivəsində Stockholm Universitetində mübadilə proqramında iştirak edib.",
        "Onun peşəkar təcrübəsi təhsil və akademik idarəçilik sahələrini əhatə edir. Tədqiqat maraqları azərbaycanlı çoxdilli danışanların gündəlik ünsiyyətdə dillər arasında keçidi, bu təcrübələrə münasibət, dil variasiyası və dil istifadəsində dəyişikliklər üzərində cəmlənir."
      ],
      en: [
        "Jalə Əhmədova holds a bachelor's degree in English Language Teaching from Azerbaijan University of Languages and a joint master's degree in Sociolinguistics and Multilingualism from Vytautas Magnus University and Johannes Gutenberg University. Her graduate studies also included an exchange at Stockholm University.",
        "Her professional experience spans education and academic administration. Her research interests focus on multilingual Azerbaijani speakers, everyday code-switching, attitudes toward multilingual practices, language variation, and changes in language use."
      ]
    },
    interests: {
      az: ["Sosiolinqvistika", "Multilinqvizm və dil təması", "Kod-dəyişmə", "Dil variasiyası və ideologiyaları"],
      en: ["Sociolinguistics", "Multilingualism & language contact", "Code-switching", "Language variation & ideologies"]
    },
    links: [
      { labelKey: "email", text: "zhala.ahmadova@azresearchsociety.org", url: "mailto:zhala.ahmadova@azresearchsociety.org" },
      { labelKey: "linkedIn", url: "https://www.linkedin.com/in/zhala-artemis-ahmadova-a09b4b172/" }
    ]
  },
  nargiz: {
    name: "Nargiz Ismayilli",
    roleKey: "roleProject",
    image: "assets/nargiz.webp?v=10",
    bio: {
      az: [
        "Nargiz Ismayilli Xəzər Universitetində Kimya və biologiya müəllimliyi üzrə təhsil alıb. Westlake Summer School çərçivəsində Çində neyroelm və neyrotexnologiya laboratoriyasında qonaq tələbə kimi tədqiqat mühitini müşahidə edib, həmçinin genetika və biokimya laboratoriyalarında praktiki təcrübə qazanıb.",
        "O, Women in Tech Central Asia & Caucasus proqramının Aspiring Teen kateqoriyasında finalist olub, Qazaxıstanda Azərbaycanı təmsil edib və Dubayda Youth Dialogue Forum-a seçilən azərbaycanlı iştirakçı olub. İki dəfə Technest təqaüdü qazanıb və One Health konfransında ekoloji çirklənmənin beyin sağlamlığına təsiri barədə elmi abstrakt təqdim edib."
      ],
      en: [
        "Nargiz Ismayilli studied Chemistry and Biology Education at Khazar University. Through Westlake Summer School in China, she observed research in a neuroscience and neurotechnology laboratory as a visiting student and gained practical experience in genetics and biochemistry laboratories.",
        "She was a finalist in the Women in Tech Central Asia & Caucasus Aspiring Teen category, represented Azerbaijan in Kazakhstan, and was selected as an Azerbaijani participant in the Youth Dialogue Forum in Dubai. She has twice received a Technest scholarship and presented a scientific abstract on environmental pollution and brain health at a One Health conference."
      ]
    },
    interests: {
      az: ["Neyroelm və neyrotexnologiya", "Bioinformatika və data elmi", "Hesablama biologiyası", "Molekulyar və hüceyrəvi tədqiqatlar"],
      en: ["Neuroscience & neurotechnology", "Bioinformatics & data science", "Computational biology", "Molecular & cellular research"]
    },
    links: [
      { labelKey: "email", text: "nargiz.ismayilli@azresearchsociety.org", url: "mailto:nargiz.ismayilli@azresearchsociety.org" },
      { labelKey: "linkedIn", url: "https://www.linkedin.com/in/nargiz-ismay%C4%B1ll%C4%B1/" }
    ]
  },
  zehra: {
    name: "Zəhra Omarova",
    roleKey: "roleAdmin",
    image: "assets/zehra.webp?v=10",
    bio: {
      az: [
        "Zəhra Omarova Xəzər Universitetində Neft-qaz mühəndisliyi üzrə bakalavr tələbəsidir. O, SPE Khazar, IMechE Khazar və SEG tələbə bölmələrində fəal iştirak edib və SEG Khazar Student Chapter-in prezidenti kimi fəaliyyət göstərib.",
        "EAGE Local Chapter Azerbaijan çərçivəsində GR karotaj məlumatları və qazma parametrlərindən, eləcə də maşın öyrənməsi metodlarından istifadə etməklə məsaməliliyin proqnozlaşdırılmasını araşdırıb. Maraqları lay modelləşdirilməsi, hasilatın optimallaşdırılması, maşın öyrənməsi və lay parametrlərinin proqnozlaşdırılmasını əhatə edir."
      ],
      en: [
        "Zəhra Omarova is an undergraduate Petroleum Engineering student at Khazar University. She has been active in the SPE Khazar, IMechE Khazar, and SEG student chapters and has served as president of the SEG Khazar Student Chapter.",
        "Through EAGE Local Chapter Azerbaijan, she researched porosity prediction using gamma-ray logs, drilling parameters, and machine-learning methods. Her interests include reservoir modelling, production optimization, machine learning, and reservoir-parameter prediction."
      ]
    },
    interests: {
      az: ["Lay modelləşdirilməsi", "Maşın öyrənməsi", "Hasilatın optimallaşdırılması", "Lay parametrlərinin proqnozu"],
      en: ["Reservoir modelling", "Machine learning", "Production optimization", "Reservoir-parameter prediction"]
    },
    links: [
      { labelKey: "email", text: "zahra.omarova@azresearchsociety.org", url: "mailto:zahra.omarova@azresearchsociety.org" },
      { labelKey: "linkedIn", url: "https://www.linkedin.com/in/zahra-omarova-9040ba297/" }
    ]
  }
};

document.querySelectorAll(".brand").forEach((brand) => {
  if (brand.querySelector(".brand-copy")) return;
  const copy = document.createElement("span");
  copy.className = "brand-copy";
  const name = document.createElement("strong");
  name.textContent = "Azerbaijan Research Society";
  const motto = document.createElement("small");
  motto.textContent = "People · Ideas · Research · Impact";
  copy.append(name, motto);
  brand.append(copy);
});

const affiliationMarks = {
  ibrahim: { mark: "SAÜ", label: "Sakarya University", tone: "blue" },
  masud: { mark: "KFUPM", label: "King Fahd University of Petroleum & Minerals", tone: "teal" },
  humay: { mark: "ICL", label: "Imperial College London", tone: "navy" },
  jale: { mark: "VMU", label: "Vytautas Magnus University", tone: "green" },
  nargiz: { mark: "XU", label: "Khazar University", tone: "red" },
  zehra: { mark: "XU", label: "Khazar University", tone: "red" },
  xeyranse: {
    mark: "XTM",
    label: { az: "Xəzər Tibb Mərkəzi", en: "Khazar Medical Center" },
    tone: "blue"
  },
  amil: { mark: "NCBJ", label: "National Centre for Nuclear Research / NOMATEN", tone: "blue" },
  azizeh: { mark: "SU", label: "Sabancı University", tone: "red" },
  sabrin: { mark: "AAU", label: "Al Ain University", tone: "navy" },
  ulkar: { mark: "IoP", label: "Institute of Physics", tone: "green" },
  nijat: { mark: "ECO", label: "ECOHUB", tone: "teal" },
  orkhan: { mark: "ASOIU", label: "Azerbaijan State Oil and Industry University", tone: "blue" }
};

document.querySelectorAll(".person-card[data-profile]").forEach((card) => {
  const details = affiliationMarks[card.dataset.profile];
  const heading = card.querySelector("h3");
  if (!details || !heading || heading.parentElement?.classList.contains("person-name-row")) return;
  const row = document.createElement("div");
  row.className = "person-name-row";
  const mark = document.createElement("span");
  mark.className = "affiliation-mark";
  mark.dataset.tone = details.tone;
  mark.textContent = details.mark;
  const affiliationLabel = typeof details.label === "string" ? details.label : details.label.az;
  mark.title = affiliationLabel;
  mark.setAttribute("aria-label", affiliationLabel);
  if (typeof details.label !== "string") {
    mark.dataset.affiliationAz = details.label.az;
    mark.dataset.affiliationEn = details.label.en;
  }
  heading.replaceWith(row);
  row.append(heading, mark);
});

document.querySelectorAll("[data-board-visualization]").forEach((board) => {
  board.addEventListener("pointermove", (event) => {
    const bounds = board.getBoundingClientRect();
    board.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    board.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  });
});

const programTabs = [...document.querySelectorAll("[data-program-tab]")];
const programPanels = [...document.querySelectorAll("[data-program-panel]")];

function activateProgramStage(stage, updateHash = true) {
  if (!programTabs.some((tab) => tab.dataset.programTab === stage)) return;
  programTabs.forEach((tab) => {
    const active = tab.dataset.programTab === stage;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  programPanels.forEach((panel) => { panel.hidden = panel.dataset.programPanel !== stage; });
  if (updateHash && window.history?.replaceState) window.history.replaceState(null, "", `#${stage}`);
}

programTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateProgramStage(tab.dataset.programTab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) nextIndex = (index + 1) % programTabs.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) nextIndex = (index - 1 + programTabs.length) % programTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = programTabs.length - 1;
    const nextTab = programTabs[nextIndex];
    activateProgramStage(nextTab.dataset.programTab);
    nextTab.focus();
  });
});

if (programTabs.length) {
  const requestedStage = window.location.hash.slice(1);
  activateProgramStage(programTabs.some((tab) => tab.dataset.programTab === requestedStage) ? requestedStage : "connect", false);
}

const titleByLanguage = {
  az: {
    home: "Azərbaycan Tədqiqat Cəmiyyəti | ARS",
    about: "Haqqımızda | Azərbaycan Tədqiqat Cəmiyyəti",
    programs: "Proqramlar | Azərbaycan Tədqiqat Cəmiyyəti",
    workshop: "Emalatxana | Azərbaycan Tədqiqat Cəmiyyəti",
    departments: "Elmi şöbələr | Azərbaycan Tədqiqat Cəmiyyəti",
    people: "İnsanlar | Azərbaycan Tədqiqat Cəmiyyəti",
    executive: "İcra Şurası | Azərbaycan Tədqiqat Cəmiyyəti",
    advisory: "Elmi Məsləhət Şurası | Azərbaycan Tədqiqat Cəmiyyəti",
    contact: "Əlaqə | Azərbaycan Tədqiqat Cəmiyyəti"
  },
  en: {
    home: "Azerbaijan Research Society | ARS",
    about: "About | Azerbaijan Research Society",
    programs: "Programs | Azerbaijan Research Society",
    workshop: "Workshop | Azerbaijan Research Society",
    departments: "Research Departments | Azerbaijan Research Society",
    people: "People | Azerbaijan Research Society",
    executive: "Executive Board | Azerbaijan Research Society",
    advisory: "Scientific Advisory Board | Azerbaijan Research Society",
    contact: "Contact | Azerbaijan Research Society"
  }
};

const profileDialog = document.getElementById("profile-dialog");
const profileImage = document.getElementById("profile-image");
const profileName = document.getElementById("profile-name");
const profileRole = document.getElementById("profile-role");
const profileBio = document.getElementById("profile-bio");
const profileInterests = document.getElementById("profile-interests");
const profileLinks = document.getElementById("profile-links");
const profilePublications = document.getElementById("profile-publications");
const profilePublicationsSection = document.getElementById("profile-publications-section");
let currentProfile = null;

function setLanguage(language) {
  const dictionary = translations[language];
  document.documentElement.lang = language;
  const page = document.body.dataset.page || "home";
  document.title = titleByLanguage[language][page] || titleByLanguage[language].home;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.dataset.i18nHtml;
    if (dictionary[key]) element.innerHTML = dictionary[key];
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (dictionary[key]) element.setAttribute("aria-label", dictionary[key]);
  });
  document.querySelectorAll(".affiliation-mark[data-affiliation-en]").forEach((mark) => {
    const label = language === "en" ? mark.dataset.affiliationEn : mark.dataset.affiliationAz;
    mark.title = label;
    mark.setAttribute("aria-label", label);
  });
  document.querySelectorAll(".lang-button").forEach((button) => {
    const selected = button.dataset.lang === language;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelector('meta[name="description"]')?.setAttribute("content", dictionary.metaDescription);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", dictionary.metaDescription);
  if (menuButton && navigation) menuButton.setAttribute("aria-label", navigation.classList.contains("open") ? dictionary.menuClose : dictionary.menuOpen);
  if (currentProfile && profileDialog?.open) renderProfile(currentProfile);
  updateContactFormLanguage();
  try { localStorage.setItem("ars-language", language); } catch (error) { /* Storage may be unavailable in private browsing. */ }
}

function makeExternalLink(label, url) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = `${label} ↗`;
  return link;
}

function makeProfileLink(item, dictionary) {
  if (!item.url.startsWith("mailto:")) return makeExternalLink(dictionary[item.labelKey], item.url);
  const link = document.createElement("a");
  link.href = item.url;
  link.textContent = `${dictionary[item.labelKey]}: ${item.text}`;
  return link;
}

function renderProfile(profileId) {
  const data = profiles[profileId];
  if (!data || !profileDialog) return;
  const language = document.documentElement.lang in translations ? document.documentElement.lang : "az";
  const dictionary = translations[language];

  profileImage.src = data.image;
  profileImage.alt = data.name;
  profileName.textContent = data.name;
  profileRole.textContent = dictionary[data.roleKey];

  profileBio.replaceChildren(...data.bio[language].map((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }));

  profileInterests.replaceChildren(...data.interests[language].map((text) => {
    const tag = document.createElement("span");
    tag.textContent = text;
    return tag;
  }));

  const links = data.links || [];
  profileLinks.parentElement.hidden = links.length === 0;
  profileLinks.replaceChildren(...links.map((item) => makeProfileLink(item, dictionary)));

  const publications = data.publications || [];
  profilePublicationsSection.hidden = publications.length === 0;
  profilePublications.replaceChildren(...publications.map((publication) => {
    const item = document.createElement("li");
    const citation = document.createElement("p");
    citation.textContent = publication.citation;
    item.append(citation, makeExternalLink(`DOI: ${publication.doi}`, `https://doi.org/${publication.doi}`));
    return item;
  }));
}

function openProfile(profileId) {
  if (!profileDialog) return;
  currentProfile = profileId;
  renderProfile(profileId);
  if (!profileDialog.open) profileDialog.showModal();
}

document.querySelectorAll(".person-card[data-profile]").forEach((card) => {
  card.addEventListener("click", () => openProfile(card.dataset.profile));
});

document.querySelector(".profile-close")?.addEventListener("click", () => profileDialog.close());
profileDialog?.addEventListener("click", (event) => {
  if (event.target === profileDialog) profileDialog.close();
});
profileDialog?.addEventListener("close", () => { currentProfile = null; });

document.querySelectorAll(".lang-button").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
menuButton?.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", translations[document.documentElement.lang][open ? "menuClose" : "menuOpen"]);
});
navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const contactForm = document.getElementById("ars-contact-form");
const contactTopic = document.getElementById("contact-topic");
const contactStatus = document.getElementById("form-status");
const contactSubmitButton = contactForm?.querySelector('button[type="submit"]');
const contactSubmitLabel = contactSubmitButton?.querySelector("span");

if (contactTopic) {
  const requestedTopic = new URLSearchParams(window.location.search).get("topic");
  if (requestedTopic && [...contactTopic.options].some((option) => option.value === requestedTopic)) {
    contactTopic.value = requestedTopic;
  }
}

function updateContactFormLanguage() {
  if (!contactForm || !contactSubmitButton || !contactSubmitLabel || !contactStatus) return;
  const language = document.documentElement.lang in translations ? document.documentElement.lang : "az";
  const dictionary = translations[language];
  contactSubmitLabel.textContent = contactSubmitButton.disabled ? dictionary.formSending : dictionary.formSubmit;
  if (contactStatus.dataset.state === "success") contactStatus.textContent = dictionary.formSuccess;
  if (contactStatus.dataset.state === "error") contactStatus.textContent = dictionary.formError;
}

function setContactStatus(state) {
  if (!contactStatus) return;
  contactStatus.dataset.state = state;
  contactStatus.className = `form-status${state ? ` ${state}` : ""}`;
  contactStatus.textContent = "";
  updateContactFormLanguage();
}

document.querySelectorAll("[data-form-topic]").forEach((link) => {
  link.addEventListener("click", () => {
    if (!contactTopic) return;
    contactTopic.value = link.dataset.formTopic;
    setContactStatus("");
  });
});

contactForm?.addEventListener("input", () => {
  if (contactStatus.dataset.state) setContactStatus("");
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  contactSubmitButton.disabled = true;
  setContactStatus("");
  updateContactFormLanguage();

  const formData = new FormData(contactForm);
  const selectedTopic = contactTopic.options[contactTopic.selectedIndex]?.textContent || "General enquiry";
  const senderName = formData.get("name") || "Website visitor";
  formData.set("_subject", `ARS website — ${selectedTopic} — ${senderName}`);
  formData.set("language", document.documentElement.lang);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`Form submission failed with status ${response.status}`);
    contactForm.reset();
    setContactStatus("success");
  } catch (error) {
    setContactStatus("error");
  } finally {
    contactSubmitButton.disabled = false;
    updateContactFormLanguage();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation?.classList.contains("open")) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", translations[document.documentElement.lang].menuOpen);
    menuButton.focus();
  }
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
let savedLanguage = "az";
try { savedLanguage = localStorage.getItem("ars-language") || "az"; } catch (error) { /* Use Azerbaijani by default. */ }
setLanguage(translations[savedLanguage] ? savedLanguage : "az");
