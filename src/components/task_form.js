import React from 'react';
import axios from 'axios';

//const API_BASE = 'http://localhost:3000/';
const API_BASE = "https://todolistapi20.herokuapp.com";

class TaskForm extends React.Component {

  constructor(props) {

    const id = props.match.params.id;
    const createMode = (props.match.path.endsWith("create")) ? true: false;
    super(props);
    this.state = {
      name: "",
      description: "",
      notes: "",
      priority: "1",
      status: "0",
      user_id: "0",
      dueDate: "",
      project_id: id,
      bug_id: createMode ? 0 : props.match.params.pid,
      createMode: createMode
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    // load the post if are editing.
    if (!createMode) {
      axios
      .get(`${API_BASE}/projects/${this.state.project_id}/tasks/${this.state.task_id}`)
      .then(res => {
        console.log("post fetched");
        
        var priority_array = {low:"0",medium:"1",high:"2"};
        

        this.setState({
          name: res.data.name,
          description: res.data.description,
          notes: res.data.notes,
          dueDate: res.data.dueDate,
          priority: priority_array[res.data.priority],
          user_id: res.data.user_id
        })
      })
      .catch(err => console.log(err));
    }
  }

  addBug(newTask) {
    console.log(`posting task with name ${newTask.name}`);
    axios
    .post(`${API_BASE}/projects/${newTask.project_id}/tasks`, newTask)
    .then(res => {
      
      console.log('posted!');
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
  }

  updateTask(task) {
    axios
    .put(`${API_BASE}/projects/${task.project_id}/tasks/${task.task_id}`, task)
    .then(res => {
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event)
  {
    const task = {
      name: this.state.name,
      description: this.state.description,
      project_id: this.state.project_id,
      user_id: this.state.user_id,
      task_id: this.state.task_id,
      priority: this.state.priority,
      notes: this.state.notes,
      dueDate: this.state.dueDate
    }
    if (this.state.createMode) {
      this.addTask(task);
    } else {
      this.updateTask(task);
    }
    event.preventDefault();
  }

  handleCancel(event)
  {
    console.log("canceled pressed.")
    this.props.history.goBack();
    event.preventDefault();
  }
  
  render()  {
   return (
     <div>
       <h1>
         {this.state.createMode ? "Create task" : "Edit Task"}
       </h1>
       <div className="project-form">
         <form onSubmit={this.handleSubmit}>
           
         <div className="form-group">
             <label>User</label>
             <input type="text" className="form-control" name="user" id="user" value={this.state.user_id} onChange={this.handleInputChange}/>
           </div>
           <div className="form-group">
             <label htmlFor="description">Description</label>
             <textarea className="form-control" name="description" id="description" value={this.state.description} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
             <label htmlFor="notes">Notes</label>
             <textarea className="form-control" name="notes" id="notes" value={this.state.notes} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input type="date" className="form-control" autoComplete='date' name="dueDate"  id="dueDate" value={this.state.dueDate} onChange={this.handleInputChange}/>
          </div>
           <div className="form-group">
             
            <label htmlFor="priority">Priority</label>
             <select className="form-control" name="priority" id="priority" value={this.state.priority} onChange={this.handleInputChange}>
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
            </select>
            
           </div>

           <div className="form-group">
             <button type="submit" className="btn btn-primary">{this.state.createMode ? "Create" : "Save"}</button>
             <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
           </div>
         </form>
       </div>
     </div>
   );
 }

}

export default TaskForm;

