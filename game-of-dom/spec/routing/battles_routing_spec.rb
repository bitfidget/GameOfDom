require "spec_helper"

describe BattlesController do
  describe "routing" do

    it "routes to #index" do
      get("/battles").should route_to("battles#index")
    end

    it "routes to #new" do
      get("/battles/new").should route_to("battles#new")
    end

    it "routes to #show" do
      get("/battles/1").should route_to("battles#show", :id => "1")
    end

    it "routes to #edit" do
      get("/battles/1/edit").should route_to("battles#edit", :id => "1")
    end

    it "routes to #create" do
      post("/battles").should route_to("battles#create")
    end

    it "routes to #update" do
      put("/battles/1").should route_to("battles#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/battles/1").should route_to("battles#destroy", :id => "1")
    end

  end
end
