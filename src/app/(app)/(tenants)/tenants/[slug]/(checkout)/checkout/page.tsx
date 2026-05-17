import { CheckoutView } from '@/modules/checkout/ui/views/checkoutview';

interface pageProps {
  params: Promise<{ slug: string }>;
}
const page = async ({ params }: pageProps) => {
  const { slug } = await params;
  return <CheckoutView tenantSlug={slug} />;
};

export default page;
