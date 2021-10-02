import { FlatList, Text, Image, View, Dimensions, StyleSheet, Alert, Modal, 
        TouchableWithoutFeedback, TextInput, TouchableOpacity} from 'react-native';
import React,{useState,useEffect}  from 'react';
import Swipeout from 'react-native-swipeout';
import firebaseConfig from '../firebase/firebase.js';   
import ProductDAO from '../DAO/ProductDAO';
import * as ImagePicker from 'expo-image-picker';

const Product = () =>{
    const [data, setData] = useState([]);

    const [ modalVisible, setModalVisible ] = useState(false);
	const [ currentItem, setCurrentItem ] = useState(null);
	_hideDialog = () => {
		setModalVisible(false);
	};
	_showDialog = () => {
		setModalVisible(true);
	};
	_setCurrent = async (item) => {
		await setCurrentItem(item);
	};

    const getAllProduct = () =>{
        firebaseConfig.database().ref().child('products').on('value',(snap)=>{
            var items = [];
            snap.forEach((child)=> {
                let item = {
                    key: child.key,
                    name: child.val().name,
                    price: child.val().price,
                    info: child.val().info,
                    image: child.val().image            
                };
                items.push(item);
            });
            setData(items);
        });
    };
    useEffect(()=> {
        getAllProduct();
    },[]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>              Quản Lý Sản Phẩm </Text>
            <FlatList 
                data={data} 
                renderItem={({ item }) => <ListItem item = { item } _showDialog={_showDialog} _setCurrent={_setCurrent} />} />

            <TouchableOpacity
				style={styles.fab}
				onPress={() => {
					_setCurrent(null);
					_showDialog();
				}}
			>
				<Text style={styles.text}>+</Text>
			</TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                {currentItem ? (
                    <ProductUpdate item={currentItem} _hideDialog={_hideDialog} />
                ) : (
                    <ProductInsert _hideDialog={_hideDialog} />
                )}
            </Modal>
        </View>
    );
};
export default Product;

