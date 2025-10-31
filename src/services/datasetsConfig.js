/**
 * Open-Source Medical Imaging Datasets Configuration
 * Integrates with various free medical imaging datasets
 */

export const MEDICAL_DATASETS = {
  // Chest X-ray Datasets
  chest: {
    nih: {
      name: 'NIH Chest X-ray Dataset',
      description: '112,120 frontal-view chest X-ray images',
      url: 'https://www.kaggle.com/datasets/nih-chest-xrays/data',
      license: 'CC BY 4.0',
      size: '~40GB',
      classes: ['Normal', 'Atelectasis', 'Cardiomegaly', 'Effusion', 'Infiltration', 'Mass', 'Nodule', 'Pneumonia', 'Pneumothorax', 'Consolidation', 'Edema', 'Emphysema', 'Fibrosis', 'Pleural_Thickening', 'Hernia']
    },
    chexpert: {
      name: 'CheXpert Dataset',
      description: '224,316 chest radiographs from Stanford',
      url: 'https://stanfordmlgroup.github.io/competitions/chexpert/',
      license: 'Research Use',
      size: '~10GB',
      classes: ['No Finding', 'Enlarged Cardiomediastinum', 'Cardiomegaly', 'Lung Opacity', 'Lung Lesion', 'Edema', 'Consolidation', 'Pneumonia', 'Atelectasis', 'Pneumothorax', 'Pleural Effusion', 'Pleural Other', 'Fracture', 'Support Devices']
    },
    mimic: {
      name: 'MIMIC-CXR',
      description: '377,110 chest X-ray images from Beth Israel Deaconess Medical Center',
      url: 'https://physionet.org/content/mimic-cxr/2.0.0/',
      license: 'PhysioNet Credentialed Health Data License',
      size: '~50GB',
      classes: ['Normal', 'Abnormal']
    }
  },

  // Bone and Musculoskeletal Datasets
  bone: {
    mura: {
      name: 'MURA (musculoskeletal radiographs)',
      description: '40,561 bone X-ray images from Stanford',
      url: 'https://stanfordmlgroup.github.io/competitions/mura/',
      license: 'Research Use',
      size: '~15GB',
      classes: ['Normal', 'Abnormal'],
      bodyParts: ['Finger', 'Hand', 'Wrist', 'Forearm', 'Elbow', 'Humerus', 'Shoulder']
    },
    boneAge: {
      name: 'Bone Age Assessment Dataset',
      description: '12,611 hand X-ray images for bone age assessment',
      url: 'https://www.kaggle.com/datasets/kmader/rsna-bone-age',
      license: 'CC BY 4.0',
      size: '~2GB',
      classes: ['Age Groups']
    }
  },

  // Dental X-ray Datasets
  dental: {
    dentalXray: {
      name: 'Dental X-ray Dataset',
      description: 'Dental panoramic and periapical X-rays',
      url: 'https://www.kaggle.com/datasets/dental-xray-dataset',
      license: 'CC BY 4.0',
      size: '~1GB',
      classes: ['Normal', 'Caries', 'Periodontal Disease', 'Root Canal']
    },
    panoramic: {
      name: 'Panoramic Dental X-ray Dataset',
      description: 'Panoramic dental X-ray images',
      url: 'https://github.com/dental-xray-datasets',
      license: 'Research Use',
      size: '~500MB',
      classes: ['Normal', 'Abnormal']
    }
  },

  // General Medical Imaging
  general: {
    radiopaedia: {
      name: 'Radiopaedia Cases',
      description: 'Educational medical imaging cases',
      url: 'https://radiopaedia.org/',
      license: 'Educational Use',
      size: 'Variable',
      classes: ['Multiple anatomical regions']
    },
    medicalImaging: {
      name: 'Medical Imaging Datasets',
      description: 'Collection of various medical imaging datasets',
      url: 'https://github.com/medical-imaging-datasets',
      license: 'Various',
      size: 'Variable',
      classes: ['Multiple modalities']
    }
  }
};

export const DATASET_INTEGRATION = {
  // Hugging Face Datasets integration
  huggingface: {
    chest: 'medical-datasets/chest-xray',
    bone: 'medical-datasets/bone-xray',
    dental: 'medical-datasets/dental-xray'
  },

  // Kaggle datasets
  kaggle: {
    nih: 'nih-chest-xrays/data',
    chexpert: 'stanford-chexpert',
    boneAge: 'rsna-bone-age'
  },

  // Direct download URLs
  direct: {
    mimic: 'https://physionet.org/content/mimic-cxr/2.0.0/',
    mura: 'https://stanfordmlgroup.github.io/competitions/mura/'
  }
};

export const XRAY_TYPES = {
  chest: {
    name: 'Chest X-ray',
    description: 'Radiografia de tórax para avaliação pulmonar e cardíaca',
    commonFindings: ['Pneumonia', 'Atelectasia', 'Derrame pleural', 'Cardiomegalia'],
    datasets: ['nih', 'chexpert', 'mimic']
  },
  bone: {
    name: 'Bone X-ray',
    description: 'Radiografia óssea para avaliação de fraturas e lesões',
    commonFindings: ['Fratura', 'Artrite', 'Osteoporose', 'Lesão óssea'],
    datasets: ['mura', 'boneAge']
  },
  dental: {
    name: 'Dental X-ray',
    description: 'Radiografia odontológica para avaliação dentária',
    commonFindings: ['Cárie', 'Doença periodontal', 'Canal radicular', 'Implante'],
    datasets: ['dentalXray', 'panoramic']
  },
  spine: {
    name: 'Spinal X-ray',
    description: 'Radiografia da coluna vertebral',
    commonFindings: ['Escoliose', 'Hérnia de disco', 'Fratura vertebral', 'Degeneração'],
    datasets: ['general']
  },
  skull: {
    name: 'Skull X-ray',
    description: 'Radiografia do crânio',
    commonFindings: ['Fratura', 'Sinusite', 'Lesão intracraniana', 'Anomalia'],
    datasets: ['general']
  },
  abdomen: {
    name: 'Abdominal X-ray',
    description: 'Radiografia abdominal',
    commonFindings: ['Obstrução intestinal', 'Perfuração', 'Cálculo renal', 'Gás livre'],
    datasets: ['general']
  },
  pelvis: {
    name: 'Pelvic X-ray',
    description: 'Radiografia pélvica',
    commonFindings: ['Fratura pélvica', 'Artrose', 'Lesão', 'Anomalia'],
    datasets: ['general']
  },
  extremities: {
    name: 'Extremities X-ray',
    description: 'Radiografia de extremidades',
    commonFindings: ['Fratura', 'Luxação', 'Artrite', 'Lesão'],
    datasets: ['mura']
  }
};

export const getDatasetInfo = (xrayType, datasetName) => {
  const typeData = MEDICAL_DATASETS[xrayType];
  if (!typeData) return null;
  
  return typeData[datasetName] || null;
};

export const getAvailableDatasets = (xrayType) => {
  const typeData = MEDICAL_DATASETS[xrayType];
  if (!typeData) return [];
  
  return Object.keys(typeData);
};

export const getXrayTypeInfo = (xrayType) => {
  return XRAY_TYPES[xrayType] || null;
};

export const getAllSupportedTypes = () => {
  return Object.keys(XRAY_TYPES);
};

export const getDatasetDownloadInfo = (xrayType, datasetName) => {
  const dataset = getDatasetInfo(xrayType, datasetName);
  if (!dataset) return null;
  
  return {
    name: dataset.name,
    url: dataset.url,
    license: dataset.license,
    size: dataset.size,
    description: dataset.description
  };
};








