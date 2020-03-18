import React from "react";

export default function Table({ students }) {
  const [studenList, setstudenList] = React.useState(students);
  console.log(students);
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
      <tbody id="table-content">
        {studenList.map(student => (
          <tr key={student.id}>
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
              <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                <i
                  className="material-icons"
                  data-toggle="tooltip"
                  title="Edit"
                >
                  
                </i>
              </a>
              <a
                href="#deleteEmployeeModal"
                className="delete"
                data-toggle="modal"
              >
                <i
                  className="material-icons"
                  data-toggle="tooltip"
                  title="Delete"
                >
                  
                </i>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
