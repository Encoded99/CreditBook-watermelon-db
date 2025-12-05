import {create} from 'zustand'



export type Currency = {
  name: string;
  symbol: string;
};


export type RegisterDataType={
 name:string,
currency_symbol:string,
 email:string,
 password:string,
currency_name:string,
}

export const currencies: Currency[] = [
  { name: "Nigerian Naira", symbol: "₦" },      // &#8358;
  { name: "Ghanaian Cedi", symbol: "₵" },       // &#8373;
  { name: "Kenyan Shilling", symbol: "₨" },     // &#x20A8;
  { name: "South African Rand", symbol: "R" },  // &#82;
  { name: "US Dollar", symbol: "$" },           // &#36;
  { name: "British Pound", symbol: "£" },       // &#163;
  { name: "Euro", symbol: "€" },                // &#8364;
  { name: "Japanese Yen", symbol: "¥" },        // &#165;
  { name: "Indian Rupee", symbol: "₹" }         // &#8377;
];





export const  initialData:RegisterDataType={
 email:"",
 password:"",
 name:"",


currency_name:"Nigerian Naira",
currency_symbol:"₦"
}


export type  CustomerDataType={
  name:string,
  phone:string,
  address:string,
  notes:string,
    business_id:string,
}


export const initialCustomData:CustomerDataType={
  name:'',
  phone:'',
  address:'',
  notes:'',
  business_id:''

}



type UseRegisterType={
  customerData:CustomerDataType,
  setCustomerData:(value:Partial<CustomerDataType>)=>void,

  
  
 registerData:RegisterDataType,
  setRegisterData:(value:Partial<RegisterDataType>)=>void,
  editData:RegisterDataType,
  setEditData:(value:Partial<RegisterDataType>)=>void
  
}




export  const useRegister= create<UseRegisterType>((set)=>({
customerData:initialCustomData,
 setCustomerData:(value)=>set((state)=>({customerData:{...state.customerData,...value}})),
 registerData:initialData,
 setRegisterData:(value)=>set((state)=>({registerData:{...state.registerData,...value}})),
 editData:initialData,
 setEditData:(value)=>set((state)=>({editData:{...state.editData,...value}}))


}))








export type BusinessType = {
  id: string
  name: string
  currency_name: string
  currency_symbol: string
  total_debt_paid: number
  total_debt_given: number
  total_customer: number
  address: string
  email: string
  createdAt: number
  updatedAt: number
   ownerName:string,
   phone:string,
   notes:string,
}











export const initialBusiness: BusinessType = {
  id: '',
  name: '',
  total_debt_given: 0,
  total_debt_paid: 0,
  total_customer: 0,
  ownerName: '',      // optional
  address: '',        // optional
  phone: '',          // optional, previously missing
  email: '',          // optional
  currency_name: '',
  currency_symbol: '',
  notes: '',          // optional, previously missing
  createdAt: Date.now(),
  updatedAt: Date.now(),
  
}






type UseAuthType={
  responseMessage:string,
   setResponseMessage:(param:string)=>void,
   isError:boolean,
   setIsError:(param:boolean)=>void,
   business:BusinessType,
   setBusiness:(value:BusinessType)=>void,
   shortResponseMessage:string,
   setShortResponseMessage:(param:string)=>void,
   showAddCustomer:boolean,
   setShowAddCustomer:(param:boolean)=>void,
showEdit:boolean,
   setShowEdit:(param:boolean)=>void,
  
}













export const useAuth=create<UseAuthType>((set)=>({

  showAddCustomer:false,
  setShowAddCustomer:(value)=>set({showAddCustomer:value}),

  
  showEdit:false,
  setShowEdit:(value)=>set({showEdit:value}),
  responseMessage:'',
  setResponseMessage:(value)=>set({responseMessage:value}),
  isError:false,
   setIsError:(value)=>set({isError:value}),
   business:initialBusiness,
   setBusiness:(value)=>set({business
    :value}),
   shortResponseMessage:'',
  setShortResponseMessage:(value)=>set({shortResponseMessage:value}),
}))





