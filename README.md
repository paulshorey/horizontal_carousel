# Why?

1. This carousel is very simple to install, very lightweight, and very customizable. It can be styled for any use case, and display any type of content.
2. This carousel supports variable-width slides. Unlike others I've tried. Each slide in this can have any aspect ratio. Others I've tried force you to make all slides exactly the same aspect ratio. That's no fun.

# 1. Install
[![npm package](https://img.shields.io/npm/v/horizontal_carousel.svg)](https://www.npmjs.com/package/horizontal_carousel)

Include the JS and CSS files into your HTML, any way you want to. Copy/paste the CSS or as `<script` and `<link` tags. Change @latest to @x.x.x npm version. Better yet, download files, and serve locally.

```
<script src="https://cdn.jsdelivr.net/npm/horizontal_carousel@latest/window/index.js"></script>
<link href="https://cdn.jsdelivr.net/npm/horizontal_carousel@latest/css/default.css" rel="stylesheet" type="text/css" />
```
or if you're using a framework like React:
```
import "horizontal_carousel/css/default.css"
import horizontal_carousel from "horizontal_carousel/esm"
/* change "/esm" to "/cjs" if you're using CommonJS */
```

Only one requirement: the carousel div must contain `.slides`. Children of `.slides` are the contents to be scrolled, they can be anything.

For the default CSS, the parent element must use `.horizontal_carousel` class name. Sorry about the underscore for people who don't like that. I like to use underscores (in personal projects) to keep variable names consistent. NPM does not allow capitalization. JS vars don't allow dashes. How do you prefer to name things?
```
<div class="horizontal_carousel" id="myCarousel">
  <div class="slides">
    <img src="path/to/photo1.jpg" />
    <img src="path/to/photo2.jpg" />
    <img src="path/to/photo3.jpg" />
    <img src="path/to/photo4.jpg" />
    <img src="path/to/photo5.jpg" />
  </div>
</div>
```

# 2. Init
In an app:
```
   componentDidMount(){
      // See React documentation about how to use refs.
      this.carousel = new horizontal_carousel(this.ref.current)
   }
   componentWillUnmount(){
      // This is important, to clean up event listeners!
      this.carousel.end()
   }
```
In the browser:
```
  <body>
    ...
    <!-- Init one carousel (as a class, use "new"): -->
    <script>
       let myCar = new horizontal_carousel(document.querySelectorAll('#myCarousel'))
       // then, optionally, to remove event listeners:
       myCar.end()
    </script>

    <!-- Init multiple carousels (as a function, without "new"): -->
    <script>
       let refs = horizontal_carousels(document.querySelectorAll('.horizontal_carousel'))
       // then, optionally, to remove event listeners:
       for (let ref of refs) { ref.end(); }
    </script>
  </body>
```

# 3. Fail-safe

In case the JavaScript/CSS does not load (bad internet, misplaced file), you may want to add this CSS styles to your site as a "fall-back". With this, the carousel will still look decent, horizontal, not just a column of images!

```scss
.horizontal_carousel {
  // define color for prev/next arrows:
  color: orange;
  // default styles in case JS does not load:
  white-space: nowrap;
  overflow: auto;
  // your choice of height/margin:
  img {
    height: 9rem;
    width: auto;
  }
}
```

# 4. Advanced usage

Override default styles as needed. If you don't like the arrows which come by default with the carousel, specify your own. This script checks for a `class="arrows"` element before injecting its own arrows. If you add your own arrows, you can add whatever styles, classes, IDs, and inner HTML to them. HOWEVER, do put at least a `class="arrows"` on the container, a `class="prev"` on the left arrow and `class="next"` on the right arrow.

```
<div class="horizontal_carousel">
  <div class="slides">
    ...
  </div>
  <div class="arrows customArrows">
    <div class="prev customArrow">
      &laquo; scroll left
    </div>
    <div class="next customArrow">
      &raquo; scroll right
    </div>
  </div>
</div>
```

The only requirement for the slideshow is that it contains an element `class="slides"`. Inside this can be any type of content.

```
<div class="horizontal_carousel">
  <div class="slides">
    <div className="customSlide1">
      <p>Custom content in side one of the slides</p>
    </div>
    <div id="customSlide2">
      <img src="/path/to/image.jpg" />
    </div>
    <a href="/photos/me/via-ferrata.jpg" data-title="Via Ferrata is my new favorite adventure sport. Started in Italy, it lets you mountain-climb safely and effortlessly.">
      <img src="/photos/me/_thumb-via-ferrata.jpg" />
    </a>
    <a href="/photos/aboutus/aboutus-utah-road.jpg" data-title="Moved out of California, the trip cross country was fun. Colorado is beautiful. Everyone there is awesome!">
      <img src="/photos/aboutus/_thumb-aboutus-utah-road.jpg" />
    </a>
    <ul>
      <li>Remember to style this yourself.</li>
      <li>BTW, this is not tested at all!</li>
      <li>I assume this will work. LOL.</li>
    </ul>
  </div>
</div>
```

# About

Built by Paul originally for paulshorey.com. Then converted to a module for https://besta.domains. Not tested except on these two sites. Please let me know if it works for you. Please star. Please feel free to contribute.
