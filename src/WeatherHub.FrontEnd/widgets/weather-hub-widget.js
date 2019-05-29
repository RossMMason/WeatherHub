var weatherHub =
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
/******/ 	__webpack_require__.p = "/widgets";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ts/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\nvar btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ \"./node_modules/axios/lib/helpers/btoa.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n    var loadEvent = 'onreadystatechange';\n    var xDomain = false;\n\n    // For IE 8/9 CORS support\n    // Only supports POST and GET calls and doesn't returns the response headers.\n    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.\n    if ( true &&\n        typeof window !== 'undefined' &&\n        window.XDomainRequest && !('withCredentials' in request) &&\n        !isURLSameOrigin(config.url)) {\n      request = new window.XDomainRequest();\n      loadEvent = 'onload';\n      xDomain = true;\n      request.onprogress = function handleProgress() {};\n      request.ontimeout = function handleTimeout() {};\n    }\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password || '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request[loadEvent] = function handleLoad() {\n      if (!request || (request.readyState !== 4 && !xDomain)) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)\n        status: request.status === 1223 ? 204 : request.status,\n        statusText: request.status === 1223 ? 'No Content' : request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      var cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\n\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?\n          cookies.read(config.xsrfCookieName) :\n          undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (config.withCredentials) {\n      request.withCredentials = true;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (requestData === undefined) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(utils.merge(defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports.default = axios;\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar defaults = __webpack_require__(/*! ./../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = utils.merge({\n      url: arguments[0]\n    }, arguments[1]);\n  }\n\n  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);\n  config.method = config.method.toLowerCase();\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Support baseURL config\n  if (config.baseURL && !isAbsoluteURL(config.url)) {\n    config.url = combineURLs(config.baseURL, config.url);\n  }\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers || {}\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n  error.request = request;\n  error.response = response;\n  return error;\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  // Note: status is not exposed by XDomainRequest\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) { /* Ignore */ }\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js\n\nvar chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\nfunction E() {\n  this.message = 'String contains an invalid character';\n}\nE.prototype = new Error;\nE.prototype.code = 5;\nE.prototype.name = 'InvalidCharacterError';\n\nfunction btoa(input) {\n  var str = String(input);\n  var output = '';\n  for (\n    // initialize result and counter\n    var block, charCode, idx = 0, map = chars;\n    // if the next str index does not exist:\n    //   change the mapping table to \"=\"\n    //   check if d has no fractional digits\n    str.charAt(idx | 0) || (map = '=', idx % 1);\n    // \"8 - idx % 1 * 8\" generates the sequence 2, 4, 6, 8\n    output += map.charAt(63 & block >> 8 - idx % 1 * 8)\n  ) {\n    charCode = str.charCodeAt(idx += 3 / 4);\n    if (charCode > 0xFF) {\n      throw new E();\n    }\n    block = block << 8 | charCode;\n  }\n  return output;\n}\n\nmodule.exports = btoa;\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/helpers/btoa.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%40/gi, '@').\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n  (function standardBrowserEnv() {\n    return {\n      write: function write(name, value, expires, path, domain, secure) {\n        var cookie = [];\n        cookie.push(name + '=' + encodeURIComponent(value));\n\n        if (utils.isNumber(expires)) {\n          cookie.push('expires=' + new Date(expires).toGMTString());\n        }\n\n        if (utils.isString(path)) {\n          cookie.push('path=' + path);\n        }\n\n        if (utils.isString(domain)) {\n          cookie.push('domain=' + domain);\n        }\n\n        if (secure === true) {\n          cookie.push('secure');\n        }\n\n        document.cookie = cookie.join('; ');\n      },\n\n      read: function read(name) {\n        var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n        return (match ? decodeURIComponent(match[3]) : null);\n      },\n\n      remove: function remove(name) {\n        this.write(name, '', Date.now() - 86400000);\n      }\n    };\n  })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n  (function nonStandardBrowserEnv() {\n    return {\n      write: function write() {},\n      read: function read() { return null; },\n      remove: function remove() {}\n    };\n  })()\n);\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n  (function standardBrowserEnv() {\n    var msie = /(msie|trident)/i.test(navigator.userAgent);\n    var urlParsingNode = document.createElement('a');\n    var originURL;\n\n    /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n    function resolveURL(url) {\n      var href = url;\n\n      if (msie) {\n        // IE needs attribute set twice to normalize properties\n        urlParsingNode.setAttribute('href', href);\n        href = urlParsingNode.href;\n      }\n\n      urlParsingNode.setAttribute('href', href);\n\n      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n      return {\n        href: urlParsingNode.href,\n        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n        host: urlParsingNode.host,\n        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n        hostname: urlParsingNode.hostname,\n        port: urlParsingNode.port,\n        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n                  urlParsingNode.pathname :\n                  '/' + urlParsingNode.pathname\n      };\n    }\n\n    originURL = resolveURL(window.location.href);\n\n    /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n    return function isURLSameOrigin(requestURL) {\n      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n      return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n    };\n  })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n  (function nonStandardBrowserEnv() {\n    return function isURLSameOrigin() {\n      return true;\n    };\n  })()\n);\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar isBuffer = __webpack_require__(/*! is-buffer */ \"./node_modules/is-buffer/index.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = merge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim\n};\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var MILLISECONDS_IN_MINUTE = 60000\n\n/**\n * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.\n * They usually appear for dates that denote time before the timezones were introduced\n * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891\n * and GMT+01:00:00 after that date)\n *\n * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,\n * which would lead to incorrect calculations.\n *\n * This function returns the timezone offset in milliseconds that takes seconds in account.\n */\nmodule.exports = function getTimezoneOffsetInMilliseconds (dirtyDate) {\n  var date = new Date(dirtyDate.getTime())\n  var baseTimezoneOffset = date.getTimezoneOffset()\n  date.setSeconds(0, 0)\n  var millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE\n\n  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset\n}\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/add_days/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/add_days/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Add the specified number of days to the given date.\n *\n * @description\n * Add the specified number of days to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of days to be added\n * @returns {Date} the new date with the days added\n *\n * @example\n * // Add 10 days to 1 September 2014:\n * var result = addDays(new Date(2014, 8, 1), 10)\n * //=> Thu Sep 11 2014 00:00:00\n */\nfunction addDays (dirtyDate, dirtyAmount) {\n  var date = parse(dirtyDate)\n  var amount = Number(dirtyAmount)\n  date.setDate(date.getDate() + amount)\n  return date\n}\n\nmodule.exports = addDays\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/add_days/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/add_hours/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/add_hours/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addMilliseconds = __webpack_require__(/*! ../add_milliseconds/index.js */ \"./node_modules/date-fns/add_milliseconds/index.js\")\n\nvar MILLISECONDS_IN_HOUR = 3600000\n\n/**\n * @category Hour Helpers\n * @summary Add the specified number of hours to the given date.\n *\n * @description\n * Add the specified number of hours to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of hours to be added\n * @returns {Date} the new date with the hours added\n *\n * @example\n * // Add 2 hours to 10 July 2014 23:00:00:\n * var result = addHours(new Date(2014, 6, 10, 23, 0), 2)\n * //=> Fri Jul 11 2014 01:00:00\n */\nfunction addHours (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_HOUR)\n}\n\nmodule.exports = addHours\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/add_hours/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/add_iso_years/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/add_iso_years/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ \"./node_modules/date-fns/get_iso_year/index.js\")\nvar setISOYear = __webpack_require__(/*! ../set_iso_year/index.js */ \"./node_modules/date-fns/set_iso_year/index.js\")\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Add the specified number of ISO week-numbering years to the given date.\n *\n * @description\n * Add the specified number of ISO week-numbering years to the given date.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of ISO week-numbering years to be added\n * @returns {Date} the new date with the ISO week-numbering years added\n *\n * @example\n * // Add 5 ISO week-numbering years to 2 July 2010:\n * var result = addISOYears(new Date(2010, 6, 2), 5)\n * //=> Fri Jun 26 2015 00:00:00\n */\nfunction addISOYears (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return setISOYear(dirtyDate, getISOYear(dirtyDate) + amount)\n}\n\nmodule.exports = addISOYears\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/add_iso_years/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/add_milliseconds/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/add_milliseconds/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Millisecond Helpers\n * @summary Add the specified number of milliseconds to the given date.\n *\n * @description\n * Add the specified number of milliseconds to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of milliseconds to be added\n * @returns {Date} the new date with the milliseconds added\n *\n * @example\n * // Add 750 milliseconds to 10 July 2014 12:45:30.000:\n * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)\n * //=> Thu Jul 10 2014 12:45:30.750\n */\nfunction addMilliseconds (dirtyDate, dirtyAmount) {\n  var timestamp = parse(dirtyDate).getTime()\n  var amount = Number(dirtyAmount)\n  return new Date(timestamp + amount)\n}\n\nmodule.exports = addMilliseconds\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/add_milliseconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/add_minutes/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/add_minutes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addMilliseconds = __webpack_require__(/*! ../add_milliseconds/index.js */ \"./node_modules/date-fns/add_milliseconds/index.js\")\n\nvar MILLISECONDS_IN_MINUTE = 60000\n\n/**\n * @category Minute Helpers\n * @summary Add the specified number of minutes to the given date.\n *\n * @description\n * Add the specified number of minutes to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of minutes to be added\n * @returns {Date} the new date with the minutes added\n *\n * @example\n * // Add 30 minutes to 10 July 2014 12:00:00:\n * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)\n * //=> Thu Jul 10 2014 12:30:00\n */\nfunction addMinutes (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE)\n}\n\nmodule.exports = addMinutes\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/add_minutes/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/add_months/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/add_months/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar getDaysInMonth = __webpack_require__(/*! ../get_days_in_month/index.js */ \"./node_modules/date-fns/get_days_in_month/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Add the specified number of months to the given date.\n *\n * @description\n * Add the specified number of months to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of months to be added\n * @returns {Date} the new date with the months added\n *\n * @example\n * // Add 5 months to 1 September 2014:\n * var result = addMonths(new Date(2014, 8, 1), 5)\n * //=> Sun Feb 01 2015 00:00:00\n */\nfunction addMonths (dirtyDate, dirtyAmount) {\n  var date = parse(dirtyDate)\n  var amount = Number(dirtyAmount)\n  var desiredMonth = date.getMonth() + amount\n  var dateWithDesiredMonth = new Date(0)\n  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1)\n  dateWithDesiredMonth.setHours(0, 0, 0, 0)\n  var daysInMonth = getDaysInMonth(dateWithDesiredMonth)\n  // Set the last day of the new month\n  // if the original date was the last day of the longer month\n  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()))\n  return date\n}\n\nmodule.exports = addMonths\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/add_months/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/add_quarters/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/add_quarters/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addMonths = __webpack_require__(/*! ../add_months/index.js */ \"./node_modules/date-fns/add_months/index.js\")\n\n/**\n * @category Quarter Helpers\n * @summary Add the specified number of year quarters to the given date.\n *\n * @description\n * Add the specified number of year quarters to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of quarters to be added\n * @returns {Date} the new date with the quarters added\n *\n * @example\n * // Add 1 quarter to 1 September 2014:\n * var result = addQuarters(new Date(2014, 8, 1), 1)\n * //=> Mon Dec 01 2014 00:00:00\n */\nfunction addQuarters (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  var months = amount * 3\n  return addMonths(dirtyDate, months)\n}\n\nmodule.exports = addQuarters\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/add_quarters/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/add_seconds/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/add_seconds/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addMilliseconds = __webpack_require__(/*! ../add_milliseconds/index.js */ \"./node_modules/date-fns/add_milliseconds/index.js\")\n\n/**\n * @category Second Helpers\n * @summary Add the specified number of seconds to the given date.\n *\n * @description\n * Add the specified number of seconds to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of seconds to be added\n * @returns {Date} the new date with the seconds added\n *\n * @example\n * // Add 30 seconds to 10 July 2014 12:45:00:\n * var result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)\n * //=> Thu Jul 10 2014 12:45:30\n */\nfunction addSeconds (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addMilliseconds(dirtyDate, amount * 1000)\n}\n\nmodule.exports = addSeconds\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/add_seconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/add_weeks/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/add_weeks/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addDays = __webpack_require__(/*! ../add_days/index.js */ \"./node_modules/date-fns/add_days/index.js\")\n\n/**\n * @category Week Helpers\n * @summary Add the specified number of weeks to the given date.\n *\n * @description\n * Add the specified number of week to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of weeks to be added\n * @returns {Date} the new date with the weeks added\n *\n * @example\n * // Add 4 weeks to 1 September 2014:\n * var result = addWeeks(new Date(2014, 8, 1), 4)\n * //=> Mon Sep 29 2014 00:00:00\n */\nfunction addWeeks (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  var days = amount * 7\n  return addDays(dirtyDate, days)\n}\n\nmodule.exports = addWeeks\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/add_weeks/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/add_years/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/add_years/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addMonths = __webpack_require__(/*! ../add_months/index.js */ \"./node_modules/date-fns/add_months/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Add the specified number of years to the given date.\n *\n * @description\n * Add the specified number of years to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of years to be added\n * @returns {Date} the new date with the years added\n *\n * @example\n * // Add 5 years to 1 September 2014:\n * var result = addYears(new Date(2014, 8, 1), 5)\n * //=> Sun Sep 01 2019 00:00:00\n */\nfunction addYears (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addMonths(dirtyDate, amount * 12)\n}\n\nmodule.exports = addYears\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/add_years/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/are_ranges_overlapping/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/are_ranges_overlapping/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Range Helpers\n * @summary Is the given date range overlapping with another date range?\n *\n * @description\n * Is the given date range overlapping with another date range?\n *\n * @param {Date|String|Number} initialRangeStartDate - the start of the initial range\n * @param {Date|String|Number} initialRangeEndDate - the end of the initial range\n * @param {Date|String|Number} comparedRangeStartDate - the start of the range to compare it with\n * @param {Date|String|Number} comparedRangeEndDate - the end of the range to compare it with\n * @returns {Boolean} whether the date ranges are overlapping\n * @throws {Error} startDate of a date range cannot be after its endDate\n *\n * @example\n * // For overlapping date ranges:\n * areRangesOverlapping(\n *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 17), new Date(2014, 0, 21)\n * )\n * //=> true\n *\n * @example\n * // For non-overlapping date ranges:\n * areRangesOverlapping(\n *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 21), new Date(2014, 0, 22)\n * )\n * //=> false\n */\nfunction areRangesOverlapping (dirtyInitialRangeStartDate, dirtyInitialRangeEndDate, dirtyComparedRangeStartDate, dirtyComparedRangeEndDate) {\n  var initialStartTime = parse(dirtyInitialRangeStartDate).getTime()\n  var initialEndTime = parse(dirtyInitialRangeEndDate).getTime()\n  var comparedStartTime = parse(dirtyComparedRangeStartDate).getTime()\n  var comparedEndTime = parse(dirtyComparedRangeEndDate).getTime()\n\n  if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {\n    throw new Error('The start of the range cannot be after the end of the range')\n  }\n\n  return initialStartTime < comparedEndTime && comparedStartTime < initialEndTime\n}\n\nmodule.exports = areRangesOverlapping\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/are_ranges_overlapping/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/closest_index_to/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/closest_index_to/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Return an index of the closest date from the array comparing to the given date.\n *\n * @description\n * Return an index of the closest date from the array comparing to the given date.\n *\n * @param {Date|String|Number} dateToCompare - the date to compare with\n * @param {Date[]|String[]|Number[]} datesArray - the array to search\n * @returns {Number} an index of the date closest to the given date\n * @throws {TypeError} the second argument must be an instance of Array\n *\n * @example\n * // Which date is closer to 6 September 2015?\n * var dateToCompare = new Date(2015, 8, 6)\n * var datesArray = [\n *   new Date(2015, 0, 1),\n *   new Date(2016, 0, 1),\n *   new Date(2017, 0, 1)\n * ]\n * var result = closestIndexTo(dateToCompare, datesArray)\n * //=> 1\n */\nfunction closestIndexTo (dirtyDateToCompare, dirtyDatesArray) {\n  if (!(dirtyDatesArray instanceof Array)) {\n    throw new TypeError(toString.call(dirtyDatesArray) + ' is not an instance of Array')\n  }\n\n  var dateToCompare = parse(dirtyDateToCompare)\n  var timeToCompare = dateToCompare.getTime()\n\n  var result\n  var minDistance\n\n  dirtyDatesArray.forEach(function (dirtyDate, index) {\n    var currentDate = parse(dirtyDate)\n    var distance = Math.abs(timeToCompare - currentDate.getTime())\n    if (result === undefined || distance < minDistance) {\n      result = index\n      minDistance = distance\n    }\n  })\n\n  return result\n}\n\nmodule.exports = closestIndexTo\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/closest_index_to/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/closest_to/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/closest_to/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Return a date from the array closest to the given date.\n *\n * @description\n * Return a date from the array closest to the given date.\n *\n * @param {Date|String|Number} dateToCompare - the date to compare with\n * @param {Date[]|String[]|Number[]} datesArray - the array to search\n * @returns {Date} the date from the array closest to the given date\n * @throws {TypeError} the second argument must be an instance of Array\n *\n * @example\n * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?\n * var dateToCompare = new Date(2015, 8, 6)\n * var result = closestTo(dateToCompare, [\n *   new Date(2000, 0, 1),\n *   new Date(2030, 0, 1)\n * ])\n * //=> Tue Jan 01 2030 00:00:00\n */\nfunction closestTo (dirtyDateToCompare, dirtyDatesArray) {\n  if (!(dirtyDatesArray instanceof Array)) {\n    throw new TypeError(toString.call(dirtyDatesArray) + ' is not an instance of Array')\n  }\n\n  var dateToCompare = parse(dirtyDateToCompare)\n  var timeToCompare = dateToCompare.getTime()\n\n  var result\n  var minDistance\n\n  dirtyDatesArray.forEach(function (dirtyDate) {\n    var currentDate = parse(dirtyDate)\n    var distance = Math.abs(timeToCompare - currentDate.getTime())\n    if (result === undefined || distance < minDistance) {\n      result = currentDate\n      minDistance = distance\n    }\n  })\n\n  return result\n}\n\nmodule.exports = closestTo\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/closest_to/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/compare_asc/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/compare_asc/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Compare the two dates and return -1, 0 or 1.\n *\n * @description\n * Compare the two dates and return 1 if the first date is after the second,\n * -1 if the first date is before the second or 0 if dates are equal.\n *\n * @param {Date|String|Number} dateLeft - the first date to compare\n * @param {Date|String|Number} dateRight - the second date to compare\n * @returns {Number} the result of the comparison\n *\n * @example\n * // Compare 11 February 1987 and 10 July 1989:\n * var result = compareAsc(\n *   new Date(1987, 1, 11),\n *   new Date(1989, 6, 10)\n * )\n * //=> -1\n *\n * @example\n * // Sort the array of dates:\n * var result = [\n *   new Date(1995, 6, 2),\n *   new Date(1987, 1, 11),\n *   new Date(1989, 6, 10)\n * ].sort(compareAsc)\n * //=> [\n * //   Wed Feb 11 1987 00:00:00,\n * //   Mon Jul 10 1989 00:00:00,\n * //   Sun Jul 02 1995 00:00:00\n * // ]\n */\nfunction compareAsc (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var timeLeft = dateLeft.getTime()\n  var dateRight = parse(dirtyDateRight)\n  var timeRight = dateRight.getTime()\n\n  if (timeLeft < timeRight) {\n    return -1\n  } else if (timeLeft > timeRight) {\n    return 1\n  } else {\n    return 0\n  }\n}\n\nmodule.exports = compareAsc\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/compare_asc/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/compare_desc/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/compare_desc/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.\n *\n * @description\n * Compare the two dates and return -1 if the first date is after the second,\n * 1 if the first date is before the second or 0 if dates are equal.\n *\n * @param {Date|String|Number} dateLeft - the first date to compare\n * @param {Date|String|Number} dateRight - the second date to compare\n * @returns {Number} the result of the comparison\n *\n * @example\n * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:\n * var result = compareDesc(\n *   new Date(1987, 1, 11),\n *   new Date(1989, 6, 10)\n * )\n * //=> 1\n *\n * @example\n * // Sort the array of dates in reverse chronological order:\n * var result = [\n *   new Date(1995, 6, 2),\n *   new Date(1987, 1, 11),\n *   new Date(1989, 6, 10)\n * ].sort(compareDesc)\n * //=> [\n * //   Sun Jul 02 1995 00:00:00,\n * //   Mon Jul 10 1989 00:00:00,\n * //   Wed Feb 11 1987 00:00:00\n * // ]\n */\nfunction compareDesc (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var timeLeft = dateLeft.getTime()\n  var dateRight = parse(dirtyDateRight)\n  var timeRight = dateRight.getTime()\n\n  if (timeLeft > timeRight) {\n    return -1\n  } else if (timeLeft < timeRight) {\n    return 1\n  } else {\n    return 0\n  }\n}\n\nmodule.exports = compareDesc\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/compare_desc/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_days/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_days/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ \"./node_modules/date-fns/start_of_day/index.js\")\n\nvar MILLISECONDS_IN_MINUTE = 60000\nvar MILLISECONDS_IN_DAY = 86400000\n\n/**\n * @category Day Helpers\n * @summary Get the number of calendar days between the given dates.\n *\n * @description\n * Get the number of calendar days between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of calendar days\n *\n * @example\n * // How many calendar days are between\n * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?\n * var result = differenceInCalendarDays(\n *   new Date(2012, 6, 2, 0, 0),\n *   new Date(2011, 6, 2, 23, 0)\n * )\n * //=> 366\n */\nfunction differenceInCalendarDays (dirtyDateLeft, dirtyDateRight) {\n  var startOfDayLeft = startOfDay(dirtyDateLeft)\n  var startOfDayRight = startOfDay(dirtyDateRight)\n\n  var timestampLeft = startOfDayLeft.getTime() -\n    startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE\n  var timestampRight = startOfDayRight.getTime() -\n    startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE\n\n  // Round the number of days to the nearest integer\n  // because the number of milliseconds in a day is not constant\n  // (e.g. it's different in the day of the daylight saving time clock shift)\n  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)\n}\n\nmodule.exports = differenceInCalendarDays\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_calendar_days/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_iso_weeks/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_iso_weeks/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ \"./node_modules/date-fns/start_of_iso_week/index.js\")\n\nvar MILLISECONDS_IN_MINUTE = 60000\nvar MILLISECONDS_IN_WEEK = 604800000\n\n/**\n * @category ISO Week Helpers\n * @summary Get the number of calendar ISO weeks between the given dates.\n *\n * @description\n * Get the number of calendar ISO weeks between the given dates.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of calendar ISO weeks\n *\n * @example\n * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?\n * var result = differenceInCalendarISOWeeks(\n *   new Date(2014, 6, 21),\n *   new Date(2014, 6, 6)\n * )\n * //=> 3\n */\nfunction differenceInCalendarISOWeeks (dirtyDateLeft, dirtyDateRight) {\n  var startOfISOWeekLeft = startOfISOWeek(dirtyDateLeft)\n  var startOfISOWeekRight = startOfISOWeek(dirtyDateRight)\n\n  var timestampLeft = startOfISOWeekLeft.getTime() -\n    startOfISOWeekLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE\n  var timestampRight = startOfISOWeekRight.getTime() -\n    startOfISOWeekRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE\n\n  // Round the number of days to the nearest integer\n  // because the number of milliseconds in a week is not constant\n  // (e.g. it's different in the week of the daylight saving time clock shift)\n  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK)\n}\n\nmodule.exports = differenceInCalendarISOWeeks\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_calendar_iso_weeks/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_iso_years/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_iso_years/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ \"./node_modules/date-fns/get_iso_year/index.js\")\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Get the number of calendar ISO week-numbering years between the given dates.\n *\n * @description\n * Get the number of calendar ISO week-numbering years between the given dates.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of calendar ISO week-numbering years\n *\n * @example\n * // How many calendar ISO week-numbering years are 1 January 2010 and 1 January 2012?\n * var result = differenceInCalendarISOYears(\n *   new Date(2012, 0, 1),\n *   new Date(2010, 0, 1)\n * )\n * //=> 2\n */\nfunction differenceInCalendarISOYears (dirtyDateLeft, dirtyDateRight) {\n  return getISOYear(dirtyDateLeft) - getISOYear(dirtyDateRight)\n}\n\nmodule.exports = differenceInCalendarISOYears\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_calendar_iso_years/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_months/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_months/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Get the number of calendar months between the given dates.\n *\n * @description\n * Get the number of calendar months between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of calendar months\n *\n * @example\n * // How many calendar months are between 31 January 2014 and 1 September 2014?\n * var result = differenceInCalendarMonths(\n *   new Date(2014, 8, 1),\n *   new Date(2014, 0, 31)\n * )\n * //=> 8\n */\nfunction differenceInCalendarMonths (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var dateRight = parse(dirtyDateRight)\n\n  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear()\n  var monthDiff = dateLeft.getMonth() - dateRight.getMonth()\n\n  return yearDiff * 12 + monthDiff\n}\n\nmodule.exports = differenceInCalendarMonths\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_calendar_months/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_quarters/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_quarters/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getQuarter = __webpack_require__(/*! ../get_quarter/index.js */ \"./node_modules/date-fns/get_quarter/index.js\")\nvar parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Quarter Helpers\n * @summary Get the number of calendar quarters between the given dates.\n *\n * @description\n * Get the number of calendar quarters between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of calendar quarters\n *\n * @example\n * // How many calendar quarters are between 31 December 2013 and 2 July 2014?\n * var result = differenceInCalendarQuarters(\n *   new Date(2014, 6, 2),\n *   new Date(2013, 11, 31)\n * )\n * //=> 3\n */\nfunction differenceInCalendarQuarters (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var dateRight = parse(dirtyDateRight)\n\n  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear()\n  var quarterDiff = getQuarter(dateLeft) - getQuarter(dateRight)\n\n  return yearDiff * 4 + quarterDiff\n}\n\nmodule.exports = differenceInCalendarQuarters\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_calendar_quarters/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_weeks/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_weeks/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfWeek = __webpack_require__(/*! ../start_of_week/index.js */ \"./node_modules/date-fns/start_of_week/index.js\")\n\nvar MILLISECONDS_IN_MINUTE = 60000\nvar MILLISECONDS_IN_WEEK = 604800000\n\n/**\n * @category Week Helpers\n * @summary Get the number of calendar weeks between the given dates.\n *\n * @description\n * Get the number of calendar weeks between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @param {Object} [options] - the object with options\n * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)\n * @returns {Number} the number of calendar weeks\n *\n * @example\n * // How many calendar weeks are between 5 July 2014 and 20 July 2014?\n * var result = differenceInCalendarWeeks(\n *   new Date(2014, 6, 20),\n *   new Date(2014, 6, 5)\n * )\n * //=> 3\n *\n * @example\n * // If the week starts on Monday,\n * // how many calendar weeks are between 5 July 2014 and 20 July 2014?\n * var result = differenceInCalendarWeeks(\n *   new Date(2014, 6, 20),\n *   new Date(2014, 6, 5),\n *   {weekStartsOn: 1}\n * )\n * //=> 2\n */\nfunction differenceInCalendarWeeks (dirtyDateLeft, dirtyDateRight, dirtyOptions) {\n  var startOfWeekLeft = startOfWeek(dirtyDateLeft, dirtyOptions)\n  var startOfWeekRight = startOfWeek(dirtyDateRight, dirtyOptions)\n\n  var timestampLeft = startOfWeekLeft.getTime() -\n    startOfWeekLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE\n  var timestampRight = startOfWeekRight.getTime() -\n    startOfWeekRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE\n\n  // Round the number of days to the nearest integer\n  // because the number of milliseconds in a week is not constant\n  // (e.g. it's different in the week of the daylight saving time clock shift)\n  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK)\n}\n\nmodule.exports = differenceInCalendarWeeks\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_calendar_weeks/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_years/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_years/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Get the number of calendar years between the given dates.\n *\n * @description\n * Get the number of calendar years between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of calendar years\n *\n * @example\n * // How many calendar years are between 31 December 2013 and 11 February 2015?\n * var result = differenceInCalendarYears(\n *   new Date(2015, 1, 11),\n *   new Date(2013, 11, 31)\n * )\n * //=> 2\n */\nfunction differenceInCalendarYears (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var dateRight = parse(dirtyDateRight)\n\n  return dateLeft.getFullYear() - dateRight.getFullYear()\n}\n\nmodule.exports = differenceInCalendarYears\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_calendar_years/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_days/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/difference_in_days/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar differenceInCalendarDays = __webpack_require__(/*! ../difference_in_calendar_days/index.js */ \"./node_modules/date-fns/difference_in_calendar_days/index.js\")\nvar compareAsc = __webpack_require__(/*! ../compare_asc/index.js */ \"./node_modules/date-fns/compare_asc/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Get the number of full days between the given dates.\n *\n * @description\n * Get the number of full days between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of full days\n *\n * @example\n * // How many full days are between\n * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?\n * var result = differenceInDays(\n *   new Date(2012, 6, 2, 0, 0),\n *   new Date(2011, 6, 2, 23, 0)\n * )\n * //=> 365\n */\nfunction differenceInDays (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var dateRight = parse(dirtyDateRight)\n\n  var sign = compareAsc(dateLeft, dateRight)\n  var difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight))\n  dateLeft.setDate(dateLeft.getDate() - sign * difference)\n\n  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full\n  // If so, result must be decreased by 1 in absolute value\n  var isLastDayNotFull = compareAsc(dateLeft, dateRight) === -sign\n  return sign * (difference - isLastDayNotFull)\n}\n\nmodule.exports = differenceInDays\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_days/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_hours/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_hours/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var differenceInMilliseconds = __webpack_require__(/*! ../difference_in_milliseconds/index.js */ \"./node_modules/date-fns/difference_in_milliseconds/index.js\")\n\nvar MILLISECONDS_IN_HOUR = 3600000\n\n/**\n * @category Hour Helpers\n * @summary Get the number of hours between the given dates.\n *\n * @description\n * Get the number of hours between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of hours\n *\n * @example\n * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?\n * var result = differenceInHours(\n *   new Date(2014, 6, 2, 19, 0),\n *   new Date(2014, 6, 2, 6, 50)\n * )\n * //=> 12\n */\nfunction differenceInHours (dirtyDateLeft, dirtyDateRight) {\n  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_HOUR\n  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)\n}\n\nmodule.exports = differenceInHours\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_hours/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_iso_years/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_iso_years/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar differenceInCalendarISOYears = __webpack_require__(/*! ../difference_in_calendar_iso_years/index.js */ \"./node_modules/date-fns/difference_in_calendar_iso_years/index.js\")\nvar compareAsc = __webpack_require__(/*! ../compare_asc/index.js */ \"./node_modules/date-fns/compare_asc/index.js\")\nvar subISOYears = __webpack_require__(/*! ../sub_iso_years/index.js */ \"./node_modules/date-fns/sub_iso_years/index.js\")\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Get the number of full ISO week-numbering years between the given dates.\n *\n * @description\n * Get the number of full ISO week-numbering years between the given dates.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of full ISO week-numbering years\n *\n * @example\n * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?\n * var result = differenceInISOYears(\n *   new Date(2012, 0, 1),\n *   new Date(2010, 0, 1)\n * )\n * //=> 1\n */\nfunction differenceInISOYears (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var dateRight = parse(dirtyDateRight)\n\n  var sign = compareAsc(dateLeft, dateRight)\n  var difference = Math.abs(differenceInCalendarISOYears(dateLeft, dateRight))\n  dateLeft = subISOYears(dateLeft, sign * difference)\n\n  // Math.abs(diff in full ISO years - diff in calendar ISO years) === 1\n  // if last calendar ISO year is not full\n  // If so, result must be decreased by 1 in absolute value\n  var isLastISOYearNotFull = compareAsc(dateLeft, dateRight) === -sign\n  return sign * (difference - isLastISOYearNotFull)\n}\n\nmodule.exports = differenceInISOYears\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_iso_years/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_milliseconds/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_milliseconds/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Millisecond Helpers\n * @summary Get the number of milliseconds between the given dates.\n *\n * @description\n * Get the number of milliseconds between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of milliseconds\n *\n * @example\n * // How many milliseconds are between\n * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?\n * var result = differenceInMilliseconds(\n *   new Date(2014, 6, 2, 12, 30, 21, 700),\n *   new Date(2014, 6, 2, 12, 30, 20, 600)\n * )\n * //=> 1100\n */\nfunction differenceInMilliseconds (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var dateRight = parse(dirtyDateRight)\n  return dateLeft.getTime() - dateRight.getTime()\n}\n\nmodule.exports = differenceInMilliseconds\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_milliseconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_minutes/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_minutes/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var differenceInMilliseconds = __webpack_require__(/*! ../difference_in_milliseconds/index.js */ \"./node_modules/date-fns/difference_in_milliseconds/index.js\")\n\nvar MILLISECONDS_IN_MINUTE = 60000\n\n/**\n * @category Minute Helpers\n * @summary Get the number of minutes between the given dates.\n *\n * @description\n * Get the number of minutes between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of minutes\n *\n * @example\n * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?\n * var result = differenceInMinutes(\n *   new Date(2014, 6, 2, 12, 20, 0),\n *   new Date(2014, 6, 2, 12, 7, 59)\n * )\n * //=> 12\n */\nfunction differenceInMinutes (dirtyDateLeft, dirtyDateRight) {\n  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_MINUTE\n  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)\n}\n\nmodule.exports = differenceInMinutes\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_minutes/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_months/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_months/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar differenceInCalendarMonths = __webpack_require__(/*! ../difference_in_calendar_months/index.js */ \"./node_modules/date-fns/difference_in_calendar_months/index.js\")\nvar compareAsc = __webpack_require__(/*! ../compare_asc/index.js */ \"./node_modules/date-fns/compare_asc/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Get the number of full months between the given dates.\n *\n * @description\n * Get the number of full months between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of full months\n *\n * @example\n * // How many full months are between 31 January 2014 and 1 September 2014?\n * var result = differenceInMonths(\n *   new Date(2014, 8, 1),\n *   new Date(2014, 0, 31)\n * )\n * //=> 7\n */\nfunction differenceInMonths (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var dateRight = parse(dirtyDateRight)\n\n  var sign = compareAsc(dateLeft, dateRight)\n  var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight))\n  dateLeft.setMonth(dateLeft.getMonth() - sign * difference)\n\n  // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full\n  // If so, result must be decreased by 1 in absolute value\n  var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign\n  return sign * (difference - isLastMonthNotFull)\n}\n\nmodule.exports = differenceInMonths\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_months/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_quarters/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_quarters/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var differenceInMonths = __webpack_require__(/*! ../difference_in_months/index.js */ \"./node_modules/date-fns/difference_in_months/index.js\")\n\n/**\n * @category Quarter Helpers\n * @summary Get the number of full quarters between the given dates.\n *\n * @description\n * Get the number of full quarters between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of full quarters\n *\n * @example\n * // How many full quarters are between 31 December 2013 and 2 July 2014?\n * var result = differenceInQuarters(\n *   new Date(2014, 6, 2),\n *   new Date(2013, 11, 31)\n * )\n * //=> 2\n */\nfunction differenceInQuarters (dirtyDateLeft, dirtyDateRight) {\n  var diff = differenceInMonths(dirtyDateLeft, dirtyDateRight) / 3\n  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)\n}\n\nmodule.exports = differenceInQuarters\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_quarters/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_seconds/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_seconds/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var differenceInMilliseconds = __webpack_require__(/*! ../difference_in_milliseconds/index.js */ \"./node_modules/date-fns/difference_in_milliseconds/index.js\")\n\n/**\n * @category Second Helpers\n * @summary Get the number of seconds between the given dates.\n *\n * @description\n * Get the number of seconds between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of seconds\n *\n * @example\n * // How many seconds are between\n * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?\n * var result = differenceInSeconds(\n *   new Date(2014, 6, 2, 12, 30, 20, 0),\n *   new Date(2014, 6, 2, 12, 30, 7, 999)\n * )\n * //=> 12\n */\nfunction differenceInSeconds (dirtyDateLeft, dirtyDateRight) {\n  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / 1000\n  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)\n}\n\nmodule.exports = differenceInSeconds\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_seconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_weeks/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_weeks/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var differenceInDays = __webpack_require__(/*! ../difference_in_days/index.js */ \"./node_modules/date-fns/difference_in_days/index.js\")\n\n/**\n * @category Week Helpers\n * @summary Get the number of full weeks between the given dates.\n *\n * @description\n * Get the number of full weeks between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of full weeks\n *\n * @example\n * // How many full weeks are between 5 July 2014 and 20 July 2014?\n * var result = differenceInWeeks(\n *   new Date(2014, 6, 20),\n *   new Date(2014, 6, 5)\n * )\n * //=> 2\n */\nfunction differenceInWeeks (dirtyDateLeft, dirtyDateRight) {\n  var diff = differenceInDays(dirtyDateLeft, dirtyDateRight) / 7\n  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)\n}\n\nmodule.exports = differenceInWeeks\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_weeks/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/difference_in_years/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_years/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar differenceInCalendarYears = __webpack_require__(/*! ../difference_in_calendar_years/index.js */ \"./node_modules/date-fns/difference_in_calendar_years/index.js\")\nvar compareAsc = __webpack_require__(/*! ../compare_asc/index.js */ \"./node_modules/date-fns/compare_asc/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Get the number of full years between the given dates.\n *\n * @description\n * Get the number of full years between the given dates.\n *\n * @param {Date|String|Number} dateLeft - the later date\n * @param {Date|String|Number} dateRight - the earlier date\n * @returns {Number} the number of full years\n *\n * @example\n * // How many full years are between 31 December 2013 and 11 February 2015?\n * var result = differenceInYears(\n *   new Date(2015, 1, 11),\n *   new Date(2013, 11, 31)\n * )\n * //=> 1\n */\nfunction differenceInYears (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var dateRight = parse(dirtyDateRight)\n\n  var sign = compareAsc(dateLeft, dateRight)\n  var difference = Math.abs(differenceInCalendarYears(dateLeft, dateRight))\n  dateLeft.setFullYear(dateLeft.getFullYear() - sign * difference)\n\n  // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full\n  // If so, result must be decreased by 1 in absolute value\n  var isLastYearNotFull = compareAsc(dateLeft, dateRight) === -sign\n  return sign * (difference - isLastYearNotFull)\n}\n\nmodule.exports = differenceInYears\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/difference_in_years/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/distance_in_words/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/distance_in_words/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var compareDesc = __webpack_require__(/*! ../compare_desc/index.js */ \"./node_modules/date-fns/compare_desc/index.js\")\nvar parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar differenceInSeconds = __webpack_require__(/*! ../difference_in_seconds/index.js */ \"./node_modules/date-fns/difference_in_seconds/index.js\")\nvar differenceInMonths = __webpack_require__(/*! ../difference_in_months/index.js */ \"./node_modules/date-fns/difference_in_months/index.js\")\nvar enLocale = __webpack_require__(/*! ../locale/en/index.js */ \"./node_modules/date-fns/locale/en/index.js\")\n\nvar MINUTES_IN_DAY = 1440\nvar MINUTES_IN_ALMOST_TWO_DAYS = 2520\nvar MINUTES_IN_MONTH = 43200\nvar MINUTES_IN_TWO_MONTHS = 86400\n\n/**\n * @category Common Helpers\n * @summary Return the distance between the given dates in words.\n *\n * @description\n * Return the distance between the given dates in words.\n *\n * | Distance between dates                                            | Result              |\n * |-------------------------------------------------------------------|---------------------|\n * | 0 ... 30 secs                                                     | less than a minute  |\n * | 30 secs ... 1 min 30 secs                                         | 1 minute            |\n * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |\n * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |\n * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |\n * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |\n * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |\n * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |\n * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |\n * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |\n * | 1 yr ... 1 yr 3 months                                            | about 1 year        |\n * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |\n * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |\n * | N yrs ... N yrs 3 months                                          | about N years       |\n * | N yrs 3 months ... N yrs 9 months                                 | over N years        |\n * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |\n *\n * With `options.includeSeconds == true`:\n * | Distance between dates | Result               |\n * |------------------------|----------------------|\n * | 0 secs ... 5 secs      | less than 5 seconds  |\n * | 5 secs ... 10 secs     | less than 10 seconds |\n * | 10 secs ... 20 secs    | less than 20 seconds |\n * | 20 secs ... 40 secs    | half a minute        |\n * | 40 secs ... 60 secs    | less than a minute   |\n * | 60 secs ... 90 secs    | 1 minute             |\n *\n * @param {Date|String|Number} dateToCompare - the date to compare with\n * @param {Date|String|Number} date - the other date\n * @param {Object} [options] - the object with options\n * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed\n * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first\n * @param {Object} [options.locale=enLocale] - the locale object\n * @returns {String} the distance in words\n *\n * @example\n * // What is the distance between 2 July 2014 and 1 January 2015?\n * var result = distanceInWords(\n *   new Date(2014, 6, 2),\n *   new Date(2015, 0, 1)\n * )\n * //=> '6 months'\n *\n * @example\n * // What is the distance between 1 January 2015 00:00:15\n * // and 1 January 2015 00:00:00, including seconds?\n * var result = distanceInWords(\n *   new Date(2015, 0, 1, 0, 0, 15),\n *   new Date(2015, 0, 1, 0, 0, 0),\n *   {includeSeconds: true}\n * )\n * //=> 'less than 20 seconds'\n *\n * @example\n * // What is the distance from 1 January 2016\n * // to 1 January 2015, with a suffix?\n * var result = distanceInWords(\n *   new Date(2016, 0, 1),\n *   new Date(2015, 0, 1),\n *   {addSuffix: true}\n * )\n * //=> 'about 1 year ago'\n *\n * @example\n * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?\n * var eoLocale = require('date-fns/locale/eo')\n * var result = distanceInWords(\n *   new Date(2016, 7, 1),\n *   new Date(2015, 0, 1),\n *   {locale: eoLocale}\n * )\n * //=> 'pli ol 1 jaro'\n */\nfunction distanceInWords (dirtyDateToCompare, dirtyDate, dirtyOptions) {\n  var options = dirtyOptions || {}\n\n  var comparison = compareDesc(dirtyDateToCompare, dirtyDate)\n\n  var locale = options.locale\n  var localize = enLocale.distanceInWords.localize\n  if (locale && locale.distanceInWords && locale.distanceInWords.localize) {\n    localize = locale.distanceInWords.localize\n  }\n\n  var localizeOptions = {\n    addSuffix: Boolean(options.addSuffix),\n    comparison: comparison\n  }\n\n  var dateLeft, dateRight\n  if (comparison > 0) {\n    dateLeft = parse(dirtyDateToCompare)\n    dateRight = parse(dirtyDate)\n  } else {\n    dateLeft = parse(dirtyDate)\n    dateRight = parse(dirtyDateToCompare)\n  }\n\n  var seconds = differenceInSeconds(dateRight, dateLeft)\n  var offset = dateRight.getTimezoneOffset() - dateLeft.getTimezoneOffset()\n  var minutes = Math.round(seconds / 60) - offset\n  var months\n\n  // 0 up to 2 mins\n  if (minutes < 2) {\n    if (options.includeSeconds) {\n      if (seconds < 5) {\n        return localize('lessThanXSeconds', 5, localizeOptions)\n      } else if (seconds < 10) {\n        return localize('lessThanXSeconds', 10, localizeOptions)\n      } else if (seconds < 20) {\n        return localize('lessThanXSeconds', 20, localizeOptions)\n      } else if (seconds < 40) {\n        return localize('halfAMinute', null, localizeOptions)\n      } else if (seconds < 60) {\n        return localize('lessThanXMinutes', 1, localizeOptions)\n      } else {\n        return localize('xMinutes', 1, localizeOptions)\n      }\n    } else {\n      if (minutes === 0) {\n        return localize('lessThanXMinutes', 1, localizeOptions)\n      } else {\n        return localize('xMinutes', minutes, localizeOptions)\n      }\n    }\n\n  // 2 mins up to 0.75 hrs\n  } else if (minutes < 45) {\n    return localize('xMinutes', minutes, localizeOptions)\n\n  // 0.75 hrs up to 1.5 hrs\n  } else if (minutes < 90) {\n    return localize('aboutXHours', 1, localizeOptions)\n\n  // 1.5 hrs up to 24 hrs\n  } else if (minutes < MINUTES_IN_DAY) {\n    var hours = Math.round(minutes / 60)\n    return localize('aboutXHours', hours, localizeOptions)\n\n  // 1 day up to 1.75 days\n  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {\n    return localize('xDays', 1, localizeOptions)\n\n  // 1.75 days up to 30 days\n  } else if (minutes < MINUTES_IN_MONTH) {\n    var days = Math.round(minutes / MINUTES_IN_DAY)\n    return localize('xDays', days, localizeOptions)\n\n  // 1 month up to 2 months\n  } else if (minutes < MINUTES_IN_TWO_MONTHS) {\n    months = Math.round(minutes / MINUTES_IN_MONTH)\n    return localize('aboutXMonths', months, localizeOptions)\n  }\n\n  months = differenceInMonths(dateRight, dateLeft)\n\n  // 2 months up to 12 months\n  if (months < 12) {\n    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH)\n    return localize('xMonths', nearestMonth, localizeOptions)\n\n  // 1 year up to max Date\n  } else {\n    var monthsSinceStartOfYear = months % 12\n    var years = Math.floor(months / 12)\n\n    // N years up to 1 years 3 months\n    if (monthsSinceStartOfYear < 3) {\n      return localize('aboutXYears', years, localizeOptions)\n\n    // N years 3 months up to N years 9 months\n    } else if (monthsSinceStartOfYear < 9) {\n      return localize('overXYears', years, localizeOptions)\n\n    // N years 9 months up to N year 12 months\n    } else {\n      return localize('almostXYears', years + 1, localizeOptions)\n    }\n  }\n}\n\nmodule.exports = distanceInWords\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/distance_in_words/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/distance_in_words_strict/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/distance_in_words_strict/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var compareDesc = __webpack_require__(/*! ../compare_desc/index.js */ \"./node_modules/date-fns/compare_desc/index.js\")\nvar parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar differenceInSeconds = __webpack_require__(/*! ../difference_in_seconds/index.js */ \"./node_modules/date-fns/difference_in_seconds/index.js\")\nvar enLocale = __webpack_require__(/*! ../locale/en/index.js */ \"./node_modules/date-fns/locale/en/index.js\")\n\nvar MINUTES_IN_DAY = 1440\nvar MINUTES_IN_MONTH = 43200\nvar MINUTES_IN_YEAR = 525600\n\n/**\n * @category Common Helpers\n * @summary Return the distance between the given dates in words.\n *\n * @description\n * Return the distance between the given dates in words, using strict units.\n * This is like `distanceInWords`, but does not use helpers like 'almost', 'over',\n * 'less than' and the like.\n *\n * | Distance between dates | Result              |\n * |------------------------|---------------------|\n * | 0 ... 59 secs          | [0..59] seconds     |\n * | 1 ... 59 mins          | [1..59] minutes     |\n * | 1 ... 23 hrs           | [1..23] hours       |\n * | 1 ... 29 days          | [1..29] days        |\n * | 1 ... 11 months        | [1..11] months      |\n * | 1 ... N years          | [1..N]  years       |\n *\n * @param {Date|String|Number} dateToCompare - the date to compare with\n * @param {Date|String|Number} date - the other date\n * @param {Object} [options] - the object with options\n * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first\n * @param {'s'|'m'|'h'|'d'|'M'|'Y'} [options.unit] - if specified, will force a unit\n * @param {'floor'|'ceil'|'round'} [options.partialMethod='floor'] - which way to round partial units\n * @param {Object} [options.locale=enLocale] - the locale object\n * @returns {String} the distance in words\n *\n * @example\n * // What is the distance between 2 July 2014 and 1 January 2015?\n * var result = distanceInWordsStrict(\n *   new Date(2014, 6, 2),\n *   new Date(2015, 0, 2)\n * )\n * //=> '6 months'\n *\n * @example\n * // What is the distance between 1 January 2015 00:00:15\n * // and 1 January 2015 00:00:00?\n * var result = distanceInWordsStrict(\n *   new Date(2015, 0, 1, 0, 0, 15),\n *   new Date(2015, 0, 1, 0, 0, 0),\n * )\n * //=> '15 seconds'\n *\n * @example\n * // What is the distance from 1 January 2016\n * // to 1 January 2015, with a suffix?\n * var result = distanceInWordsStrict(\n *   new Date(2016, 0, 1),\n *   new Date(2015, 0, 1),\n *   {addSuffix: true}\n * )\n * //=> '1 year ago'\n *\n * @example\n * // What is the distance from 1 January 2016\n * // to 1 January 2015, in minutes?\n * var result = distanceInWordsStrict(\n *   new Date(2016, 0, 1),\n *   new Date(2015, 0, 1),\n *   {unit: 'm'}\n * )\n * //=> '525600 minutes'\n *\n * @example\n * // What is the distance from 1 January 2016\n * // to 28 January 2015, in months, rounded up?\n * var result = distanceInWordsStrict(\n *   new Date(2015, 0, 28),\n *   new Date(2015, 0, 1),\n *   {unit: 'M', partialMethod: 'ceil'}\n * )\n * //=> '1 month'\n *\n * @example\n * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?\n * var eoLocale = require('date-fns/locale/eo')\n * var result = distanceInWordsStrict(\n *   new Date(2016, 7, 1),\n *   new Date(2015, 0, 1),\n *   {locale: eoLocale}\n * )\n * //=> '1 jaro'\n */\nfunction distanceInWordsStrict (dirtyDateToCompare, dirtyDate, dirtyOptions) {\n  var options = dirtyOptions || {}\n\n  var comparison = compareDesc(dirtyDateToCompare, dirtyDate)\n\n  var locale = options.locale\n  var localize = enLocale.distanceInWords.localize\n  if (locale && locale.distanceInWords && locale.distanceInWords.localize) {\n    localize = locale.distanceInWords.localize\n  }\n\n  var localizeOptions = {\n    addSuffix: Boolean(options.addSuffix),\n    comparison: comparison\n  }\n\n  var dateLeft, dateRight\n  if (comparison > 0) {\n    dateLeft = parse(dirtyDateToCompare)\n    dateRight = parse(dirtyDate)\n  } else {\n    dateLeft = parse(dirtyDate)\n    dateRight = parse(dirtyDateToCompare)\n  }\n\n  var unit\n  var mathPartial = Math[options.partialMethod ? String(options.partialMethod) : 'floor']\n  var seconds = differenceInSeconds(dateRight, dateLeft)\n  var offset = dateRight.getTimezoneOffset() - dateLeft.getTimezoneOffset()\n  var minutes = mathPartial(seconds / 60) - offset\n  var hours, days, months, years\n\n  if (options.unit) {\n    unit = String(options.unit)\n  } else {\n    if (minutes < 1) {\n      unit = 's'\n    } else if (minutes < 60) {\n      unit = 'm'\n    } else if (minutes < MINUTES_IN_DAY) {\n      unit = 'h'\n    } else if (minutes < MINUTES_IN_MONTH) {\n      unit = 'd'\n    } else if (minutes < MINUTES_IN_YEAR) {\n      unit = 'M'\n    } else {\n      unit = 'Y'\n    }\n  }\n\n  // 0 up to 60 seconds\n  if (unit === 's') {\n    return localize('xSeconds', seconds, localizeOptions)\n\n  // 1 up to 60 mins\n  } else if (unit === 'm') {\n    return localize('xMinutes', minutes, localizeOptions)\n\n  // 1 up to 24 hours\n  } else if (unit === 'h') {\n    hours = mathPartial(minutes / 60)\n    return localize('xHours', hours, localizeOptions)\n\n  // 1 up to 30 days\n  } else if (unit === 'd') {\n    days = mathPartial(minutes / MINUTES_IN_DAY)\n    return localize('xDays', days, localizeOptions)\n\n  // 1 up to 12 months\n  } else if (unit === 'M') {\n    months = mathPartial(minutes / MINUTES_IN_MONTH)\n    return localize('xMonths', months, localizeOptions)\n\n  // 1 year up to max Date\n  } else if (unit === 'Y') {\n    years = mathPartial(minutes / MINUTES_IN_YEAR)\n    return localize('xYears', years, localizeOptions)\n  }\n\n  throw new Error('Unknown unit: ' + unit)\n}\n\nmodule.exports = distanceInWordsStrict\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/distance_in_words_strict/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/distance_in_words_to_now/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/distance_in_words_to_now/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var distanceInWords = __webpack_require__(/*! ../distance_in_words/index.js */ \"./node_modules/date-fns/distance_in_words/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Return the distance between the given date and now in words.\n *\n * @description\n * Return the distance between the given date and now in words.\n *\n * | Distance to now                                                   | Result              |\n * |-------------------------------------------------------------------|---------------------|\n * | 0 ... 30 secs                                                     | less than a minute  |\n * | 30 secs ... 1 min 30 secs                                         | 1 minute            |\n * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |\n * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |\n * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |\n * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |\n * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |\n * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |\n * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |\n * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |\n * | 1 yr ... 1 yr 3 months                                            | about 1 year        |\n * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |\n * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |\n * | N yrs ... N yrs 3 months                                          | about N years       |\n * | N yrs 3 months ... N yrs 9 months                                 | over N years        |\n * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |\n *\n * With `options.includeSeconds == true`:\n * | Distance to now     | Result               |\n * |---------------------|----------------------|\n * | 0 secs ... 5 secs   | less than 5 seconds  |\n * | 5 secs ... 10 secs  | less than 10 seconds |\n * | 10 secs ... 20 secs | less than 20 seconds |\n * | 20 secs ... 40 secs | half a minute        |\n * | 40 secs ... 60 secs | less than a minute   |\n * | 60 secs ... 90 secs | 1 minute             |\n *\n * @param {Date|String|Number} date - the given date\n * @param {Object} [options] - the object with options\n * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed\n * @param {Boolean} [options.addSuffix=false] - result specifies if the second date is earlier or later than the first\n * @param {Object} [options.locale=enLocale] - the locale object\n * @returns {String} the distance in words\n *\n * @example\n * // If today is 1 January 2015, what is the distance to 2 July 2014?\n * var result = distanceInWordsToNow(\n *   new Date(2014, 6, 2)\n * )\n * //=> '6 months'\n *\n * @example\n * // If now is 1 January 2015 00:00:00,\n * // what is the distance to 1 January 2015 00:00:15, including seconds?\n * var result = distanceInWordsToNow(\n *   new Date(2015, 0, 1, 0, 0, 15),\n *   {includeSeconds: true}\n * )\n * //=> 'less than 20 seconds'\n *\n * @example\n * // If today is 1 January 2015,\n * // what is the distance to 1 January 2016, with a suffix?\n * var result = distanceInWordsToNow(\n *   new Date(2016, 0, 1),\n *   {addSuffix: true}\n * )\n * //=> 'in about 1 year'\n *\n * @example\n * // If today is 1 January 2015,\n * // what is the distance to 1 August 2016 in Esperanto?\n * var eoLocale = require('date-fns/locale/eo')\n * var result = distanceInWordsToNow(\n *   new Date(2016, 7, 1),\n *   {locale: eoLocale}\n * )\n * //=> 'pli ol 1 jaro'\n */\nfunction distanceInWordsToNow (dirtyDate, dirtyOptions) {\n  return distanceInWords(Date.now(), dirtyDate, dirtyOptions)\n}\n\nmodule.exports = distanceInWordsToNow\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/distance_in_words_to_now/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/each_day/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/each_day/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Return the array of dates within the specified range.\n *\n * @description\n * Return the array of dates within the specified range.\n *\n * @param {Date|String|Number} startDate - the first date\n * @param {Date|String|Number} endDate - the last date\n * @param {Number} [step=1] - the step between each day\n * @returns {Date[]} the array with starts of days from the day of startDate to the day of endDate\n * @throws {Error} startDate cannot be after endDate\n *\n * @example\n * // Each day between 6 October 2014 and 10 October 2014:\n * var result = eachDay(\n *   new Date(2014, 9, 6),\n *   new Date(2014, 9, 10)\n * )\n * //=> [\n * //   Mon Oct 06 2014 00:00:00,\n * //   Tue Oct 07 2014 00:00:00,\n * //   Wed Oct 08 2014 00:00:00,\n * //   Thu Oct 09 2014 00:00:00,\n * //   Fri Oct 10 2014 00:00:00\n * // ]\n */\nfunction eachDay (dirtyStartDate, dirtyEndDate, dirtyStep) {\n  var startDate = parse(dirtyStartDate)\n  var endDate = parse(dirtyEndDate)\n  var step = dirtyStep !== undefined ? dirtyStep : 1\n\n  var endTime = endDate.getTime()\n\n  if (startDate.getTime() > endTime) {\n    throw new Error('The first date cannot be after the second date')\n  }\n\n  var dates = []\n\n  var currentDate = startDate\n  currentDate.setHours(0, 0, 0, 0)\n\n  while (currentDate.getTime() <= endTime) {\n    dates.push(parse(currentDate))\n    currentDate.setDate(currentDate.getDate() + step)\n  }\n\n  return dates\n}\n\nmodule.exports = eachDay\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/each_day/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_day/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/end_of_day/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Return the end of a day for the given date.\n *\n * @description\n * Return the end of a day for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the end of a day\n *\n * @example\n * // The end of a day for 2 September 2014 11:55:00:\n * var result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Tue Sep 02 2014 23:59:59.999\n */\nfunction endOfDay (dirtyDate) {\n  var date = parse(dirtyDate)\n  date.setHours(23, 59, 59, 999)\n  return date\n}\n\nmodule.exports = endOfDay\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_day/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_hour/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/end_of_hour/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Hour Helpers\n * @summary Return the end of an hour for the given date.\n *\n * @description\n * Return the end of an hour for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the end of an hour\n *\n * @example\n * // The end of an hour for 2 September 2014 11:55:00:\n * var result = endOfHour(new Date(2014, 8, 2, 11, 55))\n * //=> Tue Sep 02 2014 11:59:59.999\n */\nfunction endOfHour (dirtyDate) {\n  var date = parse(dirtyDate)\n  date.setMinutes(59, 59, 999)\n  return date\n}\n\nmodule.exports = endOfHour\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_hour/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_iso_week/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/end_of_iso_week/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var endOfWeek = __webpack_require__(/*! ../end_of_week/index.js */ \"./node_modules/date-fns/end_of_week/index.js\")\n\n/**\n * @category ISO Week Helpers\n * @summary Return the end of an ISO week for the given date.\n *\n * @description\n * Return the end of an ISO week for the given date.\n * The result will be in the local timezone.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the end of an ISO week\n *\n * @example\n * // The end of an ISO week for 2 September 2014 11:55:00:\n * var result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Sun Sep 07 2014 23:59:59.999\n */\nfunction endOfISOWeek (dirtyDate) {\n  return endOfWeek(dirtyDate, {weekStartsOn: 1})\n}\n\nmodule.exports = endOfISOWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_iso_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_iso_year/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/end_of_iso_year/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ \"./node_modules/date-fns/get_iso_year/index.js\")\nvar startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ \"./node_modules/date-fns/start_of_iso_week/index.js\")\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Return the end of an ISO week-numbering year for the given date.\n *\n * @description\n * Return the end of an ISO week-numbering year,\n * which always starts 3 days before the year's first Thursday.\n * The result will be in the local timezone.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the end of an ISO week-numbering year\n *\n * @example\n * // The end of an ISO week-numbering year for 2 July 2005:\n * var result = endOfISOYear(new Date(2005, 6, 2))\n * //=> Sun Jan 01 2006 23:59:59.999\n */\nfunction endOfISOYear (dirtyDate) {\n  var year = getISOYear(dirtyDate)\n  var fourthOfJanuaryOfNextYear = new Date(0)\n  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4)\n  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0)\n  var date = startOfISOWeek(fourthOfJanuaryOfNextYear)\n  date.setMilliseconds(date.getMilliseconds() - 1)\n  return date\n}\n\nmodule.exports = endOfISOYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_iso_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_minute/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/end_of_minute/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Minute Helpers\n * @summary Return the end of a minute for the given date.\n *\n * @description\n * Return the end of a minute for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the end of a minute\n *\n * @example\n * // The end of a minute for 1 December 2014 22:15:45.400:\n * var result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))\n * //=> Mon Dec 01 2014 22:15:59.999\n */\nfunction endOfMinute (dirtyDate) {\n  var date = parse(dirtyDate)\n  date.setSeconds(59, 999)\n  return date\n}\n\nmodule.exports = endOfMinute\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_minute/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_month/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/end_of_month/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Return the end of a month for the given date.\n *\n * @description\n * Return the end of a month for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the end of a month\n *\n * @example\n * // The end of a month for 2 September 2014 11:55:00:\n * var result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Tue Sep 30 2014 23:59:59.999\n */\nfunction endOfMonth (dirtyDate) {\n  var date = parse(dirtyDate)\n  var month = date.getMonth()\n  date.setFullYear(date.getFullYear(), month + 1, 0)\n  date.setHours(23, 59, 59, 999)\n  return date\n}\n\nmodule.exports = endOfMonth\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_month/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_quarter/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/end_of_quarter/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Quarter Helpers\n * @summary Return the end of a year quarter for the given date.\n *\n * @description\n * Return the end of a year quarter for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the end of a quarter\n *\n * @example\n * // The end of a quarter for 2 September 2014 11:55:00:\n * var result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Tue Sep 30 2014 23:59:59.999\n */\nfunction endOfQuarter (dirtyDate) {\n  var date = parse(dirtyDate)\n  var currentMonth = date.getMonth()\n  var month = currentMonth - currentMonth % 3 + 3\n  date.setMonth(month, 0)\n  date.setHours(23, 59, 59, 999)\n  return date\n}\n\nmodule.exports = endOfQuarter\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_quarter/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_second/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/end_of_second/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Second Helpers\n * @summary Return the end of a second for the given date.\n *\n * @description\n * Return the end of a second for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the end of a second\n *\n * @example\n * // The end of a second for 1 December 2014 22:15:45.400:\n * var result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))\n * //=> Mon Dec 01 2014 22:15:45.999\n */\nfunction endOfSecond (dirtyDate) {\n  var date = parse(dirtyDate)\n  date.setMilliseconds(999)\n  return date\n}\n\nmodule.exports = endOfSecond\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_second/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_today/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/end_of_today/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var endOfDay = __webpack_require__(/*! ../end_of_day/index.js */ \"./node_modules/date-fns/end_of_day/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Return the end of today.\n *\n * @description\n * Return the end of today.\n *\n * @returns {Date} the end of today\n *\n * @example\n * // If today is 6 October 2014:\n * var result = endOfToday()\n * //=> Mon Oct 6 2014 23:59:59.999\n */\nfunction endOfToday () {\n  return endOfDay(new Date())\n}\n\nmodule.exports = endOfToday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_today/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_tomorrow/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/end_of_tomorrow/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @category Day Helpers\n * @summary Return the end of tomorrow.\n *\n * @description\n * Return the end of tomorrow.\n *\n * @returns {Date} the end of tomorrow\n *\n * @example\n * // If today is 6 October 2014:\n * var result = endOfTomorrow()\n * //=> Tue Oct 7 2014 23:59:59.999\n */\nfunction endOfTomorrow () {\n  var now = new Date()\n  var year = now.getFullYear()\n  var month = now.getMonth()\n  var day = now.getDate()\n\n  var date = new Date(0)\n  date.setFullYear(year, month, day + 1)\n  date.setHours(23, 59, 59, 999)\n  return date\n}\n\nmodule.exports = endOfTomorrow\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_tomorrow/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_week/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/end_of_week/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Week Helpers\n * @summary Return the end of a week for the given date.\n *\n * @description\n * Return the end of a week for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @param {Object} [options] - the object with options\n * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)\n * @returns {Date} the end of a week\n *\n * @example\n * // The end of a week for 2 September 2014 11:55:00:\n * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Sat Sep 06 2014 23:59:59.999\n *\n * @example\n * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:\n * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})\n * //=> Sun Sep 07 2014 23:59:59.999\n */\nfunction endOfWeek (dirtyDate, dirtyOptions) {\n  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0\n\n  var date = parse(dirtyDate)\n  var day = date.getDay()\n  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn)\n\n  date.setDate(date.getDate() + diff)\n  date.setHours(23, 59, 59, 999)\n  return date\n}\n\nmodule.exports = endOfWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_year/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/end_of_year/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Return the end of a year for the given date.\n *\n * @description\n * Return the end of a year for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the end of a year\n *\n * @example\n * // The end of a year for 2 September 2014 11:55:00:\n * var result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))\n * //=> Wed Dec 31 2014 23:59:59.999\n */\nfunction endOfYear (dirtyDate) {\n  var date = parse(dirtyDate)\n  var year = date.getFullYear()\n  date.setFullYear(year + 1, 0, 0)\n  date.setHours(23, 59, 59, 999)\n  return date\n}\n\nmodule.exports = endOfYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/end_of_yesterday/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/end_of_yesterday/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @category Day Helpers\n * @summary Return the end of yesterday.\n *\n * @description\n * Return the end of yesterday.\n *\n * @returns {Date} the end of yesterday\n *\n * @example\n * // If today is 6 October 2014:\n * var result = endOfYesterday()\n * //=> Sun Oct 5 2014 23:59:59.999\n */\nfunction endOfYesterday () {\n  var now = new Date()\n  var year = now.getFullYear()\n  var month = now.getMonth()\n  var day = now.getDate()\n\n  var date = new Date(0)\n  date.setFullYear(year, month, day - 1)\n  date.setHours(23, 59, 59, 999)\n  return date\n}\n\nmodule.exports = endOfYesterday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/end_of_yesterday/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/format/index.js":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/format/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getDayOfYear = __webpack_require__(/*! ../get_day_of_year/index.js */ \"./node_modules/date-fns/get_day_of_year/index.js\")\nvar getISOWeek = __webpack_require__(/*! ../get_iso_week/index.js */ \"./node_modules/date-fns/get_iso_week/index.js\")\nvar getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ \"./node_modules/date-fns/get_iso_year/index.js\")\nvar parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar isValid = __webpack_require__(/*! ../is_valid/index.js */ \"./node_modules/date-fns/is_valid/index.js\")\nvar enLocale = __webpack_require__(/*! ../locale/en/index.js */ \"./node_modules/date-fns/locale/en/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Format the date.\n *\n * @description\n * Return the formatted date string in the given format.\n *\n * Accepted tokens:\n * | Unit                    | Token | Result examples                  |\n * |-------------------------|-------|----------------------------------|\n * | Month                   | M     | 1, 2, ..., 12                    |\n * |                         | Mo    | 1st, 2nd, ..., 12th              |\n * |                         | MM    | 01, 02, ..., 12                  |\n * |                         | MMM   | Jan, Feb, ..., Dec               |\n * |                         | MMMM  | January, February, ..., December |\n * | Quarter                 | Q     | 1, 2, 3, 4                       |\n * |                         | Qo    | 1st, 2nd, 3rd, 4th               |\n * | Day of month            | D     | 1, 2, ..., 31                    |\n * |                         | Do    | 1st, 2nd, ..., 31st              |\n * |                         | DD    | 01, 02, ..., 31                  |\n * | Day of year             | DDD   | 1, 2, ..., 366                   |\n * |                         | DDDo  | 1st, 2nd, ..., 366th             |\n * |                         | DDDD  | 001, 002, ..., 366               |\n * | Day of week             | d     | 0, 1, ..., 6                     |\n * |                         | do    | 0th, 1st, ..., 6th               |\n * |                         | dd    | Su, Mo, ..., Sa                  |\n * |                         | ddd   | Sun, Mon, ..., Sat               |\n * |                         | dddd  | Sunday, Monday, ..., Saturday    |\n * | Day of ISO week         | E     | 1, 2, ..., 7                     |\n * | ISO week                | W     | 1, 2, ..., 53                    |\n * |                         | Wo    | 1st, 2nd, ..., 53rd              |\n * |                         | WW    | 01, 02, ..., 53                  |\n * | Year                    | YY    | 00, 01, ..., 99                  |\n * |                         | YYYY  | 1900, 1901, ..., 2099            |\n * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |\n * |                         | GGGG  | 1900, 1901, ..., 2099            |\n * | AM/PM                   | A     | AM, PM                           |\n * |                         | a     | am, pm                           |\n * |                         | aa    | a.m., p.m.                       |\n * | Hour                    | H     | 0, 1, ... 23                     |\n * |                         | HH    | 00, 01, ... 23                   |\n * |                         | h     | 1, 2, ..., 12                    |\n * |                         | hh    | 01, 02, ..., 12                  |\n * | Minute                  | m     | 0, 1, ..., 59                    |\n * |                         | mm    | 00, 01, ..., 59                  |\n * | Second                  | s     | 0, 1, ..., 59                    |\n * |                         | ss    | 00, 01, ..., 59                  |\n * | 1/10 of second          | S     | 0, 1, ..., 9                     |\n * | 1/100 of second         | SS    | 00, 01, ..., 99                  |\n * | Millisecond             | SSS   | 000, 001, ..., 999               |\n * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |\n * |                         | ZZ    | -0100, +0000, ..., +1200         |\n * | Seconds timestamp       | X     | 512969520                        |\n * | Milliseconds timestamp  | x     | 512969520900                     |\n *\n * The characters wrapped in square brackets are escaped.\n *\n * The result may vary by locale.\n *\n * @param {Date|String|Number} date - the original date\n * @param {String} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - the string of tokens\n * @param {Object} [options] - the object with options\n * @param {Object} [options.locale=enLocale] - the locale object\n * @returns {String} the formatted date string\n *\n * @example\n * // Represent 11 February 2014 in middle-endian format:\n * var result = format(\n *   new Date(2014, 1, 11),\n *   'MM/DD/YYYY'\n * )\n * //=> '02/11/2014'\n *\n * @example\n * // Represent 2 July 2014 in Esperanto:\n * var eoLocale = require('date-fns/locale/eo')\n * var result = format(\n *   new Date(2014, 6, 2),\n *   'Do [de] MMMM YYYY',\n *   {locale: eoLocale}\n * )\n * //=> '2-a de julio 2014'\n */\nfunction format (dirtyDate, dirtyFormatStr, dirtyOptions) {\n  var formatStr = dirtyFormatStr ? String(dirtyFormatStr) : 'YYYY-MM-DDTHH:mm:ss.SSSZ'\n  var options = dirtyOptions || {}\n\n  var locale = options.locale\n  var localeFormatters = enLocale.format.formatters\n  var formattingTokensRegExp = enLocale.format.formattingTokensRegExp\n  if (locale && locale.format && locale.format.formatters) {\n    localeFormatters = locale.format.formatters\n\n    if (locale.format.formattingTokensRegExp) {\n      formattingTokensRegExp = locale.format.formattingTokensRegExp\n    }\n  }\n\n  var date = parse(dirtyDate)\n\n  if (!isValid(date)) {\n    return 'Invalid Date'\n  }\n\n  var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp)\n\n  return formatFn(date)\n}\n\nvar formatters = {\n  // Month: 1, 2, ..., 12\n  'M': function (date) {\n    return date.getMonth() + 1\n  },\n\n  // Month: 01, 02, ..., 12\n  'MM': function (date) {\n    return addLeadingZeros(date.getMonth() + 1, 2)\n  },\n\n  // Quarter: 1, 2, 3, 4\n  'Q': function (date) {\n    return Math.ceil((date.getMonth() + 1) / 3)\n  },\n\n  // Day of month: 1, 2, ..., 31\n  'D': function (date) {\n    return date.getDate()\n  },\n\n  // Day of month: 01, 02, ..., 31\n  'DD': function (date) {\n    return addLeadingZeros(date.getDate(), 2)\n  },\n\n  // Day of year: 1, 2, ..., 366\n  'DDD': function (date) {\n    return getDayOfYear(date)\n  },\n\n  // Day of year: 001, 002, ..., 366\n  'DDDD': function (date) {\n    return addLeadingZeros(getDayOfYear(date), 3)\n  },\n\n  // Day of week: 0, 1, ..., 6\n  'd': function (date) {\n    return date.getDay()\n  },\n\n  // Day of ISO week: 1, 2, ..., 7\n  'E': function (date) {\n    return date.getDay() || 7\n  },\n\n  // ISO week: 1, 2, ..., 53\n  'W': function (date) {\n    return getISOWeek(date)\n  },\n\n  // ISO week: 01, 02, ..., 53\n  'WW': function (date) {\n    return addLeadingZeros(getISOWeek(date), 2)\n  },\n\n  // Year: 00, 01, ..., 99\n  'YY': function (date) {\n    return addLeadingZeros(date.getFullYear(), 4).substr(2)\n  },\n\n  // Year: 1900, 1901, ..., 2099\n  'YYYY': function (date) {\n    return addLeadingZeros(date.getFullYear(), 4)\n  },\n\n  // ISO week-numbering year: 00, 01, ..., 99\n  'GG': function (date) {\n    return String(getISOYear(date)).substr(2)\n  },\n\n  // ISO week-numbering year: 1900, 1901, ..., 2099\n  'GGGG': function (date) {\n    return getISOYear(date)\n  },\n\n  // Hour: 0, 1, ... 23\n  'H': function (date) {\n    return date.getHours()\n  },\n\n  // Hour: 00, 01, ..., 23\n  'HH': function (date) {\n    return addLeadingZeros(date.getHours(), 2)\n  },\n\n  // Hour: 1, 2, ..., 12\n  'h': function (date) {\n    var hours = date.getHours()\n    if (hours === 0) {\n      return 12\n    } else if (hours > 12) {\n      return hours % 12\n    } else {\n      return hours\n    }\n  },\n\n  // Hour: 01, 02, ..., 12\n  'hh': function (date) {\n    return addLeadingZeros(formatters['h'](date), 2)\n  },\n\n  // Minute: 0, 1, ..., 59\n  'm': function (date) {\n    return date.getMinutes()\n  },\n\n  // Minute: 00, 01, ..., 59\n  'mm': function (date) {\n    return addLeadingZeros(date.getMinutes(), 2)\n  },\n\n  // Second: 0, 1, ..., 59\n  's': function (date) {\n    return date.getSeconds()\n  },\n\n  // Second: 00, 01, ..., 59\n  'ss': function (date) {\n    return addLeadingZeros(date.getSeconds(), 2)\n  },\n\n  // 1/10 of second: 0, 1, ..., 9\n  'S': function (date) {\n    return Math.floor(date.getMilliseconds() / 100)\n  },\n\n  // 1/100 of second: 00, 01, ..., 99\n  'SS': function (date) {\n    return addLeadingZeros(Math.floor(date.getMilliseconds() / 10), 2)\n  },\n\n  // Millisecond: 000, 001, ..., 999\n  'SSS': function (date) {\n    return addLeadingZeros(date.getMilliseconds(), 3)\n  },\n\n  // Timezone: -01:00, +00:00, ... +12:00\n  'Z': function (date) {\n    return formatTimezone(date.getTimezoneOffset(), ':')\n  },\n\n  // Timezone: -0100, +0000, ... +1200\n  'ZZ': function (date) {\n    return formatTimezone(date.getTimezoneOffset())\n  },\n\n  // Seconds timestamp: 512969520\n  'X': function (date) {\n    return Math.floor(date.getTime() / 1000)\n  },\n\n  // Milliseconds timestamp: 512969520900\n  'x': function (date) {\n    return date.getTime()\n  }\n}\n\nfunction buildFormatFn (formatStr, localeFormatters, formattingTokensRegExp) {\n  var array = formatStr.match(formattingTokensRegExp)\n  var length = array.length\n\n  var i\n  var formatter\n  for (i = 0; i < length; i++) {\n    formatter = localeFormatters[array[i]] || formatters[array[i]]\n    if (formatter) {\n      array[i] = formatter\n    } else {\n      array[i] = removeFormattingTokens(array[i])\n    }\n  }\n\n  return function (date) {\n    var output = ''\n    for (var i = 0; i < length; i++) {\n      if (array[i] instanceof Function) {\n        output += array[i](date, formatters)\n      } else {\n        output += array[i]\n      }\n    }\n    return output\n  }\n}\n\nfunction removeFormattingTokens (input) {\n  if (input.match(/\\[[\\s\\S]/)) {\n    return input.replace(/^\\[|]$/g, '')\n  }\n  return input.replace(/\\\\/g, '')\n}\n\nfunction formatTimezone (offset, delimeter) {\n  delimeter = delimeter || ''\n  var sign = offset > 0 ? '-' : '+'\n  var absOffset = Math.abs(offset)\n  var hours = Math.floor(absOffset / 60)\n  var minutes = absOffset % 60\n  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)\n}\n\nfunction addLeadingZeros (number, targetLength) {\n  var output = Math.abs(number).toString()\n  while (output.length < targetLength) {\n    output = '0' + output\n  }\n  return output\n}\n\nmodule.exports = format\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/format/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_date/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/get_date/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Get the day of the month of the given date.\n *\n * @description\n * Get the day of the month of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the day of month\n *\n * @example\n * // Which day of the month is 29 February 2012?\n * var result = getDate(new Date(2012, 1, 29))\n * //=> 29\n */\nfunction getDate (dirtyDate) {\n  var date = parse(dirtyDate)\n  var dayOfMonth = date.getDate()\n  return dayOfMonth\n}\n\nmodule.exports = getDate\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_date/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_day/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/get_day/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Get the day of the week of the given date.\n *\n * @description\n * Get the day of the week of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the day of week\n *\n * @example\n * // Which day of the week is 29 February 2012?\n * var result = getDay(new Date(2012, 1, 29))\n * //=> 3\n */\nfunction getDay (dirtyDate) {\n  var date = parse(dirtyDate)\n  var day = date.getDay()\n  return day\n}\n\nmodule.exports = getDay\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_day/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_day_of_year/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/get_day_of_year/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar startOfYear = __webpack_require__(/*! ../start_of_year/index.js */ \"./node_modules/date-fns/start_of_year/index.js\")\nvar differenceInCalendarDays = __webpack_require__(/*! ../difference_in_calendar_days/index.js */ \"./node_modules/date-fns/difference_in_calendar_days/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Get the day of the year of the given date.\n *\n * @description\n * Get the day of the year of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the day of year\n *\n * @example\n * // Which day of the year is 2 July 2014?\n * var result = getDayOfYear(new Date(2014, 6, 2))\n * //=> 183\n */\nfunction getDayOfYear (dirtyDate) {\n  var date = parse(dirtyDate)\n  var diff = differenceInCalendarDays(date, startOfYear(date))\n  var dayOfYear = diff + 1\n  return dayOfYear\n}\n\nmodule.exports = getDayOfYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_day_of_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_days_in_month/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/get_days_in_month/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Get the number of days in a month of the given date.\n *\n * @description\n * Get the number of days in a month of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the number of days in a month\n *\n * @example\n * // How many days are in February 2000?\n * var result = getDaysInMonth(new Date(2000, 1))\n * //=> 29\n */\nfunction getDaysInMonth (dirtyDate) {\n  var date = parse(dirtyDate)\n  var year = date.getFullYear()\n  var monthIndex = date.getMonth()\n  var lastDayOfMonth = new Date(0)\n  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0)\n  lastDayOfMonth.setHours(0, 0, 0, 0)\n  return lastDayOfMonth.getDate()\n}\n\nmodule.exports = getDaysInMonth\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_days_in_month/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_days_in_year/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/get_days_in_year/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isLeapYear = __webpack_require__(/*! ../is_leap_year/index.js */ \"./node_modules/date-fns/is_leap_year/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Get the number of days in a year of the given date.\n *\n * @description\n * Get the number of days in a year of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the number of days in a year\n *\n * @example\n * // How many days are in 2012?\n * var result = getDaysInYear(new Date(2012, 0, 1))\n * //=> 366\n */\nfunction getDaysInYear (dirtyDate) {\n  return isLeapYear(dirtyDate) ? 366 : 365\n}\n\nmodule.exports = getDaysInYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_days_in_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_hours/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/get_hours/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Hour Helpers\n * @summary Get the hours of the given date.\n *\n * @description\n * Get the hours of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the hours\n *\n * @example\n * // Get the hours of 29 February 2012 11:45:00:\n * var result = getHours(new Date(2012, 1, 29, 11, 45))\n * //=> 11\n */\nfunction getHours (dirtyDate) {\n  var date = parse(dirtyDate)\n  var hours = date.getHours()\n  return hours\n}\n\nmodule.exports = getHours\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_hours/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_iso_day/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/get_iso_day/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Get the day of the ISO week of the given date.\n *\n * @description\n * Get the day of the ISO week of the given date,\n * which is 7 for Sunday, 1 for Monday etc.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the day of ISO week\n *\n * @example\n * // Which day of the ISO week is 26 February 2012?\n * var result = getISODay(new Date(2012, 1, 26))\n * //=> 7\n */\nfunction getISODay (dirtyDate) {\n  var date = parse(dirtyDate)\n  var day = date.getDay()\n\n  if (day === 0) {\n    day = 7\n  }\n\n  return day\n}\n\nmodule.exports = getISODay\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_iso_day/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_iso_week/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/get_iso_week/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ \"./node_modules/date-fns/start_of_iso_week/index.js\")\nvar startOfISOYear = __webpack_require__(/*! ../start_of_iso_year/index.js */ \"./node_modules/date-fns/start_of_iso_year/index.js\")\n\nvar MILLISECONDS_IN_WEEK = 604800000\n\n/**\n * @category ISO Week Helpers\n * @summary Get the ISO week of the given date.\n *\n * @description\n * Get the ISO week of the given date.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the ISO week\n *\n * @example\n * // Which week of the ISO-week numbering year is 2 January 2005?\n * var result = getISOWeek(new Date(2005, 0, 2))\n * //=> 53\n */\nfunction getISOWeek (dirtyDate) {\n  var date = parse(dirtyDate)\n  var diff = startOfISOWeek(date).getTime() - startOfISOYear(date).getTime()\n\n  // Round the number of days to the nearest integer\n  // because the number of milliseconds in a week is not constant\n  // (e.g. it's different in the week of the daylight saving time clock shift)\n  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1\n}\n\nmodule.exports = getISOWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_iso_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_iso_weeks_in_year/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/get_iso_weeks_in_year/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfISOYear = __webpack_require__(/*! ../start_of_iso_year/index.js */ \"./node_modules/date-fns/start_of_iso_year/index.js\")\nvar addWeeks = __webpack_require__(/*! ../add_weeks/index.js */ \"./node_modules/date-fns/add_weeks/index.js\")\n\nvar MILLISECONDS_IN_WEEK = 604800000\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Get the number of weeks in an ISO week-numbering year of the given date.\n *\n * @description\n * Get the number of weeks in an ISO week-numbering year of the given date.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the number of ISO weeks in a year\n *\n * @example\n * // How many weeks are in ISO week-numbering year 2015?\n * var result = getISOWeeksInYear(new Date(2015, 1, 11))\n * //=> 53\n */\nfunction getISOWeeksInYear (dirtyDate) {\n  var thisYear = startOfISOYear(dirtyDate)\n  var nextYear = startOfISOYear(addWeeks(thisYear, 60))\n  var diff = nextYear.valueOf() - thisYear.valueOf()\n  // Round the number of weeks to the nearest integer\n  // because the number of milliseconds in a week is not constant\n  // (e.g. it's different in the week of the daylight saving time clock shift)\n  return Math.round(diff / MILLISECONDS_IN_WEEK)\n}\n\nmodule.exports = getISOWeeksInYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_iso_weeks_in_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_iso_year/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/get_iso_year/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ \"./node_modules/date-fns/start_of_iso_week/index.js\")\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Get the ISO week-numbering year of the given date.\n *\n * @description\n * Get the ISO week-numbering year of the given date,\n * which always starts 3 days before the year's first Thursday.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the ISO week-numbering year\n *\n * @example\n * // Which ISO-week numbering year is 2 January 2005?\n * var result = getISOYear(new Date(2005, 0, 2))\n * //=> 2004\n */\nfunction getISOYear (dirtyDate) {\n  var date = parse(dirtyDate)\n  var year = date.getFullYear()\n\n  var fourthOfJanuaryOfNextYear = new Date(0)\n  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4)\n  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0)\n  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear)\n\n  var fourthOfJanuaryOfThisYear = new Date(0)\n  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4)\n  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0)\n  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear)\n\n  if (date.getTime() >= startOfNextYear.getTime()) {\n    return year + 1\n  } else if (date.getTime() >= startOfThisYear.getTime()) {\n    return year\n  } else {\n    return year - 1\n  }\n}\n\nmodule.exports = getISOYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_iso_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_milliseconds/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/get_milliseconds/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Millisecond Helpers\n * @summary Get the milliseconds of the given date.\n *\n * @description\n * Get the milliseconds of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the milliseconds\n *\n * @example\n * // Get the milliseconds of 29 February 2012 11:45:05.123:\n * var result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))\n * //=> 123\n */\nfunction getMilliseconds (dirtyDate) {\n  var date = parse(dirtyDate)\n  var milliseconds = date.getMilliseconds()\n  return milliseconds\n}\n\nmodule.exports = getMilliseconds\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_milliseconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_minutes/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/get_minutes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Minute Helpers\n * @summary Get the minutes of the given date.\n *\n * @description\n * Get the minutes of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the minutes\n *\n * @example\n * // Get the minutes of 29 February 2012 11:45:05:\n * var result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))\n * //=> 45\n */\nfunction getMinutes (dirtyDate) {\n  var date = parse(dirtyDate)\n  var minutes = date.getMinutes()\n  return minutes\n}\n\nmodule.exports = getMinutes\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_minutes/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_month/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/get_month/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Get the month of the given date.\n *\n * @description\n * Get the month of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the month\n *\n * @example\n * // Which month is 29 February 2012?\n * var result = getMonth(new Date(2012, 1, 29))\n * //=> 1\n */\nfunction getMonth (dirtyDate) {\n  var date = parse(dirtyDate)\n  var month = date.getMonth()\n  return month\n}\n\nmodule.exports = getMonth\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_month/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_overlapping_days_in_ranges/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/get_overlapping_days_in_ranges/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\nvar MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000\n\n/**\n * @category Range Helpers\n * @summary Get the number of days that overlap in two date ranges\n *\n * @description\n * Get the number of days that overlap in two date ranges\n *\n * @param {Date|String|Number} initialRangeStartDate - the start of the initial range\n * @param {Date|String|Number} initialRangeEndDate - the end of the initial range\n * @param {Date|String|Number} comparedRangeStartDate - the start of the range to compare it with\n * @param {Date|String|Number} comparedRangeEndDate - the end of the range to compare it with\n * @returns {Number} the number of days that overlap in two date ranges\n * @throws {Error} startDate of a date range cannot be after its endDate\n *\n * @example\n * // For overlapping date ranges adds 1 for each started overlapping day:\n * getOverlappingDaysInRanges(\n *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 17), new Date(2014, 0, 21)\n * )\n * //=> 3\n *\n * @example\n * // For non-overlapping date ranges returns 0:\n * getOverlappingDaysInRanges(\n *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 21), new Date(2014, 0, 22)\n * )\n * //=> 0\n */\nfunction getOverlappingDaysInRanges (dirtyInitialRangeStartDate, dirtyInitialRangeEndDate, dirtyComparedRangeStartDate, dirtyComparedRangeEndDate) {\n  var initialStartTime = parse(dirtyInitialRangeStartDate).getTime()\n  var initialEndTime = parse(dirtyInitialRangeEndDate).getTime()\n  var comparedStartTime = parse(dirtyComparedRangeStartDate).getTime()\n  var comparedEndTime = parse(dirtyComparedRangeEndDate).getTime()\n\n  if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {\n    throw new Error('The start of the range cannot be after the end of the range')\n  }\n\n  var isOverlapping = initialStartTime < comparedEndTime && comparedStartTime < initialEndTime\n\n  if (!isOverlapping) {\n    return 0\n  }\n\n  var overlapStartDate = comparedStartTime < initialStartTime\n    ? initialStartTime\n    : comparedStartTime\n\n  var overlapEndDate = comparedEndTime > initialEndTime\n    ? initialEndTime\n    : comparedEndTime\n\n  var differenceInMs = overlapEndDate - overlapStartDate\n\n  return Math.ceil(differenceInMs / MILLISECONDS_IN_DAY)\n}\n\nmodule.exports = getOverlappingDaysInRanges\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_overlapping_days_in_ranges/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_quarter/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/get_quarter/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Quarter Helpers\n * @summary Get the year quarter of the given date.\n *\n * @description\n * Get the year quarter of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the quarter\n *\n * @example\n * // Which quarter is 2 July 2014?\n * var result = getQuarter(new Date(2014, 6, 2))\n * //=> 3\n */\nfunction getQuarter (dirtyDate) {\n  var date = parse(dirtyDate)\n  var quarter = Math.floor(date.getMonth() / 3) + 1\n  return quarter\n}\n\nmodule.exports = getQuarter\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_quarter/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_seconds/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/get_seconds/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Second Helpers\n * @summary Get the seconds of the given date.\n *\n * @description\n * Get the seconds of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the seconds\n *\n * @example\n * // Get the seconds of 29 February 2012 11:45:05.123:\n * var result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))\n * //=> 5\n */\nfunction getSeconds (dirtyDate) {\n  var date = parse(dirtyDate)\n  var seconds = date.getSeconds()\n  return seconds\n}\n\nmodule.exports = getSeconds\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_seconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_time/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/get_time/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Timestamp Helpers\n * @summary Get the milliseconds timestamp of the given date.\n *\n * @description\n * Get the milliseconds timestamp of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the timestamp\n *\n * @example\n * // Get the timestamp of 29 February 2012 11:45:05.123:\n * var result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))\n * //=> 1330515905123\n */\nfunction getTime (dirtyDate) {\n  var date = parse(dirtyDate)\n  var timestamp = date.getTime()\n  return timestamp\n}\n\nmodule.exports = getTime\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_time/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/get_year/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/get_year/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Get the year of the given date.\n *\n * @description\n * Get the year of the given date.\n *\n * @param {Date|String|Number} date - the given date\n * @returns {Number} the year\n *\n * @example\n * // Which year is 2 July 2014?\n * var result = getYear(new Date(2014, 6, 2))\n * //=> 2014\n */\nfunction getYear (dirtyDate) {\n  var date = parse(dirtyDate)\n  var year = date.getFullYear()\n  return year\n}\n\nmodule.exports = getYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/get_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/index.js":
/*!****************************************!*\
  !*** ./node_modules/date-fns/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = {\n  addDays: __webpack_require__(/*! ./add_days/index.js */ \"./node_modules/date-fns/add_days/index.js\"),\n  addHours: __webpack_require__(/*! ./add_hours/index.js */ \"./node_modules/date-fns/add_hours/index.js\"),\n  addISOYears: __webpack_require__(/*! ./add_iso_years/index.js */ \"./node_modules/date-fns/add_iso_years/index.js\"),\n  addMilliseconds: __webpack_require__(/*! ./add_milliseconds/index.js */ \"./node_modules/date-fns/add_milliseconds/index.js\"),\n  addMinutes: __webpack_require__(/*! ./add_minutes/index.js */ \"./node_modules/date-fns/add_minutes/index.js\"),\n  addMonths: __webpack_require__(/*! ./add_months/index.js */ \"./node_modules/date-fns/add_months/index.js\"),\n  addQuarters: __webpack_require__(/*! ./add_quarters/index.js */ \"./node_modules/date-fns/add_quarters/index.js\"),\n  addSeconds: __webpack_require__(/*! ./add_seconds/index.js */ \"./node_modules/date-fns/add_seconds/index.js\"),\n  addWeeks: __webpack_require__(/*! ./add_weeks/index.js */ \"./node_modules/date-fns/add_weeks/index.js\"),\n  addYears: __webpack_require__(/*! ./add_years/index.js */ \"./node_modules/date-fns/add_years/index.js\"),\n  areRangesOverlapping: __webpack_require__(/*! ./are_ranges_overlapping/index.js */ \"./node_modules/date-fns/are_ranges_overlapping/index.js\"),\n  closestIndexTo: __webpack_require__(/*! ./closest_index_to/index.js */ \"./node_modules/date-fns/closest_index_to/index.js\"),\n  closestTo: __webpack_require__(/*! ./closest_to/index.js */ \"./node_modules/date-fns/closest_to/index.js\"),\n  compareAsc: __webpack_require__(/*! ./compare_asc/index.js */ \"./node_modules/date-fns/compare_asc/index.js\"),\n  compareDesc: __webpack_require__(/*! ./compare_desc/index.js */ \"./node_modules/date-fns/compare_desc/index.js\"),\n  differenceInCalendarDays: __webpack_require__(/*! ./difference_in_calendar_days/index.js */ \"./node_modules/date-fns/difference_in_calendar_days/index.js\"),\n  differenceInCalendarISOWeeks: __webpack_require__(/*! ./difference_in_calendar_iso_weeks/index.js */ \"./node_modules/date-fns/difference_in_calendar_iso_weeks/index.js\"),\n  differenceInCalendarISOYears: __webpack_require__(/*! ./difference_in_calendar_iso_years/index.js */ \"./node_modules/date-fns/difference_in_calendar_iso_years/index.js\"),\n  differenceInCalendarMonths: __webpack_require__(/*! ./difference_in_calendar_months/index.js */ \"./node_modules/date-fns/difference_in_calendar_months/index.js\"),\n  differenceInCalendarQuarters: __webpack_require__(/*! ./difference_in_calendar_quarters/index.js */ \"./node_modules/date-fns/difference_in_calendar_quarters/index.js\"),\n  differenceInCalendarWeeks: __webpack_require__(/*! ./difference_in_calendar_weeks/index.js */ \"./node_modules/date-fns/difference_in_calendar_weeks/index.js\"),\n  differenceInCalendarYears: __webpack_require__(/*! ./difference_in_calendar_years/index.js */ \"./node_modules/date-fns/difference_in_calendar_years/index.js\"),\n  differenceInDays: __webpack_require__(/*! ./difference_in_days/index.js */ \"./node_modules/date-fns/difference_in_days/index.js\"),\n  differenceInHours: __webpack_require__(/*! ./difference_in_hours/index.js */ \"./node_modules/date-fns/difference_in_hours/index.js\"),\n  differenceInISOYears: __webpack_require__(/*! ./difference_in_iso_years/index.js */ \"./node_modules/date-fns/difference_in_iso_years/index.js\"),\n  differenceInMilliseconds: __webpack_require__(/*! ./difference_in_milliseconds/index.js */ \"./node_modules/date-fns/difference_in_milliseconds/index.js\"),\n  differenceInMinutes: __webpack_require__(/*! ./difference_in_minutes/index.js */ \"./node_modules/date-fns/difference_in_minutes/index.js\"),\n  differenceInMonths: __webpack_require__(/*! ./difference_in_months/index.js */ \"./node_modules/date-fns/difference_in_months/index.js\"),\n  differenceInQuarters: __webpack_require__(/*! ./difference_in_quarters/index.js */ \"./node_modules/date-fns/difference_in_quarters/index.js\"),\n  differenceInSeconds: __webpack_require__(/*! ./difference_in_seconds/index.js */ \"./node_modules/date-fns/difference_in_seconds/index.js\"),\n  differenceInWeeks: __webpack_require__(/*! ./difference_in_weeks/index.js */ \"./node_modules/date-fns/difference_in_weeks/index.js\"),\n  differenceInYears: __webpack_require__(/*! ./difference_in_years/index.js */ \"./node_modules/date-fns/difference_in_years/index.js\"),\n  distanceInWords: __webpack_require__(/*! ./distance_in_words/index.js */ \"./node_modules/date-fns/distance_in_words/index.js\"),\n  distanceInWordsStrict: __webpack_require__(/*! ./distance_in_words_strict/index.js */ \"./node_modules/date-fns/distance_in_words_strict/index.js\"),\n  distanceInWordsToNow: __webpack_require__(/*! ./distance_in_words_to_now/index.js */ \"./node_modules/date-fns/distance_in_words_to_now/index.js\"),\n  eachDay: __webpack_require__(/*! ./each_day/index.js */ \"./node_modules/date-fns/each_day/index.js\"),\n  endOfDay: __webpack_require__(/*! ./end_of_day/index.js */ \"./node_modules/date-fns/end_of_day/index.js\"),\n  endOfHour: __webpack_require__(/*! ./end_of_hour/index.js */ \"./node_modules/date-fns/end_of_hour/index.js\"),\n  endOfISOWeek: __webpack_require__(/*! ./end_of_iso_week/index.js */ \"./node_modules/date-fns/end_of_iso_week/index.js\"),\n  endOfISOYear: __webpack_require__(/*! ./end_of_iso_year/index.js */ \"./node_modules/date-fns/end_of_iso_year/index.js\"),\n  endOfMinute: __webpack_require__(/*! ./end_of_minute/index.js */ \"./node_modules/date-fns/end_of_minute/index.js\"),\n  endOfMonth: __webpack_require__(/*! ./end_of_month/index.js */ \"./node_modules/date-fns/end_of_month/index.js\"),\n  endOfQuarter: __webpack_require__(/*! ./end_of_quarter/index.js */ \"./node_modules/date-fns/end_of_quarter/index.js\"),\n  endOfSecond: __webpack_require__(/*! ./end_of_second/index.js */ \"./node_modules/date-fns/end_of_second/index.js\"),\n  endOfToday: __webpack_require__(/*! ./end_of_today/index.js */ \"./node_modules/date-fns/end_of_today/index.js\"),\n  endOfTomorrow: __webpack_require__(/*! ./end_of_tomorrow/index.js */ \"./node_modules/date-fns/end_of_tomorrow/index.js\"),\n  endOfWeek: __webpack_require__(/*! ./end_of_week/index.js */ \"./node_modules/date-fns/end_of_week/index.js\"),\n  endOfYear: __webpack_require__(/*! ./end_of_year/index.js */ \"./node_modules/date-fns/end_of_year/index.js\"),\n  endOfYesterday: __webpack_require__(/*! ./end_of_yesterday/index.js */ \"./node_modules/date-fns/end_of_yesterday/index.js\"),\n  format: __webpack_require__(/*! ./format/index.js */ \"./node_modules/date-fns/format/index.js\"),\n  getDate: __webpack_require__(/*! ./get_date/index.js */ \"./node_modules/date-fns/get_date/index.js\"),\n  getDay: __webpack_require__(/*! ./get_day/index.js */ \"./node_modules/date-fns/get_day/index.js\"),\n  getDayOfYear: __webpack_require__(/*! ./get_day_of_year/index.js */ \"./node_modules/date-fns/get_day_of_year/index.js\"),\n  getDaysInMonth: __webpack_require__(/*! ./get_days_in_month/index.js */ \"./node_modules/date-fns/get_days_in_month/index.js\"),\n  getDaysInYear: __webpack_require__(/*! ./get_days_in_year/index.js */ \"./node_modules/date-fns/get_days_in_year/index.js\"),\n  getHours: __webpack_require__(/*! ./get_hours/index.js */ \"./node_modules/date-fns/get_hours/index.js\"),\n  getISODay: __webpack_require__(/*! ./get_iso_day/index.js */ \"./node_modules/date-fns/get_iso_day/index.js\"),\n  getISOWeek: __webpack_require__(/*! ./get_iso_week/index.js */ \"./node_modules/date-fns/get_iso_week/index.js\"),\n  getISOWeeksInYear: __webpack_require__(/*! ./get_iso_weeks_in_year/index.js */ \"./node_modules/date-fns/get_iso_weeks_in_year/index.js\"),\n  getISOYear: __webpack_require__(/*! ./get_iso_year/index.js */ \"./node_modules/date-fns/get_iso_year/index.js\"),\n  getMilliseconds: __webpack_require__(/*! ./get_milliseconds/index.js */ \"./node_modules/date-fns/get_milliseconds/index.js\"),\n  getMinutes: __webpack_require__(/*! ./get_minutes/index.js */ \"./node_modules/date-fns/get_minutes/index.js\"),\n  getMonth: __webpack_require__(/*! ./get_month/index.js */ \"./node_modules/date-fns/get_month/index.js\"),\n  getOverlappingDaysInRanges: __webpack_require__(/*! ./get_overlapping_days_in_ranges/index.js */ \"./node_modules/date-fns/get_overlapping_days_in_ranges/index.js\"),\n  getQuarter: __webpack_require__(/*! ./get_quarter/index.js */ \"./node_modules/date-fns/get_quarter/index.js\"),\n  getSeconds: __webpack_require__(/*! ./get_seconds/index.js */ \"./node_modules/date-fns/get_seconds/index.js\"),\n  getTime: __webpack_require__(/*! ./get_time/index.js */ \"./node_modules/date-fns/get_time/index.js\"),\n  getYear: __webpack_require__(/*! ./get_year/index.js */ \"./node_modules/date-fns/get_year/index.js\"),\n  isAfter: __webpack_require__(/*! ./is_after/index.js */ \"./node_modules/date-fns/is_after/index.js\"),\n  isBefore: __webpack_require__(/*! ./is_before/index.js */ \"./node_modules/date-fns/is_before/index.js\"),\n  isDate: __webpack_require__(/*! ./is_date/index.js */ \"./node_modules/date-fns/is_date/index.js\"),\n  isEqual: __webpack_require__(/*! ./is_equal/index.js */ \"./node_modules/date-fns/is_equal/index.js\"),\n  isFirstDayOfMonth: __webpack_require__(/*! ./is_first_day_of_month/index.js */ \"./node_modules/date-fns/is_first_day_of_month/index.js\"),\n  isFriday: __webpack_require__(/*! ./is_friday/index.js */ \"./node_modules/date-fns/is_friday/index.js\"),\n  isFuture: __webpack_require__(/*! ./is_future/index.js */ \"./node_modules/date-fns/is_future/index.js\"),\n  isLastDayOfMonth: __webpack_require__(/*! ./is_last_day_of_month/index.js */ \"./node_modules/date-fns/is_last_day_of_month/index.js\"),\n  isLeapYear: __webpack_require__(/*! ./is_leap_year/index.js */ \"./node_modules/date-fns/is_leap_year/index.js\"),\n  isMonday: __webpack_require__(/*! ./is_monday/index.js */ \"./node_modules/date-fns/is_monday/index.js\"),\n  isPast: __webpack_require__(/*! ./is_past/index.js */ \"./node_modules/date-fns/is_past/index.js\"),\n  isSameDay: __webpack_require__(/*! ./is_same_day/index.js */ \"./node_modules/date-fns/is_same_day/index.js\"),\n  isSameHour: __webpack_require__(/*! ./is_same_hour/index.js */ \"./node_modules/date-fns/is_same_hour/index.js\"),\n  isSameISOWeek: __webpack_require__(/*! ./is_same_iso_week/index.js */ \"./node_modules/date-fns/is_same_iso_week/index.js\"),\n  isSameISOYear: __webpack_require__(/*! ./is_same_iso_year/index.js */ \"./node_modules/date-fns/is_same_iso_year/index.js\"),\n  isSameMinute: __webpack_require__(/*! ./is_same_minute/index.js */ \"./node_modules/date-fns/is_same_minute/index.js\"),\n  isSameMonth: __webpack_require__(/*! ./is_same_month/index.js */ \"./node_modules/date-fns/is_same_month/index.js\"),\n  isSameQuarter: __webpack_require__(/*! ./is_same_quarter/index.js */ \"./node_modules/date-fns/is_same_quarter/index.js\"),\n  isSameSecond: __webpack_require__(/*! ./is_same_second/index.js */ \"./node_modules/date-fns/is_same_second/index.js\"),\n  isSameWeek: __webpack_require__(/*! ./is_same_week/index.js */ \"./node_modules/date-fns/is_same_week/index.js\"),\n  isSameYear: __webpack_require__(/*! ./is_same_year/index.js */ \"./node_modules/date-fns/is_same_year/index.js\"),\n  isSaturday: __webpack_require__(/*! ./is_saturday/index.js */ \"./node_modules/date-fns/is_saturday/index.js\"),\n  isSunday: __webpack_require__(/*! ./is_sunday/index.js */ \"./node_modules/date-fns/is_sunday/index.js\"),\n  isThisHour: __webpack_require__(/*! ./is_this_hour/index.js */ \"./node_modules/date-fns/is_this_hour/index.js\"),\n  isThisISOWeek: __webpack_require__(/*! ./is_this_iso_week/index.js */ \"./node_modules/date-fns/is_this_iso_week/index.js\"),\n  isThisISOYear: __webpack_require__(/*! ./is_this_iso_year/index.js */ \"./node_modules/date-fns/is_this_iso_year/index.js\"),\n  isThisMinute: __webpack_require__(/*! ./is_this_minute/index.js */ \"./node_modules/date-fns/is_this_minute/index.js\"),\n  isThisMonth: __webpack_require__(/*! ./is_this_month/index.js */ \"./node_modules/date-fns/is_this_month/index.js\"),\n  isThisQuarter: __webpack_require__(/*! ./is_this_quarter/index.js */ \"./node_modules/date-fns/is_this_quarter/index.js\"),\n  isThisSecond: __webpack_require__(/*! ./is_this_second/index.js */ \"./node_modules/date-fns/is_this_second/index.js\"),\n  isThisWeek: __webpack_require__(/*! ./is_this_week/index.js */ \"./node_modules/date-fns/is_this_week/index.js\"),\n  isThisYear: __webpack_require__(/*! ./is_this_year/index.js */ \"./node_modules/date-fns/is_this_year/index.js\"),\n  isThursday: __webpack_require__(/*! ./is_thursday/index.js */ \"./node_modules/date-fns/is_thursday/index.js\"),\n  isToday: __webpack_require__(/*! ./is_today/index.js */ \"./node_modules/date-fns/is_today/index.js\"),\n  isTomorrow: __webpack_require__(/*! ./is_tomorrow/index.js */ \"./node_modules/date-fns/is_tomorrow/index.js\"),\n  isTuesday: __webpack_require__(/*! ./is_tuesday/index.js */ \"./node_modules/date-fns/is_tuesday/index.js\"),\n  isValid: __webpack_require__(/*! ./is_valid/index.js */ \"./node_modules/date-fns/is_valid/index.js\"),\n  isWednesday: __webpack_require__(/*! ./is_wednesday/index.js */ \"./node_modules/date-fns/is_wednesday/index.js\"),\n  isWeekend: __webpack_require__(/*! ./is_weekend/index.js */ \"./node_modules/date-fns/is_weekend/index.js\"),\n  isWithinRange: __webpack_require__(/*! ./is_within_range/index.js */ \"./node_modules/date-fns/is_within_range/index.js\"),\n  isYesterday: __webpack_require__(/*! ./is_yesterday/index.js */ \"./node_modules/date-fns/is_yesterday/index.js\"),\n  lastDayOfISOWeek: __webpack_require__(/*! ./last_day_of_iso_week/index.js */ \"./node_modules/date-fns/last_day_of_iso_week/index.js\"),\n  lastDayOfISOYear: __webpack_require__(/*! ./last_day_of_iso_year/index.js */ \"./node_modules/date-fns/last_day_of_iso_year/index.js\"),\n  lastDayOfMonth: __webpack_require__(/*! ./last_day_of_month/index.js */ \"./node_modules/date-fns/last_day_of_month/index.js\"),\n  lastDayOfQuarter: __webpack_require__(/*! ./last_day_of_quarter/index.js */ \"./node_modules/date-fns/last_day_of_quarter/index.js\"),\n  lastDayOfWeek: __webpack_require__(/*! ./last_day_of_week/index.js */ \"./node_modules/date-fns/last_day_of_week/index.js\"),\n  lastDayOfYear: __webpack_require__(/*! ./last_day_of_year/index.js */ \"./node_modules/date-fns/last_day_of_year/index.js\"),\n  max: __webpack_require__(/*! ./max/index.js */ \"./node_modules/date-fns/max/index.js\"),\n  min: __webpack_require__(/*! ./min/index.js */ \"./node_modules/date-fns/min/index.js\"),\n  parse: __webpack_require__(/*! ./parse/index.js */ \"./node_modules/date-fns/parse/index.js\"),\n  setDate: __webpack_require__(/*! ./set_date/index.js */ \"./node_modules/date-fns/set_date/index.js\"),\n  setDay: __webpack_require__(/*! ./set_day/index.js */ \"./node_modules/date-fns/set_day/index.js\"),\n  setDayOfYear: __webpack_require__(/*! ./set_day_of_year/index.js */ \"./node_modules/date-fns/set_day_of_year/index.js\"),\n  setHours: __webpack_require__(/*! ./set_hours/index.js */ \"./node_modules/date-fns/set_hours/index.js\"),\n  setISODay: __webpack_require__(/*! ./set_iso_day/index.js */ \"./node_modules/date-fns/set_iso_day/index.js\"),\n  setISOWeek: __webpack_require__(/*! ./set_iso_week/index.js */ \"./node_modules/date-fns/set_iso_week/index.js\"),\n  setISOYear: __webpack_require__(/*! ./set_iso_year/index.js */ \"./node_modules/date-fns/set_iso_year/index.js\"),\n  setMilliseconds: __webpack_require__(/*! ./set_milliseconds/index.js */ \"./node_modules/date-fns/set_milliseconds/index.js\"),\n  setMinutes: __webpack_require__(/*! ./set_minutes/index.js */ \"./node_modules/date-fns/set_minutes/index.js\"),\n  setMonth: __webpack_require__(/*! ./set_month/index.js */ \"./node_modules/date-fns/set_month/index.js\"),\n  setQuarter: __webpack_require__(/*! ./set_quarter/index.js */ \"./node_modules/date-fns/set_quarter/index.js\"),\n  setSeconds: __webpack_require__(/*! ./set_seconds/index.js */ \"./node_modules/date-fns/set_seconds/index.js\"),\n  setYear: __webpack_require__(/*! ./set_year/index.js */ \"./node_modules/date-fns/set_year/index.js\"),\n  startOfDay: __webpack_require__(/*! ./start_of_day/index.js */ \"./node_modules/date-fns/start_of_day/index.js\"),\n  startOfHour: __webpack_require__(/*! ./start_of_hour/index.js */ \"./node_modules/date-fns/start_of_hour/index.js\"),\n  startOfISOWeek: __webpack_require__(/*! ./start_of_iso_week/index.js */ \"./node_modules/date-fns/start_of_iso_week/index.js\"),\n  startOfISOYear: __webpack_require__(/*! ./start_of_iso_year/index.js */ \"./node_modules/date-fns/start_of_iso_year/index.js\"),\n  startOfMinute: __webpack_require__(/*! ./start_of_minute/index.js */ \"./node_modules/date-fns/start_of_minute/index.js\"),\n  startOfMonth: __webpack_require__(/*! ./start_of_month/index.js */ \"./node_modules/date-fns/start_of_month/index.js\"),\n  startOfQuarter: __webpack_require__(/*! ./start_of_quarter/index.js */ \"./node_modules/date-fns/start_of_quarter/index.js\"),\n  startOfSecond: __webpack_require__(/*! ./start_of_second/index.js */ \"./node_modules/date-fns/start_of_second/index.js\"),\n  startOfToday: __webpack_require__(/*! ./start_of_today/index.js */ \"./node_modules/date-fns/start_of_today/index.js\"),\n  startOfTomorrow: __webpack_require__(/*! ./start_of_tomorrow/index.js */ \"./node_modules/date-fns/start_of_tomorrow/index.js\"),\n  startOfWeek: __webpack_require__(/*! ./start_of_week/index.js */ \"./node_modules/date-fns/start_of_week/index.js\"),\n  startOfYear: __webpack_require__(/*! ./start_of_year/index.js */ \"./node_modules/date-fns/start_of_year/index.js\"),\n  startOfYesterday: __webpack_require__(/*! ./start_of_yesterday/index.js */ \"./node_modules/date-fns/start_of_yesterday/index.js\"),\n  subDays: __webpack_require__(/*! ./sub_days/index.js */ \"./node_modules/date-fns/sub_days/index.js\"),\n  subHours: __webpack_require__(/*! ./sub_hours/index.js */ \"./node_modules/date-fns/sub_hours/index.js\"),\n  subISOYears: __webpack_require__(/*! ./sub_iso_years/index.js */ \"./node_modules/date-fns/sub_iso_years/index.js\"),\n  subMilliseconds: __webpack_require__(/*! ./sub_milliseconds/index.js */ \"./node_modules/date-fns/sub_milliseconds/index.js\"),\n  subMinutes: __webpack_require__(/*! ./sub_minutes/index.js */ \"./node_modules/date-fns/sub_minutes/index.js\"),\n  subMonths: __webpack_require__(/*! ./sub_months/index.js */ \"./node_modules/date-fns/sub_months/index.js\"),\n  subQuarters: __webpack_require__(/*! ./sub_quarters/index.js */ \"./node_modules/date-fns/sub_quarters/index.js\"),\n  subSeconds: __webpack_require__(/*! ./sub_seconds/index.js */ \"./node_modules/date-fns/sub_seconds/index.js\"),\n  subWeeks: __webpack_require__(/*! ./sub_weeks/index.js */ \"./node_modules/date-fns/sub_weeks/index.js\"),\n  subYears: __webpack_require__(/*! ./sub_years/index.js */ \"./node_modules/date-fns/sub_years/index.js\")\n}\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_after/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/is_after/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Is the first date after the second one?\n *\n * @description\n * Is the first date after the second one?\n *\n * @param {Date|String|Number} date - the date that should be after the other one to return true\n * @param {Date|String|Number} dateToCompare - the date to compare with\n * @returns {Boolean} the first date is after the second date\n *\n * @example\n * // Is 10 July 1989 after 11 February 1987?\n * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))\n * //=> true\n */\nfunction isAfter (dirtyDate, dirtyDateToCompare) {\n  var date = parse(dirtyDate)\n  var dateToCompare = parse(dirtyDateToCompare)\n  return date.getTime() > dateToCompare.getTime()\n}\n\nmodule.exports = isAfter\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_after/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_before/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/is_before/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Is the first date before the second one?\n *\n * @description\n * Is the first date before the second one?\n *\n * @param {Date|String|Number} date - the date that should be before the other one to return true\n * @param {Date|String|Number} dateToCompare - the date to compare with\n * @returns {Boolean} the first date is before the second date\n *\n * @example\n * // Is 10 July 1989 before 11 February 1987?\n * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))\n * //=> false\n */\nfunction isBefore (dirtyDate, dirtyDateToCompare) {\n  var date = parse(dirtyDate)\n  var dateToCompare = parse(dirtyDateToCompare)\n  return date.getTime() < dateToCompare.getTime()\n}\n\nmodule.exports = isBefore\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_before/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_date/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/is_date/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @category Common Helpers\n * @summary Is the given argument an instance of Date?\n *\n * @description\n * Is the given argument an instance of Date?\n *\n * @param {*} argument - the argument to check\n * @returns {Boolean} the given argument is an instance of Date\n *\n * @example\n * // Is 'mayonnaise' a Date?\n * var result = isDate('mayonnaise')\n * //=> false\n */\nfunction isDate (argument) {\n  return argument instanceof Date\n}\n\nmodule.exports = isDate\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_date/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_equal/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/is_equal/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Are the given dates equal?\n *\n * @description\n * Are the given dates equal?\n *\n * @param {Date|String|Number} dateLeft - the first date to compare\n * @param {Date|String|Number} dateRight - the second date to compare\n * @returns {Boolean} the dates are equal\n *\n * @example\n * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?\n * var result = isEqual(\n *   new Date(2014, 6, 2, 6, 30, 45, 0)\n *   new Date(2014, 6, 2, 6, 30, 45, 500)\n * )\n * //=> false\n */\nfunction isEqual (dirtyLeftDate, dirtyRightDate) {\n  var dateLeft = parse(dirtyLeftDate)\n  var dateRight = parse(dirtyRightDate)\n  return dateLeft.getTime() === dateRight.getTime()\n}\n\nmodule.exports = isEqual\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_equal/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_first_day_of_month/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/is_first_day_of_month/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Is the given date the first day of a month?\n *\n * @description\n * Is the given date the first day of a month?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is the first day of a month\n *\n * @example\n * // Is 1 September 2014 the first day of a month?\n * var result = isFirstDayOfMonth(new Date(2014, 8, 1))\n * //=> true\n */\nfunction isFirstDayOfMonth (dirtyDate) {\n  return parse(dirtyDate).getDate() === 1\n}\n\nmodule.exports = isFirstDayOfMonth\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_first_day_of_month/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_friday/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/is_friday/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Is the given date Friday?\n *\n * @description\n * Is the given date Friday?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is Friday\n *\n * @example\n * // Is 26 September 2014 Friday?\n * var result = isFriday(new Date(2014, 8, 26))\n * //=> true\n */\nfunction isFriday (dirtyDate) {\n  return parse(dirtyDate).getDay() === 5\n}\n\nmodule.exports = isFriday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_friday/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_future/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/is_future/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Is the given date in the future?\n *\n * @description\n * Is the given date in the future?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in the future\n *\n * @example\n * // If today is 6 October 2014, is 31 December 2014 in the future?\n * var result = isFuture(new Date(2014, 11, 31))\n * //=> true\n */\nfunction isFuture (dirtyDate) {\n  return parse(dirtyDate).getTime() > new Date().getTime()\n}\n\nmodule.exports = isFuture\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_future/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_last_day_of_month/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/is_last_day_of_month/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar endOfDay = __webpack_require__(/*! ../end_of_day/index.js */ \"./node_modules/date-fns/end_of_day/index.js\")\nvar endOfMonth = __webpack_require__(/*! ../end_of_month/index.js */ \"./node_modules/date-fns/end_of_month/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Is the given date the last day of a month?\n *\n * @description\n * Is the given date the last day of a month?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is the last day of a month\n *\n * @example\n * // Is 28 February 2014 the last day of a month?\n * var result = isLastDayOfMonth(new Date(2014, 1, 28))\n * //=> true\n */\nfunction isLastDayOfMonth (dirtyDate) {\n  var date = parse(dirtyDate)\n  return endOfDay(date).getTime() === endOfMonth(date).getTime()\n}\n\nmodule.exports = isLastDayOfMonth\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_last_day_of_month/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_leap_year/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_leap_year/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Is the given date in the leap year?\n *\n * @description\n * Is the given date in the leap year?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in the leap year\n *\n * @example\n * // Is 1 September 2012 in the leap year?\n * var result = isLeapYear(new Date(2012, 8, 1))\n * //=> true\n */\nfunction isLeapYear (dirtyDate) {\n  var date = parse(dirtyDate)\n  var year = date.getFullYear()\n  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0\n}\n\nmodule.exports = isLeapYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_leap_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_monday/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/is_monday/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Is the given date Monday?\n *\n * @description\n * Is the given date Monday?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is Monday\n *\n * @example\n * // Is 22 September 2014 Monday?\n * var result = isMonday(new Date(2014, 8, 22))\n * //=> true\n */\nfunction isMonday (dirtyDate) {\n  return parse(dirtyDate).getDay() === 1\n}\n\nmodule.exports = isMonday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_monday/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_past/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/is_past/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Is the given date in the past?\n *\n * @description\n * Is the given date in the past?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in the past\n *\n * @example\n * // If today is 6 October 2014, is 2 July 2014 in the past?\n * var result = isPast(new Date(2014, 6, 2))\n * //=> true\n */\nfunction isPast (dirtyDate) {\n  return parse(dirtyDate).getTime() < new Date().getTime()\n}\n\nmodule.exports = isPast\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_past/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_same_day/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/is_same_day/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ \"./node_modules/date-fns/start_of_day/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Are the given dates in the same day?\n *\n * @description\n * Are the given dates in the same day?\n *\n * @param {Date|String|Number} dateLeft - the first date to check\n * @param {Date|String|Number} dateRight - the second date to check\n * @returns {Boolean} the dates are in the same day\n *\n * @example\n * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?\n * var result = isSameDay(\n *   new Date(2014, 8, 4, 6, 0),\n *   new Date(2014, 8, 4, 18, 0)\n * )\n * //=> true\n */\nfunction isSameDay (dirtyDateLeft, dirtyDateRight) {\n  var dateLeftStartOfDay = startOfDay(dirtyDateLeft)\n  var dateRightStartOfDay = startOfDay(dirtyDateRight)\n\n  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()\n}\n\nmodule.exports = isSameDay\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_same_day/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_same_hour/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_same_hour/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfHour = __webpack_require__(/*! ../start_of_hour/index.js */ \"./node_modules/date-fns/start_of_hour/index.js\")\n\n/**\n * @category Hour Helpers\n * @summary Are the given dates in the same hour?\n *\n * @description\n * Are the given dates in the same hour?\n *\n * @param {Date|String|Number} dateLeft - the first date to check\n * @param {Date|String|Number} dateRight - the second date to check\n * @returns {Boolean} the dates are in the same hour\n *\n * @example\n * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?\n * var result = isSameHour(\n *   new Date(2014, 8, 4, 6, 0),\n *   new Date(2014, 8, 4, 6, 30)\n * )\n * //=> true\n */\nfunction isSameHour (dirtyDateLeft, dirtyDateRight) {\n  var dateLeftStartOfHour = startOfHour(dirtyDateLeft)\n  var dateRightStartOfHour = startOfHour(dirtyDateRight)\n\n  return dateLeftStartOfHour.getTime() === dateRightStartOfHour.getTime()\n}\n\nmodule.exports = isSameHour\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_same_hour/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_same_iso_week/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/is_same_iso_week/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSameWeek = __webpack_require__(/*! ../is_same_week/index.js */ \"./node_modules/date-fns/is_same_week/index.js\")\n\n/**\n * @category ISO Week Helpers\n * @summary Are the given dates in the same ISO week?\n *\n * @description\n * Are the given dates in the same ISO week?\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} dateLeft - the first date to check\n * @param {Date|String|Number} dateRight - the second date to check\n * @returns {Boolean} the dates are in the same ISO week\n *\n * @example\n * // Are 1 September 2014 and 7 September 2014 in the same ISO week?\n * var result = isSameISOWeek(\n *   new Date(2014, 8, 1),\n *   new Date(2014, 8, 7)\n * )\n * //=> true\n */\nfunction isSameISOWeek (dirtyDateLeft, dirtyDateRight) {\n  return isSameWeek(dirtyDateLeft, dirtyDateRight, {weekStartsOn: 1})\n}\n\nmodule.exports = isSameISOWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_same_iso_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_same_iso_year/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/is_same_iso_year/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfISOYear = __webpack_require__(/*! ../start_of_iso_year/index.js */ \"./node_modules/date-fns/start_of_iso_year/index.js\")\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Are the given dates in the same ISO week-numbering year?\n *\n * @description\n * Are the given dates in the same ISO week-numbering year?\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} dateLeft - the first date to check\n * @param {Date|String|Number} dateRight - the second date to check\n * @returns {Boolean} the dates are in the same ISO week-numbering year\n *\n * @example\n * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?\n * var result = isSameISOYear(\n *   new Date(2003, 11, 29),\n *   new Date(2005, 0, 2)\n * )\n * //=> true\n */\nfunction isSameISOYear (dirtyDateLeft, dirtyDateRight) {\n  var dateLeftStartOfYear = startOfISOYear(dirtyDateLeft)\n  var dateRightStartOfYear = startOfISOYear(dirtyDateRight)\n\n  return dateLeftStartOfYear.getTime() === dateRightStartOfYear.getTime()\n}\n\nmodule.exports = isSameISOYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_same_iso_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_same_minute/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/is_same_minute/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfMinute = __webpack_require__(/*! ../start_of_minute/index.js */ \"./node_modules/date-fns/start_of_minute/index.js\")\n\n/**\n * @category Minute Helpers\n * @summary Are the given dates in the same minute?\n *\n * @description\n * Are the given dates in the same minute?\n *\n * @param {Date|String|Number} dateLeft - the first date to check\n * @param {Date|String|Number} dateRight - the second date to check\n * @returns {Boolean} the dates are in the same minute\n *\n * @example\n * // Are 4 September 2014 06:30:00 and 4 September 2014 06:30:15\n * // in the same minute?\n * var result = isSameMinute(\n *   new Date(2014, 8, 4, 6, 30),\n *   new Date(2014, 8, 4, 6, 30, 15)\n * )\n * //=> true\n */\nfunction isSameMinute (dirtyDateLeft, dirtyDateRight) {\n  var dateLeftStartOfMinute = startOfMinute(dirtyDateLeft)\n  var dateRightStartOfMinute = startOfMinute(dirtyDateRight)\n\n  return dateLeftStartOfMinute.getTime() === dateRightStartOfMinute.getTime()\n}\n\nmodule.exports = isSameMinute\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_same_minute/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_same_month/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/is_same_month/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Are the given dates in the same month?\n *\n * @description\n * Are the given dates in the same month?\n *\n * @param {Date|String|Number} dateLeft - the first date to check\n * @param {Date|String|Number} dateRight - the second date to check\n * @returns {Boolean} the dates are in the same month\n *\n * @example\n * // Are 2 September 2014 and 25 September 2014 in the same month?\n * var result = isSameMonth(\n *   new Date(2014, 8, 2),\n *   new Date(2014, 8, 25)\n * )\n * //=> true\n */\nfunction isSameMonth (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var dateRight = parse(dirtyDateRight)\n  return dateLeft.getFullYear() === dateRight.getFullYear() &&\n    dateLeft.getMonth() === dateRight.getMonth()\n}\n\nmodule.exports = isSameMonth\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_same_month/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_same_quarter/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/is_same_quarter/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfQuarter = __webpack_require__(/*! ../start_of_quarter/index.js */ \"./node_modules/date-fns/start_of_quarter/index.js\")\n\n/**\n * @category Quarter Helpers\n * @summary Are the given dates in the same year quarter?\n *\n * @description\n * Are the given dates in the same year quarter?\n *\n * @param {Date|String|Number} dateLeft - the first date to check\n * @param {Date|String|Number} dateRight - the second date to check\n * @returns {Boolean} the dates are in the same quarter\n *\n * @example\n * // Are 1 January 2014 and 8 March 2014 in the same quarter?\n * var result = isSameQuarter(\n *   new Date(2014, 0, 1),\n *   new Date(2014, 2, 8)\n * )\n * //=> true\n */\nfunction isSameQuarter (dirtyDateLeft, dirtyDateRight) {\n  var dateLeftStartOfQuarter = startOfQuarter(dirtyDateLeft)\n  var dateRightStartOfQuarter = startOfQuarter(dirtyDateRight)\n\n  return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime()\n}\n\nmodule.exports = isSameQuarter\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_same_quarter/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_same_second/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/is_same_second/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfSecond = __webpack_require__(/*! ../start_of_second/index.js */ \"./node_modules/date-fns/start_of_second/index.js\")\n\n/**\n * @category Second Helpers\n * @summary Are the given dates in the same second?\n *\n * @description\n * Are the given dates in the same second?\n *\n * @param {Date|String|Number} dateLeft - the first date to check\n * @param {Date|String|Number} dateRight - the second date to check\n * @returns {Boolean} the dates are in the same second\n *\n * @example\n * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500\n * // in the same second?\n * var result = isSameSecond(\n *   new Date(2014, 8, 4, 6, 30, 15),\n *   new Date(2014, 8, 4, 6, 30, 15, 500)\n * )\n * //=> true\n */\nfunction isSameSecond (dirtyDateLeft, dirtyDateRight) {\n  var dateLeftStartOfSecond = startOfSecond(dirtyDateLeft)\n  var dateRightStartOfSecond = startOfSecond(dirtyDateRight)\n\n  return dateLeftStartOfSecond.getTime() === dateRightStartOfSecond.getTime()\n}\n\nmodule.exports = isSameSecond\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_same_second/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_same_week/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_same_week/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfWeek = __webpack_require__(/*! ../start_of_week/index.js */ \"./node_modules/date-fns/start_of_week/index.js\")\n\n/**\n * @category Week Helpers\n * @summary Are the given dates in the same week?\n *\n * @description\n * Are the given dates in the same week?\n *\n * @param {Date|String|Number} dateLeft - the first date to check\n * @param {Date|String|Number} dateRight - the second date to check\n * @param {Object} [options] - the object with options\n * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)\n * @returns {Boolean} the dates are in the same week\n *\n * @example\n * // Are 31 August 2014 and 4 September 2014 in the same week?\n * var result = isSameWeek(\n *   new Date(2014, 7, 31),\n *   new Date(2014, 8, 4)\n * )\n * //=> true\n *\n * @example\n * // If week starts with Monday,\n * // are 31 August 2014 and 4 September 2014 in the same week?\n * var result = isSameWeek(\n *   new Date(2014, 7, 31),\n *   new Date(2014, 8, 4),\n *   {weekStartsOn: 1}\n * )\n * //=> false\n */\nfunction isSameWeek (dirtyDateLeft, dirtyDateRight, dirtyOptions) {\n  var dateLeftStartOfWeek = startOfWeek(dirtyDateLeft, dirtyOptions)\n  var dateRightStartOfWeek = startOfWeek(dirtyDateRight, dirtyOptions)\n\n  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime()\n}\n\nmodule.exports = isSameWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_same_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_same_year/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_same_year/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Are the given dates in the same year?\n *\n * @description\n * Are the given dates in the same year?\n *\n * @param {Date|String|Number} dateLeft - the first date to check\n * @param {Date|String|Number} dateRight - the second date to check\n * @returns {Boolean} the dates are in the same year\n *\n * @example\n * // Are 2 September 2014 and 25 September 2014 in the same year?\n * var result = isSameYear(\n *   new Date(2014, 8, 2),\n *   new Date(2014, 8, 25)\n * )\n * //=> true\n */\nfunction isSameYear (dirtyDateLeft, dirtyDateRight) {\n  var dateLeft = parse(dirtyDateLeft)\n  var dateRight = parse(dirtyDateRight)\n  return dateLeft.getFullYear() === dateRight.getFullYear()\n}\n\nmodule.exports = isSameYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_same_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_saturday/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/is_saturday/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Is the given date Saturday?\n *\n * @description\n * Is the given date Saturday?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is Saturday\n *\n * @example\n * // Is 27 September 2014 Saturday?\n * var result = isSaturday(new Date(2014, 8, 27))\n * //=> true\n */\nfunction isSaturday (dirtyDate) {\n  return parse(dirtyDate).getDay() === 6\n}\n\nmodule.exports = isSaturday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_saturday/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_sunday/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/is_sunday/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Is the given date Sunday?\n *\n * @description\n * Is the given date Sunday?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is Sunday\n *\n * @example\n * // Is 21 September 2014 Sunday?\n * var result = isSunday(new Date(2014, 8, 21))\n * //=> true\n */\nfunction isSunday (dirtyDate) {\n  return parse(dirtyDate).getDay() === 0\n}\n\nmodule.exports = isSunday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_sunday/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_this_hour/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_this_hour/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSameHour = __webpack_require__(/*! ../is_same_hour/index.js */ \"./node_modules/date-fns/is_same_hour/index.js\")\n\n/**\n * @category Hour Helpers\n * @summary Is the given date in the same hour as the current date?\n *\n * @description\n * Is the given date in the same hour as the current date?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in this hour\n *\n * @example\n * // If now is 25 September 2014 18:30:15.500,\n * // is 25 September 2014 18:00:00 in this hour?\n * var result = isThisHour(new Date(2014, 8, 25, 18))\n * //=> true\n */\nfunction isThisHour (dirtyDate) {\n  return isSameHour(new Date(), dirtyDate)\n}\n\nmodule.exports = isThisHour\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_this_hour/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_this_iso_week/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/is_this_iso_week/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSameISOWeek = __webpack_require__(/*! ../is_same_iso_week/index.js */ \"./node_modules/date-fns/is_same_iso_week/index.js\")\n\n/**\n * @category ISO Week Helpers\n * @summary Is the given date in the same ISO week as the current date?\n *\n * @description\n * Is the given date in the same ISO week as the current date?\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in this ISO week\n *\n * @example\n * // If today is 25 September 2014, is 22 September 2014 in this ISO week?\n * var result = isThisISOWeek(new Date(2014, 8, 22))\n * //=> true\n */\nfunction isThisISOWeek (dirtyDate) {\n  return isSameISOWeek(new Date(), dirtyDate)\n}\n\nmodule.exports = isThisISOWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_this_iso_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_this_iso_year/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/is_this_iso_year/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSameISOYear = __webpack_require__(/*! ../is_same_iso_year/index.js */ \"./node_modules/date-fns/is_same_iso_year/index.js\")\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Is the given date in the same ISO week-numbering year as the current date?\n *\n * @description\n * Is the given date in the same ISO week-numbering year as the current date?\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in this ISO week-numbering year\n *\n * @example\n * // If today is 25 September 2014,\n * // is 30 December 2013 in this ISO week-numbering year?\n * var result = isThisISOYear(new Date(2013, 11, 30))\n * //=> true\n */\nfunction isThisISOYear (dirtyDate) {\n  return isSameISOYear(new Date(), dirtyDate)\n}\n\nmodule.exports = isThisISOYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_this_iso_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_this_minute/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/is_this_minute/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSameMinute = __webpack_require__(/*! ../is_same_minute/index.js */ \"./node_modules/date-fns/is_same_minute/index.js\")\n\n/**\n * @category Minute Helpers\n * @summary Is the given date in the same minute as the current date?\n *\n * @description\n * Is the given date in the same minute as the current date?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in this minute\n *\n * @example\n * // If now is 25 September 2014 18:30:15.500,\n * // is 25 September 2014 18:30:00 in this minute?\n * var result = isThisMinute(new Date(2014, 8, 25, 18, 30))\n * //=> true\n */\nfunction isThisMinute (dirtyDate) {\n  return isSameMinute(new Date(), dirtyDate)\n}\n\nmodule.exports = isThisMinute\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_this_minute/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_this_month/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/is_this_month/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSameMonth = __webpack_require__(/*! ../is_same_month/index.js */ \"./node_modules/date-fns/is_same_month/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Is the given date in the same month as the current date?\n *\n * @description\n * Is the given date in the same month as the current date?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in this month\n *\n * @example\n * // If today is 25 September 2014, is 15 September 2014 in this month?\n * var result = isThisMonth(new Date(2014, 8, 15))\n * //=> true\n */\nfunction isThisMonth (dirtyDate) {\n  return isSameMonth(new Date(), dirtyDate)\n}\n\nmodule.exports = isThisMonth\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_this_month/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_this_quarter/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/is_this_quarter/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSameQuarter = __webpack_require__(/*! ../is_same_quarter/index.js */ \"./node_modules/date-fns/is_same_quarter/index.js\")\n\n/**\n * @category Quarter Helpers\n * @summary Is the given date in the same quarter as the current date?\n *\n * @description\n * Is the given date in the same quarter as the current date?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in this quarter\n *\n * @example\n * // If today is 25 September 2014, is 2 July 2014 in this quarter?\n * var result = isThisQuarter(new Date(2014, 6, 2))\n * //=> true\n */\nfunction isThisQuarter (dirtyDate) {\n  return isSameQuarter(new Date(), dirtyDate)\n}\n\nmodule.exports = isThisQuarter\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_this_quarter/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_this_second/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/is_this_second/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSameSecond = __webpack_require__(/*! ../is_same_second/index.js */ \"./node_modules/date-fns/is_same_second/index.js\")\n\n/**\n * @category Second Helpers\n * @summary Is the given date in the same second as the current date?\n *\n * @description\n * Is the given date in the same second as the current date?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in this second\n *\n * @example\n * // If now is 25 September 2014 18:30:15.500,\n * // is 25 September 2014 18:30:15.000 in this second?\n * var result = isThisSecond(new Date(2014, 8, 25, 18, 30, 15))\n * //=> true\n */\nfunction isThisSecond (dirtyDate) {\n  return isSameSecond(new Date(), dirtyDate)\n}\n\nmodule.exports = isThisSecond\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_this_second/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_this_week/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_this_week/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSameWeek = __webpack_require__(/*! ../is_same_week/index.js */ \"./node_modules/date-fns/is_same_week/index.js\")\n\n/**\n * @category Week Helpers\n * @summary Is the given date in the same week as the current date?\n *\n * @description\n * Is the given date in the same week as the current date?\n *\n * @param {Date|String|Number} date - the date to check\n * @param {Object} [options] - the object with options\n * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)\n * @returns {Boolean} the date is in this week\n *\n * @example\n * // If today is 25 September 2014, is 21 September 2014 in this week?\n * var result = isThisWeek(new Date(2014, 8, 21))\n * //=> true\n *\n * @example\n * // If today is 25 September 2014 and week starts with Monday\n * // is 21 September 2014 in this week?\n * var result = isThisWeek(new Date(2014, 8, 21), {weekStartsOn: 1})\n * //=> false\n */\nfunction isThisWeek (dirtyDate, dirtyOptions) {\n  return isSameWeek(new Date(), dirtyDate, dirtyOptions)\n}\n\nmodule.exports = isThisWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_this_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_this_year/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_this_year/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSameYear = __webpack_require__(/*! ../is_same_year/index.js */ \"./node_modules/date-fns/is_same_year/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Is the given date in the same year as the current date?\n *\n * @description\n * Is the given date in the same year as the current date?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in this year\n *\n * @example\n * // If today is 25 September 2014, is 2 July 2014 in this year?\n * var result = isThisYear(new Date(2014, 6, 2))\n * //=> true\n */\nfunction isThisYear (dirtyDate) {\n  return isSameYear(new Date(), dirtyDate)\n}\n\nmodule.exports = isThisYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_this_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_thursday/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/is_thursday/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Is the given date Thursday?\n *\n * @description\n * Is the given date Thursday?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is Thursday\n *\n * @example\n * // Is 25 September 2014 Thursday?\n * var result = isThursday(new Date(2014, 8, 25))\n * //=> true\n */\nfunction isThursday (dirtyDate) {\n  return parse(dirtyDate).getDay() === 4\n}\n\nmodule.exports = isThursday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_thursday/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_today/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/is_today/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ \"./node_modules/date-fns/start_of_day/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Is the given date today?\n *\n * @description\n * Is the given date today?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is today\n *\n * @example\n * // If today is 6 October 2014, is 6 October 14:00:00 today?\n * var result = isToday(new Date(2014, 9, 6, 14, 0))\n * //=> true\n */\nfunction isToday (dirtyDate) {\n  return startOfDay(dirtyDate).getTime() === startOfDay(new Date()).getTime()\n}\n\nmodule.exports = isToday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_today/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_tomorrow/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/is_tomorrow/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ \"./node_modules/date-fns/start_of_day/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Is the given date tomorrow?\n *\n * @description\n * Is the given date tomorrow?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is tomorrow\n *\n * @example\n * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?\n * var result = isTomorrow(new Date(2014, 9, 7, 14, 0))\n * //=> true\n */\nfunction isTomorrow (dirtyDate) {\n  var tomorrow = new Date()\n  tomorrow.setDate(tomorrow.getDate() + 1)\n  return startOfDay(dirtyDate).getTime() === startOfDay(tomorrow).getTime()\n}\n\nmodule.exports = isTomorrow\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_tomorrow/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_tuesday/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/is_tuesday/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Is the given date Tuesday?\n *\n * @description\n * Is the given date Tuesday?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is Tuesday\n *\n * @example\n * // Is 23 September 2014 Tuesday?\n * var result = isTuesday(new Date(2014, 8, 23))\n * //=> true\n */\nfunction isTuesday (dirtyDate) {\n  return parse(dirtyDate).getDay() === 2\n}\n\nmodule.exports = isTuesday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_tuesday/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_valid/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/is_valid/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isDate = __webpack_require__(/*! ../is_date/index.js */ \"./node_modules/date-fns/is_date/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Is the given date valid?\n *\n * @description\n * Returns false if argument is Invalid Date and true otherwise.\n * Invalid Date is a Date, whose time value is NaN.\n *\n * Time value of Date: http://es5.github.io/#x15.9.1.1\n *\n * @param {Date} date - the date to check\n * @returns {Boolean} the date is valid\n * @throws {TypeError} argument must be an instance of Date\n *\n * @example\n * // For the valid date:\n * var result = isValid(new Date(2014, 1, 31))\n * //=> true\n *\n * @example\n * // For the invalid date:\n * var result = isValid(new Date(''))\n * //=> false\n */\nfunction isValid (dirtyDate) {\n  if (isDate(dirtyDate)) {\n    return !isNaN(dirtyDate)\n  } else {\n    throw new TypeError(toString.call(dirtyDate) + ' is not an instance of Date')\n  }\n}\n\nmodule.exports = isValid\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_valid/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_wednesday/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_wednesday/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Is the given date Wednesday?\n *\n * @description\n * Is the given date Wednesday?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is Wednesday\n *\n * @example\n * // Is 24 September 2014 Wednesday?\n * var result = isWednesday(new Date(2014, 8, 24))\n * //=> true\n */\nfunction isWednesday (dirtyDate) {\n  return parse(dirtyDate).getDay() === 3\n}\n\nmodule.exports = isWednesday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_wednesday/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_weekend/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/is_weekend/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Does the given date fall on a weekend?\n *\n * @description\n * Does the given date fall on a weekend?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date falls on a weekend\n *\n * @example\n * // Does 5 October 2014 fall on a weekend?\n * var result = isWeekend(new Date(2014, 9, 5))\n * //=> true\n */\nfunction isWeekend (dirtyDate) {\n  var date = parse(dirtyDate)\n  var day = date.getDay()\n  return day === 0 || day === 6\n}\n\nmodule.exports = isWeekend\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_weekend/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_within_range/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/is_within_range/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Range Helpers\n * @summary Is the given date within the range?\n *\n * @description\n * Is the given date within the range?\n *\n * @param {Date|String|Number} date - the date to check\n * @param {Date|String|Number} startDate - the start of range\n * @param {Date|String|Number} endDate - the end of range\n * @returns {Boolean} the date is within the range\n * @throws {Error} startDate cannot be after endDate\n *\n * @example\n * // For the date within the range:\n * isWithinRange(\n *   new Date(2014, 0, 3), new Date(2014, 0, 1), new Date(2014, 0, 7)\n * )\n * //=> true\n *\n * @example\n * // For the date outside of the range:\n * isWithinRange(\n *   new Date(2014, 0, 10), new Date(2014, 0, 1), new Date(2014, 0, 7)\n * )\n * //=> false\n */\nfunction isWithinRange (dirtyDate, dirtyStartDate, dirtyEndDate) {\n  var time = parse(dirtyDate).getTime()\n  var startTime = parse(dirtyStartDate).getTime()\n  var endTime = parse(dirtyEndDate).getTime()\n\n  if (startTime > endTime) {\n    throw new Error('The start of the range cannot be after the end of the range')\n  }\n\n  return time >= startTime && time <= endTime\n}\n\nmodule.exports = isWithinRange\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_within_range/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/is_yesterday/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_yesterday/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ \"./node_modules/date-fns/start_of_day/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Is the given date yesterday?\n *\n * @description\n * Is the given date yesterday?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is yesterday\n *\n * @example\n * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?\n * var result = isYesterday(new Date(2014, 9, 5, 14, 0))\n * //=> true\n */\nfunction isYesterday (dirtyDate) {\n  var yesterday = new Date()\n  yesterday.setDate(yesterday.getDate() - 1)\n  return startOfDay(dirtyDate).getTime() === startOfDay(yesterday).getTime()\n}\n\nmodule.exports = isYesterday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/is_yesterday/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/last_day_of_iso_week/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_iso_week/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var lastDayOfWeek = __webpack_require__(/*! ../last_day_of_week/index.js */ \"./node_modules/date-fns/last_day_of_week/index.js\")\n\n/**\n * @category ISO Week Helpers\n * @summary Return the last day of an ISO week for the given date.\n *\n * @description\n * Return the last day of an ISO week for the given date.\n * The result will be in the local timezone.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the last day of an ISO week\n *\n * @example\n * // The last day of an ISO week for 2 September 2014 11:55:00:\n * var result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Sun Sep 07 2014 00:00:00\n */\nfunction lastDayOfISOWeek (dirtyDate) {\n  return lastDayOfWeek(dirtyDate, {weekStartsOn: 1})\n}\n\nmodule.exports = lastDayOfISOWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/last_day_of_iso_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/last_day_of_iso_year/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_iso_year/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ \"./node_modules/date-fns/get_iso_year/index.js\")\nvar startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ \"./node_modules/date-fns/start_of_iso_week/index.js\")\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Return the last day of an ISO week-numbering year for the given date.\n *\n * @description\n * Return the last day of an ISO week-numbering year,\n * which always starts 3 days before the year's first Thursday.\n * The result will be in the local timezone.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the end of an ISO week-numbering year\n *\n * @example\n * // The last day of an ISO week-numbering year for 2 July 2005:\n * var result = lastDayOfISOYear(new Date(2005, 6, 2))\n * //=> Sun Jan 01 2006 00:00:00\n */\nfunction lastDayOfISOYear (dirtyDate) {\n  var year = getISOYear(dirtyDate)\n  var fourthOfJanuary = new Date(0)\n  fourthOfJanuary.setFullYear(year + 1, 0, 4)\n  fourthOfJanuary.setHours(0, 0, 0, 0)\n  var date = startOfISOWeek(fourthOfJanuary)\n  date.setDate(date.getDate() - 1)\n  return date\n}\n\nmodule.exports = lastDayOfISOYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/last_day_of_iso_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/last_day_of_month/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_month/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Return the last day of a month for the given date.\n *\n * @description\n * Return the last day of a month for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the last day of a month\n *\n * @example\n * // The last day of a month for 2 September 2014 11:55:00:\n * var result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Tue Sep 30 2014 00:00:00\n */\nfunction lastDayOfMonth (dirtyDate) {\n  var date = parse(dirtyDate)\n  var month = date.getMonth()\n  date.setFullYear(date.getFullYear(), month + 1, 0)\n  date.setHours(0, 0, 0, 0)\n  return date\n}\n\nmodule.exports = lastDayOfMonth\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/last_day_of_month/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/last_day_of_quarter/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_quarter/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Quarter Helpers\n * @summary Return the last day of a year quarter for the given date.\n *\n * @description\n * Return the last day of a year quarter for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the last day of a quarter\n *\n * @example\n * // The last day of a quarter for 2 September 2014 11:55:00:\n * var result = lastDayOfQuarter(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Tue Sep 30 2014 00:00:00\n */\nfunction lastDayOfQuarter (dirtyDate) {\n  var date = parse(dirtyDate)\n  var currentMonth = date.getMonth()\n  var month = currentMonth - currentMonth % 3 + 3\n  date.setMonth(month, 0)\n  date.setHours(0, 0, 0, 0)\n  return date\n}\n\nmodule.exports = lastDayOfQuarter\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/last_day_of_quarter/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/last_day_of_week/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_week/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Week Helpers\n * @summary Return the last day of a week for the given date.\n *\n * @description\n * Return the last day of a week for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @param {Object} [options] - the object with options\n * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)\n * @returns {Date} the last day of a week\n *\n * @example\n * // The last day of a week for 2 September 2014 11:55:00:\n * var result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Sat Sep 06 2014 00:00:00\n *\n * @example\n * // If the week starts on Monday, the last day of the week for 2 September 2014 11:55:00:\n * var result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})\n * //=> Sun Sep 07 2014 00:00:00\n */\nfunction lastDayOfWeek (dirtyDate, dirtyOptions) {\n  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0\n\n  var date = parse(dirtyDate)\n  var day = date.getDay()\n  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn)\n\n  date.setHours(0, 0, 0, 0)\n  date.setDate(date.getDate() + diff)\n  return date\n}\n\nmodule.exports = lastDayOfWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/last_day_of_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/last_day_of_year/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_year/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Return the last day of a year for the given date.\n *\n * @description\n * Return the last day of a year for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the last day of a year\n *\n * @example\n * // The last day of a year for 2 September 2014 11:55:00:\n * var result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))\n * //=> Wed Dec 31 2014 00:00:00\n */\nfunction lastDayOfYear (dirtyDate) {\n  var date = parse(dirtyDate)\n  var year = date.getFullYear()\n  date.setFullYear(year + 1, 0, 0)\n  date.setHours(0, 0, 0, 0)\n  return date\n}\n\nmodule.exports = lastDayOfYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/last_day_of_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/build_formatting_tokens_reg_exp/index.js":
/*!************************************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/build_formatting_tokens_reg_exp/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var commonFormatterKeys = [\n  'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',\n  'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',\n  'H', 'HH', 'h', 'hh', 'm', 'mm',\n  's', 'ss', 'S', 'SS', 'SSS',\n  'Z', 'ZZ', 'X', 'x'\n]\n\nfunction buildFormattingTokensRegExp (formatters) {\n  var formatterKeys = []\n  for (var key in formatters) {\n    if (formatters.hasOwnProperty(key)) {\n      formatterKeys.push(key)\n    }\n  }\n\n  var formattingTokens = commonFormatterKeys\n    .concat(formatterKeys)\n    .sort()\n    .reverse()\n  var formattingTokensRegExp = new RegExp(\n    '(\\\\[[^\\\\[]*\\\\])|(\\\\\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g'\n  )\n\n  return formattingTokensRegExp\n}\n\nmodule.exports = buildFormattingTokensRegExp\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/locale/_lib/build_formatting_tokens_reg_exp/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/locale/en/build_distance_in_words_locale/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/locale/en/build_distance_in_words_locale/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function buildDistanceInWordsLocale () {\n  var distanceInWordsLocale = {\n    lessThanXSeconds: {\n      one: 'less than a second',\n      other: 'less than {{count}} seconds'\n    },\n\n    xSeconds: {\n      one: '1 second',\n      other: '{{count}} seconds'\n    },\n\n    halfAMinute: 'half a minute',\n\n    lessThanXMinutes: {\n      one: 'less than a minute',\n      other: 'less than {{count}} minutes'\n    },\n\n    xMinutes: {\n      one: '1 minute',\n      other: '{{count}} minutes'\n    },\n\n    aboutXHours: {\n      one: 'about 1 hour',\n      other: 'about {{count}} hours'\n    },\n\n    xHours: {\n      one: '1 hour',\n      other: '{{count}} hours'\n    },\n\n    xDays: {\n      one: '1 day',\n      other: '{{count}} days'\n    },\n\n    aboutXMonths: {\n      one: 'about 1 month',\n      other: 'about {{count}} months'\n    },\n\n    xMonths: {\n      one: '1 month',\n      other: '{{count}} months'\n    },\n\n    aboutXYears: {\n      one: 'about 1 year',\n      other: 'about {{count}} years'\n    },\n\n    xYears: {\n      one: '1 year',\n      other: '{{count}} years'\n    },\n\n    overXYears: {\n      one: 'over 1 year',\n      other: 'over {{count}} years'\n    },\n\n    almostXYears: {\n      one: 'almost 1 year',\n      other: 'almost {{count}} years'\n    }\n  }\n\n  function localize (token, count, options) {\n    options = options || {}\n\n    var result\n    if (typeof distanceInWordsLocale[token] === 'string') {\n      result = distanceInWordsLocale[token]\n    } else if (count === 1) {\n      result = distanceInWordsLocale[token].one\n    } else {\n      result = distanceInWordsLocale[token].other.replace('{{count}}', count)\n    }\n\n    if (options.addSuffix) {\n      if (options.comparison > 0) {\n        return 'in ' + result\n      } else {\n        return result + ' ago'\n      }\n    }\n\n    return result\n  }\n\n  return {\n    localize: localize\n  }\n}\n\nmodule.exports = buildDistanceInWordsLocale\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/locale/en/build_distance_in_words_locale/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/locale/en/build_format_locale/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/locale/en/build_format_locale/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var buildFormattingTokensRegExp = __webpack_require__(/*! ../../_lib/build_formatting_tokens_reg_exp/index.js */ \"./node_modules/date-fns/locale/_lib/build_formatting_tokens_reg_exp/index.js\")\n\nfunction buildFormatLocale () {\n  // Note: in English, the names of days of the week and months are capitalized.\n  // If you are making a new locale based on this one, check if the same is true for the language you're working on.\n  // Generally, formatted dates should look like they are in the middle of a sentence,\n  // e.g. in Spanish language the weekdays and months should be in the lowercase.\n  var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']\n  var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']\n  var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']\n  var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']\n  var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']\n  var meridiemUppercase = ['AM', 'PM']\n  var meridiemLowercase = ['am', 'pm']\n  var meridiemFull = ['a.m.', 'p.m.']\n\n  var formatters = {\n    // Month: Jan, Feb, ..., Dec\n    'MMM': function (date) {\n      return months3char[date.getMonth()]\n    },\n\n    // Month: January, February, ..., December\n    'MMMM': function (date) {\n      return monthsFull[date.getMonth()]\n    },\n\n    // Day of week: Su, Mo, ..., Sa\n    'dd': function (date) {\n      return weekdays2char[date.getDay()]\n    },\n\n    // Day of week: Sun, Mon, ..., Sat\n    'ddd': function (date) {\n      return weekdays3char[date.getDay()]\n    },\n\n    // Day of week: Sunday, Monday, ..., Saturday\n    'dddd': function (date) {\n      return weekdaysFull[date.getDay()]\n    },\n\n    // AM, PM\n    'A': function (date) {\n      return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]\n    },\n\n    // am, pm\n    'a': function (date) {\n      return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]\n    },\n\n    // a.m., p.m.\n    'aa': function (date) {\n      return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]\n    }\n  }\n\n  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.\n  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']\n  ordinalFormatters.forEach(function (formatterToken) {\n    formatters[formatterToken + 'o'] = function (date, formatters) {\n      return ordinal(formatters[formatterToken](date))\n    }\n  })\n\n  return {\n    formatters: formatters,\n    formattingTokensRegExp: buildFormattingTokensRegExp(formatters)\n  }\n}\n\nfunction ordinal (number) {\n  var rem100 = number % 100\n  if (rem100 > 20 || rem100 < 10) {\n    switch (rem100 % 10) {\n      case 1:\n        return number + 'st'\n      case 2:\n        return number + 'nd'\n      case 3:\n        return number + 'rd'\n    }\n  }\n  return number + 'th'\n}\n\nmodule.exports = buildFormatLocale\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/locale/en/build_format_locale/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/locale/en/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/locale/en/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var buildDistanceInWordsLocale = __webpack_require__(/*! ./build_distance_in_words_locale/index.js */ \"./node_modules/date-fns/locale/en/build_distance_in_words_locale/index.js\")\nvar buildFormatLocale = __webpack_require__(/*! ./build_format_locale/index.js */ \"./node_modules/date-fns/locale/en/build_format_locale/index.js\")\n\n/**\n * @category Locales\n * @summary English locale.\n */\nmodule.exports = {\n  distanceInWords: buildDistanceInWordsLocale(),\n  format: buildFormatLocale()\n}\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/locale/en/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/max/index.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/max/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Return the latest of the given dates.\n *\n * @description\n * Return the latest of the given dates.\n *\n * @param {...(Date|String|Number)} dates - the dates to compare\n * @returns {Date} the latest of the dates\n *\n * @example\n * // Which of these dates is the latest?\n * var result = max(\n *   new Date(1989, 6, 10),\n *   new Date(1987, 1, 11),\n *   new Date(1995, 6, 2),\n *   new Date(1990, 0, 1)\n * )\n * //=> Sun Jul 02 1995 00:00:00\n */\nfunction max () {\n  var dirtyDates = Array.prototype.slice.call(arguments)\n  var dates = dirtyDates.map(function (dirtyDate) {\n    return parse(dirtyDate)\n  })\n  var latestTimestamp = Math.max.apply(null, dates)\n  return new Date(latestTimestamp)\n}\n\nmodule.exports = max\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/max/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/min/index.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/min/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Common Helpers\n * @summary Return the earliest of the given dates.\n *\n * @description\n * Return the earliest of the given dates.\n *\n * @param {...(Date|String|Number)} dates - the dates to compare\n * @returns {Date} the earliest of the dates\n *\n * @example\n * // Which of these dates is the earliest?\n * var result = min(\n *   new Date(1989, 6, 10),\n *   new Date(1987, 1, 11),\n *   new Date(1995, 6, 2),\n *   new Date(1990, 0, 1)\n * )\n * //=> Wed Feb 11 1987 00:00:00\n */\nfunction min () {\n  var dirtyDates = Array.prototype.slice.call(arguments)\n  var dates = dirtyDates.map(function (dirtyDate) {\n    return parse(dirtyDate)\n  })\n  var earliestTimestamp = Math.min.apply(null, dates)\n  return new Date(earliestTimestamp)\n}\n\nmodule.exports = min\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/min/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/parse/index.js":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/parse/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getTimezoneOffsetInMilliseconds = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ \"./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js\")\nvar isDate = __webpack_require__(/*! ../is_date/index.js */ \"./node_modules/date-fns/is_date/index.js\")\n\nvar MILLISECONDS_IN_HOUR = 3600000\nvar MILLISECONDS_IN_MINUTE = 60000\nvar DEFAULT_ADDITIONAL_DIGITS = 2\n\nvar parseTokenDateTimeDelimeter = /[T ]/\nvar parseTokenPlainTime = /:/\n\n// year tokens\nvar parseTokenYY = /^(\\d{2})$/\nvar parseTokensYYY = [\n  /^([+-]\\d{2})$/, // 0 additional digits\n  /^([+-]\\d{3})$/, // 1 additional digit\n  /^([+-]\\d{4})$/ // 2 additional digits\n]\n\nvar parseTokenYYYY = /^(\\d{4})/\nvar parseTokensYYYYY = [\n  /^([+-]\\d{4})/, // 0 additional digits\n  /^([+-]\\d{5})/, // 1 additional digit\n  /^([+-]\\d{6})/ // 2 additional digits\n]\n\n// date tokens\nvar parseTokenMM = /^-(\\d{2})$/\nvar parseTokenDDD = /^-?(\\d{3})$/\nvar parseTokenMMDD = /^-?(\\d{2})-?(\\d{2})$/\nvar parseTokenWww = /^-?W(\\d{2})$/\nvar parseTokenWwwD = /^-?W(\\d{2})-?(\\d{1})$/\n\n// time tokens\nvar parseTokenHH = /^(\\d{2}([.,]\\d*)?)$/\nvar parseTokenHHMM = /^(\\d{2}):?(\\d{2}([.,]\\d*)?)$/\nvar parseTokenHHMMSS = /^(\\d{2}):?(\\d{2}):?(\\d{2}([.,]\\d*)?)$/\n\n// timezone tokens\nvar parseTokenTimezone = /([Z+-].*)$/\nvar parseTokenTimezoneZ = /^(Z)$/\nvar parseTokenTimezoneHH = /^([+-])(\\d{2})$/\nvar parseTokenTimezoneHHMM = /^([+-])(\\d{2}):?(\\d{2})$/\n\n/**\n * @category Common Helpers\n * @summary Convert the given argument to an instance of Date.\n *\n * @description\n * Convert the given argument to an instance of Date.\n *\n * If the argument is an instance of Date, the function returns its clone.\n *\n * If the argument is a number, it is treated as a timestamp.\n *\n * If an argument is a string, the function tries to parse it.\n * Function accepts complete ISO 8601 formats as well as partial implementations.\n * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601\n *\n * If all above fails, the function passes the given argument to Date constructor.\n *\n * @param {Date|String|Number} argument - the value to convert\n * @param {Object} [options] - the object with options\n * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format\n * @returns {Date} the parsed date in the local time zone\n *\n * @example\n * // Convert string '2014-02-11T11:30:30' to date:\n * var result = parse('2014-02-11T11:30:30')\n * //=> Tue Feb 11 2014 11:30:30\n *\n * @example\n * // Parse string '+02014101',\n * // if the additional number of digits in the extended year format is 1:\n * var result = parse('+02014101', {additionalDigits: 1})\n * //=> Fri Apr 11 2014 00:00:00\n */\nfunction parse (argument, dirtyOptions) {\n  if (isDate(argument)) {\n    // Prevent the date to lose the milliseconds when passed to new Date() in IE10\n    return new Date(argument.getTime())\n  } else if (typeof argument !== 'string') {\n    return new Date(argument)\n  }\n\n  var options = dirtyOptions || {}\n  var additionalDigits = options.additionalDigits\n  if (additionalDigits == null) {\n    additionalDigits = DEFAULT_ADDITIONAL_DIGITS\n  } else {\n    additionalDigits = Number(additionalDigits)\n  }\n\n  var dateStrings = splitDateString(argument)\n\n  var parseYearResult = parseYear(dateStrings.date, additionalDigits)\n  var year = parseYearResult.year\n  var restDateString = parseYearResult.restDateString\n\n  var date = parseDate(restDateString, year)\n\n  if (date) {\n    var timestamp = date.getTime()\n    var time = 0\n    var offset\n\n    if (dateStrings.time) {\n      time = parseTime(dateStrings.time)\n    }\n\n    if (dateStrings.timezone) {\n      offset = parseTimezone(dateStrings.timezone) * MILLISECONDS_IN_MINUTE\n    } else {\n      var fullTime = timestamp + time\n      var fullTimeDate = new Date(fullTime)\n\n      offset = getTimezoneOffsetInMilliseconds(fullTimeDate)\n\n      // Adjust time when it's coming from DST\n      var fullTimeDateNextDay = new Date(fullTime)\n      fullTimeDateNextDay.setDate(fullTimeDate.getDate() + 1)\n      var offsetDiff =\n        getTimezoneOffsetInMilliseconds(fullTimeDateNextDay) -\n        getTimezoneOffsetInMilliseconds(fullTimeDate)\n      if (offsetDiff > 0) {\n        offset += offsetDiff\n      }\n    }\n\n    return new Date(timestamp + time + offset)\n  } else {\n    return new Date(argument)\n  }\n}\n\nfunction splitDateString (dateString) {\n  var dateStrings = {}\n  var array = dateString.split(parseTokenDateTimeDelimeter)\n  var timeString\n\n  if (parseTokenPlainTime.test(array[0])) {\n    dateStrings.date = null\n    timeString = array[0]\n  } else {\n    dateStrings.date = array[0]\n    timeString = array[1]\n  }\n\n  if (timeString) {\n    var token = parseTokenTimezone.exec(timeString)\n    if (token) {\n      dateStrings.time = timeString.replace(token[1], '')\n      dateStrings.timezone = token[1]\n    } else {\n      dateStrings.time = timeString\n    }\n  }\n\n  return dateStrings\n}\n\nfunction parseYear (dateString, additionalDigits) {\n  var parseTokenYYY = parseTokensYYY[additionalDigits]\n  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits]\n\n  var token\n\n  // YYYY or ±YYYYY\n  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)\n  if (token) {\n    var yearString = token[1]\n    return {\n      year: parseInt(yearString, 10),\n      restDateString: dateString.slice(yearString.length)\n    }\n  }\n\n  // YY or ±YYY\n  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)\n  if (token) {\n    var centuryString = token[1]\n    return {\n      year: parseInt(centuryString, 10) * 100,\n      restDateString: dateString.slice(centuryString.length)\n    }\n  }\n\n  // Invalid ISO-formatted year\n  return {\n    year: null\n  }\n}\n\nfunction parseDate (dateString, year) {\n  // Invalid ISO-formatted year\n  if (year === null) {\n    return null\n  }\n\n  var token\n  var date\n  var month\n  var week\n\n  // YYYY\n  if (dateString.length === 0) {\n    date = new Date(0)\n    date.setUTCFullYear(year)\n    return date\n  }\n\n  // YYYY-MM\n  token = parseTokenMM.exec(dateString)\n  if (token) {\n    date = new Date(0)\n    month = parseInt(token[1], 10) - 1\n    date.setUTCFullYear(year, month)\n    return date\n  }\n\n  // YYYY-DDD or YYYYDDD\n  token = parseTokenDDD.exec(dateString)\n  if (token) {\n    date = new Date(0)\n    var dayOfYear = parseInt(token[1], 10)\n    date.setUTCFullYear(year, 0, dayOfYear)\n    return date\n  }\n\n  // YYYY-MM-DD or YYYYMMDD\n  token = parseTokenMMDD.exec(dateString)\n  if (token) {\n    date = new Date(0)\n    month = parseInt(token[1], 10) - 1\n    var day = parseInt(token[2], 10)\n    date.setUTCFullYear(year, month, day)\n    return date\n  }\n\n  // YYYY-Www or YYYYWww\n  token = parseTokenWww.exec(dateString)\n  if (token) {\n    week = parseInt(token[1], 10) - 1\n    return dayOfISOYear(year, week)\n  }\n\n  // YYYY-Www-D or YYYYWwwD\n  token = parseTokenWwwD.exec(dateString)\n  if (token) {\n    week = parseInt(token[1], 10) - 1\n    var dayOfWeek = parseInt(token[2], 10) - 1\n    return dayOfISOYear(year, week, dayOfWeek)\n  }\n\n  // Invalid ISO-formatted date\n  return null\n}\n\nfunction parseTime (timeString) {\n  var token\n  var hours\n  var minutes\n\n  // hh\n  token = parseTokenHH.exec(timeString)\n  if (token) {\n    hours = parseFloat(token[1].replace(',', '.'))\n    return (hours % 24) * MILLISECONDS_IN_HOUR\n  }\n\n  // hh:mm or hhmm\n  token = parseTokenHHMM.exec(timeString)\n  if (token) {\n    hours = parseInt(token[1], 10)\n    minutes = parseFloat(token[2].replace(',', '.'))\n    return (hours % 24) * MILLISECONDS_IN_HOUR +\n      minutes * MILLISECONDS_IN_MINUTE\n  }\n\n  // hh:mm:ss or hhmmss\n  token = parseTokenHHMMSS.exec(timeString)\n  if (token) {\n    hours = parseInt(token[1], 10)\n    minutes = parseInt(token[2], 10)\n    var seconds = parseFloat(token[3].replace(',', '.'))\n    return (hours % 24) * MILLISECONDS_IN_HOUR +\n      minutes * MILLISECONDS_IN_MINUTE +\n      seconds * 1000\n  }\n\n  // Invalid ISO-formatted time\n  return null\n}\n\nfunction parseTimezone (timezoneString) {\n  var token\n  var absoluteOffset\n\n  // Z\n  token = parseTokenTimezoneZ.exec(timezoneString)\n  if (token) {\n    return 0\n  }\n\n  // ±hh\n  token = parseTokenTimezoneHH.exec(timezoneString)\n  if (token) {\n    absoluteOffset = parseInt(token[2], 10) * 60\n    return (token[1] === '+') ? -absoluteOffset : absoluteOffset\n  }\n\n  // ±hh:mm or ±hhmm\n  token = parseTokenTimezoneHHMM.exec(timezoneString)\n  if (token) {\n    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)\n    return (token[1] === '+') ? -absoluteOffset : absoluteOffset\n  }\n\n  return 0\n}\n\nfunction dayOfISOYear (isoYear, week, day) {\n  week = week || 0\n  day = day || 0\n  var date = new Date(0)\n  date.setUTCFullYear(isoYear, 0, 4)\n  var fourthOfJanuaryDay = date.getUTCDay() || 7\n  var diff = week * 7 + day + 1 - fourthOfJanuaryDay\n  date.setUTCDate(date.getUTCDate() + diff)\n  return date\n}\n\nmodule.exports = parse\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/parse/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_date/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/set_date/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Set the day of the month to the given date.\n *\n * @description\n * Set the day of the month to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} dayOfMonth - the day of the month of the new date\n * @returns {Date} the new date with the day of the month setted\n *\n * @example\n * // Set the 30th day of the month to 1 September 2014:\n * var result = setDate(new Date(2014, 8, 1), 30)\n * //=> Tue Sep 30 2014 00:00:00\n */\nfunction setDate (dirtyDate, dirtyDayOfMonth) {\n  var date = parse(dirtyDate)\n  var dayOfMonth = Number(dirtyDayOfMonth)\n  date.setDate(dayOfMonth)\n  return date\n}\n\nmodule.exports = setDate\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_date/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_day/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/set_day/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar addDays = __webpack_require__(/*! ../add_days/index.js */ \"./node_modules/date-fns/add_days/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Set the day of the week to the given date.\n *\n * @description\n * Set the day of the week to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} day - the day of the week of the new date\n * @param {Object} [options] - the object with options\n * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)\n * @returns {Date} the new date with the day of the week setted\n *\n * @example\n * // Set Sunday to 1 September 2014:\n * var result = setDay(new Date(2014, 8, 1), 0)\n * //=> Sun Aug 31 2014 00:00:00\n *\n * @example\n * // If week starts with Monday, set Sunday to 1 September 2014:\n * var result = setDay(new Date(2014, 8, 1), 0, {weekStartsOn: 1})\n * //=> Sun Sep 07 2014 00:00:00\n */\nfunction setDay (dirtyDate, dirtyDay, dirtyOptions) {\n  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0\n  var date = parse(dirtyDate)\n  var day = Number(dirtyDay)\n  var currentDay = date.getDay()\n\n  var remainder = day % 7\n  var dayIndex = (remainder + 7) % 7\n\n  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay\n  return addDays(date, diff)\n}\n\nmodule.exports = setDay\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_day/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_day_of_year/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/set_day_of_year/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Set the day of the year to the given date.\n *\n * @description\n * Set the day of the year to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} dayOfYear - the day of the year of the new date\n * @returns {Date} the new date with the day of the year setted\n *\n * @example\n * // Set the 2nd day of the year to 2 July 2014:\n * var result = setDayOfYear(new Date(2014, 6, 2), 2)\n * //=> Thu Jan 02 2014 00:00:00\n */\nfunction setDayOfYear (dirtyDate, dirtyDayOfYear) {\n  var date = parse(dirtyDate)\n  var dayOfYear = Number(dirtyDayOfYear)\n  date.setMonth(0)\n  date.setDate(dayOfYear)\n  return date\n}\n\nmodule.exports = setDayOfYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_day_of_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_hours/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/set_hours/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Hour Helpers\n * @summary Set the hours to the given date.\n *\n * @description\n * Set the hours to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} hours - the hours of the new date\n * @returns {Date} the new date with the hours setted\n *\n * @example\n * // Set 4 hours to 1 September 2014 11:30:00:\n * var result = setHours(new Date(2014, 8, 1, 11, 30), 4)\n * //=> Mon Sep 01 2014 04:30:00\n */\nfunction setHours (dirtyDate, dirtyHours) {\n  var date = parse(dirtyDate)\n  var hours = Number(dirtyHours)\n  date.setHours(hours)\n  return date\n}\n\nmodule.exports = setHours\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_hours/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_iso_day/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/set_iso_day/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar addDays = __webpack_require__(/*! ../add_days/index.js */ \"./node_modules/date-fns/add_days/index.js\")\nvar getISODay = __webpack_require__(/*! ../get_iso_day/index.js */ \"./node_modules/date-fns/get_iso_day/index.js\")\n\n/**\n * @category Weekday Helpers\n * @summary Set the day of the ISO week to the given date.\n *\n * @description\n * Set the day of the ISO week to the given date.\n * ISO week starts with Monday.\n * 7 is the index of Sunday, 1 is the index of Monday etc.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} day - the day of the ISO week of the new date\n * @returns {Date} the new date with the day of the ISO week setted\n *\n * @example\n * // Set Sunday to 1 September 2014:\n * var result = setISODay(new Date(2014, 8, 1), 7)\n * //=> Sun Sep 07 2014 00:00:00\n */\nfunction setISODay (dirtyDate, dirtyDay) {\n  var date = parse(dirtyDate)\n  var day = Number(dirtyDay)\n  var currentDay = getISODay(date)\n  var diff = day - currentDay\n  return addDays(date, diff)\n}\n\nmodule.exports = setISODay\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_iso_day/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_iso_week/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/set_iso_week/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar getISOWeek = __webpack_require__(/*! ../get_iso_week/index.js */ \"./node_modules/date-fns/get_iso_week/index.js\")\n\n/**\n * @category ISO Week Helpers\n * @summary Set the ISO week to the given date.\n *\n * @description\n * Set the ISO week to the given date, saving the weekday number.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} isoWeek - the ISO week of the new date\n * @returns {Date} the new date with the ISO week setted\n *\n * @example\n * // Set the 53rd ISO week to 7 August 2004:\n * var result = setISOWeek(new Date(2004, 7, 7), 53)\n * //=> Sat Jan 01 2005 00:00:00\n */\nfunction setISOWeek (dirtyDate, dirtyISOWeek) {\n  var date = parse(dirtyDate)\n  var isoWeek = Number(dirtyISOWeek)\n  var diff = getISOWeek(date) - isoWeek\n  date.setDate(date.getDate() - diff * 7)\n  return date\n}\n\nmodule.exports = setISOWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_iso_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_iso_year/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/set_iso_year/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar startOfISOYear = __webpack_require__(/*! ../start_of_iso_year/index.js */ \"./node_modules/date-fns/start_of_iso_year/index.js\")\nvar differenceInCalendarDays = __webpack_require__(/*! ../difference_in_calendar_days/index.js */ \"./node_modules/date-fns/difference_in_calendar_days/index.js\")\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Set the ISO week-numbering year to the given date.\n *\n * @description\n * Set the ISO week-numbering year to the given date,\n * saving the week number and the weekday number.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} isoYear - the ISO week-numbering year of the new date\n * @returns {Date} the new date with the ISO week-numbering year setted\n *\n * @example\n * // Set ISO week-numbering year 2007 to 29 December 2008:\n * var result = setISOYear(new Date(2008, 11, 29), 2007)\n * //=> Mon Jan 01 2007 00:00:00\n */\nfunction setISOYear (dirtyDate, dirtyISOYear) {\n  var date = parse(dirtyDate)\n  var isoYear = Number(dirtyISOYear)\n  var diff = differenceInCalendarDays(date, startOfISOYear(date))\n  var fourthOfJanuary = new Date(0)\n  fourthOfJanuary.setFullYear(isoYear, 0, 4)\n  fourthOfJanuary.setHours(0, 0, 0, 0)\n  date = startOfISOYear(fourthOfJanuary)\n  date.setDate(date.getDate() + diff)\n  return date\n}\n\nmodule.exports = setISOYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_iso_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_milliseconds/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/set_milliseconds/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Millisecond Helpers\n * @summary Set the milliseconds to the given date.\n *\n * @description\n * Set the milliseconds to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} milliseconds - the milliseconds of the new date\n * @returns {Date} the new date with the milliseconds setted\n *\n * @example\n * // Set 300 milliseconds to 1 September 2014 11:30:40.500:\n * var result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)\n * //=> Mon Sep 01 2014 11:30:40.300\n */\nfunction setMilliseconds (dirtyDate, dirtyMilliseconds) {\n  var date = parse(dirtyDate)\n  var milliseconds = Number(dirtyMilliseconds)\n  date.setMilliseconds(milliseconds)\n  return date\n}\n\nmodule.exports = setMilliseconds\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_milliseconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_minutes/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/set_minutes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Minute Helpers\n * @summary Set the minutes to the given date.\n *\n * @description\n * Set the minutes to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} minutes - the minutes of the new date\n * @returns {Date} the new date with the minutes setted\n *\n * @example\n * // Set 45 minutes to 1 September 2014 11:30:40:\n * var result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)\n * //=> Mon Sep 01 2014 11:45:40\n */\nfunction setMinutes (dirtyDate, dirtyMinutes) {\n  var date = parse(dirtyDate)\n  var minutes = Number(dirtyMinutes)\n  date.setMinutes(minutes)\n  return date\n}\n\nmodule.exports = setMinutes\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_minutes/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_month/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/set_month/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar getDaysInMonth = __webpack_require__(/*! ../get_days_in_month/index.js */ \"./node_modules/date-fns/get_days_in_month/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Set the month to the given date.\n *\n * @description\n * Set the month to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} month - the month of the new date\n * @returns {Date} the new date with the month setted\n *\n * @example\n * // Set February to 1 September 2014:\n * var result = setMonth(new Date(2014, 8, 1), 1)\n * //=> Sat Feb 01 2014 00:00:00\n */\nfunction setMonth (dirtyDate, dirtyMonth) {\n  var date = parse(dirtyDate)\n  var month = Number(dirtyMonth)\n  var year = date.getFullYear()\n  var day = date.getDate()\n\n  var dateWithDesiredMonth = new Date(0)\n  dateWithDesiredMonth.setFullYear(year, month, 15)\n  dateWithDesiredMonth.setHours(0, 0, 0, 0)\n  var daysInMonth = getDaysInMonth(dateWithDesiredMonth)\n  // Set the last day of the new month\n  // if the original date was the last day of the longer month\n  date.setMonth(month, Math.min(day, daysInMonth))\n  return date\n}\n\nmodule.exports = setMonth\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_month/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_quarter/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/set_quarter/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\nvar setMonth = __webpack_require__(/*! ../set_month/index.js */ \"./node_modules/date-fns/set_month/index.js\")\n\n/**\n * @category Quarter Helpers\n * @summary Set the year quarter to the given date.\n *\n * @description\n * Set the year quarter to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} quarter - the quarter of the new date\n * @returns {Date} the new date with the quarter setted\n *\n * @example\n * // Set the 2nd quarter to 2 July 2014:\n * var result = setQuarter(new Date(2014, 6, 2), 2)\n * //=> Wed Apr 02 2014 00:00:00\n */\nfunction setQuarter (dirtyDate, dirtyQuarter) {\n  var date = parse(dirtyDate)\n  var quarter = Number(dirtyQuarter)\n  var oldQuarter = Math.floor(date.getMonth() / 3) + 1\n  var diff = quarter - oldQuarter\n  return setMonth(date, date.getMonth() + diff * 3)\n}\n\nmodule.exports = setQuarter\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_quarter/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_seconds/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/set_seconds/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Second Helpers\n * @summary Set the seconds to the given date.\n *\n * @description\n * Set the seconds to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} seconds - the seconds of the new date\n * @returns {Date} the new date with the seconds setted\n *\n * @example\n * // Set 45 seconds to 1 September 2014 11:30:40:\n * var result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)\n * //=> Mon Sep 01 2014 11:30:45\n */\nfunction setSeconds (dirtyDate, dirtySeconds) {\n  var date = parse(dirtyDate)\n  var seconds = Number(dirtySeconds)\n  date.setSeconds(seconds)\n  return date\n}\n\nmodule.exports = setSeconds\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_seconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/set_year/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/set_year/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Set the year to the given date.\n *\n * @description\n * Set the year to the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} year - the year of the new date\n * @returns {Date} the new date with the year setted\n *\n * @example\n * // Set year 2013 to 1 September 2014:\n * var result = setYear(new Date(2014, 8, 1), 2013)\n * //=> Sun Sep 01 2013 00:00:00\n */\nfunction setYear (dirtyDate, dirtyYear) {\n  var date = parse(dirtyDate)\n  var year = Number(dirtyYear)\n  date.setFullYear(year)\n  return date\n}\n\nmodule.exports = setYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/set_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_day/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/start_of_day/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Return the start of a day for the given date.\n *\n * @description\n * Return the start of a day for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the start of a day\n *\n * @example\n * // The start of a day for 2 September 2014 11:55:00:\n * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Tue Sep 02 2014 00:00:00\n */\nfunction startOfDay (dirtyDate) {\n  var date = parse(dirtyDate)\n  date.setHours(0, 0, 0, 0)\n  return date\n}\n\nmodule.exports = startOfDay\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_day/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_hour/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/start_of_hour/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Hour Helpers\n * @summary Return the start of an hour for the given date.\n *\n * @description\n * Return the start of an hour for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the start of an hour\n *\n * @example\n * // The start of an hour for 2 September 2014 11:55:00:\n * var result = startOfHour(new Date(2014, 8, 2, 11, 55))\n * //=> Tue Sep 02 2014 11:00:00\n */\nfunction startOfHour (dirtyDate) {\n  var date = parse(dirtyDate)\n  date.setMinutes(0, 0, 0)\n  return date\n}\n\nmodule.exports = startOfHour\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_hour/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_iso_week/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/start_of_iso_week/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfWeek = __webpack_require__(/*! ../start_of_week/index.js */ \"./node_modules/date-fns/start_of_week/index.js\")\n\n/**\n * @category ISO Week Helpers\n * @summary Return the start of an ISO week for the given date.\n *\n * @description\n * Return the start of an ISO week for the given date.\n * The result will be in the local timezone.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the start of an ISO week\n *\n * @example\n * // The start of an ISO week for 2 September 2014 11:55:00:\n * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Mon Sep 01 2014 00:00:00\n */\nfunction startOfISOWeek (dirtyDate) {\n  return startOfWeek(dirtyDate, {weekStartsOn: 1})\n}\n\nmodule.exports = startOfISOWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_iso_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_iso_year/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/start_of_iso_year/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ \"./node_modules/date-fns/get_iso_year/index.js\")\nvar startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ \"./node_modules/date-fns/start_of_iso_week/index.js\")\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Return the start of an ISO week-numbering year for the given date.\n *\n * @description\n * Return the start of an ISO week-numbering year,\n * which always starts 3 days before the year's first Thursday.\n * The result will be in the local timezone.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the start of an ISO year\n *\n * @example\n * // The start of an ISO week-numbering year for 2 July 2005:\n * var result = startOfISOYear(new Date(2005, 6, 2))\n * //=> Mon Jan 03 2005 00:00:00\n */\nfunction startOfISOYear (dirtyDate) {\n  var year = getISOYear(dirtyDate)\n  var fourthOfJanuary = new Date(0)\n  fourthOfJanuary.setFullYear(year, 0, 4)\n  fourthOfJanuary.setHours(0, 0, 0, 0)\n  var date = startOfISOWeek(fourthOfJanuary)\n  return date\n}\n\nmodule.exports = startOfISOYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_iso_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_minute/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/start_of_minute/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Minute Helpers\n * @summary Return the start of a minute for the given date.\n *\n * @description\n * Return the start of a minute for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the start of a minute\n *\n * @example\n * // The start of a minute for 1 December 2014 22:15:45.400:\n * var result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))\n * //=> Mon Dec 01 2014 22:15:00\n */\nfunction startOfMinute (dirtyDate) {\n  var date = parse(dirtyDate)\n  date.setSeconds(0, 0)\n  return date\n}\n\nmodule.exports = startOfMinute\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_minute/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_month/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/start_of_month/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Return the start of a month for the given date.\n *\n * @description\n * Return the start of a month for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the start of a month\n *\n * @example\n * // The start of a month for 2 September 2014 11:55:00:\n * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Mon Sep 01 2014 00:00:00\n */\nfunction startOfMonth (dirtyDate) {\n  var date = parse(dirtyDate)\n  date.setDate(1)\n  date.setHours(0, 0, 0, 0)\n  return date\n}\n\nmodule.exports = startOfMonth\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_month/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_quarter/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/start_of_quarter/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Quarter Helpers\n * @summary Return the start of a year quarter for the given date.\n *\n * @description\n * Return the start of a year quarter for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the start of a quarter\n *\n * @example\n * // The start of a quarter for 2 September 2014 11:55:00:\n * var result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Tue Jul 01 2014 00:00:00\n */\nfunction startOfQuarter (dirtyDate) {\n  var date = parse(dirtyDate)\n  var currentMonth = date.getMonth()\n  var month = currentMonth - currentMonth % 3\n  date.setMonth(month, 1)\n  date.setHours(0, 0, 0, 0)\n  return date\n}\n\nmodule.exports = startOfQuarter\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_quarter/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_second/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/start_of_second/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Second Helpers\n * @summary Return the start of a second for the given date.\n *\n * @description\n * Return the start of a second for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the start of a second\n *\n * @example\n * // The start of a second for 1 December 2014 22:15:45.400:\n * var result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))\n * //=> Mon Dec 01 2014 22:15:45.000\n */\nfunction startOfSecond (dirtyDate) {\n  var date = parse(dirtyDate)\n  date.setMilliseconds(0)\n  return date\n}\n\nmodule.exports = startOfSecond\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_second/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_today/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/start_of_today/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ \"./node_modules/date-fns/start_of_day/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Return the start of today.\n *\n * @description\n * Return the start of today.\n *\n * @returns {Date} the start of today\n *\n * @example\n * // If today is 6 October 2014:\n * var result = startOfToday()\n * //=> Mon Oct 6 2014 00:00:00\n */\nfunction startOfToday () {\n  return startOfDay(new Date())\n}\n\nmodule.exports = startOfToday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_today/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_tomorrow/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/start_of_tomorrow/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @category Day Helpers\n * @summary Return the start of tomorrow.\n *\n * @description\n * Return the start of tomorrow.\n *\n * @returns {Date} the start of tomorrow\n *\n * @example\n * // If today is 6 October 2014:\n * var result = startOfTomorrow()\n * //=> Tue Oct 7 2014 00:00:00\n */\nfunction startOfTomorrow () {\n  var now = new Date()\n  var year = now.getFullYear()\n  var month = now.getMonth()\n  var day = now.getDate()\n\n  var date = new Date(0)\n  date.setFullYear(year, month, day + 1)\n  date.setHours(0, 0, 0, 0)\n  return date\n}\n\nmodule.exports = startOfTomorrow\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_tomorrow/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_week/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/start_of_week/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Week Helpers\n * @summary Return the start of a week for the given date.\n *\n * @description\n * Return the start of a week for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @param {Object} [options] - the object with options\n * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)\n * @returns {Date} the start of a week\n *\n * @example\n * // The start of a week for 2 September 2014 11:55:00:\n * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Sun Aug 31 2014 00:00:00\n *\n * @example\n * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:\n * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})\n * //=> Mon Sep 01 2014 00:00:00\n */\nfunction startOfWeek (dirtyDate, dirtyOptions) {\n  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0\n\n  var date = parse(dirtyDate)\n  var day = date.getDay()\n  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn\n\n  date.setDate(date.getDate() - diff)\n  date.setHours(0, 0, 0, 0)\n  return date\n}\n\nmodule.exports = startOfWeek\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_week/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_year/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/start_of_year/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! ../parse/index.js */ \"./node_modules/date-fns/parse/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Return the start of a year for the given date.\n *\n * @description\n * Return the start of a year for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|String|Number} date - the original date\n * @returns {Date} the start of a year\n *\n * @example\n * // The start of a year for 2 September 2014 11:55:00:\n * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))\n * //=> Wed Jan 01 2014 00:00:00\n */\nfunction startOfYear (dirtyDate) {\n  var cleanDate = parse(dirtyDate)\n  var date = new Date(0)\n  date.setFullYear(cleanDate.getFullYear(), 0, 1)\n  date.setHours(0, 0, 0, 0)\n  return date\n}\n\nmodule.exports = startOfYear\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_year/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/start_of_yesterday/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/start_of_yesterday/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @category Day Helpers\n * @summary Return the start of yesterday.\n *\n * @description\n * Return the start of yesterday.\n *\n * @returns {Date} the start of yesterday\n *\n * @example\n * // If today is 6 October 2014:\n * var result = startOfYesterday()\n * //=> Sun Oct 5 2014 00:00:00\n */\nfunction startOfYesterday () {\n  var now = new Date()\n  var year = now.getFullYear()\n  var month = now.getMonth()\n  var day = now.getDate()\n\n  var date = new Date(0)\n  date.setFullYear(year, month, day - 1)\n  date.setHours(0, 0, 0, 0)\n  return date\n}\n\nmodule.exports = startOfYesterday\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/start_of_yesterday/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/sub_days/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/sub_days/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addDays = __webpack_require__(/*! ../add_days/index.js */ \"./node_modules/date-fns/add_days/index.js\")\n\n/**\n * @category Day Helpers\n * @summary Subtract the specified number of days from the given date.\n *\n * @description\n * Subtract the specified number of days from the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of days to be subtracted\n * @returns {Date} the new date with the days subtracted\n *\n * @example\n * // Subtract 10 days from 1 September 2014:\n * var result = subDays(new Date(2014, 8, 1), 10)\n * //=> Fri Aug 22 2014 00:00:00\n */\nfunction subDays (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addDays(dirtyDate, -amount)\n}\n\nmodule.exports = subDays\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/sub_days/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/sub_hours/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/sub_hours/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addHours = __webpack_require__(/*! ../add_hours/index.js */ \"./node_modules/date-fns/add_hours/index.js\")\n\n/**\n * @category Hour Helpers\n * @summary Subtract the specified number of hours from the given date.\n *\n * @description\n * Subtract the specified number of hours from the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of hours to be subtracted\n * @returns {Date} the new date with the hours subtracted\n *\n * @example\n * // Subtract 2 hours from 11 July 2014 01:00:00:\n * var result = subHours(new Date(2014, 6, 11, 1, 0), 2)\n * //=> Thu Jul 10 2014 23:00:00\n */\nfunction subHours (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addHours(dirtyDate, -amount)\n}\n\nmodule.exports = subHours\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/sub_hours/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/sub_iso_years/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/sub_iso_years/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addISOYears = __webpack_require__(/*! ../add_iso_years/index.js */ \"./node_modules/date-fns/add_iso_years/index.js\")\n\n/**\n * @category ISO Week-Numbering Year Helpers\n * @summary Subtract the specified number of ISO week-numbering years from the given date.\n *\n * @description\n * Subtract the specified number of ISO week-numbering years from the given date.\n *\n * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of ISO week-numbering years to be subtracted\n * @returns {Date} the new date with the ISO week-numbering years subtracted\n *\n * @example\n * // Subtract 5 ISO week-numbering years from 1 September 2014:\n * var result = subISOYears(new Date(2014, 8, 1), 5)\n * //=> Mon Aug 31 2009 00:00:00\n */\nfunction subISOYears (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addISOYears(dirtyDate, -amount)\n}\n\nmodule.exports = subISOYears\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/sub_iso_years/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/sub_milliseconds/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/sub_milliseconds/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addMilliseconds = __webpack_require__(/*! ../add_milliseconds/index.js */ \"./node_modules/date-fns/add_milliseconds/index.js\")\n\n/**\n * @category Millisecond Helpers\n * @summary Subtract the specified number of milliseconds from the given date.\n *\n * @description\n * Subtract the specified number of milliseconds from the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of milliseconds to be subtracted\n * @returns {Date} the new date with the milliseconds subtracted\n *\n * @example\n * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:\n * var result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)\n * //=> Thu Jul 10 2014 12:45:29.250\n */\nfunction subMilliseconds (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addMilliseconds(dirtyDate, -amount)\n}\n\nmodule.exports = subMilliseconds\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/sub_milliseconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/sub_minutes/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/sub_minutes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addMinutes = __webpack_require__(/*! ../add_minutes/index.js */ \"./node_modules/date-fns/add_minutes/index.js\")\n\n/**\n * @category Minute Helpers\n * @summary Subtract the specified number of minutes from the given date.\n *\n * @description\n * Subtract the specified number of minutes from the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of minutes to be subtracted\n * @returns {Date} the new date with the mintues subtracted\n *\n * @example\n * // Subtract 30 minutes from 10 July 2014 12:00:00:\n * var result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)\n * //=> Thu Jul 10 2014 11:30:00\n */\nfunction subMinutes (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addMinutes(dirtyDate, -amount)\n}\n\nmodule.exports = subMinutes\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/sub_minutes/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/sub_months/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/sub_months/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addMonths = __webpack_require__(/*! ../add_months/index.js */ \"./node_modules/date-fns/add_months/index.js\")\n\n/**\n * @category Month Helpers\n * @summary Subtract the specified number of months from the given date.\n *\n * @description\n * Subtract the specified number of months from the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of months to be subtracted\n * @returns {Date} the new date with the months subtracted\n *\n * @example\n * // Subtract 5 months from 1 February 2015:\n * var result = subMonths(new Date(2015, 1, 1), 5)\n * //=> Mon Sep 01 2014 00:00:00\n */\nfunction subMonths (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addMonths(dirtyDate, -amount)\n}\n\nmodule.exports = subMonths\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/sub_months/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/sub_quarters/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/sub_quarters/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addQuarters = __webpack_require__(/*! ../add_quarters/index.js */ \"./node_modules/date-fns/add_quarters/index.js\")\n\n/**\n * @category Quarter Helpers\n * @summary Subtract the specified number of year quarters from the given date.\n *\n * @description\n * Subtract the specified number of year quarters from the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of quarters to be subtracted\n * @returns {Date} the new date with the quarters subtracted\n *\n * @example\n * // Subtract 3 quarters from 1 September 2014:\n * var result = subQuarters(new Date(2014, 8, 1), 3)\n * //=> Sun Dec 01 2013 00:00:00\n */\nfunction subQuarters (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addQuarters(dirtyDate, -amount)\n}\n\nmodule.exports = subQuarters\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/sub_quarters/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/sub_seconds/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/sub_seconds/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addSeconds = __webpack_require__(/*! ../add_seconds/index.js */ \"./node_modules/date-fns/add_seconds/index.js\")\n\n/**\n * @category Second Helpers\n * @summary Subtract the specified number of seconds from the given date.\n *\n * @description\n * Subtract the specified number of seconds from the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of seconds to be subtracted\n * @returns {Date} the new date with the seconds subtracted\n *\n * @example\n * // Subtract 30 seconds from 10 July 2014 12:45:00:\n * var result = subSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)\n * //=> Thu Jul 10 2014 12:44:30\n */\nfunction subSeconds (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addSeconds(dirtyDate, -amount)\n}\n\nmodule.exports = subSeconds\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/sub_seconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/sub_weeks/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/sub_weeks/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addWeeks = __webpack_require__(/*! ../add_weeks/index.js */ \"./node_modules/date-fns/add_weeks/index.js\")\n\n/**\n * @category Week Helpers\n * @summary Subtract the specified number of weeks from the given date.\n *\n * @description\n * Subtract the specified number of weeks from the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of weeks to be subtracted\n * @returns {Date} the new date with the weeks subtracted\n *\n * @example\n * // Subtract 4 weeks from 1 September 2014:\n * var result = subWeeks(new Date(2014, 8, 1), 4)\n * //=> Mon Aug 04 2014 00:00:00\n */\nfunction subWeeks (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addWeeks(dirtyDate, -amount)\n}\n\nmodule.exports = subWeeks\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/sub_weeks/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/sub_years/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/sub_years/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var addYears = __webpack_require__(/*! ../add_years/index.js */ \"./node_modules/date-fns/add_years/index.js\")\n\n/**\n * @category Year Helpers\n * @summary Subtract the specified number of years from the given date.\n *\n * @description\n * Subtract the specified number of years from the given date.\n *\n * @param {Date|String|Number} date - the date to be changed\n * @param {Number} amount - the amount of years to be subtracted\n * @returns {Date} the new date with the years subtracted\n *\n * @example\n * // Subtract 5 years from 1 September 2014:\n * var result = subYears(new Date(2014, 8, 1), 5)\n * //=> Tue Sep 01 2009 00:00:00\n */\nfunction subYears (dirtyDate, dirtyAmount) {\n  var amount = Number(dirtyAmount)\n  return addYears(dirtyDate, -amount)\n}\n\nmodule.exports = subYears\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/date-fns/sub_years/index.js?");

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n\n// The _isBuffer check is for Safari 5-7 support, because it's missing\n// Object.prototype.constructor. Remove this eventually\nmodule.exports = function (obj) {\n  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)\n}\n\nfunction isBuffer (obj) {\n  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)\n}\n\n// For Node v0.10 support. Remove this eventually.\nfunction isSlowBuffer (obj) {\n  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))\n}\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/is-buffer/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/ts-debounce/dist/src/index.js":
/*!****************************************************!*\
  !*** ./node_modules/ts-debounce/dist/src/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.debounce=function(i,e,o){var t;return void 0===e&&(e=50),void 0===o&&(o={isImmediate:!1}),function(){for(var a=[],d=0;d<arguments.length;d++)a[d]=arguments[d];var n=this,m=o.isImmediate&&void 0===t;void 0!==t&&clearTimeout(t),t=setTimeout(function(){t=void 0,o.isImmediate||i.apply(n,a)},e),m&&i.apply(n,a)}};\n//# sourceMappingURL=index.js.map\n\n\n//# sourceURL=webpack://weatherHub/./node_modules/ts-debounce/dist/src/index.js?");

/***/ }),

