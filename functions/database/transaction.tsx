
import { database } from "@/database";
import { Transaction } from "@/database/model/transaction";
import { Customer } from "@/database/model/customer";
import { Business } from "@/database/model/business";
import { TransactionRegisterDataType } from "@/components/ui/modal";
import { TransactionType, useBusiness } from "@/store/business";
import { useAuth } from "@/store/auth";
import { Q } from "@nozbe/watermelondb";
import { useBusinessFunction } from "./business";
import { useCustomerFunction } from "./customer";









export const useTransactionFunction=()=>{
const {selectedCustomer,transactionMode,setSelectedCustomer}=useBusiness()
const {setResponseMessage,setIsError,business,setBusiness} =useAuth()
const  {businessToData}=useBusinessFunction()
const {customerToData}=useCustomerFunction()





const transactionToData = (t: Transaction):TransactionType => ({
  id: t.id,
  type: t.type,
  amount: t.amount,
  dueDate: t.dueDate,
  createdAt: t.createdAt,
  notes: t.notes ?? "",
})














 const createTransaction=async(data:TransactionRegisterDataType)=>{
  
 
     try{
 
 
    const customerCollection= database.collections.get<Customer>('customers')

if (!selectedCustomer.id){
     throw Error ('customer not found')
}
    

     const foundCustomerArray= await customerCollection.query(Q.where('id',selectedCustomer.id))

     const  foundCustomer=foundCustomerArray[0]

   if (!foundCustomer){

     throw Error ('customer not found')

    }

const foundBusiness= await database.get<Business>('businesses').find(business.id)
  
if (!foundBusiness){
  throw Error('Equivalent business not found')
}
const parsedNumber=parseFloat(data.amount)
const finalNumber=transactionMode==='debit'?-parsedNumber:parsedNumber

   
     const transactionCollection= await database.collections.get<Transaction>('transactions')

database.write(async()=>{

 const newTransaction= await transactionCollection.create(transaction=>{
  transaction.amount=finalNumber;
  transaction.type=transactionMode==='debit'?'debt_taken':'debt_paid';
  transaction.notes=data.notes;
  transaction.dueDate=data.dueDate;
  transaction.businessId=business.id;
  transaction.customerId=selectedCustomer.id?selectedCustomer.id:"";
  transaction.createdAt=data.createdAt;
  transaction.reminderDaysBefore=7;
  transaction.dueDate=data.dueDate;

 })


 const updatedBusiness= await foundBusiness.update((business)=>{
    business.total_debt_given=transactionMode==='debit'? foundBusiness.total_debt_given+parsedNumber:foundBusiness.total_debt_given;
     business.total_debt_paid=transactionMode==='credit'? foundBusiness.total_debt_paid+parsedNumber:foundBusiness.total_debt_paid;

 })

const updatedCustomer =await foundCustomer.update((customer)=>{
customer.totalDebtGiven=transactionMode==='debit'? foundCustomer.totalDebtGiven+parsedNumber:foundCustomer.totalDebtGiven;
     customer.totalDebtPaid=transactionMode==='credit'? foundCustomer.totalDebtPaid+parsedNumber:foundCustomer.totalDebtPaid;
       customer.totalDebt=foundCustomer.totalDebt+finalNumber;
       customer.dueDate=data.dueDate?data.dueDate:foundCustomer.dueDate;
       customer.lastTransactionAt=Date.now();
       customer.dueReminder=false;
       customer.almostDueReminder=false;

})


setBusiness(businessToData(updatedBusiness))
setSelectedCustomer(customerToData(updatedCustomer))

})

 setIsError(false)
      setResponseMessage('Saved')

 
 
     }
 
     catch(err){
      console.log(err,'error -creating transaction')
      setIsError(true)
      setResponseMessage('Error creating transaction')
     }
 
     finally{
 
     }
 
   
 
   }

   return {
 createTransaction,
 transactionToData
   }
 
}