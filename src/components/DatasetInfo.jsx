import React, { useState, useEffect } from 'react';
import { Database, ExternalLink, Info, CheckCircle } from 'lucide-react';

const DatasetInfo = ({ xrayType, className = '' }) => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (xrayType) {
      fetchDatasets(xrayType);
    }
  }, [xrayType]);

  const fetchDatasets = async (type) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/datasets/${type}`);
      const data = await response.json();
      if (data.success) {
        setDatasets(data.data);
      }
    } catch (error) {
      console.error('Error fetching datasets:', error);
      // Fallback datasets
      setDatasets(getFallbackDatasets(type));
    } finally {
      setLoading(false);
    }
  };

  const getFallbackDatasets = (type) => {
    const fallback = {
      'chest': ['nih-chest-xray', 'chexpert', 'mimic-cxr'],
      'bone': ['mura-bone-xray', 'bone-age-assessment'],
      'dental': ['dental-xray-dataset', 'panoramic-dental'],
      'general': ['medical-imaging-datasets', 'radiopaedia']
    };
    return fallback[type] || fallback['general'];
  };

  const getDatasetInfo = (datasetName) => {
    const info = {
      'nih-chest-xray': {
        name: 'NIH Chest X-ray',
        description: '112,120 frontal chest X-ray images',
        license: 'CC BY 4.0',
        size: '~40GB',
        url: 'https://www.kaggle.com/datasets/nih-chest-xrays/data'
      },
      'chexpert': {
        name: 'CheXpert',
        description: '224,316 chest radiographs from Stanford',
        license: 'Research Use',
        size: '~10GB',
        url: 'https://stanfordmlgroup.github.io/competitions/chexpert/'
      },
      'mimic-cxr': {
        name: 'MIMIC-CXR',
        description: '377,110 chest X-ray images',
        license: 'PhysioNet License',
        size: '~50GB',
        url: 'https://physionet.org/content/mimic-cxr/2.0.0/'
      },
      'mura-bone-xray': {
        name: 'MURA',
        description: '40,561 musculoskeletal radiographs',
        license: 'Research Use',
        size: '~15GB',
        url: 'https://stanfordmlgroup.github.io/competitions/mura/'
      },
      'bone-age-assessment': {
        name: 'Bone Age Assessment',
        description: '12,611 hand X-ray images',
        license: 'CC BY 4.0',
        size: '~2GB',
        url: 'https://www.kaggle.com/datasets/kmader/rsna-bone-age'
      },
      'dental-xray-dataset': {
        name: 'Dental X-ray Dataset',
        description: 'Dental panoramic and periapical X-rays',
        license: 'CC BY 4.0',
        size: '~1GB',
        url: 'https://www.kaggle.com/datasets/dental-xray-dataset'
      },
      'panoramic-dental': {
        name: 'Panoramic Dental',
        description: 'Panoramic dental X-ray images',
        license: 'Research Use',
        size: '~500MB',
        url: 'https://github.com/dental-xray-datasets'
      },
      'medical-imaging-datasets': {
        name: 'Medical Imaging Datasets',
        description: 'Collection of various medical imaging datasets',
        license: 'Various',
        size: 'Variable',
        url: 'https://github.com/medical-imaging-datasets'
      },
      'radiopaedia': {
        name: 'Radiopaedia',
        description: 'Educational medical imaging cases',
        license: 'Educational Use',
        size: 'Variable',
        url: 'https://radiopaedia.org/'
      }
    };
    return info[datasetName] || {
      name: datasetName,
      description: 'Medical imaging dataset',
      license: 'Open Source',
      size: 'Variable',
      url: '#'
    };
  };

  if (!xrayType) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
          <Database className="w-5 h-5 mr-2 text-blue-600" />
          Datasets Disponíveis
        </h3>
        <p className="text-sm text-gray-600">
          Conjuntos de dados open-source utilizados para treinamento
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {datasets.map((datasetName, index) => {
            const info = getDatasetInfo(datasetName);
            return (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <h4 className="font-medium text-gray-800">
                        {info.name}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {info.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Info className="w-3 h-3 mr-1" />
                        {info.license}
                      </span>
                      <span>{info.size}</span>
                    </div>
                  </div>
                  <a
                    href={info.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Ver dataset"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <div className="flex items-center text-green-700">
          <CheckCircle className="w-4 h-4 mr-2" />
          <div className="text-sm">
            <div className="font-medium">Integração MONAI</div>
            <div className="text-green-600">
              Framework médico especializado para análise de imagens
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetInfo;
