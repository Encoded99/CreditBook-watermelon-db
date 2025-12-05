import moment from "moment"

export const absoluteNumber=(param:number)=>{


 return  Math.abs(param).toLocaleString()

}


export const  ArrangedDate=(param:number)=>{


 return   moment(param).format("DD MMM YYYY - H:mm A")

}

export function capitalizeFirstLetter(str:string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}