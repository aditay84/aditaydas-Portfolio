const menuToggle=document.getElementById("menuToggle");
const navMenu=document.getElementById("navMenu");
const themeToggle=document.getElementById("themeToggle");
const backTop=document.getElementById("backTop");

menuToggle.addEventListener("click",()=>navMenu.classList.toggle("open"));
document.querySelectorAll("#navMenu a").forEach(a=>a.addEventListener("click",()=>navMenu.classList.remove("open")));

const savedTheme=localStorage.getItem("portfolio-theme");
if(savedTheme==="light") document.body.classList.add("light");
themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("light");
  localStorage.setItem("portfolio-theme",document.body.classList.contains("light")?"light":"dark");
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
const links=[...document.querySelectorAll("#navMenu a")];
window.addEventListener("scroll",()=>{
  const y=window.scrollY;
  backTop.classList.toggle("show",y>500);
  let current="home";
  sections.forEach(section=>{if(y>=section.offsetTop-130) current=section.id});
  links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
});
backTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

document.getElementById("contactForm").addEventListener("submit",(e)=>{
  const form=e.currentTarget;
  if(form.getAttribute("action")==="#" || !form.getAttribute("action")){
    e.preventDefault();
    document.getElementById("formNote").textContent="Please add your Formspree (or another form service) endpoint in the form action before using this form.";
  }
});
