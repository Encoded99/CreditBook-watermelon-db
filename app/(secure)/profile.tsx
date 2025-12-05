import { View, Text, StyleSheet, Pressable,NativeSyntheticEvent, FlatList,NativeScrollEvent } from 'react-native'
import React, { useEffect, useState, useTransition } from 'react'
import { InnerLayOutGrey } from '@/components/ui/layout'
import { BackArrowTitle } from '@/components/ui/heading'
import { bodyExtraSmall, bodySmall, bodyText, h1, h3, hideText, percentagePadding,  standardHeight, standardMarginVertical, standardPaddingVertical } from '@/custom'
import { RFValue } from 'react-native-responsive-fontsize'
import { greyText, useGlobal } from '../context'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { TransactionType, useBusiness } from '@/store/business'
import { EditCustomerModal, TransactionModal } from '@/components/ui/modal'
import { useAuth, useRegister } from '@/store/auth'
import moment from 'moment'
import { TransactionItem } from '@/components/business'
import { database } from '@/database'
import { Transaction } from '@/database/model/transaction'
import { Q } from '@nozbe/watermelondb'
import { useTransactionFunction } from '@/functions/database/transaction'
import { EmptyData } from '@/components/response'
import { absoluteNumber, capitalizeFirstLetter } from '@/functions/arithmetic'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useContactFunction } from '@/functions/contact'
import { CommunicationType } from '@/functions/contact'


type Action = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap; // ensures valid MaterialCommunityIcons names
  color: string;
  onPress: () => void;
};




const map=['Date','Payment','Debt']


const Tab=()=>{
  const    {theme} =useGlobal()
  const        {business}  =useAuth()
  return(
    <>
    <View style={[styles.tableTitle,{borderColor:theme.darkGreyText}]}>
      {
        map.map((item,index)=>{
          return (
            <View style={styles.tableTitleSection} key={item}>
              <Text style={{color:theme.textColor,fontFamily:'Poppins-Medium',fontSize:bodySmall}}>
                   {item}{index>0?`(${business.currency_symbol})`:""}
              </Text>

            </View>
          )
        })
      }

    </View>
    </>
  )
}


