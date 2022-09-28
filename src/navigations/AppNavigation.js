import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackNav from './AuthNavigation';
import MainStackNav from './MainNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='AuthScreens' component={AuthStackNav} options={{headerShown: false}}/>
            <Stack.Screen name='MainScreens' component={MainStackNav} />
        </Stack.Navigator>
    )
}

export default AppNavigation;
