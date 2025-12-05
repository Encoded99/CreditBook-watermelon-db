import { View, Text, StyleSheet,Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { BackArrowTitle } from '../ui/heading'
import { useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { bodyExtraSmall, } from '@/custom'
import { Feather } from '@expo/vector-icons'
import { useSettings } from '@/store/settings'
import { saveSettings } from '@/functions/settings'


type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

const Alerts = () => {
const   {settings,setSettings,setModal} =useSettings()
 const {theme} =useGlobal()


const handOverDueSwitch=async()=>{

const obj={
 almostDue:settings.notifications.almostDue,
 overDue:!settings.notifications.overDue
}
 setSettings({notifications:obj})
await saveSettings()
  }

  const handAlmostDueSwitch=async()=>{

   const obj={
 overDue:settings.notifications.overDue,
 almostDue:!settings.notifications.almostDue
}
 setSettings({notifications:obj})
   
await saveSettings()
  }


  type ActionType={
   title:string,
   comment:string,
   trigger:()=>void,
   toggle:boolean,
   icons:FeatherIconName
  }


const actions:ActionType[]=[
 {
  title:'Over Due',
  comment:"Send me a alert when a debt is overdue",
  trigger:()=>handOverDueSwitch(),
  icons:"bell",
  toggle:settings.notifications.overDue
 },
  {
  title:'Almost Due',
  comment:"Send me a alert when a debt is almost due",
  trigger:()=>handAlmostDueSwitch(),
    icons:"bell",
     toggle:settings.notifications.almostDue

 }
]







  return (
    <View style={{width:"100%",flex:1}}>
    
     <BackArrowTitle handleBack={()=>setModal(null)} title='Alerts'/>



 <View style={[styles.notificationContainer,{borderColor:theme.borderColor}]}>

  
{
 actions.map((item,index)=>{
  return (
     <View style={[styles.notificationLine]} key={index}>
    <View style={[styles.notificationLogoContainer,{borderColor:theme.borderColor}]}>

      <Feather size={RFValue(20)} color={theme.darkGreyText} name={item.icons}/>

    </View>

    <View  style={styles.descriptionContainer}>


      <Text style={[styles.notificationBold,{color:theme.textColor}]}>{item.title}</Text>
         <Text style={[styles.notificationDescription,{color:theme.textColor}]}>{item.comment}</Text>
    </View>

   
<Pressable onPress={item.trigger}>
    <MaterialCommunityIcons
          name={item.toggle ? 'toggle-switch' : 'toggle-switch-off'}
          size={RFValue(80)}
          color={item.toggle ? `${theme.indicatorColor}` : theme.darkGreyText}
        />

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
 notificationContainer:{

  width:"100%",
  padding:10,
  borderRadius:10,
 
  alignSelf:"center",
  marginTop:20,
borderWidth:1,

 },
 notificationLine:{

  width:"100%",

  alignSelf:"center",

 flexDirection:"row",
 justifyContent:'space-between',
 alignItems:"center",
 marginBottom:RFValue(50)

 },

 notificationLogoContainer:{
  width:50,
  height:50,
  borderRadius:50,
  borderWidth:0.5,
 
  justifyContent:'center',
  alignItems:'center'

},

notificationBold:{
 fontFamily:'Poppins-Medium',
 fontSize:bodyExtraSmall,

},

descriptionContainer: {
  maxWidth: '50%',
 
},

notificationDescription: {
  fontFamily: 'Poppins-Regular',
  fontSize:bodyExtraSmall,
  textAlign: 'left',
},



})


export default Alerts