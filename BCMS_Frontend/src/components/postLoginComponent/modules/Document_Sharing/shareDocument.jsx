import { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/post_login_styles/modules/fileShare.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const username = localStorage.getItem("username");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const res = await axios.get("http://localhost:5000/api/files-mgmt/files");
    setFiles(res.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !username)
      return alert("Please enter username & select a file");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/files-mgmt/upload", formData);
      alert("File uploaded successfully");
      fetchFiles();
    } catch (error) {
      alert("Upload failed");
    }
  };

  return (
    <div className="file-upload-container">
      <h2>📂 File Upload & Download</h2>

      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>

      <h3>📄 Uploaded Files</h3>
      <table className="files-table">
        <thead>
          <tr>
            <th>Uploaded By</th>
            <th>File Name</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file.username}</td>
              <td>
                <a
                  href={`http://localhost:5000/api/files-mgmt/${file.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.filename}
                </a>
              </td>
              <td>
                <a
                  href={`http://localhost:5000/api/files-mgmt/download/${file.username}/${file.filename}`}
                  download
                >
                  ⬇ Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileUpload;
