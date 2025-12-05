import { useGlobal } from "@/app/context"
import { standardHeight, standardHeightSmall } from "@/custom"
import { Feather } from "@expo/vector-icons"
import { StyleSheet, View,TextInput, Pressable } from "react-native"

import { RFValue } from "react-native-responsive-fontsize"


export type SearchFieldType={
 searchText:string,
 setSearchText:React.Dispatch<React.SetStateAction<string>>
 setIsSearched:React.Dispatch<React.SetStateAction<boolean>>,
 placeHolder:string,
 stable?:boolean

}




export const SearchField=({param}:{param:SearchFieldType})=>{

 const  {searchText,setSearchText,setIsSearched,placeHolder,stable}  =param
 const   {theme} =useGlobal()


 return (
  <>
  <View  style={[styles.searchContainer,{borderColor:theme.darkGreyText}]}>

    
{
  stable && (
    <>
      <Pressable style={styles.leftBlock}
   
    >
       <Feather  size={RFValue(20)} color={theme.darkGreyText}   name= {'search'}/>
   </Pressable>
    </>
  )
}

{
  !stable && (
    <>
      <Pressable style={styles.leftBlock}
     onPress={()=>{
       if (!searchText) return
      setIsSearched(false)}}
    >
       <Feather  size={RFValue(20)} color={theme.darkGreyText}   name= {searchText?'arrow-left':'search'}/>
   </Pressable>
    </>
  )
}

  

  
  
   <TextInput   onChangeText={(value)=>setSearchText(value)}  value={searchText} style={[styles.input,{color:theme.textColor}]}
    placeholder={placeHolder}
     placeholderTextColor={theme.textColor}
    />

   <Pressable style={[styles.rightBlock,]}
     onPress={()=>{
      if (!searchText){
       setIsSearched(false)
       return
      }
      setSearchText('')}}
   >
       <Feather  size={RFValue(20)} color={theme.darkGreyText}   name="x"/>
   </Pressable>

  </View>
  </>
 )
}


const styles=StyleSheet.create({
 searchContainer:{
  width:"100%",

  alignItems:'center',
  justifyContent:"center",
  flexDirection:'row',
  height:standardHeight,
   borderWidth:1,
borderRadius:standardHeight/2
 },


 
 rightBlock:{
  width:'10%',
  justifyContent:"center",
  alignItems:"flex-start",
  height:"100%",
  
 },
 leftBlock:{
  width:'10%',
  justifyContent:"center",
  alignItems:"flex-end",
  height:"100%",

  
 },
 input:{
  width:"80%",
  height:"100%",
 

 }
})