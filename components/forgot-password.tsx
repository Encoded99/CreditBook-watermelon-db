
import { useGlobal } from "@/app/context"
import { Text } from "react-native"
import { captionText,standardMarginVertical } from "@/custom"
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigationFunction } from "@/functions/navigation";


const Caption=()=>{
  const   {theme} =useGlobal()
const  {safeRoute}  =useNavigationFunction()



  async function authenticateUser() {
  // Check if device supports biometric
  const compatible = await LocalAuthentication.hasHardwareAsync();
  if (!compatible) {
    console.log("Device not compatible");
    return false;
  }

  // Check if there is any enrolled (fingerprint, face, pattern)
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  if (!enrolled) {
    console.log("No biometric enrolled");
    return false;
  }

  // Authenticate
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Confirm it's you",
    fallbackLabel: "Use Passcode",
    disableDeviceFallback: false,
  });


if (result.success===true){

safeRoute('/(auth)/(reset-password)')

}

}



  return (
    <>
     <Text style={{color:theme.indicatorColor,fontSize:captionText,fontFamily:"Poppins-Regular",marginTop:standardMarginVertical*4}}
     
     onPress={authenticateUser}
     
     >
  Forgot Password?
</Text>

    </>
  )
}

export default  Caption