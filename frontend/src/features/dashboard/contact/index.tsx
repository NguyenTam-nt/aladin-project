import React from 'react'
import { TitleTopic } from '../home/components/TitleTopic'
import { Button } from '../components/Button'
import { ICAdd } from '@assets/icons/ICAdd'
import { ICDesc } from '@assets/icons/ICDesc'
import { ICAsc } from '@assets/icons/ICAsc'
import { ICDeleteTrash } from '@assets/icons/ICDeleteTrash'
import { ICDeleteTrashLight } from '@assets/icons/ICDeleteTrashLight'

function ContactAdmin() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleTopic name="adminContact.title" isRequired={false} />
        <div className="flex justify-center items-center gap-4">
          <Button
            onClick={() => {}} text="common.delete"
            className="max-w-[177px] whitespace-nowrap text-text_EA222A border-text_EA222A"
            imageLeft={
              <span className="mr-2">
                <ICDeleteTrashLight />
              </span>
            }
            color={"empty"}
          />
          <Button
            onClick={() => {}} text="common.desc"
            className="max-w-[177px] whitespace-nowrap"
            imageLeft={
              <span className="mr-2">
                <ICDesc />
              </span>
            }
            color={"empty"}
          />
          <Button
            onClick={() => {}} text="common.asc"
            className="max-w-[177px] whitespace-nowrap"
            imageLeft={
              <span className="mr-2">
                <ICAsc/>
              </span>
            }
            color={"empty"}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactAdmin