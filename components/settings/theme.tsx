import { View, Text, StyleSheet,Pressable } from 'react-native'

import React, { useEffect, useState } from 'react'
import { BackArrowTitle } from '../ui/heading'
import { ThemeData, ThemeType, useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { bodyExtraSmall, bodySmall, bodyText, percentagePadding, standardHeight, standardMarginVertical, } from '@/custom'
import { Feather } from '@expo/vector-icons'
import { useSettings } from '@/store/settings'
import { saveSettings } from '@/functions/settings'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SubmitBtn, SubmitBtnType } from '../element'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { Dimensions } from 'react-native'


type FeatherIconName = React.ComponentProps<typeof Feather>['name'];







const ThemePreview = () => {
  const { theme } = useGlobal()
  const [toggle, setToggle] = useState(false)
  const [checked, setChecked] = useState(false)



const btnProp:SubmitBtnType={
  isActive:true,
  type:"normal",
  trigger:()=>{},
  text:'Try me'

}




 

  return (
    <View style={[styles.previewBox, { backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Feather name="layout" size={RFValue(20)} color={theme.indicatorColor} />
        <Text style={[styles.headerText, { color: theme.textColor }]}>
          {theme.name} Theme
        </Text>
      </View>

      {/* Paragraph */}
      <Text 
        ellipsizeMode="tail" style={[styles.paragraph, { color: theme.darkGreyText }]}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi nemo obcaecati accusantium rem beatae vero error id 
      </Text>

      

            <SubmitBtn prop={btnProp}/>

      {/* Toggle */}
      <Pressable style={styles.toggleRow} onPress={() => setToggle(!toggle)}>
        <Text style={[styles.toggleLabel, { color: theme.textColor }]}>Enable Feature</Text>
        <MaterialCommunityIcons
          name={toggle ? 'toggle-switch' : 'toggle-switch-off'}
          size={RFValue(50)}
          color={toggle ? theme.indicatorColor : theme.darkGreyText}
        />
      </Pressable>


      {/* Checkbox */}
      <Pressable style={styles.checkboxRow} onPress={() => setChecked(!checked)}>
        <MaterialCommunityIcons
          name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={RFValue(22)}
          color={checked ? theme.indicatorColor : theme.darkGreyText}
        />
        <Text style={[styles.checkboxLabel, { color: theme.textColor }]}>
          I understand 
        </Text>
      </Pressable>
    </View>
  )
}







const Theme = () => {
const   {settings,setSettings,setModal} =useSettings()
 const {theme,setTheme} =useGlobal()






const indicatorColor=theme.name!=='Black'?theme.secondary:'grey'


const insets=useSafeAreaInsets()

const saveTheme=async()=>{
    await AsyncStorage.setItem('theme',JSON.stringify(theme))
}



useEffect(()=>{
   saveTheme()
},[theme])







  return (
    <View style={{width:"100%",flex:1,paddingBottom:insets.bottom}}>
    
     <BackArrowTitle handleBack={()=>setModal(null)} title='Theme'/>
   <View style={{flex:1,justifyContent:"flex-end",}}>


  <ThemePreview/>




   </View>
 

<View style={styles.cardContainer}>

{
  ThemeData.map((item,index)=>{
    const isSelected =theme.name===item.name
    return (
      <View style={styles.mainCardContainer} key={index}>
        
        
       
<Pressable style={[styles.card,{backgroundColor:item.primary,borderColor:isSelected?indicatorColor:item.primary}]} key={index}
  onPress={()=>setTheme(item)}
  >
    {
      isSelected && (
        <>
        <Text style={[styles.themeText, {color:'white'}]}>{item.name}</Text>
        </>
      )
    }
 
  </Pressable>

      </View>
  
    )
  })
}



</View>



    </View>
  )
}


const styles=StyleSheet.create({



 previewBox: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(16),
    marginLeft: 8,
  },
  paragraph: {
    fontFamily: 'Poppins-Regular',
    fontSize: bodySmall,
    marginBottom: 15,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: bodyExtraSmall,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: bodyExtraSmall,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: bodyExtraSmall,
    marginLeft: 8,
  },







mainCardContainer:{
flex:1,
    justifyContent:"center",
    alignItems:"center",
   
    height:standardHeight*2.2,
    marginRight:"1%",
    
},
  card:{
    borderRadius:RFValue(6),
    borderWidth:3,
    width:'100%',
    height:"90%",
    justifyContent:"center",
    alignItems:"center"
  },

  cardContainer:{
  width:'100%',
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row",
  flexWrap:"wrap",
  marginVertical:standardMarginVertical,
  marginTop:standardMarginVertical*4
},


frameText:{
  fontFamily:"Poppins-Regular",
  fontSize:bodyText,
  lineHeight:30,
  textAlign:"justify"
},
themeText:{
  fontFamily:"Poppins-Medium",
  textAlign:"center",
  fontSize:bodyExtraSmall
}

})


export default Theme