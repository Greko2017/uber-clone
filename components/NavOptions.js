import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../slices/navSlice';

const NavOptions = ()=> {
  const [listData, setListData] = useState([]);
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin);
  
  useEffect(() => {
    // Get some data to display.
    const data = [
      {
        id: 1,
        text: 'Get a ride',
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen"
      },
      {
        id: 2,
        text: 'Order food',
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen"
      }
    ];

    setListData(data);
  }, []);

  return (
    <FlatList
      data={listData}
      horizontal
      keyExtractor={(item)=> item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`} 
          disabled={!origin}
          onPress={() => {
          // Do something when the list item is pressed.
          navigation.navigate(item.screen)
        }}>
            <View style={tw`${!origin && "opacity-20"}`}>
                <Image 
                    style={{width: 120, height:120, resizeMode: "contain",}}
                    source={{uri: item.image}}
                />
            </View>
          <Text style={tw`mt-2 text-lg font-semibold`}>{item.text}</Text>
          <Icon
            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
            name='arrowright' color="white" type="antdesign"
          />
        </TouchableOpacity>
      )}
    />
  );
}
export default NavOptions