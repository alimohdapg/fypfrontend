import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import styles from "./styles";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../index";
import {getSentiment, getVideoId, getCommentCount, getVideoDetails} from "../../api/sentiment_api";
import Loading from "../../components/Loading";
import {invalidUrlAlert, noCommentsAlert, serverAlert} from "../../api/alert";

type Props = NativeStackScreenProps<RootStackParamList, 'VideoInput'>;

const VideoInputScreen = ({navigation}: Props) => {

    const [text, onChangeText] = React.useState('');
    const [loading, setLoading] = React.useState(false);

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
                keyboardType={'url'}
            />
            <View style={styles.buttons}>
                <Button
                    title="Analyze Comments"
                    disabled={loading}
                    onPress={async () => {
                        let videoId;
                        try {
                            videoId = (await checkInput(text)).videoId;
                        } catch (err) {
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
                        } catch (err) {
                            return
                        }
                        return navigation.navigate('AdvancedAnalysis', {
                            videoId: videoId,
                            commentCount: commentCount
                        })
                    }}
                />
            </View>
            <Loading loading={loading} color='#007AFF'/>
        </View>
    );
};

export default VideoInputScreen;