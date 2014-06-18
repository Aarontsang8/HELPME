class AddInstructorToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :instructor, :string
  end
end
