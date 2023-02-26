import React from 'react';
import {ActivityIndicator, Alert, Button, Text, TextInput, View} from 'react-native';
import styles from "./styles";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../index";
import {Picker} from "@react-native-picker/picker";

type Props = NativeStackScreenProps<RootStackParamList, 'AdvancedAnalysis'>;

const AdvancedAnalysisScreen = ({navigation, route}: Props) => {

    const [commentCount, setCommentCount] = React.useState();

    function getCommentCounts(){
        const counts = [1]
        const commentCount = route.params.commentCount
        for (let i = 10; i <= Math.min(commentCount, 50); i = i + 10) {
            counts.push(i)
        }
        for (let i = 100; i <= Math.min(commentCount, 500); i = i + 100) {
            counts.push(i)
        }
        for (let i = 1000; i <= Math.min(commentCount, 5000); i = i + 1000) {
            counts.push(i)
        }
        for (let i = 10000; i <= Math.min(commentCount, 50000); i = i + 10000) {
            counts.push(i)
        }
        return counts
    }

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={commentCount}
                onValueChange={(itemValue, itemIndex) =>
                    setCommentCount(itemValue)
                }>
                {getCommentCounts().map((count) => (
                    <Picker.Item key={count} label={count.toString()} value={count}/>
                ))}
            </Picker>
        </View>
    );
};


export default AdvancedAnalysisScreen;