import { View,Text } from 'react-native'
import React,{useEffect, useState} from 'react'
import { InnerLayOutWithOutScroll } from '@/components/ui/layout'
import { InputField, InputType, SubmitBtn, SubmitBtnType } from '@/components/element'
import { BackArrow, BoldHeader } from '@/components/ui/heading'
import { useRegister } from '@/store/auth'
import { openTerms, useNavigationFunction } from '@/functions/navigation'
import { useGlobal } from '@/app/context'
import { bodySmall } from '@/custom'

const index = () => {
  const   {safeRoute}  =useNavigationFunction()
const   {theme}=useGlobal()
  const [isActive,setIsActive]=useState<boolean>(false)
  const [isSubmitClicked,setIsSubmitClickd]=useState<boolean>(false)
  const {registerData,setRegisterData} =useRegister()



   const handleSubmit=()=>{
    if (!isActive) return
safeRoute('/(auth)/(register)/email')
  }

const btnProp:SubmitBtnType={
  isActive,
  type:"normal",
  trigger:handleSubmit,
  text:'Continue'

}






const inputParam:InputType={
  label:'Business Name',
  text:registerData.name,
  setText:(value:string)=>setRegisterData({name:value}),

 isSubmitClicked,
 type:"text",
   placeHolder:registerData.name,
 

}




useEffect(()=>{
  if (registerData.name && registerData.name.length>2){
    setIsActive(true)
  }

  else{
    setIsActive(false)
  }
},[registerData])

  return (
  <InnerLayOutWithOutScroll>
    <View style={{flex:1,}}>
      <BackArrow/>
      <BoldHeader text='Enter Business Name'/>
     <InputField  {...inputParam}/>
      <SubmitBtn prop={btnProp}/>
    <Text style={{color:theme.textColor,fontSize:bodySmall,textAlign:"center",fontFamily:"Poppins-Regular"}}>By continuing, you accept our <Text style={{color:theme.indicatorColor,fontSize:bodySmall,fontFamily:"Poppins-Medium"}} onPress={openTerms}>Terms and Conditions</Text>.</Text>
    </View>
  </InnerLayOutWithOutScroll>
  )
}

export default index