require 'spec_helper'

describe "battles/index" do
  before(:each) do
    assign(:battles, [
      stub_model(Battle),
      stub_model(Battle)
    ])
  end

  it "renders a list of battles" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
