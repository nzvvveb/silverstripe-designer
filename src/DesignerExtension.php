<?php

namespace RebornWeb\SilverstripeDesigner\Extension;

use SilverStripe\Security\Member;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataObject;
use SilverStripe\Control\Email\Email;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Security\Permission;
use SilverStripe\View\Requirements;
use SilverStripe\Security\SecurityToken;
use SilverStripe\ORM\DataExtension;

/**
 * An extension that allows theme authors to mark certain regions as editable
 *
 * @author Marcus Nyeholt <marcus@silverstripe.com.au>
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
}
