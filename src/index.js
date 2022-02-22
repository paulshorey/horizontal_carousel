(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.unknown = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var HorizontalCarousel = /*#__PURE__*/_createClass(
  /*
   * To be called in React componentDidMount or similar,
   * after carousel div has been loaded into the DOM.
   * componentDidMount(){
   *    // See React documentation about how to use refs.
   *    this.carousel = new horizontal_carousel(this.ref.current)
   * }
   * or
   * <script>
   *    window.myCarousel = new horizontal_carousel(window.querySelector('#myCarousel')
   * </script>
   */
  function HorizontalCarousel(carousel_element) {
    var _this = this;

    _classCallCheck(this, HorizontalCarousel);

    _defineProperty(this, "end", function () {
      _this.el_prev && _this.el_prev.removeEventListener("click", _this.private_handle_click_prev);
      _this.el_next && _this.el_next.removeEventListener("click", _this.private_handle_click_next);
      _this.el_images && _this.el_images.removeEventListener("click", _this.private_handle_images_scroll);
      window.removeEventListener("click", _this.private_handle_window_resize);
    });

    _defineProperty(this, "private_init_carousel", function () {
      var carousel = _this.carousel; // fix temporary chromium bug - happens to certain horizontal-scrolled elements - even if this script not included
      // actually looks pretty cool - looks intentional - on page load, it scrolls a little, to bring attention to divs

      setTimeout(function () {
        if (typeof carousel === "undefined" || !carousel || !carousel.querySelector) return;
        var slides = carousel.querySelector(".slides");

        if (slides) {
          slides.scrollTo(0, 0);
        }
      }, 1000); // add arrows if not exist

      var arrows = carousel.querySelector(".arrows");

      if (!arrows) {
        _this.private_add_arrows(carousel);
      } // fix arrows (show/hide left/right)


      _this.private_fix_arrows(); // dependents


      var prev = _this.el_prev = carousel.querySelector(".prev");
      var next = _this.el_next = carousel.querySelector(".next");
      var images = _this.el_images = carousel.querySelector(".slides"); // prev/next

      next.addEventListener("click", _this.private_handle_click_next);
      prev.addEventListener("click", _this.private_handle_click_prev);
      /*
       * IMPORTANT: on manual user scroll, fix arrows
       */

      images.addEventListener("scroll", _this.private_handle_images_scroll); // and on window resize, also fix arrows

      window.addEventListener("resize", _this.private_handle_window_resize);
    });

    _defineProperty(this, "private_handle_images_scroll", function () {
      debounce(_this.private_fix_arrows, 100)();
    });

    _defineProperty(this, "private_handle_window_resize", function () {
      debounce(_this.private_fix_arrows, 200)();
    });

    _defineProperty(this, "private_handle_click_next", function () {
      var el_images = _this.el_images; // smooth scroll to next frame

      el_images.scrollBy({
        left: el_images.clientWidth,
        top: 0,
        behavior: "smooth"
      }); // not sure how long the animation will take:

      setTimeout(_this.private_fix_arrows, 500);
      setTimeout(_this.private_fix_arrows, 750);
    });

    _defineProperty(this, "private_handle_click_prev", function () {
      var el_images = _this.el_images; // smooth scroll to next frame

      el_images.scrollBy({
        left: -el_images.clientWidth,
        top: 0,
        behavior: "smooth"
      }); // not sure how long the animation will take:

      setTimeout(_this.private_fix_arrows, 500);
      setTimeout(_this.private_fix_arrows, 750);
    });

    _defineProperty(this, "private_add_arrows", function () {
      var carousel = _this.carousel;
      var arrows = "\n    <div class=\"arrows\">\n      <svg class=\"prev\" viewBox=\"8 8 192 512\">\n        <defs><filter id=\"shadow\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"5\" flood-color=\"black\" /></filter></defs>\n        <path fill=\"currentColor\" stroke=\"white\" stroke-width=\"18\" d=\"M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z\"></path>\n      </svg>\n      <svg class=\"next\" viewBox=\"-8 -8 192 512\"\n        <defs><filter id=\"shadow\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"5\" flood-color=\"black\" /></filter></defs>\n        <path fill=\"currentColor\" stroke=\"white\" stroke-width=\"18\" d=\"M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z\"></path>\n      </svg>\n    </div>\n    "; // insert after slides

      var slides = carousel.querySelector(".slides");
      if (!slides) return; // Mozilla says this does not corrupt existing elements, so should work with React:

      slides.insertAdjacentHTML("afterend", arrows);
    });

    _defineProperty(this, "private_fix_arrows", function () {
      var carousel = _this.carousel;
      var prev = carousel.querySelector(".prev");
      var next = carousel.querySelector(".next");
      var slides = carousel.querySelector(".slides");
      var last_slide = carousel.querySelector(".slides > *:last-child");

      if (slides.scrollLeft === 0) {
        /*
         * scrolled all the way left
         */
        prev.style.opacity = 0;
        prev.style.visibility = "hidden";
      } else {
        prev.style.opacity = 1;
        prev.style.visibility = "visible";
      }

      if (slides.scrollLeft + slides.clientWidth >= slides.scrollWidth - last_slide.clientWidth / 2) {
        /*
         * scrolled all the way right (allow last child to be half cut-off)
         */
        next.style.opacity = 0;
        next.style.visibility = "hidden";
      } else {
        next.style.opacity = 1;
        next.style.visibility = "visible";
      }
    });

    if (!carousel_element || !carousel_element.querySelectorAll) return;
    this.carousel = carousel_element;
    /*
     * Wait for the images to load, then init.
     */

    if (this.carousel) {
      var images = this.carousel.querySelectorAll("img");

      if (images && images.length) {
        /*
         * Find last image in last carousel - wait for it to finish loading.
         */
        var last_image = images[images.length - 1];

        if (last_image && last_image.complete) {
          /*
           * Image is already loaded - probably from browser cache
           */
          this.private_init_carousel();
        } else {
          /*
           * Wait for image to finish loading
           */
          last_image.onload = this.private_init_carousel;
        }
      } else {
        /*
         * No images - fire up that carousel immediately!
         */
        this.private_init_carousel();
      }
    }
  }
  /*
   * Important in an SPA like React. Call .end() when componentWillUnmount()
   * This stops event listeners which were started: el.click, window.scroll, window.resize.
   * componentWillUnmount(){
   *    this.carousel.end()
   * }
   * or
   * <script>
   *    window.myCarousel.end()
   * </script>
   */
  );
  /*
   *
   * HELPER LIB:
   *
   */


  _exports["default"] = HorizontalCarousel;

  function debounce(callback, wait) {
    var timeout = null;
    return function () {
      var callNow = !timeout;

      var next = function next() {
        return callback(arguments);
      };

      clearTimeout(timeout);
      timeout = setTimeout(next, wait);

      if (callNow) {
        next();
      }
    };
  }
  /*
   *
   * EXPORT FOR BROWSER:
   *
   */

  /*
   * Init one carousel (as a class, use "new"):
   * <script>
   *    let myCar = new horizontal_carousel(document.querySelectorAll('.mycarousel'))
   *    // then, optionally, to remove event listeners:
   *    myCar.end()
   * </script>
   *
   * Init multiple carousels (as a function, without "new"):
   * <script>
   *    let refs = horizontal_carousels(document.querySelectorAll('.mycarousel'))
   *    // then, optionally, to remove event listeners:
   *    for (let ref of refs) { ref.end(); }
   * </script>
   */


  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") {
    window.horizontal_carousel = HorizontalCarousel;

    window.horizontal_carousels = function (elements) {
      var refs = [];

      if (elements && elements.length) {
        var _iterator = _createForOfIteratorHelper(elements),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var el = _step.value;
            refs.push(new HorizontalCarousel(el));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return refs;
    };
  }
});
