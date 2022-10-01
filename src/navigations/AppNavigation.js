import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackNav from './AuthNavigation';
import MainStackNav from './MainNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='AuthScreens' component={AuthStackNav} />
            <Stack.Screen name='MainScreens' component={MainStackNav} />
        </Stack.Navigator>
    )
}

export default AppNavigation;
