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

        Requirements::javascript('rebornweb/silverstripe-designer: client/grapesjs-preset-webpage.min.js');
        Requirements::css('rebornweb/silverstripe-designer: client/grapesjs-preset-webpage.min.css');
        Requirements::javascript('//static.filestackapi.com/v3/filestack.js');

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
