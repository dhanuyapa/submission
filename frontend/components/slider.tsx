import React from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';

interface SliderProps {
  images: (string | object)[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={images}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {typeof item === 'string' ? (
              // If the item is a URL (string)
              <Image
                source={{ uri: item }}
                style={{
                  width: Dimensions.get('screen').width * 0.87,
                  height: 150,
                  borderRadius: 10,
                  marginRight: 15
                }}
              />
            ) : (
              // If the item is a local image (object)
              <Image
                source={item}
                style={{
                  width: Dimensions.get('screen').width * 0.87,
                  height: 150,
                  borderRadius: 10,
                  marginRight: 15
                }}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Slider;
