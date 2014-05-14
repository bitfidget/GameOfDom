json.array!(@divs) do |div|
  json.extract! div, :id
  json.url div_url(div, format: :json)
end
