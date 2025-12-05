import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BackArrowTitle } from '../ui/heading'
import { useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { bodyExtraSmall } from '@/custom'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { SubmitBtn, SubmitBtnType } from '../element'
import { useSettings } from '@/store/settings'
import { useBusinessFunction } from '@/functions/database/business'


const DeleteDataWarning = () => {
   const  {clearDatabasePermanently} =useBusinessFunction()
 const   {setModal} =useSettings()
  const { theme } = useGlobal()
  const [checked, setChecked] = useState(false)
  const [isActive,setIsActive]=useState<boolean>(false)
  const handleDelete = async() => {
    if (!checked) {
      alert("Please confirm by checking the box before deleting.")
      return
    }
   await clearDatabasePermanently()
  }


const btnProp:SubmitBtnType={
  isActive,
  type:"danger",
  trigger:handleDelete,
  text:'Delete Data'

}



useEffect(()=>{

 if (checked){
  setIsActive(true)
 }
else{
 setIsActive(false)
}
},[checked])




  const handleBackup = () => {
    // navigate to backup flow
    alert("Redirecting to backup...")
  }

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <BackArrowTitle handleBack={()=>setModal(null)}  title="Delete Data" />

      <View style={[styles.warningContainer, { borderColor: theme.borderColor }]}>
        <View style={styles.iconContainer}>
          <Feather name="alert-triangle" size={RFValue(24)} color={theme.indicatorColor} />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.warningTitle, { color: theme.textColor }]}>
            Delete All Data
          </Text>
          <Text style={[styles.warningDescription, { color: theme.textColor }]}>
            If you delete your data, you will lose everything in this app. 
            Make sure you back up before proceeding.
          </Text>
        </View>
      </View>

      <Pressable style={styles.backupButton} onPress={handleBackup}>
        <Text style={[styles.backupText, { color: theme.indicatorColor }]}>
          Backup Your Data
        </Text>
      </Pressable>

      <View style={styles.checkboxContainer}>
        <Pressable onPress={() => setChecked(!checked)}>
          <MaterialCommunityIcons
            name={checked ? "checkbox-marked" : "checkbox-blank-outline"}
            size={RFValue(24)}
            color={checked ? theme.indicatorColor : theme.darkGreyText}
          />
        </Pressable>
        <Text style={[styles.checkboxLabel, { color: theme.textColor }]}>
          I understand the risk and want to delete my data
        </Text>
      </View>


      <SubmitBtn  prop={btnProp}/>
    </View>
  )
}

const styles = StyleSheet.create({
  warningContainer: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    alignItems: "center"
  },
  iconContainer: {
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  warningTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: bodyExtraSmall,
    marginBottom: 5
  },
  warningDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: bodyExtraSmall
  },
  backupButton: {
    marginTop: 20,
    padding: 10,
    alignSelf: "flex-start"
  },
  backupText: {
    fontFamily: "Poppins-Medium",
    fontSize: bodyExtraSmall
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30
  },
  checkboxLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: bodyExtraSmall,
    marginLeft: 10,
    flex: 1
  },
  deleteButton: {
    marginTop: 40,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  deleteText: {
    color: "white",
    fontFamily: "Poppins-Medium",
    fontSize: bodyExtraSmall
  }
})

export default DeleteDataWarning
