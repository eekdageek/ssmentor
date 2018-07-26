class Mentor < ApplicationRecord
  belongs_to :participant
  validates_presence_of :participant
end
