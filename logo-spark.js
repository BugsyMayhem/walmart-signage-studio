// Mathematically symmetric Walmart Spark SVG definition
// Centered at (0,0), radius ~20.5px (total diameter ~41px)

const WalmartSpark = {
  // A single vertical spoke pointing straight up, centered horizontally on X=0
  // Inner tip is at Y=-4.5, outer tip is at Y=-20.5
  spokePath: "M -1.5 -6 A 1.5 1.5 0 0 0 1.5 -6 L 2.5 -18 A 2.5 2.5 0 0 0 -2.5 -18 Z",
  
  /**
   * Generates SVG paths for the Walmart Spark
   * @param {number} x X coordinate of the desired Spark center
   * @param {number} y Y coordinate of the desired Spark center
   * @param {number} scale Scale factor for the Spark (diameter is 41px * scale)
   * @param {string} fillColor Color of the Spark
   * @returns {string} SVG group element string
   */
  getSVGGroup(x, y, scale, fillColor = "#FFC220") {
    // Generate 6 spokes rotated by 60 degrees
    const rotations = [0, 60, 120, 180, 240, 300];
    const pathsHtml = rotations.map(angle => 
      `<path d="${this.spokePath}" fill="${fillColor}" transform="rotate(${angle})" />`
    ).join("\n    ");
    
    return `
  <g transform="translate(${x}, ${y}) scale(${scale})">
    ${pathsHtml}
  </g>`;
  }
};

// Export if running in a module context, otherwise attach to window
if (typeof module !== "undefined" && module.exports) {
  module.exports = WalmartSpark;
} else {
  window.WalmartSpark = WalmartSpark;
}
