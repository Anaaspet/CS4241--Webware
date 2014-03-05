require 'sinatra'

#Called only on initial page load. Generates bounds, then serves the page.
get '/' do 
	@lowNum = 1 + rand(10)
	@highNum = 200 + rand(10)
	erb :home
end

#Is called when the player wants to play again. Lower and upper bounds are passed in, generates a new target number in that range. Returns the new target number.
get '/newTarget' do
	low = params["lowNum"].to_i
	high = params["highNum"].to_i
	return rand(low..high).to_s
end
