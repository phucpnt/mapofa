/**
 * Created by phucpnt on 5/15/16.
 */

import React, { Component, PropTypes } from 'react';
import makeGantt from '../containers/gantt/container-gantt';
import gantt from 'dhtmlxgantt';
import moment from 'moment';
import _ from 'lodash';
import { TASK_STATUS_DONE }from '../constants/app';

/**
 * using [dhtmlx gantt](http://docs.dhtmlx.com/gantt/desktop__guides.html)
 * Object type support: project, milestone, task
 */
class GanttChart extends Component {

  componentDidUpdate() {
    const { taskList } = this.props;
    gantt.clearAll();
    gantt.parse({
      data: taskList.map(task => {
        const ganttTask = {
          id: task.id,
          text: task.subject,
          start_date: moment(task.startDate).startOf('day').toDate(),
          duration: Math.floor(task.estHours / 24) + (Math.ceil(2 * (task.estHours % 24) / 8) / 2),
          assignee: task.assignee,
          description: task.description,
          status: task.status.text,
          link: task.link,
        };
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
      {
        name: 'text',
        label: 'Subject',
        width: 250,
        tree: true,
        align: 'left',
        template: (task) => `<div class="task-title">${task.text}</div>`
      },
      { name: 'start_date', label: 'Start time', align: 'center' },
      { name: 'duration', label: 'Duration', align: 'center' }
    ];

    gantt.templates.task_class = (start, end, task) => {
      return _.kebabCase(task.status);
    };
    gantt.attachEvent('onTaskClick', (taskId, evt) => {
      this.props.showWindow(this.props.taskList.find(task => parseInt(taskId) === task.id).link);
    });

    // today marker
    let tid = this._setupTodayMarker();
    gantt.attachEvent('onClear', () => {
      clearInterval(tid);
      tid = this._setupTodayMarker();
    });

    // right side content
    gantt.templates.rightside_text = function (start, end, task) {
      return task.assignee.map(person => person.name).join(', ');
    };

    // custom icon tree
    gantt.templates.grid_file = function (item) {
      const doneIcon = item.status.toLowerCase() == TASK_STATUS_DONE ? '<i class="fa fa-check"></i>' : '';
      return `<div class='gantt_tree_icon'>${doneIcon}</div>`;
    };
  }

  _setupTodayMarker() {
    const dateToStr = gantt.date.date_to_str(gantt.config.task_date);
    const id = gantt.addMarker({ start_date: new Date(), css: "today", text: 'Today', title: dateToStr(new Date()) });
    return setInterval(function () {
      const today = gantt.getMarker(id);
      today.start_date = new Date();
      today.title = dateToStr(today.start_date);
      gantt.updateMarker(id);
    }, 1000 * 60);
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
  timeFrame: PropTypes.string,
  showWindow: PropTypes.func,
};

export default makeGantt(GanttChart);