import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../utils/globalStyles';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[globalStyles.container, styles.container]}>
        <Text style={[globalStyles.title, styles.text]}>
          This screen doesn't exist.
        </Text>
        <Link href="/" style={[globalStyles.button, styles.link]}>
          <Text style={globalStyles.buttonText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
