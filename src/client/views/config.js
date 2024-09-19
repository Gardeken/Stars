import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAJ3P9GQZXEX1dCLaOaRXrWEn4yVTeiCW4",
  authDomain: "stars-3624d.firebaseapp.com",
  projectId: "stars-3624d",
  storageBucket: "stars-3624d.appspot.com",
  messagingSenderId: "770314026425",
  appId: "1:770314026425:web:3f5d93888dec31bf528a68",
  measurementId: "G-KC28BEYSTW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const imageDb = getStorage(app);
