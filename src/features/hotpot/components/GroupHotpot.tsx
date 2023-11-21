import {View, StyleSheet, ScrollView} from 'react-native';
import React, {memo} from 'react';
import {defaultColors, isTabletDevice} from '@configs';
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
    alignItems: 'center',
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
