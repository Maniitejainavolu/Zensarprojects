/**
 * @file
 * Provides base widget behaviours.
 */

(function ($, Drupal) {

  'use strict';

  $('.menu-icon.menu-icon-121.expanded.dropdown').hover(function(){
    $(this).addClass('open');
    }, function(){
      $(this).removeClass('open');
  });

  /**
   * Handles "facets_filter" event and triggers "facets_filtering".
   *
   * The facets module will listend and trigger defined events on elements with
   * class: "js-facets-widget".
   *
   * Events are doing following:
   * "facets_filter" - widget should trigger this event. The facets module will
   *   handle it accordingly in case of AJAX and Non-AJAX views.
   * "facets_filtering" - The facets module will trigger this event before
   *   filter is executed.
   *
   * This is an example how to trigger "facets_filter" event for your widget:
   *   $('.my-custom-widget.js-facets-widget')
   *     .once('my-custom-widget-on-change')
   *     .on('change', function () {
   *       // In this example $(this).val() will provide needed URL.
   *       $(this).trigger('facets_filter', [ $(this).val() ]);
   *     });
   *
   * The facets module will trigger "facets_filtering" before filter is
   * executed. Widgets can listen on "facets_filtering" event and react before
   * filter is executed. Most common use case is to disable widget. When you
   * disable widget, a user will not be able to trigger new "facets_filter"
   * event before initial filter request is finished.
   *
   * This is an example how to handle "facets_filtering":
   *   $('.my-custom-widget.js-facets-widget')
   *     .once('my-custom-widget-on-facets-filtering')
   *     .on('facets_filtering.my_widget_module', function () {
   *       // Let's say, that widget can be simply disabled (fe. select).
   *       $(this).prop('disabled', true);
   *     });
   *
   * You should namespace events for your module widgets. With namespaced events
   * you have better control on your handlers and if it's needed, you can easier
   * register/deregister them.
   */
  Drupal.behaviors.facetsFilter = {
    attach: function (context) {
      $('.js-facets-widget', context)
        .once('js-facet-filter')
        .on('facets_filter.facets', function (event, url) {
          $('.js-facets-widget').trigger('facets_filtering');

          window.location = url;
        });
    }
  };

})(jQuery, Drupal);
;
/**
 * @file
 * Facets views Link widgets handling.
 */

(function ($, Drupal) {
  'use strict';

  /**
   * Handle link widgets.
   */
  Drupal.behaviors.facetsLinkWidget = {
    attach: function (context) {
      var $linkFacets = $('.js-facets-links', context)
        .once('js-facets-link-on-click');

      // We are using list wrapper element for Facet JS API.
      if ($linkFacets.length > 0) {
        $linkFacets
          .each(function (index, widget) {
            var $widget = $(widget);
            var $widgetLinks = $widget.find('.facet-item > a');

            // Click on link will call Facets JS API on widget element.
            var clickHandler = function (e) {
              e.preventDefault();

              $widget.trigger('facets_filter', [$(this).attr('href')]);
            };

            // Add correct CSS selector for the widget. The Facets JS API will
            // register handlers on that element.
            $widget.addClass('js-facets-widget');

            // Add handler for clicks on widget links.
            $widgetLinks.on('click', clickHandler);

            // We have to trigger attaching of behaviours, so that Facets JS API can
            // register handlers on link widgets.
            Drupal.attachBehaviors(this.parentNode, Drupal.settings);
          });
      }
    }
  };

})(jQuery, Drupal);
;
/**
 * @file
 * Transforms links into checkboxes.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.facets = Drupal.facets || {};
  Drupal.behaviors.facetsCheckboxWidget = {
    attach: function (context) {
      Drupal.facets.makeCheckboxes(context);
    }
  };

  /**
   * Turns all facet links into checkboxes.
   */
  Drupal.facets.makeCheckboxes = function (context) {
    // Find all checkbox facet links and give them a checkbox.
    var $checkboxWidgets = $('.js-facets-checkbox-links', context)
      .once('facets-checkbox-transform');

    if ($checkboxWidgets.length > 0) {
      $checkboxWidgets.each(function (index, widget) {
        var $widget = $(widget);
        var $widgetLinks = $widget.find('.facet-item > a');

        // Add correct CSS selector for the widget. The Facets JS API will
        // register handlers on that element.
        $widget.addClass('js-facets-widget');

        // Transform links to checkboxes.
        $widgetLinks.each(Drupal.facets.makeCheckbox);

        // We have to trigger attaching of behaviours, so that Facets JS API can
        // register handlers on checkbox widgets.
        Drupal.attachBehaviors(this.parentNode, Drupal.settings);
      });

    }

    // Set indeterminate value on parents having an active trail.
    $('.facet-item--expanded.facet-item--active-trail > input').prop('indeterminate', true);
  };

  /**
   * Replace a link with a checked checkbox.
   */
  Drupal.facets.makeCheckbox = function () {
    var $link = $(this);
    var active = $link.hasClass('is-active');
    var description = $link.html();
    var href = $link.attr('href');
    var id = $link.data('drupal-facet-item-id');

    var checkbox = $('<input type="checkbox" class="facets-checkbox">')
      .attr('id', id)
      .data($link.data())
      .data('facetsredir', href);
    var label = $('<label for="' + id + '">' + description + '</label>');

    checkbox.on('change.facets', function (e) {
      e.preventDefault();

      var $widget = $(this).closest('.js-facets-widget');

      Drupal.facets.disableFacet($widget);
      $widget.trigger('facets_filter', [ href ]);
    });

    if (active) {
      checkbox.attr('checked', true);
      label.find('.js-facet-deactivate').remove();
    }

    $link.before(checkbox).before(label).hide();

  };

  /**
   * Disable all facet checkboxes in the facet and apply a 'disabled' class.
   *
   * @param {object} $facet
   *   jQuery object of the facet.
   */
  Drupal.facets.disableFacet = function ($facet) {
    $facet.addClass('facets-disabled');
    $('input.facets-checkbox', $facet).click(Drupal.facets.preventDefault);
    $('input.facets-checkbox', $facet).attr('disabled', true);
  };

  /**
   * Event listener for easy prevention of event propagation.
   *
   * @param {object} e
   *   Event.
   */
  Drupal.facets.preventDefault = function (e) {
    e.preventDefault();
  };

})(jQuery, Drupal);
;
/**
 * @file
 * Attaches behaviors for ingredient search sort option widget.
 */

(function ($, Drupal) {

    'use strict';
    Drupal.behaviors.searchClearAll = {
        attach: function () {
            $(document).find('.clear-all-filters-button').once('SearchClearAll').each(function () {
                var text = '';
                var uri = '';
                var i = 0;
                $.each($(this).closest('section').siblings(), function (x, val1) {
                    var obj = $(this).find(".facets-checkbox:checkbox:checked");
                    var length = obj.length;
                    if(length > 0){
                        if(length == 1){
                            text += '&f[' + i + ']=' + obj.attr("id").replace("-", ":");
                            i++;
                        }else{
                            $.each(obj, function (n, val2) {
                                text += '&f[' + i + ']=' + $(this).attr("id").replace("-", ":");
                                i++;
                            });
                        }
                    }
                })
                var sortby = jQuery("#block-exposedformingredient-finderpage-1 select").val();
                var search = jQuery("#block-exposedformingredient-finderpage-1 input:text").val();
                $(this).attr('href', '/search/ingredients/results?'+ 's='+search +"&sort_by=" + sortby + text);
            });
        }

    };

})(jQuery, Drupal);
;
