/**
 * Created by phucpnt on 5/15/16.
 */
import '../less/main.less';

import React from 'react';

import GanttChart from './gantt-chart';
import FormSticky from './form-sticky';
import Sidebar from './sidebar';
import MenuTop from './menu-top';

const Mapofa = () => (
    <div className="main-wrapper">
      <header className="main-header">
        <div className="logo">Mpf</div>
        <nav className="navbar navbar-static-top" role="navigation">
          <MenuTop />
        </nav>
      </header>
      <Sidebar />
      <div className="content-wrapper">
        <div className="mapofa-wrapper">
          <div className="flex-wrapper-horiz">
            <div className="horiz-static col-md-8"><GanttChart /></div>
            <div className="horiz-static col-md-4">My Tasks
              <FormSticky />
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default Mapofa;
