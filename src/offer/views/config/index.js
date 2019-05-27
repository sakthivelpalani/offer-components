import ccConfig from './CC.json';
import plConfig from './PL.json';

const configs = {
    "CC" : ccConfig,
    "PL" : plConfig
}

export default function getViewConfiguration(productType) {
    return configs[productType];
}