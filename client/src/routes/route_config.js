import UrlPattern from 'url-pattern';

import RouteNameMap from './route_names';

/**
 * Loop through keys in RouteNameMap adding 
 * a static key-value for each matching dynamic-key
**/
const RouteNameKeySearch = path_name => {
    for (const key in RouteNameMap) {
        const pattern = new UrlPattern(key);
        const result = pattern.match(path_name);
        // add a key-value pair corresponding to 
        // the static path_name matched
        if (result) RouteNameMap[path_name] = RouteNameMap[key];
    }
};

/**
* Convert dynamic path to its corresponding static path
**/
export default function RouteResolver(path_name) {
    RouteNameKeySearch(path_name);

    // split the pathname into components
    const snippets = path_name.split('/').filter(v => v);
    // add a foward slash to each component to form a url
    const snippetsUrls = snippets.map((v,i,a) => '/' + a.slice(0, i+1).join('/'));
    // define a regular expression to match urls ending with digits
    // e.g /home/proposals/20 or /home/proposals/objectives.../20
    const regex = new RegExp(/^(\/home)\/([\w\-/]*)\/(\d+)$/);
    // filter urls that do not match the regex
    const Urls = snippetsUrls.filter(v => !regex.test(v));
    
    // case page reloads, reconstruct static paths
    const mapKeys = Object.keys(RouteNameMap);
    Urls.forEach(v => !mapKeys.includes(v) && RouteNameKeySearch(v));

    return Urls;
}