import React, { useState, useEffect } from "react";
import MultiSelect from 'react-native-multiple-select';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,

} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { addSectionLQ, addSectionSQ, removeSectionLong, removeSectionShort, selectPaper, setChaptersLong, setChaptersNames, setChaptersShort, setChoiceLong, setChoiceShort, setIsLong, setIsShort, setLongEmpty, setMarksLong, setMarksShort, setShortEmpty, setTotalLong, setTotalShort, settotalCh, settotalChapters } from "../redux/PaperSlice";
import { paperServices } from "../Services/PaperGenerationServices";
// Dummy Data for the MutiSelect
const items = [
  // name key is must. It is to show the text in front
  { id: 111, name: 'angellist' },
  { id: 222, name: 'codepen' },
  { id: 333, name: 'envelope' },
  { id: 444, name: 'etsy' },
  { id: 555, name: 'facebook' },
  { id: 655, name: 'foursquare' },
  { id: 7, name: 'github-alt' },
  { id: 8, name: 'github' },
  { id: 9, name: 'gitlab' },
  { id: 10, name: 'instagram' },
];
const PaperCriteria = ({ navigation }) => {
  //redux
  const dispatch = useDispatch();


  const paper = useSelector(selectPaper)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [chapters, setChapters] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showShortData, setShowShortData] = useState(false);
  const [showLongData, setShowLongData] = useState(false);
  useEffect(() => {
    dispatch(setIsShort(showShortData))
    dispatch(setIsLong(showLongData))
  }, [showShortData, showLongData])
  const handleShortToggle = () => {
    setShowShortData(!showShortData);
  };

  const handleLongToggle = () => {
    setShowLongData(!showLongData);
  };
  // short Questions
  const onDeleteSection = (index) => {
    if (index != null)
      dispatch(removeSectionShort({ index }))
  }
  const onChangeTotalShort = (index = 0, value = 0) => {
    dispatch(setTotalShort({ index, value }))
  }
  const onChangeMarksShort = (index = 0, value = 0) => {
    dispatch(setMarksShort({ index, value }))
  }
  const onChangeChoiceShort = (index = 0, value = 0) => {
    dispatch(setChoiceShort({ index, value }))
  }
  const onAddSection = (index = 0, value = 0) => {
    dispatch(addSectionSQ())
  }
  // Long questions
  const onDeleteSectionLong = (index) => {
    if (index != null)
      dispatch(removeSectionLong({ index }))
  }
  const onChangeTotalLong = (index = 0, value = 0) => {
    dispatch(setTotalLong({ index, value }))
  }
  const onChangeMarksLong = (index = 0, value = 0) => {
    dispatch(setMarksLong({ index, value }))
  }
  const onChangeChoiceLong = (index = 0, value = 0) => {
    dispatch(setChoiceLong({ index, value }))
  }
  const onAddSectionLong = (index = 0, value = 0) => {
    dispatch(addSectionLQ())
  }
  useEffect(() => {
    paperServices?.getChapters(paper?.classLevelId, paper?.subjectId)
      .then(value => {
        value?.chapters?.map((v, i) => {
          v.label = `CH ${v?.chapterNo}: ${v?.name}`
        })
        setChapters(value?.chapters)
      })
      .catch((error) => {
        console.log(error, "chapters2 error")
      })
      .finally(() => setLoading(false))
    dispatch(setShortEmpty())
    dispatch(setLongEmpty())
  }, [])

  const onGenerate = () => {
    setIsGenerating(true)
    paperServices?.generatePaper(paper).then((result) => {
      console.log("Paper Generated", JSON.stringify(result))
    })
      .catch((error => {
        console.log(error, "Generate Error")
      }))
      .finally(() => {
        setTimeout(()=> setIsGenerating(false), 2000)
      })
  }
  // asad

  const [numQuestions, setNumQuestions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState([]);
  const [selectedChArrObj, setSelectedChArrObj] = useState([]);
  useEffect(() => {
    // console.log({ selectedIds, selectedChapter, selectedChArrObj }, [selectedIds, selectedChapter, selectedChArrObj])
  })
  const onSelectTotalChapter = (selectedIds) => {
    setSelectedIds(selectedIds);

    let chapterNames = chapters.filter(obj => selectedIds.includes(obj._id)).map(obj => obj.label)
    setSelectedChapter(chapterNames)

    let chapter = chapters.filter(obj => selectedIds.includes(obj._id)).map(obj => {
      return { chapterId: obj._id, chapterName: obj.label }
    })
    setSelectedChArrObj(chapter)
  };
  useEffect(() => {
    dispatch(settotalChapters(selectedIds));
    dispatch(setChaptersNames(selectedChapter))
    dispatch(settotalCh(selectedChArrObj))
  }, [selectedIds, selectedChapter, selectedChArrObj])
  const handleNumQuestionsChange = (value) => {
    setNumQuestions(value);
  };
  const onSelectChaptersShort = (selectedChapterIds, index) => {
    console.log(selectedChapterIds)
    dispatch(setChaptersShort({ index, value: selectedChapterIds }))
  }
  const onSelectChaptersLong = (selectedChapterIds, index) => {
    dispatch(setChaptersLong({ index, value: selectedChapterIds }))
    console.log(selectedChapterIds)
  }
  const handleAddQuestions = () => {
    const updatedQuestions = [];
    for (let i = 0; i < Number(numQuestions); i++) {
      updatedQuestions.push({ numParts: "", marks: "", choice: "" });
    }
    setQuestions(updatedQuestions);
    setShowGenerateButton(true);
  };

  const handleNumPartsChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].numParts = value;
    setQuestions(updatedQuestions);
  };

  const handleMarksChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].marks = value;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choice = value;
    setQuestions(updatedQuestions);
  };

  const handleChapterSelection = (itemValue, itemIndex) => {
    console.log({ itemIndex, itemValue })
    setSelectedIds(itemValue);
  };

  const handleGeneratePaper = () => {
    navigation.navigate("Paper");
  };

  const renderQuestion = (question, index) => {
    return (
      <View key={index} style={styles.questionContainer}>
        <Text style={styles.questionLabel}>Question {index + 1}</Text>
        <View style={styles.inputContainer}>
          <Text>Number of Parts</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter number of parts"
            value={question.numParts}
            onChangeText={(value) => handleNumPartsChange(index, value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Marks for Each Part</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter marks for each part"
            value={question.marks}
            onChangeText={(value) => handleMarksChange(index, value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Choice</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter choice"
            value={question.choice}
            onChangeText={(value) => handleChoiceChange(index, value)}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView indicatorStyle="black" persistentScrollbar contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Paper Criteria</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
        <Text>Select Question Types</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={showShortData ? styles.ShortLongEnable : styles.ShortLongDisable} onPress={handleShortToggle}>
            <Text>Short Questions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={showLongData ? styles.ShortLongEnable : styles.ShortLongDisable} onPress={handleLongToggle}>
            <Text>Long Questions</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ textAlign: 'center' }}>Select Chapters</Text>
      <MultiSelect
        // hideTags
        items={chapters}
        uniqueKey="_id"
        onSelectedItemsChange={onSelectTotalChapter}
        selectedItems={selectedIds}
        selectText="Select Total Chapters"
        searchInputPlaceholderText="Search Chapters..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#E97777"
        tagBorderColor="#E97777"
        tagTextColor="#000"
        selectedItemTextColor="#E97777"
        selectedItemIconColor="#E97777"
        itemTextColor="#000"
        displayKey="label"
        // searchInputStyle={{ color: "#E97777" }}
        submitButtonColor="#48d22b"
        submitButtonText="Close"
      />
      {showShortData && <>
        <TouchableOpacity disabled style={showShortData ? styles.ShortLongEnable : styles.ShortLongDisable} onPress={handleLongToggle}>
          <Text>Short Questions</Text>
        </TouchableOpacity>
        <Text>Number of Sections:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.plusMinusButtons} onPress={onDeleteSection} >
            <Text style={styles.plusMinusText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.plusMinusText}>{paper?.shortQuestions?.length}</Text>
          <TouchableOpacity style={styles.plusMinusButtons} onPress={onAddSection} >
            <Text style={styles.plusMinusText}>+</Text>
          </TouchableOpacity>
        </View>
        {paper?.shortQuestions?.map((value, index) => (
          <View key={index} style={styles.criteriaBox}>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Total:{value.total} - Attempt: {value.attempt} - Marks: {value.marks}</Text>
            <View style={styles.inputContainer}>
              <Text>No of Questions</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter number of short questions"
                value={Number(value)}
                onChangeText={(value) => onChangeTotalShort(index, value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text>Attempt Questions</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Total no of attemptable"
                value={value.attempt}
                onChangeText={(value) => onChangeChoiceShort(index, value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text>Marks for each question</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Marks for each question"
                value={value.marks}
                onChangeText={(value) => onChangeMarksShort(index, value)}
              />
            </View>
            <MultiSelect
              // hideTags
              items={paper?.totalCh}
              uniqueKey="chapterId"
              onSelectedItemsChange={(selectedChapterIds) => onSelectChaptersShort(selectedChapterIds, index)}
              selectedItems={paper?.shortQuestions[index]?.chapters}
              selectText="Choose Chapters"
              searchIcon={false}
              textInputProps={{ editable: false }}
              searchInputPlaceholderText="Chapters..."
              // onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="#E97777"
              tagBorderColor="#E97777"
              tagTextColor="#E97777"
              selectedItemTextColor="#E97777"
              selectedItemIconColor="#E97777"
              itemTextColor="#000"
              displayKey="chapterName"
              // searchInputStyle={{ color: "#E97777" }}
              submitButtonColor="#48d22b"
              submitButtonText="Close"
            />
          </View>
        ))}
      </>}

      {showLongData && <>
        <TouchableOpacity disabled style={showLongData ? styles.ShortLongEnable : styles.ShortLongDisable} onPress={handleLongToggle}>
          <Text>Long Questions</Text>
        </TouchableOpacity>
        <Text>Number of Sections:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.plusMinusButtons} onPress={onDeleteSectionLong} >
            <Text style={styles.plusMinusText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.plusMinusText}>{paper?.longQuestions?.length}</Text>
          <TouchableOpacity style={styles.plusMinusButtons} onPress={onAddSectionLong} >
            <Text style={styles.plusMinusText}>+</Text>
          </TouchableOpacity>
        </View>
        {paper?.longQuestions?.map((value, index) => (
          <View key={index} style={styles.criteriaBox}>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Total: {value.totalQuestions} - Attempt: {value.attempt} - Marks: {value.totalMarks}</Text>
            <View style={styles.inputContainer}>
              <Text>No of long questions</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter number of long questions"
                value={value.totalQuestions}
                onChangeText={(value) => onChangeTotalLong(index, value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text>Attempt Questions</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Total no of attemptable"
                value={value.attempt}
                onChangeText={(value) => onChangeChoiceLong(index, value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text>Marks for each question</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Marks for each question"
                value={value.marks}
                onChangeText={(value) => onChangeMarksLong(index, value)}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Text>Select Chapters Long:</Text>
              <MultiSelect
                // hideTags
                items={paper?.totalCh}
                uniqueKey="chapterId"
                onSelectedItemsChange={(selectedChapterIds) => onSelectChaptersLong(selectedChapterIds, index)}
                selectedItems={paper?.longQuestions[index]?.chapters}
                selectText="Choose Chapters"
                searchIcon={false}
                textInputProps={{ editable: false }}
                searchInputPlaceholderText="Chapters..."
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#E97777"
                tagBorderColor="#E97777"
                tagTextColor="#E97777"
                selectedItemTextColor="#E97777"
                selectedItemIconColor="#E97777"
                itemTextColor="#000"
                displayKey="chapterName"
                // searchInputStyle={{ color: "#E97777" }}
                submitButtonColor="#48d22b"
                submitButtonText="Close"
              />
            </View>
          </View>
        ))}
      </>}
      <TouchableOpacity disabled={isGenerating} style={[styles.generate, isGenerating && styles.disabled]} onPress={onGenerate}>
        <Text style={styles.generateText}>
          {isGenerating ? "Generating Paper" : "Generate Paper"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // flex: 1,
  },
  disabled:{
    opacity: .3
  },
  generate: {
    backgroundColor: "#E97777",
    width: '90%',
    paddingVertical: 10,
    marginTop: 5,
    alignSelf: 'center',
    borderRadius: 50,
  },
  generateText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  criteriaBox: { borderWidth: 1, borderRadius: 20, padding: 10, marginVertical: 5, },
  plusMinusText: { fontWeight: 'bold', fontSize: 20 },
  plusMinusButtons: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: "#E97777"
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
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
});

export default PaperCriteria;
