import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '40%'
    }, buttons: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    label: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 3
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '94%',
        borderRadius: 15
    },
    disabled: {
        color: '#8b8680'
    }
});

export default styles;