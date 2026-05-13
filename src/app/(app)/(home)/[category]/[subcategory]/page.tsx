import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilter } from "@/modules/products/hooks/searchParams";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary,  } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";


interface Props{
    params: Promise<
    {subcategory : string;}
    >,
    searchParams: Promise<SearchParams>
}
const Page = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;
  const queryClient = getQueryClient()
  const filters = await loadProductFilter(searchParams)

  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({ category:  subcategory, ...filters, limit: DEFAULT_LIMIT }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
         <ProductListView category={subcategory}/>
    </HydrationBoundary>
  )
}
export default Page; 