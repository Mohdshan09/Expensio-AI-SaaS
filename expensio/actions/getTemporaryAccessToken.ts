"use server";

import { currentUser } from "@clerk/nextjs/server";

import { SchematicClient } from "@schematichq/schematic-typescript-node";
const apiKey = process.env.SCHEMATIC_API_KEY;
const client = new SchematicClient({ apiKey });

// Get a temporary access token
export async function getTemporaryAccessToken() {
  console.log("Getting tempAccess user token");
  const user = await currentUser();

  if (!user) {
    console.log("No user found ! returning null");
    return null;
  }

  console.log("Issuing the temporary access token for user", user.id);

  const res = await client.accesstokens.issueTemporaryAccessToken({
    resource_type: "company",
    lookup: { id: user.id },
  });

  console.log(
    "Token response recieved:",
    res.data ? "Token recieved" : "No token recieved",
  );

  return res.data?.token;
}
