(function () {

   'use strict';

   /**
    * @ngdoc directive
    * @name facebookWidget.directive:tabDirective
    * @description
    * Facebook directive
    * @restrict E
    * @scope    *
    * @author teo@globalmouth.com
    */
   (function ( $app ) {
      return $app.directive('fbDirective', ['$window', '$timeout', function ( $window, $timeout ) {
         return {
            restrict: 'AE',
            controller: ['$scope', '$controller',
               function ( $scope, $controller ) {
                  angular.extend(this, $controller('widgetCoreController', {
                     '$scope': $scope
                  }));

                  $scope.defaultArgs = {
                     'title': 'UEFA Champions League',
                     'facebook': {
                        'status': true,
                        'xfbml': true,
                        'version': 'v2.5',
                        'fb_embed_type': 'post',
                        'href': 'https://www.facebook.com/uefachampionsleague/posts/1165909963455464',
                        'tabs': 'timeline',
                        'small_headers': true,
                        'show_facepile': false,
                        'adapt_container_width': true
                     }
                  };

                  /**
                   * Default height
                   * @type {number}
                   */
                  $scope.defaultHeight = 530;
                  $scope.currentHeight = 530;

                  // Inject the Facebook SDK
                  var initFbSDK = function () {
                     var js,
                        id = 'facebook-jssdk',
                        s = 'script',
                        fjs = document.getElementsByTagName(s)[0];
                     if ( document.getElementById(id) ) {
                        return;
                     }
                     js = document.createElement(s);
                     js.id = id;
                     js.src = '//connect.facebook.net/' + $scope.locale + '/all.js';
                     fjs.parentNode.insertBefore(js, fjs);
                  };

                  /**
                   * Init the controller and the FB SDK
                   */
                  $scope.init().then(function () {
                     $scope.locale = $scope.getConfigValue('locale');
                     initFbSDK();
                  });
               }],
            link: function ( $scope, elem ) {
               var w = angular.element($window),
                  fb_container = document.getElementById('fb-container');

               $scope.$watch(function () {
                  return {
                     'width': window.innerWidth
                  };
               }, function () {
                  if ( window.FB && FB.XFBML && FB.XFBML.parse ) {
                     FB.XFBML.parse();
                  }
               }, true);

               // Global Facebook init function callback
               window.fbAsyncInit = function () {
                  FB.init($scope.args.facebook);
                  // Listen to render event and adjust widget height based on facebook height
                  FB.Event.subscribe('xfbml.render', function () {
                     var el_height;
                     var header_height = 37;
                     $timeout(function () {
                        el_height = angular.element(fb_container)[0].clientHeight;
                        if ( el_height > 100 ) {
                           $scope.setWidgetHeight(el_height + header_height);
                        }
                     }, 100);
                  });
               };

               w.bind('resize', function () {
                  $scope.$apply();
               });
            }
         };
      }]);
   })(angular.module('facebookWidget'));

}).call(this);
