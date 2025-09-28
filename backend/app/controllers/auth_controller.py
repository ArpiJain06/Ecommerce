from ..database import user_collection
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def login(login_input: str, password: str):
    logger.info(f"Login attempt: login_input={login_input}, password={password}")  # Debug input

    # Query by username or email
    user = await user_collection.find_one({
        "$or": [{"username": login_input}, {"email": login_input}]
    })
    
    if not user:
        logger.info("User not found")
        return None

    logger.info(f"Found user: {user}")

    if user['password'] != password:
        logger.info("Password mismatch")
        return None

    logger.info("Login successful")
    return {"username": user["username"], "role": user["role"], "id": str(user["_id"])}
