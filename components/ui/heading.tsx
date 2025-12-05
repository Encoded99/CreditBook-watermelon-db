import { useGlobal } from "@/app/context"
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native"
import { bodyText, buttonText, h1, h2, h3, percentagePadding, standardBorderRadius, standardHeightSmall, standardMarginVertical } from "@/custom"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { RFValue } from "react-native-responsive-fontsize"
import { SmallBtn } from "../element"


export const BoldHeader=({text}:{text:string})=>{

 const {theme}= useGlobal()
 return (
  <>
  <Text style={{color:theme.textColor,fontFamily:"Poppins-SemiBold",fontSize:h2,marginVertical:standardMarginVertical,textAlign:'center'}}>{text}</Text>
  </>
 )
}


export const BackArrow=({trigger,}:{trigger?:()=>void})=>{
 const router=useRouter()

 const {theme}= useGlobal()
 const handlePress=()=>{
  if (trigger){
   trigger()
  }

  else{
  router.back()
  }
 }
 return (
  <>
  <View style={{width:'100%',marginVertical:standardMarginVertical}}>
 <Feather size={RFValue(30)} color={theme.textColor} name="arrow-left"
 
 onPress={handlePress}
 />
  </View>

  </>
 )
}









export const ClosePost=({trigger,close,isActive,isLoading,title}:{trigger:()=>void,close:()=>void,isActive:boolean,isLoading:boolean,title:string})=>{

 const {theme}= useGlobal()

const isActiveBorderColor=isActive?theme.primary:theme.secondary
 

 return (
  <>
<View style={[styles.headingClose,{borderBottomColor:theme.name!=='Black'?"#E6E6E6":'grey',paddingHorizontal:percentagePadding,paddingBottom:standardMarginVertical}]}>

  <View style={{width:"50%",flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
     <Feather size={RFValue(30)} color={theme.textColor} name="arrow-left"
 
 onPress={close}
 />

 <Text numberOfLines={1} style={{color:theme.textColor,fontFamily:"Poppins-Medium",fontSize:bodyText,marginLeft:RFValue(6)}}>{title}</Text>
    </View> 


<Pressable  style={[styles.smallBtn,{backgroundColor:isActive? theme.primary:theme.secondary,borderColor:theme.name!=='Black'?isActiveBorderColor:'grey'}]} onPress={trigger}>
  {
    
    isLoading && (
      <>
      <ActivityIndicator size={RFValue(20)} color={'white'}/>
      </>
    )
  }

    {
    !isLoading && (
      <>
  <Text style={[styles.smallBtnText,{color:'white'}]}>Done</Text>
      </>
    )
  }


</Pressable>


  </View>

  </>
 )
}





export const BackArrowTitle=({title,handleBack}:{title:string,handleBack?:()=>void})=>{
 const router=useRouter()

 const {theme}= useGlobal()


const handlePress=()=>{
  if (handleBack){
    handleBack()
  }

  else{
    router.back()
  }
}


 return (
  <>
  <View style={[styles.backTitleContainer,]}>
 <Feather size={RFValue(30)} color={theme.textColor} name="arrow-left"
   onPress={handlePress}
 
 />

 <Text style={{fontFamily:"Poppins-Medium",fontSize:bodyText,color:theme.textColor,marginLeft:RFValue(6)}}>{title}</Text>


  </View>

  </>
 )
}



export const CloseTitle=({title,trigger}:{title:string,trigger:()=>void})=>{
 const router=useRouter()

 const {theme}= useGlobal()





 return (
  <>
  <View style={[styles.closeTitleContainer,{position:"relative"}]}>
 <Feather size={RFValue(30)}  style={{position:"absolute",left:0,}} color={theme.textColor} name="x"
   onPress={trigger}
 
 />

 <Text style={{fontFamily:"Poppins-Medium",fontSize:bodyText,color:theme.textColor,textAlign:"center"}}>{title}</Text>

 
  </View>

  </>
 )
}






const styles=StyleSheet.create({

  backTitleContainer:{
  width:"100%",
  flexDirection:"row",
  justifyContent:"flex-start",
  alignItems:"center",


  },

  
  closeTitleContainer:{
  width:"100%",
  flexDirection:"row",
  justifyContent:"center",
  alignItems:"center",


  },


smallBtnText:{
  fontFamily:"Poppins-Regular",
  color:'white',
  fontSize:buttonText

},

smallBtn:{
  paddingHorizontal:RFValue(10),
  borderWidth:1,

  justifyContent:'center',
  alignItems:'center',
  
  borderRadius:standardBorderRadius,
  marginTop:RFValue(6),
  height:standardHeightSmall,
  flexDirection:"row"
},

headingClose:{
 width:"100%",
 flexDirection:"row",
 justifyContent:'space-between',
 alignItems:'center',
  borderBottomWidth:1,
}
})