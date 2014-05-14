require 'spec_helper'

describe "battles/edit" do
  before(:each) do
    @battle = assign(:battle, stub_model(Battle))
  end

  it "renders the edit battle form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", battle_path(@battle), "post" do
    end
  end
end
