import React from 'react';
import {Alert, Button, Modal, Text, TextInput, View} from 'react-native';
import styles from "./styles";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../index";
import {Picker} from "@react-native-picker/picker";
import Loading from "../../components/Loading";
import {BlurView} from 'expo-blur';

type Props = NativeStackScreenProps<RootStackParamList, 'AdvancedAnalysis'>;

const AdvancedAnalysisScreen = ({navigation, route}: Props) => {

    const [loading, setLoading] = React.useState(false);
    const [commentModalVisible, setCommentModalVisible] = React.useState(false);
    const [commentCount, setCommentCount] = React.useState(Math.min(1000, route.params.commentCount));
    const [minLikeCount, setMinLikeCount] = React.useState(0);

    function getCommentCounts() {
        const counts = [1]
        const commentCount = route.params.commentCount
        for (let i = 10; i <= Math.min(commentCount, 90); i = i + 10) {
            counts.push(i)
        }
        for (let i = 100; i <= Math.min(commentCount, 900); i = i + 100) {
            counts.push(i)
        }
        for (let i = 1000; i <= Math.min(commentCount, 9000); i = i + 1000) {
            counts.push(i)
        }
        for (let i = 10000; i <= Math.min(commentCount, 90000); i = i + 10000) {
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
                                onValueChange={(itemValue, itemIndex) =>
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
                    <Text style={styles.label}>Maximum Comment Count</Text>
                    <Button
                        title={`${commentCount}  〉`}
                        onPress={() => setCommentModalVisible(true)}
                    />
                </View>
                <View style={styles.inputPair}>
                    <Text style={styles.label}>Minimum Like Count</Text>
                    <TextInput
                        style={[styles.textInput, (loading || minLikeCount == 0) && styles.disabled]}
                        onChangeText={(text) => {
                            let num = parseInt(text.replace(/[^0-9]/g, ''))
                            setMinLikeCount(!isNaN(num) ? num : 0);
                        }}
                        value={minLikeCount.toString()}
                        maxLength={7}
                        placeholder="0"
                        editable={!loading}
                        keyboardType={'number-pad'}
                    />
                </View>
            </View>
            <Button
                title="Analyze Comments"
                color={'#FF9500'}
                disabled={loading}
                onPress={async () => {

                    // let sentiments;
                    // let videoDetails;
                    // return navigation.navigate('SentimentAnalytics', {
                    //     sentiments: sentiments,
                    //     videoDetails: videoDetails
                    // })
                }}
            />
            <Loading loading={loading} color='#FF9500'/>
        </View>
    );
};

export default AdvancedAnalysisScreen;