import { View, StyleSheet, Text, ImageBackground, Image, StatusBar, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import tw from 'twrnc';

const Chat = () => {
    const navigation = useNavigation();
    const { control, handleSubmit } = useForm();
    const onSubmit = data => console.log(data, "data");

    const MessageBubble = ({ isLeft, children }) => (
        <View style={[
            tw.style('px-4 py-2 rounded-lg my-1', {
                alignSelf: isLeft ? 'flex-start' : 'flex-end',
                backgroundColor: isLeft ? '#e6e6e6' : '#47ADB8',
                borderRadius:30 // Adjust colors accordingly
            }),
            isLeft ? styles.leftMessage : styles.rightMessage,
        ]}>
            <Text style={tw.style('text-black font-bold')}>{children}</Text>
        </View>
    );

    return (
        <ImageBackground source={require('../assets/Chat/Logobg.png')}
            style={tw.style('h-full', { marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, })}>

            <View style={styles.container}>
                <View style={tw.style('flex-row', 'justify-between', 'bg-teal-900', 'items-center', 'px-4')}>
                    <TouchableOpacity onPress={() => {
                        navigation.openDrawer();
                    }}><Image source={require("../assets/Dashboard/menu2.png")} style={styles.headerIcons} /></TouchableOpacity>
                    <Text style={styles.headerText}>Ahad Ghouri</Text>
                    <Image source={require("../assets/Dashboard/bell2.png")} style={styles.headerIcons} />
                </View>

                <View style={styles.chatContainer}>
                <MessageBubble isLeft={true}>Hello</MessageBubble>
                <MessageBubble isLeft={false}>Hello Ahad how much space do you have</MessageBubble>
              </View>

                <View style={tw.style('absolute bottom-16 w-full px-2', { paddingHorizontal:10})}>
                    <View style={tw.style("flex-row bg-white rounded-full items-center")}>
                        <Image style={tw.style("m-1")} source={require("../assets/Chat/Attach.png")} />
                        <Controller
                            control={control}
                            rules={{}}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    placeholder="Write your message here"
                                    style={tw.style('flex-1')}
                                    onChangeText={onChange}
                                    value={value}
                                    defaultValue=""
                                />
                            )}
                            name="Message"
                        />
                        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                            <Image style={tw.style("m-1")} source={require("../assets/Chat/Send.png")} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={tw.style("flex-row p-1 justify-evenly items-center bg-teal-900 absolute bottom-9 w-full")}>
                    <Text style={tw`text-white text-sm`}>swyftbags ltd.</Text>
                </View>
            </View>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerIcons: {
        width: 20,
        height: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#47ADB8',
        padding: 5,
    },
    chatContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10%',
    },
    leftMessage: {
        marginRight: 'auto',
    },
    rightMessage: {
        marginLeft: 'auto',
    },
});

export default Chat;
