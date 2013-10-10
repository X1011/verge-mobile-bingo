### infrastructure

I started with the [Yeoman](http://yeoman.io) Angular generator, which set me up with a template for an [AngularJS](http://angularjs.org) app that includes:

- [Bower](http://bower.io) for front-end package management
- [Jasmine](http://pivotal.github.io/jasmine) to write tests
- [Karma](http://karma-runner.github.io) to run tests
- a minifying [Grunt](http://gruntjs.com) build task
- [LiveReload](http://livereload.com) to automatically update the page in my browser whenever I save a file

There were some things missing for a full continuous deployment system, though, so I:

- created a task to automatically run [JSHint](http://jshint.com) and the unit tests whenever I save a file
- got the test and build running on 5 different CI services to compare them and see which one I liked best
	- I had to [define the project's dependencies](https://github.com/X1011/verge-mobile-bingo/compare/153d2399f...9d61731677?w=1#diff-3) more rigorously than the Yeoman template did, because it makes some implicit assumptions about the development environment.
- wrote and open sourced [a script](https://github.com/X1011/git-directory-deploy) to deploy to [GitHub Pages](http://pages.github.com)
- [set Travis CI to deploy](https://github.com/X1011/verge-mobile-bingo/compare/32c2f7818f...15f14caaee) all successfully tested and built changes using a GitHub OAuth token stored in a secure environment variable

### initial development

- basic board implementation
	- populate squares with phrases from a list
	- click on squares to toggle marked status
- setup Google Analytics
- register vergemobilebingo.com domain with [DreamHost](http://dreamhost.com), set DNS A record and CNAME to point it to the site hosted on GitHub Pages
- switch to minified version of Angular hosted on CDN [at build time](https://github.com/X1011/verge-mobile-bingo/compare/9beabadb09...caa9f1f4ba#diff-0), to improve page loading time
	- Yeoman came with the [grunt-google-cdn](https://github.com/btford/grunt-google-cdn) task, but [I discovered](https://github.com/yeoman/generator-angular/issues/266#issuecomment-25745857) that the way it's implemented makes keeping it up to date with the latest versions of libraries problematic, so I decided to use a simpler solution for now.
- social sharing buttons via [Po.st](http://po.st), with integrated analytics and monetization
	- [integrated](http://plnkr.co/zVhcfF) a [GitHub star button](http://ghbtns.com) into the widget and styled it to match
- [set viewport size](https://github.com/X1011/verge-mobile-bingo/commit/db7350ddaa6ccb50276f2af8fa2d537e8b62e975) so that the entire board is visible without having to manually zoom out on mobile devices with small screens

### board sizing

Originally, I wanted to scale the board dynamically to fit the viewport, and I implemented [a CSS hack](https://github.com/X1011/verge-mobile-bingo/commit/6db1f14de31ff2220323aaa96b0123765c6f68b5) to do so while retaining its square shape. However, while experimenting with the limit of how small the board could become without deforming, I realized that there were only 2 cases:

- The viewport is smaller than the limit.
	- In this case, I don't want to deform the board to make it fit; I just want the browser to zoom out.
	- I could theoretically reduce the padding in this case, but that would only buy me a maximum of 5em (about 80px), would probably require a media query, and might not even look better than just zooming out.
- The viewport is larger than the limit.
	- In this case, the text doesn't (currently) expand to use the extra space, so I'm just shuffling empty space around.
	- The only advantage to expanding the board would be larger click/tap targets, but they're big enough already.

So there's no real advantage to making the board any other size than the lower limit. What's more, this lower limit depends only on the size of the biggest phrase, which is fixed right now, and the font size. Therefore, I can [specify the board size](https://github.com/X1011/verge-mobile-bingo/commit/42746e1a16e70432d9c6b5888ceeea7c3e340bce) in a fixed number of [ems](http://en.wikipedia.org/wiki/Em_(typography)). This allows me to keep using a table, which has several advantages:

- I don't have to worry about squares escaping grid formation. (With floating divs, if the sizing isn't just right, the last square in a row can wrap around and appear below the first one.)
- I don't have to worry about text overflowing its square in case of some inconsistency in font size. The row will just expand slightly to fit.
- I can use `vertical-align: middle` instead of weird hacks for vertically centering text
- It's a self-contained block element that fits nicely into the page (no need to clear floats). I was also having an issue with specifying a bottom margin on the board with the floating div approach that I never figured out.
- I don't have to use CSS hacks.

I may revisit this if I ever implement [viewport-relative font scaling](http://demosthenes.info/blog/739/Creating-Responsive-Hero-Text-With-vw-Units).

### to do

- measure actual use with Google Analytics event tracking 
- persistence, to survive page unloads in mobile browsers
- board randomization
- favicon
- free space
- win detection
- win sharing

&nbsp;
> Written with [StackEdit](http://benweet.github.io/stackedit/).  ### infrastructure

I started with the [Yeoman](http://yeoman.io) Angular generator, which set me up with a template for an [AngularJS](http://angularjs.org) app that includes:

- [Bower](http://bower.io) for front-end package management
- [Jasmine](http://pivotal.github.io/jasmine) to write tests
- [Karma](http://karma-runner.github.io) to run tests
- a minifying [Grunt](http://gruntjs.com) build task
- [LiveReload](http://livereload.com) to automatically update the page in my browser whenever I save a file

There were some things missing for a full continuous deployment system, though, so I:

- created a task to automatically run [JSHint](http://jshint.com) and the unit tests whenever I save a file
- got the test and build running on 5 different CI services to compare them and see which one I liked best
	- I had to [define the project's dependencies](https://github.com/X1011/verge-mobile-bingo/compare/153d2399f...9d61731677?w=1#diff-3) more rigorously than the Yeoman template did, because it makes some implicit assumptions about the development environment.
- wrote and open sourced [a script](https://github.com/X1011/git-directory-deploy) to deploy to [GitHub Pages](http://pages.github.com)
- [set Travis CI to deploy](https://github.com/X1011/verge-mobile-bingo/compare/32c2f7818f...15f14caaee) all successfully tested and built changes using a GitHub OAuth token stored in a secure environment variable

### initial development

- basic board implementation
	- populate squares with phrases from a list
	- click on squares to toggle marked status
- setup Google Analytics
- register vergemobilebingo.com domain with [DreamHost](http://dreamhost.com), set DNS A record and CNAME to point it to the site hosted on GitHub Pages
- switch to minified version of Angular hosted on CDN [at build time](https://github.com/X1011/verge-mobile-bingo/compare/9beabadb09...caa9f1f4ba#diff-0), to improve page loading time
	- Yeoman came with the [grunt-google-cdn](https://github.com/btford/grunt-google-cdn) task, but [I discovered](https://github.com/yeoman/generator-angular/issues/266#issuecomment-25745857) that the way it's implemented makes keeping it up to date with the latest versions of libraries problematic, so I decided to use a simpler solution for now.
- social sharing buttons via [Po.st](http://po.st), with integrated analytics and monetization
	- [integrated](http://plnkr.co/zVhcfF) a [GitHub star button](http://ghbtns.com) into the widget and styled it to match
- [set viewport size](https://github.com/X1011/verge-mobile-bingo/commit/db7350ddaa6ccb50276f2af8fa2d537e8b62e975) so that the entire board is visible without having to manually zoom out on mobile devices with small screens

### board sizing

Originally, I wanted to scale the board dynamically to fit the viewport, and I implemented [a CSS hack](https://github.com/X1011/verge-mobile-bingo/commit/6db1f14de31ff2220323aaa96b0123765c6f68b5) to do so while retaining its square shape. However, while experimenting with the limit of how small the board could become without deforming, I realized that there were only 2 cases:

- The viewport is smaller than the limit.
	- In this case, I don't want to deform the board to make it fit; I just want the browser to zoom out.
	- I could theoretically reduce the padding in this case, but that would only buy me a maximum of 5em (about 80px), would probably require a media query, and might not even look better than just zooming out.
- The viewport is larger than the limit.
	- In this case, the text doesn't (currently) expand to use the extra space, so I'm just shuffling empty space around.
	- The only advantage to expanding the board would be larger click/tap targets, but they're big enough already.

So there's no real advantage to making the board any other size than the lower limit. What's more, this lower limit depends only on the size of the biggest phrase, which is fixed right now, and the font size. Therefore, I can [specify the board size](https://github.com/X1011/verge-mobile-bingo/commit/42746e1a16e70432d9c6b5888ceeea7c3e340bce) in a fixed number of [ems](http://en.wikipedia.org/wiki/Em_(typography)). This allows me to keep using a table, which has several advantages:

- I don't have to worry about squares escaping grid formation. (With floating divs, if the sizing isn't just right, the last square in a row can wrap around and appear below the first one.)
- I don't have to worry about text overflowing its square in case of some inconsistency in font size. The row will just expand slightly to fit.
- I can use `vertical-align: middle` instead of weird hacks for vertically centering text
- It's a self-contained block element that fits nicely into the page (no need to clear floats). I was also having an issue with specifying a bottom margin on the board with the floating div approach that I never figured out.
- I don't have to use CSS hacks.

I may revisit this if I ever implement [viewport-relative font scaling](http://demosthenes.info/blog/739/Creating-Responsive-Hero-Text-With-vw-Units).

### to do

- measure actual use with Google Analytics event tracking 
- persistence, to survive page unloads in mobile browsers
- board randomization
- favicon
- free space
- win detection
- win sharing

&nbsp;
> Written with [StackEdit](http://benweet.github.io/stackedit/).
