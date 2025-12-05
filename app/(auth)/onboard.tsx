import { View, Text, StyleSheet,Animated,Dimensions,Image, TouchableOpacity } from 'react-native'
import React ,{useRef,useState}from 'react'
import { InnerLayOutGrey } from '@/components/ui/layout'
import { RFValue } from 'react-native-responsive-fontsize';
import { useGlobal } from '../context';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bodySmall, h1 } from '@/custom';
import { useNavigationFunction } from '@/functions/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width}=Dimensions.get('window')





const onboard = () => {
const  {safeRoute} =useNavigationFunction()
const translateX = useRef(new Animated.Value(0)).current;
const [index, setIndex] = useState(0);




const  {theme} =useGlobal()

 const slides = [
  {
    title: "Track Your Debts",
    summary: "Add your customers and keep track of how much they owe you.",
    image: require('../../assets/images/shop.png')
  },
  {
    title: "Due Dates & Alerts",
    summary: "Get notifications before a debt is due or overdue so you never miss a payment.",
    image:  require('../../assets/images/calendar.png')
  },
  {
    title: "Secure & Local",
    summary: "Your data is stored locally, with optional backup to keep it safe and accessible.",
    image: require('../../assets/images/lock.png')
  }
];

const moveToRegister=async()=>{

safeRoute('/(auth)/(register)')
   await AsyncStorage.setItem('onboard','onboard')
}


  const moveIndex =async () => {
    if (index === slides.length - 1){

   await moveToRegister()

   
        return;
    }
      
      
   
    const newIndex = index + 1;
    setIndex(newIndex);

    Animated.timing(translateX, {
      toValue: -newIndex * width, // move left by screen width
      duration: 500,
      useNativeDriver: true,
    }).start();
  };





const  insets=useSafeAreaInsets()


  return (
    <InnerLayOutGrey>
       <View style={[styles.container,{paddingBottom:insets.top+15} ]}>
      {/* Top Section */}
      <View style={styles.firstLine}>
        <Text style={{ color: theme.textColor,fontSize:RFValue(15),fontFamily:'Poppins-Medium'}}  onPress={moveToRegister}>Skip</Text>
      </View>

      {/* Slides */}
      <Animated.View style={{ flexDirection: 'row', height:"80%",  transform: [{ translateX }] }}>
        {slides.map((slide, i) => (
          <View key={i} style={styles.contentContainer}>
            <Image resizeMode="contain" style={styles.image} source={slide.image} />
            <Text style={[styles.headerText, { color: theme.indicatorColor }]}>{slide.title}</Text>


            <View style={styles.subtitleContainer}>
 <Text style={[styles.subtitle, { color: theme.textColor }]}>{slide.summary}</Text>
            </View>
           
          </View>
        ))}
      </Animated.View>

      {/* Pagination + Button */}
      <View style={styles.thirdLine}>
        <View style={styles.dotContainer}>
          {slides.map((_, i) => (
            <View key={i} style={i === index ? styles.longDot : styles.circleDot} />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextContainer, { backgroundColor: theme.indicatorColor}]}
          onPress={moveIndex}
        >
          <Feather color="white" name="arrow-right" size={30} />
        </TouchableOpacity>
      </View>
    </View>
    </InnerLayOutGrey>
  )
}

const styles=StyleSheet.create({
  container:{
   width:'100%',
   flex:1,

position:"relative"
  },

  firstLine:{
    width:'100%',
    flexDirection:"row",
    justifyContent:"flex-end",
    height:"10%",
    padding:'3%',
  },
  


contentContainer:{
   height:'100%',
   width:"100%",
  padding:'3%',

  alignItems:"center",
 
  
  },


subtitleContainer:{
  width:"100%",
  justifyContent:"center",
  alignItems:'center',
  paddingHorizontal:5,
},

  image:{
   width:"70%",
   height:'60%',
   
  
  },
  headerText:{
   fontSize:h1,
   fontFamily:'Poppins-Medium',
   textAlign:"center",
   marginTop:15,
  },
  subtitle:{
    fontSize:bodySmall,
   fontFamily:'Poppins-Medium',
   textAlign:"center",
   marginTop:15,
   lineHeight:RFValue(23)
  },
  thirdLine:{
    width:'100%',
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    height:"10%",
   padding:'3%',
  },

  
  dotContainer:{
    width:70,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    
  },
  circleDot:{
   height:10,
   width:10,
   borderRadius:10,
   backgroundColor:"grey"
  },
  longDot:{
   height:10,
   width:30,
   borderRadius:5,
   backgroundColor:"white"
  },

nextContainer:{
 height:RFValue(50),
 width:RFValue(50),
 borderRadius:RFValue(50),
 justifyContent:'center',
 alignItems:'center'
}
})
export default onboard