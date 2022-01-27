import React, { Component } from "react";
import "./Form.css";
class PracForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const changefunc = this.props.changefunc;
    return (
      <form onSubmit={this.props.submitFunc}>
        <div className="header">Practical Experience</div>
        <input
          type="text"
          onChange={changefunc}
          name="practical_exp_company_name"
          placeholder='Company name'
        ></input>
        <input
          type="text"
          onChange={changefunc}
          name="practical_exp_position_title"
          placeholder='Position title'
        ></input>
        <input
          type="text"
          onChange={changefunc}
          name="practical_exp_tasks"
          placeholder='Tasks'
        ></input>
        <input
          type="text"
          onChange={changefunc}
          name="practical_exp_start_date"
          placeholder='Start date'
        ></input>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
export default PracForm;
