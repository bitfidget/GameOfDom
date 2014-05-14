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

require 'spec_helper'

describe Battle do

  before do
      @battle = Battle.new
  end

  it 'should return a new Battle' do
    @battle.should_not be_nil
    @battle.class.should eq(Battle)
  end

  it 'should have a score attribute' do
    @battle.should respond_to(:score) # @battle.score
  end

  it 'should have a winner_id attribute' do
    @battle.should respond_to(:winner_id) # @battle.winner_id
  end

  it 'should have a loser_id attribute' do
    @battle.should respond_to(:loser_id) # @battle.loser_id
  end

end
