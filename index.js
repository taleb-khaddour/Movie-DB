const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/test', (req, res) => {
    res.json({ status: 200, message: 'ok' });
});
app.get('/time', (req, res) => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    res.json({ status: 200, message: `${hours}:${minutes}` });
  });

  app.get('/hello/:id', (req, res) => {
    const id = req.params.id || 'world';
    res.json({ status: 200, message: `Hello, ${id}` });
  });


  app.get('/search', (req, res) => {
  const search = req.query.s;
  if (!search) {
    res.status(500).json({
      status: 500,
      error: true,
      message: 'You have to provide a search',
    });
  } else {
    res.json({
      status: 200,
      message: 'ok',
      data: search,
    });
  }
});


const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 },
  ];

app.post('/movies/create', (req, res) => {
    // TODO: Implement movie creation logic
    res.send('Movie creation route');
  });
  





  //read{

  app.get('/movies/read', (req, res) => {
    // TODO: Implement movie reading logic
    res.json({ status: 200, data: movies });
  });

//by date

  app.get('/movies/read/by-date', (req, res) => {
    const sortedMovies = movies.sort((a, b) => a.year - b.year);
    res.json({ status: 200, data: sortedMovies });
  });


//by rating


app.get('/movies/read/by-rating', (req, res) => {
    const sortedMovies = movies.sort((a, b) => b.rating - a.rating);
    res.json({ status: 200, data: sortedMovies });
  });

  //by title
  app.get('/movies/read/by-title', (req, res) => {
    const sortedMovies = movies.sort((a, b) => a.title.localeCompare(b.title));
    res.json({ status: 200, data: sortedMovies });
  });
  


app.get('/movies/read/id/:id', (req, res) => {
    const id = Number(req.params.id);
    const movie = movies.find((movie) => movie.id === id);
    if (!movie) {
      res.status(404).json({
        status: 404,
        error: true,
        message: `The movie ${id} does not exist`,
      });
    } else {
      res.json({ status: 200, data: movie });
    }
  });

  // }
  




  app.get('/movies/update/:id', (req, res) => {
    const id = Number(req.params.id);
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      res.status(404).json({
        status: 404,
        error: true,
        message: `The movie ${id} does not exist`,
      });
    } else {
      const movie = movies[movieIndex];
      if (req.query.title) {
        movie.title = req.query.title;
      }
      if (req.query.rating) {
        movie.rating = Number(req.query.rating);
      }
      res.json({ status: 200, data: movies });
    }
  });

  

  app.get('/movies/delete/:id', (req, res) => {
    const id = Number(req.params.id);
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      res.status(404).json({
        status: 404,
        error: true,
        message: `The movie ${id} does not exist`,
      });
    } else {
      movies.splice(movieIndex, 1);
      res.json({ status: 200, data: movies });
    }
  });


  // add
  
  app.get('/movies/add', (req, res) => {
    const title = req.query.title;
    const year = Number(req.query.year);
    let rating = Number(req.query.rating);
  
    if (!title || !year || !/^\d{4}$/.test(year) || isNaN(year)) {
      res.status(403).json({
        status: 403,
        error: true,
        message: 'You cannot create a movie without providing a title and a year',
      });
      return;
    }
  
    if (!rating || isNaN(rating)) {
      rating = 4;
    }
  
    const newMovie = { id: movies.length + 1, title, year, rating };
    movies.push(newMovie);
    res.json({ status: 200, data: movies });
  });



app.listen(3003, () => {
    console.log('listening on port 3003');
});