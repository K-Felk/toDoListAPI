import React from 'react';
import axios from 'axios';
//use the utils module so we can dump the actual ojbects to console for debugging
import util from 'util';


const API_BASE = "https://todolistapi20.herokuapp.com";
const UserDropDownItem = (props) => {
  return (
  <option value={props.value}>{props.lname} , {props.fname}</option>
)}


const UserList = (props) => {
  const userItems = props.users.map((user)  => {
    return (
      
       <UserDropDownItem
          key={user.id}
          value={user.id}
          lname={user.lname}
          fname={user.fname}
       />
        
      )
    });
  
  return (
    userItems

  )
  
}

class TaskForm extends React.Component {
  
  constructor(props) {
    
    
    
    const project_id = props.match.params.project_id;
    const createMode = (props.match.path.endsWith("create")) ? true: false;
    super(props);
    this.state = {
      name: "",
      description: "",
      notes: "",
      urgency: "1",
      user_id: "",
      dueDate: "",
      project_id: project_id,
      task_id: createMode ? 0 : props.match.params.task_id,
      createMode: createMode,
      users: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.loadData = this.loadData.bind(this)

    
    

    // load the post if are editing.
    if (!createMode) {
      
      
      axios
      .get(`${API_BASE}/projects/${this.state.project_id}/tasks/${this.state.task_id}`)
      .then(res => {
        console.log("task fetched" + util.inspect(res.data));
        
        var urgency_array = {low:"0",medium:"1",high:"2"};
        

        this.setState({
          name: res.data.name,
          description: res.data.description,
          notes: res.data.notes,
          dueDate: res.data.dueDate,
          urgency: urgency_array[res.data.urgency],
          user_id: res.data.user_id
        })
      })
      .catch(err => console.log(err));
    }
  }
  componentDidMount() {
    this.loadData()
  }

  loadData() {
    axios
    .get(`${API_BASE}/users`)
    .then(res => {
      console.log("user data: " + util.inspect(res.data));
      this.setState({users: res.data})
    }).catch(err => console.log(err));
    console.log("state data: " + util.inspect(this.state.users));


    // load the post if are editing.
    if (!this.state.createMode) {
      
      
      axios
      .get(`${API_BASE}/projects/${this.state.project_id}/tasks/${this.state.task_id}`)
      .then(res => {
        console.log("task fetched" + util.inspect(res.data));
        
        var urgency_array = {low:"0",medium:"1",high:"2"};
        

        this.setState({
          name: res.data.name,
          description: res.data.description,
          notes: res.data.notes,
          dueDate: res.data.dueDate,
          urgency: urgency_array[res.data.urgency],
          user_id: res.data.user_id
        })
      })
      .catch(err => console.log(err));
    }
  }

  

  addTask(newTask) {
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
      urgency: this.state.urgency,
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
             <label htmlFor="user">User</label>
             <select className="form-control" name="user" id="user" value={this.state.user_id} onChange={this.handleInputChange}>
                <UserList users={this.state.users}/>
              </select>
            
            
           </div>
           <div className="form-group">
             <label htmlFor="description">Description</label>
             <textarea className="form-control" placeholder="Describe your task" name="description" id="description" value={this.state.description} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
             <label htmlFor="notes">Notes</label>
             <textarea className="form-control" placeholder="" name="notes" id="notes" value={this.state.notes} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input type="date" className="form-control" name="dueDate"  id="dueDate" value={this.state.dueDate} onChange={this.handleInputChange}/>
          </div>
           <div className="form-group">
             
            <label htmlFor="priority">Urgency</label>
             <select className="form-control" name="urgency" id="urgency" value={this.state.urgency} onChange={this.handleInputChange}>
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

