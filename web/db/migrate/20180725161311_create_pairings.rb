class CreatePairings < ActiveRecord::Migration[5.2]
  def change
    create_table :pairings do |t|
      t.integer :mentor_id, null: false
      t.integer :mentee_id, null: false

      t.date :start_date
      t.date :end_date
      t.timestamps
    end

    add_foreign_key :pairings, :mentors
    add_foreign_key :pairings, :mentees
  end
end
