import { css } from '@emotion/react';

export const styles = {
  upload: {
    container: css`
      position: relative;
      height: 100%;
      width: 100%;
    `,
  },
  preview: {
    image: css`
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 10px;
    `,
    dimmed: css`
      filter: brightness(50%);
    `
  },
  progressBar: {
    centered: css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  }
};
