'use client'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useDropDownPosition } from "./use-dropdown-position";
import { SubCategoryMenu } from "./SubCategoryMenu";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
interface Props{
    category: CategoriesGetManyOutput[0];
    isActive?: boolean;
    isNavigationHovered?: boolean;
}
const CategoryDropDown = ({
category,
isActive,
isNavigationHovered
}:Props) => {
  const [isOPen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
   
  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  }
  const onMouseLeave = () => setIsOpen(false)

  //Potentially improve mobile
  // const toggleDropDown = () => {
  //   if (category.subcategories?.docs?.length) {
  //     setIsOpen(!open);
  //   }
  // }
  return (
    <div className="relative" ref={dropDownRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
    //  onClick={toggleDropDown}
    >
      <div className="relative">
      <Button variant="elevated"
        className={cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",isActive && !isNavigationHovered && "bg-white border-primary",isOPen && "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[4px] ")}
      >
        <Link href={`/${category.slug === "all"?"":`${category.slug}`}`}>{category.name}</Link>
        </Button>  

      {category.subcategories && category.subcategories.length > 0 && (
        <div className={cn(
          "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2", isOPen && "opacity-100"
        )} />
      )}
      </div>
      <SubCategoryMenu 
        category={category}
        isOpen={isOPen}
      />
    </div>
  )
}

export default CategoryDropDown
///3:08:43