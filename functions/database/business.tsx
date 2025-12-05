import { database } from "@/database";
import { Business } from "@/database/model/business";
import {  initialBusiness, initialData, RegisterDataType, useAuth, useRegister } from "@/store/auth";
import * as SecureStore from 'expo-secure-store';
import { useNavigationFunction } from "../navigation";

















export const useBusinessFunction=()=>{
const   {setRegisterData} =useRegister()
const   {setIsError,setResponseMessage,setBusiness}=useAuth()
const       {safeRoute}   =useNavigationFunction()







async function clearDatabasePermanently() {
  try {

    
        
    await database.write(async () => {
      // Manually list all your collection names
      const collectionNames = ['customers', 'transactions', 'businesses']; 

      for (const name of collectionNames) {
        const collection = database.collections.get(name);
        const allRecords = await collection.query().fetch();
        await Promise.all(allRecords.map(record => record.destroyPermanently()));
      }
    });
    console.log('All data permanently deleted');
  
    safeRoute('/(auth)/(register)')
  } catch (error) {
    console.error('Failed to clear database:', error);
  }
}










const businessToData = (b: Business) => ({
  id: b.id,
  name: b.name,
  currency_name: b.currency_name,
  currency_symbol: b.currency_symbol,
  total_debt_paid: b.total_debt_paid,
  total_debt_given: b.total_debt_given,
  total_customer: b.total_customer,
  address: b.address ?? "",
  email: b.email ?? "",
  createdAt: b.createdAt,
  updatedAt: b.updatedAt,
   ownerName: b.ownerName ?? "",
  phone: b.phone ?? "",
  notes: b.notes ?? "",
})












 
 const createBusiness = async (data: RegisterDataType) => {






   const businessesCollection = database.collections.get<Business>('businesses');
   
  try {
    await database.write(async () => {
     

      // Check if a business already exists
      const existing = await businessesCollection.query().fetch();
      if (existing.length > 0) {
        console.log('Business already exists');
        setResponseMessage('A business already exists');
        setIsError(true);
        return;
      }


      // Create a new business
      const newBusiness = await businessesCollection.create(business => {
        business.name = data.name;
        business.email = data.email;
        business.password = data.password;
        business.currency_name = data.currency_name;
        business.currency_symbol = data.currency_symbol;
        business.total_debt_given=0;
        business.total_debt_paid=0;
        business.total_customer=0;
        business.createdAt = Date.now();
        business.updatedAt = Date.now();
      });

      
    await SecureStore.setItem('secure-pin',data.password)
      setIsError(false);
      setResponseMessage('Success');
      setRegisterData(initialData);
          
     
      setBusiness(businessToData(newBusiness));
    });
  } catch (err) {
    console.log('Error creating business:', err);
    setIsError(true);
    setResponseMessage('Error creating business');
  }

 
};



const updatePassword = async (param: string) => {



   
  try {
    await database.write(async () => {
      const businessesCollection = database.collections.get<Business>('businesses');

      // Check if a business already exists
      const existing = await businessesCollection.query().fetch();
      if (existing.length === 0) {
        setResponseMessage('No business found');
        setIsError(true);
        return;
      }

const businessGotten= existing[0]
      const newBusiness = await businessGotten.update(business => {
        
        business.password = param;
       
      });

   
    await SecureStore.setItem('secure-pin',param)
      setIsError(false);
      setResponseMessage('Success');
  
     
    });
  } catch (err) {
   
    setIsError(true);
    setResponseMessage('Error creating business');
  }

 
};



const updateBusiness = async (param:RegisterDataType) => {



   
  try {
    await database.write(async () => {
      const businessesCollection = database.collections.get<Business>('businesses');

      // Check if a business already exists
      const existing = await businessesCollection.query().fetch();
      if (existing.length === 0) {
        setResponseMessage('No business found');
        setIsError(true);
        return;
      }

const businessGotten= existing[0]
      const newBusiness = await businessGotten.update(business => {
        
        business.name = param.name?param.name:businessGotten.name;
         business.currency_name =param.currency_name?param.currency_name:businessGotten.currency_name;
           business.currency_symbol =param.currency_symbol?param.currency_symbol:businessGotten.currency_symbol;
            business.email = param.email?param.email:businessGotten.email;
       
      });



      setBusiness(businessToData(businessGotten))

   
   
      setIsError(false);
      setResponseMessage('Updated');
  
     
    });
  } catch (err) {
   
    setIsError(true);
    setResponseMessage('Error creating business');
  }

 
};







 return {
  createBusiness,
  updatePassword,
  businessToData,
  updateBusiness,
  clearDatabasePermanently,
 }
}




