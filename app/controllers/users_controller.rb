class UsersController < ApplicationController

  def create
    # byebug
    @connections = params[:user][:connections]
    if User.find_by_email(params[:user][:email])
      @user = User.find_by_email(params[:user][:email])
    else
      @user = User.new(user_params)
    end

    if @user.save
      session[:user] = @user.id
      redirect_to menu_path
    else
      redirect_to 'pages#email'
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :connection_other, connections: [])
  end
end
