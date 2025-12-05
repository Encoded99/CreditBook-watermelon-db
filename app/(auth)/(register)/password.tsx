import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { InnerLayOutWithOutScroll } from '@/components/ui/layout'
import { BackArrow } from '@/components/ui/heading'
import { PasswordModal, PasswordModalType } from '@/components/password'
import { useGlobal } from '@/app/context'
import { captionText, standardMarginVertical } from '@/custom'
import { useAuth, useRegister } from '@/store/auth'
import { useNavigation, useRouter } from 'expo-router'
import { useNavigationFunction } from '@/functions/navigation'



const password = () => {
 

const  {safeRoute}  =useNavigationFunction()
const {setRegisterData}=useRegister()

const firstTrigger=(value:string)=>{
setRegisterData({password:value})
safeRoute('/(auth)/(register)/confirm-password')
}





const firstProp:PasswordModalType={
  trigger:firstTrigger,
 
  title: "Create Password"

}



 





  return (
    <>
    <InnerLayOutWithOutScroll>
           
      <BackArrow  />

              <PasswordModal prop={firstProp} />
    

    </InnerLayOutWithOutScroll>
    </>
  )
}

export default password