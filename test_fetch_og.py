import urllib.request
import io
from PIL import Image

def test_fetch():
    target_urls = [
        "http://localhost:8080/og-image.jpg",
        "http://localhost:8080/assets/images/og-image.jpg"
    ]
    
    user_agents = {
        "WhatsApp Scraper": "WhatsApp/2.21.12.21 i",
        "Facebook External Hit": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        "Twitterbot": "Twitterbot/1.0",
        "Standard Browser": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    
    all_passed = True

    for url in target_urls:
        print(f"\n==========================================")
        print(f"Testing Fetch for: {url}")
        print(f"==========================================")
        
        for name, ua in user_agents.items():
            req = urllib.request.Request(url, headers={"User-Agent": ua})
            try:
                with urllib.request.urlopen(req, timeout=5) as response:
                    status = response.status
                    content_type = response.headers.get("Content-Type")
                    content_length = int(response.headers.get("Content-Length", 0))
                    data = response.read()
                    
                    # Verify with PIL
                    img = Image.open(io.BytesIO(data))
                    w, h = img.size
                    fmt = img.format
                    
                    print(f"[{name}] -> Status: {status} | Type: {content_type} | Size: {content_length/1024:.1f} KB | Dimensions: {w}x{h} ({fmt})")
                    
                    if status != 200 or w != 1200 or h != 630 or fmt != "JPEG":
                        print(f"  [FAIL] Issues detected for {name}")
                        all_passed = False
            except Exception as e:
                print(f"  [ERROR] {name}: {e}")
                all_passed = False

    if all_passed:
        print("\n[SUCCESS] All social scrapers successfully fetched og-image.jpg with 1200x630 JPEG dimensions!")
    else:
        print("\n[FAIL] Some tests failed.")

if __name__ == "__main__":
    test_fetch()
