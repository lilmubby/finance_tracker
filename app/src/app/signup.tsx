import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView, StatusBar, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router';
import { phoneIP, routerIP } from '@/src/constants/ip';

const signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const signupHandler = async () => {
    try {
      const res = await fetch(`http://${routerIP}:5000/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password})
      })
      const data = await res.json()
      console.log(res);
      if (res.ok) {
        Alert.alert(data.message)
        router.push("signin")
      } else {
        Alert.alert("Sign In Failed", data.message || "An error occurred");
      }
      
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
    backgroundColor: "white"
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    marginVertical: 3,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    height: 200,
    width: "100%",
    marginVertical: 10,
  },
  inputLabel: {
    marginLeft: 18,
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