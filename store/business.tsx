
import {create} from 'zustand'
import { Customer } from '@/database/model/customer'






export type CustomerType = {
  id?: string;

  name: string;
  businessId: string;

  totalDebtGiven: number;
  totalDebtPaid: number;
  totalDebt: number;

  phone?: string;
  address?: string;
  avatar?: string;
  notes?: string;

  createdAt: number;
  updatedAt: number;
  lastTransactionAt?: number;

  dueDate: number;
  reminderDaysBefore?: number;
  creditLimit?: number;
  scoreLastUpdated?: number;
};



export const initialCustomer: CustomerType = {
  id: undefined,

  name: '',
  businessId: '',

  totalDebtGiven: 0,
  totalDebtPaid: 0,
  totalDebt: 0,

  phone: '',
  address: '',
  avatar: '',
  notes: '',

  createdAt: Date.now(),
  updatedAt: Date.now(),
  lastTransactionAt: undefined,

  dueDate: Date.now(),
  reminderDaysBefore: undefined,
  creditLimit: undefined,
  scoreLastUpdated: undefined,
};


type TransactionMode='credit'|'debit'|'neutral'





export type TransactionType={
  amount:number,
  type:string,
  notes?:string,
  createdAt:number,
  dueDate:number,
  id:string,
}



const initialTransaction:TransactionType={
  amount:0,
  type:"debt_taken",
  dueDate:0,
  createdAt:0,
  notes:"",
  id:''
}


type DashBoardType={
   dueDebt:CustomerType[],
   almostDue:CustomerType[],
    highestDebt:CustomerType[],
    totalCustomer:number
}

const initialDashBoardData={
     dueDebt:[],
      almostDue:[],
       highestDebt:[],
       totalCustomer:0
}


type UseBusinessType={
      dashBoardData:DashBoardType,
      setDashBoardData:(param:DashBoardType)=>void,
    customers:CustomerType[],
    setCustomers:(param:CustomerType[])=>void
   setHideBalance:(param:boolean)=>void,
      hideBalance:boolean,
    selectedCustomer:CustomerType,
    setSelectedCustomer:(param:CustomerType)=>void
    transactionMode:TransactionMode
    setTransactionMode:(param:Partial<TransactionMode>)=>void,
     selectedTransaction:TransactionType,
    setSelectedTransaction:(param:TransactionType)=>void,


}






export const useBusiness=create<UseBusinessType>((set)=>({

   dashBoardData:initialDashBoardData,
   setDashBoardData:(param)=>set({dashBoardData:param}),

   transactionMode:"neutral",
   setTransactionMode:(param)=>set({transactionMode:param}),
  customers:[],
  setCustomers:(param)=>set({customers:param}),
  hideBalance:false,
    setHideBalance:(param)=>set({hideBalance:param}),
    selectedCustomer:initialCustomer,
    setSelectedCustomer:(param)=>set({selectedCustomer:param}),
     selectedTransaction:initialTransaction,
    setSelectedTransaction:(param)=>set({selectedTransaction:param}),


  
}))

