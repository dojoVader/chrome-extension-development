/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/chat-gpt-result.tsx":
/*!********************************************!*\
  !*** ./src/components/chat-gpt-result.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
const search_switcher_1 = __importDefault(__webpack_require__(/*! ./search-switcher */ "./src/components/search-switcher.tsx"));
const ChatGptResult = (props) => {
    const googleSettings = (0, react_redux_1.useSelector)(state => state.settings);
    // @ts-ignore
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        const bodyDOM = document.getElementById('rcnt');
        if (googleSettings.isGoogle && bodyDOM) {
            bodyDOM.className = "";
        }
        if (!googleSettings.isGoogle && bodyDOM) {
            bodyDOM.className = "hide";
        }
    }, [googleSettings.isGoogle]);
    const { choices } = props;
    // @ts-ignore
    return (react_1.default.createElement(react_1.default.Fragment, null,
        googleSettings.isGoogle && react_1.default.createElement(search_switcher_1.default, null),
        react_1.default.createElement("div", { className: `chat-gpt-section ${googleSettings.isGoogle ? 'hide' : ''}` },
            react_1.default.createElement("h5", null,
                react_1.default.createElement("em", null, "Results from ChatGPT")),
            choices.map((item, index) => (react_1.default.createElement('div', {
                dangerouslySetInnerHTML: {
                    __html: item.text
                },
                key: index
            }))),
            react_1.default.createElement("div", { className: "link-section" },
                react_1.default.createElement("a", { onClick: e => {
                        dispatch({ type: !googleSettings.isGoogle ? 'GOOGLE' : 'OPENAI' });
                    } }, "Take me to Google")))));
};
exports["default"] = ChatGptResult;


/***/ }),

/***/ "./src/components/search-switcher.tsx":
/*!********************************************!*\
  !*** ./src/components/search-switcher.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
const SearchSwitch = () => {
    const dispatcher = (0, react_redux_1.useDispatch)();
    const settings = (0, react_redux_1.useSelector)(state => state.settings);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("span", null,
                react_1.default.createElement("a", { onClick: e => dispatcher({ type: settings.isGoogle ? 'OPENAI' : 'GOOGLE' }) },
                    "Switch to ",
                    !settings.isGoogle ? ' Google' : 'OpenAI')))));
};
exports["default"] = SearchSwitch;


/***/ }),

/***/ "./src/configuration.ts":
/*!******************************!*\
  !*** ./src/configuration.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONFIGURATION = void 0;
exports.CONFIGURATION = {
    baseUrl: 'https://api.openai.com/v1',
    apikey: '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'
};


/***/ }),

/***/ "./src/content_script.tsx":
/*!********************************!*\
  !*** ./src/content_script.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const configuration_1 = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
const chat_gpt_result_1 = __importDefault(__webpack_require__(/*! ./components/chat-gpt-result */ "./src/components/chat-gpt-result.tsx"));
const redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
const rootReducers_1 = __importDefault(__webpack_require__(/*! ./reducers/rootReducers */ "./src/reducers/rootReducers.ts"));
const react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
const store = (0, redux_1.legacy_createStore)(rootReducers_1.default);
// ReactDOM.render(
//         <React.StrictMode>
//
//         </React.StrictMode>
// , null);
//
// ReactDOM.render(
//     <React.StrictMode>
//
//     </React.StrictMode>
// ,null);
// Get a reference to the current url and read the query
const documentSearch = document.location.search;
const filteredSearchParams = documentSearch.split("&");
if (!filteredSearchParams.length) {
    alert("Google Search contains no search query.");
}
let searchTerm = filteredSearchParams[0].replace("?q=", "");
// @ts-ignore
searchTerm = searchTerm.replaceAll("+", " ");
console.log("Injected in Chrome");
console.log(searchTerm);
// Replace the DOM
const IconSvg = chrome.runtime.getURL('icon.svg');
const ImageLogo = document.querySelector("a#logo > img");
if (ImageLogo !== null) {
    ImageLogo.src = IconSvg;
    ImageLogo.style.width = '150px';
    ImageLogo.style.height = 'auto';
    ImageLogo.style.position = 'relative';
    ImageLogo.style.left = '-20px';
    ImageLogo.style.top = '4px';
}
//block the search results
const googleResultContainer = document.getElementById('rcnt');
if (googleResultContainer)
    googleResultContainer.className += ' hide'; // Hide the default Google Search result
