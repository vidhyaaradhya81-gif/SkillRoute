import zlib from 'zlib';

// Turns an uploaded resume (PDF, DOCX or TXT) into plain text. Runs on the server so the browser
// does not need any extra libraries. No data leaves your computer.

const decodeXml = (s: string) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, '&');

// ---------- DOCX (a zip file containing word/document.xml) ----------
const readZipEntry = (buf: Buffer, wanted: string): Buffer | null => {
  // find End Of Central Directory record
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) return null;
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break;
    const method = buf.readUInt16LE(p + 10);
    const compSize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const localOffset = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nameLen);
    if (name === wanted) {
      const lhNameLen = buf.readUInt16LE(localOffset + 26);
      const lhExtraLen = buf.readUInt16LE(localOffset + 28);
      const start = localOffset + 30 + lhNameLen + lhExtraLen;
      const data = buf.subarray(start, start + compSize);
      return method === 0 ? Buffer.from(data) : zlib.inflateRawSync(data);
    }
    p += 46 + nameLen + extraLen + commentLen;
  }
  return null;
};

const docxToText = (buf: Buffer): string => {
  const xmlBuf = readZipEntry(buf, 'word/document.xml');
  if (!xmlBuf) throw new Error('This does not look like a valid .docx file.');
  const xml = xmlBuf.toString('utf8');
  const paragraphs = xml.split(/<\/w:p>/);
  const lines = paragraphs.map((para) => {
    const isBullet = /<w:numPr>/.test(para);
    const text = para
      .replace(/<w:tab\/>/g, '\t')
      .replace(/<w:br\/>/g, '\n')
      .replace(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g, (_m, t) => '\u0001' + t + '\u0002')
      .replace(/<[^>]+>/g, '')
      .replace(/[\u0001\u0002]/g, '');
    const clean = decodeXml(text).trimEnd();
    return clean ? (isBullet ? '• ' + clean.trimStart() : clean) : '';
  });
  return lines.join('\n');
};

// ---------- PDF ----------
const pdfToText = async (buf: Buffer): Promise<string> => {
  const pdfjs: any = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(buf),
    useSystemFonts: true,
    isEvalSupported: false,
    disableFontFace: true,
    verbosity: 0,
  }).promise;
  const pages: string[] = [];
  const maxPages = Math.min(doc.numPages, 8);
  for (let i = 1; i <= maxPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    let line = '';
    let lastY: number | null = null;
    const out: string[] = [];
    for (const item of content.items as any[]) {
      if (typeof item.str !== 'string') continue;
      const y = item.transform ? item.transform[5] : 0;
      if (lastY !== null && Math.abs(y - lastY) > 2) { out.push(line); line = ''; }
      line += item.str + (item.hasEOL ? '\n' : '');
      lastY = y;
    }
    if (line) out.push(line);
    pages.push(out.join('\n'));
  }
  return pages.join('\n');
};

export const extractResumeText = async (fileName: string, buf: Buffer): Promise<string> => {
  const lower = fileName.toLowerCase();
  let text = '';
  if (lower.endsWith('.txt') || lower.endsWith('.md')) text = buf.toString('utf8');
  else if (lower.endsWith('.docx')) text = docxToText(buf);
  else if (lower.endsWith('.pdf')) text = await pdfToText(buf);
  else throw new Error('Unsupported file type. Please upload a PDF, DOCX or TXT file.');
  return text.replace(/\r/g, '').replace(/\u00a0/g, ' ').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
};