/***/ "./ts/DataLookup.ts":
/*!**************************!*\
  !*** ./ts/DataLookup.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass DataLookup {\r\n    constructor() {\r\n        this.store = {};\r\n    }\r\n    hasDataForDate(date) {\r\n        let key = this.getKey(date);\r\n        return (key in this.store);\r\n    }\r\n    addData(stationReading) {\r\n        if (!stationReading) {\r\n            return;\r\n        }\r\n        let key = this.getKey(stationReading.when);\r\n        this.store[key] = stationReading;\r\n    }\r\n    getData(date) {\r\n        let key = this.getKey(date);\r\n        if (key in this.store) {\r\n            return this.store[key];\r\n        }\r\n        return null;\r\n    }\r\n    getKey(date) {\r\n        let key = date.toUTCString();\r\n        return key;\r\n    }\r\n}\r\nexports.default = DataLookup;\r\n\n\n//# sourceURL=webpack://weatherHub/./ts/DataLookup.ts?");

/***/ }),

/***/ "./ts/TimeSeriesChart.ts":
/*!*******************************!*\
  !*** ./ts/TimeSeriesChart.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst date_fns_1 = __webpack_require__(/*! date-fns */ \"./node_modules/date-fns/index.js\");\r\nconst DataLookup_1 = __webpack_require__(/*! ./DataLookup */ \"./ts/DataLookup.ts\");\r\nconst svgns = 'http://www.w3.org/2000/svg';\r\nclass TimeSeriesChart {\r\n    constructor(container, showHours, series, tickColor, autoScaleYAxis, yAxisLabels) {\r\n        this.viewBoxHeight = 300;\r\n        this.viewBoxWidth = 900;\r\n        this.dateLabelHeight = 14;\r\n        this.timeLabelHeight = 14;\r\n        this.xAxisTickHeight = 10;\r\n        this.yAxisLabelWidth = 15;\r\n        this.yAxisTickWidth = 5;\r\n        this.yPaddingTop = 5;\r\n        this.yAxisSvgTicks = [];\r\n        this.yAxisSvgLabels = [];\r\n        this.seriesData = new DataLookup_1.default();\r\n        this.autoScaleYAxis = autoScaleYAxis;\r\n        this.yAxisLabels = yAxisLabels;\r\n        this.container = container;\r\n        this.showHours = showHours;\r\n        this.series = series;\r\n        this.numSeries = series.length;\r\n        this.tickColor = tickColor;\r\n        this.labelColor = tickColor;\r\n        this.calculateKeyFigures();\r\n        this.render();\r\n        this.createMissingIntervals();\r\n        this.scheduleNextUpdate();\r\n    }\r\n    addDataPoint(dataPoint) {\r\n        if (dataPoint.seriesData.length != this.numSeries) {\r\n            throw ('Wrong number of series datapoints!');\r\n        }\r\n        if (this.seriesData.hasDataForDate(dataPoint.when)) {\r\n            // update dataPoint and redraw. \r\n            // todo\r\n        }\r\n        else {\r\n            let gPoints = this.renderDataPoint(dataPoint);\r\n            let newSeriesData = {\r\n                when: dataPoint.when,\r\n                seriesData: dataPoint.seriesData,\r\n                gPoints: gPoints\r\n            };\r\n            this.seriesData.addData(newSeriesData);\r\n        }\r\n    }\r\n    renderDataPoint(dataPoint) {\r\n        let timeSeriesChart = this;\r\n        let x = this.getXPosForDate(dataPoint.when);\r\n        let gPoints = dataPoint.seriesData.map(function (seriesDataPoint, seriesIndex) {\r\n            let y = timeSeriesChart.getYPosForValue(seriesDataPoint);\r\n            let gPoint = document.createElementNS(svgns, 'circle');\r\n            gPoint.setAttribute('cx', x.toString());\r\n            gPoint.setAttribute('cy', timeSeriesChart.yZeroPosition.toString());\r\n            gPoint.setAttribute('r', '4');\r\n            gPoint.setAttribute('style', 'stroke:' + timeSeriesChart.series[seriesIndex].color + ';stroke-width:2; fill: none;');\r\n            let gPointAnimation = document.createElementNS(svgns, 'animate');\r\n            gPointAnimation.setAttribute('attributeName', 'cy');\r\n            gPointAnimation.setAttribute('attributeType', 'XML');\r\n            gPointAnimation.setAttribute('from', timeSeriesChart.yZeroPosition.toString());\r\n            gPointAnimation.setAttribute('to', y.toString());\r\n            gPointAnimation.setAttribute('begin', '0');\r\n            gPointAnimation.setAttribute('dur', '0.6s');\r\n            gPointAnimation.setAttribute('repeatCount', '1');\r\n            gPoint.append(gPointAnimation);\r\n            gPoint.setAttribute('cy', y.toString());\r\n            timeSeriesChart.chartSvg.appendChild(gPoint);\r\n            return gPoint;\r\n        });\r\n        return gPoints;\r\n    }\r\n    reRenderDataPoint(dataPoint) {\r\n    }\r\n    calculateKeyFigures() {\r\n        this.xPerMinute = this.viewBoxWidth / (this.showHours * 60);\r\n        this.chartTotalMinutes = this.showHours * 60;\r\n        this.zeroXDate = date_fns_1.addHours(date_fns_1.addMinutes(date_fns_1.startOfMinute(new Date()), 1), -this.showHours);\r\n        // At least 10 units per tick.\r\n        this.minorTickInterval = 0;\r\n        while (this.xPerMinute * this.minorTickInterval < 10) {\r\n            this.minorTickInterval += 10;\r\n        }\r\n        // Atleast 100 pixels per time tick.\r\n        this.timeTickInterval = 0;\r\n        while (this.xPerMinute * this.timeTickInterval < 100) {\r\n            this.timeTickInterval += 15;\r\n        }\r\n        this.minorXTickY1 = this.viewBoxHeight - this.dateLabelHeight - this.timeLabelHeight - this.xAxisTickHeight;\r\n        this.minorXTickY2 = this.minorXTickY1 + this.xAxisTickHeight;\r\n        this.timeCentreY = this.viewBoxHeight - this.dateLabelHeight - (this.timeLabelHeight / 2);\r\n        this.dateCentreY = this.viewBoxHeight - (this.dateLabelHeight / 2);\r\n        this.yAxisXPos = this.yAxisLabelWidth + 2 + this.yAxisTickWidth;\r\n        this.yAxisTickX1 = this.yAxisXPos - this.yAxisTickWidth;\r\n        this.yAxisTickX2 = this.yAxisXPos;\r\n        this.yAxisLabelRightPos = this.yAxisTickX1 - 2;\r\n        this.yZeroPosition = this.minorXTickY1;\r\n    }\r\n    createMissingIntervals() {\r\n        let currentEndDate = date_fns_1.addMinutes(date_fns_1.startOfMinute(new Date()), 1);\r\n        // Populate intervals for base view. \r\n        if (!this.chartIntervals) {\r\n            this.chartIntervals = [];\r\n            let currentDate = new Date(currentEndDate);\r\n            while (date_fns_1.differenceInMinutes(currentEndDate, currentDate) <= this.chartTotalMinutes) {\r\n                let thisInterval = {\r\n                    when: currentDate,\r\n                    datapoints: new Array(this.numSeries)\r\n                };\r\n                this.chartIntervals = [thisInterval, ...this.chartIntervals];\r\n                this.drawXAxisTickAndLabel(thisInterval.when);\r\n                currentDate = date_fns_1.addMinutes(currentDate, -1);\r\n            }\r\n        }\r\n        // Populate intervals going forward\r\n        let currentDate = date_fns_1.addMinutes(this.chartIntervals[this.chartIntervals.length - 1].when, 1);\r\n        while (currentEndDate >= currentDate) {\r\n            let thisInterval = {\r\n                when: currentDate,\r\n                datapoints: new Array(this.numSeries)\r\n            };\r\n            this.chartIntervals.push(thisInterval);\r\n            this.drawXAxisTickAndLabel(thisInterval.when);\r\n            currentDate = date_fns_1.addMinutes(currentDate, 1);\r\n        }\r\n    }\r\n    getXPosForDate(date) {\r\n        return date_fns_1.differenceInMinutes(date, this.zeroXDate) * this.xPerMinute;\r\n    }\r\n    drawXAxisTickAndLabel(date) {\r\n        let x = this.getXPosForDate(date);\r\n        if (date_fns_1.getHours(date) === 0 && date_fns_1.getMinutes(date) === 0) {\r\n            let dateLabel = document.createElementNS(svgns, 'text');\r\n            dateLabel.setAttribute('x', x.toString());\r\n            dateLabel.setAttribute('y', this.dateCentreY.toString());\r\n            dateLabel.setAttribute('text-anchor', 'middle');\r\n            dateLabel.setAttribute('dominant-baseline', 'middle');\r\n            dateLabel.innerHTML = date_fns_1.format(date, 'Do MMM YY');\r\n            dateLabel.setAttribute('style', 'font: 10px sans-serif; fill: ' + this.labelColor + ';');\r\n            this.chartSvg.appendChild(dateLabel);\r\n        }\r\n        if (date_fns_1.getMinutes(date) % this.timeTickInterval === 0) {\r\n            let timeLabel = document.createElementNS(svgns, 'text');\r\n            timeLabel.setAttribute('x', x.toString());\r\n            timeLabel.setAttribute('y', this.timeCentreY.toString());\r\n            timeLabel.setAttribute('text-anchor', 'middle');\r\n            timeLabel.setAttribute('dominant-baseline', 'middle');\r\n            timeLabel.innerHTML = date_fns_1.format(date, 'HH');\r\n            timeLabel.setAttribute('style', 'font: 10px sans-serif; fill: ' + this.labelColor + ';');\r\n            this.chartSvg.appendChild(timeLabel);\r\n        }\r\n        if (date_fns_1.getMinutes(date) % this.minorTickInterval === 0) {\r\n            let tick = document.createElementNS(svgns, 'line');\r\n            tick.setAttribute('x1', x.toString());\r\n            tick.setAttribute('y1', this.minorXTickY1.toString());\r\n            tick.setAttribute('x2', x.toString());\r\n            tick.setAttribute('y2', this.minorXTickY2.toString());\r\n            tick.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:1');\r\n            this.chartSvg.appendChild(tick);\r\n        }\r\n    }\r\n    redrawYAxisTicksAndLabels() {\r\n        if (this.yAxisSvgTicks) {\r\n            this.yAxisSvgTicks.forEach(function (tick) { tick.remove(); });\r\n        }\r\n        if (this.yAxisSvgLabels) {\r\n            this.yAxisSvgLabels.forEach(function (label) { label.remove(); });\r\n        }\r\n        if (this.yAxisLabels && this.yAxisLabels.length > 0) {\r\n            this.drawYAxisFromSuppliedLables();\r\n            return;\r\n        }\r\n        this.drawYAxisBasedOnInViewData();\r\n    }\r\n    drawYAxisFromSuppliedLables() {\r\n        let maxY = Math.max(...this.yAxisLabels.map(function (label) { return label.y; }));\r\n        this.yPixelsPerUnit = (this.viewBoxHeight - (this.viewBoxHeight - this.yZeroPosition) - this.yPaddingTop) / maxY;\r\n        for (let i = 0; i < this.yAxisLabels.length; i++) {\r\n            //let yPos = this.yZeroPosition - (this.yAxisLabels[i].y * this.yPixelsPerUnit);\r\n            let yPos = this.getYPosForValue(this.yAxisLabels[i].y);\r\n            let tick = document.createElementNS(svgns, 'line');\r\n            tick.setAttribute('x1', this.yAxisTickX1.toString());\r\n            tick.setAttribute('x2', this.yAxisTickX2.toString());\r\n            tick.setAttribute('y1', yPos.toString());\r\n            tick.setAttribute('y2', yPos.toString());\r\n            tick.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:1');\r\n            this.yAxisSvg.appendChild(tick);\r\n            this.yAxisSvgTicks.push(tick);\r\n            let label = document.createElementNS(svgns, 'text');\r\n            label.setAttribute('x', this.yAxisLabelRightPos.toString());\r\n            label.setAttribute('y', yPos.toString());\r\n            label.setAttribute('text-anchor', 'end');\r\n            label.setAttribute('dominant-baseline', 'middle');\r\n            label.innerHTML = this.yAxisLabels[i].label;\r\n            label.setAttribute('style', 'font: 10px sans-serif; fill: ' + this.labelColor + ';');\r\n            this.yAxisSvg.appendChild(label);\r\n            this.yAxisSvgLabels.push(label);\r\n        }\r\n    }\r\n    getYPosForValue(value) {\r\n        return this.yZeroPosition - (value * this.yPixelsPerUnit);\r\n    }\r\n    drawYAxisBasedOnInViewData() {\r\n        // TODO\r\n    }\r\n    render() {\r\n        this.yAxisSvg = document.createElementNS(svgns, 'svg');\r\n        this.yAxisSvg.style.width = '100%';\r\n        this.yAxisSvg.style.height = 'auto';\r\n        this.yAxisSvg.style.position = 'absolute';\r\n        this.yAxisSvg.setAttributeNS(null, 'viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);\r\n        this.yAxisSvg.style.width = '100%';\r\n        this.yAxisSvg.style.height = 'auto';\r\n        this.yAxisSvg.style.zIndex = '100';\r\n        this.container.appendChild(this.yAxisSvg);\r\n        let yAxis = document.createElementNS(svgns, 'line');\r\n        yAxis.setAttribute('x1', this.yAxisXPos.toString());\r\n        yAxis.setAttribute('x2', this.yAxisXPos.toString());\r\n        yAxis.setAttribute('y1', this.yPaddingTop.toString());\r\n        yAxis.setAttribute('y2', this.minorXTickY1.toString());\r\n        yAxis.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:2');\r\n        this.yAxisSvg.appendChild(yAxis);\r\n        this.chartSvg = document.createElementNS(svgns, 'svg');\r\n        this.chartSvg.style.width = '100%';\r\n        this.chartSvg.style.height = 'auto';\r\n        this.chartSvg.style.position = 'absolute';\r\n        this.chartSvg.setAttributeNS(null, 'viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);\r\n        this.chartSvg.style.width = '100%';\r\n        this.chartSvg.style.height = 'auto';\r\n        this.container.appendChild(this.chartSvg);\r\n        let xAxis = document.createElementNS(svgns, 'line');\r\n        xAxis.setAttribute('x1', '-99999');\r\n        xAxis.setAttribute('x2', '99999');\r\n        xAxis.setAttribute('y1', this.minorXTickY1.toString());\r\n        xAxis.setAttribute('y2', this.minorXTickY1.toString());\r\n        xAxis.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:2');\r\n        this.chartSvg.appendChild(xAxis);\r\n        this.redrawYAxisTicksAndLabels();\r\n    }\r\n    scheduleNextUpdate() {\r\n        let currentEndDate = date_fns_1.addMinutes(date_fns_1.startOfMinute(new Date()), 1);\r\n        let timeUntilUpdate = date_fns_1.differenceInMilliseconds(currentEndDate, new Date());\r\n        setTimeout(this.updateDisplay.bind(this), timeUntilUpdate);\r\n    }\r\n    updateDisplay() {\r\n        this.createMissingIntervals();\r\n        this.moveToCurrentTime();\r\n        this.scheduleNextUpdate();\r\n    }\r\n    moveToCurrentTime() {\r\n        let currentEndDate = date_fns_1.addMinutes(date_fns_1.startOfMinute(new Date()), 1);\r\n        let currentStartDate = date_fns_1.addHours(currentEndDate, -this.showHours);\r\n        let xOffset = date_fns_1.differenceInMinutes(currentStartDate, this.zeroXDate) * this.xPerMinute;\r\n        this.chartSvg.setAttributeNS(null, 'viewBox', xOffset.toString() + ' 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);\r\n    }\r\n}\r\nexports.default = TimeSeriesChart;\r\n\n\n//# sourceURL=webpack://weatherHub/./ts/TimeSeriesChart.ts?");

