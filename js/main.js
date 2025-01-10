import { cards } from "../data/portfolioCards";

const theme = "theme";
const dataTheme = "data-theme";
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

const dataFilter = "[data-filter]";
const portfolioData = "[data-item]";
const portfolioGrid = document.getElementsByClassName('portfolio-grid')

root = document.documentElement;

/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Portfolio */
  // Cards
const portfolioCards = cards.querySelectorAll(".portfolio-card");

  // Card Filter
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector("#search");

/* Modal */
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });
}

if (currentTheme === dark) {
  switcher[1].classList.add(active);
} else {
  switcher[0].classList.add(active);
}

toggleTheme.addEventListener("click", function () {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener("click", function () {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

/* portfolio card search box */
searchBox.addEventListener("keyup", (e) => {
  const searchInput = e.target.value.toLowerCase().trim();
  portfolioItems.forEach((card) => {
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

/* insert portfolio cards into HTML page */
for (let i = 0; i < portfolioCards.length; i++) {
  // portfolioGrid.appendChild(portfolioCard[i].innerHTML);
  console.log(portfolioCards);
  
}

/* portfolio card filter */
for (const link of filterLink) {
  link.addEventListener("click", function () {
    setActive(link, ".filter-link");
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
      } else if (card.dataset.item === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

/* Full Site Modal "Open buttons" */
for (const elm of openModal) {
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

/* Full Site Modal "Close buttons" */
for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.classList.remove(isVisible);
  });
}
