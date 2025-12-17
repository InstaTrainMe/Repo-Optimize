export function convertPlainTextToHtml(text: string): string {
  // If content already looks like HTML, don't convert
  if (/<[a-z][\s\S]*>/i.test(text) || /&lt;[a-z][\s\S]*&gt;/i.test(text)) {
    return text;
  }

  const lines = text.split('\n');
  let inList = false;
  let processedLines: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check if this line is a list introducer (ends with colon)
    const isListIntroducer = trimmed.endsWith(':') && trimmed.length > 1;
    
    // Check if this line is a bullet item (starts with -, *, ✔, 👉, or similar)
    const isBulletItem = /^[-*✔✓•👉]\s+/.test(trimmed);
    
    if (isListIntroducer) {
      // Add the intro line as paragraph
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      processedLines.push(`<p>${escapeHtml(trimmed)}</p>`);
      
      // Look ahead for list items
      let j = i + 1;
      const listItems: string[] = [];
      
      while (j < lines.length) {
        const nextLine = lines[j];
        const nextTrimmed = nextLine.trim();
        
        // Empty line might separate lists
        if (nextTrimmed === '') {
          j++;
          continue;
        }
        
        // If line starts with bullet marker or looks like list item (capital letter followed by lowercase)
        if (isBulletItem || /^[-*✔✓•👉]\s+/.test(nextTrimmed) || 
            (/^[A-Z][a-z]/.test(nextTrimmed) && !nextTrimmed.endsWith(':') && nextTrimmed.length < 100)) {
          const itemText = nextTrimmed.replace(/^[-*✔✓•👉]\s+/, '');
          listItems.push(`<li>${escapeHtml(itemText)}</li>`);
          j++;
        } else {
          break;
        }
      }
      
      // If we found list items, add them
      if (listItems.length > 0) {
        processedLines.push('<ul>');
        processedLines.push(...listItems);
        processedLines.push('</ul>');
        i = j - 1;
      }
    } else if (isBulletItem && !inList) {
      // Start of bullet list
      inList = true;
      processedLines.push('<ul>');
      const itemText = trimmed.replace(/^[-*✔✓•👉]\s+/, '');
      processedLines.push(`<li>${escapeHtml(itemText)}</li>`);
    } else if (isBulletItem && inList) {
      // Continue bullet list
      const itemText = trimmed.replace(/^[-*✔✓•👉]\s+/, '');
      processedLines.push(`<li>${escapeHtml(itemText)}</li>`);
    } else if (!isBulletItem && inList && trimmed !== '') {
      // End of bullet list
      processedLines.push('</ul>');
      inList = false;
      processedLines.push(`<p>${escapeHtml(trimmed)}</p>`);
    } else if (trimmed !== '') {
      // Regular paragraph
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      processedLines.push(`<p>${escapeHtml(trimmed)}</p>`);
    }
    
    i++;
  }

  // Close any open list
  if (inList) {
    processedLines.push('</ul>');
  }

  return processedLines.filter(line => line !== null && line !== '').join('\n');
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}
