import React from 'react';
import { Link } from 'react-router-dom';

const ProjectListItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-3">{props.name}</td>
      <td className="col-md-3">{props.description}</td>
      <td className="col-md-3">{props.notes}</td>
      <td className="col-md-3">{props.dueDate}</td>
      <td className="col-md-3 btn-toolbar">
        <Link to={`/projects/${props.id}/tasks`}>
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

const ProjectList = (props) => {
  const projectItems = props.projects.map((project)  => {
    return (
      <ProjectListItem
        name={project.name}
        description={project.description}
        notes={project.notes}
        dueDate={project.dueDate}
        id={project.id}
        key={project.id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    )
  });

  return (
    <div className="project-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">Name</th>
            <th className="col-md-3">Description</th>
            <th className="col-md-3">Notes</th>
            <th className="col-md-3">Due Date</th>
            <th className="col-md-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectItems}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectList;
