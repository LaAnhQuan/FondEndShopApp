import { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();



export default function App() {

  function HomeScreen(props: any) {
    const { navigation } = props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <View style={{ marginVertical: 10 }}>
          <Button
            onPress={() => navigation.navigate('Details')}
            title='Go to detail'
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Button
            onPress={() => navigation.navigate('Details', { id: 1 })}
            title='Go User id = 1'
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Button
            onPress={() => navigation.navigate('Details', { id: 2 })}
            title='Go User id = 2'
          />
        </View>

      </View>
    );
  }

  function DetailsScreen() {
    const navigation: any = useNavigation();
    const route: any = useRoute();
    const id = route?.params?.id;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>user id = {id}</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'My home' }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
