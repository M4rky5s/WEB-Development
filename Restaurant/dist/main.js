/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/contact.js":
/*!************************!*\
  !*** ./src/contact.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ loadContact)\n/* harmony export */ });\nfunction loadContact() {\r\n    const content = document.getElementById('content');\r\n\r\n    const contactDiv = document.createElement('div');\r\n    contactDiv.classList.add('contact-tab');\r\n\r\n    const title = document.createElement('h1');\r\n    title.textContent = \"Contact Us\";\r\n\r\n    const phone = document.createElement('p');\r\n    phone.textContent = \"Phone: +370 611 12312\";\r\n\r\n    const email = document.createElement('p');\r\n    email.textContent = \"Email: ThisEmailIsReal@notfake.com\";\r\n\r\n    const address = document.createElement('p');\r\n    address.textContent = \"Address: Unknown Street 1, Vilnius\";\r\n\r\n    contactDiv.appendChild(title);\r\n    contactDiv.appendChild(phone);\r\n    contactDiv.appendChild(email);\r\n    contactDiv.appendChild(address);\r\n\r\n    content.appendChild(contactDiv);\r\n}\n\n//# sourceURL=webpack://restaurant/./src/contact.js?\n}");

/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ loadHome)\n/* harmony export */ });\nfunction loadHome() {\r\n    const content = document.getElementById('content');\r\n\r\n    const homeDiv = document.createElement('div');\r\n    homeDiv.classList.add('home-tab');\r\n\r\n    const headline = document.createElement('h1');\r\n    headline.textContent = 'Welcome to the Best Restaurant in Town!';\r\n\r\n    const description = document.createElement('p');\r\n    description.textContent = 'We serve fresh, delicious food every single day. Our chefs are world-class and our dishes are unforgettable.';\r\n\r\n    const image = document.createElement('img');\r\n    image.src = 'https://www.franciscosegarra.com/wp-content/uploads/2022/03/restaurant-decoration.jpg';\r\n    image.alt = 'Restaurant interior';\r\n\r\n    image.width = 400;\r\n    image.height = 200;\r\n\r\n    homeDiv.appendChild(headline);\r\n    homeDiv.appendChild(description);\r\n    homeDiv.appendChild(image);\r\n\r\n    content.appendChild(homeDiv);\r\n}\n\n//# sourceURL=webpack://restaurant/./src/home.js?\n}");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home */ \"./src/home.js\");\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ \"./src/menu.js\");\n/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contact */ \"./src/contact.js\");\n\r\n\r\n\r\n\r\nfunction clearPage() {\r\n    const content = document.getElementById('content');\r\n    content.innerHTML = '';\r\n}\r\n\r\nfunction showHome() {\r\n    clearPage();\r\n    (0,_home__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n}\r\n\r\nfunction showMenu() {\r\n    clearPage();\r\n    (0,_menu__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n}\r\n\r\nfunction showContact() {\r\n    clearPage();\r\n    (0,_contact__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\r\n}\r\n\r\nfunction initNav() {\r\n    const homeBtn = document.getElementById('home-btn');\r\n    const menuBtn = document.getElementById('menu-btn');\r\n    const contactBtn = document.getElementById('contact-btn');\r\n\r\n    homeBtn.addEventListener('click', showHome);\r\n    menuBtn.addEventListener('click', showMenu);\r\n    contactBtn.addEventListener('click', showContact);\r\n}\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    initNav();\r\n    showHome();\r\n})\n\n//# sourceURL=webpack://restaurant/./src/index.js?\n}");

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ loadMenu)\n/* harmony export */ });\nfunction loadMenu() {\r\n    const content = document.getElementById('content');\r\n\r\n    const menuDiv = document.createElement('div');\r\n    menuDiv.classList.add('menu-tab');\r\n\r\n    const title = document.createElement('h1');\r\n    title.textContent = 'Our Menu';\r\n\r\n    const list = document.createElement('ul');\r\n\r\n    const item1 = document.createElement('li');\r\n    item1.textContent = 'Pizza with Cheese';\r\n\r\n    const item2 = document.createElement('li');\r\n    item2.textContent = 'Hamburger';\r\n\r\n    const item3 = document.createElement('li');\r\n    item3.textContent = 'Hot Dog';\r\n\r\n    list.appendChild(item1);\r\n    list.appendChild(item2);\r\n    list.appendChild(item3);\r\n\r\n    menuDiv.appendChild(title);\r\n    menuDiv.appendChild(list);\r\n\r\n    content.appendChild(menuDiv);\r\n\r\n}\n\n//# sourceURL=webpack://restaurant/./src/menu.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;