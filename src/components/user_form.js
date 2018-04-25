import React from 'react';

class UserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email:  "",
      position: "",
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
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      position: this.state.position,
      id: this.state.id,
    });
    event.preventDefault();
  }

  handleCancel(event)
  {
    this.props.onCancel("new", {fname:"", lname:"", email:""});
    event.preventDefault();
  }

  componentWillReceiveProps(newProps) {
      if (newProps.user != null) {
        this.setState({
          fname: newProps.user.fname,
          lname: newProps.user.lname,
          email: newProps.user.email,
          position: newProps.user.position,
          id: newProps.user.id,
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
      <div className="user-form">
        <h1> Users </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" autoComplete='given-name' name="fname" id="fname" placeholder="First Name" value={this.state.fname} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name</label>
            <input type="text" className="form-control" autoComplete='family-name' name="lname" id="lname" placeholder="Last Name" value={this.state.lname} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" autoComplete='email' name="email"  id="email" placeholder="name@example.com" value={this.state.email} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="position">Position Title</label>
            <input type="position" className="form-control" autoComplete='position' name="position"  id="position" placeholder="position title" value={this.state.position} onChange={this.handleInputChange}/>
          </div>
          {this.renderButtons()}
        </form>
      </div>
    );
  }
}

export default UserForm;
