import React, { Component } from "react";
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      bio: "",
      phone: "",
    };
  }

  componentDidMount() {
    if (this.props.studentUpdate) {
      this.setState({
        id: this.props.studentUpdate.id,
        name: this.props.studentUpdate.name,
        email: this.props.studentUpdate.email,
        bio: this.props.studentUpdate.bio,
        phone: this.props.studentUpdate.phone,
      });
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.studentUpdate) {
      this.setState({
        id: nextProps.studentUpdate.id,
        name: nextProps.studentUpdate.name,
        email: nextProps.studentUpdate.email,
        bio: nextProps.studentUpdate.bio,
        phone: nextProps.studentUpdate.phone,
      });
    } else if (!nextProps.studentUpdate) {
      this.setState({
        id: "",
        name: "",
        email: "",
        bio: "",
        phone: "",
      });
    }
  }

  onCloseModal = () => {
    this.props.onCloseModal();
  };

  onMultiDelete = () => {
    this.props.onMultiDelete();
    this.onCloseModal();
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    // Submit xong thì clear form
    this.onClear();
    this.onCloseModal();
  };

  onClear = () => {
    this.setState({
      name: "",
      email: "",
      bio: "",
      phone: "",
    });
  };

  render() {
    const { collection, modalVisible, modalDelete } = this.props;
    const styles = modalVisible ? { display: "block" } : { display: "none" };
    const styles2 = modalDelete ? { display: "block" } : { display: "none" };
    const id = this.state.id;
    return (
      <div>
        {/* Add-Edit Modal */}

        <div className="modal fade show" style={styles}>
          <div className="modal-dialog ">
            <div className="modal-content">
              <form onSubmit={this.onSubmit}>
                <div className="modal-header">
                  <h4 className="modal-title">
                    {id !== "" ? "Cập nhập thông tin" : "Thêm sinh viên"}
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                    onClick={this.onCloseModal}
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />

                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />

                    <label>Bio</label>
                    <textarea
                      className="form-control"
                      name="bio"
                      value={this.state.bio}
                      onChange={this.onChange}
                    />

                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.onCloseModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    {id !== "" ? "Cập nhật" : "Thêm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal fade show " style={styles2}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Xóa
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={this.onCloseModal}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {collection.length === 0
                  ? "No items selected!"
                  : `Are you sure you want to delete ${collection.length} ${
                      collection.length <= 1 ? "item" : "items"
                    }`}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.onCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onMultiDelete}
                  style={
                    collection.length === 0
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Modal;
