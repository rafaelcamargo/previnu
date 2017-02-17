(function(){

  'use strict';

  var _public = {};

  _public.isProd = function(){
    return '@@environment' == 'prod';
  };

  window.env = _public;

}());
