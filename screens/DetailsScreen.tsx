import React, {useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {Authcontext} from '../navigation/AuthProvider';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
let nextId = 0;
import {windowHeight, windowWidth} from '../utils/Dimensions';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Rating} from 'react-native-ratings';

const DetailsScreen = props => {
  const {route} = props;
  const {params} = route;
  const {item} = params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imgView}>
        <Image style={styles.imageThumbnail} source={{uri: item.img}} />
        <Text style={styles.gridItemName}>{item.name}</Text>
      </View>
      <View style={styles.ingView}>
        <View>
          <Text style={styles.ingItemName}>Ingredients</Text>
          <ScrollView>
            {item.ind.map(it => {
              return <Text style={styles.ingItemListName}>{it}</Text>;
            })}
          </ScrollView>
        </View>
      </View>
      <View style={styles.istView}>
        <View>
          <Text style={styles.ingItemName}>Instructions</Text>
          <ScrollView>
            <Text style={styles.ingItemListName}>{item.ins}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.rateView}>
        <View>
          <Text style={styles.ingItemName}>Rate Recipe</Text>
          <Rating
            type="star"
            fractions={1}
            ratingCount={5}
            imageSize={30}
            showRating={false}
            startingValue={item.rating}
            readonly={false}
            onFinishRating={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  imgView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80%',
    color: '#ffeeed',
    backgroundColor: '#ffeeed',
    padding: 4,
    borderRadius:40,
    elevation:4
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '95%',
    elevation: 4,
    borderRadius: 20,
  },
  ingView: {
    flex: 0.2,
    width: '100%',
    height: '100%',
    marginTop:2,
    color: '#ffeeed',
    backgroundColor: '#ffeeed',
  },
  ingItemName: {
    color: 'black',
    padding: 5,
    fontWeight: '500',
    fontSize: 20,
    marginLeft: 10,
  },
  ingItemListName: {
    color: 'black',
    padding: 4,
    fontSize: 18,
    marginLeft: 18,
  },
  istView: {
    flex: 0.25,
    width: '100%',
    height: '100%',
    color: '#ffeeed',
    backgroundColor: '#ffeeed',
    padding: 4,
  },
  rateView: {
    flex: 0.15,
    width: '100%',
    height: '100%',
    color: '#ffeeed',
    backgroundColor: '#ffeeed',
    padding: 4,
  },
  fb: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'blue',
    borderRadius: 100,
    elevation: 8,
  },
  featured: {
    flex: 0.35,
    color: '#ffeeed',
    backgroundColor: '#ffeeed',
    width: '100%',
    height: 250,
    padding: 4,
  },
  logo: {
    height: '80%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 20,
    color: '#051d5f',
    marginLeft: 10,
    marginTop: 14,
  },
  featuredItem: {
    color: 'red',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 40,
    height: '100%',
    elevation: 4,
    padding: 10,
  },
  grid: {
    flex: 0.65,
    color: 'red',
    backgroundColor: '#ffeeed',
    width: '100%',
    height: 250,
  },
  gridItem: {
    flex: 0.5,
    flexDirection: 'column',
    margin: 2,
    elevation: 2,
    borderRadius: 25,
    padding: 4,
    backgroundColor: '#fff',
  },

  gridItemName: {
    color: 'black',
    padding: 5,
  },
});
export default DetailsScreen;
