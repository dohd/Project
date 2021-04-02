import UrlPattern from 'url-pattern';

const parseUrl = (path='', params={}) => {
    const pattern = new UrlPattern(path);
    return pattern.stringify(params);
};

export default parseUrl;