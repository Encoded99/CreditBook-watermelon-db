import { useGlobal } from "@/app/context";
import { bodyExtraSmall, bodySmall, bodyText, h2, h3, percentagePadding, standardBorderRadius, standardMarginVertical, standardPaddingVertical } from "@/custom";
import { CustomerDataType, useAuth, useRegister } from "@/store/auth";
import { Feather, MaterialCommunityIcons, } from "@expo/vector-icons";
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from "react";
import {  KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View,BackHandler } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import ContactPicker, { Contact } from "../contact";
import { CurrencyBtn, InputField, InputType, LineInputField, NoteField, SubmitBtn, SubmitBtnType } from "../element";
import {  ClosePost,  } from "./heading";
import { useCustomerFunction } from "@/functions/database/customer";
import { LargeLoader } from "../loader";
import { useBusiness } from "@/store/business";
import { InnerLayOut } from "./layout";
import DateComponent from "./date";
import { useTransactionFunction } from "@/functions/database/transaction";
import { absoluteNumber } from "@/functions/arithmetic";
import { useBusinessFunction } from "@/functions/database/business";
import { useSettings } from "@/store/settings";
import { useSafeAreaInsets } from "react-native-safe-area-context";







type InputArrayType={
  _id:number,
  params:InputType,

}



export const  AddCustomerModal=()=>{
  const   {createCustomer} =useCustomerFunction()
 const  {customerData,setCustomerData} =useRegister()
  const   {theme}= useGlobal()
  const  {showAddCustomer,setShowAddCustomer,setIsError,setResponseMessage} =useAuth()
 const [isSubmitClicked,setIsSubmitClickd]=useState<boolean>(false)
 const [isActive,setIsActive]=useState<boolean>(false)
const [contacts, setContacts] = useState<Contact[]>([]);
 const [showContact,setShowContact]=useState<boolean>(false)
const [selectedContacts,setSelectedContacts] =useState<Contact[]>([])
     const [isLoading,setIsLoading]=useState<boolean>(false)







const InputArray:InputArrayType[]=[



  {
    _id:1,
    params:{
 label:'* Name',
  text:customerData.name,

  setText:(value:string)=>setCustomerData({...customerData,name:value}), 
   isSubmitClicked, 
   type:"text",
  
    }

  },

   {
    _id:2,
    params:{
 label:'Phone',
  text:customerData.phone,

  setText:(value:string)=>setCustomerData({...customerData,phone:value}), 
   isSubmitClicked, 
   type:"text",
  
    }

  },


  {
    _id:3,
    params:{
 label:'Address',
  text:customerData.address,

  setText:(value:string)=>setCustomerData({...customerData,address:value}), 
   isSubmitClicked, 
   type:"text",
  
    }

  },

   {
    _id:4,
    params:{
 label:'Note',
  text:customerData.notes,

  setText:(value:string)=>setCustomerData({...customerData,notes:value}), 
   isSubmitClicked, 
   type:"text",
  
    }

  },



    

  

]



const requestContact=async()=>{
 try{

  const {status} = await Contacts.requestPermissionsAsync()
if (status==='granted'){
  const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        });




const cleaned: Contact[] = data.map(contact => ({
  id: contact.id,
  name: contact.name ?? "Unknown",
  phoneNumbers:
    contact.phoneNumbers
      ?.map(num => num.number)
      .filter((n): n is string => Boolean(n)) || []
})).filter((item)=>item.name!==" null")
       
        if (data.length>0){
 setContacts(cleaned);
 setShowContact(true) 
        }

        else{
         throw Error('Error accessing contact')
        }
}
 }

 catch(err){
  console.log(err,'err')
  setResponseMessage('Error accessing contact')
  setIsError(true)
 }
}







const handleSubmit=async()=>{

setIsLoading(true)
  if (!isActive)return
   try{
    await createCustomer(customerData)
   }

   catch(err){

   }

   finally{
setIsLoading(false)
   }
}



const handleLargeSubmit=async()=>{

setIsLoading(true)
  if (selectedContacts.length==0)return


const arrangedContact:CustomerDataType[]= selectedContacts.map((item)=>{
  const object={
    name:item.name,
    phone:item.phoneNumbers[0],
    notes:'',
    address:"",
        business_id:"",
  }
  return object
})

   try{

  for (let i=0;i<arrangedContact.length;i++){
      const element= arrangedContact[i]
        await createCustomer(element)

  }
setSelectedContacts([])

   }

   catch(err){

   }

   finally{
setIsLoading(false)
   }
}






