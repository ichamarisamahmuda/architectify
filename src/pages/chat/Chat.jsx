import { ArrowLeft, Camera, MoreVertical, Paperclip, Phone, PlaySquare, Send, Video } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Card from '../../components/common/Card/Card.jsx'

const chatMessages = [
  {
    id: 1,
    side: 'right',
    text: 'Hi! I saw your portfolio and I love your modern residential designs.',
    time: '10:30',
  },
  {
    id: 2,
    side: 'left',
    text: 'Thank you! I\'d be happy to discuss your project. What type of home are you planning?',
    time: '10:32',
  },
  {
    id: 3,
    side: 'right',
    text: 'I\'m looking to build a 2-story contemporary home, around 200 sqm.',
    time: '10:33',
  },
  {
    id: 4,
    side: 'left',
    text: 'That sounds exciting! Do you have a preferred architectural style or any specific requirements?',
    time: '10:35',
  },
  {
    id: 5,
    side: 'right',
    text: 'I prefer minimalist design with lots of natural light. Also need a home office space.',
    time: '10:37',
  },
  {
    id: 6,
    side: 'left',
    text: 'Perfect! I have experience with that style. Would you like to schedule a consultation to discuss details?',
    time: '10:38',
  },
]

const quickActions = [
  { label: 'Proyek Done', icon: PlaySquare },
  { label: 'View Progress', icon: Camera },
]

function Bubble({ message }) {
  const isRight = message.side === 'right'

  return (
    <div className={['flex flex-col', isRight ? 'items-end' : 'items-start'].join(' ')}>
      <div
        className={[
          'max-w-[82%] rounded-[24px] px-4 py-3 text-[14px] leading-6 shadow-[0_4px_12px_rgba(27,47,94,0.08)]',
          isRight ? 'bg-[#283F7A] text-white' : 'bg-white text-[#26305A]',
        ].join(' ')}
      >
        {message.text}
      </div>
      <span className="mt-1 px-1 text-[11px] text-[#8BA0BC]">{message.time}</span>
    </div>
  )
}

function Chat() {
  const { chatId } = useParams()

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#F9F6F2]">
      <div className="sticky top-0 z-20 border-b border-[#ECE5DB] bg-[#F9F6F2]/96 px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[430px] items-center gap-3">
          <Link to="/chat" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#1A2340] transition hover:bg-white">
            <ArrowLeft className="h-6 w-6" />
          </Link>

          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              alt="Andi Prasetyo"
              className="h-12 w-12 rounded-full object-cover ring-4 ring-white shadow-[0_4px_12px_rgba(27,47,94,0.08)]"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#76C58E]" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[16px] font-semibold leading-tight text-[#1A2340]">Andi Prasetyo, S.ArS</p>
            <p className="mt-1 text-[13px] text-[#76B98A]">Online</p>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#DCE8F8] text-[#29487D] transition hover:bg-[#cdddf4]">
              <Phone className="h-5 w-5" />
            </button>
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#DCE8F8] text-[#29487D] transition hover:bg-[#cdddf4]">
              <Video className="h-5 w-5" />
            </button>
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1A2340] transition hover:bg-white">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth px-1 pb-2 pt-6">
        <div className="mx-auto max-w-[430px] space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="rounded-full border border-[#E8E3DA] bg-white px-4 py-2 text-[12px] font-medium text-[#8A96AA] shadow-[0_4px_10px_rgba(27,47,94,0.05)]">
              Today, April 15
            </div>
          </div>

          <div className="space-y-4">
            {chatMessages.map((message) => (
              <Bubble key={message.id} message={message} />
            ))}
          </div>

          <Card className="p-4 shadow-[0_8px_18px_rgba(27,47,94,0.07)]">
            <p className="text-[14px] font-semibold text-[#8A96AA]">Quick Actions</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon

                return (
                  <button
                    key={action.label}
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-[18px] border border-[#DDE2EA] bg-white px-3 py-3 text-[14px] font-semibold text-[#2C3E73] shadow-[0_5px_12px_rgba(27,47,94,0.06)] transition hover:-translate-y-0.5"
                  >
                    <Icon className="h-4 w-4 text-[#6A84A6]" />
                    {action.label}
                  </button>
                )
              })}
            </div>
          </Card>
        </div>
      </div>

      {chatId ? <div className="sr-only">Chat room {chatId}</div> : null}
    </div>
  )
}

export default Chat
