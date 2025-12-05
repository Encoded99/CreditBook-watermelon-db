


import { View, Text,Modal,StyleSheet,Dimensions,} from 'react-native'
import React from 'react'
import { useSettings } from "@/store/settings"
import { useGlobal } from '@/app/context';
import { percentagePadding, standardBorderRadius } from '@/custom';

import { useSafeAreaInsets } from 'react-native-safe-area-context';


const {width}=Dimensions.get('window')
export type BottomType={
 showBottom:boolean,
 setShowBottom:React.Dispatch<React.SetStateAction<boolean>>
}

const SettingsModal= () => {

 const    {modal,setModal}  =useSettings()
const   {theme} =useGlobal()
const show =modal?true:false


const insests= useSafeAreaInsets()

  return (
   
      <Modal
          visible={show}
          animationType='none'
          transparent={true}
          onRequestClose={() =>setModal(null)}
         >

    
 <View style={[styles.modal,{backgroundColor:theme.backgroundColor,paddingTop:insests.top*1.2}]}

 >


  {modal}
 
     

      </View>

    

     


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
  height:'100%',
  borderTopLeftRadius:standardBorderRadius,
  borderTopRightRadius:standardBorderRadius,
 paddingHorizontal:percentagePadding
 
 }

})



export default SettingsModal