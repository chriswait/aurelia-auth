'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaFramework = require('aurelia-framework');

var _authentication = require('./authentication');

var _aureliaRouter = require('aurelia-router');

var AuthorizeStep = (function () {
  function AuthorizeStep(auth) {
    _classCallCheck(this, _AuthorizeStep);

    this.auth = auth;
  }

  var _AuthorizeStep = AuthorizeStep;

  _createClass(_AuthorizeStep, [{
    key: 'run',
    value: function run(routingContext, next) {
      if (routingContext.nextInstructions.some(function (i) {
        return i.config.auth;
      })) {
        var isLoggedIn = this.auth.isAuthenticated();
        if (!isLoggedIn) {
          return next.cancel(new _aureliaRouter.Redirect('login'));
        }
      }

      return next();
    }
  }]);

  AuthorizeStep = (0, _aureliaFramework.inject)(_authentication.Authentication)(AuthorizeStep) || AuthorizeStep;
  return AuthorizeStep;
})();

exports.AuthorizeStep = AuthorizeStep;