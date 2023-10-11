import React, {memo} from 'react';
import {View} from 'react-native';
import {globalStyles} from 'src/commons/globalStyles';
import TextTilte from '../TextTitle';
import ProductItem from 'src/features/Home/components/ProductItem';
import {IProduct} from 'src/api/products';
import useI18n from 'src/hooks/useI18n';

interface IProps {
  products: IProduct[];
  textTile: string;
}
const ProductsList = memo((props: IProps) => {
  const {products} = props;
  const {isVn} = useI18n();
  return (
    <View style={globalStyles.paddingScreenHorizontal}>
      <TextTilte text="home.product_sale" />
      <View style={globalStyles.groupProduct}>
        {(products ?? []).map((it, idx) => {
          return (
            <ProductItem
              promo={it.promo}
              name={isVn ? it.productNameVn : it.productNameKr}
              totalSoldQuantity={it.totalSoldQuantity}
            />
          );
        })}
      </View>
    </View>
  );
});

export default ProductsList;
