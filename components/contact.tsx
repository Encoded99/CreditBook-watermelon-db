


import { View, Text, FlatList,Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { bodyText, percentagePadding, standardMarginVertical } from '@/custom'
import { useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SearchField, SearchFieldType } from './ui/search'
import { EmptyData } from './response'


export type Contact={
 id:string,
 name:string,
 phoneNumbers:string[]
}



const ContactPicker = ({contacts, setShowContact,setSelectedContacts}:{contacts:Contact[], setShowContact:React.Dispatch<React.SetStateAction<boolean>>,setSelectedContacts:React.Dispatch<React.SetStateAction<Contact[]>>}) => {
const {theme,standardBorderColor} =useGlobal()
const [searchText,setSearchText] =useState<string>('')
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
const [isSearched,setIsSearched]=useState<boolean>(false)
const [searchData,setSearchData]= useState<Contact[]>(contacts)
const handlePress = (item: Contact) => {



  setSelectedIds(prev => {
    const newSet = new Set(prev);

    if (newSet.has(item.id)) {newSet.delete(item.id);}
    else {
     if (selectedIds.size===15){
 alert('You can only  add up to 15 contacts at a time')
 return newSet
}
 newSet.add(item.id);
    }
     
    

    return newSet;
  });
};


const OnSearch=()=>{
setIsSearched(true)
  const searchArray= contacts.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase().trim()))

  setSearchData(searchArray)

}




const searchParam:SearchFieldType={
  searchText,
  setSearchText,
  setIsSearched,
  placeHolder:"Search For Customer",
  stable:true
}

useEffect(()=>{

  OnSearch()

},[isSearched,searchText])


const handleDone = () => {
const selected= contacts.filter((item)=>selectedIds.has(item.id))

setSelectedContacts(selected)
setShowContact(false)
};



const insets=useSafeAreaInsets()



 const renderItem=({item,}:{item:Contact})=>{

const isSelected=selectedIds.has(item.id); 

  return (
   <>
   <TouchableOpacity style={styles.line}
   
   onPress={()=>handlePress(item)}
   
   >
    <View style={styles.rightLine}>
     <View style={[styles.circle,{width:RFValue(40),borderRadius:RFValue(40),backgroundColor:theme.greyText,marginRight:RFValue(8)}]}>

      <Text style={{color:'white',fontSize:bodyText}}>{item.name[0].toUpperCase()}</Text>

     </View>

     <Text style={{color:theme.textColor,fontSize:bodyText,marginRight:RFValue(3)}}>{item.name}</Text>

    </View>
    <View style={[styles.circle,{borderWidth:1,borderColor:theme.darkGreyText}]}>

{
 isSelected && (
  <>
    <View style={[styles.smallCircle,{backgroundColor:theme.indicatorColor}]}>
    
    </View>
  </>
 )
}
  
    </View>

   </TouchableOpacity>

   </>
  )

 }



 const emptyDataParam={
  content: 'No result found'
}






  return (

    

          <View style={{width:"100%",flex:1,paddingTop:insets.top,
         paddingBottom:insets.bottom, 
          backgroundColor:theme.backgroundColor,}}>

            <View style={{width:"100%",paddingHorizontal:percentagePadding,paddingVertical:standardMarginVertical,borderBottomWidth:1,borderBottomColor:theme.borderColor}}>
    <SearchField  param={searchParam}/>
            </View>

        

          

     <FlatList
     
      data={!isSearched?contacts:searchData}
      renderItem={renderItem}
      keyExtractor={(item)=>item.id}
     style={{padding:percentagePadding,}}

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



  <View style={[styles.firstLine,{paddingHorizontal:percentagePadding,borderTopColor:standardBorderColor}]}>
            <Text style={{fontFamily:"Poppins-Regular",fontSize:bodyText,color:theme.textColor}}>{selectedIds.size} Selected</Text>

              <Text style={{fontFamily:"Poppins-Bold",fontSize:bodyText,color:theme.indicatorColor}}
              
              onPress={handleDone}
              
              >Done</Text>

           </View>


    </View>

    
  
  )
}




const styles=StyleSheet.create({
firstLine: {
  width: '100%',
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
   borderTopWidth:1,
   paddingVertical:standardMarginVertical*2 
},
 line:{
  width:"100%",
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between",
  marginBottom:standardMarginVertical,
  
 },
 circle:{
  width:RFValue(20),
  aspectRatio:1,
  borderRadius:RFValue(20),
  justifyContent:"center",
  alignItems:"center"
 },
smallCircle:{
 width:RFValue(10),
  aspectRatio:1,
  borderRadius:RFValue(10),
},

  rightLine:{
  width:"70%",
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"flex-start"
 },

})

export default ContactPicker