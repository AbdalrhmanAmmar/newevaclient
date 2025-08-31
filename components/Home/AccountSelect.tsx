"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User } from "lucide-react"

interface AccountSelectProps {
  handleLogout: () => void
}

const AccountSelect: React.FC<AccountSelectProps> = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // detect mobile by screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024) // أقل من lg
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative">
      {/* زر الحساب */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full px-3 py-2  transition"
      >
        <User className="w-5 h-5" />
        <span className="hidden sm:block font-medium">حسابي</span>
      </button>

      {/* المنيو */}
 <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 10 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isMobile ? 10 : -10 }}
      transition={{ duration: 0.2 }}
      className={`absolute ${
        isMobile ? "bottom-12 left-1/2 -translate-x-1/2" : "top-12 left-0"
      } w-48 rounded-xl bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 z-50`}
    >
      <div className="flex flex-col">
        <button
          onClick={() => {
            setIsOpen(false)
            window.location.href = "/myprofile"
          }}
          className="px-4 py-2 text-sm text-left hover:bg-primary/10 transition"
        >
          الملف الشخصي
        </button>
        <button
          onClick={() => {
            setIsOpen(false)
            handleLogout()
          }}
          className="px-4 py-2 text-sm text-left hover:bg-primary/10 transition text-red-500"
        >
          تسجيل الخروج
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  )
}

export default AccountSelect
