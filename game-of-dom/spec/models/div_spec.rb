# == Schema Information
#
# Table name: divs
#
#  id         :integer          not null, primary key
#  content    :text
#  element    :string(255)
#  page_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe Div do

  it { should belong_to :page }
  it { should have_many :battles }
  it { should have_many (:conquests).through(:battles).source(:loser) }
  it { should have_many :conquests }

  before do
      @div = Div.new
  end

  it 'should return a new Div' do
    @div.should_not be_nil
    @div.class.should eq(Div)
  end

  it 'should have a content attribute' do
    @div.should respond_to(:content) # @div.content
  end

  it 'should have a page_id attribute' do
    @div.should respond_to(:page_id) # @div.page_id
  end

end


describe '.create' do
  context 'without content' do
    before do
      @div = FactoryGirl.build :div, :content => nil
      @div.save # This will return false and not save.
    end

    it "should not be valid" do
      @div.valid?.should be_false
    end

    it "should not have an ID" do
      @div.id.should be_nil
    end

    it "should populate the errors array" do
      @div.errors.should_not be_empty
    end
  end

  context 'with content' do
    before do
      @div = FactoryGirl.create :div
    end

    it "should be valid" do
      @div.valid?.should be_true
    end

    it "should have an ID" do
      @div.id.should_not be_nil
    end

    it "should not populate the errors array" do
      @div.errors.any?.should be_false
    end
  end

  context 'without a page_id' do
    before do
      @div = FactoryGirl.build :div, :page_id => nil
      @div.save # This will return false and not save.
    end

    it "should not be valid" do
      @div.valid?.should be_false
    end

    it "should not have an ID" do
      @div.id.should be_nil
    end

    it "should populate the errors array" do
      @div.errors.should_not be_empty
    end
  end

  context 'with a page_id' do
    before do
      @div = FactoryGirl.create :div
    end

    it "should be valid" do
      @div.valid?.should be_true
    end

    it "should have an ID" do
      @div.id.should_not be_nil
    end

    it "should not populate the errors array" do
      @div.errors.any?.should be_false
    end
  end
end

