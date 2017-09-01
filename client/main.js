var DropdownMenu = require('./DropdownMenu');


var div = document.createElement('div');
div.className = 'test';
div.id = 'ddtest';

document.body.appendChild(div);

var ddm = new DropdownMenu();

ddm.makeDropdownButton(div);
ddm.addMenu('ddtest','Rename1', function () {
    console.log('hi1');
});
ddm.addMenu('ddtest','Rename2', function () {
    console.log('hi2');
});
ddm.addMenu('ddtest','Rename3', function () {
    console.log('hi3');
});
ddm.addMenu('ddtest','Rename4', function () {
    console.log('hi4');
});
