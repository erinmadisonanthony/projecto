$(function() {

  function taskHtml(task) {
    var checkedStatus = task.done? "checked" : "";
    var liElement = '<li><div class="view"><input class="toggle" type="checkbox"' + " data-id='" + task.id + "'" + checkedStatus + '><label>' + task.title + '</label></div></li>';
    return liElement;
  }

  function toggleTask(e) {
    var itemID = $(e.target).data("id");
    var doneValue = Boolean($(e.target).is(':checked'));

    $.post("/tasks/" + itemID, {
      _method: "PUT",
      task: {
        done: doneValue
      }
    });
  }

  $.get("/tasks").success(function(data) {
    var htmlString = "";

    $.each(data, function(index, task) {
      htmlString += taskHtml(task);
    });

    var ulProjects = $('.project-list');
    ulProjects.html(htmlString);

    $('.toggle').change(toggleTask);

  });

  $('#new-form').submit(function(event) {
    event.preventDefault();
    var textbox = $('.new-todo');
    var payload = {
      task: {
        title: textbox.val()
      }
    };
    $.post("/tasks", payload).success(function(data) {
      var htmlString = taskHtml(data);
      var ulProjects = $('.project-list');
      ulProjects.append(htmlString);
      $('.toggle').click(toggleTask);
    });
  });

});