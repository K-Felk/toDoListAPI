
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const API_BASE = "https://bugtracker-api.herokuapp.com";
const BugItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-3">{props.title}</td>
      <td className="col-md-3">{props.description}</td>
      <td className="col-md-3">{props.created_at}</td>
      <td className="col-md-3">{props.updated_at}</td>
      <td className="col-md-3">{props.priority}</td>
      <td className="col-md-3">{props.status}</td>
      
      <td className="col-md-3">{props.issue_type}</td>
      
      <td className="col-md-3 btn-toolbar">
        <Link to={`/users/${props.user_id}/bugs/${props.id}`}>
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

class Bugs extends React.Component {

  constructor(props) {
    super(props);
    const id = props.match.params.id;
    this.state = {
      bugs: [],
      user_id: id,
      user: {}
    };

    this.loadBugs = this.loadBugs.bind(this);
    this.deleteBug = this.deleteBug.bind(this);
  }

  loadBugs() {
    axios
    .get(`${API_BASE}/users/${this.state.user_id}/bugs`)
    .then(res => {
      this.setState({ bugs: res.data });
      console.log(`Data loaded! = ${this.state.bugs}`)
    })
    .catch(err => console.log(err));

    axios
    .get(`${API_BASE}/users/${this.state.user_id}`)
    .then(res => {
      this.setState({ user: res.data });
      console.log(`Data loaded! = ${this.state.bugs}`)
    })
    .catch(err => console.log(err));
  }

  deleteBug(id) {
    let filteredArray = this.state.bugs.filter(item => item.id !== id)
    this.setState({bugs: filteredArray});
    axios
    .delete(`${API_BASE}/users/${this.state.user_id}/bugs/${id}`)
    .then(res => {
      console.log(`Record Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log('Bugs mounted!')
    this.loadBugs();
  }

  render() {

    const bugItems = this.state.bugs.map((bug)  => {
      return (
        <BugItem
          title={bug.title}
          description={bug.description}
          updated_at={bug.updated_at}
          created_at={bug.created_at}
          priority={bug.priority}
          issue_type={bug.issue_type}
          status={bug.status}
          user_id={bug.user_id}
          id={bug.id}
          key={bug.id}
          onDelete={this.deleteBug}
        />
      )
    });

    const headerString = (this.state.bugs.count === 0)
      ? "Loading..." : `bugs reported by ${this.state.user.fname} ${this.state.user.lname}`
    return (
      <div className="bugs">
        <h1> {headerString} </h1>
        <div className="users-list">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="col-md-3">Title</th>
                <th className="col-md-3">Description</th>
                <th className="col-md-3">Created</th>
                <th className="col-md-3">Updated</th>
                <th className="col-md-3">Priority</th>
                <th className="col-md-3">Status</th>
                <th className="col-md-3">Issue Type</th>
                <th className="col-md-3">Actions</th>

              </tr>
            </thead>
            <tbody>
              {bugItems}
            </tbody>
          </table>
          <Link to={`/users/${this.state.user_id}/bugs/create`}>
              <button className="btn btn-success btn-sm">
                <i className="glyphicon glyphicon-plus"></i> Create
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

export default Bugs;
