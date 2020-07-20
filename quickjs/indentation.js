function getIndentation(line) {
  const m = line.match(/^(\s+)/);
  return m ? m[1].replace(/\t/g, " ").length / 2 : 0;
}

export default function parse(lines, idx = 0, result = [], lastIndent) {
  while (idx < lines.length) {
    const line = lines[idx];
    const indent = getIndentation(line);
    const delta = indent - lastIndent;
    if (delta > 0) {
      const subsection = parse(lines, idx, [], indent);
      idx += subsection.length;
      result.push(subsection);
    } else if (delta < 0) {
      return result;
    } else {
      result.push(line.trim());
      idx++;
      lastIndent = indent;
    }
  }
  return result;
}
