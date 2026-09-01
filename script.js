/* ==========================================================
   MAJLIS SARONG CINCIN — Editable event data
   Change the values below to update the whole website.
   ========================================================== */

const eventData = {
  couple: "Fatin & Ameerul",
  eventName: "Majlis Sarong Cincin",
  date: "5 September 2026",
  day: "Sabtu",
  time: "11:00 AM – 3:00 PM",
  timeDisplay: "11:00 Pagi – 3:00 Petang",
  venue: "203 Lebuh Sungai Senam",
  address: "203 Lebuh Sungai Senam, Taman Ipoh, 31400 Ipoh, Perak, Malaysia"
};

const contactData = {
  name: "Fatin Nur Dayana",
  phone: "017-245 4394",
  phoneInternational: "+60172454394",
  whatsapp: "60172454394"
};

const locationData = {
  name: "203 Lebuh Sungai Senam",
  address: "203 Lebuh Sungai Senam, Taman Ipoh, 31400 Ipoh, Perak, Malaysia",
  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=203+Lebuh+Sungai+Senam,+Taman+Ipoh,+31400+Ipoh,+Perak,+Malaysia",
  waze:
    "https://www.waze.com/ul?q=203%20Lebuh%20Sungai%20Senam%2C%20Taman%20Ipoh%2C%2031400%20Ipoh%2C%20Perak%2C%20Malaysia"
};

const socialLinks = {
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  whatsapp: `https://wa.me/${contactData.whatsapp}`
};

const tentatif = [
  { time: "11:00 Pagi", label: "Majlis Bermula" },
  { time: "12:00 Tengah Hari", label: "Ketibaan Keluarga" },
  {
    time: "12:30 Tengah Hari",
    label: "Acara Sarong Cincin",
    highlight: true
  },
  { time: "1:00 Petang", label: "Jamuan" }
];


/* ==========================================================
   Populate DOM from data
   ========================================================== */

function populateContent() {
  document.getElementById("eventNameHero").textContent =
    eventData.eventName;

  document.getElementById("coupleNamesHero").textContent =
    eventData.couple;

  document.getElementById("eventDateHero").textContent =
    eventData.date.toUpperCase();

  document.getElementById("eventTimeHero").textContent =
    eventData.timeDisplay;


  /* Location */

  document.getElementById("locName").textContent =
    locationData.name;

  document.getElementById("locAddress").innerHTML =
    locationData.address.replace(", ", ",<br>");

  document.getElementById("wazeBtn").href =
    locationData.waze;

  document.getElementById("gmapsBtn").href =
    locationData.googleMaps;


  /* Contact */

  document.getElementById("contactName").textContent =
    contactData.name;

  document.getElementById("contactPhoneDisplay").textContent =
    contactData.phone;

  document.getElementById("callBtn").href =
    `tel:${contactData.phoneInternational}`;

  document.getElementById("whatsappBtn").href =
    `https://wa.me/${contactData.whatsapp}`;


  /* Social Links */

  document.getElementById("fbBtn").href =
    socialLinks.facebook;

  document.getElementById("igBtn").href =
    socialLinks.instagram;

  document.getElementById("waSocialBtn").href =
    socialLinks.whatsapp;


  /* Browser title */

  document.title =
    `${eventData.eventName} — ${eventData.couple}`;


  renderTimeline();
}


/* ==========================================================
   Timeline
   ========================================================== */

function renderTimeline() {
  const list = document.getElementById("timelineList");

  list.innerHTML = "";

  tentatif.forEach(item => {
    const li = document.createElement("li");

    li.className =
      "timeline__item" +
      (item.highlight
        ? " timeline__item--highlight"
        : "");

    li.innerHTML = `
      <p class="timeline__time">
        ${item.time}
      </p>

      <p class="timeline__label">
        ${item.label}
      </p>

      ${
        item.highlight
          ? `
            <div class="timeline__rings" aria-hidden="true">
              <svg viewBox="0 0 120 60">
                <circle
                  cx="45"
                  cy="30"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                />

                <circle
                  cx="75"
                  cy="30"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>
          `
          : ""
      }
    `;

    list.appendChild(li);
  });
}


/* ==========================================================
   Background music — LOCAL MP3
   Put "song.mp3" in the same folder as this HTML file.
   ========================================================== */

