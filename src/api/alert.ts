import {Alert} from 'react-native';

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

function noCommentsForFiltersAlert() {
    Alert.alert('No comments to analyze', 'Video has no comments that satisfy the specified filters.', [
        {text: 'OK'},
    ]);
}

export {invalidUrlAlert, noCommentsAlert, serverAlert, noCommentsForFiltersAlert}