import { Component } from "react";
import uniqid from "uniqid";
import "./App.css";
import GeneralForm from "./components/forms/GeneralForm";
import EduForm from "./components/forms/EduForm";
import PracForm from "./components/forms/PracForm";
import PracDisplay from "./components/display/prac_display";
import GeneralDisplay from "./components/display/general_display";
import EduDisplay from "./components/display/edu_display";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generalinfoname: "Enter Name",
      generalinfoemail: "",
      generalinfophonenumber: "",

      edu_exp_school_name: "",
      edu_exp_study_title: "",
      edu_exp_study_date: "",

      practical_exp_company_name: "",
      practical_exp_position_title: "",
      practical_exp_tasks: "",
      practical_exp_start_date: "",

      generalinfo_array: [],
      edu_exp_array: [{}],
      practical_exp_array: [{}],
    };
  }

  handleChange = (e, callback) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      callback
    );
  };
  handleGeneralChange = (e = null) => {
    if (e) e.preventDefault();

    const callback = () => {
      let obj = {
        name: this.state.generalinfoname,
        email: this.state.generalinfoemail,
        phonenumber: this.state.generalinfophonenumber,
      };
      this.setState({
        generalinfo_array: [obj],
      });
    };
    this.handleChange(e, callback);
  };
  handleEduChange = (e, id) => {
    e.preventDefault();

    let callback = () => {
      let obj = {
        id: uniqid(),
        school_name: this.state.edu_exp_school_name,
        study_title: this.state.edu_exp_study_title,
        study_date: this.state.edu_exp_study_date,
      };
      this.setState({
        edu_exp_array: [
          ...this.state.edu_exp_array.slice(0, id),
          { obj },
          ...this.state.edu_exp_array.slice(id + 1),
        ],
      });
    };
    this.handleChange(e, callback);
  };
  handlePracChange = (e, id) => {
    const callback = () => {
      let obj = {
        id: uniqid(),
        practical_exp_company_name: this.state.practical_exp_company_name,
        practical_exp_position_title: this.state.practical_exp_position_title,
        practical_exp_tasks: this.state.practical_exp_tasks,
        practical_exp_start_date: this.state.practical_exp_start_date,
      };
      this.setState({
        practical_exp_array: [
          ...this.state.practical_exp_array.slice(0, id),
          { obj },
          ...this.state.practical_exp_array.slice(id + 1),
        ],
      });
    };
    this.handleChange(e, callback);
  };
  handleEduSubmit = (e) => {
    e.preventDefault();

    this.setState(
      {
        edu_exp_array: this.state.edu_exp_array.concat(
          this.state.edu_exp_array[0]
        ),
      },
    );
  };
  handlePracSubmit = (e) => {
    e.preventDefault();

    this.setState(
      {
        practical_exp_array: this.state.practical_exp_array.concat(
          this.state.practical_exp_array[0]
        ),
      },
    );
  };

  render() {
    return (
      <div id="container">
        <div id="inputsection">
          <GeneralForm changefunc={this.handleGeneralChange} />
          {this.state.edu_exp_array.map((el, ind) => {
            return (
              <EduForm
                id={ind}
                changefunc={this.handleEduChange}
                submitFunc={this.handleEduSubmit}
              />
            );
          })}
          {this.state.practical_exp_array.map((el, ind) => {
            return (
              <PracForm
                id={ind}
                changefunc={this.handlePracChange}
                submitFunc={this.handlePracSubmit}
              />
            );
          })}
        </div>
        <div id="cvsection">
          <GeneralDisplay g_info_array={this.state.generalinfo_array} />
          <EduDisplay edu_exp_array={this.state.edu_exp_array} />
          <PracDisplay practical_exp_array={this.state.practical_exp_array} />
        </div>
      </div>
    );
  }
}

export default App;
