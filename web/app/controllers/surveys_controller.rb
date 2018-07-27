class SurveysController < ActionController::API
  def update
    @survey = Survey.find(params[:id])
    body = request.body.read
    begin
      @survey.update_attributes(JSON.parse(body))
      render json: {}
    rescue => e
      render status: 400, json: {error: e}
    end
  end
end
