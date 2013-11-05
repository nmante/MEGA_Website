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
    'ngAnimate'
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
*/

.directive( 'sliderDirective', function SliderDirective ($document) {
    return function (scope, element, attr) {

        element.nivoSlider();
    };
})

/**
* And of course we define a controller for our route.
*/
.controller( 'HomeCtrl', function HomeController( $scope, $http, $window, $document) {
    
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
    

    // var element = $("div[id='slider']");
    // $(element[0].attributes).each(function() {
    // console.log(this.nodeName+':'+this.nodeValue);});
    // $(element[0]).nivoSlider();

       
    $scope.slideDuration = 5000;
    var slides = $scope.slides = [];
    for (var i = 2; i >= 1; i--) {
        slides.push('assets/img/img'+ i + '.png');  
    }

    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.prevSlide = function () {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };

    $scope.mission = {
        "title" : "Mission",
        "story" : "MEGA serves to unite minority graduate engineering students and provide them with an environment to enhance their academic, professional, and social involvement."

    };

    $scope.benefits = [
    "Social events to meet your fellow peers in engineering",
    "Professional events to network with employers and alumni",
    "FREE membership"
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
        "link" : "http://www-scf.usc.edu/~nsbe/"
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

})

.animation('.slide-animation', function () {
    return {
        addClass: function (element, className, done) {
            if (className == 'ng-hide') {
                TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done });                    
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                TweenMax.set(element, { left: element.parent().width() });
                TweenMax.to(element, 0.5, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
});

