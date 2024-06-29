import * as SecureStore from 'expo-secure-store';

export const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync('userToken', token);
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Failed to store the token', error);
  }
};

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.error('Failed to retrieve the token', error);
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync('userToken');
    console.log('Token removed successfully');
  } catch (error) {
    console.error('Failed to remove the token', error);
  }
};
