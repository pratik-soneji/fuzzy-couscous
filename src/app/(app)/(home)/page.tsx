import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilter } from "@/modules/products/hooks/searchParams";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";

import { dehydrate, HydrationBoundary, useQueryClient } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";


interface Props {
  searchParams: Promise<SearchParams>
}
const Page = async ({  searchParams }: Props) => {
  
  const queryClient = getQueryClient()
  const filters = await loadProductFilter(searchParams)

  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({  ...filters, limit: DEFAULT_LIMIT }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
         <ProductListView />
    </HydrationBoundary>
  )
}
  
export default Page; 