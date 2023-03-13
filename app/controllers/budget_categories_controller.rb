class BudgetCategoriesController < ApplicationController   
        def create
            user = User.find(session[:user_id])
            budgetCategory = user.budget_categories.create!(budgetCategory_params)
            render json: budgetCategory, status: :created
        end
    
        def index
            user = User.find(session[:user_id])
            render json: user.budget_categories, status: :ok
        end
    
        def update
            budgetCategory = BudgetCategory.find_by(id: params[:id])
            budgetCategory.update!(budgetCategory_params)
            render json: budgetCategory, status: :ok
        end
    
        private
    
        def budgetCategory_params
            params.permit(:title, :budget, :current_spent)
        end

end
