import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    getMany : baseProcedure.query(async ({ ctx })=>{
        
          const data =await ctx.payload.find({
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
          const formattedData = data.docs.map((doc)=>({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((subcategory)=>({...(subcategory as Category), subcategories: undefined}))
            //Because of depth 1 we are confident that subcategory will be type of category
          }))
        return formattedData;
    })
})