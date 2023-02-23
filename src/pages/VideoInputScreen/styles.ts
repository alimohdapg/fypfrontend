import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    label: {
        marginTop: '40%',
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
        width: '90%',
    }, buttons: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    loading:  {
        marginTop: '10%',
    },
});

export default styles;