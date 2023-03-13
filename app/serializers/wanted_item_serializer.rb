class WantedItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :amount_saved, :importance, :reason

  has_many :tags
end
