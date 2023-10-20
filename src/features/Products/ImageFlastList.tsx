import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
interface IProps {
  images?: {
    url: string;
  }[];
  setImageLinkProduct: (value: string) => void;
  imageLinkProduct: string | null;
}
const ImageFlatList = (props: IProps) => {
  const {images, setImageLinkProduct, imageLinkProduct} = props;
  return (
    <View style={styles.container}>
      <FlatList
        data={images ?? []}
        style={{marginTop: 16}}
        contentContainerStyle={styles.styleFlatList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => setImageLinkProduct(item.url)}
              style={[imageLinkProduct === item.url && styles.BorderImage]}>
              <Thumb
                style={styles.styleImage}
                source={{
                  uri: item.url,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ImageFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  styleFlatList: {
    flexDirection: 'row',
    columnGap: 6,
  },
  styleImage: {
    width: 67,
    height: 66,
    borderRadius: 4,
  },
  BorderImage: {
    borderRadius: 4,
    borderColor: defaultColors.bg_00C3AB,
    borderWidth: 1,
  },
});
