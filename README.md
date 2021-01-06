# Why?

1. This carousel is very simple to install, very lightweight, and very customizable. It can be styled for any use case, and display any type of content.
2. This carousel supports variable-width slides. Unlike others I've tried. Each slide in this can have any aspect ratio. Others I've tried force you to make all slides exactly the same aspect ratio. That's no fun.
3. It's useful, and flexible. Currently using on a statically rendered React site. It even works in Webpack's dev environment. In the future I plan to extend and use for all sorts of thing, for personal projects and client sites/apps.

# 1. Install

Include the JS and CSS files into your HTML, any way you want to. Copy/paste the CSS or as `<script` and `<link` tags.

```
<script src="/path/to/horizontal_carousel.js"></script>
<link href="/path/to/horizontal_carousel.css" rel="stylesheet" type="text/css" />
```

# 2. Minimal usage

Simply include this HTML into your site. You can have multiple different slideshows. The script will figure it out!

```
<div class="horizontal_carousel">
  <div class="slides">
    <img src="path/to/photo1.jpg" />
    <img src="path/to/photo2.jpg" />
    <img src="path/to/photo3.jpg" />
    <img src="path/to/photo4.jpg" />
    <img src="path/to/photo5.jpg" />
    <img src="path/to/photo6.jpg" />
  </div>
</div>
```

# 3. Fail-safe

In case the JavaScript/CSS does not load (bad internet, misplaced file), add these CSS styles to your site. A "fall-back". With this, the carousel will still look decent, horizontal, not just a column of images!

```scss
.horizontal_carousel {
  // define color for prev/next arrows:
  color: var(--color-attention);

  // default styles in case JS does not load:
  white-space: nowrap;
  overflow: auto;

  // your choice of height/margin:
  height: 9.25rem;
  .slides > * {
    margin-right: 0.25rem;
  }
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

The only requirement for the slideshow is that you include a parent element with `class="horizontal_carousel"` and inside it a child element with `class="slides"`. Inside that, include a list of elements. Any tag name, any style, any content...

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

Built by Paul for paulshorey.com. Not tested at all outside that one site! Please contact me if you'd like to work on this together.
