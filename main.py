from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (adjust in production)
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for user input
class UserMessage(BaseModel):
    message: str

# Root endpoint to check if backend is running
@app.get("/")
def root():
    return {"message": "Backend is running!"}

# Chat endpoint to handle user messages
@app.post("/chat/")
async def chat(user_message: UserMessage):
    user_input = user_message.message
    response = generate_response(user_input)
    return {"response": response}

# Simple response generator (Replace with AI logic if needed)
def generate_response(user_input: str) -> str:
    if "hello" in user_input.lower():
        return "Hi there! How can I assist you today?"
    return "I'm still learning. Could you ask something else?"