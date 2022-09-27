import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../pages";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeScreen' component={Home}/>
        </Stack.Navigator>
    )
}

export default AppNavigation;
