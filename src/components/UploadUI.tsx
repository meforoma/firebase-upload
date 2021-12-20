import classNames from 'classnames';

type Props = {
  stage: 'start' | 'uploading' | 'uploaded',
  fileLocalUrl: string | undefined,
  uploadProgress: number,
};

export const UploadUI = ({ stage, fileLocalUrl, uploadProgress }: Props): JSX.Element => (
  <div className="upload-container">
    {uploadProgress > 0 && (
      <img
        className={classNames(
          'upload-area__img',
          { 'upload-area__img--dimmed': stage === 'uploading' },
        )}
        src={fileLocalUrl}
        alt="file-local-url"
      />
    )}

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
