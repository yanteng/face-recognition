const cv = require('opencv4nodejs');

const RecognizeAlgorithm = {
  OPENCV_FACE: 'opencv_face',
  DNN: 'dnn',
};

function createOpencvFaceRecognizer() {
  let recognizer = null;
  return {
    init(params) {
      const { type = 'LBPH' } = params;
      switch (type) {
        case 'LBPH':
          recognizer = new cv.LBPHFaceRecognizer();
          break;
        case 'fisher':
          recognizer = new cv.FisherFaceRecognizer();
          break;
        case 'Eigen':
          recognizer = new cv.EigenFaceRecognizer();
          break;
        default: break;
      }
    },
    train(samples, labels) {
      recognizer.train(samples, labels);
    },
    recognize(faceImage) {
      return recognizer.predict(faceImage);
    },
    save(filepath) {
      recognizer.write(filepath);
    },
  };
}


module.exports = {
  createOpencvFaceRecognizer,
  RecognizeAlgorithm,
};
