import { View, Text, Pressable, StyleSheet,Share, Image,Linking,Alert } from 'react-native'
import React, { useState } from 'react'
import { bodyExtraSmall, bodySmall, bodyText,  h3, percentagePadding, standardHeightSmall, standardMarginVertical, title } from '@/custom'
import { useBusinessFunction } from '@/functions/database/business'

import { InnerLayOut } from '@/components/ui/layout'
import { useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { useAuth } from '@/store/auth'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MyProfile from '@/components/business-profile'
import { useSettings } from '@/store/settings'
import ComingSoon from '@/components/coming-soon'
import SettingsModal from '@/components/settings/settings-modal'
import Alerts from '@/components/settings/alerts'
import Reminders from '@/components/settings/reminder'
import DeleteDataWarning from '@/components/settings/delete'
import Theme from '@/components/settings/theme'
import FAQ from '@/components/settings/about'
import { openTerms } from '@/functions/navigation'
import { CloseTitle } from '@/components/ui/heading'
type FeatherIconName = React.ComponentProps<typeof Feather>['name']
const index = () => {
  const  {setModal}   =useSettings()
  const  {clearDatabasePermanently} =useBusinessFunction()
const    {theme}  =useGlobal()
const    {business}   =useAuth()
 const [showProfile,setShowProfile]=useState<boolean>(false)


 interface SettingsLink {
  header: string;
  trigger: () => void;
  icon: FeatherIconName; // You can later restrict this to actual Feather icon names
}
interface SettingsSection {
  header: string;
  link: SettingsLink[];
}






 async function shareApp() {
  try {
    const message = 
      `Hi! I’m using this debt management app ${title} to track who owes me and when they are due. " +
      "It’s simple, fast, and helps me stay organized.\n\n" +
      "Download it here: https://ivify.com.ng`;

    await Share.share({ message });
  } catch (error) {
    console.log("Share error:", error);
  }
}




  const openWhatsApp = async () => {
const message='Hi, I need some help or have a question about CreditBook.'
const supportNumber = '+2349131425976'; 

    const url = `https://wa.me/${supportNumber.replace(
      /[^\d]/g,
      ''
    )}?text=${encodeURIComponent(message)}`;
    
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        'WhatsApp not installed',
        'Please install WhatsApp to contact support.'
      );
    }
  }






 const actions:SettingsSection[] = [
  {
    header: "Notifications",
    link: [
      { header: "Alerts",trigger: ()=>setModal(<Alerts/>), icon: "bell" },
          { header: "Reminders", trigger: ()=>setModal(<Reminders/>), icon: "calendar" },
    ],
  },

  {
    header: "Data Management",
    link: [
      { header: "Backup Data (Export JSON)", trigger: ()=>setModal(<ComingSoon/>), icon: "upload" },
      { header: "Restore Backup (Import)", trigger: ()=>setModal(<ComingSoon/>), icon: "download" },
      { header: "Clear All Data", trigger:  ()=>setModal(<DeleteDataWarning/>), icon: "trash-2" },
    ],
  },

  {
    header: "App Customization",
    link: [
      { header: "Theme", trigger: ()=>setModal(<Theme/>), icon: "sun" },
      // Optional later: { header: "Currency", trigger: () => {}, icon: "dollar-sign" },
    ],
  },

  {
    header: "About",
    link: [
        { header: "Recommend to friends", trigger: () =>shareApp(), icon: "users" },
      { header: "FAQ", trigger: ()=>setModal(<FAQ/>), icon: "info" },
      { header: "Contact Support", trigger: () =>openWhatsApp(), icon: "message-circle" },
      { header: "Terms of Use", trigger: () =>openTerms(), icon: "file-text" },
    ],
  },
];







