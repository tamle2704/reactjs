import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  onChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };
  onSearch = () => {
    this.props.onSearch(this.state.keyword.toLowerCase());
  };
  render() {
    const { keyword } = this.state;
    return (
      <div className="row mt-4 flex-row-reverse">
        <div className="col-sm-4 my-1">
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              name="keyword"
              value={keyword}
              onChange={this.onChange}
            />
            <input
              type="submit"
              className="btn btn-success"
              onClick={this.onSearch}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
