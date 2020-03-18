import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import Title from "./components/Title";
import Table from "./components/Table";
import Modal from "./components/Modal";
import db from "./firebase/firebase";

function App() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await db.get();
      setStudents(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        {/* //Seacrh */}
        <Search />

        <div className="table-wrapper">
          {/* Delete - Add */}
          <Title />

          {/* Table */}
          <Table students = {students} />

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
      <Modal />
    </div>
  );
}

export default App;
