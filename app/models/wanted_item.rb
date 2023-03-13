class WantedItem < ApplicationRecord
    belongs_to :user
    has_many :wanted_item_tags
    has_many :tags, through: :wanted_item_tags

    validates :title, :price, :title, :importance, :amount_saved, :reason, presence: true
    validates :price, numericality: { greater_than: 0 }
    validates :amount_saved, numericality: { greater_than_or_equal_to: 0 }
    validate :amount_saved_cannot_be_greater_than_price

    def amount_saved_cannot_be_greater_than_price
        if amount_saved > price
          errors.add(:amount_saved, "can't be greater than total value")
        end
    end
end
