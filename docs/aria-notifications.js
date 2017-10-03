/*
MIT License

Copyright (c) 2017 Davide Trisolini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory); //AMD
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery')); //CommonJS
  } else {
    factory(jQuery, window);
  }
}(function ($, window) {
  'use strict';

  var pluginName = 'ariaNotifications',
    a = {
      aHi: 'aria-hidden',
      r: 'role',
      t: 'true',
      f: 'false'
    },
    win = $(window);

  //-----------------------------------------
  // The actual plugin constructor
  function AriaNotifications(element, userSettings) {
    var self = this;
    self.settings = $.extend({}, $.fn[pluginName].defaultSettings, userSettings);
    self.element = $(element);
    self.box = self.element.find('.' + self.settings.boxClass);
    self.message = self.element.find('.' + self.settings.messageClass);
    self.dismissBtn = self.element.find('.' + self.settings.dismissBtnClass).length > 0 ? self.element.find('.' + self.settings.dismissBtnClass) : false;

    //Init plugin
    self.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(AriaNotifications.prototype, {
    init: function () {
      var self = this,
        settings = self.settings;

      /*
       * Init notification by hiding the whole markup
       * (only if cssTransition are disabled)
       */
      if (!settings.cssTransitions) {
        self.element.hide();
        self.box.hide();
      }


      //Init message by setting role and aria-hidden attributes
      self.message.attr(a.aHi, a.t);

      if (settings.alert) {
        self.message.attr(a.r, 'alert');
      } else {
        self.message.attr(a.r, 'status');
      }

      //init status object (true when notification is visible, false when notification is hidden)
      self.elementStatus = false;

      //Trigger custom event on window after initialisation
      win.trigger(pluginName + '.initialised', [self]);
    },
    showNotification: function () {
      var self = this,
        settings = self.settings;


      //exit function if notification is alredy visible
      if (self.elementStatus) {
        return;
      }

      //Fade in notification if css transitions are disabled
      if (!settings.cssTransitions) {
        self.element.slideDown(settings.slideDownSpeed, function () {
          self.box.fadeIn(self.settings.fadeInSpeed);
        });
      }

      //add visible class to notification
      self.element.addClass(self.settings.notificationVisibleClass);

      //Expose notification to AT by setting aria-hiddent to false
      self.message.attr(a.aHi, a.f);

      /*
       * Init dismiss btn if in markup.
       * We bind dismiss event on click event, but just once.
       */
      if (self.dismissBtn) {
        self.dismissBtn.one('click.' + pluginName, function () {
          self.dismissNotification();
        });
      }

      /*
       * Dismiss button afer X time, if timer is not false
       * and notification was not yet dismissed by user
       */
      if (settings.timer !== false) {
        setTimeout(function () {
          self.dismissNotification();
        }, settings.timer);
      }

      //Update notification status
      self.elementStatus = true;

      //Trigger custom event on window after notification is shown
      win.trigger(pluginName + '.show', [self]);
    },
    dismissNotification: function () {
      var self = this,
        settings = self.settings;

      //exit function if notification is alredy visible
      if (!self.elementStatus) {
        return;
      }

      //Remove visible class
      self.element.removeClass(self.settings.notificationVisibleClass);

      //fade out notification if css transitions are disabled
      if (!settings.cssTransitions) {
        var boxHeight = self.box.outerHeight();

        self.element.css('height', boxHeight);

        self.box.fadeOut(self.settings.fadeOutSpeed, function () {
          self.element.slideUp(settings.slideDownSpeed);
        });
      }

      //Hide notification to AT by setting aria-hiddent to false
      self.message.attr(a.aHi, a.t);

      //Update notification status
      self.elementStatus = false;

      //Trigger custom event on window after notification has been hidden
      win.trigger(pluginName + '.dismiss', [self]);
    },
    methodCaller: function (methodArg) {
      var self = this,
        elementsStatus = self.elementsStatus;
      /*
       * Call methods on notification element.
       * Currently we have only two methods implemented in the plugin: show and dismiss.
       */
      switch (methodArg) {
      case 'show':
        if (!self.elementsStatus) {
          self.showNotification(methodArg);
        }
        break;
      case 'dismiss':
        if (self.elementStatus) {
          self.dismissNotification(methodArg);
        }
        break;
      }
    }
  });



  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (userSettings) {
    return this.each(function () {
      var self = this;
      /*
       * If following conditions matches, then the plugin must be initialsied:
       * Check if the plugin is instantiated for the first time
       * Check if the argument passed is an object or undefined (no arguments)
       */
      if (!$.data(self, 'plugin_' + pluginName) && (typeof userSettings === 'object' || typeof userSettings === 'undefined')) {
        $.data(self, 'plugin_' + pluginName, new AriaNotifications(self, userSettings));
      } else if (typeof userSettings === 'string') {
        $.data(self, 'plugin_' + pluginName).methodCaller(userSettings);
      }
    });
  };

  //Define default settings
  $.fn[pluginName].defaultSettings = {
    notificationVisibleClass: 'notification_visible',
    boxClass: 'notification__box',
    messageClass: 'notification__message',
    dismissBtnClass: 'notification__dismiss-btn',
    alert: false,
    timer: false,
    fadeInSpeed: 200,
    fadeOutSpeed: 400,
    slideDownSpeed: 100,
    slideUpSpeed: 100,
    cssTransitions: false
  }
}));
