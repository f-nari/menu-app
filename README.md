# 🍱 献立アプリ（Next.js × Supabase × TypeScript）

## サービスのURL(スマートフォンには対応しておりません)

https://menu-app-git-main-f-naris-projects.vercel.app

## 👨‍⚕️👩‍⚕️アプリへの思い

私と妻がともに不定休のため、一週間に一度、１週間分の食料を買う必要があるため、献立を決め、必要な材料を買い出している。
しかし、あらゆる料理サイトを見て、献立を決め、材料を抽出するのは、手間がかかる。
そこで、献立を決め、材料を抽出する手間を効率的にできるようにしたいと思いから生まれました。

## ✨ アプリ概要

このアプリは、数日分の献立を決めると必要な材料を自動集計し、効率的な買い物リストを作成してくれる Web アプリです。  
Next.js（TypeScript） + Supabase（DB・認証）を活用して作成しています。


## 🖥️ 使用技術
フロントエンド
- Next.js (TypeScript)
- TailwindCSS（UIスタイリング）

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

| ① ログイン画面 |② 献立作成+レシピ画面 |
|----|----|
|![Image](https://github.com/user-attachments/assets/fdc11b5e-b914-4d8f-88d6-e86455028757)|![Image](https://github.com/user-attachments/assets/16f1b67c-fc5c-44cb-9df8-5416ef7d476a) |
|Supabase Authと連携。ゲストユーザーログイン機能あり。|カレンダー or 選択式で、日付＋時間帯にレシピを紐づけて献立を作成。レシピも一覧で見れるようになっている|献立を作成できたり、レシピの一覧を見ることができる|
| ③レシピ詳細画面 |④編集画面 |
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
| quantity   | string or numeric | 数量（例：1, 300） |
| unit       | string | 単位（例：個、g、本） |
| update_at  | timestamp | 更新日時             |

---


---
## 今後の展望



---

## ER図
https://github.com/f-nari/menu-app/issues/198#issuecomment-2935658627


---

## 📝 補足メモ

- レシピの材料数は可変のため、別テーブル（ingredients）で正規化
- 献立情報も、時間帯と日付で構成し、menu_itemsで管理
- シンプルな構成でまず MVP（最小機能製品）を目指す
- 将来的な拡張（お気に入り献立の保存、画像添付など）も視野に入れる設計

---
