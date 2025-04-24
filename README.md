# production_story
制作裏話  
  
楽曲や歌ってみたを投稿した方がどういう機材を使用してるのか  
解説等を投稿するサイトです。  
URL:https://web.portfolio-example.com/  

ゲスト用アカウント
>Name
gestuser

>mail
gest@gmail.com

>password
gestuser

技術構成  
バックエンド（API）  
・使用技術：Ruby on Rails  
・デプロイ先：AWS ECS（Fargate）  
・コンテナ化：Docker  
・API サーバーとして稼働  
  
フロントエンド  
・使用技術：React  
・ビルド後の静的ファイルを S3 に配置  
・配信：CloudFront 経由で高速配信  

