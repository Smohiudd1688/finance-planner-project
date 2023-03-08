class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :monthly_income, :email

  has_many :budget_categories
  has_many :wanted_items
end
