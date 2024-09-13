Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users do
        resources :following, only: %i[index]
        resources :followers, only: %i[index]
        resources :posts
      end
      resources :posts, only: %i[index]
      resources :likes, only: %i[create destroy]
      resources :relationships, only: %i[create, destroy]
    end
  end
end
