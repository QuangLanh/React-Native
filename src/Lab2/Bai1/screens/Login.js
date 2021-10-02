import React ,{useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput, Alert} from 'react-native';


const Login = () =>{
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState(''); 
    return (
        <View style = {styles.container}>
            <Text style = {styles.text} > Login Screens</Text>
            <TextInput style = {styles.input} value = {email} placeholder = "Email" onChangeText={(text) => setEmail(text)}/>
            <TextInput 
                style = {styles.input} 
                value = {password} 
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry = {true}
                />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => Alert.alert('ban vua nhan Login')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => Alert.alert('ban vua nhan Login')}>
                <Text style={styles.navButtonText}>New user? Join here</Text>
            </TouchableOpacity>
        </View>
    );
};
export default Login;


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