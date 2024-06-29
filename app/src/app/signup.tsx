import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView, StatusBar, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { registerUserFn } from '../services/authServices';
import { SignUpResponse } from '../types/auth';

const signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const signupHandler = async () => {
    try {
      const {message, status} = await registerUserFn<SignUpResponse>({name, email, password})
      Alert.alert(message);
      router.replace("signin")
    } catch (error: any) {
      console.log({error});
      Alert.alert("An error occurred", error.message);
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('@/assets/images/logo.jpg')} style={styles.image} />
      <Text style={styles.header}>Sign Up</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder='Enter your name here'
          placeholderTextColor={"#000000"}
          />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder='Enter your email here'
          placeholderTextColor={"#000000"}
          keyboardType='email-address'
          />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder='Enter your password here'
          placeholderTextColor={"#000000"}
          secureTextEntry
          />
      </View>
      <View style={styles.btn}>
        <Button 
          title='Submit'
          onPress={signupHandler}
          color={Platform.OS === "ios" ? "white" : "black"}
          />
      </View>
    </SafeAreaView>
  )
}

export default signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  image: {
    height: 200,
    width: "100%",
    marginVertical: 10,
    resizeMode: 'contain',
  },
  inputLabel: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "500"
  },
  inputWrapper: {
    marginVertical: 8
  },
  header: {
    fontSize: 40,
    marginHorizontal: "auto",
    margin: 16,
    fontWeight: "600"
  },
  btn: {
    backgroundColor: "#000",
    width: "40%",
    marginHorizontal: "auto",
    borderRadius: 10,
  }
})