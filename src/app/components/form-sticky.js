/**
 * Created by phucpnt on 5/21/16.
 */
import React, { Component, PropTypes } from 'react';
import StructTask from '../struct/task';

import t from 'tcomb-form';


class FormSticky extends Component {

  onSubmit(evt) {
    evt.preventDefault();
    console.log('abc');
  }

  render() {
    return (
        <div className="form-sticky">
          <form onSubmit={this.onSubmit}>
            <t.form.Form ref="form" type={StructTask}/>
            <button type="submit" className="btn btn-success">Save</button>
          </form>
        </div>
    );
  }
}

export default FormSticky;
