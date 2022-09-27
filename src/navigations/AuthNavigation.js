import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Hello } from "../pages";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HelloScreen' component={Hello} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default AuthNavigation;
