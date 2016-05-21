import React from 'react';

import StructTask from '../../struct/task';
import t from 'tcomb-form';

const FormTask = (props) => {

  const options = {
    fields: {
      description: {
        type: 'textarea'
      }
    }
  };

  return (
      <div className="form-wrapper-task">
        <h3>Edit Task</h3>
        <t.form.Form type={StructTask} options={options}/>
      </div>
  );
};

export default FormTask;