import React, { useEffect } from 'react'

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  if (!message) return null

  return (
    <div className="fixed top-24 right-8 z-[100] animate-in fade-in slide-in-from-right-10 duration-500">
      <div className="clay-card p-5 border-l-4 border-primary dark:border-blue-500 min-w-[300px] flex items-start gap-4">
        <div className="w-10 h-10 bg-primary/10 dark:bg-blue-500/20 rounded-full flex items-center justify-center text-primary dark:text-blue-300 shrink-0">
          <span className="material-symbols-outlined !text-[20px]">check_circle</span>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-moho text-blue-900 dark:text-blue-100 uppercase tracking-wider mb-1">
            Booking Confirmed
          </h4>
          <p className="text-[12px] text-on-surface-variant dark:text-slate-400 font-medium">
            {message}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined !text-[18px]">close</span>
        </button>
      </div>
    </div>
  )
}

export default Notification
