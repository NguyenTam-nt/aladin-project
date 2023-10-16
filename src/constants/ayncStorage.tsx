import AsyncStorage from '@react-native-async-storage/async-storage';
import {storegeKey} from './defines';

export const setArrayToAsyncStorage = async (key: string, values?: any) => {
  try {
    if (values) {
      await AsyncStorage.setItem(key, JSON.stringify(values));
      //   const viewedProducts = await getArrayToAsyncStorage(key);
      //   let productItems = JSON.parse(viewedProducts);
      //   const updatedCartItems = productItems.filter(
      //     (it: any) => it.id !== values.id,
      //   );
      //   await AsyncStorage.setItem(key, JSON.stringify(updatedCartItems));
      //   await AsyncStorage.mergeItem(key, JSON.stringify(updatedCartItems));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getArrayToAsyncStorage = async (key: any) => {
  try {
    const saved = await AsyncStorage.getItem(key);

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.log(error);
  }
};
