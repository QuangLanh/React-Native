import{ ToastAndroid } from 'react-native';
import firebaseConfig from '../firebase/firebase.js';

module.exports.delete = (key) =>{
    firebaseConfig
        .database()
        .ref()
        .child('products')
        .child(key)
        .remove()
        .then(()=>{
            console.log('Delete success!');
            ToastAndroid.show('Delete success!', ToastAndroid.SHORT);
        })
        .catch((error)=> {
            console.log('Delete fail! '+ error);
            ToastAndroid.show('Delete fail ', ToastAndroid.SHORT);
        }); 
};

module.exports.insert = async (name, price, info, image) => {
    const remoteUri = await _uploadImage(name, image);
    firebaseConfig
        .database()
        .ref()
        .child('products')
        .push({
            name: name,
            price: price,
            info: info,
            image: remoteUri
        })
        .then(()=> {
            console.log('Insert complete!');
            ToastAndroid.show('Insert Complete!', ToastAndroid.SHORT);  
        })
        .catch((error) => {
            console.log('Insert fail!');
            ToastAndroid.show('Insert fail!',ToastAndroid.SHORT);
        });
};

module.exports.update = async (key,name, price, info, image) => {
    const remoteUri = await _uploadImage(name, image);
    firebaseConfig
        .database()
        .ref()
        .child('products')
        .child(key)
        .set({
            name: name,
            price: price,
            info: info,
            image: remoteUri
        })
        .then(() => {
            console.log('Update success!');
            ToastAndroid.show('Update success!', ToastAndroid.SHORT);
        })
        .catch((error)=> {
            console.log('Update fail!');
            ToastAndroid.show('Update fail!',ToastAndroid.SHORT);
        });
};

const _uploadImage = async (name, uri) => {
    const path = 'image/' + name + '.jpg';
    return new Promise(async (res, rej)=> {
        const response = await fetch(uri);
        const file = await response.blob();

        let upload = firebaseConfig.storage().ref(path).put(file);

        upload.on(
            'stata_changed',
            (snapshot) => {},
            (err) => {
                rej(err);
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
        );
    });
};

