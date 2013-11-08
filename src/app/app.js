angular.module( 'megaApp', [
  'templates-app',
  'templates-common',
  'megaApp.home',
  'megaApp.events',
  'megaApp.eboard',
  'ui.state',
  'ui.route',
  'ui.bootstrap'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | MEGA' ;
    }
    
  });

  $scope.socials = [
    {
      "name" : "Facebook",
      "link" : "http://facebook.com/uscmega",
      "icon" : "icon-facebook"
    },
    {
      "name" : "Twitter",
      "link" : "http://twitter.com/uscmega",
      "icon" : "icon-twitter"
    }
  ];
})

;

