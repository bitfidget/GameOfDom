class BattlesController < ApplicationController
  before_action :set_battle, only: [:show, :edit, :update, :destroy]

  # GET /battles
  # GET /battles.json
  def index
    @battles = Battle.all
  end

  # GET /battles/1
  # GET /battles/1.json
  def show
  end

  # GET /battles/new
  def new
    @battle = Battle.new
  end

  # GET /battles/1/edit
  def edit
  end

  # POST /battles
  # POST /battles.json
  def create
    
    # create new battle object
    battle = Battle.new
    battle.score = params[:score]
    # create new winner div
    battle.winner = Div.new
    battle.winner.content = params[:winner][:content]
    battle.winner.element = params[:winner][:element]
    # create new loser div
    battle.loser = Div.new
    battle.loser.content = params[:loser][:content]
    battle.loser.element = params[:loser][:element]
    # create new page, if page not exist
    page_match = Page.where("url" => params[:page][:url])
    if page_match.present?
      battle.winner.page = page_match.first
    else
      battle.winner.page = Page.new
      battle.winner.page.url = params[:page][:url]
      battle.winner.page.title = params[:page][:title]
      
      battle.winner.page.save
    
    end
    # save winner/loser with page
    battle.winner.page_id = battle.winner.page.id    
    battle.loser.page_id = battle.winner.page.id
    
    battle.winner.save
    battle.loser.save
    
    # save the battle
    battle.winner_id = battle.winner.id
    battle.loser_id = battle.loser.id
    
    battle.save

    if battle.save
      render :json => battle.to_json
    else
      render :json => false
    end

  end

  # PATCH/PUT /battles/1
  # PATCH/PUT /battles/1.json
  def update
    respond_to do |format|
      if @battle.update(battle_params)
        format.html { redirect_to @battle, notice: 'Battle was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @battle.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /battles/1
  # DELETE /battles/1.json
  def destroy
    @battle.destroy
    respond_to do |format|
      format.html { redirect_to battles_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_battle
      @battle = Battle.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def battle_params
      params[:battle]
    end
end
