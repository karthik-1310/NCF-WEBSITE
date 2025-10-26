import tkinter as tk
from tkinter import ttk, scrolledtext
import requests
import json
import os
import threading
import datetime

class APIVerificationTool:
    def __init__(self, root):
        self.root = root
        self.root.title("NCF Pocket Guide Creator API Verification Tool")
        self.root.geometry("800x600")
        
        # Configuration
        self.base_url = tk.StringVar(value="http://localhost:5000/api")
        self.admin_email = tk.StringVar(value="admin@example.com")
        self.admin_password = tk.StringVar(value="admin_password")
        self.auth_token = None
        self.results_dir = "./api_test_results"
        
        # Ensure results directory exists
        os.makedirs(self.results_dir, exist_ok=True)
        
        self.setup_ui()
        
    def setup_ui(self):
        # Create a notebook (tabs)
        notebook = ttk.Notebook(self.root)
        notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Config Tab
        config_frame = ttk.Frame(notebook)
        notebook.add(config_frame, text="Configuration")
        
        # Public API Tab
        public_frame = ttk.Frame(notebook)
        notebook.add(public_frame, text="Public APIs")
        
        # Admin API Tab
        admin_frame = ttk.Frame(notebook)
        notebook.add(admin_frame, text="Admin APIs")
        
        # Results Tab
        results_frame = ttk.Frame(notebook)
        notebook.add(results_frame, text="Results")
        
        # Set up each tab
        self.setup_config_tab(config_frame)
        self.setup_public_api_tab(public_frame)
        self.setup_admin_api_tab(admin_frame)
        self.setup_results_tab(results_frame)
        
    def setup_config_tab(self, parent):
        # Base URL configuration
        ttk.Label(parent, text="API Base URL:").grid(row=0, column=0, padx=10, pady=10, sticky=tk.W)
        ttk.Entry(parent, textvariable=self.base_url, width=50).grid(row=0, column=1, padx=10, pady=10)
        
        # Admin credentials
        ttk.Label(parent, text="Admin Email:").grid(row=1, column=0, padx=10, pady=10, sticky=tk.W)
        ttk.Entry(parent, textvariable=self.admin_email, width=50).grid(row=1, column=1, padx=10, pady=10)
        
        ttk.Label(parent, text="Admin Password:").grid(row=2, column=0, padx=10, pady=10, sticky=tk.W)
        ttk.Entry(parent, textvariable=self.admin_password, width=50, show="*").grid(row=2, column=1, padx=10, pady=10)
        
        # Login button
        ttk.Button(parent, text="Login", command=self.login).grid(row=3, column=1, padx=10, pady=10, sticky=tk.W)
        
        # Status label
        self.login_status = ttk.Label(parent, text="Not logged in")
        self.login_status.grid(row=3, column=1, padx=10, pady=10, sticky=tk.E)
        
        # Run all tests button
        ttk.Button(parent, text="Run All Tests", command=self.run_all_tests).grid(row=4, column=0, columnspan=2, padx=10, pady=20)
        
    def setup_public_api_tab(self, parent):
        # Frame for public API endpoints
        frame = ttk.LabelFrame(parent, text="Public API Endpoints")
        frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Birds by state
        row = 0
        ttk.Label(frame, text="State:").grid(row=row, column=0, padx=10, pady=5, sticky=tk.W)
        self.state_var = tk.StringVar(value="Mizoram")
        ttk.Entry(frame, textvariable=self.state_var, width=30).grid(row=row, column=1, padx=10, pady=5)
        ttk.Button(frame, text="Get Birds by State", command=lambda: self.test_get_birds_by_state()).grid(row=row, column=2, padx=10, pady=5)
        
        # Birds by district
        row += 1
        ttk.Label(frame, text="District:").grid(row=row, column=0, padx=10, pady=5, sticky=tk.W)
        self.district_var = tk.StringVar(value="Statewide")
        ttk.Entry(frame, textvariable=self.district_var, width=30).grid(row=row, column=1, padx=10, pady=5)
        ttk.Button(frame, text="Get Birds by District", command=lambda: self.test_get_birds_by_district()).grid(row=row, column=2, padx=10, pady=5)
        
        # Bird details
        row += 1
        ttk.Label(frame, text="Bird Name:").grid(row=row, column=0, padx=10, pady=5, sticky=tk.W)
        self.bird_name_var = tk.StringVar(value="American Crow")
        ttk.Entry(frame, textvariable=self.bird_name_var, width=30).grid(row=row, column=1, padx=10, pady=5)
        ttk.Button(frame, text="Get Bird Details", command=lambda: self.test_get_bird_details()).grid(row=row, column=2, padx=10, pady=5)
        
        # Guide creation
        row += 1
        ttk.Label(frame, text="Guide Title:").grid(row=row, column=0, padx=10, pady=5, sticky=tk.W)
        self.guide_title_var = tk.StringVar(value="Test Guide")
        ttk.Entry(frame, textvariable=self.guide_title_var, width=30).grid(row=row, column=1, padx=10, pady=5)
        ttk.Button(frame, text="Create Guide", command=lambda: self.test_create_guide()).grid(row=row, column=2, padx=10, pady=5)
        
        # Guide retrieval
        row += 1
        ttk.Label(frame, text="Guide ID:").grid(row=row, column=0, padx=10, pady=5, sticky=tk.W)
        self.guide_id_var = tk.StringVar()
        ttk.Entry(frame, textvariable=self.guide_id_var, width=30).grid(row=row, column=1, padx=10, pady=5)
        ttk.Button(frame, text="Get Guide", command=lambda: self.test_get_guide()).grid(row=row, column=2, padx=10, pady=5)
        
    def setup_admin_api_tab(self, parent):
        # Frame for admin API endpoints
        frame = ttk.LabelFrame(parent, text="Admin API Endpoints")
        frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # List all species
        row = 0
        ttk.Button(frame, text="List All Species", command=lambda: self.test_list_all_species()).grid(row=row, column=0, columnspan=3, padx=10, pady=5, sticky=tk.W)
        
        # Get species details
        row += 1
        ttk.Label(frame, text="Bird Name:").grid(row=row, column=0, padx=10, pady=5, sticky=tk.W)
        self.admin_bird_name_var = tk.StringVar(value="American Crow")
        ttk.Entry(frame, textvariable=self.admin_bird_name_var, width=30).grid(row=row, column=1, padx=10, pady=5)
        ttk.Button(frame, text="Get Species Details", command=lambda: self.test_get_species_details()).grid(row=row, column=2, padx=10, pady=5)
        
        # Database statistics
        row += 1
        ttk.Button(frame, text="Get Database Statistics", command=lambda: self.test_get_db_statistics()).grid(row=row, column=0, columnspan=3, padx=10, pady=5, sticky=tk.W)
        
    def setup_results_tab(self, parent):
        # Text area for results
        self.results_text = scrolledtext.ScrolledText(parent, wrap=tk.WORD)
        self.results_text.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Clear button
        ttk.Button(parent, text="Clear Results", command=self.clear_results).pack(pady=10)
        
    def login(self):
        """Attempt to login and get authentication token"""
        login_data = {
            "email": self.admin_email.get(),
            "password": self.admin_password.get()
        }
        
        try:
            response = requests.post(
                f"{self.base_url.get()}/auth/login",
                json=login_data,
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                if "token" in result:
                    self.auth_token = result["token"]
                    self.login_status.config(text="Logged in successfully")
                    self.add_to_results("✓ Admin login successful")
                    return True
                else:
                    self.login_status.config(text="Login failed: No token returned")
                    self.add_to_results("✗ Admin login failed: No token returned")
            else:
                self.login_status.config(text=f"Login failed: {response.status_code}")
                self.add_to_results(f"✗ Admin login failed: Status {response.status_code}")
        except Exception as e:
            self.login_status.config(text=f"Login error: {str(e)}")
            self.add_to_results(f"✗ Admin login error: {str(e)}")
        
        return False
        
    def add_to_results(self, message):
        """Add a message to the results text area"""
        timestamp = datetime.datetime.now().strftime("%H:%M:%S")
        self.results_text.insert(tk.END, f"[{timestamp}] {message}\n")
        self.results_text.see(tk.END)
        
    def clear_results(self):
        """Clear the results text area"""
        self.results_text.delete(1.0, tk.END)
        
    def save_response(self, endpoint, method, data):
        """Save API response to file"""
        filename = endpoint.replace("/", "_").replace("?", "_")
        if method != "GET":
            filename = f"{method}_{filename}"
            
        with open(os.path.join(self.results_dir, f"{filename}.json"), "w") as f:
            json.dump(data, f, indent=2)
            
    def make_api_call(self, method, endpoint, data=None, auth=False):
        """Make an API call and return the response"""
        url = f"{self.base_url.get()}{endpoint}"
        headers = {}
        
        if auth and self.auth_token:
            headers["Authorization"] = f"Bearer {self.auth_token}"
        
        try:
            if method == "GET":
                response = requests.get(url, headers=headers, timeout=10)
            elif method == "POST":
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                return None, f"Unsupported method: {method}"
                
            if response.status_code >= 200 and response.status_code < 300:
                result = response.json()
                self.save_response(endpoint, method, result)
                return result, None
            else:
                return None, f"Status code: {response.status_code}"
                
        except Exception as e:
            return None, str(e)
            
    # Public API Tests
    def test_get_birds_by_state(self):
        state = self.state_var.get()
        self.add_to_results(f"Testing GET /birds/grouped?state={state}")
        
        result, error = self.make_api_call("GET", f"/birds/grouped?state={state}")
        
        if error:
            self.add_to_results(f"✗ Failed: {error}")
        else:
            bird_count = sum(len(group["birds"]) for group in result["groups"]) if "groups" in result else 0
            self.add_to_results(f"✓ Success: Received {bird_count} birds in {len(result.get('groups', []))} groups")
            
    def test_get_birds_by_district(self):
        state = self.state_var.get()
        district = self.district_var.get()
        self.add_to_results(f"Testing GET /birds/grouped?state={state}&district={district}")
        
        result, error = self.make_api_call("GET", f"/birds/grouped?state={state}&district={district}")
        
        if error:
            self.add_to_results(f"✗ Failed: {error}")
        else:
            bird_count = sum(len(group["birds"]) for group in result["groups"]) if "groups" in result else 0
            self.add_to_results(f"✓ Success: Received {bird_count} birds in {len(result.get('groups', []))} groups")
            
    def test_get_bird_details(self):
        bird_name = self.bird_name_var.get()
        self.add_to_results(f"Testing GET /birds/{bird_name}")
        
        result, error = self.make_api_call("GET", f"/birds/{bird_name}")
        
        if error:
            self.add_to_results(f"✗ Failed: {error}")
        else:
            self.add_to_results(f"✓ Success: Received details for {result.get('english_name', 'unknown bird')}")
            
    def test_create_guide(self):
        title = self.guide_title_var.get()
        state = self.state_var.get()
        district = self.district_var.get()
        bird_name = self.bird_name_var.get()
        
        guide_data = {
            "title": title,
            "state": state,
            "district": district,
            "birds": [bird_name],
            "includeScientificNames": True
        }
        
        self.add_to_results(f"Testing POST /guides/create")
        
        result, error = self.make_api_call("POST", "/guides/create", guide_data)
        
        if error:
            self.add_to_results(f"✗ Failed: {error}")
        else:
            guide_id = result.get("guide_id")
            if guide_id:
                self.guide_id_var.set(guide_id)
                self.add_to_results(f"✓ Success: Created guide with ID {guide_id}")
            else:
                self.add_to_results("✗ Failed: No guide ID returned")
                
    def test_get_guide(self):
        guide_id = self.guide_id_var.get()
        if not guide_id:
            self.add_to_results("✗ Cannot get guide: No guide ID provided")
            return
            
        self.add_to_results(f"Testing GET /guides/{guide_id}")
        
        result, error = self.make_api_call("GET", f"/guides/{guide_id}")
        
        if error:
            self.add_to_results(f"✗ Failed: {error}")
        else:
            self.add_to_results(f"✓ Success: Retrieved guide '{result.get('title', 'unknown')}'")
            
    # Admin API Tests
    def test_list_all_species(self):
        if not self.auth_token:
            self.add_to_results("✗ Cannot list species: Not logged in")
            return
            
        self.add_to_results("Testing GET /admin/species")
        
        result, error = self.make_api_call("GET", "/admin/species", auth=True)
        
        if error:
            self.add_to_results(f"✗ Failed: {error}")
        else:
            species_count = len(result.get("species", []))
            self.add_to_results(f"✓ Success: Retrieved {species_count} species")
            
    def test_get_species_details(self):
        if not self.auth_token:
            self.add_to_results("✗ Cannot get species details: Not logged in")
            return
            
        bird_name = self.admin_bird_name_var.get()
        self.add_to_results(f"Testing GET /admin/species/{bird_name}")
        
        result, error = self.make_api_call("GET", f"/admin/species/{bird_name}", auth=True)
        
        if error:
            self.add_to_results(f"✗ Failed: {error}")
        else:
            self.add_to_results(f"✓ Success: Retrieved details for {result.get('english_name', 'unknown bird')}")
            
    def test_get_db_statistics(self):
        if not self.auth_token:
            self.add_to_results("✗ Cannot get statistics: Not logged in")
            return
            
        self.add_to_results("Testing GET /admin/statistics")
        
        result, error = self.make_api_call("GET", "/admin/statistics", auth=True)
        
        if error:
            self.add_to_results(f"✗ Failed: {error}")
        else:
            self.add_to_results("✓ Success: Retrieved database statistics")
            stats = result.get("statistics", {})
            for key, value in stats.items():
                self.add_to_results(f"  - {key}: {value}")
                
    def run_all_tests(self):
        """Run all API tests in sequence"""
        self.add_to_results("Starting full API verification...")
        
        # Run in a separate thread to keep UI responsive
        threading.Thread(target=self._run_all_tests_thread, daemon=True).start()
        
    def _run_all_tests_thread(self):
        # Public APIs
        self.test_get_birds_by_state()
        self.test_get_birds_by_district()
        self.test_get_bird_details()
        self.test_create_guide()
        
        # If we got a guide ID, test retrieval
        if self.guide_id_var.get():
            self.test_get_guide()
        
        # Try to login if not already logged in
        if not self.auth_token:
            self.login()
            
        # Admin APIs if logged in
        if self.auth_token:
            self.test_list_all_species()
            self.test_get_species_details()
            self.test_get_db_statistics()
            
        self.add_to_results("API verification complete!")
        
if __name__ == "__main__":
    root = tk.Tk()
    app = APIVerificationTool(root)
    root.mainloop()
