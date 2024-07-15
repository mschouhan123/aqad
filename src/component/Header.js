import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
// import scale, { width, height } from "../../assets/scale";
import scale, { width, height } from "../assets/scale";
// import { images } from "../../assets/imageUri";
// import LinearGradient from "react-native-linear-gradient";
import { DrawerActions } from '@react-navigation/native';
import { images } from "../assets/imageUri";

const Header = ({ navigation, isDrawer=true, notification = false, title }) => {

  return (
    <View>
      {/* <LinearGradient start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={["#FF9F0F", "#F9DFBA", "#FF9F0F"]}> */}
        <View
          style={{
            width: width,
            height: height * 0.06,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f27b21"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer()) 
            }}
            style={{ width: "15%", justifyContent: "center" }}
          >
            <Image
              source={isDrawer ? images.drawer : images.backIcon}
              style={{
                width: "80%",
                height: height * 0.03,
                tintColor: "#000",
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
          <View style={{ width: "70%", justifyContent: "center" }}>
            <Text style={{ fontSize: scale(18), fontWeight: '700', }}>{title}</Text>
          </View>

          {notification && (
            <TouchableOpacity
              onPress={() => {
                // console.log("param ");
              }}
              style={{ width: "15%", justifyContent: "center" }}
            >
              {/* <Image
                source={images.notification}
                style={{
                  width: "80%",
                  height: height * 0.03,
                  tintColor: "#000",
                  resizeMode: "contain",
                }}
              /> */}
            </TouchableOpacity>
          )}



        </View>
      {/* </LinearGradient> */}
    </View>
  );
};

export default Header;
