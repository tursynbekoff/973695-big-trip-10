const cities = [
  `Denpasar`,
  `Mainz`,
  `Berlin`,
  `Kuala Lumpur`,
  `Auckland`,
  `Munich`
];

const RouteType = {
  'Denpasar': `flight`,
  'Mainz': `bus`,
  'Berlin': `train`,
  'Kuala Lumpur': `ship`,
  'Auckland': `check-in`,
  'Munich': `restaurant`
};

const prepositions = {
  'TAXI': `to`,
  'BUS': `to`,
  'TRAIN': `to`,
  'SHIP': `to`,
  'TRANSPORT': `to`,
  'DRIVE': `to`,
  'FLIGHT': `to`,
  'CHECK-IN': `into`,
  'SIGHTSEENG': `at`,
  'RESTAURANT': `at`
};

const textDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. `,
  `Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
  `Sed sed nisi sed augue convallis suscipit in sed felis. `,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. `,
  `In rutrum ac purus sit amet tempus. `
];

const additionalOptions = [
  `Add luggage`,
  `Swich to comfort class`,
  `Add meal`,
  `Choose seats`
];

const OptionCost = {
  'Add luggage': 10,
  'Swich to comfort class': 150,
  'Add meal': 2,
  'Choose seats': 9
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomText = (text) => {
  const randomNumber = getRandomIntegerNumber(1, 3);
  let generatedText = ``;

  for (let i = 0; i < randomNumber; i++) {
    generatedText += (text[getRandomIntegerNumber(0, text.length)]);
  }

  return generatedText;
};


const getRandomOptions = (options) => {
  const newOptions = options
        .filter(() => Math.random() > 0.5)
        .slice(0, 2);

  const optionsArr = newOptions.map((option) => {
    return {
      name: option,
      cost: OptionCost[option]
    };
  });

  return optionsArr;
};

const getInitialDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomIntegerNumber(2, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const dateToInt = (date) => {
  return new Date(date).getTime();
};

const intToDate = (date) => {
  return new Date(date);
};


const getFinallDate = (date) => {
  const dateInInt = dateToInt(date);

  const targetDateHours = dateInInt + getRandomIntegerNumber(1000 * 60, 2 * 1000 * 3600 * 24); // up to 23 hours

  const targetDate = targetDateHours;
  const intInDate = intToDate(targetDate);

  return intInDate;
};

const getDiffDate = (date1, date2) => {
  const dateInInt1 = dateToInt(date1);
  const dateInInt2 = dateToInt(date2);

  const dateDiffInt = dateInInt2 - dateInInt1;
  const dateDiffDate = intToDate(dateDiffInt);
  return dateDiffDate;
};

const generateRandomPictures = () => {
  let pictureArr = [];
  const randomPictureNumber = getRandomIntegerNumber(1, 3);
  for (let i = 0; i < randomPictureNumber; i++) { // /
    pictureArr[i] = `http://picsum.photos/300/150?r=${Math.random()}`;
  }
  return pictureArr;
};

const getFormateMinutes = (minute) => {
  const formatedMinutes = String(minute).padStart(2, `0`);
  return formatedMinutes;
};

const generateTrip = function () {
  const city = cities[getRandomIntegerNumber(0, cities.length)];
  const activity = RouteType[city];
  const preposition = prepositions[activity.toUpperCase()];

  const dueDate = getInitialDate();
  const finallDate = getFinallDate(dueDate);
  const timeDiff = getDiffDate(dueDate, finallDate);

  const price = getRandomIntegerNumber(7, 500);

  const setOfOptions = getRandomOptions(additionalOptions);

  return {
    city,
    activity,
    preposition,

    startMinute: getFormateMinutes(dueDate.getMinutes()),
    startHour: dueDate.getHours(),
    startDay: dueDate.getDate(),
    startMonth: dueDate.getMonth() + 1,
    startYear: dueDate.getYear() + 1900,

    finallMinute: getFormateMinutes(finallDate.getMinutes()),
    finallHour: finallDate.getHours(),
    finallDay: finallDate.getDate(),
    finallMonth: finallDate.getMonth() + 1,
    finallYear: finallDate.getYear() + 1900,

    diffMinute: getFormateMinutes(timeDiff.getMinutes()),
    diffHour: timeDiff.getHours() - 1,
    diffDay: timeDiff.getDate() - 1,

    price,
    options: setOfOptions,

    description: getRandomText(textDescription),
    pictureSrc: generateRandomPictures()
  };
};

const generateTrips = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTrip);
};
export {generateTrip, generateTrips};