const Header=  React.memo(({fixTab}:{fixTab:boolean})=>{
  const    {contactCustomer} =useContactFunction()
  const [showFull,setShowFull]=useState<boolean>(false)
  const   {theme}  =useGlobal()
  const  {business,setShowEdit}   =useAuth()
const  {selectedCustomer,hideBalance,} =useBusiness()
            const {setCustomerData}          =useRegister()


const Metrics=[

   {
    
    title:'Total Debt',
    value:hideBalance?hideText:`${business.currency_symbol} ${absoluteNumber(  selectedCustomer.totalDebt)}`,
   icon:"cash"
  },

  {
    
    title:'Total Debt Given',
    value:hideBalance?hideText:`${business.currency_symbol} ${absoluteNumber( selectedCustomer.totalDebtGiven)}`,
    icon:"cash"

  },

   {
    
    title:'Total Debt Paid',
    value:hideBalance?hideText:`${business.currency_symbol} ${absoluteNumber( selectedCustomer.totalDebtPaid)}`,
   icon:"cash"
  },


   {
    
    title:'Phone',
    value:selectedCustomer.phone?selectedCustomer.phone:'NA',
    icon:"phone"

  },

   {
    
    title:'Address',
     value:selectedCustomer.address?selectedCustomer.phone:'NA',

    icon:"home"

  },

  

  
]







const whatsappContact:CommunicationType={
  phone:selectedCustomer.phone?selectedCustomer.phone:"",
  channel:"whatsapp"
}


const phoneContact:CommunicationType={
  phone:selectedCustomer.phone?selectedCustomer.phone:"",
  channel:"call"
}

const smsContact:CommunicationType={
  phone:selectedCustomer.phone?selectedCustomer.phone:"",
  channel:"sms"
}




const actions:Action[] = [

  {
    title: 'WhatsApp',
    icon: 'whatsapp',       // MaterialCommunityIcons equivalent
    color: '#25D366',
    onPress:()=>contactCustomer(whatsappContact)
  },
  {
    title: 'SMS',
    icon: 'message-text',   // MaterialCommunityIcons equivalent
    color: '#007bff',
      onPress:()=>contactCustomer(smsContact)
  },
  
  {
    title: 'Call',
    icon: 'phone',          // MaterialCommunityIcons equivalent
    color: '#28a745',
        onPress:()=>contactCustomer(phoneContact)

  },
];











const editProfile=()=>{


setCustomerData({name:selectedCustomer.name,phone:selectedCustomer.phone?selectedCustomer.phone:'',notes:selectedCustomer.notes?selectedCustomer.notes:"",address:selectedCustomer.address?selectedCustomer.address:""})
 setShowEdit(true)
}



  return (
    <>
    
    <View style={{width:'100%',padding:percentagePadding,}}>



 <View style={styles.imageContainer}>


 <View style={styles.right}>
       <Text numberOfLines={2}  style={[styles.name,{color:theme.textColor}]}>{`${capitalizeFirstLetter(selectedCustomer.name)}`}
    
       </Text>
        <Text style={[styles.date,{color:theme.darkGreyText}]}>Created on {moment(selectedCustomer.createdAt).format("DD MMM YYYY")}</Text>

    </View>



 <View style={[styles.circle,{borderColor:theme.darkGreyText,backgroundColor:theme.backgroundColor}]}>

  <Text style={{color:theme.darkGreyText,fontSize:h1,fontFamily:"Poppins-Medium"}}>{selectedCustomer.name[0].toUpperCase()}</Text>

  <Pressable style={[styles.smallCircle,{backgroundColor:theme.lightColor,borderColor:theme.borderColor}]}
    onPress={editProfile}
  >
    <MaterialCommunityIcons size={RFValue(20)} color={theme.textColor}  name='account-edit'/>

  </Pressable>

    </View>


   
   

 </View>
   
   


   {
    Metrics.map((item,index)=>{
      return (

        <View key={item.title}>


{
  (index===0 || showFull ) && (
    <>
    <View style={styles.summaryLine} >
        <View style={styles.leftLine}>

  <Text style={[styles.headingLine,{color:theme.textColor}]}>{item.title}:</Text>
        </View>
     

       <View style={styles.rightLine}>
 <Text style={[styles.headingValue,{color:index===0 && selectedCustomer.totalDebt<0 ?'red' : index===0 && selectedCustomer.totalDebt>0?'green': index===1?'red':index==2 ?'green' : theme.textColor}]}> {item.value}</Text>
       </View>
       
   </View>
    </>
  )
}


        </View>
     
      )
    })
   }



 <View style={{width:"100%",justifyContent:"flex-start",alignItems:"center",flexDirection:"row",marginBottom:standardMarginVertical}}>
    <Text style={[styles.headingLine,{color:theme.textColor,marginRight:RFValue(10)}]}>{showFull?'Show Less' : 'Show more'}</Text>
    <Feather size={RFValue(20)} color={theme.textColor} onPress={()=>setShowFull(!showFull)}  name={showFull?"chevron-up":'chevron-down'}/>
   </View>
  
<View style={{width:"100%",flexDirection:"row",justifyContent:"space-around",alignItems:'center',marginVertical:standardMarginVertical}}>


{
  actions.map((item,index)=>{
    return (
 <Pressable style={[styles.card,{backgroundColor:item.color}]} key={index}  onPress={item.onPress}>
    <MaterialCommunityIcons name={item.icon} size={23} color={'white'} />
    <Text style={[styles.cardText]}>{item.title}</Text>
  </Pressable>
    )
  })
}

 


</View>
</View>
{
  !fixTab  && (
    <>
    <Tab/>
    </>
  )
}

    </>
  )
})






