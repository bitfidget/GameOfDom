require 'spec_helper'

describe "divs/index" do
  before(:each) do
    assign(:divs, [
      stub_model(Div),
      stub_model(Div)
    ])
  end

  it "renders a list of divs" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
