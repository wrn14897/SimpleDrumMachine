(function(){
  var ctrlPanelModel  = {};

  //Basic init settings 
  var initNumOfTracks = 7;
  var initTrackNames  = ['KICK', 'SNARE', 'TOM1', 'TOM2', 'TOM3', 'HIHAT', 'CYMBAL'];
  var initTrackColors = ['w3-red', 'w3-blue', 'w3-teal', 'w3-orange', 'w3-purple', 'w3-green',
                         'w3-blue-grey'];
  var initTrackStatus = true;
  var initTrackVolume = 50;
  var initTrackNumOfNotes = 4;
  var initTempo = 100; //bpm
  var initSection = null;
  var initPlayingStatus = false;


  //Settings for player 
  ctrlPanelModel.getTrackSettings = function(){
    if (!localStorage.getItem("settings")){
      return {
        numOfTracks : initNumOfTracks,
        numOfNotes  : initTrackNumOfNotes,
        trackNames  : initTrackNames,
        tempo       : initTempo,
        section     : initSection,
        isPlaying   : initPlayingStatus
      };
    }
    return JSON.parse(localStorage.getItem("settings"));
  };
  ctrlPanelModel.setTrackSettings = function(newSettings){
    localStorage.setItem("settings", JSON.stringify(newSettings)); 
  };

  //Number of notes
  ctrlPanelModel.getNumOfNotes = function(){
    return ctrlPanelModel.getTrackSettings().numOfNotes;
  };
  ctrlPanelModel.setNumOfNotes = function(newNumOfNotes){
    var currSettings = ctrlPanelModel.getTrackSettings();
    currSettings.numOfNotes = newNumOfNotes;
    ctrlPanelModel.setTrackSettings(currSettings);
  };
  //Tempo
  ctrlPanelModel.getTempo = function(){
    return ctrlPanelModel.getTrackSettings().tempo;
  };
  ctrlPanelModel.setTempo = function(newTempo){
    var currSettings = ctrlPanelModel.getTrackSettings();
    currSettings.tempo = newTempo;
    ctrlPanelModel.setTrackSettings(currSettings);
  };
  //Current section status
  ctrlPanelModel.getSection = function(){
    return (ctrlPanelModel.getTrackSettings().section % ctrlPanelModel.getTrackSettings().numOfNotes);
  };
  ctrlPanelModel.setSection = function(newSection){
    var currSettings = ctrlPanelModel.getTrackSettings();
    currSettings.section = newSection;
    ctrlPanelModel.setTrackSettings(currSettings);
  };
  //is playing ??
  ctrlPanelModel.getPlayingStatus = function(){
    return ctrlPanelModel.getTrackSettings().isPlaying;
  };
  ctrlPanelModel.setPlayingStatus = function(isPlaying){
    var currSettings = ctrlPanelModel.getTrackSettings();
    currSettings.isPlaying = isPlaying;
    ctrlPanelModel.setTrackSettings(currSettings);
  };



  ctrlPanelModel.initPanel = function(){
    if (!localStorage.getItem("tracks")){
      var tracks = [];
      for (var i = 0; i < initNumOfTracks; i++){
        tracks.push(new Track([initTrackStatus, initTrackNames[i], initTrackColors[i], 
                               initTrackVolume, initTrackNumOfNotes]));
      }
      //Save tracks to local storage
      ctrlPanelModel.setTracks(tracks);

      var settings = {
        numOfTracks : initNumOfTracks,
        numOfNotes  : initTrackNumOfNotes,
        trackNames  : initTrackNames,
        tempo       : initTempo
      };
      ctrlPanelModel.setTrackSettings(settings);
    }
  };

  //Setter and getter for local storage
  ctrlPanelModel.getTracks = function(){
    var tracks = JSON.parse(localStorage.getItem("tracks"));
    var currNotes = null;
    var currTrack = null;
    var newTracks = [];
    tracks.forEach(function(track){
      currTrack = new Track([track.status, track.name, track.color, track.volume, parseInt(track.notes.numOfNotes)]);
      //Copy the notes content
      currTrack.notes.notes = track.notes.notes;

      newTracks.push(currTrack);
    });
    
    return newTracks;
  };
  ctrlPanelModel.setTracks = function(newTracks){
    localStorage.setItem("tracks", JSON.stringify(newTracks));
  };
  

  //Function to update single track
  ctrlPanelModel.updateTrackByName = function(name, newTrack){
    var currTracks = ctrlPanelModel.getTracks();
    currTracks.forEach(function(track, ind){
      if (track.name === name){
        currTracks[ind] = newTrack;
      }
    });
    ctrlPanelModel.setTracks(currTracks);
  };



  //Reset all
  ctrlPanelModel.resetAll = function(){
    localStorage.removeItem("settings");
    localStorage.removeItem("tracks");
    location.reload();
  }
  window.ctrlPanelModel = ctrlPanelModel;
})();
