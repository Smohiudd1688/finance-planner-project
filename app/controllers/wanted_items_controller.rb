class WantedItemsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    
        def create
            user = User.find(session[:user_id])
            wanted_item = user.wanted_items.create!(wanted_item_params)
            wanted_item.createTags(params[:new_tags])
            render json: wanted_item, status: :created
        end
    
        def index
            #user = User.find(session[:user_id])
            #render json: user.wanted_items, status: :ok
            
            render json: WantedItem.all, status: :ok
        end
    
        def update
            wanted_item = WantedItem.find_by(id: params[:id])
            wanted_item.update!(wanted_item_params)
            render json: wanted_item, status: :ok
        end

        def destroy
            wanted_item = WantedItem.find_by(id: params[:id])
            wanted_item.destroy
            head :no_content
        end
    
        private
    
        def wanted_item_params
            params.permit(:title, :price, :importance, :amount_saved, :reason)
        end
    
        def render_unprocessable_entity_response(invalid)
            render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
        end
    
        def render_not_found
            render json: {errors: "Wanted Item not found"}, status: :not_found
        end
end
