var currentCounters = 0;

$('document').ready(() => {
  $('#add-btn').click(() => {
    addCounter('new counter', 0);
  })

  // readCookies();
  readLocalStorage();
})

/**
* Adds a new counter with the given name and count
*/
function addCounter(name, count) {
  var html = counterHtml(name, count);
  $("#list").append(html);
  // setCookie(currentCounters, html);
  storeCounter(currentCounters, html);

  var countNr = currentCounters;
  $(`#input${currentCounters}`).change(() => {
    console.log(countNr);
    // setCookie(countNr, html);
  storeCounter(countNr, html);
  }).keypress(function (e) {
    if (e.which == 13) {
      this.blur();
    }
  });

  currentCounters++;
}

/**
* counts the given counter up, and updates the cookie
*/
function count(n, inc) {
  var html = $(`#tr${n}`);
  var count = $(`#counter${n}`);
  count.text(+count.text() + inc);
  // setCookie(n, html);
  storeCounter(n, html);
}

/**
* Extracts and prepares the html for a new Counter
* @return html for a new timer
*/
function counterHtml(name, count) {
  var html = $('#template').find('tr').clone();

  html.attr('id', `tr${currentCounters}`)

  html.find('#input').attr('id', `input${currentCounters}`)
  html.find(`#input${currentCounters}`).val(name);

  html.find('#counter').attr('id', `counter${currentCounters}`)
  html.find(`#counter${currentCounters}`).text(count)

  html.find('#inc-btn').attr('onclick', `count(${currentCounters}, 1)`)
  html.find('#dec-btn').attr('onclick', `count(${currentCounters}, -1)`)

  return html;
}

/**
* Saves a Cookie with the given counterNumber.
* The Value consists of the countername and its actual count seperated by a space.
*/
function setCookie(counterNumber, html) {
  var count = html.find(`#counter${counterNumber}`).text();
  var name = html.find('input').val();
  var cookie = { name: name, count: count };
  console.log(cookie);
  Cookies.set(counterNumber, cookie);
}

/**
* evaluates the cookies and adds them as counters
*/
function readCookies() {
  while (true) {
    var cookie = Cookies.getJSON('' + currentCounters);
    console.log(cookie);

    if (cookie === undefined) {
      break;
    }
    addCounter(cookie.name, cookie.count);
  }
}


function storeCounter(counterNumber, html) {
  var count = html.find(`#counter${counterNumber}`).text();
  var name = html.find('input').val();
  var cookie = { name: name, count: count };

  localStorage['' + counterNumber] = JSON.stringify(cookie);
}

function readLocalStorage() {
  while (true) {
    var stored = localStorage['' + currentCounters];
    if (stored) {
      counter = JSON.parse(stored);
      addCounter(counter.name, counter.count);
    }
    else {
      break;
    }
  }
}