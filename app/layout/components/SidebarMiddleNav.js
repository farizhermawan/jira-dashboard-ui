import React from 'react';

import {SidebarMenu} from 'components';

export const SidebarMiddleNav = () => (
  <SidebarMenu>
    {/*<SidebarMenu.Item icon={<i className="fa fa-fw fa-book"/>} title="PAB">*/}
    {/*  <SidebarMenu.Item title="Master Data">*/}
    {/*    <SidebarMenu.Item title="Batch" to='/pab/batch' exact/>*/}
    {/*    <SidebarMenu.Item title="Department" to='/pab/department' exact/>*/}
    {/*  </SidebarMenu.Item>*/}
    {/*</SidebarMenu.Item>*/}

    {/*<SidebarMenu.Item icon={<i className="fa fa-fw fa-database"/>} title="Anggota RISKA">*/}
    {/*  <SidebarMenu.Item title="Kelola Data" to='/riskader' exact/>*/}
    {/*  <SidebarMenu.Item title="Import Data" to='/riskader/import' exact/>*/}
    {/*</SidebarMenu.Item>*/}

    <SidebarMenu.Item icon={<i className="fa fa-fw fa-tachometer-alt"/>} title="Dashboard" to='/dashboard' exact/>
    <SidebarMenu.Item icon={<i className="fa fa-fw fa-running"/>} title="Sprint" to='/sprint' exact/>

    <SidebarMenu.Item icon={<i className="fa fa-fw fa-cog"/>} title="Configuration">
      <SidebarMenu.Item title="Admin" to='/config/admin' exact/>
    </SidebarMenu.Item>
  </SidebarMenu>
);
