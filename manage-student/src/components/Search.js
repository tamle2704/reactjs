import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div className="row mt-4 flex-row-reverse">
        <div className="col-sm-4 my-1">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Search;