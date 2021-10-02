import React ,{useState, useEffect} from 'react';
import {View, StyleSheet, TextInput,Button, Alert} from 'react-native';


export default function App() {
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [tong, setTong] = useState(null);
    const [hieu, setHieu] = useState(null);
    const [tich, setTich] = useState(null);
    const [thuong, setThuong] = useState(null);
    
    const calculate = () =>{
        setTong(Number(n1) + Number(n2));
        setHieu(Number(n1) - Number(n2));
        setTich(Number(n1) * Number(n2));
        setThuong(Number(n1) / Number(n2));
    };
    
    useEffect(
        () => {
            if (tong != null)
                Alert.alert(
                    'Ket qua',
                    'Tong = '+ tong + '\n Hieu = '+hieu+ '\n Tich = '+tich+ '\n Thuong = '+thuong
                );
        }, 
        [ tong,hieu,tich,thuong ]
    );
    return(
        <View  style={styles.container}>
            <TextInput style={{ height: 40 }} placeholder="Nhập số thứ 1" onChangeText={(text) => setN1(text)}/>
            <TextInput style={{ height: 40 }} placeholder="Nhập số thứ 2" onChangeText={(text) => setN2(text)}/>
            <Button title ="Calculate" onPress={() => calculate()}/>
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
  });

