

export const FomatDateYY_MM_DD_H_M = (stringDate: string, isTime?:boolean) => {
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
    if (hour < 10){
      hour = `0${hour}`;
    }
    if (minutes < 10){
      minutes = `0${minutes}`;
    }

    if (isTime) {return `${hour}:${minutes}`;}
    return `${day}/${month}/${year} - ${hour}:${minutes}`;
  };

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
    if (hour < 10){
      hour = `0${hour}`;
    }
    if (minutes < 10){
      minutes = `0${minutes}`;
    }

    if (isTime) {return `${hour}:${minutes}`;}
    return `${day}/${month}/${year}`;
  };

  export const FomatDateValueDMY = (stringDate: Date) => {
    const day = stringDate.getDate();
    const month = stringDate.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = stringDate.getFullYear();

    // Định dạng thành chuỗi "dd/mm/yyyy"
    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

    return formattedDate;
  };


