import React, { PropTypes } from 'react';
import t from 'tcomb-form';

import makeContactComponent from '../../containers/contact/container-contact';
import StructTask from '../../struct/task';
import FormTagSelect from './tag-select';

const FormTask = (props) => {
  
  console.log(props.contactList);

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
      },
      assignee: {
        template: FormTagSelect(props.contactList)
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

FormTask.propTypes = {
  contactList: PropTypes.array,
  value: PropTypes.object
};


export default makeContactComponent(FormTask);