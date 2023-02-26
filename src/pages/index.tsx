import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VideoInputScreen from "./VideoInputScreen";
import SentimentAnalyticsScreen from "./SentimentAnalyticsScreen";
import AdvancedAnalysisScreen from "./AdvancedAnalysisScreen";

type RootStackParamList = {
    VideoInput: {};
    SentimentAnalytics: {
        sentiments: number[],
        videoDetails: { title: string, date: string, category: string, thumbnailUrl: string }
    },
    AdvancedAnalysis: {
        videoId: string
        commentCount: number
    };
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
                <Stack.Screen name="AdvancedAnalysis"
                              component={AdvancedAnalysisScreen}
                              options={{title: 'Advanced Analysis'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export {Router};
export type {RootStackParamList};