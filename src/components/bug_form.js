import React from 'react';
import axios from 'axios';

//const API_BASE = 'http://localhost:3000/';
const API_BASE = "https://bugtracker-api.herokuapp.com";

class BugForm extends React.Component {

  constructor(props) {

    const id = props.match.params.id;
    const createMode = (props.match.path.endsWith("create")) ? true: false;
    super(props);
    this.state = {
      title: "",
      description: "",
      issue_type: "0",
      priority: "0",
      status: "0",
      user_id: id,
      bug_id: createMode ? 0 : props.match.params.pid,
      createMode: createMode
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    // load the post if are editing.
    if (!createMode) {
      axios
      .get(`${API_BASE}/users/${this.state.user_id}/bugs/${this.state.bug_id}`)
      .then(res => {
        console.log("post fetched");
        var issue_type_array = {issue:"0",enhancement:"1",feature:"2"};
        var status_array = {open:"0",closed:"1",monitor:"2"};
        var priority_array = {low:"0",medium:"1",high:"2"};
        

        this.setState({
          title: res.data.title,
          description: res.data.description,
          issue_type: issue_type_array[res.data.issue_type],
          priority: priority_array[res.data.priority],
          status: status_array[res.data.status]
        })
      })
      .catch(err => console.log(err));
    }
  }

  addBug(newBug) {
    console.log(`posting bug with title ${newBug.title}`);
    axios
    .post(`${API_BASE}/users/${newBug.user_id}/bugs`, newBug)
    .then(res => {
      
      console.log('posted!');
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
  }

  updateBug(bug) {
    axios
    .put(`${API_BASE}/users/${bug.user_id}/bugs/${bug.bug_id}`, bug)
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
    const bug = {
      title: this.state.title,
      description: this.state.description,
      user_id: this.state.user_id,
      bug_id: this.state.bug_id,
      priority: this.state.priority,
      status: this.state.status,
      issue_type: this.state.issue_type
    }
    if (this.state.createMode) {
      this.addBug(bug);
    } else {
      this.updateBug(bug);
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
         {this.state.createMode ? "Create Bug" : "Edit Bug"}
       </h1>
       <div className="user-form">
         <form onSubmit={this.handleSubmit}>
           <div className="form-group">
             <label>Title</label>
             <input type="text" className="form-control" name="title" id="title" placeholder="Enter title" value={this.state.title} onChange={this.handleInputChange}/>
           </div>
           <div className="form-group">
             <label htmlFor="description">Description</label>
             <textarea className="form-control" name="description" id="description" value={this.state.description} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
             <label htmlFor="issue_type">Issue Type</label>
             <select className="form-control" name="issue_type" id="issue_type" value={this.state.issue_type} onChange={this.handleInputChange}>
            <option value="0">Issue</option>
            <option value="1">enhancement</option>
            <option value="2">Feature</option>
            </select>
            <label htmlFor="priority">Priority</label>
             <select className="form-control" name="priority" id="priority" value={this.state.priority} onChange={this.handleInputChange}>
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
            </select>
            <label htmlFor="status">Status</label>
             <select className="form-control" name="status" id="status" value={this.state.status} onChange={this.handleInputChange}>
            <option value="0">Open</option>
            <option value="1">Closed</option>
            <option value="2">Monitor</option>
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

export default BugForm;

