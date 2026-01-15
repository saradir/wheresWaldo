import { supabase } from "../config/supabase.js";

export async function getIconSignedUrl(path) {
  const { data, error } = await supabase.storage
    .from("icons")
    .createSignedUrl(path, 60); // seconds

  if (error) {
    throw new Error(error.message);
  }

  return data.signedUrl;
}