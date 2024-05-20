import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
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
      const res = await fetch(`http://${phoneIP}:5000/api/v1/auth/signup`, {
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
    <View style={styles.container}>
      <View>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder='Enter your name here'
          placeholderTextColor={"#000000"}
          />
      </View>
      <View>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder='Enter your email here'
          placeholderTextColor={"#000000"}
          keyboardType='email-address'
          />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder='Enter your password here'
          placeholderTextColor={"#000000"}
          secureTextEntry
          />
      </View>
      <Button
        title='Submit'
        onPress={signupHandler}
        />
    </View>
  )
}

export default signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
  },
})