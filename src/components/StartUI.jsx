/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import iconUpload from '../icons/icon-upload.svg';

export const StartUI = ({ onFileChange }) => (
  <>
    <div
      className="upload-area__icon-and-text"
    >
      <div className="icon">
        <img
          src={iconUpload}
          alt="icon-upload"
          className="icon-upload"
        />
      </div>

      <header>
        <div className="text--mid">
          Drag & Drop image file to upload or
          <br />
          <span className="text-select">select</span>
          &nbsp;it manually
        </div>
      </header>
    </div>
    <input
      id="fileInput"
      type="file"
      onChange={onFileChange}
    />
  </>
);
