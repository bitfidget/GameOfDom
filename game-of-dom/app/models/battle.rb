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

class Battle < ActiveRecord::Base
  attr_accessible :score, :winner_id, :loser_id

  # relationships
  belongs_to :winner, :class_name => :Div
  belongs_to :loser, :class_name => :Div

end
