'use client'

import { createClient } from "@/utils/supabase/client";
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
      <div className="w-11/12 flex flex-col  text-center bg-amber-500 ">
        <div className="bg-amber-200 h-16 flex justify-center flex-col ">
          <h1 className="text-3xl ">献立作成 ここにタイトルはいる</h1>
        </div>
        <div className="h-60 bg-red-400  flex flex-col">
          <div>
          <table className="border-collapse border border-gray-400 ...">
            <thead>
              <tr>
                <th className="border border-gray-300 ...">State</th>
                <th className="border border-gray-300 ...">City</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 ...">Indiana</td>
                <td className="border border-gray-300 ...">Indianapolis</td>
              </tr>
              <tr>
                <td className="border border-gray-300 ...">Ohio</td>
                <td className="border border-gray-300 ...">Columbus</td>
              </tr>
              <tr>
                <td className="border border-gray-300 ...">Michigan</td>
                <td className="border border-gray-300 ...">Detroit</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        <div>
          レシピゾーン
        </div>
      </div>
    </div>
  );
}
