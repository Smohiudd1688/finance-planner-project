class User < ApplicationRecord
    has_secure_password
    has_many :budget_categories

    validates :first_name, :last_name, :monthly_income, :email, presence: true
    validates :monthly_income, numericality: { greater_than: 0 }
    validates :email, uniqueness: { case_sensitive: false }
    validates :email, email: true
end
