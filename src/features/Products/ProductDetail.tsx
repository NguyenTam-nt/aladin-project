import {Thumb} from '@components';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IProduct, getProductsDetailApi} from 'src/api/products';
import HeaderBack from 'src/components/Header/HeaderBack';
import ProductDetailItem from './ProductDetailItem';

const ProductDetail = () => {
  const routers = useRoute();
  const params = routers.params;
  //@ts-ignore
  const idProduct = params?.idProduct;
  const [product, setProduct] = useState<IProduct>();
  const getProduct = async (id: any) => {
    try {
      const res = await getProductsDetailApi(id, 'Thành phố Hà Nội');
      if (res) {
        setProduct(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(idProduct);
  }, [idProduct]);

  return (
    <View style={styles.container}>
      <HeaderBack isProductDetail={true} />
      <ScrollView>
        <View>
          <Thumb
            style={styles.styleImage}
            source={{uri: product?.images?.[0].url}}
            resizeMode="cover"
          />
        </View>
        <ProductDetailItem />
      </ScrollView>
    </View>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleImage: {
    width: '100%',
    height: 350,
  },
});
