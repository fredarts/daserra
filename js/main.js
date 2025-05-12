/* -------- MENU MOBILE (com verificação de existência) -------- */
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu       = document.getElementById('mobileMenu');
const iconOpen         = document.getElementById('iconOpen');
const iconClose        = document.getElementById('iconClose');
const mobileLinks      = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu-link') : [];

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('-translate-y-full');
    mobileMenu.classList.toggle('translate-y-0');
    iconOpen .classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
  });

  mobileLinks.forEach(link =>
    link.addEventListener('click', () => {
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden', '-translate-y-full');
      mobileMenu.classList.remove('translate-y-0');
      iconOpen .classList.remove('hidden');
      iconClose.classList.add   ('hidden');
    })
  );
}

const heroSlidesData = [
  {
    img :'images/hero_carvao_da_serra.jpg',
    alt :'Serra e carvão',
    k   :'ken-1',
    bag : true,
    title : 'Da floresta<br>para a sua vida',
    text  : 'Transformamos biomassa queimada em produtos que regeneram solo e aproximam pessoas.',
    btnTxt: 'Ver catálogo',
    btnLnk: '#produtos'
  },
  {
    img :'images/hero_image_2.jpg',
    alt :'Área limpa',
    k   :'ken-2',
    bag : false,
    title : 'Limpeza que previne incêndios',
    text  : 'Cada compra remove material combustível da serra e financia reflorestação.',
    btnTxt: 'Saber mais',
    btnLnk: '#impacto'
  },
  {
    img :'images/hero_image_3.jpg',
    alt :'Churrasco feliz',
    k   :'ken-3',
    bag : true,
    title : 'Churrascos com sabor consciente',
    text  : 'Carvão de giesta: brasa rápida, aroma suave e menor pegada de carbono.',
    btnTxt: 'Comprar carvão',
    btnLnk: 'produto.html?id=carvao'
  },
  {
    img :'images/hero_image_4.jpg',
    alt :'Detalhe giesta',
    k   :'ken-4',
    bag : false,
    title : 'Natureza que se renova',
    text  : 'Estilha e vinagre de madeira: nutrientes de volta ao solo, jardins mais saudáveis.',
    btnTxt: 'Ver estilha',
    btnLnk: 'produto.html?id=estilha'
  }
];

const heroTrack   = document.getElementById('hero-slideshow');
const heroBagWrap = document.getElementById('heroBagImageContainer');
const heroDotsBox = document.getElementById('heroDots');
const heroPrevBtn = document.getElementById('heroPrev');
const heroNextBtn = document.getElementById('heroNext');

const hTitle = document.getElementById('heroTitle');
const hText  = document.getElementById('heroText');
const hBtn   = document.getElementById('heroBtn');

let heroIdx = 0;
const heroDelay = 4000;
let heroTimer;

/* cria slides e bolinhas */
function buildHeroSlides(){
  heroSlidesData.forEach((s,i)=>{
    /* slide */
    const d=document.createElement('div');
    d.className='hero-slide'+(i===0?` active ken-burns ${s.k}`:'');
    d.style.backgroundImage=`url('${s.img}')`;
    d.setAttribute('aria-label',s.alt);
    heroTrack.appendChild(d);
    /* dot */
    const dot=document.createElement('button');
    dot.className=`w-3 h-3 rounded-full ${i===0?'bg-emerald-600':'bg-white/60'}`;
    dot.dataset.idx=i;
    heroDotsBox.appendChild(dot);
  });
  heroBagWrap.style.display=heroSlidesData[0].bag?'flex':'none';
  updateHeroContent(0);
}

/* actualiza texto, botão, dot & imagem saco */
function updateHeroContent(i){
  const s=heroSlidesData[i];
  hTitle.innerHTML = s.title;
  hText.textContent = s.text;
  hBtn.textContent  = s.btnTxt;
  hBtn.href         = s.btnLnk;

  heroBagWrap.style.display = s.bag ? 'flex':'none';

  // dots
  [...heroDotsBox.children].forEach((d,idx)=>
    d.className = `w-3 h-3 rounded-full ${idx===i?'bg-emerald-600':'bg-white/60'}`);
}

