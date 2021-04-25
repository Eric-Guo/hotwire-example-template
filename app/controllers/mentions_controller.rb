class MentionsController < ApplicationController
  def new
    @users = User.all.order(username: :asc)
  end
end
