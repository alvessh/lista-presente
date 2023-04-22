import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

export async function selectList() {
  const { data } = await supabase.from("lista").select();
  return data;
}

export async function selectListById(id) {
  const { data } = await supabase.from("lista").select().eq("id", id);
  return data[0];
}

export async function insertList(item) {
  const { error } = await supabase.from("lista").insert(item);
  return error;
}

export async function updateList(id, item) {
  const { error } = await supabase.from("lista").update(item).eq("id", id);
  return error;
}
