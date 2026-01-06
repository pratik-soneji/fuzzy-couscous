"use client"
import { Input } from "@/components/ui/input";
import { BookMarkedIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface SearchInputProps{
    disabled: boolean;
}
export const SearchInput = ({disabled}:SearchInputProps) => {
    const trpc = useTRPC()
    const session  = useQuery(trpc.auth.session.queryOptions())
    const [isSidebarOpen, setIsSideBarOpen] = useState(false)
    return(
        <div className="flex items-center gap-2 w-full ">
            <CategoriesSidebar  open={isSidebarOpen} onOpenChange={setIsSideBarOpen}/>
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500"/>
                <Input className="pl-8 " placeholder="search products"/>  
            </div>
            <Button variant={"elevated"} 
            className="size-12 shrink-0 flex lg:hidden"
            onClick={()=>setIsSideBarOpen(true)}
            >
                <ListFilterIcon />
            </Button>
            {
                session.data?.user && (
                    <Button 
                    asChild
                    variant={"elevated"}
                    >
                        <Link href={"/libaray"}>
                            <BookMarkedIcon />
                        </Link>
                    </Button> 
                ) 
            }
        </div>
    )
}