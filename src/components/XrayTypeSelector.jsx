import React, { useState, useEffect } from 'react';
import { X, Stethoscope, Bone, Tooth, Spine, Skull, Heart, Users, Activity } from 'lucide-react';

const XrayTypeSelector = ({ selectedType, onTypeChange, className = '' }) => {
  const [xrayTypes, setXrayTypes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchXrayTypes();
  }, []);

  const fetchXrayTypes = async () => {
    try {
      const response = await fetch('/api/xray-types');
      const data = await response.json();
      if (data.success) {
        setXrayTypes(data.data);
      }
    } catch (error) {
      console.error('Error fetching X-ray types:', error);
      // Fallback types
      setXrayTypes({
        'chest': 'Chest X-ray Analysis',
        'bone': 'Bone and Joint X-ray Analysis', 
        'dental': 'Dental X-ray Analysis',
        'spine': 'Spinal X-ray Analysis',
        'skull': 'Skull X-ray Analysis',
        'abdomen': 'Abdominal X-ray Analysis',
        'pelvis': 'Pelvic X-ray Analysis',
        'extremities': 'Extremities X-ray Analysis',
        'general': 'General X-ray Analysis'
      });
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    const iconMap = {
      'chest': <Stethoscope className="w-5 h-5" />,
      'bone': <Bone className="w-5 h-5" />,
      'dental': <Tooth className="w-5 h-5" />,
      'spine': <Spine className="w-5 h-5" />,
      'skull': <Skull className="w-5 h-5" />,
      'abdomen': <Heart className="w-5 h-5" />,
      'pelvis': <Users className="w-5 h-5" />,
      'extremities': <Activity className="w-5 h-5" />,
      'general': <X className="w-5 h-5" />
    };
    return iconMap[type] || <X className="w-5 h-5" />;
  };

  const getDescription = (type) => {
    const descriptions = {
      'chest': 'Análise pulmonar e cardíaca',
      'bone': 'Avaliação óssea e articular',
      'dental': 'Exame odontológico',
      'spine': 'Avaliação da coluna vertebral',
      'skull': 'Exame craniano',
      'abdomen': 'Análise abdominal',
      'pelvis': 'Exame pélvico',
      'extremities': 'Avaliação de extremidades',
      'general': 'Análise geral de raio-X'
    };
    return descriptions[type] || 'Análise médica';
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Tipo de Raio-X
        </h3>
        <p className="text-sm text-gray-600">
          Selecione o tipo de radiografia para análise especializada
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(xrayTypes).map(([type, name]) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200
              flex flex-col items-center text-center
              ${selectedType === type
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <div className={`
              mb-2 p-2 rounded-full
              ${selectedType === type
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-500'
              }
            `}>
              {getIcon(type)}
            </div>
            <div className="text-sm font-medium mb-1">
              {name.replace(' Analysis', '')}
            </div>
            <div className="text-xs text-gray-500">
              {getDescription(type)}
            </div>
          </button>
        ))}
      </div>

      {selectedType && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center text-blue-700">
            <div className="mr-2">
              {getIcon(selectedType)}
            </div>
            <div>
              <div className="font-medium">
                {xrayTypes[selectedType]}
              </div>
              <div className="text-sm text-blue-600">
                {getDescription(selectedType)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default XrayTypeSelector;








