# facebook-widget

Displays Facebook post, video or page feed

## Configuration example:

__`client-widgets.js`__

```json

...
{
    "order": 1,
    "widgetId": "Facebook widget",
    "args": {
        "facebook": {
            "status": true,
            "xfbml": true,
            "version": "v2.4",
            "fb_embed_type": "post",
            "href": "https://www.facebook.com/uefachampionsleague/posts/1153137961399331",
            "tabs": "timeline",
            "small_headers": true,
            "show_facepile": false,
            "adapt_container_width": true,
            "appId": "xyz123"
        }
    }
},
...

```

### The configuration object must contain the key 'facebook', which in turn must hold the following keys, values:
1. `status` - boolean - OPTIONAL, default `true` - checks for user's login status
2. `xfbml` - boolean - OPTIONAL, default `true` - enables `xfbml` parsing
3. `version` - String - OPTIONAL, default `v2.4` - specifies the sdk version
4. `fb_embed_type` - String - default `post` -  sets the type of content:
    - `post` if set loads a post type, more details [on Facebook embeded post plugin] (https://developers.facebook.com/docs/plugins/embedded-posts)
    - `video` if set loads a video type, more details [on Facebook embeded video plugin] (https://developers.facebook.com/docs/plugins/embedded-video-player)
    - `page` if set loads a page, requires additional parameters, more details [on Facebook page plugin] (https://developers.facebook.com/docs/plugins/page-plugin)
5. `href` - String - The URL of the Facebook content, based on what you set on `fb_embed_type`
6. `tabs` - String - OPTIONAL, default `timeline` -  Tabs to render i.e. timeline, events, messages. Use a comma-separated list to add multiple tabs, i.e. timeline, events
7. `small_headers` - boolean - OPTIONAL, default `true` - Use the small header instead
8. `show_facepile` - boolean - OPTIONAL, default `false` - Show profile photos when friends like this
9. `adapt_container_width` - boolean - OPTIONAL, default `true` - Try to fit inside the container width
10.`appId` - String - OPTIONAL - To display a page content, a Facebook app with appId is required


# Other tools

For setting up sass maps, follow this tutorial https://www.hackmonkey.com/2014/sep/configuring-css-source-maps-compass

To use Scss Lint, run "gem install scss_lint"

# Changelog

changelog can be found [here](CHANGELOG.md)

