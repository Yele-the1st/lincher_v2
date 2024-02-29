import { FC, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { Button } from "../../ui/button";
import { MagnifyingGlass, SealWarning } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface HeroSearchbarProps {}

const HeroSearchbar: FC<HeroSearchbarProps> = ({}) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <div className=" flex items-center gap-[12px] pointer-events-auto  ">
      <div className=" w-[340px] relative flex items-center select-none">
        <div className=" bg-secondary outline-none rounded-[8px] h-[56px] justify-between flex w-full relative">
          <input
            type="text"
            placeholder="Find a course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" placeholder:font-light outline-none text-sm appearance-none py-1 px-3 w-full h-full bg-transparent min-h-[24px]  "
          />
          <div className=" mr-3 cursor-pointer flex h-full items-center">
            <Button onClick={handleSearch}>
              <MagnifyingGlass size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearchbar;
