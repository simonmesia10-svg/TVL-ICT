let hamburgerMenuInitialized = false;
function setupHamburgerMenu() {
  if (hamburgerMenuInitialized) return;
  hamburgerMenuInitialized = true;
  setTimeout(function() {
    const hamburger = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');

    if (!hamburger || !mobileNav) {
      console.warn('setupHamburgerMenu: hamburger or mobileNav not found');
      return;
    }

    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);

    newHamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        mobileNav.style.removeProperty('display');
      } else {
        mobileNav.classList.add('open');
        mobileNav.style.removeProperty('display');
      }
    });

    newHamburger.addEventListener('keydown', (e) => {
      if (e.key === 'k' || e.key === 'K' || e.key === ' ' || e.code === 'Space') {
        if (mobileNav.classList.contains('open')) {
          mobileNav.classList.remove('open');
          mobileNav.style.removeProperty('display');
        } else {
          mobileNav.classList.add('open');
          mobileNav.style.removeProperty('display');
        }
      }
    });

    mobileNav.classList.remove('open');
    mobileNav.style.removeProperty('display');

    window.addEventListener('resize', () => {
      mobileNav.classList.remove('open');
      mobileNav.style.removeProperty('display');
    });

    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !newHamburger.contains(e.target)) {
        mobileNav.classList.remove('open');
        mobileNav.style.removeProperty('display');
      }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileNav.style.removeProperty('display');
      });
    });
  }, 100);
}

if (document.getElementById('hamburgerMenu')) {
  setupHamburgerMenu();
} else {
  document.addEventListener('DOMContentLoaded', setupHamburgerMenu);
}

window.addEventListener('DOMContentLoaded', function() {

  function updateLoginSettingsLinks() {
    const nav = document.querySelector('nav');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!nav && !mobileNav) return;

    let foundSettings = false;
    document.querySelectorAll('nav a, .mobile-nav a').forEach(link => {
      if (link.textContent.trim() === 'Settings') {
        if (foundSettings) link.remove();
        foundSettings = true;
      }
    });
    // Show/hide Login links
    const loginLinks = document.querySelectorAll('nav a, .mobile-nav a');
    const isLoggedIn = !!localStorage.getItem('currentUserId');
    loginLinks.forEach(link => {
      if (link.textContent.trim() === 'Login') {
        if (isLoggedIn) {
          const settingsHref = '/functions/Settings/settings.html';
          link.textContent = 'Settings';
          link.href = settingsHref;
          link.style.fontWeight = '600';
          link.style.display = '';
        } else {
          link.textContent = 'Login';
          link.href = '/functions/Login/choose-role.html';
          link.style.fontWeight = '';
          link.style.display = '';
        }
      }
    });

    if (isLoggedIn && nav && !Array.from(nav.querySelectorAll('a')).some(link => link.href && link.href.endsWith('/functions/Settings/settings.html'))) {
      const settingsLink = document.createElement('a');
      settingsLink.textContent = 'Settings';
      settingsLink.href = '/functions/Settings/settings.html';
      settingsLink.style.fontWeight = '600';
      nav.appendChild(settingsLink);
    }
    if (isLoggedIn && mobileNav && !Array.from(mobileNav.querySelectorAll('a')).some(link => link.href && link.href.endsWith('/functions/Settings/settings.html'))) {

      mobileNav.querySelectorAll('a').forEach(link => {
        if (link.textContent.trim() === 'Settings' || (link.href && link.href.endsWith('/functions/Settings/settings.html'))) link.remove();
      });
      const mobileSettingsLink = document.createElement('a');
      mobileSettingsLink.textContent = 'Settings';
      mobileSettingsLink.href = '/functions/Settings/settings.html';
      mobileSettingsLink.style.fontWeight = '600';
      mobileNav.appendChild(mobileSettingsLink);
    }
  }

  setTimeout(updateLoginSettingsLinks, 100);
  setTimeout(updateLoginSettingsLinks, 300);
  setTimeout(updateLoginSettingsLinks, 600);
  window.addEventListener('storage', updateLoginSettingsLinks);
  window.addEventListener('DOMContentLoaded', updateLoginSettingsLinks);
  updateLoginSettingsLinks();
});

window.updateLoginSettingsLinks = function updateLoginSettingsLinks() {
  const nav = document.querySelector('nav');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!nav && !mobileNav) return;

  let foundSettings = false;
  document.querySelectorAll('nav a, .mobile-nav a').forEach(link => {
    if (link.textContent.trim() === 'Settings') {
      if (foundSettings) link.remove();
      foundSettings = true;
    }
  });

  const loginLinks = document.querySelectorAll('nav a, .mobile-nav a');
  const isLoggedIn = !!localStorage.getItem('currentUserId');
  loginLinks.forEach(link => {
    if (link.textContent.trim() === 'Login') {
      if (isLoggedIn) {
        const settingsHref = '/functions/Settings/settings.html';
        link.textContent = 'Settings';
        link.href = settingsHref;
        link.style.fontWeight = '600';
        link.style.display = '';
      } else {
        link.textContent = 'Login';
        link.href = '/functions/Login/choose-role.html';
        link.style.fontWeight = '';
        link.style.display = '';
      }
    }
  });

  if (isLoggedIn && mobileNav && !Array.from(mobileNav.querySelectorAll('a')).some(link => link.href && link.href.endsWith('/functions/Settings/settings.html'))) {

    mobileNav.querySelectorAll('a').forEach(link => {
      if (link.textContent.trim() === 'Settings' || (link.href && link.href.endsWith('/functions/Settings/settings.html'))) link.remove();
    });
    const mobileSettingsLink = document.createElement('a');
    mobileSettingsLink.textContent = 'Settings';
    mobileSettingsLink.href = '/functions/Settings/settings.html';
    mobileSettingsLink.style.fontWeight = '600';
    mobileNav.appendChild(mobileSettingsLink);
  }
}


function applyGlobalTheme() {
  const theme = localStorage.getItem('siteTheme') || 'system';
  document.body.classList.remove('dark-theme', 'light-theme', 'bee-theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else if (theme === 'light') {
    document.body.classList.add('light-theme');
  } else if (theme === 'bee') {
    document.body.classList.add('bee-theme');
  }
}

applyGlobalTheme();


window.addEventListener('DOMContentLoaded', applyGlobalTheme);

const headerObserver = new MutationObserver(applyGlobalTheme);
headerObserver.observe(document.body, { childList: true, subtree: true });
