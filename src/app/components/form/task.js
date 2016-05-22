import React from 'react';

import StructTask from '../../struct/task';
import t from 'tcomb-form';

const FormTask = (props) => {

  const options = {
    config: {
      horizontal: {
        md: [3, 9],
      }
    },
    i18n: {
      optional: '',
      required: '*',
      add: 'add',
      down: 'down',
      remove: 'remove',
      up: 'up',
    },
    fields: {
      description: {
        type: 'textarea'
      }
    }
  };

  return (
      <div className="form-wrapper-task">
        <h3>Edit Task</h3>
        <t.form.Form type={StructTask} options={options} />
      </div>
  );
};

export default FormTask;