
import { useAuth } from "@/store/auth"
import { useGlobal } from "@/app/context";
import { StyleSheet,View,Modal,Dimensions,Pressable,Text, } from 'react-native';

import { Feather,  } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import React,{useEffect} from 'react'
import { bodySmall, bodyText, h3 } from "@/custom";
import { SmallBtn } from "./element";


const {height,width}=Dimensions.get('window')

export const ResponseModal=()=>{
const {theme}=useGlobal()
 const  {responseMessage,setResponseMessage,isError,setIsError} = useAuth()
const isMessage=responseMessage!==''?true:false



useEffect(()=>{

 const t= setTimeout(() => {
   setResponseMessage('')
   setIsError(false)
 
 },1500);


 return ()=>clearTimeout(t)

},[])



 return (
  <>

   <Modal
       visible={isMessage}
       animationType='none'
       transparent={true}
      >
<Pressable style={styles.responseOverlay} onPress={()=>setResponseMessage('')}>

 <View style={[styles.responseModal,{backgroundColor:theme.backgroundColor,borderLeftColor: theme.name!=='Black'?theme.primary:'grey',borderColor: theme.name!=='Black'?theme.backgroundColor:'grey',borderWidth:1}]}>
 <View style={styles.innerModal}>
    <View style={styles.logoContainer}>
   <Feather  color={isError?'red':'green'} size={RFValue(20)} name='alert-circle'/>
    </View>
 
        <View style={{width:"70%"}}>
  <Text style={{color:theme.textColor,fontFamily:'Poppins-Regular',fontSize:bodySmall}}>{responseMessage}</Text>
        </View>
  
  <Pressable style={styles.logoContainer} onPress={()=>setResponseMessage('')}>
    <Feather color={theme.textColor} size={RFValue(20)} name='x'/>
    </Pressable>
    
 </View>
 </View>

</Pressable>

      </Modal>
  </>
 )
}





type EmptyType={
 
  content?:string,
  action?:()=>void,
  actionText?:string,
}



export const EmptyData=(params:EmptyType)=>{
  const {content,action,actionText}=params
  const {theme}=useGlobal()

  const handlePress=()=>{
      if (action){
     action()
      }
 
    
  }

  const text =actionText?actionText:"Click"
  return (
    <>

    <View style={styles.emptyContainer}>

      
  <Text style={[styles.noDataText,{color:theme.textColor}]}>{content?content:'No Data'}</Text>


{
  action && (
    <>

    <SmallBtn trigger={handlePress}   text={text} />

    </>
  )
}




 
    </View>
    
    </>
  )
}









const styles=StyleSheet.create({




emptyContainer:{
  width:"100%",
  justifyContent:"center",
  paddingVertical:RFValue(30),
  alignItems:"flex-start"

},
noDataHeader:{
  fontFamily:'Poppins-Bold',
  fontSize:h3,
  
},
noDataText:{
  fontFamily:'Poppins-Regular',
  fontSize:bodySmall,
  textAlign:"left",
  marginVertical:RFValue(5)
},









   logoContainer:{
  width:"15%",
    justifyContent:'center',
  alignItems:'center',
 },
 responseModal:{
   width:'90%',
   alignSelf:'center',
   borderRadius:6,
  minHeight:RFValue(70),
   marginTop:'15%',
    shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  borderLeftWidth:12,

  flexDirection:'row',
  justifyContent:'flex-end'

 },
 innerModal:{
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  width:'98%',
  paddingVertical:10

 },

  responseOverlay:{
  width:width,

  height:height,

 },

})