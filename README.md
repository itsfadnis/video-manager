# Video manager

## Steps to run the project
* Install dependencies using either npm or yarn.
* Run ```npm start``` to start the server (backend) and the app itself.

## Few thoughts on further improvements for app scalability
* Add routes for different pages. [react-router](https://reactrouter.com/) would be a great choice. As the app grows we can add more routes and lazy load or chunk javascript on demand.
  - `/` (To view all videos)
  - `/videos/new` (To add a new video)
  - `/videos/:id` (To edit a new video)
* Add pagination to the videos table.
* Add error handling.
  - Wrap root component within an [Error Boundary](https://reactjs.org/docs/error-boundaries.html) to gracefully catch errors anywhere inside the component tree
  - Log errors to a service like sentry
* Add performance thresholds. It would be a good idea to keep bundle sizes in check. [size-limit](https://github.com/ai/size-limit) is a great option for it.
* Introduce a state management library like redux as the app grows in complexity.
* Introduce stronger linting, integrate eslint plugins for `react`, `react-hooks`, `a11y`, etc.
* Caching files with a service worker to support offline mode (if necessary).
