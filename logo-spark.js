// Official Walmart Spark SVG definition
// Formatted to use the official vector path geometries from the brand assets.

const WalmartSpark = {
  // Vector path geometries from the official WMT-Spark-SparkYellow-RGB.svg file
  spokes: [
    "M375.663,273.363c12.505-2.575,123.146-53.269,133.021-58.97c22.547-13.017,30.271-41.847,17.254-64.393s-41.847-30.271-64.393-17.254c-9.876,5.702-109.099,76.172-117.581,85.715c-9.721,10.937-11.402,26.579-4.211,39.033C346.945,269.949,361.331,276.314,375.663,273.363z",
    "M508.685,385.607c-9.876-5.702-120.516-56.396-133.021-58.97c-14.332-2.951-28.719,3.415-35.909,15.87c-7.191,12.455-5.51,28.097,4.211,39.033c8.482,9.542,107.705,80.013,117.581,85.715c22.546,13.017,51.376,5.292,64.393-17.254S531.231,398.624,508.685,385.607z",
    "M266.131,385.012c-14.382,0-27.088,9.276-31.698,23.164c-4.023,12.117-15.441,133.282-15.441,144.685c0,26.034,21.105,47.139,47.139,47.139c26.034,0,47.139-21.105,47.139-47.139c0-11.403-11.418-132.568-15.441-144.685C293.219,394.288,280.513,385.012,266.131,385.012z",
    "M156.599,326.637c-12.505,2.575-123.146,53.269-133.021,58.97C1.031,398.624-6.694,427.454,6.323,450c13.017,22.546,41.847,30.271,64.393,17.254c9.876-5.702,109.098-76.172,117.58-85.715c9.722-10.937,11.402-26.579,4.211-39.033S170.931,323.686,156.599,326.637z",
    "M70.717,132.746C48.171,119.729,19.341,127.454,6.323,150c-13.017,22.546-5.292,51.376,17.254,64.393c9.876,5.702,120.517,56.396,133.021,58.97c14.332,2.951,28.719-3.415,35.91-15.87c7.191-12.455,5.51-28.096-4.211-39.033C179.815,208.918,80.592,138.447,70.717,132.746z",
    "M266.131,0c-26.035,0-47.139,21.105-47.139,47.139c0,11.403,11.418,132.568,15.441,144.685c4.611,13.888,17.317,23.164,31.698,23.164s27.088-9.276,31.698-23.164c4.023-12.117,15.441-133.282,15.441-144.685C313.27,21.105,292.165,0,266.131,0z"
  ],
  
  /**
   * Generates SVG paths for the Walmart Spark
   * @param {number} x X coordinate of the desired Spark center
   * @param {number} y Y coordinate of the desired Spark center
   * @param {number} scale Scale factor for the Spark (diameter is 41px * scale)
   * @param {string} fillColor Color of the Spark
   * @returns {string} SVG group element string
   */
  getSVGGroup(x, y, scale, fillColor = "#FFC220") {
    // The official logo viewBox is 532.262 x 600, centered at (266.131, 300)
    // To match the old diameter (~41px), we scale it by 41/600
    const baseScale = 41 / 600;
    const finalScale = scale * baseScale;
    
    const pathsHtml = this.spokes.map(d => 
      `<path d="${d}" fill="${fillColor}" />`
    ).join("\n    ");
    
    return `
  <g transform="translate(${x}, ${y}) scale(${finalScale}) translate(-266.131, -300)">
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
