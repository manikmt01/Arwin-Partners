// for header
// Desktop dropdown
const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');
let dropdownOpen = false;

dropdownToggle.addEventListener('click', e => {
  e.stopPropagation();
  dropdownOpen = !dropdownOpen;
  dropdownMenu.classList.toggle('hidden', !dropdownOpen);
});

document.addEventListener('click', e => {
  if (!document.getElementById('language-dropdown').contains(e.target)) {
    dropdownMenu.classList.add('hidden');
    dropdownOpen = false;
  }
});

// Mobile dropdown
const mobileToggle = document.getElementById('mobile-dropdown-toggle');
const mobileMenu = document.getElementById('mobile-dropdown-menu');
let mobileOpen = false;

mobileToggle.addEventListener('click', e => {
  e.stopPropagation();
  mobileOpen = !mobileOpen;
  mobileMenu.classList.toggle('hidden', !mobileOpen);
});

document.addEventListener('click', e => {
  if (!document.getElementById('mobile-lang-dropdown').contains(e.target)) {
    mobileMenu.classList.add('hidden');
    mobileOpen = false;
  }
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenuContainer = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenuContainer.classList.toggle('hidden');
});


