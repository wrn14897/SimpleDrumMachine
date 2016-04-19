//Use Wad js library to model player
(function(){
  audioPlayer = {};  

  var Wads = {
    'KICK'    : {source: '/sounds/Kick.wav', notes:[]}, 
    'SNARE'   : {source: '/sounds/Snare.wav', notes:[]},
    'TOM1'    : {source: '/sounds/Tom1.wav', notes:[]},
    'TOM2'    : {source: '/sounds/Tom2.wav', notes:[]},
    'TOM3'    : {source: '/sounds/Tom3.wav', notes:[]},
    'HIHAT'   : {source: '/sounds/Hihat.wav', notes:[]},
    'CYMBAL'  : {source: '/sounds/Cymbal.wav', notes:[]}
  };    
  



  //Assign wads to any grid unit
  audioPlayer.initAudioPlayer = function(){
    var numOfNotes = ctrlPanelModel.getNumOfNotes();
    var tracks = ctrlPanelModel.getTracks();
    Object.keys(Wads).forEach(function(name, ind){
      var track   = tracks[ind];
      var volume  = track.getVolume();
      var newWad  = null
      for (var i = 0; i < numOfNotes; i++){
        newWad  = new Wad({source : Wads[name].source, volume: parseInt(volume)/100.0});
        //New a wad object
        Wads[name].notes.push(newWad);
      }
    });
    audioPlayer.stopNow();
  };
  audioPlayer.setVolume = function(track){
    var name    = track.getName();
    var volume  = track.getVolume();
    var numOfNotes = ctrlPanelModel.getNumOfNotes();
    Wads[name].notes.forEach(function(wad){
      wad.setVolume(parseInt(volume)/100.0);
    });
  };

  audioPlayer.playASingleNote = function(track, noteSection){
    var volume  = track.getVolume();
    var name    = track.getName();
    var status  = track.getStatus();
    var isOn    = track.getNotes().readNote(noteSection);
    if (isOn && status){
      Wads[name].notes[noteSection].play();
    }
    else{
      Wads[name].notes[noteSection].stop();
    }
  };
  //Poly notes for the section, get tracks here...
  //callback(isFinished)
  function playNotesAtSection(tracks, section, callback){
    var newSound = new Wad.Poly();
    tracks.forEach(function(track){
      var name    = track.getName();
      var status  = track.getStatus();
      var isOn    = track.getNotes().readNote(section);
      if (isOn && status){
        newSound.add(Wads[name].notes[section]);
      }
    });
    callback(true);
    newSound.play();  
  };

  //Controller to control panel
  audioPlayer.playNow = function($body){
    var currentSection = ctrlPanelModel.getSection();
    if (!currentSection){
      //Start from 0
      currentSection = 0;
    }
    var tracks = ctrlPanelModel.getTracks();
    var isPlaying = ctrlPanelModel.getPlayingStatus();
    var tempoInMs  = (60000.0 / parseInt(ctrlPanelModel.getTempo()));

    if (isPlaying){
      playNotesAtSection(tracks, currentSection, function(isFinished){
        if (isFinished){
          audioPlayerRenderView($body, currentSection);          
          currentSection += 1;
          ctrlPanelModel.setSection(currentSection);
          //Continue playing....
          setTimeout( function(){ audioPlayer.playNow($body); }, tempoInMs);
        }
      });
    }
  };
  audioPlayer.pauseNow = function(){
    ctrlPanelModel.setPlayingStatus(false);
  };
  audioPlayer.stopNow = function(){
    ctrlPanelModel.setSection(-1);
    //set playing status
    ctrlPanelModel.setPlayingStatus(false);
  };




  //Private function to render section bar
  function audioPlayerRenderView($body, section){
    var $btmbarNode = $body.find("#btmbar");
    $btmbarNode.find("div").empty();
    $btmbarNode.find("div").append(Templates.renderBtmBar(section));
  };


  window.audioPlayer = audioPlayer;
})();
