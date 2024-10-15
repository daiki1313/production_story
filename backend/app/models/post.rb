class Post < ApplicationRecord
  belongs_to :user
  default_scope -> { order(created_at: :desc) }

  CATEGORY_VALUES = ['original', 'cover']

  validates :user_id, :title, :use_tool, :content, presence: true
  validates :category, presence: true, inclusion: { in: CATEGORY_VALUES }

end
