import { useSettings } from "@/store/settings"
import AsyncStorage from "@react-native-async-storage/async-storage"




export const saveSettings=async()=>{
 try{
 
const settings=useSettings.getState()
   await AsyncStorage.setItem('settings',JSON.stringify(settings.settings))



  
 }

 catch{

 }
}