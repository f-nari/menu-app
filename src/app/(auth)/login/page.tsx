// src/app/(auth)/login/page.tsx
'use client';

import { guestLogin, login, signup } from './actions';

export default function LoginPage() {
  return (

    <form className="bg-white p-8 rounded-lg shadow-md w-80 space-y-5">
      <h2 className="text-2xl font-bold text-center">ログイン</h2>
      <div>
        <label htmlFor="email" className="block mb-1 font-semibold">メールアドレス</label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 font-semibold">パスワード</label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="submit"
          formAction={login}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ログイン
        </button>
        <button
          type="submit"
          formAction={signup}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          新規登録
        </button>
        <button
          type="submit"
          formAction={guestLogin}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          ゲストユーザーログイン
        </button>
      </div>
    </form>
  );
}
