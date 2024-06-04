//variables
const urlFilms = 'https://swapi.dev/api/films/';
const urlPeople = 'https://swapi.dev/api/people/';

//functions
const getApiFilms = async () => {
  try {
    const response = await fetch(urlFilms);
    const apiData = await response.json();
    const results = apiData.results;
    return results;

  } catch (error) {
    throw 'the requested direction doesn\'t exists.'
  }
};

getApiFilms()
  .then(response => {
    //console.log(response);
    const peliculas = response.map((result) => {
      //console.log(result.title);
      return result.title;
    })
    const releaseDates = response.map((result) => {
      //console.log(result.release_date)
      //parseInt(string, base);
      return parseInt(result.release_date.slice(0, 4), 10);
    })
    //console.log(releaseDates)

    const data = {
      labels: peliculas,
      series: [releaseDates]
    };
    const options = {
      axisY: {
        onlyInteger: true
      }
    };

    new Chartist.Line('#chart1', data, options);
  })
  .catch(error => console.error(error))


//2
const getApiPeople = async () => {
  try {
    const response = await fetch(urlPeople);
    const apiData = await response.json();
    const results = apiData.results;
    return results;

  } catch (error) {
    throw 'the requested direction doesn\'t exists.'
  }
};

getApiPeople()
  .then(response => {
    //console.log(response)
    const namesAndFilms = response.map((result) => {
      return {
        name: result.name,
        films: result.films.length
      }
    });
    //console.log(namesAndFilms)
    const names = namesAndFilms.map((result) => {
      return result.name;
    })
    const films = namesAndFilms.map((result) => {
      return result.films;
    })
    const data = {
      labels: names,
      series: [films]
    };

    const options = {
      axisY: {
        onlyInteger: true
      }
    };

    new Chartist.Bar('#chart2', data, options);
  })
  .catch(error => console.error(error))