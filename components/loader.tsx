import { useGlobal } from "@/app/context";
import { ActivityIndicator, Modal,StatusBar } from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from 'react-native-safe-area-context';

export const LargeLoader=({isLoading}:{isLoading:boolean})=>{
const  {theme}  =useGlobal()




const background=theme.name!=='Black' ? '#00000033':'#FFC1CC33'

 return (
  <>
  
  
  <Modal
       visible={isLoading}
       animationType='none'
       transparent={true}
      >

           
        <SafeAreaView style={{flex: 1,
                 backgroundColor:background,justifyContent:"center",alignItems:'center'}} edges={['top',]}>

              <StatusBar
                    barStyle="dark-content"
                    backgroundColor={background}
                  />

                  <ActivityIndicator color={theme.indicatorColor} size={RFValue(70)}/>

                 </SafeAreaView>


      </Modal>
  </>
 )
}