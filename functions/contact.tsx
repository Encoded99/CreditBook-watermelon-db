import * as Linking from 'expo-linking';


type ChannelType='whatsapp'|'sms'|'call'

export type CommunicationType={
 channel:ChannelType,
 phone:string,
 message?:string,
}

export const useContactFunction=()=>{


 const normalizePhoneNumber = (phone: string) => {
  // remove spaces, dashes, brackets
  let cleaned = phone.replace(/[\s()-]/g, '');

  // if it starts with '0', replace with '+234'
  if (cleaned.startsWith('0')) {
    cleaned = '+234' + cleaned.slice(1);
  }
  // if it starts with '234', add '+'
  else if (cleaned.startsWith('234')) {
    cleaned = '+' + cleaned;
  }
  // if it already starts with '+', do nothing
  return cleaned;
};



  const  contactCustomer=async(param:CommunicationType)=>{

   const     {phone,message,channel}  =param


   
if (!phone){
  alert ('kindly input customers phone number')
  return
}

const phoneNumber=normalizePhoneNumber(phone)


   if (channel==='sms'){
 const encodedMessage = encodeURIComponent(message || '');
  Linking.openURL(`sms:${phoneNumber}?body=${encodedMessage}`);
   }

   if (channel=='whatsapp'){
   const encodedMessage = encodeURIComponent(message || '');
  Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`);
   }

   if (channel==='call'){

     Linking.openURL(`tel:${phoneNumber}`);

   }

 

  }


  return {
   contactCustomer
  }
}