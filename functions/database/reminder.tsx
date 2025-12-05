import { database } from "@/database"
import { Q } from "@nozbe/watermelondb"
import { Customer } from "@/database/model/customer"
import * as Notifications from 'expo-notifications';
import { useSettings } from "@/store/settings";





export const fetchReminders= async()=>{
const settings=useSettings.getState()
const almostDueDays=settings.settings.debt.almostDueDays
   const now =Date.now()
   const sevenDays= almostDueDays*24*60*60*1000

try{

 const customerCollection= database.collections.get<Customer>('customers')

  const  dueDebtReminder=await customerCollection.query(Q.where('due_date',Q.lt(now),),Q.where('due_date',Q.notEq(0)),Q.where('due_reminder',Q.eq(false))).fetch()
  const almostDueReminder = await customerCollection.query(
    Q.where('due_date', Q.gt(now)),Q.where('almost_due_reminder',Q.eq(false)),
    Q.where('due_date', Q.lt(now + sevenDays)),Q.where('due_date',Q.notEq(0)),     // due within the next 7 days
    Q.sortBy('due_date', 'asc')
  ).fetch();



if (dueDebtReminder.length > 0) {

const count = dueDebtReminder.length;


 await Notifications.scheduleNotificationAsync({
    content: {
      title: "⚠️ Customers Are Owing You Money!",
     body: `${count} customer${count > 1 ? 's' : ''} still owe you money — and it's already overdue. Act now before it becomes a loss!`,
      data: { data: 'due-debt' },
    },
    trigger: {
      type: "timeInterval",  
      seconds: 2,
      repeats: false,
    } as any
  });




await database.write(async () => {
  database.batch(
    ...dueDebtReminder.map((customer: Customer) =>
      customer.prepareUpdate(c => {
        c.dueReminder = true;
      })
    )
  );
});


}



if (almostDueReminder.length > 0) {

const count = almostDueReminder.length;


 await Notifications.scheduleNotificationAsync({
    content: {
      title: "⚠️ WARNING: Payment Due Soon!",
body: `${count} customer${count > 1 ? 's' : ''} are close to owing you. Take action now to secure your money!`,
      data: { data: 'almost-due-debt' },
    },
    trigger: {
      type: "timeInterval",  
      seconds: 2,
      repeats: false,
    } as any
  });



  await database.write(async () => {
  database.batch(
    ...dueDebtReminder.map((customer: Customer) =>
      customer.prepareUpdate(c => {
        c.almostDueReminder = true;
      })
    )
  );
});

}




  

  }



catch(err){

 console.log(err,'error fetching reminders')

}
}















