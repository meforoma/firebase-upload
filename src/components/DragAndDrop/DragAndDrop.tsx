/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Fragment } from 'react';
import { styles } from './DragAndDropStyles';
import iconUpload from '../../icons/icon-upload.svg';

export const DragAndDrop = (): JSX.Element => (
  <Fragment>
    <div css={styles.upload.iconAndText}>
      <div>
        <img
          src={iconUpload}
          alt="icon-upload"
          css={styles.icon.upload}
        />
      </div>

      <header>
        <div css={[styles.text.mid, styles.text.light]}>
          Drag & Drop image file to upload or
          <br />
          <span css={styles.text.select}>select</span>
          &nbsp;it manually
        </div>
      </header>
    </div>
  </Fragment>
);
