import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXxMgpfd3N-Tl1obh-CSAmkLXdI1rcr50",
  authDomain: "stars-dc378.firebaseapp.com",
  projectId: "stars-dc378",
  storageBucket: "stars-dc378.appspot.com",
  messagingSenderId: "801720008643",
  appId: "1:801720008643:web:76407c925fa17067710776",
};

const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app);
