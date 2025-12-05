import React,{useEffect,} from 'react';
import {  StyleSheet,BackHandler, } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Tabs,  } from "expo-router";
import { useGlobal } from "@/app/context";
import { Feather } from '@expo/vector-icons';

import { usePathname, } from 'expo-router';





const Layout = () => {


  const { theme} = useGlobal();
  


const pathname=usePathname()

     



 useEffect(() => {
    


    const isNeededPath = pathname === '/';

    const backAction = () => {
      if (isNeededPath) {
        BackHandler.exitApp();
        return true; 
      }
      return false; 
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  
    return () => backHandler.remove();
  }, [pathname]); 

















    const backgroundColor = theme.name!=='Black'?theme.backgroundColor:theme.greyText

    const logoColor = theme.name!=='Black'?theme.indicatorColor:theme.textColor
  const indicatorColor = theme.name!=='Black'?theme.lightColor:theme.backgroundColor
  
  const noIndicator =theme.name!=='Black'? theme.darkGreyText:'grey';

  return (
    <>
     <Tabs

      screenOptions={{
        tabBarStyle: { backgroundColor:backgroundColor,

   

 height: RFValue(100),
         },

 tabBarItemStyle: {
  
    marginHorizontal: 5, 
    overflow: 'hidden',
    
  },

       
        tabBarLabelStyle: { fontSize: RFValue(10), fontWeight: "bold" },
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: noIndicator,
        animation: "none",
        headerShown: false,
        tabBarActiveBackgroundColor:indicatorColor,
      
        
      }}
    >
     {tabRoutes.map((item) => (
  <Tabs.Screen
    key={item.name}
    name={item.name}
    options={{
      tabBarLabel: item.label,
   
      tabBarIcon: ({ color, size,focused }) => (
        <>
          <Feather
            name={item.icon as keyof typeof Feather.glyphMap}
            color={focused?logoColor:color}
            size={RFValue(20)}
          />

        
        </>
      ),
    }}
  />
))}

    </Tabs>

   
    </>
   
  );
};


const tabRoutes = [
  { name: "index", icon: 'home', label: 'Home' },
  { name: "(record)", icon: 'file-text', label: 'Record' },
  { name: "(settings)", icon: 'settings', label: 'Settings' },
];






const styles = StyleSheet.create({
  counterContainer: {
    height: RFValue(19),
    aspectRatio:1,
    borderRadius: RFValue(19),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 13,
    top: -5,
  },

});

export default Layout;