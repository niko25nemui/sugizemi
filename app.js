(() => {
  'use strict';
  const original = window.SEMINAR_CONTENT || {};
  let data = original;
  const $ = id => document.getElementById(id);
  const list = value => Array.isArray(value) ? value : [];
  const str = value => typeof value === 'string' ? value.trim() : '';
  const node = (tag, cls, text) => { const el = document.createElement(tag); if (cls) el.className = cls; if (text !== undefined) el.textContent = text; return el; };
  const fill = (id, value, fallback = '') => { $(id).textContent = str(value) || fallback; };
  const isDemo = record => record.isDemo !== false;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function externalUrl(value) { try { const u = new URL(str(value)); return u.protocol === 'https:' && !u.username && !u.password ? u.href : ''; } catch (_) { return ''; } }
  function imagePath(value) { const p = str(value); return /^assets\/[\w\u0080-\uFFFF .()\/-]+\.(?:png|jpe?g|webp|gif|svg)$/i.test(p) && !p.includes('..') ? p : ''; }
  function picture(src, alt, cls) {
    const path = imagePath(src); if (!path) return null;
    const img = node('img', cls); img.src = path; img.alt = str(alt); img.loading = 'lazy'; img.decoding = 'async';
    img.addEventListener('error', () => { img.replaceWith(node('p', 'image-unavailable', '画像を読み込めませんでした。')); }, {once:true}); return img;
  }
  function externalLink(label, url, cls = 'text-link') {
    const href = externalUrl(url); if (!href) return null;
    const a = node('a', cls); a.append(node('span','',label),node('span','external-mark','↗')); a.lastChild.setAttribute('aria-hidden','true');
    a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('aria-label', label + '（新しいタブで開く）'); return a;
  }
  function detail(title, body, prefix) {
    const d = node('details'); const s = node('summary'); if (prefix) s.append(node('span','question-prefix',prefix)); s.append(document.createTextNode(title)); d.append(s,node('div','detail-body',body)); return d;
  }
  function demoBadge(record) { return isDemo(record) ? node('span','demo-badge','仮データ') : null; }
  function addDemo(container, record, label) { if (isDemo(record)) container.append(node('p','demo-note',label)); }
  // All SVG markup below is fixed design code, never editable content.
  function designSvg(markup, cls, viewBox = '0 0 120 90') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg'); svg.setAttribute('viewBox',viewBox); svg.setAttribute('fill','none'); svg.setAttribute('aria-hidden','true'); if (cls) svg.setAttribute('class',cls); svg.innerHTML = markup; return svg;
  }
  const meta = data.meta || {};
  document.querySelectorAll('[data-field]').forEach(el => { const v = str(meta[el.dataset.field]); if (v) el.textContent = v; });
  if (meta.siteIsDraft === false) { document.querySelector('.draft-bar').hidden = true; fill('footer-status','','ゼミ説明会のご案内'); }
  document.title = (str(meta.seminar) || '杉山ゼミナール') + '｜' + (str(meta.affiliation) || '神奈川大学 人間科学部');
  fill('hook-one',meta.hookLine1,'こころを知る。'); fill('hook-two',meta.hookLine2,'未来をつくる。'); fill('hero-intro',meta.intro,'心理学で、自分と他者と社会を理解する。その学びから、これからを考える。');
  const heroImg = picture(meta.heroImage,meta.heroImageAlt,'hero-photo'); if (heroImg) { heroImg.loading = 'eager'; $('hero-art').replaceChildren(heroImg); }
  const about = data.about || {};
  fill('about-lead',about.lead); fill('about-body',about.body); fill('inquiry-one',about.inquiry1); fill('inquiry-two',about.inquiry2); fill('committee-copy',about.committees);
  const committeeIcons = [
    '<circle cx="12" cy="7" r="3"/><path d="M6 20v-4a6 6 0 0 1 12 0v4M3 12H1m22 0h-2M5 5 3 3m16 2 2-2"/>',
    '<path d="M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3ZM12 6v16M6 8h3M6 12h3m6-4h3m-3 4h3"/>',
    '<path d="M4 5h16v16H4ZM4 10h16M8 2v6m8-6v6M8 14h2m4 0h2m-8 3h2"/>',
    '<path d="m3 10 13-6v16L3 14Zm13-3 5-3v16l-5-3M6 15l2 6h4l-2-5"/>',
    '<path d="M2 20 12 3l10 17ZM9 20l3-6 3 6M12 3v11M1 20h22"/>'
  ];
  const committeeRoles=list(about.committeeRoles).length?list(about.committeeRoles):list(about.committeeNames).map(name=>({name,role:''}));
  committeeRoles.filter(Boolean).forEach((entry,i)=>{const item=node('li','committee-role');item.append(designSvg('<g stroke="currentColor" stroke-width="1.2" stroke-linejoin="round">'+committeeIcons[i%5]+'</g>','committee-icon','0 0 24 24'),node('h4','',str(entry.name)));if(str(entry.role))item.append(node('p','',str(entry.role)));$('committee-list').append(item);});
  // The diagrams show a relationship network, alternative paths and shared work.
  const skillArt = [
    '<g stroke="currentColor" stroke-width="1.5"><path d="m24 57 38-35 36 35-38 12-36-12Z M62 22l-2 47"/><g fill="#fbfaf8"><circle cx="24" cy="57" r="9"/><circle cx="98" cy="57" r="9"/><circle cx="60" cy="69" r="7"/></g><circle cx="62" cy="22" r="11" fill="currentColor"/></g>',
    '<g stroke="currentColor" stroke-width="1.5"><path d="M15 65h23c12 0 14-11 22-22s15-22 29-22h10M38 65c15 0 23-4 34-13l18-13h9M38 65h61"/><g fill="#fbfaf8"><circle cx="99" cy="39" r="4"/><circle cx="99" cy="65" r="4"/></g><circle cx="99" cy="21" r="5" fill="currentColor"/><circle cx="15" cy="65" r="5" fill="currentColor"/></g>',
    '<g stroke="currentColor" stroke-width="1.5"><path d="M15 23h28m-28 22h28M15 67h28M43 23v44m0-22h20"/><rect x="63" y="26" width="40" height="38" rx="2"/><path d="M74 39h18m-18 9h13"/><g fill="currentColor"><circle cx="15" cy="23" r="4"/><circle cx="15" cy="45" r="4"/><circle cx="15" cy="67" r="4"/></g></g>'
  ];
  list(about.skills).filter(Boolean).forEach((skill,i) => { const card = node('article','skill-card'); card.dataset.reveal = ''; card.style.setProperty('--reveal-delay',(i*65)+'ms'); const top = node('div','skill-top'); top.append(node('span','',str(skill.english))); card.append(top,designSvg(skillArt[i%3],'skill-art'),node('h4','',str(skill.title)),node('p','',str(skill.body))); $('about-skills').append(card); });
  const aboutImg = picture(about.photo,about.photoAlt); if (aboutImg) $('about-photo').append(aboutImg);
  [['学びの進め方',about.learning],['参加するときに大切にしたいこと',about.policy]].forEach(([title,items]) => {
    if (!list(items).length) return;
    const panel=node('section','learning-guide');const heading=node('div','learning-guide-heading');heading.append(node('h3','',title));panel.append(heading);
    const rows=node('ol','learning-rows');list(items).filter(Boolean).forEach((item,i)=>{const row=node('li','learning-item');const copy=node('div');copy.append(node('h4','',str(item.title)),node('p','',str(item.body)));row.append(node('span','learning-index',String(i+1).padStart(2,'0')),copy);rows.append(row);});panel.append(rows);$('learning-details').append(panel);
  });

  const paperMap = new Map();
  list(data.research).filter(r=>r&&str(r.title)).forEach(r=>{const title=str(r.title),cats=list(r.categories).filter(str),prev=paperMap.get(title);if(prev)prev.categories=[...new Set([...prev.categories,...cats])];else paperMap.set(title,{...r,title,categories:[...new Set(cats)]});});
  const research=[...paperMap.values()];
  const groups=list(data.researchGroups).filter(g=>g&&str(g.name));
  const groupNames=[...new Set([...groups.map(g=>g.name),...research.flatMap(r=>r.categories)])];
  fill('research-intro',data.researchIntro,'複数の領域にまたがるテーマもあります。');
  fill('research-overview-copy',data.researchTrend,'自分のこと、人との関係、社会や文化。身近な疑問から、心理学の問いが広がります。');
  const normalize=value=>String(value||'').normalize('NFKC').toLocaleLowerCase('ja');
  let category='',shown=6;
  const domainButtons = [];
  const domainSelect = node('select', 'domain-select');
  domainSelect.setAttribute('aria-label', '研究領域を選択');
  domainSelect.setAttribute('aria-controls', 'research-list');
  $('research-map').append(domainSelect);
  function selectCategory(name) {
    category = name;
    shown = 6;
    renderResearch();
  }
  domainSelect.addEventListener('change', () => selectCategory(domainSelect.value));
  function matchingPapers(){
    const terms=normalize($('research-search').value).trim().split(/\s+/).filter(Boolean);
    const matching=research.filter(r=>(!category||r.categories.includes(category))&&terms.every(term=>normalize([r.title,...r.categories,str(r.summary)].join(' ')).includes(term)));
    if(category||terms.length)return matching;
    const featured=[];
    ['自己・パーソナリティ','愛着・対人関係','メンタルヘルス・臨床心理','SNS・インターネット','推し活・ファン心理・ポピュラーカルチャー','色彩・感性・美意識'].forEach(name=>{
      const paper=matching.find(r=>r.categories.includes(name)&&!featured.includes(r));
      if(paper)featured.push(paper);
    });
    return [...featured,...matching.filter(r=>!featured.includes(r))];
  }
  function clearResearch(){category='';shown=6;$('research-search').value='';renderResearch();}
  function renderResearch(){
    const matching=matchingPapers(),visible=matching.slice(0,shown),query=$('research-search').value.trim();$('research-list').replaceChildren();
    $('research-current-title').textContent=category || (query ? 'キーワード検索の結果' : '卒業論文の題目');
    const group=groups.find(g=>g.name===category);fill('research-description',group?.description,query?'「'+query+'」を含む題目を表示しています。':'気になる領域や言葉から、卒論のテーマを探してみてください。');
    $('research-count').textContent='表示 '+visible.length+'件 / 該当 '+matching.length+'件';
    $('research-status').textContent=(category||'すべての領域')+(query?'、キーワード「'+query+'」':'')+'の題目が'+matching.length+'件見つかりました。'+visible.length+'件を表示しています。';
    visible.forEach(r=>{const item=node('article','research-example');const tags=node('div','example-tags');r.categories.forEach(name=>tags.append(node('span','example-tag',name)));item.append(tags,node('h4','',r.title));if(str(r.summary))item.append(node('p','research-summary',r.summary));const extra=[str(r.year),str(r.method)].filter(Boolean).join(' / ');if(extra)item.append(node('p','research-summary',extra));$('research-list').append(item);});
    if(!matching.length){const empty=node('div','research-empty');empty.append(node('h4','','一致する題目がありません。'),node('p','','別の言葉で検索するか、領域の絞り込みを解除してみてください。'));const reset=node('button','button button-dark','条件をクリア');reset.type='button';reset.addEventListener('click',()=>{clearResearch();$('research-search').focus({preventScroll:true});});empty.append(reset);$('research-list').append(empty);}
    domainSelect.value = category;
    domainButtons.forEach(({button,name})=>button.setAttribute('aria-pressed',String(name===category)));
    $('research-more').hidden=visible.length>=matching.length;
    $('research-more').replaceChildren(document.createTextNode('次の'+Math.min(6,matching.length-visible.length)+'件を見る'),node('span','','＋'));$('research-more').lastChild.setAttribute('aria-hidden','true');
    $('research-reset').disabled=!category&&!query;
  }
  ['', ...groupNames].forEach(name => {
    const label = name || 'すべての領域';
    const option = node('option', '', label);
    option.value = name;
    domainSelect.append(option);
    const button = node('button', 'domain-button');
    button.type = 'button';
    button.setAttribute('aria-controls', 'research-list');
    button.append(node('span', 'domain-label', label));
    button.addEventListener('click', () => selectCategory(name));
    domainButtons.push({button, name});
    $('research-map').append(button);
  });
  $('research-search').addEventListener('input',()=>{shown=6;renderResearch();});
  $('research-reset').addEventListener('click', () => {
    clearResearch();
    $('research-search').focus({preventScroll:true});
  });
  $('research-back').addEventListener('click',()=>{$('research-search').focus({preventScroll:true});document.querySelector('.research-controls').scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth',block:'start'});});
  $('research-more').addEventListener('click', () => {
    const previousCount = $('research-list').children.length;
    shown += 6;
    renderResearch();
    const heading = $('research-list').children[previousCount]?.querySelector('h4');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({preventScroll:true});
      heading.scrollIntoView({block:'nearest', behavior:'instant'});
    }
  });
  renderResearch();

  const professor=data.professor||{};
  $('professor-name').append(document.createTextNode(str(professor.name)||'杉山 崇'),node('span','','先生')); fill('professor-title',professor.title);fill('professor-bio',professor.bio);
  const professorImg=picture(professor.photo,professor.photoAlt);if(professorImg){$('professor-visual').replaceChildren(professorImg);$('professor-visual').classList.add('has-image');}else document.querySelector('.portrait-name').textContent=str(professor.name)||'杉山 崇';
  const hasInterviewAnswer=entry=>!!entry&&(!!str(entry.answer)||list(entry.points).some(point=>point&&(str(point.title)||str(point.body))));
  if(!list(professor.interview).some(hasInterviewAnswer))$('interview-area').hidden=true;
  const fields=list(professor.researchFields).filter(Boolean);if(fields.length)$('professor-fields').append(node('p','eyebrow','主な研究内容'));
  fields.forEach((f,i)=>{const row=node('article','professor-field');const copy=node('div');copy.append(node('h4','',str(f.title)),node('p','',str(f.body)));row.append(node('span','field-number',String(i+1).padStart(2,'0')),copy);$('professor-fields').append(row);});
  fill('professor-message-lead',professor.messageLead,'メッセージを準備しています。');fill('professor-message-body',professor.messageBody);fill('professor-message-sign',professor.name,'杉山 崇');
  list(professor.interview).filter(hasInterviewAnswer).forEach((entry,i)=>{
    const answer=node('article','interview-card');const heading=node('div','interview-question');heading.append(node('span','question-prefix','Q'+(i+1)),node('h4','',str(entry.question)||'先生への質問'));answer.append(heading);
    const points=list(entry.points).filter(point=>point&&(str(point.title)||str(point.body)));
    if(points.length){const rows=node('ol','interview-points');points.forEach((point,n)=>{const row=node('li');const copy=node('div');if(str(point.title))copy.append(node('h5','',str(point.title)));if(str(point.body))copy.append(node('p','',str(point.body)));row.append(node('span','interview-point-number',String(n+1).padStart(2,'0')),copy);rows.append(row);});answer.append(rows);if(str(entry.closing))answer.append(node('p','interview-closing',entry.closing));}
    else answer.append(node('p','interview-answer',str(entry.answer)));
    $('interview-list').append(answer);
  });
  if(!$('interview-list').children.length)$('interview-list').append(node('p','small-muted','インタビューを準備しています。'));
  list(professor.books).filter(b=>b&&str(b.title)&&b.confirmed===true).forEach((book,i)=>{const card=node('article','book-card');card.append(picture(book.image,str(book.title)+'の表紙','book-cover')||node('span','book-marker',String(i+1).padStart(2,'0')));const copy=node('div');copy.append(node('h4','',book.title));if(str(book.subtitle))copy.append(node('p','',book.subtitle));if(str(book.publisher))copy.append(node('p','publisher',book.publisher));if(str(book.credit))copy.append(node('p','',book.credit));if(str(book.description))copy.append(node('p','',book.description));const label=externalUrl(book.url).includes('ndlsearch.ndl.go.jp')?'国立国会図書館の書誌':'出版社の書籍情報';const link=externalLink(label,book.url);if(link){link.setAttribute('aria-label',book.title+'：'+label+'（新しいタブで開く）');copy.append(link);}card.append(copy);$('books-list').append(card);});
  if(!$('books-list').children.length)$('books-list').append(node('p','small-muted','出版物の情報を準備しています。'));

  const members=data.members||{};fill('members-date',members.asOf);fill('members-note',members.note);
  list(members.grades).filter(Boolean).forEach((grade,i)=>{const card=node('article','member-card');const head=node('div','member-card-head');head.append(node('h4','',str(grade.label)||'学年'));const badge=demoBadge(grade);if(badge)head.append(badge);card.append(head);const known=Number.isInteger(grade.count)&&grade.count>=0;const count=node('p','member-count');count.append(node('strong','',known?String(grade.count):'—'),node('span','',known?'人':'確認中'));card.append(count);addDemo(card,grade,'人数は表示サンプルです。実際の集計ではありません。');$('members-list').append(card);});
  if(!$('members-list').children.length)$('members-list').append(node('p','small-muted','メンバー情報を準備しています。'));
  const overview=members.genderOverview||{};
  const overviewValues=[overview.femalePercent,overview.malePercent];
  if(overviewValues.every(n=>typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=100)&&Math.abs(overviewValues[0]+overviewValues[1]-100)<0.001){
    const box=$('gender-overview');box.hidden=false;
    const caption=node('div','gender-overview-caption');caption.append(node('h4','','全体の男女比の目安'),node('p','',str(overview.note)));
    const graphic=node('div','gender-overview-graphic');const bar=node('div','gender-overview-bar');bar.setAttribute('role','img');bar.setAttribute('aria-label','男女比の目安。女性 約'+overview.femalePercent+'%、男性 約'+overview.malePercent+'%。学年によって異なります。');
    const labels=node('div','gender-overview-labels');
    [['女性',overview.femalePercent,'female'],['男性',overview.malePercent,'male']].forEach(([label,value,cls])=>{const segment=node('span',cls);segment.style.width=value+'%';bar.append(segment);const item=node('p',cls);item.append(node('span','',label),node('strong','','約'+value+'%'));labels.append(item);});
    graphic.append(bar,labels);box.append(caption,graphic);
  }

  list(data.voices).filter(v=>v&&str(v.quote)).forEach(voice=>{const card=node('article','voice-card');const badge=demoBadge(voice);if(badge)card.append(badge);const by=node('p','voice-meta');const img=picture(voice.photo,voice.photoAlt);if(img)by.append(img);by.append(document.createTextNode([str(voice.grade),str(voice.name)].filter(Boolean).join(' / ')));card.append(by);if(str(voice.title))card.append(node('h4','',voice.title));card.append(node('p','voice-quote',voice.quote));addDemo(card,voice,'レイアウト確認用の架空のコメントです。実際の体験談ではありません。');if(str(voice.timetable))card.append(detail('時間割の例を見る',voice.timetable));$('voices-list').append(card);});
  if(!$('voices-list').children.length)$('voices-list').append(node('p','small-muted','先輩のコメントを準備しています。'));

  const years=list(data.years).filter(Boolean);
  function renderYear(index){const year=years[index];if(!year)return;const panel=$('year-panel');panel.replaceChildren();panel.setAttribute('aria-labelledby','year-tab-'+index);const head=node('div','year-panel-heading');head.append(node('p','year-theme',str(year.theme)||'一年の予定を準備しています。'));const badge=demoBadge(year);if(badge)head.append(badge);panel.append(head);if(str(year.note))panel.append(node('p','year-note',year.note));addDemo(panel,year,'以下は架空の年間スケジュールです。実際の日程・活動内容ではありません。');const timeline=node('ol','timeline');list(year.periods).filter(Boolean).forEach(period=>{const item=node('li');item.append(node('span','period',str(period.label)),node('h4','',str(period.title)||'活動内容を準備中'));if(str(period.body))item.append(node('p','',period.body));timeline.append(item);});panel.append(timeline);document.querySelectorAll('.year-tab').forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});}
  years.forEach((year,i)=>{const tab=node('button','year-tab',str(year.label)||'学年');tab.type='button';tab.id='year-tab-'+i;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','year-panel');tab.addEventListener('click',()=>renderYear(i));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%years.length;else if(event.key==='ArrowLeft')next=(i+years.length-1)%years.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=years.length-1;else return;event.preventDefault();renderYear(next);$('year-tab-'+next).focus();});$('year-tabs').append(tab);
    const href=externalUrl(year.videoUrl);const card=node(href?'a':'div','video-card'+(href?' is-link':''));if(href){card.href=href;card.target='_blank';card.rel='noopener noreferrer';card.setAttribute('aria-label',(str(year.videoTitle)||str(year.label)+'の動画')+'（新しいタブで開く）');}const thumb=picture(year.videoThumbnail,'','video-thumbnail');const icon=node('span','play-icon',href?'▶':'▷');icon.setAttribute('aria-hidden','true');card.append(thumb||icon);const copy=node('div');copy.append(node('h4','',str(year.videoTitle)||str(year.label)+'の紹介動画'),node('p','',href?'動画を見る ↗':'動画を準備しています'));card.append(copy);$('video-grid').append(card);
  });if(years.length)renderYear(0);else $('year-panel').append(node('p','small-muted','年間予定を準備しています。'));
  if(!years.some(y=>externalUrl(y.videoUrl)))$('video-grid').hidden=true;
  const introVideo=externalLink(str(meta.introductionVideoTitle)||'杉山ゼミの紹介動画',meta.introductionVideoUrl,'intro-video-link');
  if(introVideo){const box=$('introduction-video');box.hidden=false;introVideo.replaceChildren();const play=node('span','intro-video-play');play.setAttribute('aria-hidden','true');const copy=node('div');copy.append(node('h3','',str(meta.introductionVideoTitle)||'杉山ゼミの紹介動画'));introVideo.append(play,copy,node('span','intro-video-action','YouTubeで見る ↗'));box.append(introVideo);}
  const gallery=list(data.gallery).filter(g=>g&&imagePath(g.src));if(gallery.length){$('gallery-list').className='gallery-grid';gallery.forEach(g=>{const f=node('figure');f.append(picture(g.src,g.alt));$('gallery-list').append(f);});}else{$('gallery-list').className='gallery-empty';const copy=node('div');copy.append(node('h4','','ゼミの風景を、ここに。'),node('p','','集合写真や活動の様子を掲載するスペースです。'));$('gallery-list').append(designSvg('<path d="M12 20h66v50H12zM24 8h66v50" stroke="currentColor"/><circle cx="30" cy="35" r="6" stroke="currentColor"/><path d="m15 65 24-21 15 12 10-10 12 15" stroke="currentColor"/>','', '0 0 100 80'),copy);}

  const admissions=data.admissions||{};fill('admissions-notice',admissions.notice);$('admissions-notice').hidden=!str(admissions.notice);
  function validIsoDate(value){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
    const parsed=new Date(value+'T00:00:00Z');
    return Number.isFinite(parsed.getTime())&&parsed.toISOString().slice(0,10)===value;
  }
  const todayJst=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  list(admissions.events).filter(Boolean).forEach(event=>{
    const row=node('article','briefing-row');
    const dateParts=str(event.date).match(/(\d+)月(\d+)日[（(]([^）)]+)[）)]/);
    const eventIso=str(event.dateIso);
    const ending = str(event.time).match(/[〜～–−-]\s*([01]?\d|2[0-3]):([0-5]\d)\s*$/);
    const endTime = ending && validIsoDate(eventIso)
      ? Date.parse(eventIso + 'T' + ending[1].padStart(2,'0') + ':' + ending[2] + ':00+09:00')
      : NaN;
    const past = validIsoDate(eventIso) && (eventIso < todayJst || Date.now() >= endTime);
    const date=node('h4','briefing-date');
    if(dateParts){const month=dateParts[1],day=dateParts[2];date.append(node('span','date-main',month+'.'+day.padStart(2,'0')),node('span','date-weekday',dateParts[3]+'曜日'));}
    else date.textContent=str(event.date);
    const top=node('div','briefing-card-top');top.append(date,node('span','briefing-type',str(event.type)));
    if(past){top.append(node('span','briefing-ended','終了'));row.classList.add('is-past');}
    row.append(top);const info=node('dl','briefing-info');
    [['時間',str(event.time)],['場所',str(event.place)]].forEach(([label,value])=>{const pair=node('div');pair.append(node('dt','',label),node('dd','',value));info.append(pair);});row.append(info);$('briefing-list').append(row);
  });
  fill('admissions-intro',admissions.intro,'自分の関心と、ここで取り組みたいことを聞かせてください。');
  const steps=list(admissions.steps).filter(Boolean);steps.slice(0,4).forEach((step,i)=>{const item=node('li','admission-step');const copy=node('div','step-detail');copy.append(node('h3','',str(step.title)),node('p','',str(step.body)));if(str(step.when))copy.append(node('span','step-when',step.when));item.append(node('span','step-number',String(i+1).padStart(2,'0')),copy);$('admission-steps').append(item);});
  if(steps.length>4){steps.slice(4).forEach(step=>{const row=node('div','condition-row');const copy=node('div');copy.append(node('p','',str(step.body)));if(str(step.when))copy.append(node('span','step-when',step.when));row.append(node('h3','',str(step.title)||'選考の補足'),copy);$('admissions-conditional').append(row);});}else $('admissions-conditional').hidden=true;
  fill('admissions-deadline',admissions.deadline,'募集日程・提出方法は、確定後にお知らせします。');$('admissions-link').append(externalLink('Webステーションを開く',admissions.url,'button button-dark')||node('span','waiting-link','正式な案内・応募はWebステーションへ'));
  const faqGroups=new Map();list(admissions.faq).filter(Boolean).forEach(faq=>{const group=str(faq.group)||'参加・応募について';if(!faqGroups.has(group))faqGroups.set(group,[]);faqGroups.get(group).push(faq);});
  faqGroups.forEach((items,title)=>{const section=node('section','faq-group');section.append(node('h4','',title));items.forEach(faq=>section.append(detail(str(faq.question),str(faq.answer)||'詳細を準備しています。','Q')));$('faq-list').append(section);});
  [['2年生のInstagram',meta.instagramUrl],['3年生のInstagram',meta.instagramSecondaryUrl],['4年生のInstagram',meta.instagramTertiaryUrl]].forEach(([label,url])=>{const link=externalLink(label,url,'button');if(link)$('instagram-link').append(link);});
  if(!$('instagram-link').children.length)$('instagram-link').append(node('span','waiting-link','Instagram / アカウントを準備中'));
  function studentArt(src, alt) {
    const img=picture(src,alt,'student-original');if(!img)return null;
    // Original pixels and orientation are preserved. Dimensions reserve the layout before loading.
    img.width=3541;img.height=3334;return img;
  }
  const firstArt=studentArt(meta.illustration,meta.illustrationAlt);
  const secondArt=studentArt(meta.illustrationSecondary,meta.illustrationSecondaryAlt);
  if(firstArt||secondArt){
    $('illustration-intro').hidden=false;
    $('illustration-primary').append(firstArt||secondArt);
    fill('illustration-credit',meta.illustrationCredit,'イラストの制作情報を確認しています。');
  }
  if(firstArt&&secondArt){$('illustration-slot').hidden=false;$('illustration-slot').append(secondArt);}
  if(firstArt||secondArt){const interviewArt=studentArt(meta.illustrationSecondary||meta.illustration,meta.illustrationSecondaryAlt||meta.illustrationAlt);$('interview-illustration').hidden=false;$('interview-illustration').append(interviewArt);const faqArt=studentArt(meta.illustration,meta.illustrationAlt);$('faq-illustration').hidden=false;$('faq-illustration').append(faqArt);}
  const official=externalLink('大学・ゼミの公式案内',meta.officialUrl);if(official)$('official-link').append(official);

  const menu = document.querySelector('.menu-toggle');
  const nav = $('site-nav');
  function closeMenu() {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
  nav.addEventListener('focusout', event => {
    if (event.relatedTarget && !nav.contains(event.relatedTarget) && event.relatedTarget !== menu) closeMenu();
  });
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    const wasOpen = menu.getAttribute('aria-expanded') === 'true';
    closeMenu();
    const target = document.getElementById(link.hash.slice(1));
    if (wasOpen && target) {
      target.tabIndex = -1;
      target.focus({preventScroll:true});
    }
  }));document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});matchMedia('(min-width:961px)').addEventListener('change',closeMenu);
  let scrollQueued=false;function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;$('reading-progress').style.transform='scaleX('+(max>0?Math.max(0,Math.min(1,scrollY/max)):0)+')';scrollQueued=false;}addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress);}},{passive:true});addEventListener('resize',updateProgress);updateProgress();
  if('IntersectionObserver'in window){const navLinks=[...nav.querySelectorAll('a')];const activeObserver=new IntersectionObserver(entries=>{entries.filter(e=>e.isIntersecting).forEach(entry=>{[...navLinks,...document.querySelectorAll('.chapter-index a')].forEach(a=>{const current=a.hash==='#'+entry.target.id;a.classList.toggle('is-current',current);if(current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});});},{rootMargin:'-15% 0px -65% 0px',threshold:0});['top','about','research','people','activities','admissions'].forEach(id=>activeObserver.observe($(id)));
    if(!reducedMotion.matches){document.documentElement.classList.add('motion-ready');const reveal=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');reveal.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('[data-reveal]').forEach(el=>reveal.observe(el));}
  }
  const art=$('hero-art');if(!heroImg&&!reducedMotion.matches&&matchMedia('(hover:hover) and (pointer:fine)').matches){let queued=false,px=0,py=0;art.addEventListener('pointermove',e=>{if(reducedMotion.matches)return;px=e.clientX;py=e.clientY;if(queued)return;queued=true;requestAnimationFrame(()=>{if(reducedMotion.matches){queued=false;return;}const r=art.getBoundingClientRect();art.style.setProperty('--tilt-x',((.5-(py-r.top)/r.height)*4).toFixed(2)+'deg');art.style.setProperty('--tilt-y',(((px-r.left)/r.width-.5)*5).toFixed(2)+'deg');queued=false;});},{passive:true});art.addEventListener('pointerleave',()=>{art.style.setProperty('--tilt-x','0deg');art.style.setProperty('--tilt-y','0deg');});}
  reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){document.documentElement.classList.remove('motion-ready');art.style.setProperty('--tilt-x','0deg');art.style.setProperty('--tilt-y','0deg');}});
})();
