import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAX-hwQ53DAw-sZc1agNm83bNEt2PACrG4",
  authDomain: "whatsapp-2-a4d26.firebaseapp.com",
  projectId: "whatsapp-2-a4d26",
  storageBucket: "whatsapp-2-a4d26.appspot.com",
  messagingSenderId: "909804799098",
  appId: "1:909804799098:web:150de29096ec1d0461e7c3"
};

const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app()
;

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};