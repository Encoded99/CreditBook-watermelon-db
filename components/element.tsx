
import React, { ComponentProps,  useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput,  View } from 'react-native';
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobal } from '@/app/context';
import { RFValue } from 'react-native-responsive-fontsize';
import { bodySmall, bodyText, buttonText, captionText, standardBorderRadius, standardBorderRadiusSmall,  standardHeight,  standardHeightSmall, standardMarginVertical } from '@/custom';
import { currencies, Currency,  } from '@/store/auth';
import { CurrencyPicker, CurrencyPickerType } from './currency';




export type IconComponentType = ComponentProps<typeof MaterialCommunityIcons>["name"];

export type SubmitBtnType={
 text:string,
 trigger:()=>void,
 icon?:IconComponentType,
 type:"normal"|"white"|"danger",
 isActive:boolean,

}





export const SubmitBtn=({prop}:{prop:SubmitBtnType})=>{
const {theme}= useGlobal()
const  {type,isActive,icon,text,trigger}   =prop

  const btnColor=type==='white'? 'black' : 'white'
  const btnBackGround=type==='normal' ?theme.primary:type==='danger' ?'red':theme.backgroundColor
  const lightColor=type==='normal' ?theme.secondary:type==='danger' ?'#F08080':theme.backgroundColor

  const handlePress=()=>{
    
    trigger()
  }


  return (
    <>

    < Pressable style={[styles.submitBtn,{backgroundColor:isActive? btnBackGround:lightColor,borderColor:theme.name==='Black'?  'grey':'transparent'}]} onPress={handlePress}>
         
         {
          icon && (
            <>
             <MaterialCommunityIcons size={RFValue(20)} color={btnColor} name={icon}/>
            </>
          )
         }

        
     
          <Text style={[styles.btnText,{color:btnColor}]}>
            {text}
          </Text>
    </Pressable>
    
    </>
  )

}



export const SmallBtn=({text,trigger,icon,}:{text:string,trigger:()=>void,icon?:IconComponentType,})=>{
const {theme}= useGlobal()

  

  const handlePress=()=>{
    
    trigger()
  }


  return (
    <>

<Pressable  style={[styles.smallBtn,{backgroundColor:theme.primary,borderColor:theme.name!=='Black'?theme.primary:'grey'}]} onPress={handlePress}>

   {
          icon && (
            <>
             <MaterialCommunityIcons size={RFValue(20)} color={'white'} name={icon}/>
            </>
          )
         }

  <Text style={[styles.smallBtnText,{color:'white'}]}>{text}</Text>
</Pressable>


 
    </>
  )

}






export const CurrencyBtn=()=>{
const {theme}= useGlobal()
const [isVisible,setIsVisible]= useState<boolean>(false)
const [selectedCurrency,setSelectedCurrency]= useState<Currency>(currencies[0])


  
const btnParams:CurrencyPickerType={
  isVisible,
  setIsVisible,
  setSelectedCurrency,
  selectedCurrency
}



  


  return (
    <>
    <CurrencyPicker {...btnParams}/>

    < Pressable style={[styles.submitBtn,{backgroundColor:theme.greyText,borderColor:theme.name==='Black'?"grey":"transparent"}]} onPress={()=>setIsVisible(true)}>
         
       
        
     
          <Text style={[styles.btnText,{color:theme.textColor,marginRight:'4%'}]}>
            {selectedCurrency.name} ({selectedCurrency.symbol})
          </Text>
          <Feather name='chevron-down' size={RFValue(20)} color={theme.textColor}/>
    </Pressable>
    
    </>
  )

}







export type InputType={
  label:string,
  text:string,
  setText:(value:string)=>void,
 isSubmitClicked:boolean,
 type:"email"|"text"|"number",
   placeHolder?:string,
 

}


export   const emailRegex = /^\S+@\S+\.\S+$/;


export const InputField=React.memo((params:InputType)=>{
  const {theme}= useGlobal()
 
  const {text,label,setText,type,isSubmitClicked,placeHolder}=params
  const isEmailFormat=emailRegex.test(text);
 






  



  

  return(
    <>

    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel,{color:theme.darkGreyText,}]}>{label}</Text>
       <View style={{width:"100%",position:"relative"}}>

       

       <TextInput style={[styles.textInput,{borderColor:theme.greyText,backgroundColor:theme.greyText,color:theme.textColor}]}
           value={text}
          onChangeText={(value) => setText(value)}
         placeholderTextColor={theme.textColor}
          placeholder={placeHolder?placeHolder:''}
           /> 
 

    
      

     
       </View>
      
   

       



             {
               isSubmitClicked && type==='email' && text!=='' && !isEmailFormat &&    (
                <>
                 <View style={styles.emptyFieldContainer}>
      <MaterialCommunityIcons color='red' size={RFValue(18)} name='alert-circle-outline'/>
     <Text style={styles.warningText}>Please enter a valid email address</Text>
       </View>
                </>
               )
            }



             


       <View>

       </View>


    
    </View>
    </>
  )
})


