import { View, Text, StyleSheet,Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { act, useEffect, useState } from 'react'
import { BackArrowTitle } from '../ui/heading'
import { darkGreyText, useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { bodyExtraSmall, bodySmall, bodyText, standardHeightSmall, standardMarginVertical, } from '@/custom'

import { useSettings } from '@/store/settings'
import { saveSettings } from '@/functions/settings'
import { useFocusEffect } from '@react-navigation/native'



type ActionType={
   title:string,
   value:number,
   dueDays:number[]
  }

  const actions:ActionType[]=[
  {
   title:'7 Days',
   value:7,
   dueDays:[1,2,3]
  },
   {
   title:'14 Days',
   value:14,
   dueDays:[3,5,7]
  },
   {
   title:'30 Days',
   value:30,
   dueDays:[3,7,14]
  },

  {
   title:'60 Days',
   value:60,
   dueDays:[7,14,20,30]
  },
]



const Reminders = () => {
const   {settings,setSettings,setModal} =useSettings()
 const {theme} =useGlobal()
 const initialDays=actions[3]

const [selected,setSelected]=useState<ActionType>(initialDays)
const [selectedDueDays,setSelectedDueDays]=useState<number>(initialDays.dueDays[1])

  


useEffect(()=>{




const foundSelected= actions.find((item)=>item.value===settings.debt.creditTerm) || 
actions[actions.length-1]
setSelectedDueDays(settings.debt.almostDueDays)
setSelected(foundSelected)
},[])


const handlDue=(item:ActionType)=>{


setSelected(item)

setSelectedDueDays(item.dueDays[1])

}

const handlAboutDue=(item:number)=>{
setSelectedDueDays(item)

}


const handleSettings=async()=>{

  const obj={
    creditTerm:selected?.value,
    almostDueDays:selectedDueDays
  }



  setSettings({debt:obj})

  await saveSettings()
}






useFocusEffect(
  React.useCallback(() => {
    // Screen focused
 

    return () => {
saveSettings()
    };
  }, [])
);

useEffect(()=>{
  handleSettings()

},[selectedDueDays,selected])
const isDark=theme.name==='Black'?true:false
const cardBorderColor=isDark?'grey':theme.lightColor
  return (
    <View style={{width:"100%",flex:1}}>
    
     <BackArrowTitle handleBack={()=>setModal(null)} title='Reminders'/>

   <Text style={[styles.bigLabel,{color:theme.textColor,marginTop:standardMarginVertical}]}>Default Repayment Duration</Text>
 <Text style={{fontSize:bodyExtraSmall,color:theme.darkGreyText,fontFamily:"Poppins-Regular",marginBottom:standardMarginVertical*0.5}}>This is the repayment period applied to all new debts. You can change it anytime</Text>

  <Text style={[styles.label,{color:theme.textColor,}]}>Duration:</Text>
<View style={styles.cardContainer}>

  {
    actions.map((item,index)=>{
      return (
        <Pressable style={[styles.card,{backgroundColor: selected===item? theme.primary:theme.greyText,borderColor: selected===item? cardBorderColor:'transparent'}]} key={index}
        onPress={()=>handlDue(item)}
        >
          
     <Text style={{color: selected===item?'white':theme.textColor}}> {item.title}</Text>
        </Pressable>
      )
    })
  }

</View>
   



      <Text style={[styles.bigLabel,{color:theme.textColor,}]}>Advance Reminder Days</Text>
 <Text style={{fontSize:bodyExtraSmall,color:theme.darkGreyText,fontFamily:"Poppins-Regular",marginBottom:standardMarginVertical*0.5}}>This sets how many days before the due date you want to receive an ‘almost due’ reminder.</Text>

  <Text style={[styles.label,{color:theme.textColor,}]}>Duration:</Text>
<View style={styles.cardContainer}>

  {
    selected?.dueDays.map((item,index)=>{
      return (
        <Pressable style={[styles.card,{backgroundColor: selectedDueDays===item? theme.primary:theme.greyText,borderColor: selectedDueDays===item? cardBorderColor:'transparent'}]} key={index}
        
        onPress={()=>handlAboutDue(item)}
        >
          
     <Text style={{color: selectedDueDays===item?'white':theme.textColor}}> {item} {item>1?'Days':'Day'}</Text>
        </Pressable>
      )
    })
  }

</View>
   




    </View>
  )
}


const styles=StyleSheet.create({
 
cardContainer:{
  width:'100%',
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row",
  flexWrap:"wrap"
},

card:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row",
  height:standardHeightSmall,
  marginRight:"1%",
  borderRadius:RFValue(6),
  borderWidth:3
},

label:{
  fontSize:bodySmall,fontFamily:"Poppins-Medium",marginBottom:standardMarginVertical*0.5,
marginTop:standardMarginVertical*0
},
bigLabel:{
  fontSize:bodyText,fontFamily:"Poppins-Medium",marginBottom:standardMarginVertical*0.5,
  marginTop:standardMarginVertical*5
}

})


export default Reminders