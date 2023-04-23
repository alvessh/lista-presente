import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const token = import.meta.env.VITE_SUPABASE_TOKEN;
const supabase = createClient(url, token);

export async function selectList() {
  const { data } = await supabase
    .from("lista")
    .select()
    .order("confirmado", { ascending: true })
    .order("id", { ascending: true });
  return data;
}

export async function selectListById(id) {
  const { data } = await supabase.from("lista").select().eq("id", id);
  return data[0];
}

export async function deleteById(id) {
  const { error } = await supabase.from("lista").delete().eq("id", id);
  return error;
}

export async function insertList(item) {
  const { error } = await supabase.from("lista").insert(item);
  return error;
}

export async function updateItem(id, item) {
  const { error } = await supabase.from("lista").update(item).eq("id", id);
  return error;
}
