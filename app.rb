require 'bundler'
Bundler.require


get '/' do
  erb :index
end


get '/api/colors/random' do
  content_type :json
  api_response = HTTParty.get('http://www.colourlovers.com/api/palettes/random')
  colors = api_response['palettes']['palette']['colors']['hex']
  colors.map! {|hex| "#" + hex }
  colors.to_json
end
