export const FomatDateYY_MM_DD = (stringDate: string, isTime?:boolean) => {
  const dateFomat = new Date(stringDate);
  let year: any = dateFomat.getFullYear();
  let month: any = dateFomat.getMonth() + 1;
  let day: any = dateFomat.getDate();
  let hour: any = dateFomat.getHours();
  let minutes: any = dateFomat.getMinutes();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  if(hour < 10){
    hour = `0${hour}`
  }
  if(minutes < 10){
    minutes = `0${minutes}`
  }
  
  if(isTime) return `${hour}:${minutes}`
  return `${year}-${month}-${day}`;
};
