import {
  exportToSvg,
  loadFromBlob,
  restore,
} from '@excalidraw/excalidraw';
const palettes = {
  light: { paper: '#fafafa', ink: '#18181b', muted: '#62626e', accent: '#6d28d9', tint: '#f0eafa' },
  dark: { paper: '#18181b', ink: '#f4f4f5', muted: '#aaaab5', accent: '#b9a0ff', tint: '#29223c' },
};

const invariant = (condition, message) => {
  if (!condition) throw new Error(message);
};
const overlaps = (a, b) =>
  a.x < b.x + b.width && a.x + a.width > b.x &&
  a.y < b.y + b.height && a.y + a.height > b.y;

function validateElements(elements, width, height) {
  const nodes = elements.filter(element => element.customData?.kind === 'node');
  const arrows = elements.filter(element => element.type === 'arrow');
  invariant(nodes.length <= 9 && arrows.length <= 12, 'Diagram exceeds complexity budget');
  invariant(nodes.filter(node => node.customData.focal).length <= 2, 'Too many accents');
  for (const element of elements) {
    invariant(!element.isDeleted, `${element.id}: unexpectedly deleted`);
    const bounds = element.type === 'arrow'
      ? {
          left: element.x + Math.min(...element.points.map(point => point[0])),
          top: element.y + Math.min(...element.points.map(point => point[1])),
          right: element.x + Math.max(...element.points.map(point => point[0])),
          bottom: element.y + Math.max(...element.points.map(point => point[1])),
        }
      : { left: element.x, top: element.y, right: element.x + element.width, bottom: element.y + element.height };
    invariant(bounds.left >= 0 && bounds.top >= 0 &&
      bounds.right <= width + 0.01 &&
      bounds.bottom <= height + 0.01, `${element.id}: outside native canvas`);
    if (element.type === 'text') {
      invariant(element.fontFamily === 2, `${element.id}: must use local system sans`);
      const container = nodes.find(node => node.id === element.containerId);
      if (container) {
        invariant(element.x >= container.x + 4 &&
          element.y >= container.y + 4 &&
          element.x + element.width <= container.x + container.width - 4 &&
          element.y + element.height <= container.y + container.height - 4,
        `${element.id}: label does not fit its container`);
      } else {
        invariant(!nodes.some(node => overlaps(element, node)),
          `${element.id}: annotation overlaps a node`);
      }
    }
    if (element.type === 'arrow') {
      element.points.slice(1).forEach(([x, y], index) => {
        const [px, py] = element.points[index];
        invariant(x === px || y === py, `${element.id}: diagonal connector`);
        const segment = {
          x: element.x + Math.min(px, x) - 1,
          y: element.y + Math.min(py, y) - 1,
          width: Math.abs(x - px) + 2, height: Math.abs(y - py) + 2,
        };
        invariant(!nodes.some(node => overlaps(segment, node)),
          `${element.id}: connector crosses a node`);
        invariant(!elements.some(label => label.type === 'text' && overlaps(segment, label)),
          `${element.id}: connector crosses text`);
      });
    }
  }
  for (let i = 0; i < nodes.length; i++) {
    invariant(!nodes.slice(i + 1).some(node => overlaps(nodes[i], node)),
      `${nodes[i].id}: overlapping nodes`);
  }
  const labels = elements.filter(element => element.type === 'text');
  for (let i = 0; i < labels.length; i++) {
    invariant(!labels.slice(i + 1).some(label => overlaps(labels[i], label)),
      `${labels[i].id}: overlapping text`);
  }
}

function validateSvg(svg, width, height) {
  invariant(svg.getAttribute('viewBox') === `0 0 ${width} ${height}`, 'Unexpected SVG viewBox');
  invariant(svg.firstElementChild?.localName === 'title', 'SVG title must be first');
  invariant(!svg.querySelector('image, foreignObject, script'), 'Export must remain native vector artwork');
  invariant(!svg.outerHTML.match(/(?:https?:)?\/\/[^"'\s]+\.(?:woff2?|ttf)/), 'Remote font in export');
  document.body.replaceChildren(svg);
  const canvas = document.createElement('canvas').getContext('2d');
  for (const label of svg.querySelectorAll('text')) {
    const bounds = label.getBoundingClientRect();
    const frame = svg.getBoundingClientRect();
    invariant(bounds.left >= frame.left - 1 && bounds.top >= frame.top - 1 &&
      bounds.right <= frame.right + 1 && bounds.bottom <= frame.bottom + 1,
    `SVG label outside viewBox: ${label.textContent}`);
    const style = getComputedStyle(label);
    invariant(!style.fontFamily.match(/Virgil|Excalifont/), 'Unexpected remote handwriting font');
    canvas.font = `${style.fontSize} ${style.fontFamily}`;
    invariant(canvas.measureText(label.textContent).width <= width - 32,
      `Text exceeds native width: ${label.textContent}`);
  }
}

window.diagramTools = {
  async export(source, theme, slug) {
    invariant(source.type === 'excalidraw' && source.version === 2, 'Not a native Excalidraw scene');
    const canvas = source.elements.find(element => element.customData?.kind === 'canvas');
    invariant(canvas?.x === 0 && canvas?.y === 0, 'Missing origin-aligned native canvas');
    const { width, height } = canvas;
    const { title, description } = canvas.customData;
    invariant(typeof title === 'string' && typeof description === 'string', 'Missing canvas title or description');
    // Exercise both the native file importer and the restoration path.
    const imported = await loadFromBlob(new Blob([JSON.stringify(source)], {
      type: 'application/vnd.excalidraw+json',
    }), null, null);
    const restored = restore(imported, null, null, { refreshDimensions: true, repairBindings: true });
    invariant(restored.elements.length === source.elements.length, 'Import lost editable elements');
    invariant(restored.elements.find(element => element.id === canvas.id)?.customData?.title === title,
      'Import lost editable canvas metadata');
    invariant(restored.elements.filter(element => element.type === 'text').map(element => element.text).join('\n') ===
      source.elements.filter(element => element.type === 'text').map(element => element.text).join('\n'),
    'Import altered labels');
    validateElements(restored.elements, width, height);
    const colors = new Map(Object.entries(palettes.light).map(([role, color]) => [color, palettes[theme][role]]));
    const elements = restored.elements.map(element => ({
      ...element,
      strokeColor: colors.get(element.strokeColor) || element.strokeColor,
      backgroundColor: colors.get(element.backgroundColor) || element.backgroundColor,
    }));
    const svg = await exportToSvg({
      elements, files: restored.files,
      appState: {
        ...restored.appState, exportBackground: true,
        viewBackgroundColor: palettes[theme].paper,
        exportWithDarkMode: false, exportEmbedScene: false,
      },
      exportPadding: 0, skipInliningFonts: true,
    });
    const id = `${slug}-${theme}`;
    const titleElement = document.createElementNS(svg.namespaceURI, 'title');
    titleElement.id = `${id}-title`;
    titleElement.textContent = title;
    const descElement = document.createElementNS(svg.namespaceURI, 'desc');
    descElement.id = `${id}-desc`;
    descElement.textContent = description;
    svg.prepend(titleElement, descElement);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-labelledby', `${id}-title ${id}-desc`);
    // Keep Excalidraw's native Helvetica choice, with explicit offline fallbacks.
    for (const label of svg.querySelectorAll('text')) {
      label.setAttribute('font-family', 'Helvetica, Arial, sans-serif');
    }
    validateSvg(svg, width, height);
    return new XMLSerializer().serializeToString(svg);
  },
};
