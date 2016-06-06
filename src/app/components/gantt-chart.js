/**
 * Created by phucpnt on 5/15/16.
 */

import React, { Component, PropTypes } from 'react';
import makeGantt from '../containers/gantt/container-gantt';
import gantt from 'dhtmlxgantt';
import moment from 'moment';

/**
 * using [dhtmlx gantt](http://docs.dhtmlx.com/gantt/desktop__guides.html)
 * Object type support: project, milestone, task
 */
class GanttChart extends Component {

  componentDidUpdate() {
    const { taskList } = this.props;
    gantt.parse({
      data: taskList.map(task => {
        const ganttTask = {
          id: task.id,
          text: task.subject,
          start_date: moment(task.startDate).startOf('day').toDate(),
          duration: Math.floor(task.estHours / 24) + (Math.ceil(2 * (task.estHours % 24) / 8) / 2),
          assignee: task.assignee,
          description: task.description
        };
        console.log(ganttTask);
        return ganttTask;
      })
    });
  }

  _ganttConfig() {
    gantt.config.scale_unit = 'day';
    gantt.config.date_scale = '%D, %d';
    gantt.config.min_column_width = 60;
    gantt.config.duration_unit = 'day';
    gantt.config.scale_height = 20 * 3;
    gantt.config.row_height = 30;
    gantt.config.drag_progress = false;

    gantt.config.work_time = true;
    gantt.setWorkTime({ hours: [8, 18] });

    gantt.attachEvent('onBeforeLightBox', (id) => {
      console.log(gantt.getTask(id));
      return false;
    });

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
      return !gantt.isWorkTime(date, 'day') ? 'week_end' : '';
    };

    gantt.config.drag_process = false;
    gantt.config.columns = [
      { name: 'text', label: 'Subject', width: '*', tree: true, align: 'left' },
      { name: 'start_date', label: 'Start time', align: 'center' },
      { name: 'duration', label: 'Duration', align: 'center' }
    ];
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

GanttChart.propTypes = {
  taskList: PropTypes.array,
  load: PropTypes.func,
};

export default makeGantt(GanttChart);