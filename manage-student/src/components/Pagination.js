import React, { Component } from "react";
export default class Pagination extends Component {
  choosePage = (e) => {
    const page = e.target.id;
    this.props.choosePage(page);
    console.log(Number(page));
  };
  render() {
    const { pageNumbers, totalPages } = this.props;
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageNumbers.map((number) => {
            if (totalPages === number) {
              return (
                <li key={number} id={number} className="page-item active">
                  <a className="page-link" href=" #">
                    {number}
                  </a>
                </li>
              );
            } else {
              return (
                <li key={number} id={number} className="page-item">
                  <a
                    id={number}
                    className="page-link"
                    href=" #"
                    onClick={this.choosePage}
                  >
                    {number}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    );
  }
}
