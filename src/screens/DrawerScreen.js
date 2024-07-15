import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// import LinearGradient from "react-native-linear-gradient";
// import { images } from "../../assets/imageUri";
import { width, height } from "../assets/scale";

const DrawerScreen = ({ navigation }) => {
    return (
      <ScrollView
        style={{
          flex: 1,
          flexDirection: "column",
          width: "auto",
        }}
      >
        {/* <LinearGradient
          colors={["#FF9F0F", "#F9DFBA", "#FF9F0F"]}
          style={{ height: height * 1 }}
        > */}
          <View style={{ width: width * 0.795, height: height * 0.9}}>
            <View style={{ height: "50%", width: "90%"  }}>
              {/* <Image
                source={images.drawerBGImg}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="stretch"
              /> */}
            </View>
  
            {/* {infod.map((item, index) => ( */}
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigate(item.name,navigation);
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "800",
                      fontSize: 17,
                      paddingLeft: 10,
                      color: "#000",
                    }}
                  >
                    "item name"
                  </Text>
                </TouchableOpacity>
              </View>
            {/* // ))} */}
  
            <Text
              style={{
                fontWeight: "500",
                fontSize: 12,
                paddingLeft: 30,
                paddingTop: 10,
                color: "#000",
              }}
            >
              Version 3.0.0
            </Text>
          </View>
        {/* </LinearGradient> */}
      </ScrollView>
    );
  };
  
  export default DrawerScreen;