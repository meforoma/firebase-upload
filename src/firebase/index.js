import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAEqIsGRSX-FjvwlVzp2zEG4z2JulxPXZo',
  authDomain: 'fir-upload-a0015.firebaseapp.com',
  projectId: 'fir-upload-a0015',
  storageBucket: 'fir-upload-a0015.appspot.com',
  messagingSenderId: '840464477647',
  appId: '1:840464477647:web:6a5710120a6b67154036ba'
};

export const app = initializeApp(firebaseConfig);

export const fireStorage = getStorage(app);
