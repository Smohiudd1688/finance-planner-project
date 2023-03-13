class WantedItemTagsController < ApplicationController
    def create
        wanted_item_tag = WantedItemTag.create!(wanted_item_tag_params)
        render json: wanted_item_tag, status: :ok
    end

    private

    def wanted_item_tag_params
        params.permit(:tag_id, :wanted_item_id)
    end
end
