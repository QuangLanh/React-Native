import React ,{useState, useEffect} from 'react';
import {View, StyleSheet, TextInput,Button, Alert} from 'react-native';


export default function App() {
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [n3, setN3] = useState(0);
    const [tong, setTong] = useState(null);
   
    
    const calculate = () =>{
        setTong((Number(n2) *2) - 4*(Number(n1) * Number(n3)));
    };
    
    useEffect(
        () => {
            if (tong != null)
                Alert.alert(
                    'Ket qua =' +tong,
                );
        }, 
        [ tong ]
    );
    return(
        <View  style={styles.container}>
            <TextInput style={styles.text} placeholder="Nhập số a" onChangeText={(text) => setN1(text)}/>
            <TextInput style={styles.text} placeholder="Nhập số b" onChangeText={(text) => setN2(text)}/>
            <TextInput style={styles.text} placeholder="Nhập số c" onChangeText={(text) => setN3(text)}/>
            <Button title ="Tính" onPress={() => calculate()}/>
        </View>
    )
    
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        fontSize:30,
        height: 40,
        color: '#008B00',
    }
  });

