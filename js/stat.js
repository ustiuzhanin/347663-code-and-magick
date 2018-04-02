'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 140;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var GRAPH_HEIGHT = 150;
var BAR_SPACE = 50;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

function getRandomHslColor(min, max) {
  var randomColor = Math.floor(Math.random() * (max - min + 1) + min);
  return 'hsl(' + randomColor + ', 100%, 50%)';
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + (GAP + FONT_GAP) * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.font = '14px PT Mono';
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_WIDTH + (GAP + BAR_WIDTH * 2) * i, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_WIDTH + (GAP + BAR_WIDTH * 2) * i, ((CLOUD_HEIGHT - GAP * 3) - (GRAPH_HEIGHT * times[i]) / maxTime) - GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomHslColor(200, 260);
    }
    ctx.fillRect(CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_SPACE) * i, CLOUD_HEIGHT - GAP * 3, BAR_WIDTH, -(GRAPH_HEIGHT * times[i]) / maxTime);
  }

};
