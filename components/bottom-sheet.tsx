


import { View, Text,Modal,Pressable,StyleSheet,Dimensions } from 'react-native'
import React from 'react'

import { useGlobal } from '@/app/context';
import { standardBorderRadius } from '@/custom';
import { RFValue } from 'react-native-responsive-fontsize';


const {height,width}=Dimensions.get('window')
export type BottomType={
 showBottom:boolean,
 setShowBottom:React.Dispatch<React.SetStateAction<boolean>>
}

const BottomComponent = ({children,param}:{children:React.ReactNode,param:BottomType}) => {

 const   {showBottom,setShowBottom,}    =param
const   {theme} =useGlobal()


const handlePress=()=>{

}

  return (
   
      <Modal
          visible={showBottom}
          animationType='none'
          transparent={true}
         >

      <Pressable style={styles.responseOverlay} onPress={()=>setShowBottom(false)}>
 <Pressable style={[styles.modal,{backgroundColor:theme.backgroundColor}]}
 onPress={handlePress}
 >
       {children}

      </Pressable>

      </Pressable >

     


         </Modal>

   
  )
}


const styles=StyleSheet.create({

  responseOverlay:{
  width:width,

  height:'100%',
  justifyContent:"flex-end",
  

 },

 modal:{
  width:"100%",
  height:RFValue(400),
  borderTopLeftRadius:standardBorderRadius,
  borderTopRightRadius:standardBorderRadius,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,

  // --- Android shadow (elevation always casts downward,
  // so we fake top shadow by adding padding & overlay later if needed)
  elevation: 12,
  overflow: "visible",
 }

})



export default BottomComponent