const StickyHeader=()=>{

  const {theme}   = useGlobal()
  const      {selectedCustomer} =useBusiness()
  const router= useRouter()
 const  {contactCustomer}  =useContactFunction()








const whatsappContact:CommunicationType={
  phone:selectedCustomer.phone?selectedCustomer.phone:"",
  channel:"whatsapp"
}


const phoneContact:CommunicationType={
  phone:selectedCustomer.phone?selectedCustomer.phone:"",
  channel:"call"
}

const smsContact:CommunicationType={
  phone:selectedCustomer.phone?selectedCustomer.phone:"",
  channel:"sms"
}




const actions:Action[] = [

  {
    title: 'WhatsApp',
    icon: 'whatsapp',       // MaterialCommunityIcons equivalent
    color: '#25D366',
    onPress:()=>contactCustomer(whatsappContact)
  },
  {
    title: 'SMS',
    icon: 'message-text',   // MaterialCommunityIcons equivalent
    color: '#007bff',
      onPress:()=>contactCustomer(smsContact)
  },
  
  {
    title: 'Call',
    icon: 'phone',          // MaterialCommunityIcons equivalent
    color: '#28a745',
        onPress:()=>contactCustomer(phoneContact)

  },
];






  return (
    <>
    <View style={styles.stickyHeader}>
      <View style={styles.stickyHeaderTop}>
        <View style={styles.rightHeader}>
          <Feather  onPress={()=>router.back()} size={RFValue(30)} name='arrow-left' color={theme.textColor} />
            <View style={{width:"85%"}}>
   <Text numberOfLines={1} style={{color:theme.textColor,fontSize:bodyText,fontFamily:'Poppins-Medium',marginLeft:RFValue(3)}}>{selectedCustomer.name}</Text>
            </View>
       
        </View>

       

           <View style={styles.leftHeader}>
           {
            actions.map((item)=>{
              return (
                <Pressable style={[styles.linkContainer,{backgroundColor:item.color}]} key= {item.icon}
                
                onPress={item.onPress}
                >
                      <MaterialCommunityIcons name={item.icon} size={20} color={'white'} />
                  </Pressable>
              
              )
            })
           }
          
        </View>

     



      </View>
  <Tab/>
    </View>
    
    </>
  )
}









const profile = () => {

    const {theme}    =useGlobal()
    const {selectedCustomer,setTransactionMode}=useBusiness()
    const   {transactionToData} =useTransactionFunction()
  const [fixTab,setFixTab]=useState<boolean>(false)
    const [data,setData]=useState<TransactionType[]>([])

const [scrollDir, setScrollDir] = useState<'up' | 'down' | null>(null);
  const prevScrollY = React.useRef(0);





// Define the type for each action








const fetchTransactions= async ()=>{
  try{

 

    const transactionCollection=  database.collections.get<Transaction>('transactions')


    if (selectedCustomer.id){
  const transactions= await transactionCollection.query(Q.where('customer_id',selectedCustomer.id)).fetch()
const transactionsRaw = transactions.map(t =>transactionToData(t));

    setData(transactionsRaw)

    }

  
  }

  catch(err){
 
  }
}





useEffect(()=>{
  fetchTransactions()

},[selectedCustomer])






const emptyDataParam={
  content: "You have no transactions for this customer yet. Create your first transaction by clicking either the red or green floating button below."


}




const insets = useSafeAreaInsets();





const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const yOffset = event.nativeEvent.contentOffset.y; // current vertical scroll
   
  // Example: call function when scrolled past 300
  if (yOffset >= 300) {
   setFixTab(true)
  } else{
    setFixTab(false)
  }


  const currentY = event.nativeEvent.contentOffset.y;

        if (currentY > prevScrollY.current) {
          setScrollDir('down');
        } else if (currentY < prevScrollY.current) {
          setScrollDir('up');
        }

        prevScrollY.current = currentY;

};






  return (

    <>

    <TransactionModal/>

     <InnerLayOutGrey>

 

   {
    !fixTab?(
      <>
       <View style={{width:"100%",padding:percentagePadding,zIndex:1}}>
       <BackArrowTitle title={'Customer"s Profile'} />
           </View>  
      </>
    ):(
      <>
        <StickyHeader/>
      </>
    )
   }





<View style={{width:"100%",flex:1}}>



   <FlatList
     data={data}
     keyExtractor={(item)=>item.id}
   onScroll={(event) => handleScroll(event)} 
     renderItem={({ item }) => <View style={{width:"100%",paddingHorizontal:percentagePadding,backgroundColor:theme.backgroundColor}}><TransactionItem item={item} /></View>}
   showsVerticalScrollIndicator={false}
scrollEventThrottle={16}

  ListHeaderComponent={()=>{
    return (
      <>
      <Header fixTab={fixTab}/>
      </>
    )
  }}

   
   ListEmptyComponent={()=>{
     return (
       <>
      
           <View style={{width:"100%",padding:percentagePadding,flex:1,backgroundColor:theme.backgroundColor}}>
   <EmptyData {...emptyDataParam}/>
        </View>
         
        
       
       </>
     )
   }}
   />


</View>



{
  (scrollDir=='up' || !fixTab ) && (
    <>
      <View style={[styles.actionBtnContainer,{bottom:insets.bottom+10}]}>
      
     <Pressable style={styles.creditBtn}
     
     onPress={()=>setTransactionMode('credit')}
     >

      <Text style={styles.cardText}>Accept payment</Text>

   </Pressable>
 <Pressable style={styles.debitBtn}
 onPress={()=>setTransactionMode('debit')}
 
 >
      <Text style={styles.cardText}>Give Credit</Text>

   </Pressable>


   </View>

    </>
  )
}

 


  
  </InnerLayOutGrey>
    </>
 
  )
}

