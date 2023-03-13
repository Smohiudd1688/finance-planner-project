class WantedItemTagsController < ApplicationController
    def create
        tag = Tag.create!(tag_params)
        render json: tag, status: :created
    end

    private

    def wanted_item_tag_params
        params.permit(:tag_id, :wanted_item_id)
    end
end
