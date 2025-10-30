// src/utils/jsonToNodes.js

export function jsonToNodes(json) {
  const nodes = [];
  const edges = [];
  let idCounter = 1;

  const NODE_WIDTH = 160;
  const NODE_HEIGHT = 80;
  const LEVEL_GAP_Y = 120;

  function traverse(value, path, parentId = null, depth = 0, index = 0) {
    const id = String(idCounter++);
    const label = path.split(".").pop() || "$";

    // ✅ Remove "$." prefix so search like $.user.name works
    const fullPath = path.replace(/^\$\./, "").replace(/^\$/, "");

    const type =
      Array.isArray(value) ? "array" : typeof value === "object" ? "object" : "value";

    // systematic layout
    const x = index * NODE_WIDTH * 2;
    const y = depth * LEVEL_GAP_Y;

    nodes.push({
      id,
      data: { label, value: type === "value" ? String(value) : "", fullPath },
      position: { x, y },
      style: {
        background:
          type === "object"
            ? "#3b82f6" // blue
            : type === "array"
            ? "#10b981" // green
            : "#facc15", // yellow
        color: "#fff",
        borderRadius: "8px",
        padding: 10,
        border: "1px solid #ccc",
        fontSize: 12,
        textAlign: "center",
        minWidth: NODE_WIDTH,
      },
    });

    if (parentId)
      edges.push({
        id: `${parentId}-${id}`,
        source: parentId,
        target: id,
      });

    if (type === "object" && value !== null) {
      const keys = Object.keys(value);
      keys.forEach((key, i) =>
        traverse(value[key], `${path}.${key}`, id, depth + 1, i)
      );
    } else if (type === "array") {
      value.forEach((item, i) =>
        traverse(item, `${path}[${i}]`, id, depth + 1, i)
      );
    }
  }

  traverse(json, "$");
  return { nodes, edges };
}
