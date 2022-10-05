import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Hello, GetUserInfo, GetPhoneNum, Verify } from "../pages";

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
