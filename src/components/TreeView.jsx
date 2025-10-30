import React, { useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

const TreeContent = ({ nodes, edges, darkMode, onNodeClick, focusedNodeId }) => {
  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);
  const { zoomIn, zoomOut, fitView, setCenter, getNode } = useReactFlow();
  const reactFlowWrapper = useRef(null);

  // ✅ Handle edge creation
  const onConnect = useCallback(
    (params) => setRfEdges((eds) => addEdge(params, eds)),
    [setRfEdges]
  );

  // ✅ Update nodes and edges when new data comes
  useEffect(() => {
    setRfNodes(nodes);
    setRfEdges(edges);
  }, [nodes, edges]);

  // ✅ Auto-pan to the matched node
  useEffect(() => {
    if (focusedNodeId) {
      const node = getNode(focusedNodeId);
      if (node) {
        const x = node.position.x + node.width / 2;
        const y = node.position.y + node.height / 2;
        setCenter(x, y, { zoom: 1.5, duration: 800 });
      }
    }
  }, [focusedNodeId, getNode, setCenter]);

  // ✅ Download tree as image
  const handleDownload = useCallback(() => {
    const flow = reactFlowWrapper.current;
    if (!flow) return;

    import("html-to-image").then((htmlToImage) => {
      htmlToImage
        .toPng(flow, { backgroundColor: darkMode ? "#111827" : "#ffffff" })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "json-tree.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => console.error("Error capturing tree:", err));
    });
  }, [darkMode]);

  return (
    <div
      ref={reactFlowWrapper}
      className={`h-[600px] w-full border rounded-lg relative overflow-hidden ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Custom Controls */}
      <div className="absolute z-10 top-2 left-2 flex gap-2">
        <button
          onClick={zoomIn}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +
        </button>
        <button
          onClick={zoomOut}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          -
        </button>
        <button
          onClick={fitView}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fit
        </button>
        <button
          onClick={handleDownload}
          className={`px-3 py-1 rounded text-white transition-colors ${
            darkMode
              ? "bg-green-700 hover:bg-green-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          ⬇️ Download
        </button>
      </div>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(e, node) => onNodeClick(node)}
        fitView
      >
        <MiniMap
          nodeColor={(n) =>
            n.data.value
              ? "#facc15"
              : n.data.label === "$"
              ? "#3b82f6"
              : "#10b981"
          }
          nodeStrokeWidth={2}
          className="rounded-md"
        />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
};

// ✅ ReactFlowProvider wrapper required for v11+
const TreeView = (props) => (
  <ReactFlowProvider>
    <TreeContent {...props} />
  </ReactFlowProvider>
);

export default TreeView;
