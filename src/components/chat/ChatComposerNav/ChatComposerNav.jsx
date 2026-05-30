import { Paperclip, Send } from 'lucide-react'

export default function ChatComposerNav() {
  return (
    <div className="pointer-events-none absolute bottom-3 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-[390px] -translate-x-1/2">
      <div className="pointer-events-auto flex items-center rounded-[28px] border border-[#EAE2D8] bg-white/96 px-3.5 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_10px_24px_rgba(27,47,94,0.1)] backdrop-blur-xl">
        <button type="button" className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E6EAEF] bg-white text-[#6A84A6] shadow-[0_4px_10px_rgba(27,47,94,0.04)] transition hover:bg-[#F4F7FB]">
          <Paperclip className="h-5 w-5" />
        </button>

        <div className="flex flex-1 items-center px-2">
          <label className="relative flex h-12 w-full items-center rounded-[18px] border border-[#ECE9E4] bg-white px-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full border-0 bg-transparent text-[15px] text-[#1A2340] outline-none placeholder:text-[#A5B1C1] pr-10"
            />

            <button type="button" className="absolute right-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8A96AA] transition hover:bg-[#F4F7FB]">
              <span className="text-[16px]">😊</span>
            </button>
          </label>
        </div>

        <button type="button" className="ml-3 inline-flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#4A90D9] text-white shadow-[0_8px_22px_rgba(74,144,217,0.18)] transition hover:bg-[#3f7fc8]">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
