/* eslint-disable no-console */
import classNames from 'classnames';

import { ChangeEvent, useState } from 'react';
import './App.scss';

import { ref, uploadBytesResumable } from 'firebase/storage';
import { fireStorage } from './firebase';

import { StartUI } from './components/StartUI';
import iconSuccess from './icons/icon-success.svg';

function App() {
  const [fileError, setFileError] = useState<boolean>(false);
  const [fileLocalUrl, setFileLocalUrl] = useState<string | undefined>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [stage, setStage] = useState<'start' | 'uploading' | 'uploaded'>('start');

  const uploadFile = (userFile: File) => {
    if (!userFile) return;

    const storageRef = ref(fireStorage, `/images/${userFile.name}`);
    const uploadAction = uploadBytesResumable(storageRef, userFile);

    uploadAction.on(
      'state_changed',

      // progress logic
      (snapshot) => {
        const { bytesTransferred, totalBytes } = snapshot;
        const progressCalc = Math.round(
          (bytesTransferred / totalBytes) * 100
        );

        setUploadProgress(progressCalc);
      },

      // error logic
      (error) => console.log(error),

      // success logic
      () => setStage('uploaded')
    );
  };

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

  const uploadUI = () => (
    <div className="upload-container">
      <img
        className={classNames(
          'upload-area__img',
          { 'upload-area__img--dimmed': stage === 'uploading' },
        )}
        src={fileLocalUrl}
        alt="file-local-url"
      />

      {stage === 'uploading' && (
        <progress
          className="progress-center"
          max="100"
          value={uploadProgress}
        >
          {uploadProgress}
        </progress>
      )}
    </div>
  );

  const bottomText = () => {
    if (stage === 'uploading') {
      return "Don't close this window while the image uploads";
    }
    if (stage === 'uploaded') {
      return 'Image uploaded successfully';
    }
    return 'Upload your image file, up to 5mb in size';
  };

  const topText = () => {
    if (stage === 'uploaded') {
      return (
        <div className="title--success">
          <img
            src={iconSuccess}
            alt="icon-success"
            className="icon-success"
          />
          Success
        </div>
      );
    }

    return 'Upload Image';
  };

  return (
    <div className="main-container">
      <div className="text--big">
        {topText()}
      </div>

      {/* Upload area */}
      <label
        htmlFor="fileInput"
        className={
          classNames(
            'upload-area',
            { 'upload-area--error': fileError }
          )
        }
      >
        {stage === 'start'
          ? <StartUI onFileChange={onFileChange} />
          : uploadUI()}
      </label>

      {/* Text bottom */}
      <div className={classNames(
        'text--light',
        'text--small',
        { 'text--error': fileError }
      )}
      >
        {bottomText()}
      </div>
    </div>
  );
}

export default App;
