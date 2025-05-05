import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


// one table - accept all fun.
//get,update,delete.

export const getDocument = query({
    args: {},
    async handler(ctx){
        return await ctx.db.query("documents").collect()
    }
})



//create function to import db. (server side fun)
export const createDocument = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("documents", {
      title: args.title,
    });
  },
});
