import React, { Component } from "react";
import "./phonebook.css";
//import { genericTypeAnnotation } from "@babel/types";

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
    this.fileuploadHandler.bind(this);
  }
  surnameHandler = e => this.setState({ surname: e.target.value });

  othernamesHandler = e => this.setState({ othernames: e.target.value });

  emailHandler = e => this.setState({ email: e.target.value });

  phoneNoHandler = e => this.setState({ phoneNo: e.target.value });

  addressHandler = e => this.setState({ address: e.target.value });

  fileuploadHandler = e => {
    const self = this;
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
      <div className="bdy">
        <div className="contentWrap">
          <div className="signupPage">
            <form
              action="post"
              onSubmit={e => {
                this.add(e);
              }}
            >
              <h2>Add New Contact</h2>
              <input
                type="text"
                placeholder="Surname"
                onChange={this.surnameHandler.bind(this)}
                value={this.state.surname}
              />
              <input
                type="text"
                placeholder="Othernames"
                onChange={this.othernamesHandler.bind(this)}
                value={this.state.othernames}
              />
              <input
                type="tel"
                placeholder="Mobile No"
                onChange={this.phoneNoHandler.bind(this)}
                value={this.state.phoneNo}
              />
              <input
                type="email"
                placeholder="Email"
                onChange={this.emailHandler.bind(this)}
                value={this.state.email}
              />
              <input
                style={{ width: "90%" }}
                type="address"
                placeholder="Address"
                onChange={this.addressHandler.bind(this)}
                value={this.state.address}
              />
              <label>Upload contact image</label> <br />
              <input
                style={{ width: "90%" }}
                type="file"
                placeholder="image"
                //onChange={this.fileuploadHandler}// what was there before
                onChange={this.fileuploadHandler.bind(this)}
                //value={this.state.fileupload}
              />
              <button className="add" type="submit" name="add">
                Add
              </button>
            </form>
          </div>
        </div>
        <Edit clsdata={this} />
        <View clsdata={this} />
        <div className="contactWrap">
          <h2>My Contact List</h2>
          <table>
            <tbody>
              <tr>
                <th>Name</th> <th>Phone No</th> <th>Email</th> <th>Address</th>
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
                        className="green"
                        onClick={cls.viewInfo.bind(cls, key)}
                      >
                        View
                      </button>
                      <button
                        className="blue"
                        onClick={cls.editInfo.bind(cls, key)}
                      >
                        Edit
                      </button>
                      <button
                        className="red"
                        onClick={cls.deleteInfo.bind(cls, key)}
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
      <div className="closeWrap">
        <span
          className="close"
          onClick={() => cls.clsdata.setState({ showEdit: false })}
        >
          x
        </span>
        <div className="editBody">
          <h2>Edit Contact</h2>
          <label>Surname</label>
          <input
            type="text"
            placeholder="Surname"
            className="edit"
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
          <label>Othernames</label>
          <input
            type="text"
            placeholder="Othernames"
            className="edit"
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
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            className="edit"
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
          <label>Mobile No</label>
          <input
            type="tel"
            placeholder="Mobile No"
            className="edit"
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
          <label>Address</label>
          <input
            type="text"
            placeholder="address"
            className="edit"
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
          <button
            className="add"
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

  return (
    <div
      className="viewWrap"
      style={
        cls.clsdata.state.showView ? { display: "grid" } : { display: "none" }
      }
    >
      <div className="closeWrap">
        <span
          className="close"
          onClick={() => cls.clsdata.setState({ showView: false })}
        >
          x
        </span>
        <div className="viewBody">
          <h2>View Contact</h2>
          <div className="contactImage">
            <img id="target" src="{this.state.fileupload}" />
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
    </div>
  );
};
export default Phonebook;
