import CoreLibrary from 'widget-core-library';
import './index.html';
import './scss/app.scss';

CoreLibrary.development = true;

CoreLibrary.init({
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
}).then(() => {
   console.log(CoreLibrary.args);
   var fbContainer = document.getElementById('fb-container');
   // Global Facebook init function callback
   window.fbAsyncInit = () => {
      console.log('aaaaaaasxaaaaaaaaaaaaaa');
      FB.init(CoreLibrary.args);
      // Listen to render event and adjust widget height based on facebook height
      FB.Event.subscribe('xfbml.render', function () {
         var elHeight;
         var headerHeight = 37;
         setTimeout(function () {
            elHeight = fbContainer.clientHeight;
            if ( elHeight > 100 ) {
               CoreLibrary.widgetModule.setWidgetHeight(elHeight + headerHeight);
            }
         }, 100);
      });
   };

   window.addEventListener('resize', () => {
      FB.XFBML.parse();
   });

   // Inject the Facebook SDK
   window.initFB = function() {
      var js,
         id = 'facebook-jssdk',
         s = 'script',
         fjs = document.getElementsByTagName(s)[0];
      if ( document.getElementById(id) === null ) {
         js = document.createElement(s);
         js.id = id;
         js.src = 'http://connect.facebook.net/' + CoreLibrary.config.locale + '/all.js';
         fjs.parentNode.insertBefore(js, fjs);
      }
   }
   window.initFB();

   // this.scope.facebookCSSClasses = 'fb fb-' + this.scope.args.fb_embed_type;
});
