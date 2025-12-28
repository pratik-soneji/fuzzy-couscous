"use client"
import { Button } from "@/components/ui/button";
import CategoryDropDown from "./category-dropdown";
import { CustomCategory } from "../types";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props{
    data: CategoriesGetManyOutput;
}
export const Categories = ({data }:Props) => {
    // console.log(data);    
    const ContainerRef  = useRef<HTMLDivElement>(null);
    const measureRef  = useRef<HTMLDivElement>(null);
    const viewAllRef  = useRef<HTMLDivElement>(null);

    const [visibleCount, setVisibleCount] = useState(data.length);
    const [isAnyHovered, setIsAnyHovered] = useState(false);

    const [isSideBarOpen,setIsSideBarOpen] = useState(false);

    const activeCategory = "all";

    const activeCategoryIndex = data.findIndex((cat)=>cat.slug===activeCategory);//Here We are creating a logic which can tell me is the current active category may be  last one which is hidden away or not visible or visible when user clicks on a view all
    const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

    useEffect(()=>{
        const calculateVisible = () => {
            if (!ContainerRef.current || !measureRef.current || !viewAllRef.current) return;
            const containerWidth = ContainerRef.current.offsetWidth;
            const viewAllWidth = viewAllRef.current.offsetWidth;//gives the actual visible width of the element in pixels.
            const availableWidth = containerWidth - viewAllWidth;

            const items = Array.from(measureRef.current.children)
            let totalWidth = 0;
            let visible = 0;
            for (const item of items) {
                const width = item.getBoundingClientRect().width;//tells you where an element is and how big it is — relative to the viewport (screen).
                if (totalWidth +  width > availableWidth) break;
                totalWidth += width;
                visible++;
            }
            setVisibleCount(visible)
        }
        const resizeObserver = new ResizeObserver(calculateVisible);//A browser API that notifies you when an element’s size changes.Only width / height.
        resizeObserver.observe(ContainerRef.current!)
        return () => resizeObserver.disconnect()//“When this effect is no longer needed, stop observing everything.” so this is basically cleanup part
    },[data.length])

    
    return(
        <div 
        className="relative w-full"> 
            <CategoriesSidebar open={isSideBarOpen} onOpenChange={setIsSideBarOpen} />
            <div //Hidden Div for measure items
            className="absolute opacity-0 pointer-events-none flex"
            style={{position: "fixed",top: -9999, left: -9999}}
            ref={measureRef}>
           {
                data.map((category: CustomCategory)=>(
                    <div key={category.id}>
                    <CategoryDropDown 
                    category={category}
                    isActive={activeCategory === category.slug}
                    isNavigationHovered={false}
                    />
                  </div>  
                ))
            }
           </div>
           {/* visible items */}
           <div
           ref={ContainerRef}
           onMouseEnter={()=>setIsAnyHovered(true)}
           onMouseLeave={()=>setIsAnyHovered(false)}

            className="flex flex-nowrap items-center">
           {
            data.slice(0,visibleCount).map((category: CustomCategory)=>(
                    <div key={category.id}>
                    <CategoryDropDown 
                    category={category}
                    isActive={activeCategory === category.slug}
                    isNavigationHovered={isAnyHovered}
                    />
                  </div>  
                ))
            }
            <div ref={viewAllRef}
            className="shrink-0"
            >
                <Button className={cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary")}
                onClick={()=>setIsSideBarOpen(true)}
                >
                    View All
                    <ListFilterIcon className="ml-2" />
                </Button>
            </div>
           </div>
        </div>
    )
}
///3:53:00
