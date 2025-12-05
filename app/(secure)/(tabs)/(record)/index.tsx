import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import React,{useEffect, useState} from 'react'

import { useGlobal } from '@/app/context'
import { InnerLayOutGrey } from '@/components/ui/layout'
import { bodyExtraSmall,  bodyText,  h3,  hideText, percentagePadding, standardMarginVertical, } from '@/custom'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuth, useRegister } from '@/store/auth'
import { database } from '@/database'
import { Customer } from '@/database/model/customer'
import { CustomerModal } from '@/components/business'
import { AddBtn } from '@/components/ui/special'
import { EmptyData } from '@/components/response'
import { CustomerType, useBusiness } from '@/store/business'

import { SearchField, SearchFieldType } from '@/components/ui/search'
import BottomComponent, { BottomType } from '@/components/bottom-sheet'

type SelectType='name'|'high-debt'|'low-debt'|'due-date'
type SortType={
  id: string,
  label:string,
    value: SelectType,
 }


const sortMap:SortType[] = [
  
  { value: 'name', label: 'Sort by Name',id:'1',},
  { value: 'high-debt', label: 'Highest Debt First' ,id:"2",},
  { value: 'low-debt', label: 'Lowest Debt First' ,id:"3",},
    { value: 'due-date', label: 'Due Date' ,id:"4",},
];




const index = () => {


const {customerData}=useRegister()
  const  {setCustomers,customers,hideBalance}=useBusiness()
const     {business,setShowAddCustomer,showAddCustomer}  =useAuth()
const   {theme,standardBorderColor}=useGlobal()
const [searchData,setSearchData]= useState<CustomerType[]>([])
const [isSearched,setIsSearched]=useState<boolean>(false)
const [showBottom,setShowBottom]=useState<boolean>(false)
const [searchText,setSearchText] =useState<string>('')
const [selected,setSelected]=useState<SelectType>('name')
 

const fetchCustomer= async ()=>{
  try{

    await database.write(async()=>{

  const customerCollections =  database.collections.get<Customer>('customers')


  const customers= await customerCollections.query().fetch()
setCustomers(customers)
 setSearchData(customers)

 })

  }

  catch{

  }
}

 

useEffect(()=>{

  fetchCustomer()

},[showAddCustomer,customerData])


const handlePress=()=>{
  setShowAddCustomer(true)
}


const emptyDataParam={
  content: !isSearched? "No customers registered. Add your first customer.":"Oops! No customer found, Try using another keyword.",
  action:!isSearched?handlePress:undefined,
  actionText:'Add Customer'
}


const searchParam:SearchFieldType={
  searchText,
  setSearchText,
  setIsSearched,
  placeHolder:"Search For Customer"
}


const OnSearch=()=>{

  const searchArray= customers.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase().trim()))
  setSearchData(searchArray)

}


useEffect(()=>{

  OnSearch()

},[isSearched,searchText])

 const bottomParam:BottomType={
  showBottom,
  setShowBottom
 }





