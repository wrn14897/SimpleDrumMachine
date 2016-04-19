(function(){
  var ctrlPanelView = {};

  ctrlPanelView.render = function($body){
    var $panelNode   = $body.find("#panel");
    var $playbarNode = $body.find("#playbar");
    var $btmbarNode  = $body.find("#btmbar");
    var $tempoNode   = $body.find("#show_tempo");
    //Clear children nodes
    $panelNode.empty();
    $playbarNode.empty();
    $btmbarNode.find("div").empty();
    $tempoNode.empty();
    //Render top bar
    $tempoNode.append("Tempo: " + ctrlPanelModel.getTempo() + " bpm");

    //Render tracks
    var tracks = ctrlPanelModel.getTracks();
    tracks.forEach(function(track){
      $panelNode.append(Templates.renderSingleTrack(track));
      addListenerToTrack(track, $body);  
    });
    //Render play bar
    $playbarNode.append(Templates.renderPlayBar(ctrlPanelModel.getNumOfNotes(), ctrlPanelModel.getTempo()));
    addListenerToPlayBar($body);
    //Render bottom bar
    $btmbarNode.find("div").append(Templates.renderBtmBar(ctrlPanelModel.getSection()));
    
  };

    
  function updateModelBySingleTrackAndRerender(name, track, $body){
    ctrlPanelModel.updateTrackByName(name, track);
    ctrlPanelView.render($body);
  }

  function addListenerToPlayBar($body){
    $body.find("#play").click(function(e){
      e.preventDefault();
      if (!ctrlPanelModel.getPlayingStatus()){
        ctrlPanelModel.setPlayingStatus(true);
        audioPlayer.playNow($body); 
      }
    });
    $body.find("#stop").click(function(e){
      e.preventDefault();
      audioPlayer.stopNow();
      //Rerender
      ctrlPanelView.render($body);
    });
    $body.find("#pause").click(function(e){
      e.preventDefault();
      audioPlayer.pauseNow();
    });
    //Button outside slide bar
    $body.find("#notes").parent().click(function(e){ e.preventDefault(); });
    $body.find("#tempo").parent().click(function(e){ e.preventDefault(); });

    $body.find("#notes").change(function(e){
      e.preventDefault();
      var newNumOfNotes = Math.pow(2, parseInt($(this).val()));
      var currTracks = ctrlPanelModel.getTracks();
      currTracks.forEach(function(track, ind){
        track.notes.setNumOfNotes(newNumOfNotes);
      });
      //Set model
      ctrlPanelModel.setTracks(currTracks);
      ctrlPanelModel.setNumOfNotes(newNumOfNotes);
      //Render view
      ctrlPanelView.render($body);
      //Reinit audio player
      audioPlayer.initAudioPlayer();
    });
    $body.find("#tempo").change(function(e){
      e.preventDefault();
      ctrlPanelModel.setTempo( parseInt($(this).val()) );
      //Update view
      var $tempoNode   = $body.find("#show_tempo");
      $tempoNode.empty();
      $tempoNode.append("Tempo: " + ctrlPanelModel.getTempo() + " bpm");
    });
    $body.find("#btmbar button").click(function(e){
      e.preventDefault();
      ctrlPanelModel.resetAll();
    });

  }
  function addListenerToTrack(track, $body){
    var name = track.getName();
    var status = track.getStatus();
    var Notes = track.getNotes();
    var $target = $body.find("#" + name);
    //For status (mute or not)
    $target.find("a").click(function(e){
      e.preventDefault();
      if (status){
        $(this).find("i").attr("class", "fa fa-volume-off w3-xxxlarge");
        track.setStatus(false);
      }
      else{
        $(this).find("i").attr("class", "fa fa-volume-up w3-xxxlarge");
        track.setStatus(true);
      }   
      updateModelBySingleTrackAndRerender(name, track, $body);
    });
    //For Volume 
    $target.find("input").change(function(e){
      e.preventDefault();
      track.setVolume($(this).val());
      audioPlayer.setVolume(track);
      updateModelBySingleTrackAndRerender(name, track, $body);
    });
    //For Grid
    for(var i = 0; i < Notes.getNumOfNotes(); i++){
      $target.find("#note" + i.toString()).click(function(e){
        e.preventDefault();
        var id = $(this).attr("id");
        //Get the last char of id -> the order of note
        var noteSection = parseInt(id.match(/\d+/)[0]);
        Notes.toggleNote( noteSection );
        //Play sound
        audioPlayer.playASingleNote(track, noteSection);
        updateModelBySingleTrackAndRerender(name, track, $body);
      });
    }
  }





  window.ctrlPanelView = ctrlPanelView;
})();
