class Participant < ApplicationRecord
  validates_presence_of :name, :slack_id
  validates_uniqueness_of :slack_id
  
  has_many :mentors
  has_many :mentees
end
