from ultralytics import YOLO
import cv2

# Carrega modelo pré-treinado leve
model = YOLO("yolov8n.pt")  # 'n' de nano (leve e rápido)

# Lê a imagem (precisa ter uma chamada teste.jpg na mesma pasta)
img = cv2.imread("teste.jpg")

# Faz a predição
results = model(img)

# Mostra o resultado
results[0].show()