# Pull base image.
FROM python:2.7

# Define working directory.
WORKDIR /app

# Set instructions on build.
ADD requirements.txt /app/
RUN pip install -r requirements.txt
ADD code/ /app/code/

ENV PORT 5000
ENV APP_NAME V24Labs


