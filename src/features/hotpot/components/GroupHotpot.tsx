import {View, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {defaultColors, isTabletDevice} from '@configs';
import FastImage from 'react-native-fast-image';
import {GroupCategories} from './GroupCategories';
import {HotPot} from './HotPot';

type Props = {
  currentCategory: number
  handlePressCategory: (id: number) => void
};

export const GroupHotpot = memo(
  ({currentCategory, handlePressCategory}: Props) => {
    return (
      <View style={styles.container_child}>
        <GroupCategories
          currentCategory={currentCategory}
          onPress={handlePressCategory}
        />
        <HotPot currentCategory={currentCategory} />
        {isTabletDevice ? (
          <View style={styles.imageThumb}>
            <FastImage
              style={styles.fastImage}
              source={{
                uri: 'https://antimatter.vn/wp-content/uploads/2022/05/anh-gif.gif',
              }}
            />
          </View>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultColors.bg_primary,
    flex: 1,
    flexDirection: isTabletDevice ? 'row' : 'column',
    padding: isTabletDevice ? 32 : 19,
    gap: 32,
  },
  container_child: {
    flex: 1,
    position: 'relative',
  },
  imageThumb: {
    position: 'absolute',
    bottom: -32,
    left: 0,
  },
  fastImage: {
    width: 100,
    height: 100,
  },
});
