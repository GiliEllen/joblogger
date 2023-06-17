import axios from "axios";
import React, { ChangeEvent, useState } from "react";

function FileUpload() {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    try {
      if (!file) {
        return;
      }

      console.log(file)

      const fd = new FormData();
      fd.append('file', file, file.name);
    

      const { data } = await axios.post(
        "/upload",
        fd
      );

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} name="file"/>

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default FileUpload;
