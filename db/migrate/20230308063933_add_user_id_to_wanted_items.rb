class AddUserIdToWantedItems < ActiveRecord::Migration[6.1]
  def change
    add_column :wanted_items, :user_id, :integer
  end
end
