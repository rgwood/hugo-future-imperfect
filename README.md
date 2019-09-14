# hugo-future-imperfect

A modern theme for the [Hugo](https://gohugo.io/) static site generator. 

This is a heavily modified version of [Julio Pescador's Future Imperfect](https://github.com/jpescador/hugo-future-imperfect), which itself is a port of [HTML5 UP's theme](http://html5up.net/future-imperfect)
by the same name. The latest version can be seen at my personal website [reillywood.com](https://reillywood.com).

![Dark mode screenshot](/website_dark.png)

## What's new since @jpescador's version?

This is a very large rewrite focused on styling, performance, and developer tooling. I've done the following:

1. Rewrote the CSS using [Tailwind CSS](https://tailwindcss.com/)
    1. The original Hugo theme worked well, but it had [3000 lines of CSS in a single file](https://github.com/jpescador/hugo-future-imperfect/blob/master/static/css/main.css) - it was very difficult to make styling changes 
    1. Tailwind's generated CSS is automatically pruned using [PurgeCSS](https://www.purgecss.com/) as part of a PostCSS workflow to keep file sizes down
    1. The layout looks roughly the same as before, but I've made a lot of small tweaks and rewritten how categories look
1. [Added a dark mode](https://www.reillywood.com/blog/dark-mode/) using the new `prefers-color-scheme` media query and the [Solarized](https://ethanschoonover.com/solarized/) colour scheme
1. Rewrote the JavaScript to remove the dependency on JQuery
1. The full FontAwesome icon set has been replaced with a custom font from [IcoMoon](https://icomoon.io/) that only contains the icons used in the website 
    * Yes, I went a bit overboard with performance
1. Replaced the [Fancybox](http://fancyapps.com/fancybox/3/) lightbox with a customized [Flickity](https://flickity.metafizzy.co/) implementation
    * This allows for nicer fullscreen interactions, image carousels, and best of all – no JQuery
1. Replaced the [highlight.js](https://highlightjs.org/) client-side code syntax highlighting with [Hugo's compile-time highlighting](https://gohugo.io/content-management/syntax-highlighting/).
1. The theme now uses Hugo's built-in bundling and minification for CSS and JS files.
1. Generated HTML is automatically formatted using [Prettier](https://prettier.io/)
1. CSS is automatically linted using [Stylelint](https://stylelint.io/)
1. There are new shortcodes for images, email obfuscation, card elements...
1. Site search is now done with [DuckDuckGo](https://duckduckgo.com) instead of Google
1. Social sharing functionality has been removed, because I am a grouch about that.

## Basic Setup

1. Edit `config.toml`. This is where most configuration occurs.
1. Replace the /static/img/main/headshot.jpg file with a photo of yourself (unless you look a *lot* like me)
1. Create a new post with `hugo new blog/post-name.md`
1. `npm run serve-dev` and enjoy!

## OK, what's the catch?

This is still a work in progress, and it's heavily customized for my own needs. There are some places where I've hardcoded values that are only relevant to me – but they should be pretty easy to swap out.

Some parts that I think are especially in need of attention:

1. The CSS for my custom Flickity implementation is a bit hacky, it should be rewritten
1. `srcset` for responsive images in Flickity is disabled for now, it kept loading the responsive image *and* the non-responsive fallback image. Spend some time figuring this out
1. I have not implemented error code pages (404 etc.) in the same style as the rest of the site
1. Need to spend a couple hours tidying this up for public use – move hardcoded functionality into Hugo variables, remove all obsolete functionality from the old theme