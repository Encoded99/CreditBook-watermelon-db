import { Stack } from "expo-router";

import React from 'react';

const Layout = () => {


  return (
    <Stack>
   



  
      <Stack.Screen
  name="(register)"
  options={{
    headerShown:false
  }}
/>

     <Stack.Screen
  name="onboard"
  options={{
    headerShown:false
  }}
/>


 
      <Stack.Screen
  name="(reset-password)"
  options={{
    headerShown:false
  }}
/>

    </Stack>
  );
}

export default Layout;
