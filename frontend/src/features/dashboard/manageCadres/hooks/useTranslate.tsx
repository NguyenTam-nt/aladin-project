import { translateService } from "@services/translate";


interface FilteredObject {
    [key: string]: any;
  }
  
export  const TranslateToKorean = async (value: FilteredObject , refFormik?:  React.MutableRefObject<any>) => {
    const filteredObject: FilteredObject = {};
    const translationPromises: Promise<void>[] = [];
    for (const key in value) {
      if (typeof value?.[key] === "string" && key.endsWith("Ko")) {
        if (value[key]) {
          filteredObject[key] = value[key];
        } else {
          const originalKey = key.slice(0, -2);
          if (value[originalKey]) {
            const translationPromise = translateService
              .post(value[originalKey])
              .then((translationResult) => {
                filteredObject[key] = translationResult;
              })
              .catch((error) => {
                 console.log(error);
                 
              });
            translationPromises.push(translationPromise);
          } else {
            filteredObject[key] = "";
          }
        }
      }
    }
    await Promise.all(translationPromises);
    for (const key in filteredObject) {
        refFormik!.current?.setFieldValue(key, filteredObject[key]);
    }
    return filteredObject;
  };
  