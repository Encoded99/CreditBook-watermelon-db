import { View, StatusBar, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect ,useState} from 'react'
import { useGlobal } from './context'

import { database } from '@/database';
import { Business } from '@/database/model/business';
import { useRouter } from 'expo-router';
import {useFonts} from '../fontConfig'
import { useNavigationFunction } from '@/functions/navigation';
import { useAuth } from '@/store/auth';
import { LargeLoader } from '@/components/loader';
import { InnerLayOutWithOutScroll } from '@/components/ui/layout';
import { PasswordModal, PasswordModalType } from '@/components/password';
import * as SecureStore from 'expo-secure-store';
import SwirlLoader from '@/components/swirl';
import * as Updates from 'expo-updates';
import Caption from '@/components/forgot-password';
import { isProduction, standardMarginVertical } from '@/custom';
import { useBusinessFunction } from '@/functions/database/business';
import * as Notifications from 'expo-notifications';
import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';
import { fetchReminders } from '@/functions/database/reminder';
import { useSettings } from '@/store/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,  // show banner in foreground
    shouldShowList: true,    // show in notification center
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const REMINDER_TASK = 'reminder-task';

TaskManager.defineTask(REMINDER_TASK, async () => {
  try {
   
    await fetchReminders()
  } catch (error) {
    console.error('Failed to execute the background task:', error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
  return BackgroundTask.BackgroundTaskResult.Success;
});

async function registerReminderTaskAsync() {
  return BackgroundTask.registerTaskAsync(REMINDER_TASK);
}




async function unregisterBackgroundTaskAsync() {
  return BackgroundTask.unregisterTaskAsync(REMINDER_TASK);
}




const index = () => {

   const [isSettingsLoaded,setIsSettingsLoaded]=useState<boolean>(false)
     const [isLoading,setIsLoading]=useState<boolean>(false)
      const [title,setTitle]=useState<string>("Enter your Unlock Code")
      const [hashedPassword,setHashedPassword]=useState<string>("")
          const [storedPassword,setStoredPassword]=useState<string>("")
          const  {businessToData}  =useBusinessFunction()
  const     {theme,setTheme} = useGlobal()
  const    {setSettings}   =useSettings()
  const   {dashboardNavigate} =useNavigationFunction()
  const    {setBusiness,business}=useAuth()
     const {fontLoaded}       =useFonts()
  const router= useRouter()


const checkBusiness=async()=>{

  




  try{
      const businessesCollection= await database.collections.get<Business>('businesses')
const allBusinesses = await businessesCollection.query().fetch();
      if (allBusinesses.length>0){
       const businessGotten= allBusinesses[0]

     // setMetrics({totalDebt:gottenMetrics.totalDebt})


             setHashedPassword(businessGotten.password)
        const storedSecurePin=   await SecureStore.getItem('secure-pin')

        
     if (storedSecurePin){
      setStoredPassword(storedSecurePin)
     }
       setBusiness(businessToData(businessGotten))
//router.push('/(auth)/(reset-password)')
//router.push('/(secure)/transaction')
 //router.push('/(auth)') 

router.push('/(secure)/(tabs)')


 
      }
      else{

//router.push('/(secure)/(tabs)')


const isOnboarded= await AsyncStorage.getItem('onboard')
if(!isOnboarded){
router.push('/(auth)/onboard')
}

else{
  router.push('/(auth)/(register)')
}

      

      }

  }

  catch(err){
console.log('check buseis erroro', err)
  }
}


const checkAndUpdate = async () => {



  try {
    if (isProduction ) {
   
       const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } 
    }





  
  } catch (error) {
    console.log('Update check failed:', error);
  
  } finally {
  
    
 
  }
};






useEffect(()=>{
  const t= setTimeout(() => {
    
   checkBusiness() 
    checkAndUpdate()

  },1000);

return ()=>clearTimeout(t)
},[])






  


 

useEffect(() => {
    registerReminderTaskAsync();
  }, []);



const LogIn=async(value:string)=>{




try{



  if (!storedPassword){
setIsLoading(true)

setTimeout(async()=>{



if (value===hashedPassword){
   dashboardNavigate()
}

else{
  setTitle('Incorrect code')
  throw Error('Incorrect password')
}

},0)



   


  }

  else{
   if(storedPassword===value){
 dashboardNavigate()
   }

   else{
  setTitle('Incorrect code')
  throw Error('Incorrect password')
}


  }



}

catch(err){

}

finally{
  setIsLoading(false)
}



  //setRegisterData({password:value})

}


const passwordProp:PasswordModalType={
  trigger:LogIn,
  title,
  Caption

}


const loadSettings=async()=>{
  try{

    const   storedSettings= await AsyncStorage.getItem('settings')
     const   storedTheme= await AsyncStorage.getItem('theme')    

if (storedSettings){
setSettings(JSON.parse( storedSettings))
}

if(storedTheme){
  setTheme(JSON.parse(storedTheme))
}


  }
  catch(err){

  }
  finally{
    setIsSettingsLoaded(true)
  }
}




useEffect(() => {

loadSettings()

    const getPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();

      if (status !== "granted") {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        console.log("Notification permission:", newStatus);
      }
    };

    getPermissions();
  }, []);








  



if (!isSettingsLoaded || !fontLoaded){
  return (
    <>
    <View>

    </View>
    </>
  )
}









if (business.name && isSettingsLoaded && fontLoaded){
  return (
    <>
      <LargeLoader isLoading={isLoading}/>
          <InnerLayOutWithOutScroll>
     
                 
            <View style={{width:'100%',flex:1,paddingTop:standardMarginVertical*2}}>
<PasswordModal prop={passwordProp} />
  </View>
         
      
          </InnerLayOutWithOutScroll>
    </>
  )
}



  return (
     <SafeAreaView style={{flex: 1,
          backgroundColor:theme.backgroundColor,justifyContent:"center",alignItems:'center'}}>
         
              <StatusBar
                    barStyle="dark-content"
                    backgroundColor={theme.backgroundColor}  
                  />


      <SwirlLoader/>



        

          </SafeAreaView>
  )
}

export default index