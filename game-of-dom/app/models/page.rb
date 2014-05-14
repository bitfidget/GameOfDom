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

class Page < ActiveRecord::Base
  attr_accessible :url, :title, :favicon
  # validation - needs to have a url and title
  validates :url, :presence => true
  validates :title, :presence => true
  # relationships
  has_many :divs
end
