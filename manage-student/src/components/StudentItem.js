import React from "react";

export default class StudentItem extends React.Component {
  onDelete = () => {
    //truyền id ra table
    this.props.onDelete(this.props.student.id);
  };
  onUpdate = () => {
    this.props.onUpdate(this.props.student.id);
  };
  handleChange = () => {
    this.props.handleChange(this.props.student);
  };

  render() {
    const { student, stt } = this.props;

    return (
      <tr>
        <td>{stt}</td>
        <td>
          <span className="custom-checkbox">
            <input
              type="checkbox"
              checked={student.isChecked}
              onChange={this.props.handleChange}
              name={student.name}
            />
            <label htmlFor="checkbox1"></label>
          </span>
        </td>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>{student.bio}</td>
        <td>{student.phone}</td>
        <td>
          <button
            className="btn"
            style={
              student.isChecked === false
                ? { type: "button" }
                : { display: "none" }
            }
            onClick={this.onUpdate}
          >
            <i
              className="material-icons text-warning align-middle"
              title="Edit"
            >
              
            </i>
          </button>
          <button
            className="btn "
            style={
              student.isChecked === false
                ? { type: "button" }
                : { display: "none" }
            }
            onClick={this.onDelete}
          >
            <i
              className="material-icons text-danger align-middle"
              title="Delete"
            >
              
            </i>
          </button>
        </td>
      </tr>
    );
  }
}
