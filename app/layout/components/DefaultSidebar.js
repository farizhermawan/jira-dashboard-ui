import React from 'react';
import {Link} from 'react-router-dom';

import {Sidebar, SidebarTrigger,} from './../../components';

import {SidebarMiddleNav} from './SidebarMiddleNav';

import {SidebarTopA} from '../../routes/components/Sidebar/SidebarTopA'
import {SidebarBottomA} from '../../routes/components/Sidebar/SidebarBottomA'
import {LogoThemed} from '../../routes/components/LogoThemed/LogoThemed';

export const DefaultSidebar = () => (
  <Sidebar>
    { /* START SIDEBAR-OVERLAY: Close (x) */}
    <Sidebar.Close>
      <SidebarTrigger tag={'a'} href="#">
        <i className="fa fa-times-circle fa-fw"/>
      </SidebarTrigger>
    </Sidebar.Close>
    { /* START SIDEBAR-OVERLAY: Close (x) */}

    { /* START SIDEBAR: Only for Mobile */}
    <Sidebar.MobileFluid>
      <SidebarTopA/>

      <Sidebar.Section fluid cover>
        { /* SIDEBAR: Menu */}
        <SidebarMiddleNav/>
      </Sidebar.Section>

      {/*<SidebarBottomA/>*/}
    </Sidebar.MobileFluid>
    { /* END SIDEBAR: Only for Mobile */}
  </Sidebar>
);
