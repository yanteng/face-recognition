import * as cv from 'opencv4nodejs';
import { createDetector, DetectionAlgorithm } from './face/index';
import { drawDetection } from './face/utils';

const detector = createDetector(DetectionAlgorithm.HAAR_CASCADE);
detector.init({ model: cv.HAAR_EYE });

const capture = new cv.VideoCapture(0);
const delay = 10;
let done = false;

while (!done) {
  let frame = capture.read();
  if (frame.empty) {
    capture.reset();
    frame = capture.read();
  }
  const rects = detector.detect(frame);
  const result = drawDetection(frame, rects);
  cv.imshow('face', result);
  const key = cv.waitKey(delay);
  // using ESC to exit
  done = key === 27;
}
