require 'httparty'

class Pairing < ApplicationRecord
  include HTTParty
  base_uri 'http://localhost:8526'

  belongs_to :mentor
  belongs_to :mentee
  has_many :checkins, dependent: :destroy
  has_many :surveys, dependent: :destroy
  validates_presence_of :mentor, :mentee

  def checkin!
    if c = Checkin.new(pairing: self).save
      self.class.post("/interaction/#{self.mentee.participant.slack_id}", body: {callback_url: "/checkins/#{c.id}"})
    else
      raise "Failed to save checkin #{c}"
    end
  end

  def survey!
    if c = Survey.new(pairing: self).save
      self.class.post("/interaction/#{self.mentee.participant.slack_id}", body: {callback_url: "/surveys/#{c.id}"})
    else
      raise "Failed to save survey #{c}"
    end
  end
end
