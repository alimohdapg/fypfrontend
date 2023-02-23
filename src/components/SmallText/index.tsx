import {Text} from 'react-native';
import styles from "./styles";

type Props = {
    text: string;
};

const AppText = (props: Props) => {

    return (
        <Text style={[styles.smallText]}>{props.text}</Text>
    );
};

export default AppText;