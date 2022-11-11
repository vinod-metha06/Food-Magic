import React, {createContext, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

export const Authcontext = createContext();

export const AuthProvider = ({children}) => {
  const dat = [
    {
      id: 1,
      name: 'Soup Campbells  With Veg',
      ins: 'hhnbvb',
      rating: 4,
      img: 'https://bit.ly/3UHnaLs',
      ind : ['rice', 'milk'],
    },
    {
      id: 2,
      name: 'Sugar - Palm',
      ins: 'hhnbvb',
      rating: 3,
      img: 'https://bit.ly/3G3SdwX',
      ind : ['rice', 'milk'],
    },
    {
      id: 3,
      name: 'Nectarines',
      ins: 'hhnbvb',
      rating: 4,
      img: 'https://bzfd.it/3DX7yN6',
      ind : ['rice', 'milk'],
    },
    {
      id: 4,
      name: 'Yeast - Fresh, Fleischman',
      ins: 'hhnbvb',
      rating: 3,
      img: 'https://armagazine.com/3DY4MH9',
      ind : ['rice', 'milk'],
    },
    {
      id: 5,
      name: 'Ecolab - Lime - A - Way 4/4 L',
      ins: 'hhnbvb',
      rating: 4,
      img: 'https://bit.ly/3G3SdwX',
      ind : ['rice', 'milk'],
    },
    {
      id: 6,
      name: 'Wine - Baron De Rothschild',
      ins: 'hhnbvb',
      rating: 5,
      img: 'https://armagazine.com/3DY4MH9',
      ind : ['rice', 'milk'],
    },
    {
      id: 7,
      name: 'Heavy Duty Dust Pan',
      ins: 'hhnbvb',
      rating: 4,
      img: 'https://bit.ly/3G3SdwX',
      ind : ['rice', 'milk'],
    },
    {
      id: 8,
      name: 'Cleaner - Lime Away',
      ins: 'hhnbvb',
      rating: 5,
      img: 'https://armagazine.com/3DY4MH9',
      ind : ['rice', 'milk'],
    },
    {
      id: 9,
      name: 'Pasta - Fusili Tri - Coloured',
      ins: 'hhnbvb',
      rating: 5,
      img: 'http://dummyimage.com/113x100.png/dddddd/000000',
      ind : ['rice', 'milk'],
    },
    {
      id: 10,
      name: 'Chocolate Eclairs',
      ins: 'hhnbvb',
      rating: 2,
      img: 'http://dummyimage.com/232x100.png/cc0000/ffffff',
      ind : ['rice', 'milk'],
    },
  ];
  const [user, setUser] = useState(null);
  const [data, setData] = useState(dat);
  return (
    <Authcontext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        data,
        setData,
      }}>
      {children}
    </Authcontext.Provider>
  );
};
