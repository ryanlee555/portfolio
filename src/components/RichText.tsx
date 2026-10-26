// Renders **double-asterisk** spans from the content file as bold text.
export default function RichText({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

// A number plus whatever is attached to it: "$1.2M+", "350+", "40%", "15–25%", "30x".
const NUMBER = /(\$?\d[\d,.]*(?:[–-]\d[\d,.]*)?(?:[KMB]\b)?[%+x]?\+?)/g;

// Bolds every number in a line, so metrics stand out in resume-style bullets.
export function BoldNumbers({ text }: { text: string }) {
  return text.split(NUMBER).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}
