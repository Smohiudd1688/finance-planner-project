class TagsController < ApplicationController
    def create
        tag = Tag.create!(tag_params)
        render json: tag, status: :created
    end

    def index
        tags = Tag.all
        render json: tags, status: :ok
    end

    private

    def tag_params
        params.permit(:title)
    end

end
