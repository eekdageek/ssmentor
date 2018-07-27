class PairingsController < ApplicationController
  def index
    @pairings = Pairing.all.includes(mentor: [:participant], mentee: [:participant])
    @mentors = Mentor.where("id not in (select mentor_id from pairings)")
    @mentees = Mentee.where("id not in (select mentee_id from pairings)")
  end

  def create
    @pairing = Pairing.new(params.require(:pairing).permit(:mentor_id, :mentee_id))
    @pairing.save
    redirect_to pairings_path
  end

  def destroy
    @pairing = Pairing.find(params[:id])
    @pairing.destroy
    redirect_to pairings_path
  end

end
