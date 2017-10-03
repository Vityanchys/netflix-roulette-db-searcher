
let netflixroulette = async ( data ) => {
    let API_URL = "http://netflixroulette.net/api/api.php?";
/*
    let queryString;

    let reqData = ( req ) => {
      queryString = "type=json";
      if (typeof req === 'string') {
          queryString += "&title=" + req;
      } else if (typeof req === 'object' && req.hasOwnProperty("title")) {
          queryString += "&title=" + req.title;

          if (req.hasOwnProperty("year")) {
              queryString += "&year=" + req.year;
          }
        } else {
            throw new Error("I don't know how to handle " + req);
        }
        return queryString;
    }
    */

        let httpReq = new XMLHttpRequest();
        httpReq.open("GET", API_URL + 'title=Attack', true);
        await  httpReq.send();
        if ( await httpReq.status != 200) {
  // обработать ошибку
            console.log(httpReq.status + ': ' + httpReq.statusText ); // пример вывода: 404: Not Found
          } else {
            // вывести результат
            console.log( httpReq.responseText ); // responseText -- текст ответа.
          }

  };


// Examples

// Requesting by title only
