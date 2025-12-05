

import { View, Text,StyleSheet, ScrollView, Pressable, Modal,BackHandler} from 'react-native'
import React, { useState,useEffect } from 'react'
import {  InnerLayOutGrey,  } from './ui/layout'
import { useGlobal } from '@/app/context'

import { useAuth, useRegister } from '@/store/auth'
import { CloseTitle } from './ui/heading'
import { bodyExtraSmall, bodySmall, bodyText, h1, h2, percentagePadding,  standardBorderRadiusSmall, standardMarginVertical } from '@/custom'
import { RFValue } from 'react-native-responsive-fontsize'
import { Business } from '@/database/model/business'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { EditBusinessModal } from './ui/modal'






const  MyProfile = ({setShowProfile,showProfile}:{setShowProfile:React.Dispatch<React.SetStateAction<boolean>>,showProfile:boolean}) => {
const   {setRegisterData}  =useRegister()
const  {theme}  =useGlobal()
const  {business} =useAuth()
const [showBusinessEdit,setShowBusinessEdit]=useState<boolean>(false)


const map=[
  {
    title:'Business Name',
    value:business.name,
    
  },

  {
    title:'Email',
    value:business.email
    
  },

  {
    title:'Phone',
    value:business.phone?business.phone:'----'
    
  },

  {
    title:'Currency',
    value:`${business.currency_name}(${business.currency_symbol})`,
    
  },

   {
    title:'Business owner',
    value:business.ownerName?business.ownerName:'----',
    
  },

]


const editProfile=()=>{

setRegisterData({name:business.name,email:business.email, currency_name:business.currency_name,currency_symbol:business.currency_symbol})
 //setShowEdit(true)
setShowBusinessEdit(true)
}






  return (

<>
 <EditBusinessModal  showBusinessEdit={showBusinessEdit} setShowBusinessEdit={setShowBusinessEdit} />
<Modal
     visible={showProfile}
     animationType='slide'
     transparent={false}
       onRequestClose={() => setShowProfile(false)}
    >

<InnerLayOutGrey backGroundColor={theme.backgroundColor}   noPadding={true}>
         <View style={{width:"100%",padding:percentagePadding}}>
   <CloseTitle trigger={()=>setShowProfile(false)} title='Business Profile'/>
            </View>

 <View style={{flex:1,backgroundColor:theme.greyText,paddingHorizontal:percentagePadding}}>
  <ScrollView showsVerticalScrollIndicator={false}>

   <View style={[styles.topBlock,{backgroundColor:theme.backgroundColor}]}>
   
 <View style={[styles.circle,{borderColor:theme.darkGreyText,backgroundColor:theme.greyText}]}>

  <Text style={{color:theme.darkGreyText,fontSize:h1,fontFamily:"Poppins-Medium"}}>{business.name[0].toUpperCase()}</Text>

  <Pressable style={[styles.smallCircle,{backgroundColor:theme.lightColor,borderColor:theme.borderColor}]}
    onPress={editProfile}
  >
    <MaterialCommunityIcons size={RFValue(20)} color={theme.textColor}  name='account-edit'/>

  </Pressable>

    </View>
    
  </View>





 <View style={[styles.bottomBlock,{backgroundColor:theme.backgroundColor}]}>
    <Text style={{fontSize:bodyText,fontFamily:'Poppins-Medium',color:theme.textColor,marginBottom:RFValue(10)}}>Profile Details</Text>

{
  map.map((item)=>{
    return (
<View style={styles.line} key={item.title}>
   <View style={styles.left}>
     <Text numberOfLines={3} style={{color:theme.darkGreyText,fontSize:bodySmall,fontFamily:'Poppins-Regular'}}>
       {item.title}
     </Text>

       </View>
          <View style={styles.right}>
  <Text numberOfLines={3} style={{color:theme.textColor,fontSize:bodySmall,fontFamily:'Poppins-Regular',textAlign:"right"}}>
           {item.value} 
     </Text>

          </View>
      
    </View>
    )
  })
}



    
  </View>

  </ScrollView>



 </View>
          </InnerLayOutGrey>
</Modal>
  


</>

 










    

 
 
 

  )
}


const styles=StyleSheet.create({


circle:{
  width:RFValue(100),
  aspectRatio:1,
  borderRadius:RFValue(100),
  
   justifyContent:"center",
  alignItems:'center',
  position:'relative'

},

smallCircle:{
  width:RFValue(40),
  aspectRatio:1,
  borderRadius:RFValue(40),
 borderWidth:1,
   justifyContent:"center",
  alignItems:'center',
  position:"absolute",
  bottom:'-4%',
  zIndex:1,
  right:"2%"

},



  right:{
     width:'60%',
     alignItems:'flex-end',
     justifyContent:'center'
  },
  left:{
     width:'40%',
     alignItems:'flex-start',
     justifyContent:'center'
  },

line:{
width:'100%',
justifyContent:'space-between',
alignItems:'flex-start',
flexDirection:'row',
marginVertical:standardMarginVertical*1.5
},

  topBlock:{
    width:'100%',
    minHeight:RFValue(200),
    justifyContent:'center',
    alignItems:'center',
    padding:percentagePadding,
    marginBottom:RFValue(20),
    borderRadius:standardBorderRadiusSmall,
        marginTop:RFValue(20),

  },

   bottomBlock:{
    width:'100%',
    minHeight:RFValue(200),
    padding:percentagePadding,
     borderRadius:standardBorderRadiusSmall,
     paddingVertical:RFValue(20),
     marginBottom:standardMarginVertical*6
  }
})

export  default MyProfile