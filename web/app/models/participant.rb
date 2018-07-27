class Participant < ApplicationRecord
  attr_accessor :mode

  validates_presence_of :name, :slack_id
  validates_uniqueness_of :slack_id
  
  has_many :mentors
  has_many :mentees

  before_save do |p|
    if p.mode == 'mentor'
      p.mentors << Mentor.new(participant: p)
    elsif p.mode == 'mentee'
      p.mentees << Mentee.new(participant: p)
    end
    p.mode = nil
  end
end
