interface CheckoutButtonProps {
    className?: string
    hideIfempty?: boolean;
    tenantSlug: string;
}

import React from 'react'
import { useCart } from '../../hooks/use-cart';
import { Button } from '@/components/ui/button';
import { cn, generateTenantURL } from '@/lib/utils';
import Link from 'next/link';
import { ShoppingCartIcon } from 'lucide-react';

export const CheckoutButton = ({
    className,
    hideIfempty,
    tenantSlug
}:CheckoutButtonProps) => {
    const { totalItems } = useCart(tenantSlug)
    if (hideIfempty && totalItems === 0) {
        return null
    }

  return (
    <Button
    variant={"elevated"}
    asChild
    className={cn("bg-white", className)}
    >
        <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
        </Link>
    </Button>
  )
}

