import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Table from "./components/Table";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";
import db from "./firebase/firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      modalVisible: false,
      modalDelete: false,
      studentUpdate: null,
      allChecked: false,
      collection: [],
      sort: {
        column: null,
        direction: "down",
      },
      totalPages: 1,
      numPerPages: 10,
    };
  }

  componentDidMount() {
    db.get().then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        isChecked: false,
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

  onCloseModal = () => {
    this.setState({
      modalVisible: false,
      modalDelete: false,
      studentUpdate: null,
    });
  };

  onShowModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  onShowModalDel = () => {
    this.setState({
      modalDelete: true,
    });
  };
  onSubmit = (data) => {
    console.log(data);
    var newStudents = this.state.students;
    if (data.id === "") {
      data.id = this.generateID();
      newStudents.unshift(data);
      db.add(data);
    } else {
      var index = newStudents.findIndex((student) => student.id === data.id);
      newStudents[index] = data;
      data.isChecked = false;
      db.doc(data.id).update(data);
    }
    this.setState({
      students: newStudents,
      studentUpdate: null,
    });
  };

  onUpdate = (id) => {
    var students = this.state.students;
    var index = students.findIndex((student) => student.id === id);
    var newStudents = students[index];
    this.setState({
      studentUpdate: newStudents,
    });
    this.onShowModal();
  };

  onDelete = (id) => {
    const newStudents = this.state.students;
    if (window.confirm("Bạn có muốn xóa không?")) {
      let index = newStudents.findIndex((student) => student.id === id);
      if (index !== -1) {
        newStudents.splice(index, 1);
        db.doc(id).delete();
      }
    }
    this.setState({
      students: newStudents,
    });
  };

  onMultiDelete = () => {
    const { students, collection } = this.state;

    for (let i = 0; i <= collection.length; i++) {
      let index = students.findIndex((student) => student.id === collection[i]);
      if (index !== -1) {
        students.splice(index, 1);
        db.doc(collection[i]).delete();
      }
    }

    this.setState({
      students: students,
      collection: [],
    });
  };

  handleChange = (e) => {
    let itemName = e.target.name;
    let checked = e.target.checked;
    const collection = [];
    this.setState((prevState) => {
      let { students, allChecked } = prevState;
      if (itemName === "checkAll") {
        allChecked = checked;
        students = students.map((item) => ({ ...item, isChecked: checked }));
      } else {
        students = students.map((item) =>
          item.name === itemName ? { ...item, isChecked: checked } : item
        );
        allChecked = students.every((item) => item.isChecked);
      }
      for (const item of students) {
        if (item.isChecked) {
          collection.push(item.id);
        }
      }
      return { students, allChecked, collection };
    });
  };

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    });
    console.log(keyword);
  };

  onSort = (column) => {
    const direction = this.state.sort.column
      ? this.state.sort.direction === "up"
        ? "down"
        : "up"
      : "down";
    const sortStudents = this.state.students;
    sortStudents.sort((a, b) => {
      if (column === "name" || column === "email" || column === "bio") {
        if (a[column].toLowerCase() < b[column].toLowerCase()) {
          return 1;
        }
        if (a[column].toLowerCase() > b[column].toLowerCase()) {
          return -1;
        }
        return 0;
      } else {
        return a[column].replace(/-/g, "") - b[column].replace(/-/g, "");
      }
    });
    if (direction === "down") {
      sortStudents.reverse();
    }
    this.setState({
      data: sortStudents,
      sort: {
        column,
        direction,
      },
    });
  };

  setArrow = (column) => {
    let className = "fas fa-sort";

    if (this.state.sort.column === column) {
      className += this.state.sort.direction === "up" ? "-up" : "-down";
    }
    return className;
  };

  choosePage = (a) => {
    this.setState({
      totalPages: Number(a),
    });
  };

  onSelect = (e) => {
    this.setState({
      numPerPages: e.target.value,
    });
  };

  render() {
    var { students, keyword, numPerPages, totalPages } = this.state;

    if (keyword) {
      students = students.filter((student) => {
        return (
          student.name.toLowerCase().indexOf(keyword) !== -1 ||
          student.email.toLowerCase().indexOf(keyword) !== -1 ||
          student.bio.toLowerCase().indexOf(keyword) !== -1 ||
          student.phone.toLowerCase().indexOf(keyword) !== -1
        );
      });
    }
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(students.length / numPerPages); i++) {
      pageNumbers.push(i);
    }
    const indexOfLastStudent = totalPages * numPerPages;
    const indexOfFirstStudent = indexOfLastStudent - numPerPages;
    students = students.slice(indexOfFirstStudent, indexOfLastStudent);

    return (
      <div>
        <div className="container">
          {/* //Seacrh */}
          <Search onSearch={this.onSearch} />

          <div className="table-wrapper">
            {/* Delete - Add */}
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Danh sách <b>Sinh viên</b>
                  </h2>
                </div>

                <div className="col-sm-6">
                  <span className="select">Hiển thị:</span>
                  <select
                    className="select"
                    defaultValue="0"
                    onChange={this.onSelect}
                  >
                    <option value="0" disabled>
                      Mặc định 10 dòng
                    </option>
                    <option value="5">5 dòng</option>
                    <option value="10">10 dòng</option>
                    <option value="15">15 dòng</option>
                  </select>
                  <button
                    className="btn btn-success"
                    data-toggle="modal"
                    onClick={this.onShowModal}
                  >
                    <i className="material-icons"></i>{" "}
                    <span>Thêm sinh viên</span>
                  </button>
                  <button
                    className="btn btn-danger"
                    data-toggle="modal"
                    onClick={this.onShowModalDel}
                  >
                    <i className="material-icons"></i> <span>Xóa nhiều</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <table className="table table-striped table-hover" id="myTable">
              <thead>
                <tr>
                  <th>
                    <span className="custom-checkbox">
                      <input
                        type="checkbox"
                        name="checkAll"
                        checked={this.state.allChecked}
                        onChange={this.handleChange}
                      />
                      <label></label>
                    </span>
                  </th>
                  <th onClick={() => this.onSort("name")}>
                    Tên <i className={this.setArrow("name")} />
                  </th>
                  <th onClick={() => this.onSort("email")}>
                    Email <i className={this.setArrow("email")} />
                  </th>
                  <th onClick={() => this.onSort("bio")}>
                    Địa chỉ <i className={this.setArrow("bio")} />
                  </th>
                  <th className=" phone" onClick={() => this.onSort("phone")}>
                    Số ĐT <i className={this.setArrow("phone")} />
                  </th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <Table
                students={students}
                totalPages={totalPages}
                numPerPages={numPerPages}
                onDelete={this.onDelete}
                onUpdate={this.onUpdate}
                onMultiDelete={this.onMultiDelete}
                handleChange={this.handleChange}
                collection={this.state.collection}
              />
            </table>
            {/* Pagination */}
            <div className="clearfix">
              <ul className="pagination" id="addPages"></ul>
            </div>
          </div>
          <Pagination
            pageNumbers={pageNumbers}
            totalPages={totalPages}
            choosePage={this.choosePage}
          />
        </div>

        {/* Add Modal HTML */}
        {/* Edit Modal HTML */}
        {/* TODO: Sử dụng chung 1 Modal cho cả Add lẫn Edit */}
        {/* Delete Modal HTML */}
        <Modal
          onSubmit={this.onSubmit}
          onCloseModal={this.onCloseModal}
          onMultiDelete={this.onMultiDelete}
          modalVisible={this.state.modalVisible}
          modalDelete={this.state.modalDelete}
          studentUpdate={this.state.studentUpdate}
          collection={this.state.collection}
        />
      </div>
    );
  }
}
export default App;
