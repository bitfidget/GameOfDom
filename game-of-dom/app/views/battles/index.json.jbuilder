json.array!(@battles) do |battle|
  json.extract! battle, :id
  json.url battle_url(battle, format: :json)
end
