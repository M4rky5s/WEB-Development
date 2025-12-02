import loadHome from "./home";
import loadMenu from "./menu";
import loadContact from "./contact";

function clearPage() {
    const content = document.getElementById('content');
    content.innerHTML = '';
}

function showHome() {
    clearPage();
    loadHome();
}

function showMenu() {
    clearPage();
    loadMenu();
}

function showContact() {
    clearPage();
    loadContact();
}

function initNav() {
    const homeBtn = document.getElementById('home-btn');
    const menuBtn = document.getElementById('menu-btn');
    const contactBtn = document.getElementById('contact-btn');

    homeBtn.addEventListener('click', showHome);
    menuBtn.addEventListener('click', showMenu);
    contactBtn.addEventListener('click', showContact);
}

document.addEventListener("DOMContentLoaded", () => {
    initNav();
    showHome();
})