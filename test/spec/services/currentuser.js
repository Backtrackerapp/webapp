'use strict';

describe('Service: Currentuser', function () {

  // load the service's module
  beforeEach(module('webappApp'));

  // instantiate service
  var Currentuser;
  beforeEach(inject(function (_Currentuser_) {
    Currentuser = _Currentuser_;
  }));

  it('should do something', function () {
    expect(!!Currentuser).toBe(true);
  });

});
