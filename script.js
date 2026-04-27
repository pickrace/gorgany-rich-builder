function toggleSection(id) {
  document.getElementById(id).classList.toggle('collapsed');
}

function cc(el, hintId, max) {
  const v = el.value.length;
  const h = document.getElementById(hintId);
  h.textContent = v + ' симв.';
  h.className = 'char-count' + (v > max ? ' err' : v > max * 0.9 ? ' warn' : '');
}

function buildImgCols() {
  const c = document.getElementById('imgCols');
  c.innerHTML = '';
  for (let i = 1; i <= 3; i++) {
    const d = document.createElement('div');
    d.className = 'img-card';    
    
    d.innerHTML = `
      <div class="img-card-title">Зображення ${i}</div>
      <div class="field">
        <label>Alt-текст <span class="req">*</span></label>
        <input type="text" id="i${i}alt" placeholder="SEO-текст для фото ${i}">
      </div>
      <div class="field">
        <div class="field-row">
          <label>Заголовок <span class="hint">до 25 симв.</span></label>
          <span class="char-count" id="i${i}sc">0/25</span>
        </div>
        <input type="text" id="i${i}span" placeholder="Весна / Літо / Осінь" oninput="chkSpan(${i},this)">
      </div>
      <div class="field">
        <div class="field-row">
          <label>Підпис <span class="hint">до 126 симв.</span></label>
          <span class="char-count" id="i${i}pc">0/126</span>
        </div>
        <textarea id="i${i}p" rows="2" placeholder="Короткий підпис" oninput="chkP(${i},this)"></textarea>
      </div>`;
    c.appendChild(d);
  }
}

function chkSpan(i, el) {
  const v = el.value.length;
  const h = document.getElementById(`i${i}sc`);
  h.textContent = v + '/25';
  h.className = 'char-count' + (v > 50 ? ' err' : v > 25 ? ' warn' : '');
}

function chkP(i, el) {
  const v = el.value.length;
  const h = document.getElementById(`i${i}pc`);
  h.textContent = v + '/126';
  h.className = 'char-count' + (v > 126 ? ' err' : v > 110 ? ' warn' : '');
}

function g(id) {
  return (document.getElementById(id) || {}).value || '';
}

function webp(url) {
  if (!url) return url;
  url = url.trim().replace(/\?.*$/, '');
  return url + '?format=webp';
}

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generate() {
  // Section 1 — три зображення
  const isGradient = document.getElementById('gradientToggle').checked;
  const sharedFolder = g('sharedFolder').trim();
  const sharedName = g('sharedName').trim();
  const posSuffixes = ['_left', '_middle', '_right'];
  let s1 = '<div class="rich-content-three-images">\n';
  for (let i = 1; i <= 3; i++) {
    const suffix = posSuffixes[i - 1] + (isGradient ? '_gradient' : '');
    const imgUrl = (sharedFolder && sharedName)
      ? `https://www.gorgany.com/media/wysiwyg/rich-content/${sharedFolder}/${sharedName}${suffix}.jpg?format=webp`
      : '';
    s1 += `    <div class="col">\n`;
    s1 += `        <img src="${imgUrl}" alt="${esc(g(`i${i}alt`))}">\n`;
    s1 += `        <div>\n`;
    s1 += `            <span>${esc(g(`i${i}span`))}</span>\n`;
    s1 += `            <p>${esc(g(`i${i}p`))}</p>\n`;
    s1 += `        </div>\n`;
    s1 += `    </div>\n`;
  }
  s1 += '</div>';

  // Section 2 — одне зображення
  const s2imgUrl = (sharedFolder && sharedName)
    ? `https://www.gorgany.com/media/wysiwyg/rich-content/${sharedFolder}/${sharedName}_long.jpg?format=webp`
    : '';
  const s2 =
    `<div class="rich-content-one-image">\n` +
    `    <div>\n` +
    `        <img src="${s2imgUrl}" alt="${esc(g('s2alt'))}">\n` +
    `    </div>\n` +
    `</div>`;

  // Section 3 — опис і характеристики
  const h3 = esc(g('s3h3'));
  const short = esc(g('s3short'));
  const long = esc(g('s3long'));
  const tvT = esc(g('tv_title'));
  const tv1n = esc(g('tv1n')), tv1v = esc(g('tv1v'));
  const tv2n = esc(g('tv2n')), tv2v = esc(g('tv2v'));
  const tv3n = esc(g('tv3n')), tv3v = esc(g('tv3v'));
  const purT = esc(g('purposeTitle')), purTx = esc(g('purposeText'));
  const feaT = esc(g('featTitle'));
  const feaTxLines = g('featText').split('\n').filter(l => l.trim()).map(l => `                    <p>${esc(l.trim())}</p>`).join('\n');
  const tecT = esc(g('techTitle')), tecTx = esc(g('techText'));
  const tecP = tecTx ? `\n                    <p>${tecTx}</p>` : '';
  const madeInUkraine = document.getElementById('madeInUkraineToggle').checked
    ? `\n        <div class="made-in-ukraine">\n            <span>Зроблено з любов'ю в Україні</span>\n        </div>`
    : '';
  const threeValuesBlock = document.getElementById('threeValuesToggle').checked
    ? `
        <div class="three-values">
            <h3>${tvT}</h3>
            <div class="values-wrappep">
                <div>
                    <p>${tv1n}</p>
                    <span>${tv1v}</span>
                </div>
                <div>
                    <p>${tv2n}</p>
                    <span>${tv2v}</span>
                </div>
                <div>
                    <p>${tv3n}</p>
                    <span>${tv3v}</span>
                </div>
            </div>
        </div>`
    : '';

  const s3 =
    `<div class="rich-content-description-characteristics">
    <div class="col-left">
        <div class="collapsible description">
            <h3>${h3}</h3>
            <p class="short-content">${short}<a class="more-link" data-role="title" href="javascript:void(0)">Читати більше</a></p>
            <p class="long-content" data-role="content">${long}<a class="less-link" data-role="title" href="javascript:void(0)">Читати менше</a></p>
        </div>
        ${threeValuesBlock}
    </div>
    <div class="col-right">
        <div class="characteristics">
            <div class="collapsible purpose">
                <div class="title action toggle" data-role="title">
                    <span>${purT}</span>
                </div>
                <div class="content" data-role="content">
                    <p>${purTx}</p>
                </div>
            </div>
            <div class="collapsible features">
                <div class="title action toggle" data-role="title">
                    <span>${feaT}</span>
                </div>
                <div class="content" data-role="content">
${feaTxLines}
                </div>
            </div>
            <div class="collapsible technical-characteristics">
                <div class="title action toggle" data-role="title">
                    <span>${tecT}</span>
                </div>
                <div class="content" data-role="content">${tecP}
                </div>
            </div>
        </div>${madeInUkraine}
    </div>
</div>`;

  const html = s1 + '\n' + s2 + '\n' + s3;
  const el = document.getElementById('output');
  el.textContent = html;
  el.classList.remove('output-empty');
  el.closest('.output-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function doCopy() {
  const txt = document.getElementById('output').textContent;
  if (!txt || txt.startsWith('Заповни')) return;
  navigator.clipboard.writeText(txt).then(() => {
    const b = document.getElementById('copybtn');
    b.textContent = '✓ Скопійовано!';
    b.classList.add('ok');
    document.getElementById('statusMsg').textContent = 'Готово до вставки в CMS';
    setTimeout(() => {
      b.textContent = 'Копіювати';
      b.classList.remove('ok');
      document.getElementById('statusMsg').textContent = '';
    }, 2500);
  });
}

// Ініціалізація
buildImgCols();
