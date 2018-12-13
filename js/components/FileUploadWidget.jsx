import React from "react";
import { FilePond, File, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default class FileUploadWidget extends React.Component {
  constructor() {
    super();
    this.state = { files: [] };

    this.filesUpdated = this.filesUpdated.bind(this);
  }

  filesUpdated({ fileItems }) {
    const value = fileItems.length
      ? JSON.stringify(
          fileItems.map(f => `${f.filename} - ${f.fileSize} bytes`)
        )
      : false;
    this.props.onChange(value);

    // Set current file objects to this.state
    this.setState({
      files: fileItems.map(fileItem => fileItem.file)
    });
  }

  render() {
    return (
      <FilePond
        allowMultiple={true}
        onupdatefiles={fileItems => this.filesUpdated({ fileItems })}
      >
        {/* Update current files  */}
        {this.state.files.map(file => (
          <File key={file} src={file} origin="local" />
        ))}
      </FilePond>
    );
  }
}
