import React from 'react';

class ProjectForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      notes:  "",
      dueDate: "",
      id: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
    this.props.onSubmit({
      name: this.state.name,
      description: this.state.description,
      notes: this.state.notes,
      dueDate: this.state.dueDate,
      id: this.state.id,
    });
    event.preventDefault();
  }

  handleCancel(event)
  {
    this.props.onCancel("new", {name:"", description:"", notes:"", dueDate:""});
    event.preventDefault();
  }

  componentWillReceiveProps(newProps) {
      if (newProps.project != null) {
        this.setState({
          name: newProps.project.name,
          description: newProps.project.description,
          notes: newProps.project.notes,
          dueDate: newProps.project.dueDate,
          id: newProps.project.id,
        });
      }
  }

  renderButtons() {
    if (this.props.formMode === "new") {
      return(
        <button type="submit" className="btn btn-primary">Create</button>
      );
    } else {
      return(
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
        </div>
      );
    }
  }

  render()  {
    return (
      <div className="project-form">
        <h1> Projects </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" autoComplete='name' name="name" id="name" placeholder="Name of Project" value={this.state.name} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="lname">Description</label>
            <input type="text" className="form-control" autoComplete='description' name="description" id="description" placeholder="Description of the Project" value={this.state.description} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <input type="text" className="form-control" name="notes" id="notes" value={this.state.notes} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Due Date</label>
            <input type="date" className="form-control" autoComplete='date' name="dueDate"  id="dueDate" value={this.state.dueDate} onChange={this.handleInputChange}/>
          </div>
          
          {this.renderButtons()}
        </form>
      </div>
    );
  }
}

export default ProjectForm;
