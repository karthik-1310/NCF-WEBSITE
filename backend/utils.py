def convert_google_drive_link(url):
    """Convert Google Drive view URL to a direct download URL"""
    # Handle non-string inputs
    if not url:
        return ""
    try:
        url = str(url)
    except:
        return ""
        
    if 'drive.google.com' not in url:
        return url
    
    # Extract the file ID from various Google Drive URL formats
    file_id = None
    
    # Format: https://drive.google.com/file/d/{FILE_ID}/view
    if '/file/d/' in url:
        start_idx = url.find('/file/d/') + 9
        end_idx = url.find('/', start_idx)
        if end_idx > start_idx:
            file_id = url[start_idx:end_idx]
    
    # Format: https://drive.google.com/open?id={FILE_ID}
    elif 'open?id=' in url:
        start_idx = url.find('open?id=') + 8
        end_idx = url.find('&', start_idx)
        if end_idx == -1:  # No additional parameters
            file_id = url[start_idx:]
        else:
            file_id = url[start_idx:end_idx]
    
    # Format: https://drive.google.com/uc?id={FILE_ID}
    elif 'uc?id=' in url:
        start_idx = url.find('uc?id=') + 6
        end_idx = url.find('&', start_idx)
        if end_idx == -1:  # No additional parameters
            file_id = url[start_idx:]
        else:
            file_id = url[start_idx:end_idx]
    
    if file_id:
        # Return direct download link
        return f"https://drive.google.com/uc?export=view&id={file_id}"
    
    # If we can't parse it, return the original URL
    return url
