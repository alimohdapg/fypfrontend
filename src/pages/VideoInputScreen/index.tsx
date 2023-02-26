import React from 'react';
import {ActivityIndicator, Alert, Button, Text, TextInput, View} from 'react-native';
import styles from "./styles";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../index";
import {get_sentiment, get_video_id, get_comment_count, get_video_details} from "../../api/sentiment_api";

type Props = NativeStackScreenProps<RootStackParamList, 'VideoInput'>;

const VideoInputScreen = ({navigation}: Props) => {

    const [text, onChangeText] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    function invalidUrlAlert() {
        Alert.alert('Invalid Video URL', '', [
            {text: 'OK'},
        ]);
    }

    function noCommentsAlert() {
        Alert.alert('Video has no comments', '', [
            {text: 'OK'},
        ]);
    }

    function serverAlert() {
        Alert.alert('Internal Server Error', 'Please try again later.', [
            {text: 'OK'},
        ]);
    }

    async function check_input(url: string) {
        let video_id = ''
        try {
            video_id = get_video_id(text)
        } catch (err) {
            invalidUrlAlert()
            return
        }
        let comment_count;
        try {
            comment_count = await get_comment_count(video_id)
        } catch (err) {
            invalidUrlAlert()
            return
        }
        if (comment_count == 0 || isNaN(comment_count)) {
            noCommentsAlert()
            return
        }
        return video_id
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>YouTube Video URL:</Text>
            <TextInput
                style={[styles.input, loading && styles.disabled]}
                onChangeText={onChangeText}
                value={text}
                placeholder="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                editable={!loading}
            />
            <View style={styles.buttons}>
                <Button
                    title="Analyze Comments"
                    disabled={loading}
                    onPress={async () => {
                        const video_id = await check_input(text);
                        if (video_id == undefined) {
                            return
                        }
                        setLoading(true)
                        let sentiments = null
                        try {
                            sentiments = await get_sentiment(video_id)
                        } catch (err) {
                            serverAlert()
                            setLoading(false)
                            return
                        }
                        setLoading(false)
                        const video_details = await get_video_details(video_id)
                        return navigation.navigate('SentimentAnalytics', {
                            sentiments: sentiments,
                            video_details: video_details
                        })
                    }
                    }
                />
                <Button
                    title="Advanced Analysis"
                    color={'#FF9500'}
                    disabled={loading}
                    onPress={async () => {
                        const video_id = await check_input(text);
                        if (video_id == undefined) {
                            return
                        }
                        return navigation.navigate('AdvancedAnalysis', {
                            video_id: video_id,
                        })
                    }}
                />
            </View>
            <ActivityIndicator size="large" animating={loading} style={styles.loading} color='#007AFF'/>
        </View>
    );
};

export default VideoInputScreen;