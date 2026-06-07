/* MasnoonDuas — Browse page interactivity */

var totalAvailable = 0;

/* ── SVG CONSTANTS ── */
var PIN_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
var DL_SVG  = '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';

/* ── HTML ESCAPE ── */
function esc(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── TAG HELPERS ── */

/* Returns the space-separated tag string for a data item */
function tagStr(item) {
  return (item.tags || []).join(' ');
}

/* Returns a human-readable label string for tags (for search matching) */
function tagLabel(item) {
  return (item.tags || []).join(' ');
}

/* ── RENDER FUNCTIONS ── */

function renderCollection(c) {
  var stats = (c.stats || []).map(function(s) {
    return '<div class="fc-stat">' + esc(s) + '</div>';
  }).join('');

  return [
    '<div class="featured-collection" data-tags="' + esc(tagStr(c)) + '">',
      '<div class="fc-left">',
        '<div class="fc-badge">Complete Collection</div>',
        '<h3 class="fc-title">' + esc(c.title) + '</h3>',
        '<p class="fc-desc">' + esc(c.description) + '</p>',
      '</div>',
      '<div class="fc-right">',
        '<div class="fc-stats">' + stats + '</div>',
        '<a class="btn-fc-dl" href="' + esc(c.pdf) + '" download="' + esc(c.pdfDownloadName) + '">',
          DL_SVG + ' Download All',
        '</a>',
      '</div>',
    '</div>'
  ].join('');
}

function renderDua(d, idx) {
  return [
    '<article class="dua-card" data-tags="' + esc(tagStr(d)) + '" data-dua-id="' + idx + '">',
      '<div class="dua-card-body">',
        '<span class="dua-room-tag">' + esc(d.room) + '</span>',
        '<h3 class="dua-title">' + esc(d.title) + '</h3>',
        '<p class="dua-description">' + esc(d.summary) + '</p>',
        '<div class="dua-placement-row">' + PIN_SVG + ' ' + esc(d.placement) + '</div>',
      '</div>',
      '<div class="dua-card-footer">',
        '<span class="dua-source">' + esc(d.source.display) + '</span>',
        '<div class="card-actions">',
          '<a class="btn-dl-card" href="' + esc(d.print.pdf) + '" download="' + esc(d.print.downloadName) + '">',
            DL_SVG + ' PDF',
          '</a>',
        '</div>',
      '</div>',
    '</article>'
  ].join('');
}

function renderComingSoon(item) {
  var tagHints = (item.tags || [])
    .filter(function(t) { return !['all','coming-soon'].includes(t); })
    .map(function(t) { return t.charAt(0).toUpperCase() + t.slice(1); })
    .join(' · ');

  return [
    '<article class="dua-card dua-card-coming-soon" data-tags="' + esc(tagStr(item)) + '">',
      '<div class="dua-card-body">',
        '<span class="cs-badge">Coming Soon</span>',
        '<h3 class="cs-title">' + esc(item.title) + '</h3>',
        '<p class="cs-desc">' + esc(item.description) + '</p>',
      '</div>',
      '<div class="dua-card-footer">',
        '<span class="dua-source" style="color: var(--muted-light);">' + esc(tagHints) + '</span>',
        '<a href="mailto:hello@masnoonduas.com?subject=' + encodeURIComponent(item.notifySubject) + '" class="btn-notify">Notify me</a>',
      '</div>',
    '</article>'
  ].join('');
}

/* ── SIDEBAR COUNT UPDATE ── */

function updateSidebarCounts(data) {
  var counts = {};

  function countItem(item) {
    (item.tags || []).forEach(function(tag) {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  }

  /* Collections count only toward their own tags (e.g. "collection", "a4") */
  data.collections.forEach(function(c) { if (c.status === 'available') countItem(c); });
  /* Individual duas count toward location/format tags */
  data.duas.forEach(function(d) { if (d.status === 'available') countItem(d); });
  /* Coming-soon items count toward their tags (travel, strip, etc.) */
  data.comingSoon.forEach(function(i) { countItem(i); });

  document.querySelectorAll('.sidebar-filter[data-tag]').forEach(function(el) {
    var tag = el.dataset.tag;
    /* "All Products" sidebar entry shows count of available items */
    var key = tag === 'all' ? 'available' : tag;
    var span = el.querySelector('.sidebar-filter-count');
    if (span) span.textContent = String(counts[key] || 0);
  });

  return counts['available'] || 0;
}

/* ── RENDER ALL CARDS ── */

function renderAll(data) {
  var grid = document.getElementById('dua-grid');
  var noResults = document.getElementById('no-results');
  var html = '';

  data.collections.forEach(function(c) {
    if (c.status === 'available') html += renderCollection(c);
  });
  data.duas.forEach(function(d, i) {
    if (d.status === 'available') html += renderDua(d, i + 1);
  });
  data.comingSoon.forEach(function(item) {
    html += renderComingSoon(item);
  });

  noResults.insertAdjacentHTML('beforebegin', html);

  totalAvailable = updateSidebarCounts(data);
  document.getElementById('results-count').textContent = totalAvailable;
}

/* ── FILTER BY TAG ── */

function filterByTag(tag, pillEl, sidebarEl) {
  if (pillEl) {
    document.querySelectorAll('.pill-header').forEach(function(p) { p.classList.remove('active'); });
    pillEl.classList.add('active');
  }
  if (sidebarEl) {
    document.querySelectorAll('.sidebar-filter').forEach(function(s) { s.classList.remove('active'); });
    sidebarEl.classList.add('active');
  }

  var cards = document.querySelectorAll('.dua-grid [data-tags]');
  var visible = 0;
  cards.forEach(function(card) {
    var tags = (card.dataset.tags || '').split(' ');
    var show = tags.indexOf(tag) > -1;
    card.hidden = !show;
    if (show && !card.classList.contains('dua-card-coming-soon')) visible++;
  });

  document.getElementById('results-count').textContent = visible;

  var noResultsEl = document.getElementById('no-results');
  var anyVisible = Array.prototype.some.call(
    document.querySelectorAll('.dua-grid [data-tags]'),
    function(c) { return !c.hidden; }
  );
  noResultsEl.classList.toggle('visible', !anyVisible);
}

/* ── SEARCH ── */

function handleSearch() {
  var q = document.getElementById('search-input').value.toLowerCase().trim();
  if (!q) { filterByTag('all', null, null); return; }

  /* clear active pill/sidebar selection */
  document.querySelectorAll('.pill-header').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('.sidebar-filter').forEach(function(s) { s.classList.remove('active'); });

  var cards = document.querySelectorAll('.dua-grid [data-tags]');
  var visible = 0;
  cards.forEach(function(card) {
    /* match against visible text AND the tags attribute */
    var text = (card.textContent + ' ' + (card.dataset.tags || '')).toLowerCase();
    var show = text.indexOf(q) > -1;
    card.hidden = !show;
    if (show) visible++;
  });

  document.getElementById('results-count').textContent = visible;
  var noResultsEl = document.getElementById('no-results');
  noResultsEl.classList.toggle('visible', visible === 0);
}

/* ── TOAST ── */

function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2800);
}

/* ── INIT ── */

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('search-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleSearch();
  });

  fetch('data/duas.json')
    .then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function(data) {
      renderAll(data);
    })
    .catch(function(err) {
      console.error('Failed to load duas.json:', err);
      document.getElementById('results-count').textContent = '—';
    });
});
