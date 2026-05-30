import { ArrowLeft, MoreVertical, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar/Navbar.jsx'

const conversations = [
  {
    id: 1,
    name: 'Andi Prasetyo, S.ArS',
    specialty: 'Residential',
    preview: 'Perfect! I have some initial sketches to share.',
    time: '10:34',
    unread: 2,
    online: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    specialty: 'Commercial',
    preview: 'Thank you for the consultation. I\'ll send the revised layout today.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'Bambang Suryadi',
    specialty: 'Minimalist',
    preview: 'I appreciate your feedback. Let me revise the concept.',
    time: 'Mar 28',
    unread: 0,
    online: false,
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 4,
    name: 'Diana Putri',
    specialty: 'Interior',
    preview: 'Great! The materials you selected look perfect.',
    time: 'Mar 25',
    unread: 0,
    online: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 5,
    name: 'Rudi Hermawan',
    specialty: 'Sustainable',
    preview: 'The eco-friendly approach will reduce costs.',
    time: 'Mar 20',
    unread: 0,
    online: false,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
]

function ChatItem({ conversation }) {
  return (
    <Link
      to={`/chat/${conversation.id}`}
      className="relative flex w-full items-start gap-3 rounded-[18px] border border-[#E8E3DA] bg-white px-3 py-3 text-left shadow-[0_6px_16px_rgba(27,47,94,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(27,47,94,0.1)]"
    >
      <div className="relative shrink-0">
        <img src={conversation.avatar} alt={conversation.name} className="h-12 w-12 rounded-full object-cover" />
        {conversation.online ? (
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#7DBA84]" />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-[#1A2340]">{conversation.name}</p>
            <p className="mt-1 line-clamp-1 text-[12px] leading-5 text-[#7B8FAB]">{conversation.preview}</p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[11px] text-[#7B8FAB]">{conversation.time}</p>
            <button
              type="button"
              className="mt-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#8A96AA] transition hover:bg-[#F3F6FB]"
              aria-label="More options"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-[#DCE7F7] px-2.5 py-1 text-[10px] font-medium text-[#4A6C9A]">
            {conversation.specialty}
          </span>
          {conversation.unread ? (
            <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1B2F5E] px-1.5 text-[10px] font-semibold text-white">
              {conversation.unread}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

function ChatHistory() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#F9F6F2] px-3 sm:px-4">
      <div className="sticky top-0 z-20 bg-[#F9F6F2] pb-2">
        <Navbar
          leading={(
            <Link to="/home" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1A2340] transition hover:bg-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          title="Messages"
        />

        <div className="mt-2 px-1">
          <label className="flex h-12 items-center gap-3 rounded-full bg-white px-4 text-[#7B8FAB] shadow-[0_6px_16px_rgba(27,47,94,0.06)]">
            <Search className="h-5 w-5" />
            <span className="text-[14px]">Search conversations...</span>
          </label>
        </div>
      </div>

      <div className="flex-1 min-h-0 space-y-3.5 overflow-y-auto overscroll-contain scroll-smooth pb-24 pr-1">
        {conversations.map((conversation) => (
          <ChatItem key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  )
}

export default ChatHistory