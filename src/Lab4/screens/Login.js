import React ,{useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput, ToastAndroid} from 'react-native';
import firebaseConfig from '../firebase/firebase';


const Login = ({navigation}) =>{
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState(''); 

//them funtion:
    const checkLogin = (email,password) =>{
        if (_login(email).then && _login(password).then){
            navigation.navigate('Product');
            ToastAndroid.show('Login success! ',ToastAndroid.SHORT);
        }
        else{
             ToastAndroid.show('Wrong email or password !',ToastAndroid.SHORT);
        }
    };
    return (
        <View style = {styles.container}>
            <View style = {styles.dev}>
                <Text style = {styles.text} > Login Screens</Text>
                <TextInput style = {styles.input} value = {email} placeholder = "Email" onChangeText={(text) => setEmail(text)}/>
                <TextInput 
                    style = {styles.input} 
                    value = {password} 
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry = {true}
                    />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => checkLogin(email, password)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.navButtonText}>New user? Join here</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Login;

const _login = async (email, password) => {
    await firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user)=>{
            console.log('Login success !');
            return true;
        })
        .catch((error) => {
            const {code, masage} = error;
            console.log('Error' + masage);
            return false;
        });
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#4dffb8'
    },
    text:{
        fontSize: 24,
        marginBottom: 10,
    },
    navButton:{
        marginTop: 15 
    },
    navButtonText:{
        fontSize: 24,
        color: '#6646ee'
    },
    input:{
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1
    },
    buttonContainer:{
        marginTop: 10,
        width: width / 2,
        height: height / 15,
        backgroundColor: '#6495ed',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9
    },
    buttonText:{
        fontSize: 28,
        color: '#ffffff'
    },
    dev: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 30,

    }
});