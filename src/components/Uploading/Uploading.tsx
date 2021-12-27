/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Stage } from '../../App';
import { styles } from './UploadingStyles';

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
  <div css={styles.upload.container}>
    {uploadProgress > 0 && (
      <img
        css={[
          styles.preview.image,
          stage === Stage.uploading
          && styles.preview.dimmed]}
        src={fileLocalUrl}
        alt="file-local-url"
      />
    )}

    {stage === Stage.uploading && (
      <progress
        css={styles.progressBar.centered}
        max="100"
        value={uploadProgress}
      >
        {uploadProgress}
      </progress>
    )}
  </div>
);
