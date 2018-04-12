'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвин'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var OBJECTS_COUNT = 4;
var characters = [];

/*
  массив с персонажами
*/

var getRandomSorting = function (arr) {
  arr.sort(function () {
    return 0.5 - Math.random();
  });
  return arr;
};

var getCharactersArray = function (numberOfCharacters) {

  var getNames = function (name, lastName, numberOfNames) {
    var newArr = [];
    var randomNames = getRandomSorting(name);
    var randomLastNames = getRandomSorting(lastName);

    for (var i = 0; i < numberOfNames; i++) {
      newArr[i] = randomNames[i] + ' ' + randomLastNames[i];
    }
    return newArr;
  };

  var randomNames = getNames(NAMES, LAST_NAMES, OBJECTS_COUNT);
  var randomCoatColors = getRandomSorting(COAT_COLORS);
  var randomEyesColors = getRandomSorting(EYES_COLORS);

  for (var i = 0; i < numberOfCharacters; i++) {
    characters[i] = {
      name: randomNames[i],
      coatColor: randomCoatColors[i],
      eyesColor: randomEyesColors[i]
    };
  }
  return characters;
};
getCharactersArray(OBJECTS_COUNT);

/*
  шаблон и отрисовка
*/

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var characterList = document.querySelector('.setup-similar-list');

var charactersRender = function (character) {

  var characterElement = characterTemplate.cloneNode(true);

  characterElement.querySelector('.setup-similar-label').textContent = character.name;
  characterElement.querySelector('.wizard-coat').style = 'fill: ' + character.coatColor;
  characterElement.querySelector('.wizard-eyes').style = 'fill: ' + character.eyesColor;

  return characterElement;
};

var charactesPost = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < characters.length; i++) {
    fragment.appendChild(charactersRender(characters[i]));
  }
  characterList.appendChild(fragment);
};
charactesPost();

/*
  Открытие/закрытие окна настройки персонажа:
*/

var setupOpen = document.querySelector('.setup-open-icon');
var setup = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');
var setupInput = document.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  setupInput.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      setupInput.value = '';
    }
  });

  if (evt.keyCode === 27) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
});

/*
  Изменение цвета глаз персонажа и файрбола по нажатию
*/

var eyesColor = document.querySelector('.setup-wizard .wizard-eyes');
var eyesColorInput = document.querySelector('input[name = "eyes-color"]');
var fireballColor = document.querySelector('.setup-fireball-wrap');
var fireballColorInput = document.querySelector('input[name = "fireball-color"]');

var clicks = 0;

var colorChange = function (colorsArray, colorTag, inputValue, style) {
  clicks += 1;
  if (clicks >= colorsArray.length) {
    clicks = 0;
  }
  colorTag.style = style + colorsArray[clicks];
  inputValue.value = colorsArray[clicks];
};

eyesColor.addEventListener('click', function () {
  colorChange(EYES_COLORS, eyesColor, eyesColorInput, 'fill: ');
});

fireballColor.addEventListene('click', function () {
  colorChange(FIREBALL_COLORS, fireballColor, fireballColorInput, 'background: ');
});
