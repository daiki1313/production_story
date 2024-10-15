//**********認証*****************
//サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

//サインイン
export interface SignInParams {
  email: string
  password: string
}

//ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}

//**********記事*****************
//ラジオボタン
export interface Radio {
  label: string
  value: string
}

// 共通の投稿インターフェース
export interface PostBaseParams {
  title: string;
  useTool: string;
  content: string;
  category: string;
}

//記事作成
export interface  PostCreateParams extends PostBaseParams {
  userId: number;
}

// 投稿更新
export interface PostUpdateParams extends PostBaseParams {}

// 投稿詳細
export interface PostShowParams extends PostBaseParams {
  userName: string;
  userId: number;
}

//投稿一覧
export interface PostsParams {
  id: number
  title: string
  category: string
  userName: string
}