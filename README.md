# 🍱  献立管理アプリ - 食材リスト自動生成（Next.js × Supabase × TypeScript）

## 📎 サービスのURL（現在はPC表示のみ対応しています。スマートフォンは未対応です。）

https://menu-app-git-main-f-naris-projects.vercel.app

## 👨‍⚕️👩‍⚕️アプリへの思い

私と妻がともに不定休のため、一度に１週間分の食料を買う必要がある。そのため、献立を決め、必要な材料を洗い出している。
しかし、あらゆる料理サイトを見て、献立を決め、材料を抽出するのは、手間がかかる。
その手間を効率化し、より簡単に献立を作成・材料を管理できるようにしたいという思いから、このアプリを開発しました。

## ✨ アプリ概要

このアプリは、数日分の献立を決めると必要な材料を自動集計し、効率的な買い物リストを作成してくれる Web アプリです。  
Next.js（TypeScript） + Supabase（DB・認証）を活用して作成しています。


## 🖥️ 使用技術
フロントエンド
- Next.js (TypeScript)
- TailwindCSS（UIスタイリング）
- fortawesome(アイコン)

バックエンド
- Next.js (TypeScript)

データベース
- Supabase（PostgreSQL + Auth）

その他
- Vercel（デプロイ)

---

## 📱 画面構成（全5画面）

| 画面名             | 内容 |
|--------------------|------|
| ① ログイン画面       | Supabase Authと連携。ゲストユーザーログイン機能あり。 |
| ② 献立作成+レシピ画面  | カレンダー or 選択式で、日付＋時間帯にレシピを紐づけて献立を作成。レシピも一覧で見れるようになっている|
| ③ レシピ追加画面     | レシピ情報と複数の材料を登録できるフォーム。 |
| ④ レシピ詳細画面     | レシピ名、ジャンル、作成者、材料一覧などの詳細表示。 |

| ① ログイン画面 |② 献立作成画面 |
|----|----|
|![Image](https://github.com/user-attachments/assets/fdc11b5e-b914-4d8f-88d6-e86455028757)|![Image](https://github.com/user-attachments/assets/16f1b67c-fc5c-44cb-9df8-5416ef7d476a) |
|Supabase Authと連携。ゲストユーザーログイン機能あり。|カレンダー or 選択式で、日付＋時間帯にレシピを紐づけて献立を作成。レシピも一覧で見れるようになっている|献立を作成できたり、レシピの一覧を見ることができる|
| ③レシピ詳細画面 |④レシピ編集画面 |
|----|----|
|![Image](https://github.com/user-attachments/assets/355b2f46-d524-4c67-83e4-d005a87d23dc)|![Image](https://github.com/user-attachments/assets/adeb9fe4-b578-4e34-bce6-cb57a0a3cbbb)|
|レシピの詳細を確認することができ、削除を行ったり、編集画面に移ることができる。 |編集を行うことができる |



---

## 🗄️ データベース構成（Supabase）

### users（自動管理）

| カラム名 | 型     | 内容               |
|----------|--------|--------------------|
| id       | UUID   | ユーザーID（Auth） |
| name     | string | 表示名（任意）     |
| email    | string | メールアドレス     |

---

### recipes（レシピ）

| カラム名    | 型        | 内容                 |
|-------------|-----------|----------------------|
| id          | serial    | レシピID             |
| name        | string    | レシピ名             |
| genre       | string    | ジャンル（主食など） |
| memo       | string    | 作り方のメモ等 |
| image_url       | text    | 画像の表示 |
| created_at  | timestamp | 登録日時             |
| user_id     | UUID      | 登録者のユーザーID   |

---

### ingredients（材料）

| カラム名   | 型     | 内容           |
|------------|--------|----------------|
| id         | serial | 材料ID         |
| recipe_id  | int    | レシピID       |
| title       | string | 材料名         |
| quantity   | int | 数量（例：1, 300） |
| unit       | string | 単位（例：個、g、本） |
| update_at  | timestamp | 更新日時             |

---


---
## 今後の展望
- スマートフォン向けのレスポンシブ対応
- レシピのジャンル別・キーワード検索などのフィルター機能
---

## ER図
![Image](https://github.com/user-attachments/assets/1c6a8f53-ec21-41e1-8bf5-61730bccaf29)
---
