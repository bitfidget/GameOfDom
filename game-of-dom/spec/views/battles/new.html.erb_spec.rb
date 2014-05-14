require 'spec_helper'

describe "battles/new" do
  before(:each) do
    assign(:battle, stub_model(Battle).as_new_record)
  end

  it "renders new battle form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", battles_path, "post" do
    end
  end
end
