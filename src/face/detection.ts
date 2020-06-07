import * as cv from 'opencv4nodejs';

enum DetectionAlgorithm {
  HAAR_CASCADE,
  DNN,
}

function assertUnreachable(): never {
  throw new Error("Didn't expect to get here");
}

interface Detection {
  init(params: Record<string, unknown>): void;
  detect(image: cv.Mat): cv.Rect[];
}

class CascadeClassifierDetection implements Detection {
  classifier: cv.CascadeClassifier | undefined;
  init(params: Record<string, any>): void {
    this.classifier = new cv.CascadeClassifier(params['model']);
  }
  detect(image: cv.Mat): cv.Rect[] {
    if (!this.classifier) {
      throw new Error('init should be called but not');
    }
    let grayImg = image;
    if (image.channels === 3) {
      grayImg = image.cvtColor(cv.COLOR_RGB2GRAY);
    }
    return this.classifier.detectMultiScale(grayImg).objects;
  }
}

function createDetector(algorithm: DetectionAlgorithm): Detection {
  switch (algorithm) {
    case DetectionAlgorithm.HAAR_CASCADE:
      return new CascadeClassifierDetection();
    case DetectionAlgorithm.DNN:
      return new CascadeClassifierDetection();
    default: return assertUnreachable();
  }
}
export {
  createDetector,
  DetectionAlgorithm,
};
