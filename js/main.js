const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

root = document.documentElement;

/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Portfolio */
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector('#search');

/* Modal */
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  } 
    elm.classList.add(active);
}

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
}

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  })
}


if (currentTheme === dark) {
  switcher[1].classList.add(active);
} else {
  switcher[0].classList.add(active);
}

toggleTheme.addEventListener('click', function() {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener('click', function() {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

searchBox.addEventListener('keyup', (e) => {
  const searchInput = e.target.value.toLowerCase().trim();
  portfolioItems.forEach((card) => {
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  })
});

const portfolioContainer = document.querySelector(".portfolio-grid");

function createPortfolioCard(project) {
  const card = document.createElement("div");
  card.classList.add("pc-wrapper");
  card.setAttribute("data-card", project.projectType);
  card.setAttribute("project-id", project.modal.id);

  const cardBody = document.createElement("div");
  cardBody.classList.add("pc-body");

  const cardImage = document.createElement("img");
  cardImage.setAttribute("src", `./assets/images/${project.imgURL}`);
  cardImage.setAttribute("alt", "portfolio icon");
  cardBody.appendChild(cardImage);

  const cardPopupBox = document.createElement("div");
  cardPopupBox.classList.add("pc-popup-box");
  cardPopupBox.setAttribute("data-open", project.modal.id);

  const cardPopupBoxCategory = document.createElement("div");
  cardPopupBoxCategory.textContent = project.category;
  cardPopupBox.appendChild(cardPopupBoxCategory);

  const cardPopupBoxTitle = document.createElement("h3");
  cardPopupBoxTitle.textContent = project.title;
  cardPopupBox.appendChild(cardPopupBoxTitle);

  cardBody.appendChild(cardPopupBox);
  card.appendChild(cardBody);
  portfolioContainer.appendChild(card);

  return card;
}

function loadProjects() {
  projectsData.forEach((project) => {
    const card = createPortfolioCard(project);
    portfolioGrid.appendChild(card);
  });

  const projectCards = document.querySelectorAll('.pc-wrapper');

  // Portfolio Filter Trigger
  for (const link of filterLink) {
    link.addEventListener('click', function() {
      setActive(link, '.filter-link');
      const filter = this.dataset.filter;
      portfolioFilter(filter, projectCards);
    });
  };
  
  // Portfolio Search
  searchBox.addEventListener('keyup', (e) => {
    const searchInput = e.target.value.toLowerCase().trim();
    projectCards.forEach((card) => {
      if (card.dataset.card.includes(searchInput)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';    
      }
    })
  });
};

/* Full Site Modal "Open buttons" */
for (const elm of openModal) {
    elm.addEventListener('click', function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    });
}

for (const elm of closeModal) {
    elm.addEventListener('click', function() {
        this.parentElement.parentElement.classList.remove(isVisible);
    })
};