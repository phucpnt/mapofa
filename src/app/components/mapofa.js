/**
 * Created by phucpnt on 5/15/16.
 */
import React from 'react';

import GanttChart from './gantt-chart';

const Mapofa = () => (
    <div className="main-wrapper">
      <header className="main-header">
        <nav className="navbar navbar-static-top" role="navigation">
          <div className="logo">Mapofa</div>
          <div className="navbar-custom-menu">
            <ul className="nav nav-bar">
              <li>
                Podio Status
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="content-wrapper">
        <div className="mopofa-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-7"><GanttChart /></div>
              <div className="col-md-5">Task list here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default Mapofa;
