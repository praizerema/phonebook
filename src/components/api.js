import React, { Component } from "react";

class API extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      token: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMDAwMDMiLCJpYXQiOjE1Njc0MjAwMzMsInN1YiI6InRlc3RlckBtYWlsaW5hdG9yLmNvbSIsImlzcyI6ImNnLXVzZXIiLCJleHAiOjE1Njc0NDE2MzN9.3rGycvhkbWEepEAIXsonBZBB-OyKvAQ_G1u6M073sQA"
        // "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMDAwMDMiLCJpYXQiOjE1NjczNTQzMDEsInN1YiI6InRlc3RlckBtYWlsaW5hdG9yLmNvbSIsImlzcyI6ImNnLXVzZXIiLCJleHAiOjE1NjczNzU5MDF9.bhL646t4B-nNM4LIh8-stWcyoLbZvkufXt2s35oXAwk"
    };
  }

  getEndPoint = url => {
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ response: data });
      });
  };
  postEndPoint = (url, postData) => {
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ response: data });
      });
  };
  putEndPoint = (url, putData) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${this.state.token}`
      },
        body: JSON.stringify(putData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ response: data });
      });
  };

  componentDidMount() {
    var d = {
      email: "tester@mailinator.com",
    //   password: "testtest"
    };
    var url = `https://staging.seerbitapigateway.com/merchants/api/v1/auth/user/recoverpassword/{email}`;
    //this.getEndPoint(url);
    // this.putEndPoint(url);

    this.postEndPoint(url, d);
  }

  render() {
    return <div>{JSON.stringify(this.state.response)}</div>;
  }
}
export default API;
