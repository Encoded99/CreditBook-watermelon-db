import { View, Text, StatusBar, ScrollView, StyleSheet,Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { useGlobal } from '@/app/context'
import { bodyExtraSmall, bodySmall, bodyText, h1, percentagePadding, standardMarginVertical, standardPaddingVertical } from '@/custom'
import { Feather } from '@expo/vector-icons'
import { useAuth, useRegister } from '@/store/auth'
import { EmptyData } from '@/components/response'
import { AddBtn } from '@/components/ui/special'
import { InnerLayOutGrey } from '@/components/ui/layout'
import { useBusiness } from '@/store/business'
import { hideText } from '@/custom'
import { useCustomerFunction } from '@/functions/database/customer'
import { CustomerModal } from '@/components/business'
import MyProfile from '@/components/business-profile'
import { shareContactAsync } from 'expo-contacts'









const index = () => {
  const {theme}  =useGlobal()
        const {business,setShowAddCustomer}    =useAuth()
   const {hideBalance,setHideBalance,dashBoardData,transactionMode} =useBusiness()
   const {customerData} = useRegister()
   const  {fetchDashBoardData}=useCustomerFunction()
  const [showProfile,setShowProfile]=useState<boolean>(false)


type ArrayType={
  _id:number,

  title:string,
  value:number,
  icon:'arrow-down'|'arrow-up',
}
const Array:ArrayType[]=[
    {_id:1,title:"Total Debt Given", value:business.total_debt_given,  icon:'arrow-down'},
  {_id:2,title:"Total Debt Paid", value:business.total_debt_paid,  icon:'arrow-up'},

]

const handlePress=()=>{
  setShowAddCustomer(true)
}


const emptyDataParam={
  content:
  dashBoardData.totalCustomer === 0
    ? "No customers yet. Add your first customer to get started."
    : "No transactions yet. Go to the Records page and tap a customer’s name to create your first one.",

  action:dashBoardData.totalCustomer===0 ?handlePress:undefined,
  actionText:'Add Customer'
}

const totalDebt=business.total_debt_given-business.total_debt_paid




useEffect(()=>{

  fetchDashBoardData()

},[customerData,transactionMode])



const metrics=[
  {
    title:'Top Debtors',
    data:dashBoardData.highestDebt
  },
   {
    title:'Overdue Debts',
    data:dashBoardData.dueDebt
  },
   {
    title:'Due Soon',
    data:dashBoardData.almostDue
  }
]
















  return (
   <InnerLayOutGrey>
 <MyProfile    showProfile={showProfile} setShowProfile={setShowProfile}/>
      <AddBtn/>

      <ScrollView style={{flex:1}}
       contentContainerStyle={{ flexGrow: 1 }}
      >

        <View style={[styles.topSection,]}>
          <View style={styles.firstLine}>
            <View style={styles.logoContainer}>

                <Pressable style={[styles.profileCircle,{borderColor:theme.textColor}]}
                onPress={()=>setShowProfile(true)}
                
                >
   <Feather size={RFValue(15)} name='user' color={theme.textColor}/>
                </Pressable>
                <Text numberOfLines={1} style={{fontSize:bodySmall, fontFamily:"Poppins-Regular",color:theme.textColor}}>{business.name}</Text>
           

            </View>


            <View style={[styles.notificationContainer,{opacity:0}]}>
              <Feather size={RFValue(20)} color={theme.textColor} name='bell'/>
              <View style={[styles.counter,{backgroundColor:theme.indicatorColor}]}>
                <Text style={{color:'white',fontSize:RFValue(10),fontFamily:"Popins-Bold"}}>5</Text>

              </View>

            </View>

          </View>

          <View style={styles.secondLine}>

            <Text style={{fontFamily:"Poppins-Regular",fontSize:bodyExtraSmall,color:theme.darkGreyText,}}>
               Total Debt Balance
            </Text>
            <View style={styles.balanceIndicator}>
              <Text style={[styles.totalBalance,{color:theme.textColor}]}>{business.currency_symbol} {hideBalance?hideText:`${totalDebt.toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`}</Text>
              {
                hideBalance ?(
                  <>
                  <Feather color={theme.textColor}  size={RFValue(20)} name='eye-off' onPress={()=>setHideBalance(!hideBalance)}/>
                  </>
                ):(
                  <>
                      <Feather color={theme.textColor}  size={RFValue(20)} name='eye'
                      onPress={()=>setHideBalance(!hideBalance)}
                      />
                  </>
                )
              }
            </View>

            <View style={styles.blockContainer}>

      {
        Array.map((item)=>{
          return (
    
            <View style={[styles.block,{backgroundColor:theme.backgroundColor}]}  key={item._id}>

              
                    
              
                
                 <Text style={{fontSize:bodyExtraSmall*0.9,color:theme.darkGreyText,fontFamily:"Poppins-Regular"}}>
                  {item.title}
                </Text>
                 <View style={{width:'90%'}}>
    <Text numberOfLines={1} style={{fontSize:bodyExtraSmall,color:theme.textColor,fontFamily:"Poppins-SemiBold"}}>
                  {business.currency_symbol} {hideBalance?hideText:`${item.value.toLocaleString()}`}
                </Text>
                 </View>
             

                <View style={[styles.circleIcon,{backgroundColor:theme.greyText}]}>

                  <Feather color={item.icon==='arrow-down'?'red':'green'} size={RFValue(15)} name={item.icon}/>
                  </View>
                
               
             

              </View>

        
          )
        })
      }





 

            

            </View>


          </View>



        </View>

        <View style={[styles.bottomSection,{backgroundColor:theme.backgroundColor}]}>



           {
            (dashBoardData.totalCustomer===0 || dashBoardData.highestDebt.length===0 )&& (
              <>
             <EmptyData {...emptyDataParam}/>
               </>
            )
           }


   {
    metrics.map((metric,index)=>{
      return (
      
      <View key={metric.title}>
      {
        metric.data.length>0 && (
          <>
            <View style={[styles.modalContainer,{borderColor:theme.borderColor}]} key={index}>
        <View style={[styles.headerContainer,{backgroundColor:theme.greyText}]}>

        <Text numberOfLines={1} style={[styles.headerText,{color:theme.textColor}]}>{metric.title}</Text>

      </View>

      {
        metric.data.map((item,index)=>{
          return (
         
            
            <CustomerModal key={item.name}  item={item}/>
         
          )
        })
      }  

      </View>
          
          </>
        )
      }
      
      </View>
           
      )
    })
   }


 




        </View>

     

      </ScrollView>

</InnerLayOutGrey>
  )
}



const styles=StyleSheet.create({

modalContainer:{
  width:"100%",
  borderWidth:1,
  marginVertical:standardMarginVertical,
  borderBottomWidth:0
  
},
   headerContainer:{
    width:"100%",
    height:RFValue(40),
    alignItems:"flex-start",
    justifyContent:"center"

   },

   headerText:{

    fontSize:bodyText,
    fontFamily:"Poppins-Medium",
    paddingHorizontal:percentagePadding

   },



  topSection:{
    width:"100%",
    paddingHorizontal:percentagePadding,
     paddingVertical:standardPaddingVertical
  },

  firstLine:{
    width:"100%",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
  },
  logoContainer:{
    width:"50%",
    justifyContent:"flex-start",
    alignItems:"center",
    flexDirection:"row",
  },
  profileCircle:{
    width:RFValue(25),
    aspectRatio:1,
    borderRadius:RFValue(25),
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
    marginRight:RFValue(6)
  },
  notificationContainer:{
    position:"relative",
    flexDirection:"row"
  },
  counter:{
    width:RFValue(15),
    aspectRatio:1,
    borderRadius:RFValue(15),
        justifyContent:"center",
    alignItems:"center",
    marginLeft:RFValue(-8),
    
    marginTop:RFValue(-8)
  },

  secondLine:{
    width:"100%",
    paddingVertical:RFValue(20),
    justifyContent:"center",
    alignItems:"center"
  },
  balanceIndicator:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:standardMarginVertical*3
  },
  totalBalance:{
    fontFamily:"Poppins-SemiBold",
    fontSize:h1,
    marginRight:RFValue(10)
  },
  blockContainer:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
   
    height:RFValue(60)
  },
  block:{
    width:"49%",
    borderRadius:RFValue(50),
    height:'100%',
  alignItems:"flex-start",
  justifyContent:"center",
  paddingHorizontal:RFValue(20),
paddingVertical:RFValue(5),
position:"relative"

  },
  circleIcon:{
    width:RFValue(20),
    aspectRatio:1,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:RFValue(20),
    position:"absolute",
    right:"10%"
  },

  bottomSection:{
      paddingHorizontal:percentagePadding,
    paddingVertical:standardPaddingVertical,
    flex:1,
  }
 
})



export default index