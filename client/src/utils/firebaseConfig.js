import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "proposal-app-5d4b6.firebaseapp.com",
    projectId: "proposal-app-5d4b6",
    storageBucket: "proposal-app-5d4b6.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics(firebase.app());

const storage = firebase.storage();
const uploadTask = (path, file) => new Promise((resolve, reject) => {
    const task = storage.ref(path).put(file);
    const dir = path.split('/').filter(v => v)[0];

    task.on('state_changed', snapshot => snapshot, err => reject(err), 
        async () => {
            const url = await storage.ref(dir).child(file.name).getDownloadURL();
            resolve(url);
        }
    );
});

export default uploadTask;
