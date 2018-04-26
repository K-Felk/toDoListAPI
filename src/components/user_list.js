import React from 'react';
import { Link } from 'react-router-dom';

const UserListItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-3">{props.fname}</td>
      <td className="col-md-3">{props.lname}</td>
      <td className="col-md-3">{props.email}</td>
      <td className="col-md-3">{props.position}</td>
      <td className="col-md-3 btn-toolbar">
        <Link to={`/users/${props.id}/tasks`}>
        <button className="btn btn-success btn-sm">
          <i className="glyphicon glyphicon-list"></i> Tasks
        </button>
      </Link>
      <button className="btn btn-success btn-sm" onClick={event => props.onEdit("edit",props)}>
        <i className="glyphicon glyphicon-pencil"></i> Edit
      </button>
      <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
        <i className="glyphicon glyphicon-remove"></i> Delete
      </button>
    </td>
  </tr>
);
}

const UserList = (props) => {
  const userItems = props.users.map((user)  => {
    return (
      <UserListItem
        fname={user.fname}
        lname={user.lname}
        email={user.email}
        position={user.position}
        id={user.id}
        key={user.id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    )
  });

  return (
    <div className="user-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">First Name</th>
            <th className="col-md-3">Last Name</th>
            <th className="col-md-3">Email</th>
            <th className="col-md-3">Position</th>
            <th className="col-md-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userItems}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
