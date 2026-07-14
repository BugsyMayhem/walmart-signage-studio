// Walmart Signage Studio Application Logic

document.addEventListener("DOMContentLoaded", () => {
    // State management
    const state = {
        sizePreset: "2x11",
        widthInches: 2,
        heightInches: 11,
        fontStyle: "Outfit",
        textCategory: "ACTION ALLEY",
        textBadge: "BK",
        textAisleLabel: "AISLE",
        textAisleValue: "1",
        textSpaceLabel: "SPACE",
        textSpaceValuesRaw: "1,2,3,4,5",
        textSpaceValues: ["1", "2", "3", "4", "5"],
        colorTheme: "walmart-classic",
        bgColor: "#0071CE",       // Official Walmart True Blue
        accentColor: "#FFC220",   // Official Walmart Spark Yellow
        textColor: "#FFFFFF",     // White
        decalSpark: "top-header",
        decalSparkScale: 100,
        watermarkOpacity: 6,
        toggleCategory: true,
        toggleBarcode: true,
        textBarcodeLabel: "",
        scaleCategory: 100,
        scaleBadge: 100,
        scaleAisle: 100,
        scaleSpace: 100,
        signLayoutFormat: "hanging-banner",
        zoomPercent: 50,
        inputMode: "standard",
        rangeAisleStart: 1,
        rangeAisleEnd: 2,
        rangeSpaceStart: 1,
        rangeSpaceEnd: 3,
        csvData: []
    };

    // DOM Elements Cache
    const el = {
        sizePreset: document.getElementById("size-preset"),
        customSizeInputs: document.getElementById("custom-size-inputs"),
        customWidth: document.getElementById("custom-width"),
        customHeight: document.getElementById("custom-height"),
        signFont: document.getElementById("sign-font"),
        textCategory: document.getElementById("text-category"),
        textBadge: document.getElementById("text-badge"),
        textAisleLabel: document.getElementById("text-aisle-label"),
        textAisleValue: document.getElementById("text-aisle-value"),
        textSpaceLabel: document.getElementById("text-space-label"),
        textSpaceValues: document.getElementById("text-space-values"),
        colorTheme: document.getElementById("color-theme"),
        customColorInputs: document.getElementById("custom-color-inputs"),
        colorBg: document.getElementById("color-bg"),
        colorAccent: document.getElementById("color-accent"),
        colorText: document.getElementById("color-text"),
        decalSpark: document.getElementById("decal-spark"),
        toggleCategory: document.getElementById("toggle-category"),
        toggleBarcode: document.getElementById("toggle-barcode"),
        barcodeTextGroup: document.getElementById("barcode-text-group"),
        textBarcodeLabel: document.getElementById("text-barcode-label"),
        btnExportSvg: document.getElementById("btn-export-svg"),
        btnPrint: document.getElementById("btn-print"),
        btnCopyCode: document.getElementById("btn-copy-code"),
        previewArea: document.getElementById("preview-area"),
        zoomRange: document.getElementById("zoom-range"),
        zoomValue: document.getElementById("zoom-value"),
        inputMode: document.getElementById("input-mode"),
        inputGroupStandard: document.getElementById("input-group-standard"),
        inputGroupRange: document.getElementById("input-group-range"),
        inputGroupCsv: document.getElementById("input-group-csv"),
        rangeAisleStart: document.getElementById("range-aisle-start"),
        rangeAisleEnd: document.getElementById("range-aisle-end"),
        rangeSpaceStart: document.getElementById("range-space-start"),
        rangeSpaceEnd: document.getElementById("range-space-end"),
        csvFileInput: document.getElementById("csv-file-input"),
        scaleCategory: document.getElementById("scale-category"),
        scaleCategoryValue: document.getElementById("scale-category-value"),
        scaleBadge: document.getElementById("scale-badge"),
        scaleBadgeValue: document.getElementById("scale-badge-value"),
        scaleAisle: document.getElementById("scale-aisle"),
        scaleAisleValue: document.getElementById("scale-aisle-value"),
        scaleSpace: document.getElementById("scale-space"),
        scaleSpaceValue: document.getElementById("scale-space-value"),
        decalSparkScale: document.getElementById("decal-spark-scale"),
        sparkScaleValue: document.getElementById("spark-scale-value"),
        signLayoutFormat: document.getElementById("sign-layout-format"),
        watermarkOpacityGroup: document.getElementById("watermark-opacity-group"),
        watermarkOpacity: document.getElementById("watermark-opacity"),
        watermarkOpacityValue: document.getElementById("watermark-opacity-value"),
        sizeDimensionsDisplay: document.getElementById("size-dimensions-display"),
        signCountDisplay: document.getElementById("sign-count-display")
    };

    // Initialize inputs from initial state
    function initInputs() {
        el.signLayoutFormat.value = state.signLayoutFormat;
        el.sizePreset.value = state.sizePreset;
        el.customWidth.value = state.widthInches;
        el.customHeight.value = state.heightInches;
        el.signFont.value = state.fontStyle;
        el.textCategory.value = state.textCategory;
        el.textBadge.value = state.textBadge;
        el.textAisleLabel.value = state.textAisleLabel;
        el.textAisleValue.value = state.textAisleValue;
        el.textSpaceLabel.value = state.textSpaceLabel;
        el.textSpaceValues.value = state.textSpaceValuesRaw;
        el.colorTheme.value = state.colorTheme;
        el.colorBg.value = state.bgColor;
        el.colorAccent.value = state.accentColor;
        el.colorText.value = state.textColor;
        el.decalSpark.value = state.decalSpark;
        el.toggleCategory.checked = state.toggleCategory;
        el.toggleBarcode.checked = state.toggleBarcode;
        el.textBarcodeLabel.value = state.textBarcodeLabel;
        el.zoomRange.value = state.zoomPercent;
        el.zoomValue.textContent = `${state.zoomPercent}%`;
        el.scaleCategory.value = state.scaleCategory;
        el.scaleCategoryValue.textContent = `${state.scaleCategory}%`;
        el.scaleBadge.value = state.scaleBadge;
        el.scaleBadgeValue.textContent = `${state.scaleBadge}%`;
        el.scaleAisle.value = state.scaleAisle;
        el.scaleAisleValue.textContent = `${state.scaleAisle}%`;
        el.scaleSpace.value = state.scaleSpace;
        el.scaleSpaceValue.textContent = `${state.scaleSpace}%`;
        el.decalSparkScale.value = state.decalSparkScale;
        el.sparkScaleValue.textContent = `${state.decalSparkScale}%`;
        el.watermarkOpacity.value = state.watermarkOpacity;
        el.watermarkOpacityValue.textContent = `${state.watermarkOpacity}%`;
        el.inputMode.value = state.inputMode;
        el.rangeAisleStart.value = state.rangeAisleStart;
        el.rangeAisleEnd.value = state.rangeAisleEnd;
        el.rangeSpaceStart.value = state.rangeSpaceStart;
        el.rangeSpaceEnd.value = state.rangeSpaceEnd;
    }

    // Sync input changes to state
    function updateState() {
        state.signLayoutFormat = el.signLayoutFormat.value;
        state.sizePreset = el.sizePreset.value;
        
        // Automatically adapt dimensions based on format if not custom
        if (state.sizePreset !== "custom") {
            el.customSizeInputs.classList.add("hidden");
            if (state.signLayoutFormat === "vertical-rack") {
                state.widthInches = 3.0;
                state.heightInches = 10.0;
                el.customWidth.value = 3.0;
                el.customHeight.value = 10.0;
            } else if (state.signLayoutFormat === "shelf-label") {
                state.widthInches = 4.2;
                state.heightInches = 2.4;
                el.customWidth.value = 4.2;
                el.customHeight.value = 2.4;
            } else {
                const [w, h] = state.sizePreset.split("x").map(Number);
                state.widthInches = w;
                state.heightInches = h;
                el.customWidth.value = w;
                el.customHeight.value = h;
            }
        } else {
            el.customSizeInputs.classList.remove("hidden");
            state.widthInches = parseFloat(el.customWidth.value) || 12;
            state.heightInches = parseFloat(el.customHeight.value) || 48;
        }

        state.fontStyle = el.signFont.value;
        state.toggleCategory = el.toggleCategory.checked;
        state.textCategory = el.textCategory.value.trim().toUpperCase();
        state.textBadge = el.textBadge.value.trim().toUpperCase();
        state.textAisleLabel = el.textAisleLabel.value.trim().toUpperCase();
        state.textAisleValue = el.textAisleValue.value.trim().toUpperCase();
        state.textSpaceLabel = el.textSpaceLabel.value.trim().toUpperCase();
        
        state.inputMode = el.inputMode.value;
        el.inputGroupStandard.classList.toggle("hidden", state.inputMode !== "standard");
        el.inputGroupRange.classList.toggle("hidden", state.inputMode !== "range");
        el.inputGroupCsv.classList.toggle("hidden", state.inputMode !== "csv");

        state.rangeAisleStart = parseInt(el.rangeAisleStart.value) || 1;
        state.rangeAisleEnd = parseInt(el.rangeAisleEnd.value) || 1;
        state.rangeSpaceStart = parseInt(el.rangeSpaceStart.value) || 1;
        state.rangeSpaceEnd = parseInt(el.rangeSpaceEnd.value) || 1;

        state.textSpaceValuesRaw = el.textSpaceValues.value;
        // Parse space values: support comma separated or simple range (e.g. 1-5)
        state.textSpaceValues = parseSpaceValues(state.textSpaceValuesRaw);

        state.colorTheme = el.colorTheme.value;
        if (state.colorTheme === "custom") {
            el.customColorInputs.classList.remove("hidden");
            state.bgColor = el.colorBg.value;
            state.accentColor = el.colorAccent.value;
            state.textColor = el.colorText.value;
        } else {
            el.customColorInputs.classList.add("hidden");
            if (state.colorTheme === "walmart-classic") {
                state.bgColor = "#0071CE";      // Walmart True Blue
                state.accentColor = "#FFC220";  // Walmart Spark Yellow
                state.textColor = "#FFFFFF";    // White
            } else if (state.colorTheme === "walmart-garden") {
                state.bgColor = "#006A4E";      // Garden Center Dark Green
                state.accentColor = "#FFC220";  // Spark Yellow
                state.textColor = "#FFFFFF";    // White
            } else if (state.colorTheme === "walmart-pharmacy") {
                state.bgColor = "#008F91";      // Pharmacy Teal
                state.accentColor = "#FFC220";  // Spark Yellow
                state.textColor = "#FFFFFF";    // White
            } else if (state.colorTheme === "walmart-rollback") {
                state.bgColor = "#DC2626";      // Rollback/Clearance Red
                state.accentColor = "#FFC220";  // Spark Yellow
                state.textColor = "#FFFFFF";    // White
            } else if (state.colorTheme === "walmart-highcontrast") {
                state.bgColor = "#FFC220";      // Yellow bg
                state.accentColor = "#0071CE";  // Blue text/badge
                state.textColor = "#0A1128";    // Dark Navy text
            } else if (state.colorTheme === "walmart-dark") {
                state.bgColor = "#1E293B";      // Slate Charcoal
                state.accentColor = "#FFC220";  // Spark Yellow
                state.textColor = "#FFFFFF";    // White
            }
            el.colorBg.value = state.bgColor;
            el.colorAccent.value = state.accentColor;
            el.colorText.value = state.textColor;
        }

        state.decalSpark = el.decalSpark.value;
        state.decalSparkScale = parseInt(el.decalSparkScale.value) || 100;
        el.sparkScaleValue.textContent = `${state.decalSparkScale}%`;
        state.watermarkOpacity = parseInt(el.watermarkOpacity.value) || 6;
        el.watermarkOpacityValue.textContent = `${state.watermarkOpacity}%`;

        if (state.decalSpark === "watermark" || state.decalSpark === "watermark-pattern") {
            el.watermarkOpacityGroup.classList.remove("hidden");
        } else {
            el.watermarkOpacityGroup.classList.add("hidden");
        }

        state.toggleBarcode = el.toggleBarcode.checked;
        if (state.toggleBarcode) {
            el.barcodeTextGroup.classList.remove("hidden");
            state.textBarcodeLabel = el.textBarcodeLabel.value.trim();
        } else {
            el.barcodeTextGroup.classList.add("hidden");
        }

        state.scaleCategory = parseInt(el.scaleCategory.value) || 100;
        el.scaleCategoryValue.textContent = `${state.scaleCategory}%`;
        state.scaleBadge = parseInt(el.scaleBadge.value) || 100;
        el.scaleBadgeValue.textContent = `${state.scaleBadge}%`;
        state.scaleAisle = parseInt(el.scaleAisle.value) || 100;
        el.scaleAisleValue.textContent = `${state.scaleAisle}%`;
        state.scaleSpace = parseInt(el.scaleSpace.value) || 100;
        el.scaleSpaceValue.textContent = `${state.scaleSpace}%`;

        // Update header dimension displays
        el.sizeDimensionsDisplay.textContent = `${state.widthInches.toFixed(2)}" x ${state.heightInches.toFixed(2)}" (${state.sizePreset === 'custom' ? 'Custom' : 'Preset'})`;
    }

    // Helper to parse comma separated values or ranges
    function parseSpaceValues(rawStr) {
        if (!rawStr) return ["1"];
        // Check for range pattern like "1-5"
        const rangeMatch = rawStr.match(/^(\d+)\s*-\s*(\d+)$/);
        if (rangeMatch) {
            const start = parseInt(rangeMatch[1]);
            const end = parseInt(rangeMatch[2]);
            if (start <= end && end - start < 30) { // Limit to max 30 generated signs
                const arr = [];
                for (let i = start; i <= end; i++) {
                    arr.push(i.toString());
                }
                return arr;
            }
        }
        // Fallback to comma separation
        return rawStr.split(",")
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .slice(0, 30); // Limit to max 30 generated signs
    }

    // ─────────────────────────────────────────────────────────────────────────
    // UPC-A Barcode Generator
    // Replicates standard retail UPC-A barcode symbology used by Walmart shelf stickers.
    // Encodes exactly 12 numeric digits (including check digit).
    // Automatically hashes alphanumeric locations (e.g., "A1-1") to unique 12-digit codes.
    // ─────────────────────────────────────────────────────────────────────────
    function generateUPCASVG(text, x, y, width, height) {
        // UPC-A left hand odd parity patterns (0-9)
        const LEFT_PATTERNS = [
            '0001101', '0011001', '0010011', '0111101', '0100011',
            '0110001', '0101111', '0111011', '0110111', '0001011'
        ];
        // UPC-A right hand parity patterns (0-9)
        const RIGHT_PATTERNS = [
            '1110010', '1100110', '1101100', '1000010', '1011100',
            '1001110', '1010000', '1000100', '1001000', '1110100'
        ];

        // Clean input
        const rawText = text.trim();
        let digits11 = "";
        
        // If it's already numeric (11 or 12 digits), use it directly
        const isNumeric = /^\d{11,12}$/.test(rawText.replace(/[-\s]/g, ''));
        if (isNumeric) {
            digits11 = rawText.replace(/[-\s]/g, '').slice(0, 11);
        } else {
            // Deterministically hash alphanumeric location to an 11-digit number
            let hash = 0;
            for (let i = 0; i < rawText.length; i++) {
                hash = rawText.charCodeAt(i) + ((hash << 5) - hash);
            }
            hash = Math.abs(hash);
            // Prefix with zeros to reach 11 digits
            digits11 = String(hash).padStart(11, '0').slice(-11);
        }

        // Calculate standard UPC-A Modulo-10 check digit
        let sumOdd = 0;
        let sumEven = 0;
        for (let i = 0; i < 11; i++) {
            const digit = parseInt(digits11[i]);
            if (i % 2 === 0) {
                sumOdd += digit; // 1st, 3rd, 5th... digits (0, 2, 4...)
            } else {
                sumEven += digit; // 2nd, 4th, 6th... digits (1, 3, 5...)
            }
        }
        const total = (sumOdd * 3) + sumEven;
        const checkDigit = (10 - (total % 10)) % 10;
        
        const fullUPC = digits11 + checkDigit;

        // Build binary module string (Start guard + left digits + center guard + right digits + stop guard)
        let modules = "";
        
        // Start guard (101)
        modules += "101";
        
        // Left 6 digits
        for (let i = 0; i < 6; i++) {
            modules += LEFT_PATTERNS[parseInt(fullUPC[i])];
        }
        
        // Center guard (01010)
        modules += "01010";
        
        // Right 6 digits (including the check digit)
        for (let i = 6; i < 12; i++) {
            modules += RIGHT_PATTERNS[parseInt(fullUPC[i])];
        }
        
        // Stop guard (101)
        modules += "101";

        // Total modules = 95. Add quiet zones (5 modules each side) -> total 105 modules
        const quietZone = 5;
        const totalModules = 95 + quietZone * 2;
        const rawUnitW = width / totalModules;
        
        // Enforce min 0.4px module width for scanner readability without overflowing boundaries
        const unitW = Math.max(rawUnitW, 0.4);
        const actualWidth = totalModules * unitW;
        
        // Center the barcode relative to container
        const offsetX = x + (width - actualWidth) / 2 + quietZone * unitW;

        const bars = [];
        let currX = offsetX;
        
        for (let i = 0; i < modules.length; i++) {
            if (modules[i] === "1") {
                bars.push(`<rect x="${currX.toFixed(3)}" y="${y.toFixed(3)}" width="${unitW.toFixed(3)}" height="${height.toFixed(3)}" fill="#000000" shape-rendering="crispEdges"/>`);
            }
            currX += unitW;
        }

        return {
            svg: `<g class="barcode-bars" shape-rendering="crispEdges">${bars.join('')}</g>`,
            humanReadable: fullUPC
        };
    }

    // Dynamic SVG Builder Engine
    function buildSignSVG(spaceValue, aisleOverride = null, categoryOverride = null, barcodeOverride = null) {
        const aisleVal = aisleOverride !== null ? aisleOverride : state.textAisleValue;
        const categoryVal = categoryOverride !== null ? categoryOverride : state.textCategory;
        const barcodeVal = barcodeOverride !== null ? barcodeOverride : state.textBarcodeLabel;

        // Pixel conversion factor: 1 inch = 50 virtual pixels
        const scaleFactor = 50;
        const w = state.widthInches * scaleFactor;
        const h = state.heightInches * scaleFactor;
        
        const fontUrl = `https://fonts.googleapis.com/css2?family=${state.fontStyle.replace(' ', '+')}:wght@400;600;700;800&display=swap`;

        // Format: Vertical Upright Rack Tag (Photo #1)
        if (state.signLayoutFormat === "vertical-rack") {
            const barcodeText = `${aisleVal}-${spaceValue}`;
            
            // Layout barcode vertically along the left strip (centered and shorter)
            const barcodeW = h * 0.60;
            const barcodeH = Math.max(w * 0.12, 8);
            const barcodeSVG = generateUPCASVG(barcodeText, -barcodeW / 2, -barcodeH / 2, barcodeW, barcodeH).svg;
            
            const aisleMatch = aisleVal.match(/^([A-Za-z]+)?(\d+)?$/);
            const aisleAlpha = aisleMatch ? (aisleMatch[1] || "") : "";
            const aisleNum = aisleMatch ? (aisleMatch[2] || "") : "";
            
            const accent = state.accentColor;
            
            return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" class="signage-svg-element">
    <defs>
        <style>
            @import url('${fontUrl}');
            .sign-text {
                font-family: '${state.fontStyle}', 'Outfit', sans-serif;
                text-anchor: middle;
                font-weight: 700;
            }
            .text-extra-bold { font-weight: 800; }
        </style>
    </defs>
    
    <!-- Sign Base Background (Left barcode strip is white) -->
    <rect width="${w}" height="${h}" fill="#FFFFFF" />
    
    <!-- Right side top section: Yellow Box -->
    <rect x="${w * 0.26}" y="0" width="${w * 0.74}" height="${h * 0.50}" fill="${accent}" />
    
    <!-- Right side bottom section: Red Box -->
    <rect x="${w * 0.26}" y="${h * 0.50}" width="${w * 0.74}" height="${h * 0.50}" fill="#DC2626" />
    
    <!-- Vertical Barcode on the Left -->
    <g transform="translate(${w * 0.13}, ${h / 2}) rotate(-90)">
        ${barcodeSVG}
    </g>
    
    <!-- Giant Space Number in Yellow Box -->
    <text x="${w * 0.63}" y="${h * 0.27}" fill="#0A1128" class="sign-text text-extra-bold" font-size="${w * 0.38}" dy="0.35em">${spaceValue}</text>
    
    <!-- Stacked Aisle Code in Red Box -->
    <text x="${w * 0.63}" y="${h * 0.68}" fill="#FFFFFF" class="sign-text text-extra-bold" font-size="${w * 0.22}" dy="0.35em">${aisleAlpha.toUpperCase()}</text>
    <text x="${w * 0.63}" y="${h * 0.84}" fill="#FFFFFF" class="sign-text text-extra-bold" font-size="${w * 0.22}" dy="0.35em">${aisleNum}</text>
</svg>`.trim();
        }

        // Format: Horizontal Shelf Label (Photo #2)
        if (state.signLayoutFormat === "shelf-label") {
            const barcodeText = `${aisleVal}-${spaceValue}`;
            
            const barcodeW = w * 0.65;
            const barcodeH = Math.max(h * 0.32, 14); // Thinner bar height
            const barcodeX = w * 0.175;
            const barcodeY = (h - barcodeH) / 2; // Fixed positioning
            const barcodeSVG = generateUPCASVG(barcodeText, barcodeX, barcodeY, barcodeW, barcodeH).svg;
            
            const now = new Date();
            const dateStr = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)}`;
            
            const aisleMatch = aisleVal.match(/^([A-Za-z]+)?(\d+)?$/);
            const aisleAlpha = aisleMatch ? (aisleMatch[1] || "") : "";
            const aisleNum = aisleMatch ? (aisleMatch[2] || "") : "";
            
            return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" class="signage-svg-element">
    <defs>
        <style>
            @import url('${fontUrl}');
            .sign-text {
                font-family: '${state.fontStyle}', 'Outfit', sans-serif;
                text-anchor: middle;
                font-weight: 700;
            }
            .text-bold { font-weight: 700; }
            .text-extra-bold { font-weight: 800; }
        </style>
    </defs>
    
    <!-- Sticker background -->
    <rect width="${w}" height="${h}" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" rx="2" />
    
    <!-- Top Left: Date -->
    <text x="${w * 0.05}" y="${h * 0.18}" fill="#475569" class="sign-text text-bold" font-size="${h * 0.09}" text-anchor="start" dy="0.35em">${dateStr}</text>
    
    <!-- Center: Giant Space Value -->
    <text x="${w * 0.45}" y="${h * 0.28}" fill="#0A1128" class="sign-text text-extra-bold" font-size="${h * 0.38}" text-anchor="middle" dy="0.35em">${spaceValue}</text>
    
    <!-- Right: Stacked Aisle Code -->
    <text x="${w * 0.88}" y="${h * 0.16}" fill="#0A1128" class="sign-text text-bold" font-size="${h * 0.14}" text-anchor="middle" dy="0.35em">${aisleAlpha.toUpperCase()}</text>
    <text x="${w * 0.88}" y="${h * 0.32}" fill="#0A1128" class="sign-text text-bold" font-size="${h * 0.14}" text-anchor="middle" dy="0.35em">${aisleNum}</text>
    
    <!-- Bottom Half: Scannable Location Barcode -->
    ${barcodeSVG}
</svg>`.trim();
        }

        // Format: Classic Hanging Banner
        // Individual scaling multipliers
        const scaleCategory = state.scaleCategory / 100;
        const scaleBadge = state.scaleBadge / 100;
        const scaleAisle = state.scaleAisle / 100;
        const scaleSpace = state.scaleSpace / 100;
        
        // Scale the badge circle/pill radius based on badge scale (as requested)
        const radius = w * 0.23 * scaleBadge;

        // Proportional design variables
        const topBarHeight = h * 0.035;       // Top accent yellow bar (approx 1.5" on 48")
        const dividerStroke = Math.max(2, h * 0.0015);
        // Font sizes (relative to their own specific scales)
        const catFontSize = w * 0.065 * scaleCategory;
        const labelFontSize = w * 0.055 * scaleAisle;
        const valueFontSize = w * 0.185 * scaleAisle;
        const spaceLabelFontSize = w * 0.055 * scaleSpace;
        const spaceValueFontSize = w * 0.185 * scaleSpace;
        const circleBadgeFontSize = radius * 1.15; // Proportional to scaled radius
        const pillBadgeFontSize = radius * 0.95;   // Proportional to scaled radius

        // Spark Decal SVG logic (Centered Spark size ~41px, custom scale)
        let sparkSVGHtml = "";
        let patternDef = "";
        let catTextY = h * 0.105; // Default Category Y
        const sparkScale = state.decalSparkScale / 100;
        
        if (window.WalmartSpark && state.decalSpark !== "none") {
            if (state.decalSpark === "top-header") {
                // Centered at the top (under yellow bar, above header text)
                const sparkSize = w * 0.12 * sparkScale; 
                const scale = sparkSize / 41;
                sparkSVGHtml = window.WalmartSpark.getSVGGroup(w / 2, h * 0.075, scale, state.accentColor);
                // Dynamically adjust category text Y-offset if Spark gets exceptionally large
                catTextY = h * 0.11 + Math.max(w * 0.05, sparkSize * 0.5);
            } else if (state.decalSpark === "watermark") {
                // Massive transparent watermark in background of aisle text area
                const watermarkSize = w * 0.65 * sparkScale;
                const scale = watermarkSize / 41;
                const opacity = state.watermarkOpacity / 100;
                sparkSVGHtml = `
                <g opacity="${opacity}">
                    ${window.WalmartSpark.getSVGGroup(w / 2, h * 0.48, scale, state.accentColor)}
                </g>`;
            } else if (state.decalSpark === "watermark-pattern") {
                // Tiled pattern of tiny sparks filling the background
                const patternSize = 65 * sparkScale;
                const opacity = state.watermarkOpacity / 100;
                const sparkSize = patternSize * 0.45;
                const scale = sparkSize / 41;
                const sparkGroup = window.WalmartSpark.getSVGGroup(patternSize / 2, patternSize / 2, scale, state.accentColor);
                
                patternDef = `
                <pattern id="spark-tiled-pattern-${spaceValue}" x="0" y="0" width="${patternSize}" height="${patternSize}" patternUnits="userSpaceOnUse">
                    ${sparkGroup}
                </pattern>`;
                
                sparkSVGHtml = `
                <rect width="${w}" height="${h}" fill="url(#spark-tiled-pattern-${spaceValue})" opacity="${opacity}" pointer-events="none" />`;
            }
        }

        // Divider coordinates
        const divider1Y = h * 0.305;
        const divider2Y = h * 0.525;
        const dividerWidth = w * 0.72;
        const dividerX = w / 2 - dividerWidth / 2;

        // Custom styling for theme text/fill colors
        const signBg = state.bgColor;
        const accent = state.accentColor;
        const textClr = state.textColor;
        let dividerClr = accent;
        if (state.colorTheme === "walmart-classic") {
            dividerClr = "#76B2E6";
        } else if (state.colorTheme === "walmart-garden") {
            dividerClr = "#4FB08C";
        } else if (state.colorTheme === "walmart-pharmacy") {
            dividerClr = "#4FC1C2";
        } else if (state.colorTheme === "walmart-rollback") {
            dividerClr = "#FCA5A5";
        }

        // Circular or Oval Badge Pill positioning: centered dynamically to prevent text overlap
        let badgeY = 0;
        let categoryTextHtml = "";
        if (state.toggleCategory) {
            const catTextBottom = catTextY + catFontSize * 0.5;
            badgeY = (catTextBottom + divider1Y) / 2;
            categoryTextHtml = `<text x="${w / 2}" y="${catTextY}" fill="${accent}" class="sign-text text-extra-bold" font-size="${catFontSize}" letter-spacing="0.05em" dy="0.35em">${categoryVal}</text>`;
        } else {
            // Centered between top bar and first divider
            badgeY = (topBarHeight + divider1Y) / 2;
        }
        let badgeHtml = "";
        const badgeTextLen = state.textBadge.length;
        
        if (badgeTextLen <= 2) {
            // Perfect circle for 1 or 2 letters
            badgeHtml = `
            <circle cx="${w / 2}" cy="${badgeY}" r="${radius}" fill="${accent}" />
            <text x="${w / 2}" y="${badgeY}" fill="${signBg}" class="sign-text text-extra-bold" font-size="${circleBadgeFontSize}" dy="0.32em">${state.textBadge}</text>`;
        } else {
            // Rounded pill shape for 3+ letters
            const pillWidth = Math.min(w * 0.85, radius * 2 + (badgeTextLen - 2) * (radius * 0.45));
            badgeHtml = `
            <rect x="${w / 2 - pillWidth / 2}" y="${badgeY - radius}" width="${pillWidth}" height="${radius * 2}" rx="${radius}" fill="${accent}" />
            <text x="${w / 2}" y="${badgeY}" fill="${signBg}" class="sign-text text-extra-bold" font-size="${pillBadgeFontSize}" dy="0.32em">${state.textBadge}</text>`;
        }

        // Aisle & Space coordinate adjustments
        const aisleLabelY = h * 0.355;
        const aisleValueY = h * 0.44;
        const spaceLabelY = h * 0.58;
        const spaceValueY = h * 0.67;

        // Barcode sticker area details
        let stickerBoxHtml = "";
        if (state.toggleBarcode) {
            const stickerW = w * 0.76;
            const stickerH = h * 0.085;
            const stickerX = w / 2 - stickerW / 2;
            const stickerY = h * 0.865;

            // Check if user has entered custom text or left it as default/empty
            const isDefaultOrEmpty = !barcodeVal || 
                                     barcodeVal.trim() === "" || 
                                     barcodeVal.toLowerCase() === "place feature location label here";

            if (isDefaultOrEmpty) {
                // Official Walmart location label format (matches photo #2)
                const barcodeText = `${aisleVal}-${spaceValue}`;
                
                const barcodeW = stickerW * 0.85;
                const barcodeH = stickerH * 0.32;
                const barcodeX = stickerX + (stickerW - barcodeW) / 2;
                const barcodeY = stickerY + stickerH * 0.54; // Positioned cleanly in bottom half
                
                const barcodeSVG = generateUPCASVG(barcodeText, barcodeX, barcodeY, barcodeW, barcodeH).svg;

                // Get current date formatted as MM/YY (leaving out the day as requested)
                const now = new Date();
                const dateStr = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)}`;

                // Parse Aisle alphanumeric code to stack them (e.g. "A" on top of "1")
                const aisleMatch = aisleVal.match(/^([A-Za-z]+)?(\d+)?$/);
                const aisleAlpha = aisleMatch ? (aisleMatch[1] || "") : "";
                const aisleNum = aisleMatch ? (aisleMatch[2] || "") : "";

                stickerBoxHtml = `
                <!-- Official Walmart Location Sticker Layout -->
                <g>
                    <!-- White sticker background -->
                    <rect x="${stickerX}" y="${stickerY}" width="${stickerW}" height="${stickerH}" fill="#FFFFFF" stroke="${textClr}" stroke-width="1.5" rx="3" />
                    
                    <!-- Top Left: Date (Fitted inside the box) -->
                    <text x="${stickerX + stickerW * 0.08}" y="${stickerY + stickerH * 0.22}" fill="#475569" class="sign-text text-bold" font-size="${stickerH * 0.09}" text-anchor="start" dy="0.35em">${dateStr}</text>
                    
                    <!-- Center: Giant Space Value -->
                    <text x="${stickerX + stickerW * 0.45}" y="${stickerY + stickerH * 0.28}" fill="#0A1128" class="sign-text text-extra-bold" font-size="${stickerH * 0.40}" text-anchor="middle" dy="0.35em">${spaceValue}</text>
                    
                    <!-- Right: Stacked Aisle Code -->
                    <text x="${stickerX + stickerW * 0.88}" y="${stickerY + stickerH * 0.16}" fill="#0A1128" class="sign-text text-bold" font-size="${stickerH * 0.15}" text-anchor="middle" dy="0.35em">${aisleAlpha.toUpperCase()}</text>
                    <text x="${stickerX + stickerW * 0.88}" y="${stickerY + stickerH * 0.32}" fill="#0A1128" class="sign-text text-bold" font-size="${stickerH * 0.15}" text-anchor="middle" dy="0.35em">${aisleNum}</text>
                    
                    <!-- Bottom Half: Scannable Location Barcode -->
                    ${barcodeSVG}
                </g>`;
            } else {
                // Custom barcode format with text centered below
                const barcodeW = stickerW * 0.85;
                const barcodeH = stickerH * 0.38;
                const barcodeX = stickerX + (stickerW - barcodeW) / 2;
                const barcodeY = stickerY + stickerH * 0.16;

                const barcodeData = generateUPCASVG(barcodeVal, barcodeX, barcodeY, barcodeW, barcodeH);
                const barcodeSVG = barcodeData.svg;
                const upcText = barcodeData.humanReadable;

                stickerBoxHtml = `
                <!-- Custom Barcode Sticker Layout -->
                <g>
                    <!-- White sticker background -->
                    <rect x="${stickerX}" y="${stickerY}" width="${stickerW}" height="${stickerH}" fill="#FFFFFF" stroke="${textClr}" stroke-width="1.5" rx="3" />
                    
                    <!-- UPC-A Barcode Graphics -->
                    ${barcodeSVG}
                    
                    <!-- Human-readable 12-digit label below barcode (barely visible as requested) -->
                    <text x="${w / 2}" y="${stickerY + stickerH * 0.78}" fill="#0A1128" class="sign-text text-bold" font-size="${Math.max(6, stickerH * 0.09)}" letter-spacing="0.05em" dy="0.35em" width="${stickerW * 0.95}">
                        ${upcText.slice(0, 1)} ${upcText.slice(1, 6)} ${upcText.slice(6, 11)} ${upcText.slice(11)}
                    </text>
                </g>`;
            }
        }

        // Compile standard SVG string
        const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" class="signage-svg-element">
    <defs>
        <style>
            @import url('${fontUrl}');
            .sign-text {
                font-family: '${state.fontStyle}', 'Outfit', sans-serif;
                text-anchor: middle;
                font-weight: 700;
            }
            .text-light { font-weight: 400; }
            .text-medium { font-weight: 500; }
            .text-bold { font-weight: 700; }
            .text-extra-bold { font-weight: 800; }
        </style>
        ${patternDef}
    </defs>
    
    <!-- Sign Base Background -->
    <rect width="${w}" height="${h}" fill="${signBg}" rx="2" />
    
    <!-- Top Accent Bar (Walmart Yellow) -->
    <rect width="${w}" height="${topBarHeight}" fill="${accent}" />
    
    <!-- Walmart Spark Decals -->
    ${sparkSVGHtml}
    
    <!-- Category / Zone Header -->
    ${categoryTextHtml}
    
    <!-- Circular/Oval badge initials -->
    ${badgeHtml}
    
    <!-- Divider 1 -->
    <line x1="${dividerX}" y1="${divider1Y}" x2="${dividerX + dividerWidth}" y2="${divider1Y}" stroke="${dividerClr}" stroke-width="${dividerStroke}" opacity="0.65" />
    
    <!-- AISLE Label -->
    <text x="${w / 2}" y="${aisleLabelY}" fill="${accent}" class="sign-text text-extra-bold" font-size="${labelFontSize}" letter-spacing="0.06em" dy="0.35em">${state.textAisleLabel}</text>
    
    <!-- AISLE Value -->
    <text x="${w / 2}" y="${aisleValueY}" fill="${textClr}" class="sign-text text-extra-bold" font-size="${valueFontSize}" dy="0.35em">${aisleVal}</text>
    
    <!-- Divider 2 -->
    <line x1="${dividerX}" y1="${divider2Y}" x2="${dividerX + dividerWidth}" y2="${divider2Y}" stroke="${dividerClr}" stroke-width="${dividerStroke}" opacity="0.65" />
    
    <!-- SPACE Label -->
    <text x="${w / 2}" y="${spaceLabelY}" fill="${accent}" class="sign-text text-extra-bold" font-size="${spaceLabelFontSize}" letter-spacing="0.06em" dy="0.35em">${state.textSpaceLabel}</text>
    
    <!-- SPACE Value -->
    <text x="${w / 2}" y="${spaceValueY}" fill="${textClr}" class="sign-text text-extra-bold" font-size="${spaceValueFontSize}" dy="0.35em">${spaceValue}</text>
    
    <!-- Barcode Sticker area -->
    ${stickerBoxHtml}
</svg>`;

        return svgContent.trim();
    }


    // ─────────────────────────────────────────────────────────────────────────
    // getSignConfigs: builds the array of sign config objects based on inputMode
    // ─────────────────────────────────────────────────────────────────────────
    function getSignConfigs() {
        const baseMultiplier = 1440 / state.heightInches;
        const viewWidth  = state.widthInches  * baseMultiplier * (state.zoomPercent / 100);
        const viewHeight = state.heightInches * baseMultiplier * (state.zoomPercent / 100);

        if (state.inputMode === "range") {
            const configs = [];
            const aisleStart = state.rangeAisleStart;
            const aisleEnd   = Math.min(state.rangeAisleEnd, aisleStart + 9); // cap at 10 aisles
            const spaceStart = state.rangeSpaceStart;
            const spaceEnd   = Math.min(state.rangeSpaceEnd, spaceStart + 29); // cap at 30 spaces
            for (let a = aisleStart; a <= aisleEnd; a++) {
                for (let s = spaceStart; s <= spaceEnd; s++) {
                    configs.push({ spaceValue: String(s), aisleOverride: String(a), viewWidth, viewHeight });
                }
            }
            return configs;
        }

        if (state.inputMode === "csv") {
            if (!state.csvData || state.csvData.length === 0) return [];
            return state.csvData.map(row => ({
                spaceValue:    row.space    || "",
                aisleOverride: row.aisle    || state.textAisleValue,
                categoryOverride: row.category || null,
                barcodeOverride:  row.barcode  || null,
                viewWidth,
                viewHeight
            })).filter(c => c.spaceValue.length > 0);
        }

        // Standard mode — comma-separated space values
        return state.textSpaceValues.map(sv => ({ spaceValue: sv, viewWidth, viewHeight }));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // render: rebuilds the preview area
    // ─────────────────────────────────────────────────────────────────────────
    function render() {
        updateState();
        el.previewArea.innerHTML = "";
        const configs = getSignConfigs();

        // Update sign count badge
        if (configs.length > 1) {
            el.signCountDisplay.textContent = `${configs.length} Signs`;
            el.signCountDisplay.style.display = "";
        } else {
            el.signCountDisplay.style.display = "none";
        }

        if (configs.length === 0) {
            el.previewArea.innerHTML = `<div class="loading-state"><i class="fa-solid fa-triangle-exclamation"></i> Please input space numbers.</div>`;
            return;
        }

        configs.forEach(config => {
            const container = document.createElement("div");
            container.className = "signage-svg-container";
            container.style.width = `${config.viewWidth}px`;
            container.style.height = `${config.viewHeight}px`;
            // Store physical dimensions for print CSS (1 inch = 25.4mm)
            const printW = (state.widthInches * 25.4).toFixed(1);
            const printH = (state.heightInches * 25.4).toFixed(1);
            container.style.setProperty("--print-w", `${printW}mm`);
            container.style.setProperty("--print-h", `${printH}mm`);
            container.innerHTML = buildSignSVG(
                config.spaceValue,
                config.aisleOverride    !== undefined ? config.aisleOverride    : null,
                config.categoryOverride !== undefined ? config.categoryOverride : null,
                config.barcodeOverride  !== undefined ? config.barcodeOverride  : null
            );
            el.previewArea.appendChild(container);
        });
    }

    // Export SVGs Trigger
    function exportSVGs() {
        getSignConfigs().forEach(config => {
            const svgMarkup = buildSignSVG(config.spaceValue);
            const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            const fileName = `walmart_sign_aisle_${state.textAisleValue}_space_${config.spaceValue}_${state.widthInches}x${state.heightInches}.svg`
                .toLowerCase()
                .replace(/\s+/g, "_");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Copy SVG Markup to Clipboard
    function copySVGMarkup() {
        const configs = getSignConfigs();
        if (configs.length === 0) return;
        const firstConfig = configs[0];
        const svgMarkup = buildSignSVG(firstConfig.spaceValue);

        navigator.clipboard.writeText(svgMarkup).then(() => {
            const originalText = el.btnCopyCode.innerHTML;
            el.btnCopyCode.innerHTML = `<i class="fa-solid fa-check"></i> Copied Aisle ${state.textAisleValue} Space ${firstConfig.spaceValue}!`;
            el.btnCopyCode.style.borderColor = "var(--accent-success)";
            el.btnCopyCode.style.color = "var(--accent-success)";
            
            setTimeout(() => {
                el.btnCopyCode.innerHTML = originalText;
                el.btnCopyCode.style.borderColor = "";
                el.btnCopyCode.style.color = "";
            }, 2500);
        }).catch(err => {
            console.error("Failed to copy SVG: ", err);
            alert("Failed to copy to clipboard.");
        });
    }

    // Setup input change event listeners
    const inputsToWatch = [
        el.sizePreset, el.customWidth, el.customHeight, el.signFont,
        el.textCategory, el.textBadge, el.textAisleLabel, el.textAisleValue,
        el.textSpaceLabel, el.textSpaceValues, el.colorTheme,
        el.colorBg, el.colorAccent, el.colorText, el.decalSpark,
        el.toggleCategory, el.toggleBarcode, el.textBarcodeLabel,
        el.scaleCategory, el.scaleBadge, el.scaleAisle, el.scaleSpace,
        el.decalSparkScale, el.watermarkOpacity, el.signLayoutFormat
    ];

    inputsToWatch.forEach(input => {
        input.addEventListener("input", render);
        input.addEventListener("change", render);
    });

    // Zoom range event listener
    el.zoomRange.addEventListener("input", (e) => {
        state.zoomPercent = parseInt(e.target.value) || 50;
        el.zoomValue.textContent = `${state.zoomPercent}%`;
        
        // Re-adjust sizes of preview containers without full rebuild for performance
        const containers = el.previewArea.querySelectorAll(".signage-svg-container");
        containers.forEach(container => {
            const baseMultiplier = 1440 / state.heightInches;
            const viewWidth = state.widthInches * baseMultiplier * (state.zoomPercent / 100);
            const viewHeight = state.heightInches * baseMultiplier * (state.zoomPercent / 100);
            container.style.width = `${viewWidth}px`;
            container.style.height = `${viewHeight}px`;
        });
    });

    // Action button listeners
    el.btnExportSvg.addEventListener("click", exportSVGs);
    el.btnPrint.addEventListener("click", () => window.print());
    el.btnCopyCode.addEventListener("click", copySVGMarkup);

    // CSV file upload listener
    el.csvFileInput.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            const text = evt.target.result || "";
            const rows = [];
            // Split by newlines first
            const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
            lines.forEach(line => {
                // Skip header row if it contains "space" or "aisle" (case-insensitive)
                if (/^(space|aisle|category|barcode)/i.test(line)) return;
                const cols = line.split(",").map(c => c.trim());
                // Support formats: "space" only, or "aisle,space", or "aisle,space,category,barcode"
                if (cols.length === 1) {
                    rows.push({ space: cols[0], aisle: state.textAisleValue });
                } else if (cols.length === 2) {
                    rows.push({ aisle: cols[0], space: cols[1] });
                } else if (cols.length >= 3) {
                    rows.push({ aisle: cols[0], space: cols[1], category: cols[2] || null, barcode: cols[3] || null });
                }
            });

            state.csvData = rows;

            if (rows.length === 0) {
                el.previewArea.innerHTML = `<div class="loading-state"><i class="fa-solid fa-triangle-exclamation"></i> CSV appears empty or unreadable. Expected columns: Space or Aisle, Space.</div>`;
                return;
            }
            render();
        };
        reader.onerror = function() {
            el.previewArea.innerHTML = `<div class="loading-state"><i class="fa-solid fa-triangle-exclamation"></i> Error reading CSV file.</div>`;
        };
        reader.readAsText(file);
    });

    // Also listen for input mode changes to re-trigger render
    el.inputMode.addEventListener("change", render);
    el.rangeAisleStart.addEventListener("input", render);
    el.rangeAisleEnd.addEventListener("input", render);
    el.rangeSpaceStart.addEventListener("input", render);
    el.rangeSpaceEnd.addEventListener("input", render);

    // Run initialization
    initInputs();
    render();
});
