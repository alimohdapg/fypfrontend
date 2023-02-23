import React from 'react';
import {ActivityIndicator, Alert, Button, Text, TextInput, View} from 'react-native';
import styles from "./styles";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../index";
import {get_sentiment, get_video_id, get_comment_count} from "../../api/sentiment_api";

type Props = NativeStackScreenProps<RootStackParamList, 'VideoInput'>;

const VideoInputScreen = ({navigation}: Props) => {

    const [text, onChangeText] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [loading_color, setLoadingColor] = React.useState('#999999');

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

    return (
        <View style={styles.container}>
            <Text style={styles.label}>YouTube Video URL:</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            />
            <View style={styles.buttons}>
                <Button
                    title="Analyze Comments"
                    onPress={async () => {
                        let video_id = ''
                        try {
                            video_id = get_video_id(text)
                        } catch (err) {
                            invalidUrlAlert()
                            return
                        }
                        if (await get_comment_count(video_id) == 0) {
                            noCommentsAlert()
                            return
                        }
                        setLoadingColor('#007AFF')
                        setLoading(true)
                        let positive, negative, neutral = 0
                        try {
                            [positive, negative, neutral] = await get_sentiment(video_id)
                        } catch (err) {
                            serverAlert()
                            setLoading(false)
                            return
                        }
                        setLoading(false)
                        return navigation.navigate('SentimentAnalytics', {
                            positive: positive,
                            negative: negative,
                            neutral: neutral
                        })
                    }
                    }
                />
                <Button
                    title="Advanced Analysis"
                    color={'#FF9500'}
                    onPress={() => {
                    }}
                />
            </View>
            <ActivityIndicator size="large" animating={loading} style={styles.loading} color={loading_color}/>
        </View>
    );
};


export default VideoInputScreen;