class CheckinsController < ActionController::API
  def update
    @checkin = Checkin.find(params[:id])
    body = request.body.read
    begin
      @checkin.update_attributes(JSON.parse(body))
      render json: {}
    rescue => e
      render status: 400, json: {error: e}
    end
  end
end
