/* Navbar */
const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const backTop = document.getElementById("backTop");
const navLinks = document.querySelectorAll(".nav-link");
const mobileLinks = document.querySelectorAll(".mobile-link");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    mobileMenu.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 24;
  header.classList.toggle("scrolled", scrolled);
  backTop.classList.toggle("visible", scrolled);
}, { passive: true });

/* Active section */
const sections = ["home", "about", "skills", "projects", "contact"];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.section === id);
      });
    }
  });
}, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

sections.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

/* Scroll reveal */
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
revealEls.forEach((el) => revealObserver.observe(el));

/* Typing effect */
const roles = ["Web Developer", "Database Builder", "Digital Creator"];
const typedEl = document.getElementById("typedText");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
    setTimeout(typeLoop, 70);
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 40);
  }
}
setTimeout(typeLoop, 500);

/* Skill bars */
const skillsBars = document.getElementById("skillsBars");
const skillFills = document.querySelectorAll(".skill-fill");
let skillsAnimated = false;
const skillsObserver = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !skillsAnimated) {
    skillsAnimated = true;
    skillFills.forEach((fill) => {
      fill.style.width = fill.dataset.level + "%";
    });
  }
}, { threshold: 0.3 });
if (skillsBars) skillsObserver.observe(skillsBars);

/* Contact form */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
  window.location.href = "mailto:richmondabban204@gmail.com?subject=" + subject + "&body=" + body;
  document.getElementById("formStatus").textContent = "Opening your email client…";
  form.reset();
  setTimeout(() => { document.getElementById("formStatus").textContent = ""; }, 4000);
});

/* Year */
document.getElementById("year").textContent = new Date().getFullYear();