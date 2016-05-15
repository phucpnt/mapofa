/**
 * Created by phucpnt on 5/15/16.
 */
import '../less/main.less';

import React from 'react';

import GanttChart from './gantt-chart';
import ConnStatusPodio from './connection-status-podio';

const Mapofa = () => (
    <div className="main-wrapper">
      <header className="main-header">
        <nav className="navbar navbar-static-top" role="navigation">
          <div className="logo">Mapofa</div>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="user user-menu">
                <a href="#"><ConnStatusPodio /></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="content-wrapper">
        <div className="mapofa-wrapper">
          <div className="flex-wrapper-horiz">
              <div className="horiz-static col-md-8"><GanttChart /></div>
              <div className="horiz-static col-md-4">Task list here</div>
            </div>
        </div>
      </div>
    </div>
);

export default Mapofa;
