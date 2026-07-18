# Simple PowerShell Static File Web Server for Windows
$port = 8000
$root = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try {
    $listener.Start()
    Write-Output "PowerShell Web Server started on http://localhost:$port/"
} catch {
    Write-Error "Failed to start listener on port $port. Check if port is already in use."
    exit 1
}

# Keep serving requests
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }

        # Clean up path to prevent directory traversal
        $urlPath = $urlPath.Replace("..", "")
        $filePath = Join-Path $root $urlPath

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Set correct content type
            if ($filePath -like "*.html") { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($filePath -like "*.css") { $response.ContentType = "text/css; charset=utf-8" }
            elseif ($filePath -like "*.js") { $response.ContentType = "application/javascript; charset=utf-8" }
            elseif ($filePath -like "*.svg") { $response.ContentType = "image/svg+xml; charset=utf-8" }
            elseif ($filePath -like "*.png") { $response.ContentType = "image/png" }
            elseif ($filePath -like "*.woff") { $response.ContentType = "font/woff" }
            elseif ($filePath -like "*.woff2") { $response.ContentType = "font/woff2" }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
    } catch {
        # Catch connection aborts and keep server alive
        Write-Output "Request processing error: $_"
    } finally {
        if ($null -ne $response) {
            try { $response.OutputStream.Close() } catch {}
        }
    }
}
