import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div>
        {/* Add-Edit Modal */}
        <div id="addEmployeeModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title">Add Student</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      className="form-control"
                      id="bio"
                      defaultValue={""}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" className="form-control" id="phone" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-success">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Delete-Modal */}
        <div id="deleteEmployeeModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title">Delete Student</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete these Records?</p>
                  <p className="text-warning">
                    <small>This action cannot be undone.</small>
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
