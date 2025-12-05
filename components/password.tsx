
import { useGlobal } from "@/app/context"
import { bodyText, standardMarginVertical } from "@/custom"
import { Feather } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export type PasswordModalType={
 trigger:(value:string)=>void,
 Caption?:React.FC,
 title:string,
 setIsLoading?:React.Dispatch<React.SetStateAction<boolean>>

}


export const PasswordModal=({prop}:{prop:PasswordModalType})=>{
 const  {Caption,trigger,title,setIsLoading}  =prop
    const  {theme} =useGlobal()
  const  [password,setPassword]=useState<string>('')


const numbers=['1','2','3','4','5','6','7','8','9','#','0','cancel']

const handlePress=(value:string)=>{



 if (value==='cancel' && password.length>0){

  password.slice(0,-1)
  setPassword(password.slice(0,-1))
  return
 }





 if (password.length===4 || value==='cancel') return
setPassword((prev)=>prev+value)



}


useEffect(()=>{

 
//console.log(password.length,'pasword')
 if (password.length===4){

  
  trigger(password)
 }

},[password])










 return (
  <>
  <View style={{flex:1}}>
   <View style={{justifyContent:"center",alignItems:"center"}}>
<View style={[styles.keyContainer,{backgroundColor:theme.lightColor}]}>
    <Feather color={theme.indicatorColor} size={RFValue(30)} name="key"/>
   </View>

   <Text style={[styles.title,{color:theme.textColor}]}>{title}</Text>

   <View style={styles.dotContainer}>
{
    Array.from({length:4}).map((item,index)=>{
     return (
      <View style={[styles.dot,{backgroundColor:index<password.length?theme.indicatorColor:theme.greyText}]} key={index}>
       </View>
     )
    })
   }
   </View>
   
   </View>

   <View style={{alignItems:"center",}}>


    <View style={styles.btnContainer}>

     {
      numbers.map((item,index)=>{
       return (
          <TouchableOpacity style={[styles.btn,{backgroundColor:theme.name!=='Black'?theme.greyText:theme.secondary}]}
          key={index}
          onPress={()=>handlePress(item)}
          >
      {
       item!=='cancel' && (
        <>
         <Text style={[styles.btnText,{color:theme.textColor,fontSize:RFValue(20)}]}>{item}</Text>
        </>
       )
      }

      {
       item==='cancel' && (
        <>
      <Feather name="x-square" size={RFValue(30)} color={theme.textColor} />
        </>
       )
      }


      
     </TouchableOpacity>
       )
      })
     }


    </View>


{
 Caption && (
  <>
    <Caption />   
  </>
 )
}
  

   

   </View>
   

  </View>
  
  </>
 )
}


const styles=StyleSheet.create({
keyContainer:{
 justifyContent:"center",
 alignItems:"center",
 padding:RFValue(10),
 width:"20%",
 aspectRatio:1

},
title:{
 fontFamily:"Poppins-Regular",
 fontSize:bodyText,
 marginVertical:standardMarginVertical*3,
 textAlign:'center'

},
dotContainer:{
 width:"50%",
 justifyContent:"space-around",
 alignItems:"center",
 flexDirection:"row"
},
dot:{
 height:RFValue(15),
 width:RFValue(15),
 borderRadius:RFValue(15)
},
btnContainer:{
 width:"80%",
 justifyContent:"space-between",
 flexWrap:"wrap",
 alignItems:"center",
 flexDirection:"row",

marginTop:standardMarginVertical*3,

},
btn:{
 justifyContent:"center",
 alignItems:"center",
 height:RFValue(70),
 aspectRatio:1,
 borderRadius:RFValue(70),
 marginBottom:standardMarginVertical
},
btnText:{
 fontFamily:"Poppins-Regular",

}
})