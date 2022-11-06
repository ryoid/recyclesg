import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

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

export const useFirebase = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const auth = getAuth(firebaseApp);
  const messaging = getMessaging(firebaseApp);

  return {
    firebaseApp,
    storage,
    analytics,
    firestore,
    auth,
    messaging,
  };
};
