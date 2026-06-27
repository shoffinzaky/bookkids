import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BookListScreen from "./src/screens/BookListScreen";
import BookDetailScreen from "./src/screens/BookDetailScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";

const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookList">
        <Stack.Screen name="BookList" component={BookListScreen} options={{title: 'Daftar Buku'}} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{title: 'Detail Buku'}} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} options={{title: 'Favorit Saya'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}