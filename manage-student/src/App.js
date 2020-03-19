import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Table from "./components/Table";
import Modal from "./components/Modal";
import db from "./firebase/firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      modalVisible: false,
      studentUpdate: null
    };
  }

  componentDidMount() {
    db.get().then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      this.setState({ students: data });
    });
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  generateID() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }

  isToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      studentUpdate: null
    });
  };

  onCloseModal = () => {
    this.setState({
      modalVisible: false,
      studentUpdate: null
    });
  };

  onShowModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  onSubmit = data => {
    var newStudents = this.state.students;
    if (data.id === "") {
      data.id = this.generateID();
      newStudents.push(data);
      console.log(data);
      db.add(data);
    } else {
      var index = newStudents.findIndex(student => student.id === data.id);
      newStudents[index] = data;
      db.doc(data.id).update(data);
    }
    this.setState({
      students: newStudents,
      studentUpdate : null
    });
  };

  onUpdate = id => {
    var students = this.state.students;
    var index = students.findIndex(student => student.id === id);
    var newStudents = students[index];
    this.setState({
      studentUpdate: newStudents
    });
    this.onShowModal();
  };

  onDelete = id => {
    const newStudents = this.state.students;
    if (window.confirm("Bạn có muốn xóa không?")) {
      let index = newStudents.findIndex(student => student.id === id);
      if (index !== -1) {
        newStudents.splice(index, 1);
        db.doc(id).delete();
      }
    }
    this.setState({
      students: newStudents
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          {/* //Seacrh */}
          <Search />

          <div className="table-wrapper">
            {/* Delete - Add */}
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Manage <b>Student</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <a
                    href=" #"
                    className="btn btn-success"
                    data-toggle="modal"
                    onClick={this.isToggleModal}
                  >
                    <i className="material-icons"></i>{" "}
                    <span>Add New Student</span>
                  </a>
                  <a
                    href="#multipleDelete"
                    className="btn btn-danger"
                    data-toggle="modal"
                  >
                    <i className="material-icons"></i> <span>Delete</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Table */}
            <Table
              students={this.state.students}
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
            />

            {/* Pagination */}
            <div className="clearfix">
              <ul className="pagination" id="addPages"></ul>
            </div>
          </div>
        </div>

        {/* Add Modal HTML */}
        {/* Edit Modal HTML */}
        {/* TODO: Sử dụng chung 1 Modal cho cả Add lẫn Edit */}
        {/* Delete Modal HTML */}
        <Modal
          onSubmit={this.onSubmit}
          onCloseModal={this.onCloseModal}
          modalVisible={this.state.modalVisible}
          studentUpdate={this.state.studentUpdate}
        />
      </div>
    );
  }
}
export default App;
