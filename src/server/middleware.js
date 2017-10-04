
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';

import { StaticRouter, matchPath } from 'react-router-dom';

import routes from '../common/routes';

export default (req, res, next) => {
	const store = configureStore();

	const promises = routes.reduce((acc, route) => {
		if (matchPath(req.url, route) && route.component && route.component.initialAction) {
			acc.push(Promise.resolve(store.dispatch(route.component.initialAction())));
		}
		return acc;
	}, []);

	Promise.all(promises)
		.then(() => {
			const html = renderToString(
				<Provider store={store}>
					<StaticRouter location={req.url} context={{}}>
						<App />
					</StaticRouter>
				</Provider>
			);

			const initialData = store.getState();

			res.send(renderFullPage(html, initialData));

		})
		.catch(next);
};

const renderFullPage = (html, state) => {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<title>Universal App</title>
				<link rel="stylesheet" type="text/css" href="bundle.css">
			</head>
			<body>
				<div id="app">${html}</div>
				<script>
					window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\x3c')}
				</script>
				<script src="bundle.js"></script>
			</body>
		</html>
	`
}
