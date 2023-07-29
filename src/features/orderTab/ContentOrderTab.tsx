import { defaultColors } from '@configs';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ContentRightOrder from './components/ContentRightOrder';
import TabBarLeftOrder from './components/TabBarLeftOrder';

export interface TabBarOrder  {
  isOpenTab : boolean
  setIsOpenTab :React.Dispatch<React.SetStateAction<boolean>>
  stateFilter : IStateFilter | undefined
  setStateFilter?: React.Dispatch<React.SetStateAction<IStateFilter | undefined>>
}

interface IStateFilter {
  id?: number
  idParent: number
}



const ContentOrderTab = () => {
  const [isOpenTab, setIsOpenTab] = useState<boolean>(false);
  const [stateFilter, setStateFilter] = useState<IStateFilter | undefined>();
  const [typeLocation, setTypeLocaion] = useState<string | undefined>();



  return (
    <View style={styles.container}>
      <TabBarLeftOrder
        isOpenTab={isOpenTab}
        setIsOpenTab={setIsOpenTab}
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        typeLocation={typeLocation}
        setTypeLocaion={setTypeLocaion}
      />
      <ContentRightOrder
        isOpenTab={isOpenTab}
        setIsOpenTab={setIsOpenTab}
        stateFilter={stateFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: defaultColors.c_fff,
    flex :1,
  },
});

export default ContentOrderTab;
