import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const QuestionOptions = ({
    onDeleteQ = () => { },
    onEdit = () => { },
    onReplace = () => { },

}) => {
    const [isActive, setIsActive] = useState(false)
    return (
        <>
            <Pressable
                pressRetentionOffset={50}
                android_ripple={{ color: '#0f0f77', borderless: true }}
                style={[styles.icon]}
                onPressOut={() => {
                    setIsActive(!isActive)
                    // setChange(!change)
                    // toggelModal()
                    // questionSelection(index, item)

                }}
            >
                <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
                    color={isActive ? "green" : "grey"}
                    style={isActive ? styles.activeStyle : styles.inActiveStyle}
                />
            </Pressable>
            {isActive &&
                <Pressable
                    style={styles.icons_box}
                >
                    <Pressable
                        pressRetentionOffset={150}
                        android_ripple={{ color: '#d14843', borderless: true }}
                        onPress={() => {
                            onReplace()
                            setIsActive(false)
                        }}
                    >
                        <Feather name="repeat" size={24} color="orange" />
                    </Pressable>
                    <Pressable
                        pressRetentionOffset={150}
                        android_ripple={{ color: '#d14843', borderless: true }}
                    >
                        <Feather name="edit" size={24} color="green" />
                    </Pressable>
                    <Pressable
                        pressRetentionOffset={150}
                        android_ripple={{ color: '#d14843', borderless: true }}
                        onPress={() => {
                            onDeleteQ()
                            setIsActive(false)
                        }}
                    >
                        <MaterialIcons name="delete" size={24} color="red" />
                    </Pressable>
                    <Pressable
                        pressRetentionOffset={150}
                        android_ripple={{ color: '#d14843', borderless: true }}
                    >
                        <AntDesign onPress={() => setIsActive(false)} name="closecircle" size={24} color="black" />
                    </Pressable>
                </Pressable>
            }
        </>
    )
}

export default QuestionOptions

const styles = StyleSheet.create({
    icons_box: {
        position: 'absolute',
        width: "90%",
        paddingVertical: 5,
        alignSelf: 'center',
        backgroundColor: '#fac5c3',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 50,
        borderColor: 'green',
        borderWidth: 2,
    },
    activeStyle: { marginRight: 4, borderColor: 'green', borderWidth: 1, borderRadius: 50 },
    inActiveStyle: { marginRight: 4, borderColor: 'grey', borderWidth: 0 }
})