import { StyleSheet, View } from 'react-native';
import ContentRightOrder from './components/ContentRightOrder';
import TabBarLeftOrder from './components/TabBarLeftOrder';

const ContentOrderTab = () => {
  return (
    <View style={styles.container}>
      <TabBarLeftOrder />
      <ContentRightOrder />
    </View>
  );
};

const styles = StyleSheet.create({
     container : {
        flexDirection : 'row',
     },
});

export default ContentOrderTab;
