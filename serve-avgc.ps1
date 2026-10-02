# Light-weight Local Web Server for AVGC 3D Architectural Visualizer
# Serves the 25,000 m² AVGC Campus 3D Model at http://localhost:8090/

$port = 8090
$url = "http://localhost:$port/"
$baseDir = Join-Path $PSScriptRoot "avgc-3d"

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".svg"   = "image/svg+xml"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".obj"   = "text/plain"
    ".gltf"  = "model/gltf+json"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  AVGC CENTER OF EXCELLENCE - 25,000 m² MASTERPLAN" -ForegroundColor Yellow
    Write-Host "  3D Architectural Visualizer Server Running at:" -ForegroundColor Cyan
    Write-Host "  $url" -ForegroundColor White
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  Press Ctrl+C in this terminal to stop the server." -ForegroundColor Gray

    # Launch in default browser
    Start-Process $url

    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $relPath = $request.Url.LocalPath.TrimStart('/')
            if ([string]::IsNullOrEmpty($relPath)) { $relPath = "index.html" }
            $filePath = Join-Path $baseDir $relPath

            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                $response.ContentType = $mime
                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $response.Headers.Add("Cache-Control", "no-cache")
                
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
            $response.Close()
        } catch {
            # Continue listening on socket errors
        }
    }
} finally {
    $listener.Stop()
}
