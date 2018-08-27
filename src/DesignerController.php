<?php

namespace RebornWeb\SilverstripeDesigner\Controller;

use SilverStripe\Control\Controller;
use SilverStripe\Security\PermissionProvider;

class DesignerController extends Controller implements PermissionProvider
{
    const PERM_FRONTEND_DESIGN = 'PERM_FRONTEND_DESIGN';

    /**
     * Implementation that provides the following permissions
     * FrontendDesign
     *
     */
    public function providePermissions() {
        return array(
            self::PERM_FRONTEND_DESIGN => array(
                'name' => _t('Designer.PERM_FRONTEND_DESIGN', 'Design Pages on the Frontend'),
                'category' => _t('Designer.FRONTEND_DESIGN_CATEGORY', 'Frontend Designer'),
                'sort' => -100,
                'help' => _t('Designer.PERM_EDIT_HELP', 'Allows user to edit theme design in frontend with drag & drop')
            )
        );
    }
}
