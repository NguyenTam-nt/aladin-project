import { defaultColors } from '@configs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FomatDateYY_MM_DD } from 'src/commons/formatDate';
import { useUserInfo } from 'src/redux/reducers/hook';


const HeaderContentRight = ( {stringDate} : {stringDate : string}) => {
  const userInfo = useUserInfo();
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.textHeaderTime}>
          <Text style={styles.textBold}>Ngày lập:</Text> {FomatDateYY_MM_DD(new Date().toDateString())}
        </Text>
        <Text style={styles.textHeaderTime}>
          <Text style={styles.textBold}>Người lập:</Text> {userInfo.fullname}
        </Text>
      </View>
      <Text style={styles.textTitle}>BÁO CÁO MÓN ĂN</Text>
      <Text style={styles.textHeaderTime}>
        <Text style={styles.textBold}>Ngày:</Text> {stringDate}
      </Text>
    </View>
  );
};

export default HeaderContentRight;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  contentRight: {
    gap: 20,
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: defaultColors.c_222124,
  },
  textHeaderTime: {
    fontSize: 14,
    color: defaultColors.c_222124,
  },
  textBold: {
    fontWeight: 'bold',
  },
  headerContent: {
    flexDirection: 'row',
    gap: 25,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    color: defaultColors.c_222124,
    marginTop: 40,
    marginBottom: 16,
  },
});
