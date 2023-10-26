import React from "react";
import {View,Text, TouchableOpacity} from "react-native";

export default function Btn({bgColor, btnLabel,textColor,Press}) {
    return(

        <TouchableOpacity

        onPress={Press}
        style= {{
            backgroundColor:bgColor,
            borderRadius: 100,
            alignItems:"center",
            width:125,
            paddingVertical: 15,
            paddingHorizontal:15,
            marginVertical:15,
            marginHorizontal:5
            
        }}>

            <Text style={{color:textColor, fontSize:22, fontWeight:'bold'}}>
                {btnLabel}

            </Text>


        </TouchableOpacity>
       
    );
}

