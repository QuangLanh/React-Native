import { FlatList, Text, Image, View, Dimensions, StyleSheet  } from 'react-native';
import React  from 'react';
import Swipeout from 'react-native-swipeout';

const data = [
    {
        name: 'Liem',
        image: require('../Images/aaa.jpg'),
        info: 'new',
        price: '12$'
    },
    {
        name: 'Dai',
        image: require('../Images/bbb.jpg'),
        info: 'new',
        price: '12$'
    },
    {
        name: 'Cong Khanh',
        image: require('../Images/ccc.jpg'),
        info: 'new',
        age: '18'
    },
];

const Product = () =>{
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Product list </Text>
        <FlatList data={data} renderItem={({item}) => <ListItem item = {item}/>} />
        </View>
    );
};
export default Product;

const ListItem = (props) => {
    const swipeoutSetting = {
        autoClose: true, 
        onClose: () =>{
            console.log('Close swipeout');
        },
        onOpen: () =>{
            console.log('Close swipeout');
        },
        right: [
            {
                text:'Update',
                type: 'secondery',
                onPress: () => {
                    console.log('Delete');
                }
            },
            {
                text:'Delete',
                type: 'delete',
                onPress: () => {
                    console.log('Delete');  
                }
            }
        ]
    };

    return(
        <Swipeout{...swipeoutSetting}>
            <View style = {styles.listContainer}>
                <Image
                    source={props.item.image}
                    style={{borderWidth: 1, borderColor: 'black', width: 70, height: 80}}
                />
                <View>
                    <Text style = {{marginLeft:  10, fontSize: 20,}}>Name: {props.item.name}</Text>
                    <Text style = {{marginLeft:  10, }}>Price: {props.item.price}</Text>
                    <Text style = {{marginLeft:  10,}}>Info: {props.item.info}</Text>
                    <Text style = {{marginLeft:  10,}}>Age: {props.item.ag}</Text>
                </View>
            </View>
        </Swipeout>
    );
}



const{ width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
         fontSize: 24,
         marginTop: 30
    },
    listContainer: {
        backgroundColor:'#ffffff',
        flexDirection: 'row',
        margin: width *3.6 / 187.5 ,
        padding: width *3.6 / 187.5 ,
        borderRadius: width * 3.6 / 187.5
    } 
});
