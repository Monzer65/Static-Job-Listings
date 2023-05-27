let jobList = document.querySelector('ul');
let FilterWrapper = document.getElementById('filter-wrapper');
let FilterContainer = document.getElementById('filter-container');
// let filteredElements = document.querySelectorAll('.filter-item');
const clearBtn = document.querySelector('.clear-btn');
let matches = [];
// let selectableItems = document.querySelectorAll('.selectable');

fetch('data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data
      .map(function (item) {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="item-container">
                <div class="item-main">
                    <img src="${item.logo}" alt="logo">
                    <div class="info">
                        <div class="company-new-featured">
                          <p class="company">${item.company}</p>
                          <div class="new-featured">
                            <div class="new">${checkIsNew(item.new)}</div>
                            <div class="featured">${checkIsFeatured(
                              item.featured
                            )}</div>
                          </div>
                        </div>
                        <div class="position">${item.position}</div>
                        <div class="postedAt-contract-location">
                          <p class="postedAt">${item.postedAt}</p>
                          <div class="separator">•</div>
                          <p class="contract">${item.contract}</p>
                          <div class="separator">•</div>
                          <p class="location">${item.location}</p>
                        </div>
                        </div>
                    </div>
                    <div class="role-level-languages-tools">
                        <div class="role selectable">${item.role}</div>
                        <div class="level selectable">${item.level}</div>
                        <div class="languages">${item.languages
                          .map((lang) => {
                            return `<div class="language selectable">${lang}</div>`;
                          })
                          .join('')}
                        </div>
                        <div class="tools">${item.tools
                          .map((tool) => {
                            return `<div class="tool selectable">${tool}</div>`;
                          })
                          .join('')}
                    </div>
                </div>
            </div>
            `;
        jobList.appendChild(listItem);
      })
      .join('');
    handleNewFeaturedItems();
    filter();
  });

function checkIsNew(x) {
  if (x == true) {
    return 'NEW!';
  } else if (x == false) {
    return '';
  }
}
function checkIsFeatured(x) {
  if (x == true) {
    return 'FEATURED';
  } else {
    return '';
  }
}
function handleNewFeaturedItems() {
  let featuredItems = document.querySelectorAll('.featured');
  let newItems = document.querySelectorAll('.new');
  featuredItems.forEach((i) => {
    if (i.textContent == '') {
      i.remove();
    } else {
      i.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderLeft =
        '5px solid hsl(180, 29%, 50%)';
    }
  });
  newItems.forEach((i) => {
    if (i.textContent == '') {
      i.remove();
    }
  });
}

function filter() {
  let listItems = Array.from(document.querySelectorAll('li'));
  for (i of listItems) {
    i.addEventListener('click', (e) => {
      if (e.target.classList.contains('selectable')) {
        FilterWrapper.classList.add('active');
        if (FilterWrapper.innerHTML.includes(e.target.innerHTML)) {
          return;
        } else {
          let filteredEl = document.createElement('div');
          filteredEl.className = 'filter-item';
          filteredEl.innerHTML = `
        <p class="selected-filter">${e.target.textContent}</p>
        <button class="remove-btn" onclick="removeItem(this)"
        ><img src="images/icon-remove.svg" alt=""></button>`;
          FilterContainer.appendChild(filteredEl);
          matches.push(e.target);
        }
      }
      matches.forEach((m) => {
        listItems.forEach((list) => {
          if (list.innerHTML.includes(m.innerHTML)) {
            list.classList.add('selected');
            list.classList.remove('.hide');
          } else {
            list.classList.add('hide');
            list.classList.remove('.selected');
          }
        });
      });
    });
  }
}

function resetFilter() {
  document.querySelectorAll('li').forEach((list) => {
    list.classList.remove('hide');
    list.classList.remove('.selected');
  });
}

clearBtn.addEventListener('click', () => {
  clearBtn.parentElement.classList.remove('active');
  clearBtn.previousElementSibling.innerHTML = '';
  matches = [];
  resetFilter();
});

function removeItem(x) {
  x.parentElement.remove();
  if (FilterContainer.innerHTML == '') {
    FilterWrapper.classList.remove('active');
  }
  let selectedFilter = document.querySelectorAll('.selected-filter');
  let listItems = document.querySelectorAll('li');
  if (selectedFilter.length == 0) {
    resetFilter();
  }
  selectedFilter.forEach((sf) => {
    listItems.forEach((li) => {
      if (li.innerHTML.includes(sf.innerHTML)) {
        matches.forEach((m) => {
          if (m.innerHTML.includes(sf.innerHTML)) {
            matches = [];
            matches.push(m);
            li.classList.remove('hide');
            li.classList.add('selected');
          } else {
            li.classList.add('hide');
            li.classList.remove('selected');
          }
        });
      } else {
        li.classList.add('hide');
        li.classList.remove('selected');
      }
    });
  });
}
