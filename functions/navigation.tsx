import { useRouter } from "expo-router"
import { useRef } from "react"
import * as WebBrowser from 'expo-web-browser';

export const useNavigationFunction=()=>{

const router=useRouter()
const delay=1000
const time =useRef<number>(0)

 const safeRoute=(path:Parameters<typeof router.push>[0])=>{
if (Date.now()-time.current<delay)return
  router.push(path)
 time.current=Date.now()

 }



 const dashboardNavigate=()=>{
  safeRoute('/(secure)/(tabs)')
 }


 


  

 return {
  safeRoute,
  dashboardNavigate
 }
}


export const openTerms=async ()=>{
  await WebBrowser.openBrowserAsync('https://credit-book-web.vercel.app/');
}