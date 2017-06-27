'use strict';

// Duplicate the transit lines
var container = document.getElementById('map');
var svgBack = document.getElementById('back');
var svgFront = svgBack.cloneNode(true);
svgFront.setAttribute('id', 'front');
container.appendChild(svgFront);

// Obtain all transit line paths + polylines
var paths = document.querySelectorAll('#front path, #front polyline');
paths = Array.prototype.slice.call(paths);
var style = '';

var CAR_SIZE = 10;
paths.forEach(function (path, i) {
  path.setAttribute('id', 'path-' + i);
  var length = path.getTotalLength();

  var speed = length / 100;

  style += '\n    #path-' + i + ' {\n      stroke-dasharray: ' + CAR_SIZE + ', ' + length / 2 + ';\n      stroke-dashoffset: ' + length + ';\n      animation: dash-' + i + ' ' + speed + 's linear alternate infinite;  \n    }\n\n    @keyframes dash-' + i + ' {\n      from {\n        stroke-dashoffset: ' + length + ';\n      }\n      to {\n        stroke-dashoffset: 0;\n      }\n    }';
});

var sheet = document.createElement('style');
sheet.innerHTML = style;
document.body.appendChild(sheet);

function toggle3D(e) {
  svgFront.classList.toggle('three-D');
  svgBack.classList.toggle('three-D');
}