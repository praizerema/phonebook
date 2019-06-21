import React, { Component } from "react";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log("handle uploading-", this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0]; //
    //This is the part that you will need to add to your code
    reader.onloadend = () => {
      this.setState({
        file: file, // you will have to remove this
        imagePreviewUrl: reader.result //this is what you will set in you img scr={imagePreviewUrl}
      });
    };

    reader.readAsDataURL(file); // the file here will be this.state.fileupload
    //what you need in your view to here
    console.log(file);
  }

  render() {
    return (
      <div className="previewComponent">
        <form onSubmit={e => this._handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={e => this._handleImageChange(e)}
          />
          <button
            className="submitButton"
            type="submit"
            onClick={e => this._handleSubmit(e)}
          >
            Upload Image
          </button>
        </form>
        <div className="imgPreview">
          <img src={this.state.imagePreviewUrl} />
        </div>
      </div>
    );
  }
}

export default ImageUpload;
