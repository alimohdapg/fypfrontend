import React from 'react';
import {Text, View} from 'react-native';
import styles from "./styles";
import {RootStackParamList} from "../index";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {VictoryPie, VictoryChart, VictoryTheme} from "victory-native";

type Props = NativeStackScreenProps<RootStackParamList, 'SentimentAnalytics'>;

const SentimentAnalyticsScreen = ({navigation, route}: Props) => {
    return (
        <View
            style={styles.container}>
            <VictoryPie
                data={[
                    {x: "Positive", y: route.params.positive},
                    {x: "Negative", y: route.params.negative},
                    {x: "Neutral", y: route.params.neutral}
                ]}
                theme={VictoryTheme.grayscale}
                padding={{right:80,left:80}}
                animate={{ duration: 2000 }}
            />
        </View>
    );
};

export default SentimentAnalyticsScreen;