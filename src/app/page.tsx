'use client'

import { createClient } from "@/utils/supabase/client";


export default  function  Home()  {

  const signOut = async() => {
    console.log('ログアウト処理をします');
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    console.log('ｋろえがユーザーです',user);
    const { error } = await supabase.auth.signOut()
  }
  return (
    <div>
      ログインテスト
      <form action={signOut}>
        <button type="submit">ログアウト</button>
      </form>
    </div>
  );
}
