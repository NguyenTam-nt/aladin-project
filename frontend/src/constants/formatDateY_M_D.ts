export const FomatDateYY_MM_DD = (stringDate: string) => {
  const dateFomat = new Date(stringDate);
  let year: any = dateFomat.getFullYear();
  let month: any = dateFomat.getMonth() + 1;
  let day: any = dateFomat.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};
