GameOfDom::Application.routes.draw do
  resources :battles

  resources :divs

  resources :pages

  get "battle/new"
  get "battle/create"
  get "battle/update"
  get "battle/edit"
  get "battle/destroy"
  get "battle/index"
  get "battle/show"
  get "div/new"
  get "div/create"
  get "div/update"
  get "div/edit"
  get "div/destroy"
  get "div/index"
  get "div/show"
  get "page/new"
  get "page/create"
  get "page/update"
  get "page/edit"
  get "page/destroy"
  get "page/index"
  get "page/show"

end
