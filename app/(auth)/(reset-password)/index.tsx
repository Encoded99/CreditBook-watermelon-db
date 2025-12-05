
import React from 'react'
import { InnerLayOutWithOutScroll } from '@/components/ui/layout'
import { BackArrow } from '@/components/ui/heading'
import { PasswordModal, PasswordModalType } from '@/components/password'

import {  useRegister } from '@/store/auth'

import { useNavigationFunction } from '@/functions/navigation'



const password = () => {
 

const  {safeRoute}  =useNavigationFunction()
const {setRegisterData}=useRegister()

const firstTrigger=(value:string)=>{
setRegisterData({password:value})
safeRoute('/(auth)/(reset-password)/confirm-password')
}





const firstProp:PasswordModalType={
  trigger:firstTrigger,
 
  title: "Reset Password"

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