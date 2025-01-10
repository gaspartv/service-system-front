"use client"

import React from "react";
import Sidebar from "@/src/components/sidebar";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { v4 as uuid } from "uuid";
import ContactsQueue from "@/app/customer-service/components/contacts";
import AddIcon from '@mui/icons-material/Add';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import SendIcon from '@mui/icons-material/Send';
import { messagesMock, SenderBy } from "@/app/customer-service/mocks/conversa";

const timeZone = 'America/Sao_Paulo';

export interface customerServiceContact {
  id: string,
  name: string,
  phone: string,
  date: string,
  lastMessage: string,
  noReadMessages: number,
}

const activeContacts: customerServiceContact[] = [
  {
    id: uuid(),
    name: "Diego",
    phone: "+55 32 99827-4714",
    date: "20:53",
    lastMessage: "Olá, gostaria de comprar algumas coisas com vocês, macarrão, feijão, couve",
    noReadMessages: 8,
  },
  {
    id: uuid(),
    name: "Thiago",
    phone: "+55 32 99811-4211",
    date: "20:23",
    lastMessage: "pagamento já foi enviado, confere ai por favor",
    noReadMessages: 3,
  },
  {
    id: uuid(),
    name: "Diego",
    phone: "+55 32 99827-4714",
    date: "20:53",
    lastMessage: "Olá, gostaria de comprar algumas coisas com vocês, macarrão, feijão, couve",
    noReadMessages: 8,
  },
  {
    id: uuid(),
    name: "Thiago",
    phone: "+55 32 99811-4211",
    date: "20:23",
    lastMessage: "pagamento já foi enviado, confere ai por favor",
    noReadMessages: 3,
  },
  {
    id: uuid(),
    name: "Diego",
    phone: "+55 32 99827-4714",
    date: "20:53",
    lastMessage: "Olá, gostaria de comprar algumas coisas com vocês, macarrão, feijão, couve",
    noReadMessages: 8,
  },
  {
    id: uuid(),
    name: "Thiago",
    phone: "+55 32 99811-4211",
    date: "20:23",
    lastMessage: "pagamento já foi enviado, confere ai por favor",
    noReadMessages: 3,
  },
]

const waitingContacts: customerServiceContact[] = [
  {
    id: uuid(),
    name: "Diego",
    phone: "+55 32 99827-4714",
    date: "20:53",
    lastMessage: "Olá, gostaria de comprar algumas coisas com vocês, macarrão, feijão, couve",
    noReadMessages: 8,
  },
  {
    id: uuid(),
    name: "Thiago",
    phone: "+55 32 99811-4211",
    date: "20:23",
    lastMessage: "pagamento já foi enviado, confere ai por favor",
    noReadMessages: 3,
  },
]

