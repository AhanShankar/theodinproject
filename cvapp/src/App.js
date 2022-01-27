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
      generalinfoname: "",
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
      edu_exp_array: [],
      practical_exp_array: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleGeneralSubmit = (e = null) => {
    if (e) e.preventDefault();
    let obj = {
      id: uniqid(),
      name: this.state.generalinfoname,
      email: this.state.generalinfoemail,
      phonenumber: this.state.generalinfophonenumber,
    };
    this.setState({
      generalinfo_array: this.state.generalinfo_array.concat(obj),
    });
  };
  handleEduSubmit = (e, id) => {
    if (e) {
      e.preventDefault();
      let obj = {
        id: uniqid(),
        school_name: this.state.edu_exp_school_name,
        study_title: this.state.edu_exp_study_title,
        study_date: this.state.edu_exp_study_date,
      };
      this.setState({
        edu_exp_array: this.state.edu_exp_array.concat(obj),
      });
    }
  };
  handlePracSubmit = (e) => {
    e.preventDefault();
    let obj = {
      id: uniqid(),
      practical_exp_company_name: this.state.practical_exp_company_name,
      practical_exp_position_title: this.state.practical_exp_position_title,
      practical_exp_tasks: this.state.practical_exp_tasks,
      practical_exp_start_date: this.state.practical_exp_start_date,
    };
    this.setState(
      {
        practical_exp_array: this.state.practical_exp_array.concat(obj),
      },
      () => {
        console.log(this.state.practical_exp_array);
      }
    );
  };
  // handleGeneralChange();
  render() {
    return (
      <div id="container">
        <div id="inputsection">
          <div className="formcontainer">
            <GeneralForm
              changefunc={this.handleChange}
              submitFunc={this.handleGeneralSubmit}
            />
          </div>
          <div className="formcontainer">
            <EduForm
              changefunc={this.handleChange}
              submitFunc={this.handleEduSubmit}
            />
          </div>
          <div className="formcontainer">
            <PracForm
              changefunc={this.handleChange}
              submitFunc={this.handlePracSubmit}
            />
          </div>
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
