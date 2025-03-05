module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: [:show,:followers,:following]

      def show
        posts = @user.posts.includes(:user)

        # フォロワー数とフォロー数を取得
        following_count = @user.following_count
        follower_count = @user.follower_count
        
            render json: {
              posts: posts.map { |post| 
                {
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  useTool: post.use_tool,
                  category: post.category,
                  userName: post.user.name,
                  userId: post.user_id,
                }
              },
              following_count: following_count,
              follower_count: follower_count
            }

      end

      def following
        following = @user.following # フォローユーザーを取得

        # フォロワーの名前とアイコンを返す
        render json: following.map { |followed| 
          {
            id: followed.id,
            name: followed.name,
            # avatar_url: followed.avatar.url # `avatar`がCarrierWaveなどで設定されている場合
          }
        }
      end

      def followers
        followers = @user.followers # フォロワーを取得

        # フォロワーの名前とアイコンを返す
        render json: followers.map { |follower| 
          {
            id: follower.id,
            name: follower.name,
            # avatar_url: follower.avatar.url # `avatar`がCarrierWaveなどで設定されている場合
          }
        }
      end

      private

        def set_user
          @user = User.find(params[:id])
        end

    end
  end
end
