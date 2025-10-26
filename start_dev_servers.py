#!/usr/bin/env python
import subprocess
import os
import sys
import time
import signal
import webbrowser

# Define colors for console output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def print_colored(text, color):
    """Print colored text to console"""
    print(f"{color}{text}{Colors.ENDC}")

def run_command(command, cwd=None):
    """Run a command in a subprocess"""
    return subprocess.Popen(
        command,
        shell=True,
        cwd=cwd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        universal_newlines=True,
        bufsize=1
    )

def main():
    # Get the script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define paths
    backend_dir = os.path.join(script_dir, 'backend')
    frontend_dir = os.path.join(script_dir, 'frontend')
    
    # Check if directories exist
    if not os.path.exists(backend_dir):
        print_colored(f"Error: Backend directory not found at {backend_dir}", Colors.FAIL)
        return 1
    
    if not os.path.exists(frontend_dir):
        print_colored(f"Error: Frontend directory not found at {frontend_dir}", Colors.FAIL)
        return 1
    
    # Check if package.json exists in frontend directory
    if not os.path.exists(os.path.join(frontend_dir, 'package.json')):
        print_colored("Error: package.json not found in frontend directory", Colors.FAIL)
        print_colored("Please run 'npm install' in the frontend directory first", Colors.FAIL)
        return 1
    
    # Check if app.py exists in backend directory
    if not os.path.exists(os.path.join(backend_dir, 'app.py')):
        print_colored("Error: app.py not found in backend directory", Colors.FAIL)
        return 1
    
    print_colored("Starting NCF Pocket Guide Creator...", Colors.HEADER)
    print_colored("Press Ctrl+C to stop both servers", Colors.BOLD)
    
    # Start backend server
    print_colored("\nStarting backend server...", Colors.OKBLUE)
    backend_process = run_command("python app.py", cwd=backend_dir)
    
    # Give backend time to start
    time.sleep(2)
    
    # Start frontend server
    print_colored("\nStarting frontend development server...", Colors.OKBLUE)
    frontend_process = run_command("npm start", cwd=frontend_dir)
    
    # Open browser after a delay
    time.sleep(5)
    print_colored("\nOpening application in browser...", Colors.OKGREEN)
    webbrowser.open('http://localhost:3000')
    
    try:
        # Monitor processes and forward output
        while True:
            backend_output = backend_process.stdout.readline()
            if backend_output:
                print(f"{Colors.OKBLUE}[Backend]{Colors.ENDC} {backend_output.strip()}")
            
            frontend_output = frontend_process.stdout.readline()
            if frontend_output:
                print(f"{Colors.OKGREEN}[Frontend]{Colors.ENDC} {frontend_output.strip()}")
            
            # Check if processes are still running
            if backend_process.poll() is not None and frontend_process.poll() is not None:
                break
            
            time.sleep(0.1)
    except KeyboardInterrupt:
        print_colored("\nShutting down servers...", Colors.WARNING)
        
        # Terminate processes
        if backend_process.poll() is None:
            backend_process.terminate()
        
        if frontend_process.poll() is None:
            frontend_process.terminate()
        
        print_colored("Servers stopped", Colors.OKGREEN)
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
