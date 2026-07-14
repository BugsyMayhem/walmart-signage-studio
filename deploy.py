import os
import json
import urllib.request

def merge_and_deploy():
    project_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Read files
    with open(os.path.join(project_dir, "index.html"), "r", encoding="utf-8") as f:
        html = f.read()
        
    with open(os.path.join(project_dir, "index.css"), "r", encoding="utf-8") as f:
        css = f.read()
        
    with open(os.path.join(project_dir, "logo-spark.js"), "r", encoding="utf-8") as f:
        spark_js = f.read()
        
    with open(os.path.join(project_dir, "app.js"), "r", encoding="utf-8") as f:
        app_js = f.read()
        
    # Merge styles
    html = html.replace('<link rel="stylesheet" href="index.css">', f"<style>\n{css}\n</style>")
    
    # Merge scripts
    html = html.replace('<script src="logo-spark.js"></script>', f"<script>\n{spark_js}\n</script>")
    html = html.replace('<script src="app.js"></script>', f"<script>\n{app_js}\n</script>")
    
    # Ensure dist folder exists
    dist_dir = os.path.join(project_dir, "dist")
    os.makedirs(dist_dir, exist_ok=True)
    
    merged_path = os.path.join(dist_dir, "index.html")
    with open(merged_path, "w", encoding="utf-8") as f:
        f.write(html)
        
    print(f"Successfully generated single-file bundle at: {merged_path}")
    
    # Deploy via GitHub Gist
    print("Uploading to GitHub Gist for public hosting...")
    gist_data = {
        "description": "Walmart Retail Signage Creator & Visualizer (Live Online)",
        "public": True,
        "files": {
            "index.html": {
                "content": html
            }
        }
    }
    
    req = urllib.request.Request(
        "https://api.github.com/gists",
        data=json.dumps(gist_data).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) WalmartSignageStudio/1.0"
        }
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode("utf-8"))
            raw_url = res["files"]["index.html"]["raw_url"]
            # Convert raw URL to raw.githack.com for live execution
            githack_url = raw_url.replace("gist.githubusercontent.com", "raw.githack.com")
            print(f"\nDEPLOY_SUCCESS: {githack_url}")
    except Exception as e:
        print(f"\nDEPLOY_FAILED: {e}")

if __name__ == "__main__":
    merge_and_deploy()
