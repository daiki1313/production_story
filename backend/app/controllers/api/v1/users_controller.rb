module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: [:show,:followers,:following]


      def update_avatar
        @user = User.find(params[:id])

        if params[:avatar].present?
          @user.avatar.attach(params[:avatar]) # attachメソッドを使う
      
          if @user.save # 保存を行う
            render json: { status: 'success', avatar_url: url_for(@user.avatar) }
          else
            render json: { status: 'error', message: @user.errors.full_messages }
          end
          
        else
          render json: { status: 'error', message: 'No avatar provided' }
        end

      end
      
      def show
        posts = @user.posts.includes(:user)

        # フォロワー数とフォロー数を取得
        following_count = @user.following_count
        follower_count = @user.follower_count
        
            render json: {
              user_name: @user.name,
              userAvatar: @user.avatar_url,
              posts: posts.map { |post| 
                {
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  useTool: post.use_tool,
                  category: post.category,
                  userName: post.user.name,
                  userId: post.user_id,
                  userAvatar: post.user.avatar_url,
                  imageUrl: post.image.attached? ? url_for(post.image) : nil,
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
