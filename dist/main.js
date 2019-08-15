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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", function () {
    window.arr = [];

    window.address_lat_lng = [];
    var map = void 0;
    var overlay = void 0;

    d3.csv("./src/assets/output2.csv").then(function (data) {

        data.forEach(function (row) {

            var new_obj = {};
            new_obj["ADDRESS"] = row["ADDRESS"];
            new_obj["SALEDATE"] = row["SALE DATE"];
            new_obj["SALEPRICE"] = row["SALE PRICE"];
            new_obj["lat"] = row["lat"];
            new_obj["long"] = row["long"];

            window.arr.push(new_obj);
        });

        for (var i = 0; i < 100; i++) {
            window.address_lat_lng.push(window.arr[i]);
        }
    });

    // });


    // window.initMap = () => {

    var bound = new google.maps.LatLngBounds();
    for (d in window.address_lat_lng) {
        long = +window.address_lat_lng[d].long;
        lat = +window.address_lat_lng[d].lat;
        bound.extend(new google.maps.LatLngBounds(lat, long));
    }

    map = new window.google.maps.Map(d3.select("#map").node(), {
        zoom: 12,
        center: { lat: 40.730610, lng: -73.935242 }
    });
    window.map = map;

    // }
    map.fitBounds(bound);
    // window.initMap();

    d3.json('./properties2.json').then(function (error, data) {
        overlay = new google.maps.OverlayView();
        // debugger
        overlay.onAdd = function () {
            // debugger
            var layer = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "stations");
            // debugger
            overlay.draw = function () {
                var projection = this.getProjection(),
                    padding = 50;

                // debugger
                var marker = layer.selectAll("svg").data(d3.entries(window.address_lat_lng)).each(transform).enter().append("svg").each(transform).attr("class", "marker");
                // debugger

                marker.append("circle").attr("r", 4.5).attr("cx", padding).attr("cy", padding);

                marker.append("text").attr("x", padding + 7).attr("y", padding).attr("dy", ".31em").text(function (d) {

                    return d.key;
                });

                function transform(d) {
                    // debugger
                    d = new google.maps.LatLng(parseFloat(d.value.lat), parseFloat(d.value.long));
                    d = projection.fromLatLngToDivPixel(d);
                    // debugger
                    return d3.select(this).style("left", d.x - padding + "px").style("top", d.y - padding + "px");
                }
            };
            // debugger
        };
        // debugger
        overlay.setMap(map);
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpbmRvdyIsImFyciIsImFkZHJlc3NfbGF0X2xuZyIsIm1hcCIsIm92ZXJsYXkiLCJkMyIsImNzdiIsInRoZW4iLCJkYXRhIiwiZm9yRWFjaCIsInJvdyIsIm5ld19vYmoiLCJwdXNoIiwiaSIsImJvdW5kIiwiZ29vZ2xlIiwibWFwcyIsIkxhdExuZ0JvdW5kcyIsImQiLCJsb25nIiwibGF0IiwiZXh0ZW5kIiwiTWFwIiwic2VsZWN0Iiwibm9kZSIsInpvb20iLCJjZW50ZXIiLCJsbmciLCJmaXRCb3VuZHMiLCJqc29uIiwiZXJyb3IiLCJPdmVybGF5VmlldyIsIm9uQWRkIiwibGF5ZXIiLCJnZXRQYW5lcyIsIm92ZXJsYXlMYXllciIsImFwcGVuZCIsImF0dHIiLCJkcmF3IiwicHJvamVjdGlvbiIsImdldFByb2plY3Rpb24iLCJwYWRkaW5nIiwibWFya2VyIiwic2VsZWN0QWxsIiwiZW50cmllcyIsImVhY2giLCJ0cmFuc2Zvcm0iLCJlbnRlciIsInRleHQiLCJrZXkiLCJMYXRMbmciLCJwYXJzZUZsb2F0IiwidmFsdWUiLCJmcm9tTGF0TG5nVG9EaXZQaXhlbCIsInN0eWxlIiwieCIsInkiLCJzZXRNYXAiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7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QURKLEVBQ2FwQyxFQUFFcUMsQ0FBRixHQUFNZCxPQUFQLEdBQWtCLElBRDlCLEVBRUZhLEtBRkUsQ0FFSSxLQUZKLEVBRVlwQyxFQUFFc0MsQ0FBRixHQUFNZixPQUFQLEdBQWtCLElBRjdCLENBQVA7QUFHSDtBQUNKLGFBckNEO0FBc0NBO0FBQ0gsU0EzQ0Q7QUE0Q0E7QUFDQXJDLGdCQUFRcUQsTUFBUixDQUFldEQsR0FBZjtBQUtILEtBckREO0FBdURILENBdEhELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKT0+e1xuICAgIHdpbmRvdy5hcnIgPSBbXTtcblxuICAgIHdpbmRvdy5hZGRyZXNzX2xhdF9sbmcgPSBbXTtcbiAgICBsZXQgbWFwO1xuICAgIGxldCBvdmVybGF5O1xuXG5cbiAgICBkMy5jc3YoXCIuL3NyYy9hc3NldHMvb3V0cHV0Mi5jc3ZcIikudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgIGRhdGEuZm9yRWFjaCgocm93KSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBuZXdfb2JqID0ge31cbiAgICAgICAgICAgIG5ld19vYmpbXCJBRERSRVNTXCJdID0gcm93W1wiQUREUkVTU1wiXTtcbiAgICAgICAgICAgIG5ld19vYmpbXCJTQUxFREFURVwiXSA9IHJvd1tcIlNBTEUgREFURVwiXTtcbiAgICAgICAgICAgIG5ld19vYmpbXCJTQUxFUFJJQ0VcIl0gPSByb3dbXCJTQUxFIFBSSUNFXCJdO1xuICAgICAgICAgICAgbmV3X29ialtcImxhdFwiXSA9IHJvd1tcImxhdFwiXTtcbiAgICAgICAgICAgIG5ld19vYmpbXCJsb25nXCJdID0gcm93W1wibG9uZ1wiXTtcblxuICAgICAgICAgICAgd2luZG93LmFyci5wdXNoKG5ld19vYmopO1xuXG4gICAgICAgIH0pXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgd2luZG93LmFkZHJlc3NfbGF0X2xuZy5wdXNoKHdpbmRvdy5hcnJbaV0pO1xuXG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG5cblxuXG5cblxuXG5cblxuICAgIC8vIH0pO1xuXG5cbiAgICAvLyB3aW5kb3cuaW5pdE1hcCA9ICgpID0+IHtcblxuICAgIGxldCBib3VuZCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICBmb3IgKGQgaW4gd2luZG93LmFkZHJlc3NfbGF0X2xuZyApe1xuICAgICAgICBsb25nID0gK3dpbmRvdy5hZGRyZXNzX2xhdF9sbmdbZF0ubG9uZztcbiAgICAgICAgbGF0ID0gK3dpbmRvdy5hZGRyZXNzX2xhdF9sbmdbZF0ubGF0O1xuICAgICAgICBib3VuZC5leHRlbmQobmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyhsYXQsbG9uZykpO1xuXG5cbiAgICB9XG5cblxuICAgICAgICBtYXAgPSBuZXcgd2luZG93Lmdvb2dsZS5tYXBzLk1hcChkMy5zZWxlY3QoXCIjbWFwXCIpLm5vZGUoKSwge1xuICAgICAgICAgICAgem9vbTogMTIsXG4gICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43MzA2MTAsIGxuZzogLTczLjkzNTI0MiB9LFxuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93Lm1hcCA9IG1hcDtcbiAgICAgICAgXG4gICAgLy8gfVxuICAgICAgbWFwLmZpdEJvdW5kcyhib3VuZCk7XG4gICAgLy8gd2luZG93LmluaXRNYXAoKTtcblxuICAgIGQzLmpzb24oJy4vcHJvcGVydGllczIuanNvbicpLnRoZW4oZnVuY3Rpb24gKGVycm9yLGRhdGEpIHtcbiAgICAgICAgb3ZlcmxheSA9IG5ldyBnb29nbGUubWFwcy5PdmVybGF5VmlldygpO1xuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICBvdmVybGF5Lm9uQWRkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgIGxldCBsYXllciA9IGQzLnNlbGVjdCh0aGlzLmdldFBhbmVzKCkub3ZlcmxheUxheWVyKS5hcHBlbmQoXCJkaXZcIikuYXR0cihcImNsYXNzXCIsIFwic3RhdGlvbnNcIik7XG4gICAgICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgICAgb3ZlcmxheS5kcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3Rpb24gPSB0aGlzLmdldFByb2plY3Rpb24oKSxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZyA9IDUwO1xuXG4gICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgICAgICBsZXQgbWFya2VyID0gbGF5ZXIuc2VsZWN0QWxsKFwic3ZnXCIpXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKGQzLmVudHJpZXMod2luZG93LmFkZHJlc3NfbGF0X2xuZykpXG4gICAgICAgICAgICAgICAgICAgIC5lYWNoKHRyYW5zZm9ybSlcbiAgICAgICAgICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAgICAgICAgICAgICAuZWFjaCh0cmFuc2Zvcm0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJtYXJrZXJcIilcbiAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxuXG4gICAgICAgICAgICAgICAgbWFya2VyLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcInJcIiwgNC41KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcImN4XCIsIHBhZGRpbmcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiY3lcIiwgcGFkZGluZyk7XG5cbiAgICAgICAgICAgICAgICBtYXJrZXIuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcInhcIiwgcGFkZGluZyArIDcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieVwiLCBwYWRkaW5nKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcImR5XCIsIFwiLjMxZW1cIilcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmtleTsgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdHJhbnNmb3JtKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgICAgICAgICAgZCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcocGFyc2VGbG9hdChkLnZhbHVlLmxhdCksIHBhcnNlRmxvYXQoZC52YWx1ZS5sb25nKSk7XG4gICAgICAgICAgICAgICAgICAgIGQgPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKGQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChkLnggLSBwYWRkaW5nKSArIFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZC55IC0gcGFkZGluZykgKyBcInB4XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgIH1cbiAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgb3ZlcmxheS5zZXRNYXAobWFwKTtcblxuICAgICAgICBcbiAgICAgICAgXG5cbiAgICB9KTtcblxufSlcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==