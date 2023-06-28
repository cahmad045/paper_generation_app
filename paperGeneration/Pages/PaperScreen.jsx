import {
    Image,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
    TextInput,
    Text, View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//   import { dummyQuestions } from "./dummydata";
import React, { useEffect, useState } from "react";
//   import ModalScreen from "./ModalScreen";
//   import { LoremIpsum } from "lorem-ipsum";
// import useColorScheme from "../hooks/useColorScheme";
// const lorem = new LoremIpsum({
//     sentencesPerParagraph: {
//         max: 8,
//         min: 4,
//     },
//     wordsPerSentence: {
//         max: 16,
//         min: 4,
//     },
// });
const sectionOfQuestion = (index, question, data) => {
    let year = 2023;
    let section_index;
    var breakException = {};
    try {
        data.forEach((item2, index2) => {
            let i = item2.data.indexOf(question);
            console.log("item.data=========", index2);
            if (i >= 0) {
                // console.log("iiiiiiiii", i, index2)
                section_index = index2;
                throw breakException;
            }
        });
    } catch (error) {
        if (error !== breakException) console.log("Error====>", error);
    }
    console.log("section=> ", section_index, "index=> ", index);
    if (year === 2023) console.log("Happy New Year");
    return Number(section_index);
    // console.log("section_index", section_index, "index=======> ", index, "\nquestion item======>", item)
};
const operations = {
    question: "LOADING...",
    deleteQ: () => { },
    updateQ: (newQuestion) => { },
    replaceQ: () => { },
}
export default function PaperScreen() {
    const [dQ, setdQ] = useState({});
    const [change, setChange] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedQuestion, setselectedQuestion] = useState(operations);
    const [editQuestion, seteditQuestion] = useState("");
    const [isEditing, setisEditing] = useState(false);
    const [isButtonAdded, setisButtonAdded] = useState(false);
    const [textColor, setTextColor] = useState("black");
    const [revertTextColor, setrevertTextColor] = useState("white");
    let editQ = "";
    function toggelModal() {
        setTimeout(() => {
            setModalVisible((value) => {
                return !value
            });
        }, 10)
    }
    function toggelEditing() {
        setTimeout(() => {
            setisEditing((value) => {
                return !value
            });
        }, 10)
        // setisEditing(!isEditing);
    }
    function questionSelection(index, item, newQuestion) {
        setTimeout(() => {
            setselectedQuestion((prev) => {
                prev.question = item.question;
                prev.deleteQ = () => deleteQuestion(index, item);
                prev.updateQ = (newQuestion) =>
                    updateQuestion(index, item, newQuestion);
                prev.replaceQ = () => replaceQuestion(index, item);
                return prev
            });
            doChange()
        }, 50)

    }
    function removeSelection() {
        setTimeout(() => {
            setselectedQuestion((prev) => {
                return { question: "LOADING..." }
            });

        }, 5)
    }
    function sectionHead({ section }) {
        return (
            <View style={styles.section_main_view}>
                <View style={styles.section_head_view}>
                    <Text style={styles.question_heading}>
                        Q{section.section}: Attempt 5 Questions
                    </Text>
                    <Text style={styles.question_heading}>
                        2 x {5} = {2 * 5}
                    </Text>
                    {/* <Text style={styles.question_heading}>2 x {section.data.length - 1} = {2 * (section.data.length - 1)}</Text> */}
                </View>
            </View>
        );
    }
    function sectionQuestions({ item, index }) {
        return (
            <View style={styles.questions_container}>
                {!item.isButton === true ? (
                    <View style={styles.question_view}>
                        <View style={styles.question}>
                            <Text>{index + 1}. </Text>
                            <Text>{item.question}</Text>
                        </View>
                        <Pressable
                            pressRetentionOffset={50}
                            android_ripple={{ color: '#0f0f77', borderless: true }}
                            style={[styles.icon]}
                            onPressOut={() => {
                                // setChange(!change)
                                toggelModal()
                                questionSelection(index, item)

                            }}
                        >
                            <MaterialCommunityIcons
                                name="dots-vertical"
                                size={24}
                                color="grey"
                                style={{ marginRight: 4 }}
                            />
                        </Pressable>
                    </View>
                ) : (
                    <Pressable
                        pressRetentionOffset={50}
                        android_ripple={{ color: '#0f0f77', borderless: true }}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: 5,
                            backgroundColor: "lightblue",
                            paddingVertical: 5,
                        }}
                        onPress={() => {
                            AddQuestion(item.section);
                            doChange();
                        }}
                    >
                        <Text style={{ color: "black" }}>{item.name}</Text>
                    </Pressable>
                )}
            </View>
        );
    }
    const deleteQuestion = (index, question) => {
        let section = sectionOfQuestion(index, question, dQ);
        setdQ((prev) => {
            prev[section].data.splice(index, 1);
            return prev
        });

    };
    const updateQuestion = (index, originalQuestion, newQuestion) => {
        let section = sectionOfQuestion(index, originalQuestion, dQ);
        setdQ((prev) => {
            prev[section].data[index].question = newQuestion;
            return prev
        });
    };
    const replaceQuestion = (index, originalQuestion) => {
        // let section = sectionOfQuestion(index, originalQuestion, dQ);
        // let newQuestion = lorem.generateWords(15);
        // // setModalVisible((prev) => !prev);
        // setdQ((prev) => {
        //     prev[section].data[index].question = newQuestion;
        //     return prev
        // });
    };
    const AddQuestion = (section) => {
        // let newQuestion = lorem.generateWords(15);
        // let index = dQ[section].data.length - 1;
        // setdQ((prev) => {
        //     prev[section].data.splice(index, 0, {
        //         question: newQuestion,
        //     });
        //     return prev;
        // })
    };
    function doChange() {
        setTimeout(() => {
            setChange((prev) => {
                return !prev
            })
        }, 500)
    }
    useEffect(() => {
        // add button
        if (isButtonAdded) return;
        let dataSet = dQ;
        dataSet.map((item, index) => {
            let i = item.data[item.data.length - 1];
            // console.log(index, i)
            if (!i.isButton) {
                item.data.push({
                    isButton: true,
                    name: "Add Question",
                    section: index,
                });
            }

            // console.log("dataset====> ", dataSet)
        }); //end map
        setdQ(dataSet);
        setChange(!change);
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header_main_view}>
                <View style={styles.logo_n_head_view}>
                    <View style={styles.logo_view}>
                        <Image
                            resizeMode="contain"
                            source={{
                                uri: "https://img.freepik.com/free-vector/school-building-educational-institution-college_107791-1051.jpg?w=2000",
                            }}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.head_view}>
                        <View style={{ alignSelf: "flex-end" }}>
                            <Text>Date_______________________</Text>
                        </View>
                        <View style={styles.head_text_view}>
                            <Text style={styles.text_heading}>My School</Text>
                            <Text style={styles.text_sub_heading}>
                                English Intermediat Part 1
                            </Text>
                            <Text style={styles.text_normal}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Assumenda, ex!
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.name_n_roll}>
                    <Text>Name:_____________________</Text>
                    <Text>Roll No:_____________________</Text>
                </View>
            </View>
            {/* <Text style={styles.title}>PaperScreen</Text> */}
            {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
            <View
                style={[
                    styles.section_main_scrollview,
                    { borderColor: "yellow", height: "80%" },
                ]}
            >
                {/* <SafeAreaView > */}
                <SectionList
                    sections={dQ}
                    // data={dummyQuestions}
                    // keyExtractor={(item, index) => item + index}
                    extraData={change}
                    renderItem={sectionQuestions}
                    renderSectionHeader={sectionHead}
                // renderItem={({ item }) => console.log("item======> ", item)}
                // renderSectionHeader={({ section }) => console.log("Section ", section)}
                />
                {/* </SafeAreaView> */}
                {/* <FlatList
                      data={dummyQuestions}
                      renderItem={renderItem}
  
                  /> */}
            </View>
            <View style={modalStyles.centeredView} blurRadius={0.5}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        toggelModal()
                        removeSelection()
                    }}
                >
                    <View style={modalStyles.centeredView}>
                        <View style={modalStyles.modalView}>
                            <View style={{ marginBottom: 5, width: "100%", borderWidth: 0 }}>
                                <TextInput
                                    placeholderTextColor={textColor}
                                    placeholder={"Write your question here..."}
                                    style={{
                                        borderWidth: 1,
                                        minWidth: 250,
                                        paddingHorizontal: 5,
                                        color: textColor,
                                    }}
                                    editable={isEditing}
                                    multiline={true}
                                    numberOfLines={4}
                                    scrollEnabled={true}
                                    defaultValue={selectedQuestion.question}
                                    selectionColor={"red"}
                                    name={"Asad"}
                                    onChangeText={(text) => {
                                        // seteditQuestion(text); console.log(editQuestion)
                                        editQ = text;
                                    }}
                                />
                            </View>
                            <View style={styles.question_options}>
                                {!isEditing ? (
                                    <Pressable
                                        pressRetentionOffset={50}
                                        android_ripple={{ color: '#0f0f77', borderless: true }}
                                        style={styles.modalIcon}
                                        onPress={() => toggelEditing()}
                                    >
                                        <MaterialCommunityIcons
                                            name="pencil-circle-outline"
                                            size={24}
                                            color="blue"
                                        />
                                        <Text>Edit</Text>
                                    </Pressable>
                                ) : (
                                    <>
                                        {/* <TouchableOpacity style={[styles.modalIcon, { alignItems: 'center', justifyContent: 'center' }]} onPress={() => { seteditQuestion(selectedQuestion.question); setisEditing(!isEditing) }}>
                                              <MaterialCommunityIcons name="cancel" size={24} color="grey" />
                                              <Text>Cancel</Text>
                                          </TouchableOpacity> */}
                                        <Pressable
                                            pressRetentionOffset={50}
                                            android_ripple={{ color: '#0f0f77', borderless: true }}
                                            style={styles.modalIcon}
                                            onPress={() => {
                                                if (editQ && editQ !== selectedQuestion.question) {
                                                    setTimeout(() => selectedQuestion.updateQ(editQ), 10)
                                                    toggelEditing()
                                                    toggelModal()
                                                    removeSelection()
                                                }
                                            }}
                                        >
                                            <MaterialCommunityIcons
                                                name="content-save"
                                                size={24}
                                                color="green"
                                            />
                                            <Text>Save</Text>
                                        </Pressable>
                                    </>
                                )}
                                <Pressable
                                    pressRetentionOffset={50}
                                    android_ripple={{ color: '#0f0f77', borderless: true }}
                                    style={styles.modalIcon}
                                    onPress={() => {
                                        toggelModal();
                                        selectedQuestion.replaceQ()
                                        removeSelection()
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="autorenew"
                                        size={24}
                                        color="orange"
                                    />
                                    <Text>Replace</Text>
                                </Pressable>
                                <Pressable
                                    pressRetentionOffset={50}
                                    android_ripple={{ color: '#0f0f77', borderless: true }}
                                    style={styles.modalIcon}
                                    onPress={() => { selectedQuestion.deleteQ(); toggelModal(); removeSelection() }}
                                >
                                    <MaterialCommunityIcons
                                        name="delete-circle-outline"
                                        size={24}
                                        color="red"
                                    />
                                    <Text>Delete</Text>
                                </Pressable>
                                <Pressable
                                    pressRetentionOffset={50}
                                    android_ripple={{ color: '#0f0f77', borderless: true }}
                                    style={styles.modalIcon}
                                    onPress={() => { toggelModal(); removeSelection() }}
                                >
                                    <MaterialCommunityIcons name="close" size={24} color="grey" />
                                    <Text>Close</Text>
                                </Pressable>
                            </View>
                            {/* <Pressable
                pressRetentionOffset={50}
                android_ripple={{color: '#0f0f77', borderless: true0}}
                                  style={[modalStyles.button, modalStyles.buttonClose]}
                                  onPress={() => setModalVisible(!modalVisible)}
                              >
                                  <Text style={modalStyles.textStyle}>Close</Text>
                              </Pressable> */}
                        </View>
                    </View>
                </Modal>
                <Pressable
                    pressRetentionOffset={50}
                    android_ripple={{ color: '#0f0f77', borderless: true }}
                    style={[modalStyles.button, modalStyles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={modalStyles.textStyle}>Show Modal</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: 'center',
        // borderWidth: 1, borderColor: 'red',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    header_main_view: {
        // borderWidth: 1, borderColor: 'yellow',
        minHeight: 100,
        width: "100%",
        marginBottom: 10,
    },
    logo_n_head_view: {
        // borderWidth: 1, borderColor: 'yellow',
        alignItems: "center",
        justifyContent: "center",

        flexDirection: "row",
    },
    logo_view: {
        flex: 0.25,
        aspectRatio: 1 / 1,
        borderRadius: 50,
    },
    logo: {
        height: 90,
        width: 90,
        aspectRatio: 1 / 1,
        borderRadius: 50,
    },
    head_view: {
        flex: 0.75,
        alignItems: "center",
        minHeight: 100,
    },
    head_text_view: {
        alignItems: "center",
    },
    text_heading: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    text_sub_heading: {
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
    },
    text_normal: { textAlign: "center" },
    name_n_roll: {
        // borderWidth: 1, borderColor: 'red',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },
    section_main_scrollview: {
        width: "100%",
        // paddingVertical: 10,
        // marginVertical: 10,

        // borderWidth: 1, borderColor: 'yellow',
    },
    section_main_view: {
        // flex :1,
        width: "100%",
        // marginTop: 5,
        paddingVertical: 5,
        paddingHorizontal: 2,
        // borderWidth: 1, borderColor: 'yellow',
    },
    section_head_view: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },
    questions_container: {
        marginLeft: 15,
    },
    question_heading: {
        fontWeight: "bold",
        fontSize: 14,
    },
    question_view: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    question: {
        width: "90%",
        flexDirection: "row",
    },
    icon: {
        minWidth: 10,
        minHeight: 10,
    },
    question_options: {
        flexDirection: "row",
        minHeight: 50,
        paddingVertical: 5,
        width: "90%",
        position: "relative",
        alignSelf: "center",
        borderTopWidth: 1,
        borderColor: "grey",
        alignItems: "center",
        justifyContent: "space-evenly",
        // borderColor: 'yellow', borderWidth: 1,
    },
    modalIcon: { alignItems: "center", justifyContent: "center" },
});
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        // backgroundColor: "#00FFFF30"
        backgroundColor: "#00000080",
        // backgroundColor: "#CBDCCB80"
    },
    modalView: {
        margin: 20,
        // backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
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
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        marginTop: 5,
        backgroundColor: "#2196F3",
    },
    textStyle: {
        // color: "white",
        // fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
