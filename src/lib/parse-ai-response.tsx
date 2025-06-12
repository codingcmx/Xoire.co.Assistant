import React from 'react';
import Link from 'next/link';

export function parseAiResponse(text: string): React.ReactNode {
  if (!text) return null;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  // Regex to find **bold** text or [link text](url)
  const regex = /(\*\*(.*?)\*\*|\[(.*?)\]\((.*?)\))/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      elements.push(processNewlines(text.substring(lastIndex, match.index)));
    }

    if (match[1].startsWith('**')) { // Bold text: **text**
      elements.push(<strong key={`bold-${match.index}`}>{match[2]}</strong>);
    } else { // Link: [text](url)
      const linkText = match[3];
      const linkUrl = match[4];
      if (linkUrl.startsWith('/')) {
        elements.push(
          <Link href={linkUrl} key={`link-${match.index}`} className="text-accent hover:underline">
            {linkText}
          </Link>
        );
      } else {
        elements.push(
          <a
            href={linkUrl}
            key={`link-${match.index}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {linkText}
          </a>
        );
      }
    }
    lastIndex = regex.lastIndex;
  }

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    elements.push(processNewlines(text.substring(lastIndex)));
  }

  return elements.map((el, i) => <React.Fragment key={i}>{el}</React.Fragment>);
}

function processNewlines(textSegment: string): React.ReactNode {
    return textSegment.split('\n').map((line, index, arr) => (
      <React.Fragment key={`line-${index}`}>
        {line}
        {index < arr.length - 1 && <br />}
      </React.Fragment>
    ));
}
