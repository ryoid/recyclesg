import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  FirebaseStorage,
  getDownloadURL,
  getMetadata,
  getStorage,
  ref as storageRef,
  uploadString,
} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

import { v4 as uuidv4 } from "uuid";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCyMYIRrV2z5wFQRn7to8YG9Kly3hIffI",
  authDomain: "recyclesg-prod.firebaseapp.com",
  projectId: "recyclesg-prod",
  storageBucket: "recyclesg-prod.appspot.com",
  messagingSenderId: "488239877772",
  appId: "1:488239877772:web:1517d52512640e9a07f5a9",
  measurementId: "G-3BSK8078R3",
};

function readFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (ev) => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.onabort = () => {
      reject();
    };
  });
}

export async function uploadFile(
  storage: FirebaseStorage,
  path: string,
  file: File
) {
  // firebase upload base64 file
  const base64 = await readFile(file);
  const extension = file.name.split(".").pop();
  const _ref = storageRef(
    storage,
    "/" + path + "/" + uuidv4() + "." + extension
  );
  const snapshot = await uploadString(_ref, base64 as string, "data_url");

  if (!snapshot) {
    throw new Error("Failed to upload");
  }

  const [downloadUrl, metadata] = await Promise.all([
    getDownloadURL(snapshot.ref),
    getMetadata(snapshot.ref),
  ]);
  return { snapshot, downloadUrl, metadata };
}

export const useFirebase = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  // const auth = getAuth(firebaseApp);
  // const messaging = getMessaging(firebaseApp);

  return {
    firebaseApp,
    storage,
    // analytics,
    firestore,
    // auth,
    // messaging,
  };
};
