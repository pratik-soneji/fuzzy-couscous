import { Button } from "@/components/ui/button";
import { Category } from "@/payload-types";
import { da } from "date-fns/locale";
import CategoryDropDown from "./category-dropdown";

interface Props{
    data: any;
}
export const Categories = ({data}:Props) => {
    console.log(data);    
    
    return(
        <div 
        className="relative w-full"> 
           <div
            className="flex flex-nowrap items-center">
           {
                data.map((category: Category)=>(
                    <div key={category.id}>
                    <CategoryDropDown 
                    category={category}
                    isActive={false}
                    isNavigationHovered={false}
                    />
                  </div>  
                ))
            }
           </div>
        </div>
    )
}
