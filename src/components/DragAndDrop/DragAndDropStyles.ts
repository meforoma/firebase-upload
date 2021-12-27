import { css } from '@emotion/react';

export const styles = {
  upload: {
    iconAndText: css`
      width: 252px;
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
    `
  },
  icon: {
    upload: css`
      height: 79px;
    `
  },
  text: {
    mid: css`
      font-weight: 400;
      font-size: 14px;
    `,
    select: css`
      text-decoration: underline;
      color: rgba(0, 0, 0, 0.7);
    `,
    light: css`
      color: rgba(163, 163, 163, 1)
    `,
  }
};
