import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F1',
        justifyContent: 'flex-start',
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
        marginVertical: '5%'
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
        borderRadius: 17,
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
    },
    priorityButton: {
        borderColor: '#007AFF',
        marginVertical: 5,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 15,
        padding: 7
    },
    buttonText: {
        fontSize: 15,
        color: '#007AFF'
    },
    priorityButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonDisabled: {
        borderColor: '#dde4e6',
        backgroundColor: '#ecf0f1',
    },
    labelSwitch: {
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    switch: {
        marginHorizontal: 10
    }
});

export default styles;