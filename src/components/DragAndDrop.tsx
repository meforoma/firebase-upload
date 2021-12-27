import iconUpload from '../icons/icon-upload.svg';

export const DragAndDrop = (): JSX.Element => (
  <>
    <div className="upload-area__icon-and-text">
      <div className="icon">
        <img src={iconUpload} alt="icon-upload" className="icon-upload" />
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
  </>
);
