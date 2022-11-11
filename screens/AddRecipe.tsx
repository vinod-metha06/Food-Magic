import React, {useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {Authcontext} from '../navigation/AuthProvider';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
let nextId = 0;
import {windowHeight, windowWidth} from '../utils/Dimensions';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const AddRecipeScreen = ( navigation) => {
  
  const [name, setName] = useState();
  const [instruct, setinstruct] = useState();
  const [img, setimg] = useState();

  const [textValue, setTextValue] = useState();

  const [numInputs, setNumInputs] = useState(1);

  const refInputs = useRef<string[]>([textValue]);

  const {data, setData, user} = useContext(Authcontext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);





  const inputs: JSX.Element[] = [];
  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: 'black'}}>{i + 1}.</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={value => setInputValue(i, value)}
            value={refInputs.current[i]}
            style={styles.input}
            numberOfLines={1}
            placeholder="placeholder"
            placeholderTextColor="#666"
          />
        </View>
        {/* To remove the input */}
        <Pressable onPress={() => removeInput(i)} style={{marginLeft: 5}}>
          <EvilIcons name="trash" size={20} color="red" />
        </Pressable>
      </View>,
    );
  }

  const setInputValue = (index: number, value: string) => {
    const inputs = refInputs.current;
    inputs[index] = value;
    setTextValue(value);
  };
  const addInput = () => {
    refInputs.current.push('');
    setNumInputs(value => value + 1);
  };
  const removeInput = (i: number) => {
    refInputs.current.splice(i, 1)[0];

    setNumInputs(value => value - 1);
  };



  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const submitRecipe = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);
    var a = [];
    {
      refInputs.current.map((value, i) => {
        a.push(value);
        console.log(value, i);
      });
    }

    firestore()
      .collection('posts')
      .add({
        name: name,
        img: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        rating: 5,
        inst: instruct,
        ind: a,
      })
      .then(() => {
        console.log('Post Added!');
        Alert.alert(
          'Recipe published!',
          'Your recipe has been published Successfully!',
        );
        setPost(null);
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {image != null ? (
        <Image source={{uri: image}} />
      ) : (
        <Text style={{color: 'black'}}>No Image</Text>
      )}
      <Button
        title="pick image"
        onPress={() => {
          choosePhotoFromLibrary();
        }}
      />
      <FormInput
        labelValue={name}
        onChangeText={userName => setName(userName)}
        placeholderText="Name"
        iconType="user"
        keyboardType="text"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={instruct}
        onChangeText={instruction => setinstruct(instruction)}
        placeholderText="instruction"
        iconType="user"
        keyboardType="text"
        autoCapitalize="none"
        autoCorrect={false}
      />
   
      {/* <TouchableOpacity
          style={styles.fb}
          onPress={() => {
            setIng([...ing, {id: nextId, p: nextId}]);
            nextId++;
            console.log(ing);
          }}>
          <Text style={{fontSize: 38, color: 'white'}}>+</Text>
        </TouchableOpacity> */}

      <TouchableOpacity style={styles.fb} onPress={addInput}>
        <Text style={{fontSize: 38, color: 'white'}}>+</Text>
      </TouchableOpacity>

      {inputs}

      {/* <FlatList
          bounces={true}
          data={ing}
          //renderItem={<Text>{item.id}</Text>}
          renderItem={({item}) =>
          <FormInput
          labelValue={img}
          onChangeText={ind[item.id] => setimg(ind[item.id])}
          placeholderText="Ingredratients"
          iconType="user"
          keyboardType="text"
          autoCapitalize="none"
          autoCorrect={false}
        />
        }
          keyExtractor={(item, index) => index}
        /> */}

      <FormButton buttonTitle="Submit" onPress={() => submitRecipe()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  fb: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    // position: 'relative',
    bottom: 30,
    right: 30,
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    borderRadius: 100,
    elevation: 8,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
export default AddRecipeScreen;
