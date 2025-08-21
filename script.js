// Tab switching
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (let tablink of tablinks) tablink.classList.remove("active-link");
  for (let tabcontent of tabcontents) tabcontent.classList.remove("active-tab");
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// Sidebar Menu
var sidemenu = document.getElementById("sidemenu");
function openmenu() { sidemenu.style.right = "0"; }
function closemenu() { sidemenu.style.right = "-200px"; }

// Scroll to Top
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
const projectGrid = document.querySelector('.project-grid');
let projectCards = Array.from(document.querySelectorAll('.project-card'));
const dotsContainer = document.getElementById('project-dots');

let currentIndex = 0;
let activeProjects = [...projectCards]; // all projects by default

function generateDots() {
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
  if (index >= activeProjects.length) index = 0;
  if (index < 0) index = activeProjects.length - 1;

  // Shift only visible projects
  activeProjects.forEach((card, i) => {
    card.style.transform = `translateX(${(i - index) * 100}%)`;
  });

  currentIndex = index;

  // Update active dot
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

function goToSlide(index) { showSlide(index); }
function nextSlide() { showSlide(currentIndex + 1); }
function prevSlide() { showSlide(currentIndex - 1); }

// Auto rotate
setInterval(nextSlide, 4000);

// ==========================
// Project Filter
// ==========================
function filterProjects(type) {
  // Filter
  activeProjects = projectCards.filter(card => {
    if (type === "all") return true;
    return card.classList.contains(type);
  });

  // Hide / Show
  projectCards.forEach(card => {
    card.style.display = activeProjects.includes(card) ? "block" : "none";
    card.style.transform = "translateX(0)"; // reset
  });

  // Reset slider
  currentIndex = 0;
  generateDots();
  showSlide(0);
}

// Initialize
generateDots();
showSlide(0);
