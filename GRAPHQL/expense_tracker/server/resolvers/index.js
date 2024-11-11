import { mergeResolvers } from "@graphql-tools/merge";

// resolvers
import { transactionResolver } from "./transaction.resolver.js";
import { userResolver } from "./user.resolver.js";

export const MergeResolvers = mergeResolvers([
  userResolver,
  transactionResolver,
]);