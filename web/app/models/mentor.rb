class Mentor < ApplicationRecord
  belongs_to :participant
  has_one :pairing, dependent: :destroy
  validates_presence_of :participant
end
