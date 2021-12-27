/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { styles } from './AppStyles'
import './App.scss';

import { Fragment, useState } from 'react';
import { DragAndDrop, Uploading, Input } from './components';
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
    <div css={[
      styles.text.light,
      styles.text.small,
      fileError && styles.text.error]}
    >
      {((stage === Stage.start || fileError) && 'Upload your image file, up to 5mb in size') ||
        (stage === Stage.uploading &&
          "Don't close this window while the image uploads") ||
        (stage === Stage.uploaded && (
          <Fragment>
            Image uploaded successfully.
            <br />
            Upload another one if needed
          </Fragment>
        ))}
    </div>
  );

  const topText = () => (
    <div css={styles.text.big}>
      {stage === Stage.uploaded ? (
        <div css={styles.text.titleSuccess}>
          <img
            src={iconSuccess}
            alt="icon-success"
            css={styles.icon.success}
          />
          Success
        </div>
      ) : (
        'Upload Image'
      )}
    </div>
  );

  return (
    <div css={styles.main.container}>
      {topText()}

      {/* Upload area */}
      <div css={[styles.upload.area,
      fileError && styles.upload.error]}
      >
        {stage === Stage.start ? (
          <DragAndDrop />
        ) : (
          <Uploading
            stage={stage}
            fileLocalUrl={fileLocalUrl}
            uploadProgress={uploadProgress}
          />
        )}

        {stage !== Stage.uploading && (
          <Input
            setFileLocalUrl={setFileLocalUrl}
            setFileError={setFileError}
            setStage={setStage}
            setUploadProgress={setUploadProgress}
          />
        )}
      </div>

      {bottomText()}
    </div>
  );
};
