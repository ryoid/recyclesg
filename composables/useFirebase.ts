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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
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

export function readFile(file: File) {
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

export const createUser = async (email, password) => {
  const auth = getAuth();
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = useFirebaseUser();
    firebaseUser.value = {
      loading: true,
    };
    const userCookie = useCookie("userCookie");
    const res = await $fetch("/api/auth", {
      method: "POST",
      body: { user: credentials.user },
    });

    const _user = {
      ...credentials.user,
      ...res,
    };

    firebaseUser.value = {
      user: _user,
    };

    // @ts-ignore
    userCookie.value = _user; //ignore error because nuxt will serialize to json
    return credentials;
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode, errorMessage);
    if (errorCode === "auth/email-already-in-use") {
      throw new Error("Email already in use.");
    }
    throw err;
  }
};

export const signInUser = async (email, password) => {
  console.log("signInUser", email, password);

  const auth = getAuth();
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    const firebaseUser = useFirebaseUser();
    firebaseUser.value = {
      loading: true,
    };
    const userCookie = useCookie("userCookie");
    const res = await $fetch("/api/auth", {
      method: "POST",
      body: { user: credentials.user },
    });

    const _user = {
      ...credentials.user,
      ...res,
    };

    firebaseUser.value = {
      user: _user,
    };

    // @ts-ignore
    userCookie.value = _user; //ignore error because nuxt will serialize to json
    return credentials;
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode, errorMessage);
    if (errorCode === "auth/wrong-password") {
      throw new Error("Wrong password.");
    } else if (errorCode === "auth/user-not-found") {
      throw new Error("Email address not registered.");
    }
    throw err;
  }
};

export const initUser = async () => {
  const auth = getAuth();
  const firebaseUser = useFirebaseUser();
  firebaseUser.value = {
    loading: true,
  };
  const userCookie = useCookie("userCookie");

  const route = useRoute();
  const router = useRouter();

  onAuthStateChanged(auth, async (user) => {
    console.log("auth change", user);
    const _route = route.name.toString();

    if (!user) {
      if (_route.startsWith("admin")) {
        return router.push("/login");
      }
      if (_route.startsWith("profile")) {
        return router.push("/login");
      }
    }

    if (user) {
      if (_route === "login" || _route === "signup") {
        return router.push("/");
      }
    }

    // @ts-ignore
    userCookie.value = user; //ignore error because nuxt will serialize to json

    const res = await $fetch("/api/auth", {
      method: "POST",
      body: { user },
    });

    const _user = {
      ...user,
      ...res,
    };

    firebaseUser.value = {
      user: _user,
    };

    // @ts-ignore
    userCookie.value = _user; //ignore error because nuxt will serialize to json
  });
};

export const signOutUser = async () => {
  const auth = getAuth();
  const result = await auth.signOut();
  const firebaseUser = useFirebaseUser();
  const userCookie = useCookie("userCookie");
  firebaseUser.value.user = null;
  userCookie.value = null;
  return result;
};

export const useFirebase = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  // const auth = getAuth(firebaseApp);
  // const messaging = getMessaging(firebaseApp);

  return {
    firebaseApp,
    storage,
    firestore,
    // auth,
    // messaging,
  };
};
