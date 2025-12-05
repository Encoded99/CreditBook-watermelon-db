import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BackArrowTitle,  } from '@/components/ui/heading'

import { InnerLayOutWithOutScroll } from '@/components/ui/layout'
import { useGlobal } from '../context'
import { bodyExtraSmall, bodySmall, h2, percentagePadding,  standardBorderRadiusSmall, standardMarginVertical } from '@/custom'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { useBusiness } from '@/store/business'
import { absoluteNumber, ArrangedDate } from '@/functions/arithmetic'
import { useAuth } from '@/store/auth'

const transaction = () => {

  const {theme}  =useGlobal()
  const     {business}=useAuth()
const  {selectedTransaction,}=useBusiness()

const map=[
  {
    title:'Transaction Type',
    value:selectedTransaction.amount<0?"Debt":"Payment",
    
  },

  {
    title:'Note',
    value:selectedTransaction.notes?selectedTransaction.notes:'---'
    
  },

  {
    title:'Transaction Date',
    value:ArrangedDate(selectedTransaction.createdAt)
    
  },

    {
    title:'Due Date',
    value:ArrangedDate(selectedTransaction.dueDate)
    
  },
]




  return (
   <>
  





          <InnerLayOutWithOutScroll  noPadding={true}>
            <View style={{width:"100%",padding:percentagePadding}}>
 <BackArrowTitle title={'Transaction Details'}/>
            </View>

 <View style={{flex:1,backgroundColor:theme.greyText,padding:percentagePadding}}>
  <View style={[styles.topBlock,{backgroundColor:theme.backgroundColor}]}>
    <Text style={{fontSize:bodySmall,fontFamily:'Poppins-Medium',color:theme.textColor,marginBottom:RFValue(6)}}>{selectedTransaction.amount<0?'Credit Given':"Payment Received"}</Text>

      <Text style={{fontSize:h2,fontFamily:'Poppins-Medium',color: selectedTransaction.amount<0?'red' :'green',marginBottom:RFValue(6)}}>{business.currency_symbol} {absoluteNumber(selectedTransaction.amount)}</Text>

      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Feather  size={RFValue(15)} color={theme.indicatorColor} name='check-circle'/>
        <Text style={{fontSize:bodySmall,fontFamily:'Poppins-Medium',color:theme.indicatorColor,marginBottom:RFValue(6),marginLeft:RFValue(6)}}>Successful</Text>

      </View>

  </View>





 <View style={[styles.bottomBlock,{backgroundColor:theme.backgroundColor}]}>
    <Text style={{fontSize:bodySmall,fontFamily:'Poppins-Medium',color:theme.textColor,marginBottom:RFValue(10)}}>Transaction Details</Text>

{
  map.map((item)=>{
    return (
<View style={styles.line} key={item.title}>
   <View style={styles.left}>
     <Text numberOfLines={3} style={{color:theme.darkGreyText,fontSize:bodyExtraSmall,fontFamily:'Poppins-Regular'}}>
       {item.title}
     </Text>

       </View>
          <View style={styles.right}>
  <Text numberOfLines={3} style={{color:theme.textColor,fontSize:bodyExtraSmall,fontFamily:'Poppins-Regular'}}>
           {item.value} 
     </Text>

          </View>
      
    </View>
    )
  })
}



    
  </View>




 </View>
          </InnerLayOutWithOutScroll>
       
   </>
  )
}




const styles=StyleSheet.create({


  right:{
     width:'50%',
     alignItems:'flex-end',
     justifyContent:'center'
  },
  left:{
     width:'50%',
     alignItems:'flex-start',
     justifyContent:'center'
  },

line:{
width:'100%',
justifyContent:'space-between',
alignItems:'center',
flexDirection:'row',
marginBottom:standardMarginVertical
},

  topBlock:{
    width:'100%',
    minHeight:RFValue(200),
    justifyContent:'center',
    alignItems:'center',
    padding:percentagePadding,
    marginVertical:RFValue(20),
    borderRadius:standardBorderRadiusSmall,
    
  },

   bottomBlock:{
    width:'100%',
    minHeight:RFValue(200),
    padding:percentagePadding,
     borderRadius:standardBorderRadiusSmall,
     paddingVertical:RFValue(20)
  }
})

export default transaction