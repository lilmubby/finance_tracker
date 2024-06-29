import { Alert, Button, StyleSheet, Text, TextInput, View, Image, StatusBar, Platform } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { loginUserFn } from '../services/authServices';
import { ApiResponse, LoginResponse } from '../types/auth';
import { storeToken } from '../util/token';

const signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = async () => {
    // Alert.alert("Sign In Successful");
    try {
      const {data, status} : ApiResponse<LoginResponse> = await loginUserFn<LoginResponse>({email, password})
      
      // Assuming the token is returned in the response
      const token = data.token;        
      // Save the token in local storage or any state management library
      storeToken(token)
      
      // Navigate to home screen 
      router.replace('/home');
    } catch (error: any) {
      console.log({error});
      Alert.alert("An error occurred", error.message);
    }
    
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.jpg')} style={styles.image} />
      <Text style={styles.header}>Sign In</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput 
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          keyboardAppearance='dark'
          keyboardType='email-address'
          inputMode='email'
          placeholder='Enter email here'
          placeholderTextColor={"#000000"}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput 
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          inputMode="text"
          secureTextEntry
          placeholder='Enter Password here'
          placeholderTextColor={"#000000"}
        />
      </View>
      <View style={styles.btn}>
        <Button title='Submit' color={Platform.OS === "ios" ? "white" : "black"} onPress={signInHandler} />
      </View>
    </View>
  )
}

export default signin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 40,
    marginHorizontal: "auto",
    margin: 16,
    fontWeight: "600"
  },
  image: {
    height: 200,
    width: "100%",
    marginVertical: 10,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  inputLabel: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "500"
  },
  inputWrapper: {
    marginVertical: 8
  },
  btn: {
    backgroundColor: "black",
    width: "40%",
    marginHorizontal: "auto",
    borderRadius: 10,
  }
})