import { HiOutlineExclamation } from "react-icons/hi";

interface FormErrorProps {
  message?: string
}

export const FormError = ({
  message
}: FormErrorProps) => {
  if (!message) return null

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex gap-2 items-center text-sm text-destructive">
      <HiOutlineExclamation className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}