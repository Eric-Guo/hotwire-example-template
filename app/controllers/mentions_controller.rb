class MentionsController < ApplicationController
  def new
    @users = User.username_matching_handle(params[:username]).order(username: :asc)
  end
end
