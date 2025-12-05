import { useGlobal } from "@/app/context"
import { initialCustomData, useAuth, useRegister } from "@/store/auth"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { StyleSheet, TouchableOpacity } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const AddBtn=({bottom}:{bottom?:number})=>{
const    {setCustomerData}   = useRegister()
const   {theme}=useGlobal()

const  {setShowAddCustomer} =useAuth()


const handlePress=()=>{
  setCustomerData(initialCustomData)
   setShowAddCustomer(true)
}

return(
 <>


<TouchableOpacity style={[styles.addContainer,{bottom:bottom?bottom:'8%',backgroundColor:theme.primary,borderColor:theme.name!=='Black'?theme.primary:'grey'}]} onPress={handlePress}
  
>
  <Feather size={RFValue(30)} name="plus" color={'white'}/>

   

  </TouchableOpacity>







 
 </>
)


}


const styles= StyleSheet.create({
  addContainer:{
  position:"absolute",
  aspectRatio:1,
 
  height:RFValue(50),
  justifyContent:"center",
  alignItems:'center',
  borderWidth:1,
  right:'3%',
  borderRadius:RFValue(50),
  zIndex:1
},


})