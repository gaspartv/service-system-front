import Sidebar from "@/src/components/sidebar";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

export default function PageCustomerService() {
  return (
    <div>
      <Sidebar />
      <div className="ml-48">
        <div
          className="absolute w-60 h-screen top-0 right-0 flex flex-col gap-2 scroll-auto p-2 bg-zinc-800 border-l border-zinc-700">
          <div className="relative bg-zinc-600 p-1 rounded-md">
            <div className="flex gap-2 items-end">
              <ContactPhoneIcon fontSize="medium" />
              <span>Diego</span>
            </div>
            <span className="text-[12px]">+55 32 99827-4714</span>
            <span className="text-xs absolute top-1 right-1 bg-zinc-700 rounded-2xl p-1">12</span>
          </div>

          <div className="relative bg-zinc-600 p-1 rounded-md">
            <div className="flex gap-2 items-end">
              <ContactPhoneIcon fontSize="medium" />
              <span>Diego</span>
            </div>
            <span className="text-[12px]">+55 32 99827-4714</span>
            <span className="text-xs absolute top-1 right-1 bg-zinc-700 rounded-2xl p-1">12</span>
          </div>

          <div className="relative bg-zinc-600 p-1 rounded-md">
            <div className="flex gap-2 items-end">
              <ContactPhoneIcon fontSize="medium" />
              <span>Diego</span>
            </div>
            <span className="text-[12px]">+55 32 99827-4714</span>
            <span className="text-xs absolute top-1 right-1 bg-zinc-700 rounded-2xl p-1">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
