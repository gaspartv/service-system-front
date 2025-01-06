import LinkMenu from "@/app/dashboard/components/link-menu";
import HomeIcon from "@mui/icons-material/Home";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PeopleIcon from "@mui/icons-material/People";
import KeyIcon from "@mui/icons-material/Key";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import SettingsIcon from "@mui/icons-material/Settings";
import SignOutButton from "@/app/dashboard/components/sign-out-button";
import React from "react";

export default function Sidebar() {
  return (
    <div
      className="flex flex-col justify-between p-2 gap-0.5 w-48 absolute top-0 h-screen text-xs bg-zinc-800 border-r border-zinc-700">
      <div>
        <LinkMenu path={"/dashboard"} name={"Início"} icon={<HomeIcon />} />
        <LinkMenu path={"/customer-service"} name={"Atendimentos"} icon={<WhatsAppIcon />} />
        <LinkMenu path={"/customer-service-history"} name={"Históricos"} icon={<ReceiptIcon />} />
        <LinkMenu path={"/attendants"} name={"Atendentes"} icon={<SupportAgentIcon />} />
        <LinkMenu path={"/contacts"} name={"Contatos"} icon={<PeopleIcon />} />
        <LinkMenu path={"/permissions"} name={"Permissões"} icon={<KeyIcon />} />
        <LinkMenu path={"/queues"} name={"Filas"} icon={<Grid3x3Icon />} />
        <LinkMenu path={"/settings"} name={"Configurações"} icon={<SettingsIcon />} />
      </div>
      <SignOutButton />
    </div>
  );
}
