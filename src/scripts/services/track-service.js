(function(){

  app.service('trackService', function(){

    var _public = {};

    _public.track = function(label, details){
      if(mixpanel)
        mixpanel.track(label, details);
    };

    return _public;

  });

}());
