import React from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import styles from "./styles";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../index";
import {URL} from 'react-native-url-polyfill';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoInput'>;

const VideoInputScreen = ({navigation}: Props) => {

    const [text, onChangeText] = React.useState('');

    function invalidUrlAlert() {
        Alert.alert('Invalid Video URL', '', [
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
            <Button
                title="Analyze Video"
                onPress={() => {
                    try {
                        const params = new URL(text).searchParams;
                        const video_id = params.get('v')
                        if (!video_id) {
                            invalidUrlAlert()
                            return
                        }
                        return navigation.navigate('SentimentAnalytics', {video_id: video_id})
                    } catch (err) {
                        invalidUrlAlert()
                        return
                    }
                }
                }
            />
        </View>
    );
};


export default VideoInputScreen;