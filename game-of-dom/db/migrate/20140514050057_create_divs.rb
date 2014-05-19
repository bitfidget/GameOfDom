class CreateDivs < ActiveRecord::Migration
  def change
    create_table :divs do |t|
      t.text :content
      t.string :element
      t.integer :page_id

      t.timestamps
    end
  end
end
