class HorizontalCarousel {
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
  constructor(carousel_element) {
    if (!carousel_element || !carousel_element.querySelectorAll) return;
    this.carousel = carousel_element;
    /*
     * Wait for the images to load, then init.
     */
    if (this.carousel) {
      let images = this.carousel.querySelectorAll("img");
      if (images && images.length) {
        /*
         * Find last image in last carousel - wait for it to finish loading.
         */
        let last_image = images[images.length - 1];
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
  end = () => {
    this.el_prev && this.el_prev.removeEventListener("click", this.private_handle_click_prev);
    this.el_next && this.el_next.removeEventListener("click", this.private_handle_click_next);
    this.el_images && this.el_images.removeEventListener("click", this.private_handle_images_scroll);
    window.removeEventListener("click", this.private_handle_window_resize);
  };

  /**
   * INITIATE THE CAROUSELS
   *    Run script to bring the carousel to life
   */
  private_init_carousel = () => {
    let { carousel } = this;
    // fix temporary chromium bug - happens to certain horizontal-scrolled elements - even if this script not included
    // actually looks pretty cool - looks intentional - on page load, it scrolls a little, to bring attention to divs
    setTimeout(function() {
      if (typeof carousel === "undefined" || !carousel || !carousel.querySelector) return;
      let slides = carousel.querySelector(".slides");
      if (slides) {
        slides.scrollTo(0, 0);
      }
    }, 1000);
    // add arrows if not exist
    let arrows = carousel.querySelector(".arrows");
    if (!arrows) {
      this.private_add_arrows(carousel);
    }
    // fix arrows (show/hide left/right)
    this.private_fix_arrows();
    // dependents
    let prev = (this.el_prev = carousel.querySelector(".prev"));
    let next = (this.el_next = carousel.querySelector(".next"));
    let images = (this.el_images = carousel.querySelector(".slides"));
    // prev/next
    next.addEventListener("click", this.private_handle_click_next);
    prev.addEventListener("click", this.private_handle_click_prev);

    /*
     * IMPORTANT: on manual user scroll, fix arrows
     */
    images.addEventListener("scroll", this.private_handle_images_scroll);
    // and on window resize, also fix arrows
    window.addEventListener("resize", this.private_handle_window_resize);
  };
  private_handle_images_scroll = () => {
    debounce(this.private_fix_arrows, 100)();
  };
  private_handle_window_resize = () => {
    debounce(this.private_fix_arrows, 200)();
  };
  private_handle_click_next = () => {
    let { el_images } = this;
    // smooth scroll to next frame
    el_images.scrollBy({ left: el_images.clientWidth, top: 0, behavior: "smooth" });
    // not sure how long the animation will take:
    setTimeout(this.private_fix_arrows, 500);
    setTimeout(this.private_fix_arrows, 750);
  };
  private_handle_click_prev = () => {
    let { el_images } = this;
    // smooth scroll to next frame
    el_images.scrollBy({ left: -el_images.clientWidth, top: 0, behavior: "smooth" });
    // not sure how long the animation will take:
    setTimeout(this.private_fix_arrows, 500);
    setTimeout(this.private_fix_arrows, 750);
  };
  /**
   * ADD ARROW ELEMENTS (prev/next buttons)
   */
  private_add_arrows = () => {
    let { carousel } = this;
    let arrows = `
    <div class="arrows">
      <svg class="prev" viewBox="8 8 192 512">
        <defs><filter id="shadow"><feDropShadow dx="5" dy="10" stdDeviation="5" flood-color="black" /></filter></defs>
        <path fill="currentColor" stroke="white" stroke-width="18" d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"></path>
      </svg>
      <svg class="next" viewBox="-8 -8 192 512"
        <defs><filter id="shadow"><feDropShadow dx="5" dy="10" stdDeviation="5" flood-color="black" /></filter></defs>
        <path fill="currentColor" stroke="white" stroke-width="18" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    </div>
    `;
    // insert after slides
    let slides = carousel.querySelector(".slides");
    if (!slides) return;
    // Mozilla says this does not corrupt existing elements, so should work with React:
    slides.insertAdjacentHTML("afterend", arrows);
  };
  /**
   * Hide left/right arrows when scrolled all the way left/right.
   */
  private_fix_arrows = () => {
    let { carousel } = this;
    let prev = carousel.querySelector(".prev");
    let next = carousel.querySelector(".next");
    let slides = carousel.querySelector(".slides");
    let last_slide = carousel.querySelector(".slides > *:last-child");
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
  };
}

/*
 *
 * HELPER LIB:
 *
 */
function debounce(callback, wait) {
  let timeout = null;
  return function() {
    const callNow = !timeout;
    const next = function() {
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
 * EXPORT MODULE
 *
 */
export default HorizontalCarousel;

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
if (typeof window === "object") {
  window.horizontal_carousel = HorizontalCarousel;
  window.horizontal_carousels = function(elements) {
    let refs = [];
    if (elements && elements.length) {
      for (let el of elements) {
        refs.push(new HorizontalCarousel(el));
      }
    }
    return refs;
  };
}
