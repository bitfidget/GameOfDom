# == Schema Information
#
# Table name: pages
#
#  id         :integer          not null, primary key
#  url        :string(255)
#  title      :string(255)
#  favicon    :string(255)
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe Page do

  it { should have_many :divs }

  before do
      @page = Page.new
  end

  it 'should return a new Page' do
    @page.should_not be_nil
    @page.class.should eq(Page)
  end

  it 'should have a url attribute' do
    @page.should respond_to(:url) # @page.url
  end

  it 'should have a title attribute' do
    @page.should respond_to(:title) # @page.title
  end

  it 'should have a favicon attribute' do
    @page.should respond_to(:favicon) # @page.favicon
  end

end


describe '.create' do
  context 'without a url' do
    before do
      @page = FactoryGirl.build :page, :url => nil
      @page.save # This will return false and not save.
    end

    it "should not be valid" do
      @page.valid?.should be_false
    end

    it "should not have an ID" do
      @page.id.should be_nil
    end

    it "should populate the errors array" do
      @page.errors.should_not be_empty
    end
  end

  context 'with a url' do
    before do
      @page = FactoryGirl.create :page
    end

    it "should be valid" do
      @page.valid?.should be_true
    end

    it "should have an ID" do
      @page.id.should_not be_nil
    end

    it "should not populate the errors array" do
      @page.errors.any?.should be_false
    end
  end

  context 'without a title' do
    before do
      @page = FactoryGirl.build :page, :title => nil
      @page.save # This will return false and not save.
    end

    it "should not be valid" do
      @page.valid?.should be_false
    end

    it "should not have an ID" do
      @page.id.should be_nil
    end

    it "should populate the errors array" do
      @page.errors.should_not be_empty
    end
  end

  context 'with a title' do
    before do
      @page = FactoryGirl.create :page
    end

    it "should be valid" do
      @page.valid?.should be_true
    end

    it "should have an ID" do
      @page.id.should_not be_nil
    end

    it "should not populate the errors array" do
      @page.errors.any?.should be_false
    end
  end
end
