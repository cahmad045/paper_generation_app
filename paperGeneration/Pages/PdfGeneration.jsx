import * as React from 'react';
import { View, StyleSheet, Button, Platform, Text } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
let arr = ["a", "b", "c"]
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
<h2 style="display: flex;justify-content: center;align-items: center;">Punjab group of collages</h2><br/>
<div style="text-align: center;">
<h4 style="display: inline-block;">Name:......................</h4>
<h4 style="display: inline-block;">Roll No:......................</h4><br/>
</div>

<div style="text-align: center;">
<h4 style="display: inline-block;">Subject:......................</h4>
<h4 style="display: inline-block;">Class:......................</h4>
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
${arr.map((v, i) => (<p>{i}. Hello {v}</p>))}
</body>
</html>
`;

export default function App() {
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html:arr.map((v,i)=><p>{i}. Hello {v}</p>)
      //   printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  //   const selectPrinter = async () => {
  //     const printer = await Print.selectPrinterAsync(); // iOS only
  //     setSelectedPrinter(printer);
  //   };

  return (
    <View style={styles.container}>
      <Button title="View pdf" onPress={print} />
      <View style={styles.spacer} />
      <Button title="Save pdf" onPress={printToFile} />

      {/* <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: 'center',
  },
});
