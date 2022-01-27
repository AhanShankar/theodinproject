import React, { Component } from "react";
import "./Form.css"
class EduForm extends Component {
  constructor(props) {
    super(props);
    // this.localchangefunc = this.localchangefunc.bind(this);
  }
  render() {
    const changefunc = this.props.changefunc;
    return (
      <form onSubmit={this.props.submitFunc}>
        <div className='header'>Educational Experience</div>
        <input type="text" onChange={changefunc} name="edu_exp_school_name" placeholder='School name'></input>
        <input
          type="text"
          onChange={changefunc}
          name="edu_exp_study_title"
          placeholder='Study title'
        ></input>
        <input
          type="text"
          onChange={changefunc}
          name="edu_exp_study_date"
          placeholder='Study date'
        ></input>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
export default EduForm;