useEffect(()=>{
 if (customerData.name){
  setIsActive(true)
 }

 else{
  setIsActive(false)
 }

},[customerData.name])

const remove=(param:Contact)=>{
const removeItem= selectedContacts.filter((item)=>item!==param)

setSelectedContacts(removeItem)
}



const submitProp:SubmitBtnType={
  text:'Submit',
  trigger:handleLargeSubmit,
  type:"normal",
  isActive:selectedContacts.length>0?true:false
}


const insets= useSafeAreaInsets()


if(selectedContacts.length>0){
  return (
    <>
    <Modal
     visible={showAddCustomer}
     animationType='slide'
     transparent={false}
         onRequestClose={() => setSelectedContacts([])}
    >
  <View style={{flex:1,width:"100%",backgroundColor:theme.backgroundColor}}>
    <LargeLoader  isLoading={isLoading} />

        <View style={{width:"100%",alignItems:"flex-end",marginTop:standardMarginVertical*2,padding:percentagePadding}}>

      <Text style={{color:theme.indicatorColor,fontFamily:'Poppins-Bold',fontSize:bodyText}} onPress={()=>setSelectedContacts([])}>Cancel</Text>

    </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,width:"100%",paddingHorizontal:percentagePadding,backgroundColor:theme.backgroundColor}}>



<Text style={{color:theme.textColor,fontSize:h2,fontFamily:"Poppins-SemiBold",marginBottom:standardMarginVertical*2}}>Review</Text>

{
  selectedContacts.map((item,index)=>{
    return (
      <View style={[styles.detailModal,{borderColor:theme.name!=='Black'?theme.greyText:'grey',borderBottomWidth:index===selectedContacts.length-1?1:0}]} key={index}>
        <View style={styles.detailLine}>
   <Text style={[styles.label,{color:theme.darkGreyText}]}>Name</Text>
      <Text style={[styles.mainLabel,{color:theme.textColor}]}>{item.name}</Text>
        </View>

          <View style={styles.detailLine}>
   <Text style={[styles.label,{color:theme.darkGreyText}]}>Phone</Text>
      <Text style={[styles.mainLabel,{color:theme.textColor}]}>{item.phoneNumbers[0]}</Text>
        </View>
       <Text style={[styles.mainLabel,{color:theme.indicatorColor,fontSize:bodySmall,marginBottom:0}]}
        onPress={()=>remove(item)}
       >Remove</Text>
      </View>
    )
  })
}



   </ScrollView>


<View style={{width:"100%",padding:percentagePadding,justifyContent:"center",alignItems:"center",paddingBottom:insets.top}}>
<SubmitBtn  prop={submitProp}/>
</View>
  </View>

 

</Modal>
    </>
  )
}





  return (
    <>



    <Modal
     visible={showAddCustomer}
     animationType='slide'
     transparent={false}
         onRequestClose={() => setShowAddCustomer(false)}
    >

 
{
  showContact && (
    <>
    <ContactPicker setSelectedContacts={setSelectedContacts}  contacts={contacts} setShowContact={setShowContact}/>
    </>
  )
}


{
  !showContact && (
    <>
  
<KeyboardAvoidingView
    style={[styles.modalBackground,{backgroundColor:theme.backgroundColor}]}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >


<View style={styles.addHeader}>
          
              <ClosePost  isActive={isActive}  title="Add Customer" isLoading={isLoading}   close={()=>setShowAddCustomer(false)}  trigger={handleSubmit}/>
          </View>
          
          

          <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,width:"100%",paddingHorizontal:percentagePadding,}}>



<Pressable style={{flexDirection:"row",justifyContent:"flex-start",alignItems:'center',width:"100%",marginTop:standardMarginVertical}}

onPress={requestContact}
>


           <Feather  color={theme.indicatorColor} name='phone-call'  size={RFValue(20)}/>
<Text style={[styles.addIndicator,{color:theme.darkGreyText}]}>Add from your phone contacts</Text>
          </Pressable>





            {
      InputArray.map((item,index)=>{
        return (
          

          

          <View style={{marginTop:RFValue(20)}} key={index}>



                   {
                   index===3 && (
                        <>
                        <View style={{width:"100%",marginBottom:RFValue(100)}}>
  <NoteField {...item.params}/>  
                        </View>
                    
                        </>
                      )
                    }

                      {
                   index<3 && (
                        <>
                        
                    <InputField {...item.params}/> 
                        </>
                      )
                    }
        </View>
          
        
        )
      })
    }


          </ScrollView>




  </KeyboardAvoidingView>

    </>
  )
}







     

    </Modal>
    </>
  )
}

