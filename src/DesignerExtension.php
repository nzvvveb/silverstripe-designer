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
    private static $db = [
        'DesignTemplate' => 'HTMLText'
    ];

	/**
	 * Are we viewing this page on the live site?
	 *
	 * @return boolean
	 */
    public function LiveSite()
    {
		return Versioned::current_stage() == 'Live';
	}

	/**
	 * Indicates whether the current user can edit the current fields on the frontend
	 *
	 * @param String $checkStage
	 * 			If set, the stage will be checked to ensure that we're on that stage - this
	 * 			allows us to check if the current user has got access to edit (regardless of whether they're on the
	 * 			right stage), and to check including the right stage
	 *
	 * @return boolean
	 */
    public function FrontendEditAllowed($checkStage = true)
    {
		if (!Member::currentUserID()) {
			return false;
		}
		$isCreator = Member::currentUserID() == $this->owner->CreatorID;
		$canEdit = $this->owner->canEdit();
		$frontendPerm = Permission::check(FrontendEditing_Controller::PERM_FRONTEND_EDIT);

		if ($checkStage === true) {
			$stage = Versioned::current_stage() == 'Stage';
		} else {
			$stage = true;
		}

		if (!($isCreator || $canEdit || $frontendPerm) || !$stage) {
			return false;
		}
		return true;
	}

	/**
	 * Return an html fragment that can be used for editing a given field on the frontend of the website
	 *
	 * @TODO: Refactor this so that the field creation etc is actually done based on the type of the
	 * field - eg if it's an HTML field use niceditor, if it's a text field use textfield, etc etc
	 *
	 * Needs some adjustment to the frontend so that fields other than the native nicedit work nicely.
	 *
	 * @param String $fieldName
	 * @param String $tagType
	 * @return String
	 */
    public function DesignHtmlWrap($GID = "#gjs")
    {
        Requirements::javascript('//unpkg.com/grapesjs');
        Requirements::css('//unpkg.com/grapesjs/dist/css/grapes.min.css');

        Requirements::javascript('rebornweb/silverstripe-designer: client/grapesjs-preset-webpage.min.js');
        Requirements::css('rebornweb/silverstripe-designer: client/grapesjs-preset-webpage.min.css');
        Requirements::javascript('//static.filestackapi.com/v3/filestack.js');

        Requirements::javascriptTemplate('rebornweb/silverstripe-designer: client/designer.js', ['GID' =>'fd']);

        // return $this->owner->Object('DesignTemplate');
	}
}
