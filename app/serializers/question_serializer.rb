class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :name, :topic, :note, :created_at, :instructor, :updated_at
end
