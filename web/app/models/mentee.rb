class Mentee < ApplicationRecord
  belongs_to :participant
  has_one :pairing
  validates_presence_of :participant
end
