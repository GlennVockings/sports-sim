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
          <a href="/demo" className="px-2 py-3 bg-custom-1 text-white rounded-md shadow-xl flex justify-between items-center">
            <div>
              <p>Demo Sim</p>
              <p className="text-sm">Showcases the betting system</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}