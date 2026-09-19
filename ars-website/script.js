const translations = {
  az: {
    skip: "Əsas məzmuna keç", navAbout: "Haqqımızda", navPrograms: "Proqramlar", navTeam: "Komanda", navCommunity: "İcma", navContact: "Əlaqə",
    heroEyebrow: "Elm · Tədqiqat · Əməkdaşlıq", heroTitle: "Azərbaycan elmini<br /><em>birlikdə irəli aparaq.</em>", heroText: "Dünyanın hər yerində çalışan azərbaycanlı tədqiqatçıları, tələbələri və elm həvəskarlarını bir araya gətirən açıq platforma.", joinUs: "İcmaya qoşul", explorePrograms: "Proqramları kəşf et",
    manifestoLabel: "Bizim manifestimiz", people: "İNSANLAR", ideas: "İDEYALAR", research: "TƏDQİQAT", impact: "TƏSİR", manifestoText: "Güclü elmi icma bilik paylaşımı və davamlı əməkdaşlıqla yaranır.", scroll: "Daha çox kəşf et",
    aboutLabel: "Haqqımızda", aboutLead: "Sərhədləri aşan, biliyi paylaşan və <em>Azərbaycan elminin gələcəyini</em> birlikdə quran tədqiqatçılar şəbəkəsiyik.", aboutText1: "Azərbaycan Tədqiqat Cəmiyyəti (ARS) müxtəlif elm sahələrindən olan azərbaycanlı alim və tələbələr arasında əlaqə yaradan qeyri-kommersiya təşəbbüsüdür.", aboutText2: "Məqsədimiz açıq dialoq, mentorluq və multidissiplinar əməkdaşlıq üçün əlçatan mühit formalaşdırmaqdır.", statBorders: "Sərhədsiz əməkdaşlıq", statCommunity: "Ortaq elmi icma", statValues: "Əsas dəyər",
    programsLabel: "Proqramlarımız", programsTitle: "Bilik görüşəndə<br /><em>imkan yaranır.</em>", seminarsTitle: "Həftəlik seminarlar", seminarsText: "Tədqiqatçıların öz işlərini təqdim etdiyi, sualların və yeni ideyaların doğulduğu açıq görüşlər.", networkTitle: "Tədqiqatçı şəbəkəsi", networkText: "Sahələr və ölkələr arasında yeni əlaqələr, ortaq layihələr və təcrübə mübadiləsi üçün platforma.", mentorshipTitle: "Mentorluq və inkişaf", mentorshipText: "Gənc tədqiqatçılara akademik yol, elmi ünsiyyət və karyera inkişafında dəstək.", learnMore: "Ətraflı",
    teamLabel: "İcra Şurası", teamTitle: "İdeyanın arxasındakı<br /><em>insanlarla tanış olun.</em>", roleFounder: "Təsisçi", roleCofounder: "Həmtəsisçi", roleResearch: "Tədqiqat Proqramları Direktoru", roleComms: "Kommunikasiya və İctimaiyyətlə Əlaqələr Rəhbəri", roleProject: "Layihə Koordinatoru", roleAdmin: "İnzibati İşlər üzrə Mütəxəssis",
    communityKicker: "Elmin gələcəyində sənin də yerin var", communityTitle: "Maraq göstər.<br />Əlaqə qur.<br /><em>Təsir yarat.</em>", communityText: "Tədqiqatçı, tələbə, mentor və ya elm həvəskarı olmağınızdan asılı olmayaraq, ARS icması sizin üçün açıqdır.", becomeMember: "Üzv olmaq üçün yaz",
    footerTagline: "Azərbaycanlı tədqiqatçıları dünya miqyasında birləşdiririk.", footerExplore: "Kəşf et", footerConnect: "Əlaqə"
  },
  en: {
    skip: "Skip to main content", navAbout: "About", navPrograms: "Programs", navTeam: "Team", navCommunity: "Community", navContact: "Contact",
    heroEyebrow: "Science · Research · Collaboration", heroTitle: "Advancing Azerbaijani science,<br /><em>together.</em>", heroText: "An open platform connecting Azerbaijani researchers, students, and science enthusiasts across the world.", joinUs: "Join the community", explorePrograms: "Explore our programs",
    manifestoLabel: "Our manifesto", people: "PEOPLE", ideas: "IDEAS", research: "RESEARCH", impact: "IMPACT", manifestoText: "A strong scientific community grows through knowledge-sharing and lasting collaboration.", scroll: "Discover more",
    aboutLabel: "About us", aboutLead: "We are a network of researchers crossing borders, sharing knowledge, and shaping <em>the future of Azerbaijani science</em> together.", aboutText1: "Azerbaijan Research Society (ARS) is a non-profit initiative connecting Azerbaijani scholars and students across scientific disciplines.", aboutText2: "Our mission is to create an accessible environment for open dialogue, mentorship, and multidisciplinary collaboration.", statBorders: "Borderless collaboration", statCommunity: "Shared research community", statValues: "Core values",
    programsLabel: "Our programs", programsTitle: "When knowledge meets,<br /><em>opportunity begins.</em>", seminarsTitle: "Weekly seminars", seminarsText: "Open sessions where researchers present their work, questions are explored, and new ideas take shape.", networkTitle: "Researcher network", networkText: "A platform for new connections, joint projects, and knowledge exchange across disciplines and countries.", mentorshipTitle: "Mentorship & growth", mentorshipText: "Supporting early-career researchers with academic direction, science communication, and career development.", learnMore: "Learn more",
    teamLabel: "Executive Board", teamTitle: "Meet the people<br /><em>behind the idea.</em>", roleFounder: "Founder", roleCofounder: "Co-founder", roleResearch: "Director of Research Programs", roleComms: "Head of Communications & Public Relations", roleProject: "Project Coordinator", roleAdmin: "Administrative Affairs Specialist",
    communityKicker: "You have a place in the future of science", communityTitle: "Stay curious.<br />Make connections.<br /><em>Create impact.</em>", communityText: "Whether you are a researcher, student, mentor, or science enthusiast, the ARS community is open to you.", becomeMember: "Write to become a member",
    footerTagline: "Connecting Azerbaijani researchers around the world.", footerExplore: "Explore", footerConnect: "Connect"
  }
};

const titleByLanguage = {
  az: "Azərbaycan Tədqiqat Cəmiyyəti | ARS",
  en: "Azerbaijan Research Society | ARS"
};

function setLanguage(language) {
  const dictionary = translations[language];
  document.documentElement.lang = language;
  document.title = titleByLanguage[language];
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.dataset.i18nHtml;
    if (dictionary[key]) element.innerHTML = dictionary[key];
  });
  document.querySelectorAll(".lang-button").forEach((button) => {
    const selected = button.dataset.lang === language;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  localStorage.setItem("ars-language", language);
}

document.querySelectorAll(".lang-button").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.getElementById("year").textContent = new Date().getFullYear();
setLanguage(localStorage.getItem("ars-language") || "az");
