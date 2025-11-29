$port = 3000
Write-Host "Starting server on http://localhost:$port" -ForegroundColor Green

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Open: http://localhost:$port/architecture_full_complete.html" -ForegroundColor Yellow

while ($true) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $file = $request.Url.LocalPath.TrimStart('/')
    if (!$file) { $file = "architecture_full_complete.html" }
    
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
        $response.ContentLength64 = $bytes.Length
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    
    $response.Close()
}