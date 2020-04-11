import React, { Component } from "react";
import StudentItem from "./StudentItem";
export default class Table extends Component {
  render() {
    // Nhận props student từ App truyền sang
    const { students, collection, totalPages, numPerPages } = this.props;

    // Dùng map hiển thị danh sách
    const listStudent = students.map((student, index) => (
      <StudentItem
        key={student.id}
        student={student}
        stt={index + 1 + (totalPages - 1) * numPerPages}
        collection={collection}
        // Nhận id từ studentitem truyền ra app
        onDelete={this.props.onDelete}
        onUpdate={this.props.onUpdate}
        onMultiDelete={this.props.onMultiDelete}
        handleChange={this.props.handleChange}
      />
    ));
    return <tbody id="table-content">{listStudent}</tbody>;
  }
}
