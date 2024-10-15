Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users do
        resources :following, only: %i[index]
        resources :followers, only: %i[index]
      end
      resources :test, only: %i[index]
      resources :posts
      resources :likes, only: %i[create destroy]
      resources :relationships, only: %i[create, destroy]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end

    end
  end
end
