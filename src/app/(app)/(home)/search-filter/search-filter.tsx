"use client"
import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { CustomCategory } from "../types";
import { CategoriesSidebar } from "./categories-sidebar";
import { da, tr } from "date-fns/locale";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SearchInputProps{
    disabled: boolean;
    data: CustomCategory[]
}
export const SearchInput = ({disabled,data}:SearchInputProps) => {
    const [isSidebarOpen, setIsSideBarOpen] = useState(false)
    return(
        <div className="flex items-center gap-2 w-full ">
            <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSideBarOpen}/>
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500"/>
                <Input className="pl-8 " placeholder="search products"/>  
            </div>
            {/* TODO : add categories view all btn */}
            <Button variant={"elevated"} 
            className="size-12 shrink-0 flex lg:hidden"
            onClick={()=>setIsSideBarOpen(true)}
            >
                <ListFilterIcon />
            </Button>
            {/* TODO : add library btn */}
        </div>
    )
}