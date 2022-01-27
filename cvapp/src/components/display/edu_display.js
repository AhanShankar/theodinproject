import react, { Component } from "react";
import "./display.css";
export default class EduDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const arr = this.props.edu_exp_array;
    return (
      <div id="edu_display">
        {arr.map(({ id,school_name, study_title, study_date }) => {
          return (
            <div className="Edu" key={id}>
              <div id='schoolname'>{school_name}</div>
              <div>{study_title}</div>
              <div id='studydate'>{study_date}</div>
              {/* <button onClick={this.props.editEdu(id)}>Edit</button> */}
            </div>
          );
        })}
      </div>
    );
  }
}
