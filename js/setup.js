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
1,
2 массив с персонажами
*/

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

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
3,
4,
5 шаблон и отрисовка
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
}
charactesPost();
