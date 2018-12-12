import React from "react";

export default function FileUploadReviewWidget(props) {
  const files = JSON.parse(props.value);

  return (
    <ul>
      {files.map(f => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  );
}
