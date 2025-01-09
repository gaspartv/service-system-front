import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import React from "react";
import { customerServiceContact } from "@/app/customer-service/page";

export default function ContactsQueue({ contact }: { contact: customerServiceContact }) {
  return (
    <div className="flex h-[72px] gap-2 bg-zinc-600 pt-3 pb-3 pr-2 pl-2 rounded-md cursor-pointer">
      <div className="flex items-center w-[36px]">
        <ContactPhoneIcon fontSize="large" />
      </div>
      <div className="flex flex-col justify-between w-[300px]">
        <p>{contact.name} <span className="text-[12px]">{contact.phone}</span></p>
        <p className="text-[12px] truncate">{contact.lastMessage}</p>
      </div>
      <div className="flex flex-col justify-between w-[40px]">
        <p className="text-[12px]">{contact.date}</p>
        <p className="text-[14px] text-center bg-zinc-800 rounded-md">{contact.noReadMessages}</p>
      </div>
    </div>
  )
}