export const  EditCustomerModal=()=>{
  const   {updateCustomer} =useCustomerFunction()
 const  {customerData,setCustomerData} =useRegister()
 const {setShowEdit,showEdit}  =useAuth()
  const   {theme}= useGlobal()
 const [isSubmitClicked,setIsSubmitClickd]=useState<boolean>(false)
 const [isActive,setIsActive]=useState<boolean>(false)
     const [isLoading,setIsLoading]=useState<boolean>(false)







const InputArray:InputArrayType[]=[



  {
    _id:1,
    params:{
 label:'Name',
  text:customerData.name,

  setText:(value:string)=>setCustomerData({...customerData,name:value}), 
   isSubmitClicked, 
   type:"text",
   placeHolder:customerData.name,
  
    }

  },

   {
    _id:2,
    params:{
 label:'Phone',
  text:customerData.phone,

  setText:(value:string)=>setCustomerData({...customerData,phone:value}), 
   isSubmitClicked, 
   type:"text",
  
    }

  },


  {
    _id:3,
    params:{
 label:'Address',
  text:customerData.address,

  setText:(value:string)=>setCustomerData({...customerData,address:value}), 
   isSubmitClicked, 
   type:"text",
  
    }

  },

   {
    _id:4,
    params:{
 label:'Note',
  text:customerData.notes,

  setText:(value:string)=>setCustomerData({...customerData,notes:value}), 
   isSubmitClicked, 
   type:"text",
  
    }

  },



    

  

]









const handleSubmit=async()=>{

setIsLoading(true)
  if (!isActive)return
   try{
    await updateCustomer(customerData)
   }

   catch(err){

   }

   finally{
setIsLoading(false)
   }
}







useEffect(()=>{
 if (customerData.name){
  setIsActive(true)
 }

 else{
  setIsActive(false)
 }

},[customerData.name])








  return (
    <>



    <Modal
     visible={showEdit}
     animationType='slide'
     transparent={false}
         onRequestClose={() => setShowEdit(false)}
    >

 


<KeyboardAvoidingView
    style={[styles.modalBackground,{backgroundColor:theme.backgroundColor}]}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >


<View style={styles.addHeader}>
           

             <ClosePost title="Edit Customer Info" isLoading={isLoading} isActive={isActive} trigger={handleSubmit} close={()=>setShowEdit(false)} />
          </View>
          
          

          <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,width:"100%",paddingHorizontal:percentagePadding,}}>







            {
      InputArray.map((item,index)=>{
        return (
          

          

          <View style={{marginTop:RFValue(20)}} key={index}>



                   {
                   index===3 && (
                        <>
                        <View style={{width:"100%",marginBottom:RFValue(100)}}>
  <NoteField {...item.params}/>  
                        </View>
                    
                        </>
                      )
                    }

                      {
                   index<3 && (
                        <>
                        
                    <InputField {...item.params}/> 
                        </>
                      )
                    }
        </View>
          
        
        )
      })
    }


          </ScrollView>




  </KeyboardAvoidingView>





     

    </Modal>
    </>
  )
}




export const  EditBusinessModal=({showBusinessEdit,setShowBusinessEdit}:{showBusinessEdit:boolean,setShowBusinessEdit:React.Dispatch<React.SetStateAction<boolean>>})=>{

  const        {updateBusiness}=useBusinessFunction()
 const  {setRegisterData,registerData} =useRegister()
 
  const   {theme}= useGlobal()
 const [isSubmitClicked,setIsSubmitClickd]=useState<boolean>(false)
 const [isActive,setIsActive]=useState<boolean>(false)
     const [isLoading,setIsLoading]=useState<boolean>(false)







const InputArray:InputArrayType[]=[



  {
    _id:1,
    params:{
 label:'Name',
  text:registerData.name,

  setText:(value:string)=>setRegisterData({...registerData,name:value}), 
   isSubmitClicked, 
   type:"text",
 
  
    }

  },

   {
    _id:2,
    params:{
 label:'Email',
  text:registerData.email,
 
  setText:(value:string)=>setRegisterData({...registerData,email:value}), 
   isSubmitClicked, 
   type:"text",
  
    }

  },


  





 

]









const handleSubmit=async()=>{

setIsLoading(true)
  if (!isActive)return
   try{
   await updateBusiness(registerData)
   }

   catch(err){

   }

   finally{
setIsLoading(false)
   }
}







useEffect(()=>{
 if (registerData.name && registerData.currency_name && registerData.currency_symbol && registerData.email){
  setIsActive(true)
 }

 else{
  setIsActive(false)
 }

},[registerData.name])







  return (
    <>



    <Modal
     visible={showBusinessEdit}
     animationType='slide'
     transparent={false}
         onRequestClose={() => setShowBusinessEdit(false)}
    >

 


<KeyboardAvoidingView
    style={[styles.modalBackground,{backgroundColor:theme.backgroundColor}]}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >


<View style={styles.addHeader}>
           
              <ClosePost title="Edit Business Info" isLoading={isLoading} isActive={isActive} trigger={handleSubmit} close={()=>setShowBusinessEdit(false)}  />
          </View>
          
          

          <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,width:"100%",paddingHorizontal:percentagePadding,}}>


