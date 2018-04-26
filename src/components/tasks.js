
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const API_BASE = "https://todolistapi20.herokuapp.com";
const TaskItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-3">{props.name}</td>
      <td className="col-md-3">{props.description}</td>
      <td className="col-md-3">{props.created_at}</td>
      <td className="col-md-3">{props.updated_at}</td>
      <td className="col-md-3">{props.urgency}</td>
      <td className="col-md-3">{props.notes}</td>
      <td className="col-md-3">{props.dueDate}</td>
  
      <td className="col-md-3 btn-toolbar">
        <Link to={`/projects/${props.project_id}/tasks/${props.task_id}`}>
            <button className="btn btn-success btn-sm">
              <i className="glyphicon glyphicon-pencil"></i> Edit
            </button>
        </Link>
        <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  );
}

class Tasks extends React.Component {

  constructor(props) {
    super(props);
    const user_id = props.match.params.user_id;
    const project_id = props.match.params.project_id;
    this.state = {
      tasks: [],
      project_id: project_id,
      project: {},
      user: {},
      user_id: user_id,
      calledFrom: (typeof project_id === "undefined") ? "user" : "project"
    };

    this.loadTasks = this.loadTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.IDString = this.IDString.bind(this);
    

  }

  

  loadTasks() {
    if (this.state.calledFrom === "project") {
      axios
      .get(`${API_BASE}/projects/${this.state.project_id}/tasks`)
      .then(res => {
        this.setState({ tasks: res.data });
        console.log(`Task Data loaded! = ${this.state.tasks}`)
      })
      .catch(err => console.log(err));
      axios
      .get(`${API_BASE}/projects/${this.state.project_id}`)
      .then(res => {
        this.setState({ project: res.data });
        console.log(`Project Data loaded! = ${this.state.project}`)
      })
      .catch(err => console.log(err));
    } else {
      axios
      .get(`${API_BASE}/users/${this.state.user_id}/tasks`)
      .then(res => {
        this.setState({ tasks: res.data });
        console.log(`Task Data loaded! = ${this.state.tasks}`)
      })
      .catch(err => console.log(err));
      axios
      .get(`${API_BASE}/users/${this.state.user_id}`)
      .then(res => {
        this.setState({ user: res.data });
        console.log(`user Data loaded! = ${this.state.user}`)
      })
      .catch(err => console.log(err));
    }
    

    
    
  }

  deleteTask(id) {
    let filteredArray = this.state.tasks.filter(item => item.id !== id)
    this.setState({tasks: filteredArray});
    axios
    .delete(`${API_BASE}/projects/${this.state.project_id}/tasks/${id}`)
    .then(res => {
      console.log(`Record Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log('tasks mounted!')
    this.loadTasks();
  }

  IDString() {
    var string
    
    if (this.state.calledFrom === "user") {
      
      string = this.state.user.lname + " , " + this.state.user.fname
    } else {
      string = this.state.project.name 
    }
    return string
  }

  render() {
    

    const taskItems = this.state.tasks.map((task)  => {
      
      return (
        <TaskItem
          name={task.name}
          description={task.description}
          updated_at={task.updated_at}
          created_at={task.created_at}
          urgency={task.urgency}
          notes={task.notes}
          dueDate={task.dueDate}
          task_id={task.id}
          key={task.id}
          onDelete={this.deleteTask}
          project_id = {task.project_id}
          
        />
      )
    });
    

    const headerString = (this.state.tasks.count === 0)
      ? "Loading..." : `tasks attached to ` + this.IDString()
    return (
      <div className="tasks">
        <h1> {headerString} </h1>
        <div className="tasks-list">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="col-md-3">Name</th>
                <th className="col-md-3">Description</th>
                <th className="col-md-3">Created</th>
                <th className="col-md-3">Updated</th>
                <th className="col-md-3">Urgency</th>
                <th className="col-md-3">Notes</th>
                <th className="col-md-3">Due Date</th>
                <th className="col-md-3">Actions</th>

              </tr>
            </thead>
            <tbody>
              {taskItems}
            </tbody>
          </table>
          
          <Link to={`/projects/${this.state.project_id}/tasks/create`}>
              <button className="btn btn-success btn-sm">
                <i className="glyphicon glyphicon-plus"></i> Create Task
              </button>
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => this.props.history.goBack()}>
            <i className="glyphicon glyphicon-menu-left"></i> Back
          </button>
        </div>
      </div>
    );
  }
}

export default Tasks;
