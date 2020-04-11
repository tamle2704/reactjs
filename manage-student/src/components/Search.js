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
              type="text"
              className="form-control"
              placeholder="Search"
              name="keyword"
              value={keyword}
              onChange={this.onChange}
            />
            <button className="btn btn-primary" onClick={this.onSearch}>Gửi</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