const handleSort = (param: SelectType) => {
  setSelected(param)

  let sorted = [...customers] // make a copy to avoid mutating state

  switch (param) {
    case 'name':
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'high-debt':
      sorted = sorted.sort((a, b) => a.totalDebt - b.totalDebt);
      break;
    case 'low-debt':
      sorted = sorted.sort((a, b) => b.totalDebt - a.totalDebt);
      break;
    case 'due-date':
      sorted = sorted.sort((a, b) => a.dueDate - b.dueDate);
      break;
    default:
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  setCustomers(sorted)
  setShowBottom(false) // now this runs every time
}




const totalDebt=business.total_debt_given - business.total_debt_paid






  return (

    <>
    <BottomComponent param={bottomParam}>
  <View style={styles.radioContainer}>

    <Text style={[styles.label,{color:theme.textColor,fontFamily:"Poppins-Medium",fontSize:h3}]}>Sort</Text>

{
  sortMap.map((item)=>{
    return(
      <View key={item.id}>
        <Pressable style={styles.sortLine} onPress={()=>handleSort(item.value)}>
         <Text style={[styles.label,{color:theme.textColor}]}>{item.label}</Text>
         <View style={[styles.largeCircle,{borderColor:standardBorderColor}]}>

{
  item.value===selected && (
    <>
    <View style={[styles.smallCircle,{backgroundColor:theme.indicatorColor}]}>

         </View> 
    </>
  )
}

 
         </View>
        </Pressable>

      </View>
    )
  })
}
  </View>
</BottomComponent>
    <InnerLayOutGrey>

  <AddBtn/>



 
 <View style={{width:"100%",padding:percentagePadding}}>



{
  !isSearched && (
    <>
    <View style={styles.searchHeader}>
    <Text style={{fontFamily:"Poppins-Medium",fontSize:bodyText,color:theme.textColor}}>Customer Records</Text>

   <View style={styles.rightBlock}>

    <Pressable style={[styles.block,{backgroundColor:theme.backgroundColor}]}
    
    
    onPress={()=>setIsSearched(true)}
    >
      <Feather size={RFValue(15)} color={theme.textColor}  name="search"/>

    </Pressable>

     <Pressable style={[styles.block,{backgroundColor:theme.backgroundColor,marginLeft:RFValue(8)}]}
     onPress={()=>setShowBottom(true)}
     
     
     
     >

            <MaterialCommunityIcons size={RFValue(15)} color={theme.textColor}  name="sort"/>


    </Pressable>

   </View>

  </View>
    </>
  )
}
 
{
  isSearched  && (
    <>
    <View style={{width:"95%",alignSelf:"center" }}>
<SearchField param={searchParam}/>
</View>
    </>
  )
}



 


<View style={styles.highlightContainer}>
  <View style={[styles.metric,{marginRight:RFValue(30)}]}>
   
    <Text style={[styles.highLight,{color:theme.textColor}]}>
      Total Debt: {hideBalance?hideText:  `${business.currency_symbol} ${totalDebt.toLocaleString()}` }
    </Text>
  </View>



  <View style={styles.metric}>
    <Text style={[styles.highLight,{color:theme.textColor}]}>
      Total Customers: {business.total_customer}
    </Text>
  </View>
</View>

    </View>



<View   style={{backgroundColor:theme.backgroundColor,flex:1}}>

{
   customers.length===0  && !isSearched  &&  (
    <>
      <View style={{width:"100%",padding:percentagePadding}}>
    <EmptyData {...emptyDataParam}/>
      </View>
 
    </>
  )
}


<FlatList
  data={!isSearched?customers:searchData}
  keyExtractor={(item)=>item.name}

  renderItem={({ item }) => <CustomerModal item={item} />}
showsVerticalScrollIndicator={false}

ListEmptyComponent={()=>{
  return (
    <>
    {
      isSearched && searchText && (
        <>
        <View style={{width:"100%",padding:percentagePadding,flex:1,}}>
<EmptyData {...emptyDataParam}/>
     </View>
        </>
      )
    }
     
    
    </>
  )
}}
/>
</View>






</InnerLayOutGrey>
    </>

  )
}

const styles=StyleSheet.create({

 radioContainer:{
    padding:percentagePadding,
    alignItems:"flex-start",
    width:"100%"
  },
sortLine:{

  width:"100%",
  alignItems:"center",
  marginVertical:standardMarginVertical,
  flexDirection:"row",
  justifyContent:"space-between"


},

largeCircle:{
  height:RFValue(30),
  aspectRatio:1,
  borderRadius:RFValue(30),
  borderWidth:1,
  justifyContent:"center",
  alignItems:'center'
},

smallCircle:{
  height:RFValue(15),
  aspectRatio:1,
  borderRadius:RFValue(15),
  justifyContent:"center",
  alignItems:'center'
},
label:{
  fontFamily:'Poppins-Regular',
  fontSize:bodyText,


},

lineText:{

  fontSize:bodyText,
  fontFamily:"Poppins-Bold"

},


  searchHeader:{
    width:"100%",
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",

  },
  rightBlock:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start"
  },
  block:{
    width:RFValue(30),
    aspectRatio:1,
    borderRadius:RFValue(3),
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },

    highlightContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: standardMarginVertical * 3,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // RN 0.71+ supports gap, else use marginRight
  },
  icon: {
    fontSize: bodyExtraSmall, // smaller than text
    marginRight: 4,
  },
  highLight: {
    fontFamily: "Poppins-Medium",
    fontSize: bodyExtraSmall,
  },

 
  
})

export default index