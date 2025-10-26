import requests
import json

def simple_test():
    """Simple test to see the actual data structure"""
    
    try:
        response = requests.get("http://localhost:5000/api/birds/grouped?state=Mizoram")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API Working! Found {len(data)} bird types")
            
            # Show structure
            for bird_type, birds in data.items():
                print(f"\n🦅 {bird_type}: {len(birds)} species")
                if birds:
                    first_bird = birds[0]
                    print(f"Sample bird keys: {list(first_bird.keys())}")
                    print(f"Sample: {first_bird.get('english_name', 'No name')}")
        else:
            print(f"❌ API Error: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    simple_test()
