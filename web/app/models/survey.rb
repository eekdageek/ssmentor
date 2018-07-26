class Survey < ApplicationRecord
  belongs_to :pairing
  validates_presence_of :pairing
end
