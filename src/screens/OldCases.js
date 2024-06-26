import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ImageBackground, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getFirestore, getDocs, query, doc, addDoc, collection, where } from 'firebase/firestore'
import firebase from "../config/Firebase"
import AsyncStorage from '@react-native-async-storage/async-storage';

import Heading from "../components/Heading";
import Button from "../components/Button";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";
import Case from "../components/Case";

const OldCases = () => {

    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [caseData, setCaseData] = useState([])
    const [caseDetails, setCaseDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [caseImage, setCaseImage] = useState(null)

    const db = getFirestore(firebase)

    useEffect(() => {
        const getUserEmail = async () => {
            try {
                const email = await AsyncStorage.getItem('email')
                setEmail(email)
                // Fetch vicitm cases details from cloude firestore database
                // loadCasesData()
            } catch (error) {
                alert("Error fetching email from local storage: ", error)
            }
        }
        getUserEmail()
    }, [])

    useEffect(() => {
        const loadCasesData = async () => {
            if (email) {
                let complaints = []
                let caseDetailsList = []
                const q = query(collection(db, "Cases"), where("email", "==", email))
                try {
                    const casesList = await getDocs(q)
                    if (!casesList.empty) {
                        casesList.forEach((doc) => {
                            // console.log(doc.id, "==>", doc.data());
                            const caseData = doc.data();
                            // Push the entire document data into complaints array
                            complaints.push(caseData);
                            caseDetailsList.push(caseData.caseDetails);
                        })
                        setCaseData(complaints)
                        setCaseDetails(caseDetailsList[0])
                        setLoading(false)
                    } else {
                        throw new Error("You dont have any registerd case!")
                    }

                } catch (error) {
                    console.log("Error fetching cases details", error)
                }
            }
        }
        loadCasesData()
    }, [email])


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                <Heading title='Old Cases' />
                <View style={styles.righticon}>
                </View>
            </View>
            {loading ?
                <ActivityIndicator size="small" color="#0000ff" />
                :
                <FlatList
                    data={caseData}
                    renderItem={({ item }) => {
                        // {console.log(caseDetails)}
                        return (
                            <Case id={item.caseId} img={item.image} title={item.title} details={item.complainText} onPress={() => { navigation.navigate("CaseStatus", caseDetails)}}/> //onPress={() => { navigation.navigate("CaseStatus", { caseStatus: item.caseDetails[0].caseStatus, caseDate: item.caseDetails[0].caseDate, officerRemarks: item.caseDetails[0].remarks }) }} />
                        )
                    }
                    }
                    keyExtractor={item => item.caseId}
                />

            }
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    righticon: {
        marginRight: 50,
    },
})

export default OldCases;