import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CustomCategory } from "../types";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronLeftIcon, ChevronLeftSquareIcon, ChevronRight, ChevronRightIcon, ChevronsLeft, ChevronsLeftIcon, ChevronsRight, Router, SquareChevronRightIcon } from "lucide-react";
import { ca } from "date-fns/locale";
import { useRouter } from "next/navigation";

interface Props{
    open: boolean;
    onOpenChange: (open:boolean) => void;
    data: CustomCategory[]
}
export const CategoriesSidebar = ({open,onOpenChange, data}:Props) => {
    const router = useRouter()
    const [parentCategory, setParentCategory] = useState<CustomCategory[]|null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CustomCategory|null>(null);

    //if we have parent categories than show those, otherwise show root categories
    const currentCategory = parentCategory ?? data ?? [];

    const handleOpenChange = (open :boolean) => {
        setSelectedCategory(null);
        setParentCategory(null)
        onOpenChange(open)
    }

    const handleCategoryClick = (category:CustomCategory) => {
        if (category.subcategories && category.subcategories.length > 0) {
            setParentCategory(category.subcategories as CustomCategory[])
            setSelectedCategory(category)
        }else{
            //this is leaf category no sub category
            if (parentCategory && selectedCategory) {
                //this is subcategory - navigate to /categories/subcategory
                router.push(`/${selectedCategory.slug}/${category.slug}`)
            }else{
                //this is main category
                if (category.slug === "all") {
                    router.push('/')
                }else{
                    router.push(`/${category.slug}`)
                }
            }
            handleOpenChange(false)
        }
    }
    const handleBackClick =() => {
        if (parentCategory) {
            setParentCategory(null)
            setSelectedCategory(null)
        }
    }
    const backgroundColor = selectedCategory?.color || "white";
    return(
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent 
            side="left"
            className="p-0 transition-none"
            style={{backgroundColor}}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategory && 
                    (
                        <button onClick={handleBackClick} className="w-full text-left  p-4 hover:bg-black hover:text-white flex items-center text-base cursor-pointer font-medium">
                            <ChevronLeft className="size-4 mr-2"/>
                            Back
                        </button>
                    )   
                    }
                    {currentCategory.map((category)=>(
                        <button key={category.slug}
                        onClick={()=>handleCategoryClick(category)}
                        className="w-full p-4 text-left cursor-pointer hover:bg-black hover:text-white flex justify-between items-center text-base font-medium"
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 &&
                                <ChevronRight className="size-4"/>
                            }
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}