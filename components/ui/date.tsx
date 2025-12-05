import { useGlobal } from '@/app/context';
import { bodySmall, standardMarginVertical } from '@/custom';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { RFValue } from 'react-native-responsive-fontsize';

export default function DateComponent({ title,onSelect,initialDate  }: { title: string,onSelect:(param:Date)=>void,initialDate:Date }) {
  const { theme } = useGlobal();
const [date, setDate] = useState<Date>(initialDate);
  const [open, setOpen] = useState(false);




React.useEffect(() => {
  setDate(initialDate);
}, [initialDate]);



  return (
    <View style={{ marginVertical: 10 }}>
   
      <Text style={[styles.label, { color: theme.darkGreyText }]}>{title}</Text>

    
      <TouchableOpacity
        style={[styles.dateBox, { backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }]}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <Text style={{ fontFamily: 'Poppins-Medium', color: theme.textColor, fontSize: RFValue(14) }}>
          {date.toDateString()}
        </Text>
        <Feather name="chevron-down" size={RFValue(20)} color={theme.textColor} />
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(selectedDate) => {
          setOpen(false);
         // setDate(selectedDate);
          onSelect(selectedDate)
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
   label:{
     fontSize:bodySmall,
     fontFamily:"Poppins-Regular",
     marginBottom:standardMarginVertical
   },
  dateBox: {
    flexDirection: 'row', // so text and icon sit in one row
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(15),
    borderRadius: RFValue(8),
    borderWidth: 1,
  },
});
