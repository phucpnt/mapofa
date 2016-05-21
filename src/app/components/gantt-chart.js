/**
 * Created by phucpnt on 5/15/16.
 */

import React, { Component, PropTypes } from 'react';
import makeGantt from '../containers/gantt/container-gantt';

/**
 * using [dhtmlx gantt](http://docs.dhtmlx.com/gantt/desktop__guides.html)
 * Object type support: project, milestone, task
 */
class GanttChart extends Component {

  componentWillUpdate(nextProps) {
    const { taskList } = nextProps;
    gantt.parse({
      data: taskList.map(task => {
        return {
          id: task.id,
          text: task.subject,
          start_date: task.startDate,
          duration: task.estHours,
          assignee: task.assignee,
          description: task.description
        };
      })
    });
  }

  _ganttConfig() {
    gantt.config.scale_unit = 'day';
    gantt.config.date_scale = '%D, %d';
    gantt.config.min_column_width = 60;
    gantt.config.duration_unit = 'hour';
    gantt.config.scale_height = 20 * 3;
    gantt.config.row_height = 30;

    const weekScaleTemplate = function (date) {
      const dateToStr = gantt.date.date_to_str('%d %M');
      const weekNum = gantt.date.date_to_str('(week %W)');
      const endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1, 'day');
      return dateToStr(date) + ' - ' + dateToStr(endDate) + ' ' + weekNum(date);
    };

    gantt.config.subscales = [
      { unit: 'month', step: 1, date: '%F, %Y' },
      { unit: 'week', step: 1, template: weekScaleTemplate }

    ];

    gantt.templates.task_cell_class = function (task, date) {
      if (!gantt.isWorkTime(date))
        return 'week_end';
      return '';
    };
    
    gantt.config.drag_process = false;
  }

  componentDidMount() {
    this._ganttConfig();
    gantt.init(this.refs.gantt);
    this.props.load({ timeFrame: this.props.timeFrame });
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

GanttChart.defaultProps = {
  taskList: PropTypes.array,
};

export default makeGantt(GanttChart);