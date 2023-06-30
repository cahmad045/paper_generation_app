import React, { useState } from 'react';
import {
    Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectPaper } from '../redux/PaperSlice';
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
    const [type, setType] = React.useState(data?.type || 'short')
    // console.log("Question data: ", data)
    const paper = useSelector(selectPaper)
    const [chapters, setChapters] = React.useState(paper?.totalCh || {})
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
                    <View>
                        <Text style={{ borderBottomWidth: 1, fontWeight: 'bold' }} id="transition-modal-title">
                            {isEdit ? "Edit" : "Add"} Question
                        </Text>
                        <View id="transition-modal-description" style={{ marginTop: 2 }}>
                            {!isEdit &&
                                <>
                                    <Text id="demo-simple-select-label">Question Type</Text>
                                    <TouchableOpacity style={type === 'short' ? styles.ShortLongEnable : styles.ShortLongDisable} >
                                        <Text>Short Question</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={type === 'long' ? styles.ShortLongEnable : styles.ShortLongDisable} >
                                        <Text>Long Question</Text>
                                    </TouchableOpacity>
                                    {/* <Text
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // defaultValue={questionType ?? 'long'}
                                    disabled={isEdit}
                                    value={type}
                                    label="Question Type"
                                // onChange={(e) => setType(e.target.value)}
                                >
                                    <MenuItem value={'short'}>Short Question</MenuItem>
                                    <MenuItem value={'long'}>Long Question</MenuItem>
                                </Text> */}
                                    <Text id="demo-simple-select-label">Select Relatead Chapter</Text>
                                    {/* <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    disabled={isEdit}
                                    // value={type}
                                    label="Select Relatead Chapter"
                                    placeholder='Select Relatead Chapter'
                                    // defaultOpen={"1"}
                                    style={{ minWidth: '100px' }}
                                    // sx={{minWidth: 100}}
                                    onChange={(e) => onChangeData({ ...data, Chapter: e.target?.value })}
                                > */}
                                    {/* <MenuItem value={'1'}>{"Select Related Chapter"}</MenuItem> */}
                                    {/* {chapters?.map((v, i) => (
                                    <MenuItem value={v?.chapterId}>{v?.chapterName}</MenuItem>
                                ))} */}
                                    {/* <MenuItem value={'long'}>Chapter 2 Question</MenuItem> */}
                                    {/* </Select> */}
                                </>
                            }
                            <TextInput
                                // autoFocus
                                // margin="dense"
                                id="question"
                                // label="Question Statemet"
                                // type="text"
                                // fullWidth
                                // variant="standard"
                                // value={questionValue}
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
                                         marginVertical: 2, marginRight: 10, borderWidth:1,
                                        borderRadius:10,
                                        padding:5,
                                        // backgroundColor: 'lightblue'
                                    }} 
                                    onPress={handleClose}
                                >
                                    <Text style={{color: 'red'}}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    pressRetentionOffset={150}
                                    android_ripple={{ color: '#d14843', borderless: true }}
                                    style={{
                                         marginVertical: 2, marginRight: 10, borderWidth:1,
                                        borderRadius:10,
                                        padding:5,
                                        // backgroundColor: 'lightblue'
                                    }} 
                                    onPress={onSubmit}
                                >
                                    <Text style={{color: 'green'}}>{isEdit ? "Edit" : "Add"} Question</Text>
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