const styles=StyleSheet.create({

  tableTitle:{
    width:"100%",
    height:RFValue(40),
    justifyContent:"center",
    alignItems:'center',
    flexDirection:"row",
    paddingHorizontal:percentagePadding,
    borderTopWidth:1,
    
  
  },

  tableTitleSection:{
    flex:1,
       height:RFValue(40),
    justifyContent:"center",
    alignItems:'flex-start',
    
  },

    
    stickyHeader:{
       width:"100%",


    },

    linkContainer:{
      width:RFValue(30),
      aspectRatio:1,
      borderRadius:RFValue(30),
      justifyContent:"center",
      alignItems:"center",
     

    },

      stickyHeaderTop:{
       width:"100%",
       justifyContent:'space-between',
       alignItems:"center",
      flexDirection:"row",
      paddingHorizontal:percentagePadding,
       paddingVertical:standardPaddingVertical*0.5

    },
   rightHeader:{
    width:"60%",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center"

   },

   leftHeader:{
    width:"35%",
    flexDirection:"row",
    justifyContent:"space-between",
        alignItems:"center",


   },



  actionBtnContainer:{
    width:"100%",
    height:standardHeight,
    
    position:"absolute",

    justifyContent:"center",
    alignItems:"center",
    flexDirection:'row'
  },

  creditBtn:{
    width:"40%",
    backgroundColor:'green',
 justifyContent:"center",
    alignItems:"center",
    height:"100%",
    borderTopLeftRadius:standardHeight/2,
    borderBottomLeftRadius:standardHeight/2
  },
    debitBtn:{
    width:"40%",
    backgroundColor:'red',
 justifyContent:"center",
    alignItems:"center",
    height:"100%",
     borderTopRightRadius:standardHeight/2,
    borderBottomRightRadius:standardHeight/2

  },

  card:{

    paddingHorizontal:percentagePadding,
  
    justifyContent:"center",
    alignItems:"center",
    borderRadius:RFValue(6),
    height:RFValue(40),
    flexDirection:"row",
    flex:1,
marginHorizontal:RFValue(3)

  },
  cardText:{

    fontSize:bodyExtraSmall,
    fontFamily:"Poppins-Medium",
    color:"white",
    marginLeft:RFValue(3)

  },

  summaryContainer:{
     width:"100%"
  },
    summaryLine:{
     width:"100%",
     flexDirection:'row',
     alignItems:"flex-start",
     marginBottom:standardMarginVertical
     
  },
  headingLine:{

    fontSize:bodySmall,
    fontFamily:'Poppins-Medium'


  },

   headingValue:{

    fontSize:bodySmall,
    fontFamily:'Poppins-Regular',
   

  },
  leftLine:{
    width:"39%",

  },
  rightLine:{

        width:"61%",


  },

circle:{
  width:RFValue(100),
  aspectRatio:1,
  borderRadius:RFValue(100),
  
   justifyContent:"center",
  alignItems:'center',
  position:'relative'

},
name:{
  fontSize:h3,
  fontFamily:"Poppins-Medium",
  marginTop:standardMarginVertical,
    marginBottom:standardMarginVertical*0.8,



},

date:{
  fontSize:bodyExtraSmall,
  fontFamily:"Poppins-Regular",
  marginBottom:standardMarginVertical,


},

smallCircle:{
  width:RFValue(40),
  aspectRatio:1,
  borderRadius:RFValue(40),
   borderWidth:1,
   justifyContent:"center",
  alignItems:'center',
  position:"absolute",
  bottom:'-4%',
  zIndex:1,
  right:"2%"

},

imageContainer:{
  justifyContent:"space-between",
  alignItems:'center',
  paddingBottom:standardMarginVertical,
  flexDirection:"row"
},
right:{
  alignItems:"flex-start",
  justifyContent:"center",
  width:"50%"
}


})

export default profile