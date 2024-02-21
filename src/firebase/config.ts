// Import the functions you need from the SDKs you need
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = require("./instaclone.json");

initializeApp({
	credential: cert(serviceAccount),
	storageBucket: 'gs://instaclone-e5157.appspot.com'
});

export const storageBucket = getStorage().bucket();