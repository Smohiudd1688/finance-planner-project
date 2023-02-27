class BudgetCategory < ApplicationRecord
    belongs_to :user

    validates :title, :budget, :current_spent, presence: true
    validates :budget, numericality: { greater_than: 0 }
    validates :current_spent, numericality: { greater_than: 0 }
end
