import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import iconUpload from '../icons/icon-upload.svg';

type Props = {
  setFileLocalUrl: Dispatch<SetStateAction<string | undefined>>,
  setFileError: Dispatch<SetStateAction<boolean>>,
  setStage: Dispatch<SetStateAction<'start' | 'uploading' | 'uploaded'>>,
  uploadFile: (userFile: File) => void,
};

export const StartUI = ({
  setFileLocalUrl, setFileError,
  setStage, uploadFile
}: Props): JSX.Element => {
  const handlePreview = (userFile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(userFile);

    reader.onload = () => {
      setFileLocalUrl(reader.result?.toString());
    };
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    const maxSize = 5 * 1e+6;

    if (files?.length) {
      const isImage = files[0].type.includes('image');
      const sizeFits = files[0].size <= maxSize;

      if (isImage && sizeFits) {
        setFileError(false);
        setStage('uploading');
        handlePreview(files[0]);
        uploadFile(files[0]);
      }

      if (!isImage || !sizeFits) {
        setFileError(true);
      }
    }
  };

  return (
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
};
