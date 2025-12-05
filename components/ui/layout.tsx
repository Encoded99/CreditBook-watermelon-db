import { useGlobal } from "@/app/context"
import { percentagePadding } from "@/custom"
import { View,StyleSheet,StatusBar, KeyboardAvoidingView, ScrollView,} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';


type InnerLayoutProps={
 children:React.ReactNode,
 noPadding?:boolean,
 backGroundColor?:string
}


export  const InnerLayOutWithOutScroll= ({ children,noPadding  }: InnerLayoutProps)=>{

   const {theme}=useGlobal()
   
  return (
    <>

    
 <SafeAreaView style={{flex: 1,
          backgroundColor:theme.backgroundColor,}} edges={['top',]}>
              <StatusBar
                    barStyle="dark-content"
                    backgroundColor={theme.backgroundColor}  
                  />

<View style={[styles.innerContainer,{paddingVertical:0,paddingTop:percentagePadding,paddingHorizontal:!noPadding?percentagePadding:0}]}>
          {children}
        </View>


          </SafeAreaView>

 
        
             

            

      

   


    
    



      
   
    
    </>
  )
}


export  const InnerLayOutGrey= ({ children,backGroundColor  }: InnerLayoutProps)=>{

   const {theme}=useGlobal()
   
  return (
    <>

    
 <SafeAreaView  style={{flex:1,backgroundColor:backGroundColor?backGroundColor: theme.greyText,position:"relative"}} edges={['top',]}>
  <StatusBar  backgroundColor={theme.greyText}   barStyle={'dark-content'}/>
     {children}
    </SafeAreaView>

 
        
   
    
    </>
  )
}




export const InnerLayOut = ({ children,noPadding,backGroundColor   }: InnerLayoutProps) => {
 
const  {theme} =useGlobal()

  return (
    <>
      <SafeAreaView style={{flex: 1,
          backgroundColor:backGroundColor?backGroundColor: theme.greyText,}} edges={['top',]} >

             <StatusBar
                    barStyle="dark-content"
                    backgroundColor={theme.backgroundColor}  
                  />

          <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        
      >
        <ScrollView
          style={[styles.innerContainer,{paddingVertical:0,paddingTop:percentagePadding,paddingHorizontal:!noPadding?percentagePadding:0}]}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>

      </SafeAreaView>

    
    </>
  );
};











const styles= StyleSheet.create({

  container:{
    width:"100%",
   
    flex:1,
   justifyContent:'flex-start',
    

  },

    innerContainer:{
    width:"100%",
  padding:percentagePadding,
    flex:1


  },
  innerContainerNoPadding:{
    width:"100%",
    flex:1


  },


 

})

