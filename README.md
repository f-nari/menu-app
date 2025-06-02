# 🍱 献立アプリ（Next.js × Supabase × TypeScript）

## サービスのURL

[こちら](menu-app-ecru-eight.vercel.app)

## ✨ アプリ概要

このアプリは、数日分の献立を決めると必要な材料を自動集計し、効率的な買い物リストを作成してくれる Web アプリです。  
Next.js（TypeScript） + Supabase（DB・認証）を活用して作成しています。

---

## 🖥️ 使用技術

- Next.js (TypeScript)
- Supabase（PostgreSQL + Auth）
- TailwindCSS（UIスタイリング）
- Vercel（デプロイ予定）
- Google認証（OAuth）

---

## 📱 画面構成（全5画面）

| 画面名             | 内容 |
|--------------------|------|
| ① ログイン画面       | Googleログインによる認証機能。Supabase Authと連携。 |
| ② ホーム画面         | 買い物リスト（献立に基づく材料の自動集計）を表示。 |
| ③ 献立作成画面       | カレンダー or 選択式で、日付＋時間帯にレシピを紐づけて献立を作成。 |
| ④ レシピ追加画面     | レシピ情報と複数の材料を登録できるフォーム。 |
| ⑤ レシピ詳細画面     | レシピ名、ジャンル、作成者、材料一覧などの詳細表示。 |

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
| created_at  | timestamp | 登録日時             |
| user_id     | UUID      | 登録者のユーザーID   |

---

### ingredients（材料）

| カラム名   | 型     | 内容           |
|------------|--------|----------------|
| id         | serial | 材料ID         |
| recipe_id  | int    | レシピID       |
| name       | string | 材料名         |
| quantity   | string or numeric | 数量（例：1, 300） |
| unit       | string | 単位（例：個、g、本） |

---

### menu_items（献立）

| カラム名   | 型     | 内容                     |
|------------|--------|--------------------------|
| id         | serial | 献立ID                   |
| date       | date   | 日付（例：2025-04-12）   |
| time_slot  | string | 朝 / 昼 / 夜             |
| recipe_id  | int    | 紐づけたレシピID         |
| user_id    | UUID   | ユーザーID（所有者識別） |

> ※ 将来的に複数献立パターンを保存したい場合は `menus` テーブル追加で対応可能。

---

## 🚀 今後の実装ステップ（予定）

1. プロジェクト初期化（Next.js + TailwindCSS）
2. Supabaseと連携（Auth / DB設定）
3. ログイン画面作成（Googleログイン）
4. ホーム画面の仮表示
5. レシピ登録機能
6. 献立作成機能（カレンダー or 選択UI）
7. 材料集計ロジックの実装（買い物リスト生成）
8. UIのブラッシュアップ
9. Vercelへデプロイ

---

## 📝 補足メモ

- レシピの材料数は可変のため、別テーブル（ingredients）で正規化
- 献立情報も、時間帯と日付で構成し、menu_itemsで管理
- シンプルな構成でまず MVP（最小機能製品）を目指す
- 将来的な拡張（お気に入り献立の保存、画像添付など）も視野に入れる設計

---
