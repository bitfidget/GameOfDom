class DivsController < ApplicationController
  before_action :set_div, only: [:show, :edit, :update, :destroy]

  # GET /divs
  # GET /divs.json
  def index
    @divs = Div.all
  end

  # GET /divs/1
  # GET /divs/1.json
  def show
  end

  # GET /divs/new
  def new
    @div = Div.new
  end

  # GET /divs/1/edit
  def edit
  end

  # POST /divs
  # POST /divs.json
  def create
    @div = Div.new(div_params)

    respond_to do |format|
      if @div.save
        format.html { redirect_to @div, notice: 'Div was successfully created.' }
        format.json { render action: 'show', status: :created, location: @div }
      else
        format.html { render action: 'new' }
        format.json { render json: @div.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /divs/1
  # PATCH/PUT /divs/1.json
  def update
    respond_to do |format|
      if @div.update(div_params)
        format.html { redirect_to @div, notice: 'Div was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @div.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /divs/1
  # DELETE /divs/1.json
  def destroy
    @div.destroy
    respond_to do |format|
      format.html { redirect_to divs_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_div
      @div = Div.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def div_params
      params[:div]
    end
end
