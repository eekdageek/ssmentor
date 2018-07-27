class ParticipantsController < ApplicationController

  def new
    @participant ||= Participant.new
  end

  def index
    @participants = Participant.all
  end

  def create
    @participant = Participant.new(params.require(:participant).permit(:name, :slack_id, :mode))
    if @participant.save
      redirect_to participants_path
    else
      render action: 'new'
    end
  end

  def destroy
    @participant = Participant.find(params[:id])
    @participant.destroy
    redirect_to participants_path
  end

  def edit
    @participant = Participant.find(params[:id])
  end

  def update
    @participant = Participant.find(params[:id])
    if @participant.update_attributes(params.require(:participant).permit(:name, :slack_id, :mode))
      redirect_to participants_path
    else
      render action: 'edit'
    end
  end
end
