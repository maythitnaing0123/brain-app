import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";


//to upload url.
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});



// one table - accept all fun.
//get,update,delete.

export const getDocument = query({
  args: {},
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});


export const getDocumentByID = query({
  args: {
    documentId : v.id("documents")
  },
  async handler(ctx , args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;


    if(!userId){
      return null;
    }

    const document = await ctx.db.get(args.documentId);

    
    if(!document){
      return null;
    }



    if (userId !== document?.tokenIdentifier) {
      return null;
    }

    

     return {...document , fileUrl : await  ctx.storage.getUrl(document.fileId)};

  },
});

//create function to import db. (server side fun)
export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId : v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("Not Authenticated");
    }

    await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId,
      fileId : args.fileId
    });
  },
});
