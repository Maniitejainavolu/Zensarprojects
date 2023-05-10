/**
 * @file
 * Bootstrap Popovers.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  alert('hey');
  
  var $document = $(document);

  /**
   * Extend the Bootstrap Popover plugin constructor class.
   */
  Bootstrap.extendPlugin('popover', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.popover_animation,
        autoClose: !!settings.popover_auto_close,
        enabled: settings.popover_enabled,
        html: !!settings.popover_html,
        placement: settings.popover_placement,
        selector: settings.popover_selector,
        trigger: settings.popover_trigger,
        title: settings.popover_title,
        content: settings.popover_content,
        delay: parseInt(settings.popover_delay, 10),
        container: settings.popover_container
      }
    };
  });

  /**
   * Bootstrap Popovers.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapPopovers = {
    $activePopover: null,
    attach: function (context) {
      // Immediately return if popovers are not available.
      if (!$.fn.popover || !$.fn.popover.Constructor.DEFAULTS.enabled) {
        return;
      }

      var _this = this;

      $document
        .on('show.bs.popover', '[data-toggle=popover]', function () {
          var $trigger = $(this);
          var popover = $trigger.data('bs.popover');

          // Only keep track of clicked triggers that we're manually handling.
          if (popover.options.originalTrigger === 'click') {
            if (_this.$activePopover && _this.getOption('autoClose') && !_this.$activePopover.is($trigger)) {
              _this.$activePopover.popover('hide');
            }
            _this.$activePopover = $trigger;
          }
        })
        // Unfortunately, :focusable is only made available when using jQuery
        // UI. While this would be the most semantic pseudo selector to use
        // here, jQuery UI may not always be loaded. Instead, just use :visible
        // here as this just needs some sort of selector here. This activates
        // delegate binding to elements in jQuery so it can work it's bubbling
        // focus magic since elements don't really propagate their focus events.
        // @see https://www.drupal.org/project/bootstrap/issues/3013236
        .on('focus.bs.popover', ':visible', function (e) {
          var $target = $(e.target);
          if (_this.$activePopover && _this.getOption('autoClose') && !_this.$activePopover.is($target) && !$target.closest('.popover.in')[0]) {
            _this.$activePopover.popover('hide');
            _this.$activePopover = null;
          }
        })
        .on('click.bs.popover', function (e) {
          var $target = $(e.target);
          if (_this.$activePopover && _this.getOption('autoClose') && !$target.is('[data-toggle=popover]') && !$target.closest('.popover.in')[0]) {
            _this.$activePopover.popover('hide');
            _this.$activePopover = null;
          }
        })
        .on('keyup.bs.popover', function (e) {
          if (_this.$activePopover && _this.getOption('autoClose') && e.which === 27) {
            _this.$activePopover.popover('hide');
            _this.$activePopover = null;
          }
        })
      ;

      var elements = $(context).find('[data-toggle=popover]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.popover.Constructor.DEFAULTS, $element.data());

        // Store the original trigger.
        options.originalTrigger = options.trigger;

        // If the trigger is "click", then we'll handle it manually here.
        if (options.trigger === 'click') {
          options.trigger = 'manual';
        }

        // Retrieve content from a target element.
        var target = options.target || $element.is('a[href^="#"]') && $element.attr('href');
        var $target = $document.find(target).clone();
        if (!options.content && $target[0]) {
          $target.removeClass('visually-hidden hidden').removeAttr('aria-hidden');
          options.content = $target.wrap('<div/>').parent()[options.html ? 'html' : 'text']() || '';
        }

        // Initialize the popover.
        $element.popover(options);

        // Handle clicks manually.
        if (options.originalTrigger === 'click') {
          // To ensure the element is bound multiple times, remove any
          // previously set event handler before adding another one.
          $element
            .off('click.drupal.bootstrap.popover')
            .on('click.drupal.bootstrap.popover', function (e) {
              $(this).popover('toggle');
              e.preventDefault();
              e.stopPropagation();
            })
          ;
        }
      }
    },
    detach: function (context) {
      // Immediately return if popovers are not available.
      if (!$.fn.popover || !$.fn.popover.Constructor.DEFAULTS.enabled) {
        return;
      }

      // Destroy all popovers.
      $(context).find('[data-toggle="popover"]')
        .off('click.drupal.bootstrap.popover')
        .popover('destroy')
      ;
    },
    getOption: function(name, defaultValue, element) {
      var $element = element ? $(element) : this.$activePopover;
      var options = $.extend(true, {}, $.fn.popover.Constructor.DEFAULTS, ($element && $element.data('bs.popover') || {}).options);
      if (options[name] !== void 0) {
        return options[name];
      }
      return defaultValue !== void 0 ? defaultValue : void 0;
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/**
 * @file
 * Bootstrap Tooltips.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Tooltip plugin constructor class.
   */
  Bootstrap.extendPlugin('tooltip', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.tooltip_animation,
        enabled: settings.tooltip_enabled,
        html: !!settings.tooltip_html,
        placement: settings.tooltip_placement,
        selector: settings.tooltip_selector,
        trigger: settings.tooltip_trigger,
        delay: parseInt(settings.tooltip_delay, 10),
        container: settings.tooltip_container
      }
    };
  });

  /**
   * Bootstrap Tooltips.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapTooltips = {
    attach: function (context) {
      // Immediately return if tooltips are not available.
      if (!$.fn.tooltip || !$.fn.tooltip.Constructor.DEFAULTS.enabled) {
        return;
      }

      var elements = $(context).find('[data-toggle="tooltip"]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, $element.data());
        $element.tooltip(options);
      }
    },
    detach: function (context) {
      // Immediately return if tooltips are not available.
      if (!$.fn.tooltip || !$.fn.tooltip.Constructor.DEFAULTS.enabled) {
        return;
      }

      // Destroy all tooltips.
      $(context).find('[data-toggle="tooltip"]').tooltip('destroy');
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
!function(p,k,m,n){"use strict";var v="slick",y="unslick",C=v+"--initialized",b=".slick__slider",w=".slick__arrow",z=".b-lazy:not(.b-loaded)",_=".media__icon--close",P="is-playing",$="is-paused",x=k.blazy||{};function s(e){var i,l=p("> "+b,e).length?p("> "+b,e):p(e),a=p("> "+w,e),n=l.data(v)?p.extend({},m.slick,l.data(v)):p.extend({},m.slick),s=!("array"!==p.type(n.responsive)||!n.responsive.length)&&n.responsive,t=n.appendDots,o="blazy"===n.lazyLoad&&x,d=l.find(".media--player").length,c=l.hasClass(y);if(c||(n.appendDots=t===w?a:t||p(l)),s)for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&s[i].settings!==y&&(s[i].settings=p.extend({},m.slick,g(n),s[i].settings));function r(i){l.find(z).length&&((i=l.find(i?".slide:not(.slick-cloned) "+z:".slick-active "+z)).length||(i=l.find(".slick-cloned "+z)),i.length&&x.init.load(i))}function u(){d&&f(),o&&r(!1)}function f(){l.removeClass($);var i=l.find("."+P);i.length&&i.removeClass(P).find(_).click()}function h(){l.addClass($).slick("slickPause")}function g(e){return c?{}:{slide:e.slide,lazyLoad:e.lazyLoad,dotsClass:e.dotsClass,rtl:e.rtl,prevArrow:p(".slick-prev",a),nextArrow:p(".slick-next",a),appendArrows:a,customPaging:function(i,n){var s=i.$slides.eq(n).find("[data-thumb]")||null,t='<img alt="'+k.t(s.find("img").attr("alt"))+'" src="'+s.data("thumb")+'">',t=s.length&&0<e.dotsClass.indexOf("thumbnail")?'<div class="slick-dots__thumbnail">'+t+"</div>":"",n=i.defaults.customPaging(i,n);return t?n.add(t):n}}}l.data(v,n),(n=l.data(v)).randomize&&!l.hasClass("slick-initiliazed")&&l.children().sort(function(){return.5-Math.random()}).each(function(){l.append(this)}),c||l.on("init.sl",function(i,n){t===w&&p(n.$dots).insertAfter(n.$prevArrow);n=l.find(".slick-cloned.slick-active "+z);o&&n.length&&x.init.load(n)}),o?l.on("beforeChange.sl",function(){r(!0)}):p(".media",l).closest(".slide__content").addClass("is-loading"),l.on("setPosition.sl",function(i,n){var s,t;t=(s=n).slideCount<=s.options.slidesToShow,n=t||!1===s.options.arrows,l.attr("id")===s.$slider.attr("id")&&(s.options.centerPadding&&"0"!==s.options.centerPadding||s.$list.css("padding",""),t&&(s.$slideTrack.width()<=s.$slider.width()||p(e).hasClass("slick--thumbnail"))&&s.$slideTrack.css({left:"",transform:""}),(s=l.find(".b-loaded ~ .b-loader")).length&&s.remove(),a[n?"addClass":"removeClass"]("visually-hidden"))}),l.slick(g(n)),l.parent().on("click.sl",".slick-down",function(i){i.preventDefault();i=p(this);p("html, body").stop().animate({scrollTop:p(i.data("target")).offset().top-(i.data("offset")||0)},800,"easeOutQuad"in p.easing&&n.easing?n.easing:"swing")}),n.mouseWheel&&l.on("mousewheel.sl",function(i,n){return i.preventDefault(),l.slick(n<0?"slickNext":"slickPrev")}),o||l.on("lazyLoaded lazyLoadError",function(i,n,s){var t;t=(s=p(t=s)).closest(".slide")||s.closest("."+y),s.parentsUntil(t).removeClass(function(i,n){return(n.match(/(\S+)loading/g)||[]).join(" ")})}),l.on("afterChange.sl",u),d&&(l.on("click.sl",_,f),l.on("click.sl",".media__icon--play",h)),c&&l.slick(y),p(e).addClass(C)}k.behaviors.slick={attach:function(i){i=(i=(i="length"in(i=i||document)?i[0]:i)instanceof HTMLDocument?i:document).querySelectorAll(".slick:not(.slick--initialized)");i.length&&n.once(n.forEach(i,s))}}}(jQuery,Drupal,drupalSettings,dBlazy);
;
/**
 * @file
 * Attaches behaviors for the article post filters.
 */

(function (Drupal, drupalSettings) {

    'use strict';

    Drupal.behaviors.postList = {
        attach: function (context) {
            jQuery('body').once('tag-list').each(function(){
                jQuery('.tal--focus-on-tag-list').on('click','.view-focus-on-tag-list .views-row', function(e) {
                    e.preventDefault();
                    jQuery('.use-ajax', this).trigger("click");

                });
            });

            jQuery('.tal--focus-on-tag-list .view-focus-on-tag-list .views-row a').on('click', function(e) {
                jQuery( document ).on('ajaxComplete', function() {
                    var targetOffset = jQuery('.tal-dynamic-post-wrapper #dynamic-post-list').offset().top -140;
                    jQuery('html, body').animate({scrollTop: targetOffset}, 1000);
                    return false;
                });
            });
            jQuery('.panel-accordion .panel-heading a').on('click', function(e) {
                var self = jQuery(this);
                setTimeout(function() {
                    var targetOffset = self.offset();
                    jQuery('body, html').animate({ scrollTop: targetOffset.top -140 }, 1000);
                }, 350);
            });
            jQuery(window).bind("wheel", function() {
                jQuery("html, body").stop();
            });
        }
    };
})(Drupal, drupalSettings);
;

