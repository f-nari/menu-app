'use client'

import { createClient } from "@/utils/supabase/client";
import Image from 'next/image'
import Link from "next/link";

export default function Home() {

  const signOut = async () => {
    console.log('ログアウト処理をします');
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    console.log('ｋろえがユーザーです', user);
    const { error } = await supabase.auth.signOut()
  }
  return (
    <div className="w-full flex justify-center h-full">
      <div className="w-11/12 flex flex-col ">
        <div className="text-center h-16 mt-6">
          <h1 className="text-3xl ">買い出しリスト</h1>
        </div>
        <div className="grid grid-cols-8 gap-8">
          <div>
            <input type="checkbox" />
            <label htmlFor="">人参</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">人参</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">人参</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">人参</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">人参</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">人参</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">人参</label>
          </div>
        </div>
      </div>
    </div>
  );
}
