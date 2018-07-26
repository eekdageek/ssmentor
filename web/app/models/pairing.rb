class Pairing < ApplicationRecord
  belongs_to :mentor
  belongs_to :mentee
  validates_presence_of :mentor, :mentee
end
