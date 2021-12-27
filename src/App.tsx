import classNames from 'classnames';

import { useState } from 'react';
import './App.scss';

import { DragAndDrop, Uploading } from './components';
import iconSuccess from './icons/icon-success.svg';

export enum Stage {
  start = 'start',
  uploading = 'uploading',
  uploaded = 'uploaded',
}

export const App = (): JSX.Element => {
  const [fileError, setFileError] = useState<boolean>(false);
  const [fileLocalUrl, setFileLocalUrl] = useState<string | undefined>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [stage, setStage] = useState<Stage>(Stage.start);

  const bottomText = () => (
    <div
      className={classNames('text--light', 'text--small', {
        'text--error': fileError,
      })}
    >
      {(stage === Stage.uploading &&
        "Don't close this window while the image uploads") ||
        (stage === Stage.uploaded && 'Image uploaded successfully') ||
        (stage === Stage.start && 'Upload your image file, up to 5mb in size')}
    </div>
  );

  const topText = () => (
    <div className="text--big">
      {stage === Stage.uploaded ? (
        <div className="title--success">
          <img src={iconSuccess} alt="icon-success" className="icon-success" />
          Success
        </div>
      ) : (
        'Upload Image'
      )}
    </div>
  );

  return (
    <div className="main-container">
      {topText()}

      {/* Upload area */}
      <div
        className={classNames('upload-area', {
          'upload-area--error': fileError,
        })}
      >
        {stage === Stage.start ? (
          <DragAndDrop
            setFileLocalUrl={setFileLocalUrl}
            setFileError={setFileError}
            setStage={setStage}
            setUploadProgress={setUploadProgress}
          />
        ) : (
          <Uploading
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