<Text style={[,{color:theme.textColor,fontSize:h3,marginVertical:standardMarginVertical}]}>Edit Business Info</Text>





            {
      InputArray.map((item,index)=>{
        return (
          

          

          <View style={{marginTop:RFValue(20)}} key={index}>




                   
                        
                    <InputField {...item.params}/> 

                    
                     
        </View>
          
        
        )
      })
    }
<View style={styles.inputContainer}>

<Text style={[styles.currencyLabel,{color:theme.darkGreyText,}]}>Currency</Text>
<CurrencyBtn/>
</View>

          </ScrollView>




  </KeyboardAvoidingView>





     

    </Modal>
    </>
  )
}










export type TransactionRegisterDataType={
  amount:string,
  type:'debit'|'credit',
  notes:string,
  dueDate:number,
  createdAt:number

}



export const TransactionModal=()=>{
  const   {settings}  =useSettings()

  const thirtyDaysInMs = settings.debt.creditTerm * 24 * 60 * 60 * 1000;
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const {createTransaction}  =useTransactionFunction()
   const  {setTransactionMode,transactionMode,selectedCustomer}  =useBusiness()
   const  {business} =useAuth()
const initialData:TransactionRegisterDataType={
  amount:"",
  type:transactionMode==='debit'?'debit':"credit",
   notes:'',
    dueDate : Date.now() + thirtyDaysInMs,
    createdAt:Date.now()

}

  const  {theme}=useGlobal()
  const [data,setData]=useState<TransactionRegisterDataType>(initialData)
 const [intialTransactionDate,setInitialTransactionDate]=useState<Date>(new Date())
    const [intialdueDate,setInitialdueDate]= useState<Date>(() => {
  const intialTransactionDate = new Date();
  const futureDate = new Date(intialTransactionDate);
  futureDate.setDate(intialTransactionDate.getDate() + 30); // add 30 days
  return futureDate;
});



const [isActive, setIsActive] = useState<boolean>(false);
  const nameParam:InputType={
     label:`* Amount(${business.currency_symbol})`,
     text:data.amount,
     setText:(value:string)=>setData((prev)=>({...prev,amount:value})),
     isSubmitClicked:true,
     type:'number'

  }



const noteParam:InputType={
     label:`Notes`,
     text:data.notes,
     setText:(value:string)=>setData((prev)=>({...prev,notes:value})),
     isSubmitClicked:true,
     type:'text'

  }


  const handleSubmit=async()=>{

    if (!isActive) return
  setIsLoading(true)
    try{

  await createTransaction(data)

setData(initialData)

    }

    catch(err){

    }

    finally{

      setIsLoading(false)

    }

  

  }




useEffect(()=>{

  if (data.amount){
    setIsActive(true)
  }

  else{
    setIsActive(false)
  }

},[data.amount])


const onSelect=(param:Date)=>{
  setData((prev)=>({...prev,dueDate:param.getTime()}))
 setInitialdueDate(param)
}


const onDateSelect=(param:Date)=>{
 
  const dateInMilliSeconds=param.getTime()
const additionalDate= settings.debt.creditTerm*24*60*60*1000
  const addedDueDate=additionalDate+dateInMilliSeconds
   const  newInitialDueDate= new Date (addedDueDate)
  
  setData((prev)=>({...prev,createdAt:dateInMilliSeconds,dueDate:transactionMode==='debit'? addedDueDate:prev.dueDate }))
  setInitialTransactionDate(param)
 setInitialdueDate(newInitialDueDate)

}







const  showModal= transactionMode!=='neutral'?true:false

const title=transactionMode==='debit'?'Give Credit':'Accept Payment'







  return (
    <>  
    
    <Modal
              visible={showModal}
              animationType='none'
              transparent={false}
                  onRequestClose={() => setTransactionMode('neutral')}
             >
    
       
     <View style={{width:"100%",backgroundColor:theme.backgroundColor,paddingTop:standardMarginVertical*3}}>



<ClosePost title={title} isLoading={isLoading}  close={()=>setTransactionMode('neutral')} isActive={isActive}  trigger={handleSubmit}/>


     </View>

     <InnerLayOut>

      
        <View style={{width:'100%',}}>
<View  style={styles.nameContainer}>

      <View style={[styles.circle,{backgroundColor:theme.backgroundColor}]}>
        <Text style={{fontFamily:'Poppins-Medium',fontSize:h3,color:theme.textColor}}>{selectedCustomer.name[0].toUpperCase()}</Text>

      </View>

    

      <View>

        
         <Text style={{fontFamily:'Poppins-Medium',fontSize:bodySmall,color:theme.textColor,marginBottom:RFValue(1)}}>{selectedCustomer.name}</Text>

          <Text style={{fontFamily:'Poppins-Regular',fontSize:bodyExtraSmall,color:theme.darkGreyText}}>Total Debt: {business.currency_symbol} {absoluteNumber(selectedCustomer.totalDebt)}</Text>
      </View>

     </View>


    <View style={[styles.block,{backgroundColor:theme.backgroundColor}]}>

      <LineInputField {...nameParam}/>

    </View>

      <View style={[styles.block,{backgroundColor:theme.backgroundColor}]}>

      <LineInputField {...noteParam}/>

    </View>


     <View style={[styles.block,{backgroundColor:theme.backgroundColor}]}>

<DateComponent  initialDate={intialTransactionDate}  onSelect={onDateSelect} title={'Date Given'}/>
</View>


{
  transactionMode==='debit'  && (
    <>
    <View style={[styles.block,{backgroundColor:theme.backgroundColor}]}>

<DateComponent initialDate={intialdueDate}  onSelect={onSelect} title={'Due Date'}/>
</View>

    </>
  )
}




     </View>

     

    
  
   
    

     </InnerLayOut>

         
   
   

    
             </Modal>
    
    
    </>
  )
}















