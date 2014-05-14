require 'spec_helper'

describe "pages/show" do
  before(:each) do
    @page = assign(:page, stub_model(Page))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
