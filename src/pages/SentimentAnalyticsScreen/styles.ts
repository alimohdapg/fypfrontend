import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '80%',
    },
    image: {
        width: '80%',
        aspectRatio: 16 / 9,
        borderWidth: 1,
        marginTop: '5%',
        marginBottom: '2.5%',
    },
    chartTitle: {
        fontSize: 18,
        marginTop: '15%',
    },
    details: {
        width: '80%',
        marginTop: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default styles;