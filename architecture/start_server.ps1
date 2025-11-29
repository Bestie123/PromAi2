$port = 8000
$path = Get-Location
Write-Host "Starting HTTP server on port $port" -ForegroundColor Green
Write-Host "Open: http://localhost:$port/architecture_full_complete.html" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop" -ForegroundColor Red

try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") { $localPath = "/architecture_full_complete.html" }
        
        $filePath = Join-Path $path $localPath.TrimStart('/')
        
        if (Test-Path $filePath) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            
            if ($filePath.EndsWith('.html')) { $response.ContentType = 'text/html' }
            elseif ($filePath.EndsWith('.json')) { $response.ContentType = 'application/json' }
            elseif ($filePath.EndsWith('.js')) { $response.ContentType = 'text/javascript' }
            
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
        }
        
        $response.Close()
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
} finally {
    if ($listener) { $listener.Stop() }
}