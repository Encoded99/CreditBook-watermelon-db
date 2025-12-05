import { View, } from 'react-native'
import React,{useEffect, useState} from 'react'
import { InnerLayOutWithOutScroll } from '@/components/ui/layout'
import { InputField, InputType, SubmitBtn, SubmitBtnType } from '@/components/element'
import { useRouter } from 'expo-router'
import { BackArrow, BoldHeader } from '@/components/ui/heading'
import { useRegister } from '@/store/auth'
import { useNavigationFunction } from '@/functions/navigation'

const index = () => {
  const   {safeRoute}  =useNavigationFunction()
const router=useRouter()
  const [isActive,setIsActive]=useState<boolean>(false)
  const [isSubmitClicked,setIsSubmitClickd]=useState<boolean>(false)
  const {registerData,setRegisterData} =useRegister()



  const handleSubmit=()=>{
    if (!isActive) return
safeRoute('/(auth)/(register)/currency')
  }

const btnProp:SubmitBtnType={
  isActive,
  type:"normal",
  trigger:handleSubmit,
  text:'Continue'

}

const inputParam:InputType={
  label:'Email',
  text:registerData.email,
  setText:(value:string)=>setRegisterData({email:value}),

 isSubmitClicked,
 type:"text",
   placeHolder:registerData.email,
 

}




useEffect(()=>{
  if (registerData.email && registerData.email.length>2){
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
      <BoldHeader text='Enter Email'/>
     <InputField  {...inputParam}/>
      <SubmitBtn prop={btnProp}/>

    </View>
  </InnerLayOutWithOutScroll>
  )
}

export default index