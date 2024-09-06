"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaExclamation } from "react-icons/fa6";
import { AddTeamForm } from "@/components/form/add-team-form";
import { ModalWrapper } from "@/components/modal-wrapper";
import { AddEventForm } from "@/components/form/add-event-form";
import { useGameStore } from "@/lib/store";
import { useMemo } from "react";

export default function Home() {
  const games = useGameStore(state => state.games)
  const filteredGames = useMemo(() => games.filter(game => game.id === "10"), [games])

  return (
    <div className="flex-grow">
      <div className="grid grid-cols-5">
        <div className="bg-custom-1 h-20 flex items-center justify-center text-white text-xs">
          <p>Custom-1</p>
        </div>
        <div className="bg-custom-2 h-20 flex items-center justify-center text-xs">
          <p>Custom-2</p>
        </div>
        <div className="bg-custom-3 h-20 flex items-center justify-center text-xs">
          <p>Custom-3</p>
        </div>
        <div className="bg-custom-4 h-20 flex items-center justify-center text-white text-xs">
          <p>Custom-4</p>
        </div>
        <div className="bg-custom-5 h-20 flex items-center justify-center text-white text-xs">
          <p>Custom-5</p>
        </div>
      </div>
      <div className="px-4 py-10 h-80">
        <p className="lg:text-5xl lg:w-3/5 pb-8">
          Sets up a fake betting sim for co-workers/friends to bet along for an additional level of competition
        </p>
        <div className="flex gap-3 flex-wrap">
          <Button>
            Create new sim
          </Button>
          <Button variant={"outline"}>
            Create new sim
          </Button>
          <Button variant={"destructive"}>
            Create new sim
          </Button>
          <Button variant={"ghost"}>
            Create new sim
          </Button>
        </div>
      </div>
      <div className="p-4">
        <p className="font-semibold text-lg pb-2 underline text-custom-5 underline-offset-2">Games</p>
        <div className="flex flex-col gap-4">
          <a href="/1/20" className="px-2 py-3 bg-custom-1 text-white rounded-md shadow-xl flex justify-between items-center">
            <div>
              <p>Sports Day 2</p>
              <p className="text-sm">Personal betting sim</p>
            </div>
            <div className="bg-red-500 p-2 rounded-full flex items-center">
              <FaExclamation className="text-lg" />
              <p className="text-sm">Update</p>
            </div>
          </a>
          <a href="/1/20" className="px-2 py-3 bg-custom-1 text-white rounded-md shadow-xl flex justify-between items-center">
            <div>
              <p>Sports Day 2</p>
              <p className="text-sm">Personal betting sim</p>
            </div>
            <div>
              {/* <FaExclamation className="text-3xl fill-red-500" /> */}
            </div>
          </a>
        </div>
      </div>
      <div className="p-4">
        <ModalWrapper buttonLabel="Add Team" modalTitle="Add Team">
          <AddTeamForm />
        </ModalWrapper>
      </div>
      <div className="p-4">
        <ModalWrapper buttonLabel="Add Event" modalTitle="Add Event">
          <AddEventForm teams={filteredGames[0].teams || []} />
        </ModalWrapper>
      </div>
      <a href="https://www.taketimetothink.co.uk" target="_blank">
        <AspectRatio ratio={16/10}>
          <Image src={"/images/fun-stops-mobile.jpg"} alt="When the fun stops STOP!" fill className="object-cover" />
        </AspectRatio>
      </a>
    </div>
  );
}