(function($, window) {

  var $viewport = $('.viewport');
  var $defaultTopic = $viewport.find('.topic').first();

  function getTopicIdByLocation() {
    if (document.location.hash !== '') {
      return document.location.href.match(/[^#]#(.*)$/)[1];
    }
    else {
      return $defaultTopic.attr('id');
    }
  }

  function updateTopic() {
    var topicId = getTopicIdByLocation();
    $viewport.find('.topic').each(function(index, item) {
      var $item = $(item);
      var itemId = $item.attr('id');
      $item.toggleClass('active', itemId === topicId);
    });
  }

  window.onpopstate = function() {
    updateTopic();
  };

  $viewport.on('click', '.topic a', function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    var topicId = ev.target.href.match(/[^#]#(.*)$/)[1];
    window.location = '#' + topicId;
  });

  $(function() {
    updateTopic();
  });
})(jQuery, window);
