# Silverstripe designer (front end designer)

Create beautiful templates using the cms preview or front end

![silverstripe-designer](images/screen.png?raw=true "silverstripe designer")

Design your website without editing any frontend templates
## Installation

* `composer require nzvvveb/silverstripe-designer`
* `dev/build?flush=all`

## Update Layout/Page.ss to include

```HMTL
<% include NzVvveb\Designer\Designer TemplateID="gjs" %>

<div class="content-container unit size3of4 lastUnit" id="gjs">
<article>
    <h1>$Title</h1>
    <div class="content">$Content</div>
</article>
    $Form
    $CommentsForm
</div
```

## Usage

![silverstripe-designer-permissions](images/permissions.jpg?raw=true "silverstripe designer permissions")

* Switch on PERM_FRONTEND_DESIGN in admin/security
* switch on the design with URL get param `?showdesigner=true`

## Enhancements

* Save to Silverstripe backend
* Set Permissions for showing the builder
* Render SS data inside the builder (Content, Title)
