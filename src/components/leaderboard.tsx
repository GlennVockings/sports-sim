import { UserType } from "@/lib/types"
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "./ui/table"
import { UserContext } from "@/lib/userContext"
import { useContext } from "react";

export const Leaderboard = ({ users } : { users: UserType[] }) => {
  const userId = useContext(UserContext);

  return (
    <div>
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
  )
}