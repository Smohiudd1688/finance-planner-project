class CreateBudgetCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :budget_categories do |t|
      t.string :title
      t.float :budget
      t.float :current_spent
      t.integer :user_id

      t.timestamps
    end
  end
end
