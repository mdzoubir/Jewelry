import React from 'react'

function PrimaryButton({text, icon}: {text?: string, icon?: React.ReactNode}) {
  return (
    <button className="bg-[#A89472] font-medium  text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-[#B8A886] transition-colors">
        {icon}
        {text}
    </button>
  )
}

export default PrimaryButton