const styles=StyleSheet.create({

 currencyLabel:{
   fontSize:bodySmall,
  marginTop:RFValue(10),
  marginBottom:-standardMarginVertical*1.5
    
  },

  inputContainer:{
    width:'100%',
    alignSelf:"center",
    marginVertical:standardMarginVertical*2
   
  },


 inputLabel:{
   fontSize:bodySmall,
    marginBottom:10,
  },

circle:{
   width:RFValue(50),
   aspectRatio:1,
   borderRadius:RFValue(50),
   justifyContent:'center',
   alignItems:'center',
   marginRight:RFValue(10)
},

nameContainer:{
flexDirection:"row",
justifyContent:"flex-start",
width:"100%",
alignItems:"center",
marginVertical:standardMarginVertical

},
block:{
  width:'100%',
  padding:percentagePadding,
marginVertical:standardMarginVertical,
borderRadius:standardBorderRadius*0.5


},




 modal:{
  width:"100%",
  height:'100%',

 },



    detailModal:{
    width:"100%",
    borderWidth:1,
    padding:percentagePadding
  },

  label:{
    fontSize:bodySmall,
    fontFamily:"Poppins-Regular",
    marginBottom:standardMarginVertical*0.5
  },
detailLine:{
  width:'100%',
  marginBottom:standardMarginVertical*1

},

 mainLabel:{
    fontSize:bodySmall,
    fontFamily:"Poppins-Bold",
    marginBottom:standardMarginVertical
  },
addIndicator:{
fontSize:bodySmall,fontFamily:"Poppins-Medium",
marginVertical:standardMarginVertical,
marginLeft:RFValue(10)
},
modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop:standardPaddingVertical*1.5,
    position:"relative"
  },

 



 addHeader:{
    width:"100%",
   
    
  },


  addBottom:{
    width:"100%",
    height:50,
    flexDirection:"row",
    justifyContent:'flex-end',
    alignItems:'center',
  
  },



})