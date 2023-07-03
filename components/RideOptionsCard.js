import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-X-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-X-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
]

// If we have SURGE pricing, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState()
  const travelTimeInformation = useSelector(selectTravelTimeInformation)
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`flex flex-row`}>
        <TouchableOpacity
          onPress={()=> navigation.navigate('NavigateCard')}
          style={tw`relative top-3 left-5 p-3 rounded-full`}>
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`flex-1 text-center py-5 text-xl`}>Select a Ride - 
        {` `+travelTimeInformation?.distance?.text}</Text>
      </View>

      <FlatList data={data}
        keyExtractor={(item)=> item.id}
        renderItem={({item: {id, title, multiplier, image}, item})=>(
          <TouchableOpacity 
            onPress={()=> setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}
            >
            <Image 
              style={{
                width: 82,
                height: 82,
                resizeMode: "contain",
              }}
              source={{uri: image}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-lg font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel time</Text>

            </View>
            {/* <Text style={tw`text-xl`}>$ {`${parseFloat(99*multiplier).toFixed(1)}`}</Text> */}
            <Text style={tw`text-lg`}>
                {new Intl.NumberFormat('en-gb', {
                  style: 'currency',
                  currency: 'XAF'
                }).format(
                  (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier * 768) /100
                )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
