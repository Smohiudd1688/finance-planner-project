class BudgetCategoriesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    
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
    
        def render_unprocessable_entity_response(invalid)
            render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
        end
    
        def render_not_found
            render json: {errors: "Budget Category not found"}, status: :not_found
        end
end
