// ==========================
// Tab Switching
// ==========================
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, event) {
  for (let tablink of tablinks) tablink.classList.remove("active-link");
  for (let tabcontent of tabcontents) tabcontent.classList.remove("active-tab");
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// ==========================
// Sidebar Menu
// ==========================
var sidemenu = document.getElementById("sidemenu");
var menuOpenBtn = document.getElementById("menu-open");
var menuCloseBtn = document.getElementById("menu-close");

menuOpenBtn.addEventListener("click", () => { sidemenu.style.right = "0"; });
menuCloseBtn.addEventListener("click", () => { sidemenu.style.right = "-250px"; });

// Close menu when a link is clicked (mobile)
document.querySelectorAll('#sidemenu li a').forEach(link => {
  link.addEventListener('click', () => { sidemenu.style.right = "-250px"; });
});

// ==========================
// Scroll to Top Button
// ==========================
const scrollTopButton = document.getElementById("scroll-top");
window.onscroll = () => {
  scrollTopButton.style.display = 
    (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) 
    ? "block" : "none";
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================
// Project Slider + Dots
// ==========================
const projectList = document.querySelector('.project-list');
let projectCards = Array.from(document.querySelectorAll('.project-list .project-card'));
const dotsContainer = document.getElementById('project-dots');

let currentIndex = 0;
let activeProjects = [...projectCards]; // all projects initially

function generateDots() {
  if(!dotsContainer) return; // prevent error if container missing
  dotsContainer.innerHTML = "";
  activeProjects.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function showSlide(index) {
  if (activeProjects.length === 0) return; // prevent errors
  if (index >= activeProjects.length) index = 0;
  if (index < 0) index = activeProjects.length - 1;

  activeProjects.forEach((card, i) => {
    card.style.transform = `translateX(${(i - index) * 100}%)`;
    card.style.display = "block";
  });

  projectCards.forEach(card => {
    if (!activeProjects.includes(card)) card.style.display = "none";
  });

  currentIndex = index;

  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

function goToSlide(index) { showSlide(index); }
function nextSlide() { showSlide(currentIndex + 1); }
function prevSlide() { showSlide(currentIndex - 1); }

// Auto rotate
setInterval(() => {
  if(activeProjects.length > 1) nextSlide();
}, 4000);

// ==========================
// Project Filter
// ==========================
function filterProjects(type) {
  activeProjects = projectCards.filter(card => {
    if (type === "all") return true;
    return card.classList.contains(type);
  });

  currentIndex = 0;
  generateDots();
  showSlide(0);
}

// Initialize slider
generateDots();
showSlide(0);
