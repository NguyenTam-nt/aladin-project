 export const fornatDateHour = (stringDate:string) => {
  const dateFomat = new Date(stringDate);
  let year: any = dateFomat.getFullYear();
  let month: any = dateFomat.getMonth() + 1;
  let day: any = dateFomat.getDate();
  let hour: any = dateFomat.getHours();
  let minus: any = dateFomat.getMinutes();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minus < 10) {
    minus = `0${minus}`;
  }
  return `${hour}:${minus}`;
}