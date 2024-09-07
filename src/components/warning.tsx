import { HiOutlineExclamation } from "react-icons/hi"

interface WarningProps {
  text: string
}

export const Warning = ({ text } : WarningProps) => {
  return (
    <div className="p-4 bg-yellow-100 text-yellow-600 rounded-md flex items-center gap-3">
      <HiOutlineExclamation className="text-5xl" />
      <div className="flex flex-col gap-2 text-center">
        <p className="font-semibold">{ text }</p>
        <p>See the other benefits you can get from subscribing here.</p>
      </div>
    </div>
  )
}