/* navegação */
function goHero(n){
  const slides=[...heroTrack.children];
  slides.forEach(sl=>sl.className='hero-slide');             // limpa classes
  heroIdx=(n+slides.length)%slides.length;                  // evita negativo
  slides[heroIdx].className=`hero-slide active ken-burns ${heroSlidesData[heroIdx].k}`;
  updateHeroContent(heroIdx);
}
function nextHero(){goHero(heroIdx+1);}
function prevHero(){goHero(heroIdx-1);}

function resetHeroTimer(){
  clearInterval(heroTimer);
  heroTimer=setInterval(nextHero,heroDelay);
}

if(heroTrack){
  buildHeroSlides();
  heroTimer=setInterval(nextHero,heroDelay);

  /* setas */
  heroPrevBtn.addEventListener('click',()=>{prevHero();resetHeroTimer();});
  heroNextBtn.addEventListener('click',()=>{nextHero();resetHeroTimer();});

  /* bolinhas clicáveis */
  heroDotsBox.addEventListener('click',e=>{
    if(e.target.dataset.idx!==undefined){
      goHero(+e.target.dataset.idx); resetHeroTimer();
    }
  });

  /* pausa no hover */
  const heroContainer=document.getElementById('hero-slideshow-container');
  heroContainer.addEventListener('mouseenter',()=>clearInterval(heroTimer));
  heroContainer.addEventListener('mouseleave',()=>heroTimer=setInterval(nextHero,heroDelay));
}

/* -------- CARROSSEL DE PRODUTOS (setas) -------- */
const prodTrack = document.getElementById('prodTrack');
const prodPrev  = document.getElementById('prodPrev');
const prodNext  = document.getElementById('prodNext');

if (prodTrack && prodPrev && prodNext) {
  prodPrev.onclick = () => prodTrack.scrollBy({left:-350, behavior:'smooth'});
  prodNext.onclick = () => prodTrack.scrollBy({left: 350, behavior:'smooth'});
}

/* -------- CARROSSEL DE TESTEMUNHOS -------- */
let curTest = 0;
const totTest  = 6;
const testTrack= document.getElementById('testimonialTrack');
const dots     = Array.from({length: totTest},(_,i)=>document.getElementById(`dot${i}`));
let testTimer  = setInterval(nextTest, 6000);

function updateTest() {
  if (!testTrack) return;
  testTrack.style.transform = `translateX(-${100*curTest}%)`;
  dots.forEach((d,i)=>{
    if(!d) return;
    d.classList.toggle('bg-emerald-600', i===curTest);
    d.classList.toggle('bg-gray-300',   i!==curTest);
  });
}
function nextTest(){ curTest = (curTest+1)%totTest; updateTest(); }
function prevTest(){ curTest = (curTest-1+totTest)%totTest; updateTest(); resetTest(); }
function gotoTest(i){ curTest = i; updateTest(); resetTest(); }
function resetTest(){ clearInterval(testTimer); testTimer=setInterval(nextTest,6000); }

window.nextSlide = nextTest;
window.prevSlide = prevTest;
window.goToSlide = gotoTest;

if (testTrack){
  testTrack.parentElement.addEventListener('mouseenter', ()=>clearInterval(testTimer));
  testTrack.parentElement.addEventListener('mouseleave', resetTest);
  updateTest();
}

/* -------- GALERIA MODAL -------- */
const modal    = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');

window.openModal = src => {
  if(!modal||!modalImg) return;
  modalImg.src = src;
  modal.classList.replace('hidden','flex');
  document.body.style.overflow='hidden';
};
window.closeModal = () => {
  if(!modal||!modalImg) return;
  modal.classList.replace('flex','hidden');
  modalImg.src='';
  document.body.style.overflow='';
};
document.addEventListener('keydown', e=>{
  if(e.key==='Escape' && modal && !modal.classList.contains('hidden')) closeModal();
});

/* -------- ANO ACTUAL NO FOOTER -------- */
const yearSpan = document.getElementById('currentYear');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
