

import FAQ from "@/components/settings/about"
import { create } from "zustand"




type SettingsType={
  notifications:{
    overDue:boolean,
    almostDue:boolean,
  },
  debt:{
  creditTerm:number,
  almostDueDays:number
  }

}


const initialSettings={
    notifications:{
    overDue:true,
    almostDue:true,
  },
  debt:{
  creditTerm:30,
  almostDueDays:7,
  }
}


export type UseSettingsType={
  modal:React.ReactNode,
  setModal:(param:React.ReactNode)=>void,
  settings:SettingsType,
  setSettings:(param:Partial<SettingsType>)=>void
  
}

export const useSettings=create<UseSettingsType>((set)=>({
 modal:null,
 setModal:(param)=>set({modal:param}),
 settings:initialSettings,
 setSettings: (param) =>
  set((state) => ({
    settings: { ...state.settings, ...param }, 
  })),

}))


