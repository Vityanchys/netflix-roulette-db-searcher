import express from 'express';
import qs from 'qs';

//Dev
/*import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../../webpack.dev.config.js';*/
//

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import { fetchCounter } from '../common/api/counter';

import { StaticRouter } from "react-router-dom";

const app = new express();
const port = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== "production";

//dev
/*if (isDevelopment) {
  const compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackDevConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}*/

app.use(express.static('public'));

const handleRender = (req, res) => {
  // Query our mock API asynchronously
  fetchCounter(apiResult => {
    // Read the counter from the request, if provided
    const params = qs.parse(req.query);
    const counter = parseInt(params.counter, 10) || apiResult || 0;

    // Compile an initial state
    const preloadedState = { counter };

    // Create a new Redux store instance
    const store = configureStore(preloadedState);

    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    );

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState));
  })
}

// This is fired every time the server side receives a request
app.use(handleRender);

const renderFullPage = (html, preloadedState) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Universal App</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="bundle.js" defer></script>
      </body>
    </html>
    `
};

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Server is listening (port ${port})`);
  }
})
