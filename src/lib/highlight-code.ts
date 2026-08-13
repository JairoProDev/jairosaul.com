function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function park(slots: string[], html: string) {
  const i = slots.length;
  slots.push(html);
  return `\uE000${i}\uE001`;
}

const PHP_KEYWORDS =
  /\b(function|return|if|else|elseif|foreach|for|while|const|global|echo|array|true|false|null|isset|defined|exit|as|new|class|public|private|protected|and|or|xor|switch|case|break|continue|try|catch|finally|throw|use|namespace|extends|implements|static|self|parent|endif|endforeach)\b/g;

const PY_KEYWORDS =
  /\b(def|return|if|elif|else|for|while|in|not|and|or|import|from|as|class|try|except|finally|with|lambda|True|False|None|pass|break|continue|yield|assert|global|nonlocal|is|del|raise)\b/g;

export function highlightCode(source: string, lang: 'php' | 'python'): string {
  let s = escapeHtml(source);
  const slots: string[] = [];

  if (lang === 'php') {
    s = s.replace(/(&lt;\?php|\?&gt;)/g, (m) =>
      park(slots, `<span class="tok-meta">${m}</span>`),
    );
    s = s.replace(/\/\*[\s\S]*?\*\//g, (m) =>
      park(slots, `<span class="tok-comment">${m}</span>`),
    );
    s = s.replace(/\/\/.*$/gm, (m) =>
      park(slots, `<span class="tok-comment">${m}</span>`),
    );
    s = s.replace(/#.*$/gm, (m) =>
      park(slots, `<span class="tok-comment">${m}</span>`),
    );
    s = s.replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g, (m) =>
      park(slots, `<span class="tok-string">${m}</span>`),
    );
  } else {
    s = s.replace(/"""[\s\S]*?"""|'''[\s\S]*?'''/g, (m) =>
      park(slots, `<span class="tok-string">${m}</span>`),
    );
    s = s.replace(/#.*$/gm, (m) =>
      park(slots, `<span class="tok-comment">${m}</span>`),
    );
    s = s.replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g, (m) =>
      park(slots, `<span class="tok-string">${m}</span>`),
    );
  }

  const keywords = lang === 'php' ? PHP_KEYWORDS : PY_KEYWORDS;
  s = s.replace(keywords, (m) => `<span class="tok-kw">${m}</span>`);
  s = s.replace(/(?<!\uE000)\b(\d+\.?\d*)\b/g, (m) => `<span class="tok-num">${m}</span>`);

  if (lang === 'php') {
    s = s.replace(/(\$[A-Za-z_][\w]*)/g, (m) => `<span class="tok-var">${m}</span>`);
  }

  return s.replace(/\uE000(\d+)\uE001/g, (_, i) => slots[Number(i)] ?? '');
}
