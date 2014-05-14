require 'spec_helper'

describe "battles/show" do
  before(:each) do
    @battle = assign(:battle, stub_model(Battle))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
