GameOfDom::Application.routes.draw do
  
  root :to => 'home#index'

  resources :battles

  resources :divs

  resources :pages

end
