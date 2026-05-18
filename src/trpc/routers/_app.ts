import { authRouter } from '@/modules/auth/server/procedures';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { checkoutRouter } from '@/modules/checkout/server/procedures';
import { reviewsRouter  } from '@/modules/reviews/server/procedures'
import { productsRouter } from '@/modules/products/server/procedures';
import { tagsRouter } from '@/modules/tags/procedures';
import { tenantsRouter } from '@/modules/tenants/server/procedures';
import { createTRPCRouter } from '../init';
import { libraryRouter } from '@/modules/library/server/procedures';
export const appRouter = createTRPCRouter({
  auth: authRouter,
  reviews: reviewsRouter,
  products: productsRouter,
  categories: categoriesRouter,
  checkout: checkoutRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
  library: libraryRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
