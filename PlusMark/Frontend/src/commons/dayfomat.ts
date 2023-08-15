export const dayFormat = (dateTime?: number, isHour?: boolean) => {
    const date = dateTime ? new Date(dateTime) : new Date();
    const year = date.getFullYear();
  
    let month: number | string = date.getMonth() + 1;
    let day: number | string = date.getDate();
    let hour: number | string = date.getHours();
    let minute: number | string = date.getMinutes();
  
    
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    let today = `${year}-${month}-${day}`;
    if (isHour) {
      today = `${hour}:${minute}:${day}/${month}/${year}`;
    }
    return today;
  };