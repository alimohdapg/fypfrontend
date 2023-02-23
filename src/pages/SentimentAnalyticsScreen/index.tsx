import React from 'react';
import {Text, View} from 'react-native';
import styles from "./styles";
import {RootStackParamList} from "../index";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {PieChart} from "../../components/PieChart";

type Props = NativeStackScreenProps<RootStackParamList, 'SentimentAnalytics'>;

const SentimentAnalyticsScreen = ({navigation, route}: Props) => {

    return (
        <View
            style={styles.container}>
            <PieChart pos_pct={route.params.positive} neu_pct={route.params.neutral} neg_pct={route.params.negative}/>
        </View>
    );
};

export default SentimentAnalyticsScreen;