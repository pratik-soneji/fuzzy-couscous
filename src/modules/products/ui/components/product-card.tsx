
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductCardProps {
    id: string;
    name: string;
    imageUrl?: string | null;
    tenantSlug : string;
    tenantImageurl? : string | null;
    reviewRating: number; 
    reviewCount: number;
    price : number;
};

export const ProductCard = ({
    id,
    name,
    imageUrl,
    tenantSlug,
    tenantImageurl,
    reviewRating,
    reviewCount,
    price
}: ProductCardProps) => {
    const router = useRouter();
    const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(generateTenantURL(tenantSlug))
    }
     return (
    <Link href={`${generateTenantURL(tenantSlug)}/products/${id}`}>
        <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border transition-shadow rounded-md bg-white overflow-hidden h-full flex flex-col">
            <div className="relative aspect-square">
                <Image 
                alt={name}
                fill
                src = {imageUrl || "/auth4.png"}
                className="object-cover"
                />
            </div>
            <div className="p-4 border-y flex flex-col gap-3 flex-1">
            <h2 className="text-lg font-medium line-clamp-4">
                {name}
            </h2>
            <div className="flex items-center gap-2 " onClick={handleUserClick}>
                {tenantImageurl && (
                    <Image 
                    alt={tenantSlug}
                    src={tenantImageurl}
                    width={16}
                    height={16}
                    className="rounded-full border shrink-0 size-[25px]"
                    />
                )}
                <p className="text-sm underline font-medium">{tenantSlug}</p>
            </div>
            {reviewCount > 0 && ( 
                <div className="flex items-center g ap-1">
                    <StarIcon className="size-3.5 fill-black"/>
                    <p className="text-sm font-medium">{reviewRating} ({reviewCount})</p>
                </div>
            )  }
        </div>
        <div className="p-4">
            <div className=" px-2 py-1 border bg-pink-400 w-fit">
                <p className="text-sm font-medium">
                    {formatCurrency(price)} 
                </p>
            </div>
        </div>
        
        </div>
        
    </Link>
    );
}

export const ProductCardSkeleton = () => {
    return (
        <div className="border rounded-md bg-white overflow-hidden h-full flex flex-col">
            <Skeleton className="relative aspect-square w-full rounded-none shrink-0" />
            <div className="p-4 border-y flex flex-col gap-3 flex-1">
                <Skeleton className="h-5 w-[85%]" />
                <Skeleton className="h-4 w-[45%]" />
                <Skeleton className="h-4 w-[30%]" />
            </div>
            <div className="p-4">
                <Skeleton className="h-8 w-24" />
            </div>
        </div>
    );
};