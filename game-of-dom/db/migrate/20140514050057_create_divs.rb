class CreateDivs < ActiveRecord::Migration
  def change
    create_table :divs do |t|
      t.string :content
      t.integer :page_id

      t.timestamps
    end
  end
end
