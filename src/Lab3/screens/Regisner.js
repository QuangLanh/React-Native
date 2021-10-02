import React ,{useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput, Alert, ToastAndroid} from 'react-native';
import firebaseConfig from '../firebase/firebase';

  


const Register = ({navigation}) =>{
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState(''); 
    return (
        <View style = {styles.container}>
            <Text style = {styles.text} > Regisner Screens</Text>
            <Text>Already have an account?</Text>
            <TextInput style = {styles.input} value = {email} placeholder = "Email" onChangeText={(text) => setEmail(text)}/>
            <TextInput 
                style = {styles.input} 
                value = {password} 
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry = {true}
                />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => _register(email, password)}>
                <Text style={styles.buttonText}>Regisner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>Go to login</Text>
            </TouchableOpacity>
        </View>
    );
};
export default Register;

const _register = async (email,password) => {
    await firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then((user) => {
            console.log('Register success !');
            ToastAndroid.show('Register success!',ToastAndroid.SHORT);
        })
        .catch((error) => {
            const {code,message} = error;
            console.log('Error:'+ message);
            ToastAndroid.show('Register fail !', ToastAndroid.SHORT);
        });
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 24,
        marginBottom: 10
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
    }
});