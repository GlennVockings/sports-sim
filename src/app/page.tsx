import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-grow">
      <div className="px-4 py-10 h-80">
        <p className="lg:text-5xl lg:w-3/5 pb-8">
          Sets up a fake betting sim for co-workers/friends to bet along for an additional level of competition
        </p>
        <Button className="font-semibold">
          Create new sim
        </Button>
      </div>
      <a href="https://www.taketimetothink.co.uk" target="_blank">
        <AspectRatio ratio={16/10}>
          <Image src={"/images/fun-stops-mobile.jpg"} alt="When the fun stops STOP!" fill className="object-cover" />
        </AspectRatio>
      </a>
    </div>
  );
}