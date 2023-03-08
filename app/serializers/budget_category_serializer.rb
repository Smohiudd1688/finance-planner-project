class BudgetCategorySerializer < ActiveModel::Serializer
  attributes :id, :title, :budget, :current_spent
end
