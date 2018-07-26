class CreateCheckins < ActiveRecord::Migration[5.2]
  def change
    create_table :checkins do |t|
      t.integer :pairing_id, null: false
      t.string :q1
      t.string :q2
      t.string :q3

      t.timestamps
    end

    add_foreign_key :checkins, :pairings
  end


end
