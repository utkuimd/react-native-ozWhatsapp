import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Hello } from "../pages";
import { GetUserInfo } from "../pages";
import { GetPhoneNum } from "../pages";
import { Verify } from "../pages";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='HelloScreen' component={Hello} />
            <Stack.Screen name='GetUserInfoScreen' component={GetUserInfo} />
            <Stack.Screen name='GetPhoneNumScreen' component={GetPhoneNum} />
            <Stack.Screen name='VerifyScreen' component={Verify}/>
        </Stack.Navigator>
    )
}

export default AuthNavigation;
