class CreateMentees < ActiveRecord::Migration[5.2]
  def change
    create_table :mentees do |t|
      t.integer :participant_id

      t.timestamps
    end
    
    add_foreign_key :mentees, :participants
  end
end
