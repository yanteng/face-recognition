import * as cv from 'opencv4nodejs';
import * as fs from 'fs';

function drawDetection(image: cv.Mat, rects: cv.Rect[]): cv.Mat {
  if (!image || image.empty || !rects || !rects.length) {
    return image;
  }
  const resultImage = new cv.Mat(image.rows, image.cols, image.type);
  image.copyTo(resultImage);
  if (resultImage.channels === 1) {
    resultImage.cvtColor(cv.COLOR_GRAY2RGB);
  }
  rects.forEach((react) => {
    cv.drawDetection(resultImage, react);
  });
  return resultImage;
}

type LabelDB = {
  label: number;
  faceImage: cv.Mat;
  faceName: string;
};

class LabelManager {
  db: LabelDB[];

  constructor() {
    this.db = [];
  }

  getName(label: number): string {
    const item = this.db.find((data) => data.label === label);
    if (item) {
      return item.faceName;
    }
    return '';
  }

  getLabels(): number[] {
    return this.db.map((data) => data.label);
  }

  getFaceImages(): cv.Mat[] {
    return this.db.map((data) => data.faceImage);
  }

  addLabel(faceImage: cv.Mat, name: string): void {
    this.db.push({
      label: this.db.length,
      faceName: name,
      faceImage,
    });
  }

  save(filepath: string): void {
    const labelNames = this.db.map((data) => ({
      faceName: data.faceName,
      label: data.label,
    }));
    fs.writeFileSync(filepath, JSON.stringify(labelNames));
  }
}

export { drawDetection, LabelManager };
