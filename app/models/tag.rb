class Tag < ApplicationRecord
    has_many :wanted_item_tags
    has_many :wanted_items, through: :wanted_item_tags
 
    validates :title, presence: true
    validates :title, uniqueness: true
end
