import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mgzdrtpgdxuggissgsoz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nemRydHBnZHh1Z2dpc3Nnc296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIwMDU2NjcsImV4cCI6MTk5NzU4MTY2N30.VZnk2DX6Bencyo1k9u6w2KvBFijn1foHGFz0eVluIJg"
);

export async function selectList() {
  const { data } = await supabase.from("lista").select();
  return data;
}

export async function insertList(item) {
  const { error } = await supabase.from("lista").insert(item);
  return error;
}
