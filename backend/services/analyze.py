from fastapi import UploadFile
from langchain_core.messages import SystemMessage, HumanMessage
from models.bill_model import Bill
from utils.utils import encode_image_as_data_url
from langchain_ollama import ChatOllama

# Load vision-capable model
model = ChatOllama(model="qwen2.5vl:7b", base_url="http://ollama:11434")

# Provides the image to the qwen2.5vl:7b model. 
# The model analyzes the image and returns the extracted fields as a Bill instance.
async def analyze_image(image: UploadFile) -> Bill:

    # Read the uploaded image as bytes
    image_bytes = await image.read()

    # Convert the image bytes into a Base64 data URL
    # (required because the model processes only text/base64, not binary data).
    image_data_url = encode_image_as_data_url(image_bytes) 

    # Define the system message: model's role and extraction instructions
    system_message = SystemMessage(
        content=(
            "Specifically extracts: Cliente (8-digit number), N° de medidor (9-digit number), "
            "2° Vencimiento (Date in xx/xx/xxxx format) y Total (Number with $ sign located below 2° Vencimiento field)."
        )
    )

    # Define the human message containing the image input
    human_message = HumanMessage(
        content=[{"type": "image_url", "image_url": {"url": image_data_url}}]
    )

    messages = [system_message, human_message]

    # Wrap the model so its output is mapped directly to a Bill instance
    model_with_structure = model.with_structured_output(Bill)

    # Send messages to the model and return the extracted fields as a Bill object
    return model_with_structure.invoke(messages)