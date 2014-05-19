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

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :div do
    content "lotsandlotsofcontentwillgohereit will need to <h1>escape html stuff</h1> and i'm not quite sure how to deal with that yet"
    page_id 1
  end
end