/***/ }),

/***/ "./ts/WeatherHubWidget.ts":
/*!********************************!*\
  !*** ./ts/WeatherHubWidget.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst TimeSeriesChart_1 = __webpack_require__(/*! ./TimeSeriesChart */ \"./ts/TimeSeriesChart.ts\");\r\nconst WindRose_1 = __webpack_require__(/*! ./WindRose */ \"./ts/WindRose.ts\");\r\nconst DataLookup_1 = __webpack_require__(/*! ./DataLookup */ \"./ts/DataLookup.ts\");\r\nconst axios_1 = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\r\nconst date_fns_1 = __webpack_require__(/*! date-fns */ \"./node_modules/date-fns/index.js\");\r\nclass WeatherHubWidget {\r\n    constructor(weatherHubServer, weatherStationId, widgetContainer) {\r\n        this.labelColor = \"#000000\";\r\n        this.avgWindColor = \"#27AAE1\";\r\n        this.gustColor = \"#F03153\";\r\n        this.hoursOfDataToLoadOnStart = 48;\r\n        this.weatherStationId = weatherStationId;\r\n        this.weatherHubServer = weatherHubServer;\r\n        this.widgetContainer = widgetContainer;\r\n        this.stationReadingLookup = new DataLookup_1.default();\r\n        this.addSubWidgets();\r\n        this.positionSubWidgets();\r\n        this.initialiseSubWidgets();\r\n        this.loadInitialData();\r\n    }\r\n    addSubWidgets() {\r\n        this.innerContainer = document.createElement('div');\r\n        this.innerContainer.style.position = 'relative';\r\n        this.windRoseContainer = document.createElement(\"div\");\r\n        this.windRoseContainer.style.position = 'absolute';\r\n        this.innerContainer.appendChild(this.windRoseContainer);\r\n        this.windDirectionContainer = document.createElement(\"div\");\r\n        this.windDirectionContainer.style.position = 'absolute';\r\n        this.innerContainer.appendChild(this.windDirectionContainer);\r\n        this.widgetContainer.appendChild(this.innerContainer);\r\n    }\r\n    positionSubWidgets() {\r\n        this.windRoseContainer.style.width = \"400px\";\r\n        this.windRoseContainer.style.height = \"400px\";\r\n        this.windDirectionContainer.style.width = \"700px\";\r\n        this.windDirectionContainer.style.height = \"300px\";\r\n        this.windDirectionContainer.style.left = \"440px\";\r\n    }\r\n    initialiseSubWidgets() {\r\n        this.windRose = new WindRose_1.default(this.windRoseContainer, this.labelColor, this.gustColor, this.labelColor);\r\n        let windStrengthSeries = [\r\n            {\r\n                color: this.avgWindColor,\r\n                label: '10 Min Avg Wind (mph)'\r\n            },\r\n            {\r\n                color: this.gustColor,\r\n                label: '10 Min Max Gust (mph)'\r\n            },\r\n        ];\r\n        let windDirectionSeries = [\r\n            {\r\n                color: this.avgWindColor,\r\n                label: '10 Min Avg Wind (mph)'\r\n            }\r\n        ];\r\n        let windDirectionYAxisLabels = [\r\n            { y: 45, label: 'NE' },\r\n            { y: 90, label: 'E' },\r\n            { y: 135, label: 'SE' },\r\n            { y: 180, label: 'S' },\r\n            { y: 225, label: 'SW' },\r\n            { y: 270, label: 'W' },\r\n            { y: 315, label: 'NW' },\r\n            { y: 360, label: 'N' }\r\n        ];\r\n        this.windDirectionChart = new TimeSeriesChart_1.default(this.windDirectionContainer, 24, windDirectionSeries, this.labelColor, false, windDirectionYAxisLabels);\r\n    }\r\n    loadInitialData() {\r\n        let endRange = new Date();\r\n        let startRange = date_fns_1.addHours(endRange, -this.hoursOfDataToLoadOnStart);\r\n        let url = this.weatherHubServer + '/weather/' + this.weatherStationId + '/historic-readings?rangeStart=' + startRange.toISOString() + '&rangeEnd=' + endRange.toISOString();\r\n        let widget = this;\r\n        axios_1.default.get(url)\r\n            .then(function (response) {\r\n            return response.data.map(function (stationReadingDto) {\r\n                let stationReading = {\r\n                    id: stationReadingDto.id,\r\n                    when: new Date(stationReadingDto.when),\r\n                    dewpointC: stationReadingDto.dewpointC,\r\n                    heatIndexC: stationReadingDto.heatIndexC,\r\n                    pressureMb: stationReadingDto.pressureMb,\r\n                    relativeHumidity: stationReadingDto.relativeHumidity,\r\n                    tempC: stationReadingDto.tempC,\r\n                    windDegrees: stationReadingDto.windDegrees,\r\n                    windAvgMph: stationReadingDto.windAvgMph,\r\n                    windAvgGustMph: stationReadingDto.windAvgGustMph,\r\n                    windChillC: stationReadingDto.windChillC,\r\n                    rainCmPerHour: stationReadingDto.rainCmPerHour,\r\n                };\r\n                return stationReading;\r\n            });\r\n        }, function (reason) {\r\n            console.log(reason);\r\n            if (reason.response && reason.response.data) {\r\n                console.log(reason.response.data);\r\n            }\r\n        })\r\n            .then(function (stationReadings) {\r\n            if (stationReadings) {\r\n                stationReadings.forEach(function (stationReading) {\r\n                    widget.stationReadingLookup.addData(stationReading);\r\n                    widget.broadcastReading(stationReading);\r\n                });\r\n            }\r\n        });\r\n    }\r\n    broadcastReading(stationReading) {\r\n        this.windRose.displayNewDataPoint(stationReading.when, stationReading.windDegrees);\r\n        let directionDataPoint = {\r\n            when: stationReading.when,\r\n            seriesData: [stationReading.windDegrees]\r\n        };\r\n        this.windDirectionChart.addDataPoint(directionDataPoint);\r\n    }\r\n}\r\nexports.default = WeatherHubWidget;\r\n\n\n//# sourceURL=webpack://weatherHub/./ts/WeatherHubWidget.ts?");

