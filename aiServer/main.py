from fastapi import FastAPI, File, UploadFile
import cv2
import numpy as np
from PIL import Image
import io
import torch
import torchvision.models as models
from torchvision import transforms
import logging
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 origin을 허용합니다
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# 로깅 설정
logging.basicConfig(level=logging.INFO)

class ImageClassifier:
    def __init__(self, model_path):
        # 모델 로드
        self.model = models.resnet50(pretrained=False)
        num_ftrs = self.model.fc.in_features
        self.model.fc = torch.nn.Linear(num_ftrs, 1)
        self.model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
        self.model.eval()

        # 전처리 함수
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])

    def adjust_hls(self, hls_image, lightness_scale=1.0, saturation_scale=1.0):
        h, l, s = cv2.split(hls_image)
        l = np.clip(l * lightness_scale, 0, 255).astype(np.uint8)
        s = np.clip(s * saturation_scale, 0, 255).astype(np.uint8)
        adjusted_hls = cv2.merge([h, l, s])
        return adjusted_hls

    def preprocess_image(self, image_bytes):
        try:
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            image_array = np.array(image)[:, :, ::-1]
            hls_image = cv2.cvtColor(image_array, cv2.COLOR_BGR2HLS)
            adjusted_hls_image = self.adjust_hls(hls_image, lightness_scale=1.2, saturation_scale=0.9)
            normalized_image = adjusted_hls_image / 255.0
            image = Image.fromarray((normalized_image * 255).astype(np.uint8))
            image = self.transform(image)
            return image.unsqueeze(0)
        except Exception as e:
            logging.error(f"이미지 전처리 중 오류 발생: {e}")
            raise

    def classify_image(self, input_tensor):
        try:
            with torch.no_grad():
                outputs = self.model(input_tensor)
                preds = torch.sigmoid(outputs) >= 0.5

            if preds.item():
                return "합성입니다."
            else:
                return "합성이 아닙니다."
        except Exception as e:
            logging.error(f"이미지 분류 중 오류 발생: {e}")
            raise

classifier = ImageClassifier('./resnet50_binary_classification_model.pth')

@app.post("/classify")
async def classify(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        input_tensor = classifier.preprocess_image(image_bytes)
        result = classifier.classify_image(input_tensor)
        return {"result": result}
    except FileNotFoundError as e:
        logging.error(f"모델 파일 로드 중 오류 발생: {e}")
        return {"error": "모델 파일을 찾을 수 없습니다."}
    except Exception as e:
        logging.error(f"파일 업로드 또는 처리 중 오류 발생: {e}")
        return {"error": "파일 처리 중 오류가 발생했습니다."}
