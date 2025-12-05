
import React, { useState } from 'react'
import { InnerLayOutWithOutScroll } from '@/components/ui/layout'
import { BackArrow } from '@/components/ui/heading'
import { PasswordModal, PasswordModalType } from '@/components/password'

import { useRegister } from '@/store/auth'
import {  useRouter } from 'expo-router'
import { useNavigationFunction } from '@/functions/navigation'
import { useBusinessFunction } from '@/functions/database/business'
import { LargeLoader } from '@/components/loader'




const password = () => {
const  {createBusiness} =useBusinessFunction()
   const [title,setTitle]=useState<string>("Confirm Password")
   const [isLoading,setIsLoading]=useState<boolean>(false)
const  {dashboardNavigate}  =useNavigationFunction()
  const {registerData}=useRegister()


const secondTrigger=async(value:string)=>{

setIsLoading(true)



setTimeout(async()=>{
  try{


if (value===registerData.password){

  setTitle("Confirmed")
  
  const  response = await createBusiness(registerData)


dashboardNavigate()
}

else{
setTitle("Password Mismatch")
throw Error("Password mismatch");

}





}

catch(err){

}

finally{
  setIsLoading(false)
}

},0)






}




 
const secondProp:PasswordModalType={
  trigger:secondTrigger,

  title

}




  return (
    <>

    <LargeLoader isLoading={isLoading}/>
    <InnerLayOutWithOutScroll>

           
      <BackArrow  />
   <PasswordModal prop={secondProp} />

    </InnerLayOutWithOutScroll>
    </>
  )
}

export default password