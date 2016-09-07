import 'widget-core-library/src/transpiled/js/coreLibrary.js';
import 'widget-core-library/src/transpiled/js/Module/utilModule.js';
import 'widget-core-library/src/transpiled/js/Module/widgetModule.js';
import 'widget-core-library/src/transpiled/js/Module/offeringModule.js';
import 'widget-core-library/src/transpiled/js/Module/statisticsModule.js';
import 'widget-core-library/src/transpiled/js/Module/translationModule.js';
import 'widget-core-library/src/transpiled/js/Component/Component.js';
import 'widget-core-library/src/transpiled/js/Component/HeaderComponent/HeaderComponent.js';
import 'widget-core-library/src/transpiled/js/Component/OutcomeComponent/OutcomeComponent.js';
import 'widget-core-library/src/transpiled/js/Component/PaginationComponent/PaginationComponent.js';

(function () {
   'use strict';

   var FacebookWidget = CoreLibrary.Component.subclass({

      defaultArgs: {
         title: 'UEFA Champions League',
         status: true,
         xfbml: true,
         version: 'v2.5',
         fb_embed_type: 'post',
         href: 'https://www.facebook.com/uefachampionsleague/posts/1165909963455464',
         tabs: 'timeline',
         small_headers: true,
         show_facepile: false,
         adapt_container_width: true
      },

      constructor () {
         CoreLibrary.Component.apply(this, arguments);
      },

      init () {
         var fb_container = document.getElementById('fb-container');

         // Global Facebook init function callback
         window.fbAsyncInit = () => {
            FB.init(this.scope.args);
            // Listen to render event and adjust widget height based on facebook height
            FB.Event.subscribe('xfbml.render', function () {
               var el_height;
               var header_height = 37;
               setTimeout(function () {
                  el_height = fb_container.clientHeight;
                  if ( el_height > 100 ) {
                     CoreLibrary.widgetModule.setWidgetHeight(el_height + header_height);
                  }
               }, 100);
            });
         };

         window.addEventListener('resize', () => {
            FB.XFBML.parse();
         });

         this.scope.facebookCSSClasses = 'fb fb-' + this.scope.args.fb_embed_type;

         // Inject the Facebook SDK
         var js,
            id = 'facebook-jssdk',
            s = 'script',
            fjs = document.getElementsByTagName(s)[0];
         if ( document.getElementById(id) ) {
            return;
         }
         js = document.createElement(s);
         js.id = id;
         js.src = '//connect.facebook.net/' + CoreLibrary.config.locale + '/all.js';
         fjs.parentNode.insertBefore(js, fjs);
      }
   });

   var facebookWidget = new FacebookWidget({
      rootElement: 'html'
   });

})();
