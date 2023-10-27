import {defaultColors} from '@configs';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import {Html} from 'src/components/Html';
import TextTranslate from 'src/components/TextTranslate';

type EXPLORE_KEY = 'product-info' | 'spec';
const ExploreTabKey: {slug: EXPLORE_KEY; name: string}[] = [
  {slug: 'product-info', name: 'product.descriptions.product-info'},
  {slug: 'spec', name: 'product.descriptions.spec'},
];
interface IProps {
  productInfo?: string;
  spec?: string;
}
const Description = (props: IProps) => {
  const {productInfo, spec} = props;
  const [actionKey, setActionKey] = useState<EXPLORE_KEY>(
    ExploreTabKey[0].slug,
  );
  const [seeMoreProduct, setSeeMoreProduct] = useState<Boolean>(false);
  const [seeMoreSpec, setSeeMoreSpec] = useState<Boolean>(false);

  return (
    <View style={styles().container}>
      <View style={styles().exploreStyle}>
        {ExploreTabKey.map((it, idx) => {
          return (
            <Pressable
              key={it.slug}
              onPress={() => setActionKey(it.slug)}
              style={styles(actionKey === it.slug).exploreItemStyle}>
              <TextTranslate
                fontSize={14}
                weight="700"
                color={
                  actionKey === it.slug
                    ? defaultColors.primary
                    : defaultColors.text_626262
                }
                text={it.name}
              />
            </Pressable>
          );
        })}
      </View>
      <View style={styles().contentStyle}>
        {actionKey === 'product-info' && (
          <Html
            // baseStyle={{height: 300}}
            content={productInfo ?? ''}
          />
        )}

        {actionKey === 'spec' && <Html content={spec ?? ''} />}
      </View>
      {/* <View style={styles().buttomGroup}>
        {actionKey === 'product-info' && (
          <ButtonTouchable
            onPress={() => setSeeMoreProduct(prev => !prev)}
            style={{height: 31, marginHorizontal: 120, borderRadius: 30}}
            text="common.see-more"
            textColor={defaultColors.bg_00C3AB}
          />
        )}
        {actionKey === 'spec' && (
          <ButtonTouchable
            onPress={() => setSeeMoreSpec(prev => !prev)}
            style={{height: 31, marginHorizontal: 120, borderRadius: 30}}
            text="common.see-more"
            textColor={defaultColors.bg_00C3AB}
          />
        )}
      </View> */}
    </View>
  );
};

export default Description;

const styles = (
  isAction?: boolean,
  actionKey?: EXPLORE_KEY,
  seeMore?: boolean,
) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 18,
      marginTop: 25,
    },
    exploreStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    exploreItemStyle: {
      flex: 1,
      paddingBottom: 4,
      borderBottomWidth: isAction ? 3 : 1,
      borderBottomColor: isAction
        ? defaultColors.bg_FE7D29
        : defaultColors.bg_00C3AB,
    },
    contentStyle: {
      flex: 1,
      marginTop: 17,
      //   height: '100%',
      // actionKey === 'product-info'
      //   ? seeMore
      //     ? '100%'
      //     : 150
      //   : seeMore
      //   ? '100%'
      //   : 150,
    },
    buttomGroup: {
      marginTop: 17,
      // height: '100%',
    },
  });
