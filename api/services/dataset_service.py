#!/usr/bin/env python3
"""
Medical Dataset Integration Service
Integrates with large open-source medical X-ray datasets
"""

import os
import json
import logging
from typing import Dict, List, Any, Optional
from dataclasses import dataclass

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class DatasetInfo:
    """Information about a medical dataset"""
    name: str
    description: str
    size: int
    xray_type: str
    source: str
    license: str
    download_url: str
    paper_url: str
    huggingface_id: Optional[str] = None

class MedicalDatasetService:
    """Service for managing medical X-ray datasets"""
    
    def __init__(self):
        self.datasets = self._initialize_datasets()
        
    def _initialize_datasets(self) -> Dict[str, DatasetInfo]:
        """Initialize available medical datasets"""
        return {
            'nih_chest': DatasetInfo(
                name="NIH Chest X-ray Dataset",
                description="112,120 frontal-view chest X-ray images with disease labels",
                size=112120,
                xray_type="chest",
                source="NIH Clinical Center",
                license="CC BY 4.0",
                download_url="https://nihcc.app.box.com/v/ChestXray-NIHCC",
                paper_url="https://arxiv.org/abs/1705.02315",
                huggingface_id="microsoft/nih-chest-xray"
            ),
            'chexpert': DatasetInfo(
                name="CheXpert",
                description="224,316 chest X-ray images from Stanford Hospital",
                size=224316,
                xray_type="chest",
                source="Stanford University",
                license="CC BY 4.0",
                download_url="https://stanfordmlgroup.github.io/competitions/chexpert/",
                paper_url="https://arxiv.org/abs/1901.07031",
                huggingface_id="stanfordmlgroup/chexpert"
            ),
            'mimic_cxr': DatasetInfo(
                name="MIMIC-CXR",
                description="377,110 chest X-ray images from Beth Israel Deaconess Medical Center",
                size=377110,
                xray_type="chest",
                source="MIT",
                license="PhysioNet Credentialed Health Data License",
                download_url="https://physionet.org/content/mimic-cxr/",
                paper_url="https://www.nature.com/articles/s41597-019-0322-0",
                huggingface_id="mimic-cxr"
            ),
            'mura': DatasetInfo(
                name="MURA",
                description="40,561 bone X-ray images for abnormality detection",
                size=40561,
                xray_type="bone",
                source="Stanford University",
                license="CC BY 4.0",
                download_url="https://stanfordmlgroup.github.io/competitions/mura/",
                paper_url="https://arxiv.org/abs/1712.06957",
                huggingface_id="stanfordmlgroup/mura"
            ),
            'padchest': DatasetInfo(
                name="PadChest",
                description="160,868 chest X-ray images from Hospital San Juan de Alicante",
                size=160868,
                xray_type="chest",
                source="Hospital San Juan de Alicante",
                license="CC BY 4.0",
                download_url="https://bimcv.cipf.es/bimcv-projects/padchest/",
                paper_url="https://arxiv.org/abs/1901.07441",
                huggingface_id="padchest"
            ),
            'vindr_cxr': DatasetInfo(
                name="VinDr-CXR",
                description="18,000 chest X-ray images from Vietnamese hospitals",
                size=18000,
                xray_type="chest",
                source="VinBigData",
                license="CC BY 4.0",
                download_url="https://www.kaggle.com/c/vinbigdata-chest-xray-abnormalities-detection",
                paper_url="https://arxiv.org/abs/2012.15029",
                huggingface_id="vindr-cxr"
            ),
            'bone_age': DatasetInfo(
                name="Bone Age Assessment",
                description="12,611 hand X-ray images for bone age assessment",
                size=12611,
                xray_type="bone",
                source="RSNA",
                license="CC BY 4.0",
                download_url="https://www.kaggle.com/c/rsna-bone-age",
                paper_url="https://pubs.rsna.org/doi/10.1148/radiol.2017170236",
                huggingface_id="rsna-bone-age"
            ),
            'dental_xray': DatasetInfo(
                name="Dental X-ray Dataset",
                description="1,000+ dental X-ray images for tooth detection",
                size=1000,
                xray_type="dental",
                source="Various",
                license="CC BY 4.0",
                download_url="https://github.com/DeepDental/DentalXrayDataset",
                paper_url="https://ieeexplore.ieee.org/document/9093280",
                huggingface_id="dental-xray"
            )
        }
    
    def get_datasets_by_type(self, xray_type: str) -> List[DatasetInfo]:
        """Get datasets for a specific X-ray type"""
        return [dataset for dataset in self.datasets.values() 
                if dataset.xray_type == xray_type]
    
    def get_all_datasets(self) -> Dict[str, DatasetInfo]:
        """Get all available datasets"""
        return self.datasets
    
    def get_dataset_info(self, dataset_id: str) -> Optional[DatasetInfo]:
        """Get information about a specific dataset"""
        return self.datasets.get(dataset_id)
    
    def get_total_images(self) -> int:
        """Get total number of images across all datasets"""
        return sum(dataset.size for dataset in self.datasets.values())
    
    def get_datasets_summary(self) -> Dict[str, Any]:
        """Get summary of all datasets"""
        total_images = self.get_total_images()
        by_type = {}
        
        for dataset in self.datasets.values():
            if dataset.xray_type not in by_type:
                by_type[dataset.xray_type] = {'count': 0, 'total_images': 0}
            by_type[dataset.xray_type]['count'] += 1
            by_type[dataset.xray_type]['total_images'] += dataset.size
        
        return {
            'total_datasets': len(self.datasets),
            'total_images': total_images,
            'by_type': by_type,
            'datasets': {k: {
                'name': v.name,
                'size': v.size,
                'xray_type': v.xray_type,
                'source': v.source,
                'license': v.license
            } for k, v in self.datasets.items()}
        }
    
    def load_dataset_from_huggingface(self, dataset_id: str, split: str = 'train') -> Optional[Any]:
        """Load dataset from Hugging Face Hub"""
        try:
            from datasets import load_dataset
            dataset_info = self.get_dataset_info(dataset_id)
            
            if not dataset_info or not dataset_info.huggingface_id:
                logger.warning(f"No Hugging Face ID for dataset {dataset_id}")
                return None
            
            logger.info(f"Loading dataset {dataset_info.name} from Hugging Face...")
            dataset = load_dataset(dataset_info.huggingface_id, split=split)
            logger.info(f"Successfully loaded {len(dataset)} samples")
            return dataset
            
        except ImportError:
            logger.error("Hugging Face datasets library not installed")
            return None
        except Exception as e:
            logger.error(f"Error loading dataset {dataset_id}: {e}")
            return None
    
    def get_sample_data(self, dataset_id: str, num_samples: int = 5) -> List[Dict[str, Any]]:
        """Get sample data from a dataset"""
        try:
            dataset = self.load_dataset_from_huggingface(dataset_id, 'train')
            if not dataset:
                return []
            
            samples = []
            for i in range(min(num_samples, len(dataset))):
                sample = dataset[i]
                samples.append({
                    'index': i,
                    'image_shape': sample.get('image', {}).get('size', 'Unknown'),
                    'labels': sample.get('labels', 'No labels'),
                    'metadata': {k: v for k, v in sample.items() if k not in ['image', 'labels']}
                })
            
            return samples
            
        except Exception as e:
            logger.error(f"Error getting sample data: {e}")
            return []

# Global instance
dataset_service = MedicalDatasetService()

# Main execution for testing
if __name__ == "__main__":
    service = MedicalDatasetService()
    
    print("Medical X-ray Datasets Available:")
    print("=" * 50)
    
    summary = service.get_datasets_summary()
    print(f"Total Datasets: {summary['total_datasets']}")
    print(f"Total Images: {summary['total_images']:,}")
    print()
    
    print("By X-ray Type:")
    for xray_type, info in summary['by_type'].items():
        print(f"  {xray_type.title()}: {info['count']} datasets, {info['total_images']:,} images")
    
    print("\nDetailed Dataset Information:")
    for dataset_id, dataset in service.get_all_datasets().items():
        print(f"\n{dataset.name}")
        print(f"   Type: {dataset.xray_type}")
        print(f"   Size: {dataset.size:,} images")
        print(f"   Source: {dataset.source}")
        print(f"   License: {dataset.license}")
        if dataset.huggingface_id:
            print(f"   Hugging Face: {dataset.huggingface_id}")
