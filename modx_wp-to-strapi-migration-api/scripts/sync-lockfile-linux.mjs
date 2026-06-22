import { spawnSync } from "node:child_process";

const cwd = process.cwd();

// Учитываем возможность запуска как на Windows, так и на Linux/macOS
let path = cwd;
if (process.platform === "win32") {
    const drive = cwd[0].toLowerCase();
    path = `/${drive}/${cwd.slice(3).replace(/\\/g, "/")}`;
}

console.log(`Synchronizing package-lock.json using node:22-alpine Docker container...`);
console.log(`Mounting directory: ${path}`);

const result = spawnSync(
    "docker", 
    ["run", "--rm", "-v", `${path}:/app`, "-w", "/app", "node:22-alpine", "sh", "-c", "npm install --no-audit --no-fund --ignore-scripts"], 
    { stdio: "inherit" }
);

if (result.error) {
    console.error("Failed to start docker process", result.error);
    process.exit(1);
}

if (result.status !== 0) {
    console.error(`Process exited with code ${result.status}`);
    process.exit(result.status);
}

console.log("Successfully synchronized package-lock.json for Linux/Docker environment!");
