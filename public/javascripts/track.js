(function(){
  
  //properties = [status, name, color, volume, numOfnotes]
  function Track(properties){
    if (!Array.isArray(properties) || properties.length < 4){
      throw "Error with track properties!!";
    }
    this.status = properties[0];
    this.name   = properties[1];  
    this.color  = properties[2];
    this.volume = properties[3];
    this.notes  = new Notes(properties[4]);
  };
  
  Track.prototype.getStatus = function(){
    return this.status;
  } 
  Track.prototype.getName  = function(){
    return this.name;
  } 
  Track.prototype.getColor = function(){
    return this.color;
  }
  Track.prototype.getVolume = function(){
    if (typeof this.volume === 'string'){
      return parseInt(this.volume);
    }
    return this.volume;
  }
  Track.prototype.getNotes = function(){
    return this.notes;
  }


  Track.prototype.setStatus = function(s){
    this.status = s;
  }
  Track.prototype.setVolume = function(vol){
    this.volume = vol;
  }
  Track.prototype.setNotes = function(numOfNotes){
    this.notes.setNumOfNotes(numOfNotes);
  }
  
  window.Track = Track;
})();
