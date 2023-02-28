import styles from "./styles";
import {ActivityIndicator} from "react-native";

type Props = {
    color: string,
    loading: boolean
};

const Loading = (props: Props) => {

    return (
        <ActivityIndicator size="large" animating={props.loading} style={styles.loading} color={props.color}/>
    );
};

export default Loading;