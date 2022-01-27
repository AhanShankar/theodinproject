import react, { Component } from "react";
import "./display.css";
export default class GeneralDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const arr = this.props.g_info_array;
    return (
      <div id="general_display">
        {arr.map(({ id,name, email, phonenumber }) => {
          return (
            <div className="General" key={id}>
              <div id='name'>{name}</div>
              <div id='email'>{email}</div>
              <div id='phonenumber'>{phonenumber}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
