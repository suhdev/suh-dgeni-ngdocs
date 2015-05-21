var Installer = require('../src/installer').Installer,
	path = require('canonical-path');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
describe("Installer Suite", function() {
	it("should install required packages",function(done){
		var installer = new Installer();
		spyOn(installer,'list').and.callThrough();
		installer.list(done);
		expect(installer.list).toHaveBeenCalled();
	});

	
});