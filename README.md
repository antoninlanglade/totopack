# totopack

<br>

### Webpack starter with optionnal Kirby CMS

<br>

## Global installation

```sh
cd totopack
npm install
```

<br>

## Kirby submodules
```sh
git submodule update --recursive
```

<br>

## Docs

### Router
```js
// Get a route from the routes.json name
Router.getRoute(name).then((route) => {
	// Goto this route
	Router.goto(route);
});
```

### Router component
```js
// React component for quick links
<RouterComponent route="zozo" params={{id : "1"}} >zozo_link</RouterComponent>
```

### i18n
```js
// Localize a key from a file with a locale (file default is main.json & locale default is current locale)
i18n.localize(key, file, locale);
// Set new locale with promise return when it's done
i18n.setLocale(locale).then();
```

### Localize
```js
// React component to localize a main.json key quickly
<Localize>key<Localize>
```

### LazyImg
```js
// React component to lazyload an image
<LazyImg src="path_to_img" />
```