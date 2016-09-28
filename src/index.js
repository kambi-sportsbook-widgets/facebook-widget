import { coreLibrary, widgetModule } from 'widget-core-library';
// import CoreLibrary from 'widget-core-library';
import './index.html';
import './scss/app.scss';

// CoreLibrary.development = true;

coreLibrary.init({
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
   const args = coreLibrary.args;
   document.getElementById('title').textContent = args.title;
   const fbContainer = document.getElementById('fb-container');
   fbContainer.classList.add('fb-' + args.fb_embed_type);

   const attributes = [
      ['data-width', '100%'],
      ['data-tabs', args.tabs],
      ['data-small-header', args.small_headers],
      ['data-show-facepile', args.show_facepile],
      ['data-adapt-container-width', args.adapt_container_width],
      ['data-href', args.href]
   ];
   attributes.forEach((att) => {
      fbContainer.setAttribute(att[0], att[1]);
   });

   // Global Facebook init function callback
   window.fbAsyncInit = () => {
      FB.init(args);
      // Listen to render event and adjust widget height based on facebook height
      FB.Event.subscribe('xfbml.render', function () {
         let elHeight;
         const headerHeight = 37;
         setTimeout(function () {
            elHeight = fbContainer.clientHeight;
            if ( elHeight > 100 ) {
               widgetModule.setWidgetHeight(elHeight + headerHeight);
            }
         }, 100);
      });
   };

   let resizeTimeout = null;
   window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
         FB.XFBML.parse();
      }, 300);
   });

   // Inject the Facebook SDK
   const id = 'facebook-jssdk';
   if ( document.getElementById(id) === null ) {
      const s = 'script';
      const js = document.createElement(s);
      const fjs = document.getElementsByTagName(s)[0];
      js.id = id;
      js.src = 'http://connect.facebook.net/' + coreLibrary.config.locale + '/all.js';
      fjs.parentNode.insertBefore(js, fjs);
   }
});