const backgroundMusic = new Audio("song.mp3");

/*
   Music settings
*/

backgroundMusic.loop = true;
backgroundMusic.volume = 0.55;


/*
   Tracks whether the user has requested music to play.
*/

let musicShouldPlay = false;


/*
   Start background music.

   This function is called after the user clicks
   the "Open Invitation" button, which helps satisfy
   browser autoplay restrictions.
*/

function startBackgroundMusic() {
  musicShouldPlay = true;

  backgroundMusic
    .play()
    .then(() => {
      updateMusicButton(true);
    })
    .catch(error => {
      console.log(
        "Audio playback was blocked:",
        error
      );
    });
}


/*
   Toggle music ON / OFF.
*/

function toggleBackgroundMusic() {
  const btn =
    document.getElementById("musicToggle");

  if (backgroundMusic.paused) {

    backgroundMusic
      .play()
      .then(() => {
        musicShouldPlay = true;

        updateMusicButton(true);
      })
      .catch(error => {
        console.log(
          "Audio playback failed:",
          error
        );
      });

  } else {

    backgroundMusic.pause();

    musicShouldPlay = false;

    updateMusicButton(false);
  }
}


/*
   Update the music button appearance and accessibility label.
*/

function updateMusicButton(playing) {
  const btn =
    document.getElementById("musicToggle");

  if (!btn) return;

  btn.classList.toggle(
    "is-playing",
    playing
  );

  btn.setAttribute(
    "aria-label",
    playing
      ? "Senyapkan muzik"
      : "Mainkan muzik"
  );
}


/* ==========================================================
   Cover → Invitation transition
   ========================================================== */

function openInvitation() {

  const cover =
    document.getElementById("cover");

  const invitation =
    document.getElementById("invitation");

  const bottomNav =
    document.getElementById("bottomNav");

  const musicToggle =
    document.getElementById("musicToggle");


  /*
     Start music immediately when the user clicks
     the invitation button.
  */

  startBackgroundMusic();


  /*
     Start cover animation.
  */

  cover.classList.add("is-leaving");


  /*
     Reveal invitation after animation.
  */

  setTimeout(() => {

    cover.style.display = "none";

    invitation.hidden = false;

    invitation.classList.add(
      "is-entering"
    );

    bottomNav.hidden = false;


    if (musicToggle) {
      musicToggle.hidden = false;
    }


    requestAnimationFrame(() => {

      bottomNav.classList.add(
        "is-visible"
      );

    });


    initScrollReveal();

    initActiveNav();

  }, 650);
}


/* ==========================================================
   Scroll reveal for sections
   ========================================================== */

function initScrollReveal() {

  const targets =
    document.querySelectorAll(
      "[data-reveal]"
    );


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.15,
        rootMargin:
          "0px 0px -60px 0px"
      }
    );


  targets.forEach(target => {
    observer.observe(target);
  });
}


/* ==========================================================
   Bottom nav active state on scroll
   ========================================================== */

function initActiveNav() {

  const sections = [
    "arah",
    "hubungi",
    "acara"
  ].map(id =>
    document.getElementById(id)
  );


  const navItems =
    document.querySelectorAll(
      ".bottom-nav__item"
    );


  const setActive = (id) => {

    navItems.forEach(item => {

      item.classList.toggle(
        "is-active",
        item.dataset.target === id
      );

    });

  };


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            setActive(
              entry.target.id
            );

          }

        });

      },
      {
        threshold: 0.35,
        rootMargin:
          "-20% 0px -40% 0px"
      }
    );


  sections.forEach(section => {

    if (section) {
      observer.observe(section);
    }

  });


  navItems.forEach(item => {

    item.addEventListener(
      "click",
      () => {
        setActive(
          item.dataset.target
        );
      }
    );

  });
}


/* ==========================================================
   Init
   ========================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /*
       Populate all invitation information.
    */

    populateContent();


    /*
       Open invitation button.
    */

    document
      .getElementById("openInvite")
      .addEventListener(
        "click",
        openInvitation
      );


    /*
       Music toggle button.
    */

    const musicToggle =
      document.getElementById(
        "musicToggle"
      );


    if (musicToggle) {

      musicToggle.addEventListener(
        "click",
        toggleBackgroundMusic
      );

    }

  }
);
