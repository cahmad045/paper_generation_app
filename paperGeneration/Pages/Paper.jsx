import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Print from "expo-print";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import QuestionOptions from "./QuestionOptions";
import { paperServices } from "../Services/PaperGenerationServices";
import { useSelector } from "react-redux";
import { selectPaper } from "../redux/PaperSlice";
import QuestionAddEdit from "./QuestionAddEdit";
import { AntDesign } from "@expo/vector-icons";
import ImagePicker from 'react-native-image-picker';


const Paper = ({ navigation, route, ...props }) => {
  const logo = require("../assets/COMSATS.jpg");
  const paper = useSelector(selectPaper);
  const [paperResponse, setPaperResponse] = useState(
    route?.params?.paper || {}
  );
  const [institute, setInstituteLocal] = useState(
    route?.params?.institute || {}
  );
  const [replacedQuestions, setReplacedQuestions] = useState([]);
  const [modalData, setModalData] = useState({});
  const [qPos, setQPos] = useState({});
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    console.log("modalData", modalData);
    console.log("qPos", qPos);
  }, [modalData]);
  const sendForApproval = useCallback(() => {
    paperServices
      .approveQuestion(
        paper?.classLevelId,
        paper?.classLevelName,
        paper?.subjectId,
        modalData?.Chapter,
        modalData?.statement,
        modalData?.type,
        modalData?._id
      )
      .then((result) => {
        console.log(result, "approval success");
      })
      .catch((error) => {
        console.log(error, "approval error");
      })
      .finally(() => setOpen(false));
  });
  const onAddQuestion = useCallback((q, secInd, qInd) => {
    console.log(q);
    let obj = { ...q };
    if (paper?.totalCh && paper?.totalCh[0]) {
      obj.Chapter = paper?.totalCh[0]?.chapterId;
    }
    setModalData({ ...obj });
    setQPos({ ...qPos, secInd, qInd, isEdit: false });
    setOpen(true);
  });
  const onEdit = useCallback((q, secInd, qInd) => {
    setModalData({ ...q });
    setQPos({ ...qPos, secInd, qInd, isEdit: true });
    setOpen(true);
  });

  const onSubmitAdd = useCallback(() => {
    // console.log("on submit add", modalData)
    sendForApproval();
    // Also Add in local
    let paperCopy = { ...paperResponse };
    if (modalData?.type === "short") {
      paperCopy.shortQuestions[qPos?.secInd].questions?.push(modalData);
      setPaperResponse(paperCopy);
    }
    if (modalData?.type === "long") {
      paperCopy.longQuestions[qPos?.secInd].questions?.push(modalData);
      setPaperResponse(paperCopy);
    }
    setOpen(false);
  });
  const onSubmitEdit = useCallback(() => {
    // console.log("on submit edit", modalData)
    sendForApproval();
    // Also edit in local
    if ((modalData?.type === "short" && qPos?.secInd >= 0, qPos?.qInd >= 0)) {
      console.log(qPos?.secInd, qPos?.qInd);
      paperResponse.shortQuestions[qPos?.secInd].questions[qPos?.qInd] =
        modalData;
    }
    if ((modalData?.type === "long" && qPos?.secInd >= 0, qPos?.qInd >= 0)) {
      // paperResponse.longQuestions[qPos?.secInd].questions[qPos?.qInd] = modalData
    }
  });
  const onDeleteQ = useCallback((secInd, qInd) => {
    // console.log(secInd, qInd)
    let arr = { ...paperResponse };
    arr.shortQuestions[secInd].questions?.splice(qInd, 1);
    setPaperResponse(arr);
  });
  const onDeleteLQ = useCallback((secInd, qInd) => {
    // console.log(secInd, qInd)
    let arr = { ...paperResponse };
    arr.longQuestions[secInd].questions?.splice(qInd, 1);
    setPaperResponse(arr);
  });
  const onReplaceSuccess = useCallback(
    (secindex, qIndex, toBeReplacedId, type, newQuestion) => {
      if (type === "short")
        paperResponse.shortQuestions[secindex].questions[qIndex] = newQuestion;
      if (type === "long")
        paperResponse.longQuestions[secindex].questions[qIndex] = newQuestion;
      if (!replacedQuestions.indexOf(toBeReplacedId) >= 0)
        setReplacedQuestions([...replacedQuestions, toBeReplacedId]);
    }
  );
  const onReplace = useCallback(
    async (secindex, qIndex, toBeReplacedId, type) => {
      // console.log({ secindex, qIndex, type })
      let chapterIds = [];
      let prevQuestions = [];
      // console.log({ secindex, qIndex, toBeReplacedId, type })
      if (type === "short") {
        chapterIds = [...paperResponse?.shortQuestions[secindex].chapters];
        paperResponse?.shortQuestions[secindex]?.questions?.map((q, i) => {
          prevQuestions.push(q?._id);
        });
      } else if (type === "long") {
        chapterIds = paperResponse?.longQuestions[secindex].chapters;
        paperResponse?.longQuestions[secindex]?.questions?.map((q, i) => {
          prevQuestions.push(q?._id);
        });
      }

      if (type === "long" || type === "short") {
        if (replacedQuestions?.indexOf(toBeReplacedId) === -1) {
          // console.log("Replacing")
          await paperServices
            .replaceQuestion(
              paper?.classLevelId,
              paper?.subjectId,
              chapterIds,
              [...replacedQuestions, ...prevQuestions]
            )
            .then((result) => {
              console.log("replaced");
              console.log(result, "replace success", toBeReplacedId);
              onReplaceSuccess(
                secindex,
                qIndex,
                toBeReplacedId,
                type,
                result?.question
              );
            })
            .catch((error) => {
              console.log(error, "replace error", toBeReplacedId);
            });
          console.log(
            "Replaced: ",
            replacedQuestions?.indexOf(toBeReplacedId),
            replacedQuestions
          );
        } else
          console.log(
            "Not Replaced: ",
            replacedQuestions?.indexOf(toBeReplacedId),
            replacedQuestions
          );
      }
    }
  );

  const test = "ggg";
  const html = `
  <html>
  <head>
      <meta http-equiv="content-type" content="text/html; charset=windows-1252"/>
      <title>DIN A4 Page</title>
      <style type="text/css">
          @page { size: 21cm 29.7cm; margin: 2cm }
          p { line-height: 120%; text-align: justify; background: transparent }
      </style>
  </head>
  <body>
  <div>


  <div>
  <h2 style="display: flex;justify-content: center;align-items: center;">Punjab group of collages</h2><br/>
  
  <div style="text-align: center;">
  <h4 style="display: inline-block;margin-right: 20px;">Subject:${paperResponse?.subjectName?.toUpperCase()}</h4>
  <h4 style="display: inline-block;">Class: ${paperResponse?.classLevelName?.toUpperCase()}</h4>
  </div>

  <div style="text-align: center;">
  <h4 style="display: inline-block;margin-right: 20px;">Name:......................</h4>
  <h4 style="display: inline-block;">Roll No:......................</h4><br/>
  </div>
  </div>
  </div>
  
  <hr/>
  <p>Q1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor
  </p>
  <p>Q2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor
  </p>
  <p>Q3: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor
  </p>
    
  <p>
    ${test}
  </p>
  </body>
  </html>
  `;
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      //   printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  //   const selectPrinter = async () => {
  //     const printer = await Print.selectPrinterAsync(); // iOS only
  //     setSelectedPrinter(printer);
  //   };
  // const onPdfGenerate = async () => {
  //   navigation.navigate("PdfGeneration");
  // };

  
  return (
    // <View style={styles.viewer}>
    <View style={styles.container}>
      <QuestionAddEdit
        open={open}
        data={modalData}
        isEdit={qPos.isEdit ?? false}
        onChangeData={setModalData}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
        onSubmit={qPos.isEdit ? onSubmitEdit : onSubmitAdd}
      />
       {/* <div
                className="image-container"
                onClick={handleImageContainerClick}
                 >
                <img
                  className="paper-logo"
                  src={institute.instituteLogo}
                  alt="Selected Image"
                />
                  <div
                  className="overlay"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <i>
                    <FaCamera />
                  </i>
                  <input
                    type="file"
                    id="photo-input"
                    ref={photoInputRef}
                    style={{ display: "none" }}
                    onChange={handlePhotoInputChange}
                  />
                </div>
              </div> */}
      <View style={styles.header_main_view}>
        <View style={styles.logo_n_head_view}>
          
          <View style={styles.logo_view}>
          <TouchableOpacity>
          <Text style={{marginLeft:20}}>upload</Text>
            <Image
              resizeMode="contain"
              source={{ uri: institute.instituteLogo }}
              style={styles.logo}
            />
            
            </TouchableOpacity>
          </View>
          <View style={styles.head_view}>
            <View style={{ alignSelf: "flex-end" }}>
              <Text>Date_______________________</Text>
            </View>
            <View style={styles.head_text_view}>
              <Text style={styles.text_heading}>{institute.instituteName}</Text>
              <Text style={styles.text_sub_heading}>
                Class:{paperResponse?.classLevelName?.toUpperCase()}
              </Text>
              <Text style={styles.text_sub_heading}>
                Subject:{paperResponse?.subjectName?.toUpperCase()}
              </Text>
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
            { borderColor: "yellow", height: "80%", paddingBottom: 20 },
          ]}
        >
          {paperResponse?.isShort && (
            <>
              {paperResponse?.shortQuestions?.map((sq, index) => (
                <>
                  <View key={index} style={styles.section_main_view}>
                    <View style={styles.section_head_view}>
                      <Text style={styles.question_heading}>
                        Q {index + 1}: Attempt {sq.attempt} question(s)
                      </Text>
                      <Pressable
                        pressRetentionOffset={50}
                        android_ripple={{ color: "#d14843", borderless: true }}
                        onPress={() => onAddQuestion({ type: "short" }, index)}
                      >
                        <AntDesign name="pluscircleo" size={24} color="black" />
                      </Pressable>
                      <Text style={styles.question_heading}>
                        Marks: {sq?.marks} x {sq?.attempt} ={" "}
                        {sq?.marks * sq?.attempt}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.questions_container}>
                    {sq?.questions?.map((q, i) => (
                      <View key={i} style={styles.question_view}>
                        <View style={styles.question}>
                          {/* <Text>{i + 1}. </Text> */}
                          <Text>
                            {i + 1}. {q?.statement}
                          </Text>
                        </View>
                        <QuestionOptions
                          onDeleteQ={() => {
                            onDeleteQ(index, i);
                          }}
                          onReplaceData={{
                            index,
                            i,
                            q_id: q?._id,
                            type: "short",
                          }}
                          onReplace={onReplace}
                          onEdit={() => {
                            onEdit(q, index, i, q?.Chapter);
                            setOpen(true);
                          }}
                        />
                      </View>
                    ))}
                  </View>
                </>
              ))}
            </>
          )}
          {paperResponse?.isLong && (
            <>
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 8,
                  fontFamily: "Times New Roman Bold",
                  fontWeight: "bold",
                }}
              >
                Long Questions
              </Text>
              {paperResponse?.longQuestions?.map((sq, index) => (
                <>
                  <View key={index} style={styles.section_main_view}>
                    <View style={styles.section_head_view}>
                      <Text style={styles.question_heading}>
                        Q {index + 1}: Attempt {sq.attempt} question(s)
                      </Text>
                      <Pressable
                        pressRetentionOffset={50}
                        android_ripple={{ color: "#d14843", borderless: true }}
                        onPress={() => onAddQuestion({ type: "long" }, index)}
                      >
                        <AntDesign name="pluscircleo" size={24} color="black" />
                      </Pressable>
                      <Text style={styles.question_heading}>
                        Marks: {sq?.marks} x {sq?.attempt} ={" "}
                        {sq?.marks * sq?.attempt}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.questions_container}>
                    {sq?.questions?.map((q, i) => (
                      <View key={i} style={styles.question_view}>
                        <View style={styles.question}>
                          {/* <Text>{i + 1}. </Text> */}
                          <Text>
                            {i + 1}. {q?.statement}
                          </Text>
                        </View>
                        <QuestionOptions
                          onDeleteQ={() => {
                            onDeleteLQ(index, i);
                          }}
                          onReplaceData={{
                            index,
                            i,
                            q_id: q?._id,
                            type: "long",
                          }}
                          onReplace={onReplace}
                          onEdit={() => {
                            onEdit(q, index, i, q?.Chapter);
                            setOpen(true);
                          }}
                        />
                      </View>
                    ))}
                  </View>
                </>
              ))}
            </>
          )}

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginBottom: 20,
              paddingHorizontal: 20,
              marginTop: 30,
            }}
          >
            {/* <TouchableOpacity
              onPress={async () => {
                await onPdfGenerate();
                console.log("on Generate Done");
              }}
              style={{
                backgroundColor: "blue",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Generate PDF
              </Text>
            </TouchableOpacity> */}
            <View style={styles.pdfBtns}>
              <Button title="Save/Print pdf" onPress={print} />
              <View style={styles.spacer} />
              <Button title="Share pdf" onPress={printToFile} />

              {/* <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </> */}
            </View>
          </View>
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
    position: "relative",
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
  pdfBtns: {
    display:'flex',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: 'center',
  },
});

export default Paper;
