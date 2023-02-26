import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from "./styles";
import {RootStackParamList} from "../index";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import PieChart from "../../components/PieChart";
import SmallText from "../../components/SmallText";


type Props = NativeStackScreenProps<RootStackParamList, 'SentimentAnalytics'>;

const SentimentAnalyticsScreen = ({route}: Props) => {

    const [negative, neutral, positive] = route.params.sentiments;

    const video_details = route.params.videoDetails;

    return (
        <View
            style={styles.container}>
            <Image source={{uri: video_details.thumbnailUrl}}
                   style={styles.image}
            />
            <Text style={styles.titleText}>{video_details.title}</Text>
            <View style={styles.details}>
                <SmallText text={video_details.category}/>
                <SmallText text={video_details.date}/>
            </View>
            <Text style={styles.chartTitle}>Overall Sentiment</Text>
            <PieChart pos_pct={positive} neu_pct={neutral} neg_pct={negative}/>
        </View>
    );
};

export default SentimentAnalyticsScreen;
