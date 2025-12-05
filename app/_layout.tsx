import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import AppProvider from './context';
import { ResponseModal } from '@/components/response';
import { AddCustomerModal, EditCustomerModal } from '@/components/ui/modal';


export default function RootLayout() {
 

  return (


 <>
     <GestureHandlerRootView style={styles.container}>
      {/* 👇 Wrap everything in SafeAreaProvider */}
     
      <SafeAreaProvider>
       
   
          <AppProvider>
         
            <EditCustomerModal />
            <AddCustomerModal/>
            <ResponseModal/>
       
            <Slot />
          </AppProvider>
  
      </SafeAreaProvider>
   
    </GestureHandlerRootView>
 </>


   
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});