import { css } from '@emotion/react';

export const styles = {
  text: {
    big: css`
      font-weight: 500;
      font-size: 24px;
      height: 28px;
    `,
    small: css`
      font-weight: 400;
      font-size: 12px;
      min-height: 14px;
    `,
    light: css`
      color: rgba(163, 163, 163, 1)
    `,
    error: css`
      color: tomato;
      font-weight: bolder;
    `,
    titleSuccess: css`
      display: flex;
      align-items: center;
      height: 28px;
      width: 124px;
    `
  },
  icon : {
    success: css `
      margin-right: 10px;
      height: 23px;
    `
  },
  upload: {
    area: css`
      position: relative;
      width: 280px;
      height: 362px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    
      background: #FAFAFA;
      border: 1px dashed rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    `,
    error: css`
      border: 2px dashed tomato;
    `
  },
  main: {
    container: css`
      width: 280px;
      height: 464px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
    `
  }
};