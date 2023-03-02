import React from 'react';
import {Alert, Button, Modal, Pressable, Switch, Text, TextInput, View} from 'react-native';
import styles from "./styles";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../index";
import {Picker} from "@react-native-picker/picker";
import Loading from "../../components/Loading";
import {BlurView} from 'expo-blur';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {getAdvancedSentiment, getVideoDetails} from "../../api/sentiment_api";
import {serverAlert, noCommentsForFiltersAlert} from "../../api/alert";

type Props = NativeStackScreenProps<RootStackParamList, 'AdvancedAnalysis'>;

const AdvancedAnalysisScreen = ({navigation, route}: Props) => {

    const [loading, setLoading] = React.useState(false);
    const [commentModalVisible, setCommentModalVisible] = React.useState(false);
    const [commentCount, setCommentCount] = React.useState(Math.min(1000, route.params.commentCount));
    const [likeCount, setLikeCount] = React.useState(0);
    const [newestFirst, setNewestFirst] = React.useState(true);
    const [likeCountSwitch, setLikeCountSwitch] = React.useState(false);
    const [dateSwitch, setDateSwitch] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    const toggleLikeCountSwitch = () => setLikeCountSwitch(previousState => !previousState);

    const toggleDateSwitch = () => setDateSwitch((previousState) => {
        setNewestFirst(true);
        return !previousState;
    });

    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (typeof selectedDate !== 'undefined') {
            setDate(selectedDate);
        }
    };

    function getCommentCounts() {
        const counts = [1]
        const commentCount = route.params.commentCount
        for (let i = 10; i <= Math.min(commentCount, 100); i = i + 10) {
            counts.push(i)
        }
        for (let i = 200; i <= Math.min(commentCount, 1000); i = i + 100) {
            counts.push(i)
        }
        for (let i = 2000; i <= Math.min(commentCount, 10000); i = i + 1000) {
            counts.push(i)
        }
        return counts
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={commentModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setCommentModalVisible(!commentModalVisible);
                }}>
                <BlurView intensity={50} tint="light" style={styles.blurContainer}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Picker
                                selectedValue={commentCount}
                                onValueChange={(itemValue) =>
                                    setCommentCount(itemValue)
                                }>
                                {getCommentCounts().map((count) =>
                                    <Picker.Item key={count} label={count.toString()} value={count}/>
                                )}
                            </Picker>
                            <Button
                                title={'Done'}
                                onPress={() => setCommentModalVisible(!commentModalVisible)}
                            />
                        </View>
                    </View>
                </BlurView>
            </Modal>
            <View style={styles.inputContainer}>
                <View style={styles.inputPair}>
                    <Text style={styles.label}>Priority</Text>
                    <View style={styles.priorityButtons}>
                        <Pressable
                            style={[styles.priorityButton, !newestFirst && styles.buttonDisabled]}
                            disabled={loading}
                            onPress={() => setNewestFirst(true)}>
                            <Text style={[styles.buttonText, !newestFirst && styles.disabled]}>Newest Comments</Text>
                        </Pressable>
                        <Pressable
                            disabled={dateSwitch || loading}
                            style={[styles.priorityButton, newestFirst && styles.buttonDisabled]}
                            onPress={() => setNewestFirst(false)}>
                            <Text style={[styles.buttonText, newestFirst && styles.disabled]}>Top Comments</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputPair}>
                    <Text style={styles.label}>Maximum Comment Count</Text>
                    <Button
                        title={`${commentCount}  〉`}
                        onPress={() => setCommentModalVisible(true)}
                        disabled={loading}
                    />
                </View>
                <View style={styles.inputPair}>
                    <View style={styles.labelSwitch}>
                        <Text style={styles.label}>{likeCountSwitch ? 'Maximum' : 'Minimum'} Like Count</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{false: '#3e3e3e', true: '#007AFF'}}
                            onValueChange={toggleLikeCountSwitch}
                            value={likeCountSwitch}
                            disabled={loading}
                        />
                    </View>
                    <TextInput
                        style={[styles.textInput, (loading || likeCount == 0) && styles.disabled]}
                        onChangeText={(text) => {
                            let num = parseInt(text.replace(/[^0-9]/g, ''))
                            setLikeCount(!isNaN(num) ? num : 0);
                        }}
                        value={likeCount.toString()}
                        maxLength={7}
                        placeholder="0"
                        editable={!loading}
                        keyboardType={'number-pad'}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputPair}>
                    <View>
                        <View style={styles.labelSwitch}>
                            <Text style={styles.label}>Comments After</Text>
                            <Switch
                                style={styles.switch}
                                trackColor={{false: '#3e3e3e', true: '#007AFF'}}
                                onValueChange={toggleDateSwitch}
                                value={dateSwitch}
                                disabled={loading}
                            />
                        </View>
                        <Text style={styles.detailText}>Can only be used with the "Newest First" priority
                            setting.</Text>
                    </View>
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        onChange={onChangeDate}
                        disabled={!dateSwitch || loading}
                        style={!dateSwitch && {opacity: 0}}
                    />
                </View>
            </View>
            <Button
                title="Analyze Comments"
                color={'#FF9500'}
                disabled={loading}
                onPress={async () => {
                    const videoId = route.params.videoId
                    setLoading(true)
                    let sentiments = null
                    const priority = newestFirst ? 'time' : 'relevance'
                    const minMaxLikeCount = likeCountSwitch ? 'max' : 'min'
                    const jsonDate = dateSwitch ? date.toJSON() : new Date(2005, 5, 13).toJSON()
                    try {
                        sentiments = await getAdvancedSentiment(videoId, priority, commentCount, likeCount, minMaxLikeCount, jsonDate)
                        if (isNaN(sentiments[0])) {
                            noCommentsForFiltersAlert()
                            setLoading(false)
                            return
                        }
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
                }}
            />
            <Loading loading={loading} color='#FF9500'/>
        </View>
    );
};

export default AdvancedAnalysisScreen;