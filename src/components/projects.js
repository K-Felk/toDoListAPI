import React from 'react';
import ProjectForm from './project_form';
import ProjectList from './project_list';
import axios from 'axios';
const API_BASE = "https://todolistapi20.herokuapp.com";

class Projects extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      formMode: "new",
      project: {name:"", notes:"", description:"", dueDate:""}
    };
    this.loadProjects = this.loadProjects.bind(this);
    this.removeProject = this.removeProject.bind(this);
    this.addProject = this.addProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
  }


  updateForm(mode, projectVals) {
    this.setState({
      project: Object.assign({}, projectVals),
      formMode: mode,
    });
  }

  clearForm()
  {
    console.log("clear form");
    this.updateForm("new",{name:"", notes:"", description:"", dueDate:""});
  }

  formSubmitted(project) {
    if(this.state.formMode === "new") {
      this.addProject(project);
    } else {
      this.updateProject(project);
    }
    this.clearForm();
  }

  loadProjects() {
    axios
    .get(`${API_BASE}/projects`)
    .then(res => {
      this.setState({ projects: res.data });
      console.log(`Data loaded! = ${this.state.projects}`)
    })
    .catch(err => console.log(err));
  }

  addProject(newProject) {
    axios
    .post(`${API_BASE}/projects`, newProject)
    .then(res => {
      res.data.key = res.data.id;
      this.setState({ projects: [...this.state.projects, res.data] });
    })
    .catch(err => console.log(err));
  }

  updateProject(project) {
    axios
    .put(`${API_BASE}/projects/${project.id}`, project)
    .then(res => {
      this.loadProjects();
    })
    .catch(err => console.log(err));
  }

  removeProject(id) {
    let filteredArray = this.state.projects.filter(item => item.id !== id)
    this.setState({projects: filteredArray});
    axios
    .delete(`${API_BASE}/projects/${id}`)
    .then(res => {
      console.log(`Project Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log("Projects just got mounted")
    this.loadProjects();
  }

  render() {
    return (
      <div className="projects">
        <ProjectForm
          onSubmit={(project) => this.formSubmitted(project)}
          onCancel={(mode,project) => this.updateForm(mode,project)}
          formMode={this.state.formMode}
          project={this.state.project}
        />
        <ProjectList
          projects={this.state.projects}
          onDelete={(id) => this.removeProject(id)}
          onEdit={(mode,project) => this.updateForm(mode,project)}
        />
      </div>
    );
  }
}

export default Projects;
