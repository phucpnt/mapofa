/**
 * Created by phucpnt on 5/15/16.
 */
import '../less/main.less';

import React from 'react';

import GanttChart from './gantt-chart';
import FormSticky from './form-sticky';
import Sidebar from './sidebar';
import MenuTop from './menu-top';
import PanelTask from './panel-task';
import IframeFull from './iframe-full';

const Mapofa = () => (
    <div className="main-wrapper">
      <header className="main-header">
        <div className="logo"></div>
        <nav className="navbar navbar-static-top" role="navigation">
          <MenuTop />
        </nav>
      </header>
      <Sidebar />
      <div className="content-wrapper">
        <div className="mapofa-wrapper">
          <div className="row">
            <div className="flex-wrapper-horiz">
              <div className="horiz-static col-md-8"><GanttChart /></div>
              <div className="horiz-static col-md-4">
                <PanelTask />
                <FormSticky />
              </div>
            </div>
          </div>
        </div>
      </div>
      <IframeFull />
    </div>
);

export default Mapofa;
