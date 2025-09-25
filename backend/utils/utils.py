import base64

# Function used to encode the invoice image into base64 so it can be transmitted to the 
# API. The model itself does not process base64 directly, but the API decodes it back 
# into an image before feeding it into Qwen-VL 2.5
def encode_image_as_data_url(image_bytes: bytes, mime_type: str = "image/jpeg") -> str:
    image_b64 = base64.b64encode(image_bytes).decode("utf-8")
    return f"data:{mime_type};base64,{image_b64}"
