from http.server import BaseHTTPRequestHandler, HTTPServer

class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

    def do_GET(self):
        if self.path == "/alert":
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            alert_html = '''<div class="alert success">
    <div>
        <p><strong>Success!</strong> The operation completed successfully.</p>
    </div>
</div>'''
            self.wfile.write(alert_html.encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == "/save":
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            # Works for both button and form examples (innerHTML swap)
            self.wfile.write(b"Saved successfully!")
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    print("Mock server running on http://localhost:8001")
    HTTPServer(("localhost", 8001), Handler).serve_forever()
