(function(){
  //Bunch of functions to render HTML objects 


  var Templates = {};
  Templates.renderPlayBar = function(numOfNotes, tempo){
    
    var btns=  [];
    btns.push(tag('button', {type:"submit", id:"play", 
                             class:"w3-col w3-black w3-padding-hor-8", style:"width:20%;"}, [ 
                  tag('i', {class:"fa fa-play w3-xxxlarge"}, [])]));
    btns.push(tag('button', {type:"submit", id:"pause", 
                             class:"w3-col w3-black w3-padding-hor-8", style:"width:20%;"}, [ 
                  tag('i', {class:"fa fa-pause w3-xxxlarge"}, [])]));
    btns.push(tag('button', {type:"submit", id:"stop", 
                             class:"w3-col w3-black w3-padding-hor-8", style:"width:20%;"}, [ 
                  tag('i', {class:"fa fa-stop w3-xxxlarge"}, [])]));
    btns.push(tag('button', {type:"submit", 
                             class:"w3-col w3-black w3-padding-hor-8", style:"width:20%;"}, [ 
                  tag('input', {id:"notes", type:"range", min:"1", max:"4", value: parseInt(Math.log2(numOfNotes)), step:"1"}, [])]));
    btns.push(tag('button', {type:"submit", 
                             class:"w3-col w3-black w3-padding-hor-8", style:"width:20%;"}, [ 
                  tag('input', {id:"tempo", type:"range", min:"20", max:"400", value:tempo, step:"10"}, [])]));
    return btns;
  };

  
  //tracks -> array of track objects
  Templates.renderSingleTrack = function(track){
    var numOfNotes = track.notes.getNumOfNotes();
    var portion    = 100/numOfNotes;
    var name       = track.getName();
    var color      = track.getColor();
    var status     = track.getStatus();
    var volume     = track.getVolume();
    var Notes      = track.getNotes();
    var icon_class = (status === true) ? "fa fa-volume-up w3-xxxlarge" : "fa fa-volume-off w3-xxxlarge";

    var ctrlPortion = tag('div', {class:"w3-container w3-quarter w3-padding-hor-16 " + color},[
                        tag('i', {class:"fa fa-music w3-xxxlarge",style:"margin-right: 10%;"},[]),
                        tag('a', {href: '#'}, [
                          tag('i', {class: icon_class, style: "margin-right: 10%;"},[])
                        ]),
                        tag('input', {type:"range", min:"1", max:"100", value:volume, step:"5"},[])]);

    var btns = [];
    var currColor = null;
    for (var i = 0; i < numOfNotes; i++){
      currColor = (Notes.readNote(i) === true ? color : "w3-black");
      btns.push(tag('button', {class:"w3-container w3-col m1 w3-center note " + currColor, id: "note" + i.toString(),
                               style:"width:" + portion.toString() + "%"}, []));
    }
    return tag('div',{id:name, class:"w3-col"},[ctrlPortion, tag('div', {class:"w3-rest"},btns)]);
  };  
  Templates.renderBtmBar = function(currSection){
    var numOfNotes = ctrlPanelModel.getNumOfNotes();
    var portion    = 100/numOfNotes;

    var grids = [];
    var currColor = null;
    for (var i = 0; i < numOfNotes; i++){
      currColor = (i === currSection ? "w3-yellow" : "w3-grey");
      grids.push(tag('button', {class:"w3-container w3-col m1 w3-center note " + currColor, id: "note" + i.toString(),
                               style:"width:" + portion.toString() + "%"}, []));
    }
    return grids;
  };    

  
  /* Creates and returns an HTMLElement representing a tag of the given name.
   * attrs is an object, where the key-value pairs represent HTML attributes to
   * set on the tag. contents is an array of strings/HTMLElements (or just
   * a single string/HTMLElement) that will be contained within the tag.
   *
   * Examples:
   * tag('p', {}, 'A simple paragraph') => <p>A simple paragraph</p>
   * tag('a', {href: '/about'}, 'About') => <a href="/about">About</a>
   *
   * tag('ul', {}, tag('li', {}, 'First item')) => <ul><li>First item</li></ul>
   */

   function tag(name, attrs, contents) {
    var element = document.createElement(name);
    for (var attr in attrs) {
      element.setAttribute(attr, attrs[attr]);
    }

    // If contents is a single string or HTMLElement, make it an array of one
    // element; this guarantees that contents is an array below.
    if (!(contents instanceof Array)) {
      contents = [contents];
    }

    contents.forEach(function(piece) {
      if (piece instanceof HTMLElement) {
        element.appendChild(piece);
      } else {
        // must create a text node for a raw string
        element.appendChild(document.createTextNode(piece));
      }
    });

    return element;
  }
  window.Templates = Templates;
})();
