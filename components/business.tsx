import { useGlobal } from "@/app/context"
import { bodyExtraSmall, bodySmall, hideText, percentagePadding, standardMarginVertical } from "@/custom"
import { Customer } from "@/database/model/customer"
import { useAuth } from "@/store/auth"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import moment from "moment";
import { CustomerType, TransactionType, useBusiness } from "@/store/business"
import { useCustomerFunction } from "@/functions/database/customer"
import { useNavigationFunction } from "@/functions/navigation"

import { RFValue } from "react-native-responsive-fontsize"
import { absoluteNumber, ArrangedDate, capitalizeFirstLetter, } from "@/functions/arithmetic"




export const CustomerModal=({item}:{item:CustomerType})=>{

 const  {theme,} =useGlobal()
 const      {safeRoute} =useNavigationFunction()
 const   {business,} =useAuth()
                const {hideBalance,setSelectedCustomer}      =useBusiness()

 const now =Date.now()

 const color= item.totalDebt>0?'green':item.totalDebt===0?theme.darkGreyText:'red'

 const activeStatus=   item.totalDebt>0?'advance':item.totalDebt===0?'balanced':item?.dueDate<=now && item.totalDebt<0?"due":item?.dueDate>=now?"pending":""

 
 const status=item?.dueDate?activeStatus:'no transactions'

 const formattedDate = item.lastTransactionAt? ArrangedDate(item.dueDate):ArrangedDate(item.createdAt)

 const absAmount= Math.abs(item.totalDebt)
const amount= hideBalance?hideText:`${business.currency_symbol} ${absAmount.toLocaleString()}`


const handlePress=(item:CustomerType)=>{

   setSelectedCustomer(item)
   safeRoute('/(secure)/profile')
}




  return (
    <>

    <TouchableOpacity style={[styles.line,{borderBottomColor: theme.borderColor}]}
    onPress={()=>handlePress(item)}
    
    >

<View style={styles.leftLine}>

 <Text numberOfLines={1}  style={{fontFamily:"Poppins-Regular",fontSize:bodySmall,color:theme.textColor}}>{`${capitalizeFirstLetter(item.name)}`}
 </Text>

   <Text numberOfLines={1}  style={{fontFamily:"Poppins-Regular",fontSize:bodyExtraSmall,color:theme.darkGreyText}}>{formattedDate}</Text>

           
</View>


<View style={styles.rightLine}>

 
   <Text numberOfLines={1}  style={{fontFamily:"Poppins-Regular",fontSize:bodySmall,color:color}}>{`${amount}`}</Text>

              <Text numberOfLines={1}   style={{fontFamily:"Poppins-Regular",fontSize:bodyExtraSmall,color:theme.darkGreyText}}>{status}</Text>

</View>

      


    </TouchableOpacity>
    
    </>
  )

}


export const TransactionItem=({item}:{item:TransactionType})=>{
const   {theme}  =useGlobal()
const    {setSelectedTransaction}=useBusiness()
const    {safeRoute} =useNavigationFunction()


const handlePress=()=>{
  setSelectedTransaction(item)
  safeRoute('/(secure)/transaction')
  
}



  return (
    <>
 <TouchableOpacity style={[styles.tableTitle,{borderColor:theme.darkGreyText}]}
 onPress={handlePress}
 
 >
    
             <View style={styles.tableTitleSection} >
               <Text style={{color:theme.textColor,fontFamily:'Poppins-Regular',fontSize:bodySmall}}>
               {moment(item.createdAt).format("DD MMM YYYY")}
               </Text>
                 <Text style={{color:theme.darkGreyText,fontFamily:'Poppins-Regular',fontSize:bodyExtraSmall}}>
               {moment(item.createdAt).format("H:mm A")}
               </Text>
               
 
             </View>

              <View style={styles.tableTitleSection} >
               <Text style={{color:item.amount>0?"green":theme.textColor,fontFamily:'Poppins-Regular',fontSize:bodySmall}}>
                    {item.amount>0?absoluteNumber(item.amount):"-"}
               </Text>

               
 
             </View>
          
           <View style={styles.tableTitleSection} >
               <Text style={{color:item.amount<0?"red":theme.textColor,fontFamily:'Poppins-Regular',fontSize:bodySmall}}>
                                        {item.amount<0?absoluteNumber(item.amount):"-"}

               </Text>

               
 
             </View>
          
          
 
     </TouchableOpacity>
    </>
  )

}





 












const styles=StyleSheet.create({
  tableTitle:{
    width:"100%",
    height:RFValue(60),
    justifyContent:"center",
    alignItems:'center',
    flexDirection:"row",
    
   
    
  
  },

  tableTitleSection:{
    flex:1,
       height:RFValue(40),
    justifyContent:"center",
    alignItems:'flex-start',
    
  },



 line:{
  width:"100%",
  paddingVertical:standardMarginVertical,
  paddingHorizontal:percentagePadding,
  borderBottomWidth:1,
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row"
 },


rightLine:{
  width:"40%",
  justifyContent:"center",
  alignItems:"flex-end",
},

leftLine:{
  width:"60%",
  justifyContent:"center",
  alignItems:"flex-start",
},

 
})