require 'spec_helper'

describe "divs/show" do
  before(:each) do
    @div = assign(:div, stub_model(Div))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
