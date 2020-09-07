/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('DOMContentLoaded', () => {
  //TABS
  const tabContent = document.querySelectorAll('.tabcontent'),
        tabItem = document.querySelectorAll('.tabheader__item'),
        tabParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabContent.forEach(item => {
      item.classList.remove('show');
      item.classList.add('hide');
    });
    tabItem.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  hideTabContent();

  function showTabContent(i = 0) {
    tabContent[i].classList.remove('hide');
    tabContent[i].classList.add('show');
    tabItem[i].classList.add('tabheader__item_active');
  }

  showTabContent();
  tabParent.addEventListener('click', e => {
    let target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabItem.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); //Timer

  const days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds');
  const deadline = new Date('2020-09-10');

  function calcMsLeft() {
    return deadline - Date.now();
  }

  function clearDate() {
    days.textContent = '00';
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
  }

  clearDate();

  function updateCounter() {
    let timerId = setInterval(function () {
      let timeLeft = calcMsLeft(),
          daysLeft = Math.floor(timeLeft / (24 * 60 * 60 * 1000)),
          hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000)),
          minutesLeft = Math.floor(timeLeft / (60 * 1000)),
          secondsLeft = Math.floor(timeLeft / 1000);
      let daysZ = daysLeft,
          hoursZ = hoursLeft > 24 ? hoursLeft - daysLeft * 24 : hoursLeft,
          minutesZ = minutesLeft > 60 ? minutesLeft - hoursLeft * 60 : minutesLeft,
          secondsZ = secondsLeft > 60 ? secondsLeft - minutesLeft * 60 : secondsLeft;
      days.textContent = daysZ < 10 ? `0${daysZ}` : daysZ;
      hours.textContent = hoursZ < 10 ? `0${hoursZ}` : hoursZ;
      minutes.textContent = minutesZ < 10 ? `0${minutesZ}` : minutesZ;
      seconds.textContent = secondsZ < 10 ? `0${secondsZ}` : secondsZ;
    }, 1000);
  }

  updateCounter();
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map