Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :surveys
  resources :checkins
  resources :participants

  resources :pairings do
    post :checkin, on: :member
    post :survey, on: :member
  end
end
