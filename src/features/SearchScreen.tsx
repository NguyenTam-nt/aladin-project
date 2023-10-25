import { TextCustom, Thumb } from '@components';
import { defaultColors } from '@configs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { IProduct, getProductsByKeywork } from 'src/api/products';
import { ICClose } from 'src/assets/icons/ICClose';
import { formatNumberDotWithVND } from 'src/commons/formatMoney';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import { NavLink } from 'src/constants/links';
import { productRoute } from 'src/constants/routers';
import useI18n from 'src/hooks/useI18n';
import { useListItemProvice } from 'src/redux/provices/hooks';
interface IProps {
  dismiss: () => void;
  keyWorkHeader: string
}


const ProductItem = (props: { name: string, priece: number, imageUrl: string }) => {
  const { name, priece, imageUrl } = props;
  return (
    <View style={styles.containerChid}>
      <View style={styles.styleProduct}>
        <View>
          <Thumb
            style={styles.styleImage}
            source={{
              uri: imageUrl,
            }}
            resizeMode="stretch"
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingVertical: 2,
          }}>
          <TextCustom
            fontSize={12}
            weight="400"
            color={defaultColors.text_313131}
            numberOfLines={3}>
            {name}
          </TextCustom>
          <TextCustom fontSize={15} weight="600" color={defaultColors.primary}>
            {formatNumberDotWithVND(priece ?? 0)}
          </TextCustom>
        </View>
      </View>
    </View>
  );
};
const SearchScreen = (props: IProps) => {
  const { dismiss, keyWorkHeader } = props;
  const { t } = useTranslation();
  const SIZE = 10;
  const { isVn } = useI18n();
  const provicesItem = useListItemProvice();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [keyworkModal, setKeyworkModal] = useState<string>(keyWorkHeader);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSearch = async (keywork: string, provice: string) => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        size: SIZE,
        sort: 'id,desc',
        keyword: keywork,
        address: provice
      }
      const res = await getProductsByKeywork(params);
      if (res) {
        setProducts(res.data)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    const timeout = setTimeout(() => { handleSearch(keyworkModal, provicesItem.provices.Name); }, 500)
    return () => {
      clearTimeout(timeout);
    };
  }, [keyworkModal, provicesItem]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Pressable
        onPress={dismiss}
        style={{ position: 'absolute', right: 20, zIndex: 10 }}>
        <ICClose width={20} height={20} />
      </Pressable>
      <View style={styles.searchBox}>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.inputText}
            placeholder={t('common.search')}
            onChangeText={setKeyworkModal}
            value={keyworkModal}
            {...props}
          />
        </View>
        <ButtonGradient style={{ width: 100 }} text={t('button.search')} />
      </View>
      <View style={{ marginTop: 10 }}>
        <TextCustom>{t("comon.result-search", { queryInput: keyworkModal })}{products?.length}</TextCustom>
      </View>
      <ScrollView>
        {(products ?? []).map((it, idx) => {
          return (
            <NavLink
              key={idx}
              to={{
                screen: productRoute.detail,
                initial: false,
                params: {
                  idProduct: it.id,
                  categoryId: it.categoryId,
                  subCategoryId: it.subCategoryId,
                },
              }}
              handleOnPress={dismiss}
            >
              <ProductItem
                name={isVn ? it.productNameVn : it.productNameKr}
                priece={it.price}
                imageUrl={it.images?.[0].url}
              />
            </NavLink>
          )
        })}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 20, marginBottom: 20 },
  containerChid: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    rowGap: 10,
    marginTop: 10,
    // paddingHorizontal: 5,
  },
  styleProduct: {
    width: '100%',
    height: 'auto',
    backgroundColor: defaultColors.c_fff,
    borderRadius: 20,
    flexDirection: 'row',
    columnGap: 10,
    alignContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  styleImage: {
    width: 90,
    height: 70,
    borderRadius: 10,
  },
  searchBox: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  containerInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderColor: defaultColors.c_fff,
    borderWidth: 1,
    backgroundColor: defaultColors.c_fff,
    // marginTop: 30,
    // marginHorizontal: 10,
  },
  inputText: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
  },
});
