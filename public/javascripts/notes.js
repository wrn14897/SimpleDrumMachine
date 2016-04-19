(function(){
  function Notes(numOfNotes){
    if (typeof numOfNotes !== 'number'){
      throw "Error with notes properties!!";
    }
    this.numOfNotes = numOfNotes;
    this.notes  = [];
    for(var i = 0; i < numOfNotes; i++){
      this.notes.push(false);
    }
  };
  Notes.prototype.getNumOfNotes = function(){
    return this.numOfNotes;
  };
  Notes.prototype.setNumOfNotes = function(notes){
    //Resize the boolean array -> need to copy the original status
    var tmpNotes = notes; 
    while (tmpNotes > this.numOfNotes){
      this.notes.push(false);
      tmpNotes -= 1;
    }
    while (tmpNotes < this.numOfNotes){
      this.notes.pop();
      this.numOfNotes -= 1;
    }
    this.numOfNotes = notes;
  };
  //For whole notes
  Notes.prototype.getNotes = function(){
    return this.notes;
  }
  Notes.prototype.setNotes = function(newNotes){
    if (!Array.isArray(newNotes) || (newNotes.length !== this.numOfNotes)){
      throw "Error with notes inputs type or length does not match";
    }
    if (typeof newNotes === 'string'){
      newNotes = parseInt(newNotes); 
    }
    this.notes = newNotes;
  }

  //For singla note
  Notes.prototype.readNote = function(position){
    return this.notes[position];
  }
  Notes.prototype.toggleNote = function(position){
    this.notes[position] = !this.notes[position];
  }
  window.Notes = Notes;
})();
