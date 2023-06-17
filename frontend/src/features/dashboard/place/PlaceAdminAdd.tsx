import React from 'react'
import { TitleTopic } from '../home/components/TitleTopic'
import TitleInput from '@components/TitleInput'
import { Input } from '../components/Input'
import UploadInput from './components/UploadInput'
import { Textarea } from '../components/Textarea'
import { Button } from '../components/Button'

function PlaceAdminAdd() {
  return (
    <div>
      <div className="flex items-baseline">
        <TitleTopic name="adminPlace.add.title" isRequired={false} />
      </div>
      <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"adminPlace.form.name"} />
              <Input placeholder="adminPlace.form.input_name"/>
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"adminPlace.form.address"} />
              <Input placeholder="adminPlace.form.input_address"/>
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"adminPlace.form.phone"} />
              <Input placeholder="adminPlace.form.input_phone"/>
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"adminPlace.form.zalo"} />
              <Input placeholder="adminPlace.form.input_zalo"/>
            </div>
            <div className="col-span-2">
              <TitleInput isRequired={true} name={"adminPlace.form.map"} />
              <Input placeholder="adminPlace.form.input_map"/>
            </div>
          </div>
          <div className="mt-4 ">
            <TitleInput isRequired={true} name={"adminPlace.form.describe"} />
            <div className="border-[1px] border-solid border-text_A1A0A3 p-3">
              <div className="grid grid-cols-4 gap-4">
                <UploadInput />
                <UploadInput />
                <UploadInput />
                <UploadInput />
              </div>
              <div className="mt-4 ">
                <TitleInput isRequired={false} name={"adminPlace.form.input_describe"} />
                <Textarea placeholder="adminPlace.form.input_describe" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                <UploadInput />
                <UploadInput />
                <UploadInput />
                <UploadInput />
              </div>
              <div className="mt-4 ">
                <TitleInput isRequired={false} name={"adminPlace.form.input_describe"} />
                <Textarea placeholder="adminPlace.form.input_describe" />
              </div>
            </div>

            <div className="flex justify-end items-center mt-[24px]">
              <Button
              type="button"
                // onClick={hideModal}
                text="button._cancel"
                color="empty"
                className="!w-[120px] border border-TrueBlue_500 mr-[24px]"
              />
              <Button type="submit" onClick={() => "onSubmit?.()"}  text={true ? "button._save" : "button._save"} color="primary" className="!w-[120px]" />
            </div>
          </div>
      </div>
    </div>
  )
}

export default PlaceAdminAdd