// create a DOM with a Loading indicator
const loadingIndicator = document.createElement('div');
loadingIndicator.id = 'loading-status';
loadingIndicator.innerHTML = '<span>Awaiting Response from Server...</span>';
// Render the loading in the search section
(_a = googleResultContainer === null || googleResultContainer === void 0 ? void 0 : googleResultContainer.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(loadingIndicator, googleResultContainer);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${configuration_1.CONFIGURATION.baseUrl}/completions`, {
        headers: {
            'Authorization': `Bearer ${configuration_1.CONFIGURATION.apikey}`,
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": searchTerm,
            "temperature": 1,
            "max_tokens": 500
        })
    });
    const result = yield response.json();
    console.log(result);
    const googleResultContainer = document.getElementById('rcnt');
    const parentNode = googleResultContainer === null || googleResultContainer === void 0 ? void 0 : googleResultContainer.parentNode;
    // Create new div
    const chatGptDiv = document.createElement('div');
    chatGptDiv.id = 'chat-gpt-div';
    chatGptDiv.innerHTML = '<span>Fetching response from ChatGPT......</span>';
    react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(react_1.default.StrictMode, null,
            react_1.default.createElement(chat_gpt_result_1.default, { choices: result.choices }))), chatGptDiv);
    // Add the new div beside Google Search Result
    parentNode === null || parentNode === void 0 ? void 0 : parentNode.insertBefore(chatGptDiv, googleResultContainer);
    // Detach the loading indicator
    parentNode === null || parentNode === void 0 ? void 0 : parentNode.removeChild(loadingIndicator);
}))();


/***/ }),

/***/ "./src/reducers/rootReducers.ts":
/*!**************************************!*\
  !*** ./src/reducers/rootReducers.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
const settingsReducer_1 = __importDefault(__webpack_require__(/*! ./settingsReducer */ "./src/reducers/settingsReducer.ts"));
const rootReducer = (0, redux_1.combineReducers)({
    settings: settingsReducer_1.default,
});
exports["default"] = rootReducer;


/***/ }),

/***/ "./src/reducers/settingsReducer.ts":
/*!*****************************************!*\
  !*** ./src/reducers/settingsReducer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const initState = {
    isGoogle: false,
};
const settingsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GOOGLE':
            return Object.assign(Object.assign({}, state), { isGoogle: true });
        case 'OPENAI':
            return Object.assign(Object.assign({}, state), { isGoogle: false });
        default:
            return state;
    }
};
exports["default"] = settingsReducer;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"content_script": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkchat_gpt"] = self["webpackChunkchat_gpt"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/content_script.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hhdC1ncHQvLi9zcmMvY29tcG9uZW50cy9jaGF0LWdwdC1yZXN1bHQudHN4Iiwid2VicGFjazovL2NoYXQtZ3B0Ly4vc3JjL2NvbXBvbmVudHMvc2VhcmNoLXN3aXRjaGVyLnRzeCIsIndlYnBhY2s6Ly9jaGF0LWdwdC8uL3NyYy9jb25maWd1cmF0aW9uLnRzIiwid2VicGFjazovL2NoYXQtZ3B0Ly4vc3JjL2NvbnRlbnRfc2NyaXB0LnRzeCIsIndlYnBhY2s6Ly9jaGF0LWdwdC8uL3NyYy9yZWR1Y2Vycy9yb290UmVkdWNlcnMudHMiLCJ3ZWJwYWNrOi8vY2hhdC1ncHQvLi9zcmMvcmVkdWNlcnMvc2V0dGluZ3NSZWR1Y2VyLnRzIiwid2VicGFjazovL2NoYXQtZ3B0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NoYXQtZ3B0L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2hhdC1ncHQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2hhdC1ncHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NoYXQtZ3B0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2hhdC1ncHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jaGF0LWdwdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jaGF0LWdwdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NoYXQtZ3B0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaGF0LWdwdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHJlYWN0X3JlZHV4XzEgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7XG5jb25zdCBzZWFyY2hfc3dpdGNoZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zZWFyY2gtc3dpdGNoZXJcIikpO1xuY29uc3QgQ2hhdEdwdFJlc3VsdCA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IGdvb2dsZVNldHRpbmdzID0gKDAsIHJlYWN0X3JlZHV4XzEudXNlU2VsZWN0b3IpKHN0YXRlID0+IHN0YXRlLnNldHRpbmdzKTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgZGlzcGF0Y2ggPSAoMCwgcmVhY3RfcmVkdXhfMS51c2VEaXNwYXRjaCkoKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgY29uc3QgYm9keURPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyY250Jyk7XG4gICAgICAgIGlmIChnb29nbGVTZXR0aW5ncy5pc0dvb2dsZSAmJiBib2R5RE9NKSB7XG4gICAgICAgICAgICBib2R5RE9NLmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFnb29nbGVTZXR0aW5ncy5pc0dvb2dsZSAmJiBib2R5RE9NKSB7XG4gICAgICAgICAgICBib2R5RE9NLmNsYXNzTmFtZSA9IFwiaGlkZVwiO1xuICAgICAgICB9XG4gICAgfSwgW2dvb2dsZVNldHRpbmdzLmlzR29vZ2xlXSk7XG4gICAgY29uc3QgeyBjaG9pY2VzIH0gPSBwcm9wcztcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIGdvb2dsZVNldHRpbmdzLmlzR29vZ2xlICYmIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHNlYXJjaF9zd2l0Y2hlcl8xLmRlZmF1bHQsIG51bGwpLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogYGNoYXQtZ3B0LXNlY3Rpb24gJHtnb29nbGVTZXR0aW5ncy5pc0dvb2dsZSA/ICdoaWRlJyA6ICcnfWAgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDVcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImVtXCIsIG51bGwsIFwiUmVzdWx0cyBmcm9tIENoYXRHUFRcIikpLFxuICAgICAgICAgICAgY2hvaWNlcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xuICAgICAgICAgICAgICAgICAgICBfX2h0bWw6IGl0ZW0udGV4dFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAga2V5OiBpbmRleFxuICAgICAgICAgICAgfSkpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImxpbmstc2VjdGlvblwiIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgb25DbGljazogZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICFnb29nbGVTZXR0aW5ncy5pc0dvb2dsZSA/ICdHT09HTEUnIDogJ09QRU5BSScgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gfSwgXCJUYWtlIG1lIHRvIEdvb2dsZVwiKSkpKSk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQ2hhdEdwdFJlc3VsdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgcmVhY3RfcmVkdXhfMSA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcbmNvbnN0IFNlYXJjaFN3aXRjaCA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwYXRjaGVyID0gKDAsIHJlYWN0X3JlZHV4XzEudXNlRGlzcGF0Y2gpKCk7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSAoMCwgcmVhY3RfcmVkdXhfMS51c2VTZWxlY3Rvcikoc3RhdGUgPT4gc3RhdGUuc2V0dGluZ3MpO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgb25DbGljazogZSA9PiBkaXNwYXRjaGVyKHsgdHlwZTogc2V0dGluZ3MuaXNHb29nbGUgPyAnT1BFTkFJJyA6ICdHT09HTEUnIH0pIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiU3dpdGNoIHRvIFwiLFxuICAgICAgICAgICAgICAgICAgICAhc2V0dGluZ3MuaXNHb29nbGUgPyAnIEdvb2dsZScgOiAnT3BlbkFJJykpKSkpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFNlYXJjaFN3aXRjaDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DT05GSUdVUkFUSU9OID0gdm9pZCAwO1xuZXhwb3J0cy5DT05GSUdVUkFUSU9OID0ge1xuICAgIGJhc2VVcmw6ICdodHRwczovL2FwaS5vcGVuYWkuY29tL3YxJyxcbiAgICBhcGlrZXk6ICdzay1nMWdkS2hiYmE0ZDRsQVdsM0t0SlQzQmxia0ZKdjBFVE5ZaDdSSXpzMVl1QU5FVFMnXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbnZhciBfYTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHJlYWN0X2RvbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuY29uc3QgY29uZmlndXJhdGlvbl8xID0gcmVxdWlyZShcIi4vY29uZmlndXJhdGlvblwiKTtcbmNvbnN0IGNoYXRfZ3B0X3Jlc3VsdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2hhdC1ncHQtcmVzdWx0XCIpKTtcbmNvbnN0IHJlZHV4XzEgPSByZXF1aXJlKFwicmVkdXhcIik7XG5jb25zdCByb290UmVkdWNlcnNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9yZWR1Y2Vycy9yb290UmVkdWNlcnNcIikpO1xuY29uc3QgcmVhY3RfcmVkdXhfMSA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcbmNvbnN0IHN0b3JlID0gKDAsIHJlZHV4XzEubGVnYWN5X2NyZWF0ZVN0b3JlKShyb290UmVkdWNlcnNfMS5kZWZhdWx0KTtcbi8vIFJlYWN0RE9NLnJlbmRlcihcbi8vICAgICAgICAgPFJlYWN0LlN0cmljdE1vZGU+XG4vL1xuLy8gICAgICAgICA8L1JlYWN0LlN0cmljdE1vZGU+XG4vLyAsIG51bGwpO1xuLy9cbi8vIFJlYWN0RE9NLnJlbmRlcihcbi8vICAgICA8UmVhY3QuU3RyaWN0TW9kZT5cbi8vXG4vLyAgICAgPC9SZWFjdC5TdHJpY3RNb2RlPlxuLy8gLG51bGwpO1xuLy8gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHVybCBhbmQgcmVhZCB0aGUgcXVlcnlcbmNvbnN0IGRvY3VtZW50U2VhcmNoID0gZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoO1xuY29uc3QgZmlsdGVyZWRTZWFyY2hQYXJhbXMgPSBkb2N1bWVudFNlYXJjaC5zcGxpdChcIiZcIik7XG5pZiAoIWZpbHRlcmVkU2VhcmNoUGFyYW1zLmxlbmd0aCkge1xuICAgIGFsZXJ0KFwiR29vZ2xlIFNlYXJjaCBjb250YWlucyBubyBzZWFyY2ggcXVlcnkuXCIpO1xufVxubGV0IHNlYXJjaFRlcm0gPSBmaWx0ZXJlZFNlYXJjaFBhcmFtc1swXS5yZXBsYWNlKFwiP3E9XCIsIFwiXCIpO1xuLy8gQHRzLWlnbm9yZVxuc2VhcmNoVGVybSA9IHNlYXJjaFRlcm0ucmVwbGFjZUFsbChcIitcIiwgXCIgXCIpO1xuY29uc29sZS5sb2coXCJJbmplY3RlZCBpbiBDaHJvbWVcIik7XG5jb25zb2xlLmxvZyhzZWFyY2hUZXJtKTtcbi8vIFJlcGxhY2UgdGhlIERPTVxuY29uc3QgSWNvblN2ZyA9IGNocm9tZS5ydW50aW1lLmdldFVSTCgnaWNvbi5zdmcnKTtcbmNvbnN0IEltYWdlTG9nbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhI2xvZ28gPiBpbWdcIik7XG5pZiAoSW1hZ2VMb2dvICE9PSBudWxsKSB7XG4gICAgSW1hZ2VMb2dvLnNyYyA9IEljb25Tdmc7XG4gICAgSW1hZ2VMb2dvLnN0eWxlLndpZHRoID0gJzE1MHB4JztcbiAgICBJbWFnZUxvZ28uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgIEltYWdlTG9nby5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgSW1hZ2VMb2dvLnN0eWxlLmxlZnQgPSAnLTIwcHgnO1xuICAgIEltYWdlTG9nby5zdHlsZS50b3AgPSAnNHB4Jztcbn1cbi8vYmxvY2sgdGhlIHNlYXJjaCByZXN1bHRzXG5jb25zdCBnb29nbGVSZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmNudCcpO1xuaWYgKGdvb2dsZVJlc3VsdENvbnRhaW5lcilcbiAgICBnb29nbGVSZXN1bHRDb250YWluZXIuY2xhc3NOYW1lICs9ICcgaGlkZSc7IC8vIEhpZGUgdGhlIGRlZmF1bHQgR29vZ2xlIFNlYXJjaCByZXN1bHRcbi8vIGNyZWF0ZSBhIERPTSB3aXRoIGEgTG9hZGluZyBpbmRpY2F0b3JcbmNvbnN0IGxvYWRpbmdJbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmxvYWRpbmdJbmRpY2F0b3IuaWQgPSAnbG9hZGluZy1zdGF0dXMnO1xubG9hZGluZ0luZGljYXRvci5pbm5lckhUTUwgPSAnPHNwYW4+QXdhaXRpbmcgUmVzcG9uc2UgZnJvbSBTZXJ2ZXIuLi48L3NwYW4+Jztcbi8vIFJlbmRlciB0aGUgbG9hZGluZyBpbiB0aGUgc2VhcmNoIHNlY3Rpb25cbihfYSA9IGdvb2dsZVJlc3VsdENvbnRhaW5lciA9PT0gbnVsbCB8fCBnb29nbGVSZXN1bHRDb250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGdvb2dsZVJlc3VsdENvbnRhaW5lci5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5zZXJ0QmVmb3JlKGxvYWRpbmdJbmRpY2F0b3IsIGdvb2dsZVJlc3VsdENvbnRhaW5lcik7XG4oKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgJHtjb25maWd1cmF0aW9uXzEuQ09ORklHVVJBVElPTi5iYXNlVXJsfS9jb21wbGV0aW9uc2AsIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7Y29uZmlndXJhdGlvbl8xLkNPTkZJR1VSQVRJT04uYXBpa2V5fWAsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBcIm1vZGVsXCI6IFwidGV4dC1kYXZpbmNpLTAwM1wiLFxuICAgICAgICAgICAgXCJwcm9tcHRcIjogc2VhcmNoVGVybSxcbiAgICAgICAgICAgIFwidGVtcGVyYXR1cmVcIjogMSxcbiAgICAgICAgICAgIFwibWF4X3Rva2Vuc1wiOiA1MDBcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICBjb25zdCBnb29nbGVSZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmNudCcpO1xuICAgIGNvbnN0IHBhcmVudE5vZGUgPSBnb29nbGVSZXN1bHRDb250YWluZXIgPT09IG51bGwgfHwgZ29vZ2xlUmVzdWx0Q29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBnb29nbGVSZXN1bHRDb250YWluZXIucGFyZW50Tm9kZTtcbiAgICAvLyBDcmVhdGUgbmV3IGRpdlxuICAgIGNvbnN0IGNoYXRHcHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjaGF0R3B0RGl2LmlkID0gJ2NoYXQtZ3B0LWRpdic7XG4gICAgY2hhdEdwdERpdi5pbm5lckhUTUwgPSAnPHNwYW4+RmV0Y2hpbmcgcmVzcG9uc2UgZnJvbSBDaGF0R1BULi4uLi4uPC9zcGFuPic7XG4gICAgcmVhY3RfZG9tXzEuZGVmYXVsdC5yZW5kZXIocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfcmVkdXhfMS5Qcm92aWRlciwgeyBzdG9yZTogc3RvcmUgfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LlN0cmljdE1vZGUsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChjaGF0X2dwdF9yZXN1bHRfMS5kZWZhdWx0LCB7IGNob2ljZXM6IHJlc3VsdC5jaG9pY2VzIH0pKSksIGNoYXRHcHREaXYpO1xuICAgIC8vIEFkZCB0aGUgbmV3IGRpdiBiZXNpZGUgR29vZ2xlIFNlYXJjaCBSZXN1bHRcbiAgICBwYXJlbnROb2RlID09PSBudWxsIHx8IHBhcmVudE5vZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNoYXRHcHREaXYsIGdvb2dsZVJlc3VsdENvbnRhaW5lcik7XG4gICAgLy8gRGV0YWNoIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICAgIHBhcmVudE5vZGUgPT09IG51bGwgfHwgcGFyZW50Tm9kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsb2FkaW5nSW5kaWNhdG9yKTtcbn0pKSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCByZWR1eF8xID0gcmVxdWlyZShcInJlZHV4XCIpO1xuY29uc3Qgc2V0dGluZ3NSZWR1Y2VyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2V0dGluZ3NSZWR1Y2VyXCIpKTtcbmNvbnN0IHJvb3RSZWR1Y2VyID0gKDAsIHJlZHV4XzEuY29tYmluZVJlZHVjZXJzKSh7XG4gICAgc2V0dGluZ3M6IHNldHRpbmdzUmVkdWNlcl8xLmRlZmF1bHQsXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHJvb3RSZWR1Y2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpbml0U3RhdGUgPSB7XG4gICAgaXNHb29nbGU6IGZhbHNlLFxufTtcbmNvbnN0IHNldHRpbmdzUmVkdWNlciA9IChzdGF0ZSA9IGluaXRTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlICdHT09HTEUnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpLCB7IGlzR29vZ2xlOiB0cnVlIH0pO1xuICAgICAgICBjYXNlICdPUEVOQUknOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpLCB7IGlzR29vZ2xlOiBmYWxzZSB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gc2V0dGluZ3NSZWR1Y2VyO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJjb250ZW50X3NjcmlwdFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaGF0X2dwdFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaGF0X2dwdFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnRlbnRfc2NyaXB0LnRzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9