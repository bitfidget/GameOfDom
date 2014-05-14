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

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :page do
    url "http://www.page.com"
    title "Welcome to Page"
    favicon "http://favicon.ico"
  end
end
