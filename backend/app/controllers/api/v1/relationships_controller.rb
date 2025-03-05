module Api
  module V1
    class RelationshipsController < ApplicationController
      before_action :authenticate_api_v1_user!, only: [:create,:destroy]

      # ユーザーをフォロー
      def create
        other_user = User.find(params[:followed_id])

        # ユーザーが自分自身をフォローしないように
        if current_api_v1_user == other_user
          render json: { error: "自分自身をフォローすることはできません" }, status: :unprocessable_entity
          return
        end
        
        # フォロー処理
        if current_api_v1_user.follow(other_user)
          render json: { message: "フォローしました" }, status: :ok
        else
          render json: { error: "フォローできませんでした" }, status: :unprocessable_entity
        end
      end

      # フォロー解除
      def destroy
        other_user = Relationship.find(params[:id]).followed
        
        # フォロー解除処理
        if current_api_v1_user.unfollow(other_user)
          render json: { message: "フォローを解除しました" }, status: :ok
        else
          render json: { error: "フォロー解除できませんでした" }, status: :unprocessable_entity
        end
      end
    
    end
  end
end