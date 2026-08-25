const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

menuToggle.addEventListener('click', () => {
  const isOpen = body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

mobileLinks.forEach((link) =>
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  })
);

document.querySelectorAll('[data-pending-link]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});

const slides = [...document.querySelectorAll('.hero-slide')];
const progress = [...document.querySelectorAll('.slide-progress span')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeSlide = 0;
let timer = null;

function showSlide(index) {
  activeSlide = index;
  slides.forEach((slide, slideIndex) =>
    slide.classList.toggle('is-active', slideIndex === activeSlide)
  );
  progress.forEach((item, itemIndex) =>
    item.classList.toggle('is-active', itemIndex === activeSlide)
  );
}

function startSlideshow() {
  if (reducedMotion.matches) return;
  window.clearInterval(timer);
  timer = window.setInterval(
    () => showSlide((activeSlide + 1) % slides.length),
    3000
  );
}

function stopSlideshow() {
  window.clearInterval(timer);
  timer = null;
}

document.addEventListener('visibilitychange', () => {
  document.hidden ? stopSlideshow() : startSlideshow();
});

reducedMotion.addEventListener('change', (event) =>
  event.matches ? stopSlideshow() : startSlideshow()
);
showSlide(0);
startSlideshow();
const projects = [
  {
    title: 'Case Closed',
    video: 'Z3CTzURGaf4',
    embed: false,
    meta: 'Editor · Script Supervisor · Colourist',
    cover: 'assets/projects/case-closed/cover.webp',
    stills: [
      'assets/projects/case-closed/01.webp',
      'assets/projects/case-closed/02.webp',
      'assets/projects/case-closed/03.webp'
    ],
    description: [
      `After getting pulled over whilst attempting to drive her sick child to the hospital over the prescribed alcohol limit, <em>Case Closed</em> follows the court case of Miss Carter as she attempts to defend her actions in Court.`,
      `<em>Case Closed</em> was my final group project in my second year of university. I was involved from the beginning, including planning the film, helping on set and working as script supervisor. I then organised the footage and shaped the final narrative through multiple edits, refining the pacing so the case remained engaging and clear.`
    ]
  },
  {
    title: 'East Side United',
    video: 'mVY7qHK5xIU',
    embed: true,
    meta: 'Editor · Documentary',
    cover: 'https://img.youtube.com/vi/mVY7qHK5xIU/maxresdefault.jpg',
    stills: [],
    description: [
      `I joined the project to help create a documentary for a new non-league football club. Using footage from the club's first trial day and an interview with its owner, I was given free rein to find and shape the narrative.`,
      `The finished film introduces the owner, the club's ambitions and his perspective on the trial day. It is a project I am particularly proud of because the story was built independently from many hours of footage.`
    ]
  },
  {
    title: 'Overtime',
    video: '3VnitRd8v5U',
    embed: true,
    meta: 'Editor · Short film',
    cover: 'https://img.youtube.com/vi/3VnitRd8v5U/maxresdefault.jpg',
    stills: [],
    description: [
      `This project formed part of my second-year Editing and Colour Grading module. I was asked to edit a section of the existing short film <em>Overtime</em>, working from the original footage, audio and script.`,
      `The main objective was to create tension through pacing, organisation and carefully judged editorial choices.`
    ]
  },
  {
    title: 'Cinema Cult',
    video: 'Tda-7ElCttw',
    embed: false,
    meta: 'Editor · Documentary',
    cover: 'assets/projects/cinema-cult/cover.webp',
    stills: [
      'assets/projects/cinema-cult/01.webp',
      'assets/projects/cinema-cult/02.webp',
      'assets/projects/cinema-cult/03.webp'
    ],
    description: [
      `<em>Cinema Cult</em> was a second-year group documentary investigating independent cinema. We interviewed people working in the industry, including the owner of an independent cinema, and gathered a large amount of original and archival B-roll.`,
      `The director and I developed the narrative after filming, and I shaped it through several drafts until we reached the final cut.`
    ]
  },
  {
    title: 'Colour Grading Assignment',
    video: 'E058OlFr4uE',
    embed: true,
    meta: 'Colourist · DaVinci Resolve',
    cover: 'assets/projects/colour-grading-assignment/cover.webp',
    stills: [
      'assets/projects/colour-grading-assignment/01.webp',
      'assets/projects/colour-grading-assignment/02.webp',
      'assets/projects/colour-grading-assignment/03.webp'
    ],
    description: [
      `For this second-year Editing and Colour Grading assignment, I graded an edited recreation of a scene from <em>Nightcrawler</em>.`,
      `The project strengthened my understanding of the detailed colour-grading process and developed my confidence working in DaVinci Resolve.`
    ]
  },
  {
    title: 'Reflections in Transit',
    video: 'uAryPcljRI0',
    embed: true,
    meta: 'Editor · Short film',
    cover: 'assets/projects/reflections-in-transit/cover.webp',
    stills: [
      'assets/projects/reflections-in-transit/01.webp',
      'assets/projects/reflections-in-transit/02.webp',
      'assets/projects/reflections-in-transit/03.webp'
    ],
    description: [
      `After two girls with contrasting personalities swap bags, <em>Reflections in Transit</em> follows their very different attempts to get them back and what each learns in the process.`,
      `This first-year group project was one of the first short films I edited. It represents an important stage in my development and shows how far my filmmaking and editing skills have progressed.`
    ]
  }
];

const params = new URLSearchParams(location.search);
const requested = params.get('title');
const index = Math.max(
  0,
  projects.findIndex((item) => item.title === requested)
);
const project = projects[index];
const next = projects[(index + 1) % projects.length];
const watchUrl = `https://youtu.be/${project.video}`;

document.title = `${project.title} — Tommy Percival`;
document.querySelector('#title').textContent = project.title;
document.querySelector('#meta').textContent = project.meta;
document.querySelector('#description').innerHTML = project.description
  .map((item) => `<p>${item}</p>`)
  .join('');
document.querySelector('#topWatch').href = watchUrl;

const filmFrame = document.querySelector('#filmFrame');
const filmCover = document.querySelector('#filmCover');
const coverImage = document.querySelector('#coverImage');
const embed = document.querySelector('#embed');
filmCover.href = watchUrl;
coverImage.src = project.cover;
coverImage.alt = `Still from ${project.title}`;

if (project.embed && location.protocol !== 'file:') {
  filmCover.addEventListener('click', (event) => {
    event.preventDefault();
    embed.src = `https://www.youtube.com/embed/${project.video}?autoplay=1&rel=0`;
    filmCover.hidden = true;
    filmFrame.classList.add('is-playing');
  });
}

const gallerySection = document.querySelector('#gallerySection');
const gallery = document.querySelector('#gallery');
if (project.stills.length) {
  gallery.innerHTML = project.stills
    .map(
      (source, stillIndex) =>
        `<figure class="still"><img src="${source}" width="1920" height="1080" loading="lazy" alt="Still ${stillIndex + 1} from ${project.title}"></figure>`
    )
    .join('');
} else {
  gallerySection.hidden = true;
}

document.querySelector('#nextTitle').textContent = next.title;
document.querySelector('#nextProject').href =
  `project-v2.html?title=${encodeURIComponent(next.title)}`;

// const body = document.body;
// const menuToggle = document.querySelector('.menu-toggle');
// const menuLinks = document.querySelectorAll('.menu-panel a');
// menuToggle.addEventListener('click', () => {
//   const isOpen = body.classList.toggle('menu-open');
//   menuToggle.setAttribute('aria-expanded', String(isOpen));
//   menuToggle.setAttribute(
//     'aria-label',
//     isOpen ? 'Close menu' : 'Open menu'
//   );
// });
// menuLinks.forEach((link) =>
//   link.addEventListener('click', () => {
//     body.classList.remove('menu-open');
//     menuToggle.setAttribute('aria-expanded', 'false');
//     menuToggle.setAttribute('aria-label', 'Open menu');
//   })
// );
