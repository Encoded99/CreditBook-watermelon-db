import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useGlobal } from '@/app/context';
import {
  bodyText,
  bodySmall,
  h3,
  percentagePadding,
  standardMarginVertical,
  standardHeightSmall
} from '@/custom';
import { useSettings } from '@/store/settings';

const ComingSoon = ({

}) => {
  const { theme } = useGlobal();
  const     {setModal} =useSettings()

  return (
    <View
      style={[
        styles.container,
   
      ]}
    >
     
    
      <View style={styles.centerArea}>
        <View
          style={[
            styles.iconBox,
            { backgroundColor: theme.greyText },
          ]}
        >
          <Feather name="clock" size={RFValue(50)} color={theme.indicatorColor} />
        </View>

        <Text
          style={{
            fontSize: bodyText,
            color: theme.textColor,
            fontFamily: "Poppins-Medium",
            marginTop: standardMarginVertical,
          }}
        >
          Feature Coming Soon
        </Text>

        <Text
          style={{
            fontSize: bodySmall,
            color: theme.darkGreyText,
            fontFamily: "Poppins-Regular",
            marginTop: standardMarginVertical * 0.5,
            textAlign: "center",
            paddingHorizontal: percentagePadding,
          }}
        >
          We’re working hard to bring this feature to you. Stay tuned for more updates.
        </Text>

        
<Pressable
            onPress={()=>setModal(null)}
            style={[
              styles.backBtn,
              { backgroundColor:theme.indicatorColor},
            ]}
          >
            <Text
              style={{
                color:'white',
                fontFamily: "Poppins-Medium",
                fontSize: bodySmall,
              }}
            >
              Okay
            </Text>
          </Pressable>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: RFValue(20),
    justifyContent:"center",
    alignItems:"center"
  },

  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  iconBox: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(100),
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    marginTop: RFValue(25),
    height: standardHeightSmall,
    paddingHorizontal: RFValue(25),

    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(20),
  },
});

export default ComingSoon;
