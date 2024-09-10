import { FaUser } from "react-icons/fa6"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { LogoutButton } from "./logout-button"
import { IoExitOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { auth } from "@/auth";

export const UserButton = async () => {
  const session = await auth();

  return (
    <>
      {
        session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex gap-1 items-center">
                <FaUser />
                <p>{session?.user?.name}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <LogoutButton>
                <DropdownMenuItem>
                  <IoExitOutline className="mr-2 h-4 w-4"/>
                  Logout
                </DropdownMenuItem>
              </LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <a href="/login" className="flex items-center gap-1">
            <FaRegUser />
            <p>Sign in</p>
          </a>
        )
      }
    </>
  )
}