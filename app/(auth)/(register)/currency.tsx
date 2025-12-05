import { View, } from 'react-native'
import React,{useEffect, useState} from 'react'
import { InnerLayOutWithOutScroll } from '@/components/ui/layout'
import { CurrencyBtn, InputField, InputType, SubmitBtn, SubmitBtnType } from '@/components/element'
import { useRouter } from 'expo-router'
import { BackArrow, BoldHeader } from '@/components/ui/heading'
import { useRegister } from '@/store/auth'
import { useNavigationFunction } from '@/functions/navigation'

const index = () => {
  const   {safeRoute}  =useNavigationFunction()
const router=useRouter()
  const [isActive,setIsActive]=useState<boolean>(true)
  
  const {registerData,setRegisterData} =useRegister()


const handlePress=()=>{
  safeRoute('/(auth)/(register)/password')
}


const btnProp:SubmitBtnType={
  isActive,
  type:"normal",
  trigger:handlePress,
  text:'Continue'

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
      <BoldHeader text='Select Currency'/>
    <CurrencyBtn/>
      <SubmitBtn prop={btnProp}/>

    </View>
  </InnerLayOutWithOutScroll>
  )
}

export default index