export default function PageCustomerService() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [queue, setQueue] = React.useState<"active" | "waiting">("active");

  const [messages, setMessages] = React.useState<SenderBy[]>([]);

  const [message, setMessage] = React.useState<string>('');

  React.useEffect(() => {
    setMessages(messagesMock);
  }, [])

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && e.code === "Enter" && !e.shiftKey || e.key === "Enter" && e.code === "NumpadEnter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      const cursorPosition = e.currentTarget.selectionStart;
      const value = e.currentTarget.value;
      e.currentTarget.value =
        value.slice(0, cursorPosition) +
        "\n" +
        value.slice(cursorPosition);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
        cursorPosition + 1;
      e.currentTarget.style.height = "auto";
      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
    }
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      // Enviar mensagem para o backend
      messages.push({
        id: uuid(),
        createdAt: new Date(),
        type: "text",
        value: message,
        senderBy: "attendant",
        isSeparator: false,
      })
      setMessages([...messages, message] as SenderBy[]);
      setMessage("")
    }
  }

  return (
    <div>
      <div className="flex gap-1">
        <Sidebar />
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between text-start bg-zinc-800 p-2 rounded-b">
            <div className="flex gap-2 items-center cursor-default">
              <ContactPhoneIcon fontSize="large" />
              <p>Diego</p>
            </div>
            <div className="flex items-center">
              <button className="bg-zinc-900 hover:bg-zinc-700 pt-1.5 pb-1.5 pr-3 pl-3 rounded-md">
                Aceitar
              </button>
            </div>
          </div>

          <div className="relative h-[calc(100vh-57px)] rounded-t">
            <div
              className="absolute inset-0 opacity-5"
              style={{ backgroundImage: "url(\"/background.png\")" }}
            ></div>
            <div
              ref={scrollContainerRef}
              className="flex-col gap-2 relative z-10 p-4 inline-flex w-full h-[calc(100vh-169px)] overflow-y-auto scroll-auto">
              {
                messages.map((message) => {
                  const zonedDate = toZonedTime(message.createdAt || new Date(), timeZone);
                  const formattedTime = format(zonedDate, "HH:mm");

                  if (message.isSeparator) {
                    return (
                      <p key={message.id} className="self-center text-center bg-zinc-800 p-1 pl-2 pr-2 rounded-md">
                        {message.value.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                    );
                  }

                  if (message.senderBy === "client") {
                    return (
                      <p
                        key={message.id}
                        className="text-sm text-zinc-300 bg-zinc-800 pt-1 pl-2 pr-2 rounded-b-md rounded-tr-md inline-block max-w-[45%] self-start">
                        {message.value}
                        <span className="text-[10px] flex items-end justify-end">
                          {formattedTime}
                        </span>
                      </p>
                    );
                  }

                  if (message.senderBy === "attendant") {
                    return (
                      <p
                        key={message.id}
                        className="text-sm text-zinc-300 bg-teal-900 pt-1 pl-2 pr-2 rounded-b-md rounded-tl-md inline-block max-w-[45%] self-end">
                        {message.value}
                        <span className="text-[10px] flex items-end justify-end">
                          {formattedTime}
                        </span>
                      </p>
                    );
                  }
                })
              }
            </div>
            <div className="flex flex-col gap-2 absolute bottom-0 w-full bg-zinc-900 z-20 p-2">
              <form className="w-full">
                <textarea
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  maxLength={4096}
                  className="w-full flex max-h-44 bg-zinc-800 p-2 rounded-lg placeholder:text-sm focus:outline-none resize-none"
                  placeholder="Digite uma mensagem"
                />
              </form>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <AddIcon fontSize="medium" className="cursor-pointer" />
                  <AddReactionIcon fontSize="small" className="cursor-pointer" />
                </div>
                {
                  message && message.length > 0 ?
                      <SendIcon
                        fontSize="medium"
                        className="cursor-pointer"
                        onClick={handleSendMessage}
                      />
                    :
                    <KeyboardVoiceIcon fontSize="medium"  className="cursor-pointer" />
                }
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-2 w-[425px] min-w-[425px] h-screen overflow-y-auto scroll-auto p-2 bg-zinc-800 border-l border-zinc-700">
          <div className="flex justify-between gap-2">
            <span
              onClick={() => setQueue("active")}
              className={`hover:bg-zinc-900 w-full rounded-md p-0.5 pl-2 pr-2 text-center cursor-pointer ${queue === "active" ? "bg-zinc-900 " : "bg-zinc-700 "}`}
            >
              Ativos
            </span>
            <span
              onClick={() => setQueue("waiting")}
              className={`hover:bg-zinc-900 w-full rounded-md p-0.5 pl-2 pr-2 text-center cursor-pointer ${queue === "waiting" ? "bg-zinc-900 " : "bg-zinc-700 "}`}
              >
              Aguardando
            </span>
          </div>
          {queue === "active" ? activeContacts.map((contact) => (
              <ContactsQueue key={contact.id} contact={contact} />
            )) :
            waitingContacts.map((contact) => (
              <ContactsQueue key={contact.id} contact={contact} />
            ))
          }
        </div>
      </div>
    </div>
  );
}