/***/ }),

/***/ "./ts/WindRose.ts":
/*!************************!*\
  !*** ./ts/WindRose.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst svgns = 'http://www.w3.org/2000/svg';\r\nconst ts_debounce_1 = __webpack_require__(/*! ts-debounce */ \"./node_modules/ts-debounce/dist/src/index.js\");\r\nclass WindRose {\r\n    constructor(container, tickColor, arrowColor, labelColor) {\r\n        this.renderSize = 600;\r\n        this.currentPos = 0;\r\n        this.mostRecentReading = undefined;\r\n        this.debouncedMoveToPosition = ts_debounce_1.debounce(this.moveToPosition, 100);\r\n        this.container = container;\r\n        this.tickColor = tickColor;\r\n        this.arrowColor = arrowColor;\r\n        this.labelColor = labelColor;\r\n        this.setKeyPoints();\r\n        this.render();\r\n    }\r\n    displayNewDataPoint(when, windDegrees) {\r\n        if (!this.mostRecentReading || this.mostRecentReading < when) {\r\n            this.debouncedMoveToPosition(windDegrees);\r\n            this.mostRecentReading = when;\r\n        }\r\n    }\r\n    moveToPosition(degrees) {\r\n        if (this.arrowAnimation) {\r\n            this.arrowAnimation.setAttribute('type', 'rotate');\r\n            this.arrowAnimation.setAttribute('from', this.currentPos.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());\r\n            this.arrowAnimation.setAttribute('to', degrees.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());\r\n            this.arrow.setAttribute('transform', 'rotate(' + degrees.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString() + ')');\r\n            this.currentPos = degrees;\r\n        }\r\n    }\r\n    setKeyPoints() {\r\n        this.centre = this.renderSize / 2;\r\n        this.tickEndPos = 600 / 18;\r\n    }\r\n    render() {\r\n        this.svg = document.createElementNS(svgns, 'svg');\r\n        this.svg.style.width = '100%';\r\n        this.svg.style.height = 'auto';\r\n        this.svg.setAttributeNS(null, 'viewBox', '0 0 ' + this.renderSize.toString() + ' ' + this.renderSize.toString());\r\n        this.svg.style.width = '100%';\r\n        this.svg.style.height = 'auto';\r\n        this.container.appendChild(this.svg);\r\n        this.drawTicks(10, 2, 45);\r\n        this.drawTicks(7, 1, 5);\r\n        this.drawLabels();\r\n        this.drawArrow();\r\n    }\r\n    drawLabels() {\r\n        let labels = [\r\n            { label: 'N', degrees: 0, isMajor: true },\r\n            { label: 'NE', degrees: 45, isMajor: false },\r\n            { label: 'E', degrees: 90, isMajor: true },\r\n            { label: 'SE', degrees: 135, isMajor: false },\r\n            { label: 'S', degrees: 180, isMajor: true },\r\n            { label: 'SW', degrees: 225, isMajor: false },\r\n            { label: 'W', degrees: 270, isMajor: true },\r\n            { label: 'NW', degrees: 315, isMajor: false },\r\n        ];\r\n        for (let i = 0; i < labels.length; i++) {\r\n            let thisLabel = document.createElementNS(svgns, 'text');\r\n            if (labels[i].isMajor) {\r\n                thisLabel.setAttribute('style', 'font: bold 20px sans-serif; fill: ' + this.labelColor + ';');\r\n            }\r\n            else {\r\n                thisLabel.setAttribute('style', 'font: bold 14px sans-serif; fill: ' + this.labelColor + ';');\r\n            }\r\n            thisLabel.setAttribute('x', '300');\r\n            thisLabel.setAttribute('y', '15');\r\n            thisLabel.setAttribute('text-anchor', 'middle');\r\n            thisLabel.setAttribute('dominant-baseline', 'middle');\r\n            thisLabel.innerHTML = labels[i].label;\r\n            thisLabel.setAttribute('transform', 'rotate(' + labels[i].degrees.toString() + ', 300, 300)');\r\n            this.svg.appendChild(thisLabel);\r\n        }\r\n    }\r\n    drawTicks(length, weight, intervalDegress) {\r\n        let a = 0;\r\n        while (a < 360) {\r\n            let thisTick = document.createElementNS(svgns, 'line');\r\n            thisTick.setAttribute('x1', this.centre.toString());\r\n            thisTick.setAttribute('y1', (this.tickEndPos - length).toString());\r\n            thisTick.setAttribute('x2', this.centre.toString());\r\n            thisTick.setAttribute('y2', this.tickEndPos.toString());\r\n            thisTick.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:' + weight);\r\n            thisTick.setAttribute('transform', 'rotate(' + a + ',' + this.centre + ',' + this.centre + ')');\r\n            this.svg.appendChild(thisTick);\r\n            a += intervalDegress;\r\n        }\r\n    }\r\n    drawArrow() {\r\n        let arrowEndPoint = this.tickEndPos + 15;\r\n        let arrowSize = 25;\r\n        let arrowStartY = arrowEndPoint + arrowSize;\r\n        let points = (this.centre - 3).toString() + ' ' + this.centre.toString();\r\n        points += ',' + (this.centre - 3).toString() + ' ' + arrowStartY.toString();\r\n        points += ',' + (this.centre - (arrowSize / 2)).toString() + ' ' + arrowStartY.toString();\r\n        points += ',' + this.centre.toString() + ' ' + arrowEndPoint.toString();\r\n        points += ',' + (this.centre + (arrowSize / 2)).toString() + ' ' + arrowStartY.toString();\r\n        points += ',' + (this.centre + 3).toString() + ' ' + arrowStartY.toString();\r\n        points += ',' + (this.centre + 3).toString() + ' ' + this.centre.toString();\r\n        this.arrow = document.createElementNS(svgns, 'polygon');\r\n        this.arrow.setAttribute('style', 'fill:' + this.arrowColor + ';');\r\n        this.arrow.setAttribute('points', points);\r\n        this.arrowAnimation = document.createElementNS(svgns, 'animateTransform');\r\n        this.arrowAnimation.setAttribute('attributeName', 'transform');\r\n        this.arrowAnimation.setAttribute('attributeType', 'XML');\r\n        this.arrowAnimation.setAttribute('type', 'rotate');\r\n        this.arrowAnimation.setAttribute('from', this.currentPos.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());\r\n        this.arrowAnimation.setAttribute('to', this.currentPos.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());\r\n        this.arrowAnimation.setAttribute('dur', '0.5s');\r\n        this.arrowAnimation.setAttribute('repeatCount', '1');\r\n        this.arrow.appendChild(this.arrowAnimation);\r\n        this.svg.appendChild(this.arrow);\r\n    }\r\n}\r\nexports.default = WindRose;\r\n\n\n//# sourceURL=webpack://weatherHub/./ts/WindRose.ts?");

/***/ }),

/***/ "./ts/index.ts":
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst WeatherHubWidget_1 = __webpack_require__(/*! ./WeatherHubWidget */ \"./ts/WeatherHubWidget.ts\");\r\nexports.WeatherHubWidget = WeatherHubWidget_1.default;\r\n\n\n//# sourceURL=webpack://weatherHub/./ts/index.ts?");

/***/ })

/******/ });