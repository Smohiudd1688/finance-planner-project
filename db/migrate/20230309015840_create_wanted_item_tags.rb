class CreateWantedItemTags < ActiveRecord::Migration[6.1]
  def change
    create_table :wanted_item_tags do |t|
      t.integer :wanted_item_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