const ProductInsert = (props) => {
    const [name, setName] =  useState('');
    const [price, setPrice] =  useState('');
    const [info, setInfo] =  useState('');
    const [image, setImage] =  useState('https://reactjs.org/logo-og.png');

    const _chooseImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled){
            console.log(image);
            setImage(result.uri);
        }

    };
    
    return(
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Insert Product</Text>
                <TouchableWithoutFeedback onPress={() => _chooseImage()}>
                    <Image
                        source={{uri: image, width: 150, height: 150}}
                        style={{ borderWidth: 1, borderColor: 'back'}}
                        />
                </TouchableWithoutFeedback>
                <View style={styles.lineDialog}>
                    <Text style={styles.textDialog}>Name: </Text>
                    <TextInput style={styles.textInputDialog} value={name} onChangeText={(text) => setName(text)}/>
                </View>

                <View style={styles.lineDialog}>
                    <Text style={styles.textDialog}>Price: </Text>
                    <TextInput style={styles.textInputDialog} value={price} onChangeText={(text) => setPrice(text)}/>
                </View>

                <View style={styles.lineDialog}>
                    <Text style={styles.textDialog}>Info: </Text>
                    <TextInput style={styles.textInputDialog} value={info} onChangeText={(text) => setInfo(text)}/>
                </View>

                <View style={{
						flex: 1,
						flexDirection: 'row',
						margin: 1,
						width: width * 80 / 187.5,
                        alignItems: 'center',
                        justifyContent: 'center',
						padding: width * 8 / 187.5
					}}>
                    <TouchableOpacity
                        style={{...styles.openButton, backgroundColor: '#ff3300'}}
                        onPress={() => {
                            props._hideDialog();
                        }}
                    >
                        <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{...styles.openButton, backgroundColor: '#2196F3'}}
                        onPress={() => {
                            props._hideDialog();
                            ProductDAO.insert(name, price, info, image);
                        }}
                    >
                        <Text style={styles.textStyle}>Insert</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const ProductUpdate = (props) => {
    const [key, setKey] = useState(props.item.key);
    const [name, setName] = useState(props.item.name);
    const [price, setPrice] = useState(props.item.price);
    const [info, setInfo] = useState(props.item.info);
    const [image, setImage] = useState(props.item.image);


    const _chooseImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [ 4, 3 ]
		});

		if (!result.cancelled) {
			setImage(result.uri);
			console.log(image);
		}
	};
    return(
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Update Product</Text>
                <TouchableWithoutFeedback onPress={() => _chooseImage()}>
                    <Image
                        source={{uri: image, width: 150, height: 150}}
                        style={{ borderWidth: 1, borderColor: 'back'}}
                        />
                </TouchableWithoutFeedback>
                <View style={styles.lineDialog}>
                    <Text style={styles.textDialog}>Name: </Text>
                    <TextInput style={styles.textInputDialog} value={name} onChangeText={(text) => setName(text)}/>
                </View>

                <View style={styles.lineDialog}>
                    <Text style={styles.textDialog}>Price: </Text>
                    <TextInput style={styles.textInputDialog} value={price} onChangeText={(text) => setPrice(text)}/>
                </View>

                <View style={styles.lineDialog}>
                    <Text style={styles.textDialog}>Info: </Text>
                    <TextInput style={styles.textInputDialog} value={info} onChangeText={(text) => setInfo(text)}/>
                </View>

                <View style={{
						flex: 1,
						flexDirection: 'row',
						margin: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
						width: width * 80 / 187.5,
						padding: width * 8 / 187.5
					}}>
                    <TouchableOpacity
                        style={{...styles.openButton, backgroundColor: '#ff3300'}}
                        onPress={() => {
                            props._hideDialog();
                        }}
                    >
                        <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{...styles.openButton, backgroundColor: '#2196F3'}}
                        onPress={() => {
                            props._hideDialog();
                            ProductDAO.update(key, name, price, info, image);
                        }}
                    >
                        <Text style={styles.textStyle}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const ListItem = (props) => {
    const swipeoutSetting = {
        autoClose: true,
		onClose: () => {},
		onOpen: () => {
			props._setCurrent(props.item);
		},
		right: [
			{
				text: 'Update',
				type: 'secondary',
				onPress: () => {
					props._showDialog();
				}
			},
            {
                text:'Delete',
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        'Delete',
                        'Are you want to delete product ' + props.item.name + '?',
                        [
                            {text: 'No',onPress: ()=> console.log('Cancel Delete '), type: 'cancel'},
                            {text: 'Yes',onPress: ()=> ProductDAO.delete(props.item.key) }
                        ],
                        { cancelable: true}
                    );
                }
            }
        ]
    };

    return(
        <Swipeout{...swipeoutSetting}>
            <View style = {styles.listContainer}>
                <Image
                    source={{ uri: props.item.image, width: 60, height: 60}}
                    style={{borderWidth: 1, borderColor: 'black', width: 70, height: 80}}
                />
                <View>
                    <Text style = {{marginLeft:  10, fontSize: 20, color : 'blue'}}>Name: {props.item.name}</Text>
                    <Text style = {{marginLeft:  10, color : 'purple'}}>Price: {props.item.price}</Text>
                    <Text style = {{marginLeft:  10, color : 'red',}}>Info: {props.item.info}</Text>
                </View>
            </View>
        </Swipeout>
    );
}



const{ width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 25,
        backgroundColor: '#b3ffff'
    },
    text: {
		fontSize: 30,
		color: 'white'
	},
    listContainer: {
        backgroundColor:'pink',
        flexDirection: 'row',
        margin: width *3.6 / 187.5 ,
        padding: width *3.6 / 187.5 ,
        borderRadius: width * 3.6 / 187.5
    }, 
    fab: {
		height: 50,
		width: 50,
		borderRadius: 200,
		position: 'absolute',
		bottom: 20,
		right: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#686cc3'
	},
	text: {
		fontSize: 30,
		color: 'black'
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	modalView: {
		width: width * 167.5 / 187.5,
		padding: width * 8 / 187.5,
		borderRadius: width * 3.6 / 187.5,

		margin: 20,
		backgroundColor: 'white',

		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		margin: 2,
		elevation: 2
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		fontSize: 20,
		marginBottom: 15,
		textAlign: 'center'
	},
	lineDialog: {
		width: '100%',
		height: 40,
		margin: 8,
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#ffffcc'
	},
	textInputDialog: {
		height: 34,
		flex: 1,
		marginRight: 4,
		borderWidth: 0.1,
		borderRadius: 5,
		color: '#111111',

		fontSize: 15,
		paddingLeft: 5
	}
});
