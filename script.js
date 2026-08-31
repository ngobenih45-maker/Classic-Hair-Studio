const loader = document.querySelector(".page-loader");
window.addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 350));

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 30), {passive:true});

const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.classList.toggle("active", open);
  menuBtn.setAttribute("aria-expanded", open);
  document.body.classList.toggle("menu-open", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuBtn.classList.remove("active");
  menuBtn.setAttribute("aria-expanded","false");
  document.body.classList.remove("menu-open");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

// Gallery lightbox
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");
const items = [...document.querySelectorAll(".gallery-item img")];
let current = 0;

function showImage(index){
  current = (index + items.length) % items.length;
  const src = items[current].getAttribute("src");
  lightboxImg.src = src;
  lightboxImg.alt = items[current].alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
}
items.forEach((img,i) => img.addEventListener("click", () => showImage(i)));
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showImage(current-1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showImage(current+1));
lightbox.addEventListener("click", e => { if(e.target === lightbox) closeLightbox(); });
function closeLightbox(){ lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden","true"); }
document.addEventListener("keydown", e => {
  if(!lightbox.classList.contains("open")) return;
  if(e.key === "Escape") closeLightbox();
  if(e.key === "ArrowLeft") showImage(current-1);
  if(e.key === "ArrowRight") showImage(current+1);
});

// Gentle pointer depth effect on desktop hero artwork
const heroArt = document.querySelector(".hero-art");
if(window.matchMedia("(pointer:fine)").matches){
  heroArt.addEventListener("pointermove", e => {
    const r = heroArt.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    heroArt.querySelector(".portrait-card").style.transform=`rotate(4deg) translate(${x*10}px,${y*10}px)`;
    heroArt.querySelector(".portrait-ring").style.transform=`rotate(${-18+x*8}deg) translate(${x*5}px,${y*5}px)`;
  });
  heroArt.addEventListener("pointerleave", () => {
    heroArt.querySelector(".portrait-card").style.transform="rotate(4deg)";
    heroArt.querySelector(".portrait-ring").style.transform="rotate(-18deg)";
  });
}
