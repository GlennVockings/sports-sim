"use client"

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaExclamation } from "react-icons/fa";

export default function User() {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  }

  return (
    <div className="p-4">
      <div className="pb-3">
        <p className="text-lg font-semibold text-white">{`Welcome ${user?.name}`}</p>
      </div>
      <div className="flex gap-3">
        <Button>
          Create new sim
        </Button>
        <Button type="submit" onClick={onClick}>
          Sign Out
        </Button>
      </div>
      <div className="py-4">
        <p className="font-semibold pb-2 underline">My Games</p>
        <div className="flex flex-col">
          <a href="/1/10" className="p-2 bg-blue-200 rounded-md shadow-xl">
            <p>Sports Day</p>
            <p className="text-sm">Work Sports Day</p>
          </a>
        </div>
      </div>
      <div className="py-4">
        <p className="font-semibold pb-2 underline">Joined Games</p>
        <div className="flex flex-col">
          <a href="/1/20" className="p-2 bg-red-100 rounded-md shadow-xl flex justify-between items-center">
            <div>
              <p>Sports Day 2</p>
              <p className="text-sm">Personal betting sim</p>
            </div>
            <div>
              <FaExclamation className="text-3xl fill-red-500" />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}