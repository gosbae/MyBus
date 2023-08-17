import {Text, StyleSheet, View, ImageBackground} from 'react-native';
import type { BusDataProps } from '../server/gyeonggiBusArriveInfo';

const BusInfo = ({busNumber, predictTime1, predictTime2, busRootName }: BusDataProps) => {

    return (
        <View style={styles.busInfoContainer}>
            <View style={styles.leftContainer}>
            <View style={styles.busIconContainer}>
                <ImageBackground source={require('../img/busIcon.jpg')} style={styles.busIcon} />
            </View>
            </View>
            <View style={styles.busInfoTextContainer}>
                <Text style={styles.busNumberText}>{busRootName}</Text>
                <Text style={styles.predictTimeText}>1st Bus: {predictTime1} min</Text>
                <Text style={styles.predictTimeText}>2nd Bus: {predictTime2} min</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    busInfoContainer: {
        width: '80%',
        height: 90,
        backgroundColor: 'rgba(202, 155, 233, 0.722)',
        borderRadius: 20,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    busIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 100,
        overflow: 'hidden',
    },
    busNumberText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,1.0)'

    },
    predictTimeText: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.7)',
    },
    busIcon: {
        flex: 1,
    },
    busInfoTextContainer: {
        flex: 7,
        flexDirection: 'column',
        paddingLeft: 10,
    },
    leftContainer: {
        flex: 3,
        alignItems: 'center',
    }
})

export default BusInfo;