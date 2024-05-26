import { Alert, Button, StyleSheet, Text, TextInput, View, Image, StatusBar, Platform } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { routerIP, phoneIP } from '@/src/constants/ip';

const signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = async () => {
    // Alert.alert("Sign In Successful");
    try {
      const res = await fetch(`http://${phoneIP}:5000/api/v1/auth/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        // Assuming the token is returned in the response
        const token = data.token;
        console.log("Token:", token);
        router.push("/home")

        // Save the token in local storage or any state management library
        // Here we're using AsyncStorage for simplicity
        // await AsyncStorage.setItem('token', token);

        // Navigate to home screen (assuming you have set up routing)
        // router.push('/home');
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
    backgroundColor: "white"
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
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    marginVertical: 3,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  inputLabel: {
    marginLeft: 18,
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