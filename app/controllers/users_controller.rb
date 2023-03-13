class UsersController < ApplicationController
    skip_before_action :authorized, only: :create
    
        def create
            user = User.create!(user_params)
            session[:user_id] = user.id
            render json: user, include: ['budget_categories', 'wanted_items', 'wanted_items.tags'], status: :created
        end
    
        def show
            user = User.find(session[:user_id])
            render json: user, include: ['budget_categories', 'wanted_items', 'wanted_items.tags'], status: :ok
        end
    
        def update
            user = User.find_by(id: session[:user_id])
            user.update!(user_params)
            render json: user, status: :ok
        end
    
        private
    
        def user_params
            params.permit(:first_name, :last_name, :email, :monthly_income, :password)
        end
    end
