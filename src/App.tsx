import classNames from 'classnames';

import { useState } from 'react';
import './App.scss';

import { ref, uploadBytesResumable } from 'firebase/storage';
import { fireStorage } from './firebase';

import { StartUI } from './components/StartUI';
import { UploadUI } from './components/UploadUI';
import iconSuccess from './icons/icon-success.svg';

export const App = (): JSX.Element => {
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

  const bottomWording = () => {
    switch (stage) {
      case 'uploading':
        return "Don't close this window while the image uploads";
      case 'uploaded':
        return 'Image uploaded successfully';
      default:
        return 'Upload your image file, up to 5mb in size';
    }
  };

  const bottomText = () => (
    <div className={classNames(
      'text--light',
      'text--small',
      { 'text--error': fileError }
    )}
    >
      {bottomWording()}
    </div>
  );

  const topWording = () => {
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

  const topText = () => (
    <div className="text--big">
      {topWording()}
    </div>
  );

  return (
    <div className="main-container">
      {topText()}

      {/* Upload area */}
      <div
        className={
          classNames(
            'upload-area',
            { 'upload-area--error': fileError }
          )
        }
      >
        {stage === 'start'
          ? (
            <StartUI
              setFileLocalUrl={setFileLocalUrl}
              setFileError={setFileError}
              setStage={setStage}
              uploadFile={uploadFile}
            />) : (
            <UploadUI
              stage={stage}
              fileLocalUrl={fileLocalUrl}
              uploadProgress={uploadProgress}
            />
          )}
      </div>

      {bottomText()}
    </div>
  );
};
