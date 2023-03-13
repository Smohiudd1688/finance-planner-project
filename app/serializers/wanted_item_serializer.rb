class WantedItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :amount_saved, :reason

  has_many :tags
end
