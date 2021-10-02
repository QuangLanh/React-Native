import * as firebase from 'firebase' ; //npm --save firebase

var config = {
        apiKey: "AIzaSyAZF1dDwutpe2gO1n-RwJimuKmS8W0_Bf0",
        authDomain: "folkloric-pier-279103.firebaseapp.com",
        projectId: "folkloric-pier-279103",
        storageBucket: "folkloric-pier-279103.appspot.com",
        messagingSenderId: "854077646902",
        appId: "1:854077646902:web:c6dc1104cd059487225097",
        measurementId: "G-4HK5VEP0JM"

};
export default (firebaseConfig = firebase.initializeApp(config));