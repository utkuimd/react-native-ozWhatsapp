import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackNav from './AuthNavigation';
import AppStackNav from './AppNavigation';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='AuthScreens' component={AuthStackNav} options={{headerShown: false}}/>
            <Stack.Screen name='AppScreens' component={AppStackNav} />
        </Stack.Navigator>
    )
}

export default MainNavigation;
