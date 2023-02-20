import React from 'react';
import {Text, View} from 'react-native';
import styles from "./styles";
import {RootStackParamList} from "../index";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'SentimentAnalytics'>;

const SentimentAnalyticsScreen = ({navigation, route}: Props) => {
    console.log(route.params.video_id)
    return (
        <View
            style={styles.container}>
            <Text>Hello, world!</Text>
        </View>
    );
};

export default SentimentAnalyticsScreen;