import React from 'react';
import UserForm from './user_form';
import UserList from './user_list';
import axios from 'axios';
const API_BASE = "https://bugtracker-api.herokuapp.com/";

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      formMode: "new",
      user: {lname:"", fname:"", email:""}
    };
    this.loadUsers = this.loadUsers.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  // loadAuthors() {
  //   this.setState({
  //     users: [
  //       {id: 1, fname: "sam", lname: "iam", email: "sam@aol.com"},
  //       {id: 2, fname: "jane", lname: "doe", email: "jane@aol.com"},
  //       {id: 3, fname: "fred", lname: "bear", email: "fred@aol.com"},
  //       {id: 4, fname: "ted", lname: "tooy", email: "ted@aol.com"},
  //     ]}
  //   );
  // }

  updateForm(mode, userVals) {
    this.setState({
      user: Object.assign({}, userVals),
      formMode: mode,
    });
  }

  clearForm()
  {
    console.log("clear form");
    this.updateForm("new",{fname:"",lname:"",email:""});
  }

  formSubmitted(user) {
    if(this.state.formMode === "new") {
      this.addUser(user);
    } else {
      this.updateUser(user);
    }
    this.clearForm();
  }

  loadUsers() {
    axios
    .get(`${API_BASE}/users`)
    .then(res => {
      this.setState({ users: res.data });
      console.log(`Data loaded! = ${this.state.users}`)
    })
    .catch(err => console.log(err));
  }

  addUser(newUser) {
    axios
    .post(`${API_BASE}/users`, newUser)
    .then(res => {
      res.data.key = res.data.id;
      this.setState({ users: [...this.state.users, res.data] });
    })
    .catch(err => console.log(err));
  }

  updateUser(user) {
    axios
    .put(`${API_BASE}/users/${user.id}`, user)
    .then(res => {
      this.loadUsers();
    })
    .catch(err => console.log(err));
  }

  removeUser(id) {
    let filteredArray = this.state.users.filter(item => item.id !== id)
    this.setState({users: filteredArray});
    axios
    .delete(`${API_BASE}/users/${id}`)
    .then(res => {
      console.log(`User Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log("Users just got mounted")
    this.loadUsers();
  }

  render() {
    return (
      <div className="users">
        <UserForm
          onSubmit={(user) => this.formSubmitted(user)}
          onCancel={(mode,user) => this.updateForm(mode,user)}
          formMode={this.state.formMode}
          user={this.state.user}
        />
        <UserList
          users={this.state.users}
          onDelete={(id) => this.removeUser(id)}
          onEdit={(mode,user) => this.updateForm(mode,user)}
        />
      </div>
    );
  }
}

export default Users;
