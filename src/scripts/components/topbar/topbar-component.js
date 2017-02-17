(function(){

  function topbarController($window){
    var _public = this;

    _public.back = function(){
      $window.history.back();
    };
  }

  app.component('topbar', {
    templateUrl: 'components/topbar/topbar-template.html',
    controller: ['$window', topbarController],
    transclude: true,
    bindings: {
      title: '@'
    }
  });

}());
