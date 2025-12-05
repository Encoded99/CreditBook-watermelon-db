
import React, { useState,useContext,useEffect, ReactNode} from 'react';

const title='CreditBook'
export  const greyText='hsl(0,0%,90%)'
export  const darkGreyText='#E6E6E6'
export type PrimaryType= '#FE2C55' |'#000000' | '#5865F2' | '#25D366'
export type Theme='Red'|'Purple' |'Green'|'Black'
export type ThemeType = {
  name: 'Red' | 'Purple' | 'Green' | 'Black',
  primary:PrimaryType
  secondary: string,
  backgroundColor: string,
  textColor:"white"|"black",
  indicatorColor:PrimaryType | 'grey',
  darkGreyText:'grey'|'#FFFFFF',
   greyText:string,
   lightColor:string,
   borderColor:string
}

export const ThemeData: ThemeType[] = [
  {
    name: 'Red',
    primary: '#FE2C55',
    secondary: '#FFC1CC',        // soft light red/pink
    lightColor: '#FFE6EB',       // lighter pink
    backgroundColor: '#FFFFFF',
    textColor: 'black',
    indicatorColor: '#FE2C55',
    darkGreyText: 'grey',
    greyText: greyText,
    borderColor:'#E6E6E6'
  },
  {
    name: 'Black',
    primary: '#000000',
    secondary: 'hsl(0, 0%, 10%)',     // dim gray
    lightColor: 'hsl(0, 0%, 10%)',    // lighter gray
    backgroundColor: '#000000',
    textColor: 'white',
    indicatorColor: 'grey',
    darkGreyText: '#FFFFFF',
    greyText: 'hsl(0, 0%, 15%)',
    borderColor:'grey'
  },
  {
    name: 'Purple',
    primary: '#5865F2',
    secondary: '#D6DAFF',        // soft lavender
    lightColor: '#EFF0FF',       // lighter lavender
    backgroundColor: '#FFFFFF',
    textColor: 'black',
    indicatorColor: '#5865F2',
    darkGreyText: 'grey',
    greyText:  greyText,
    borderColor:'#E6E6E6'
  },
  {
    name: 'Green',
    primary: '#25D366',
    secondary: '#B9F6CA',        // mint light green
    lightColor: '#E4FDF0',       // lighter mint
    backgroundColor: '#FFFFFF',
    textColor: 'black',
    indicatorColor: '#25D366',
    darkGreyText: 'grey',
    greyText:  greyText,
    borderColor:'#E6E6E6'
  }
]


interface AppContextType {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
   standardBorderColor:string;
}

const AppContext = React.createContext<AppContextType>({
  theme: ThemeData[0],
  setTheme: () => {}, // noop function
   standardBorderColor:''
});

// Create a provider component
  const  AppProvider = ({ children }:{children:ReactNode}) => {

const [theme,setTheme]= useState<ThemeType>(ThemeData[0])


 
const standardBorderColor=theme.name!=='Black'?"#E6E6E6":'grey'






    return (
        <AppContext.Provider value={{ 
          setTheme,
          theme,
          standardBorderColor
          
        }}>
            {children}
        </AppContext.Provider>
    );
};


export const useGlobal=()=>{
 return useContext(AppContext)
}

export default AppProvider