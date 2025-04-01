class User < ApplicationRecord
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :posts, dependent: :destroy

  # フォローしているユーザー
  has_many :active_relationships, class_name:  "Relationship",
                                  foreign_key: "follower_id",
                                  dependent:   :destroy

  has_many :passive_relationships, class_name:  "Relationship",
                                  foreign_key: "followed_id",
                                  dependent:   :destroy

  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  has_one_attached :avatar

  def avatar_url
    Rails.application.routes.url_helpers.rails_blob_path(avatar, only_path: true) if avatar.attached?
  end

  # ユーザーをフォローする
  def follow(other_user)
    following << other_user unless self == other_user
  end

  # 現在のユーザーが他のユーザーをフォローしていればtrueを返す
  def following?(other_user)
    following.include?(other_user)
  end

   # フォロワー数
   def follower_count
    self.followers.count
   end

  # フォロー数
  def following_count
    self.following.count
  end
  
end