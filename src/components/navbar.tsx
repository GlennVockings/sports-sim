import { TbMenuDeep } from "react-icons/tb";
import { UserButton } from "./user-button";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white md:mx-4 md:mt-2">
      <a href="/">
        <h1 className="text-xl md:text-3xl font-bold">Sports Sim</h1>
      </a>
      <div className="flex gap-4 items-center">
        <UserButton />
        <div>
          <TbMenuDeep />
        </div>
      </div>
    </div>
  )
}