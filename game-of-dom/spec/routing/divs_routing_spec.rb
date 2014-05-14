require "spec_helper"

describe DivsController do
  describe "routing" do

    it "routes to #index" do
      get("/divs").should route_to("divs#index")
    end

    it "routes to #new" do
      get("/divs/new").should route_to("divs#new")
    end

    it "routes to #show" do
      get("/divs/1").should route_to("divs#show", :id => "1")
    end

    it "routes to #edit" do
      get("/divs/1/edit").should route_to("divs#edit", :id => "1")
    end

    it "routes to #create" do
      post("/divs").should route_to("divs#create")
    end

    it "routes to #update" do
      put("/divs/1").should route_to("divs#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/divs/1").should route_to("divs#destroy", :id => "1")
    end

  end
end
