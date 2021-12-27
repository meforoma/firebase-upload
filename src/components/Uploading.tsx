import classNames from 'classnames';
import { Stage } from '../App';

type Props = {
  stage: Stage;
  fileLocalUrl: string | undefined;
  uploadProgress: number;
};

export const Uploading = ({
  stage,
  fileLocalUrl,
  uploadProgress,
}: Props): JSX.Element => (
  <div className="upload-container">
    {uploadProgress > 0 && (
      <img
        className={classNames('upload-area__img', {
          'upload-area__img--dimmed': stage === Stage.uploading,
        })}
        src={fileLocalUrl}
        alt="file-local-url"
      />
    )}

    {stage === Stage.uploading && (
      <progress className="progress-center" max="100" value={uploadProgress}>
        {uploadProgress}
      </progress>
    )}
  </div>
);
