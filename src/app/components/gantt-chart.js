/**
 * Created by phucpnt on 5/15/16.
 */

import React, {Component, PropTypes} from 'react';
import makeGantt from '../containers/gantt/container-gantt';

/**
 * using [dhtmlx gantt](http://docs.dhtmlx.com/gantt/desktop__guides.html)
 * Object type support: project, milestone, task
 */
class GanttChart extends Component {

  componentDidMount() {
    gantt.init(this.refs.gantt);
    gantt.parse({
      "data":[
        {"id":1, "text":"Project #1", "start_date":"01-04-2013", "duration":"11", "progress": 0.6, "open": true, "users": ["John", "Mike", "Anna"], "priority": "2"},
        {"id":2, "text":"Task #1", "start_date":"03-04-2013", "duration":"5", "parent":"1", "progress": 1, "open": true, "users": ["John", "Mike"], "priority": "1"},
        {"id":3, "text":"Task #2", "start_date":"02-04-2013", "duration":"7", "parent":"1", "progress": 0.5, "open": true, "users": ["Anna"], "priority": "1"},
        {"id":4, "text":"Task #3", "start_date":"02-04-2013", "duration":"6", "parent":"1", "progress": 0.8, "open": true, "users": ["Mike", "Anna"], "priority": "2"},
        {"id":5, "text":"Task #4", "start_date":"02-04-2013", "duration":"5", "parent":"1", "progress": 0.2, "open": true, "users": ["John"], "priority": "3"},
        {"id":6, "text":"Task #5", "start_date":"02-04-2013", "duration":"7", "parent":"1", "progress": 0, "open": true, "users": ["John"], "priority": "2"},
        {"id":7, "text":"Task #2.1", "start_date":"03-04-2013", "duration":"2", "parent":"3", "progress": 1, "open": true, "users": ["Mike", "Anna"], "priority": "2"},
        {"id":8, "text":"Task #2.2", "start_date":"06-04-2013", "duration":"3", "parent":"3", "progress": 0.8, "open": true, "users": ["Anna"], "priority": "3"},
        {"id":9, "text":"Task #2.3", "start_date":"10-04-2013", "duration":"4", "parent":"3", "progress": 0.2, "open": true, "users": ["Mike", "Anna"], "priority": "1"},
        {"id":10, "text":"Task #2.4", "start_date":"10-04-2013", "duration":"4", "parent":"3", "progress": 0, "open": true, "users": ["John", "Mike"], "priority": "1"},
        {"id":11, "text":"Task #4.1", "start_date":"03-04-2013", "duration":"4", "parent":"5", "progress": 0.5, "open": true, "users": ["John", "Anna"], "priority": "3"},
        {"id":12, "text":"Task #4.2", "start_date":"03-04-2013", "duration":"4", "parent":"5", "progress": 0.1, "open": true, "users": ["John"], "priority": "3"},
        {"id":13, "text":"Task #4.3", "start_date":"03-04-2013", "duration":"5", "parent":"5", "progress": 0, "open": true, "users": ["Anna"], "priority": "3"}
      ],
      "links":[
        {"id":"10","source":"11","target":"12","type":"1"},
        {"id":"11","source":"11","target":"13","type":"1"},
        {"id":"12","source":"11","target":"14","type":"1"},
        {"id":"13","source":"11","target":"15","type":"1"},
        {"id":"14","source":"11","target":"16","type":"1"},

        {"id":"15","source":"13","target":"17","type":"1"},
        {"id":"16","source":"17","target":"18","type":"0"},
        {"id":"17","source":"18","target":"19","type":"0"},
        {"id":"18","source":"19","target":"20","type":"0"},
        {"id":"19","source":"15","target":"21","type":"2"},
        {"id":"20","source":"15","target":"22","type":"2"},
        {"id":"21","source":"15","target":"23","type":"2"}
      ]
    });
    this.props.load({timeFrame: this.props.timeFrame});

  }

  render() {
    return (
        <div className="gantt-chart-wrapper">
          <div className="gantt-chart-container" ref="gantt">
          </div>
        </div>
    );
  }
}

export default makeGantt(GanttChart);