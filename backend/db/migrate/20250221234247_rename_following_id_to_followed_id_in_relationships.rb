class RenameFollowingIdToFollowedIdInRelationships < ActiveRecord::Migration[7.0]
  def change
    rename_column :relationships, :following_id, :followed_id
  end
end
