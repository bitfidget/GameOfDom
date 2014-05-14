require 'spec_helper'

describe "pages/index" do
  before(:each) do
    assign(:pages, [
      stub_model(Page),
      stub_model(Page)
    ])
  end

  it "renders a list of pages" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
