require 'spec_helper'

describe "divs/edit" do
  before(:each) do
    @div = assign(:div, stub_model(Div))
  end

  it "renders the edit div form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", div_path(@div), "post" do
    end
  end
end
