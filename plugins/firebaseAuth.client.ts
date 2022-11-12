import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCyMYIRrV2z5wFQRn7to8YG9Kly3hIffI",
  authDomain: "recyclesg-prod.firebaseapp.com",
  projectId: "recyclesg-prod",
  storageBucket: "recyclesg-prod.appspot.com",
  messagingSenderId: "488239877772",
  appId: "1:488239877772:web:1517d52512640e9a07f5a9",
  measurementId: "G-3BSK8078R3",
};

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  initUser();

  const auth = getAuth();

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);
});
