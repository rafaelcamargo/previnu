(function(){

  app.service('storageService', [
    '$window',
    function($window){

      var _public = {};

      _public.set = function(key, value){
        $window.localStorage.setItem(key, value);
      };

      _public.get = function(key){
        return $window.localStorage.getItem(key);
      };

      _public.remove = function(key){
        return $window.localStorage.removeItem(key);
      };

      return _public;

  }]);

}());
