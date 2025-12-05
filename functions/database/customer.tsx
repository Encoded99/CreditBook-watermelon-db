import { database } from "@/database";
import { Business } from "@/database/model/business";
import { Customer } from "@/database/model/customer";
import {CustomerDataType,  useAuth, useRegister,initialCustomData } from "@/store/auth";
import { Q } from '@nozbe/watermelondb';
import { useBusinessFunction } from "./business";
import { CustomerType, useBusiness } from "@/store/business";



export const useCustomerFunction=()=>{
const   {setCustomerData} =useRegister()
const           {setDashBoardData}         =useBusiness()
const   {setIsError,setResponseMessage,business,setBusiness}=useAuth()
 const   {businessToData,}     =useBusinessFunction()
const    {selectedCustomer,setSelectedCustomer}  =useBusiness()






 const customerToData = (c: Customer): CustomerType => ({
  id: c.id,

  name: c.name,
  businessId: c.businessId,

  totalDebtGiven: c.totalDebtGiven,
  totalDebtPaid: c.totalDebtPaid,
  totalDebt: c.totalDebt,

  phone: c.phone ?? '',
  address: c.address ?? '',
  avatar: c.avatar ?? '',
  notes: c.notes ?? '',

  createdAt: c.createdAt,
  updatedAt: c.updatedAt,
  lastTransactionAt: c.lastTransactionAt ?? undefined,

  dueDate: c.dueDate,
  reminderDaysBefore: c.reminderDaysBefore ?? undefined,
  creditLimit: c.creditLimit ?? undefined,
  scoreLastUpdated: c.scoreLastUpdated ?? undefined,
});



 








 const createCustomer = async (data: CustomerDataType) => {


  try {
  const customerCollection = database.collections.get<Customer>('customers');

   
const foundBusiness= await database.get<Business>('businesses').find(business.id)
  
if (!foundBusiness){
  throw Error('Equivalent business not found')
}
   
 const doesCustomerExist = await customerCollection.query(Q.where('name',data.name.toLowerCase())).fetch()



    await database.write(async () => {
    

      // Check if a business already exists
   
      if (doesCustomerExist.length>0) {
        setResponseMessage('this customer already exists');
        setIsError(true);
        return;
      }


      // Create a new business
      const newCustomer = await customerCollection.create(customer => {
        customer.name = data.name.toLowerCase();
        customer.phone = data.phone;
           customer.address = data.address;
          customer.notes = data.notes;
        customer.totalDebtGiven=0;
        customer.totalDebtPaid=0;
        customer.totalDebt=0;
        customer.reminderDaysBefore=7;
        customer.businessId=business.id!;
        customer.createdAt = Date.now();
        customer.updatedAt = Date.now();
      });





     await foundBusiness.update((b)=>{b.total_customer=foundBusiness.total_customer+1})
      
    setBusiness(businessToData(foundBusiness))
      setIsError(false);
      setResponseMessage('Created');
     // setRegisterData(initialData);
  setCustomerData(initialCustomData)
     
    });
  } catch (err) {
    console.log('Error creating customer:', err);
    setIsError(true);
    setResponseMessage('Error creating customer');
  }

 
};


const updateCustomer = async (data: CustomerDataType) => {


  try {
  const customerCollection = database.collections.get<Customer>('customers');

   
const foundBusiness= await database.get<Business>('businesses').find(business.id)
  
if (!foundBusiness){
  throw Error('Equivalent business not found')
}
   
if (!selectedCustomer.id){
    throw Error('customer not found')
}

 const doesCustomerExist = await customerCollection.query(Q.where('id',selectedCustomer.id)).fetch()

 if (doesCustomerExist.length===0) {
        setResponseMessage('this customer does not exists');
        setIsError(true);
        return;
      }

    await database.write(async () => {
    

      // Check if a business already exists
   
     


      // Create a new business
      const updatedCustomer = await doesCustomerExist[0].update(customer => {
        customer.name = data.name.toLowerCase();
        customer.phone = data.phone;
           customer.address = data.address;
          customer.notes = data.notes;
       
      
      });





      
   
      setSelectedCustomer(updatedCustomer)
    
  setCustomerData(initialCustomData)

  setIsError(false);
      setResponseMessage('Updated');
     
    });
  } catch (err) {
    console.log('Error updating customer:', err);
    setIsError(true);
    setResponseMessage('Error updating customer');
  }

 
};



const fetchDashBoardData=async()=>{

  const now =Date.now()
  const sevenDays= 7*24*60*60*1000
  try{
  const customerCollection= database.collections.get<Customer>('customers')

  const highestDebt=await customerCollection.query(Q.where('total_debt',Q.lt(0)),Q.sortBy('total_debt','asc'),Q.take(3)).fetch()

    const  dueDebt=await customerCollection.query(Q.where('due_date',Q.lt(now),),Q.where('due_date',Q.notEq(0)), Q.sortBy('due_date','asc'),Q.take(3)).fetch()
const almostDue = await customerCollection.query(
  Q.where('due_date', Q.gt(now)),                 // not overdue
  Q.where('due_date', Q.lt(now + sevenDays)),Q.where('due_date',Q.notEq(0)),     // due within the next 7 days
  Q.sortBy('due_date', 'asc'),
  Q.take(3)
).fetch();

const totalCustomer = await customerCollection.query().fetchCount()





const object={
  dueDebt:dueDebt?.length>0 ? dueDebt.map((item)=>customerToData(item)):[],
  almostDue: almostDue?.length>0? almostDue.map((item)=>customerToData(item)):[],
    highestDebt:highestDebt?.length>0?  highestDebt.map((item)=>customerToData(item)):[],
    totalCustomer:totalCustomer?totalCustomer:0


}

setDashBoardData(object)



  }

  catch(err){
   throw err
  }

  
}




 return {
  createCustomer,
  customerToData,
  updateCustomer,
  fetchDashBoardData
 
 }
}




