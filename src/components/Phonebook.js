import React, { Component } from "react";
import "./phonebook.css";
class Phonebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surname: "",
      othernames: "",
      phoneNo: "",
      email: "",
      address: "",
      fileupload: "",
      contactList: []
    };
  }
  surnameHandler(e) {
    var surname = e.target.value;
    this.setState({ surname: e.target.value });
    console.log(surname);
  }
  othernamesHandler(e) {
    var othernames = e.target.value;
    this.setState({ othernames: e.target.value });
    console.log(othernames);
  }
  emailHandler(e) {
    var email = e.target.value;
    this.setState({ email: e.target.value });
    console.log(email);
  }
  phoneNoHandler(e) {
    var phoneNo = e.target.value;
    this.setState({ phoneNo: e.target.value });
    console.log(phoneNo);
  }
  addressHandler(e) {
    var address = e.target.value;
    this.setState({ address: e.target.value });
    console.log(address);
  }
  fileuploadHandler(e) {
    var fileupload = e.target.value;
    this.setState({ fileupload: e.target.value });
    console.log(fileupload);
  }
  add(e) {
    e.preventDefault();
    if (this.state.surname.length < 3) {
      alert("invalid surname");
      return 0;
    } else if (this.state.othernames.length < 3) {
      alert("invalid othernames");
    } else if (this.state.phoneNo.length > 11) {
      alert("invalid phoneNo");
    } else if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
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
      console.log(JSON.stringify(this.state.contactList));
    }
  }

  render() {
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
                name="surname"
                id="surname"
                type="text"
                placeholder="Surname"
                onChange={this.surnameHandler.bind(this)}
                value={this.state.surname}
              />
              <input
                name="othernames"
                id="othernames"
                type="text"
                placeholder="Othernames"
                onChange={this.othernamesHandler.bind(this)}
                value={this.state.othernames}
              />
              <input
                name="phoneNo"
                id="phoneNo"
                type="tel"
                placeholder="Mobile No"
                onChange={this.phoneNoHandler.bind(this)}
                value={this.state.phoneNo}
              />
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                onChange={this.emailHandler.bind(this)}
                value={this.state.email}
              />
              <input
                className="address"
                name="address"
                id="address"
                type="address"
                placeholder="Address"
                onChange={this.addressHandler.bind(this)}
                value={this.state.address}
              />
              <label>Upload contact image</label> <br />
              <input
                name="fileupload"
                id="fileupload"
                type="file"
                placeholder="image"
                onChange={this.fileuploadHandler.bind(this)}
                value={this.state.fileupload}
              />
              <button className="add" type="submit" name="add">
                Add
              </button>
            </form>
          </div>
        </div>

        <div className="contactWrap">
          <h2>My Contact List</h2>
          <table>
            <tr>
              <th>Name</th> <th>Phone No</th> <th>Email</th> <th>Address</th>{" "}
              <th>Action</th>
            </tr>
            <tr>
              <td>Praise Erema</td> <td>08101132922</td>{" "}
              <td>praiseerema@gmail.com</td>{" "}
              <td>No 50 olisa street ikare akoko, ondo state</td>{" "}
              <td>
                <button className="green" id="">
                  View
                </button>
                <button className="blue">Edit</button>
                <button className="red">Del</button>
              </td>
            </tr>
            <tr>
              <td>Divine Glory</td> <td>09034576923</td>{" "}
              <td>divineglo@yahoo.com</td>{" "}
              <td>16, ifeloju street Arigidi-Akoko</td>{" "}
              <td>
                <button className="green">View</button>
                <button className="blue">Edit</button>
                <button className="red">Del</button>
              </td>
            </tr>
            <tr>
              <td>Segun Adisa</td> <td>08149235677</td>{" "}
              <td>adisaolu@yahoo.com</td>{" "}
              <td>17, academy street ugbe akoko ondo state</td>{" "}
              <td>
                <button className="green">View</button>
                <button className="blue">Edit</button>
                <button className="red">Del</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
export default Phonebook;
