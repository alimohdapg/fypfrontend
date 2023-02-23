import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VideoInputScreen from "./VideoInputScreen";
import SentimentAnalyticsScreen from "./SentimentAnalyticsScreen";

type RootStackParamList = {
    VideoInput: { name: string };
    SentimentAnalytics: { positive: number, negative: number, neutral: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="VideoInput"
                    component={VideoInputScreen}
                    options={{title: 'Home'}}
                />
                <Stack.Screen name="SentimentAnalytics"
                              component={SentimentAnalyticsScreen}
                              options={{title: 'Analytics'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export {Router};
export type {RootStackParamList};