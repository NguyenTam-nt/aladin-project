import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { TitleTopic } from '../home/components/TitleTopic'
import TitleInput from '@components/TitleInput'
import { Input } from '../components/Input'
import UploadInput from './components/UploadInput'
import { Textarea } from '../components/Textarea'
import { Button } from '../components/Button'
import { useNavigate, useParams } from 'react-router'
import PlaceService from '@services/PlaceService'
import type { PlaceItemType, PlaceType } from '@typeRules/place'
import { GroupButtonAdmin } from '../components/GroupButtonAdmin'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { TextError } from '../components/TextError'
import { uploadService } from '@services/upload'
import { useHandleLoading } from '../components/Loading'
import { useShowMessage } from '../components/DiglogMessage'
import { v4 as uuidv4 } from 'uuid';

function PlaceAdminAdd() {

  const defaultPlaceItem1: PlaceItemType = {
    id: uuidv4(),
    description: "",
    linkMediaFirst: "",
    linkMediaSecond: "",
    linkMediaThird: "",
    linkMediaFour: ""
  }
  const defaultPlaceItem2: PlaceItemType = {
    id: uuidv4(),
    description: "",
    linkMediaFirst: "",
    linkMediaSecond: "",
    linkMediaThird: "",
    linkMediaFour: ""
  }


  const { showLoading } = useHandleLoading();
  const { showError, showSuccess } = useShowMessage();
  const params = useParams();
  const navigation = useNavigate();
  const [place, setPlace] = useState<PlaceType>();
  const [placeItems, setPlaceItems] = useState<PlaceItemType[]>([defaultPlaceItem1, defaultPlaceItem2]);
  const [isDes, setIsDes] = useState(false)
  const isAdd = useMemo(() => {
    return !params.id;
  }, []);

  useEffect(() => {
    if (!isAdd) {
      PlaceService.getById(Number(params.id)).then((data) => {
        setPlace(data);
        data.infrastructureList.push(defaultPlaceItem1)
        data.infrastructureList.push(defaultPlaceItem2)
        setPlaceItems(data.infrastructureList)
        formik.setFieldValue("name", data.name);
        formik.setFieldValue("address", data.address);
        formik.setFieldValue("phone", data.phone);
        formik.setFieldValue("zalo", data.zalo);
        formik.setFieldValue("linkMap", data.linkMap);
        formik.setFieldValue("acreage", data.acreage);
        formik.setFieldValue("numGuest", data.numGuest);
      });
    }
  }, [isAdd]);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      zalo: "",
      numGuest: "",
      acreage: "",
      linkMap: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("message.form.required"),
      address: Yup.string().trim().required("message.form.required"),
      phone:  Yup.string()
      .trim()
      .required("message.form.required")
      .matches(
        /([0-9]{10})\b/g,
        "message.form.phone"
      )
      .length(10, "message.form.phone-length"),
      zalo: Yup.string()
      .trim()
      .required("message.form.required")
      .matches(
        /([0-9]{10})\b/g,
        "message.form.phone"
      )
      .length(10, "message.form.phone-length"),
      numGuest: Yup.number().required("message.form.required").typeError('message.form.number').min(1, "message.form.minNum"),
      acreage: Yup.string().trim().required("message.form.required"),
      linkMap: Yup.string().trim().required("message.form.required"),
    }),
    onSubmit: async (data) => {
      try {

        let isDes = false
        for(let i = 0; i < 2; i++) {
          isDes = (!placeItems[i].description || placeItems[i].description == "") || 
            (!placeItems[i].linkMediaFirst || placeItems[i].linkMediaFirst == "" ) ||
            (!placeItems[i].linkMediaSecond || placeItems[i].linkMediaSecond == "" ) ||
            (!placeItems[i].linkMediaThird || placeItems[i].linkMediaThird == "" ) ||
            (!placeItems[i].linkMediaFour || placeItems[i].linkMediaFour == "" ) 
          
        }
        setIsDes(isDes)
        if(isDes) {
          return
        }

        showLoading();

        let request: PlaceType = {
          id: place?.id,
          name: data.name.trim(),
          address: data.address.trim(),
          phone: data.phone.trim(),
          zalo: data.zalo.trim(),
          numGuest: +data.numGuest,
          acreage: data.acreage.trim(),
          linkMap: data.linkMap.trim(),
          status: place?.status,
          infrastructureList: placeItems.slice(0, 2).map(p => {
            if(isAdd) return {...p, id: null}
            return p
          })
        }
        
        if (isAdd) {
          PlaceService
            .post(request)
            .then(() => {
              showSuccess("adminPlace.notification.addSuccess");
              goBack();
              formik.resetForm();
              setPlaceItems([defaultPlaceItem1, defaultPlaceItem2])
            })
            .catch(() => {
              showError("adminPlace.notification.addError");
            });
        } else {
          PlaceService
            .update(request)
            .then(() => {
              showSuccess("adminPlace.notification.updateSuccess");
              goBack();
            })
            .catch(() => {
              showError("adminPlace.notification.updateError");
            });
        }
      } catch (error) {}
    },
  });

  const goBack = () => {
    navigation(-1);
  };

  const handleChangeDesItem = (value: string, id: any) => {
    setPlaceItems(placeItems.map((item, i) => {
      if(item.id == id) return {
        ...item,
        description: value ? value : ""
      }
      return item
    }))
  }

  const handleSetFile = async (id: any, col: number, file: any) => {
    let link = ""
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const images = await uploadService.postImage(formData);
      link = images.list?.[0].linkMedia || "";
      
    } 

    setPlaceItems(placeItems.map((item, i) => {
        
      if(item.id == id) {
        if(col == 0) {
          item.linkMediaFirst = link
        } else if(col == 1) {
          item.linkMediaSecond = link
        } else if(col == 2) {
          item.linkMediaThird = link
        } else if(col == 3) {
          item.linkMediaFour = link
        }
      }
      return item
    }))
  }

  // console.log(placeItems);
  

  return (
    <div>
      <div className="flex items-baseline">
        <TitleTopic name={isAdd ? "adminPlace.add.title" : "adminPlace.add.titleUpdate" } isRequired={false} />
      </div>
      <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"adminPlace.form.name"} />
              <Input placeholder="adminPlace.form.input_name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <TextError message={formik.errors.name} />
              )}
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"adminPlace.form.address"} />
              <Input placeholder="adminPlace.form.input_address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.address && formik.touched.address && (
                <TextError message={formik.errors.address} />
              )}
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"adminPlace.form.phone"} />
              <Input placeholder="adminPlace.form.input_phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone && (
                <TextError message={formik.errors.phone} />
              )}
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"adminPlace.form.zalo"} />
              <Input placeholder="adminPlace.form.input_zalo"
                name="zalo"
                value={formik.values.zalo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.zalo && formik.touched.zalo && (
                <TextError message={formik.errors.zalo} />
              )}
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"adminPlace.form.numGuest"} />
              <Input placeholder="adminPlace.form.input_numGuest"
                name="numGuest"
                value={formik.values.numGuest}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.numGuest && formik.touched.numGuest && (
                <TextError message={formik.errors.numGuest} option={{min: 1}} />
              )}
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"adminPlace.form.acreage"} />
              <Input placeholder="adminPlace.form.input_acreage"
                name="acreage"
                value={formik.values.acreage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.acreage && formik.touched.acreage && (
                <TextError message={formik.errors.acreage} />
              )}
            </div>
            <div className="col-span-2">
              <TitleInput isRequired={true} name={"adminPlace.form.map"} />
              <Input placeholder="adminPlace.form.input_map"
                name="linkMap"
                value={formik.values.linkMap}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.linkMap && formik.touched.linkMap && (
                <TextError message={formik.errors.linkMap} />
              )}
            </div>
          </div>
          <div className="mt-4 ">
            <TitleInput isRequired={true} name={"adminPlace.form.describe"} />
            <div className="border-[1px] border-solid border-text_A1A0A3 p-3 space-y-4">
              {
                placeItems && placeItems.slice(0, 2).map((item, idx) => {
                  return <div key={item.id} >
                    <div className="grid grid-cols-4 gap-4">
                      <UploadInput link={item.linkMediaFirst} setFiles={(e: any) => handleSetFile(item.id, 0, e)} />
                      <UploadInput  link={item.linkMediaSecond} setFiles={(e: any) => handleSetFile(item.id, 1, e)} />
                      <UploadInput  link={item.linkMediaThird} setFiles={(e: any) => handleSetFile(item.id, 2, e)} />
                      <UploadInput  link={item.linkMediaFour} setFiles={(e: any) => handleSetFile(item.id, 3, e)} />
                    </div>
                    <div className="mt-4 ">
                      <TitleInput isRequired={false} name={"adminPlace.form.input_describe"} />
                      <Textarea placeholder="adminPlace.form.input_describe" 
                        className='!h-[192px]'
                        value={item.description}
                        onChange={(e) => handleChangeDesItem(e.target.value, item.id)}
                      />
                    </div>
                  </div>
                })
              }
              { isDes && (
                <TextError message={"message.form.required"} />
              )}
            </div>
            <div className="flex justify-end items-center mt-[24px]">
              <GroupButtonAdmin
                isAdd={isAdd}
                onCancel={goBack}
                onSubmit={formik.handleSubmit}
              />
            </div>
          </div>
      </div>
    </div>
  )
}

export default PlaceAdminAdd