// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const directorArray = moviesArray.map(function (movie) {
    return movie.director;
  });
  const filteredArray = directorArray.filter(function (item, index) {
    return directorArray.indexOf(item) === index;
  });
  return filteredArray;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const spielbergMovies = moviesArray.filter(function (movie) {
    return (
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    );
  });
  return spielbergMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (!moviesArray.length) return 0;
  const sum = moviesArray.reduce(function (subtotal, movie) {
    if (typeof movie.score !== "number") return subtotal;
    return subtotal + movie.score;
  }, 0);
  const averageScore = sum / moviesArray.length;
  return +averageScore.toFixed(2); // added + since toFixed returns a string
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(function (movie) {
    return movie.genre.includes("Drama");
  });
  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const orderedArray = moviesArray.slice().sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
  return orderedArray;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const alphaOrder = moviesArray
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));
  const shortList = alphaOrder.slice(0, 20).map((movie) => movie.title);
  return shortList;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const minutesMovieArray = moviesArray.slice().map((movie) => {
    return {
      ...movie,
      duration: +movie.duration[0] * 60 + +movie.duration.substring(3, 5),
    };
  });
  return minutesMovieArray;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) return null;
  if (moviesArray.length === 1) {
    const movie = moviesArray[0];
    return `The best year was ${movie.year} with an average score of ${movie.score}`;
  }
  const yearsObject = moviesArray.reduce((acc, movie) => {
    if (!acc[movie.year]) {
      acc[movie.year] = [movie]; //if there is no key for that year yet, create one and assign movie
    } else {
      acc[movie.year].push(movie); //find existing year and add movie to exisisting array
    }
    return acc;
  }, {});
  //get the average score for each year
  //do sth for each year-array
  const yearsWithScores = Object.entries(yearsObject).map(function ([
    year,
    movies,
  ]) {
    //for each year-array, calculate movie total score
    const validScores = movies.filter((m) => typeof m.score === "number");
    const totalScore = validScores.reduce((sum, m) => sum + m.score, 0);
    const averageScore = totalScore / validScores.length;

    return {
      year: +year,
      averageScore: averageScore,
    };
  });
  //From the array of objects yearsWithScores {year, averageScore}, find the max score
  const highestAverage = yearsWithScores.reduce(function (bestsofar, current) {
    //if current is greater bestsofar, then choose current for further comparison
    //if there's a tie, pick the oldest year
    if (
      current.averageScore > bestsofar.averageScore ||
      (current.averageScore === bestsofar.averageScore &&
        current.year < bestsofar.year)
    ) {
      return current;
    } else {
      return bestsofar;
    }
  });
  return `The best year was ${
    highestAverage.year
  } with an average score of ${highestAverage.averageScore.toFixed(1)}`;
}
