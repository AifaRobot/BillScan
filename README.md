## 🧾 BillScan

**BillScan** is a full-stack application designed to extract data from bill images.

## 📂 Project Structure

The application contains three main folders:

- **Frontend**: A React + Vite application where the image is uploaded to the backend.
- **Backend**: A FastAPI-based API that receives the image, extracts the relevant information, and returns it.
- **Ollama**: Contains the Qwen2.5VL:7B model used for image understanding.

## ⚙️ Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- Graphics Processing Unit (**GPU**) support

## 📦 Installation & Usage

> ⚠️ **Important**: You must configure Docker to use the GPU.  
> The `qwen2.5vl:7b` model is resource-intensive and will not run efficiently on CPU only.

Run the following commands in **PowerShell** (or your terminal of choice):

### Build the containers

```bash
docker-compose build
```

Downloads the dependencies and builds the images.

### Start the project

```bash
docker-compose up
```

Open http://localhost:5173 in your browser to use the application.

### Shut down the project

```bash
docker-compose down
```

## 🧠 Model Configuration

This project requires a **vision-language (VL) model** that can process images and generate structured text output.

We use the Ollama model `qwen2.5vl:7b`.

#### Install qwen2.5vl:7b model in Ollama

1. First, check the running containers:

   ```bash
   docker-compose ps
   ```

   You will see the container ID while the Ollama container is running.

2. Copy the Ollama container ID and pull the model:

   ```bash
   docker-compose exec <OLLAMA_CONTAINER_ID> ollama pull qwen2.5vl:7b
   ```

   Once the model is downloaded, Ollama will be ready to use.

## 📄 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it.

## 🔗 Useful Links

- [FastAPI](https://fastapi.tiangolo.com/)
- [LangChain](https://www.langchain.com/)
- [React](https://react.dev/)
- [Vite](https://vite.dev/guide/)
