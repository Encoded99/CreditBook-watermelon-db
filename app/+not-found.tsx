import { InnerLayOutWithOutScroll } from '@/components/ui/layout';
import { bodyText, h1, h2, standardMarginVertical } from '@/custom';
import { Link, Stack, useRouter } from 'expo-router';
import { StyleSheet,Text,View } from 'react-native';
import { useGlobal } from './context';



export default function NotFoundScreen() {
const router=useRouter()
  const  {theme}  =useGlobal()
  return (
    <>
     <InnerLayOutWithOutScroll>
      <View style={styles.container}>
        <Text style={[styles.header,{color:theme.textColor}]}>Oops.</Text>
 <Text style={[styles.text,{color:theme.textColor}]}>This screen does not exist.</Text>

  <Text style={[styles.text,{color:theme.indicatorColor,}]}
  
  onPress={()=>router.back()}
  
  >Go back.</Text>
 
      </View>
     
     </InnerLayOutWithOutScroll>
    </>
  );
}

const styles = StyleSheet.create({

header:{
  fontSize:h1,
  marginVertical:standardMarginVertical*3,
 fontFamily:"Poppins-SemiBold"
},


text:{
  fontSize:bodyText,
    marginBottom:standardMarginVertical*3,
   fontFamily:"Poppins-Regular"
  
},

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  
});
