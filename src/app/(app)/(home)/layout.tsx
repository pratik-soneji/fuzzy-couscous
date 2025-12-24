import configPromise from '@payload-config'
import { getPayload } from 'payload' 
import Footer from "./Footer";
import { Navbar } from "./Navbar";
import { SearchFilter } from "./search-filter";
import { Category } from '@/payload-types';
import { CustomCategory } from './types';

interface Props { 
  children: React.ReactNode;
}
const Layout =  async({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const data =await payload.find({
    collection: 'categories',
    depth:1,//Poppulate Categories here 0 means it will just give an id of references it has not whole the object
    pagination: false,
    where: {
      parent: {
        exists: false
      }
    },
    sort: "name"
  })

  const formattedData : CustomCategory[]= data.docs.map((doc)=>({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((subcategory)=>({...(subcategory as CustomCategory), subcategories: undefined}))
    //Because of depth 1 we are confident that subcategory will be type of category
  }))

  
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar  /> 
      <SearchFilter data={formattedData}/>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer/>
    </div>
  );
};

export default Layout;