const  insets  =useSafeAreaInsets()



   
  return (

    <>

    

      <SettingsModal/>
<MyProfile    showProfile={showProfile} setShowProfile={setShowProfile}/>

 <InnerLayOut backGroundColor={theme.backgroundColor} noPadding={true}>
      <View style={{paddingHorizontal:percentagePadding}}>
<Text style={{color:theme.textColor,fontFamily:'Poppins-Medium',fontSize:bodyText}}>Settings</Text>
      </View>
      
      <Pressable style={[styles.headerContainer,{borderBottomColor:theme.borderColor}]}
      
      onPress={()=>setShowProfile(true)}
      
      >

        <View style={[styles.circleContainer,{backgroundColor:theme.greyText}]}>
       <Feather  name='user' size={RFValue(40)} color={theme.textColor}/>
    

        </View>

           <View style={styles.circleHeading}>
        <Text style={{fontSize:h3,color:theme.textColor,marginBottom:standardMarginVertical*0.5,fontFamily:"Poppins-Medium"}}>{business.name}</Text>
         <Text style={{fontSize:bodyExtraSmall,color:theme.darkGreyText,marginBottom:standardMarginVertical*0.5,fontFamily:"Poppins-Regular"}}>{business.email}</Text>

       </View>
       <View style={styles.arrowContainer}>

        <Feather size={RFValue(20)} color={theme.darkGreyText} name='chevron-right'/>

       </View>

      </Pressable>


      <Pressable style={[styles.headerContainer,{borderBottomColor:theme.borderColor}]}
      
      
      >
        <View style={[styles.imageContainer,{backgroundColor:"#F5DEB3"
}]}>
          <Image resizeMode='contain'  style={{width:RFValue(55),height:RFValue(55)}} source={require('../../../../assets/images/crown.png')}/>

        </View>

             <View style={styles.circleHeading}>
        <Text style={{fontSize:bodyText,color:theme.textColor,marginBottom:standardMarginVertical*0.2,fontFamily:"Poppins-Regular"}}>Premium</Text>
         <Text style={{fontSize:bodyExtraSmall,color:theme.darkGreyText,marginBottom:standardMarginVertical*0.2,fontFamily:"Poppins-Regular"}}>Auto reminder and more</Text>

       </View>

    <Pressable style={[styles.upgradeBtn,{borderColor:theme.indicatorColor}]}
    
      onPress={()=>setModal(<ComingSoon/>)}
    
    
    >

      <Text style={{color:theme.textColor,fontSize:bodySmall,fontFamily:"Poppins-Regular"}}>Upgrade</Text>

    </Pressable>


      </Pressable>
   <View style={{marginBottom:insets.bottom}}>
  {
        actions.map((item,index)=>{
          return (
            <View key={index}>
              <View style={[styles.linkHeader,{backgroundColor:theme.greyText}]}>
                 <Text style={{color:theme.textColor,fontSize:bodySmall,fontFamily:"Poppins-Medium"}}>{item.header}</Text>

              </View>

              {
                item.link.map((li,index)=>{
                  return (
                    <Pressable style={[styles.link,{backgroundColor:theme.backgroundColor}]} key={index}  onPress={li.trigger}>
                          <Feather color={theme.darkGreyText}  size={RFValue(20)} name={li.icon}/>
                          <View style={{flex:1,justifyContent:"center",alignItems:"flex-start",paddingLeft:percentagePadding}}>
                             <Text style={{fontFamily:"Poppins-Medium",color:theme.textColor,fontSize:bodySmall}}>{li.header}</Text>
                          </View>

                          <Feather color={theme.darkGreyText} size={RFValue(20)} name='chevron-right'/>
                    </Pressable>
                  )
                })
              }

            </View>
          )
        })
      }

   </View>
    
    </InnerLayOut>

    </>
   
  )
}

const styles=StyleSheet.create({
  headerContainer:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    padding:percentagePadding,
    borderBottomWidth:1
  
  },
circleContainer:{
  width:RFValue(60),
  aspectRatio:1,
  borderRadius:RFValue(60),
  justifyContent:"center",
  alignItems:"center"
},
circleHeading:{
  alignItems:"flex-start",
  justifyContent:"center",
  paddingLeft:percentagePadding,
  flex:1

},

arrowContainer:{
  alignItems:"flex-start",
  justifyContent:"center",
},
imageContainer:{
  width:RFValue(45),
  aspectRatio:1,
  borderRadius:RFValue(45),
  justifyContent:"center",
  alignItems:"center"
},

upgradeBtn:{
  width:RFValue(100),
  height:standardHeightSmall,
  borderWidth:1,
  borderRadius:RFValue(20),
  justifyContent:"center",
  alignItems:'center'
},
linkHeader:{
  width:'100%',
  alignItems:'flex-start',
  justifyContent:"center",
  paddingHorizontal:percentagePadding,
  paddingVertical:RFValue(8)
},

link:{
  width:"100%",
  paddingHorizontal:percentagePadding,
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row",
    paddingVertical:RFValue(8)

}


})

export default index