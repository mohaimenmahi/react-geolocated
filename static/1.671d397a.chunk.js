webpackJsonp([1],{588:function(e,o,t){var n=t(6),s=t(32),a=t(210).PageRenderer;a.__esModule&&(a=a.default);var i=s({displayName:"WrappedPageRenderer",getInitialState:function(){return{content:t(590)}},componentWillMount:function(){},render:function(){return n.createElement(a,Object.assign({},this.props,{content:this.state.content}))}});i.__catalog_loader__=!0,e.exports=i},590:function(e,o){e.exports="[![build status](https://secure.travis-ci.org/no23reason/react-geolocated.svg)](http://travis-ci.org/no23reason/react-geolocated) [![codecov](https://codecov.io/gh/no23reason/react-geolocated/branch/master/graph/badge.svg)](https://codecov.io/gh/no23reason/react-geolocated) [![npm version](https://img.shields.io/npm/v/react-geolocated.svg)](https://www.npmjs.com/package/react-geolocated) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Greenkeeper badge](https://badges.greenkeeper.io/no23reason/react-geolocated.svg)](https://greenkeeper.io/)\n# react-geolocated - React.js Higher-Order Component for using [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)\n\n## Demo\nBasic demo can be found at the [demo page](https://no23reason.github.io/react-geolocated/#/demo).\n\n## Basic Usage\n\nInstall using `npm`:\n```js\nnpm install react-geolocated --save\n```\n\nThen use in your application like this:\n\n```js\nimport React from 'react';\nimport {geolocated} from 'react-geolocated';\n\nclass Demo extends React.Component {\n  render() {\n    return !this.props.isGeolocationAvailable\n      ? <div>Your browser does not support Geolocation</div>\n      : !this.props.isGeolocationEnabled\n        ? <div>Geolocation is not enabled</div>\n        : this.props.coords\n          ? <table>\n            <tbody>\n              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>\n              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>\n              <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>\n              <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>\n              <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>\n            </tbody>\n          </table>\n          : <div>Getting the location data&hellip; </div>;\n  }\n}\n\nexport default geolocated({\n  positionOptions: {\n    enableHighAccuracy: false,\n  },\n  userDecisionTimeout: 5000,\n})(Demo);\n```\n\n## Props\nThe props passed to the wrapped component are:\n```js\n{\n    coords: {\n        latitude,\n        longitude,\n        altitude,\n        accuracy,\n        altitudeAccuracy,\n        heading,\n        speed,\n    },\n    isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API\n    isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API\n    positionError, // object with the error returned from the Geolocation API call\n}\n```\nThe `coords` prop is equivalent to the [Coordinates](https://developer.mozilla.org/en-US/docs/Web/API/Coordinates) object and the `positionError` is equivalent to the [PositionError](https://developer.mozilla.org/en-US/docs/Web/API/PositionError).\n\nAdditional props the resulting component can take:\n```js\n{\n  // callback call on Geolocation API error, takes PositionError as the only argument\n  onError,\n  // callback call on Geolocation API success, takes Position as the only argument  \n  onSuccess,\n}\n```\n\n### PropTypes\nUnfortunately, the `geolocated` HOC cannot add the prop types to the wrapped component directly, as the ESLint will not pick that up.  For this reason, prop types are exported as the `geoPropTypes` object. Using them is simple with [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) (or if you already depend on it, lodash [`merge`](https://lodash.com/docs#merge) function is useful as well), or, if your environment supports it, using the [object spread syntax](https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):\n```js\nimport React from 'react';\nimport {geolocated, geoPropTypes} from 'react-geolocated';\n\nclass Demo extends React.Component {\n  // Same as the basic example\n}\n\n// Using Object.assign\nDemo.propTypes = Object.assign({}, Demo.propTypes, geoPropTypes);\n// Using ES6 object spread syntax\nDemo.propTypes = {...Demo.propTypes, ...geoPropTypes};\n\nexport default geolocated()(Demo);\n```\n\n## Configuration\nThe `geolocated` function takes optional configuration parameter:\n```js\n{\n    positionOptions: {\n        enableHighAccuracy: true,\n        maximumAge: 0,\n        timeout: Infinity,\n    },\n    watchPosition: false,\n    userDecisionTimeout: null,\n    suppressLocationOnMount: false,\n    geolocationProvider: navigator.geolocation\n}\n```\nThe `positionOptions` object corresponds to the [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) of the Geolocation API.\n\nBy default the component only sets position once.  To watch the user's position and provide live updates to position, set `watchPosition = true`.  The geolocation event handler is unregistered when the component unmounts.\n\nIf set, the `userDecisionTimeout` determines how much time (in miliseconds) we give the user to make the decision whether to allow to share their location or not. In Firefox, if the user declines to use their location, the Geolocation API call does not end with an error. Therefore we want to fallback to the error state if the user declines and the API does not tell us.\n\nThe location is obtained when the component mounts by default. If you want to prevent this and get the location later, set the `suppressLocationOnMount` to `true` and using a `ref` in the parent component call its `getLocation` method (see the demo's [`App` component](https://github.com/no23reason/react-geolocated/blob/dcbe587880751519a6ac6adaa6c49780b609e3c2/demo/App.jsx#L14-L21) for example of this).\n\nThe `geolocationProvider` allows to specify alternative source of the geolocation API. This was added mainly for testing purposes, however feel free to use it if need be.\n\n## TypeScript\nThis project ships with type definitions for TypeScript provided. You can use them in your TypeScript files like this:\n```js\nimport * as React from 'react';\nimport { GeolocatedProps, geolocated } from 'react-geolocated';\n\ninterface IDemoProps {\n  label: string;\n}\n\nclass Demo extends React.Component<IDemoProps & GeolocatedProps> {\n  render(): JSX.Element {\n    return (\n      <div>\n        label: {this.props.label}\n        lattitude: {this.props.coords && this.props.coords.latitude}\n      </div>\n    );\n  }\n}\n\nexport default geolocated()(Demo);\n```\n\n## Browser support\n  * Chrome \u2265 5\n  * Firefox \u2265 3.5\n  * Internet Explorer \u2265 9\n  * Opera \u2265 10.60\n  * Safari \u2265 5\n\n## Acknowledgements\n\nMany thanks belong to [@mcumpl](https://github.com/mcumpl) for the original idea for this as well as many suggestions and comments.\n\nThis project uses the [react-component-boilerplate](https://github.com/survivejs/react-component-boilerplate).\n\n## License\n\n*react-geolocated* is available under MIT. See [LICENSE](https://github.com/no23reason/react-geolocated/tree/master/LICENSE) for more details.\n"}});
//# sourceMappingURL=1.671d397a.chunk.js.map