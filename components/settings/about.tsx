import { View, Text, StyleSheet,ScrollView,TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { BackArrowTitle } from '../ui/heading'
import { useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { bodyExtraSmall, bodySmall, percentagePadding, } from '@/custom'
import { Feather } from '@expo/vector-icons'
import { useSettings } from '@/store/settings'

import { faqData } from '@/data/qa'
import { useSafeAreaInsets } from 'react-native-safe-area-context'



const FAQ = () => {
  const [addedIndex,setAddedIndex]=useState<number[]>([])
const   {setModal} =useSettings()
 const {theme} =useGlobal()


const handlePress=(param:number)=>{
     
    if (addedIndex.includes(param)){
      const filter = addedIndex.filter((item)=>item!==param)
      setAddedIndex(filter)
    }

    else{
      setAddedIndex((prev)=>[...prev,param])
    }

  }


const insets= useSafeAreaInsets()





  return (
    <View style={{width:"100%",flex:1}}>
    
     <BackArrowTitle handleBack={()=>setModal(null)} title='FAQ'/>

<View style={{width:"100%",flex:1,paddingBottom:insets.top}}>

    <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%',paddingBottom:RFValue(100)}}>
 {
      faqData.map((item,index)=>{

const isAdded=addedIndex.includes(index)


        return (
          <View style={[styles.QaLine,{borderBottomColor:theme.borderColor}]}
          key={index}
          >
        <TouchableOpacity style={styles.questionLine}
              onPress={()=>handlePress(index)}
        >
          <View style={styles.iconTextHolder}>
            <Feather color={theme.textColor}   name="message-circle"  size={RFValue(25)}/>
            <Text style={[styles.questionText,{color:theme.textColor}]}>
               {item.question}
            </Text>

          </View>
              

              <View style={{width:'20%',alignItems:"flex-end"}}
              
          
              >

                
              {
                !isAdded && (
                  <>
                  <Feather  color={theme.textColor} name='chevron-down' size={RFValue(25)}
     
          />
 
                  </>
                )
              }

                 {
                isAdded && (
                  <>
                 <MaterialCommunityIcons  color={theme.textColor} name='chevron-up' size={RFValue(30)}
        
          />
 
                  </>
                )
              }

              </View>

         
       
        </TouchableOpacity>
         {
          isAdded  && (
            <>
             <View style={styles.answerLine}>
          <Text
          style={[styles.answerText,{color:theme.textColor}]}
          >{item.answer}</Text>

        </View>

            </>
          )
         }
       


          </View>
        )
      })
    }
    </ScrollView>
   

</View>





    </View>
  )
}


const styles=StyleSheet.create({
  QaLine:{
    borderBottomWidth:1,
    width:"100%",
   paddingHorizontal:percentagePadding
  },
  questionLine:{
    width:"100%",
    flexDirection:'row',
    paddingVertical:percentagePadding,
    alignItems:"flex-start"
  },
  iconTextHolder:{
    width:"80%",
    alignItems:"flex-start",
        flexDirection:'row',
       
  },
  questionText:{
    fontFamily:"Poppins-Regular",
    fontSize:bodyExtraSmall,
    flexWrap:"wrap",
    marginLeft:"5%",
    alignItems:"flex-start"
  },
  answerLine:{
    width:"100%"
  },

  answerText:{
 fontFamily:"Poppins-Regular",
    fontSize:bodyExtraSmall,
    textAlign:"justify",
    lineHeight:RFValue(20),
     paddingBottom:RFValue(15),
  }

})


export default FAQ