import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import QuestionOptions from "./QuestionOptions";

const Paper = ({ navigation, route, ...props }) => {
  const logo = require("../assets/COMSATS.jpg");

  const [paperResponse, setPaperResponse] = useState(route?.params?.paper || {})
  const [institute, setInstituteLocal] = useState(route?.params?.institute || {})
  useEffect(() => {
    console.log()
  }, [institute])
  return (
    // <View style={styles.viewer}>
    <View style={styles.container}>
      <View style={styles.header_main_view}>
        <View style={styles.logo_n_head_view}>
          <View style={styles.logo_view}>
            <Image
              resizeMode="contain"
              source={{ uri: institute.instituteLogo }}
              style={styles.logo}
            />
          </View>
          <View style={styles.head_view}>
            <View style={{ alignSelf: "flex-end" }}>
              <Text>Date_______________________</Text>
            </View>
            <View style={styles.head_text_view}>
              <Text style={styles.text_heading}>{institute.instituteName}</Text>
              <Text style={styles.text_sub_heading}>Class:{paperResponse?.classLevelName?.toUpperCase()}</Text>
              <Text style={styles.text_sub_heading}>Subject:{paperResponse?.subjectName?.toUpperCase()}</Text>
              <Text style={styles.text_sub_heading}>Name:</Text>
              <Text style={styles.text_sub_heading}>Date:</Text>
              <Text style={styles.text_sub_heading}>Roll No:</Text>
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
      <ScrollView>
        <View
          style={[
            styles.section_main_scrollview,
            { borderColor: "yellow", height: "80%" },
          ]}
        >
          {paperResponse?.isShort &&
            <>
              {paperResponse?.shortQuestions?.map((sq, index) => (
                <>
                  <View style={styles.section_main_view}>
                    <View style={styles.section_head_view}>
                      <Text style={styles.question_heading}>
                        Q {index + 1}: Attempt {sq.attempt} question(s)
                      </Text>
                      <Text style={styles.question_heading}>
                        Marks: {sq?.marks} x {sq?.attempt} = {sq?.marks * sq?.attempt}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.questions_container}>

                    {sq?.questions?.map((q, i) => (
                      <View style={styles.question_view}>
                        <View style={styles.question}>
                          {/* <Text>{i + 1}. </Text> */}
                          <Text>{i + 1}. {q?.statement}</Text>
                        </View>
                        <QuestionOptions />
                      </View>
                    ))}
                  </View>
                </>
              ))}
            </>
          }
          {paperResponse?.isLong &&
            <>
              <Text style={{ alignSelf: "center", marginTop: 8, fontFamily: 'Times New Roman Bold', fontWeight: 'bold' }}>Long Questions</Text>
              {paperResponse?.longQuestions?.map((sq, index) => (
                <>
                  <View style={styles.section_main_view}>
                    <View style={styles.section_head_view}>
                      <Text style={styles.question_heading}>
                        Q {index + 1}: Attempt {sq.attempt} question(s)
                      </Text>
                      <Text style={styles.question_heading}>
                        Marks: {sq?.marks} x {sq?.attempt} = {sq?.marks * sq?.attempt}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.questions_container}>

                    {sq?.questions?.map((q, i) => (
                      <View style={styles.question_view}>
                        <View style={styles.question}>
                          {/* <Text>{i + 1}. </Text> */}
                          <Text>{i + 1}. {q?.statement}</Text>
                        </View>
                        <QuestionOptions/>
                      </View>
                    ))}
                  </View>
                </>
              ))}
            </>
          }
        </View>
      </ScrollView>
    </View>
    // <ScrollView contentContainerStyle={styles.container}>
    //   <View style={styles.section}>
    //     <Text style={{ textAlign: 'center', marginBottom: 10, fontFamily: 'Times New Roman Bold' }}>{institute.instituteName}</Text>
    //     <View style={styles.container}>
    //       <View style={styles.imageColumn}>
    //         <Image style={styles.image} src={institute.instituteLogo} alt="Logo" />
    //       </View>
    //       <View style={styles.innerViewColumn}>
    //         <View style={styles.innerView}>
    //           <View>
    //             <Text style={styles.normalText}>Class: {paperResponse.classLevelName}</Text>
    //             <Text style={styles.normalText}>Subject: {paperResponse.subjectName}</Text>
    //             <Text style={styles.normalText}>Name:</Text>
    //           </View>
    //           <View style={{ marginLeft: 80, marginTop: 14 }}>
    //             <Text style={styles.normalText}>Date:</Text>
    //             <Text style={styles.normalText}>Roll No:</Text>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //     <View style={styles.line} />
    //     {paperResponse?.isShort &&
    //       <>
    //         {paperResponse?.shortQuestions?.map((sq, index) => (
    //           <>
    //             {/* All about Section 1  */}
    //             {/* <Text style={{alignSelf:"center", marginTop: 8, fontFamily: 'Times New Roman Bold', fontWeight: 'bold' }}>Part {index + 1}</Text> */}
    //             <View style={{ flexDirection: 'row', fontWeight: 'bold' }}>
    //               <Text style={{ marginTop: 10, fontSize: 12, marginBottom: 10, fontFamily: 'Times New Roman Bold', }}>
    //                 Q {index + 1}: Attempt {sq.attempt} question(s)
    //               </Text>

    //               <Text style={{ marginTop: 10, fontSize: 12, marginLeft: '55%', fontFamily: 'Times New Roman Bold', }}>
    //                 Marks: {sq?.marks} x {sq?.attempt} = {sq?.marks * sq?.attempt}
    //               </Text>
    //             </View>
    //             {sq?.questions?.map((q, i) => (
    //               <View style={{ marginLeft: 5 }}>
    //                 <Text style={styles.smallText}>{i + 1}. {q?.statement}</Text>
    //               </View>
    //             ))}
    //           </>
    //         ))}
    //       </>
    //     }
    //     {paperResponse?.isLong &&
    //       <>
    //         <Text style={{ alignSelf: "center", marginTop: 8, fontFamily: 'Times New Roman Bold', fontWeight: 'bold' }}>Long Questions</Text>
    //         {paperResponse?.longQuestions?.map((sq, index) => (
    //           <>
    //             {/* All about Section 1  */}
    //             {/* <Text style={{alignSelf:"center", marginTop: 8, fontFamily: 'Times New Roman Bold', fontWeight: 'bold' }}>Part {index + 1}</Text> */}
    //             <View style={{ flexDirection: 'row', fontWeight: 'bold' }}>
    //               <Text style={{ marginTop: 10, fontSize: 12, marginBottom: 10, fontFamily: 'Times New Roman Bold', }}>
    //                 Q {index + 1}: Attempt {sq.attempt} question(s)
    //               </Text>

    //               <Text style={{ marginTop: 10, fontSize: 12, marginLeft: '55%', fontFamily: 'Times New Roman Bold', }}>
    //                 Marks: {sq?.marks} x {sq?.attempt} = {sq?.marks * sq?.attempt}
    //               </Text>
    //             </View>
    //             {sq?.questions?.map((q, i) => (
    //               <View style={{ marginLeft: 5 }}>
    //                 <Text style={styles.smallText}>{i + 1}. {q?.statement}</Text>
    //               </View>
    //             ))}
    //           </>
    //         ))}
    //       </>}
    //   </View>
    // </ScrollView>
  );
};


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
    position: 'relative',
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

export default Paper;
