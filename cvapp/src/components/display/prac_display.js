import react, { Component } from "react";
import "./display.css";
export default class PracDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const arr = this.props.practical_exp_array;
    return (
        <div id="practical_display">
        {arr.map(({ id, company_name, position_title, tasks, start_date },ind) => {
          return (
            <div className="Prac" key={id}>
              <div id='companyname'>{arr[ind].practical_exp_company_name}</div>
              <div>{arr[ind].practical_exp_position_title}</div>
              <div>{arr[ind].practical_exp_tasks}</div>
              <div>{arr[ind].practical_exp_start_date}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
