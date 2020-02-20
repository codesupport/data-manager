import * as firebase from "firebase-admin";

firebase.initializeApp();

const fs = firebase.firestore();
fs.settings({
	timestampsInSnapshots: true
});

export const firestore = fs;