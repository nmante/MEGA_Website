#MEGA website Repo

The repo for the Minority Engineering Graduate Association Website.  

`tl;dr` I'm creating a single-page web app with automated testing/[BDD](http://en.wikipedia.org/wiki/Behavior-driven_development) = ([GruntJS](http://gruntjs.com) + [Karma](http://karma-runner.github.io/0.10/index.html)),  [AngularJS](http://angularjs.org/) for MVC/templating, and [Bower](http://bower.io) for package management.

###<a href="#infrastructure">1 Infrastructure</a>
####<a href="#automated_grunt">1.1 Automated Tasks with Grunt - The Friendly Task Runner</a>
####<a href="#code_structure">1.2 My Code Structure</a>
###<a href="#website_structure">2 Website Structure</a>
###<a href="#methodology">3 Methodology</a>

##<div id="infrastructure">Infrastructure</div>

The website will be built using an 'ngBoilerplate' philosophy.  I wanted to write a website that would allow for:

- Automated testing
  - Behavior Driven Development
- Templating
- MVC paradigm
- Dependency Management

ngBoilerplate incorporates AngularJS, Grunt, Karma, Bower seemlessly for those desired results.

The directory structure will be modularized via features.  As such the directory structure of the Website source code will look like:

    MEGA_Website/
        |- grunt/
        |- karma/
        |- src/
        |- vendor/
        |- build/
        |- bin/
        |- .bowerrc
        |- bower.json
        |- build.config.js
        |- Gruntfile.js
        |- module.prefix
        |- module.suffix
        |- package.json
   
###<div id="automated_grunt">1.1 Automated Tasks with Grunt - The Friendly Task Runner</div>

I'll be an amazing task runner called Grunt.js to do a few automated tasks. The most important tasks include:

- Compilation
- Running Karma Tests

####Karma Tests

While I'm writing this website, I want to heavily test each feature/page/template I add to it.  Karma is a test harness that's gonna allow me to write tests using [Jasmine](http://pivotal.github.io/jasmine/). We'll have 

####Compilation
When I've written all of the html, templates, css/less and I want to push to the production stage server, I can simply call `grunt compile` from my shell to condense the code to a single page app with this structure:

    |- bin/
    | |- index.html
    | |- assets/
    | | |- *.css
    | | |- *.js

The contents of the `bin` directory will reside in the `public_html` on the server for example.

###<div id="code_structure">1.2 My Code Structure</div>

The source is where MEGA code (html, js, less, css).  The structure below is fairly self explanatory, but for clarity, the 'app' dir will contain all of my code.   
  
    |- src/
    |  |- app/
    |  |  |- <app logic>
    |  |- assets/
    |  |  |- <static files>
    |  |- common/
    |  |  |- <reusable code>
    |  |- less/
    |  |  |- main.less

The `<app logic>` will contain sub folders which correlate to features.  For example, one feature might be an 'about' page on the website. The directory would then look like so:

    |- src/
    | |- app/
    | | |- about/
    | | | |- about.tpl.html
    | | | |- about.js

In a nutshell, our Angular logic for the about page is located in `about.js`, and our html template `about.tpl.html` is what Angular will inject into.  These `*.tpl.html` files are compiled into static html by the Grunt task runner
   
###<div id="vendor_directory">1.3 Vendor Directory</div>

[Bower](http://bower.io), the package manager built by Twitter, is what I'll be using to manage my dependencies.  These dependencies include AngularJS, AngularUI, to name a few.


    |- vendor/
    |  |- angular-bootstrap/
    |  |- bootstrap/
    |  |- placeholders/
   

##<div id="website_structure">2 Website Structure</div> 

Website structure will look like this:

  
    www-scf.usc.edu/~uscmega
        /home "Home"
        /careers "Careers"
        /community "community"
        /eboard "E Board"
    

##<div id="methodology">3 Methodology</div>

###AngularJS

My goal is to create a completely client side solution for this website.   Thus, I'll use AngularJS to give us the power of an MVC framework. The MVC paradigm will allow me to separate `views` from my `logic` and `data`.  So, I will be able to reuse similar views on different pages (i.e. like a navigation bar) and even deliver different content (via my model) based on the page.

###Bootstrap
To add some design flair to the website, we'll use Twitter Bootstrap combined with AngularUI.

####Angular UI Bootstrap
Gives us Pure AngularJS components for Bootstrap. 