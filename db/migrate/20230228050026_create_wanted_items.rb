class CreateWantedItems < ActiveRecord::Migration[6.1]
  def change
    create_table :wanted_items do |t|
      t.string :title
      t.float :price
      t.integer :importance
      t.float :amount_saved
      t.text :reason

      t.timestamps
    end
  end
end
