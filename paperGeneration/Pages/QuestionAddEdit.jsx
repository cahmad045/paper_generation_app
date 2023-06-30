import React, { useEffect, useState } from 'react';
import {
    Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectPaper } from '../redux/PaperSlice';
import { Picker } from '@react-native-picker/picker';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: 400,
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
};

const QuestionAddEdit = ({
    open = false,
    data,
    onChangeData,
    handleOpen = () => { },
    handleClose = () => { },
    onSubmit = () => { },
    isEdit = true
}) => {
    const [modalVisible, setModalVisible] = useState(open);
    const [type, setType] = React.useState(data.type)
    // console.log("Question data: ", data)
    const paper = useSelector(selectPaper)
    const [chapters, setChapters] = React.useState(paper?.totalCh || [])
    const [selectedLanguage, setSelectedLanguage] = useState(null)
    useEffect(() => console.log(selectedLanguage), [selectedLanguage])
    // useEffect(() => {
    //     if (!isEdit && chapters) {
    //         onChangeData({ ...data, Chapter: chapters[0]?.chapterId })
    //     }
    // }, ["hello"])
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                // setModalVisible(!modalVisible);
                handleClose()

            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ width: '100%' }}>
                        <Text style={{ borderBottomWidth: 1, fontWeight: 'bold' }} id="transition-modal-title">
                            {isEdit ? "Edit" : "Add"} Question
                        </Text>
                        <View id="transition-modal-description" style={{ marginTop: 2, width: '100%' }}>
                            <Text id="demo-simple-select-label" style={{fontWeight: 'bold'}}>Type:</Text>
                            <Text style={{ marginLeft: 10 }}>{data.type === 'short' && "Short"} {data.type === 'long' && "Long"} Question</Text>

                            {!isEdit &&
                                <>
                                    <Text id="demo-simple-select-label" style={{marginTop:10, fontWeight: 'bold'}}>Select Relatead Chapter:</Text>
                                    <Picker
                                        selectedValue={data.Chapter}
                                        onValueChange={(itemValue, itemIndex) => {
                                            onChangeData({ ...data, Chapter: itemValue })
                                        }}
                                    >
                                        {chapters?.map((v, i) => (
                                            <Picker.Item label={v?.chapterName} value={v?.chapterId} />
                                        ))}
                                    </Picker>
                                </>
                            }
                            <Text style={{ marginBottom: 2, marginTop: 5, fontWeight:'bold' }}>Question Statement:</Text>
                            <TextInput
                                id="question"
                                style={{ borderWidth: 1, paddingHorizontal: 5, borderRadius: 10, width: "100%" }}
                                placeholder='Write your own question'
                                numberOfLines={3}
                                multiline
                                value={data.statement}
                                onChangeText={(text) => onChangeData({ ...data, statement: text })}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                                <Pressable
                                    pressRetentionOffset={150}
                                    android_ripple={{ color: '#d14843', borderless: true }}
                                    style={{
                                        marginVertical: 2, marginRight: 10, borderWidth: 1,
                                        borderRadius: 10,
                                        padding: 5,
                                        // backgroundColor: 'lightblue'
                                    }}
                                    onPress={handleClose}
                                >
                                    <Text style={{ color: 'red' }}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    pressRetentionOffset={10}
                                    android_ripple={{ color: '#d14843', borderless: true }}
                                    style={{
                                        marginVertical: 2, marginRight: 10, borderWidth: 1,
                                        borderRadius: 10,
                                        padding: 5,
                                        // backgroundColor: 'lightblue'
                                    }}
                                    onPress={data.statement ? onSubmit : () => { }}
                                >
                                    <Text style={{ color: 'green' }}>{isEdit ? "Edit" : "Add"} Question</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
        // marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: "80%",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        // marginBottom: 15,
        textAlign: 'center',
    },
    ShortLongDisable: {
        backgroundColor: "lightgrey",
        padding: 10,
        margin: 5,
        borderRadius: 20,
    },
    ShortLongEnable: {
        backgroundColor: "#E97777",
        padding: 10,
        margin: 5,
        borderRadius: 20,

    },
});

export default QuestionAddEdit;