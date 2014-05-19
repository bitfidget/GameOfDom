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

class Div < ActiveRecord::Base
  attr_accessible :content, :page_id
  # validation - needs to have a url and title
  validates :content, :presence => true
  validates :page_id, :presence => true
  # relationships
  belongs_to :page
  has_many(:battles, :foreign_key => :winner_id) 
  has_many(:conquests, :through => :battles, :source => :loser)
  
  #has_many(:conquests, :class_name => :Battle, :foreign_key => :loser_id)

  #self-join relationships
  # scenes
  # has_many(:battles, :foreign_key => :winner_id)
  # has_many(:conquests, :through => :battles, :source => :loser)

  # tracks
  # belongs_to :origin, :class_name => :Scene
  # belongs_to :destination, :class_name => :Scene

  #self-join relationships
  # scenes
  # has_many(:tracks, :foreign_key => :origin_id, :dependent => :destroy)
  # has_many(:destinations, :through => :tracks, :source => :destination)

  # tracks
  # belongs_to :origin, :class_name => :Scene
  # belongs_to :destination, :class_name => :Scene

end
