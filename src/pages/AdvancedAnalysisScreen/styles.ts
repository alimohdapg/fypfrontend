import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F1',
        justifyContent: 'flex-start',
        paddingTop: '5%'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    inputPair: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '50%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    blurContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    disabled: {
        color: '#8b8680'
    },
    textInput: {
        margin: 8,
        marginRight: 30,
        fontSize: 18
    }
});

export default styles;