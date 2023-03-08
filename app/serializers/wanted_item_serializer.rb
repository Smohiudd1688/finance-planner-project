class WantedItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :amount_saved, :reason
end
