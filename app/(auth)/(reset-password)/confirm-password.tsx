
import React, {  useState } from 'react'
import { InnerLayOutWithOutScroll } from '@/components/ui/layout'
import { BackArrow } from '@/components/ui/heading'
import { PasswordModal, PasswordModalType } from '@/components/password'

import { useRegister } from '@/store/auth'
import { useNavigationFunction } from '@/functions/navigation'
import { useBusinessFunction } from '@/functions/database/business'
import { LargeLoader } from '@/components/loader'





const password = () => {
const  {updatePassword} =useBusinessFunction()
   const [title,setTitle]=useState<string>("Confirm Password")
   const [isLoading,setIsLoading]=useState<boolean>(false)
const  {dashboardNavigate}  =useNavigationFunction()
  const {registerData,setRegisterData}=useRegister()


const secondTrigger = (value: string) => {
  // flip loading state right away
  setIsLoading(true);
  

  // yield back to React before async work
  setTimeout(async () => {
    try {
      if (value === registerData.password) {
        setTitle("Password Changed");

        const response = await updatePassword(value);

        setRegisterData({ password: "" });

        dashboardNavigate();
      } else {
        setTitle("Password Mismatch");
        throw Error("Password mismatch");
      }
    } catch (err) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  }, 0); // <-- the setTimeout goes here
};




 
const secondProp:PasswordModalType={
  trigger:secondTrigger,
  setIsLoading,
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