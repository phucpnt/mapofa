/**
 * Created by phucpnt on 5/21/16.
 */
import React, { Component, PropTypes } from 'react';
import FormTask from './form/task';

class FormSticky extends Component {

  onSubmit(evt) {
    evt.preventDefault();
    console.log('abc');
  }

  render() {
    return (
        <div className="form-sticky">
          <form className="container-fluid" onSubmit={this.onSubmit}>
            <FormTask />
            <button type="submit" className="btn btn-success">Save</button>
          </form>
        </div>
    );
  }
}

export default FormSticky;
