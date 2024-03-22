import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Heading from "../components/Heading";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";

const CaseStatus = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                <Heading title='Case Status' />
                <RightIcon styles={{ marginRight: 45 }} />
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 20, }}>
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: 30, height: 30, borderRadius: 50, backgroundColor: '#1CAC79' }} />
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{ marginLeft: 10, marginTop: 24, fontSize: 20 }}>Submitted</Text>
                        <Text style={{ marginLeft: 10, fontSize: 15 }}>10-12-2023</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: 30, height: 30, borderRadius: 50, backgroundColor: '#1CAC79' }} />
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{ marginLeft: 10, marginTop: 24, fontSize: 20 }}>Submitted</Text>
                        <Text style={{ marginLeft: 10, fontSize: 15 }}>10-12-2023</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: 30, height: 30, borderRadius: 50, backgroundColor: '#1CAC79' }} />
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{ marginLeft: 10, marginTop: 24, fontSize: 20 }}>Submitted</Text>
                        <Text style={{ marginLeft: 10, fontSize: 15 }}>10-12-2023</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
export default CaseStatus;