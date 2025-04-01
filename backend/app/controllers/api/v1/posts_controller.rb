# 記事コントローラー
module Api
  module V1
    class PostsController < ApplicationController
      before_action :authenticate_api_v1_user!, except: [:index,:show]
      before_action :set_post, only: [:update, :destroy]

      def index
        posts = Post.includes(:user).all
        render json: posts.map { |post| 
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
        }
      end

      def show
        post = Post.includes(:user).find(params[:id])
        
        render json: {
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
      end

      def create
        post = current_api_v1_user.posts.new(post_params)
        if post.save
          post.image.attach(params[:post][:image]) if params[:post][:image]
          render json: post, status: :created
        else
          render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        authorize_user! # ユーザーの権限を確認

        if @post.update(update_params)
          @post.image.attach(params[:post][:image]) if params[:post][:image]
          render json: @post
        else
          render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        authorize_user! # ユーザーの権限を確認

        @post.destroy
        render json: {}, status: :no_content
      end

      private

        def set_post
          @post = Post.find(params[:id])
        end

        def authorize_user!
          if @post.user_id != current_api_v1_user.id
            render json: { error: 'You are not authorized to perform this action.' }, status: :forbidden
            return
          end
        end

        def post_params
          params.require(:post).permit(:user_id, :use_tool, :title, :content, :category)
        end

        def update_params
          params.require(:post).permit(:use_tool, :title, :content, :category)
        end
    end
  end
end