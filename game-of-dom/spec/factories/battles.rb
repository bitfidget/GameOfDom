# == Schema Information
#
# Table name: battles
#
#  id         :integer          not null, primary key
#  score      :integer
#  winner_id  :integer
#  loser_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :battle do
    score 10009
    winner_id 1
    loser_id 2
  end
end
