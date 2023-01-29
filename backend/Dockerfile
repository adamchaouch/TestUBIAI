# Use an official Python image as the base image
FROM python:3

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt .

# Install required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Run the command to start the Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]