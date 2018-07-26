class CreateMentors < ActiveRecord::Migration[5.2]
  def change
    create_table :mentors do |t|
      t.integer :participant_id

      t.timestamps
    end

    add_foreign_key :mentors, :participants
  end
end
