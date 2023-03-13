class WantedItemTag < ApplicationRecord
    belongs_to :wanted_item
    belongs_to :tags
end
