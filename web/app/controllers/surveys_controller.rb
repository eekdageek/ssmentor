class SurveysController < ActionController:API
  def update
    @survey = Survey.find(params[:id])
  end
end
