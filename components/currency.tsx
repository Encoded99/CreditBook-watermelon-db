import { useGlobal } from "@/app/context";
import { Dispatch,SetStateAction } from "react";
import { currencies, Currency } from "@/store/auth";
import { useRegister } from "@/store/auth";
import { Modal,TouchableOpacity,View,Text,FlatList,Dimensions,StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { bodyText, standardHeight } from "@/custom";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const {height}= Dimensions.get('window')


export type CurrencyPickerType = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  selectedCurrency: Currency;
  setSelectedCurrency: Dispatch<SetStateAction<Currency>>;
};

export const  CurrencyPicker=(param:CurrencyPickerType)=>{
  const {setRegisterData}= useRegister()
    const {theme}= useGlobal()
  
  const {isVisible, selectedCurrency, setSelectedCurrency,setIsVisible}=param


  const handlePress=(item:Currency)=>{


    setSelectedCurrency(item)
    setRegisterData({currency_name:item.name,currency_symbol:item.symbol})
    

  }


const insets=useSafeAreaInsets()



const RenderItem=({item}:{item:Currency})=>{
  

  return (
    <>
    <TouchableOpacity style={styles.currencyLine} onPress={()=>handlePress(item)}>
      <View style={{width:'100%',flexDirection:'row',justifyContent:"flex-start",alignItems:'center'}}>
      <Text style={[styles.currencyText,{color:theme.textColor}]}>{item.name}</Text>
         <Text style={[styles.currencyText,{color:theme.textColor}]}>({item.symbol})</Text>



    {
      selectedCurrency.name===item.name && (
        <>
          <MaterialCommunityIcons name='check-bold' size={RFValue(25)} color={theme.indicatorColor}/>
        </>
      )
    }
    

      </View>

    
    
      
    </TouchableOpacity>
    
    </>
  )
}



  return (
    <>
    <Modal
     visible={isVisible}
     animationType='slide'
     transparent={true}
     onRequestClose={() => setIsVisible(false)}
     
    >

<View style={[styles.modalBackground,{backgroundColor:theme.backgroundColor}]}>

   <View style={[styles.modalContainer,{backgroundColor:theme.backgroundColor}]}>

    <View style={{flex:1,width:"100%",padding:"6%",paddingTop:insets.top,paddingBottom:insets.bottom}}>
<View style={styles.currencyHeader}>
             <Text style={{fontSize:RFValue(20),color:theme.textColor,fontFamily:'Poppins-Bold'}}>Select Currency</Text>
          </View>


      <FlatList
        keyExtractor={item => item.name}
        data={currencies}
        renderItem={RenderItem}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.currencyBottom}>
             <Text style={{fontSize:RFValue(18),color:theme.indicatorColor,fontFamily:'Poppins-Bold'}}  onPress={()=>setIsVisible(false)}>Okay</Text>
          </View>
      
    </View>
    
   </View>
</View>

     

    </Modal>
    </>
  )
}


const styles=StyleSheet.create({


modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  modalContainer: {
    width: '100%',
    height:height,
    borderRadius: 10,
    alignItems: 'center',

  },

  currencyLine:{
    width:"100%",
    height:standardHeight,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center'
   
    
  },

 currencyText:{
    fontSize:bodyText,
    marginRight:8,

  },

 currencyHeader:{
    width:"100%",
    height:50,
  },


  currencyBottom:{
    width:"100%",
    height:50,
    flexDirection:"row",
    justifyContent:'flex-end',
    alignItems:'center',
  
  },



})