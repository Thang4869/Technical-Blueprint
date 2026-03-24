export function wrapLabel(label) {
    if (label.length <= 16) return label;
    let words = label.split(' ');
    let lines = [];
    let currentLine = '';
    words.forEach(word => {
        if ((currentLine + word).length > 16) {
            if (currentLine) lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    });
    if (currentLine) lines.push(currentLine.trim());
    return lines;
}