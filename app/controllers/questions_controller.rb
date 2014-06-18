class QuestionsController < ApplicationController
	before_action :set_question, :only => [:show, :edit, :update, :destroy]
	respond_to :html, :json	

	def index
		@questions = Question.all
		respond_with @questions
	end

	def new
		@question = Question.new
	end


  def create
    @question = Question.new(question_params)

    if @question.save
      respond_to do |format|
        format.html { redirect_to questions_path }
        format.json { render json: @question, status: :created }
      end
    else
      respond_to do |format|
        format.html { render 'new' }
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

	def show
		respond_with @question
	end


	def edit
	end

	def update
		if @question.update(question_params)
			respond_to do |format|
				format.html { redirect_to questions_path}
				format.json { render nothing: true, status: :no_content}
		end
	else 
		respond_to do |format|
			format.html {render 'edit'}
			format.json {render json: @question.errors, status: :unprocessable_entity}
		end
	end
end


	def destroy

		@question.destroy

		respond_to do |format|
			format.html {redirect_to question_path}
			format.json { render json: { head: :ok }}
		end
	end
	

protected

def set_question
	@question = Question.find(params[:id])
end

def question_params
	params.require(:question).permit(:name, :topic, :note, :instructor)
end



end
