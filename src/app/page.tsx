import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { error } = await supabase.from("_supabase_connection_test").select("*").limit(1);

  // PGRST116 = table not found in schema cache (接続自体は成功)
  const connected = !error || error.code === "PGRST116";

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-6 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Supabase 接続テスト
        </h1>
        <div
          className={`rounded-lg px-6 py-4 text-center text-lg font-medium ${
            connected
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {connected ? "接続成功" : `接続失敗: ${error?.message}`}
        </div>
      </main>
    </div>
  );
}
