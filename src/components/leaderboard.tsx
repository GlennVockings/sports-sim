import { UserType } from "@/lib/types"
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "./ui/table"
import { UserContext } from "@/lib/userContext"
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { FaChevronDown } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export const Leaderboard = ({ users } : { users: UserType[] }) => {
  const userId = useContext(UserContext);
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  return (
    <div className="flex flex-col justify-center">
      <Button className="flex gap-2 md:hidden" variant={"outline"} size={"round"} onClick={() => setIsOpen(prevState => !prevState)}>
        <p>Leaderboard</p>
        <div className={cn("transition-all duration-1000", isOpen ? "rotate-180" : "" )}>
          <FaChevronDown />
        </div>
      </Button>
      <div className={cn("transition-all duration-1000", isOpen ? "max-h-96 overflow-auto" : "max-h-0 overflow-hidden md:max-h-96" )}>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Pos.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Budget</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {
              users.map((user,index) => (
                  <TableRow key={user.id} className={userId === user.id ? "bg-custom-3 text-custom-4 font-bold" : ""}>
                    <TableCell>
                    { index + 1 }
                    </TableCell>
                    <TableCell>
                      { user.name }
                    </TableCell>
                    <TableCell>
                      { user.budget }
                    </TableCell>
                  </TableRow>
                ))
            }
            </TableBody>
        </Table>
      </div>
    </div>
  )
}