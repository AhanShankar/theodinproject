import react, { Component } from "react";
import "./display.css";
export default class PracDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const arr = this.props.practical_exp_array;
    if (Object.keys(arr[0]).length !== 0) {
      return (
        <div id="practical_display">
          {arr.map(({ obj }) => {
            return (
              <div className="Prac" key={obj.id}>
                <div id="companyname">{obj.practical_exp_company_name}</div>
                <div>{obj.practical_exp_position_title}</div>
                <div>{obj.practical_exp_tasks}</div>
                <div>{obj.practical_exp_start_date}</div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div ></div>
    }
  }
}
