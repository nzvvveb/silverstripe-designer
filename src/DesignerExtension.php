<?php

namespace RebornWeb\SilverstripeDesigner\Extension;

use SilverStripe\View\Requirements;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Control\Controller;

/**
 * An extension that allows designer to be visible
 *
 */
class DesignerExtension extends DataExtension
{
	/**
     *  Load the required JS and CSS and populate Javascript Template with our TemplateID
	 *
	 * @param String $TemplateID
	 */
    public function InitDesign($TemplateID = "gjs")
    {
        Requirements::javascript('//unpkg.com/grapesjs');
        Requirements::css('//unpkg.com/grapesjs/dist/css/grapes.min.css');

        Requirements::css('rebornweb/silverstripe-designer: client/plugins/gram.min.css');
        Requirements::javascript('rebornweb/silverstripe-designer: client/plugins/grapesjs-plugin-export.min.js');
        Requirements::javascript('rebornweb/silverstripe-designer: client/plugins/gram.js');

        Requirements::javascriptTemplate('rebornweb/silverstripe-designer: client/designer.js', ['TemplateID' => $TemplateID]);
    }

    /**
     * Switch on the Designer in the frontend
     */
    public function ShowDesigner()
    {
        return isset($_GET['showdesigner']);
    }

    public function alternatePreviewLink($link)
    {
        if ($this->ShowDesigner()) {
            $link = Controller::join_links($link, '?showdesigner=true');
        }

        return $link;
    }
}
