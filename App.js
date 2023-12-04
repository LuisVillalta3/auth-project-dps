import { StyleSheet, Text, View, Button } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';

GoogleSignin.configure({
  webClientId: '981231962918-bat58mao2e10ho2lv1iu0864djnp9cge.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const handleLoginButton = async () => {
    setErrorLogin(false);

    if (loggedIn) {
      setLoggedIn(false)
      return;
    }

    onGoogleButtonPress().then(() => {
      console.log('Signed in with Google!');
      setLoggedIn(true);
    }).catch(() => {
      console.log('Error signing in with Google');
      setErrorLogin(true);
      setLoggedIn(false);
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {loggedIn ? 'Sesión iniciada con Google' : 'Iniciar sesión con Gmail'}
      </Text>
      {errorLogin && <Text>Error al iniciar sesión</Text>}
      <Button
        title={loggedIn ? 'Logout' : "Google login"}
        onPress={handleLoginButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  boton: {
    width: 200,
    height: 50,
    backgroundColor: '#0095ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
})
