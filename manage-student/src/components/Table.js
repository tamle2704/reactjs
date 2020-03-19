import React, { Component } from "react";
import StudentItem from "./StudentItem";
export default class Table extends Component {
  render() {
    // Nhận props student từ App truyền sang
    const students = this.props.students;
    // Dùng map hiển thị danh sách
    const listStudent = students.map((student, index) => (
      <StudentItem
        key={student.id}
        student={student}
        // Nhận id từ studentitem truyền ra app 
        onDelete={this.props.onDelete}
        onUpdate={this.props.onUpdate}
      />
    ));
    return (
      <table className="table table-striped table-hover" id="myTable">
        <thead>
          <tr>
            <th>
              <span className="custom-checkbox">
                <input type="checkbox" id="selectAll" />
                <label htmlFor="selectAll" />
              </span>
            </th>
            <th className="sort">
              Name <i className="fas fa-sort" />
            </th>
            <th className="sort">
              Email <i className="fas fa-sort" />
            </th>
            <th className="sort">
              Address <i className="fas fa-sort" />
            </th>
            <th className="sort">
              Phone <i className="fas fa-sort" />
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="table-content">{listStudent}</tbody>
      </table>
    );
  }
}