export const LineInputField=React.memo((params:InputType)=>{
  const {theme}= useGlobal()
 
  const {text,label,setText,type,isSubmitClicked,placeHolder}=params
  const isEmailFormat=emailRegex.test(text);
 






  



  

  return(
    <>

    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel,{color:theme.darkGreyText,marginBottom:0}]}>{label}</Text>
       <View style={{width:"100%",position:"relative"}}>

       

       <TextInput style={[styles.lineInput,{borderBottomColor:theme.greyText,color:theme.textColor}]}
          keyboardType={type==="number"?"numeric":"default"}
           value={text}
          onChangeText={(value) => setText(value)}
         placeholderTextColor={theme.textColor}
          placeholder={placeHolder?placeHolder:''}
           /> 
 

    
      

     
       </View>
      
   

       



             {
               isSubmitClicked && type==='email' && text!=='' && !isEmailFormat &&    (
                <>
                 <View style={styles.emptyFieldContainer}>
      <MaterialCommunityIcons color='red' size={RFValue(18)} name='alert-circle-outline'/>
     <Text style={styles.warningText}>Please enter a valid email address</Text>
       </View>
                </>
               )
            }



             


       <View>

       </View>


    
    </View>
    </>
  )
})



export const NoteField=React.memo((params:InputType)=>{
  const {theme}= useGlobal()
 
  const {text,label,setText,type,isSubmitClicked,placeHolder}=params
  const isEmailFormat=emailRegex.test(text);
 






  



  

  return(
    <>

    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel,{color:theme.darkGreyText}]}>{label}</Text>
       <View style={{width:"100%",position:"relative"}}>

       

       <TextInput style={[styles.largeInput,{borderColor:theme.greyText,backgroundColor:theme.greyText,color:theme.textColor,height:standardHeight*3,textAlignVertical:'top'}]}


   
            multiline={true}
            numberOfLines={4}
           value={text}
          onChangeText={(value) => setText(value)}
         placeholderTextColor={theme.textColor}
          placeholder={placeHolder?placeHolder:''}
           /> 
 

    
      

     
       </View>
      
   

       



             {
               isSubmitClicked && type==='email' && text!=='' && !isEmailFormat &&    (
                <>
                 <View style={styles.emptyFieldContainer}>
      <MaterialCommunityIcons color='red' size={RFValue(18)} name='alert-circle-outline'/>
     <Text style={styles.warningText}>Please enter a valid email address</Text>
       </View>
                </>
               )
            }



             


       <View>

       </View>


    
    </View>
    </>
  )
})






const styles=StyleSheet.create({


smallBtnText:{
  fontFamily:"Poppins-Regular",
  color:'white',
  fontSize:buttonText

},



smallBtn:{
  paddingHorizontal:RFValue(25),
  borderWidth:1,

  justifyContent:'center',
  alignItems:'center',
  
  borderRadius:standardBorderRadius,
  marginTop:RFValue(6),
  height:standardHeightSmall,
  flexDirection:"row"
},


   submitBtn:{
    width:"100%",
   
    height:standardHeightSmall,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:standardBorderRadius,
    flexDirection:"row",
    borderWidth:1,
     marginVertical:standardMarginVertical*3
    
  },

    btnText:{

    fontSize:buttonText,
    marginLeft:4,
    fontWeight:600

  },

  emptyFieldContainer:{
    width:'100%',
    flexDirection:'row',
    alignItems:"center",
    marginTop:6
  },
   warningText:{
    fontFamily:"Poppins-Regular",color:'red',fontSize:captionText,marginLeft:5
  },

   textInput:{
    width:"100%",
    borderRadius:standardBorderRadiusSmall,
    borderWidth:1,
       height:standardHeightSmall,
       padding:8,
       fontSize:bodySmall,
       fontFamily:'Poppins-Regular',
       textAlignVertical: "center",   
  },

     lineInput:{
    width:"100%",

    borderBottomWidth:1,
       height:standardHeightSmall,
       fontSize:bodySmall,
       fontFamily:'Poppins-Regular',
       textAlignVertical: "center",   
  },



   largeInput:{
    width:"100%",
    borderRadius:standardBorderRadius*0.5,
    borderWidth:1,
       height:standardHeight*4,
       padding:8,
       fontSize:RFValue(16),
       fontFamily:'Poppins-Regular',
       textAlignVertical: "center", 
      
       
  },

   inputLabel:{
   fontSize:bodySmall,
    marginBottom:10,
  },
inputContainer:{
    width:'100%',
    alignSelf:"center",
    marginVertical:standardMarginVertical
   
  },
})