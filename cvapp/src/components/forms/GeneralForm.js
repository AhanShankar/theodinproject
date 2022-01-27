import React, { Component } from "react";
import "./Form.css"
class GeneralForm extends Component {
  constructor(props) {
    super(props);
    // this.localchangefunc = this.localchangefunc.bind(this);
  }
  render() {
    const changefunc = this.props.changefunc;
    return (
      <form onSubmit={this.props.submitFunc}>
        <div className='header'>General Information</div>
        <input type="text" onChange={changefunc} name="generalinfoname" placeholder="Name"></input>
        <input
          type="text"
          onChange={changefunc}
          name="generalinfoemail"
          placeholder="E-mail"
        ></input>
        <input
          type="text"
          onChange={changefunc}
          name="generalinfophonenumber"
          placeholder="Phone no."
        ></input>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
export default GeneralForm;
