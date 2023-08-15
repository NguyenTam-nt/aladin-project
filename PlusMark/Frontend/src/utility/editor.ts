import UploadImage from "@services/UploadImage";

export const getEntityMap = async (
  list: {
    src: string;
    data: File;
  }[],
  entityMap: any
) => {
  // const listImageActived = await getListImageActived(list, entityMap)

  const listImageUpload = getListImageUpload(list, entityMap)
  const formData = new FormData();
  for (let i = 0; i < listImageUpload.length; i++) {
    formData.append("file", listImageUpload[i].data);
  }
  const listImageActived = await UploadImage.uploadImages(formData);
  const newListActived = listImageActived.map((item, idx) => {
    return {
      origin: listImageUpload[idx].src,
      data: item
    }
  });
  return Object.values(entityMap).map((item: any, key) => {
    if (item.type == 'LINK') {
      return item;
    };

    for (let i = 0; i < newListActived.length; i++) {
      if (item.data.src == newListActived[i].origin) {
        item.data.src = newListActived[i].data
      }

    }
    return item;
  })
}

const getListImageUpload = (
  list: {
    src: string;
    data: File;
  }[],
  entityMap: any
) => {
  return list.filter(item => {
    for (let i = 0; i < Object.keys(entityMap).length; i++) {
      if (item.src == entityMap[i].data.src) {
        return item.src
      }
    }
  })
}