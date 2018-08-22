# Silverstripe designer (front end designer)

Create beautiful templates using the cms preview or front end with help from GrapesJS webpage builder

![silverstripe-designer](screen.png?raw=true "silverstripe designer")

## Installation

```js
// include grapejs
Requirements::javascript('/silverstripe-designer/vendor/grapesjs/dist/grapes.min.js');
Requirements::css('/silverstripe-designer/vendor/grapesjs/dist/css/grapes.min.css');

// include these to load the preset webpage
Requirements::javascript('/silverstripe-designer/vendor/grapesjs/dist/grapesjs-preset-webpage.min.js');
Requirements::css('/silverstripe-designer/vendor/grapesjs/dist/css/grapesjs-preset-webpage.min.css');
Requirements::javascript('//static.filestackapi.com/v3/filestack.js');
```

## Update Layout/Page.ss to include

```HMTL
<!-- replace $Layout with this div (I replace the whole <div class="main"> -->
<div id="gjs"></div>
<script type="text/javascript">
    var editor = grapesjs.init({
        container : '#gjs',
        plugins: ['gjs-preset-webpage']
  });
</script>
```

## Enhancements

* Save to Silverstripe backend
* Set permissions for showing the builder
* Render SS data inside the builder (Content, Title)
