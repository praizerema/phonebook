import React, { Component } from "react";
import "./phonebook.css";
//import { genericTypeAnnotation } from "@babel/types";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

class Phonebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surname: "",
      othernames: "",
      phoneNo: "",
      email: "",
      address: "",
      file: "",
      contactList: [],
      table: [],
      showEdit: false,
      editValues: [],
      editIndex: -1,
      viewValues: [],
      showView: false
    };
  }
  surnameHandler = e => this.setState({ surname: e.target.value });

  othernamesHandler = e => this.setState({ othernames: e.target.value });

  emailHandler = e => this.setState({ email: e.target.value });

  phoneNoHandler = e => this.setState({ phoneNo: e.target.value });

  addressHandler = e => this.setState({ address: e.target.value });

  fileuploadHandler = e => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ fileupload: e.target.files[0] });
    }
  };

  viewInfo(index, key) {
    this.setState({
      showView: true,
      viewValues: this.state.contactList[index],
      viewIndex: index
    });
  }
  editInfo(index, key) {
    this.setState({
      showEdit: true,
      editValues: this.state.contactList[index],
      editIndex: index
    });
  }
  deleteInfo = (index, key) => {
    const contactList = this.state.contactList;
    delete contactList[index];
    this.setState({
      contactList: contactList
    });
    console.log(contactList);
  };
  add(e) {
    e.preventDefault();
    if (this.state.surname.length < 3) {
      alert("invalid surname");
      return 0;
    } else if (this.state.othernames.length < 3) {
      alert("invalid othernames");
    } else if (this.state.phoneNo.length > 11) {
      alert("invalid phoneNo");
    } else if (
      !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
        this.state.email
      )
    ) {
      alert("invalid email");
    } else if (this.state.address.length < 3) {
      alert("invalid address");
    }
    // else if(this.state.fileupload !== Image){
    //         alert ("invalid image")
    // }
    else {
      var data = {
        surname: this.state.surname,
        othernames: this.state.othernames,
        phoneNo: this.state.phoneNo,
        email: this.state.email,
        address: this.state.address,
        fileupload: this.state.fileupload
      };
      var contacts = this.state.contactList;
      contacts.push(data);
      this.setState({ contactList: contacts });
    }
  }

  render() {
    let cls = this;
    return (
      <div className="bdy ">
        <div className="contentWrap row">
          <div className="col-4 ">
            <div className="signupPage m-5">
              <h3 className="mb-4 text-center">Add New Contact</h3>
              <form
                className="row"
                action="post"
                onSubmit={e => {
                  this.add(e);
                }}
              >
                <div className="form-group col-6 mb-4">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Surname"
                    onChange={this.surnameHandler.bind(this)}
                    value={this.state.surname}
                  />
                </div>

                <div className="form-group col-6">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Othernames"
                    onChange={this.othernamesHandler.bind(this)}
                    value={this.state.othernames}
                  />
                </div>

                <div className="form-group col-6 mb-4">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Mobile No"
                    onChange={this.phoneNoHandler.bind(this)}
                    value={this.state.phoneNo}
                  />
                </div>

                <div className="form-group col-6">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    onChange={this.emailHandler.bind(this)}
                    value={this.state.email}
                  />
                </div>

                <div className="form-group col-12 mb-4">
                  <input
                    className="form-control"
                    type="address"
                    placeholder="Address"
                    onChange={this.addressHandler.bind(this)}
                    value={this.state.address}
                  />
                </div>
                <div className="form-group col-12 mb-5 text-left">
                  <label className="font-weight-bold mb-2">
                    Upload contact image
                  </label>
                  <br />
                  <input
                    className="text-muted"
                    type="file"
                    placeholder="image"
                    //onChange={this.fileuploadHandler}// what was there before
                    onChange={this.fileuploadHandler.bind(this)}
                    //value={this.state.fileupload}
                  />
                </div>
                <div className="text-center col">
                  <button className="btn btn-add" type="submit" name="add">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>

          <Edit clsdata={this} />
          <View clsdata={this} />
          <div className="col-8">
            <div className="contactWrap m-4">
              <h3 className="mb-4 text-center">My Contact List</h3>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Name</th> <th>Phone No</th> <th>Email</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                  {this.state.contactList.map(function(item, key) {
                    return (
                      <tr key={key}>
                        <td>
                          {item.surname} {item.othernames}
                        </td>
                        <td>{item.phoneNo}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            className="btn mr-2 btn-green"
                            onClick={cls.viewInfo.bind(cls, key)}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button
                            className="btn mr-2 btn-blue"
                            onClick={cls.editInfo.bind(cls, key)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="btn btn-red"
                            onClick={cls.deleteInfo.bind(cls, key)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Edit = cls => {
  if (cls.clsdata.state.editValues.length === 0) {
    return null;
  }
  const contact = cls.clsdata.state.editValues;
  const index = cls.clsdata.state.editIndex;
  let contactList = cls.clsdata.state.contactList;
  return (
    <div
      className="editWrap"
      style={
        cls.clsdata.state.showEdit ? { display: "grid" } : { display: "none" }
      }
    >
      
        <div className="editBody text-left">
          <div className="closeWrap text-left">
        <span
          className="close"
          onClick={() => cls.clsdata.setState({ showEdit: false })}
        >
          x
        </span>
        </div>
          <h3>Edit Contact</h3>
          <form>
          <div className="form-group text-left">
          <label>Surname</label>
          <input
          className="form-control edit"
            type="text"
            placeholder="Surname"
            onChange={e => {
              cls.clsdata.setState({
                editValues: { ...contact, surname: e.target.value }
              });
              contactList[index] = cls.clsdata.state.editValues;
              cls.clsdata.setState({
                contactList: contactList
              });
            }}
            value={contact.surname}
          />
          </div>
        
          <div className="form-group">
          <label>Othernames</label>
          <input
          className="form-control edit"
            type="text"
            placeholder="Othernames"
            onChange={e => {
              cls.clsdata.setState({
                editValues: { ...contact, othernames: e.target.value }
              });
              contactList[index] = cls.clsdata.state.editValues;
              cls.clsdata.setState({
                contactList: contactList
              });
            }}
            value={contact.othernames}
          />
          </div>
          
          <div className="form-group">
          <label>Email</label>
          <input
          className="form-control edit"
            type="email"
            placeholder="Email"
            onChange={e => {
              cls.clsdata.setState({
                editValues: { ...contact, email: e.target.value }
              });
              contactList[index] = cls.clsdata.state.editValues;
              cls.clsdata.setState({
                contactList: contactList
              });
            }}
            value={contact.email}
          />
          </div>
          
          <div className="form-group">
          <label>Mobile No</label>
          <input
          className="form-control edit"
            type="tel"
            placeholder="Mobile No"
            onChange={e => {
              cls.clsdata.setState({
                editValues: { ...contact, phoneNo: e.target.value }
              });
              contactList[index] = cls.clsdata.state.editValues;
              cls.clsdata.setState({
                contactList: contactList
              });
            }}
            value={contact.phoneNo}
          />
          </div>
          
          <div className="form-group">
          <label>Address</label>
          <input
          className="form-control edit"
            type="text"
            placeholder="address"
            onChange={e => {
              cls.clsdata.setState({
                editValues: { ...contact, address: e.target.value }
              });
              contactList[index] = cls.clsdata.state.editValues;
              cls.clsdata.setState({
                contactList: contactList
              });
            }}
            value={contact.address}
          />
          </div>
          </form>
        <div className="text-right"> 
        <button
            className="btn btn-add btn-small"
            onClick={() => cls.clsdata.setState({ showEdit: false })}
          >
            Done
          </button>
        </div>
          
        </div>
      </div>
  );
};

const View = cls => {
  if (cls.clsdata.state.viewValues.length === 0) {
    return null;
  }
  const contact = cls.clsdata.state.viewValues;
  let reader = new FileReader();
  reader.onloadend = () => {
    cls.clsdata.setState({
      imagePreviewUrl: reader.result //this is what you will set in you img scr={imagePreviewUrl}
    });
  };

  reader.readAsDataURL(contact.fileupload);
  return (
    <div
      className="viewWrap"
      style={
        cls.clsdata.state.showView ? { display: "grid" } : { display: "none" }
      }
    >
      <div className="viewBody">
        <div className="closeWrap text-left">
          <span
            className="close mr-3 mt-3"
            onClick={() => cls.clsdata.setState({ showView: false })}
          >
            x
          </span>
          </div>
          <div className="contactImage">
            <img id="target" src={cls.clsdata.state.imagePreviewUrl} />
          </div>
          <div className="surnameOthername">
            {contact.surname} {contact.othernames}
          </div>

          <div className="email">
            <a href="#"> {contact.email} </a>
          </div>

          <div className="phoneNo">{contact.phoneNo}</div>

          <div className="address">{contact.address}</div>
        </div>
      </div>
   
  );
};
export default Phonebook;
