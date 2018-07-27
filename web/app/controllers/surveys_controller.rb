class SurveysController < ActionController::API
  skip_before_filter :verify_authenticity_token

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
