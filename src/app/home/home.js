/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'megaApp.home', [
    'ui.state',
    'ui.bootstrap',
    'plusOne',
    'ngAnimate',
    'ngTouch',
    'ngSanitize'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
    $stateProvider.state( 'home', {
        url: '/home',
        views: {
            "main": {
                controller: 'HomeCtrl',
                templateUrl: 'home/home.tpl.html'
            }
        },
        data:{ pageTitle: 'Home' }
    });
})

/**
* Let's add a directive to bind our carousel to the page
* NOT Necessary anymore. Our slider is referenced by angular code
* and not jquery anymore, so there's no need for this directive
* anymore
*/

.directive( 'sliderDirective', function SliderDirective ($document) {
    return function (scope, element, attr) {

        element.nivoSlider();
    };
})

/**
* And of course we define a controller for our route.
*/
.controller( 'HomeCtrl', function HomeController( $scope, $http, $window, $document, $timeout) {
    
    /*
    We are going to set up our http requests here
    */
    var url = 'assets/data/home/home.json';
    var successCallback = function (data){
        $scope.mission = response.mission;
    };
    /*
        Can't do XHR requests to local file, so we'll need to be running
        a server for that
    */
    // $http.get(url).success(successCallback).error();

     

    /* 
        Use this variable to implement our timer.  We'll create a self
        executing function which will increment this variable every 1000
        milliseconds.  After 10000 ms (10 sec) we will trigger the 
        $scope.nextSlide() function.  
    */
    $scope.autoSlideSeconds = 0;

    //Initialize our image array with pictures from the assets dir
    var slides = $scope.slides = [];

    /* 
        I'm manually setting how many images to scroll through by appending. 
        TODO: Use regex and directory walk to determine how many image files are in this directory
    */

    var numberOfImages = 5;
    var startImage = 1;

    /* 
        Add the filenames to our slides array.  The slides array will be scrolled through on our 
    */
    for (var i = numberOfImages; i >= startImage; i--) {
        slides.push('assets/img/img'+ i + '.png');  
    }

    // var regexAll = /[^\\]*\.(\w+)$/;
    // var total = path.match(regexAll);
    // var filename = total[0];
    // var extension = total[1];


    //The slides should move to the left initially 
    $scope.direction = 'left';

    //The initial image we are looking at is the first in our slides array
    //aka '0'
    $scope.currentIndex = 0;

    /*
        When we click on a 'dot', let's set the move to the corresponding image
        e.g. we clicked on the 3rd dot, so let's go to the 3rd image
    */
    $scope.setCurrentSlideIndex = function (index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.prevSlide = function () {
        $scope.direction = 'left';
        $scope.autoSlideSeconds = 0;
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.direction = 'right';
        $scope.autoSlideSeconds = 0;
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };
    
    
    /*
        Let's create a self executing function which triggers a slide 
        event every 10 seconds
    */
    (function autoSlide() {
        $scope.autoSlideSeconds++;
        //Every 7 seconds, move the slide
        if ($scope.autoSlideSeconds == 7) {
            $scope.autoSlideSeconds = 0;
            $scope.prevSlide();
        }

        mytimeout = $timeout(autoSlide, 1000);

    })();

    

    /*
        Model
        For now, I'm just putting these bits of data into scope variables

        Eventually, I would like these bits of data to be stored in a json document  
    */
    $scope.mission = {
        "title" : "Mission & Purpose",
        "points" : [
                "<i>MEGA</i> serves to unite minority graduate engineering students and provide them with an environment to enhance their academic, professional, and social involvement."
            ]

    };

    $scope.benefits = [
        "<i>MEGA</i> hosts <b><i>Social</i></b> events so you can meet your fellow peers in engineering, and <b><i>Professional</b></i> events to network with employers and alumni",
        "It's <b><i>FREE</i></b> to join as well!"
    ];

    $scope.membershipBullets = [
        "Become a member of MEGA today! Fill out our membership " + "<a href='https://docs.google.com/forms/d/1deq_gRr6pnIpZV4C9eXOQbW6P2Z3jUSlPavK-u5HSJs/viewform' target='_blank'>form</a> today!!",
        "You can also become a member of one of these National Organizations today!" 
    ];

    $scope.societies = [
        {
            "name" : "NSBE",
            "link" : "http://www-scf.usc.edu/~nsbe/"
        },
        {
            "name" : "SHPE",
            "link" : "http://viterbistudents.usc.edu/shpe/"
        },
        {
            "name" : "SWE",
            "link" : "http://www.sweusc.com"
        },
        {
            "name" : "BGSN",
            "link" : "http://uscbgsn.wix.com/blackgrad"
        }
    ];


    $scope.sections = [
        {
            "title" : "Mission",
            "story" : "MEGA serves to unite minority graduate engineering students and provide them with an environment to enhance their academic, professional, and social involvement."
        },
        {
            "title" : "Benefits",
            "story" : "- MEGA provides an opportunity to interact with other minority graduate groups.\n- Events are geared towards <b><i>Graduate<i><b> students\n- We provide you with an alumni and professional network\n- It's <b><i>Free<i><b> to join!"
        },
        {
            "title" : "Contact",
            "story" : "President"
        }
    ];

    var path = "assets/img/";
    $scope.sponsors = [
        {
            "name" : "Google",
            "website" : "http://www.google.com/edu/students/index.html",
            "icon" : path + "GoogleLogo.png"
        },
        {
            "name" : "Northrop Grumman",
            "website" : "http://www.northropgrumman.com/careers/Pages/default.aspx",
            "icon" : path + "NorthropGrummanLogo.jpg"
        },
        {
            "name" : "Microsoft",
            "website" : "http://www.microsoft.com/student/",
            "icon" : path + "MicrosoftLogo.jpg"
        },
        {
            "name" : "Boeing",
            "website" : "http://www.boeing.com/boeing/careers/collegecareers/internships.page",
            "icon" : path + "BoeingLogo.svg"
        },
        {
            "name" : "Center for Engineering Diversity",
            "website" : "http://viterbi.usc.edu/students/undergrad/ced/",
            "icon" : path + "ViterbiLogo.jpeg"
        },
        {
            "name" : "Intel",
            "website" : "http://www.intel.com/content/www/us/en/jobs/jobs-at-intel-for-students.html",
            "icon" : path + "IntelLogo.png"
        }


    ];

})

.animation('.slide-animation', function ($window) {
    return {
        addClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                var finishPoint = element.parent().width();
                if (scope.direction == 'left') {
                    finishPoint = -finishPoint;
                } 
                TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });                    
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                element.removeClass('ng-hide');
                var startPoint = element.parent().width();
                if (scope.direction == 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.set(element, { left: startPoint });
                TweenMax.to(element, 0.5, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
});

// function printObject(o) {
//   var out = '';
//   for (var p in o) {
//     out += p + ': ' + o[p] + '\n';
//   }
//   alert(out);
// }

