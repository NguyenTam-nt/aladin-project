import React, {memo} from 'react';
import {View} from 'react-native';
import {globalStyles} from 'src/commons/globalStyles';
import TextTilte from '../TextTitle';
import ProductItem from 'src/features/Home/components/ProductItem';
import {IProduct} from 'src/api/products';
interface IProps {
  products: IProduct[];
  textTile?: string;
}
const ProductsList = memo((props: IProps) => {
  const {products, textTile} = props;

  return (
    <View style={globalStyles.paddingScreenHorizontal}>
      {textTile && <TextTilte text={textTile} />}
      <View style={globalStyles.groupProduct}>
        {(products ?? []).map((it, idx) => {
          return (
            <ProductItem
              id={it.id}
              promo={it.promo}
              name={it.productNameVn}
              nameKr={it.productNameKr}
              totalSoldQuantity={it.totalSoldQuantity}
              // @ts-ignore
              images={it.images}
              categoryId={it.categoryId}
              subCategoryId={it.subCategoryId}
              price={it.price}
              product={it}
            />
          );
        })}
      </View>
    </View>
  );
});

export default ProductsList;
