import React from 'react';
import {ActivityIndicator, Alert, Button, Text, TextInput, View} from 'react-native';
import styles from "./styles";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../index";
import {getSentiment, getVideoId, getCommentCount, getVideoDetails} from "../../api/sentiment_api";

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

    async function checkInput(url: string) {
        let videoId = ''
        try {
            videoId = getVideoId(url)
        } catch (err) {
            invalidUrlAlert()
            throw Error()
        }
        let commentCount;
        try {
            commentCount = await getCommentCount(videoId)
        } catch (err) {
            invalidUrlAlert()
            throw Error()
        }
        if (commentCount == 0 || isNaN(commentCount)) {
            noCommentsAlert()
            throw Error()
        }
        return {videoId, commentCount}
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
                        let videoId;
                        try {
                            videoId = (await checkInput(text)).videoId;
                        } catch (err){
                            return
                        }
                        setLoading(true)
                        let sentiments = null
                        try {
                            sentiments = await getSentiment(videoId)
                        } catch (err) {
                            serverAlert()
                            setLoading(false)
                            return
                        }
                        setLoading(false)
                        const videoDetails = await getVideoDetails(videoId)
                        return navigation.navigate('SentimentAnalytics', {
                            sentiments: sentiments,
                            videoDetails: videoDetails
                        })
                    }
                    }
                />
                <Button
                    title="Advanced Analysis"
                    color={'#FF9500'}
                    disabled={loading}
                    onPress={async () => {
                        let videoId, commentCount;
                        try {
                            ({videoId, commentCount} = await checkInput(text));
                        } catch (err){
                            return
                        }
                        return navigation.navigate('AdvancedAnalysis', {
                            videoId: videoId,
                            commentCount: commentCount
                        })
                    }}
                />
            </View>
            <ActivityIndicator size="large" animating={loading} style={styles.loading} color='#007AFF'/>
        </View>
    );
};

export default VideoInputScreen;