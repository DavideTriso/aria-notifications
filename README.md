# ARIA NOTIFICATIONS

jQuery plugin for **user-friendly** and **accessible** notifications. **WAI ARIA 1.1** compliant.  [Go to demo page](https://davidetriso.github.io/aria-notifications/) or [check on npm](https://www.npmjs.com/package/t-aria-notifications).

* User friendly and accessible
* Only 2KB (minified).
* Runs in strict mode.
* Compatible with amd and require.js

## Dependencies

**jQuery**

Developed and tested with jQuery 3.2.1

## Cross-browser tests

* Tested on **Google Chrome 57** / macOS Sierra 10.

## Options

Name | Default | Type | Description
-----|---------|------|-------------
notificationVisibleClass | notification_visible | string | Class added from plugin to a notification, when visible
messageClass | notification__message | string | Class used from plugin to select the actual message inside a notification
dismissBtnClass | notification__dismiss-btn | string | Class used from the plugin to select the dismiss button, if it exists.
alert | false | bool | Set to true to expose an alert message to AT. If set to false, notification will be exposed as a simple status notification.
timer | false | bool or int >= 0 | Automatically hide the notification after the time (in milliseconds) passed is elapsed.
fadeInSpeed | 200 | int >= 0 | Duration (in milliseconds) of the fade-in animation
fadeOutSpeed | 800 | int >= 0 | Duration (in milliseconds) of the fade-out animation
cssTransitions | false | bool | Use css transitions to show and hide a notification instead of jQuery fade animations. Read section 'Using CSS transitions' for more informations.


## Installation

Download the package from **GitHub** and get the compiled files from the `dist` folder.

The plugin is also available on **npm**:
```
npm install t-aria-notifications
```


## Usage

1. Include the JS script **aria-notifications.js** - or the minified production script **aria-notifications.min.js** - in the head or the body of your HTML file.
2. Style the notification with CSS (at this time no CSS styles are included with the plugin).
3. Initialise the widget within an inline script tag, or in an external JS file.


### HTML

Use following HTML markup to implement a notification:


```html
  <!-- SIMPLE NOTIFICATION (Preferred implementation) -->
  <div class="notification">
    <div class="notification__message">
      <p>The changes you made were automatically saved</p>
    </div>
  </div>
  
  <!-- OR -->
  
  <!-- DISMISSABLE NOTIFICATION -->
  <div class="notification">
    <div class="notification__message">
      <p>The changes you made were automatically saved</p>
    </div>
    <button class="notification__dismiss-btn" type="button" aria-label="Close notification">
      <span aria-hidden="true">x</span>
    </button>
  </div>
```
For more examples of possible HTML implementations check the file `dist/aria-notifications.html` and/or the [demo page](https://davidetriso.github.io/aria-notifications/))

### JS: Initialisation

Initialise the plugin as follows:

```javascript
$('.notification').ariaNotifications({
  option1: value1,
  option2: value2
});
```

## Methods:

Methods can be called on an initialised notification with following syntax:

```javascript
$('#my-notification').ariaNotifications('show');
```
The plugin supports following methods: show, dismiss.


### Show

In order to show a notification call `ariaNotifications` and pass `'show'` as argument.


```javascript

$('#my-notification').ariaNotifications('show');

```

### Dismiss

In order to dismiss a notification call `ariaNotifications` and pass `'dismiss'` as argument.


```javascript

$('#my-notification').ariaNotifications('dismiss');

```


## Custom events

The plugin triggers following events:

* **ariaNotifications.initialised** after a notification is initialised
* **ariaNotifications.show** when a notification is shown
* **ariaNotifications.dismiss** when a notification is hidden

All events are triggered on window and return the notification data object as arguments.

```javascript

//listen for ariaNotifications.initialised
$(window).on('ariaNotifications.initialised', function(event, notification){
  //When a notification is initialised, perform an action
  notification.element.addClass('notification_initialised');
});

//Initialise the notification
$('.notification').ariaNotifications();

```

## Using CSS transitions

By default the plugin is configured to use the jQuery methods `fadeIn()` and `fadeOut()` to show/hide notifications. Setting the option **cssTransitions** to 'true' will disable the JS animations and make possible to implement the transitions with css. In fact, the plugin toggles the class passed along with the options **notificationVisibleClass** every time the visibbility of the notification is toggled.


## Inject dialogs dinamically

A compatible **extension to dynamically generate and inject notifications in the DOM** is provided at [https://github.com/DavideTriso/aria-notifications-generator](https://github.com/DavideTriso/aria-notifications-generator).


## LICENSE

**Aria notifications** is licensed under the terms of the **MIT license**.

See [LICENSE.md](LICENSE.md) for detailed informations.
