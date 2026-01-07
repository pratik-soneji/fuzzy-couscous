interface Props{
    params: Promise<
    {category : string;
      subcategory: string;
    }
    >
}
const Page = async({ params }:Props) => {
  const { category, subcategory } = await params;
  return (
    <div>Main {category} <br /> SUb :  {subcategory}</div>
  )
}
export default Page; 