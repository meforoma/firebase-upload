import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Stage } from '../App';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { fireStorage } from '../firebase';

type Props = {
  setFileLocalUrl: Dispatch<SetStateAction<string | undefined>>;
  setFileError: Dispatch<SetStateAction<boolean>>;
  setStage: Dispatch<SetStateAction<Stage>>;
  setUploadProgress: Dispatch<SetStateAction<number>>;
};

export const Input = ({
  setFileLocalUrl,
  setFileError,
  setStage,
  setUploadProgress,
}: Props): JSX.Element => {
  const uploadFile = (userFile: File) => {
    if (!userFile) return;

    const storageRef = ref(fireStorage, `/images/${userFile.name}`);
    const uploadAction = uploadBytesResumable(storageRef, userFile);

    uploadAction.on(
      'state_changed',

      // progress logic
      (snapshot) => {
        const { bytesTransferred, totalBytes } = snapshot;
        const progressCalc = Math.round((bytesTransferred / totalBytes) * 100);

        setUploadProgress(progressCalc);
      },

      // error logic
      (error) => console.log(error),

      // success logic
      () => setStage(Stage.uploaded)
    );
  };

  const handlePreview = (userFile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(userFile);

    reader.onload = () => {
      setFileLocalUrl(reader.result?.toString());
    };
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    const maxSize = 5_000_000;

    if (files?.length) {
      const isImage = files[0].type.includes('image');
      const sizeFits = files[0].size <= maxSize;

      if (isImage && sizeFits) {
        setFileError(false);
        setStage(Stage.uploading);
        handlePreview(files[0]);
        uploadFile(files[0]);
      }

      if (!isImage || !sizeFits) {
        setFileError(true);
      }
    }
  };

  return (
    <input
      id="fileInput"
      type="file"
      accept="image/*"
      onChange={onFileChange}
    />
  );
};
