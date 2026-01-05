# Use official Python 3.10 slim image
FROM python:3.10-slim

# Set working directory to /app
WORKDIR /app

# Copy requirements (relative to backend/ folder)
COPY requirements.txt requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents (backend code) into /app
COPY . .

# Set permissions for Hugging Face (User 1000)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
	PATH=/home/user/.local/bin:$PATH

# Expose port 7860
EXPOSE 7860

# Run uvicorn (module is main:app since we are inside the folder)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
