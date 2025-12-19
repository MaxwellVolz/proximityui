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
        elif self.path == "/card":
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            card_html = '''<div class="card elevated">
    <div class="card-header">
        <h3 class="card-title">Dynamic Content</h3>
    </div>
    <div class="card-body">
        <p>This card was loaded dynamically via HTMX from the mock server.</p>
        <p>You can use this pattern to load card content on-demand, reducing initial page load time.</p>
    </div>
    <div class="card-footer">
        <button class="btn primary">Take Action</button>
        <button class="btn">Dismiss</button>
    </div>
</div>'''
            self.wfile.write(card_html.encode())
        elif self.path == "/modal":
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            modal_html = '''<div class="modal" id="modal-htmx" open>
    <div class="modal-backdrop"></div>
    <div class="modal-content">
        <div class="modal-header">
            <h2 class="modal-title">Dynamically Loaded Modal</h2>
            <button class="modal-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>This modal was loaded dynamically via HTMX from the mock server.</p>
            <p>The proximity.js script automatically initializes it with keyboard handling, focus trapping, and click-outside detection.</p>
        </div>
        <div class="modal-footer">
            <button class="btn primary">Confirm</button>
            <button class="btn" data-modal-close>Cancel</button>
        </div>
    </div>
</div>'''
            self.wfile.write(modal_html.encode())
        elif self.path == "/tab-content":
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            content = '''<div>
    <h3>Dynamically Loaded Content</h3>
    <p>This content was loaded via HTMX when you clicked the tab.</p>
    <p>The JavaScript handles showing and hiding the panel, while HTMX fetches the content on the first click.</p>
    <p>This pattern is useful for lazy-loading tab content that might be expensive to render upfront.</p>
</div>'''
            self.wfile.write(content.encode())
        elif self.path == "/toast-trigger":
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Expose-Headers", "X-Toast-Message, X-Toast-Type, X-Toast-Duration")
            self.send_header("X-Toast-Message", "Operation completed successfully!")
            self.send_header("X-Toast-Type", "success")
            self.send_header("X-Toast-Duration", "5000")
            self.end_headers()
            self.wfile.write(b'<p style="color: var(--color-success);">&#10003; Server response received</p>')
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
