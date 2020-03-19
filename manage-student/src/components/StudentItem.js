import React from "react";

export default class StudentItem extends React.Component {
  onDelete = () => {
    //truyền id ra table
    this.props.onDelete(this.props.student.id);
  };
  onUpdate = () => {
    this.props.onUpdate(this.props.student.id);
  };
  render() {
    const student = this.props.student;
    return (
      <tr>
        <td>
          <span className="custom-checkbox">
            <input
              type="checkbox"
              className="checkboxStudent"
              name="options[]"
            />
            <label htmlFor="checkbox1"></label>
          </span>
        </td>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>{student.bio}</td>
        <td>{student.phone}</td>
        <td>
          <button type="button" class="btn" onClick={this.onUpdate}>
            <i className="material-icons text-warning align-middle" title="Edit">
              
            </i>
          </button>
          <button type="button" class="btn " onClick={this.onDelete}>
            <i className="material-icons text-danger align-middle" title="Delete">
              
            </i>
          </button>
        </td>
      </tr>
    );
  }
}
