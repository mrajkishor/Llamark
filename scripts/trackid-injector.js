const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const j = require("jscodeshift");

// Check if `ollama` CLI is available in the system
function isOllamaInstalled() {
    const result = spawnSync("ollama", ["--version"], { encoding: "utf-8" });
    return result.status === 0;
}

// Generate a fallback track ID like "autoTrack-ab12cd"
function generateFallbackTrackId() {
    return `autoTrack-${Math.random().toString(36).substring(2, 8)}`;
}

// Get AI-generated trackid using Ollama + CodeLlama
function getTrackIdFromAI(jsxSnippet) {
    if (!isOllamaInstalled()) {
        console.warn("⚠️ Ollama is not installed. Skipping AI tagging.");
        return null;
    }

    const result = spawnSync("ollama", ["run", "codellama"], {
        input: `Suggest a short, camelCase data-trackid for:\n${jsxSnippet}\nOnly return the ID.`,
        encoding: "utf-8"
    });

    if (result.error) {
        console.error("❌ Ollama execution failed:", result.error);
        return null;
    }

    let raw = result.stdout.trim().split('\n').pop() || '';

    // Extract quoted or raw word
    const match = raw.match(/"([^"]+)"/) || raw.match(/'([^']+)'/);
    let cleaned = match ? match[1] : raw;

    cleaned = cleaned
        .replace(/Tracking ID.*?:/gi, '')
        .replace(/[^a-zA-Z0-9_-]/g, '')  // Remove non-alphanum
        .replace(/\.+$/, '')             // Remove trailing periods
        .trim();

    return cleaned;
}

// Inject AI/fallback trackids into JSX elements
function processFile(filePath) {
    const source = fs.readFileSync(filePath, "utf-8");
    const root = j(source);

    let modified = false;

    root.find(j.JSXElement).forEach(path => {
        const el = path.node;

        const alreadyTracked = el.openingElement.attributes.some(
            attr => attr.name?.name === "data-trackid"
        );
        if (alreadyTracked) return;

        if (el.openingElement.name.type === 'JSXFragment') return;

        // Extract readable context for AI
        let textContent = "";
        el.children.forEach(child => {
            if (child.type === "JSXText") {
                textContent += child.value.trim() + " ";
            }
        });

        const jsxSnippet = j(path).toSource();
        const context = textContent.trim() || jsxSnippet;

        console.log(`🧠 Asking AI for: ${context}`);

        let aiTrackId = getTrackIdFromAI(context);

        if (!aiTrackId || aiTrackId.length === 0 || aiTrackId.length > 100) {
            console.warn(`⚠️ Invalid AI response. Using fallback.`);
            aiTrackId = generateFallbackTrackId();
        }

        el.openingElement.attributes.push(
            j.jsxAttribute(j.jsxIdentifier("data-trackid"), j.literal(aiTrackId))
        );
        modified = true;

        console.log(`✅ Injected data-trackid="${aiTrackId}"`);
    });

    if (modified) {
        const output = root.toSource();
        fs.writeFileSync(filePath, output, "utf-8");
        console.log(`💾 File updated: ${filePath}`);
    } else {
        console.log(`ℹ️ No changes made to: ${filePath}`);
    }
}

// Entry point
const changedFiles = process.argv.slice(2);
if (!changedFiles.length) {
    console.log("No files passed.");
    process.exit(0);
}

changedFiles.forEach(f => processFile(f));
