import React from 'react';
import {ActivityIndicator, Alert, Button, Text, TextInput, View} from 'react-native';
import styles from "./styles";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../index";
import {get_sentiment, get_video_id, get_comment_count, get_video_details} from "../../api/sentiment_api";

type Props = NativeStackScreenProps<RootStackParamList, 'AdvancedAnalysis'>;

const AdvancedAnalysisScreen = ({navigation, route}: Props) => {

    return (
        <View style={styles.container}>

        </View>
    );
};


export default AdvancedAnalysisScreen;