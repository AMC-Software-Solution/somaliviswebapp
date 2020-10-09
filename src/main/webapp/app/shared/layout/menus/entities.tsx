import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/applicant">
      <Translate contentKey="global.menu.entities.applicant" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/applicant-travel-document">
      <Translate contentKey="global.menu.entities.applicantTravelDocument" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/applicant-contact-info">
      <Translate contentKey="global.menu.entities.applicantContactInfo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/visa-application">
      <Translate contentKey="global.menu.entities.visaApplication" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/visa-application-stay">
      <Translate contentKey="global.menu.entities.visaApplicationStay" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/application-comment">
      <Translate contentKey="global.menu.entities.applicationComment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/payment-transaction">
      <Translate contentKey="global.menu.entities.paymentTransaction" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/application-fee">
      <Translate contentKey="global.menu.entities.applicationFee" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/app-setting">
      <Translate contentKey="global.menu.entities.appSetting" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/system-setting">
      <Translate contentKey="global.menu.entities.systemSetting" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/country">
      <Translate contentKey="global.menu.entities.country" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/electronic-visa">
      <Translate contentKey="global.menu.entities.electronicVisa" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/employee">
      <Translate contentKey="global.menu.entities.employee" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
